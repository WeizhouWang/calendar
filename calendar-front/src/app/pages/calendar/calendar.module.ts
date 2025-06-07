import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from './calendar.component';
import { CalendarRoutingModule } from './calendar-routing.module';
import { MaterialModule } from 'src/app/_core/material/material.module';
import { PipeModule } from 'src/app/_pipes/pipe.module';

@NgModule({
  declarations: [
    CalendarComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    PipeModule,
    CalendarRoutingModule
  ]
})
export class CalendarModule { }
