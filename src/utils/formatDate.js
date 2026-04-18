const formatDate = (dateString) => {
  const date = new Date(dateString);

  const weekday = date.toLocaleDateString('en-GB', {
    weekday: 'long',
  });

  const datePart = date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const timePart = date
    .toLocaleTimeString('en-GB', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    })
    .replace(' ', '')
    .toLowerCase();

  return `${weekday}, ${datePart}, ${timePart}`;
};
export { formatDate };