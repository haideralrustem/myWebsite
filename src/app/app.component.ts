import { Component,  OnInit, ElementRef, ViewChild } from '@angular/core';
import { TestService } from './services/test-service';

declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(private testService: TestService) {

  }
  
  @ViewChild('listExpander') listExpander: ElementRef;
  onClickHamburgerButton() {
    if (this.listExpander.nativeElement.classList.contains('expanded')) {
      $('#listExpander').removeClass('expanded');
      console.log($('#listExpander').attr('class'));
    } else {
      $('#listExpander').addClass('expanded');
      console.log($('#listExpander').attr('class'));
    }
}

callApi(name) {
    this.testService.getAllCats().subscribe(val => console.log(val));
   
}
  onEmitPost(payload) {
    console.log(payload);
  }
}
