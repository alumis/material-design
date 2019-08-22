import { Component, Attributes, createNode } from "@alumis/observables/src/JSX";

export class ListItem extends Component<HTMLLIElement> {

    constructor(attrs: ListItemAttributes, children: any[]) {

        super();

        (this.node = <HTMLLIElement>createNode("li", attrs, children)).classList.add("mdc-list-item");
    }
}

export interface ListItemAttributes extends Attributes {

}