const moo = require("moo");


module.exports = moo.compile({

	newstartblock		: "ghar pe akeli hu",
	startblock			: /[\s\S]*?(?=ghar pe akeli hu)/,
	endblock			: "sabka katega",
	newendblock			: /(?<=sabka katega)[\s\S]*/,
	ifblock				: "ya toh meri wali sahi",
	elseifblock			: "ya ye wali",
	elseblock			: "ya fir ye wali",
	loop				: "wo degi jab bhi",
	breakCont			: ["break up", "rukna mat"],	
	variable_keyword	: "meri wali hai",
	print_keyword		: "thats what she said",
	false 				: "mai",
	true				: "meri bandi",
	null				: "meri wali alag hai",
	comma				: ",",
	ws					: /[ \t]+/,
	comment				: /\/\/.*?$/,
	number				: {match:  /[0-9][0-9]*/, value : Number},
	string				: /"(?:\\["\\]|[^\n"\\])*"/,
	lparen				: "(",
	rparen				: ")",
	clparen				: "{",
	crparen				: "}",
	end					: ";",
	unaryOp				: ["&&","||"],
	conditionalOp		: ["==",">",">=","<","<=","!="],
	assignmentOp		: ["=", "-=","+=","*=","/=","%="],
	arithmeticOp		: ["*","/","+","-","%"],
	identifier			: /[a-zA-Z_][a-zA-Z0-9_]*/,
    newline				: { match: /\n/ , lineBreaks: true },
	
});


// handle { statments }
// handle ( ) in ops;
// diff tabs from .md file

// exception handling
// nahi degi wo
// bhabhi h wo
// sabka katega
// kab tk upar se karta reh
// kaise
// something relatd to ex
// complier msg:
// Haayeee -> successful code
// ewwww -> syntax error
// kitno ko ghumayega -> runtine error
// ignore kiya tujjhe

