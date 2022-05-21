import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from '../services/backend.service';

@Component({
  selector: 'app-memes',
  templateUrl: './memes.component.html',
  styleUrls: ['./memes.component.css']
})
export class MemesComponent implements OnInit {
listadoMemes: any;
listadoColecciones: any;
coleccionSeleccionada: any;
filtroBusqueda: string="";
color:any;
readonly colores=["primary", "success", "secondary", "danger", "warning", "info", "dark"];
  constructor(public backend: BackendService, private router:Router) { }

  ngOnInit(): void {
    this.getColecciones();
  }
  getMemes(){
    this.backend.getMemes(this.coleccionSeleccionada).subscribe ((datos: any)=>{
      this.listadoMemes=datos.coleccion.memes;
      this.color=this.colorAleatorio();
    });
  }

  getColecciones(){
    this.backend.getColecciones().subscribe ((datos:any)=>{
      this.listadoColecciones=datos.colecciones;
      this.listadoColecciones.forEach((element: any) => {
        element.color=this.colorAleatorio();
      });
    });
  }
  filtraColeccion(coleccion: number){
    this.coleccionSeleccionada=coleccion;
    this.getMemes();
  }
  irAPlantilla(rutaOriginal: string){
    this.backend.imagenOriginal=this.backend.host+rutaOriginal;
    this.router.navigate(["crear-meme"]);
  }
  colorAleatorio(){
    return this.colores[Math.floor(Math.random() * 7)]
  }

}
