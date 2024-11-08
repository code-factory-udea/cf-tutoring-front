import { useQueryPendingAppointments } from "@hooks/queries";
import { Table } from "@ui/Table";
import { APPOINMENT_STATUS } from "@utils/constants";
import moment from "moment";
import { useMemo } from "react";
import { ToastContainer } from "react-toastify";

const COLUMNS = ["ID", "Nombre", "Fecha", "Virtual"];
export const RequestConfirmedOrCancelPage = () => {
  const { data: confirmedRequests, isLoading: isLoadingConfirmed } = useQueryPendingAppointments(APPOINMENT_STATUS.ACCEPTED);

  const memoizedRequest = useMemo(() => {
    if (!confirmedRequests) return [];
    const requests = confirmedRequests;
    requests.sort((a, b) => moment(a.date).diff(moment(b.date)));

    return requests.map((request) => {
      return [
        <p>{request.id}</p>,
        <p>{request.name}</p>,
        <p>{moment(request.date).format("YYYY/MM/DD")}, {request.startTime} - {request.endTime}</p>,
        <p>{request.virtual ? "Si" : "No"}</p>,
      ];
    });
  }, [confirmedRequests]);

  return (
    <div className="p-6 text-dark">
      <h1 className="text-2xl font-bold mb-4">
        Solicitudes Aceptadas
      </h1>

      <Table
        columns={COLUMNS}
        data={memoizedRequest}
        isLoadingData={isLoadingConfirmed}
      />

      <ToastContainer />
    </div>
  );
};

export default RequestConfirmedOrCancelPage;