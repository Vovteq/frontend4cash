export default class ParallaxContext {
  public speed: number;
  public offset: number;

  constructor(speed: number = -0.4, offset: number = 0) {
    this.speed = speed;
    this.offset = offset;
  }
}
