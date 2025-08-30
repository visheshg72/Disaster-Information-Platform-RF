import { Component, HostListener, OnInit } from '@angular/core';
import { NewsService } from 'src/app/news.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  featuredNews: any[] = [];
  bulletinNews: any[] = [];
  trendingNews: any[] = [];
  globalNews: any[] = [];
  knowledgeHub: any[] = [];


  
visibleBulletins: any[] = []; 
bulletinPage: number = 1;
itemsPerPage: number = 30;
bulletinLoadIndex: number = 0;

visibleTrending: any[] = [];
TrendingPage: number = 1;

visibleKnowledgeHub: any[] = [];
KnowledgeHubPage: number = 1;

visibleGlobalNews: any[] = [];
GlobalNewsPage: number = 1;

  menuItems = [
    { id: 'featured-news', label: 'Featured' },
    { id: 'bulletin-news', label: 'Bulletin' },
    { id: 'trending-news', label: 'Trending' },
    { id: 'global-news', label: 'Global' },
    { id: 'knowledge-hub', label: 'Knowledge' }
  ];

  activeSection = 'featured-news';


constructor(private newsService: NewsService) {}

allFeaturedNews: any[] = [];
newsLoadIndex: number = 0;
initialLoadCount: number = 9;
loadMoreCount: number = 9;


ngOnInit(): void {
  this.loadAllNews();
}

scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

@HostListener('window:scroll', [])
  onWindowScroll() {
    let currentSection = '';
    this.menuItems.forEach(item => {
      const element = document.getElementById(item.id);
      if (element) {
        const rect = element.getBoundingClientRect();
        if (rect.top <= 80 && rect.bottom >= 80) {
          currentSection = item.id;
        }
      }
    });
    if (currentSection) {
      this.activeSection = currentSection;
    }
  }

getTruncatedTitle(title: string, maxLength: number = 60): string {
  if (title.length > maxLength) {
    return title.substring(0, maxLength) + '...';
  }
  return title;
}

loadAllNews(): void {
  this.newsService.getFeaturedNews().subscribe(data => {
    this.allFeaturedNews = data.featured_news || [];
    this.featuredNews = this.allFeaturedNews.slice(0, this.initialLoadCount);
    this.newsLoadIndex = this.initialLoadCount;
  });

  this.newsService.getBulletinNews().subscribe(data => {
    this.bulletinNews = data.alerts || [];
    this.loadMoreBulletins(); // Load initial 30
  });

  this.newsService.getTrendingNews().subscribe(data => {
    this.trendingNews = data.trending_news || [];
      this.loadMoreTrending(); // Load initial 30
  });

    this.newsService.getGlobalNews().subscribe(data => {
      this.globalNews = data.global_news || [];
      this.loadMoreGlobal();
    });

    this.newsService.getKnowledgeHub().subscribe(data => {
      this.knowledgeHub = data.knowledge_hub || [];
      this.loadMoreKnowledgeHub();
    });
}

loadMoreBulletins(): void {
  const nextChunk = this.bulletinNews.slice(
    (this.bulletinPage - 1) * this.itemsPerPage,
    this.bulletinPage * this.itemsPerPage
  );
  this.visibleBulletins = [...this.visibleBulletins, ...nextChunk];
  this.bulletinPage++;
}

loadMoreTrending(): void {
  const nextChunk = this.trendingNews.slice(
    (this.TrendingPage - 1) * this.loadMoreCount,
    this.TrendingPage * this.loadMoreCount
  );
  this.visibleTrending = [...this.visibleTrending, ...nextChunk];
  this.TrendingPage++;
}

loadMoreGlobal(): void {
  const nextChunk = this.globalNews.slice(
    (this.GlobalNewsPage - 1) * this.loadMoreCount,
    this.GlobalNewsPage * this.loadMoreCount
  );
  this.visibleGlobalNews = [...this.visibleGlobalNews, ...nextChunk];
  this.GlobalNewsPage++;
}

loadMoreNews(): void {
  const nextIndex = this.newsLoadIndex + this.loadMoreCount;
  const moreNews = this.allFeaturedNews.slice(this.newsLoadIndex, nextIndex);
  this.featuredNews = [...this.featuredNews, ...moreNews];
  this.newsLoadIndex = nextIndex;
}

loadMoreKnowledgeHub(): void {
  const nextChunk = this.knowledgeHub.slice(
    (this.KnowledgeHubPage - 1) * this.loadMoreCount,
    this.KnowledgeHubPage * this.loadMoreCount
  );
  this.visibleKnowledgeHub = [...this.visibleKnowledgeHub, ...nextChunk];
  this.KnowledgeHubPage++;
}


  onImageError(event: Event) {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = 'assets/No-Image.png';
  }

}

