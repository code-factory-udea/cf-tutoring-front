import { ItemSidebar } from "@ui/ItemSidebar";
import {
  FaCalendarCheck,
  FaChalkboardTeacher,
  FaRegCalendarAlt,
} from "react-icons/fa";
import { FaChalkboardUser, FaUserGroup } from "react-icons/fa6";
import { GoHome } from "react-icons/go";
import { IoMdJournal } from "react-icons/io";
import {
  MdAirlineSeatReclineExtra,
  MdCancelPresentation,
  MdFactCheck,
  MdHomeWork,
  MdOutlineComment,
  MdOutlineFreeCancellation,
  MdOutlineLibraryBooks,
  MdOutlinePendingActions,
} from "react-icons/md";
import { PiUsersFourFill } from "react-icons/pi";

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
    case "Estudiante":
      return (
        <>
          <ItemSidebar
            icon={<FaChalkboardTeacher />}
            title="Solicitar Tutoría"
            route="/solicitar-tutoria"
          />
          <ItemSidebar
            icon={<MdAirlineSeatReclineExtra />}
            title="Solicitudes en espera"
            route="/tutorias-en-espera"
          />
          <ItemSidebar
            icon={<MdCancelPresentation />}
            title="Solicitudes rechazadas"
            route="/tutorias-canceladas"
          />
          <ItemSidebar
            icon={<MdFactCheck />}
            title="Solicitudes confirmadas"
            route="/tutorias-confirmadas-o-cancelar"
          />
          <ItemSidebar
            icon={<MdOutlineComment />}
            title="Historial y calificación de solicitudes"
            route="/tutorias-calificar-historial"
          />
        </>
      );
    case "Profesor":
      return (
        <>
          <ItemSidebar
            icon={<PiUsersFourFill />}
            title="Mis monitores"
            route="/monitores"
          />
        </>
      );
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
            icon={<MdCancelPresentation />}
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
