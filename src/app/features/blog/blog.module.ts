import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModalModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { ArticleComponent } from 'src/app/components/article/article.component';
import { LoadingModule } from 'src/app/components/loading/loading.module';
import { ToastModule } from 'src/app/components/toast/toast.module';
import { BlogRoutingModule } from './blog-routing.module';
import { DetailComponent } from './components/detail/detail.component';
import { FormComponent } from './components/form/form.component';
import { ListComponent } from './components/list/list.component';
import { SearchComponent } from './components/list/search/search.component';
import { SortComponent } from './components/list/sort/sort.component';

@NgModule({
  declarations: [
    ListComponent,
    DetailComponent,
    ArticleComponent,
    SearchComponent,
    SortComponent,
    FormComponent
  ],
  imports: [
    CommonModule,
    BlogRoutingModule,
    NgbPaginationModule,
    LoadingModule,
    ReactiveFormsModule,
    NgbModalModule,
    ToastModule
  ],
  entryComponents: [FormComponent]
})
export class BlogModule { }
