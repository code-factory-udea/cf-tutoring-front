import { Link, useLocation } from "react-router-dom";

interface ItemProps {
  icon: JSX.Element;
  title: string;
  route: string;
}

export const ItemSidebar = ({ icon, title, route }: ItemProps) => {
  const location = useLocation();
  const isActive = location.pathname === route;

  return (
    <li>
      <Link
        to={route}
        className={`items-center p-2 text-base flex font-normal text-light rounded-lg ${
          isActive ? "bg-primary-green text-white" : "hover:bg-primary-green"
        }`}
      >
        <span className="me-3">{icon}</span>
        {title}
      </Link>
    </li>
  );
};
