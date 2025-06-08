import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirstCharPipe } from './first-char.pipe';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    FirstCharPipe,
  ],
  exports: [
    FirstCharPipe,
  ]
})
export class PipeModule { }
