import { Component, OnInit } from '@angular/core';
import { Res } from 'response';
import { Subscription } from 'rxjs';
import { VideoService } from 'src/video.service';
import { ApiService } from '../api.service';

@Component({
  selector: 'history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {

  history!: Res;
  link: string = "";
  subscription : Subscription | undefined;
  b = true;
  
  
  constructor(private video: VideoService, private api: ApiService) { }

  ngOnInit(): void {
    this.subscription = this.video.currentVideoLink.subscribe(link => this.link = link)
    this.getHistory();
    if(this.api.subH==undefined){
      this.api.subH = this.api.invokeHistoryFunction.subscribe((_:string)=>{
        this.getHistory();
      })
    }
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  getHistory(): void {
    this.api.getList().subscribe(data => this.history = {hist: data.hist, book:data.book});
    this.b = !this.b;
  }

  launch(link: string){
      this.video.changeLink(link);
  }
}
