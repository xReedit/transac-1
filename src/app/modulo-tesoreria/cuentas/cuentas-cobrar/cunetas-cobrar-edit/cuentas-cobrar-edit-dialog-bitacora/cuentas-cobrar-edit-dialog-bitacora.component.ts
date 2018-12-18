import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { CrudHttpService } from 'src/app/shared/crud-http.service';
import { ManagerErrorService } from 'src/app/shared/services/manager-error.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RegistroCobroBitacoraModel } from 'src/app/models/registro.cobro.bitacora.model';

@Component({
  selector: 'app-cuentas-cobrar-edit-dialog-bitacora',
  templateUrl: './cuentas-cobrar-edit-dialog-bitacora.component.html',
  styleUrls: ['./cuentas-cobrar-edit-dialog-bitacora.component.css']
})
export class CuentasCobrarEditDialogBitacoraComponent implements OnInit {

  idcliente: number;
  @ViewChild('txt_nota') txt_nota: ElementRef;

  constructor(
    private crudService: CrudHttpService,
    private managerErrorService: ManagerErrorService,
    private dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.idcliente = data.idcliente;
   }

  ngOnInit() {
  }

  registrarBitacora(): void {
    const valTxt_nota = this.txt_nota.nativeElement.value;
    if (valTxt_nota === '') {return; }

    const _bitacora: RegistroCobroBitacoraModel = new RegistroCobroBitacoraModel();
    _bitacora.glosa = valTxt_nota;
    _bitacora.idcliente = this.idcliente;

    this.crudService.create(_bitacora, 'model/registro_cobro_bitacora', 'create')
    .subscribe(res => {
      if (!res.success) { this.managerErrorService.ResError(res); return; }
      this.dialogRef.close(true);
    });
  }

}
