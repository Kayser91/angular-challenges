import { Component } from '@angular/core';
import { ComputePipe } from './compute.pipe';

@Component({
  standalone: true,
  imports: [ComputePipe],
  selector: 'app-root',
  template: `
    @for (person of persons; track $index) {
      <div>
        {{ person | compute: $index }}
      </div>
    }
  `,
})
export class AppComponent {
  persons: string[] = ['toto', 'jack', 'michael', 'james'];
}
