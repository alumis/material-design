import { Component, Attributes, createNode } from "@alumis/observables/src/JSX";
createNode;
import { ListItem, ListItemAttributes } from "../ListItem/ListItem";
import { MDCMenu } from "@material/menu";

const menu = new MDCMenu(document.querySelector('.mdc-menu'));
menu.open = true;

export class Menu extends Component<HTMLDivElement> {

  constructor(attrs: MenuAttributes, children: any[]) {

    super();

     this.node =
      <div class="mdc-menu mdc-menu-surface">
        <ul class="mdc-list" role="menu" aria-hidden="true" aria-orientation="vertical" tabindex="-1">
          {children}
        </ul>
      </div>;

      this._mdcMenu = new MDCMenu(this.node);
  }

  private _mdcMenu: MDCMenu;

  get open() {
    return this._mdcMenu.open;
  }

  set open(value: boolean) {
    this._mdcMenu.open = value;
  }

  toggle() {
    this.open = !this.open;
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