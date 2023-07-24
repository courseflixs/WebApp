import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { NgFor, AsyncPipe } from '@angular/common';
import { Router } from '@angular/router';
import { UserAuthService } from '../services/user-auth.service';
import { ProductService } from '../services/product.service';
import { DeliverService } from '../services/deliver.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
export interface User {
  name: string ;
  email:string
}
export interface Product {
  product_name: string
}
@Component({
  selector: 'app-add-delivery',
  templateUrl: './add-delivery.component.html',
  styleUrls: ['./add-delivery.component.css']
})
export class AddDeliveryComponent implements OnInit {

  // Autocomplete textbox for username 
  myControlUser = new FormControl<string | User>('');
  optionsUser: User[] = [];
  filteredOptionsUser: any;
  getSingleDelivery:any;
  // Autocomplete textbox for prodcuct 
  myControlProduct = new FormControl<string | Product>('');
  optionsProduct: Product[] = [];
  filteredOptionsProduct: any;

  deliveryForm = new FormGroup({
    userID: new FormControl<string | User>(''),
    productID: new FormControl<string | Product>(''),
    finalPrice: new FormControl(''),
    productLink: new FormControl(''),
    points: new FormControl(''),
    userName:new FormControl(''),
    productName:new FormControl('')
  });

  constructor(private router: Router, private userService: UserAuthService, private proService: ProductService, private deliveryService: DeliverService) { }

  ngOnInit() {

    this.userService.getAllEnduserService().subscribe((result) => {
      this.optionsUser = result
    })
    this.proService.getAllProService().subscribe((result) => {
      this.optionsProduct = <any>result
    })
    this.getSingleDelivery=this.deliveryService.sharedSingleDeliveryData;
    this.getSingleDelivery?this.myControlUser.setValue({name:this.getSingleDelivery.user_name,email:''}):''
    this.getSingleDelivery?this.myControlProduct.setValue({product_name:this.getSingleDelivery.product_name}):''
    // ==========================================================================================================
    //  Autocomplete textbox for username 
    // ============================================================================================================
    this.filteredOptionsUser = this.myControlUser.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this._filterUser(name as string) : this.optionsUser.slice();
      }),
    );

    // ==========================================================================================================
    //  Autocomplete textbox for Products 
    // ============================================================================================================
    this.filteredOptionsProduct = this.myControlProduct.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.product_name;
        return name ? this._filterProduct(name as string) : this.optionsProduct.slice();
      }),
    );
    // ==========================================================================================================
    //                                           {{Autocomplete END}}
    // ============================================================================================================

  }

  // User Autocomplete code
  displayFnUser(user: User): string {
    return user && user.name ? user.name : '';
  }

  private _filterUser(name: string): User[] {
    const filterValue = name.toLowerCase();

    return this.optionsUser.filter(option => option.name.toLowerCase().includes(filterValue) || option.email.toLowerCase().includes(filterValue));
  }
// {{END User}}

// Product autocomplete code
  displayFnProduct(product: Product): string {
    return product && product.product_name ? product.product_name : '';
  }

  private _filterProduct(name: string): Product[] {
    const filterValue = name.toLowerCase();
    return this.optionsProduct.filter(option => option.product_name.toLowerCase().includes(filterValue));
  }
  // {{End Product }}
  //############################################################################################//
  //<|========================= Integration with backend from here ======================|>
  //############################################################################################//

  selectOptionProduct(e: MatAutocompleteSelectedEvent) {
    const item: any = e.option.value;
    this.deliveryForm.get("productID")?.setValue(item._id)
    this.deliveryForm.get("productName")?.setValue(item.product_name)


  }
  selectOptionUser(e: MatAutocompleteSelectedEvent) {
    const item: any = e.option.value;
    console.log(item);
    this.deliveryForm.get("userID")?.setValue(item._id)
    this.deliveryForm.get("userName")?.setValue(item.name)

  }
  addDelivery() {
    console.log(this.deliveryForm.value)
    this.deliveryService.addDeliveryService(this.deliveryForm.value).subscribe((result)=>{
      window.scrollTo(0, 0)
      sessionStorage.setItem("isDeliverCrudMsg", "Delivery details Inserted Successfully!!!")
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/admin/home/delivered-orders']) // Navigate to the same URL
      })
    })
  }
  updateOrders(id:String){
    this.deliveryService.updateDeliveryService(id,this.deliveryForm.value).subscribe((result)=>{
      window.scrollTo(0, 0)
      sessionStorage.setItem("isDeliverCrudMsg", "Delivery details Updated Successfully!!!")
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/admin/home/delivered-orders']) // Navigate to the same URL
      })    
    })
  }
  //<|========================= Integration with backend from here {END}======================|>


}
