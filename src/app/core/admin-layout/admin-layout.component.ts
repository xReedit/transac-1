import { Component, OnInit, ViewChild, HostListener, ElementRef } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css']
})
export class AdminLayoutComponent implements OnInit {

  showFiller = false;
  isScreenAll = true; // si screen > 990
  mode: string = "side"
  
  @ViewChild('drawer') drawer:MatDrawer;

  @ViewChild('container') container: HTMLElement;

  constructor() { }

  ngOnInit() {
    this.drawer.toggle();
    if (window.innerWidth< 990) {
      this.meSizeScreen();
    } else {
      this.maSizeScreen();
    }
  }

  showDrawer(): void {    
    this.mode = this.isScreenAll ? "side" : "over";          
    this.drawer.toggle();
  }

  private meSizeScreen(): void{
    this.isScreenAll = false;
    this.mode = "over";
    this.drawer.close();
  }

  private maSizeScreen(): void{
    this.isScreenAll = true;
    this.mode = "side";
    this.drawer.open();
  }

  @HostListener('window:resize', ['$event'])
    onResize(event) {
        if (event.target.innerWidth < 990) {
          this.meSizeScreen();
        } else {
          this.maSizeScreen();
        }
    }

}
