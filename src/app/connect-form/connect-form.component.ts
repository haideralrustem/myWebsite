import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { EmailSenderService } from '../services/email-sender';

@Component({
  selector: 'app-connect-form',
  templateUrl: './connect-form.component.html',
  styleUrls: ['./connect-form.component.css']
})
export class ConnectFormComponent implements OnInit {

  rForm: FormGroup;
  post: any;
  name: string;
  email: string;
  phone: number;
  message: string;


  constructor(private fb: FormBuilder, private emailSender: EmailSenderService) {
      this.rForm = fb.group({
        'name': [null, Validators.required],
        'message': [null, Validators.compose([Validators.required, Validators.minLength(5)])],
        'email' : [null, Validators.nullValidator],
        'phone' : [null, Validators.nullValidator]

      })
   }

  ngOnInit() {
  }

  sendForm(post: any){   // this method sends the form to the email
    this.message = post.message;
    this.name = post.name;
    this.phone = post.phone;
    this.email = post.email;

    this.emailSender.sendMessageToEmail(this.name, this.phone, this.email, this.message)
    .subscribe(
      (data)=>{console.log(data)}
    );
  }

}
