import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EMPTY } from 'rxjs';
import { finalize, switchMap } from 'rxjs/operators';
import { IArticle } from 'src/app/common/interfaces/article';
import { BlogService } from '../../blog.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  article!: IArticle;
  isLoading = false;

  constructor(
    private route: ActivatedRoute,
    private _blogService: BlogService
  ) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.route.params.pipe(
      switchMap(res => res?.id ? this._blogService.getArticle(res.id).pipe(
        finalize(() => this.isLoading = false)
      ) : EMPTY)
    ).subscribe((res: any) => {
      if (res) {
        this.article = res;
        console.log(this.article)
      }
    });
  }
}
