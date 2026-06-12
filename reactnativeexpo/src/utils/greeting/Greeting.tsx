export function greeting() {
  const date = new Date(); 
  const timeZone = 'Asia/Kolkata';
  date.toLocaleString();
  
  const hour = date.getHours();

  if (hour >= 0 && hour < 12) {
    return 'Good Morning';
  } else if (hour >= 12 && hour < 17) {
    return 'Good Afternoon';
  } else if (hour >= 17 && hour <= 24) {
    return 'Good Evening';
  }
}
