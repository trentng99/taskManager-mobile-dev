export function formatDate(dateString) {
  const originalDate = new Date(dateString);

  // Get the year, month, and day individually
  const year = originalDate.getFullYear();
  const month = String(originalDate.getMonth() + 1).padStart(2, "0");
  const day = String(originalDate.getDate()).padStart(2, "0");

  // To create the formatted date string
  const formattedDateString = `${year}-${month}-${day}`;

  return formattedDateString;
}
