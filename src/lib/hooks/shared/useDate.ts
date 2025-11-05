import { useTime } from '@hooks/shared';
import dayjs, { Dayjs } from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import duration from 'dayjs/plugin/duration';
import isBetween from 'dayjs/plugin/isBetween';
import quarterOfYear from 'dayjs/plugin/quarterOfYear';
import relativeTime from 'dayjs/plugin/relativeTime';
import utc from 'dayjs/plugin/utc';
import weekOfYear from 'dayjs/plugin/weekOfYear';

dayjs.extend(duration);
dayjs.extend(utc);
dayjs.extend(relativeTime);
dayjs.extend(isBetween);
dayjs.extend(weekOfYear);
dayjs.extend(customParseFormat);
dayjs.extend(quarterOfYear);

export const DATE_FORMATS = {
  // Example: "22/12/2024"
  DAY_MONTH_YEAR: 'DD/MM/YYYY',
  // Example: "2024/12/22"
  YEAR_MONTH_DAY: 'YYYY/MM/DD',
  // Example: "Dec 22, 2024" (LL or ll)
  SHORT_MONTH_DAY_YEAR: 'MMM DD, YYYY',
  // Example: "December 22, 2024"
  FULL_MONTH_DAY_YEAR: 'MMMM D, YYYY',
  // Example: "Dec 22, 2024 12:00 PM"
  SHORT_MONTH_DAY_YEAR_TIME: 'LLL',
  // Example: "Sunday, Dec 22 12:00 PM"
  DAY_MONTH_DATE_TIME: 'dddd, MMM DD hh:mm A',
  // Example: "2024/12/22 - 12:00 PM"
  YEAR_DAY_MONTH_DATE_TIME: 'YYYY/MM/DD - hh:mm A',
  // Example: "Sunday, Dec 22"
  FULL_DAY_MONTH_DATE: 'dddd, MMM DD',
  // Example: "Sunday, Dec 22, 2024 12:00 PM"
  FULL_DAY_MONTH_DATE_YEAR_TIME: 'LLLL',
  // Example: "Sunday" (Full day name)
  FULL_DAY: 'dddd',
  // Example: "Sun" (Short day name)
  SHORT_DAY: 'ddd',
  // Example: "22" (Day of the month)
  DAY_OF_MONTH: 'D',
  // Example: "December" (Full month name)
  FULL_MONTH: 'MMMM',
  // Example: "Dec" (Short month name)
  SHORT_MONTH: 'MMM',
  // Example: "Sunday, 22nd of December"
  FULL_DAY_ORDINAL_MONTH: 'dddd, Do [of] MMMM',
  // Example: "2024-12-22" (ISO 8601)
  ISO_DATE: 'YYYY-MM-DD',
  // Example: "Tuesday, Dec 22, 2024"
  FULL_WEEKDAY_SHORT_MONTH_DAY_YEAR: 'dddd, MMM D, YYYY',
  // Example: "Tue, Dec 22, 2024"
  SHORT_WEEKDAY_SHORT_MONTH_DAY_YEAR: 'dd, MMM D, YYYY',
  // Example: "22 Dec"
  DAY_SHORT_MONTH: 'DD MMM',
  // Example: "December 2024"
  FULL_MONTH_YEAR: 'MMMM YYYY',
  // Example: 2024 (Year only)
  YEAR: 'YYYY',
  // Example: 2025-06-20T00:00:00Z
  ISO_DATE_TIME: 'YYYY-MM-DDTHH:mm:ssZ',
  // Example: "12.00 PM - 22/12/2024"
  CUSTOM_TIME_DATE: 'h:mm A - D/MM/YYYY',
  // Example: "2027-07-25 01:45"
  DATE_24H_TIME: 'YYYY-MM-DD HH:mm',
} as const;

export const TIME_FORMATS = {
  // Example: "12:00 PM" (12-hour format with AM/PM)
  HOUR_MINUTES_AMPM: 'hh:mm A',
  // Example: "14:00" (24-hour format)
  HOUR_MINUTES_24: 'HH:mm',
  // Example: "12:00:30 PM" (12-hour format with seconds)
  HOUR_MINUTES_SECONDS_AMPM: 'LTS',
  // Example: "14:30:00" (24-hour format with seconds)
  HOUR_MINUTES_SECONDS_24: 'HH:mm:ss',
  // Example: "30:45" (Minutes and seconds)
  MINUTES_SECONDS: 'mm:ss',
  // Example: "12.00 PM" (12-hour format with AM/PM, no minutes)
  HOUR_AMPM: 'h.mm A',
} as const;

const UNIT_OF_TIME = {
  YEAR: 'year',
  MONTH: 'month',
  WEEK: 'week',
  DAY: 'day',
  HOURS: 'hours',
  MINUTES: 'minutes',
  SECONDS: 'seconds',
  MILLISECONDS: 'milliseconds',
} as const;

// Types
export type DateInput = string | number | Date | undefined | dayjs.Dayjs;
export type DateFormat = (typeof DATE_FORMATS)[keyof typeof DATE_FORMATS];
export type TimeFormat = (typeof TIME_FORMATS)[keyof typeof TIME_FORMATS];
export type UnitOfTime = (typeof UNIT_OF_TIME)[keyof typeof UNIT_OF_TIME];

type DurationUnits = {
  years: number;
  months: number;
  weeks: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  milliseconds: number;
};

// Helper to map unit strings from our constants to dayjs-accepted units.
const mapUnit = (unit: UnitOfTime): dayjs.ManipulateType => {
  switch (unit) {
    case 'hours':
      return 'hour';
    case 'minutes':
      return 'minute';
    case 'seconds':
      return 'second';
    case 'milliseconds':
      return 'millisecond';
    default:
      return unit as dayjs.ManipulateType;
  }
};

export const useDate = () => {
  const { parseTimeString } = useTime();

  const toDate = (input: DateInput = new Date(), inputFormat?: DateFormat | TimeFormat): string => {
    return dayjs(input).format(inputFormat);
  };

  const dayjsDate = (input: DateInput = new Date()): dayjs.Dayjs => {
    const date = dayjs(input);
    if (!date.isValid()) throw new Error('useDate: Invalid date input');
    return date;
  };

  const toDateFromParts = (year: number, month: number, day: number): string => {
    const date = new Date(year, month, day);

    if (!isValid(date)) throw new Error('useDate: Invalid date parts provided');

    return toDate(date);
  };

  const formatDate = (input: DateInput, format: DateFormat | TimeFormat): string => {
    if (!isValid(input)) throw new Error('useDate: Invalid date input');

    return dayjs(input).format(format);
  };

  const formatNullableDate = (input: DateInput | null, format: DateFormat, fallback = '-'): string => {
    if (!isValid(input)) return fallback;

    return dayjs(input).format(format);
  };

  /**
   * e.g.
   * ```ts
   * formatDateArray(["2025-08-01", "2025-08-02"]) // 'Aug 1, 2'
   * formatDateArray(["2025-08-01", "2025-09-01", "YYYY", "MM", " and "]) // '2025 08 and 09'
   * formatDateArray(["2025-08-01", "2025-09-01", "2026-09-01", "YYYY", "MMM", "-", " | "]) // '2025 Aug-Sep | 2026 Sep'
   * ```
   */
  const formatDateArray = (
    input: DateInput[],
    joinUnitFormat = 'MMM',
    joinedFormat = 'DD',
    joinDelimiter = ',',
    finalJoinDelimiter = ' / ',
    fallback = '-',
  ): string => {
    if (input.length === 0) return fallback;
    return Object.entries(
      input
        .filter((dateArg) => isValid(dateArg))
        .map((dateArg) => [dayjs(dateArg).format(joinUnitFormat), dayjs(dateArg).format(joinedFormat)] as const)
        .reduce(
          (prev, [joinUnit, joinedUnit]) => {
            if (!prev[joinUnit]) prev[joinUnit] = joinedUnit.toString();
            else prev[joinUnit] += `${joinDelimiter}${joinedUnit.toString()}`;
            return prev;
          },
          {} as Record<string, string>,
        ),
    )
      .map(([joinUnit, joinedUnits]) => `${joinUnit} ${joinedUnits}`)
      .join(finalJoinDelimiter);
  };

  const formatNullableDateUTC = (input: DateInput | null, format: DateFormat, fallback = '-'): string => {
    if (!isValid(input)) return fallback;

    return dayjs.utc(input).format(format);
  };

  const formatDateUTC = (input: DateInput, format: DateFormat | TimeFormat): string => {
    if (!isValid(input)) throw new Error('useDate: Invalid date input');

    return dayjs.utc(input).format(format);
  };

  const addDuration = (input: DateInput, amount: number, unit: UnitOfTime): string => {
    if (!isValid(input)) throw new Error('useDate: Invalid date input');
    return dayjs(input).add(amount, mapUnit(unit)).toISOString();
  };

  const subtractDuration = (input: DateInput, amount: number, unit: UnitOfTime): string => {
    if (!isValid(input)) throw new Error('useDate: Invalid date input');
    return dayjs(input).subtract(amount, mapUnit(unit)).toISOString();
  };

  const getDifference = (start: DateInput, end: DateInput, unit: UnitOfTime = UNIT_OF_TIME.DAY): number => {
    return dayjs(end).diff(dayjs(start), mapUnit(unit));
  };

  const getUTC = (date: DateInput): string => {
    return dayjs(date).utc().toISOString();
  };

  const getTimeAgo = (date: DateInput): string => {
    return dayjs(date).fromNow();
  };

  const toDurationUnits = (value: number, unit: UnitOfTime = UNIT_OF_TIME.SECONDS): DurationUnits => {
    const d = dayjs.duration(value, mapUnit(unit));
    return {
      years: d.years(),
      months: d.months(),
      // Approximate weeks as the total days divided by 7.
      weeks: Math.floor(d.asDays() / 7),
      days: d.days(),
      hours: d.hours(),
      minutes: d.minutes(),
      seconds: d.seconds(),
      milliseconds: d.milliseconds(),
    };
  };

  const toDuration = (value: number, unit: UnitOfTime = UNIT_OF_TIME.SECONDS): number => {
    return dayjs.duration(value, mapUnit(unit)).asMilliseconds();
  };

  const toFormattedDuration = (value: number, format: TimeFormat, unit: UnitOfTime = UNIT_OF_TIME.SECONDS): string => {
    const dur = dayjs.duration(value, mapUnit(unit));
    // Create a UTC dayjs object from the duration's milliseconds.
    return dayjs.utc(dur.asMilliseconds()).format(format);
  };

  const toDateUnits = (date: DateInput): DurationUnits => {
    const d = dayjs(date);
    return {
      years: d.year(),
      months: d.month(),
      weeks: d.week(), // Requires weekOfYear plugin.
      days: d.day(), // Day of week.
      hours: d.hour(),
      minutes: d.minute(),
      seconds: d.second(),
      milliseconds: d.millisecond(),
    };
  };

  const toStartAndEndOf = (date?: DateInput, unitOfTime: UnitOfTime = UNIT_OF_TIME.MONTH) => {
    const inputDate = date ? dayjs(date) : dayjs();
    const startOf = inputDate.startOf(mapUnit(unitOfTime)).format(DATE_FORMATS.ISO_DATE);
    const endOf = inputDate.endOf(mapUnit(unitOfTime)).format(DATE_FORMATS.ISO_DATE);
    return {
      startOf,
      endOf,
    } as const;
  };

  const isBefore = (date: DateInput, comparison: DateInput): boolean => {
    return dayjs(date).isBefore(dayjs(comparison));
  };

  const isAfter = (date: DateInput, comparison: DateInput): boolean => {
    return dayjs(date).isAfter(dayjs(comparison));
  };

  const isBetween = (input: DateInput, start: DateInput, end: DateInput): boolean => {
    return dayjs(input).isBetween(dayjs(start), dayjs(end));
  };

  const isSameDay = (a?: DateInput, b?: DateInput): boolean => {
    if (!a || !b) return false;
    const dateA = dayjs(a);
    const dateB = dayjs(b);
    return dateA.isSame(dateB, 'day');
  };
  const toUtcIgnoringTimezone = (date: number | Date, isEndDate = false) => {
    let d = dayjs(date);

    if (isEndDate) {
      d = d.hour(23).minute(59).second(59).millisecond(999);
    }

    return d.subtract(d.toDate().getTimezoneOffset(), 'minute').toDate();
  };
  const localToUTC = (date: DateInput, time: string) => {
    const localDayjs = dayjs(`${date} ${time}`, DATE_FORMATS.ISO_DATE_TIME);
    if (!localDayjs.isValid()) throw new Error('useDate: Invalid local date or time');
    const utcDayjs = localDayjs.utc();
    return {
      utcDateTime: utcDayjs.toISOString(),
      utcDate: utcDayjs.format(DATE_FORMATS.ISO_DATE),
      utcTime: utcDayjs.format(TIME_FORMATS.HOUR_MINUTES_SECONDS_24),
    };
  };
  const utcToLocal = (date: DateInput, time: string) => {
    const utcDayjs = dayjs.utc(`${date} ${time}`, DATE_FORMATS.ISO_DATE_TIME);
    if (!utcDayjs.isValid()) throw new Error('useDate: Invalid UTC date or time');
    const localDayjs = utcDayjs.local();
    return {
      localDateTime: localDayjs.toISOString(),
      localDate: localDayjs.format(DATE_FORMATS.ISO_DATE),
      localTime: localDayjs.format(TIME_FORMATS.HOUR_MINUTES_SECONDS_24),
    };
  };
  const isValid = (input: DateInput | null): boolean => {
    return dayjs(input).isValid();
  };
  const getDateRangeArray = (start: DateInput, end: DateInput, format: DateFormat = DATE_FORMATS.ISO_DATE): string[] => {
    const startDate = dayjs(start);
    const endDate = dayjs(end);

    if (!startDate.isValid()) throw new Error('Invalid start date');
    if (!endDate.isValid()) throw new Error('Invalid end date');
    if (startDate.isAfter(endDate)) throw new Error('Start date must be before or equal to end date');

    const dateArray: string[] = [];
    let currentDate = startDate;

    while (currentDate.isSame(endDate) || currentDate.isBefore(endDate)) {
      dateArray.push(currentDate.format(format));
      currentDate = currentDate.add(1, 'day');
    }

    return dateArray;
  };

  const fromDateStrAndMinutes = (dateStr: string, minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    const date = new Date(dateStr);
    date.setHours(hours, mins, 0, 0);
    return date;
  };

  const setTime = (date: DateInput, timeStr: string) => {
    const [h, m] = parseTimeString(timeStr);
    return dayjs(date).set('hours', h).set('minutes', m);
  };

  function getDateRange(date: DateInput, view: Parameters<Dayjs['startOf']>[0]) {
    const inputDate = dayjs(date);
    const start = inputDate.startOf(view);
    const end = inputDate.endOf(view);
    return { start, end };
  }

  return {
    toDate,
    toDateFromParts,
    formatDate,
    formatNullableDate,
    formatNullableDateUTC,
    formatDateUTC,
    addDuration,
    subtractDuration,
    getDifference,
    getUTC,
    toDurationUnits,
    toDuration,
    toFormattedDuration,
    toDateUnits,
    toStartAndEndOf,
    isBefore,
    isAfter,
    isBetween,
    isValid,
    getTimeAgo,
    getDateRangeArray,
    dayjsDate,
    isSameDay,
    utcToLocal,
    localToUTC,
    toUtcIgnoringTimezone,
    fromDateStrAndMinutes,
    formatDateArray,
    setTime,
    constants: {
      DateFormats: DATE_FORMATS,
      TimeFormats: TIME_FORMATS,
      UnitOfTime: UNIT_OF_TIME,
    },
    getDateRange,
  };
};
