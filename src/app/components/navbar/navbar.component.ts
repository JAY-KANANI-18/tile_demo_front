import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(private router: Router) {}
  menuItems = [
    { label: 'Home', path: '/Home' },
    { label: 'Portfolio', path: '/Portfolio' },
    { label: 'Profile', path: '/Profile' },
    // Add more menu items as needed
  ];
  ngOnInit(): void {
    this.addActiveClassOnPageMove();

  }

  addActiveClassOnPageMove(): void {
   
    this.setCurrentActive();

    // this.router.events.pipe(
    //   filter(event => event instanceof NavigationEnd)
    // ).subscribe(() => {
    //   console.log("ughuyiuyyuguygyuguyguy");
      
    // });
  }

  setCurrentActive(): void {
    let path :any= this.router.url.split('/')
    console.log(path);
    
    setTimeout(() => {
      this.handleItemClick(path[1])
    }, 100);
    

    // Account for home page with empty path
    // if (path === '') {
    //   path = 'Home';
    // }

    // const activeItem = document.querySelector(`${path}`);
    // if (activeItem) {
    //   const parentLi = activeItem.parentElement;
    //   if (parentLi) {
    //     parentLi.classList.add('active');
    //   }
    //   this.adjustIndicatorPosition();
    // }
  }

  adjustIndicatorPosition(): void {
    console.log("cccccccccccccccccc");
    
    const activeItem = document.querySelector('#navbarSupportedContent .active');
    const horiSelector = document.querySelector(".hori-selector") as HTMLElement;
    if (activeItem && horiSelector) {
      const activeItemRect = activeItem.getBoundingClientRect();
      const navbarRect = document.getElementById('navbarSupportedContent')?.getBoundingClientRect();
      if (navbarRect) {
        horiSelector.style.top = (activeItemRect.top - navbarRect.top) + 'px';
        horiSelector.style.left = (activeItemRect.left - navbarRect.left) + 'px';
        horiSelector.style.height = activeItemRect.height + 'px';
        horiSelector.style.width = activeItemRect.width + 'px';
      }
    }
  }

  isActive(path: string): any {
    
    // return this.router.url === path;
    
  }

  handleItemClick(path: string): void {
    console.log(path);
    
    const lis = document.querySelectorAll('#navbarSupportedContent ul li');
    lis.forEach(li => li.classList.remove("active"));
    const activeItem = document.querySelector(`#${path}`);
    if (activeItem) {
      const parentLi = activeItem.parentElement;
      if (parentLi) {
        parentLi.classList.add('active');
      }
      this.adjustIndicatorPosition();
    }
  }
}
