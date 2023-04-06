import { createContext, FC, ReactNode, useCallback, useEffect, useState } from "react";
import cx from "classnames";
import { Nullable } from "@/utils/types";

type Alert = {
  type: "success" | "error" | "info";
  message: string;
  timer?: number;
};

export const AlertsContext = createContext<(alert: Alert) => void | null>(() => null);

const Toast: FC<{
  alert: Alert;
  onClose: () => void;
}> = ({ alert, onClose }) => {
  const { timer } = alert;

  useEffect(() => {
    if (!timer) return;

    const timeout = setTimeout(onClose, timer);

    return () => clearTimeout(timeout);
  }, [timer, onClose]);

  return (
    <div
      className="alert-toast fixed bottom-0 right-0 z-40 m-8 w-5/6 max-w-sm md:w-full"
      onAnimationEnd={(event) => {
        if (event.animationName === "fade-out-right") {
          onClose();
        }
      }}
    >
      <input type="checkbox" id="footertoast" className="hidden" />

      <label
        className={cx(
          "close flex w-full cursor-pointer items-start justify-between rounded p-2 text-white shadow-lg",
          alert.type === "success" && "bg-green-500",
          alert.type === "info" && "bg-blue-500",
          alert.type === "error" && "bg-red-500"
        )}
        title="close"
        htmlFor="footertoast"
      >
        {alert?.message}
        <svg
          className="fill-current text-white"
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 18 18"
        >
          <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
        </svg>
      </label>
    </div>
  );
};

const AlertsProvider: FC<{
  children: ReactNode;
}> = ({ children }) => {
  const [alert, setAlert] = useState<Nullable<Alert>>(null);

  const handleToastClose = useCallback(() => {
    setAlert(null);
  }, []);

  return (
    <AlertsContext.Provider value={setAlert}>
      {alert && <Toast alert={alert} onClose={handleToastClose} />}
      {children}
    </AlertsContext.Provider>
  );
};

export default AlertsProvider;
