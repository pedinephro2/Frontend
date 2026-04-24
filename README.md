# Frontend — Nephro Platform Web Dashboard

Angular 21 single-page application for the Nephro Platform. Provides a clinical dashboard for managing patients, monitoring vital signs, viewing lab results, tracking transplants, and analyzing medical images.

Built on top of the [TailAdmin Angular](https://tailadmin.com/) template.

## Tech Stack

- Angular 21, TypeScript 5.9
- Tailwind CSS 4.1
- AmCharts 5 (advanced charts and maps)
- ApexCharts (analytics charts)
- FullCalendar 6 (scheduling and calendar views)
- Tesseract.js (OCR for medical documents)
- Swiper (image carousel)
- ng-recaptcha (form security)
- nginx (production serving)

## Port

`4200` (nginx in Docker) / `4200` (ng serve dev)

## API Proxy

In production (Docker), nginx forwards all API calls to the gateway at `http://gateway:8085`:

| Frontend path | Gateway route |
|---|---|
| `/api/*` | microservice1, microservice2, microservice4 |
| `/vital-signs/*` | vital-signs-service |
| `/transplant-mongo/*` | transplant-service |
| `/lab-results/*` | lab-results-service |
| `/medical-media/*` | medical-media-service |
| `/ml-rejet/*` | ml-rejet |

## Key Features

- **Authentication** — login, registration, and role-based route guards (PATIENT, DOCTOR, ADMIN, NURSE)
- **Patient management** — patient list, profiles, and medical history
- **Vital signs dashboard** — real-time charts for blood pressure, heart rate, temperature, SpO2
- **Lab results** — result tables, trend charts, and calendar view
- **Transplant tracker** — biopsy records, HLA data, rejection history, drug protocols
- **Medical imaging** — upload, view, and compare medical images with AI analysis
- **Rejection risk** — ML prediction form with SHAP factor display
- **Report scheduling** — configure and schedule automated PDF report delivery
- **Growth charts** — pediatric weight/height charts with WHO percentile references

## Running Locally

```bash
npm install
ng serve
```

Opens at `http://localhost:4200`. Requires backend services running (or configure a dev proxy).

## Build for Production

```bash
ng build --configuration production
```

Output goes to `dist/`. The Docker image copies this into nginx.

## Docker

```bash
docker build -t azizos07/frontend:latest .
docker run -p 4200:80 azizos07/frontend:latest
```

## Environment

`src/environments/environment.ts`:

```typescript
export const environment = {
  production: false,
  apiUrl: '/vital-signs',
  transplantApiUrl: '/transplant-mongo'
};
```
