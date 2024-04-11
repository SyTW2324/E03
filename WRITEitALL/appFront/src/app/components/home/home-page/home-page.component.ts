import { Component, inject, signal} from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { TextsService } from 'src/app/services/texts.service';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {
  router = inject(Router);
  usersService = inject(UsersService);
  textsArray = signal<any[]>([]);
  textsService = inject(TextsService);

  async ngOnInit() {
    const texts = await this.textsService.getPublicTexts();
    this.textsArray.set(texts);
  }
}
