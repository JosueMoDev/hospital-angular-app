import { Component, OnInit, OnDestroy } from '@angular/core';
import { HospitalService } from '../../../services/hospital.service';
import { Hospital } from '../../../models/hospital.model';
import { PictureModalService } from '../../../services/picture-modal.service';
import { delay, Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { SearchingService } from 'src/app/services/searching.service';


@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
  styles: [
  ]
})
export class HospitalsComponent implements OnInit, OnDestroy {
  public hospitalList: Hospital[] = [];
  public loading: boolean = true;
  public dataTemp: Hospital[] = [];
  public pictureSubscription!: Subscription;
  constructor(
    private hospitalService: HospitalService,
    private pictureModal: PictureModalService,
    private searchingService: SearchingService
  ) { }

  ngOnInit(): void {

    this.renderHospitals()
    this.pictureSubscription = this.pictureModal.newImgUploaded
      .pipe(delay(100))
      .subscribe(
        img => {
          this.renderHospitals();

        })

  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.pictureSubscription.unsubscribe();
  }

  renderHospitals() {
    this.hospitalService.loadHospitalList().
      subscribe(
        hospitals => {
          this.hospitalList = hospitals
          this.dataTemp = hospitals;
          this.loading=false
        }
    )
  }

  shownModal(hospital: Hospital) {
    this.pictureModal.openModal('hospitals', hospital.hospital_id!, hospital.img)
  }

  async shownModalSweetAlert(){

    const { value: hospital } = await Swal.fire<string>({

        title: 'Create New Hospital',
        input: 'text',
        inputLabel: 'Hospital Name',
        inputPlaceholder:'Enter Hospital Name',
        showCancelButton: true,
    })
    if (hospital) {
      this.savaNewHospital(hospital)
    }
  }

  savaNewHospital(name: string) {
    this.hospitalService.createNewHospital(name)
      .subscribe(
        resp => {
          Swal.fire({
            icon: 'success',
            title: `Hospital "${name}" has been created success`,
            timer:4000
          })
          this.renderHospitals()
        }
      )
  }

  updateHospital(hospital:Hospital) {
    this.hospitalService.updateHospital(hospital.hospital_id!, hospital.name)
      .subscribe(
        resp => {
          Swal.fire({
            title: 'Success',
            text: 'Hospital has updated',
            icon: 'success',
            timer:2000
          })
        }, (err:any) => {
          Swal.fire('Error', err.error.message, 'error');
        }
    )
  }
  deleteHospital(hospital:Hospital) {
    this.hospitalService.deleteHospital(hospital.hospital_id!)
      .subscribe(
        resp => {
          Swal.fire({
            title: 'Success',
            text: `Hospital "${hospital.name}" has been deleted`,
            icon: 'success',
            timer:2000
          })
          this.renderHospitals();

        }, (err:any) => {
          Swal.fire('Error', err.error.message, 'error');
        }
    )
  }

  search(query: string):any {
    if (query.length===0) {
      return this.hospitalList = this.dataTemp
    }
    this.searchingService.searchingResponse('hospitals', query)
      .subscribe(queryRespo => {
        this.hospitalList = queryRespo
      });
  }

}
