import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon'
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-login-page',
  imports: [
    MatIconModule,
    RouterLink
],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {
  
}
