export const getTokenLocalStorage = () => {
  const localData = localStorage.getItem("auth");
  return localData ? localData : null;
}

export const setTokenLocalStorage = (auth) => {
  localStorage.setItem("auth", auth);
}