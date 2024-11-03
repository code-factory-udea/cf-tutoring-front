import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import "react-toastify/dist/ReactToastify.css";

interface CustomAlertProps {
  title: string;
  message: string;
  onConfirm: () => void;
}

export const ConfirmAlert = ({ title, message, onConfirm }: CustomAlertProps) => {
  confirmAlert({
    customUI: ({ onClose }) => (
      <div className="custom-alert p-4 bg-light rounded-lg shadow-md text-dark">
        <h3 className="text-lg font-bold mb-2">{title}</h3>
        <p className="text-sm mb-4">{message}</p>
        <div className="flex justify-end gap-4">
          <button
            className="px-4 py-1 bg-secondary-green text-white rounded hover:bg-primary-green"
            onClick={() => {
              onConfirm();
              onClose();
            }}
          >
            Sí
          </button>
          <button
            className="px-4 py-1 bg-gray-300 text-black rounded hover:bg-gray-400"
            onClick={onClose}
          >
            No
          </button>
        </div>
      </div>
    ),
  });
};
