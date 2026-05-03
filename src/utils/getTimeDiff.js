export const getTimeDiff = (passedDate) => {
  const createdTime = new Date(passedDate);
  const currentTime = new Date();
  const diffInSeconds = Math.floor((currentTime - createdTime) / 1000);

  if (diffInSeconds < 60) {
    return `${diffInSeconds} sec${diffInSeconds === 1 ? "" : "s"} ago`;
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} min${diffInMinutes === 1 ? "" : "s"} ago`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours === 1 ? "" : "s"} ago`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays <= 7) {
    return `${diffInDays} day${diffInDays === 1 ? "" : "s"} ago`;
  }

  return createdTime.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};
