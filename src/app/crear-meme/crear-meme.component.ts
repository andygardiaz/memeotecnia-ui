import { Component, OnInit, ViewChild } from '@angular/core';
import { ColorEvent } from 'ngx-color';
import { BackendService } from '../services/backend.service';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-meme',
  templateUrl: './crear-meme.component.html',
  styleUrls: ['./crear-meme.component.css']
})
export class CrearMemeComponent implements OnInit {

  @ViewChild('memeCanvas', { static: false }) myCanvas:any;
  fileEvent: any;
  textColor: string = '#000000';
  backgroundColor: string = '#f9f9fb';
  nuevoMeme= {
    rutaImagen:"",
    rutaOriginal:"",
    coleccion: {"idColeccion":-1},
    textoSuperior: "",
    textoInferior: "",
    privado:false
};
nuevaColeccion: string="";
listadoColecciones: any;
  constructor(private backend: BackendService, private router: Router) { }

  ngOnInit(): void {
    this.getColecciones();
  }

  ngAfterViewInit(){
    this.preview2();
  }

  preview2(){
      if(this.backend.imagenOriginal!=""){
        const img = new Image();
        img.crossOrigin="anonymous";
        img.src=this.backend.imagenOriginal;
        let canvas = this.myCanvas.nativeElement;
        let ctx = canvas.getContext('2d');
        img.onload = function () {
          ctx.drawImage(img, 0, 150, 700, 500);
        }
      }
  }

  preview(e: any) {
    this.fileEvent = e;
    let canvas = this.myCanvas.nativeElement;
    let ctx = canvas.getContext('2d');

    let render = new FileReader();
    render.readAsDataURL(e.target.files[0]);
    render.onload =  (event) => {
      const img = new Image();
      img.src = event.target!.result as string;
      this.nuevoMeme.rutaOriginal=img.src.replace("data:image/png;base64," , "");
      img.onload = function () {
        ctx.drawImage(img, 0, 150, 700, 500);
      }
    };

  }
  drawText() {
    let canvas = this.myCanvas.nativeElement;
    let ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = this.backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    if (this.backend.imagenOriginal==""){
      this.preview(this.fileEvent)

    } else{
      this.preview2();
    }
    ctx.fillStyle = this.textColor;
    ctx.font = '40px Comic Sans MS';
    ctx.textAlign = 'center';
    let wrappedText = this.wrapText(ctx, this.nuevoMeme.textoSuperior, canvas.width/2, 50, 700, 40);
    //ctx.fillText(this.nuevoMeme.textoSuperior, canvas.width / 2, 100);
    wrappedText.forEach(function(item) {
      ctx.fillText(item[0], item[1], item[2]);
  })
    wrappedText = this.wrapText(ctx, this.nuevoMeme.textoInferior, canvas.width/2, 700, 700, 40);
    //ctx.fillText(this.nuevoMeme.textoInferior, canvas.width / 2, 750);
    wrappedText.forEach(function(item) {
      ctx.fillText(item[0], item[1], item[2]);
  })
  }


  wrapText (ctx: any, text: string, x: number, y: number, maxWidth: number, lineHeight: number) {
    // First, start by splitting all of our text into words, but splitting it into an array split by spaces
    let words = text.split(' ');
    let line = ''; // This will store the text of the current line
    let testLine = ''; // This will store the text when we add a word, to test if it's too long
    let lineArray = []; // This is an array of lines, which the function will return

    // Lets iterate over each word
    for(var n = 0; n < words.length; n++) {
        // Create a test line, and measure it..
        testLine += `${words[n]} `;
        let metrics = ctx.measureText(testLine);
        let testWidth = metrics.width;
        // If the width of this test line is more than the max width
        if (testWidth > maxWidth && n > 0) {
            // Then the line is finished, push the current line into "lineArray"
            lineArray.push([line, x, y]);
            // Increase the line height, so a new line is started
            y += lineHeight;
            // Update line and test line to use this word as the first word on the next line
            line = `${words[n]} `;
            testLine = `${words[n]} `;
        }
        else {
            // If the test line is still less than the max width, then add the word to the current line
            line += `${words[n]} `;
        }
        // If we never reach the full max width, then there is only one line.. so push it into the lineArray so we return something
        if(n === words.length - 1) {
            lineArray.push([line, x, y]);
        }
    }
    // Return the line array
    return lineArray;
}
  canvasTextColor($event: ColorEvent) {
    this.textColor = $event.color.hex;
    this.drawText();
  }

  canvasBgColor($event: ColorEvent) {
    this.backgroundColor = $event.color.hex;
    this.drawText();
  }

  downloadImg() {
    let canvas = this.myCanvas.nativeElement;
    let image = canvas.toDataURL('image/png');
    if(this.backend.imagenOriginal!=""){
      this.nuevoMeme.rutaOriginal=this.backend.imagenOriginal;
    }
    this.nuevoMeme.rutaImagen=image.replace("data:image/png;base64," , "");;
    this.nuevoMeme.coleccion.idColeccion=+this.nuevoMeme.coleccion.idColeccion;
    if (this.nuevoMeme.coleccion.idColeccion==0){
      this.backend.postColeccion(this.nuevaColeccion).subscribe((datos:any) => {
        this.nuevoMeme.coleccion.idColeccion=datos.coleccion.idColeccion;
        this.crearMeme();
      });
    }else {
      this.crearMeme()
    }


    /*let link = document.createElement('a');
    link.download = 'memeImag.png';
    link.href = image;

    link.click();*/
  }
  getColecciones(){
    this.backend.getColecciones().subscribe ((datos:any)=>{
      this.listadoColecciones=datos.colecciones;

    });
  }

  crearMeme(){
    this.backend.postMeme(this.nuevoMeme).subscribe((datos:any) =>{
      console.log(datos);
      Swal.fire(
        '¡Excelente! Tu meme se ha creado',
        'OK para continuar',
        'success'
      ).then(()=>{
        this.router.navigate(['/meme',datos.meme.idMeme])// meme.idMeme
      });
    });
  }

}
