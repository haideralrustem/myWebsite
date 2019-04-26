import { Injectable } from '@angular/core'
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Subject }  from 'rxjs';

import { User } from './interface-user';



@Injectable()
export class TestService {
  
  private users = [];
  private usersUpdated = new Subject<User[]>();

  constructor(private http: HttpClient) {}

  getAllCats(): Observable<any> {
    return this.http.get<any>('http://localhost:4200/api/members');
  }

  addUser(newUser: User){
    this.users.push(newUser);
    // Subject here emits payload. Recieve payload when you return asObservable()
    this.usersUpdated.next([...this.users]);
  }
  getUsersUpdate() {
    // 
    return this.usersUpdated.asObservable();
  }


}