import { Observable, isObservable, co, o } from "@alumis/observables";
import { Component, Attributes, createNode, appendCleanCallback } from "@alumis/observables/src/JSX";
import { MDCRipple } from "@material/ripple";

export class Button extends Component<HTMLButtonElement> {

    constructor(attrs: ButtonAttributes, children: any[]) {

        super();

        if (attrs) {

            var submits = attrs.submits;
            var theme = attrs.theme;

            delete attrs.submits;
            delete attrs.theme;
        }

        (this.node = <HTMLButtonElement>createNode("button", attrs, children)).type = submits ? "submit" : "button";

        this.node.classList.add(Button.styles["mdc-button"]);
        this.ripple = new MDCRipple(this.node);

        if (isObservable(theme)) {
            appendCleanCallback(this.node, (<Observable<any>>theme).subscribeInvoke(this.themeAction).unsubscribeAndRecycle);
            this.themeAsObservable = <Observable<any>>theme;
        }

        else if (typeof theme === "function") {
            let computedObservable = co(theme);
            computedObservable.subscribeInvoke(this.themeAction);
            appendCleanCallback(this.node, computedObservable.dispose);
            this.themeAsObservable = computedObservable;
        }

        else {
            let observable = <Observable<any>>o(theme);
            observable.subscribeInvoke(this.themeAction);
            appendCleanCallback(this.node, observable.dispose);
            this.themeAsObservable = observable;
        }
    }

    ripple: MDCRipple;
    themeAsObservable: Observable<ButtonTheme>;

    themeAction = (newTheme: ButtonTheme, oldTheme: ButtonTheme) => {
        let classes = new Set(getThemeClasses(newTheme));
        for (var c of classes)
            this.node.classList.add(c);
        for (var c of getThemeClasses(oldTheme))
            if (!classes.has(c))
                this.node.classList.remove(c);
    };

    static styles: ButtonStyles;
}

export interface ButtonStyles {

    "mdc-button": string;
    "mdc-button--raised": string;
    "mdc-button--unelevated": string;
    "mdc-button--outlined": string;
    "mdc-button--dense": string;
    "mdc-button__label": string;
    "mdc-button__icon": string;
}

export interface ButtonAttributes extends Attributes {

    submits?: boolean;
    theme?: ButtonTheme | Observable<ButtonTheme> | (() => ButtonTheme);
}

export enum ButtonTheme {

    Raised = 1,
    Unelevated = 2,
    Outlined = 4,
    Dense = 8
}

function* getThemeClasses(theme: ButtonTheme) {

    if (theme & ButtonTheme.Raised)
        yield Button.styles["mdc-button--raised"];
    if (theme & ButtonTheme.Unelevated)
        yield Button.styles["mdc-button--unelevated"];
    if (theme & ButtonTheme.Outlined)
        yield Button.styles["mdc-button--outlined"];
    if (theme & ButtonTheme.Dense)
        yield Button.styles["mdc-button--dense"];
}