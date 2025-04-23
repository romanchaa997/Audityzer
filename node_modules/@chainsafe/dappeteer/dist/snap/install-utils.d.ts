/// <reference types="node" />
/// <reference types="node" />
import http from "http";
import { AddressInfo } from "net";
export declare function toUrl(address: AddressInfo | string): string;
export declare function startSnapServer(snapDist: string): Promise<http.Server>;
