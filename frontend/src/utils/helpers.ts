export const getEnvVar = (name: string): string => {
  const value = import.meta.env[name];
  if (!value) {
    throw new Error(`Environment variable ${name} is not set`);
  }
  return value;
};
export const setLocalStorageItem = (key: string, value: string): void => {
  localStorage.setItem(key, value);
};

export const getLocalStorageItem = (key: string): string | null => {
  return localStorage.getItem(key);
};
export const setSessionStorageItem = (key: string, value: string): void => {
  sessionStorage.setItem(key, value);
};

export const getSessionStorageItem = (key: string): string | null => {
  return sessionStorage.getItem(key);
};
export const removeSessionStorageItem = (key: string): void => {
  sessionStorage.removeItem(key);
};
