import { Component } from '@angular/core';

@Component({
  selector: 'app-prompt-editor',
  templateUrl: './prompt-editor.component.html',
  styleUrls: ['./prompt-editor.component.css'],
})
export class PromptEditorComponent {
  prompt: Prompt = {
    subject: '',
    duration: 30,
    slots: [
      ['2023-01-29T16:00:00.000Z', '2023-01-29T17:00:00.000Z'],
      ['2023-01-29T16:15:00.000Z', '2023-01-29T17:15:00.000Z'],
    ],
  };
}

export class Prompt {
  constructor(
    public subject: string,
    public slots: string[][],
    public duration: number
  ) {}
}
