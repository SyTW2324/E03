import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../../../services/users.service';

@Component({
  selector: 'app-detail-user',
  templateUrl: './detail-user.component.html',
  styleUrls: ['./detail-user.component.css']
})
export class DetailUserComponent {
  activatedRoute = inject(ActivatedRoute);
  usersService = inject(UsersService);
  user = signal<any>({});
  
  ngOnInit() {
    this.activatedRoute.params.subscribe(async params => {
      const user = await this.usersService.getById(params['id']);
      this.user.set(user);
    });
  }
}
