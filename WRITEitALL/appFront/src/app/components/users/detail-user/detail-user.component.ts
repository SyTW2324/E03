import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../../../services/users.service';
import { TextsService } from '../../../services/texts.service';
@Component({
  selector: 'app-detail-user',
  templateUrl: './detail-user.component.html',
  styleUrls: ['./detail-user.component.css']
})
export class DetailUserComponent {
  activatedRoute = inject(ActivatedRoute);
  usersService = inject(UsersService);
  textsService = inject(TextsService);
  user = signal<any>({
    name: "",
    description: "",
    id: "",
    textscnt: 0
  });
  
  async ngOnInit() {
    this.activatedRoute.params.subscribe(async params => {
      const user = await this.usersService.getById(params['id']);
      const textscount = await this.textsService.getTextsCount(params['id']);
      const response = {
        name: user.name,
        description: user.description,
        id: user._id,
        textscnt: textscount
      }
      this.user.set(response);
    });
  }
}
