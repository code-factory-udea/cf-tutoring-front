import { EditRole } from "@components/EditRole";
import { useQueryUndefined } from "@hooks/queries";
import { SearchBar } from "@ui/SearchBar";
import { Table } from "@ui/Table";
import { useEffect, useMemo, useState } from "react";
import { useInView } from "react-intersection-observer";

const COLUMNS = ["ID", "Nombre", "Usuario", "Rol"];

const UndefinedPage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const { undefineds, isFetching, handleChangeInView } = useQueryUndefined({
    page: 1,
    name: searchQuery,
  });

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

  const memoizedUsers = useMemo(() => {
    if (!undefineds) return [];
    return undefineds.map((user, index) => [
      index + 1,
      <p>{user.name}</p>,
      <strong>{user.username}</strong>,
      <EditRole role={user.role} username={user.username} />,
    ]);
  }, [undefineds]);

  const onSearch = (searchTerm: string) => {
    setSearchQuery(searchTerm);
  };

  return (
    <div className="flex flex-col gap-4">
      <SearchBar
        onSearch={onSearch}
        placeholder="Buscar Usuarios Indefinidos"
      />
      <Table
        columns={COLUMNS}
        data={memoizedUsers}
        isLoadingData={isFetching}
      />
      <div ref={refBottom} className="w-full py-1" />
      {isFetching && (
        <p className="text-center text-primary-green text-xl font-bold">
          Buscando...
        </p>
      )}
    </div>
  );
};

export default UndefinedPage;
