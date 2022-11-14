import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Game } from './games/games.component';

@Injectable({
  providedIn: 'root'
})
export class GamesDataService {

  //private _baseUrl:string="https://meowfacts.herokuapp.com/";
  private _baseUrl:string="http://localhost:3000/api";
  //Lecture_03 app01
  constructor(private _http:HttpClient) {

  }

  public getGames(): Observable<Game[]>{
    const url:string=this._baseUrl+"/games?count=5";
    return this._http.get(url) as Observable<Game[]>;
  }

  public getGame(gameId:string): Observable<Game>{
    const url:string=this._baseUrl+"/games/"+gameId;
    return this._http.get(url) as Observable<Game>;
  }
 
}
