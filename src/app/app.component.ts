import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  router = inject(Router)

  title = 'front_end_economizaja';

  private tokenKey = 'token';

  salvarToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/login']);
  }

  criptografarString(criptografar: string): string {
    //return CryptoJS.SHA256(criptografar).toString(CryptoJS.enc.Hex);
    return criptografar;
  }
}
