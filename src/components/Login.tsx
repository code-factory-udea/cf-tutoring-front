import { useMutationValidateUser } from "@hooks/mutations";
import { useLocalStorage } from "@hooks/useLocalStorage";
import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const { mutateAsync: validateUser } = useMutationValidateUser();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [authData, setAuthData] = useLocalStorage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const credentials = {
        username,
        password,
      };
      const response = await validateUser(credentials);
      if (response.token) {
        setAuthData(response.user, response.token);
        navigate("/");
      }
    } catch (err) {
      console.error("Error de autenticación:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row bg-gradient-to-r from-primary-green to-secondary-green h-screen">
      <div className="lg:flex-1 text-light flex flex-col justify-center items-center p-8 lg:p-12">
        <h1 className="text-3xl lg:text-4xl font-bold mb-2">
          Tutorías Académicas
        </h1>
        <p className="text-xl lg:text-2xl font-semibold mb-4">Bienvenid@!</p>
        <p className="mb-6 text-center max-w-xs lg:max-w-sm">
          Aplicación web para la gestión de espacios de asesoría, mentoring y
          apoyo que dan los monitores a los diferentes cursos
        </p>
      </div>

      <div className="lg:flex-1 flex flex-col justify-center items-center rounded-none lg:mr-20 lg:mt-20 bg-light p-8 lg:p-12 lg:rounded-t-3xl shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-dark">Bienvenid@</h2>
        <p className="text-dark/50 mb-8 text-center">
          Vamos a iniciar sesión con la misma cuenta del LIS
        </p>

        <form className="w-full max-w-sm" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            className="w-full p-3 mb-4 border focus:outline-none border-secondary-green/20 shadow-inner rounded-lg "
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <div className="relative w-full mb-4">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full p-3 border focus:outline-none border-secondary-green/20 shadow-inner rounded-lg "
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-3   flex items-center cursor-pointer text-xl text-gray-400"
            >
              {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
            </span>
          </div>
          <a
            href="https://lis.udea.edu.co/forgotpassword"
            className="text-primary-green text-sm mb-4 block text-right"
            target="_blank"
            rel="noopener noreferrer"
          >
            ¿Olvidaste la contraseña?
          </a>
          <button
            type="submit"
            className="w-full bg-primary-green text-light hover:bg-secondary-green shadow-xl  py-3 rounded-lg font-semibold mb-6"
          >
            {isLoading ? "Cargando..." : "Iniciar Sesión"}
          </button>
        </form>

        <p className="text-gray-500 mt-6 text-center">
          No tienes cuenta?{" "}
          <a
            href="https://lis.udea.edu.co/signup"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-green font-semibold"
          >
            Registrate!
          </a>
        </p>
      </div>
    </div>
  );
};
