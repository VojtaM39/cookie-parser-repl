import { Command } from './command.js';

export class LogCommand extends Command {
    protected _hasUndo: boolean = false;

    public execute(): void {
        const state = this._cookieParser.getState();
        this._callback(null, state);
    }
    
    public undo(): void {
        throw new Error('Undo not supported');
    }
}
