import { useQueryProfessorByUsername, useQuerySubjects } from "@hooks/queries";
import { Dropdown } from "@ui/Dropdown";

interface InfoProfessorProps {
  username: string;
  close: () => void;
}

export const InfoProfessor = ({ username, close }: InfoProfessorProps) => {
  const { data: professor } = useQueryProfessorByUsername(username);
  const { data: subjects } = useQuerySubjects(504);
    return (
    <div>
      <h2 className="text-md font-semibold text-dark/60">{professor?.name}</h2>
      <h2 className="text-md font-semibold text-dark/60">
        {professor?.professorSubjectInfoDTO[0].accademicProgramInfo}
      </h2>
      <h2>Programa Academico</h2>
      <button className="px-4 py-2 bg-primary-green text-white rounded-lg">
        Agregar Materia
      </button>
      <Dropdown
        options={professor?.professorSubjectInfoDTO.map((subject) => ({
          label: subject.subjectInfo,
          value: subject.subjectInfo,
        }))}
        placeholder="Seleccione una materia"
        onSelect={() => {}}
      />
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
