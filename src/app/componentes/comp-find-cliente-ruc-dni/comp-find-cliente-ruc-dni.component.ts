import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { CrudHttpService } from '../../shared/crud-http.service';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClienteModel } from '../../models/cliente.model';
import { ConsultaApiDniUcService } from 'src/app/shared/services/consulta-api-dni-uc.service';
import { ManagerErrorService } from '../../shared/services/manager-error.service';

@Component({
  selector: 'app-comp-find-cliente-ruc-dni',
  templateUrl: './comp-find-cliente-ruc-dni.component.html',
  styleUrls: ['./comp-find-cliente-ruc-dni.component.css'],

})
export class CompFindClienteRucDniComponent implements OnInit {

  @Input()
  myControl = new FormControl();

  @Input()
  _formControlName: FormControl;

  @Output()
  getObject: EventEmitter<ClienteModel> = new EventEmitter();

  @ViewChild('txtCodigo') txtCodigo: ElementRef;

  verMasDatos = false; // para ver el nombre direccion celular

  guardadoOk = false;

  public proveedor_cliente: ClienteModel = new ClienteModel();

  public cargando = false;

  public form: FormGroup;

  constructor(
    private crudService: CrudHttpService,
    private consultaApiDniUcService: ConsultaApiDniUcService,
    private formBuilder: FormBuilder,
    private managerErrorService: ManagerErrorService) { }

  ngOnInit() {
    this.prepararFormulario();

    if (this._formControlName === undefined) {
      this._formControlName = this.myControl;
    }
  }


  // formulario para guardar datos de cliente nuevo
  prepararFormulario(): void {
    this.form = this.formBuilder.group({
      idcliente: [this.proveedor_cliente.idcliente],
      nombres: [this.proveedor_cliente.nombres, Validators.required],
      dni: '',
      direccion: '',
      direccion_referencia: '',
      telefono: '',
      fechanac: '',
      idorg: '?',
      idsede: '?',
    });
  }

  public guardarCliente(): void {
    const idcliente = this.proveedor_cliente.idcliente;
    const data = JSON.stringify(this.form.value);
    console.log(data);
    if ( idcliente === null  ) { this.create(data); } else { this.update(data, idcliente); }
  }

  private create(data: any): void {
    this.crudService.create(data, 'api/cliente', 'create').subscribe(
      res => {
        console.log(res);
        if (!res.success) { this.managerErrorService.ResError(res); return; }
        this.guardadoOk = true;
        this.proveedor_cliente.idcliente = res.id[0];
        this.form.controls['idcliente'].setValue(this.proveedor_cliente.idcliente);
        this.proveedor_cliente = <ClienteModel>this.form.value;
        this.getObject.emit(this.proveedor_cliente);
      });
  }

  private update(data: any, id: any): void {
    this.crudService.update(data, id, 'api/cliente').subscribe(
      res => {
        if (!res.success) { this.managerErrorService.ResError(res); return; }
        this.guardadoOk = true;
      });
  }

  public buscarDNIRUC(dni: string): void {

    let tipoDoc = 1; // dni
    let nomTipoDoc = 'DNI';
    let errTipoDoc = false; // error dni o ruc incorrectos/ cuando la cantidad de caracteres no coincide con 8 o 11


    // evaluar si es ruc o dni
    const chartLength = dni.length;

    if (chartLength <= 8) {
      tipoDoc = 1;
      nomTipoDoc = 'DNI';
      errTipoDoc = chartLength < 8 ? true : false;
    } else {
      tipoDoc = 2;
      nomTipoDoc = 'RUC';
      errTipoDoc = chartLength < 11 ? true : false;
    }

    if (errTipoDoc) {
      this._formControlName.setErrors({ 'incorrect': true, 'msj': `${nomTipoDoc} incorrecto.` });
      this.getObject.emit(null);
      return;
    }
    //

    const filtros = `dni:eq:${dni}`;
    this.cargando = true;
    this.crudService.getFilterBy('model/cliente', 'getFilterBy', filtros).subscribe(
      (res: any) => {
        console.log(res.data[0]);
        this.proveedor_cliente = <ClienteModel>res.data[0] || null;
        if (!this.proveedor_cliente) {
          // busca en la api
          this.consultaApiDniUcService.consultaDNIRUC(dni, tipoDoc)
            .subscribe((resp: any) => {
              if (!resp.haydatos) {this._formControlName.setErrors({ 'incorrect': true, 'msj': 'No se encontro registros.' }); return; }
              this.setearDeApiDniRuc(resp.result, tipoDoc);

              this.getObject.emit(this.proveedor_cliente);
              this.cargando = false;
              this.verMasDatos = true;
            }, error => {
              // error al conectar proveedor de servicios
              console.log('errororororor: ', error);
              this.managerErrorService.ResError(error);
              this.cargando = false;
              this.form.reset();
              this.proveedor_cliente = new ClienteModel();
              this.getObject.emit(null);
              this._formControlName.setErrors({ 'incorrect': true, 'msj': error.error }); return;

            });
        } else {
          this.getObject.emit(this.proveedor_cliente);
          this.setearForm();
          this.cargando = false;
          this.verMasDatos = true;
        }

      }, error => {console.log(error); });
  }


  setearDeApiDniRuc(data: any, tipoDoc: number) {
    let nombres = '';
    let numDoc = '';
    let dIreccion = '';
    if (tipoDoc === 1) { // dni
      nombres = data.Nombres + ' ' + data.apellidos;
      numDoc = data.DNI;
      dIreccion = data.Distrito;
    } else { // ruc
      nombres = data.RazonSocial;
      numDoc = data.RUC;
      dIreccion = data.Direccion || '';
    }

    this.proveedor_cliente = new ClienteModel();
    this.proveedor_cliente.nombres = nombres;
    this.proveedor_cliente.dni = numDoc;
    this.proveedor_cliente.direccion = dIreccion;

    this.setearForm();

    console.log(this.proveedor_cliente);
  }

  private setearForm(): void {
    // this.form.controls['idcliente'].patchValue(this.proveedor_cliente.idcliente);
    // this.form.controls['nombres'].patchValue(this.proveedor_cliente.nombres);
    // this.form.controls['direccion'].patchValue(this.proveedor_cliente.direccion);
    // this.form.controls['fechanac'].patchValue(this.proveedor_cliente.fechanac);
    // this.form.controls['telefono'].patchValue(this.proveedor_cliente.telefono);
    const data = this.proveedor_cliente;
    Object.keys(data).forEach(name => {
      if (this.form.controls[name]) {
        this.form.controls[name].patchValue(data[name]);
      }
    });
  }

  nuevo(): void {
    this.form.reset();
    this.proveedor_cliente = new ClienteModel();
    this.txtCodigo.nativeElement.value = '';
  }

}

