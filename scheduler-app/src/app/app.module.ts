import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PromptsListComponent } from './prompts-list/prompts-list.component';
import { PromptEditorComponent } from './prompt-editor/prompt-editor.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { PromptComponent } from './prompts-list/prompt/prompt.component';
import { OptionComponent } from './option/option.component';

@NgModule({
  declarations: [
    AppComponent,
    PromptsListComponent,
    PromptEditorComponent,
    LoginComponent,
    PromptComponent,
    OptionComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
