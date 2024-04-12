import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {

  router = inject(Router);
  usersService = inject(UsersService);
  userId = signal<any>({
    id: ""
  });
  onClickLogout() {
    localStorage.removeItem('user_token');
    this.router.navigate(['/users/login']);
  }
  async ngOnInit() {
    //Obtener el id del usuario logueado
    const usertoken = localStorage.getItem('user_token');
    if (usertoken) {
      const id = await this.usersService.getIdbyToken(usertoken);
      this.userId().id = id.user_id;
    }
    
  }
}
