import {Component, Input, OnInit, ViewEncapsulation, AfterViewInit, ElementRef} from '@angular/core';
import {ModalService} from "../../services/modal.service";
import {Delegate} from "../../../scripts/ts/delegates/Delegate";
import {animate, style, transition, trigger} from "@angular/animations";
import {Dictionary} from "../../../scripts/ts/data-handling/Dictionary";

@Component({
  selector: 'app-modal',
  animations: [
    trigger('showHide', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(40px) scale(0.9)' }),
        animate('200ms cubic-bezier(0.175, 0.885, 0.320, 1.275)', style({ opacity: 1, transform: 'translateY(0) scale(1)' })),
      ]),
      transition(':leave', [
        animate('200ms cubic-bezier(0.600, -0.280, 0.735, 0.045)', style({ opacity: 0, transform: 'translateY(40px) scale(0.9)' })),
      ]),
    ])
  ],
  host: {
    '(@showHide.done)': 'animEnd()'
  },
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ModalComponent implements OnInit, AfterViewInit {
  @Input() modalTemplateId: string;
  @Input() id: string = "modal";
  @Input() useCustomTemplate: boolean;
  @Input() customTemplateArgs: any[];
  @Input() initiallyShown: boolean;
  @Input() showBg: boolean;
  @Input() draggable: boolean = false;
  @Input() customContent: string;

  public onSelect: Delegate<void[]> = new Delegate<void[]>();
  private _selected: boolean = false;
  private _shown: boolean;

  public readonly cache: Dictionary<string, any> = new Dictionary<string, any>();

  get selected(): boolean {
    return this._selected;
  }

  get shown(): boolean {
    return this._shown;
  }

  constructor(public modalService: ModalService, private el: ElementRef) { }

  ngOnInit(): void {
    this.onSelect.add(() => { this._selected = !this._selected; console.log(this._selected)});
    this.modalService.registerModal(this.id, this);
  }

  ngAfterViewInit(): void {
    if (this.initiallyShown) this.show();
  }

  handleOnClick(): void {
    this.onSelect.invoke(null);
    this.modalService.focus(this);
  }

  getElement(): HTMLElement {
    return this.el.nativeElement;
  }

  show(): void {
    this._shown = true;
  }

  hide(): void {
    this._shown = false;
  }

  private getInnerHtml() {
    return this.customContent === undefined ? this.modalService.modals[this.modalTemplateId] : this.customContent;
  }

  // There is no elements in this component during animation, so we need to use anim-end callback.
  animEnd(): void {
    if (this.shown) {
      this.modalService.contexts[this.modalTemplateId]?.call(this, this, this.customTemplateArgs || []);
    }
  }
}
