import { EditRole } from "@components/EditRole";
import { SearchBar } from "@ui/SearchBar";
import { Table } from "@ui/Table";
import { useEffect, useMemo, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useQueryAdmins } from "../hooks/queries";

const COLUMNS = ["ID", "Nombre", "Usuario", "Rol"];

const AdminPage = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Hook para obtener administradores
  const {
    data: admins,
    isPending,
    isFetching,
    handleChangeInView,
  } = useQueryAdmins({ page: 1, name: searchQuery });

  // Hook para detectar el scroll
  const { ref: refBottom } = useInView({
    threshold: 0,
    onChange: handleChangeInView,
  });

  // Debounce para la búsqueda (espera 1 segundo antes de buscar)
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setSearchQuery(searchQuery);
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  // Memorizar datos de administradores
  const memoizedAdmins = useMemo(() => {
    if (!admins) return [];
    const allAdmins = admins.pages.flatMap((page) => page.userList);

    return allAdmins.map((admin, index) => {
      return [
        index + 1,
        <p>{admin.name}</p>,
        <strong>{admin.username}</strong>,
        <EditRole role={admin.role} username={admin.username} />, // Aquí puedes editar el rol si es necesario
      ];
    });
  }, [admins]);

  // Función de búsqueda
  const onSearch = (searchTerm: string) => {
    setSearchQuery(searchTerm);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Barra de búsqueda */}
      <SearchBar onSearch={onSearch} placeholder="Buscar Administradores" />

      {/* Tabla de administradores */}
      <Table
        columns={COLUMNS}
        data={memoizedAdmins}
        isLoadingData={isPending}
      />

      {/* Scroll para cargar más administradores */}
      <div ref={refBottom} className="w-full py-1" />

      {/* Indicador de búsqueda en curso */}
      {isFetching && (
        <p className="text-center text-primary-green text-xl font-bold">
          Buscando...
        </p>
      )}
    </div>
  );
};

export default AdminPage;
