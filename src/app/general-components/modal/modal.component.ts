import {Component, Input, OnInit, ViewEncapsulation, AfterViewInit, ElementRef} from '@angular/core';
import {ModalService} from "../../services/modal.service";
import {Delegate} from "../../../scripts/ts/delegates/Delegate";
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-modal',
  animations: [
    trigger('showHide', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(40px)' }),
        animate('200ms cubic-bezier(0.175, 0.885, 0.320, 1.275)', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
      transition(':leave', [
        animate('200ms cubic-bezier(0.600, -0.280, 0.735, 0.045)', style({ opacity: 0, transform: 'translateY(40px)' })),
      ]),
    ])
  ],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ModalComponent implements OnInit, AfterViewInit {
  @Input() modalTemplateId;
  @Input() id: string = "modal";
  @Input() keepOpened: boolean;

  public onSelect: Delegate<void[]> = new Delegate<void[]>();
  private _selected: boolean = false;
  private _shown: boolean;

  get selected(): boolean {
    return this._selected;
  }

  get animationState(): string {
    return this._shown ? 'shown' : 'hidden';
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
    this.modalService.contexts[this.id]?.call(null);
    this.el.nativeElement.id = this.id;
  }

  handleOnClick(): void {
    this.onSelect.invoke(null);
  }

  getElement(): HTMLElement {
    return this.el.nativeElement;
  }

  show(animate: boolean = false): void {
    if (animate) {
      this._shown = true;
    } else {
      this.el.nativeElement.style.opacity = 1;
    }
  }

  hide(animate: boolean = false): void {
    if (animate) {
      this._shown = false;
    } else {
      this.el.nativeElement.style.opacity = 0;
    }
  }
}
