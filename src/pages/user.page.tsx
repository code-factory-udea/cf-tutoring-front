import { useNavigate } from "react-router-dom";

const UserPage = () => {
  const navigate = useNavigate();

  const menuItems = [
    { label: "Estudiantes", route: "/usuarios/estudiantes" },
    { label: "Monitores", route: "/usuarios/monitores" },
    { label: "Profesores", route: "/usuarios/profesores" },
    { label: "Administradores", route: "/usuarios/administradores" },
    { label: "No identificados", route: "/usuarios/unidentified" },
  ];

  const itemClass = `
    flex bg-primary-green items-center justify-center 
    h-48 text-white text-2xl font-bold rounded-lg 
    transform transition-transform duration-400 
    hover:scale-105 hover:shadow-xl hover:bg-secondary-green 
    cursor-pointer
  `;

  return (
    <div className="w-full h-fit flex justify-center items-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-4xl">
        {menuItems.map((item) => (
          <div
            key={item.label} 
            className={itemClass}
            onClick={() => navigate(item.route)} 
          >
            {item.label}
          </div>
        ))}
      </div>
    </div>
    
  );
};

export default UserPage;
