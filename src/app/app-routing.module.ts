import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { Comp1Component } from './comp1/comp1.component';
import { TagsandclassificationComponent } from './tagsandclassification/tagsandclassification.component';
import { DatacatalogComponent } from './datacatalog/datacatalog.component';

const routes: Routes = [
  {
        path: 'breachRisk',
        component: Comp1Component
    },
    {
      path: 'tags',
      component: TagsandclassificationComponent
  },
  {
    path: 'datacatalog',
    component: DatacatalogComponent
}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
        preloadingStrategy: PreloadAllModules
    })
],
  exports: [RouterModule]
})
export class AppRoutingModule {
 

 }
