import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CharacterService } from '../character.service';

@Component({
  selector: 'app-character-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.css']
})
export class CharacterListComponent implements OnInit {
  characters: any[] = [];
  campaignId: string | null = null;

  constructor(
    private characterService: CharacterService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  async ngOnInit() {
    this.campaignId = this.route.parent?.snapshot.paramMap.get('id') || null;
    if (this.campaignId) {
      await this.loadCharacters();
    }
  }

  async loadCharacters() {
    if (!this.campaignId) return;
    const { data } = await this.characterService.getCharacters(this.campaignId);
    if (data) {
      this.characters = data;
    }
  }

  async createNewCharacter() {
    if (!this.campaignId) return;
    const name = prompt('Nome do Personagem:');
    if (!name) return;
    const charClass = prompt('Classe:') || '';
    await this.characterService.createCharacter(this.campaignId, name, charClass);
    await this.loadCharacters();
  }

  openCharacter(characterId: string) {
    this.router.navigate(['../character', characterId], { relativeTo: this.route });
  }
}