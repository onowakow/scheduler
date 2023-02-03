import { Component, OnDestroy, OnInit } from '@angular/core';
import { PromptsService } from './prompts.service';

@Component({
  selector: 'app-prompts-list',
  templateUrl: './prompts-list.component.html',
  styleUrls: ['./prompts-list.component.css'],
  providers: [PromptsService],
})
export class PromptsListComponent implements OnInit, OnDestroy {
  constructor() {}
  ngOnInit(): void {}

  ngOnDestroy(): void {}
}
