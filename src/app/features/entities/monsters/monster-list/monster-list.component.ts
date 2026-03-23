import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MonsterService } from '../monster.service';

@Component({
  selector: 'app-monster-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './monster-list.component.html',
  styleUrls: ['./monster-list.component.css']
})
export class MonsterListComponent implements OnInit {
  monsters: any[] = [];

  constructor(
    private monsterService: MonsterService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  async ngOnInit() {
    await this.loadMonsters();
  }

  async loadMonsters() {
    const { data } = await this.monsterService.getMonsters();
    if (data) {
      this.monsters = data;
    }
  }

  async createNewMonster() {
    const name = prompt('Nome do Monstro:');
    if (!name) return;
    await this.monsterService.createMonster(name);
    await this.loadMonsters();
  }

  openMonster(monsterId: string) {
    this.router.navigate(['../monster', monsterId], { relativeTo: this.route });
  }
}