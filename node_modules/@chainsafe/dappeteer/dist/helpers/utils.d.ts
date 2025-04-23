export declare function retry<R>(fn: () => Promise<R>, count: number): Promise<R>;
export declare function getDappateerPath(): string;
export declare function copyUserDataFiles(from: string, to: string): void;
