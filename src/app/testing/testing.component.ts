import { Component, OnInit, OnDestroy, EventEmitter, Output, ɵConsole} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { TestService } from '../services/test-service';
import { User } from '../services/interface-user';
import { College } from '../../../backend/college';
import { CollegeFetchService } from '../services/college-fetch.service';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-testing',
  templateUrl: './testing.component.html',
  styleUrls: ['./testing.component.css']
})
export class TestingComponent implements OnInit, OnDestroy {
  
  rForm: FormGroup;
  post: string;
  users: User[];
  colleges: any[];
  subscription: Subscription;
  @Output() postEmitter = new EventEmitter();
  college: College;

  constructor(private fb: FormBuilder, private ts: TestService, 
    private collegeSvc: CollegeFetchService, private httpCli: HttpClient) {
    this.rForm = fb.group({
      'post': [null, Validators.compose([Validators.required, Validators.minLength(5)])],
      
    });
   }

  ngOnInit() {
    console.log('ngOninit');

        
      this.collegeSvc.fetchColleges().subscribe(
      (colleges: any[]) => {
        this.colleges = colleges;
        console.log(colleges);
        console.log(this.colleges);
      }
    );
    
  }

  submitForm(value: any, myForm: any) {
    
    this.post = value.post;
    const newUser = {name: this.post, age: 25};
    this.ts.addUser(newUser);
    console.dir(myForm);
    myForm.resetForm();

  }

  ngOnDestroy() {
    
  }

}
