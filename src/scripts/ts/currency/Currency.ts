import {Dictionary} from "../data-handling/Dictionary";

export default class Currency {
  public id: string;
  public readonly priceStory: Dictionary<string, string>;

  constructor(id: string, data: any[]) {
    this.id = id;
    this.priceStory = new Dictionary<string, string>();
    for (let elem of data) {
      const date = new Date(elem[0]);

      this.priceStory.addPair(date.getDay() + "." + date.getMonth() + "." + date.getFullYear(), elem[1]);
    }
  }

  public static fromJson(id: string, json: any): Currency {
    const data: any[] = json;
    console.log(data);
    return new Currency(id, data);
  }
}
