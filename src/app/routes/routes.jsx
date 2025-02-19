import { DogSearch } from "../../features/dogs/components/DogSearch";
import { DogsLayout } from "../../features/dogs/components/layout/DogsLayout";
import { ViewFavoriteDog } from "../../features/dogs/components/ViewFavoriteDog";
import { Login } from "./auth/Login";

const routes = {
  privateRoutes: [
    {
      path: "*",
      element: DogsLayout,
    },
    {
      path: "/dogs",
      element: DogsLayout,
    },
    {
      path: "/dogs/search",
      element: DogSearch,
    },
    {
      path: "/dogs/favorites/:dogId",
      element: ViewFavoriteDog,
      featureName: "Tickets",
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
