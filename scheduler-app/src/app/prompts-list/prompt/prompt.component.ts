import { Component, Input } from '@angular/core';
import { Prompt } from '../prompt.model';
@Component({
  selector: 'app-prompt',
  templateUrl: './prompt.component.html',
  styleUrls: ['./prompt.component.css'],
})
export class PromptComponent {
  @Input() prompt: Prompt;
}
