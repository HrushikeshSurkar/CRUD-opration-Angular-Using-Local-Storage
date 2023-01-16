import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.scss']
})
export class CRUDComponent implements OnInit {
  loginForm: FormGroup;
  loginList: any = [];
  index = ''




  constructor(private formbuilder: FormBuilder) {


    this.loginForm = this.formbuilder.group({


      Email: [''],


      Password: [''],


    })


  }


  ngOnInit(): void {


    let data = localStorage.getItem('loginList');


    this.loginList = JSON.parse(data || '');


    console.log('loginList', this.loginList);



  }



  submit() {


    console.log(this.loginForm.value)


    this.loginList.push(this.loginForm.value)



    localStorage.setItem('loginList', JSON.stringify(this.loginList));



    this.clear()


    // this.submitclick = 'no'


  }



  edit(i: any) {


    this.loginForm.patchValue({


      Email: this.loginList[i].Email,


      Password: this.loginList[i].Password,








    })


    this.index = i;


  }


  update() {


    this.loginList[this.index].Email = this.loginForm.value.Email;


    this.loginList[this.index].Password = this.loginForm.value.Password;


    localStorage.setItem('loginList', JSON.stringify(this.loginList));



    this.clear()


    // this.submitclick = 'yes'





  }


  clear() {


    this.loginForm.reset()


  }



  delete(i: any) {


    this.loginList.splice(i, 1);


    localStorage.setItem('loginList', JSON.stringify(this.loginList));



  }


}
