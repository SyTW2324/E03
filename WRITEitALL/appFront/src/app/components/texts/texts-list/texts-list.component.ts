import { Component, inject, signal } from '@angular/core';
import { TextsService } from 'src/app/services/texts.service';

@Component({
  selector: 'app-texts-list',
  templateUrl: './texts-list.component.html',
  styleUrls: ['./texts-list.component.css']
})
export class TextsListComponent {

  arrTexts = signal<any[]>([]);
  textsService = inject(TextsService);

    async ngOnInit() {
      const texts = await this.textsService.getAll();
      this.arrTexts.set(texts);
    }
}
