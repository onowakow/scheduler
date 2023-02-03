import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Prompt } from './prompt.model';
import { PromptsService } from './prompts.service';

@Component({
  selector: 'app-prompts-list',
  templateUrl: './prompts-list.component.html',
  styleUrls: ['./prompts-list.component.css'],
})
export class PromptsListComponent {
  prompts$ = this.service.prompts$;

  constructor(private service: PromptsService) {}
}
