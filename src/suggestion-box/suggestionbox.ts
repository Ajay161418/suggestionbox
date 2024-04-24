import { LitElement, html, css } from 'lit';
import { customElement, query, property } from 'lit/decorators.js';

@customElement('suggestion-box')
export class SuggestionBox extends LitElement {
  @property({ type: Array }) suggestionsData: string[] = [
    // Your suggestions data here
  ];

  @property({ type: Number }) visibleSuggestions: number = 5;
  @property({ type: Number }) selectedSuggestionIndex: number = -1;
  @property({ type: String }) searchText: string = '';

  @query('input') input!: HTMLInputElement;
  @query('.suggestions') suggestions!: HTMLElement;

  static styles = css`
    /* Your component's styles here */
  `;

  render() {
    return html`
      <div class="suggestion-box">
        <input
          type="text"
          .value=${this.searchText}
          @input=${this.handleInput}
          @keydown=${this.handleKeyDown}
          placeholder="Type something..."
        >
        <div class="suggestions">
          ${this.filteredSuggestions.map((suggestion, index) => html`
            <div
              class="suggestion ${index === this.selectedSuggestionIndex ? 'selected' : ''}"
              @click=${() => this.handleSuggestionClick(index)}
            >
              ${suggestion}
            </div>
          `)}
          ${this.hasMoreSuggestions ? html`
            <div class="load-more" @click=${this.handleLoadMore}>Load More</div>
          ` : ''}
        </div>
      </div>
    `;
  }

  private get filteredSuggestions() {
    const query = this.searchText.toLowerCase();
    return this.suggestionsData.filter(suggestion => suggestion.toLowerCase().includes(query)).slice(0, this.visibleSuggestions);
  }

  private get hasMoreSuggestions() {
    return this.visibleSuggestions < this.filteredSuggestions.length;
  }

  private handleInput(event: InputEvent) {
    this.searchText = (event.target as HTMLInputElement).value;
    this.selectedSuggestionIndex = -1;
  }

  private handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
      event.preventDefault();
      const maxIndex = this.filteredSuggestions.length - 1;
      this.selectedSuggestionIndex = (this.selectedSuggestionIndex + (event.key === 'ArrowUp' ? -1 : 1) + this.filteredSuggestions.length) % this.filteredSuggestions.length;
    } else if (event.key === 'Enter' && this.selectedSuggestionIndex !== -1) {
      this.input.value = this.filteredSuggestions[this.selectedSuggestionIndex];
      this.searchText = this.input.value;
      this.selectedSuggestionIndex = -1;
    }
  }

  private handleSuggestionClick(index: number) {
    this.input.value = this.filteredSuggestions[index];
    this.searchText = this.input.value;
    this.selectedSuggestionIndex = -1;
  }

  private handleLoadMore() {
    this.visibleSuggestions += 5;
  }
}
