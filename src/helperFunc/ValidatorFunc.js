export const isEmailValid = (val) => {
  return val.includes("@");
};
export const isNameValid = (val) => {
  return val.trim().length >= 5;
};
export const isRoleValid = (val) => {
  return val.toLowerCase() === "member" || val.toLowerCase() === "admin";
};
