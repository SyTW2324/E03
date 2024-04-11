import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TextsService } from 'src/app/services/texts.service';

@Component({
  selector: 'app-edit-text',
  templateUrl: './edit-text.component.html',
  styleUrls: ['./edit-text.component.css']
})
export class EditTextComponent {

    formulario: FormGroup;
    textId = signal('');
    activatedRoute = inject(ActivatedRoute);
    textService = inject(TextsService);
    constructor(private router: Router) {
      this.formulario = new FormGroup({
        title: new FormControl(),
        description: new FormControl(),
        content: new FormControl(),
        explicit: new FormControl(),
        private: new FormControl(),
      })
    }

    ngOnInit() {

      this.activatedRoute.params.subscribe(async params => {
        //Obtener el texto con el id que viene en la url
        try {
          const text = await this.textService.getById(params['id']);
          delete text._id;
          delete text.__v;
          delete text.comments;
          delete text.likes;
          delete text.creator;
          delete text.username;
          this.formulario.setValue(text);
        } catch (error) {
          alert("No se ha encontrado el texto");
          this.router.navigate(['/texts']);
        }
        

      })
    }

  async onSubmit(event: { preventDefault: () => void; submitter: any; }) {
      event.preventDefault();
      const button = event.submitter;
      if (button.value === "Enviar") {
        //Comprobar que el formulario contiene los datos correctos
        if (this.formulario.value.title == null || this.formulario.value.title == "") {
          alert("El título no puede estar vacío");
          return;
        } else if (this.formulario.value.description == null || this.formulario.value.description == "") {
          alert("La descripción no puede estar vacía");
          return;
        } else if (this.formulario.value.content == null || this.formulario.value.content == "") {
          alert("El contenido no puede estar vacío");
          return;
        } else {
          if (this.formulario.value.explicit == null) {
            this.formulario.value.explicit = false;
          }
          if (this.formulario.value.private == null) {
            this.formulario.value.private = false;
          }
        }
        const repsonse = await this.textService.update(this.activatedRoute.snapshot.params['id'], this.formulario.value);
        console.log(repsonse);
        this.router.navigate(['/texts/' + this.activatedRoute.snapshot.params['id']]);

      } else if (button.value === "Borrar") {
        const confirmacion = window.confirm("¿Estás seguro que quieres borrar?");
        if (confirmacion) {
          const response = await this.textService.deleteById(this.activatedRoute.snapshot.params['id']);
          console.log(response);
          this.router.navigate(['/texts']);
        }
        
      } else if (button.value === "Cancelar") {
        this.router.navigate(['/texts/' + this.activatedRoute.snapshot.params['id']]);
      }
  }

}
