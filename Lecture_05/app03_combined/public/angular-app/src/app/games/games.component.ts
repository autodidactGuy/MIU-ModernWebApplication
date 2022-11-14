import { Component, OnInit } from '@angular/core';
import { GamesDataService } from '../games-data.service';
import { Router,RouterModule } from '@angular/router';

export class Game{
  #_id!:string;
  #title!:string;
  #price!:number;
  #year!:number;
  #rate!:number;
  #minPlayers!:number;
  #maxPlayers!:number;

  set _id(_id:string){this.#_id=_id;}
  get _id(){return this.#_id;}
  set title(title:string){this.#title=title;}
  get title(){return this.#title;}
  set price(price:number){this.#price=price;}
  get price(){return this.#price;}
  set year(year:number){this.#year=year;}
  get year(){return this.#year;}
  set rate(rate:number){this.#rate=rate;}
  get rate(){return this.#rate;}
  set minPlayers(minPlayers:number){this.#minPlayers=minPlayers;}
  get minPlayers(){return this.#minPlayers;}
  set maxPlayers(maxPlayers:number){this.#maxPlayers=maxPlayers;}
  get maxPlayers(){return this.#maxPlayers;}
}
@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {

  games:Game[]=[];
  constructor(private _gamesService:GamesDataService,private _router:Router){
    

  }

  ngOnInit(): void {
    this._gamesService.getGames().subscribe(value => {
      this.games=value;
    });
    /*this._gamesService.getCatFacts().subscribe({
      next(value){
        this.games=Object.entries(value)[0][1];
      },
      complete() {
      },
      error(err) {
        console.log(err);
      },
    });*/
  }

}
