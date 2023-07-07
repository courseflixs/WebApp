import { AfterViewInit, Component, ElementRef, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Product } from '../data-type';
import { ProductService } from '../services/product.service';
import { BehaviorSubject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { environment } from '../../../environments/environment';
import { DialogConfirmComponent } from '../dialog-confirm/dialog-confirm.component';
import { MatDialog } from '@angular/material/dialog';
ProductService
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  // Data table reload Setting
  @ViewChild(DataTableDirective, { static: false })
  datatableElement!: DataTableDirective;
  dtTrigger: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  isProCrudMsg: String | undefined;
  changeProductContenArea = 'products';
  getAllProData: any;
  constructor(private router: Router, private proServices: ProductService,private dialog: MatDialog) { }

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
    this.router.events.subscribe((val: any) => {
      if (val.url) {
        if (val.url.toString().includes('add-product')) {
          this.changeProductContenArea = 'add-product'
        }
      }
    })
    if (localStorage.getItem("isProCrudMsg")) {
      this.isProCrudMsg = localStorage.getItem("isProCrudMsg")?.toString();
    }

    setTimeout(() => {
      this.isProCrudMsg = undefined;
      localStorage.removeItem("isProCrudMsg")
    }, 2000)
    setTimeout(() => {
      this.loadUpdatedPro()

    }, 180)

  }

  getImageUrl(filename: string): string {
    return `${environment.apiUrl}/image/product/${filename}`;
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
    this.proServices.getAllProService().subscribe((result) => {
      this.getAllProData = result;
      this.reloadDataTable();
    })
  }

  commonInAddUpdateDelete(msg: String) {
    this.isProCrudMsg = msg
    this.loadUpdatedPro()
    setTimeout(() => {
      this.isProCrudMsg = undefined;

    }, 4000)

  }


  deleteProduct(id: String) {
    this.proServices.deleteProService(id).subscribe((result) => {
      this.commonInAddUpdateDelete("Product deleted successfully")
    })
  }

  openConfirmationDialog(id: String): void {
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      width: '30rem',
      data: {
        title: 'Confirmation',
        message: 'Are you sure you want to delete the product?',
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
    this.proServices.getSingleProServices(id).subscribe((result) => {
      console.log(result);
      this.proServices.sharedSingleProData = result;
      this.router.navigate(['/admin/home/products/add-product'])
    })

  }
  resetFields() {
    this.proServices.sharedSingleProData = null;
  }


  lockPro(id: String,lockStatus:String) {
    this.proServices.lockUnlockProService(id,lockStatus).subscribe((result)=>{
      this.commonInAddUpdateDelete("Product lock/unlock status changeg successfully")

    })
  }
}
