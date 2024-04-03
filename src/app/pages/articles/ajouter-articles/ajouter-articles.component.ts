import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { article } from 'src/app/_modèles/article';
import { ArticleService } from 'src/app/_services/articles.service';

@Component({
  selector: 'app-ajouter-articles',
  templateUrl: './ajouter-articles.component.html',
})
export class AjouterArticlesComponent {
  selectedImage: File | null = null;
  article: article;
  myForm: FormGroup;
  valeurParDefaut: string;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private _articleService: ArticleService
  ) {
    this.myForm = this.formBuilder.group({
      id: Math.floor(Math.random() * 10)+100+"",
      titre: "",
      typeArticle: this.formBuilder.group({
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
  //========================================================//
  //handlesave() {}
  ajouterArticle() {
    this.myForm.value.imageCouverture = this.imageBase64;
    this._articleService.ajoutArticle(this.myForm.value).subscribe({
      next: (value: any) => {
        alert(`Article: ${value.titre} ajouté avec succès`);
      },
      error: (error: any) => {
        alert(`Quelques choses s'est mal passé `);
        console.log(error);
      },
    });
    this.router.navigate(['/#/articles/listeAllArticles']); 
    this.myForm.reset();
    //window.location.reload();
  }

  
  
}
