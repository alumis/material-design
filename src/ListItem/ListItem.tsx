import { Component, Attributes, createNode, bindClass, appendCleanCallback } from "@alumis/observables/src/JSX";
createNode;
import { MDCRipple } from '@material/ripple';
import { Observable } from "@alumis/observables/src/Observable";

export class ListItem extends Component<HTMLLIElement> {

    constructor(attrs: ListItemAttributes, children: any[]) {

        super();

        if (attrs) {

            var activated = attrs.activated;

            delete attrs.activated;
        }

        MDCRipple.attachTo(this.node = <li class="mdc-list-item"><span class="mdc-list-item__text">{children}</span></li>);

        if (typeof activated !== "undefined")
            bindClass(this.node, "mdc-list-item--activated", activated);
    }
}

export interface ListItemAttributes extends Attributes {
    activated?: boolean | Observable<boolean> | (() => boolean);
}