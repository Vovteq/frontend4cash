import { Dictionary } from "../data-handling/Dictionary";

export default class Currency {
  public id: string;
  public readonly priceStory: Dictionary<string, number>;

  constructor(id: string, ...data: { date: string, price: number }[]) {
    this.id = id;
    this.priceStory = new Dictionary<string, number>();
    for (let elem of data) {
      this.priceStory.addPair(elem.date, elem.price);
    }
  }
}
