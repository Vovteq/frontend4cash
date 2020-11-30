export default abstract class DataStream<T> implements Iterable<T>{
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

  *[Symbol.iterator]() : Iterator<T> {
    for (let elem of this.content) {
      yield elem;
    }
  }

  public foreach(func: (elem: T) => void) {
    for (let elem of this) {
      func(elem);
    }
  }

  public removeElement(elem: T) {
    this.content = this.content.filter(o => o !== elem);
  }

  public last(): T {
    return this.content[this.content.length - 1];
  }
}
