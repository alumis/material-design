import { Component, Attributes, createNode } from "@alumis/observables/src/JSX";
createNode;
import { ListItem, ListItemAttributes } from "../ListItem/ListItem";
import { MDCMenu, Corner } from "@material/menu";
import { Button } from "../Button/Button";

export class ButtonMenu extends Component<HTMLDivElement> {

  constructor(attrs: ButtonMenuAttributes, children: any[]) {

    super();

    if (attrs) {

      var button = attrs.button;
      var anchorCorner = attrs.anchorCorner;

      delete attrs.button;
      delete attrs.anchorCorner;
    }

    this.node =
      <div class="mdc-menu-surface--anchor">
        {button}
        <div class="mdc-menu mdc-menu-surface">
          <ul class="mdc-list" role="menu" aria-hidden="true" aria-orientation="vertical" tabindex="-1">
            {children}
          </ul>
        </div>
      </div>;

    this._mdcMenu = new MDCMenu(this.node);

    if (anchorCorner)
      this._mdcMenu.setAnchorCorner(anchorCorner);
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

export interface ButtonMenuAttributes extends Attributes {
  button: Button;
  anchorCorner?: Corner;
}

export class MenuItem extends ListItem {
  constructor(attrs: MenuItemAttributes, children: any[]) {
    super(attrs, children);
    this.node.setAttribute("role", "menuitem");
  }
}

export interface MenuItemAttributes extends ListItemAttributes {
  value?;
}

export class SelectableMenuItemGroup extends Component<HTMLOListElement> {
  constructor(attrs: ListItemAttributes, children: any[]) {
    super();
    this.node = <ul class="mdc-menu__selection-group">{children}</ul>;
  }
}

export class SelectableMenuItem extends MenuItem {
  constructor(attrs: MenuItemAttributes, children: any[]) {
    super(attrs, children);
    this.node.insertBefore(
      <span class="mdc-menu__selection-group-icon">
        <i class="material-icons">check</i>
      </span>,
      this.node.firstChild);
  }
}