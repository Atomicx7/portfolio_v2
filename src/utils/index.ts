export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const month = date.getMonth() === 8 ? "Sep" : date.toLocaleString("default", { month: "short" });
  const year = date.getFullYear();

  return {
    month,
    year,
  };
}
