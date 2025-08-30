import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

})
export class AppComponent {
  title = 'Disaster-Information-Platform';
  isEnglish = false; // Default to English
  selectedLanguage = 'HI';

  searchQuery: string = '';
  constructor(private router: Router) { }

  onSearch() {
    if (this.searchQuery.trim()) {
      const url = `${window.location.origin}/details/${encodeURIComponent(this.searchQuery.trim())}`;
      window.open(url, '_blank'); // open in a new tab
    }
  }

 toggleLanguage() {
  this.selectedLanguage = this.isEnglish ? 'HI' : 'EN';
  console.log('Selected Language:', this.selectedLanguage);
}
}
