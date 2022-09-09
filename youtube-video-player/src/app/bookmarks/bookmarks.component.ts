import { Component, OnInit } from '@angular/core';
import { Res } from 'response';
import { Subscription } from 'rxjs';
import { VideoService } from 'src/video.service';
import { ApiService } from '../api.service';

@Component({
  selector: 'bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.scss']
})
export class BookmarksComponent implements OnInit {

  // TODO: mieux differencier les bookmarks et histories. C'est pas logique qu'un objet bookmark contienne "hist" et "book"
  // Pareil pour les histories
  bookmark! : Res;
  isShowing : boolean = false;
  currentvideo: string = ""; //TODO: respecter le camelCase
  link: string = "";
  subscription : Subscription | undefined;


  constructor( private video: VideoService,private api: ApiService) { }
  ngOnInit(): void {
    this.subscription = this.video.currentVideoLink.subscribe(link => this.link = link)
    this.getBookmark();
    if(this.api.subB==undefined){
      this.api.subB = this.api.invokeBookFunction.subscribe(link=>this.currentvideo =link)
    }
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  launch(link: string){
    this.video.changeLink(link);
}

  getBookmark(): void {
    this.api.getList().subscribe(data => {this.bookmark = {hist: data.hist, book:data.book}; console.log(this.bookmark)});
  }
  
  displayBM(){
    this.isShowing = !this.isShowing;
  }
  addBM(){
    //TODO: ça changera peut-être avec le localStorage, mais pour l'instant les deux lignes suivantes ne me semblent pas utiles
    const jsonlink= '{"content": "'+this.currentvideo+'"}';
    const obj = JSON.parse(jsonlink);
    // const obj = {content: this.currentvideo} devrait marcher pareil
    this.api.postBookLink(obj).subscribe(()=>this.getBookmark());
  }
}
