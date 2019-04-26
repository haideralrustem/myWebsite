import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';


import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { TestService } from './services/test-service'
import { CarouselComponent } from './carousel/carousel.component';
import { WindowRefService } from './services/windowRef';
import { ConnectFormComponent } from './connect-form/connect-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EmailSenderService } from './services/email-sender';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { TestingComponent } from './testing/testing.component';
import { CollegeFetchService } from './services/college-fetch.service';
import { VisualizationComponent } from './visualization.component/visualization.component.component';
import { ContactComponent } from './contact/contact.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CarouselComponent,
    ConnectFormComponent,
    TestingComponent, 
    VisualizationComponent, ContactComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path: '', redirectTo: '/home', pathMatch: 'full'},
      {path: 'testing', component: TestingComponent},
      {path: 'home', component: HomeComponent},
      {path: 'contact', component: ContactComponent},
      {path: 'home/me', component: VisualizationComponent},
      {path: '*', component: HomeComponent }
    ],  {useHash: true})
  ],
  providers: [WindowRefService, EmailSenderService, TestService, CollegeFetchService],
  bootstrap: [AppComponent]
})
export class AppModule { }
