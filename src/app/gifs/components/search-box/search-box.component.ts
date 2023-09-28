import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'gifs-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent {

  //@ViewChild Toma una referencia local de un elemento html
  @ViewChild('txtTagInput')
  public tagInput!:ElementRef<HTMLInputElement>;

  constructor(private gifService:GifsService){

  }


  public searchTag():void{
    const newTag=this.tagInput.nativeElement.value;
    //console.log(newTag)
    this.gifService.searchTag(newTag);
    this.tagInput.nativeElement.value='';
  }
}
