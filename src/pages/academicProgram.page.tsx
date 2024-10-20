import { Modal } from "@components/Modal";
import { useAlert } from "@context/alertContext";
import {
  useMutationCreateAcademicProgram,
  useMutationUpdateAcademicProgram,
} from "@hooks/mutations";
import { useQueryAcademicPrograms, useQueryFaculties } from "@hooks/queries";
import { useModal } from "@hooks/useModal";
import Button from "@ui/Button";
import { Dropdown } from "@ui/Dropdown";
import { InputText } from "@ui/InputText";
import { Table } from "@ui/Table";
import { useMemo, useState } from "react";
import { FaBook } from "react-icons/fa";
import { HiAcademicCap } from "react-icons/hi2";

const COLUMNS = ["ID", "Nombre"];

const AcademicProgramPage = () => {
  const { data: faculties } = useQueryFaculties();
  const { mutateAsync: createAcademicProgram } =
    useMutationCreateAcademicProgram();
  const { mutateAsync: updateAcademicProgram } =
    useMutationUpdateAcademicProgram();
  const { isOpen, openModal, closeModal } = useModal();
  const { showAlert } = useAlert();
  const [academicName, setAcademicName] = useState<string>("");
  const [programCode, setProgramCode] = useState<string>("");
  const [selectedFaculty, setSelectedFaculty] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const [modalType, setModalType] = useState<"create" | "edit" | null>(null);

  const { data: academicPrograms } = useQueryAcademicPrograms(
    Number(selectedFaculty?.id),
  );

  const memoizedAcademicPrograms = useMemo(() => {
    if (!academicPrograms) return [];
    return academicPrograms.map((academic) => {
      return [<p>{academic.id}</p>, <p>{academic.name}</p>];
    });
  }, [academicPrograms]);

  const memoizedFaculties = useMemo(() => {
    if (!faculties) return [];
    return faculties.map((faculty) => ({
      value: faculty.id,
      label: faculty.name,
    }));
  }, [faculties]);

  const handleSelect = (selectedOption: { value: string; label: string }) => {
    setSelectedFaculty({
      id: selectedOption.value,
      name: selectedOption.label,
    });
  };

  const handleConfirm = async () => {
    if (academicName.trim() === "" || programCode.trim() === "") {
      showAlert("info", "No pueden quedar campos vacíos");
      return;
    }

    const payload = {
      id: Number(programCode),
      name: academicName,
      facultyId: Number(selectedFaculty?.id),
    };

    const mutation =modalType === "create" ? createAcademicProgram : updateAcademicProgram;

    await mutation(payload);
    resetForm();
    closeModal();
  };

  function handleRowClick(row) {
    const id = row[0].props.children;
    const name = row[1].props.children;

    openEditModal({ id, name });
  }

  function openEditModal(program: { id: string; name: string }) {
    setProgramCode(String(program.id));
    setAcademicName(program.name);
    setModalType("edit");
    openModal();
  }

  function openCreateModal() {
    if (!selectedFaculty) {
      showAlert("info", "Seleccione una facultad para continuar");
      return;
    }
    setModalType("create");
    openModal();
  }

  function resetForm() {
    setAcademicName("");
    setProgramCode("");
  }

  return (
    <div className="flex flex-col gap-4 w-full">
      <p className="bg-secondary-green/30 w-fit px-2 py-1 rounded-md text-sm">
        Explora la lista de programas académicos disponibles y agrega nuevos
        programas fácilmente.
      </p>
      <h2 className="text-2xl font-bold">Seleccione una facultad </h2>
      <div className="w-1/2">
        <Dropdown
          placeholder="Seleccione una Facultad"
          options={memoizedFaculties}
          onSelect={handleSelect}
        />
      </div>

      {selectedFaculty && (
        <div className="w-1/2 flex">
          <Button
            label="Agregar Programa Académico"
            onClick={openCreateModal}
          />
        </div>
      )}
      {selectedFaculty && (
        <>
          <p className="bg-yellow-100 w-fit px-2 py-1 rounded-md text-sm italic">
            Para editar un programa académico, seleccione el programa que desea
            editar y haga clic en el botón de "confirmar".
          </p>
          <Table
            columns={COLUMNS}
            data={memoizedAcademicPrograms}
            isLoadingData={false}
            onRowClick={handleRowClick}
          />
        </>
      )}
      <Modal
        isOpen={isOpen}
        title={
          modalType === "create"
            ? "Crear un programa académico"
            : "Editar programa académico"
        }
      >
        <h2 className="text-md font-semibold text-dark/60">
          Facultad: {selectedFaculty?.name}
        </h2>

        <InputText
          placeholder="Ingrese el código del programa académico"
          icon={<FaBook />}
          label="Código del programa académico"
          name="programCode"
          value={programCode}
          required
          onChange={(e) => setProgramCode(e.target.value)}
          disabled={modalType === "edit"} 
        />

        <InputText
          placeholder="Ingrese el nombre del programa académico"
          icon={<HiAcademicCap />}
          label="Nombre del programa académico"
          name="programName"
          value={academicName}
          required
          onChange={(e) => setAcademicName(e.target.value)}
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

export default AcademicProgramPage;
