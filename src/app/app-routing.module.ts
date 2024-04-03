import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";

import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { AuthLayoutComponent } from "./layouts/auth-layout/auth-layout.component";
import { PresentationComponent } from "./pages/presentation/presentation.component";
import { GuideAdminComponent } from "./pages/guide-admin/guide-admin.component";

const routes: Routes = [
  {
    path: "/",
    redirectTo: "presentation",
    pathMatch: "full"
  },
  {
    path: "presentation",
    component: PresentationComponent
  },
  
  { 
    path: "",
    component: AdminLayoutComponent,
    children: [
      {
        path: "dashboards",
        loadChildren: () => import('./pages/dashboards/dashboards.module').then(m => m.DashboardsModule)

      },
      {
        path: "articles",
        loadChildren: () => import('./pages/articles/articles.module').then(m => m.ArticlesModule)

      },
      {
        path: "partenaires",
        loadChildren: () => import('./pages/partenaires/partenaires.module').then(m => m.PartenairesModule)
      },
      {
        path: "services",
        loadChildren: () => import('./pages/services/services.module').then(m => m.ServicesModule)
      },
      {
        path: "departement",
        loadChildren: () => import('./pages/departement/departement.module').then(m => m.DepartementModule)
      },
      {
        path: "formations",
        loadChildren: () => import('./pages/formations/formations.module').then(m => m.FormationsModule)
      },
      {
        path: "organigramme",
        loadChildren: () => import('./pages/organigramme/organigramme.module').then(m => m.OrganigrammeModule)
      },
      {
        path: "guideAdmin",
        loadChildren: () => import('./pages/guide-admin/guide-admin.module').then(m => m.GuideAdminModule)
      },
      {
        path: "components",
        loadChildren: () => import('./pages/components/components.module').then(m => m.ComponentsModule)
      },
      {
        path: "forms",
        loadChildren: () => import('./pages/forms/forms.module').then(m => m.FormsModules)
      },
      {
        path: "tables",
        loadChildren: () => import('./pages/tables/tables.module').then(m => m.TablesModule)
      },
      {
        path: "maps",
        loadChildren: () => import('./pages/maps/maps.module').then(m => m.MapsModule)
      },
      {
        path: "widgets",
        loadChildren: () => import('./pages/widgets/widgets.module').then(m => m.WidgetsModule)
      },
      {
        path: "charts",
        loadChildren: () => import('./pages/charts/charts.module').then(m => m.ChartsModule)
      },
      {
        path: "calendar",
        loadChildren: () => import('./pages/calendar/calendar.module').then(m => m.CalendarModule)
      },
      {
        path: "examples",
        loadChildren: () => import('./pages/examples/examples.module').then(m => m.ExamplesModule)
      }
    ]
  },
  {
    path: "",
    component: AuthLayoutComponent,
    children: [
      {
        path: "examples",
        loadChildren: () => import('./layouts/auth-layout/auth-layout.module').then(m => m.AuthLayoutModule)
      }
    ]
  },
  {
    path: "**",
    redirectTo: "dashboard"
  }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
      useHash: true
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
