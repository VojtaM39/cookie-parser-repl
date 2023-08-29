import clipboard from 'clipboardy';
import { Command } from './command.js';

export class CopyCommand extends Command {
    protected _hasUndo: boolean = false;

    public execute(): void {
        const cookieString = this._cookieParser.getCookieString();
        clipboard.writeSync(cookieString);
        this._callback(null, 'Cookie copied to clipboard');
    }
    
    public undo(): void {
        throw new Error('Undo not supported');
    }
}
