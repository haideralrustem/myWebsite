import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';

import { WindowRefService, ICustomWindow } from '../services/windowRef';
import { CollegeFetchService } from '../services/college-fetch.service';

declare var $;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private window: ICustomWindow;

  constructor(windowRef: WindowRefService, private collegeSvc: CollegeFetchService) {
    this.window = windowRef.nativeWindow;
   }

  ngOnInit() {
    
   if((window.innerWidth) > 992)
   {
    $('#imageWrapper').removeClass('pt-5');
   };
   $("#me").delay(1000).animate({ opacity: 1 }, 700);​
   $("#subTitle").delay(1500).animate({ opacity: 1 }, 700);​
   
}


onResize(event: any){
   if (event.target.innerWidth > 992) {
      $('#imageWrapper').removeClass('pt-5');
   }
}

mockGet() {
   this.collegeSvc.fetchColleges().subscribe(
      (colleges: any[]) => {
        
        console.log(colleges);
        
      }
    );
    
}

}