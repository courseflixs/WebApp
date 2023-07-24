import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WishlistService } from '../../services/wishlist.service';
import { environment } from '../../../environments/environment';
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

  constructor(private route: ActivatedRoute, private wishlistService: WishlistService, private router: Router) {

  }
  ngOnInit(): void {

      this.userID = this.route.snapshot.paramMap.get('userID');
      this.proID = this.route.snapshot.paramMap.get('proID');
      console.log(this.userID, this.proID)
      if (this.userID && this.proID) {
        this.wishlistService.addProIntoWishlistService({ "userID": this.userID, "proID": this.proID }).subscribe((result: any) => {
          if (result) {
            this.wishlistSuccMsg = result.wishMsg;
            window.scrollTo(0, 0)
            setTimeout(() => {
              this.wishlistSuccMsg = undefined;
            }, 8000)
            this.wishlistService.getProFromWishlistService(this.userID).subscribe((wishResult) => {
              this.wishlistData = wishResult;
              console.log(wishResult);
            });
          }
        });
      } else {
        this.wishlistService.getProFromWishlistService(this.userID).subscribe((wishResult) => {
          this.wishlistData = wishResult;
          console.log(wishResult);
        });
      }
  }
  getProImageUrl(imageName: string) {
    return `${environment.apiUrl}/image/product/${imageName}`;
  }
  deleteWishlist(id: String) {
    this.wishlistService.deleteProFromWishlistService(id).subscribe((result: any) => {
      if (result) {
        this.wishlistSuccMsg = result.wishMsg;
          window.scrollTo(0, 0)
        
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
