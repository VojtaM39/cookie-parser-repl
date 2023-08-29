import { Command } from './command.js';

export class UndoCommand extends Command {
    protected _hasUndo: boolean = false;

    public execute(): void {
        const lastCommand = this._commandStack.pop();
        if (lastCommand) {
            lastCommand.undo();
            this._callback(null, 'Undoing last command');
        } else {
            this._callback(null, 'Nothing to undo');
        }
    }
    
    public undo(): void {
        throw new Error('Undo not supported');
    }
}

