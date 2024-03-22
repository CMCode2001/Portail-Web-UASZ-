import { Component } from '@angular/core';
import { Partenaires } from 'src/app/_modèles/partenaires';


@Component({
  selector: 'app-partenaires',
  templateUrl: './partenaires.component.html',
  styleUrls: ['./partenaires.component.scss']
})
export class PartenairesComponent {
  partenaires: Partenaires[] ;
 
}