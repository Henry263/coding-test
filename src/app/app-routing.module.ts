import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BaseComponent } from './components/basecomponent/base.component';
import { UserDataComponent } from './components/userdata/userdata.component';
import { DataVisualizeComponent } from './components/datavisualize/datavisualize.component';

const routes: Routes = [
  {
    path: 'home',
    component: BaseComponent
  },
  {
    path: 'adduser',
    component: UserDataComponent
  },
  {
    path: 'showdata',
    component: DataVisualizeComponent
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {path: '**', component: BaseComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
    
}
