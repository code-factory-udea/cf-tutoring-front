import { useQueryAppointmentsTutor } from "@hooks/queries";
import { Table } from "@ui/Table";
import { APPOINMENT_STATUS } from "@utils/constants";
import moment from "moment";
import { useMemo } from "react";
import { ToastContainer } from "react-toastify";

const COLUMNS = ["ID", "Nombre", "Fecha", "Virtual"];
export const CanceledRequestPage = () => {
  const { data: rejectedRequests, isLoading: isLoadingRejected } = useQueryAppointmentsTutor(APPOINMENT_STATUS.REJECTED);
  const { data: canceledRequests, isLoading: isLoadingCanceled } = useQueryAppointmentsTutor(APPOINMENT_STATUS.CANCELED);

  const memoizedRequest = useMemo(() => {
    if (!rejectedRequests || !canceledRequests) return [];
    const requests = rejectedRequests.concat(canceledRequests);
    requests.sort((a, b) => moment(a.date).diff(moment(b.date)));

    return requests.map((request) => {
      return [
        <p>{request.id}</p>,
        <p>{request.name}</p>,
        <p>{moment(request.date).format("YYYY/MM/DD")}, {request.startTime} - {request.endTime}</p>,
        <p>{request.virtual ? "Si" : "No"}</p>,
      ];
    });
  }, [rejectedRequests, canceledRequests]);

  return (
    <div className="p-6 text-dark">
      <h1 className="text-2xl font-bold mb-4">
        Tutorías Canceladas / Rechazadas
      </h1>

      <Table
        columns={COLUMNS}
        data={memoizedRequest}
        isLoadingData={isLoadingRejected && isLoadingCanceled}
      />

      <ToastContainer />
    </div>
  );
};
