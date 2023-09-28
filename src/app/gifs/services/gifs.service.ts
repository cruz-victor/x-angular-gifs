import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchResponse, Gif } from '../interfaces/gifs.inteface';

//providedIn hacer que el servicio este disponible en toda la app
@Injectable({
  providedIn: 'root',
})
export class GifsService {
  public gifList:Gif[]=[];

  private _tagsHistory: string[] = [];
  private apiKey: string = 'uWqfYLdkY4X7MtGjAwBIOyvyGNaMa8k9';
  private serviceUrl: string = 'https://api.giphy.com/v1/gifs';

  constructor(private http: HttpClient) {
    this.loadLocalStorage();
  }

  get tagsHistory(): string[] {
    return [...this._tagsHistory];
  }

  public searchTag(tag: string): void {
    if (tag.length == 0) return;

    this.organizeHistory(tag);

    //this._tagsHistory.unshift(tag);
    //console.log(this.tagsHistory);

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', 10)
      .set('q', tag);

    //En javascript se hace consulta a url con 'fetch'
    //observable, es un objeto similar a un channel, topic, etc.
    //subscribe permite suscribirme a un observable
    this.http.get<SearchResponse>(`${this.serviceUrl}/search`, { params })
    .subscribe((resp) => {
      this.gifList=resp.data;
      //console.log({gifs: this.gifList});
    });
  }

  private organizeHistory(tag: string) {
    tag = tag.toLowerCase();

    if (this._tagsHistory.includes(tag)) {
      this._tagsHistory = this._tagsHistory.filter((oldTag) => oldTag != tag);
    }

    this._tagsHistory.unshift(tag);
    this._tagsHistory = this._tagsHistory.splice(0, 10);
    this.saveLocalStorage();
  }

  private saveLocalStorage():void{
    localStorage.setItem('history', JSON.stringify(this._tagsHistory));
  }

  private loadLocalStorage():void{
    if(!localStorage.getItem('history')) return;

    this._tagsHistory=JSON.parse(localStorage.getItem('history')!);

    if(this._tagsHistory.length == 0) return;

    this.searchTag(this._tagsHistory[0]);
  }
}
