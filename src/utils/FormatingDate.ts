export const FormatingDate = (dateString: any): string => {

  console.log({dateString});
  // const date = new Date(dateString);
  const year = dateString.getFullYear();
  const month = String(dateString.getMonth() + 1).padStart(2, '0');
  const day = String(dateString.getDate()).padStart(2, '0');

  console.log(`after: ${year}-${month}-${day}`);

  return `${year}-${month}-${day}`;
  

}