import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class BackendService {
imagenOriginal="";
readonly host="http://www.memeotecnia.com:8080/";
readonly front="http://www.memeotecnia.com/"
  constructor(private http: HttpClient) { }
  postMeme(meme:any){
    return this.http.post(`${this.host}memes`, meme);
  }
  getMemes(coleccionSeleccionada: number){
    return this.http.get(`${this.host}colecciones/${coleccionSeleccionada}`);
  }
  getColecciones(){
    return this.http.get(`${this.host}colecciones/`);
  }

  postContacto(contacto: any){
    return this.http.post(`${this.host}contactos`, contacto);
  }

  postDenuncia(denuncia: any){
    return this.http.post(`${this.host}denuncias`, denuncia);
  }

  getMeme(idMeme: number){
    return this.http.get(`${this.host}memes/${idMeme}`);
  }

  getDenuncia(idMeme: number){
    return this.http.get(`${this.host}denuncia/${idMeme}`);
  }

  postColeccion(nombre: string){
    return this.http.post(`${this.host}colecciones/`, {nombre: nombre});
  }
}
