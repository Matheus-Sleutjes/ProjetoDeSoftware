import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { UtilsService } from '../../services/utils.service';

interface Option {
  icon: string;
  label: string;
}

interface Clinic {
  name: string;
  mapUrl: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [SharedModule],
  standalone: true
})
export class HomeComponent {
  options: Option[] = [
    { icon: 'favorite_outline', label: 'Cardiologista', },
    { icon: 'vaccines', label: 'Vacinas' },
    { icon: 'favorite_outline', label: 'Cardiologista' },
    { icon: 'favorite_outline', label: 'Cardiologista' },
    { icon: 'favorite_outline', label: 'Cardiologista' },
    { icon: 'favorite_outline', label: 'Cardiologista' },
  ];

  clinics: Clinic[] = [
    { name: 'Cuiabá – MT', mapUrl: 'assets/imgs/mapa-cuiaba.png' },
    { name: 'São Paulo – SP', mapUrl: 'assets/imgs/mapa-sp.png' }
  ];

  name = '';
  acr = '';
  isAdmin = false;
  constructor(
    private router: Router,
    private util: UtilsService
  ) {
    // Agora você pode usar name e acr conforme necessário
  }

  logout() {
    // seu código de logout aqui...
    this.router.navigate(['/login']);
    localStorage.clear();
  }
  ngOnInit() {
    const decoded = this.util.decodeJwt();
    const name = decoded && decoded.name ? decoded.name : '';
    const acr = decoded && decoded.acr ? decoded.acr : '';
    this.name = name;
    this.acr = acr.toLowerCase();

    this.isAdmin = acr ? acr.toLowerCase() === 'admin' : false;
  }

  navigateToAppointments(pageOpt: Option) {
    console.log(pageOpt);
    this.router.navigate(
      ['/appointments'],
      {
        queryParams: {
          options: JSON.stringify(pageOpt)  // como é um array/obj, converte pra string
        }
      })
  }

  navigateToRegisterUser() {
    this.router.navigate(
      ['./new-account'],
      {
        queryParams: {
          name: this.name,
          acr: this.acr
        }
      }
    );
  }

  navigateToListUser() {
    this.router.navigate(
      ['/list-user'],
      {
        queryParams: {
          name: this.name,
          acr: this.acr
        }
      }
    );
  }
}
