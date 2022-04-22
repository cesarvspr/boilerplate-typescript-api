import differenceInDays from 'date-fns/differenceInDays'

/**
 * return the diff between the today and a date
 * @param {String} date
 */
export function getDiffDays(date: Date): number {
  return differenceInDays(new Date(), date)
}
