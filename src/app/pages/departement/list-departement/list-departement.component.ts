import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DepartementService } from 'src/app/_services/departement.service';

@Component({
  selector: 'app-list-departement',
  templateUrl: './list-departement.component.html',
})
export class ListDepartementComponent implements OnInit {
  myForm : FormGroup;
  Departement = [];
  temp = []


  constructor(
    //private router: Router,
    private fb : FormBuilder,
    private modalService: NgbModal,
    private _DepartementService: DepartementService
  ) {
    this.myForm = this.fb.group({
      id: Math.floor(Math.random() * 10) + 100 + "",
      libelleDept: "",
      descriptionDept: "",
    });
    this.ngOnInit();
    this.afficherLesDepartements();

  }
 
  ngOnInit() {
    this.temp = this.Departement;

  }
  open(contenu):void{
    this.modalService.open(contenu, { centered: true }).result.then((result) => {
      result = "Dialogue fermé";
    }, (raison) => { raison = "Fermé"; });  
  }
//   // =================DETAILS======================== //
//   openDetailsModal(content: any, departement: any) {
//     this.activeDept = departement; 
//     this.modalService.open(content, { centered: true, size: 'lg' }); 
//   }


// ===========================ADD DEPARTEMENT ===================================== //

ajouterDepartement(): void {

    this._DepartementService.createDepartement(this.myForm.value).subscribe({
      next: (reponse) => {
        console.log(this.myForm.value);
        console.log(reponse)
        alert(`Departement: ${reponse.libelleDept} ajouté avec succès`);
        this.Departement.push(this.myForm.value);
        window.location.reload();
        console.log("Donnee de la liste =================================");
        this.myForm.reset(); 
      },
      error: (reponse) => {
        console.log(reponse);
        
      }
    });
  this.myForm.reset();
}
// // ============================ GET ALL DEPARTEMENT ==================================== //
  afficherLesDepartements():void {
    this._DepartementService.getAllDepartements().subscribe(
      (data) => {
        this.Departement = data;
        this.temp = data;
      },
      (error) => {
        console.log(error);
      });
  }
// ================================ UPDATE DEPARTEMENT ====================================== 

// =================== CHARGEMENT DES DONNEES =========================//
openEditModal(contenu: any, departement: any) {
 
  this.myForm.patchValue({
    id:departement.id,
    libelleDept: departement.libelleDept,
    descriptionDept: departement.descriptionDept
  });
  // Ouvrir le modal
  this.modalService.open(contenu, { centered: true });
}

modifierDepartement() {
      this._DepartementService.updateDepartement(this.myForm.value).subscribe({
          next: (res) => {
            alert("Departement modifié avec succès");
            console.log(res);
            window.location.reload();
          },
          error: (err) => {
            console.log(err);
          },
        });
      //console.log(this.departementForm.value);
    }   

 // =============================== DELETE DEPARTEMENT =======================================

  suppressionDepartement(departement: any): void { 
    const confirmation = window.confirm(`Êtes-vous sûr de vouloir supprimer le departement "${departement.libelleDept}" ?`);
    if (confirmation) {
    
      this._DepartementService.deleteDepartement(departement.id).subscribe(
        () => {
        
          this.Departement = this.Departement.filter(p => p.id !== departement.id);
          console.log("Departement supprimé avec succès:", departement);
        },
        (error) => {
          console.log("Erreur lors de la suppression du departement:", error);
        }
      );
    }
  }
 // ============================================================================

}

