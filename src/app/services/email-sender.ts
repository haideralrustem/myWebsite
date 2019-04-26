import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class EmailSenderService {
    urlString: string;
    header = new HttpHeaders({
        'Content-Type': 'application/json'

    });

    constructor(private http: HttpClient){}

    sendMessageToEmail(name, phone, receiver, message) {
        return this.http.post("http://haiderwebsite.us-east-2.elasticbeanstalk.com/api/post/email", 
        {'from': receiver,
         'name': name,
         'phone': phone, 
        'content': message}, {'headers': this.header});
    }
}