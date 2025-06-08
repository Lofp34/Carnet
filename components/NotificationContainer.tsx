import React from 'react';
import { Notification, NotificationType } from '../hooks/useNotification';

interface NotificationContainerProps {
  notifications: Notification[];
  onRemove: (id: string) => void;
}

const getNotificationStyles = (type: NotificationType) => {
  const baseStyles = "mb-3 p-4 rounded-lg shadow-lg border-l-4 transition-all duration-300 transform";
  
  switch (type) {
    case 'success':
      return `${baseStyles} bg-emerald-50 border-emerald-500 text-emerald-800`;
    case 'error':
      return `${baseStyles} bg-red-50 border-red-500 text-red-800`;
    case 'warning':
      return `${baseStyles} bg-amber-50 border-amber-500 text-amber-800`;
    case 'info':
      return `${baseStyles} bg-blue-50 border-blue-500 text-blue-800`;
    default:
      return `${baseStyles} bg-slate-50 border-slate-500 text-slate-800`;
  }
};

const getNotificationIcon = (type: NotificationType) => {
  switch (type) {
    case 'success':
      return 'fas fa-check-circle';
    case 'error':
      return 'fas fa-exclamation-circle';
    case 'warning':
      return 'fas fa-exclamation-triangle';
    case 'info':
      return 'fas fa-info-circle';
    default:
      return 'fas fa-bell';
  }
};

export const NotificationContainer: React.FC<NotificationContainerProps> = ({ 
  notifications, 
  onRemove 
}) => {
  if (notifications.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 max-w-sm w-full space-y-2">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={getNotificationStyles(notification.type)}
          onClick={() => onRemove(notification.id)}
          role="alert"
          aria-live="polite"
        >
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <i className={`${getNotificationIcon(notification.type)} text-lg`} />
            </div>
            <div className="ml-3 flex-1">
              <h3 className="text-sm font-medium">{notification.title}</h3>
              {notification.message && (
                <p className="mt-1 text-sm opacity-90">{notification.message}</p>
              )}
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onRemove(notification.id);
              }}
              className="ml-2 flex-shrink-0 text-sm opacity-70 hover:opacity-100 transition-opacity"
              aria-label="Fermer la notification"
            >
              <i className="fas fa-times" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}; 