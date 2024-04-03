import { Component, Output, EventEmitter, OnInit, Input, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTableBodyRowComponent } from '@swimlane/ngx-datatable';
import { Partenaires } from 'src/app/_modèles/partenaires';
import { PartenairesService } from 'src/app/_services/partenaires.service';

@Component({
  selector: 'app-list-partenaires',
  templateUrl: './list-partenaires.component.html',
})
export class ListPartenairesComponent implements OnInit{
  partenaireUpdate:Partenaires | undefined;
  partenaires: Partenaires[] = [];
  partenaireForm: FormGroup;

  @Inject(DataTableBodyRowComponent) public editPartner:Partenaires


  constructor(private modal:NgbModal, 
    private partService:PartenairesService,
    private _fb: FormBuilder,
    ) {
      // Initialisez le formulaire avec les données du partenaire
      
      this.partenaireForm = this._fb.group({
        id :Math.floor(Math.random() * 10) + 100 + "",
        nomPart: "",
        descriptionPart: "" ,
        siteWebPart: "",
        logoPart: "",
        actif: true
      });
    }
// ======================== RESOLUTION D'IMAGE ==========================//

imageBase64: string | ArrayBuffer | null = null;

onFileSelected(event: any) {
  const file: File = event.target.files[0];
  const reader = new FileReader();
  
  reader.onload = (e: any) => {
    this.imageBase64 = e.target.result;
  };

  reader.readAsDataURL(file);
}
// =====================================================================//

// ------ MON MODAL -------//
  open(classicPartenaire: any) {
    this.modal.open(classicPartenaire, { centered: true }).result.then((result) => {
      result = "Dialogue fermé";
      this.partenaireForm.reset(); 
    }, (raison) => { raison = "Fermé"; });
  }
// =====================================================================//

ngOnInit() {
    this.getAllPartenaires();
  }

// =====================================================================//

//---- AFFICHER TOUS LES PARTENAIRES ----//
  getAllPartenaires(): void {
    this.partService.getPartenaires().subscribe(
      (data) => {
        this.partenaires = data; 
      },
      (error) => {
        console.log(error);
  });
  } 

// =====================================================================//

//---- AJOUTER UN PARTENAIRE ----//

  ajoutPartenaire(): void {
    console.log("debugu--======================================================");
    console.log(this.partenaireForm.value);
    console.log("debugu--======================================================");

      this.partenaireForm.value.logoPart = this.imageBase64;
      this.partService.createPartenaires(this.partenaireForm.value).subscribe({
        next: (reponse) => {
          console.log(this.partenaireForm.value);
          console.log(reponse)
          alert("Partenaire ajouté avec succès...! ");
          window.location.reload();
          this.partenaires.push(this.partenaireForm.value);
          console.log("Donnee de la liste =================================");
          console.log(this.partenaires);
          this.partenaireForm.reset(); 
        },
        error: (reponse) => {
          alert("Erreur lors de l'ajout du partenaire ")
        }
      });
    this.partenaireForm.reset();
  }

// =====================================================================//

//---- SUPRESSION DU PARTENAIRE ----//
  deletePartenaire(partenaire: Partenaires): void {
    
    const confirmation = window.confirm(`Êtes-vous sûr de vouloir supprimer le partenaire "${partenaire.nomPart}" ?`);
    if (confirmation) {
    
      this.partService.deletePartenaires(partenaire.id).subscribe(
        () => {
        
          this.partenaires = this.partenaires.filter(p => p.id !== partenaire.id);
          console.log("Partenaire supprimé avec succès:", partenaire);
        },
        (error) => {
          console.log("Erreur lors de la suppression du partenaire:", error);
        }
      );
    }
  }

// =====================================================================//
openDialogue(contenu) {
  this.modal.open(contenu, { centered: true }).result.then(
    (result) => {
     "Closed with: $result";
    },
    (reason) => { "Dismissed $this.getDismissReason(reason)";
    }
  );
}

//---- ========== MODIFICATION DE PARTENAIRE =============----//
// =================== CHARGEMENT DES DONNEES =========================//
openEditModal(contenu, partenaire: Partenaires) {
  this.partenaireForm.value.logoPart = this.imageBase64;
  this.partenaireForm.patchValue({
    id:partenaire.id,
    nomPart: partenaire.nomPart,
    descriptionPart: partenaire.descriptionPart,
    siteWebPart: partenaire.siteWebPart,
    logoPart: partenaire.logoPart,
    actif: partenaire.actif
  });

  // Ouvrir le modal
  this.modal.open(contenu, { centered: true });
}

//====================================================//
modifierPartenaire() {
    this.partenaireForm.value.logoPart = this.imageBase64;
    this.partService.updatePartenaire(this.partenaireForm.value).subscribe({
        next: (res) => {
          alert("Partenaire modifié avec succès");
          console.log(res);
          window.location.reload();
        },
        error: (err) => {
          console.log(err);
        },
      });
    console.log(this.partenaireForm.value);
    this.partenaireForm.reset();
  }   
}
