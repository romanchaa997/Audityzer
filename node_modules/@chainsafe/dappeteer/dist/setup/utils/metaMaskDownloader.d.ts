export declare const defaultDirectory: string;
export declare type Path = string | {
    download: string;
    extract: string;
};
declare const _default: (version: string, options?: {
    location?: Path;
    flask?: boolean;
}) => Promise<string>;
export default _default;
