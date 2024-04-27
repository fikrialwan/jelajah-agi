export const checkCountdownValid = (endDate: string): boolean => {
  const now = new Date();
  const end = endDate === "-" ? new Date() : new Date(endDate);
  return now.getTime() < end.getTime();
};
