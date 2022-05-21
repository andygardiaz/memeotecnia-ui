import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendService } from '../services/backend.service';

@Component({
  selector: 'app-meme',
  templateUrl: './meme.component.html',
  styleUrls: ['./meme.component.css']
})
export class MemeComponent implements OnInit {
idMeme!: number;
meme: any=null;
  constructor(private route: ActivatedRoute, public backend: BackendService, private router:Router) { }

  ngOnInit(): void {
    this.idMeme = this.route.snapshot.params['id'];
    this.backend.getMeme(this.idMeme).subscribe((datos: any)=>{
      this.meme=datos.meme;
    });
  }

  /*copy(text: any, target: any) {
    setTimeout(function() {
    $('#copied_tip').remove();
    }, 800);
    $(target).append("<div class='tip' id='copied_tip'>Copied!</div>");
    var input = document.createElement('input');
    input.setAttribute('value', text);
    document.body.appendChild(input);
    input.select();
    var result = document.execCommand('copy');
    document.body.removeChild(input)
    return result;
    }*/
    irAPlantilla(rutaOriginal: string){
      this.backend.imagenOriginal=this.backend.host+rutaOriginal;
      this.router.navigate(["crear-meme"]);
    }
}
