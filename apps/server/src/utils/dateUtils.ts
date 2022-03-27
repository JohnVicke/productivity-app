export const tommorow = () => {
  const date = new Date();
  date.setDate(date.getDate() + 1);
  return date;
};

export const yesterday = () => {
  const date = new Date();
  date.setDate(date.getDate() - 1);
  return date;
};
