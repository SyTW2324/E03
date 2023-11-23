import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TextsService } from 'src/app/services/texts.service';

@Component({
  selector: 'app-detail-text',
  templateUrl: './detail-text.component.html',
  styleUrls: ['./detail-text.component.css']
})
export class DetailTextComponent {

  activatedRoute = inject(ActivatedRoute);
  textsService = inject(TextsService);
  text = signal<any>({});
  
  ngOnInit() {
    this.activatedRoute.params.subscribe(async params => {
      const text = await this.textsService.getById(params['id']);
      this.text.set(text);
    });
  }
}
