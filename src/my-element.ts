import { LitElement,html,css } from "lit";
import { customElement,property,state } from "lit/decorators.js";

String.prototype.formatUnicorn = function () {
    var str = this.toString();
    if (arguments.length) {
        var t = typeof arguments[0];
        var key;
        var args = ("string" === t || "number" === t) ?
            Array.prototype.slice.call(arguments)
            : arguments[0];

        for (key in args) {
            str = str.replace(new RegExp("\\{" + key + "\\}", "gi"), args[key]);
        }
    }

    return str;
};

@customElement("inputbox")
export class InputBoxElement extends LitElement {
    render() {
        return html`
            <input type="text" id="inputbox" placeholder="Search anything" autocomplete="off" slot="sgn-input" @input=${this.handleInput} />
        `;
    }

    handleInput(event: Event) {
        const inputElement = event.target as HTMLInputElement;
        const sgnbox = document.getElementById('sgnbox') as AalamSuggestionBoxElement;
        const data = [
          { user: "Hello" },
          { user: "hai" },
          { user: "String" }
        ];
        const formattedTemplate = "User: {user}";
        sgnbox.setSuggestion(data, "user", data.length > 15 ? true : false, formattedTemplate);
    }
}

@customElement("sgnitem")
export class SuggestionItemElement extends LitElement {
    render() {
        return html`
            <div id="sgnitem" slot="sgnitem" @click=${this.loadMoreEntries}>Load More...</div>
        `;
    }

    loadMoreEntries() {
        const sgnbox = document.getElementById('sgnbox') as AalamSuggestionBoxElement;
        const data = [
          { suggestion: "Aalam" },
          { suggestion: "product based company" },
          { suggestion: "Happy to work" }
        ];
        const formattedTemplate = "Suggestion: {suggestion}";
        sgnbox.appendSuggestion(data, "suggestion", data.length > 15 ? true : false, formattedTemplate);
    }
}
