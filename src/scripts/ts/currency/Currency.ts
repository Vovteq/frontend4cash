import {Dictionary} from "../data-handling/Dictionary";

export default class Currency {
  public id: string;
  public readonly priceStory: Dictionary<number, number>;

  constructor(id: string) {
    this.id = id;
    this.priceStory = new Dictionary<number, number>();
  }
}
