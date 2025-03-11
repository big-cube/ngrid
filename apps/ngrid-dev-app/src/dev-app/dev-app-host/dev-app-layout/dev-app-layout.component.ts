import { Component, ViewEncapsulation } from '@angular/core';
import { ROUTES } from '../../../routes';

@Component({
  selector: 'pbl-dev-app-layout',
  templateUrl: './dev-app-layout.component.html',
  styleUrls: ['./dev-app-layout.component.scss'],
  standalone: false,
  encapsulation: ViewEncapsulation.None,
})
export class DevAppLayoutComponent {
  navItems = ROUTES
}
