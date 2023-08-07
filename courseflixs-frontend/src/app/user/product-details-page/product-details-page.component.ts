import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
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
  proID: String | null = '';
  getSinglePro: any;
  nextProduct: any;
  prevProduct: any;
  getAllPro: Product[];
  @ViewChild('innerdiv1') innerDiv1!:ElementRef;

  userID: String | null = '';
  constructor(private route: ActivatedRoute, private endUserProService: ProductService, private router: Router) {
    this.getAllPro = [];
  }
  ngOnInit(): void {
    console.log("clicked")
    this.endUserProService.getAllProService().subscribe((result) => {
      //  fetching parameter from product-details router to get the single product details
      this.proID = this.route.snapshot.paramMap.get('proID');
      this.getAllPro = result;
      console.log(this.getAllPro);
      this.getSinglePro = this.getProductById(this.proID);

      this.nextProduct = this.getNextProduct(this.proID);
      this.prevProduct = this.getPreviousProduct(this.proID);
      this.userID = sessionStorage.getItem("userID");
      this.innerDiv1.nativeElement.innerHTML=this.getSinglePro.sale_page;
      console.log("User ID: " + this.userID);
    });
    window.scrollTo(0, 0)
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
    translate: 'yes',
    enableToolbar: false,
    showToolbar: false,

  };

  getProductById(id: String | null): Product | undefined {
    return this.getAllPro.find(product => product._id == id);
  }

  getNextProduct(currentProductId: String | null) {
    const currentIndex = this.getAllPro.findIndex((product) => product._id == currentProductId);
    const nextIndex = (currentIndex + 1) % this.getAllPro.length;
    // this.getSinglePro=this.getAllPro[nextIndex];
    return this.getAllPro[nextIndex];
  }

  getPreviousProduct(currentProductId: String | null) {
    const currentIndex = this.getAllPro.findIndex((product) => product._id == currentProductId);
    const previousIndex = (currentIndex - 1 + this.getAllPro.length) % this.getAllPro.length;
    // this.getSinglePro=this.getAllPro[previousIndex]
    return this.getAllPro[previousIndex];

  }

  navigateNextAndPrevOnSamePageURL(proID: String) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/product-details', proID]) // Navigate to the same URL
    })
  }


}
