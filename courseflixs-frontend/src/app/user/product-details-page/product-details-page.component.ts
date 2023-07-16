import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ProductService } from '../../services/product.service';
import { environment } from '../../../environments/environment';
import { Product } from '../../admin/data-type';

@Component({
  selector: 'app-product-details-page',
  templateUrl: './product-details-page.component.html',
  styleUrls: ['./product-details-page.component.css']
})


export class ProductDetailsPageComponent implements OnInit {
  proID: String | null='';
  getSinglePro: any;
  nextProduct: any;
  prevProduct: any;
  getAllPro: Product[] ;
  constructor(private route: ActivatedRoute, private endUserProService: ProductService) {    this.getAllPro=[];
  }
  ngOnInit(): void {

    //  fetching parameter from product-details router to get the single product details
    this.proID = this.route.snapshot.paramMap.get('proID');

    this.endUserProService.getSingleProDetails(this.proID).subscribe((result) => {
      this.getSinglePro = result;

    });
    this.endUserProService.getAllProService().subscribe((result)=>{
      this.getAllPro=result;
      console.log(this.getAllPro)
     console.log(this.getNextProduct(this.proID)) 
    //  this.getNextProduct(this.proID);
      // this.getPreviousProduct(this.proID);
      console.log(this.getPreviousProduct(this.proID));
    });
   
  


  }
  getProImageUrl(imageName: string) {
    return `${environment.apiUrl}/image/product/${imageName}`;
  }

  editorConfig: AngularEditorConfig = {
    editable: false,
    spellcheck: true,
    height: 'auto',
    minHeight: '0',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: false,
    showToolbar: false,

  };



  getNextProduct(currentProductId: String | null) {
    console.log(typeof(currentProductId))
    const currentIndex = this.getAllPro.findIndex((product) => product._id == currentProductId);
    const nextIndex = (currentIndex + 1) % this.getAllPro.length;
    return this.getAllPro[nextIndex];
  }

  getPreviousProduct(currentProductId: String | null) {
    const currentIndex = this.getAllPro.findIndex((product) => product._id == currentProductId);
    const previousIndex = (currentIndex - 1 + this.getAllPro.length) % this.getAllPro.length;
    return this.getAllPro[previousIndex];
  }

}
