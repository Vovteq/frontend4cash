import Graph from "./Graph";

export default class Chart extends Graph {
  private config;
  private chartObject: ApexCharts;

  constructor(targetGraphics: HTMLElement, config) {
    super(targetGraphics);
    this.config = config;
    console.log(targetGraphics);
    this.chartObject = new ApexCharts(targetGraphics, config);
  }

  render(): void {
    this.chartObject.render();
  }
}
