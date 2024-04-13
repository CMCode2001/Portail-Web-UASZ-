import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Component, OnInit} from "@angular/core";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ArticleService } from "src/app/_services/articles.service";
export enum SelectionType {
  single = "single",
  multi = "multi",
  multiClick = "multiClick",
  cell = "cell",
  checkbox = "checkbox"
}
@Component({
  selector: 'app-list-articles',
  templateUrl: './list-articles.component.html',
})
export class ListArticlesComponent implements OnInit{
  entries: number = 25;
  valeurParDefaut: string;
  selected: any[] = [];
  temp = [];
  activeRow: any;
  activeArticle: any;
  content: string = "";
  formBuilder : FormBuilder;
  Articles = [];
  SelectionType = SelectionType;
  myForm:FormGroup;

  constructor(
    private modalService: NgbModal,
    private _articleService: ArticleService
  ) {
    // this.myForm = this.formBuilder.group({
    //   id: Math.floor(Math.random() * 10)+100+"",
    //   titre: "",
    //   typeArticle: this.formBuilder.group({
    //     // Créez un `FormGroup` pour `typeArticle`
    //     id: Math.floor(Math.random() * 10),
    //     libelle: "",
    //   }),
    //   imageCouverture: "",
    //   datepub:"",
    //   archive: false,
    //   visible: true,
    //   description: "",
    // });
    // this.ngOnInit();
  }
  entriesChange($event) {
    this.entries = $event.target.value;
  }
  filterTable($event) {
    let val = $event.target.value;
    this.temp = this.Articles.filter((d) => {
      return Object.values(d).some((value) => {
        return value.toString().toLowerCase().includes(val);
      });
    });
  }

  ngOnInit() {
    this.afficherToutesLesArticles();
    this.temp = this.Articles;
  }
  // =================DETAILS======================== //
  openDetailsModal(content: any, article: any) {
    this.activeArticle = article; 
    this.modalService.open(content, { centered: true, size: 'lg' }); 
  }
  // ===================EDITIONS====================== //

    // =================== CHARGEMENT DES DONNEES =========================//
// openEditModal(contenu: any, article: any) {
//   this.activeArticle = article; 
//   this.myForm.value.imageCouverture = this.imageBase64;
//   this.myForm.patchValue({
//     id:article.idArt,
//     titre: article.titre,
//     typeArticle: article.typeArticle.libelle,
//     imageCouverture: article.imageCouverture,
//     archive: article.archive,
//     visible: article.visible,
//     datepub: article.datepub
//   });

//   // Ouvrir le modal
//   this.modalService.open(contenu, { centered: true , size: 'lg' });
// }

  // ========================================= //
  afficherToutesLesArticles() {
    this._articleService.getAllArticles().subscribe({
      next: (data) => {
        this.Articles = data;
        this.temp = data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  onContentChanged(event: any) {
    this.valeurParDefaut = event.text;
  }
  
   imageBase64: string | ArrayBuffer | null = null;

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e: any) => {
      this.imageBase64 = e.target.result;
    };

    reader.readAsDataURL(file);
  }
  onActivate(event) {
    if (event.type === "click") {
      this.activeRow = event.row;
      this.valeurParDefaut = this.activeRow.description;
    
    }
  }
  // ============================================================================
  suppressionArticle(id: number) {
    if (confirm("Etes vous surs de vouloir supprimer")==true) {
      this._articleService.deleteArticle(id).subscribe({
        next(value) {
          
          window.location.reload();
        },
        error: (err: any) => {
          console.error(err);
        },
      });
      //  this.router.navigate(['/#/articles']);
    }
  }
  // ============================================================================
// -------------- EDITIONS -------------- //
// ==========================================================
// openEditModal(contenu: any, article: any) {
//   this.activeArticle = article; 
//   this.myForm.value.imageCouverture = this.imageBase64;
//   this.myForm.patchValue({
//     id:article.idArt,
//     titre: article.titre,
//     typeArticle: article.typeArticle.libelle,
//     imageCouverture: article.imageCouverture,
//     archive: article.archive,
//     visible: article.visible,
//     datepub: article.datepub
//   });

//   // Ouvrir le modal
//   this.modalService.open(contenu, { centered: true , size: 'lg' });
// }
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


