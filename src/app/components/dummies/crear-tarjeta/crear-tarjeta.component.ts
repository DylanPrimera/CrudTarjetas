import {Component, OnInit, Output, EventEmitter, Input, OnChanges} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TarjetaCredito} from "../../../models/TarjetaCredito";

@Component({
  selector: 'app-crear-tarjeta',
  templateUrl: './crear-tarjeta.component.html',
  styleUrls: ['./crear-tarjeta.component.scss']
})
export class CrearTarjetaComponent implements OnInit, OnChanges {
  @Input() titulo : string = '';
  // @ts-ignore
  @Input() datosTarjeta: TarjetaCredito;
  @Input() id: string | undefined;
  @Output() tarjeta = new EventEmitter<any>();
  @Output() editTarjeta = new EventEmitter<any>();
  // @ts-ignore
  public form: FormGroup;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  ngOnChanges(): void {
    if (this.id === undefined) {
      this.initForm();
    } else {
      this.form.patchValue({
        titular: this.datosTarjeta.titular,
        numeroTarjeta: this.datosTarjeta.numeroTarjeta,
        fechaExpiracion: this.datosTarjeta.fechaExpiracion,
        cvv: this.datosTarjeta.cvv
      });
    }

  }

  public initForm() {
    this.form = this.fb.group({
      titular: ['', Validators.required],
      numeroTarjeta: ['', [Validators.required, Validators.minLength(16), Validators.maxLength(16)]],
      fechaExpiracion: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(5)]],
      cvv: ['', [Validators.required,Validators.minLength(3) ,Validators.maxLength(3)]]
    })
  }

  public guardarTarjeta() {
    if (this.id === undefined){
      this.crearTarjeta();
    } else {
      this.editarTarjeta(this.id);
    }
  }

  public crearTarjeta() {
    const TARJETA: TarjetaCredito ={
      titular: this.form.value.titular,
      numeroTarjeta: this.form.value.numeroTarjeta,
      fechaExpiracion: this.form.value.fechaExpiracion,
      cvv: this.form.value.cvv,
      fechaCreacion: new Date(),
      fechaActualizacion: new Date(),
    }

    this.tarjeta.emit(TARJETA);
    this.form.reset();
  }

  public editarTarjeta(id: string){
    const TARJETA: any ={
      titular: this.form.value.titular,
      numeroTarjeta: this.form.value.numeroTarjeta,
      fechaExpiracion: this.form.value.fechaExpiracion,
      cvv: this.form.value.cvv,
      fechaActualizacion: new Date(),
    }
    this.editTarjeta.emit({id,...TARJETA});
    this.form.reset();
  }

}
