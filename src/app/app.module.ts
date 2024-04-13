import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { ToastrModule } from "ngx-toastr";
import { TagInputModule } from "ngx-chips";
import { CollapseModule } from 'ngx-bootstrap/collapse';

import { AppComponent } from "./app.component";
import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { AuthLayoutComponent } from "./layouts/auth-layout/auth-layout.component";
import { PresentationModule } from "./pages/presentation/presentation.module";

import { BrowserModule } from '@angular/platform-browser';
import { ComponentsModule } from "./components/components.module";

import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PartenairesService } from "./_services/partenaires.service";
import { PartenairesModule } from "./pages/partenaires/partenaires.module";
import { PartenaireComponent } from './partenaire/partenaire.component';
import { OrganigrammeService } from "./_services/organigramme.service";
import { DepartementService } from "./_services/departement.service";


@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    PartenaireComponent
  
  ],
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    ComponentsModule,
    BsDropdownModule.forRoot(),
    AppRoutingModule,
    ToastrModule.forRoot(),
    CollapseModule.forRoot(),
    TagInputModule,
    PresentationModule,
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    PartenairesModule
  ],
  providers: [PartenairesService,OrganigrammeService,DepartementService],
  bootstrap: [AppComponent]
})
export class AppModule { }
