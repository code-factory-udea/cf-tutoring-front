import { Navigate } from "react-router-dom";
import { isTokenExpired } from "../utils/tokenExpired";

const isAuthenticated = () => {
  const token = localStorage.getItem("authToken");
  return !!token && !isTokenExpired();
};

const PrivateRoute = ({ element }: { element: React.ReactElement }) => {
  return isAuthenticated() ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
