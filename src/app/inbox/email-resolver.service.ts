import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { Email } from '../shared/interfaces';

@Injectable({
  providedIn: 'root',
})
export class EmailResolverService implements Resolve<Email> {
  constructor() {}

  resolve() {
    return null;
  }
}
