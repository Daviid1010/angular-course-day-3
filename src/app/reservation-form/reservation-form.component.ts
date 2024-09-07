import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReservationService } from '../reservation/reservation.service';
import { Reservation } from '../models/reservation';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.css']
})
export class ReservationFormComponent implements OnInit {

  reservationForm: FormGroup = new FormGroup({});

  // dependency injection FormBuilder, ReservationService
  constructor(
    private formBuilder: FormBuilder,
    private reservationService: ReservationService,
    private router: Router ,
    private activatedRoute: ActivatedRoute) {

  }

  ngOnInit(): void {


    // same names in formControl names
    this.reservationForm = this.formBuilder.group({
      checkInDate: ['', Validators.required],
      checkOutDate: ['', Validators.required],
      guestName: ['', Validators.required],
      guestEmail: ['', [Validators.required, Validators.email]],
      roomNumber: ['', Validators.required]
    })

    let id = this.activatedRoute.snapshot.paramMap.get('id')

    if(id){
      // update
      this.reservationService.getReservation(id).subscribe(reservation => {
        if(reservation)
          this.reservationForm.patchValue(reservation)
      })
    }
  }

  onSubmit() {
    if(this.reservationForm.valid) {
      //reservation has no id field, if we update we need to handle that
      let reservation: Reservation = this.reservationForm.value;

      let id = this.activatedRoute.snapshot.paramMap.get('id')

      if(id){
        // update
        this.reservationService.updateReservation(id, reservation).subscribe( () => {
          console.log("Update request processed")
        })
      }
      else {
        this.reservationService.addReservation(reservation).subscribe(() => {
          console.log("Created reservation")
        })
      }

      this.router.navigate(['/list'])
    }
  }
}
