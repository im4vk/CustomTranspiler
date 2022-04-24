<h1 align="center">Bandi Lang</h1>
<!-- <p align="center">
<a href="https://lgtm.com/projects/g/DulLabs/bhai-lang/alerts/"><img alt="Total alerts" src="https://img.shields.io/lgtm/alerts/g/DulLabs/bhai-lang.svg?logo=lgtm&logoWidth=18"/></a>
<a href="https://lgtm.com/projects/g/DulLabs/bhai-lang/context:javascript"><img alt="Language grade: JavaScript" src="https://img.shields.io/lgtm/grade/javascript/g/DulLabs/bhai-lang.svg?logo=lgtm&logoWidth=18"/></a>
<a href="https://github.com/DulLabs/bhai-lang/actions/workflows/node.js.yml/badge.svg"><img alt="Build" src="https://github.com/DulLabs/bhai-lang/actions/workflows/node.js.yml/badge.svg"/></a>
<a href="https://bhailang.js.org/"><img alt="Build" src="https://img.shields.io/badge/website-bhailang.js.org-orange"/></a>
<a href="https://www.npmjs.com/package/bhailang"><img alt="Build" src="https://img.shields.io/badge/npm-bhailang-orange"/></a>
  
</p> -->

<p align="center">
  This is official repository for bandi-lang.<br><br>
  <b>Bandi lang is a toy programming language to express the inexpressible.</b>
</p>
<br>

<!-- <h2 align="center">Installation</h2>

```
npm i -g bhailang
``` -->

<h2 align="center">Usage</h2>

<h4 align="left">Create a new file (<code>test.gf</code>)</h4>


<h4 align="left">Edit the file with a text editor.
<!-- You can also try out your code on <a href="https://bhailang.js.org/#playground">Bhai Lang PlayGround</a></h4> -->

```
ghar pe akeli hu
  thats what she said "I Love You";
sabka katega

```

<h4 align="left">Run</h4>

```
download repository
> node run.js test.gf
```

<h4 align="left">Output</h4>

```
I Love You
```

<h2 align="center">Documentation</h2>

<h3 align="center">General</h3>
<p align="center"><code>ghar pe akeli hu</code> is the entrypoint for the program and all program must end with <code>sabka katega</code>. Anything outside of it will be ignored.</p>

```

This will be ignored

ghar pe akeli hu
// Write code here
sabka katega

This too
```

<h3 align="center">Variables</h3>
<p align="center">Variables can be declared using <code>meri wali hai</code>.</p>

```

ghar pe akeli hu
  meri wali hai a = 10;
  meri wali hai b = "two";
  meri wali hai c = 15;
  a = a + 1;
  b = 21;
  c *= 2;
sabka katega
```

<h3 align="center">Types</h3>
<p align="center">Numbers and strings are like other languages. Null values can be denoted using <code>meri wali alag hai (null)</code>. <code>meri bandi (true)</code> and <code>mai (false)</code> are the boolean values.</p>

```

ghar pe akeli hu
  meri wali hai a = 10;
  meri wali hai b = 10 + (15*20);
  meri wali hai c = "two";
  meri wali hai e = meri wali alag hai;
  meri wali hai f = meri bandi;
  meri wali hai g = mai;
sabka katega
```

<h3 align="center">Built-ins</h3>
<p align="center">Use <code>thats what she said</code> to print anything to console.</p>

```

ghar pe akeli hu
  thats what she said "Hello World";
  meri wali hai a = 10;
  {
    meri wali hai b = 20;
    thats what she said a + b;
  }
  thats what she said 5, "ok", meri wali alag hai , meri bandi , mai;
sabka katega
```

<h3 align="center">Conditionals</h3>
<p align="center">Bandilang supports if-else-if ladder construct , <code>ya toh meri wali sahi</code> block will execute if condition is <code>true</code>, otherwise one of the subsequently added <code>ya ye wali</code> blocks will execute if their respective condition is <code>true</code>, and the <code>ya fir ye wali</code> block will eventually execute if all of the above conditions are <code>false</code>

```

ghar pe akeli hu
  meri wali hai a = 10;
  ya toh meri wali sahi (a < 20) {
    thats what she said "a is less than 20";
  } ya ye wali ( a < 25 ) {
    thats what she said "a is less than 25";
  } ya fir ye wali {
    thats what she said "a is greater than or equal to 25";
  }
sabka katega
```

<h3 align="center">Loops</h3>
<p align="center">Statements inside <code>wo degi jab bhi</code> blocks are executed as long as a specified condition evaluates to <code>true</code>. If the condition becomes <code>false</code>, statement within the loop stops executing and control passes to the statement following the loop. Use <code>break up</code> to break the loop and <code className="language-cpp">rukna mat</code> to continue within loop.</p>


```

ghar pe akeli hu
  meri wali hai a = 0;
  wo degi jab bhi (a < 10) {
   a += 1;
   ya toh meri wali sahi (a == 5) {
    thats what she said "andar se", a;
    rukna mat;
   }
   ya toh meri wali sahi (a == 6) {
    break up;
   }
   thats what she said a;
  }
  thats what she said "done";
sabka katega
```

<h2 align="center">Development</h2>
<p align="center">Exception Handling is ongoing.</p>







