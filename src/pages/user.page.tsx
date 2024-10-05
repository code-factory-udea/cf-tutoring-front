import { FaChalkboardTeacher, FaRegUser } from "react-icons/fa";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import { PiStudent } from "react-icons/pi";
import { RiAdminLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const UserPage = () => {
  const navigate = useNavigate();

  const menuItems = [
    { label: "Estudiantes", route: "/usuarios/estudiantes", icon: PiStudent },
    {
      label: "Monitores",
      route: "/usuarios/monitores",
      icon: LiaChalkboardTeacherSolid,
    },
    {
      label: "Profesores",
      route: "/usuarios/profesores",
      icon: FaChalkboardTeacher,
    },
    {
      label: "Administradores",
      route: "/usuarios/administradores",
      icon: RiAdminLine,
    },
    {
      label: "No identificados",
      route: "/usuarios/unidentified",
      icon: FaRegUser,
    },
  ];

  const itemClass = `
    flex bg-primary-green items-center justify-center 
    h-48 text-white text-2xl font-bold rounded-lg 
    transform transition-transform duration-400 
    hover:scale-105 hover:shadow-xl hover:bg-secondary-green 
    cursor-pointer 
  `;

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-8xl">
        {menuItems.map((item) => (
          <div
            key={item.label}
            className={itemClass}
            onClick={() => navigate(item.route)}
          >
            {item.icon && (
              <item.icon className="mr-2 text-5xl hover:text-8xl" />
            )}
            {item.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserPage;
