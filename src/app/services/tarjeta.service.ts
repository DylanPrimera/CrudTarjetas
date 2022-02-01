import { Injectable } from '@angular/core';
import {TarjetaCredito} from "../models/TarjetaCredito";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TarjetaService {
  private tarjeta$ = new Subject<any>();

  constructor(private firbase: AngularFirestore) { }

  public addTarjetaEdit(tarjeta: TarjetaCredito) {
    this.tarjeta$.next(tarjeta);
  }

  public getCardToEdit(): Observable<TarjetaCredito> {
    return this.tarjeta$.asObservable();
  }

  public guardarTarjeta(tarjeta: TarjetaCredito): Promise<any> {
    return this.firbase.collection('tarjetas').add(tarjeta);
  }

  public obtenerTarjetas(): Observable<any> {
    return this.firbase.collection('tarjetas', ref => ref.orderBy('fechaCreacion', 'asc')).snapshotChanges();
  }

  public editarTarjeta(id: string, tarjeta: any): Promise<any> {
    return this.firbase.collection('tarjetas').doc(id).update(tarjeta);
  }

  public eliminarTarjeta(id: string): Promise<any> {
    return this.firbase.collection('tarjetas').doc(id).delete();
  }
}
