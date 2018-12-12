import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CrudHttpService } from 'src/app/shared/crud-http.service';
import { ManagerErrorService } from 'src/app/shared/services/manager-error.service';
import swal from 'sweetalert2';
import { MSJ_LOADING } from 'src/app/shared/config/config.const';
import { MSJ_SUCCESS } from '../../../shared/config/config.const';
import { ActivatedRoute } from '@angular/router';
import { ClienteModel } from 'src/app/models/cliente.model';
import { UtilesService } from '../../../shared/services/utiles.service';

@Component({
  selector: 'app-cliente-edit',
  templateUrl: './cliente-edit.component.html',
  styleUrls: ['./cliente-edit.component.css']
})
export class ClienteEditComponent implements OnInit {

  id = 0;
  form: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private crudService: CrudHttpService,
    private managerErrorService: ManagerErrorService,
    private activateRoute: ActivatedRoute,
    private utileService: UtilesService
  ) {
    this.activateRoute.params.subscribe(
      params => this.id = params['id']);
   }

  ngOnInit() {
    this.prepararFormulario();

    if (this.id) {
      this.editar();
    }
  }

  prepararFormulario() {
    this.form = this.formBuilder.group({
      nombres: ['', Validators.required],
      dni: ['', Validators.required],
      direccion: '',
      telefono: '',
      fechanac: '',
      linea_credito: ['0', [Validators.pattern('[0-9]+(\.[0-9][0-9]?)?')]],
      linea_credito_utilizada: ['0' ,  [Validators.pattern('[0-9]+(\.[0-9][0-9]?)?')]],
      idorg: '?',
      idsede:  '?',
    });
  }

  save(): void {
    swal(MSJ_LOADING);
    const data = JSON.stringify(this.form.value);

    if (this.id) {
      this.updateCliente(data);
    } else { this.guardarCliente(data); }
  }


  private guardarCliente(data: any): void {
    this.crudService.create(data, 'model/cliente', 'create').subscribe( res => {
      console.log(res);
      if (!res.success) { this.managerErrorService.ResError(res); return; }

      this.nuevo();
      swal(MSJ_SUCCESS);
    });
  }

  private updateCliente(data: any): void {
    this.crudService.update(data, this.id, 'api/cliente', 'update').subscribe(
      res => {
        if (!res.success) { this.managerErrorService.ResError(res); return; }
        swal(MSJ_SUCCESS);
      });
  }

  private nuevo(): void {
    this.form.reset();
  }

  private editar(): void {
    this.crudService.getById(this.id, 'model/cliente', 'getById')
    .subscribe((res: any) => {
      console.log(res);
      const data = <ClienteModel>res.data[0];
      this.form = this.utileService.setearFormulario(this.form, data);
    });
  }

}
