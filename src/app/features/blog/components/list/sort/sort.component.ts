import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BlogService } from '../../../blog.service';

@Component({
  selector: 'app-sort',
  templateUrl: './sort.component.html',
  styleUrls: ['./sort.component.css']
})
export class SortComponent implements OnInit {
  formSort!: FormGroup;
  @Output() onSort = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder,
    private _blogService: BlogService
  ) { }

  ngOnInit(): void {
    this.formSort = this.formBuilder.group({
      sortBy: ['createdAt', [Validators.required]],
      orderBy: ['desc', Validators.required]
    });
  }

  get sort(): string[] { return this._blogService.sort; }
  get sortType(): string[] { return this._blogService.sortType; }

  sortArticle() {
    if (this.formSort.valid) {
      const { sortBy, orderBy } = this.formSort.value;
      this.onSort.emit({
        sortBy,
        orderBy
      });
    }
  }
}
