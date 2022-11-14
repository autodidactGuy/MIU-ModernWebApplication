import { Component, OnInit } from '@angular/core';
import { Game } from '../games/games.component';
import { GamesDataService } from '../games-data.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  game!:Game;
  stars!:number[];
  constructor(private _gamesService:GamesDataService,private _router:ActivatedRoute) { }

  ngOnInit(): void {
    let gameId=this._router.snapshot.params["gameId"];
    this._gamesService.getGame(gameId).subscribe(value => {
      this.game=value;
      this.method(this.game.rate);
    });
  }

  method(rating:number):void{
    this.stars=new Array<number>(rating);
  }

}
