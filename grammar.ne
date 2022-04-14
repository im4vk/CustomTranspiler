@{%

const myLexer = require("./lexer");

%}

@lexer myLexer

program 
    ->  startblock_ %newstartblock _ statements %endblock newendblock_ {%
            (data) => {
                return {
                    type: "program",
                    body: data[3]
                }
            }
        %}

statements 
    ->  null {% () => [] %}
    |   statement _ statements {%
            (data) => [data[0], ...data[2]]
        %}

statement 
    ->  assignment {% id %}
    |   print_function {% id %}
    |   update {% id %}
    |   conditional_block {% id %}
    |   conditional_loop_block {% id %}
    |   loop_block {% id %}
    |   break_cond {% id %}
    |   operations_statement {% id %}

operations_statement
    ->  ops_expression _ operation_list _ %end {%
            (data) => {
                return {
                    type: "operations",
                    opslist: data[2],
                    value: data[0]
                }
            }
        %}

operations_expression
    ->  ops_expression _ operation_list {%
            (data) => {
                return {
                    type: "operations_expression",
                    opslist: data[2],
                    value: data[0]
                }
            }
        %}

operation_list
    ->  arithoperators _ ops_expression {%
            (data) => {
                return [{
                    type: "operation",
                    value: data[2],
                    arith: data[0]
                }]
            }
        %}
    |   arithoperators _ ops_expression _ operation_list {%
            (data) => {
                return [{
                    type: "operation",
                    value: data[2],
                    arith: data[0]
                }, ...data[4]]
            }
        %}

conditional_block -> %ifblock  _ "(" _ condition _ condition_many ")" _ "{" _ statements "}" {%
        (data) => {
            return {
                type: "condition",
                var_name: data[0],
                cond1: data[4],
                conditions: data[6],
                statements: data[11]
            }
        }
    %}

conditional_loop_block 
    ->  %ifblock  _ "(" _ condition _ condition_many ")" _ "{" _ statements "}" _ loop_else_ifs {%
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
        %}

loop_else_ifs
    ->  %elseblock _ "{" _ statements "}" {%
            (data) => {
                return [{
                    type: "loop_else",
                    var_name: data[0],
                    statements: data[4]
                }]
            }
        %}
    |   %elseifblock  _ "(" _ condition _ condition_many ")" _ "{" _ statements "}" {%
            (data) => {
                return [{
                    type: "loop_if_else",
                    var_name: data[0],
                    cond1: data[4],
                    conditions: data[6],
                    statements: data[11]
                }]
            }
        %}
    |   %elseifblock  _ "(" _ condition _ condition_many ")" _ "{" _ statements "}" _ loop_else_ifs {%
            (data) => {
                return [{
                    type: "loop_if_else",
                    var_name: data[0],
                    cond1: data[4],
                    conditions: data[6],
                    statements: data[11]
                }, ...data[14]]
            }
        %}

loop_block -> %loop  _ "(" _ condition _ condition_many ")" _ "{" _ statements "}" {%
        (data) => {
            return {
                type: "loops",
                var_name: data[0],
                cond1: data[4],
                conditions: data[6],
                statements: data[11]
            }
        }
    %}

condition_many
    ->  null {% () => [] %}
    |   unaryoperator _ condition _ condition_many {%
            (data) => {
                return [{
                    type: "many_conditions",
                    cond2: data[2],
                    unaoperator: data[0]
                }, ...data[4]]
            }
        %}

condition
    ->  expression _ condoperators _ expression {%
            (data) => {
                return {
                    var_name1: data[0],
                    condoperator: data[2],
                    var_name2: data[4]
                }
            } 
        %}
    |   expression {%
            (data) => {
                return {
                    condoperator: "null",
                    var_name1: data[0]
                }
            }
        %}

assignment -> %variable_keyword __ _ assignment_var_list %end {%
        (data) =>{
            return {
                type: "assignment",
                var_name: data[0],
                parameters: data[3]
            }
        }
    %}

assignment_var_list
    ->  %identifier _ {%
            (data) => {
                return [{
                    type: "assigned",
                    var_name: data[0],
                    value: "null"
                }]
            }
        %}
    |   %identifier _ "," _ assignment_var_list {%
            (data) => {
                return [{
                    type: "assigned",
                    var_name: data[0],
                    value: "null"
                }, ...data[4]]
            }
        %}
    |   %identifier _ operators _ condition _ condition_many {%
            (data) =>{
                return [{
                    type: "assigned",
                    var_name: data[0],
                    operator: data[2],
                    cond1: data[4],
                    conditions: data[6]
                }]
            }
        %}
    |   %identifier _ operators _ condition _ condition_many "," _ assignment_var_list {%
            (data) => {
                return [{
                    type: "assigned",
                    var_name: data[0],
                    operator: data[2],
                    cond1: data[4],
                    conditions: data[6]
                }, ...data[9]]
            }
        %}

update -> update_var_list %end {%
        (data) =>{
            return {
                type: "updated_list",
                parameters: data[0]
            }
        }
    %}

update_var_list
    ->  %identifier _ {%
            (data) => {
                return [{
                    type: "update",
                    var_name: data[0],
                    value: "null"
                }]
            }
        %}
    |   %identifier _ "," _ update_var_list {%
            (data) => {
                return [{
                    type: "update",
                    var_name: data[0],
                    value: "null"
                }, ...data[4]]
            }
        %}
    |   %identifier _ operators _ condition _ condition_many {%
            (data) =>{
                return [{
                    type: "update",
                    var_name: data[0],
                    operator: data[2],
                    cond1: data[4],
                    conditions: data[6]
                }]
            }
        %}
    |   %identifier _ operators _ condition _ condition_many "," _ update_var_list {%
            (data) => {
                return [{
                    type: "update",
                    var_name: data[0],
                    operator: data[2],
                    cond1: data[4],
                    conditions: data[6]
                }, ...data[9]]
            }
        %}

print_function -> %print_keyword __ _ print_parameter_list %end {%
        (data) => {
            return {
                type: "print_function",
                fun_name: data[0],
                parameters: data[3]
            }
        }
    %}

print_parameter_list
    ->  condition _ condition_many {%
            (data) =>{
                return [{
                    type: "print_params",
                    cond1: data[0],
                    conditions: data[2]
                }]
            }
        %}
    |   condition _ condition_many "," _ print_parameter_list {%
            (data) => {
                return [{
                    type: "print_params",
                    cond1: data[0],
                    conditions: data[2]
                }, ...data[5]]
            }
        %}

break_cond ->  continue_break_cond _ %end {%
        (data) => {
            return {
                type: "continue_break_cond",
                value: data[0]
            }
        }
    %}

expression
    ->  %identifier {% id %}
    |   literal {% id %}
    |   operations_expression {% id %}

ops_expression
    ->  %identifier {% id %}
    |   %number {% id %}
    |   %string {% id %}

literal 
    ->  %number {% id %} 
    |   %string {% id %} 
    |   %false  {% id %}
    |   %true   {% id %}
    |   %null   {% id %}

operators ->  %assignmentOp {% id %}

unaryoperator 
    -> %unaryOp {% id %}

condoperators
    -> %conditionalOp {% id %}
    |  %assignmentOp {% id %}

arithoperators
    ->  %arithmeticOp {% id %}

continue_break_cond 
    -> %breakCont {% id %}

# mandadotory whitespace single
__ -> %ws | %newline

#optional whitespace single either of the three
_ -> null {% () => [] %} | %ws _ | %newline _ | %comment _

startblock_ -> %startblock {% id %} | null {% () => [] %}

newendblock_ -> %newendblock {% id %} | null {% () => [] %}