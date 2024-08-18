import { Link } from 'react-router-dom'

interface ItemProps {
    icon: string
    title: string
    active: boolean
    route: string
}

export const ItemSidebar = ({ icon, title, active, route }: ItemProps) => {
    return (
        <li>
            <Link
                to={route}
                className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            >
                <img src={icon} alt="Home" className="w-6 h-6 me-3" />
                {title}
            </Link>
        </li>
    )
}
