import { Component, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UsersService } from '../../../services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

    formulario: FormGroup;
    router = inject(Router)
    usersService = new UsersService();
    constructor() {
        this.formulario = new FormGroup({
            email: new FormControl(),
            password: new FormControl(),
        });
    }

    async onSubmit() {
    
      const response = await this.usersService.login(this.formulario.value);
      console.log(response);
      //En teoría debería redirigir a la página de home
      if (response.success === true) {
      //Se guarda el token en localStorage
        localStorage.setItem('user_token', response.token);
        this.router.navigate(['/home']);
      } else {
        alert("Usuario o contraseña incorrectos");
      }
    }
}
