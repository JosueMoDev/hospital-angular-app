import { Component, OnInit } from '@angular/core';
import { delay, Subscription } from 'rxjs';
import { Doctor } from 'src/app/models/doctor.model';
import { DoctorsService } from 'src/app/services/doctors.service';
import { PictureModalService } from 'src/app/services/picture-modal.service';
import { SearchingService } from 'src/app/services/searching.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styles: [
  ]
})
export class DoctorsComponent implements OnInit {

  public doctorList: Doctor[] = [];
  public loading: boolean = true;
  public dataTemp: Doctor[] = [];
  public pictureSubscription!: Subscription;
  public from: number = 0;
  public totalDoctors: number = 0;
  constructor(
    private doctorService: DoctorsService,
    private pictureModal: PictureModalService,
    private searchingService: SearchingService
  ) { }

  ngOnInit(): void {

    this.renderDoctors()
    this.pictureSubscription = this.pictureModal.newImgUploaded
      .pipe(delay(100))
      .subscribe(
        img => {
          this.renderDoctors();

        })

  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.pictureSubscription.unsubscribe();
  }

  renderDoctors() {
    this.doctorService.loadDoctorsList(this.from).
      subscribe(
        ({ doctors, total }) => {
          this.doctorList = doctors
          this.dataTemp = doctors;
          this.totalDoctors = total;
          this.loading=false
        }
    )
  }

  shownModal(doctor: Doctor) {
    this.pictureModal.openModal('doctors', doctor.doctor_id!, doctor.img)
  }

  deleteDoctor(doctor: Doctor) {
    this.doctorService.deleteDoctor(doctor.doctor_id!)
      .subscribe(
        resp => {
          Swal.fire({
            title: 'Success',
            text: `Doctor "${doctor.name}" has been deleted`,
            icon: 'success',
            timer:2000
          })
          this.renderDoctors();

        }, (err:any) => {
          Swal.fire('Error', err.error.message, 'error');
        }
    )
  }

  search(query: string):any {
    if (query.length===0) {
      return this.doctorList = this.dataTemp
    }
    this.searchingService.searchingResponse('doctors', query)
      .subscribe(queryRespo => {
        this.doctorList = queryRespo
      });
  }
  doctorPagination( from: number) {
    this.from += from;
    if (this.from < 0) {
      this.from = 0
    } else if (this.from >=this.totalDoctors ) {
      this.from-=from
    }
    this.renderDoctors()
  }

}
