import { Component, Output, EventEmitter, OnInit, Input, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTableBodyRowComponent } from '@swimlane/ngx-datatable';
import { Partenaires } from 'src/app/_modèles/partenaires';
import { PartenairesService } from 'src/app/_services/partenaires.service';

@Component({
  selector: 'app-list-partenaires',
  templateUrl: './list-partenaires.component.html',
  styleUrls: ['./list-partenaires.component.scss']
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
      
    
    }
/*
    onSubmit() {
      if (this.partenaireForm.valid) {
        const editedPartenaire = { ...this.partenaire, ...this.partenaireForm.value };
        // Envoyez le partenaire édité au service pour mise à jour dans la base de données
        this.partService.updatePartenaire(editedPartenaire).subscribe(() => {
          // Fermez le formulaire d'édition après la mise à jour
          //this.modal.dismissAll();
        });
      }
    }*/
    
  ngOnInit() {

    this.partenaireForm = this._fb.group({
      nomPart: ['', Validators.required],
      descriptionPart: ['', Validators.required],
      siteWebPart: ['', Validators.required],
      logoPart: ['', Validators.required],
      actif: [true]
    });

    this.getPartenaires();


  }


//RECUPERATION DES DONNEES A TRAVERS LE SERVICE/
  getPartenaires(): void {
    this.partService.getPartenaires().subscribe(
      (data) => {
        this.partenaires = data; 
      },
      (error) => {
        console.log(error);
  });
  } 
  ajoutPartenaire() {
    if (this.partenaireForm.valid) {
      this.partService.createPartenaires(this.partenaireForm.value).subscribe({
        next: (reponse) => {
          alert("Partenaire ajouté avec succès...! ");
          this.partenaires.push(this.partenaireForm.value);
          this.partenaireForm.reset(); // Réinitialise le formulaire après soumission réussie
        },
        error: (reponse) => {
          alert("Erreur lors de l'ajout du partenaire ")
        }
      });
    }
  }
  
  open(classicPartenaire: any) {
    this.modal.open(classicPartenaire, { centered: true }).result.then((result) => {
      result = "Dialogue fermé";
      this.partenaireForm.reset(); 
    }, (raison) => { raison = "Fermé"; });
  }
  
  // ----------------------------//
 

  RecupDonnePartenaire() {
    const formValue = this.partenaireForm.value;
    const partenaires: Partenaires = {
      id: null,
      nomPart: formValue.nomPart,
      descriptionPart: formValue.descriptionPart,
      siteWebPart: formValue.siteWebPart,
      logoPart: formValue.logoPart,
      actif: formValue.actif
    };
    this.partService.createPartenaires(partenaires).subscribe((newPart: Partenaires) => {
      // Ajouter le nouveau partenaire à la liste existante
      this.partenaires.push(newPart);
      // Réinitialiser le formulaire après soumission
      this.partenaireForm.reset();
    });
  }


  //LES OPERATIONS DE PUT & DELETE


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
 

  //---- EDITION DE PARTENAIRE ----//
   // Fonction pour ouvrir le formulaire d'édition avec les données du partenaire sélectionné
   
   openEditPartenaire(editPartenaire ,idp: number) {
    // Ouvrez la modal d'édition et pré-remplissez les champs avec les valeurs existantes du partenaire
    const modalRef = this.modal.open(editPartenaire, { centered:true });
    console.log(idp);
    const partner = this.partenaires.find(partner => partner.id ===idp);
    this.partenaireUpdate = partner;
    this.partenaireForm.controls["nomPart"].setValue(partner.nomPart);
    this.partenaireForm.controls["descriptionPart"].setValue(partner.descriptionPart);
    this.partenaireForm.controls["siteWebPart"].setValue(partner.siteWebPart);
    this.partenaireForm.controls["logoPart"].setValue(partner.logoPart);
    this.partenaireForm.controls["actif"].setValue(partner.actif);
    //modalRef.componentInstance.partenaire = partner; // Passer le partenaire sélectionné à la modal
    console.log(this.partenaireForm.value);
  }
}
