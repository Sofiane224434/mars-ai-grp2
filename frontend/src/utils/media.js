const isAbsoluteUrl = (value) => /^https?:\/\//i.test(value);

const normalizeApiOrigin = (apiUrl) => {
  if (!apiUrl) {
    return "";
  }

  return apiUrl.replace(/\/api\/?$/, "").replace(/\/$/, "");
};

const getBackendOrigin = () => {
  const configuredApiUrl = import.meta.env.VITE_API_URL;
  if (configuredApiUrl) {
    return normalizeApiOrigin(configuredApiUrl);
  }

  if (typeof window !== "undefined") {
    return `${window.location.protocol}//${window.location.hostname}:5000`;
  }

  return "http://localhost:5000";
};

export const resolveMediaUrl = (rawPath) => {
  const value = String(rawPath || "").trim();

  if (!value) {
    return "";
  }

  if (isAbsoluteUrl(value) || value.startsWith("data:") || value.startsWith("blob:")) {
    return value;
  }

  const backendOrigin = getBackendOrigin();

  if (value.startsWith("/uploads/")) {
    return `${backendOrigin}${value}`;
  }

  if (value.startsWith("uploads/")) {
    return `${backendOrigin}/${value}`;
  }

  return value;
};
