import { Component, OnInit } from '@angular/core';
import { VideoService } from 'src/video.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'video-view',
  templateUrl: './video-view.component.html',
  styleUrls: ['./video-view.component.scss']
})
export class VideoViewComponent implements OnInit {
  private apiLoaded = false;

    link: string = "";
    subscription: Subscription | undefined;

    constructor(private video: VideoService) { }
  
    ngOnInit(): void {
      if(!this.apiLoaded) {
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        document.body.appendChild(tag);
        this.apiLoaded = true;
      }
      this.subscription = this.video.currentVideoLink.subscribe(link => this.link = link.slice(32));
    }

    ngOnDestroy(){
      this.subscription?.unsubscribe;
    }
}
