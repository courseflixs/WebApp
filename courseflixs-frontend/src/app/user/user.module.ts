import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UserRoutingModule } from './user-routing.module';
import { UserHeaderComponent } from './user-header/user-header.component';
import { UserFooterComponent } from './user-footer/user-footer.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatIconModule } from '@angular/material/icon';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatButtonModule } from '@angular/material/button';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { RecommendCarouselComponent } from './recommend-carousel/recommend-carousel.component';
import { NewcourseSectionComponent } from './newcourse-section/newcourse-section.component';
import { OfferSectionComponent } from './offer-section/offer-section.component';
import { OrderstepSectionComponent } from './orderstep-section/orderstep-section.component';
import {MatInputModule} from '@angular/material/input';


@NgModule({
  declarations: [
    UserHeaderComponent,
    UserFooterComponent,
    HomePageComponent,
    LoginPageComponent,
    RecommendCarouselComponent,
    NewcourseSectionComponent,
    OfferSectionComponent,
    OrderstepSectionComponent,
    
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    NgbModule,
    MatIconModule,
    FontAwesomeModule,
    MatButtonModule,
    CarouselModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[
    UserHeaderComponent,
    UserFooterComponent,
    HomePageComponent,
    
  ],
  providers: [    
  ]

})
export class UserModule { }
