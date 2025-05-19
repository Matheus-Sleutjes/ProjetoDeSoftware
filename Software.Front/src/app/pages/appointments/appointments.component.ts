import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../../components_utils/header/header.component";
import { SharedModule } from '../../shared/shared.module';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-appointments',
  imports: [HeaderComponent, SharedModule],
  templateUrl: './appointments.component.html',
  styleUrl: './appointments.component.scss',
  standalone: true,
})
export class AppointmentsComponent {
  options: any[] = [];

  constructor(private route: ActivatedRoute) {
    this.initParams();
  }


  initParams() {
    this.route.queryParams.subscribe(params => {
      if (params['options']) {
        try {
          this.options = JSON.parse(params['options']);
          console.log(this.options);
        } catch {
          console.error('Não foi possível parsear options');
        }
      }
    });
  }

}
