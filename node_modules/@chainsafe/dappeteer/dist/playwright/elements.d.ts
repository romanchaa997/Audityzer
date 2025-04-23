import { ElementHandle } from "playwright";
import { DappeteerElementHandle } from "../element";
export declare class DPlaywrightElementHandle implements DappeteerElementHandle<ElementHandle<HTMLElement>> {
    protected element: ElementHandle<HTMLElement>;
    constructor(element: ElementHandle<HTMLElement>);
    $$(selector: string): Promise<DappeteerElementHandle<unknown, HTMLElement>[]>;
    hover(): Promise<void>;
    evaluate(fn: (e: HTMLElement) => void | Promise<void>): Promise<void>;
    getSource(): ElementHandle<HTMLElement>;
    type(value: string): Promise<void>;
    click(): Promise<void>;
}
