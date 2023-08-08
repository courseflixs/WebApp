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
import { MatInputModule } from '@angular/material/input';
import { ProductsPageComponent } from './products-page/products-page.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ProductDetailsPageComponent } from './product-details-page/product-details-page.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { TestimonialSectionComponent } from './testimonial-section/testimonial-section.component';
import { FaqPageComponent } from './faq-page/faq-page.component';
import { PrivacyPolicyPageComponent } from './privacy-policy-page/privacy-policy-page.component';
import { BlogPageComponent } from './blog-page/blog-page.component';
import { BlogDetailsPageComponent } from './blog-details-page/blog-details-page.component';
import { AddToWishlistPageComponent } from './add-to-wishlist-page/add-to-wishlist-page.component';
import { RequestPageComponent } from './request-page/request-page.component';
import { MyOrderPageComponent } from './my-order-page/my-order-page.component';
import { DataTablesModule } from 'angular-datatables';
import { AboutusPageComponent } from './aboutus-page/aboutus-page.component';
import { FourOfourComponent } from './four-ofour/four-ofour.component';
import { TawkToComponent } from './tawk.to/tawk.to.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { GetInTouchDialogueComponent } from './get-in-touch-dialogue/get-in-touch-dialogue.component';
import {MatCardModule} from '@angular/material/card';
import { SearchComponent } from './search/search.component';

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
    ProductsPageComponent,
    ProductDetailsPageComponent,
    TestimonialSectionComponent,
    FaqPageComponent,
    PrivacyPolicyPageComponent,
    BlogPageComponent,
    BlogDetailsPageComponent,
    AddToWishlistPageComponent,
    RequestPageComponent,
    MyOrderPageComponent,
    AboutusPageComponent,
    FourOfourComponent,
    TawkToComponent,
    ForgotPasswordComponent,
    GetInTouchDialogueComponent,
    SearchComponent,

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
    ReactiveFormsModule,
    NgxPaginationModule,
    AngularEditorModule,
    DataTablesModule,
    MatCardModule

  ],
  exports: [
    UserHeaderComponent,
    UserFooterComponent,
    HomePageComponent,

  ],
  providers: [
  ]

})
export class UserModule { }
