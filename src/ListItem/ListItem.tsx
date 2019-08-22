import { Component, Attributes, createNode } from "@alumis/observables/src/JSX";
createNode;

export class ListItem extends Component<HTMLLIElement> {

    constructor(attrs: ListItemAttributes, children: any[]) {

        super();

        this.node = <li class="mdc-list-item"><span class="mdc-list-item__text">{children}</span></li>;
    }
}

export interface ListItemAttributes extends Attributes {

}