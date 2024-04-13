import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DepartementService } from 'src/app/_services/departement.service';
import { FormationsService } from 'src/app/_services/formations.service';

export enum SelectionType {
  single = "single",
  multi = "multi",
  multiClick = "multiClick",
  cell = "cell",
  checkbox = "checkbox"
}
@Component({
  selector: 'app-formations',
  templateUrl: './formations.component.html',
  styleUrls: ['./formations.component.scss']
})
export class FormationsComponent {
  entries: number = 25;
  valeurParDefaut: string;
  selected: any[] = [];
  temp = [];
  activeRow: any;
  activeFormation: any;
  content: string = "";
  Formations = [];
  Departements: any[];
  SelectionType = SelectionType;
  myForm:FormGroup;

  constructor(
    private modalService: NgbModal,   
    private fb : FormBuilder,
    private _formationService: FormationsService,
    private _departementService: DepartementService
  ) {
    this.myForm = this.fb.group({
      id: Math.floor(Math.random() * 10) + 100 + "",
      libelleForm: "",
      descriptionForm: "",
      departementId: ""
    });
     this.ngOnInit();
  }
  entriesChange($event) {
    this.entries = $event.target.value;
  }
  filterTable($event) {
    let val = $event.target.value;
    this.temp = this.Formations.filter((d) => {
      return Object.values(d).some((value) => {
        return value.toString().toLowerCase().includes(val);
      });
    });
  }

  ngOnInit() {
    this._departementService.getAllDepartements().subscribe(departements => {
      this.Departements = departements;
    });

    this.afficherToutesLesFormations();
    this.temp = this.Formations;
  }
  // =================Modal======================== //
  openModalFormaion(contenu):void{
    this.modalService.open(contenu, { centered: true }).result.then((result) => {
      result = "Dialogue fermé";
    }, (raison) => { raison = "Fermé"; });  
  }
  // ================================================ //
  openDetailsModal(content: any, form: any) {
    this.activeFormation = form; 
    this.modalService.open(content, { centered: true, size: 'lg' }); 
  }
  // ===================ADD====================== //

  ajouterFormation(): void {

    this._formationService.createFormations(this.myForm.value).subscribe({
      next: (reponse) => {
        console.log(this.myForm.value);
        console.log(reponse)
        alert(`Formation: ${reponse.libelleForm} ajouté avec succès`);
        this.Formations.push(this.myForm.value);
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

  // ===================================================================== //
  afficherToutesLesFormations() {
    this._formationService.getFormations().subscribe({
      next: (data) => {
        this.Formations = data;
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
   
  onActivate(event) {
    if (event.type === "click") {
      this.activeRow = event.row;
      this.valeurParDefaut = this.activeRow.description;
    
    }
  }


// ------------------------------ EDITIONS ---------------------------- //

// =================== CHARGEMENT DES DONNEES =========================//

  openEditModal(contenu: any, departement: any) {
 
    this.myForm.patchValue({
      id:departement.id,
      libelleForm: departement.libelleForm,
      descriptionForm: departement.descriptionForm,
      departementId: departement.id
    });
    // Ouvrir le modal
    this.modalService.open(contenu, { centered: true });
  }
  
// ------------------------------------------------------------------//
modifierFormation() {
  this._formationService.updateFormations(this.myForm.value).subscribe({
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
// ====================================================================================

// ================================= DELETE ===========================================
  suppressionFormation(id: number) {
    if (confirm("Etes vous surs de vouloir supprimer")==true) {
      this._formationService.deleteFormations(id).subscribe({
        next(value) {
          
          window.location.reload();
        },
        error: (err: any) => {
          console.error(err);
        },
      });
    }
  }
}
