import { DogsLayout } from "../../features/dogs/components/layout/DogsLayout";
import { ViewFavoriteDog } from "../../features/dogs/components/ViewFavoriteDog";
import { Login } from "./auth/Login";

const routes = {
  privateRoutes: [
    {
      path: "/dogs/favorites",
      element: ViewFavoriteDog,
      featureName: "Tickets",
    },
    {
      path: "*",
      element: DogsLayout,
    },
  ],
  publicRoutes: [
    {
      path: "*",
      element: Login,
    },
  ],
};

export default routes;
