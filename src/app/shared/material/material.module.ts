import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';

//directivas
import { KeyClickDirective } from '../directivas/key-click.directive';
import { KeyTabDirective } from '../directivas/key-tab.directive';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatProgressBarModule } from '@angular/material/progress-bar';




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
    MatIconModule
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
    
    KeyClickDirective,
    KeyTabDirective 
  ],
  declarations: [
    KeyClickDirective,
    KeyTabDirective    
  ]
})
export class MaterialModule { }
