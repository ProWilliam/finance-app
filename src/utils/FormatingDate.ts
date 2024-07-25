export const FormatingDate = (dateString: any): string => {

  // const date = new Date(dateString);
  const year = dateString.getFullYear();
  const month = String(dateString.getMonth() + 1).padStart(2, '0');
  const day = String(dateString.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
  

}