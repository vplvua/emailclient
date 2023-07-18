import { Component, Input, OnChanges, OnInit } from '@angular/core';

import { Email } from 'src/app/shared/interfaces';
import { EmailService } from '../email.service';

@Component({
  selector: 'app-email-reply',
  templateUrl: './email-reply.component.html',
  styleUrls: ['./email-reply.component.css'],
})
export class EmailReplyComponent implements OnChanges {
  showModal = false;
  @Input() email!: Email;

  constructor(private emailService: EmailService) {}

  ngOnChanges(): void {
    this.email = {
      ...this.email,
      from: this.email.to,
      to: this.email.from,
      subject: `RE: ${this.email.subject}`,
      text: `\n\n\n-------- ${
        this.email.from
      } wrote:\n\n>${this.email.text.replace(/\n/gi, '\n> ')}`,
    };
  }

  onSubmit(email: any): void {
    this.emailService.sendEmail(email).subscribe(() => {
      this.showModal = false;
    });
  }
}
