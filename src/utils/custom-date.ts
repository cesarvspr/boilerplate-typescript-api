export async function addDays(date: Date, days: number): Promise<Date> {
  return new Date(date.getTime() + days * 24 * 60 * 60 * 1000) //Fix update to moment (Get Format)
}
