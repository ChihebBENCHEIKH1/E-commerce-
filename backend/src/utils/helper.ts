export const getEnvVar = (
  key: string,
  defaultValue: string | number = ""
): string | number => {
  const value = process.env[key];

  if (value === undefined) {
    if (!defaultValue) {
      throw new Error(`Environment variable ${key} is not defined`);
    }
    return defaultValue;
  }

  if (typeof defaultValue === "number") {
    return parseInt(value, 10);
  }

  return value;
};
