import { useQueryTutorByUsername } from "@hooks/queries";

interface InfoMonitorProps {
  username: string;
  close: () => void;
}

export const InfoMonitor = ({ username, close }: InfoMonitorProps) => {
  const { data: monitor } = useQueryTutorByUsername(username);
  console.log(monitor);
  return (
    <div>
      <h2 className="text-md font-semibold text-dark/60">{monitor?.name}</h2>
      <h2 className="text-md font-semibold text-dark/60">{monitor?.name}</h2>
      <h2>Programa Académico:</h2>
      <p>{monitor?.academicProgramInfo}</p>
      <h2>Materia asignada:</h2>
      <p>{monitor?.subjectInfo}</p>
      <div className="flex justify-end gap-2 mt-4">
        <button
          onClick={close}
          className="px-4 py-2 bg-primary-green/60 text-white rounded-lg"
        >
          Cancelar
        </button>
        <button className="px-4 py-2 bg-primary-green text-white rounded-lg">
          Confirmar
        </button>
      </div>
    </div>
  );
};
