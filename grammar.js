// Generated automatically by nearley, version 2.20.1
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }


const myLexer = require("./lexer");

var grammar = {
    Lexer: myLexer,
    ParserRules: [
    {"name": "program", "symbols": ["startblock_", (myLexer.has("newstartblock") ? {type: "newstartblock"} : newstartblock), "_", "statements", (myLexer.has("endblock") ? {type: "endblock"} : endblock), "newendblock_"], "postprocess": 
        (data) => {
            return {
                type: "program",
                body: data[3]
            }
        }
                },
    {"name": "statements", "symbols": [], "postprocess": () => []},
    {"name": "statements", "symbols": ["statement", "_", "statements"], "postprocess": 
        (data) => [data[0], ...data[2]]
                },
    {"name": "statement", "symbols": ["assignment"], "postprocess": id},
    {"name": "statement", "symbols": ["print_function"], "postprocess": id},
    {"name": "statement", "symbols": ["update"], "postprocess": id},
    {"name": "statement", "symbols": ["conditional_block"], "postprocess": id},
    {"name": "statement", "symbols": ["conditional_loop_block"], "postprocess": id},
    {"name": "statement", "symbols": ["loop_block"], "postprocess": id},
    {"name": "statement", "symbols": ["break_cond"], "postprocess": id},
    {"name": "statement", "symbols": ["operations_statement"], "postprocess": id},
    {"name": "operations_statement", "symbols": ["ops_expression", "_", "operation_list", "_", (myLexer.has("end") ? {type: "end"} : end)], "postprocess": 
        (data) => {
            return {
                type: "operations",
                opslist: data[2],
                value: data[0]
            }
        }
                },
    {"name": "operations_expression", "symbols": ["ops_expression", "_", "operation_list"], "postprocess": 
        (data) => {
            return {
                type: "operations_expression",
                opslist: data[2],
                value: data[0]
            }
        }
                },
    {"name": "operation_list", "symbols": ["arithoperators", "_", "ops_expression"], "postprocess": 
        (data) => {
            return [{
                type: "operation",
                value: data[2],
                arith: data[0]
            }]
        }
                },
    {"name": "operation_list", "symbols": ["arithoperators", "_", "ops_expression", "_", "operation_list"], "postprocess": 
        (data) => {
            return [{
                type: "operation",
                value: data[2],
                arith: data[0]
            }, ...data[4]]
        }
                },
    {"name": "conditional_block", "symbols": [(myLexer.has("ifblock") ? {type: "ifblock"} : ifblock), "_", {"literal":"("}, "_", "condition", "_", "condition_many", {"literal":")"}, "_", {"literal":"{"}, "_", "statements", {"literal":"}"}], "postprocess": 
        (data) => {
            return {
                type: "condition",
                var_name: data[0],
                cond1: data[4],
                conditions: data[6],
                statements: data[11]
            }
        }
            },
    {"name": "conditional_loop_block", "symbols": [(myLexer.has("ifblock") ? {type: "ifblock"} : ifblock), "_", {"literal":"("}, "_", "condition", "_", "condition_many", {"literal":")"}, "_", {"literal":"{"}, "_", "statements", {"literal":"}"}, "_", "loop_else_ifs"], "postprocess": 
        (data) => {
            return {
                type: "condition_loop",
                var_name: data[0],
                cond1: data[4],
                conditions: data[6],
                statements: data[11],
                ifelseparameters: data[14]
            }
        }
                },
    {"name": "loop_else_ifs", "symbols": [(myLexer.has("elseblock") ? {type: "elseblock"} : elseblock), "_", {"literal":"{"}, "_", "statements", {"literal":"}"}], "postprocess": 
        (data) => {
            return [{
                type: "loop_else",
                var_name: data[0],
                statements: data[4]
            }]
        }
                },
    {"name": "loop_else_ifs", "symbols": [(myLexer.has("elseifblock") ? {type: "elseifblock"} : elseifblock), "_", {"literal":"("}, "_", "condition", "_", "condition_many", {"literal":")"}, "_", {"literal":"{"}, "_", "statements", {"literal":"}"}], "postprocess": 
        (data) => {
            return [{
                type: "loop_if_else",
                var_name: data[0],
                cond1: data[4],
                conditions: data[6],
                statements: data[11]
            }]
        }
                },
    {"name": "loop_else_ifs", "symbols": [(myLexer.has("elseifblock") ? {type: "elseifblock"} : elseifblock), "_", {"literal":"("}, "_", "condition", "_", "condition_many", {"literal":")"}, "_", {"literal":"{"}, "_", "statements", {"literal":"}"}, "_", "loop_else_ifs"], "postprocess": 
        (data) => {
            return [{
                type: "loop_if_else",
                var_name: data[0],
                cond1: data[4],
                conditions: data[6],
                statements: data[11]
            }, ...data[14]]
        }
                },
    {"name": "loop_block", "symbols": [(myLexer.has("loop") ? {type: "loop"} : loop), "_", {"literal":"("}, "_", "condition", "_", "condition_many", {"literal":")"}, "_", {"literal":"{"}, "_", "statements", {"literal":"}"}], "postprocess": 
        (data) => {
            return {
                type: "loops",
                var_name: data[0],
                cond1: data[4],
                conditions: data[6],
                statements: data[11]
            }
        }
            },
    {"name": "condition_many", "symbols": [], "postprocess": () => []},
    {"name": "condition_many", "symbols": ["unaryoperator", "_", "condition", "_", "condition_many"], "postprocess": 
        (data) => {
            return [{
                type: "many_conditions",
                cond2: data[2],
                unaoperator: data[0]
            }, ...data[4]]
        }
                },
    {"name": "condition", "symbols": ["expression", "_", "condoperators", "_", "expression"], "postprocess": 
        (data) => {
            return {
                var_name1: data[0],
                condoperator: data[2],
                var_name2: data[4]
            }
        } 
                },
    {"name": "condition", "symbols": ["expression"], "postprocess": 
        (data) => {
            return {
                condoperator: "null",
                var_name1: data[0]
            }
        }
                },
    {"name": "assignment", "symbols": [(myLexer.has("variable_keyword") ? {type: "variable_keyword"} : variable_keyword), "__", "_", "assignment_var_list", (myLexer.has("end") ? {type: "end"} : end)], "postprocess": 
        (data) =>{
            return {
                type: "assignment",
                var_name: data[0],
                parameters: data[3]
            }
        }
            },
    {"name": "assignment_var_list", "symbols": [(myLexer.has("identifier") ? {type: "identifier"} : identifier), "_"], "postprocess": 
        (data) => {
            return [{
                type: "assigned",
                var_name: data[0],
                value: "null"
            }]
        }
                },
    {"name": "assignment_var_list", "symbols": [(myLexer.has("identifier") ? {type: "identifier"} : identifier), "_", {"literal":","}, "_", "assignment_var_list"], "postprocess": 
        (data) => {
            return [{
                type: "assigned",
                var_name: data[0],
                value: "null"
            }, ...data[4]]
        }
                },
    {"name": "assignment_var_list", "symbols": [(myLexer.has("identifier") ? {type: "identifier"} : identifier), "_", "operators", "_", "condition", "_", "condition_many"], "postprocess": 
        (data) =>{
            return [{
                type: "assigned",
                var_name: data[0],
                operator: data[2],
                cond1: data[4],
                conditions: data[6]
            }]
        }
                },
    {"name": "assignment_var_list", "symbols": [(myLexer.has("identifier") ? {type: "identifier"} : identifier), "_", "operators", "_", "condition", "_", "condition_many", {"literal":","}, "_", "assignment_var_list"], "postprocess": 
        (data) => {
            return [{
                type: "assigned",
                var_name: data[0],
                operator: data[2],
                cond1: data[4],
                conditions: data[6]
            }, ...data[9]]
        }
                },
    {"name": "update", "symbols": ["update_var_list", (myLexer.has("end") ? {type: "end"} : end)], "postprocess": 
        (data) =>{
            return {
                type: "updated_list",
                parameters: data[0]
            }
        }
            },
    {"name": "update_var_list", "symbols": [(myLexer.has("identifier") ? {type: "identifier"} : identifier), "_"], "postprocess": 
        (data) => {
            return [{
                type: "update",
                var_name: data[0],
                value: "null"
            }]
        }
                },
    {"name": "update_var_list", "symbols": [(myLexer.has("identifier") ? {type: "identifier"} : identifier), "_", {"literal":","}, "_", "update_var_list"], "postprocess": 
        (data) => {
            return [{
                type: "update",
                var_name: data[0],
                value: "null"
            }, ...data[4]]
        }
                },
    {"name": "update_var_list", "symbols": [(myLexer.has("identifier") ? {type: "identifier"} : identifier), "_", "operators", "_", "condition", "_", "condition_many"], "postprocess": 
        (data) =>{
            return [{
                type: "update",
                var_name: data[0],
                operator: data[2],
                cond1: data[4],
                conditions: data[6]
            }]
        }
                },
    {"name": "update_var_list", "symbols": [(myLexer.has("identifier") ? {type: "identifier"} : identifier), "_", "operators", "_", "condition", "_", "condition_many", {"literal":","}, "_", "update_var_list"], "postprocess": 
        (data) => {
            return [{
                type: "update",
                var_name: data[0],
                operator: data[2],
                cond1: data[4],
                conditions: data[6]
            }, ...data[9]]
        }
                },
    {"name": "print_function", "symbols": [(myLexer.has("print_keyword") ? {type: "print_keyword"} : print_keyword), "__", "_", "print_parameter_list", (myLexer.has("end") ? {type: "end"} : end)], "postprocess": 
        (data) => {
            return {
                type: "print_function",
                fun_name: data[0],
                parameters: data[3]
            }
        }
            },
    {"name": "print_parameter_list", "symbols": ["condition", "_", "condition_many"], "postprocess": 
        (data) =>{
            return [{
                type: "print_params",
                cond1: data[0],
                conditions: data[2]
            }]
        }
                },
    {"name": "print_parameter_list", "symbols": ["condition", "_", "condition_many", {"literal":","}, "_", "print_parameter_list"], "postprocess": 
        (data) => {
            return [{
                type: "print_params",
                cond1: data[0],
                conditions: data[2]
            }, ...data[5]]
        }
                },
    {"name": "break_cond", "symbols": ["continue_break_cond", "_", (myLexer.has("end") ? {type: "end"} : end)], "postprocess": 
        (data) => {
            return {
                type: "continue_break_cond",
                value: data[0]
            }
        }
            },
    {"name": "expression", "symbols": [(myLexer.has("identifier") ? {type: "identifier"} : identifier)], "postprocess": id},
    {"name": "expression", "symbols": ["literal"], "postprocess": id},
    {"name": "expression", "symbols": ["operations_expression"], "postprocess": id},
    {"name": "ops_expression", "symbols": [(myLexer.has("identifier") ? {type: "identifier"} : identifier)], "postprocess": id},
    {"name": "ops_expression", "symbols": [(myLexer.has("number") ? {type: "number"} : number)], "postprocess": id},
    {"name": "ops_expression", "symbols": [(myLexer.has("string") ? {type: "string"} : string)], "postprocess": id},
    {"name": "literal", "symbols": [(myLexer.has("number") ? {type: "number"} : number)], "postprocess": id},
    {"name": "literal", "symbols": [(myLexer.has("string") ? {type: "string"} : string)], "postprocess": id},
    {"name": "literal", "symbols": [(myLexer.has("false") ? {type: "false"} : false)], "postprocess": id},
    {"name": "literal", "symbols": [(myLexer.has("true") ? {type: "true"} : true)], "postprocess": id},
    {"name": "literal", "symbols": [(myLexer.has("null") ? {type: "null"} : null)], "postprocess": id},
    {"name": "operators", "symbols": [(myLexer.has("assignmentOp") ? {type: "assignmentOp"} : assignmentOp)], "postprocess": id},
    {"name": "unaryoperator", "symbols": [(myLexer.has("unaryOp") ? {type: "unaryOp"} : unaryOp)], "postprocess": id},
    {"name": "condoperators", "symbols": [(myLexer.has("conditionalOp") ? {type: "conditionalOp"} : conditionalOp)], "postprocess": id},
    {"name": "condoperators", "symbols": [(myLexer.has("assignmentOp") ? {type: "assignmentOp"} : assignmentOp)], "postprocess": id},
    {"name": "arithoperators", "symbols": [(myLexer.has("arithmeticOp") ? {type: "arithmeticOp"} : arithmeticOp)], "postprocess": id},
    {"name": "continue_break_cond", "symbols": [(myLexer.has("breakCont") ? {type: "breakCont"} : breakCont)], "postprocess": id},
    {"name": "__", "symbols": [(myLexer.has("ws") ? {type: "ws"} : ws)]},
    {"name": "__", "symbols": [(myLexer.has("newline") ? {type: "newline"} : newline)]},
    {"name": "_", "symbols": [], "postprocess": () => []},
    {"name": "_", "symbols": [(myLexer.has("ws") ? {type: "ws"} : ws), "_"]},
    {"name": "_", "symbols": [(myLexer.has("newline") ? {type: "newline"} : newline), "_"]},
    {"name": "_", "symbols": [(myLexer.has("comment") ? {type: "comment"} : comment), "_"]},
    {"name": "startblock_", "symbols": [(myLexer.has("startblock") ? {type: "startblock"} : startblock)], "postprocess": id},
    {"name": "startblock_", "symbols": [], "postprocess": () => []},
    {"name": "newendblock_", "symbols": [(myLexer.has("newendblock") ? {type: "newendblock"} : newendblock)], "postprocess": id},
    {"name": "newendblock_", "symbols": [], "postprocess": () => []}
]
  , ParserStart: "program"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
