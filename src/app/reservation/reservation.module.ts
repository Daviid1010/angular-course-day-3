import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservationFormComponent } from '../reservation-form/reservation-form.component';
import { ReservationListComponent } from '../reservation-list/reservation-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HomeModule } from '../home/home.module';

@NgModule({
  declarations: [
    ReservationFormComponent,
    ReservationListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    HomeModule, // importing module for use, need to export component used in homeModule
    ReactiveFormsModule //validate in ts file, not html (template-driven form validtion)
  ]
})
export class ReservationModule { }
