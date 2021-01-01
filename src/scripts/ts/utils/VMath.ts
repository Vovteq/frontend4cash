export default class VMath {

  public static limit(num: number, limit: number): number {
    return num <= limit ? num : limit;
  }

  public static clamp(num: number, min: number, max: number): number {
    if (num < min) {
      return min;
    }
    if (num > max) {
      return max;
    }
    return num;
  }
}
