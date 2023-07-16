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

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'all-products', component: ProductsPageComponent },
  { path: 'product-details/:proID', component: ProductDetailsPageComponent },
  { path: 'faqs', component: FaqPageComponent },
  { path: 'privacy-policy', component: PrivacyPolicyPageComponent },
  { path: 'blogs', component: BlogPageComponent },
  { path: 'blog-details', component: BlogDetailsPageComponent },
  { path: 'add-to-wishlist', component: AddToWishlistPageComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
