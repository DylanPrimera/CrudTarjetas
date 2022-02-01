import {Component, OnChanges, OnDestroy, OnInit} from '@angular/core';
import {TarjetaCredito} from "../../../models/TarjetaCredito";
import {TarjetaService} from "../../../services/tarjeta.service";
import {ToastrService} from "ngx-toastr";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  public tarjetas: TarjetaCredito[] = [];
  public titulo: string = 'Agregar tarjeta';
  public datosTarjeta: any;
  public id: string | undefined;
  public subscriptions = new Subscription();
  constructor(private tarjetaService: TarjetaService, private toast: ToastrService) { }

  ngOnInit(): void {
    this.obtenerTarjetas();
    this.subscriptions.add(this.tarjetaService.getCardToEdit().subscribe((data) => {
      this.titulo = 'Editar tarjeta';
      this.id = data.id;
      this.datosTarjeta = data;
    }));
  }


  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  public obtenerTarjetas() {
    this.subscriptions.add( this.tarjetaService.obtenerTarjetas().subscribe((doc) => {
      this.tarjetas = [];
      doc.forEach((element: any) => {
        this.tarjetas.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        });
      });
    }));

  }

  public agregarTarjeta(tarjeta: TarjetaCredito) {
    this.tarjetaService.guardarTarjeta(tarjeta).then(() => {
      this.toast.success('Tarjeta guardada exitosamente!', 'Notificacion');
    }, () => {
      this.toast.error('Hubo un error al tratar de agregar la tarjeta', 'Error');
    })
  }

  public outputEditarTarjeta(value: any) {
    this.tarjetaService.addTarjetaEdit(value);
  }

  public editarTarjeta(value: any) {
    this.titulo = 'Agregar tarjeta';
    this.id = undefined;
    this.tarjetaService.editarTarjeta(value.id, value).then(() => {
      this.toast.success('Tarjeta editada.', 'Notificacion');
    }, () => {
      this.toast.error('Hubo un error al tratar de editar la tarjeta', 'Error');
    });
  }

  public eliminarTarjeta(value: any) {
    this.tarjetaService.eliminarTarjeta(value).then(()=> {
      this.toast.success('Tarjeta eliminada.', 'Notificacion');
    }, () => {
      this.toast.error('Hubo un error al tratar de agregar la tarjeta', 'Error');
    })
  }

}
