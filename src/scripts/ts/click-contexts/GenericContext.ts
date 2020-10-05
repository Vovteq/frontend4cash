/*
Event calling wrapper for buttons, links, etc...
 */

export type ctxArgument = Array<any>

// An interface for callable functions.
export interface ContextFunction<TArg extends ctxArgument> {
  (...func: TArg): void;
}

// Generic context which can be used in any case.
export abstract class GenericContext<TArg extends ctxArgument> {
  private readonly func: ContextFunction<TArg>;

  protected constructor(func: ContextFunction<TArg>) {
    this.func = func;
  }

  invoke(args: TArg) {
    this.func(...args);
  }
}
