import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CharacterService } from '../character.service';
import { ContextService } from '../../../../core/context.service';
import { ModalComponent } from '../../../../shared/components/modal/modal.component';
import { RealtimeSyncService } from '../../../../core/realtime-sync.service';

@Component({
  selector: 'app-character-list',
  standalone: true,
  imports: [CommonModule, FormsModule, ModalComponent],
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.css']
})
export class CharacterListComponent implements OnInit, OnDestroy {
  characters: any[] = [];
  filteredCharacters: any[] = [];
  campaignId: string | null = null;
  searchTerm: string = '';
  isModalOpen = false;
  formData = { name: '', charClass: '' };
  private syncSub!: Subscription;

  constructor(
    private characterService: CharacterService,
    private route: ActivatedRoute,
    private router: Router,
    private contextService: ContextService,
    private realtimeSync: RealtimeSyncService
  ) {}

  async ngOnInit() {
    this.campaignId = this.route.parent?.snapshot.paramMap.get('id') || null;
    if (this.campaignId) {
      await this.loadCharacters();
    }
    this.syncSub = this.realtimeSync.sync$.subscribe(async (event) => {
      if (event.table === 'characters') {
        await this.loadCharacters();
      }
    });
  }

  ngOnDestroy() {
    if (this.syncSub) {
      this.syncSub.unsubscribe();
    }
  }

  async loadCharacters() {
    if (!this.campaignId) return;
    const { data } = await this.characterService.getCharacters(this.campaignId);
    if (data) {
      this.characters = data;
      this.filteredCharacters = data;
    }
  }

  filterData() {
    const term = this.searchTerm.toLowerCase().trim();
    if (!term) {
      this.filteredCharacters = this.characters;
      return;
    }
    this.filteredCharacters = this.characters.filter(char =>
      char.name.toLowerCase().includes(term) ||
      (char.class && char.class.toLowerCase().includes(term))
    );
  }

  openModal() {
    this.formData = { name: '', charClass: '' };
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  async confirmModal() {
    if (!this.campaignId || !this.formData.name.trim()) return;
    await this.characterService.createCharacter(this.campaignId, this.formData.name, this.formData.charClass);
    this.closeModal();
    await this.loadCharacters();
  }

  openCharacter(charId: string) {
    this.router.navigate(['../character', charId], { relativeTo: this.route });
  }

  openInContext(event: Event, char: any) {
    event.stopPropagation();
    this.contextService.setContext({ type: 'character', data: char });
  }
}