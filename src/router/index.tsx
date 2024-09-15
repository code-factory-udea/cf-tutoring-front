import { Login } from "@components/Login";
import AdminPage from "@pages/admin.page";
import HomePage from "@pages/home.page";
import MainLayout from "@pages/mainLayout";
import MonitorPage from "@pages/monitor.page";
import StudentPage from "@pages/student.page";
import TeacherPage from "@pages/teacher.page";
import UnidentifiedPage from "@pages/undefined.page";
import UserPage from "@pages/user.page";
import { createBrowserRouter } from "react-router-dom";

const dashboardRoutes = [
  {
    index: true,
    element: <HomePage />,
  },
];

const userRoutes = [
  {
    index: true, 
    element: <UserPage />,
  },
  {
    path: "estudiantes",
    element: <StudentPage />,
  },
  {
    path: "monitores",
    element: <MonitorPage />,
  },
  {
    path: "profesores",
    element: <TeacherPage />,
  },
  {
    path: "administradores", 
    element: <AdminPage />,
  },
  {
    path: "unidentified",
    element: <UnidentifiedPage />,
  },
];

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />, 
  },
  {
    path: "/dashboard",
    element: <MainLayout />,
    children: dashboardRoutes, 
  },
  {
    path: "/usuarios",
    element: <MainLayout />, 
    children: userRoutes, 
  },
]);

export default router;
