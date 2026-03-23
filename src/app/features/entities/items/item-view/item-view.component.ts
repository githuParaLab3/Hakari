import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ItemService } from '../item.service';

@Component({
  selector: 'app-item-view',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './item-view.component.html',
  styleUrls: ['./item-view.component.css']
})
export class ItemViewComponent implements OnInit {
  item: any = null;

  constructor(
    private route: ActivatedRoute,
    private itemService: ItemService
  ) {}

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('itemId');
    if (id) {
      const { data } = await this.itemService.getItem(id);
      this.item = data;
    }
  }
}