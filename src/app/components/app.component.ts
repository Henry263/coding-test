import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {

    constructor(private router: Router) {}

    ngAfterViewInit(): void {

    }

    ngOnInit(): void {
    }

    hometab() {
      this.router.navigate(['/home']);
    }
    addusertab() {
      this.router.navigate(['/adduser']);
    }
    showdatatab() {
      this.router.navigate(['/showdata']);
    }

}
