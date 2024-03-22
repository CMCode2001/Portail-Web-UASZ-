import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Departement } from 'src/app/_modèles/departement';
import { DepartementService } from 'src/app/_services/departement.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-list-departement',
  templateUrl: './list-departement.component.html',
  styleUrls: ['./list-departement.component.scss']
})
export class ListDepartementComponent  implements OnInit{
    private deptForm : FormGroup;
    mesDept$ : Departement [] = [];
    departement : Departement;
  
    constructor( private modal:NgbModal,
      private deptService : DepartementService,
      private _deptForm : FormBuilder,
      private router: Router){
  
    }
    ngOnInit(){
      this.deptForm = this._deptForm.group({
        libelleDept : this._deptForm.control(''),
        descriptionDept : this._deptForm.control(''),
        
      });
      this.getAllDepartement();
    }
    //MODAL OUVERTURE DU addDept
    open(classicDepartement : any){
      this.modal.open(classicDepartement, {centered: true}).result.then((result) => {
        result = "Dialogue fermé";
        this.deptForm.reset(); 
      }, (raison) => { raison = "Fermé"; });
    }
    // openEditDept(editPartenaire ,idDep: number){
    //   const modalRef = this.modal.open(editPartenaire, { centered:true });
    //     console.log(idp);
    //     const  = this.partenaires.find(partner => partner.id ===idp);
    //     this.partenaireUpdate = partner;
    //     this.partenaireForm.controls["nomPart"].setValue(partner.nomPart);
    //     this.partenaireForm.controls["descriptionPart"].setValue(partner.descriptionPart);
    // }
  
    // MES METHODES 

    
    ajoutDepartement() {
      let addDept:Departement = this.deptForm.value;
      console.log(addDept);
      
      this.deptService.addDepartement(addDept).subscribe({        
        next: (value)=> {
            alert(JSON.stringify(value));
        },
        error : err =>{
          console.log(err);
          
        }
      })
      // openEditPartenaire(editPartenaire ,idp: number) {
        // Ouvrez la modal d'édition et pré-remplissez les champs avec les valeurs existantes du partenaire
        
        // this.partenaireForm.controls["siteWebPart"].setValue(partner.siteWebPart);
        // this.partenaireForm.controls["logoPart"].setValue(partner.logoPart);
        // this.partenaireForm.controls["actif"].setValue(partner.actif);
      // if (this.deptForm.valid) {
      //   this.deptService.addDepartement(this.deptForm.value).subscribe({
      //     next: (nouveauDept) => {
      //       alert("Département ajouté avec succès !");
      //       this.mesDept$.push(nouveauDept); // Ajoutez le nouveau département à la liste
      //       this.deptForm.reset(); // Réinitialisez le formulaire après soumission réussie
      //       console.log(this.mesDept$);
            
      //       this.router.navigate(['/departement']);; // Redirigez l'utilisateur vers la page appropriée
      //     },
      //     error: (reponse) => {
      //       alert("Erreur lors de l'ajout du département");
      //     }
      //   });
      // }
    }
          
    getAllDepartement(){
      this.deptService.getDepartements().subscribe(
        (data) => {
          this.departement = data; 
        },
        (error) => {
          console.log(error);
      });
    }
    
    updateDept(classicDepartement,id: number){
      
    }
  
    deleteDept(suppDept :Departement){
      const confirmation = window.confirm(`Êtes-vous sûr de vouloir supprimer le partenaire "${suppDept.libelleDept}" ?`);
      if (confirmation) {
      
        this.deptService.deleteDepartement(suppDept.id).subscribe(
          () => {
            this.mesDept$ = this.mesDept$.filter(p => p.id !== suppDept.id);
            console.log("Département supprimé avec succès :", suppDept);
          },
          (error) => {
            console.log("Erreur lors de la suppression du departement:", error);
          }
        );
      }
  
    }
  }
  