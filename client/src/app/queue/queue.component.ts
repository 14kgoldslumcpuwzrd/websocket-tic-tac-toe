import { Component, OnInit, OnDestroy } from '@angular/core';
import { WebSocketRequestService } from '../web-socket-request.service';

@Component({
  selector: 'app-queue',
  templateUrl: './queue.component.html',
  styleUrls: ['./queue.component.css']
})
export class QueueComponent implements OnInit {

  OPTIONS = [".", "..", "..."];
  selectedOption = 0;
  ellipses = this.OPTIONS[this.selectedOption];
  numPlayers = 1;
  interval: any = null;

  constructor(private ws: WebSocketRequestService) { 
    this.ws = new WebSocketRequestService();
    console.log(this.ws.connect("127.0.0.1:9001"));
    
  }

  ngOnInit(): void {
    this.interval = setInterval( () => {
      this.selectedOption = (this.selectedOption + 1) % 3;
      this.ellipses = this.OPTIONS[this.selectedOption];
    }, 300);
  }

  ngOnDestroy(): void {
    clearInterval(this.interval); 
  }

}
