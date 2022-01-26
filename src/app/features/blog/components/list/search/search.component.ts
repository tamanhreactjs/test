import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchControl = new FormControl('');
  @Output() onSearch = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  searchArticle() {
    const searchTxt = this.searchControl.value;
    if (this.searchControl.valid) {
      this.onSearch.emit(searchTxt);
    }
  }
}
