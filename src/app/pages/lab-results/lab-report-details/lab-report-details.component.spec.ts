import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LabResultsApiService } from '../../../shared/services/lab-results-api.service';
import { LabReport } from '../../../shared/models/lab-report.model';

@Component({
  selector: 'app-lab-report-details',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './lab-report-details.component.html',
  styleUrl: './lab-report-details.component.css',
})
export class LabReportDetailsComponent implements OnInit {

  report?: LabReport;
  loading = false;
  error?: string;

  constructor(
    private route: ActivatedRoute,
    private api: LabResultsApiService
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = idParam ? Number(idParam) : NaN;

    if (Number.isNaN(id)) {
      this.error = 'Invalid report id';
      return;
    }

    this.load(id);
  }

  private load(id: number): void {
    this.loading = true;
    this.error = undefined;

    this.api.getReportById(id).subscribe({
      next: (res) => {
        this.report = res;
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        this.error = 'Failed to load report details.';
        console.error(err);
      }
    });
  }
}
