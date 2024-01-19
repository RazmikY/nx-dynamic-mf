import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'nx-dynamic-mf-button',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <button [disabled]="disabled" [type]='type' (click)="onClick()">
            {{ label }}
        </button>
    `,
})
export class ButtonComponent {
    @Input() disabled: boolean = false;
    @Input() label: string = '';
    @Input() type: string = 'button';
    @Output() clicked = new EventEmitter<void>();

    public onClick(): void {
        this.clicked.emit();
    }
}
