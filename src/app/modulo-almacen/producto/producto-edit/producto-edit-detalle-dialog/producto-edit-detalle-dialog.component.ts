import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TallaModel } from 'src/app/models/talla.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { InfoTockenService } from '../../../../shared/services/info-tocken.service';
import { ProductoDetalleModel } from 'src/app/models/producto.detalle.model';

@Component({
  selector: 'app-producto-edit-detalle-dialog',
  templateUrl: './producto-edit-detalle-dialog.component.html'
})
export class ProductoEditDetalleDialogComponent implements OnInit {

  form: FormGroup;

  private codigobarra = '';
  private color = '';
  private talla: TallaModel;
  private stock: number;

  public resetForm = false;

  @ViewChild('txtCodeBar') txtCodeBar: ElementRef;

  dataRpt: ProductoDetalleModel[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private infoTockenService: InfoTockenService,
    private dialogRef: MatDialogRef<ProductoEditDetalleDialogComponent>,
        @Inject(MAT_DIALOG_DATA) data
  ) {

   }

  ngOnInit() {
    this.form = this.formBuilder.group({
      idproducto: '?',
      codigobarra: [this.codigobarra],
      color: [this.color,  Validators.required],
      X_talla: [this.talla ,  Validators.required],
      idtalla: '',
      stock_inicial: [this.stock ,  [Validators.required, Validators.pattern('[0-9]+(\.[0-9][0-9]?)?')]],
      idalmacen_inicial: '',
      estado: 0
    });

    this.nuevo();
  }

  nuevo(): void {
    // this.form.reset();
    this.resetForm = true;
    this.setCodigoBarra();
    this.txtCodeBar.nativeElement.focus();

    setTimeout(() => {
      this.resetForm = false;
    }, 100);
  }


  save(): void {
    if (!this.form.valid) { return; }

    this.form.controls.idtalla.patchValue(this.form.controls.X_talla.value.idtalla);
    this.form.controls.idproducto.patchValue('-id-');

    this.dataRpt.push(this.form.value);
    this.nuevo();
    console.log(this.dataRpt);
  }

  close(): void {
    this.dialogRef.close(this.dataRpt);
  }

  setCodigoBarra(): void {
    const OrgSede = this.infoTockenService.getInfoOrgToken() + '' + this.infoTockenService.getInfoSedeToken();
    let length = 0;
    let rpt = '';
    while (length <= 7) {
        rpt = rpt + (Math.floor(Math.random() * (9 - 0))).toString();
        length++;
    }
    rpt = OrgSede + '' + rpt;
    this.form.controls['codigobarra'].patchValue(rpt);
  }


}
