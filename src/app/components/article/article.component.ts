import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { IArticle } from 'src/app/common/interfaces/article';

@Component({
  selector: 'article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  @Input() article!: IArticle;
  @Output() onEdit = new EventEmitter();
  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  selectArticle(id: string) {
    id && this.router.navigate(['/blog', id]);
  }

  openFormEdit() {
    this.onEdit.emit(this.article);
  }
}
