import { useLocalStorage } from "@hooks/useLocalStorage";
const HomePage = () => {
  const [authData] = useLocalStorage();

  return (
    <main>
      <p className="text-6xl text-primary-green font-bold">
        Hola {authData.user.name} !!
      </p>
      <p className="text-4xl text-primary-green/50 font-semibold mt-2">
        Bienvenid@ a la gestión de tutorías académicas
      </p>
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-2 mt-4">
        <img
          className="sm:w-1/2 sm:h-1/2"
          src="./src/assets/image1.jpg"
          alt="tutoring"
        />
        <img
          className="sm:w-1/2 sm:h-1/2"
          src="./src/assets/image2.jpg"
          alt="tutoring"
        />
      </div>
      <p className="mt-4 text-base sm:text-lg text-primary-green/80 text-center font-semibold">
        En el menú lateral izquierdo podrás encontrar las diferentes opciones
        para gestionar las tutorías académicas
      </p>
    </main>
  );
};

export default HomePage;
