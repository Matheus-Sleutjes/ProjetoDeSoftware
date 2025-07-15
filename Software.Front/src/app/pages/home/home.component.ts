import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { UtilsService } from '../../services/utils.service';

declare const google: any; // Declara a variável global google para o TypeScript

interface Option {
  icon: string;
  label: string;
}

interface Clinic {
  name: string;
  lat: number; // Latitude
  lng: number; // Longitude
  zoom: number; // Nível de zoom
}

// Declaração de tipo para a janela global
declare global {
  interface Window {
    initMapCallback: () => void;
  }
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [SharedModule],
  standalone: true
})
export class HomeComponent implements OnInit, AfterViewInit {
  options: Option[] = [
    { icon: 'favorite_outline', label: 'Cardiologista' },
    { icon: 'vaccines', label: 'Vacinas' },
    { icon: 'hearing', label: 'Otorrino' },
    { icon: 'add_to_queue', label: 'Dentista' },
  ];

  clinics: Clinic[] = [
    // Coordenadas aproximadas para Cuiabá e São Paulo
    { name: 'Cuiabá – MT', lat: -15.6014, lng: -56.0979, zoom: 14 }, // Zoom maior para Cuiabá
    { name: 'São Paulo – SP', lat: -23.5505, lng: -46.6333, zoom: 14 } // Zoom maior para São Paulo
  ];

  name = '';
  acr = '';
  isAdmin = false;
  private map: any; // Variável para armazenar a instância do mapa

  constructor(
    private router: Router,
    private util: UtilsService
  ) {}

  ngOnInit() {
    const decoded = this.util.decodeJwt();
    const name = decoded && decoded.name ? decoded.name : '';
    const acr = decoded && decoded.acr ? decoded.acr : '';
    this.name = name;
    this.acr = acr.toLowerCase();
    this.isAdmin = acr ? acr.toLowerCase() === 'admin' : false;
  }

  ngAfterViewInit() {
    // Definir o callback global antes de tudo, caso a API já esteja carregada
    window.initMapCallback = () => this.initMap();

    // Se a API já estiver carregada (ex: recarregando a página), inicialize imediatamente
    if (typeof google !== 'undefined' && google.maps) {
      this.initMap();
    }
    // Caso contrário, o callback do script tag fará a inicialização
  }

  initMap() {
    const mapOptions = {
      center: { lat: this.clinics[0].lat, lng: this.clinics[0].lng }, // Centro inicial (Cuiabá)
      zoom: this.clinics[0].zoom,
      disableDefaultUI: true // Remove controles padrões
    };
    this.map = new google.maps.Map(document.getElementById('main-google-map'), mapOptions);

    // Opcional: Adicionar marcadores iniciais
    this.clinics.forEach(clinic => {
        new google.maps.Marker({
            position: { lat: clinic.lat, lng: clinic.lng },
            map: this.map,
            title: clinic.name
        });
    });
  }

  centerMap(clinic: Clinic) {
    if (this.map) {
      this.map.setCenter({ lat: clinic.lat, lng: clinic.lng });
      this.map.setZoom(clinic.zoom);

      // Opcional: Você pode querer adicionar um marcador dinâmico ou animar a visão aqui
      // Por exemplo, limpar marcadores antigos e adicionar um novo
    }
  }

  logout() {
    this.router.navigate(['/login']);
    localStorage.clear();
  }

  navigateToAppointments(pageOpt: Option) {
    console.log(pageOpt);
    this.router.navigate(
      ['/appointments'],
      {
        queryParams: {
          options: JSON.stringify(pageOpt)
        }
      });
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