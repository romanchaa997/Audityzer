import { ElementHandle } from "puppeteer";
import { DappeteerElementHandle } from "../element";
export declare class DPuppeteerElementHandle implements DappeteerElementHandle<ElementHandle<Element>> {
    protected element: ElementHandle<Element>;
    constructor(element: ElementHandle<Element>);
    $$(selector: string): Promise<DappeteerElementHandle[]>;
    hover(): Promise<void>;
    evaluate(fn: (e: HTMLElement) => void | Promise<void>): Promise<void>;
    getSource(): ElementHandle<HTMLElement>;
    type(value: string): Promise<void>;
    click(): Promise<void>;
}
