import { ItemSidebar } from "@ui/ItemSidebar";
import { FaCalendarCheck, FaRegCalendarAlt } from "react-icons/fa";
import { FaChalkboardUser, FaUserGroup } from "react-icons/fa6";
import { GoHome } from "react-icons/go";
import { IoMdJournal } from "react-icons/io";
import {
  MdHomeWork,
  MdOutlineFreeCancellation,
  MdOutlineLibraryBooks,
  MdOutlinePendingActions,
} from "react-icons/md";

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
    case "Monitor":
      return (
        <>
          <ItemSidebar
            icon={<FaRegCalendarAlt />}
            title="Agenda"
            route="/agenda"
          />
          <ItemSidebar
            icon={<MdOutlinePendingActions />}
            title="Solicitudes Pendientes"
            route="/solicitudes-pendientes"
          />
          <ItemSidebar
            icon={<FaChalkboardUser />}
            title="Monitorias"
            route="/monitorias"
          />
          <ItemSidebar
            icon={<MdOutlineFreeCancellation />}
            title="Solicitudes Canceladas"
            route="/solicitudes-canceladas"
          />
          <ItemSidebar
            icon={<FaCalendarCheck />}
            title="Tutorias Realizadas"
            route="/tutorias-realizadas"
          />
        </>
      );

    default:
      return <ItemSidebar icon={<GoHome />} title="Home" route="/" />;
  }
};
