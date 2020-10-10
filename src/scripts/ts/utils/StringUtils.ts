export default class StringUtils {
  public static capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  public static getTime(hours: number, minutes: number): string {
    let time = "";
    time += hours < 10 ? "0" + hours : hours;
    time += ":";
    time += minutes < 10 ? "0" + minutes : minutes;
    return time;
  }
}
