import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, combineLatest, Observable, of } from 'rxjs';
import { BlogService } from '../../blog.service';
import { finalize, switchMap, tap, throttleTime } from 'rxjs/operators';
import { QueryParams } from 'src/app/common/interfaces/pagination';
import { Route } from '@angular/compiler/src/core';
import { IArticle } from 'src/app/common/interfaces/article';
import { FormControl, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormComponent } from '../form/form.component';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  page = 1;
  articles$!: Observable<IArticle[]>;
  queryParams$ = new BehaviorSubject({
    limit: 10,
    search: '',
    page: this.page
  });
  isLoading = false;

  constructor(
    private _blogService: BlogService,
    private route: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.getParams();
    this.getArticles();
  }

  get sort(): string[] { return this._blogService.sort; }
  get sortType(): string[] { return this._blogService.sortType; }

  getParams() {
    this.route.queryParams as Observable<QueryParams>;
    this.route.queryParams.subscribe((res) => {
      if (res['page']) {
        this.queryParams$.next({
          ...this.getValueQueryParams,
          page: res.page
        });
      }
    });
  }

  get getValueQueryParams() {
    return this.queryParams$.value;
  }

  getArticles() {
    this.articles$ = this.queryParams$.pipe(
      tap(res => {
        this.isLoading = true;
        if (res.page) this.page = res.page;
      }),
      switchMap(
        (res: any) => res['page'] ? 
          this._blogService.getArticles(res).pipe(finalize(() => this.isLoading = false)) :
          of([])
      ),
    ) as Observable<IArticle[]>;
  }

  searchArticle(value: string) {
    this.queryParams$.next({
      ...this.getValueQueryParams,
      search: value,
      page: 1
    });
  }

  sortArticle(data: { sortBy: string, orderBy: string } | null | undefined) {
    if (data) {
      this.queryParams$.next({
        ...this.getValueQueryParams,
        ...data
      });
    }
  }

  selectPage(page: number) {
    if (!page) return;

    this.router.navigate(['/blog'], {
      queryParams: {
        page
      }
    });
  }

  openForm(article?: IArticle) {
    const modalRef = this.modalService.open(FormComponent);
    if (article) {
      modalRef.componentInstance.article = article;
    }
  }
}
