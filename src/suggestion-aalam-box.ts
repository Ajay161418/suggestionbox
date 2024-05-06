import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("aalam-sgn-box")
export class AalamSuggestionBoxElement extends LitElement {

    @property({ type: Array, attribute: false })
    result: string[] = [];

    @property()
    index_value: number = 0;

    @property({ type: Function })
    loadMoreEntries;

    render() {
        const template = `
            <ul>
                {items}
            </ul>
            <slot name="sgnitem" @click=${this.loadMoreEntries}></slot>
        `;

        const items = this.result.map((data) => {
            return `<li>${data}</li>`;
        }).join('');

        return html`
            <slot name="sgn-input"></slot>
            ${template.formatUnicorn({ items })}
        `;
    }

    setSuggestion(suggestions: object[], suggestion: string, highlight?: string, hasmore?: boolean) {
        this.result = [];
        this.index_value = 0;
        suggestions.forEach((data) => {
            this.result[this.index_value] = data[suggestion];
            this.index_value += 1;
        });
    }

    appendSuggestion(suggestions: object[], suggestion: string, highlight?: string, hasMore?: boolean) {
        this.result = [...this.result];
        suggestions.forEach((data) => {
            this.result[this.index_value] = data[suggestion];
            this.index_value += 1;
        });
    }
}

String.prototype.formatUnicorn = function () {
    let str = this.toString();
    if (arguments.length) {
        const t = typeof arguments[0];
        let key;
        const args = ("string" === t || "number" === t) ?
            Array.prototype.slice.call(arguments)
            : arguments[0];

        for (key in args) {
            str = str.replace(new RegExp("\\{" + key + "\\}", "gi"), args[key]);
        }
    }

    return str;
};
