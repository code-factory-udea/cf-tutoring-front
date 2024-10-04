import { EditRole } from "@components/EditRole";
import { InfoProfessor } from "@components/InfoProfessor";
import { Modal } from "@components/Modal";
import { useQueryProfessor } from "@hooks/queries";
import { useModal } from "@hooks/useModal";
import { SearchBar } from "@ui/SearchBar";
import { Table } from "@ui/Table";
import { useEffect, useMemo, useState } from "react";
import { useInView } from "react-intersection-observer";

const COLUMNS = ["ID", "Nombre", "Usuario", "Rol"];

const TeacherPage = () => {
  const { isOpen, openModal, closeModal } = useModal();
  const [selectedProfessor, setSelectedProfessor] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const {
    data: professors,
    isPending,
    isFetching,
    handleChangeInView,
  } = useQueryProfessor({ page: 1, name: searchQuery });
  const { ref: refBottom } = useInView({
    threshold: 0,
    onChange: handleChangeInView,
  });

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setSearchQuery(searchQuery);
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  const memoizedProfessors = useMemo(() => {
    if (!professors) return [];
    const allProfessors = professors.pages.flatMap((page) => page.userList);

    return allProfessors.map((professor, index) => {
      return [
        index + 1,
        <p>{professor.name}</p>,
        <strong>{professor.username}</strong>,
        <EditRole role={professor.role} username={professor.username} />,
      ];
    });
  }, [professors]);

  const onSearch = (searchTerm: string) => {
    setSearchQuery(searchTerm);
  };

  const handleRowClick = (row) => {
    const username = row[2].props.children;
    setSelectedProfessor(username);
   openModal();
  };

  return (
    <>
    <div className="flex flex-col gap-4">
      <SearchBar onSearch={onSearch} placeholder="Buscar Profesores" />
      <Table
        columns={COLUMNS}
        data={memoizedProfessors}
        onRowClick={handleRowClick} 
        isLoadingData={isPending}
      />
      <div ref={refBottom} className="w-full py-1" />
      {isFetching && (
        <p className="text-center text-primary-green text-xl font-bold">
          Buscando...
        </p>
      )}
    </div>
    <Modal isOpen={isOpen} title="Información del profesor">
      <InfoProfessor username={selectedProfessor} close={closeModal} />
    </Modal>

    </>
  );
};

export default TeacherPage;
