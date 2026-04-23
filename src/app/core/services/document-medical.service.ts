import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface DocumentMedical {
  id?: number;
  nomFichier: string;
  type: string;
  dateUpload: string;
  categorie?: string;
  patientId: number;
  contenuOcr?: string;
  niveauConfiance?: string;
  scoreConfiance?: number;
}

export interface CompletudeDossier {
  complet: boolean;
  pourcentage: number;
  score: string;
  presents: string[];
  manquants: string[];
  typesRequis: string[];
  totalDocuments: number;
}

export interface ClassificationResult {
  type: string;
  score: number;
  confiance: 'HAUTE' | 'MOYENNE' | 'FAIBLE';
}

@Injectable({ providedIn: 'root' })
export class DocumentMedicalService {
  private apiUrl = '/api/documents-medicaux';

  constructor(private http: HttpClient) {}

  getAll(): Observable<DocumentMedical[]> {
    return this.http.get<DocumentMedical[]>(this.apiUrl);
  }

  getById(id: number): Observable<DocumentMedical> {
    return this.http.get<DocumentMedical>(`${this.apiUrl}/${id}`);
  }

  create(data: DocumentMedical): Observable<DocumentMedical> {
    return this.http.post<DocumentMedical>(this.apiUrl, data);
  }

  update(id: number, data: DocumentMedical): Observable<DocumentMedical> {
    return this.http.put<DocumentMedical>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  filter(patientId: number, type: string, date: string, page: number, size: number): Observable<{ content: DocumentMedical[]; totalPages: number }> {
    let params = new HttpParams().set('page', page).set('size', size);
    if (patientId > 0) params = params.set('patientId', patientId);
    if (type) params = params.set('type', type);
    if (date) params = params.set('date', date);
    return this.http.get<{ content: DocumentMedical[]; totalPages: number }>(`${this.apiUrl}/filter`, { params });
  }

  verifierCompletude(patientId: number): Observable<CompletudeDossier> {
    return this.http.get<CompletudeDossier>(`${this.apiUrl}/patient/${patientId}/completude`);
  }

  classifier(texte: string): Observable<ClassificationResult> {
    return this.http.post<ClassificationResult>(`${this.apiUrl}/classifier`, { texte });
  }

  saveOcr(id: number, texte: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}/ocr`, { contenuOcr: texte });
  }

  searchOCR(query: string): Observable<DocumentMedical[]> {
    return this.http.get<DocumentMedical[]>(`${this.apiUrl}/search`, {
      params: new HttpParams().set('q', query)
    });
  }

  exporterPdf(patientId: number): void {
    window.open(`${this.apiUrl}/patient/${patientId}/export-pdf`, '_blank');
  }

  getRisk(patientId: number): Observable<Array<{ risk: string }>> {
    return this.http.get<Array<{ risk: string }>>(`${this.apiUrl}/patient/${patientId}/risk`);
  }
}
