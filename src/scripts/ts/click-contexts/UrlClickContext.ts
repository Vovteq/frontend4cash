import { GenericContext } from "./GenericContext";

// A click context which holds an URL and redirects user to some page with given URL.
export default class UrlClickContext extends GenericContext<[string]> {
  public url: string;

  constructor(url: string) {
    super(() => { console.log(this.url) });
    this.url = url;
  }

  invoke() {
    super.invoke([this.url]);
  }
}
