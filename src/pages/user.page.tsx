import { useNavigate } from "react-router-dom";

const UserPage = () => {
  const navigate = useNavigate();

  const menuItems = [
    { label: "Estudiantes", route: "/users/students" },
    { label: "Monitores", route: "/users/monitors" },
    { label: "Profesores", route: "/users/teachers" },
    { label: "Administradores", route: "/users/administrators" },
    { label: "No identificados", route: "/users/unidentified" },
  ];

  const handleNavigation = (route: string) => {
    navigate(route);
  };

  return (
    <div className=" w-full min-h-screen flex justify-center items-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-6 w-full max-w-4xl">
        {menuItems.map((item, index) => (
          <div
            key={index}
            className={`flex bg-secondary-green items-center justify-center h-48 text-white text-2xl font-bold rounded-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-xl hover:bg-primary-green cursor-pointer`}
            onClick={() => handleNavigation(item.route)}
          >
            {item.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserPage;
