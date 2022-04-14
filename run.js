const util = require('util');
// import { promisify } from 'util';
const exec = util.promisify(require('child_process').exec);
const path = require('path');
const chalk = require('chalk');

async function main() {
    const filename = process.argv[2];
    if(!filename) {
        console.log("please provide a filename"); 
        return;
    }
    if(filename.split('.').pop() !== "gf"){
        console.log("please provide a .gf filename"); 
        return;
    }

    await myExec(`node parse.js ${filename}`);
    await myExec(`node generator.js ${filename}.ast`);
    const baseDir = path.dirname(filename);
    const jsFilename = path.join(baseDir, path.basename(filename, '.gf') + '.js');
    await myExec(`node ${jsFilename}`, 'green');
}

async function myExec(command, outputStyle) {
    if (!outputStyle) {
        outputStyle = 'dim';
    }
    console.log(chalk.dim(command));
    const results = await exec(command);
    process.stdout.write(chalk[outputStyle](results.stdout));
    const errLines = results.stderr.split("\n");
    for (let errLine of errLines) {
        if (errLine.match(/ExperimentalWarning: The fs.promises API is experimental/)) {
            continue;
        }
        process.stdout.write(chalk.magenta(errLine));
    }
}

main().catch(err => console.log(chalk.red(err.message)));