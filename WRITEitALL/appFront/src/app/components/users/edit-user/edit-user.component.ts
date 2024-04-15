import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../../../services/users.service';
import { TextsService } from '../../../services/texts.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent {
  activatedRoute = inject(ActivatedRoute);
  usersService = inject(UsersService);
  textsService = inject(TextsService);
  formulario: FormGroup;
  user = signal<any>({
    id: "",

  });
  constructor(private router: Router) {
    this.formulario = new FormGroup({
      name: new FormControl(),
      description: new FormControl(),
    })
  }
  
  async ngOnInit() {
    //obtener el id a partir del token
    const usertoken = localStorage.getItem('user_token');
    console.log("Token: " + usertoken);
    if (usertoken) {
      const id = await this.usersService.getIdbyToken(usertoken);
      this.user().id = id.user_id;
      const user = await this.usersService.getById(id.user_id);
      this.formulario.setValue({
        name: user.name,
        description: user.description,
      })
      console.log("Formulario: " + this.formulario.value);
    }
    else {
      //Error
      alert("No se ha podido encontrar el usuario");
    }
  }

  async onSubmit(event: { preventDefault: () => void; submitter: any; }) {
    event.preventDefault();
    const button = event.submitter;
    if (button.value === "Terminar") {
      //Comprobar que el formulario contiene los datos correctos
      if (this.formulario.value.name == null || this.formulario.value.name == "") {
        alert("El título no puede estar vacío");
        return;
      } else if (this.formulario.value.description == null || this.formulario.value.description == "") {
        alert("La descripción no puede estar vacía");
        return;
      } 
      const repsonse = await this.usersService.update(this.user().id, this.formulario.value);
      this.router.navigate(['/users/' + this.user().id]);

    }  else if (button.value === "Cancelar") {
      this.router.navigate(['/users/' + this.user().id]);
    }
}
}
