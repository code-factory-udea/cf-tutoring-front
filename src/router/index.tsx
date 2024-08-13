import { createBrowserRouter } from 'react-router-dom'
import HomePage from '../pages/home.page'
import { Login } from '../components/login.component'
import MainLayout from '../pages/mainLayout'

const router = createBrowserRouter(
    [
        {
            path: '/',
            element: <MainLayout />,
            children: [
                {
                    index: true,
                    element: <HomePage />,
                },
                { path: 'home', element: <HomePage /> },
                {
                    path: 'login',
                    element: <Login />,
                },
            ],
        },
    ]
    // createRoutesFromElements(
    //     <Route path="/" element={<Sidebar />}>
    //         <Route index element={<HomePage />} />
    //         <Route path="/login" element={<Login />} />
    //         <Route path="/home" element={<HomePage />} />
    //     </Route>
    // )
)

export default router