let nextMonth = new Date().getMonth() + 1;
let nextYear = new Date().getFullYear();

if (nextMonth > 11) {
  nextYear++;
  nextMonth = 0;
}

export const nextMonthMonth = nextMonth;
export const nextMonthYear = nextYear;

export function getWeekDaysInMonth(
  month = nextMonthMonth,
  year = nextMonthYear
): number {
  const startDate = new Date(year, month, 1);
  const endDate = new Date(year, month + 1, 0);

  let businessDays = 0;
  for (
    let currentDate = startDate;
    currentDate <= endDate;
    currentDate.setDate(currentDate.getDate() + 1)
  ) {
    const dayOfWeek = currentDate.getDay();
    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      businessDays++;
    }
  }

  return businessDays;
}

/** Get the days in office rounded */
export function daysInOffice(weekdays: number, holidays: number, pct: number):number {
  const fractional = (weekdays - holidays) * (pct / 100);
  return Math.round(fractional);
}
