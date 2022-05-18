
export function ConvertSecondsInMinutes(value: number): string {
    const minutes = value / 60;
    const formattedMin = minutes.toFixed(2).toString().replace('.', ':');
    return formattedMin;
  }