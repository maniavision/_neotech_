import { Component, inject } from '@angular/core';
import { Language, TranslationService } from '../../../core/services/translation.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-language-switcher',
  imports: [CommonModule],
  templateUrl: './language-switcher.html',
  styleUrl: './language-switcher.scss'
})
export class LanguageSwitcher {
  private translationService = inject(TranslationService);
  
  isDropdownOpen = false;
  currentLanguage = 'en';
  availableLanguages: Language[] = [];

  constructor() {
    this.availableLanguages = this.translationService.availableLanguages;
    this.translationService.currentLanguage$.subscribe(lang => {
      this.currentLanguage = lang;
    });
  }

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  closeDropdown(): void {
    this.isDropdownOpen = false;
  }

  selectLanguage(languageCode: string): void {
    this.translationService.setLanguage(languageCode);
    this.closeDropdown();
  }

  getCurrentLanguage(): Language | undefined {
    return this.availableLanguages.find(lang => lang.code === this.currentLanguage);
  }
}
