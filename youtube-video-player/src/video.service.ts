import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  private videoLink = new BehaviorSubject('default videolink');
  currentVideoLink = this.videoLink.asObservable();
  constructor() { }

  changeLink(nlink: string){
    this.videoLink.next(nlink);
  }
}
