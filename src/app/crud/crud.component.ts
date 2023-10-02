import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.scss']
})
export class CRUDComponent implements OnInit {
  loginForm: FormGroup;
  loginList: any[] = [];
  selectedIndex: number = -1;
  isEditMode: boolean = false;
  isSubmitMode: boolean = true;
  passwordFieldType: string = 'password'; // To toggle password field type

  constructor(private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({
      Email: [''],
      Password: [''],
    });
  }

  ngOnInit(): void {
    let data = localStorage.getItem('loginList');
    this.loginList = JSON.parse(data || '[]');
  }

  submit() {
    console.log(this.loginForm.value);
    if (this.isEditMode) {
      this.updateData();
    } else {
      this.addNewData();
    }
    this.clear();
  }

  edit(i: number) {
    this.loginForm.patchValue({
      Email: this.loginList[i].Email,
      Password: this.loginList[i].Password,
    });
    this.selectedIndex = i;
    this.isEditMode = true;
    this.isSubmitMode = false;
  }

  updateData() {
    if (this.selectedIndex !== -1) {
      this.loginList[this.selectedIndex].Email = this.loginForm.value.Email;
      this.loginList[this.selectedIndex].Password = this.loginForm.value.Password;
      localStorage.setItem('loginList', JSON.stringify(this.loginList));
    }
    this.clearEditMode();
  }

  addNewData() {
    this.loginList.push(this.loginForm.value);
    localStorage.setItem('loginList', JSON.stringify(this.loginList));
  }

  clear() {
    this.loginForm.reset();
    this.clearEditMode();
  }

  clearEditMode() {
    this.selectedIndex = -1;
    this.isEditMode = false;
    this.isSubmitMode = true;
  }

  delete(i: number) {
    this.loginList.splice(i, 1);
    localStorage.setItem('loginList', JSON.stringify(this.loginList));
  }

  togglePasswordVisibility() {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }
}
