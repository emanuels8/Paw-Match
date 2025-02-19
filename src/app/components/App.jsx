import { Route, Routes } from "react-router";
import { PublicRoute } from "../routes/PublicRoute";
import { PrivateRoute } from "../routes/PrivateRoute";
import { Suspense, useEffect, useState } from "react";
import routes from "../routes/routes";
import { useAuth } from "../routes/AuthProvider";

const App = () => {
  const { user } = useAuth();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (user) {
      const { sessionExpiration } = user;
      const currentTime = Date.now();
      if (currentTime > sessionExpiration) {
        localStorage.removeItem("user");
        setIsAuthenticated(false);
      } else {
        setIsAuthenticated(true);
      }
    } else {
      localStorage.removeItem("user");
      setIsAuthenticated(false);
    }
  }, [user]);

  return (
    <Suspense fallback={<div>...loading</div>}>
      <Routes>
        {isAuthenticated ? (
          <Route element={<PrivateRoute />}>
            {routes.privateRoutes.map(({ path, element: Component }) => (
              <Route key={path} path={path} element={<Component />} />
            ))}
          </Route>
        ) : (
          <Route element={<PublicRoute />}>
            {routes.publicRoutes.map(({ path, element: Component }) => (
              <Route key={path} path={path} element={<Component />} />
            ))}
          </Route>
        )}
      </Routes>
    </Suspense>
  );
};

export default App;
