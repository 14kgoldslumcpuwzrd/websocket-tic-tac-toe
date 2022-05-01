import { Injectable } from '@angular/core';
import * as Rx from "rxjs"

export interface Message {
    source: string;
    content: string;
}


@Injectable({
  providedIn: 'root'
})
export class WebSocketRequestService {
  private subject: Rx.Subject<MessageEvent> = new Rx.Subject<MessageEvent>();

  constructor() {}

  public connect(url: any): Rx.Subject<MessageEvent> {
      this.subject = this.create(url);
      console.log("Successfully connected: " + url);
      return this.subject;
  }

  private create(url: any): Rx.Subject<MessageEvent> {
    let ws = new WebSocket(url);

    let observable = Rx.Observable.create((obs: Rx.Observer<MessageEvent>) => {
      ws.onmessage = obs.next.bind(obs);
      ws.onerror = obs.error.bind(obs);
      ws.onclose = obs.complete.bind(obs);
      return ws.close.bind(ws);
    });
    let observer = {
      next: (data: Object) => {
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify(data));
        }
      }
    };
    return Rx.Subject.create(observer, observable);
  }
}
