

const fs = require("fs").promises;
const path = require("path");

const varMap = new Map();

async function main(){
    const filename = process.argv[2];

    const astCode =( await  fs.readFile(filename)).toString();
    const ast = JSON.parse(astCode);
    const jsCode = generate(ast);
    const baseDir = path.dirname(filename);
    const baseName = path.join(baseDir, path.basename(filename, ".gf.ast"));
    const jsFilename = `${baseName}.js`;
    await  fs.writeFile(jsFilename, jsCode);
    console.log(`wrote ${jsFilename}\n`);
    varMap.clear();
}


function generate (node){
    if(node.type === "program"){
        return node.body.map(generate).join(";\n")+";";
    }
    else if(node.type === "assignment"){
        const params = node.parameters.map(generate).join(", ");
        return `let ${params}`;
    }
    else if(node.type === "updated_list"){
        const params = node.parameters.map(generate).join(", ");
        return `${params}`;
    }
    else if(node.type === "assigned"){
        const varName = node.var_name.value;
        varMap.set(varName,1);
        if(node.value === "null") {
            return `${varName} = null`;
        }
        let var1 = node.cond1.var_name1.value;
        if(node.cond1.var_name1.type === "operations_expression"){
            var1 = node.cond1.var_name1.opslist.map(generate).join(" ");
            var1 = `${node.cond1.var_name1.value.value} ${var1} `;
        }
        let var2 = "";
        let condOper = "";
        if(node.cond1.condoperator !== "null") {
            var2 = node.cond1.var_name2.value; 
            condOper = node.cond1.condoperator.value;
            if(node.cond1.var_name2.type === "operations_expression"){
                var2 = node.cond1.var_name2.opslist.map(generate).join(" ");
                var2 = `${node.cond1.var_name2.value.value} ${var2} `;
            }            
        }
        if(var1 === "mai") var1 = false;
         if(var1 === "meri bandi") var1 = true;
         if(var1 === "meri wali alag hai") var1 = null;
        if(var2 === "mai") var2 = false;
         if(var2 === "meri bandi") var2 = true;
         if(var2 === "meri wali alag hai") var2 = null;
        if(node.conditions){
            const condoParams = node.conditions.map(generate).join(" ");
            const oper = node.operator.value;
            return `${varName} ${oper} ${var1} ${condOper} ${var2} ${condoParams}`;
        }
        return `${varName} ${oper} ${var1} ${condOper} ${var2}`;
    }
    else if(node.type === "update"){
        const varName = node.var_name.value;
        if(!varMap.get(varName)) {
            return `${varName} = undefined`;
        }
        if(node.value === "null") {
            return `${varName} = null`;
        }
        let var1 = node.cond1.var_name1.value;
        if(node.cond1.var_name1.type === "operations_expression"){
            var1 = node.cond1.var_name1.opslist.map(generate).join(" ");
            var1 = `${node.cond1.var_name1.value.value} ${var1} `;
        }
        let var2 = "";
        let condOper = "";
        if(node.cond1.condoperator !== "null") {
            var2 = node.cond1.var_name2.value; 
            condOper = node.cond1.condoperator.value;
            if(node.cond1.var_name2.type === "operations_expression"){
                var2 = node.cond1.var_name2.opslist.map(generate).join(" ");
                var2 = `${node.cond1.var_name2.value.value} ${var2} `;
            }            
        }
        if(var1 === "mai") var1 = false;
         if(var1 === "meri bandi") var1 = true;
         if(var1 === "meri wali alag hai") var1 = null;
        if(var2 === "mai") var2 = false;
         if(var2 === "meri bandi") var2 = true;
         if(var2 === "meri wali alag hai") var2 = null;
        if(node.conditions){
            const condoParams = node.conditions.map(generate).join(" ");
            const oper = node.operator.value;
            return `${varName} ${oper} ${var1} ${condOper} ${var2} ${condoParams}`;
        }
        return `${varName} ${oper} ${var1} ${condOper} ${var2}`;
    }
    else if( node.type === "condition_loop"){
        const ifparams = node.statements.map(generate).join("\n");
        const ifelseparams = node.ifelseparameters.map(generate).join("\n");
        let var1 = node.cond1.var_name1.value;
        if(node.cond1.var_name1.type === "operations_expression"){
            var1 = node.cond1.var_name1.opslist.map(generate).join(" ");
            var1 = `${node.cond1.var_name1.value.value} ${var1} `;
        }
        let var2 = "";
        let condOper = "";
        if(node.cond1.condoperator !== "null") {
            var2 = node.cond1.var_name2.value; 
            condOper = node.cond1.condoperator.value;
            if(node.cond1.var_name2.type === "operations_expression"){
                var2 = node.cond1.var_name2.opslist.map(generate).join(" ");
                var2 = `${node.cond1.var_name2.value.value} ${var2} `;
            }            
        }
        if(node.conditions){
            const condoParams = node.conditions.map(generate).join(" ");
            return `if(${var1} ${condOper} ${var2} ${condoParams}){\n${ifparams};\n}\n${ifelseparams}`;
        }
        return `if(${var1} ${condOper} ${var2}){\n${ifparams};\n}\n${ifelseparams}`;
    }
    else if(node.type === "loop_if_else"){
        const params = node.statements.map(generate).join(";\n");
        let var1 = node.cond1.var_name1.value;
        if(node.cond1.var_name1.type === "operations_expression"){
            var1 = node.cond1.var_name1.opslist.map(generate).join(" ");
            var1 = `${node.cond1.var_name1.value.value} ${var1} `;
        }
        let var2 = "";
        let condOper = "";
        if(node.cond1.condoperator !== "null") {
            var2 = node.cond1.var_name2.value; 
            condOper = node.cond1.condoperator.value;
            if(node.cond1.var_name2.type === "operations_expression"){
                var2 = node.cond1.var_name2.opslist.map(generate).join(" ");
                var2 = `${node.cond1.var_name2.value.value} ${var2} `;
            }            
        }
        if(node.conditions){
            const condoParams = node.conditions.map(generate).join(" ");
            return `else if(${var1} ${condOper} ${var2} ${condoParams}){\n${params};\n}`;
        }
        return `else if(${var1} ${condOper} ${var2}){\n${params};\n}`;
    }
    else if(node.type === "loop_else"){
        const params = node.statements.map(generate).join(";\n");
        return `else {\n${params};\n}`;
    }
    else if( node.type === "condition" ){
        const params = node.statements.map(generate).join(";\n");
        // const var1 = node.conditions.var_name1.value;
        let var1 = node.cond1.var_name1.value;
        if(node.cond1.var_name1.type === "operations_expression"){
            var1 = node.cond1.var_name1.opslist.map(generate).join(" ");
            var1 = `${node.cond1.var_name1.value.value} ${var1} `;
        }
        let var2 = "";
        let condOper = "";
        if(node.cond1.condoperator !== "null") {
            var2 = node.cond1.var_name2.value; 
            condOper = node.cond1.condoperator.value;
            if(node.cond1.var_name2.type === "operations_expression"){
                var2 = node.cond1.var_name2.opslist.map(generate).join(" ");
                var2 = `${node.cond1.var_name2.value.value} ${var2} `;
            }            
        }
        if(node.conditions){
            const condoParams = node.conditions.map(generate).join(" ");
            return `if(${var1} ${condOper} ${var2} ${condoParams}){\n${params};\n}`;
        }
        return `if(${var1} ${condOper} ${var2}){\n${params};\n}`;
    }
    else if( node.type === "loops"){
        const params = node.statements.map(generate).join(";\n");
        let var1 = node.cond1.var_name1.value;
        if(node.cond1.var_name1.type === "operations_expression"){
            var1 = node.cond1.var_name1.opslist.map(generate).join(" ");
            var1 = `${node.cond1.var_name1.value.value} ${var1} `;
        }
        let var2 = "";
        let condOper = "";
        if(node.cond1.condoperator !== "null") {
            var2 = node.cond1.var_name2.value; 
            condOper = node.cond1.condoperator.value;
            if(node.cond1.var_name2.type === "operations_expression"){
                var2 = node.cond1.var_name2.opslist.map(generate).join(" ");
                var2 = `${node.cond1.var_name2.value.value} ${var2} `;
            }
        }
        // var condoParams = "";
        if(node.conditions){
            const condoParams = node.conditions.map(generate).join(" ");
            return `while(${var1} ${condOper} ${var2} ${condoParams}){\n${params};\n}`;
        }
        return `while(${var1} ${condOper} ${var2}){\n${params};\n}`;
    }
    else if( node.type === "many_conditions"){
        let var1 = node.cond2.var_name1.value;
        if(node.cond2.var_name1.type === "operations_expression"){
            var1 = node.cond2.var_name1.opslist.map(generate).join(" ");
            var1 = `${node.cond2.var_name1.value.value} ${var1} `;
        }
        let var2 = "";
        let condOper = "";
        if(node.cond2.condoperator !== "null") {
            var2 = node.cond2.var_name2.value; 
            condOper = node.cond2.condoperator.value;
            if(node.cond2.var_name2.type === "operations_expression"){
                var2 = node.cond2.var_name2.opslist.map(generate).join(" ");
                var2 = `${node.cond2.var_name2.value.value} ${var2} `;
            }
        }
        return `${node.unaoperator.value} ${var1} ${condOper} ${var2}`;
    }
    else if( node.type === "operation"){
        const arithOp = node.arith.value;
        const varName = node.value.value;
        return `${arithOp} ${varName}`;
    }
    else if( node.type === "operations"){
        const params = node.opslist.map(generate).join(" ");
        const varName = node.value.value;
        return `${varName} ${params}`;
    }
    else if(node.type === "print_function"){
        const params = node.parameters.map(generate).join(", ");
        return `console.log(${params})`;
    }
    else if(node.type === "print_params"){
        let var1 = node.cond1.var_name1.value;
        if(node.cond1.var_name1.type === "operations_expression"){
            var1 = node.cond1.var_name1.opslist.map(generate).join(" ");
            var1 = `${node.cond1.var_name1.value.value} ${var1} `;
        }
        let var2 = "";
        let condOper = "";
        if(node.cond1.condoperator !== "null") {
            var2 = node.cond1.var_name2.value; 
            condOper = node.cond1.condoperator.value;
            if(node.cond1.var_name2.type === "operations_expression"){
                var2 = node.cond1.var_name2.opslist.map(generate).join(" ");
                var2 = `${node.cond1.var_name2.value.value} ${var2} `;
            }            
        }
        if(var1 === "mai") var1 = false;
         if(var1 === "meri bandi") var1 = true;
         if(var1 === "meri wali alag hai") var1 = null;
        if(var2 === "mai") var2 = false;
         if(var2 === "meri bandi") var2 = true;
         if(var2 === "meri wali alag hai") var2 = null;
        if(node.conditions){
            const condoParams = node.conditions.map(generate).join(" ");
            return `${var1} ${condOper} ${var2} ${condoParams}`;
        }
        return `${var1} ${condOper} ${var2}`;
    }
    else if(node.type === "identifier"){
        return node.value;
    }
    else if(node.type === "string"){
        return node.value;
    }
    else if(node.type === "number"){
        return String(node.value);
    }
    else if(node.type === "false"){
        return false;
    }
    else if(node.type === "true"){
        return true;
    }
    else if(node.type === "null"){
        return null;
    }
    else if (node.type === "operations_expression"){
        var val = node.opslist.map(generate).join(" ");
        val = `${node.value.value} ${val}`;
        return `${val}`;
    }
    else if(node.type === "continue_break_cond"){
        if(node.value.value === "break up")
            return `break`;
        return `continue`;
    }   
    else {
        throw new Error(`unknown node type: ${node.type}`);
    }
}

main().catch(err => console.log(err.stack));