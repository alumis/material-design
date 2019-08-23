import { Component, Attributes, createNode } from "@alumis/observables/src/JSX";
createNode;
import { ListItem, ListItemAttributes } from "../ListItem/ListItem";
import { MDCMenu, Corner } from "@material/menu";

export class Menu extends Component<HTMLDivElement> {

  constructor(attrs: MenuAttributes, children: any[]) {

    super();

    if (attrs) {

      var anchor = attrs.anchor;
      var anchorCorner = attrs.anchorCorner;

      delete attrs.anchor;
      delete attrs.anchorCorner;
    }

    this.node =
      <div class="mdc-menu mdc-menu-surface">
        <ul class="mdc-list" role="menu" aria-hidden="true" aria-orientation="vertical" tabindex="-1">
          {children}
        </ul>
      </div>;

    this._mdcMenu = new MDCMenu(this.node);

    if (anchor)
      this.anchor = anchor;

    if (anchorCorner)
      this.anchorCorner = anchorCorner;
  }

  private _mdcMenu: MDCMenu;

  private _anchor: MenuAnchor;
  
  get anchor() { return this._anchor; }
  set anchor(value: MenuAnchor) { this._mdcMenu.setAnchorElement(this.anchor.node); this._anchor = value; }

  set anchorCorner(value: Corner) { this._mdcMenu.setAnchorCorner(value); }

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
  anchor?: MenuAnchor;
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

export class MenuAnchor extends Component<HTMLDivElement> {
  constructor(attrs: Attributes, children: any[]) {
      super();
      this.node = <div class="mdc-menu-surface--anchor">{children}</div>;
  }
}