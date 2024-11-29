import { Modal } from "@components/Modal";
import { useMutateAppointmentSurvey } from "@hooks/mutations";
import { useQueryPendingAppointments } from "@hooks/queries";
import { useModal } from "@hooks/useModal";
import { Spinner } from "@ui/Spinner";
import { APPOINMENT_STATUS } from "@utils/constants";
import moment from "moment";
import { useState } from "react";
import { ToastContainer } from "react-toastify";

const RequestHistoryOrQualificationPage = () => {
  const { isOpen, openModal, closeModal } = useModal();
  const [appointmentId, setAppointmentId] = useState<number>(0);
  const [calification, setCalification] = useState<number>(0);
  const [feedback, setFeedback] = useState<string>("");
  const [submittedAppointments, setSubmittedAppointments] = useState<
    Set<number>
  >(new Set());

  const { data: pendingAppointments = [], isLoading } =
    useQueryPendingAppointments(APPOINMENT_STATUS.COMPLETED);

  const mutation = useMutateAppointmentSurvey();

  const handleSubmitSurvey = () => {
    mutation.mutate(
      { appointmentId, calification, feedback },
      {
        onSuccess: () => {
          setSubmittedAppointments((prev) => new Set(prev).add(appointmentId));
          closeModal();
          setCalification(0);
          setFeedback("");
        },
      },
    );
  };

  const handleShowDetails = (id: number) => {
    setAppointmentId(id);
    openModal();
  };

  const handleCalificationChange = (value: number) => {
    if (value >= 0 && value <= 5) {
      setCalification(value);
    }
  };

  if (isLoading) {
    return (
      <div className="w-full flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="p-6 text-dark">
      <h1 className="text-2xl font-bold mb-4">Historial de Tutorías</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {pendingAppointments.map((request) => (
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
                Calificar
              </button>
            </div>
          </div>
        ))}
      </div>

      <ToastContainer />

      <Modal isOpen={isOpen} title="Calificar Tutoría">
        <div className="bg-white rounded-lg shadow-lg p-6 w-full text-dark">
          <h2 className="text-lg font-semibold text-primary-green">
            Calificación
          </h2>
          <div className="mb-4">
            <label className="block text-sm font-medium">Calificación:</label>
            <input
              type="number"
              value={calification}
              onChange={(e) => handleCalificationChange(Number(e.target.value))}
              min={0}
              max={5}
              className="border p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Feedback:</label>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="border p-2 w-full"
            />
          </div>
          <div className="flex justify-end gap-4">
            <button
              onClick={handleSubmitSurvey}
              className="px-4 py-2 bg-secondary-green text-white rounded-md hover:bg-primary-green"
            >
              Enviar
            </button>
            <button
              onClick={closeModal}
              className="px-4 py-2 bg-gray-300 text-dark rounded-md"
            >
              Cancelar
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default RequestHistoryOrQualificationPage;
