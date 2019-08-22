import { ListItem, ListItemAttributes } from "../ListItem/ListItem";

export class SelectItem extends ListItem {
    constructor(attrs: SelectItemAttributes, children: any[]) {
        super(attrs, children);
        this.node.setAttribute("role", "option");
    }
}


export interface SelectItemAttributes extends ListItemAttributes {

}