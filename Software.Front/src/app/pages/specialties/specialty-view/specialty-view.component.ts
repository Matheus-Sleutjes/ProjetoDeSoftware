import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { CommonModule } from '@angular/common';
import { SpecialtyService } from '../../../services/specialty.service';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'app-specialty-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './specialty-view.component.html',
  styleUrl: './specialty-view.component.scss',
})
export class SpecialtyViewComponent implements OnInit {

  specialty: any = {};
  specialtyId!: number;
  loading = false;

  constructor(
    private specialtyService: SpecialtyService,
    private router: Router,
    private route: ActivatedRoute,
    private toastService: ToastService,
    private location: Location,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.specialtyId = +params['id'];
      if (this.specialtyId) {
        this.loadSpecialty();
      } else {
        this.toastService.show(
          'ID da especialidade não fornecido.',
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

  loadSpecialty(): void {
    this.loading = true;
    this.specialtyService.getSpecialtyById(this.specialtyId).then(
      (specialty: any) => {
        this.specialty = specialty;
        this.loading = false;
      },
      (error: any) => {
        this.toastService.show(
          error.error?.message || 'Erro ao carregar dados da especialidade.',
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

