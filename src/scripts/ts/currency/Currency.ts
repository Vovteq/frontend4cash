import {Dictionary} from "../data-handling/Dictionary";

export default class Currency {
  public id: string;
  public readonly priceStory: Dictionary<string, string>;

  constructor(id: string, data: any[]) {
    this.id = id;
    this.priceStory = new Dictionary<string, string>();
    for (let elem of data) {
      console.log(elem.timestamp);
      const date = new Date(elem.timestamp * 1000);
      this.priceStory.addPair(date.getDay() + "." + date.getMonth() + "." + date.getFullYear(), elem.price.split('.')[0]);

    }
  }

  public static fromJson(id: string, json: any): Currency {
    console.log(json);
    const data: any[] = json;
    return new Currency(id, data);
  }
}
