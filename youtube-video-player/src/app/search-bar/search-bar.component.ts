import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { VideoService } from 'src/video.service';
import { ApiService } from '../api.service';
import { HistoryComponent } from '../history/history.component';

@Component({
  selector: 'search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  link :string = "";
  subscription : Subscription | undefined;
  history!: HistoryComponent;//TODO: En général c'est pas une bonne pratique d'avoir "!" après une variable. Essaie de trouver une autre solution si tu peux

  constructor(private video: VideoService, private api: ApiService) { }

  ngOnInit(): void {
    this.subscription = this.video.currentVideoLink.subscribe(link => this.link = link)
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  researchLink(nlink:string){
    this.video.changeLink(nlink);
    const jsonlink= '{"content": "'+nlink+'"}';
    const obj = JSON.parse(jsonlink);
    this.api.postLink(obj).subscribe(() => this.api.onResearchButtonClick());
    this.api.sendLink(nlink);
  }

}
