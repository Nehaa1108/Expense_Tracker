export function greeting() {
  const date = new Date(); // Current date and time
  const timeZone = 'Asia/Kolkata';
  date.toLocaleString();
  // date.toLocaleString('en-US', {timeZone});
  const hour = date.getHours();

  if (hour >= 0 && hour < 12) {
    return 'Good Morning';
  } else if (hour >= 12 && hour < 17) {
    return 'Good Afternoon';
  } else if (hour >= 17 && hour <= 24) {
    return 'Good Evening';
  }
}
