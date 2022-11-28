import { ApiService } from './../../../../core/services/admin/api.service';
import { MatDialogRef } from '@angular/material/dialog';
import { AddContratComponent } from './../../contrat/add-contrat/add-contrat.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-departement',
  templateUrl: './add-departement.component.html',
  styleUrls: ['./add-departement.component.css']
})
export class AddDepartementComponent implements OnInit {
  departementForm!: FormGroup;
  nomDepart!: FormControl;

  constructor(
    private apiService: ApiService,
    public dialogRef: MatDialogRef<AddContratComponent>
    ) {
      this.initForm();
      this.createForm();
    }

  ngOnInit(): void {
  }

  initForm() {
    this.nomDepart = new FormControl('', [Validators.required]);
  }

  createForm() {
    this.departementForm = new FormGroup({
      nomDepart: this.nomDepart,
    });
  }

  onSubmit() {
    const departementToAdd = {
      nomDepart: this.departementForm.value.nomDepart,
    };
    this.addDepartement(departementToAdd);
    this.resetControls();
    this.closeDialog();
    location.reload();
  }

  addDepartement(departBody: Object) {
    this.apiService.add('addDepart', departBody).subscribe((departement) => null);
  }

  resetControls() {
    this.departementForm.reset();
  }

  closeDialog() {
    this.dialogRef.close();
  }


}