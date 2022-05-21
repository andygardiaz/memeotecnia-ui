import { Component, OnInit } from '@angular/core';
import { BackendService } from '../services/backend.service';
import { Contacto } from '../interfaces/contacto';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements OnInit {
  nuevoContacto: any={email: "",asunto:"",descripcion:""}

  constructor(private backend: BackendService, private router: Router) { }

  ngOnInit(): void {
    this.function();
    this.validClasses(this.nuevoContacto.email, this.nuevoContacto.asunto, this.nuevoContacto.descripcion);
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
  postContacto(contactoForm: NgForm){
    this.backend.postContacto(this.nuevoContacto).subscribe((datos:any)=>{
      Swal.fire({
        icon: 'success',
        title: 'Mensaje enviado',
        text: 'Nos pondremos en contacto contigo lo antes posible',
      }).then(()=>{
      contactoForm.resetForm();
      this.router.navigate(['/memes-recientes']);
    });
    })
  };

  validClasses(ngModel:any,validClass: string, errorClass:string){
    return{[validClass]:ngModel.dirty && ngModel.valid, [errorClass]:ngModel.dirty && ngModel.invalid}
  }
}
