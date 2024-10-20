import { Modal } from "@components/Modal";
import { useAlert } from "@context/alertContext";
import {
  useMutationCreateSubject,
  useMutationUpdateSubject,
} from "@hooks/mutations";
import {
  useQueryAcademicPrograms,
  useQueryFaculties,
  useQuerySubjects,
} from "@hooks/queries";
import { useModal } from "@hooks/useModal";
import Button from "@ui/Button";
import { Dropdown } from "@ui/Dropdown";
import { InputText } from "@ui/InputText";
import { Table } from "@ui/Table";
import { useMemo, useState } from "react";
import { FaBook } from "react-icons/fa";

const COLUMNS = ["Código", "Nombre"];

const SubjectPage = () => {
  const { isOpen, openModal, closeModal } = useModal();
  const { showAlert } = useAlert();
  const [subject, setSubject] = useState<string>("");
  const [subjectCode, setSubjectCode] = useState<string>("");
  const [modalType, setModalType] = useState<"create" | "edit" | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<{
    code: number;
    name: string;
  } | null>(null);

  const { data: faculties } = useQueryFaculties();
  const { mutateAsync: createSubject } = useMutationCreateSubject();
  const { mutateAsync: updateSubject } = useMutationUpdateSubject();

  const [selectedAcademicProgram, setSelectedAcademicProgram] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const [selectedFaculty, setSelectedFaculty] = useState<{
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

  const handleSelect =
    (
      setter: React.Dispatch<
        React.SetStateAction<{ id: string; name: string } | null>
      >,
    ) =>
    (option: { value: string; label: string }) => {
      setter({ id: option.value, name: option.label });
    };

  function resetForm() {
    setSubject("");
    setSubjectCode("");
    setSelectedSubject(null);
  }

  const handleConfirm = async () => {
    if (!subject.trim() || !subjectCode.trim()) {
      showAlert(
        "info",
        "El nombre y el código de la materia no pueden estar vacíos",
      );
      return;
    }

    const payload = {
      code: modalType === "edit" ? selectedSubject.code : Number(subjectCode),
      name: subject,
      ...(modalType === "create" && {
        academicProgramId: Number(selectedAcademicProgram?.id),
      }),
      ...(modalType === "edit" && { newCode: Number(subjectCode) }),
    };

    const mutation = modalType === "create" ? createSubject : updateSubject;

    await mutation(payload);
    showAlert(
      "success",
      modalType === "create"
        ? "Materia creada con éxito"
        : "Materia actualizada con éxito",
    );

    resetForm();
    closeModal();
  };

  const handleCreateSubject = () => {
    if (!selectedFaculty || !selectedAcademicProgram) {
      showAlert(
        "info",
        "Seleccione una facultad y un programa académico para continuar",
      );
      return;
    }
    setModalType("create");
    openModal();
  };

  function openEditModal(subject) {
    setSelectedSubject(subject);
    setSubject(subject.name);
    setSubjectCode(String(subject.code));
    setModalType("edit");
    openModal();
  }

  const memoizedSubjects = useMemo(() => {
    if (!subjects) return [];

    return subjects.map((subject) => {
      return [<p>{subject.code}</p>, <p>{subject.name}</p>];
    });
  }, [subjects]);

  const handleRowClick = (row) => {
    const code = row[0].props.children;
    const name = row[1].props.children;

    openEditModal({ code, name });
  };

  return (
    <div className="flex flex-col gap-3 w-full">
      <p className="bg-secondary-green/30 w-fit px-2 py-1 rounded-md text-sm">
        Explora la lista de materias disponibles seleccionando una facultad y un
        programa académico.
      </p>
      <h2 className="text-xl font-bold">Seleccione una facultad </h2>
      <div className="w-1/2">
        <Dropdown
          placeholder="Seleccione una Facultad"
          options={memoizedFaculties}
          onSelect={handleSelect(setSelectedFaculty)}
        />
      </div>
      {selectedFaculty && (
        <div className="w-1/2 space-y-3">
          <h2 className="text-xl font-bold">
            Seleccione un programa académico
          </h2>
          <Dropdown
            placeholder="Seleccione un programa académico"
            options={memoizedAcademicProgram}
            onSelect={handleSelect(setSelectedAcademicProgram)}
          />
        </div>
      )}

      {selectedAcademicProgram && selectedFaculty && (
        <div className="w-1/2 flex">
          <Button label="Agregar Una Materia" onClick={handleCreateSubject} />
        </div>
      )}
      {selectedAcademicProgram && selectedFaculty && (
        <>
          <p className="bg-yellow-100 w-fit px-2 py-1 rounded-md text-sm italic">
            Para editar una materia, seleccione la materia que desea editar y
            haga clic en el botón de editar.
          </p>
          <Table
            columns={COLUMNS}
            data={memoizedSubjects}
            isLoadingData={false}
            onRowClick={handleRowClick}
          />
        </>
      )}
      <Modal
        isOpen={isOpen}
        title={modalType === "create" ? "Crear una materia" : "Editar materia"}
      >
        <h2 className="text-md font-semibold text-dark/60">
          Facultad: {selectedFaculty?.name}
        </h2>
        <h2 className="text-md font-semibold text-dark/60">
          Programa Académico: {selectedAcademicProgram?.name}
        </h2>
        <InputText
          placeholder="Ingrese el codigo de la materia"
          icon={<FaBook />}
          label="Código de la materia"
          name="subjectCode"
          value={subjectCode}
          required
          onChange={(e) => setSubjectCode(e.target.value)}
        />

        <InputText
          placeholder="Ingrese el nombre de la materia"
          icon={<FaBook />}
          label="Nombre de la materia"
          name="faculty"
          value={subject}
          required
          onChange={(e) => setSubject(e.target.value)}
        />

        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={closeModal}
            className="px-4 py-2 bg-primary-green/60 text-white rounded-lg"
          >
            Cancelar
          </button>
          <button
            onClick={handleConfirm}
            className="px-4 py-2 bg-primary-green text-white rounded-lg"
          >
            Confirmar
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default SubjectPage;
