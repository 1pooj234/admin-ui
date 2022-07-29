export const validateEmail = (val) => {
  return val.trim().toLowerCase().includes("@");
};
export const validateName = (val) => {
  return val.trim().toLowerCase().length >= 5;
};
export const validateRole = (val) => {
  return (
    val.trim().toLowerCase() === "admin" ||
    val.trim().toLowerCase() === "member"
  );
};
