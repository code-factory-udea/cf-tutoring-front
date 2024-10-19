import { EditRole } from "@components/EditRole";
import { InfoMonitor } from "@components/InfoMonitor";
import { Modal } from "@components/Modal";
import { useQueryMonitors } from "@hooks/queries";
import { useModal } from "@hooks/useModal";
import { SearchBar } from "@ui/SearchBar";
import { Table } from "@ui/Table";
import { useEffect, useMemo, useState } from "react";
import { useInView } from "react-intersection-observer";

const COLUMNS = ["ID", "Nombre", "Usuario", "Rol"];

const MonitorPage = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { isOpen, openModal, closeModal } = useModal();
  const [selectedMonitor, setselectedMonitor] = useState<string>("");
  const {
    data: monitors,
    isPending,
    isFetching,
    handleChangeInView,
  } = useQueryMonitors({ page: 1, name: searchQuery });
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

  const memoizedMonitors = useMemo(() => {
    if (!monitors) return [];
    const allMonitors = monitors.pages.flatMap((page) => page.userList);

    return allMonitors.map((monitor, index) => {
      return [
        index + 1,
        <p>{monitor.name}</p>,
        <strong>{monitor.username}</strong>,
        <div onClick={(e) => e.stopPropagation()}>
          <EditRole role={monitor.role} username={monitor.username} />
        </div>,
      ];
    });
  }, [monitors]);

  const onSearch = (searchTerm: string) => {
    setSearchQuery(searchTerm);
  };

  const handleRowClick = (row) => {
    const username = row[2].props.children;
    setselectedMonitor(username);
    openModal();
  };

  return (
    <>
      <div className="flex flex-col gap-4">
        <SearchBar onSearch={onSearch} placeholder="Buscar Monitores" />
        <Table
          columns={COLUMNS}
          data={memoizedMonitors}
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
      <Modal isOpen={isOpen} title="Información del monitor">
        <InfoMonitor username={selectedMonitor} close={closeModal} />
      </Modal>
    </>
  );
};

export default MonitorPage;
