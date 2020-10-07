import DynamicObject from "./DynamicObject";
import ParallaxObject from "./parallax/ParallaxObject";

export default class DynamicObjectFactory {
  private constructor() { }

  public static readonly dynamicObjectTypes = {
    parallax: 'parallax'
  };

  private static readonly subFactories: { [typeName: string]: () => DynamicObject } = {
    "parallax": () => { return new ParallaxObject(undefined, undefined); }
  };

  // Creates new DynamicObject. Use DynamicObjectFactory.dynamicObjectTypes
  public static create(type: string, target: HTMLElement = undefined): DynamicObject {
    const factory = this.subFactories[type];
    if (factory() === null) return null;

    const obj = factory();
    if (target !== undefined) obj.bind(target);

    return obj;
  }
}
