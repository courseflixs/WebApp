import { Component, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-tawk',
  templateUrl: './tawk.to.component.html',
  styleUrls: ['./tawk.to.component.css']
})
export class TawkToComponent implements OnInit {
  constructor(private renderer: Renderer2) { }
  ngOnInit(): void {
    const script = `
var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
(function(){
var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
s1.async=true;
s1.src='https://embed.tawk.to/64bbc8adcc26a871b02a8508/1h5uofpqt';
s1.charset='UTF-8';
s1.setAttribute('crossorigin','*');
s0.parentNode.insertBefore(s1,s0);
})();
`;
    const el = this.renderer.createElement('script');
    el.text = script;
    this.renderer.appendChild(document.body, el);
  }

}
