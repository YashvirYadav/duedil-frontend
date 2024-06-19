export const authToken = () => sessionStorage.getItem("token");
export const userID = () => sessionStorage.getItem("userId");

export function formatNumberIndian(num: number): string {
  const formatter = new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 2,
  });
  return formatter.format(num);
}

export function calculatePercentage(part: number, total: number) {
  if (total === 0) {
    return 0; // To avoid division by zero
  }
  return Math.round((part / total) * 100);
}
