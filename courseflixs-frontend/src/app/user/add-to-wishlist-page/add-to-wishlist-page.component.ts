import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WishlistService } from '../../services/wishlist.service';
import { environment } from '../../../environments/environment';
import { CommonService } from '../../services/common.service';
@Component({
  selector: 'app-add-to-wishlist-page',
  templateUrl: './add-to-wishlist-page.component.html',
  styleUrls: ['./add-to-wishlist-page.component.css']
})
export class AddToWishlistPageComponent implements OnInit {

  proID: String | null = '';
  userID: String | null = '';
  wishlistSuccMsg: String | undefined;
  wishlistData: any;

  constructor(private route: ActivatedRoute, private wishlistService: WishlistService, private router: Router,private _commonService:CommonService) {

  }
  ngOnInit(): void {
      window.scroll(0,0);
      this.userID = this.route.snapshot.paramMap.get('userID');
      this.proID = this.route.snapshot.paramMap.get('proID');
      console.log(this.userID, this.proID)
      if (this.userID && this.proID) {
        this._commonService.showLoader()
        this.wishlistService.addProIntoWishlistService({ "userID": this.userID, "proID": this.proID }).subscribe((result: any) => {
          if (result) {
            this.wishlistSuccMsg = result.wishMsg;
            setTimeout(() => {
              this.wishlistSuccMsg = undefined;
            }, 8000)
            this.wishlistService.getProFromWishlistService(this.userID).subscribe((wishResult) => {
              this.wishlistData = wishResult;
              this._commonService.hideLoader()
              console.log(wishResult);
            });
          }else{
            this._commonService.hideLoader()
          }
        });
      } else {
        this._commonService.showLoader()
        this.wishlistService.getProFromWishlistService(this.userID).subscribe((wishResult) => {
          this._commonService.hideLoader()
          this.wishlistData = wishResult;
          console.log(wishResult);
        });
      }
  }
  getProImageUrl(imageName: string) {
    return `${environment.apiUrl}/image/product/${imageName}`;
  }
  deleteWishlist(id: String) {
    this._commonService.showLoader()
    this.wishlistService.deleteProFromWishlistService(id).subscribe((result: any) => {
      if (result) {
        this.wishlistSuccMsg = result.wishMsg;
        this._commonService.hideLoader()
        setTimeout(() => {
          this.wishlistSuccMsg = undefined;
        }, 6000);
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/add-to-wishlist',this.userID]); // Navigate to the same URL
        });

      }
    })
  }
}
