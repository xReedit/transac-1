import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CrudHttpService } from 'src/app/shared/crud-http.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { InfoTockenService } from '../../shared/services/info-tocken.service';
import { UsuarioStorageService } from '../../shared/services/usuario-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  msj = '';
  error = false;

  constructor(
    private router: Router,
    private curdService: CrudHttpService,
    private infoTockenService: InfoTockenService,
    private usuarioStorageService: UsuarioStorageService,
    private formBuilder: FormBuilder,
    ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
        usuario: ['', Validators.required],
        password: ['', Validators.required],
      });
  }

  logear(): void {
    const data = JSON.stringify(this.form.value);
    this.error = false;

    this.curdService.login(data).subscribe(res => {
      if ( !res.success ) {
        this.error = true;
        this.msj = res.error;
        return;
      }

      this.infoTockenService.saveToken(res.token);
      this.usuarioStorageService.saveUsuario(res.usuario);

      localStorage.setItem('currentUserName', res.usuario.usuario);
      this.router.navigate(['/']);
    });
  }

}
