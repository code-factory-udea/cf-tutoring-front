import { Login } from "@components/Login";
import AcademicProgramPage from "@pages/academicProgram.page";
import AdminPage from "@pages/admin.page";
import FacultyPage from "@pages/faculty.page";
import HomePage from "@pages/home.page";
import MainLayout from "@pages/mainLayout";
import MonitorPage from "@pages/monitor.page";
import StudentPage from "@pages/student.page";
import SubjectPage from "@pages/subject";
import TeacherPage from "@pages/teacher.page";
import UnidentifiedPage from "@pages/undefined.page";
import UserPage from "@pages/user.page";
import { createBrowserRouter } from "react-router-dom";
import PrivateRoute from "./privateRouter";

const userRoutes = [
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
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <PrivateRoute element={<MainLayout />} />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/usuarios",
        element: <PrivateRoute element={<UserPage />} />,
      },
      {
        path: "/facultades",
        element: <PrivateRoute element={<FacultyPage />} />,
      },
      {
        path: "/programas",
        element: <PrivateRoute element={<AcademicProgramPage />} />,
      },
      {
        path: "/materias",
        element: <PrivateRoute element={<SubjectPage />} />,
      },
      {
        path: "/usuarios/estudiantes",
        element: <PrivateRoute element={<StudentPage />} />,
      },
      {
        path: "/usuarios/monitores",
        element: <PrivateRoute element={<MonitorPage />} />,
      },
      {
        path: "/usuarios/profesores",
        element: <PrivateRoute element={<TeacherPage />} />,
      },
      {
        path: "/usuarios/administradores",
        element: <PrivateRoute element={<AdminPage />} />,
      },
      {
        path: "/usuarios/unidentified",
        element: <PrivateRoute element={<UnidentifiedPage />} />,
      },
    ],
  },
]);

export default router;
