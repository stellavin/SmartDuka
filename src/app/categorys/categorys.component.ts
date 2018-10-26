import { ListResponse } from './../_bases/models/ListResponse';
import { CategoryService } from './services/category.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-categorys',
  templateUrl: './categorys.component.html',
  styleUrls: ['./categorys.component.css']
})
export class CategorysComponent implements OnInit {

  public CategoryResponse: ListResponse;

  constructor(
    private router: Router,
    private _categoryService: CategoryService
    ) { }

  ngOnInit() {
    this.getCategorys();
  }

  getCategorys() {
    this._categoryService.getList().subscribe((res) => {
        this.CategoryResponse = res;
        console.log('categorys', this.CategoryResponse);
    });
}

  listVideos(cat) {
    console.log('cat------ooooo', cat);
    this.router.navigate(['/head', 'list-videos', cat]);
  }

}
