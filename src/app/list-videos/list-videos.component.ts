import { ListResponse } from './../_bases/models/ListResponse';
import { VideoService } from './../view-video/services/video.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list-videos',
  templateUrl: './list-videos.component.html',
  styleUrls: ['./list-videos.component.css']
})
export class ListVideosComponent implements OnInit {

  public videoResponse: ListResponse;
  public category: any;
  public filteredCategories: any = [];

  constructor( 
    private router: Router, 
    private _route: ActivatedRoute,
    private _videoService: VideoService) { 
    }

  ngOnInit() {
    this._route.params.subscribe(data => {
      this.category = data;
      console.log('category.....oooo', this.category);
    });
    this.getVideos();
  }

  getVideos() {
    this._videoService.getList().subscribe((res) => {
        this.videoResponse = res;
        console.log('videos---', this.videoResponse);
        for (let i = 0; i < this.videoResponse.results.length; i++) {
          if ( this.category.name === this.videoResponse.results[i].category_name) {
            console.log(this.videoResponse.results[i]);
            this.filteredCategories.push(this.videoResponse.results[i]);
          }
      }
    });
}


  viewVideo(video) {
    this.router.navigate(['/head', 'view-video', video]);
  }

}
