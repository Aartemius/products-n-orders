export const getDateTime = () => {
  // Create full current date
  const fullCurrentDate = new Date();

  // Define an array of month names
  // eslint-disable-next-line array-element-newline
  const monthNames = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
  
  // Get the day, month, year, hours, and minutes from the fullCurrentDate
  const day = fullCurrentDate.getDate();
  const monthIndex = fullCurrentDate.getMonth();
  const year = fullCurrentDate.getFullYear();
  const hours = fullCurrentDate.getHours();
  const minutes = fullCurrentDate.getMinutes();
  
  // Format the date and time
  const currentDate = `${day} ${monthNames[monthIndex]} ${year}`;
  const currentTime = `${hours}:${minutes}`;
  const currentDateTime = `${currentDate}, ${currentTime}`;
  
  // Format the date and time in "YYYY-MM-DD HH:mm:ss" format
  const formattedDateTime = `${year}-${(monthIndex + 1)
    .toString()
    .padStart(2, '0')}-${day.toString()
    .padStart(2, '0')} ${hours.toString()
    .padStart(2, '0')}:${minutes.toString()
    .padStart(2, '0')}:00`;
  
  return { 
    currentDate,
    currentTime,
    currentDateTime,
    formattedDateTime
  };
}
