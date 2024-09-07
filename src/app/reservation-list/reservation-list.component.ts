import { Component, OnInit } from '@angular/core';
import { Reservation } from '../models/reservation';
import { ReservationService } from '../reservation/reservation.service';

@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.css']
})
export class ReservationListComponent implements OnInit {

  reservations: Reservation[] = []

  // dependency injection
  constructor(private reservationService: ReservationService) {

  }

  // how http requests are handled in angular, apply function in the subscribe method, subscribe on an observable
  ngOnInit(): void {
    this.reservationService.getReservations().subscribe( reservations => {
      this.reservations = reservations
    });
  }

  deleteReservation(id: string) {
    this.reservationService.deleteReservation(id).subscribe(() => {
      console.log("Delete request was procesed")
    });
  }

  
}
