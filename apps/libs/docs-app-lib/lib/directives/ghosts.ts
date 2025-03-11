import { Directive, Input } from '@angular/core';
import { ExampleViewComponent } from '../components/exapmle-view/example-view.component';

@Directive({
  selector: '[pbl-example-view]',
  standalone: false,
})
export class ExampleViewGhostDirective  {
  @Input('pbl-example-view') componentName: string;
  @Input() containerClass: string;
  @Input('inputs') inputParams: any;
  @Input() exampleStyle: ExampleViewComponent['exampleStyle'];

  constructor() {
    throw new Error('This is a ghost and should not hit.')
  }
}

@Directive({
  selector: '[pbl-app-content-chunk]',
  standalone: false,
})
export class ContentChunkViewGhostDirective  {
  @Input('pbl-app-content-chunk') componentName: string;
  @Input() containerClass: string;
  @Input('inputs') inputParams: any;

  constructor() {
    throw new Error('This is a ghost and should not hit.')
  }
}
