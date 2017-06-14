(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const targz = require('targz');
    const command = {
        description: 'Compress built files into a .tar.gz file',
        register: options => {
            options('output', {
                describe: 'The name of the file to output to',
                type: 'string'
            });
        },
        run(helper, args) {
            // get all the files from the dist directory
            const { output: outputFile } = args;
            if (!outputFile) {
                throw new Error('Output file cannot be empty.');
            }
            return new Promise((resolve, reject) => {
                targz.compress({
                    src: './dist',
                    dest: outputFile
                }, (err) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve();
                    }
                });
            });
        }
    };
    exports.default = command;
});
//# sourceMappingURL=main.js.map