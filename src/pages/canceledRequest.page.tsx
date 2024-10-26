import { useQueryAppointmentsTutor } from "@hooks/queries";
import { AppointmentList } from "@interfaces/appointment";
import { Table } from "@ui/Table";
import { APPOINMENT_STATUS } from "@utils/constants";
import { useMemo } from "react";
import { ToastContainer } from "react-toastify";
import moment from "moment";

const cancel: AppointmentList[] = [
  { id: 1, name: "Matemáticas Avanzadas", date: "2024-10-28", virtual: true },
  { id: 2, name: "Física Moderna", date: "2024-10-30", virtual: false },
  { id: 3, name: "Programación en React", date: "2024-11-02", virtual: true },
];

const reject: AppointmentList[] = [
  { id: 4, name: "Matemáticas Avanzadas", date: "2024-10-28", virtual: true },
  { id: 5, name: "Física Moderna", date: "2024-10-30", virtual: false },
  { id: 6, name: "Programación en React", date: "2024-11-02", virtual: true },
];

const COLUMNS = ["ID", "Nombre", "Fecha", "Virtual"];
export const CanceledRequestPage = () => {
  const { data: rejectedRequests, isLoading: isLoadingRejected } =
    useQueryAppointmentsTutor(APPOINMENT_STATUS.REJECTED);
  const { data: canceledRequests, isLoading: isLoadingCanceled } =
    useQueryAppointmentsTutor(APPOINMENT_STATUS.CANCELED);

  const memoizedRequest = useMemo(() => {
    if (!rejectedRequests || !canceledRequests) return [];
    const requests = rejectedRequests.concat(canceledRequests);
    requests.sort((a, b) => moment(a.date).diff(moment(b.date)));

    return requests.map((request) => {
      return [
        <p>{request.id}</p>,
        <p>{request.name}</p>,
        <p>{request.date}</p>,
        <p>{request.virtual ? 'Si':'No'}</p>,
      ];
    });
  }, [rejectedRequests, canceledRequests]);

  const test = useMemo(() => {
    const requests = reject.concat(cancel)
    requests.sort((a, b) => moment(a.date).diff(moment(b.date)));

    return requests.map((request) => {
      return [
        <p>{request.id}</p>,
        <p>{request.name}</p>,
        <p>{request.date}</p>,
        <p>{request.virtual ? 'Si':'No'}</p>,
      ];
    });
  }, [reject, cancel]);

  return (
    <div className="p-6 text-dark">
      <h1 className="text-2xl font-bold mb-4">
        Tutorías Canceladas / Rechazadas
      </h1>

      <Table
        columns={COLUMNS}
        data={test}
        isLoadingData={isLoadingRejected && isLoadingCanceled}
      />

      <ToastContainer />
    </div>
  );
};
