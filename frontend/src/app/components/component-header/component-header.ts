import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-component-header',
  standalone: false,
  templateUrl: './component-header.html',
  styleUrl: './component-header.css'
})

 
export class ComponentHeader {
  navLinks = [
    {label: 'home', path: '/home'},
    {label: 'request', path: '/home'},
    {label: 'stocks', path: '/stocks'}
  ]
}
