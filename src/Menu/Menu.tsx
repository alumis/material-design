import { Component, Attributes, createNode } from "@alumis/observables/src/JSX";
createNode;
import { ListItem, ListItemAttributes } from "../ListItem/ListItem";

export class Menu extends Component<HTMLDivElement> {

  constructor(attrs: MenuAttributes, children: any[]) {

    super();

     this.node =
      <div class="mdc-menu mdc-menu-surface">
        <ul class="mdc-list" role="menu" aria-hidden="true" aria-orientation="vertical" tabindex="-1">
          {children}
        </ul>
      </div>;
  }
}

export interface MenuAttributes extends Attributes {
}

export class MenuItem extends ListItem {
  constructor(attrs: MenuItemAttributes, children: any[]) {
    super(attrs, children);
    this.node.setAttribute("role", "menuitem");
  }
}

export interface MenuItemAttributes extends ListItemAttributes {
  value;
}