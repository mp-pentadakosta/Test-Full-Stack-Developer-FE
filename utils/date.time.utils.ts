class DateTimeUtils {
  dateToStringYYYYMMDD(date: Date): string {
    return date.toISOString().split("T")[0];
  }

  stringToDate(date: string): Date {
    return new Date(date);
  }

  stringToStringDDMMMYYYY(date: string): string {
    return new Date(date).toDateString().split(" ").slice(1).join(" ");
  }
}

export default new DateTimeUtils();
