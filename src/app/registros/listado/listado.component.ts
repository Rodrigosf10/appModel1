import { Component } from '@angular/core';

@Component({
	selector: 'app-listado',
	templateUrl: './listado.component.html',
	styleUrls: ['./listado.component.css']
})
export class ListadoComponent {
	//public personas : string = "Hola";
	public titulo : string = "CRUD con ng-Model";
	public formulario : any = {
		id:null,
		nombre:null,
		precio:null}
	public inventario : any = [{id:1,nombre:"Pantalon",precio:250},{id:2,nombre:"Chamarra",precio:500}];
	public seleccionar(articulos:any) : void { 
		//console.log(articulos)
		this.formulario.id = articulos.id;
		this.formulario.nombre = articulos.nombre;
		this.formulario.precio = articulos.precio;
	}
	public eliminar(id:number) : void {
		for(let index = 0; index < this.inventario.length; index++){
			if (this.inventario[index].id == id) {
				this.inventario.splice(index, 1);
				break;
			}
		}
	}
	public agregar(): void {
		// Busca si el ID ya existe en el inventario
		if (this.formulario.id && this.formulario.nombre && this.formulario.precio) {
			const index = this.inventario.findIndex((elemento:any) => elemento.id === this.formulario.id);
			if (index === -1) {
			  	// Si no existe el ID, se agrega el registro al inventario.
				let datoNuevo = {id: this.formulario.id, nombre: this.formulario.nombre, precio: this.formulario.precio};
				this.inventario.push(datoNuevo);
				alert("Agregado con éxito");
				this.limpiarCampos();
			} else {
			  	// Si ya existe el ID, se muestra una alerta y no se agrega el registro
				alert("El ID ya existe en el inventario");
			}
		} else {
			alert("Todos los campos son obligatorios");
		}
	}
	public editar(id:number) : void {
		// Funcion para evitar actualizar si no selecciono un registro, si un campo del formulario esta vacio o haya un ID invalido.
		if (!this.formulario.id && !this.formulario.nombre && !this.formulario.precio) {
			alert("Selecciona un registro para editar");
			return;
		} 
		if (!this.formulario.id || !this.formulario.nombre || !this.formulario.precio) {
			alert("Debe completar todos los campos para editar");
			return;
		}
		const registroExistente = this.inventario.find((elemento:any) => elemento.id === id);
		if (!registroExistente) {
			alert("No existen registros con el ID seleccionado");
			return;
		}
		for (let index = 0; index < this.inventario.length; index++) {
			if (this.inventario[index].id == id) {
				this.inventario[index].id = this.formulario.id;
				this.inventario[index].nombre = this.formulario.nombre;
				this.inventario[index].precio = this.formulario.precio;
				alert("Se ha modificado con exito");
				this.limpiarCampos();
				break;
			}
		}
	}
	// Funcion para limpiar los campos
	public limpiarCampos(): void {
		this.formulario.id = null;
		this.formulario.nombre = "";
		this.formulario.precio = null;
	}
}