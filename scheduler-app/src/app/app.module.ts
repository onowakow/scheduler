import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PromptsListComponent } from './prompts-list/prompts-list.component';
import { PromptEditorComponent } from './prompt-editor/prompt-editor.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent, PromptsListComponent, PromptEditorComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
