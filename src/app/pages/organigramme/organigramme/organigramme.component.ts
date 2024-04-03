import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormationsService } from 'src/app/_services/formations.service';

@Component({
  selector: 'app-organigramme',
  templateUrl: './organigramme.component.html',
})
export class OrganigrammeComponent {
  myForm : FormGroup;
  ListeFormation = [];
  temp = []


  constructor(
    //private router: Router,
    private fb : FormBuilder,
    private modalService: NgbModal,
    private _FormationService: FormationsService, 
  ) {
    this.myForm = this.fb.group({
      id: Math.floor(Math.random() * 10) + 100 + " ",
      libelleFormation: "",
      descriptionFormation: "",
    });
    this.afficherLesFormations();
    this.ngOnInit();
  }
 
  ngOnInit() {
    this.temp = this.ListeFormation;
  }
  open(contenu):void{
    this.modalService.open(contenu, { centered: true }).result.then((result) => {
      result = "Dialogue fermé";
    }, (raison) => { raison = "Fermé"; });  
  }
//   // =================DETAILS======================== //
//   openDetailsModal(content: any, ListeFormation: any) {
//     this.activeDept = ListeFormation; 
//     this.modalService.open(content, { centered: true, size: 'lg' }); 
//   }


// ===========================ADD FORMATION ===================================== //

ajouterFormation(): void {
  console.log("debugu--======================================================");
  console.log(this.myForm.value);
  console.log("debugu--======================================================");

    this._FormationService.createFormations(this.myForm.value).subscribe({
      next: (reponse) => {
        console.log(this.myForm.value);
        console.log(reponse)
        alert(`Formation : ${reponse.libelleFormation} ajouté avec succès`);
        window.location.reload();
        this.ListeFormation.push(this.myForm.value);
        this.myForm.reset(); 
      },
      error: (reponse) => {
        console.log(reponse);   
      }
    });
  this.myForm.reset();
}
// // ============================ GET ALL ListeFormation ==================================== //
  afficherLesFormations():void {
    this._FormationService.getFormations().subscribe(
      (data) => {
        this.ListeFormation = data;
        this.temp = data;
      },
      (error) => {
        console.log(error);
      });
  }
// ================================ UPDATE ListeFormation ====================================== 

// =================== CHARGEMENT DES DONNEES =========================//
openEditModal(contenu: any, formation: any) {
 
  this.myForm.patchValue({
    id:formation.id,
    libelleFormation: formation.libelleFormation,
    descriptionFormation: formation.descriptionFormation
  });
  // Ouvrir le modal
  this.modalService.open(contenu, { centered: true });
}

modifierFormation() {
      this._FormationService.updateFormations(this.myForm.value).subscribe({
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
    
      this._FormationService.deleteFormations(formation.id).subscribe(
        () => {
        
          this.ListeFormation = this.ListeFormation.filter(p => p.id !== formation.id);
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


