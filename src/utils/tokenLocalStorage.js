export const getTokenLocalStorage = () => {
  const localData = localStorage.getItem("token");
  return localData ? localData : null;
}

export const setTokenLocalStorage = (token) => {
  localStorage.setItem("token", token);
}