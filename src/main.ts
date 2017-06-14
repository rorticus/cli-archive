import {Command, Helper} from '@dojo/cli/interfaces';
import {Argv} from "yargs";

const targz = require('targz');

interface ArchiveArgs extends Argv {
    output: string;
}

const command: Command = {
    description: 'Compress built files into a .tar.gz file',
    register: options => {
        options('output', {
            describe: 'The name of the file to output to',
            type: 'string'
        });
    },
    run(helper: Helper, args: ArchiveArgs) {
        // get all the files from the dist directory
        const {output: outputFile} = args;

        if (!outputFile) {
            throw new Error('Output file cannot be empty.');
        }

        return new Promise((resolve, reject) => {
            targz.compress({
                src: './dist',
                dest: outputFile
            }, (err: string) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }
};

export default command;
