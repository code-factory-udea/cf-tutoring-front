import {
  useMutationCreateSubjectTutor,
  useMutationSubjectProfessor,
} from "@hooks/mutations";
import {
  useQueryAcademicPrograms,
  useQueryFaculties,
  useQuerySubjects,
} from "@hooks/queries";
import { Dropdown } from "@ui/Dropdown";
import { useMemo, useState } from "react";

interface AddSubjectFormProps {
  username: string;
  user: "professor" | "tutor";
}

export const AddSubjectForm = ({ username, user }: AddSubjectFormProps) => {
  const { data: faculties } = useQueryFaculties();
  const { mutateAsync: addSubjectProfessor } = useMutationSubjectProfessor();
  const { mutateAsync: addSubjectTutor } = useMutationCreateSubjectTutor();
  const [selectedAcademicProgram, setSelectedAcademicProgram] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const [selectedFaculty, setSelectedFaculty] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<{
    id: string;
    name: string;
  } | null>(null);

  const { data: academicPrograms } = useQueryAcademicPrograms(
    Number(selectedFaculty?.id),
  );
  const { data: subjects } = useQuerySubjects(
    Number(selectedAcademicProgram?.id),
  );

  const memoizedFaculties = useMemo(() => {
    if (!faculties) return [];
    return faculties.map((faculty) => ({
      value: faculty.id,
      label: faculty.name,
    }));
  }, [faculties]);

  const memoizedAcademicProgram = useMemo(() => {
    if (!academicPrograms) return [];
    return academicPrograms.map((academic) => ({
      value: academic.id,
      label: academic.name,
    }));
  }, [academicPrograms]);

  const memoizedSubjects = useMemo(() => {
    if (!subjects) return [];
    return subjects.map((subject) => ({
      value: String(subject.code),
      label: subject.name,
    }));
  }, [subjects]);

  const handleSelectFaculty = (selectedOption: {
    value: string;
    label: string;
  }) => {
    setSelectedFaculty({
      id: selectedOption.value,
      name: selectedOption.label,
    });
  };
  const handleSelectAcademicProgram = (selectedOption: {
    value: string;
    label: string;
  }) => {
    setSelectedAcademicProgram({
      id: selectedOption.value,
      name: selectedOption.label,
    });
  };

  const handleSelectSubjects = (selectedOption: {
    value: string;
    label: string;
  }) => {
    setSelectedSubject({
      id: selectedOption.value,
      name: selectedOption.label,
    });
  };
  const handleAddSubject = async () => {
    if (selectedSubject) {
      if (user === "tutor") {
        await addSubjectTutor({
          username,
          subjectCode: Number(selectedSubject.id),
        });
      }
      if (user === "professor") {
        await addSubjectProfessor({
          username,
          subjectCode: Number(selectedSubject.id),
        });
      }
    }
  };
  return (
    <section className="space-y-2">
      <p className="text-xs italic bg-yellow-100 px-2 rounded-md">
        Selecciona la Facultad, el programa académico y la materia para
        asignarle una materia al {user === "professor" ? "profesor" : "monitor"}
      </p>

      <div className="flex text-sm items-center gap-1 ">
        <Dropdown
          placeholder="Facultad"
          options={memoizedFaculties}
          onSelect={handleSelectFaculty}
        />
        {selectedFaculty && (
          <Dropdown
            placeholder="Programa académico"
            options={memoizedAcademicProgram}
            onSelect={handleSelectAcademicProgram}
          />
        )}
      </div>
      <div className="flex text-sm items-center gap-2">
        {selectedAcademicProgram && (
          <Dropdown
            placeholder="Materia"
            options={memoizedSubjects}
            onSelect={handleSelectSubjects}
          />
        )}
        {selectedSubject && (
          <button
            className="px-4 py-2 bg-primary-green text-white rounded-lg"
            onClick={handleAddSubject}
          >
            Agregar
          </button>
        )}
      </div>
    </section>
  );
};
