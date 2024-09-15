import { useState } from "react";

interface UserMenuProps {
  userInitials: string;
  user: { name: string; username: string };
  onLogout: () => void;
}

export const UserMenu: React.FC<UserMenuProps> = ({
  userInitials,
  user,
  onLogout,
}) => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={toggleUserMenu}
        className="transition ease-in-out duration-300 hover:-translate-y-1 hover:scale-105 bg-primary-green rounded-full p-2"
      >
        <div className="w-8 h-8 rounded-full bg-light-green flex items-center justify-center text-dark font-bold">
          {userInitials}
        </div>
      </button>

      {isUserMenuOpen && (
        <div className="absolute right-0 mt-2 w-48 py-2 bg-secondary-green rounded-md shadow-lg">
          <div className="px-4 py-3">
            <p className="text-sm">{user.name}</p>
            <p className="text-sm font-medium truncate">{`${user.username}@udea.edu.co`}</p>
          </div>
          <ul className="py-1">
            <li>
              <button
                onClick={onLogout}
                className="block px-4 py-2 text-sm w-full text-left text-light hover:bg-primary-green hover:text-white"
              >
                Cerrar Sesión
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};
