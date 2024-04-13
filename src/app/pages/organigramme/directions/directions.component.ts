import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OrganigrammeService } from 'src/app/_services/organigramme.service';

@Component({
  selector: 'app-directions',
  templateUrl: './directions.component.html',
  styleUrls: ['./directions.component.scss']
})
export class DirectionsComponent implements OnInit {
  entries: number = 25;
  valeurParDefaut: string;
  selected: any[] = [];
  temp = [];
  activeRow: any;
  content: string = "";
  directions = [];
  myForm: FormGroup;

  constructor(
    private modalService: NgbModal,
    private fb: FormBuilder,
    private _OrganigrammeService: OrganigrammeService
  ) {
    this.myForm = this.fb.group({
      id: Math.floor(Math.random() * 10) + 100 + "",
      libelleDirection: "",
      descriptionDirection: "",
      responsableDirection: this.fb.group({
        id: Math.floor(Math.random() * 10) + 100 + "",
        nom: "", 
        prenom: "",
        contact: "",
        
      })
    });
  }
  
  ngOnInit() {
    this.afficherToutesLesDirections();
  }

  onActivate(event) {
    if (event.type === "click") {
      this.activeRow = event.row;
    }
  }

  entriesChange($event) {
    this.entries = $event.target.value;
  }

  filterTable($event) {
    let val = $event.target.value.toLowerCase();
    this.temp = this.directions.filter((d) => {
      return Object.values(d).some((value) => {
        return value.toString().toLowerCase().includes(val);
      });
    });
  }

  afficherToutesLesDirections() {
    this._OrganigrammeService.getAllDirections().subscribe({
      next: (data) => {
        this.directions = data;
        this.temp = data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
// =====================================================================
  openModalDirection(contenu): void {
    this.modalService.open(contenu, { centered: true }).result.then((result) => {
      result = "Dialogue fermé";
    }, (raison) => { raison = "Fermé"; });
  }

  openDetailsModal(modal, row) {
    this.activeRow = row;
    console.log(this.activeRow);
    this.modalService.open(modal, { centered: true });
  }
  // =====================================================================


  ajouterDirection(): void {
  
    this._OrganigrammeService.createDirection(this.myForm.value).subscribe({
      next: (reponse) => {
        console.log(reponse);
        alert(`Direction: ${reponse.libelleDirection} ajoutée avec succès`);
        this.directions.push(reponse);
        this.temp = [...this.directions]; // Mise à jour temp
        this.myForm.reset();
        window.location.reload();
      },
      error: (reponse) => {
        console.log(reponse);
      }
    });
  }
  
 

  openEditModal(contenu: any, direction: any) {
    this.myForm.patchValue({
      id: direction.id,
      libelleDirection: direction.libelleDirection,
      descriptionDirection: direction.descriptionDirection,
      responsableDirection: {
        nomResp: direction.responsableDirection.nomResp,
        prenomResp: direction.responsableDirection.prenomResp,
        contactResp: direction.responsableDirection.contactResp
      }
    });
    this.modalService.open(contenu, { centered: true });
  }

  modifierDirection() {
    this._OrganigrammeService.updateDirection(this.myForm.value).subscribe({
      next: (res) => {
        alert("Direction modifiée avec succès");
        console.log(res);
        window.location.reload();
      },
      error: (err) => {
        console.log(err);
      },
    });
    this.myForm.reset();
  }

  suppressionDirection(id: number) {
    if (confirm("Etes-vous sûr de vouloir supprimer ?")) {
      this._OrganigrammeService.deleteDirection(id).subscribe({
        next: (value) => {
          alert("Direction supprimée avec succès");
          window.location.reload();
        },
        error: (err) => {
          console.error(err);
        },
      });
    }
  }
}
