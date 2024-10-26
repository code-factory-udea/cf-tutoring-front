import { useQueryAppointmentsTutor } from "@hooks/queries";
import { Spinner } from "@ui/Spinner";
import { APPOINMENT_STATUS } from "@utils/constants";
import { ToastContainer } from "react-toastify";


export const CompletedRequestPage = () => {
  const { data: completedRequests, isLoading } = useQueryAppointmentsTutor(APPOINMENT_STATUS.COMPLETED);

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <div className="p-6 text-dark">
      <h1 className="text-2xl font-bold mb-4">Tutorías Completadas</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {completedRequests.map((request) => (
          <div
            key={request.id}
            className="bg-white shadow-lg rounded-lg p-6 border border-gray-200"
          >
            <h2 className="text-lg font-semibold text-teal-600">
              {request.name}
            </h2>
            <p className="text-gray-600">
              <strong>Fecha:</strong> {new Date(request.date).toLocaleString()}
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
