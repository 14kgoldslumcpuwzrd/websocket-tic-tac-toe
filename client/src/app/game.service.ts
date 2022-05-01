import { Injectable } from '@angular/core';

const SOCKET = "ws://localhost:4201";

export interface GameState {
  playerOne: Array<number>;
  playerTwo: Array<number>;
}

@Injectable({
  providedIn: 'root'
})
export class GameService {

  websocket: WebSocket;

  messages = {};

  constructor() {
    this.websocket = new WebSocket(SOCKET);
    // this.websocket.addEventListener('open', (event: Event) =>  {
    //   this.websocket.send("This was sent from the client dude!");
    // });
  }
}
