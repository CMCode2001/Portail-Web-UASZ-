import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DepartementService } from 'src/app/_services/departement.service';
import { FormationsService } from 'src/app/_services/formations.service';
import { OrganigrammeService } from 'src/app/_services/organigramme.service';

export enum SelectionType {
  single = "single",
  multi = "multi",
  multiClick = "multiClick",
  cell = "cell",
  checkbox = "checkbox"
}
@Component({
  selector: 'app-list-departement',
  templateUrl: './list-departement.component.html',
})
export class ListDepartementComponent implements OnInit {
  entries: number = 25;
  valeurParDefaut: string;
  activeRow: any;
  myForm : FormGroup;
  Departement = [];
  Formations = [];
  Directions = [];
  selectedDepartementDirection = []
  temp = [] ;
  temp1 = []
  selectedDepartementId: number;
  selectedDirectionId: number;


  constructor(
    //private router: Router,
    private fb : FormBuilder,
    private modalService: NgbModal,
    private _DepartementService: DepartementService,
    private _FormationService : FormationsService,
    private _OrganigrammeService: OrganigrammeService
  ) {
    this.myForm = this.fb.group({
      id: Math.floor(Math.random() * 10) + 100 + "",
      libelleDept: "",
      descriptionDept: "",
      direction:""
    });
    this.ngOnInit();
    this.afficherLesDepartements();

  }
 
  ngOnInit() {

    this._OrganigrammeService.getAllDirections().subscribe(directions => {
      this.Directions = directions;
    });

    this.temp = this.Departement;
    this.temp1 = this.Formations

  }
  open(contenu):void{
    this.modalService.open(contenu, { centered: true }).result.then((result) => {
      result = "Dialogue fermé";
    }, (raison) => { raison = "Fermé"; });  
  }

// ======================= DETAILS ======================== //
  openDetailsModal(contenu ,departementId: number) {
    this.selectedDepartementId = departementId;
    console.log('Selected Department ID:', this.selectedDepartementId); 
    this.modalService.open(contenu, { centered: true });
    this.mesFormationsParDepartement();
  }

  mesFormationsParDepartement() {
    this._FormationService.getFormationsByDepartement(this.selectedDepartementId).subscribe(
      (formations) => {
        console.log('Formations:', formations); 
        this.Formations = formations;
      },
      (error) => {
        console.log(error); 
      }
    );
  
    this._DepartementService.getDirectionByDepartement(this.selectedDepartementId).subscribe(
      (direction) => {
        console.log('Direction:', direction); 
        // Stockez les informations sur la direction dans une variable distincte
        this.selectedDepartementDirection = direction;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  

// ===========================ADD DEPARTEMENT ===================================== //

// ajouterDepartement(): void {

//     this._DepartementService.createDepartement(this.myForm.value).subscribe({
//       next: (reponse) => {
//         console.log(this.myForm.value);
//         console.log(reponse)
//         alert(`Departement: ${reponse.libelleDept} ajouté avec succès`);
//         this.Departement.push(this.myForm.value);
//         window.location.reload();
//         console.log("Donnee de la liste =================================");
//         this.myForm.reset(); 
//       },
//       error: (reponse) => {
//         console.log(reponse);        
//       }
//     });
//   this.myForm.reset();
// }
ajouterDepartement(): void {
  const formData = this.myForm.value;
  formData.directionId = this.myForm.get('direction').value;

  this._DepartementService.createDepartement(formData).subscribe({
    next: (reponse) => {
      console.log(this.myForm.value);
      console.log(reponse)
      alert(`Département: ${reponse.libelleDept} ajouté avec succès`);
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

// ======================================================================================

entriesChange($event) {
  this.entries = $event.target.value;
}
filterTable($event) {
  let val = $event.target.value;
  this.temp = this.Departement.filter((d) => {
    return Object.values(d).some((value) => {
      return value.toString().toLowerCase().includes(val);
    });
  });
}

onContentChanged(event: any) {
  this.valeurParDefaut = event.text;
}
 
onActivate(event) {
  if (event.type === "click") {
    this.activeRow = event.row;
    this.valeurParDefaut = this.activeRow.description;
  
  }
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

 suppressionDepartement(id: number) {
  if (confirm("Etes vous surs de vouloir supprimer")==true) {
    this._DepartementService.deleteDepartement(id).subscribe({
      next(value) {
        
        window.location.reload();
      },
      error: (err: any) => {
        console.error(err);
      },
    });
  }
}
 // ============================================================================

}

