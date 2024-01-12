export default function getTimeAgoString(postDate) {
    const currentDate = new Date();
    const postDateTime = new Date(postDate);
    const timeDifference = currentDate - postDateTime;
  
    // Calculate the time difference in seconds, minutes, hours, and days
    const secondsDifference = Math.floor(timeDifference / 1000);
    const minutesDifference = Math.floor(secondsDifference / 60);
    const hoursDifference = Math.floor(minutesDifference / 60);
    const daysDifference = Math.floor(hoursDifference / 24);
  
    if (secondsDifference < 60) {
      return `Posted ${secondsDifference} ${secondsDifference === 1 ? 'second' : 'seconds'} ago`;
    } else if (minutesDifference < 60) {
      return `Posted ${minutesDifference} ${minutesDifference === 1 ? 'minute' : 'minutes'} ago`;
    } else if (hoursDifference < 24) {
      return `Posted ${hoursDifference} ${hoursDifference === 1 ? 'hour' : 'hours'} ago`;
    } else if (daysDifference < 7) {
      return `Posted ${daysDifference} ${daysDifference === 1 ? 'day' : 'days'} ago`;
    } else {
      // If more than a week, return the formatted date
      const options = { year: 'numeric', month: 'short', day: 'numeric' };
      return `Posted on ${postDateTime.toLocaleDateString('en-US', options)}`;
    }
  }