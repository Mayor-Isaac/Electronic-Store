export const getTimeDiff = (createdAt) => {
    const createdTime = new Date(createdAt);
    const currentTime = new Date();
    const diffInSeconds = Math.floor((currentTime - createdTime) / 1000);
    return diffInSeconds;
}