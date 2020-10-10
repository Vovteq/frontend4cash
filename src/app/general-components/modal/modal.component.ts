import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {ModalService} from "../../services/modal.service";
import {Delegate} from "../../../scripts/ts/delegates/Delegate";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ModalComponent implements OnInit {
  @Input() modalTemplateId;
  @Input() id: string = "modal";

  public onSelect: Delegate<void[]> = new Delegate<void[]>();
  public selected: boolean = false;

  constructor(public modalService: ModalService) { }

  ngOnInit(): void {
    this.onSelect.add(() => { this.selected = !this.selected; console.log(this.selected)});
    this.modalService.registerModal(this.id, this);
  }

  handleOnClick() {
    this.onSelect.invoke(null);
  }

}
