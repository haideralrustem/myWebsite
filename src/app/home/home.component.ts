import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';

import { WindowRefService, ICustomWindow } from '../services/windowRef';
import { CollegeFetchService } from '../services/college-fetch.service';

declare var $;  // jquery declaration

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

  visible = '0';
  base_animation = 500;
  

  ngOnInit() {
  
    $('#frame').delay(300).animate({opacity: 1}, 300);
    
   if((window.innerWidth) > 992)
   {
    $('#imageWrapper');
   };

   $("#me").delay(1000).animate({ opacity: 1 }, 700);​

   
  //  $("#welcome").delay(600).animate({ opacity: 1 }, 200);​

   $('.separator-styled').delay(this.base_animation+ 300).animate({ opacity: 1,
                                                                  top: 0 }, 1000);​
   $("#subTitle").delay(this.base_animation+ 1500).animate({ opacity: 1,
                                                            top: 0 }, 1000);​

    $(".my-photo").delay(this.base_animation+ 1700).animate({ opacity: 1 }, 1300);​
    $( ".scroll-in-show" ).delay(this.base_animation+ 1300).animate({ opacity: 1 }, 1300);​

    

    // $( ".scroll-in-show" ).each(function( index ) {   
    //   let top_of_window = $(window).scrollTop();   
    //   let top_of_object = $(this).offset().top;
    //   if(top_of_window >= top_of_object*0.9) {
    //     $(this).css({"opacity": "1"});
    //   } else {
    //     $(this).css({"opacity": "0"});
    //   }
    // });
    // $( ".scroll-in-show.earlier" ).each(function( index ) {   
    //   let top_of_window = $(window).scrollTop();   
    //   let top_of_object = $(this).offset().top;
    //   if(top_of_window >= top_of_object*0.9) {
    //     $(this).css({"opacity": "1"});
    //   } else {
    //     $(this).css({"opacity": "0"});
    //   }
    // });



    //....................


  //  $(window).scroll( function(){
  //    let base = 0
  //   $( ".scroll-in-show" ).each(function( index ) {   
  //     let top_of_window = $(window).scrollTop();   
  //     let top_of_object = $(this).offset().top;
  //     if(top_of_window >= top_of_object - 2000) {
        
  //       $(this).css({"opacity": "1"});
  //     } else {
  //       $(this).css({"opacity": "0"});
  //     }
  //     base += 0.01
  //   });    

  //   $( ".scroll-in-show.earlier" ).each(function( index ) {   
  //     let top_of_window = $(window).scrollTop();   
  //     let top_of_object = $(this).offset().top;
  //     if(top_of_window >= top_of_object- 2000) {
        
  //       $(this).css({"opacity": "1"});
  //     } else {
  //       $(this).css({"opacity": "0"});
  //     }
  //   });  
    
  // });                                                         ​

   this.slideAnimations();
   
   
   
}


onResize(event: any){
   if (event.target.innerWidth > 992) {
      $('.my-name-expander');
   }

}


slideAnimations() {
  setTimeout(()=>{
    this.visible='1';
  },this.base_animation + 500);   

}



mockGet() {
   this.collegeSvc.fetchColleges().subscribe(
      (colleges: any[]) => {
        
        console.log(colleges);
        
      }
    );
    
}

}