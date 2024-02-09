import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { BehaviorSubject } from 'rxjs';
import { DeliverService } from '../../admin/services/deliver.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-my-order-page',
  templateUrl: './my-order-page.component.html',
  styleUrls: ['./my-order-page.component.css']
})
export class MyOrderPageComponent implements OnInit {
  getUserOrder: any;
  totalPoints: number = 0;
  userID: String | undefined | null;
  @ViewChild(DataTableDirective, { static: false })
  datatableElement!: DataTableDirective;
  dtTrigger: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  dtOptions: any = {};
  constructor(private deliveryService: DeliverService, private route: ActivatedRoute,private _commonService:CommonService) { }
  ngOnInit(): void {
    window.scroll(0,0)
    this.dtOptions = {
      responsive: true,
    };
    setTimeout(() => {
      this.loadUpdatedOrders()

    }, 180)

  }

  loadUpdatedOrders() {
    this.userID = this.route.snapshot.paramMap.get("userID");
    this._commonService.showLoader()
    this.deliveryService.getSpecificUserOrder(this.userID).subscribe(async (result: any) => {
      this._commonService.hideLoader()
      this.getUserOrder = await result;
      result.forEach((element: any) => {
        this.totalPoints += element.points
      });
      this.reloadDataTable();
      console.log(this.getUserOrder)
    })
  }

  reloadDataTable(): void {
    if (this.datatableElement && this.datatableElement.dtInstance) {
      this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
        this.dtTrigger.next('');
      });
    }
  }

  getProImageUrl(imageName: string) {
    return `${environment.apiUrl}/image/product/${imageName}`;
  }


}
