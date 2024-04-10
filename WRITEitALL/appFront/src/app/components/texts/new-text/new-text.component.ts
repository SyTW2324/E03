import { Component, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TextsService } from 'src/app/services/texts.service';

@Component({
  selector: 'app-new-text',
  templateUrl: './new-text.component.html',
  styleUrls: ['./new-text.component.css']
})
export class NewTextComponent {

    formulario: FormGroup;

    textService = inject(TextsService);
    constructor() {
      this.formulario = new FormGroup({
        title: new FormControl(),
        creator: new FormControl(),
        description: new FormControl(),
        content: new FormControl(),
        explicit: new FormControl()
      })
  }

  async onSubmit() {
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
    //Obtener el jwt para añadir el campo creator
    const token = localStorage.getItem('user_token');
    this.formulario.value.creator = token;
    const response = await this.textService.create(this.formulario.value)
    console.log(response);
    }
  }
}
