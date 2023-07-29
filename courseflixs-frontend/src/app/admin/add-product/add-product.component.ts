import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips'
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Product } from '../data-type';
import { ProductService } from '../services/product.service';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { CategoryService } from '../services/category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  // Angular editor config
  htmlContent = '';

  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    toolbarHiddenButtons: [
      ['bold']
    ],
    customClasses: [
      {
        name: "quote",
        class: "quote",
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: "titleText",
        class: "titleText",
        tag: "h1",
      },
    ]
  };
  // add multip tag in a particular product

  seokeywords: string[] = [];
  formControl = new FormControl(['angular']);

  announcer = inject(LiveAnnouncer);

  removeKeyword(keyword: string) {
    const index = this.seokeywords.indexOf(keyword);
    if (index >= 0) {
      this.seokeywords.splice(index, 1);

      this.announcer.announce(`removed ${keyword}`);
    }
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our keyword
    if (value) {
      this.seokeywords.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  //############################################################################################//
  //<|========================= Integration with backend from here ======================|>
  //############################################################################################//
  progress: number = 0;
  getAllCatCombobox: any;
  isProCrudMsg: String | undefined;
  getSinglePro: any
  viewImgDialogue: String = ''
  viewDialogueTitle: String = ''
  constructor(private proSevice: ProductService, private catService: CategoryService, private router: Router, private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    // Fetching all the  category for displaying in category combobox
    this.catService.getTypeWiseCatService("Product").subscribe(async (result) => {
      this.getAllCatCombobox = await result;
    })
    //Accessing sharedData to display default value at the time of update product
    this.getSinglePro = this.proSevice.sharedSingleProData;
    this.seokeywords = this.getSinglePro?this.getSinglePro.tags:[]
  }

  productForm = new FormGroup({
    proMainImg: new FormControl(null),
    proName: new FormControl(null),
    catName: new FormControl(''),
    proFileSize: new FormControl(''),
    proOriginalPrice: new FormControl(''),
    proSalePrice: new FormControl(''),
    selePageLink: new FormControl(''),
    salePage: new FormControl(''),
    gifImage: new FormControl(null),
    sliderProVisiblity: new FormControl(''),
    recomProvisiblity: new FormControl(''),
    seoKeywordList: new FormControl(''),
    updateMainImg:new FormControl(''),
    updateGifImg:new FormControl('')
  })


  onFileChange(event: any, whichFile: String) {
    if (whichFile === "proMainImg") {
      if (event.target.files.length > 0) {
        console.log(event.target.files)
        const file = event.target.files[0];
        this.productForm.patchValue({
          proMainImg: file
        });
      }
    } else {
      if (event.target.files.length > 0) {
        console.log(event.target.files)
        const file = event.target.files[0];
        this.productForm.patchValue({
          gifImage: file
        });
      }
    }
  }
  getImageUrl(filename: String, dialogueTitle: String) {
    this.viewImgDialogue = `${environment.apiUrl}/image/product/${filename}`;
    console.log( this.viewImgDialogue)
    this.viewDialogueTitle = dialogueTitle
  }


  addProduct() {
    // reseting the varible which is set at time of update product 
    const formData = new FormData();
    formData.append('proName', this.productForm.get('proName')?.value ?? '');
    formData.append('catName', this.productForm.get('catName')?.value || '');
    formData.append('proFileSize', this.productForm.get('proFileSize')?.value || '');
    formData.append('proOriginalPrice', this.productForm.get('proOriginalPrice')?.value || '');
    formData.append('proSalePrice', this.productForm.get('proSalePrice')?.value || '');
    formData.append('selePageLink', this.productForm.get('selePageLink')?.value || '');
    formData.append('salePage', this.productForm.get('salePage')?.value || '');
    formData.append('sliderProVisiblity', this.productForm.get('sliderProVisiblity')?.value || '');
    formData.append('recomProvisiblity', this.productForm.get('recomProvisiblity')?.value || '');
    formData.append('seoKeywordList', JSON.stringify(this.seokeywords));
    formData.append('updateMainImg',this.productForm.get('updateMainImg')?.value || '')
    formData.append('updateGifImg',this.productForm.get('updateGifImg')?.value || '')

    formData.append('proMainImg', this.productForm.get('proMainImg')?.value || '');
    formData.append('gifImage', this.productForm.get('gifImage')?.value || '');


    this.proSevice.addProductService(formData).subscribe((event: HttpEvent<any>) => {
      console.log(event);
      switch (event.type) {
        case HttpEventType.Sent:
          console.log('Request has been made!');
          break;
        case HttpEventType.ResponseHeader:
          console.log('Response header has been received!');
          break;
        case HttpEventType.UploadProgress:
          this.progress = Math.round((event.loaded || 1) / (event.total || 1) * 100);
          console.log(`Uploaded! ${this.progress}%`);
          break;
        case HttpEventType.Response:
          console.log('User successfully created!', event.body.proMsg);
          sessionStorage.setItem("isProCrudMsg", event.body.proMsg)
          setTimeout(() => {
            this.progress = 0;
            this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
              this.router.navigate(['/admin/home/products']) // Navigate to the same URL
            })
          }, 1500);
      }
    })

  }
  updateProduct(id:String){
    const formData = new FormData();
    formData.append('proName', this.productForm.get('proName')?.value ?? '');
    formData.append('catName', this.productForm.get('catName')?.value || '');
    formData.append('proFileSize', this.productForm.get('proFileSize')?.value || '');
    formData.append('proOriginalPrice', this.productForm.get('proOriginalPrice')?.value || '');
    formData.append('proSalePrice', this.productForm.get('proSalePrice')?.value || '');
    formData.append('selePageLink', this.productForm.get('selePageLink')?.value || '');
    formData.append('salePage', this.productForm.get('salePage')?.value || '');
    formData.append('sliderProVisiblity', this.productForm.get('sliderProVisiblity')?.value || '');
    formData.append('recomProvisiblity', this.productForm.get('recomProvisiblity')?.value || '');
    formData.append('seoKeywordList', JSON.stringify(this.seokeywords));
    formData.append('updateMainImg',this.productForm.get('updateMainImg')?.value || '')
    formData.append('updateGifImg',this.productForm.get('updateGifImg')?.value || '')

    formData.append('proMainImg', this.productForm.get('proMainImg')?.value || '');
    formData.append('gifImage', this.productForm.get('gifImage')?.value || '');
    this.proSevice.updateProService(id,formData).subscribe((event: HttpEvent<any>)=>{
      console.log(event);
      switch (event.type) {
        case HttpEventType.Sent:
          console.log('Request has been made!');
          break;
        case HttpEventType.ResponseHeader:
          console.log('Response header has been received!');
          break;
        case HttpEventType.UploadProgress:
          this.progress = Math.round((event.loaded || 1) / (event.total || 1) * 100);
          console.log(`Uploaded! ${this.progress}%`);
          break;
        case HttpEventType.Response:
          console.log('User successfully created!', event.body.proMsg);
          sessionStorage.setItem("isProCrudMsg", event.body.proMsg)
          setTimeout(() => {
            this.progress = 0;
            this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
              this.router.navigate(['/admin/home/products']) // Navigate to the same URL
            })          
          }, 1500);
      }
    })
  }
  //<|========================= Integration with backend from here {END}======================|>

}
