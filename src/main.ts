#! /usr/bin/env node

import repl from 'repl';
import { Context } from 'vm';
// @ts-ignore
import { parse } from 'shell-quote';
import { CookieParser } from './cookie-parser.js';
import { completer } from './tools.js';
import { CommandFactory } from './commands/command-factory.js';
import { Command } from './commands/command.js';

const initialCookie = process.argv[2] ?? '';

const { context } = repl.start({ prompt: 'cparse =>  ', eval: handlePrompt, completer: (line: string) => completer(line, cookieParser) });

const cookieParser = new CookieParser(initialCookie ?? '', context);
const commandStack: Command[] = [];

function handlePrompt(input: string, _context: Context, _file: string, callback: Function): void {
    const args = parse(input);
    const command = CommandFactory.getCommand(callback, cookieParser, args, commandStack);

    if (!command) {
        callback(null, 'Unknown command');
        return;
    }

    command.execute();

    if (command.hasUndo()) {
        commandStack.push(command);
    }
};

