interface AlertProps {
  type: "success" | "error" | "info";
  message: string;
}

const Alert = ({ type, message }: AlertProps) => {
  const alertStyles = {
    success: "bg-green-500 text-white",
    error: "bg-red-500 text-white",
    info: "bg-blue-500 text-white",
  };

  return (
    <div
      className={`fixed top-4 right-4 p-4 rounded-md ${alertStyles[type]} border shadow-lg z-50`}
    >
      {message}
    </div>
  );
};

export default Alert;
