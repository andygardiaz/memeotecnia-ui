import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { BackendService } from '../services/backend.service';

@Component({
  selector: 'app-denuncia',
  templateUrl: './denuncia.component.html',
  styleUrls: ['./denuncia.component.css']
})
export class DenunciaComponent implements OnInit {
  idMeme: number=0;
  meme: any = null;
  nuevaDenuncia: any={id_meme: "", emailContacto: "",razonDenuncia:"",descripcion:""}

  constructor(private route: ActivatedRoute, public backend: BackendService, private router:Router) { }

  ngOnInit(): void {
    this.idMeme = this.route.snapshot.params['id'];
    this.nuevaDenuncia.id_meme=this.idMeme;
    this.backend.getMeme(this.idMeme).subscribe((datos: any)=>{
      this.meme=datos.meme;
    });
    this.function();
    this.validClasses(this.nuevaDenuncia.email, this.nuevaDenuncia.razon, this.nuevaDenuncia.descripcion);
  }

  function() {
    var forms = document.querySelectorAll('.needs-validation')
    Array.prototype.slice.call(forms)
      .forEach(function (form) {
        form.addEventListener('submit', function (event: any) {
          if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
          }
          form.classList.add('was-validated')
        }, false)
      })
  }

  postDenuncia(denunciaForm: NgForm){
    this.backend.postDenuncia(this.nuevaDenuncia).subscribe((datos:any)=>{
      console.log(datos);
      Swal.fire({
        icon: 'success',
        title: 'Denuncia enviada',
        text: '¡Gracias! Te contactaremos lo antes posible a través del email que nos has proporcionado.',
      }).then(()=>{
      denunciaForm.resetForm();
      this.router.navigate(['/memes-recientes']);
    });
    })
  };

  validClasses(ngModel:any,validClass: string, errorClass:string){
    return{[validClass]:ngModel.dirty && ngModel.valid, [errorClass]:ngModel.dirty && ngModel.invalid}
  }

}
