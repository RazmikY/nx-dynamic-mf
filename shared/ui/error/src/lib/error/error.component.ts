import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
    selector: 'nx-dynamic-mf-error',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    styles: `
        .error {
            color: red
        }
    `,
    template: ` <div class="error">{{ errorMessage }}</div> `,
})
export class ErrorComponent {
    @Input({ required: true }) errorMessage!: string;
}
