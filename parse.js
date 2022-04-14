
const nearley = require("nearley");
const { parse } = require("path");
const grammar = require("./grammar.js");
const fs = require("fs").promises;
const path = require("path");

async function main(){
    const filename = process.argv[2];
    
    const code =( await  fs.readFile(filename)).toString();
    const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));

    // Parse something!
    parser.feed(code);

    if(parser.results.length > 1){
        console.warn("parse tree generates mulitple results");
        console.log(parser.results);
    }
    else if(parser.results.length == 0){
        console.error("unexpected end of file");
        process.exit(1);
    }
    else {
        const baseDir = path.dirname(filename);
        const astFilename = path.join(baseDir,path.basename(filename) + ".ast");
        const ast = parser.results[0];
        await  fs.writeFile(astFilename, JSON.stringify(ast, null, " "));
        console.log(`wrote ${astFilename}\n`);
    }

}

main().catch(err => console.log(err.stack));