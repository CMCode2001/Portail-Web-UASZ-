import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Formations } from 'src/app/_modèles/formations';
import { FormationsService } from 'src/app/_services/formations.service';

@Component({
  selector: 'app-list-formations',
  templateUrl: './list-formations.component.html',
})
export class ListFormationsComponent {
  myForm : FormGroup;
  Formation = [];
  temp = []


  constructor(
    //private router: Router,
    private fb : FormBuilder,
    private modalService: NgbModal,
    private _FormationsService: FormationsService, 
  ) {
    this.myForm = this.fb.group({
      id: Math.floor(Math.random() * 10) + 100 +"",
      libelleFormation: "",
      descriptionFormation: "",
    });
   
    this.ngOnInit();
    this.afficherLesFormations();
  }

  ngOnInit() {
    this.temp = this.Formation;
  }
  open(contenu):void{
    this.modalService.open(contenu, { centered: true }).result.then((result) => {
      result = "Dialogue fermé";
    }, (raison) => { raison = "Fermé"; });  
  }


// =========================== ADD FORMATION ===================================== //

ajouterFormation(): void {
    this._FormationsService.createFormations(this.myForm.value).subscribe(
      {
      next: (data):any  => {
        console.log(this.myForm.value);
        console.log(data)
        alert(`Formation : ${data.libelleFormation} ajouté avec succès`);
        this.Formation.push(this.myForm.value);
        window.location.reload();
      },
      error: (reponse):any => {
        console.log(reponse);   
      }
    });
  this.myForm.reset();
}

// // ============================ GET ALL Formation ==================================== //

afficherLesFormations():void {
    this._FormationsService.getFormations().subscribe(
      (data) => {
        this.Formation = data;
        this.temp = data;
      },
      (error) => {
        console.log(error);
      });
}
// ================================ UPDATE Formation ====================================== 

// =================== CHARGEMENT DES DONNEES =========================//
openEditModal(contenu: any, formation: Formations) {
 
  this.myForm.patchValue({
    id:formation.id,
    libelleFormation : formation.libelleFormation,
    descriptionFormation : formation.descriptionFormation,
  });
  // Ouvrir le modal
  this.modalService.open(contenu, { centered: true });
}

modifierFormation() {
      this._FormationsService.updateFormations(this.myForm.value).subscribe({
          next: (res) => {
            alert("Formation modifié avec succès");
            console.log(res);
            window.location.reload();
          },
          error: (err) => {
            console.log(err);
          },
        });
    }   

 // =============================== DELETE Formation =======================================

  suppressionFormation(formation: any): void { 
    const confirmation = window.confirm(`Êtes-vous sûr de vouloir supprimer le Formation "${formation.libelleFormation}" ?`);
    if (confirmation) {
    
      this._FormationsService.deleteFormations(formation.id).subscribe(
        () => {
        
          this.Formation = this.Formation.filter(p => p.id !== formation.id);
          console.log("Formation supprimé avec succès:", formation);
        },
        (error) => {
          console.log("Erreur lors de la suppression du Formation:", error);
        }
      );
    }
  }
 // ============================================================================

}
