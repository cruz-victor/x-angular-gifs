import { Component, Input, OnInit } from '@angular/core';
import { Gif } from '../../interfaces/gifs.inteface';

@Component({
  selector: 'gifs-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input()
  public gif!: Gif;

  //Se ejecuta cuando el componente se ha inicializado
  ngOnInit(): void {
    if(!this.gif) throw new Error('Gif property is requiered');
  }

}
