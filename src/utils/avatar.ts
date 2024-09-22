export const getInitials = (name) => {
  const initials = name
    .split(" ")
    .map((word) => word[0])
    .join("");
  return initials.toUpperCase();
};
