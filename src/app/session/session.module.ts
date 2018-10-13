import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SessionRoutes } from './session.routing';

import { MatButtonModule, MatCardModule, MatInputModule, MatCheckboxModule, MatGridListModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from './login/login.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(SessionRoutes),
    MatCardModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    MatGridListModule,
    FormsModule,
    ReactiveFormsModule
    
  ],
  declarations: [
    LoginComponent
  ]
})

export class SessionModule { }
