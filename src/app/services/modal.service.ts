import { Injectable } from '@angular/core';

@Injectable()
export class ModalService {

  constructor() { }

  public modals: {[id: string]: string} = {
    register: `
      <h2>Register</h2>
      <p>Create new account and start trading now!</p>
      
      
    `
  };
}
