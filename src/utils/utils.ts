
export const authToken = () => sessionStorage.getItem("token");
export const userID = () => sessionStorage.getItem("userId");


   export function formatNumberIndian(num: number): string {
        const formatter = new Intl.NumberFormat('en-IN', {
          maximumFractionDigits: 2,
        });
        return formatter.format(num);
      }
  
