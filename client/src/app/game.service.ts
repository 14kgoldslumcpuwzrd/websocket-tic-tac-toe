import { Injectable } from '@angular/core';

const SOCKET = "ws://localhost:4201";

export interface GameState {
  playerOne: Array<number>;
  playerTwo: Array<number>;
}

enum ConnectionState {
  CONNECTING = 0,
  OPEN = 1,
  CLOSING = 2,
  CLOSED = 3
}

@Injectable({
  providedIn: 'root'
})
export class GameService {

  websocket: WebSocket;
  isConnectionOpen: boolean = false;

  messages = {};

  constructor() {
    this.websocket = new WebSocket(SOCKET);
    // this.websocket.addEventListener('open', (event: Event) =>  {
    //   this.websocket.send("This was sent from the client dude!");
    // });
    setInterval( () => {
      if (this.websocket.readyState === ConnectionState.OPEN && !this.isConnectionOpen) {
        this.isConnectionOpen = true;
        console.log('connection now open')
        this.websocket.send("Hello?DJKSJDSKDJLSKJL");
      }
    }, 50)
  }


}
