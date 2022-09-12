import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { VideoService } from 'src/video.service';
import { ApiService } from '../api.service';

class Bookmarks {
  links : any[]= [];
}

@Component({
  selector: 'bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.scss']
})

export class BookmarksComponent implements OnInit {

  // DONE: mieux differencier les bookmarks et histories. C'est pas logique qu'un objet bookmark contienne "hist" et "book"
  // Pareil pour les histories
  bookmarks : Bookmarks = new Bookmarks();
  isShowing : boolean = false;
  book: string  = "";
  currentVideo: string = ""; //DONE: respecter le camelCase
  link: string = "";
  subscription : Subscription | undefined;


  constructor( private video: VideoService,private api: ApiService) { }
  ngOnInit(): void {
    if (this.getLocal() != null) {
      this.bookmarks = this.getLocal();
    }
    this.subscription = this.video.currentVideoLink.subscribe(link => this.link = link)
    if (this.api.subB == undefined) {
      this.api.subB = this.api.invokeBookFunction.subscribe(link => this.currentVideo = link)
      this.getBookmark();
    }
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  launch(link: string){
    this.video.changeLink(link);
}

  setLocal(res: any): void{
    localStorage.setItem('book', JSON.stringify(res))
  }

  getLocal(): any{
    return JSON.parse(localStorage.getItem('book') as any);
  }


  getBookmark(): void {
    this.api.getBookmarks().subscribe(
        response =>{
          this.setLocal(response)
          this.bookmarks = this.getLocal();
        });
  }
  
  displayBM(){
    this.isShowing = !this.isShowing;
  }
  addBM(){
    //DONE: ça changera peut-être avec le localStorage, mais pour l'instant les deux lignes suivantes ne me semblent pas utiles
    if (this.bookmarks.links.indexOf(this.currentVideo) === -1) {
      const obj = {content: this.currentVideo}
      this.api.postBookLink(obj).subscribe(() => this.getBookmark());
    }
  }

  goodLink(link: any): any{
    return link.length > 1;
  }
}
