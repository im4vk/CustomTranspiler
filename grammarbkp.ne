# Live Code: Make a Programming Language From Scratch by Tobi Ho
# https://www.youtube.com/playlist?list=PLSq9OFrD2Q3DKGFCm0YRVRXZMO1KHNUXu
# https://www.youtube.com/playlist?list=PLZQftyCk7_SdoVexSmwy_tBgs7P0b97yD




@{%

const myLexer = require("./lexer");

%}

@lexer myLexer

program 
    ->  _ %startblock _ statements %endblock _ {%
            (data) => {
                return {
                    type: "program",
                    body: data[3]
                }
            }
        %}

statements 
    ->  null {% () => [] %}
    |   statement {%
            (data) => [data[0]]
        %}
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

conditional_block -> %ifblock  _ "(" _ condition _ ")" _ "{" _ statements "}" {%
        (data) => {
            return {
                type: "condition",
                var_name: data[0],
                conditions: data[4],
                statements: data[10]
            }
        }
    %}

conditional_loop_block 
    ->  %ifblock  _ "(" _ condition _ ")" _ "{" _ statements "}" _ loop_else_ifs {%
            (data) => {
                return {
                    type: "condition_loop",
                    var_name: data[0],
                    conditions: data[4],
                    statements: data[10],
                    ifelseparameters: data[13]
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
    |   %elseifblock  _ "(" _ condition _ ")" _ "{" _ statements "}" {%
            (data) => {
                return [{
                    type: "loop_if_else",
                    var_name: data[0],
                    conditions: data[4],
                    statements: data[10]
                }]
            }
        %}
    |   %elseifblock  _ "(" _ condition _ ")" _ "{" _ statements "}" _ loop_else_ifs {%
            (data) => {
                return [{
                    type: "loop_if_else",
                    var_name: data[0],
                    conditions: data[4],
                    statements: data[10]
                }, ...data[13]]
            }
        %}

loop_block -> %loop  _ "(" _ condition _ ")" _ "{" _ statements "}" {%
        (data) => {
            return {
                type: "loops",
                var_name: data[0],
                conditions: data[4],
                statements: data[10]
            }
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

assignment -> %variable_keyword __ _ assignment_var_list _ %end {%
        (data) =>{
            return {
                type: "assignment",
                var_name: data[0],
                parameters: data[3]
            }
        }
    %}

assignment_var_list
    ->  %identifier {%
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
    |   %identifier _ operators _ expression {%
            (data) =>{
                return [{
                    type: "assigned",
                    var_name: data[0],
                    operator: data[2],
                    value: data[4]
                }]
            }
        %}
    |   %identifier _ operators _ expression _ "," _ assignment_var_list {%
            (data) => {
                return [{
                    type: "assigned",
                    var_name: data[0],
                    operator: data[2],
                    value: data[4]
                }, ...data[8]]
            }
        %}

update -> update_var_list _ %end {%
        (data) =>{
            return {
                type: "updated_list",
                parameters: data[0]
            }
        }
    %}

update_var_list
    ->  %identifier {%
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
    |   %identifier _ operators _ expression {%
            (data) =>{
                return [{
                    type: "update",
                    var_name: data[0],
                    operator: data[2],
                    value: data[4]
                }]
            }
        %}
    |   %identifier _ operators _ expression _ "," _ update_var_list {%
            (data) => {
                return [{
                    type: "update",
                    var_name: data[0],
                    operator: data[2],
                    value: data[4]
                }, ...data[8]]
            }
        %}

print_function -> %print_keyword __ _ print_parameter_list _ %end {%
        (data) => {
            return {
                type: "print_function",
                fun_name: data[0],
                parameters: data[3]
            }
        }
    %}

print_parameter_list
    ->  expression {%
            (data) => {
                return [data[0]]
            }
        %}
    |   expression _ "," _ print_parameter_list {%
            (data) => {
                return [data[0], ...data[4]]
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

operators
    -> %assignmentOp {% id %}

condoperators
    -> %conditionalOp {% id %}
    |  %assignmentOp {% id %}

arithoperators
    -> %arithmeticOp {% id %}

continue_break_cond 
    -> %breakCont {% id %}

# mandadotory whitespace single
__ -> %ws | %newline

#optional whitespace single either of the three
_ -> null | %ws _ | %newline _
