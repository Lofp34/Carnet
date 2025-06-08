import { useState, useCallback } from 'react';

export type NotificationType = 'success' | 'error' | 'warning' | 'info';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message?: string;
  duration?: number;
}

export function useNotification() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = useCallback((notification: Omit<Notification, 'id'>) => {
    const id = `notification-${Date.now()}-${Math.random()}`;
    const newNotification: Notification = {
      ...notification,
      id,
      duration: notification.duration ?? 5000,
    };

    setNotifications(prev => [...prev, newNotification]);

    // Auto-remove après la durée spécifiée
    if (newNotification.duration && newNotification.duration > 0) {
      setTimeout(() => {
        removeNotification(id);
      }, newNotification.duration);
    }
  }, []);

  const removeNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  }, []);

  const clearAllNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  // Helpers pour les différents types
  const notifySuccess = useCallback((title: string, message?: string, duration?: number) => {
    addNotification({ type: 'success', title, message, duration });
  }, [addNotification]);

  const notifyError = useCallback((title: string, message?: string, duration?: number) => {
    addNotification({ type: 'error', title, message, duration });
  }, [addNotification]);

  const notifyWarning = useCallback((title: string, message?: string, duration?: number) => {
    addNotification({ type: 'warning', title, message, duration });
  }, [addNotification]);

  const notifyInfo = useCallback((title: string, message?: string, duration?: number) => {
    addNotification({ type: 'info', title, message, duration });
  }, [addNotification]);

  return {
    notifications,
    addNotification,
    removeNotification,
    clearAllNotifications,
    notifySuccess,
    notifyError,
    notifyWarning,
    notifyInfo,
  };
} 