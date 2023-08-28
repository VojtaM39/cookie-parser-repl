#! /usr/bin/env node

import repl from 'repl';
import { Context } from 'vm';
// @ts-ignore
import { parse } from 'shell-quote';
import clipboard from 'clipboardy';
import { CookieParser } from './cookie-parser.js';
import { COMMAND_TYPE } from './constants.js';
import { completer } from './tools.js';

const initialCookie = process.argv[2] ?? '';

const { context } = repl.start({ prompt: 'cparse =>  ', eval: handlePrompt, completer: (line: string) => completer(line, cookieParser) });

const cookieParser = new CookieParser(initialCookie ?? '', context);

function handlePrompt(input: string, _context: Context, _file: string, callback: Function): void {
    const args = parse(input);
    const command = args[0];

    if (!Object.values(COMMAND_TYPE).includes(command)) {
        callback(null, 'Unknown command');
        return;
    }

    if (command === COMMAND_TYPE.SET) {
        if (args.length < 3) {
            callback(null, 'Invalid set command');
            return;
        }

        cookieParser.setCookie(args[1], args[2]);
        callback(null, 'Cookie set');
        return;
    }

    if (command === COMMAND_TYPE.GET) {
        const cookieString = cookieParser.getCookieString();
        callback(null, cookieString);
        return;
    }

    if (command === COMMAND_TYPE.REMOVE) {
        if (args.length < 2) {
            callback(null, 'Invalid remove command');
            return;
        }

        cookieParser.removeCookie(args[1]);
        callback(null, 'Cookie removed');
        return;
    }

    if (command === COMMAND_TYPE.COPY) {
        const cookieString = cookieParser.getCookieString();
        clipboard.writeSync(cookieString);
        callback(null, 'Cookie copied to clipboard');
        return;
    }

    if (command === COMMAND_TYPE.LOG) {
        const state = cookieParser.getState();
        callback(null, state);
        return;
    }
};

