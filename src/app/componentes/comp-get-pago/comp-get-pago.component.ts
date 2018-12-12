import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { RegistroPagoModel } from 'src/app/models/registro.pago.mdel';
import { RegistroPagoDetalleModel } from '../../models/registro.pogo.detalle.model';
import { TipoPagoModel } from 'src/app/models/tipopago.model';
import { VentaDetallePagoModel } from '../../models/venta.detalle.pago.model';

@Component({
  selector: 'app-comp-get-pago',
  templateUrl: './comp-get-pago.component.html',
  styleUrls: ['./comp-get-pago.component.css']
})

export class CompGetPagoComponent implements OnInit {

  @Input() montoPagar: number;

  @Output()
  valid: EventEmitter<boolean> = new EventEmitter();

  @Output()
  getFormaPago: EventEmitter<VentaDetallePagoModel[]> = new EventEmitter();


  montoMaximo = 1000000;
  montoDiferencia = 0;
  montoDiferenciaCalc = 0;
  sumTotal = 0;

  requiereFechaPago = false;

  medioPago: TipoPagoModel;
  registroPago: RegistroPagoModel = new RegistroPagoModel();
  registroPagoDetlle: VentaDetallePagoModel = new VentaDetallePagoModel();
  listRegistroPagoDetlle: VentaDetallePagoModel[] = [];

  public form: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.montoDiferencia = this.montoPagar;
    this.prepararFormulario();
  }

  OnChanges() {
    this.montoDiferencia = this.montoPagar;
  }

  prepararFormulario(): void {
    // para venta
    this.form = this.formBuilder.group({
      tipo_pago: ['', Validators.required],
      fecha_pago: '',
      importe: ['', [Validators.required, Validators.pattern('[0-9]+(\.[0-9][0-9]?)?'), Validators.max(this.montoMaximo)]],
    });
  }

  addPago(): void {
    if (!this.form.valid) {return; }

    const formaPago = this.form.value;
    if (formaPago.importe === 0) { return; }

    const data = this.form.value;
    this.registroPagoDetlle = new VentaDetallePagoModel();
    this.registroPagoDetlle.tipo_pago = data.tipo_pago;
    this.registroPagoDetlle.idtipo_pago = data.tipo_pago.idtipo_pago;
    this.registroPagoDetlle.importe = data.importe;
    this.registroPagoDetlle.fecha_pago = data.fecha_pago;

    this.listRegistroPagoDetlle.push(this.registroPagoDetlle);
    console.log(this.listRegistroPagoDetlle);

    this.getSumTotalFormaPago();
    this.form.reset();

  }
  _getObject($event: TipoPagoModel) {
    this.medioPago = $event;
    this.requiereFechaPago = this.medioPago.requiere_fecha === 1 ? true : false;

    this.montoMaximo = 10000000;
    if (this.medioPago.descripcion.toLowerCase() !== 'efectivo' && this.medioPago.descripcion.toLowerCase() !== 'contado') {
      this.montoMaximo = this.montoDiferencia;
    }
  }

  private getSumTotalFormaPago(): void {
    // this.sumTotal = this.listRegistroPagoDetlle.map(t => t.importe).reduce((acc, value) => acc + parseFloat(value), 0);
    // this.montoDiferencia = this.montoPagar - this.sumTotal;
    // this.montoDiferenciaCalc = this.sumTotal - this.montoPagar;
    this.caclDiferencia();

    const formValid = this.montoDiferencia <= 0 ? true : false;
    this.valid.emit(formValid);

    if (formValid) {
      this.getFormaPago.emit(this.listRegistroPagoDetlle);
    }
  }

  private caclDiferencia(): void {
    this.sumTotal = this.listRegistroPagoDetlle.map(t => t.importe).reduce((acc, value) => acc + parseFloat(value), 0);
    this.montoDiferencia = this.montoPagar - this.sumTotal;
    this.montoDiferenciaCalc = this.sumTotal - this.montoPagar;
  }

  validarImporte(val: number) {
    this.medioPago = this.form.value.tipo_pago;
    if (this.medioPago === null ) {return; }
    if (this.medioPago.descripcion.toLowerCase() === 'efectivo' || this.medioPago.descripcion.toLowerCase() === 'contado') { return; }

    this.caclDiferencia();
    if (val > this.montoDiferencia) {
      const valMax = this.montoDiferencia < 0 ? 0 : this.montoDiferencia;
      this.form.controls['importe'].patchValue(valMax);
    }
  }

  getTotalRecibido() {
    if (this.listRegistroPagoDetlle === null) { return 0; }
    return this.listRegistroPagoDetlle.map(t => t.importe).reduce((acc, value) => parseFloat(acc.toString()) + parseFloat(value), 0);
  }

  removeItem(index: number): void {
    this.listRegistroPagoDetlle.splice(index, 1);
    this.getSumTotalFormaPago();
  }

  nuevo(): void {
    this.listRegistroPagoDetlle = [];
    this.montoDiferencia = 0;
    this.montoDiferenciaCalc = 0;
    this.sumTotal = 0;
  }

}
