import { Component, Attributes, createNode, generateHTMLElementId } from "@alumis/observables/src/JSX";
createNode;
import { MDCSelect } from "@material/select";
import { Observable } from "@alumis/observables/src/Observable";

export class Select extends Component<HTMLDivElement> {

    constructor(attrs: SelectAttributes, children: any[]) {

        super();

        if (attrs) {

            var theme = attrs.theme;
            var label = attrs.label;

            delete attrs.theme;
            delete attrs.label;
        }

        let selectedTextId = generateHTMLElementId(), labelId = generateHTMLElementId();

        this.node =
            <div class="mdc-select">
                <input type="hidden" name="enhanced-select" />
                <i class="mdc-select__dropdown-icon"></i>
                <div id={selectedTextId} class="mdc-select__selected-text" role="button" aria-haspopup="listbox" aria-labelledby={`${selectedTextId} ${labelId}`}>Vegetables</div>
                <div class="mdc-select__menu mdc-menu mdc-menu-surface" role="listbox">
                    <ul class="mdc-list">
                        {children}
                    </ul>
                </div>
            </div>;

        if (theme === SelectTheme.Outlined) {
            this.node.classList.add("mdc-select--outlined");
            this.node.appendChild(
                <div class="mdc-notched-outline">
                    <div class="mdc-notched-outline__leading"></div>
                    <div class="mdc-notched-outline__notch">
                        <span id={labelId} class="mdc-floating-label mdc-floating-label--float-above">{label}</span>
                    </div>
                    <div class="mdc-notched-outline__trailing"></div>
                </div>);
        }

        else {
            this.node.appendChild(<span id={labelId} class="mdc-floating-label mdc-floating-label--float-above">{label}</span>);
            this.node.appendChild(<div class="mdc-line-ripple"></div>);
        }

        MDCSelect.attachTo(this.node);
    }
}

export interface SelectAttributes extends Attributes {
    theme?: SelectTheme;
    label: any | Observable<any> | (() => any);
}

export enum SelectTheme {

    Filled,
    Outlined
}