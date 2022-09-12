import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { VideoService } from 'src/video.service';
import { ApiService } from '../api.service';

class History {
  links : any[]= [];
}

@Component({
  selector: 'history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {

  history : History = new History();
  hist: string = "";
  link: string = "";
  subscription : Subscription | undefined;
  b = true;
  
  
  constructor(private video: VideoService, private api: ApiService) { }

  ngOnInit(): void {
    if(this.getLocal() != null){
      this.history = this.getLocal();
    }
      this.subscription = this.video.currentVideoLink.subscribe(link => this.link = link)
      if(this.api.subH==undefined){
        this.api.subH = this.api.invokeHistoryFunction.subscribe((_:string)=>{
          this.getHistory();
        })
    }
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  setLocal(res: any): void{
    localStorage.setItem('hist', JSON.stringify(res))
  }

  getLocal(): any{
    return JSON.parse(localStorage.getItem('hist') as any);
  }

  getHistory(): void {
    this.api.getHistory().subscribe(
        response =>{
          this.setLocal(response)
          this.history = this.getLocal();
        })
    this.b = !this.b;
  }

  launch(link: string){
    this.api.sendLink(link);
    this.video.changeLink(link);
  }

  goodLink(link: any): any{
    return link.length > 1;
  }
}
