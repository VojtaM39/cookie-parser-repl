import { CookieParser } from '../cookie-parser.js';

export abstract class Command {
    protected abstract _hasUndo: boolean;
    protected _callback: Function;
    protected _cookieParser: CookieParser;
    protected _args: string[];
    protected _commandStack: Command[];

    constructor(callback: Function, cookieParser: CookieParser, args: string[], commandStack: Command[]) {
        this._callback = callback;
        this._cookieParser = cookieParser;
        this._args = args;
        this._commandStack = commandStack;
    }

    public abstract execute(): void;
    public abstract undo(): void;

    public hasUndo(): boolean {
        return this._hasUndo;
    }
}
