import { createBrowserRouter } from "react-router-dom";
import { Login } from "../components/Login";
import HomePage from "../pages/home.page";
import MainLayout from "../pages/mainLayout";

const router = createBrowserRouter(
  [
    {
      path: "/dashboard",
      element: <MainLayout />,
      children: [
        {
          index: true,
          element: <HomePage />,
        },
        { path: "dashboard", element: <HomePage /> },
      ],
    },
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/users",
      element: <MainLayout />,
      children: [
        {
          index: true,
          element: <HomePage />,
        },
      ],
    },
  ],
  // createRoutesFromElements(
  //     <Route path="/" element={<Sidebar />}>
  //         <Route index element={<HomePage />} />
  //         <Route path="/login" element={<Login />} />
  //         <Route path="/home" element={<HomePage />} />
  //     </Route>
  // )
);

export default router;
