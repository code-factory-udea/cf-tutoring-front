import { Navigate } from "react-router-dom";

const isAuthenticated = () => {
  return !!localStorage.getItem("authToken"); 
};

const PrivateRoute = ({ element }: { element: React.ReactElement }) => {
  return isAuthenticated() ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
