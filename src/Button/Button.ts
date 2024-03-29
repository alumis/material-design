import { Observable, isObservable, co, o } from "@alumis/observables/src/Observable";
import { Component, Attributes, createNode, appendCleanCallback } from "@alumis/observables/src/JSX";
import { MDCRipple } from '@material/ripple';

export class Button extends Component<HTMLButtonElement> {

    constructor(attrs: ButtonAttributes, children: any[]) {

        super();

        if (attrs) {

            var submits = attrs.submits;
            var theme = attrs.theme;

            delete attrs.submits;
            delete attrs.theme;
        }

        let label = createNode("span", null, children);

        label.classList.add("mdc-button__label");

        (this.node = <HTMLButtonElement>createNode("button", attrs, label)).type = submits ? "submit" : "button";

        this.node.classList.add("mdc-button");
        MDCRipple.attachTo(this.node);

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

    themeAsObservable: Observable<ButtonTheme>;

    themeAction = (newTheme: ButtonTheme, oldTheme: ButtonTheme) => {
        let classes = new Set(getThemeClasses(newTheme));
        for (var c of classes)
            this.node.classList.add(c);
        for (var c of getThemeClasses(oldTheme))
            if (!classes.has(c))
                this.node.classList.remove(c);
    };
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
        yield "mdc-button--raised";
    if (theme & ButtonTheme.Unelevated)
        yield "mdc-button--unelevated";
    if (theme & ButtonTheme.Outlined)
        yield "mdc-button--outlined";
    if (theme & ButtonTheme.Dense)
        yield "mdc-button--dense";
}