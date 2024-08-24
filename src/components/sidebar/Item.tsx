import { Link } from "react-router-dom";

interface ItemProps {
  icon: string;
  title: string;
  active: boolean;
  route: string;
}

export const ItemSidebar = ({ icon, title, active, route }: ItemProps) => {
  return (
    <li>
      <Link
        to={route}
        className="items-center p-2 text-base flex font-normal text-light rounded-lg  hover:bg-primary-green"
      >
        <img src={icon} alt="Home" className="w-6 h-6 me-3" />
        {title}
      </Link>
    </li>
  );
};
