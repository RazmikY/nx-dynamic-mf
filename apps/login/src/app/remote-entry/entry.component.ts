import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NxWelcomeComponent } from './nx-welcome.component';

@Component({
  standalone: true,
  imports: [CommonModule, NxWelcomeComponent],
  selector: 'nx-dynamic-mf-login-entry',
  template: `<nx-dynamic-mf-nx-welcome></nx-dynamic-mf-nx-welcome>`,
})
export class RemoteEntryComponent {}
