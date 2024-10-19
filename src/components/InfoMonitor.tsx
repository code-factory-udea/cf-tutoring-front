import { useMutationDeleteSubjectTutor } from "@hooks/mutations";
import { useQueryTutorByUsername } from "@hooks/queries";
import { useState } from "react";
import { AddSubjectForm } from "./AddSubject";

interface InfoMonitorProps {
  username: string;
  close: () => void;
}

export const InfoMonitor = ({ username, close }: InfoMonitorProps) => {
  const [isAddingSubject, setIsAddingSubject] = useState<boolean>(false);
  const { mutateAsync: deleteSubject } = useMutationDeleteSubjectTutor();
  const { data: monitor } = useQueryTutorByUsername(username);

  const handleDelete = async (idTutor: number) =>
    await deleteSubject({ id: idTutor });

  return (
    <div className=" space-y-2">
      <h2 className="text-md font-semibold text-dark uppercase italic">
        {monitor?.name}
      </h2>
      <div>
        <h2>Programa Académico:</h2>
        <p className="italic">{monitor?.academicProgramInfo}</p>
      </div>
      <div>
        <h2>Materia asignada:</h2>
        <p className="italic">{monitor?.subjectInfo}</p>
      </div>
      <div className="flex justify-between">
        <button
          className="px-4 py-2 bg-primary-green text-white rounded-lg text-sm"
          onClick={() => setIsAddingSubject(!isAddingSubject)}
        >
          {isAddingSubject
            ? "Ocultar Formulario"
            : monitor?.id == null
              ? "Asignar Materia"
              : "Cambiar Materia"}
        </button>
        {!isAddingSubject && monitor?.id != null && (
          <button
            className="px-4 py-2 bg-primary-green text-white rounded-lg text-sm"
            title="Eliminar materia del monitor"
            onClick={() => handleDelete(monitor?.id)}
          >
            Eliminar Materia
          </button>
        )}
      </div>
      {isAddingSubject && <AddSubjectForm username={username} user="tutor" />}
      <div className="flex justify-center gap-2 mt-4">
        <button
          onClick={close}
          className="px-4 py-2 bg-primary-green/60 text-white rounded-lg"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};
