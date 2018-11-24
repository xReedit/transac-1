import { Component, OnInit } from '@angular/core';
import { CrudHttpService } from 'src/app/shared/crud-http.service';
import { InfoTockenService } from '../../../shared/services/info-tocken.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-producto-list',
  templateUrl: './producto-list.component.html',
  styleUrls: ['./producto-list.component.css']
})


export class ProductoListComponent implements OnInit {


  fechaSeleccionada = '';
  displayedColumns: string[] = ['select', '#', 'Producto', 'Marca', 'Categoria', 'Talla', 'Color' ];
  listProductoDetalle: any;

  showLista = true;

  totalRecords = 0;
  rows = 10;
  pageMostar = 1;

  checkAll = false;

  constructor(
    private crudHttpService: CrudHttpService,
    private infoTockenService: InfoTockenService) { }

  ngOnInit() {
  }

  changeVerLista(): void { this.showLista = !this.showLista; }

  nuevoRegistro(): void {
     this.changeVerLista();
  }

  getDate(value: any): void {
    console.log(value);
    this.fechaSeleccionada = value;
    this.LoadDataIngreso();
  }

  private LoadDataIngreso(): void {
    // tslint:disable-next-line:max-line-length
    const filtros = `producto.fecha_creacion:eq:${this.fechaSeleccionada}~y~producto.idorg:eq:${this.infoTockenService.getInfoSedeToken()}~y~producto.idsede:eq:${this.infoTockenService.getInfoSedeToken()}`;

    this.crudHttpService.paginacion('model/producto_detalle', 'getpagination', this.pageMostar, this.rows, filtros,
                                                            'producto.descripcion', '', false, false).subscribe(
      (res: any) => {
        console.log(res);
        this.listProductoDetalle = JSON.parse(JSON.stringify(res.data));
        console.log('listProductoDetalle ', this.listProductoDetalle);

        this.totalRecords = res.pages.totalCount;
      }
    );
  }

  public page(event: PageEvent): void {
    this.rows = event.pageSize;
    this.pageMostar = event.pageIndex;
    // this.filtrar(this.ultimoParametroBuscado);
  }

  selectCheck( index: number ): void {
    const checked = this.listProductoDetalle[index].checked || false;
    this.listProductoDetalle[index].checked = !checked;

    console.log(this.listProductoDetalle);
  }

  selectCheckAll(): void {
    this.checkAll = !this.checkAll;
    this.listProductoDetalle.map(x => x.checked = this.checkAll );
  }

  printPdf(nombre) {

    const ficha = document.getElementById('xContentCodeBar');
    const mywindow = window.open(' ', 'popimpr');
    mywindow.document
      .write('<html><head>' +
      '<meta charset="utf-8"><link href="./producto-list.component.css"/>' +
      '<style> @font-face {font-family: Barcode39; src: url(/bar3of9.TTF);} ' +
      '#CodBarra { font-family: "Barcode39";  font-size: 18px;} body{padding: 0px; line-height: 1px; font-family:"Agency FB";} .item{ margin-bottom: 10px; }</style>' +
      '<base href="/">' +
      '</head><body onload="window.print();">'
      + ficha.innerHTML + '</body></html>');

      setTimeout(() => {
        mywindow.print();
      }, 100);
}

  arrayOne(n: number): any[] {
    return Array(n);
  }

}
