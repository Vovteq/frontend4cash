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

  public static getInitials(nickname: string): string {
    const spliced = nickname.split(' ');
    let result = spliced[0][0];
    if (spliced.length > 1) {
      result += spliced[1][0];
    }
    return result;
  }
}
