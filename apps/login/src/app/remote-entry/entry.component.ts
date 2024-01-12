import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginFormComponent } from '@nx-dynamic-mf/login/login-form';

@Component({
  standalone: true,
  imports: [CommonModule, LoginFormComponent],
  selector: 'nx-dynamic-mf-login-entry',
  template: `<nx-dynamic-mf-login-form/>`,
})
export class RemoteEntryComponent {}
