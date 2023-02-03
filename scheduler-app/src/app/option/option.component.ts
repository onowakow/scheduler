import { Component, Input } from '@angular/core';
import { Option } from './option.model';

@Component({
  selector: 'app-option',
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.css'],
})
export class OptionComponent {
  @Input() option: Option;
}
