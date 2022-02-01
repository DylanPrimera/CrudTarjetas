import {Component, Input, OnChanges, OnInit, Output, EventEmitter} from '@angular/core';
import {TarjetaCredito} from "../../../models/TarjetaCredito";

@Component({
  selector: 'app-listar-tarjeta',
  templateUrl: './listar-tarjeta.component.html',
  styleUrls: ['./listar-tarjeta.component.scss']
})
export class ListarTarjetaComponent implements OnInit, OnChanges {
  // @ts-ignore
  @Input() tarjeta: TarjetaCredito[] = [];
  @Output() editar = new EventEmitter<any>();
  @Output() eliminar = new EventEmitter<any>();
  public showSpinner: boolean = true;
  constructor() { }

  ngOnInit(): void {
    this.showSpinner = true;
  }

  ngOnChanges(): void {
    this.showSpinner = false;
  }


  editarRegistro(tarjeta: any) {
    this.editar.emit(tarjeta);
  }

  eliminarRegistro(id: string | undefined) {
    this.eliminar.emit(id);
  }
}
