import { useQueryProfessorByUsername } from "@hooks/queries";

import { useMutationDeleteSubjectProfessor } from "@hooks/mutations";
import { useState } from "react";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { AddSubjectForm } from "./AddSubject";

interface InfoProfessorProps {
  username: string;
  close: () => void;
}

export const InfoProfessor = ({ username, close }: InfoProfessorProps) => {
  const { data: professor } = useQueryProfessorByUsername(username);
  const { mutateAsync: deleteSubject } = useMutationDeleteSubjectProfessor();

  const [isAddingSubject, setIsAddingSubject] = useState<boolean>(false);
  const handleDelete = async (id: number) => {
    await deleteSubject({ idProfessor: id });
  };
  return (
    <div className=" space-y-2">
      <h2 className="text-md font-semibold text-dark uppercase italic">
        {professor?.name}
      </h2>
      <h2 className="text-md font-semibold text-dark">Materias Asignadas:</h2>
      <div className="max-h-64 overflow-y-scroll px-4 py-1">
        {professor?.professorSubjectInfoDTO.map((subject) => (
          <div>
            <span className="flex justify-between">
              <span className="text-sm flex flex-col text-dark/60 font-semibold">
                <li className="text-left">{subject.subjectInfo}</li>
                <p className="italic text-xs">
                  &nbsp; &nbsp; &nbsp;{subject.academicProgramInfo}
                </p>
              </span>
              <button
                className="hover:text-red-500"
                title="Eliminar materia del profesor"
                onClick={() => handleDelete(subject.idProfessor)}
              >
                <RiDeleteBin6Fill className="text-dark/60 hover:text-red-500 text-lg" />
              </button>
            </span>
            <br />
          </div>
        ))}
      </div>
      <button
        className="px-4 py-2 bg-primary-green text-white rounded-lg text-sm"
        onClick={() => setIsAddingSubject(!isAddingSubject)}
      >
        {isAddingSubject ? "Ocultar Formulario" : "Agregar Materia"}
      </button>
      {isAddingSubject && <AddSubjectForm username={username} />}
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
