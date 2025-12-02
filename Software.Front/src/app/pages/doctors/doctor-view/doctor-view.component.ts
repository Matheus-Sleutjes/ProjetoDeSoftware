import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { CommonModule } from '@angular/common';
import { DoctorService } from '../../../services/doctor.service';
import { AuthenticationService } from '../../../services/authentication.service';
import { SpecialtyService } from '../../../services/specialty.service';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'app-doctor-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './doctor-view.component.html',
  styleUrl: './doctor-view.component.scss',
})
export class DoctorViewComponent implements OnInit {

  doctor: any = {};
  user: any = {};
  specialty: any = {};
  doctorId!: number;
  loading = false;

  constructor(
    private doctorService: DoctorService,
    private authService: AuthenticationService,
    private specialtyService: SpecialtyService,
    private router: Router,
    private route: ActivatedRoute,
    private toastService: ToastService,
    private location: Location,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.doctorId = +params['id'];
      if (this.doctorId) {
        this.loadDoctor();
      } else {
        this.toastService.show(
          'ID do médico não fornecido.',
          '#dc3545',
          '#ffffff',
          4000
        );
        this.goBack();
      }
    });
  }

  goBack(): void {
    this.location.back();
  }

  loadDoctor(): void {
    this.loading = true;
    this.doctorService.getDoctorById(this.doctorId).then(
      (doctor: any) => {
        this.doctor = doctor;
        // Como o DoctorDto agora retorna todos os dados do usuário,
        // não precisa buscar separadamente
        this.user = {
          name: doctor.name?.split(' ')[0] || '',
          lastName: doctor.name?.split(' ').slice(1).join(' ') || '',
          username: doctor.username || '',
          email: doctor.email || '',
          cpf: doctor.cpf || '',
          phone: doctor.phone || ''
        };
        this.specialty = {
          description: doctor.specialtyName || 'Não informado'
        };
        this.loading = false;
      },
      (error: any) => {
        this.toastService.show(
          error.error?.message || 'Erro ao carregar dados do médico.',
          '#dc3545',
          '#ffffff',
          4000
        );
        this.loading = false;
        this.goBack();
      }
    );
  }
}

