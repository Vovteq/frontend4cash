import DOMParser from "./DOMParser";

export default class ScriptBridge {
  public static viewInit(): void {
    DOMParser.parse();
  }

  public static afterViewInit(): void {

  }
}
