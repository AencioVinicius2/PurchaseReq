import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-component-header',
  standalone: false,
  templateUrl: './component-header.html',
  styleUrls: ['./component-header.css']
})

 
export class ComponentHeader {
  navLinks = [
    {label: 'home', path: '/home'},
    {label: 'request', path: '/request'},
    {label: 'stocks', path: '/stocks'}
  ]
}
