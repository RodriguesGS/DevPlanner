import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-app-shell',
  imports: [
    MatIconModule,
    RouterLink,
    RouterOutlet
],
  templateUrl: './app-shell.component.html',
  styleUrl: './app-shell.component.scss'
})
export class AppShellComponent {

}
