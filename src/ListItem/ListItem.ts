import { Component, Attributes, createNode, appendCleanCallback } from "@alumis/observables/src/JSX";
import "./_list-item.scss";

export class ListItem extends Component<HTMLLIElement> {

    constructor(attrs: ListItemAttributes, children: any[]) {

        super();

        (this.node = <HTMLLIElement>createNode("li", attrs, children)).classList.add("mdc-list-item");
    }
}

export interface ListItemAttributes extends Attributes {

}