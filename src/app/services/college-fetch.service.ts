import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject }  from 'rxjs';

@Injectable()
export class CollegeFetchService {

  colleges: any[];
  private collegesUpdated = new Subject<any[]>();

  constructor(private httpCli: HttpClient) { }

  fetchColleges() {
    return this.httpCli.get<any[]>('http://haiderwebsite.us-east-2.elasticbeanstalk.com/api/colleges?all=1');
    
  }

  getCollegesUpdate() {
    return this.collegesUpdated.asObservable();
  }

}
