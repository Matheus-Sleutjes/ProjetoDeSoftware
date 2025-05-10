import { Component } from '@angular/core';
import { HeaderComponent } from "../../components_utils/header/header.component";
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'app-home',
  imports: [HeaderComponent, SharedModule, HeaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  standalone: true,
})
export class HomeComponent {

}
