import { Component, OnInit, OnDestroy } from '@angular/core';
import { GameService } from '../game.service';

export interface Message {
  author: string,
  message: string
}

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
  //public messages: Subject<Message>;

  constructor(private gameService: GameService) { 
    this.gameService = new GameService();
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
