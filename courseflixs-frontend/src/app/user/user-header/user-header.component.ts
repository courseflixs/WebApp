import { Component, EventEmitter, HostListener, OnInit, Output, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { CategoryService } from '../../admin/services/category.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EndUserAuthService } from '../../services/end-user-auth.service';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-user-header',
  templateUrl: './user-header.component.html',
  styleUrls: ['./user-header.component.css']
})
export class UserHeaderComponent implements OnInit {
  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();
  @ViewChild('openModelBtn') openbutton: any;
  @ViewChild('automaticCloseBtn') closebutton: any;

  loggedInUserID: String | null | undefined;
  proCategory: any
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  subscribedForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
  })
  searchBy:string='';
  constructor(private router: Router, private catService: CategoryService, private endUserService: EndUserAuthService,private _commonService:CommonService) { }

  ngOnInit(): void {
    // Login user info
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.loggedInUserID = sessionStorage.getItem('userID')
      }
    });
    this._commonService.showLoader()
    this.catService.getTypeWiseCatService('Product').subscribe((result) => {
      this._commonService.hideLoader()
      console.log(result)
      this.proCategory = result;
    })
  }

  ngAfterViewInit() {
    if (!sessionStorage.getItem('siteInit')) {
      setTimeout(() => {
        this.openbutton.nativeElement.click()
        sessionStorage.setItem('siteInit', 'true');
      }, 100);
    }
  }

  toggleSidebar() {
    this.toggleSidebarForMe.emit();
  }
  isMenuFixed: boolean = false;

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event: Event) {
    // Check the scroll position
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

    // Set the isMenuFixed flag based on the scroll position
    this.isMenuFixed = scrollPosition > 0;

  }

  logoutUser() {
    this.loggedInUserID = undefined
    sessionStorage.removeItem('userID')
    sessionStorage.removeItem('userLoggedIn');
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/']) // Navigate to the same URL
    })
  }
  redirectToProducts(category: String) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/all-products', category]) // Navigate to the same URL
    })
  }

  addSubscriber() {
    this._commonService.showLoader()
    this.endUserService.addSubscriberService(this.subscribedForm.value).subscribe((result: any) => {
      if (result) {
        this._commonService.hideLoader()
        this.closebutton.nativeElement.click()
      }else{
        this._commonService.hideLoader()
      }
    })
  }
  getSearchResult(){
  this.router.navigate(['/search',this.searchBy])
 }
}
