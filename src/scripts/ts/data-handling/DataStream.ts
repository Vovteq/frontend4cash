export default abstract class DataStream<T> {
  protected content: T[];

  protected constructor(...items: T[]) {
    this.content = new Array<T>();
    this.content.push(...items);
  }

  public abstract get(idx: number): T;
  public abstract remove(item: number | T): void;
  public abstract add(item: T): void;

  public clear(): void {
    this.content = new Array<T>();
  }

  public last(): T {
    return this.content[this.content.length - 1];
  }
}
