import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.css']
})
export class WelcomePageComponent implements OnInit {

  constructor(
    private router: Router
  ) { }
  abc:any;
  parentNode:any;
  value:any;

  
addcl(){
	let parent = this.parentNode.parentNode;
	parent.classList.add("focus");
}

remcl(){
	let parent = this.parentNode.parentNode;
	if(this.value == ""){
		parent.classList.remove("focus");
	}
}

  ngOnInit(): void {
    const inputs = document.querySelectorAll(".input");

    inputs.forEach(input => {
      input.addEventListener("focus", this.addcl);
      input.addEventListener("blur", this.remcl);
    });

  }


  
  marketerClick(){
    this.router.navigate(['welcome/login/', "marketer"]);
  }
  supplierClick(){
    this.router.navigate(['welcome/login/', "supplier"]);
  }
  graphicDesignerClick(){
    this.router.navigate(['welcome/login/', "designer"]);
  }
  sysAdminClick(){
    this.router.navigate(['welcome/login/', "admin"]);
  }
  


}
