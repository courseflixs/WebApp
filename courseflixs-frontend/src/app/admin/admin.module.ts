import { NgModule } from '@angular/core';
import { CommonModule, NgIfContext } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminHeaderComponent } from './admin-header/admin-header.component';
import { AdminFooterComponent } from './admin-footer/admin-footer.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { MatTabsModule } from '@angular/material/tabs';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminCategoryComponent } from './admin-category/admin-category.component';
import { ProductsComponent } from './products/products.component';
import { BlogsComponent } from './blogs/blogs.component';
import { TestimonialComponent } from './testimonial/testimonial.component';
import { DeliveredOrdersComponent } from './delivered-orders/delivered-orders.component';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';
import { SubscribedUsersComponent } from './subscribed-users/subscribed-users.component';
import { DataTablesModule } from "angular-datatables";
import { AddProductComponent } from './add-product/add-product.component';
import { HttpClientModule } from '@angular/common/http';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { MatChipsModule } from '@angular/material/chips';
import { AddBlogsComponent } from './add-blogs/add-blogs.component';
import { AddDeliveryComponent } from './add-delivery/add-delivery.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogConfirmComponent } from './dialog-confirm/dialog-confirm.component';
import { CourseRequestComponent } from './course-request/course-request.component';

@NgModule({
  declarations: [
    AdminHeaderComponent,
    AdminFooterComponent,
    AdminDashboardComponent,
    SidebarComponent,
    AdminHomeComponent,
    AdminCategoryComponent,
    ProductsComponent,
    BlogsComponent,
    TestimonialComponent,
    DeliveredOrdersComponent,
    CustomerDetailsComponent,
    SubscribedUsersComponent,
    AddProductComponent,
    AddBlogsComponent,
    AddDeliveryComponent,
    DialogConfirmComponent,
    CourseRequestComponent,
    
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    // font awesome icon
    FontAwesomeModule,
    // bootstrap
    NgbModule,
    // Material UI Imports
    MatSidenavModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatDividerModule,
    MatListModule,
    MatTabsModule,
    MatAutocompleteModule,
    MatDialogModule,
    // Material Form Field
    MatFormFieldModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatCheckboxModule,
    MatSelectModule,
    DataTablesModule,
    HttpClientModule,
    AngularEditorModule,
    MatChipsModule,

  ],
  exports: [
    AdminHeaderComponent,
    AdminFooterComponent,
    AdminDashboardComponent,
    SidebarComponent,


  ],

})
export class AdminModule { }
