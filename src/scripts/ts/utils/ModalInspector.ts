import {Dictionary} from "../data-handling/Dictionary";
import {ModalComponent} from "../../../app/general-components/modal/modal.component";

export default class ModalInspector {
  private static registeredModals: Dictionary<string, ModalComponent> = new Dictionary<string, ModalComponent>();

  public static printAll() {
    for(let i of this.registeredModals) {
      console.log(i.value.id);
    }
  }

  public static get(id: string): ModalComponent {
    return this.registeredModals.getByKey(id);
  }

  public static add(id: string, modal: ModalComponent): void {
    this.registeredModals.addPair(id, modal);
  }
}
