import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Subscription, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ContextService } from '../../context.service';
import { ThemeService } from '../../theme.service';
import { GlobalSearchService, SearchResult } from '../../global-search.service';

@Component({
  selector: 'app-campaign-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './campaign-layout.component.html',
  styleUrls: ['./campaign-layout.component.css']
})
export class CampaignLayoutComponent implements OnInit, OnDestroy {
  isSidePanelOpen = false;
  isSidebarCollapsed = false;
  activeContext: any = null;
  private contextSub!: Subscription;

  campaignId: string | null = null;
  globalSearchTerm: string = '';
  searchResults: SearchResult[] = [];
  isSearching = false;
  private searchSubject = new Subject<string>();
  private searchSub!: Subscription;

  constructor(
    private contextService: ContextService,
    public themeService: ThemeService,
    private globalSearch: GlobalSearchService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.campaignId = this.route.snapshot.firstChild?.paramMap.get('id') || null;

    this.contextSub = this.contextService.activeContext$.subscribe(context => {
      this.activeContext = context;
      if (context) {
        this.isSidePanelOpen = true;
        this.globalSearchTerm = '';
        this.searchResults = [];
      }
    });

    this.searchSub = this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(async (term) => {
      if (!this.campaignId || term.length < 2) {
        this.searchResults = [];
        this.isSearching = false;
        return;
      }
      this.isSearching = true;
      this.searchResults = await this.globalSearch.searchAll(this.campaignId, term);
      this.isSearching = false;
    });
  }

  ngOnDestroy() {
    if (this.contextSub) this.contextSub.unsubscribe();
    if (this.searchSub) this.searchSub.unsubscribe();
  }

  onSearchInput() {
    if (this.globalSearchTerm.length > 0) {
      this.isSidePanelOpen = true;
      this.activeContext = null;
    }
    this.searchSubject.next(this.globalSearchTerm);
  }

  openSearchResult(result: SearchResult) {
    this.globalSearchTerm = '';
    this.searchResults = [];
    this.contextService.setContext({ type: result.type, data: result.data });
  }

  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }

  toggleSidePanel() {
    this.isSidePanelOpen = !this.isSidePanelOpen;
  }

  closePanel() {
    this.isSidePanelOpen = false;
    this.globalSearchTerm = '';
    this.searchResults = [];
    this.contextService.clearContext();
  }
}