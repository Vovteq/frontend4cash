import DynamicObject from "../dynamic-objects/DynamicObject";
import DynamicObjectFactory from "../dynamic-objects/DynamicObjectFactory";
import ParallaxContext from "../dynamic-objects/parallax/ParallaxContext";
import ParallaxObject from "../dynamic-objects/parallax/ParallaxObject";


export default class DOMController {

  private static staticLambdas: {[name: string]: (elem: HTMLElement) => void} = {
    register: elem => {
      console.log(`Caught [show register modal] static lambda from ${elem}`)
    }
  };

  private static lambdaTriggers: {[triggerName: string]: (elem: HTMLElement, func: () => void) => void} = {
    click: (elem, func) => {
      elem.addEventListener('click', function () {
        func();
      });
    }
  };

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

  public static staticBind(elem: HTMLElement, staticLambdaName: string, trigger: string) {
    switch (trigger) {
      case "click":
        this.lambdaTriggers[trigger].call(elem, this.staticLambdas[staticLambdaName]);
        console.log(`Binded ${elem} with ${staticLambdaName} lambda on ${trigger}`)
    }
  }
}
