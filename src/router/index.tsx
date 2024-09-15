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
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/usuarios",
        element: <UserPage />,
        children: userRoutes,
      },
      {
        path: "/facultades",
        element: <FacultyPage />,
      },
      {
        path: "/programas",
        element: <AcademicProgramPage />,
      },
      {
        path: "/materias",
        element: <SubjectPage />,
      },
    ],
  },
]);

export default router;
