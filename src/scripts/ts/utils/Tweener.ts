import {Delegate} from "../delegates/Delegate";

export default class Tweener {

  private _value: number = 0;

  public onTweenDone: Delegate<void>;

  constructor() {
    this.onTweenDone = new Delegate<void>();
  }

  public get processedValue(): number {
    return this._value;
  }

  public tweenValue(start: number, end: number, duration: number): void {
    const range = end - start;
    const minTimer = 50;
    let stepTime = Math.abs(Math.floor(duration / range));

    stepTime = Math.max(stepTime, minTimer);

    const startTime = new Date().getTime();
    const endTime = startTime + duration;
    let timer;
    const self = this;

    function run() {
      const now = new Date().getTime();
      const remaining = Math.max((endTime - now) / duration, 0);
      const value = Math.round(end - (remaining * range));
      self._value = value;
      if (value == end) {
        clearInterval(timer);
        self.onTweenDone.invoke();
      }
    }

    timer = setInterval(run, stepTime);
    run();
  }

}
