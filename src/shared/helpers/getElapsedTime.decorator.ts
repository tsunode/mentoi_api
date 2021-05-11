import { zonedTimeToUtc } from 'date-fns-tz';
import { differenceInSeconds, format } from 'date-fns';

function includePlural(value: string | number): string {
  return +value > 1 ? 's' : '';
}

export function getElapsedTime(date: Date): string {
  const dateUtc = zonedTimeToUtc(date, 'America/Sao_Paulo');

  const elapsedSeconds = differenceInSeconds(new Date(), dateUtc);

  const times = {
    minute: 60,
    hour: 60 * 60,
    day: 60 * 60 * 24,
    fiveDays: 60 * 60 * 24 * 5,
  };

  switch (true) {
    case elapsedSeconds < 60:
      return `há ${elapsedSeconds} segundo${includePlural(elapsedSeconds)}`;
    case elapsedSeconds >= times.minute && elapsedSeconds < times.hour:
      const elapsedMinutes = (elapsedSeconds / times.minute).toFixed(0);
      return `há ${elapsedMinutes} minuto${includePlural(elapsedMinutes)}`;
    case elapsedSeconds >= times.hour && elapsedSeconds < times.day:
      const elapsedHour = (elapsedSeconds / times.hour).toFixed(0);
      return `há ${elapsedHour} hora${includePlural(elapsedHour)}`;
    case elapsedSeconds >= times.day && elapsedSeconds < times.fiveDays:
      const elapsedDay = (elapsedSeconds / times.day).toFixed(0);
      return `há ${elapsedDay} dia${includePlural(elapsedDay)}`;
    default:
      return format(dateUtc, `dd 'de' MMMM 'de' yyyy`);
  }
}
