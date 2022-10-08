import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Doctor } from 'src/app/models/doctor.model';
import { DoctorsService } from '../../../../services/doctors.service';
import { Hospital } from '../../../../models/hospital.model';
import { HospitalService } from '../../../../services/hospital.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { delay, Subscription } from 'rxjs';
import { PictureModalService } from '../../../../services/picture-modal.service';

@Component({
  selector: 'app-shown-doctor',
  templateUrl: './shown-doctor.component.html',
  styles: [
  ]
})
export class ShownDoctorComponent implements OnInit {
  public doctor!: Doctor
  public id!: string;
  public hospitals!: Hospital[];
  public hospitalSelected: Hospital | undefined;
  public doctorForm: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required]],
    hospital: ['', [Validators.required]],
  });
  public pictureSubscription!: Subscription;

  constructor(
    private doctorService: DoctorsService,
    private formBuilder: FormBuilder,
    private hospitalService: HospitalService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private pictureModal: PictureModalService
    ) { }

    ngOnInit(): void {
      this.activatedRoute.params
      .subscribe(
        ({ id }) => {
          this.id = id
          this.shownDoctor(id)
        }
        );



      this.doctorForm.get('hospital')?.valueChanges
        .pipe(delay(100))
        .subscribe(
          hospitalId => {
            this.hospitalSelected = this.hospitals.find(hospital => hospital.hospital_id === hospitalId)||undefined;
          }
          )
          this.pictureSubscription = this.pictureModal.newImgUploaded
          .pipe(delay(100))
          .subscribe(
            img => {
              this.shownDoctor(this.id);

            })

      this.allHospitals();

    }
    ngOnDestroy(): void {
      //Called once, before the instance is destroyed.
      //Add 'implements OnDestroy' to the class.
      this.pictureSubscription.unsubscribe();
    }

        shownDoctor(id: string) {

          if (id === 'new') {
            return;
          }

          this.doctorService.ShownDoctorById( id )
          .pipe(
            delay(100)
            )
            .subscribe((resp:any):any => {
              const { doctor } = resp
              if ( !doctor) {
                return this.router.navigateByUrl(`/dashboard/doctors`);
              }
              const { name, hospital} = doctor;
              this.doctor = doctor;
              this.doctorForm.setValue({ name, hospital});
            });

          }


          allHospitals() {
            this.hospitalService.loadHospitalList()
            .subscribe((hospitals: Hospital[]) => {
              this.hospitals = hospitals
            }
      )
  }

  createANewDoctor(){
    const { name } = this.doctorForm.value;
    if (this.doctor) {
      // update
      const data = {
        ...this.doctorForm.value,
        doctor_id: this.doctor.doctor_id
      }
      this.doctorService.updateDoctor(data)
      .subscribe(resp => {
        Swal.fire({
          title: `Doctor ${name} has been updated success`,
          icon: 'success',
          timer:3000
        }
        )
      }, (err:any) => {
        Swal.fire('Error', err.error.message, 'error');
      })

    } else {
      // create
      this.doctorService.createNewDoctor(this.doctorForm.value)
      .subscribe(resp => {
        Swal.fire({
          title: 'Doctor has been created success',
          icon: 'success',
          timer:3000
        })
      })
    }
  }


  shownModal(doctor: Doctor) {
    this.pictureModal.openModal('doctors', doctor.doctor_id!, doctor.img)
  }

}
