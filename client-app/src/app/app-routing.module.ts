import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';
import { RoomsComponent } from './rooms/rooms.component';


const routes: Routes = [
  {
    path: '',
    component: UserComponent
  },
  {
    path: 'rooms/:path',
    component: RoomsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
