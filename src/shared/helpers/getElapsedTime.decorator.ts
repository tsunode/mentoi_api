/* eslint-disable import/no-duplicates */
import { zonedTimeToUtc } from 'date-fns-tz';
import { differenceInSeconds, format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

function getTextFormatted(
  elapsedSeconds: number,
  timeType?: string,
  timeValue?: number,
): string {
  const elapsedTime = timeValue
    ? Math.trunc(elapsedSeconds / timeValue)
    : elapsedSeconds;

  return `há ${elapsedTime} ${elapsedTime > 1 ? `${timeType}s` : timeType}`;
}

export function getElapsedTime(date: Date): string {
  const dateUtc = zonedTimeToUtc(date, 'America/Sao_Paulo');

  const elapsedSeconds = Math.abs(differenceInSeconds(new Date(), date));

  const times = {
    minute: 60,
    hour: 60 * 60,
    day: 60 * 60 * 24,
    fiveDays: 60 * 60 * 24 * 5,
  };

  switch (true) {
    case elapsedSeconds < 60:
      return getTextFormatted(elapsedSeconds, 'segundo');

    case elapsedSeconds >= times.minute && elapsedSeconds < times.hour:
      return getTextFormatted(elapsedSeconds, 'minuto', times.minute);

    case elapsedSeconds >= times.hour && elapsedSeconds < times.day:
      return getTextFormatted(elapsedSeconds, 'hora', times.hour);

    case elapsedSeconds >= times.day && elapsedSeconds < times.fiveDays:
      return getTextFormatted(elapsedSeconds, 'dia', times.day);

    default:
      return format(dateUtc, `dd 'de' MMMM 'de' yyyy`, { locale: ptBR });
  }
}
