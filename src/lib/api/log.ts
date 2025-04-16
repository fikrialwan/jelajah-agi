export const fetchLog = async (log: any) => {
  return fetch("/api/log", {
    method: "POST",
    body: JSON.stringify(log),
  });
};
