import { Component, OnInit, ViewChild } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Category } from '../data-type';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { BehaviorSubject } from 'rxjs';
import { DialogConfirmComponent } from '../dialog-confirm/dialog-confirm.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.css'],
})
export class AdminCategoryComponent implements OnInit {
  @ViewChild('closebutton') closebutton: any;
  // Data table reload Setting
  @ViewChild(DataTableDirective, { static: false })
  datatableElement!: DataTableDirective;
  dtTrigger: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  selected = undefined
  isCatCrudMsg: String | undefined;
  getCatData: any;
  getSingleCatData: any;
  dtOptions: any = {};
  constructor(private catService: CategoryService, private router: Router, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.dtOptions = {
      responsive: true,
      columnDefs: [
        { responsivePriority: 1, targets: 1 },
        { responsivePriority: 2, targets: -1 }
      ]
    };
    setTimeout(() => {
      this.loadUpdatedCat()

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


  addCategoryForm = new FormGroup({
    categoryType: new FormControl(''),
    categoryName: new FormControl(''),
    qoute:new FormControl('')
  })
  get categoryType() {
    return this.addCategoryForm.get('categoryType')
  }

  get categoryName() {
    return this.addCategoryForm.get('categoryName')
  }


  clearInput() {
      this.addCategoryForm.reset()
    this.getSingleCatData = null;
  }

  loadUpdatedCat() {
    this.catService.getAllCategoryService().subscribe(async (result) => {
      // console.log(result)
      this.getCatData = await result;
      // console.log(this.getCatData)
      this.reloadDataTable();

    })
  }

  commonInAddUpdateDelete(msg: String) {
    this.isCatCrudMsg = msg
    this.loadUpdatedCat()
    setTimeout(() => {
      this.isCatCrudMsg = undefined;

    }, 4000)

  }

  addCategory() {
    this.catService.saveCategoryService(<Category>this.addCategoryForm.value).subscribe((result) => {
      if (result) {
        this.closebutton.nativeElement.click();
        this.commonInAddUpdateDelete("Category added successfully!!")
      }
    })
  }


  deleteCat(id: String) {
    console.log("delete id" + id);
    this.catService.deleteCatService(id).subscribe(async (deResult) => {
      console.log(deResult)
      this.commonInAddUpdateDelete("Category deleted successfully!!")
    })
  }


  getSingleCat(id: String) {
    this.catService.getSingleCatService(id).subscribe((result) => {
      console.log("this is single cat result")
      console.log(result)
      this.addCategoryForm.get('categoryName')?.setValue(' ')
      this.getSingleCatData = result;
      this.selected = this.getSingleCatData.type_of_category
    })
  }


  updateCat(id: String) {
    console.log("update console")
    this.catService.updateCatService(id, <Category>this.addCategoryForm.value).subscribe((result) => {
      console.log(result)
      this.closebutton.nativeElement.click();
      this.commonInAddUpdateDelete("Category updated successfully!!")
    })
  }


  openConfirmationDialog(id: String): void {
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      width: '30rem',
      data: {
        title: 'Confirmation',
        message: 'Are you sure you want to delete the category?',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.deleteCat(id);
      } else {
        console.log("No opration")
      }
    });
  }
}
