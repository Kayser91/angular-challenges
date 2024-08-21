import { Component } from '@angular/core';
import { PlaceholderComponent } from './placeholder.component';
import { TopComponent } from './top.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TopComponent, PlaceholderComponent],
  template: `
    <div class="h-screen bg-gray-500">
      @defer (on interaction(topLoading)) {
        <app-top />
      } @placeholder {
        <app-placeholder />
        <button
          class="rounded-sm border border-blue-500 bg-blue-300 p-2"
          #topLoading>
          Load Top
        </button>
      }
    </div>
  `,
})
export class AppComponent {}
