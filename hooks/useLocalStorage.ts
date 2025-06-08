import { useState, useEffect, useCallback } from 'react';

type SetValue<T> = T | ((prevValue: T) => T);

/**
 * Hook personnalisé pour gérer localStorage avec type safety et optimisations
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: SetValue<T>) => void, () => void] {
  // State pour stocker la valeur
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Erreur lors de la lecture de localStorage pour la clé "${key}":`, error);
      return initialValue;
    }
  });

  // Fonction pour mettre à jour la valeur
  const setValue = useCallback(
    (value: SetValue<T>) => {
      try {
        const valueToStore = value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      } catch (error) {
        console.error(`Erreur lors de l'écriture dans localStorage pour la clé "${key}":`, error);
      }
    },
    [key, storedValue]
  );

  // Fonction pour supprimer la valeur
  const removeValue = useCallback(() => {
    try {
      window.localStorage.removeItem(key);
      setStoredValue(initialValue);
    } catch (error) {
      console.error(`Erreur lors de la suppression de localStorage pour la clé "${key}":`, error);
    }
  }, [key, initialValue]);

  // Écouter les changements du localStorage depuis d'autres onglets
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key && e.newValue !== null) {
        try {
          setStoredValue(JSON.parse(e.newValue));
        } catch (error) {
          console.warn(`Erreur lors de la synchronisation localStorage pour la clé "${key}":`, error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [key]);

  return [storedValue, setValue, removeValue];
} 