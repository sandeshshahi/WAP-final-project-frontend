import { createContext, ReactNode, useEffect, useState } from 'react';

interface AlertType {
  message: string;
  type: string;
}
interface NotificationType {
  alert?: AlertType;
  setAlert: Function;
}
const NotificationContext = createContext<NotificationType>({
  setAlert: () => {},
});

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [alert, setAlert] = useState<AlertType | undefined>();

  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => {
        setAlert(undefined);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [alert]);

  return (
    <NotificationContext.Provider value={{ alert, setAlert }}>
      {alert && (
        <div
          className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 translate bg-blue-100 border-t border-b px-4 py-3 z-50 
      ${alert.type === 'success' ? 'border-blue-500 text-blue-700' : 'border-red-500 text-red-700'}`}
          role="alert"
        >
          <p className="font-bold">
            {alert.type === 'success' ? 'Success' : 'Error'}
          </p>
          <p className="text-sm">{alert.message}</p>
        </div>
      )}
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;
