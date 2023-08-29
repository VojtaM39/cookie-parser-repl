import { Command } from './command.js';

export class GetCommand extends Command {
    protected _hasUndo: boolean = false;

    public execute(): void {
        const cookieString = this._cookieParser.getCookieString();
        this._callback(null, cookieString);
    }
    
    public undo(): void {
        throw new Error('Undo not supported');
    }
}
