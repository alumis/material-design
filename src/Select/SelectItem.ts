import { ListItem, ListItemAttributes } from "../ListItem/ListItem";
import { generateHTMLElementId } from "@alumis/observables/src/JSX";

export class SelectItem extends ListItem {
    constructor(attrs: SelectItemAttributes, children: any[]) {
        super(attrs, children);
        this.node.setAttribute("role", "option");
        this.node.setAttribute("aria-selected", "false");
        this.node.tabIndex = -1;
        this.node.setAttribute("data-value", generateHTMLElementId());
    }
}


export interface SelectItemAttributes extends ListItemAttributes {
    value;
}