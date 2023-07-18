import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environment';
import { EmailSummary } from '../shared/interfaces';
import { Email } from '../shared/interfaces';

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  constructor(private http: HttpClient) {}

  getEmails() {
    return this.http.get<EmailSummary[]>(`${environment.rootUrl}/emails`);
  }

  getEmail(id: string) {
    return this.http.get<Email>(`${environment.rootUrl}/emails/${id}`);
  }

  sendEmail(email: Email) {
    return this.http.post(`${environment.rootUrl}/emails`, email);
  }
}
