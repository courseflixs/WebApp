import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserHeaderComponent } from './user-header/user-header.component';
import { UserFooterComponent } from './user-footer/user-footer.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { SignupPageComponent } from './signup-page/signup-page.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatIconModule } from '@angular/material/icon';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatButtonModule } from '@angular/material/button';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { RecommendCarouselComponent } from './recommend-carousel/recommend-carousel.component';


@NgModule({
  declarations: [
    UserHeaderComponent,
    UserFooterComponent,
    HomePageComponent,
    SignupPageComponent,
    LoginPageComponent,
    RecommendCarouselComponent,
    
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    NgbModule,
    MatIconModule,
    FontAwesomeModule,
    MatButtonModule,
    CarouselModule,
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
