import { Login } from "@components/Login";
import AcademicProgramPage from "@pages/academicProgram.page";
import AdminPage from "@pages/admin.page";
import { AgendaPage } from "@pages/agenda.page";
import { AppoinmentTutor } from "@pages/appoinmentTutor.page";
import { AppointmentAdminPage } from "@pages/appointmentAdmin.page";
import { CanceledRequestPage } from "@pages/canceledRequest.page";
import { CompletedRequestPage } from "@pages/completedRequest.page";
import FacultyPage from "@pages/faculty.page";
import HomePage from "@pages/home.page";
import MainLayout from "@pages/mainLayout";
import MonitorPage from "@pages/monitor.page";
import { PendingRequestPage } from "@pages/pendingRequest.page";
import { ProfessorMonitorPage } from "@pages/professorMonitor.page";
import RequestConfirmedOrCancelPage from "@pages/requestConfirmedOrCancel.page";
import RequestHistoryOrQualificationPage from "@pages/requestHistoryOrQualification.page";
import RequestRejectedPage from "@pages/requestRejected.page";
import RequestTutoringPage from "@pages/requestTutoring.page";
import RequestWaitingPage from "@pages/requestWaiting.page";
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
      { path: "/agenda", element: <PrivateRoute element={<AgendaPage />} /> },
      {
        path: "/solicitudes-pendientes",
        element: <PrivateRoute element={<PendingRequestPage />} />,
      },
      {
        path: "/monitorias",
        element: <PrivateRoute element={<AppoinmentTutor />} />,
      },
      { path: "/solicitudes-canceladas", element: <CanceledRequestPage /> },

      { path: "/tutorias-realizadas", element: <CompletedRequestPage /> },
      { path: "/tutorias-realizadas", element: <CompletedRequestPage /> },
      { path: "/solicitar-tutoria", element: <RequestTutoringPage /> },
      { path: "/tutorias-en-espera", element: <RequestWaitingPage /> },
      { path: "/tutorias-canceladas", element: <RequestRejectedPage /> },
      {
        path: "/tutorias-confirmadas-o-cancelar",
        element: <RequestConfirmedOrCancelPage />,
      },
      {
        path: "/tutorias-calificar-historial",
        element: <RequestHistoryOrQualificationPage />,
      },
      {
        path: "/monitores",
        element: <PrivateRoute element={<ProfessorMonitorPage />} />,
      },
      {
        path: "/monitorias-realizadas",
        element: <PrivateRoute element={<AppointmentAdminPage />} />,
      },
    ],
  },
]);

export default router;
