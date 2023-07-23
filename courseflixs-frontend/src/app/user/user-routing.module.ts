import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { ProductsPageComponent } from './products-page/products-page.component';
import { ProductDetailsPageComponent } from './product-details-page/product-details-page.component';
import { FaqPageComponent } from './faq-page/faq-page.component';
import { PrivacyPolicyPageComponent } from './privacy-policy-page/privacy-policy-page.component';
import { BlogPageComponent } from './blog-page/blog-page.component';
import { BlogDetailsPageComponent } from './blog-details-page/blog-details-page.component';
import { AddToWishlistPageComponent } from './add-to-wishlist-page/add-to-wishlist-page.component';
import { RequestPageComponent } from './request-page/request-page.component';
import { MyOrderPageComponent } from './my-order-page/my-order-page.component';
import { AboutusPageComponent } from './aboutus-page/aboutus-page.component';
import { userAuthGuardGuard } from './auth-guard/user-auth-guard.guard';
import { FourOfourComponent } from './four-ofour/four-ofour.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'login', component: LoginPageComponent,canActivate:[userAuthGuardGuard] },
  { path: 'all-products/:whichPro', component: ProductsPageComponent },
  { path: 'product-details/:proID', component: ProductDetailsPageComponent },
  { path: 'faqs', component: FaqPageComponent },
  { path: 'privacy-policy', component: PrivacyPolicyPageComponent },
  { path: 'blogs', component: BlogPageComponent },
  { path: 'blogs/:category', component: BlogPageComponent },
  { path: 'blog-details/:blogID', component: BlogDetailsPageComponent },
  { path: 'add-to-wishlist/:userID', component: AddToWishlistPageComponent},
  { path: 'add-to-wishlist/:userID/:proID', component: AddToWishlistPageComponent},
  { path: 'request', component: RequestPageComponent },
  { path: 'myorder/:userID', component: MyOrderPageComponent},
  { path: 'aboutus', component: AboutusPageComponent },
  {path:'forgot-password',component:ForgotPasswordComponent},
  {path:'reset-password/:token',component:ForgotPasswordComponent},

  { path: '**', component: FourOfourComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
