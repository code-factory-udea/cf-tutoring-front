import { ItemSidebar } from "@ui/ItemSidebar";
import { FaChalkboardUser, FaUserGroup } from "react-icons/fa6";
import { GoHome } from "react-icons/go";
import { IoMdJournal } from "react-icons/io";
import { MdHomeWork, MdOutlineLibraryBooks } from "react-icons/md";

interface SidebarMenuItemsProps {
  role: string;
}

export const SidebarMenuItems = ({ role }: SidebarMenuItemsProps) => {
  switch (role) {
    case "Administrador":
      return (
        <>
          <ItemSidebar icon={<GoHome />} title="Home" route="/" />
          <ItemSidebar
            icon={<FaUserGroup />}
            title="Usuarios"
            route="/usuarios"
          />
          <ItemSidebar
            icon={<MdHomeWork />}
            title="Facultades"
            route="/facultades"
          />
          <ItemSidebar
            icon={<IoMdJournal />}
            title="Programas Académicos"
            route="/programas"
          />
          <ItemSidebar
            icon={<MdOutlineLibraryBooks />}
            title="Materias"
            route="/materias"
          />
          <ItemSidebar
            icon={<FaChalkboardUser />}
            title="Monitorias"
            route="/monitorias"
          />
        </>
      );
    case "student":
      return <ItemSidebar icon={<GoHome />} title="Home" route="/" />;
    case "teacher":
    default:
      return <ItemSidebar icon={<GoHome />} title="Home" route="/" />;
  }
};
