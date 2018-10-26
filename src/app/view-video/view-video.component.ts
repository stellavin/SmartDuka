import { ActivatedRoute } from '@angular/router';
import { ListResponse } from './../_bases/models/ListResponse';
import { VideoService } from './services/video.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-video',
  templateUrl: './view-video.component.html',
  styleUrls: ['./view-video.component.css']
})
export class ViewVideoComponent implements OnInit {

  public videoResponse: ListResponse;
  public video: any;

  constructor( 
    private _videoService: VideoService,
    private _route: ActivatedRoute ) { }

  ngOnInit() {
    this._route.params.subscribe(data => {
      this.video = data;
      console.log('single video', this.video);
    });
    
  }

  getVideos() {
    this._videoService.getList().subscribe((res) => {
        this.videoResponse = res;
        console.log('videos---', this.videoResponse);
    });
}

}
