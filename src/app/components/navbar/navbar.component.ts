import { Router } from '@angular/router';
import { Component, inject } from '@angular/core';

import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse';
import { MdbDropdownModule } from 'mdb-angular-ui-kit/dropdown';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MdbCollapseModule, MdbDropdownModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  router = inject(Router);
  app = inject(AppComponent);

  constructor(){
    if (this.app.getToken() == null) {
      this.router.navigate(['/login']);
    }
  }

  logout() {
    this.app.logout();
  }
}
