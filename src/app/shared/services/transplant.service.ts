import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const GATEWAY = 'http://localhost:8085/transplant-mongo';

export interface KidneyTransplant {
  _id?: string;
  patientId?: number;
  transplantDate?: string;
  donorType?: 'LIVING' | 'DECEASED';
  donorBloodGroup?: string;
  coldIschemiaTime?: number;
  graftStatus?: 'ACTIVE' | 'REJECTED' | 'LOST';
  surgicalReportPath?: string;
}

export interface Biopsy {
  _id?: string;
  biopsyDate?: string;
  indication?: 'PROTOCOL' | 'SUSPECTED_REJECTION';
  banffScoreT?: number;
  banffScoreI?: number;
  banffScoreG?: number;
  banffCategory?: 'NORMAL' | 'BORDERLINE' | 'REJECTION';
  conclusion?: string;
  reportPath?: string;
  transplantId?: string;
}

export interface Complication {
  _id?: string;
  transplantId?: string;
  complicationType?: 'INFECTIOUS' | 'VASCULAR' | 'UROLOGICAL' | 'OTHER';
  subType?: string;
  appearanceDate?: string;
  severity?: 'MILD' | 'MODERATE' | 'SEVERE';
  description?: string;
  treatment?: string;
  status?: 'ACTIVE' | 'RESOLVED';
}

export interface HlaCompatibility {
  _id?: string;
  donorHlaA?: string;
  donorHlaB?: string;
  donorHlaDr?: string;
  recipientHlaA?: string;
  recipientHlaB?: string;
  recipientHlaDr?: string;
  crossMatchResult?: 'POSITIVE' | 'NEGATIVE';
  numberOfMismatches?: number;
  transplantId?: string;
}

export interface Immunosuppressant {
  _id?: string;
  drugName?: 'TACROLIMUS' | 'CYCLOSPORINE' | 'MMF' | 'PREDNISONE';
  currentDose?: number;
  startDate?: string;
  isActive?: boolean;
  targetTroughMin?: number;
  targetTroughMax?: number;
  lastTroughLevel?: number;
  lastMeasurementDate?: string;
  levelStatus?: 'IN_RANGE' | 'BELOW' | 'ABOVE';
  transplantId?: string;
}

export interface RejectionEpisode {
  _id?: string;
  startDate?: string;
  rejectionType?: 'ACUTE' | 'CHRONIC';
  severity?: 'MILD' | 'MODERATE' | 'SEVERE';
  creatinineIncrease?: number;
  gfrAtRejection?: number;
  treatment?: string;
  status?: 'SUSPECTED' | 'CONFIRMED' | 'RESOLVED';
  biopsyId?: string;
  transplantId?: string;
}

export interface SurveillanceProtocol {
  _id?: string;
  currentPhase?: 'IMMEDIATE' | 'EARLY' | 'LONG_TERM';
  nextConsultationDate?: string;
  nextLabTestDate?: string;
  consultationFrequency?: number;
  labTestFrequency?: number;
  completionPercentage?: number;
  transplantId?: string;
}

function crud<T>(http: HttpClient, path: string) {
  const url = `${GATEWAY}${path}`;
  return {
    getAll: (): Observable<T[]> => http.get<T[]>(url),
    getById: (id: string): Observable<T> => http.get<T>(`${url}/${id}`),
    create: (body: T): Observable<T> => http.post<T>(url, body),
    update: (id: string, body: T): Observable<T> => http.put<T>(`${url}/${id}`, body),
    delete: (id: string): Observable<void> => http.delete<void>(`${url}/${id}`),
  };
}

@Injectable({ providedIn: 'root' })
export class TransplantService {
  transplants;
  biopsies;
  complications;
  hla;
  drugs;
  rejections;
  surveillance;

  constructor(private http: HttpClient) {
    this.transplants = crud<KidneyTransplant>(http, '/api/transplants');
    this.biopsies = crud<Biopsy>(http, '/api/biopsies');
    this.complications = crud<Complication>(http, '/api/complications');
    this.hla = crud<HlaCompatibility>(http, '/api/hla');
    this.drugs = crud<Immunosuppressant>(http, '/api/drugs');
    this.rejections = crud<RejectionEpisode>(http, '/api/rejections');
    this.surveillance = crud<SurveillanceProtocol>(http, '/api/surveillance');
  }

  biopsiesByTransplant(transplantId: string): Observable<Biopsy[]> {
    return this.http.get<Biopsy[]>(`${GATEWAY}/api/biopsies/transplant/${transplantId}`);
  }

  rejectionsByTransplant(transplantId: string): Observable<RejectionEpisode[]> {
    return this.http.get<RejectionEpisode[]>(`${GATEWAY}/api/rejections/transplant/${transplantId}`);
  }
}
