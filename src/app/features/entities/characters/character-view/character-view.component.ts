import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CharacterService } from '../character.service';

@Component({
  selector: 'app-character-view',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './character-view.component.html',
  styleUrls: ['./character-view.component.css']
})
export class CharacterViewComponent implements OnInit {
  character: any = null;

  constructor(
    private route: ActivatedRoute,
    private characterService: CharacterService
  ) {}

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('characterId');
    if (id) {
      const { data } = await this.characterService.getCharacter(id);
      this.character = data;
    }
  }
}