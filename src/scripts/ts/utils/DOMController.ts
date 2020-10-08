import DynamicObject from "../dynamic-objects/DynamicObject";
import DynamicObjectFactory from "../dynamic-objects/DynamicObjectFactory";
import ParallaxContext from "../dynamic-objects/parallax/ParallaxContext";
import ParallaxObject from "../dynamic-objects/parallax/ParallaxObject";

export default class DOMController {
  private constructor() { }

  public static convertToDynamic(target: HTMLElement, objectType: string): DynamicObject {
    return DynamicObjectFactory.create(objectType, target);
  }

  public static addParallaxEffect(target: HTMLElement, context: ParallaxContext) {
    const dynamicObj = this.convertToDynamic(target, DynamicObjectFactory.dynamicObjectTypes.parallax) as ParallaxObject;
    dynamicObj.setContext(context);
    dynamicObj.applyDynamics();
    console.log("Added parallax effect [" + context.speed + "] to " + target);
  }
}
