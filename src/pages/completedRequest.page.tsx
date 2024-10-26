import { useQueryAppointmentsTutor } from "@hooks/queries";
import { AppointmentList } from "@interfaces/appointment";
import { APPOINMENT_STATUS } from "@utils/constants";
import { ToastContainer } from "react-toastify";

const initialTutorships: AppointmentList[] = [
  { id: 1, name: "Matemáticas Avanzadas", date: "2024-10-28", virtual: true },
  { id: 2, name: "Física Moderna", date: "2024-10-30", virtual: false },
  { id: 3, name: "Programación en React", date: "2024-11-02", virtual: true },
];
export const CompletedRequestPage = () => {
  const { data: completedRequests, isLoading } = useQueryAppointmentsTutor(
    APPOINMENT_STATUS.COMPLETED,
  );

  return (
    <div className="p-6 text-dark">
      <h1 className="text-2xl font-bold mb-4">Tutorías Completadas</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {initialTutorships.map((request) => (
          <div
            key={request.id}
            className="bg-white shadow-lg rounded-lg p-6 border border-gray-200"
          >
            <h2 className="text-lg font-semibold text-teal-600">
              {request.name}
            </h2>
            <p className="text-gray-600">
              <strong>Fecha:</strong> {request.date}
            </p>
            <p className="text-gray-600">
              <strong>Virtual:</strong> {request.virtual ? "Sí" : "No"}
            </p>
            <div className="mt-4">
              <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                Ver Detalles
              </button>
            </div>
          </div>
        ))}
      </div>

      <ToastContainer />
    </div>
  );
};
