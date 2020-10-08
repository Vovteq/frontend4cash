import DOMParser from "./DOMParser";

export default class ScriptBridge {
  private constructor() { }

  public static viewInit(): void {
    DOMParser.parse();
  }

  public static afterViewInit(): void {

  }
}
