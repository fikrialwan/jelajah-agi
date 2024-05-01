export const formatterTime = (difference: number) => {
  const hours: number = Math.floor(difference / (1000 * 60 * 60));
  const minutes: number = Math.floor(
    (difference % (1000 * 60 * 60)) / (1000 * 60)
  );
  const seconds: number = Math.floor((difference % (1000 * 60)) / 1000);

  // Format hours, minutes, and seconds
  const formattedHours: string = hours < 10 ? "0" + hours : hours.toString();
  const formattedMinutes: string =
    minutes < 10 ? "0" + minutes : minutes.toString();
  const formattedSeconds: string =
    seconds < 10 ? "0" + seconds : seconds.toString();

  return {
    formattedHours,
    formattedMinutes,
    formattedSeconds,
    hours,
    minutes,
    seconds,
    formatted: `${formattedHours}:${formattedMinutes}:${formattedSeconds}`,
  };
};
