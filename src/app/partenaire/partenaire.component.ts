import { Component, HostListener, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { PartenairesService } from "src/app/_services/partenaires.service";
import { FormBuilder, FormGroup } from "@angular/forms";
@Component({
  selector: "app-partenaire",
  templateUrl: "./partenaire.component.html",
  styleUrls: ["./partenaire.component.scss"],
})
export class PartenaireComponent implements OnInit {
  entries: number = 25;
  myForm: FormGroup;
  selected: any[] = [];
  temp = [];
  activeRow: any;
  content: string = "";
  Partenaires = [];
  // SelectionType = SelectionType;

  constructor(
    private router: Router,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private _partenaireService: PartenairesService
  ) {
    this.ngOnInit();
    this.myForm = this.formBuilder.group({
      id: Math.floor(Math.random() * 10) + 100 + "",
      logoPart: "",
      siteWebPart: "",
      actif: true,
      nomPart: "",
      descriptionPart: "",
    });
  }
  entriesChange($event) {
    this.entries = $event.target.value;
  }
  filterTable($event) {
    let val = $event.target.value;
    this.temp = this.Partenaires.filter((d) => {
      return Object.values(d).some((value) => {
        // Convertir la valeur en chaîne de caractères et vérifier si elle contient la valeur de recherche
        return value.toString().toLowerCase().includes(val);
      });
    });
  }

  ngOnInit() {
    this.afficherToutesLesPartenaires();
    this.temp = this.Partenaires;
  }

  afficherToutesLesPartenaires() {
    this._partenaireService.getPartenaires().subscribe({
      next: (res) => {
        // console.log("L+res);

        this.Partenaires = res;
        this.temp = res;

        // console.log("La variable en question"+this.Partenaires);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  onActivate(event) {
    if (event.type === "click") {
      this.activeRow = event.row;
    }
  }
  supprimer(id: number) {
    if (confirm("Etes vous surs de vouloir supprimer") == true) {
      this._partenaireService.deletePartenaires(id).subscribe({
        next(value) {
          // this.router.navigate(["/#/partenaires"]);
          window.location.reload();
        },
        error: (err: any) => {
          console.error(err);
        },
      });
      //  this.router.navigate(['/#/partenaires']);
    }
  }
  modifier(id: number) {
    this.router.navigate(["/updatepartenaire", id]);
  }
  ajouterPartenaire() {
    console.log("dwddaddadadaddfae fa faf afda fa faf daf afa faf daf f f afa fas df");
    console.log(this.myForm.value);
    this.myForm.value.logoPart = this.imageBase64;
    this._partenaireService.createPartenaires(this.myForm.value).subscribe({
      next: (res) => {
        alert("Ajout avec succes");
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
  
  modifierPartenaire() {
    this.myForm.value.logo = this.imageBase64;
    this._partenaireService
      .updatePartenaire(this.myForm.value)
      .subscribe({
        next: (res) => {
          alert("Modifie avec succes");
          console.log(res);
          window.location.reload();
        },
        error: (err) => {
          console.log(err);
        },
      });
    console.log(this.myForm.value);
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

  closeResult: string;
  openDialogue(contenu) {
    this.modalService.open(contenu, { centered: true }).result.then(
      (result) => {
        this.closeResult = "Closed with: $result";
      },
      (reason) => {
        this.closeResult = "Dismissed $this.getDismissReason(reason)";
      }
    );
  }
  openDialogueModif(contenu) {
    this.modalService.open(contenu, { centered: true }).result.then(
      (result) => {
        this.closeResult = "Closed with: $result";
      },
      (reason) => {
        this.closeResult = "Dismissed $this.getDismissReason(reason)";
      }
    );
  }
}
