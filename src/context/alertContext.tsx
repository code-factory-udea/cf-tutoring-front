import { createContext, ReactNode, useContext, useState } from "react";
import Alert from "../components/Alert";

type AlertType = "success" | "error" | "info";

interface AlertContextProps {
  showAlert: (type: AlertType, message: string, duration?: number) => void;
}

const AlertContext = createContext<AlertContextProps | undefined>(undefined);

export const AlertProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [alert, setAlert] = useState<{
    type: AlertType;
    message: string;
  } | null>(null);

  const showAlert = (type: AlertType, message: string, duration = 5000) => {
    setAlert({ type, message });
    setTimeout(() => {
      setAlert(null);
    }, duration);
  };

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      {alert && <Alert type={alert.type} message={alert.message} />}
    </AlertContext.Provider>
  );
};

export const useAlert = (): AlertContextProps => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error("useAlert must be used within an AlertProvider");
  }
  return context;
};
