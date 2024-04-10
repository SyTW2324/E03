import { Component, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

    formulario: FormGroup;

    userService = inject(UsersService);
    constructor() {
        this.formulario = new FormGroup({
            name: new FormControl(),
            email: new FormControl(),
            password: new FormControl(),
        });
    }

    async onSubmit() {
        //Comprobar los datos del formulario
        const form = this.formulario.value;
        if (form.name === "" || form.email === "" || form.password === "") {
            alert("Por favor, rellene todos los campos");
            return;
        } else if (form.password.length < 6) {
            alert("La contraseña debe tener al menos 6 caracteres");
            return;
        } else {
            const response = await this.userService.register(this.formulario.value);
            if (response.success === true) {
                alert("Usuario registrado correctamente");
                window.location.href = "/users/login";
            } else {
                alert("Error al registrar el usuario " + response.error);
            }
        }
    
    }
}
