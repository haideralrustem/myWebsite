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
  //   this.collegeSvc.fetchColleges().subscribe(
  //     (colleges: any[]) => {
  //       this.colleges = colleges;
  //       console.log(colleges);
  //       console.log(this.colleges);
  // });
  
 }

  ngAfterContentInit() {
   
  }

  clicked(event) {
   
  }
}
