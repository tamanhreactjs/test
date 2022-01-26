import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { finalize } from 'rxjs/operators';
import { IArticle } from 'src/app/common/interfaces/article';
import { ToastService } from 'src/app/components/toast/toast.service';
import { BlogService } from '../../blog.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  @Input() article!: IArticle;
  formArticle!: FormGroup;
  isLoading = false;
  constructor(
    private FormBuilder: FormBuilder,
    private _blogService: BlogService,
    private activeModal: NgbActiveModal,
    private _toastService: ToastService
  ) { }

  ngOnInit(): void {
    this.formArticle = this.FormBuilder.group({
      title: [this.article?.title || '', [Validators.required]],
      content: [this.article?.content || '', Validators.required],
      image: [this.article?.image || '', Validators.required],
      createdAt: [this.article?.createdAt || new Date()]
    });
  }

  selectFile(file: any) {
    if (!file) {
      this.formArticle.get('image')?.reset();
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file.target.files[0]);
    reader.onload = () => {
      this.formArticle.get('image')?.setValue(reader.result);
    }
  }

  get getImage() {
    return this.formArticle ? this.formArticle.get('image')?.value : '';
  }

  onSubmit() {
    if(this.formArticle.valid) {
      this.isLoading = true;

      const isEdit = this.article;
      if (isEdit) {
        this.edit();
      } else {
        this.create();
      }
    }
  }

  create() {
    this._blogService.createArticle(this.formArticle.value).pipe(
      finalize(() => {
        this.isLoading = false;
        this.activeModal.close();
      })
    )
    .subscribe(res => {
      this.isLoading = false;
      this.activeModal.close();
      this._toastService.show('Create article success', { classname: 'bg-success text-light', delay: 5000 });
    }, err => {
      this._toastService.show('Create article fail', { classname: 'bg-danger text-light', delay: 5000 });
    });
  }

  edit() {
    this._blogService.updateArticle({
      ...this.formArticle.value,
      id: this.article.id
    }).pipe(
      finalize(() => {
        this.isLoading = false;
        this.activeModal.close();
      })
    ).subscribe(res => {
      this._toastService.show('Edit article success', { classname: 'bg-success text-light', delay: 5000 });
    }, err => {
      this._toastService.show('Edit article fail', { classname: 'bg-danger text-light', delay: 5000 });
    });
  }
}
