import { createBrowserRouter } from "react-router-dom";
import BoardDetails from "../pages/BoardDetails";
import Boards from "../pages/Boards";

export const ourRouter = createBrowserRouter([
  {
    path: "/",
    element: <Boards />,
  },
  {
    path: "/boards/:boardId",
    element: <BoardDetails />,
  },
]);
