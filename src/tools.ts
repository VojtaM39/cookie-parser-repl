import { CompleterResult } from 'readline';
// @ts-ignore
import { parse } from 'shell-quote';
import { CookieParser } from './cookie-parser.js';
import { COMMAND_TYPE } from './constants.js';

export const completer = (line: string, cookieParser: CookieParser): CompleterResult => {
    const splitLine = line.split(' ');

    // Autocomplete for command name
    if (splitLine.length === 1) {
        return [getAutocompleteFromValues(line, Object.values(COMMAND_TYPE)), line];
    }

    // Autocomplete for cookie key
    const isCookieManipulationCommand = [COMMAND_TYPE.SET, COMMAND_TYPE.REMOVE].includes(splitLine[0]);
    const isWritingKey = splitLine.length === 2;

    if (isCookieManipulationCommand && isWritingKey) {
        return [getAutocompleteFromValues(splitLine[1], cookieParser.getAllKeys()), splitLine[1]];
    }

    return [[], line];
}

const getAutocompleteFromValues = (current: string, values: string[]): string[] => {
    return values.filter((value) => value.startsWith(current));
};
