export class Delegate<TFunc extends Function, TArg extends Array<any>> {
    funcArr: TFunc[];

    constructor(initialFuncs: TFunc[]) {
        this.funcArr = initialFuncs;
    }

    call(...args: TArg[]): void {
        this.funcArr.forEach((func) => {
           func.call(null, ...args);
        });
    }
}

export class EntityWrapper {
    private element: HTMLElement;
    private color: string;

    /*
    Delegates
     */
    private onColorChange: Delegate<(color: string) => void, [string]>;

    constructor(element: HTMLElement) {
        this.element = element;
        this.color = this.element.style.backgroundColor;

        this.onColorChange = new Delegate<(color: string) => void, [string]>
        (
            [(color:string) => {
                this.color = color;
                this.element.style.color = color
            }]
        );
    }

    getColor(): Readonly<string> {
        return this.color;
    }

    changeColor(color: string): void {
        this.onColorChange.call([color]);
    }
}

