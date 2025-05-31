import { Component } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [SharedModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  standalone: true,
})
export class HeaderComponent {

  constructor(private router: Router) { }


  home(){
    this.router.navigate(['/home']);
  }
  logout() {
    // seu código de logout aqui...
    this.router.navigate(['/login']);
  }
}
