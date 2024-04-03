import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuideAdminComponent } from './guideAdmin/guide-admin.component';

const routes: Routes = [
  {path:"guideAdmin", component:GuideAdminComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GuideAdminRoutingModule { }
