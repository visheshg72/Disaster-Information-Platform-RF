import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NewsService } from 'src/app/news.service';

@Component({
  selector: 'app-detail-list',
  templateUrl: './detail-list.component.html',
  styleUrls: ['./detail-list.component.css']
})
export class DetailListComponent implements OnInit {
  category: string | null = null;
  loading = true; // to show spinner
  errorMessage = ''; // in case of error
  visibleTrending: any[] = [];
  TrendingPage: number = 1;
  trendingNews: any[] = [];
  itemsPerPage: number = 30;
  initialLoadCount: number = 9;
  loadMoreCount: number = 9;

  constructor(
    private route: ActivatedRoute,
    private service: NewsService
  ) { }

  ngOnInit(): void {
    // Get category from URL
    this.category = this.route.snapshot.paramMap.get('category');
    console.log('Category:', this.category);

    if (this.category) {
      this.fetchDetails(this.category);
    }
  }

  fetchDetails(category: string) {
    this.loading = true;
    this.service.getCategoryDetails(category).subscribe({
      next: (data) => {
        console.log('API Response:', data);
        this.loading = false;
        this.trendingNews = data.search_results || [];
        this.loadMoreTrending(); // Load initial 30
      },
      error: (err) => {
        console.error('API Error:', err);
        this.errorMessage = 'Failed to load details';
        this.loading = false;
      }
    });
  }

  loadMoreTrending(): void {
    const nextChunk = this.trendingNews.slice(
      (this.TrendingPage - 1) * this.loadMoreCount,
      this.TrendingPage * this.loadMoreCount
    );
    this.visibleTrending = [...this.visibleTrending, ...nextChunk];
    this.TrendingPage++;
  }

  onImageError(event: Event) {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = 'assets/No-Image.png';
  }

  getTruncatedTitle(title: string, maxLength: number = 60): string {
    if (title.length > maxLength) {
      return title.substring(0, maxLength) + '...';
    }
    return title;
  }
}
