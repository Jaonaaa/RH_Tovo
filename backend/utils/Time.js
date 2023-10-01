export const getTimeNow = () => {
  const now = new Date();
  const day = now.getDate().toString().padStart(2, "0");
  const month = (now.getMonth() + 1).toString().padStart(2, "0"); // Month is 0-based, so add 1
  const year = now.getFullYear();

  // Get the time components
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const seconds = now.getSeconds().toString().padStart(2, "0");

  // Create the formatted string
  const formattedDateTime = `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
  return formattedDateTime;
};
