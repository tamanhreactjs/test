import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ENPOINTS } from 'src/app/common/constants/api';
import { IArticle } from 'src/app/common/interfaces/article';
import { QueryParams } from 'src/app/common/interfaces/pagination';
import { ApiService } from 'src/app/common/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  sort = ['createdAt'];
  sortType = ['desc', 'asc'];
  constructor(private _apiService: ApiService) { }

  getArticles(params: QueryParams) {
    return this._apiService.get(ENPOINTS.ARTICLE, {
      params: params
    });
  }

  getArticle(id: string) {
    return this._apiService.get(`${ENPOINTS.ARTICLE}/${id}`);
  }

  updateArticle(article: IArticle) {
    return this._apiService.put(`${ENPOINTS.ARTICLE}/${article.id}`, article);
  }

  createArticle(article: IArticle) {
    return this._apiService.post(`${ENPOINTS.ARTICLE}`, article);
  }
}
