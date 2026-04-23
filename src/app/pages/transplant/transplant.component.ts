import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PageBreadcrumbComponent } from '../../shared/components/common/page-breadcrumb/page-breadcrumb.component';
import { ComponentCardComponent } from '../../shared/components/common/component-card/component-card.component';
import { TransplantService } from '../../shared/services/transplant.service';

type FieldType = 'text' | 'number' | 'date' | 'boolean' | 'select';
interface FieldDef {
  key: string;
  label: string;
  type: FieldType;
  options?: string[];
}

interface ResourceDef {
  key: string;
  label: string;
  repo: any;
  fields: FieldDef[];
}

@Component({
  selector: 'app-transplant',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    PageBreadcrumbComponent,
    ComponentCardComponent,
  ],
  templateUrl: './transplant.component.html',
})
export class TransplantComponent implements OnInit {
  activeTab = 'transplants';
  rows: Record<string, any[]> = {};
  form: any = {};
  editingId: string | null = null;
  error: string | null = null;

  resources: ResourceDef[] = [];

  constructor(private ts: TransplantService) {}

  ngOnInit(): void {
    this.resources = [
      {
        key: 'transplants',
        label: 'Kidney Transplants',
        repo: this.ts.transplants,
        fields: [
          { key: 'patientId', label: 'Patient ID', type: 'number' },
          { key: 'transplantDate', label: 'Transplant Date', type: 'date' },
          { key: 'donorType', label: 'Donor Type', type: 'select', options: ['LIVING', 'DECEASED'] },
          { key: 'donorBloodGroup', label: 'Donor Blood Group', type: 'text' },
          { key: 'coldIschemiaTime', label: 'Cold Ischemia Time (h)', type: 'number' },
          { key: 'graftStatus', label: 'Graft Status', type: 'select', options: ['ACTIVE', 'REJECTED', 'LOST'] },
          { key: 'surgicalReportPath', label: 'Surgical Report Path', type: 'text' },
        ],
      },
      {
        key: 'hla',
        label: 'HLA Compatibility',
        repo: this.ts.hla,
        fields: [
          { key: 'transplantId', label: 'Transplant ID', type: 'text' },
          { key: 'donorHlaA', label: 'Donor HLA-A', type: 'text' },
          { key: 'donorHlaB', label: 'Donor HLA-B', type: 'text' },
          { key: 'donorHlaDr', label: 'Donor HLA-DR', type: 'text' },
          { key: 'recipientHlaA', label: 'Recipient HLA-A', type: 'text' },
          { key: 'recipientHlaB', label: 'Recipient HLA-B', type: 'text' },
          { key: 'recipientHlaDr', label: 'Recipient HLA-DR', type: 'text' },
          { key: 'crossMatchResult', label: 'Cross-Match', type: 'select', options: ['POSITIVE', 'NEGATIVE'] },
          { key: 'numberOfMismatches', label: 'Mismatches', type: 'number' },
        ],
      },
      {
        key: 'biopsies',
        label: 'Biopsies',
        repo: this.ts.biopsies,
        fields: [
          { key: 'transplantId', label: 'Transplant ID', type: 'text' },
          { key: 'biopsyDate', label: 'Biopsy Date', type: 'date' },
          { key: 'indication', label: 'Indication', type: 'select', options: ['PROTOCOL', 'SUSPECTED_REJECTION'] },
          { key: 'banffScoreT', label: 'Banff T', type: 'number' },
          { key: 'banffScoreI', label: 'Banff I', type: 'number' },
          { key: 'banffScoreG', label: 'Banff G', type: 'number' },
          { key: 'banffCategory', label: 'Banff Category', type: 'select', options: ['NORMAL', 'BORDERLINE', 'REJECTION'] },
          { key: 'conclusion', label: 'Conclusion', type: 'text' },
          { key: 'reportPath', label: 'Report Path', type: 'text' },
        ],
      },
      {
        key: 'rejections',
        label: 'Rejection Episodes',
        repo: this.ts.rejections,
        fields: [
          { key: 'transplantId', label: 'Transplant ID', type: 'text' },
          { key: 'startDate', label: 'Start Date', type: 'date' },
          { key: 'rejectionType', label: 'Type', type: 'select', options: ['ACUTE', 'CHRONIC'] },
          { key: 'severity', label: 'Severity', type: 'select', options: ['MILD', 'MODERATE', 'SEVERE'] },
          { key: 'creatinineIncrease', label: 'Creatinine Increase', type: 'number' },
          { key: 'gfrAtRejection', label: 'GFR at Rejection', type: 'number' },
          { key: 'treatment', label: 'Treatment', type: 'text' },
          { key: 'status', label: 'Status', type: 'select', options: ['SUSPECTED', 'CONFIRMED', 'RESOLVED'] },
          { key: 'biopsyId', label: 'Biopsy ID', type: 'text' },
        ],
      },
      {
        key: 'drugs',
        label: 'Immunosuppressants',
        repo: this.ts.drugs,
        fields: [
          { key: 'transplantId', label: 'Transplant ID', type: 'text' },
          { key: 'drugName', label: 'Drug', type: 'select', options: ['TACROLIMUS', 'CYCLOSPORINE', 'MMF', 'PREDNISONE'] },
          { key: 'currentDose', label: 'Current Dose', type: 'number' },
          { key: 'startDate', label: 'Start Date', type: 'date' },
          { key: 'isActive', label: 'Active', type: 'boolean' },
          { key: 'targetTroughMin', label: 'Trough Min', type: 'number' },
          { key: 'targetTroughMax', label: 'Trough Max', type: 'number' },
          { key: 'lastTroughLevel', label: 'Last Trough', type: 'number' },
          { key: 'lastMeasurementDate', label: 'Last Measure Date', type: 'date' },
          { key: 'levelStatus', label: 'Level Status', type: 'select', options: ['IN_RANGE', 'BELOW', 'ABOVE'] },
        ],
      },
      {
        key: 'complications',
        label: 'Complications',
        repo: this.ts.complications,
        fields: [
          { key: 'transplantId', label: 'Transplant ID', type: 'text' },
          { key: 'complicationType', label: 'Type', type: 'select', options: ['INFECTIOUS', 'VASCULAR', 'UROLOGICAL', 'OTHER'] },
          { key: 'subType', label: 'Sub-Type', type: 'text' },
          { key: 'appearanceDate', label: 'Appearance Date', type: 'date' },
          { key: 'severity', label: 'Severity', type: 'select', options: ['MILD', 'MODERATE', 'SEVERE'] },
          { key: 'description', label: 'Description', type: 'text' },
          { key: 'treatment', label: 'Treatment', type: 'text' },
          { key: 'status', label: 'Status', type: 'select', options: ['ACTIVE', 'RESOLVED'] },
        ],
      },
      {
        key: 'surveillance',
        label: 'Surveillance Protocols',
        repo: this.ts.surveillance,
        fields: [
          { key: 'transplantId', label: 'Transplant ID', type: 'text' },
          { key: 'currentPhase', label: 'Phase', type: 'select', options: ['IMMEDIATE', 'EARLY', 'LONG_TERM'] },
          { key: 'nextConsultationDate', label: 'Next Consultation', type: 'date' },
          { key: 'nextLabTestDate', label: 'Next Lab Test', type: 'date' },
          { key: 'consultationFrequency', label: 'Consult Freq', type: 'number' },
          { key: 'labTestFrequency', label: 'Lab Freq', type: 'number' },
          { key: 'completionPercentage', label: 'Completion %', type: 'number' },
        ],
      },
    ];

    for (const r of this.resources) this.loadResource(r.key);
    this.resetForm();
  }

  get activeResource(): ResourceDef {
    return this.resources.find(r => r.key === this.activeTab)!;
  }

  switchTab(key: string) {
    this.activeTab = key;
    this.resetForm();
    this.error = null;
  }

  loadResource(key: string) {
    const res = this.resources.find(r => r.key === key);
    if (!res) return;
    res.repo.getAll().subscribe({
      next: (data: any[]) => (this.rows[key] = data || []),
      error: (err: any) => (this.error = `Load failed: ${err.message || err}`),
    });
  }

  resetForm() {
    this.editingId = null;
    this.form = {};
  }

  edit(row: any) {
    this.editingId = row._id;
    this.form = { ...row };
    delete this.form._id;
    delete this.form.__v;
    delete this.form.createdAt;
    delete this.form.updatedAt;
  }

  save() {
    const repo = this.activeResource.repo;
    const obs = this.editingId ? repo.update(this.editingId, this.form) : repo.create(this.form);
    obs.subscribe({
      next: () => {
        this.loadResource(this.activeTab);
        this.resetForm();
      },
      error: (err: any) => (this.error = `Save failed: ${err.message || err}`),
    });
  }

  remove(row: any) {
    if (!confirm('Delete this record?')) return;
    this.activeResource.repo.delete(row._id).subscribe({
      next: () => this.loadResource(this.activeTab),
      error: (err: any) => (this.error = `Delete failed: ${err.message || err}`),
    });
  }

  columnKeys(res: ResourceDef): string[] {
    return res.fields.map(f => f.key);
  }

  displayValue(row: any, field: FieldDef): any {
    const v = row[field.key];
    if (v === null || v === undefined) return '';
    if (field.type === 'boolean') return v ? 'Yes' : 'No';
    return v;
  }
}
