import { Component,OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { BehaviorSubject } from 'rxjs';
import { DeliverService } from '../services/deliver.service';
import { MatDialog } from '@angular/material/dialog';
import { environment } from '../../../environments/environment';
import { DialogConfirmComponent } from '../dialog-confirm/dialog-confirm.component';

@Component({
  selector: 'app-delivered-orders',
  templateUrl: './delivered-orders.component.html',
  styleUrls: ['./delivered-orders.component.css']
})
export class DeliveredOrdersComponent implements OnInit{
 // Must be declared as "any", not as "DataTables.Settings"
 changeDeliveredContenArea='delivered-orders'
 
 // Data table reload Setting
 @ViewChild(DataTableDirective, { static: false })
 datatableElement!: DataTableDirective;
 dtTrigger: BehaviorSubject<any> = new BehaviorSubject<any>(null);

 isDeliverCrudMsg: String | undefined;
 getAllDeliverData: any;
 constructor(private router: Router, private deliverService: DeliverService,private dialog: MatDialog) { }

 dtOptions: any = {};

 ngOnInit(): void {
   this.dtOptions = {
     responsive: true,
     columnDefs: [
       { responsivePriority: 1, targets: 0 },
       { responsivePriority: 2, targets: -1 }
     ]
   };
   //To change  content area of product
   this.router.events.subscribe((val:any)=>{
    if(val.url){
      if(val.url.toString().includes('add-delivery')){
        this.changeDeliveredContenArea='add-delivery'
      }
    }
  })
   if (sessionStorage.getItem("isDeliverCrudMsg")) {
     this.isDeliverCrudMsg = sessionStorage.getItem("isDeliverCrudMsg")?.toString();
   }

   setTimeout(() => {
     this.isDeliverCrudMsg = undefined;
     sessionStorage.removeItem("isDeliverCrudMsg")
   }, 2000)
   setTimeout(() => {
     this.loadUpdatedPro()

   }, 180)

 }

 

 reloadDataTable(): void {
   if (this.datatableElement && this.datatableElement.dtInstance) {
     this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
       dtInstance.destroy();
       this.dtTrigger.next('');
     });
   }
 }


 loadUpdatedPro() {
   this.deliverService.getAllDeliveryService().subscribe((result) => {
     this.getAllDeliverData = result;
     this.reloadDataTable();
   })
 }

 commonInAddUpdateDelete(msg: String) {
  window.scrollTo(0, 0)
   this.isDeliverCrudMsg = msg
   this.loadUpdatedPro()
   setTimeout(() => {
     this.isDeliverCrudMsg = undefined;

   }, 4000)

 }


 deleteProduct(id: String) {
   this.deliverService.deleteDeliveryService(id).subscribe((result) => {
     this.commonInAddUpdateDelete("Order deleted successfully")
   })
 }

 openConfirmationDialog(id: String): void {
   const dialogRef = this.dialog.open(DialogConfirmComponent, {
     width: '30rem',
     data: {
       title: 'Confirmation',
       message: 'Are you sure you want to delete the Order?',
     },
   });
   dialogRef.afterClosed().subscribe((result) => {
     if (result === true) {
       this.deleteProduct(id);
     } else {
       console.log("No opration")
     }
   });
 }

 getSinglePro(id: String) {
   this.deliverService.getSingleDeliveryService(id).subscribe((result) => {
     console.log(result);
     this.deliverService.sharedSingleDeliveryData = result;
     this.router.navigate(['/admin/home/delivered-orders/add-delivery'])
   })

 }
 resetFields() {
   this.deliverService.sharedSingleDeliveryData = null;
 }

}
