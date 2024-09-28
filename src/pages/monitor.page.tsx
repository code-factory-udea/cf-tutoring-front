import { EditRole } from "@components/EditRole";
import { useQueryMonitors } from "@hooks/queries";
import { SearchBar } from "@ui/SearchBar";
import { Table } from "@ui/Table";
import { useEffect, useMemo, useState } from "react";
import { useInView } from "react-intersection-observer";

const COLUMNS = ["ID", "Nombre", "Usuario", "Rol"];

const MonitorPage = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
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
        <EditRole role={monitor.role} username={monitor.username} />,
      ];
    });
  }, [monitors]);

  const onSearch = (searchTerm: string) => {
    setSearchQuery(searchTerm);
  };

  const handleRowClick = (index: number) => {
    console.log("Row clicked:", index);
  };

  return (
    <div className="flex flex-col gap-4">
      <SearchBar onSearch={onSearch} placeholder="Buscar Monitores" />
      <Table
        columns={COLUMNS}
        data={memoizedMonitors}
        onRowClick={handleRowClick}
        isLoadingData={isPending}
      />
      <div ref={refBottom} className="w-full py-1" />
      {isFetching && <p className="text-center text-primary-green text-xl font-bold">Buscando...</p>}
    </div>
  );
};

export default MonitorPage;
