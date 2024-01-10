/**
 * Formats a date into a string using the browser's locale.
 * @param {Date} inputDate - The date to format.
 * @returns {string} The formatted date string.
 */
export function formatDate(inputDate: Date): string {
  const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'numeric', year: 'numeric' }
  const formattedDate: string = new Date(inputDate).toLocaleDateString(undefined, options)
  return formattedDate
}

/**
 * Returns a string representing the number of days, hours, minutes, or seconds between the current date and the given date.
 * @param {Date} inputDate - The date to calculate the difference from the current date.
 * @returns {string} A string representing the number of days, hours, minutes, or seconds between the current date and the given date.
 */
export function formatNotificationDate(inputDate: Date): string {
  const currentDate = new Date()
  const notificationDate = new Date(inputDate)

  const MILLISECONDS_IN_SECOND = 1000
  const SECONDS_IN_MINUTE = 60
  const MINUTES_IN_HOUR = 60
  const HOURS_IN_DAY = 24

  const milliseconds = currentDate.getTime() - notificationDate.getTime()
  const seconds = Math.floor(milliseconds / MILLISECONDS_IN_SECOND)
  const minutes = Math.floor(seconds / SECONDS_IN_MINUTE)
  const hours = Math.floor(minutes / MINUTES_IN_HOUR)
  const days = Math.floor(hours / HOURS_IN_DAY)

  if (days === 0) {
    if (hours === 0) {
      return minutes === 0 ? 'Maintenant' : `Il y a ${minutes} minute${minutes === 1 ? '' : 's'}`
    } else if (hours < 24) {
      return `Il y a ${hours} heure${hours === 1 ? '' : 's'}`
    } else {
      return `${Math.floor(hours / 24)} jour${Math.floor(hours / 24) === 1 ? '' : 's'}`
    }
  } else {
    return `Il y a ${days} jour${days === 1 ? '' : 's'}`
  }
}
