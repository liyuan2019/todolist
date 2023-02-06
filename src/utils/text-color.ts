export const textColorOfBg = (bgColor: string) => {
  const brightness =
    parseInt(bgColor.substring(1, 3), 16) * 0.299 +
    parseInt(bgColor.substring(3, 5), 16) * 0.587 +
    parseInt(bgColor.substring(5, 7), 16) * 0.114;
  const textColor = brightness >= 180 ? "#000000" : "#ffffff";
  return textColor;
};
