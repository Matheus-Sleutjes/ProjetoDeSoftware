import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';
import { MenuItens } from './menu-item';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Software';
  public menus: any[] = MenuItens

  constructor(
    private router: Router,
    // private util: UtilsService,
    private authService: AuthenticationService
  ) {
    // Agora você pode usar name e acr conforme necessário
  }

  isLogedin(){
    return this.authService.isLoggedIn();
  }

  logout() {
    this.authService.logout();
  }
}
