import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'nx-dynamic-mf-data-access-user',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './data-access-user.component.html',
    styleUrl: './data-access-user.component.scss',
})
export class SharedDataAccessUserComponent {}
