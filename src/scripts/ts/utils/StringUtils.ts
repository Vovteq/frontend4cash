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

  public static getThreeInitials(value: string): string {
    return value.charAt(0) + this.extractMiddle(value).charAt(0) + value.charAt(value.length - 1);
  }

  public static roundStrDecimal(val: string, afterComa: number = 2): string {
    const spliced = val.split('.');
    let result = ""
    result += spliced[0];
    if (spliced.length > 1) {
      result += "." + spliced[1].substring(0, afterComa);
    }
    return result;
  }

  public static extractMiddle(str: string): string {
    let position;
    let length;

    if(str.length % 2 == 1) {
      position = str.length / 2;
      length = 1;
    } else {
      position = str.length / 2 - 1;
      length = 2;
    }

    return str.substring(position, position + length)
  }
}
