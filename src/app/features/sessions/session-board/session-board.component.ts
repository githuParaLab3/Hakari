import { Component, OnInit, Input, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SessionBoardService } from '../session-board.service';
import { ModalComponent } from '../../../shared/components/modal/modal.component';

@Component({
  selector: 'app-session-board',
  standalone: true,
  imports: [CommonModule, FormsModule, ModalComponent],
  templateUrl: './session-board.component.html',
  styleUrls: ['./session-board.component.css']
})
export class SessionBoardComponent implements OnInit {
  @Input() sessionId!: string;
  nodes: any[] = [];
  
  isDragging = false;
  draggedNode: any = null;
  offsetX = 0;
  offsetY = 0;

  isModalOpen = false;
  formData = { title: '' };

  constructor(private boardService: SessionBoardService) {}

  async ngOnInit() {
    if (this.sessionId) {
      await this.loadNodes();
    }
  }

  async loadNodes() {
    const { data } = await this.boardService.getNodes(this.sessionId);
    if (data) {
      this.nodes = data;
    }
  }

  openModal() {
    this.formData = { title: '' };
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  async confirmModal() {
    if (!this.formData.title.trim()) return;
    const { data } = await this.boardService.saveNode(this.sessionId, this.formData.title, 50, 50);
    if (data) {
      this.nodes.push(data[0]);
    }
    this.closeModal();
  }

  onMouseDown(event: MouseEvent, node: any) {
    this.isDragging = true;
    this.draggedNode = node;
    this.offsetX = event.clientX - node.pos_x;
    this.offsetY = event.clientY - node.pos_y;
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (this.isDragging && this.draggedNode) {
      this.draggedNode.pos_x = event.clientX - this.offsetX;
      this.draggedNode.pos_y = event.clientY - this.offsetY;
    }
  }

  @HostListener('document:mouseup')
  async onMouseUp() {
    if (this.isDragging && this.draggedNode) {
      await this.boardService.updateNodePosition(
        this.draggedNode.id,
        this.draggedNode.pos_x,
        this.draggedNode.pos_y
      );
      this.isDragging = false;
      this.draggedNode = null;
    }
  }
}