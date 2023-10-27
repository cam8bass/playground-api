export function formatDate(inputDate: Date): string {
  const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'numeric', year: 'numeric' }
  const formattedDate: string = new Date(inputDate).toLocaleDateString(undefined, options)
  return formattedDate
}
