import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Article } from 'src/app/_modèles/Articles/articles';
import { ArticleService } from 'src/app/_services/articles.service';

@Component({
  selector: 'app-formulaire',
  templateUrl: './formulaire.component.html',
  styleUrls: ['./formulaire.component.scss']
})
export class FormulaireComponent {
  articleForm:FormGroup;
  articles: Article[] = [];

  constructor(private fb: FormBuilder, private articleService: ArticleService,
    private modalService: NgbModal) {
  
    this.articleForm = this.fb.group({
      titre: ['', Validators.required],
      description: ['', Validators.required],
      date: ['', Validators.required],
      typeArticle: ['', Validators.required],
      visible: [true],
      archive: [false],
      imageCouverture: [''],
    });
  }
  
  RecupDonneArticle() {
    const article: Article = this.articleForm.value;
    this.articleService.createArticle(article).subscribe((createdArticle: Article) => {
      this.articles.push(createdArticle); // Ajout de l'article nouvellement créé au tableau
    });
  }
  
  open(classic: any) {
    this.modalService.open(classic, {centered:true}).result.then((result) =>
    {
      result="Dialogue ferme"
    },
      (raison)=>{raison="Ferme"});
  }

}
