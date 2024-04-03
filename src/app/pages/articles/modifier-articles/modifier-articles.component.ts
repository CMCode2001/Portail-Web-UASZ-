import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { article } from 'src/app/_modèles/article';
import { ArticleService } from 'src/app/_services/articles.service';

@Component({
  selector: 'app-modifier-articles',
  templateUrl: './modifier-articles.component.html',
})
export class ModifierArticlesComponent {
  selectedImage: File | null = null;
  article: article;
  myForm: FormGroup;
  valeurParDefaut: string;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private modal: NgbModal,

    private _articleService: ArticleService
  ) {
    this.myForm = this.formBuilder.group({
      id: Math.floor(Math.random() * 10)+100+"",
      titre: "",
      typeArticle: this.formBuilder.group({
        // Créez un `FormGroup` pour `typeArticle`
        id: Math.floor(Math.random() * 10),
        libelle: "",
      }),
      imageCouverture: "",
      datepub:"",
      archive: false,
      visible: true,
      description: "",
    });
  }

  // ==================RESOLUTION IMAGE========================//
 imageBase64: string | ArrayBuffer | null = null;

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e: any) => {
      this.imageBase64 = e.target.result;
    };

    reader.readAsDataURL(file);
  }

  // ==========================================================

// ===========================================================

  modifierArticle() {
    this.myForm.value.imageCouverture = this.imageBase64;
    this._articleService.updateArticle(this.myForm.value).subscribe({
        next: (res) => {
          alert("article modifié avec succès");
          console.log(res);
          window.location.reload();
        },
        error: (err) => {
          console.log(err);
        },
      });
    console.log(this.myForm.value);
    this.myForm.reset();
  }   
}
