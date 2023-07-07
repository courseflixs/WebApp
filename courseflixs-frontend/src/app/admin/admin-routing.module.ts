import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminCategoryComponent } from './admin-category/admin-category.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ProductsComponent } from './products/products.component';
import { BlogsComponent } from './blogs/blogs.component';
import { TestimonialComponent } from './testimonial/testimonial.component';
import { DeliveredOrdersComponent } from './delivered-orders/delivered-orders.component';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';
import { SubscribedUsersComponent } from './subscribed-users/subscribed-users.component';
import { AddProductComponent } from './add-product/add-product.component';
import { AddBlogsComponent } from './add-blogs/add-blogs.component';
import { AddDeliveryComponent } from './add-delivery/add-delivery.component';
import { adminAuthGuard } from './auth-guard/admin-auth.guard';
const routes: Routes = [
  {
    path: 'home', component: AdminHomeComponent, children: [
      { path: 'dashboard', component: AdminDashboardComponent },
      { path: 'category', component: AdminCategoryComponent },
      {
        path: 'products', component: ProductsComponent, children:
          [
            { path: "add-product", component: AddProductComponent },

          ]
      },
      {
        path: 'blogs', component: BlogsComponent, children:
          [
            { path: 'add-blog', component: AddBlogsComponent },

          ]
      },
      { path: 'testimonial', component: TestimonialComponent },
      {
        path: 'delivered-orders', component: DeliveredOrdersComponent, children:
          [
            { path: 'add-delivery', component: AddDeliveryComponent },

          ]
      },
      { path: 'customer-details', component: CustomerDetailsComponent },
      { path: 'subscribed-users', component: SubscribedUsersComponent },
    ],
    canActivate:[adminAuthGuard],
  },
  { path: 'login', component: AdminLoginComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
