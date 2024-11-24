import { Modal } from "@components/Modal";
import {
  useQueryAppointmentsTutor,
  useQueryAppointmentsTutorCompleted,
} from "@hooks/queries";
import { useModal } from "@hooks/useModal";
import { Spinner } from "@ui/Spinner";
import { APPOINMENT_STATUS } from "@utils/constants";
import moment from "moment";
import { useState } from "react";
import { ToastContainer } from "react-toastify";

export const CompletedRequestPage = () => {
  const { isOpen, openModal, closeModal } = useModal();
  const [appointmentId, setAppointmentId] = useState<number>(0);
  const { data: completedRequests, isLoading } = useQueryAppointmentsTutor(
    APPOINMENT_STATUS.COMPLETED,
  );
  const { data: appointment, isLoading: isLoadingAppointments } =
    useQueryAppointmentsTutorCompleted(appointmentId);
  if (isLoading) {
    return (
      <div className="w-full flex items-center justify-center">
        <Spinner />
      </div>
    );
  }
  const handleShowDetails = (id: number) => {
    setAppointmentId(id);
    openModal();
  };
  return (
    <div className="p-6 text-dark">
      <h1 className="text-2xl font-bold mb-4">Tutorías Completadas</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {completedRequests.map((request) => (
          <div
            key={request.id}
            className="bg-white shadow-lg rounded-lg p-6 border border-gray-200"
          >
            <h2 className="text-lg font-medium text-teal-600">
              {request.name}
            </h2>
            <p className="text-sm text-gray-500">
              Fecha: {moment(request.date).format("DD/MM/YYYY")}
            </p>
            <p className="text-sm text-gray-500">
              Hora: {request.startTime} - {request.endTime}
            </p>
            <p className="text-gray-600">
              <strong>Virtual:</strong> {request.virtual ? "Sí" : "No"}
            </p>
            <div className="mt-4">
              <button
                className="bg-secondary-green text-white px-4 py-2 rounded-md font-medium hover:bg-primary-green"
                onClick={() => handleShowDetails(request.id)}
              >
                Ver Detalles
              </button>
            </div>
          </div>
        ))}
      </div>

      <ToastContainer />

      <Modal isOpen={isOpen} title="">
        <div className="bg-white rounded-lg shadow-lg p-6 w-full text-dark">
          {isLoadingAppointments && <Spinner />}

          <h2 className="text-lg font-semibold text-primary-green">
            Detalles de la tutoría realizada
          </h2>

          <div className="mb-4">
            <p className="block text-sm font-medium">
              Calificación:
              <span className="text-gray-500 font-normal">
                {" "}
                {appointment?.calification}
              </span>
            </p>

            <p className="text-sm font-medium">
              Feedback:
              <span className="text-gray-500 font-normal">
                {" "}
                {appointment?.feedback}
              </span>
            </p>

            <p className="block text-sm font-medium">
              Fecha de Calificación:
              <span className="text-gray-500 font-normal">
                {" "}
                {moment(appointment?.calificationDate).format("DD/MM/YYYY")}
              </span>
            </p>
          </div>

          <div className="flex justify-end gap-4">
            <button
              onClick={closeModal}
              className="px-4 py-2 bg-secondary-green text-white rounded-md hover:bg-primary-green"
            >
              Cerrar
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
