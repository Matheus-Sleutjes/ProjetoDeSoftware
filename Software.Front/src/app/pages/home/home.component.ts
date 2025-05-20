import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';

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

  constructor(private router: Router) { }

  logout() {
    // seu código de logout aqui...
    this.router.navigate(['/login']);
    localStorage.clear();
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

}
