import { Component, OnInit, AfterContentInit } from '@angular/core';
import * as d3 from "d3";
import { CollegeFetchService } from '../services/college-fetch.service';

declare var $: any;

@Component({
  selector: 'app-visualization.component',
  templateUrl: './visualization.component.component.html',
  styleUrls: ['./visualization.component.component.css']
})
export class VisualizationComponent implements OnInit, AfterContentInit {

  colleges;

  constructor(private collegeSvc: CollegeFetchService) { }

  ngOnInit() {
    window.scrollTo(0, 0);
    
    $( ".scroll-in-show" ).each(function( index ) {   
      let top_of_window = $(window).scrollTop();   
      let top_of_object = $(this).offset().top;
      if(top_of_window >= top_of_object*0.69) {
        $(this).css({"opacity": "1"});
      } else {
        $(this).css({"opacity": "0"});
      }
    });   
    
    $(".dynamic-show").each(function( index ) {   
      let top_of_window = $(window).scrollTop();   
      let top_of_object = $(this).offset().top;
      if(top_of_window >= top_of_object*0) {
        $(this).css({"opacity": "1"});
      } else {
        $(this).css({"opacity": "0"});
      }
    });
    
    $('.latent').each(function( index ) {   
      let top_of_window = $(window).scrollTop();   
      let top_of_object = $(this).offset().top;
      if(top_of_window >= top_of_object*0.82) {
        $(this).css({"opacity": "1"});
      } else {
        $(this).css({"opacity": "0"});
      }
    });

  //..............


    $(window).scroll( function(){
      let inc= 570
      $( ".scroll-in-show" ).each(function( index ) {   
        let top_of_window = $(window).scrollTop();   
        let top_of_object = $(this).offset().top;
        if(top_of_window >= top_of_object - inc) {
          $(this).css({"opacity": "1"});
        } else {
          $(this).css({"opacity": "0"});
        }
        inc += 0.15
      });   
      
      $(".dynamic-show").each(function( index ) {   
        let top_of_window = $(window).scrollTop();   
        let top_of_object = $(this).offset().top;
        if(top_of_window >= top_of_object*0) {
          $(this).css({"opacity": "1"});
        } else {
          $(this).css({"opacity": "0"});
        }
      });
      

      
      $('.latent').each(function( index ) {  
        
        let top_of_window = $(window).scrollTop();   
        let top_of_object = $(this).offset().top;
        if(top_of_window >= top_of_object-inc) {
          $(this).css({"opacity": "1"});
        } else {
          $(this).css({"opacity": "0"});
        }
        inc += 0.02
      });
      
    }); 


 }

  ngAfterContentInit() {
   
  }

  clicked(event) {
   
  }


}
