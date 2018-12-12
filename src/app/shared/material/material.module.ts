import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


// directivas
import { KeyClickDirective } from '../directivas/key-click.directive';
import { KeyTabDirective } from '../directivas/key-tab.directive';
import { UpperCaseDirective } from '../directivas/upper-case.directive';
import { ResetcontrolDirective } from '../directivas/reset-control.directive';

// material
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';




@NgModule({
  imports: [
    CommonModule,
    MatInputModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatProgressBarModule,
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatCheckboxModule,
    MatSlideToggleModule
  ],
  exports: [
    CommonModule,
    MatInputModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatProgressBarModule,
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatCheckboxModule,
    MatSlideToggleModule,


    KeyClickDirective,
    KeyTabDirective,
    ResetcontrolDirective,
    UpperCaseDirective
  ],
  declarations: [
    KeyClickDirective,
    KeyTabDirective,
    ResetcontrolDirective,
    UpperCaseDirective
  ]
})
export class MaterialModule { }
