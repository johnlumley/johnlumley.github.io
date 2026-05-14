/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  Ambiguity: () => (/* binding */ Ambiguity),
  Derivation: () => (/* binding */ Derivation),
  Grammar: () => (/* binding */ Grammar),
  RequireError: () => (/* binding */ RequireError),
  Source: () => (/* binding */ Source),
  addDerivation: () => (/* binding */ addDerivation),
  addNodes: () => (/* binding */ addNodes),
  ixmlNS: () => (/* binding */ ixmlNS),
  partsOf: () => (/* binding */ partsOf),
  singleNonTermRepeats: () => (/* binding */ singleNonTermRepeats),
  validNodeName: () => (/* binding */ validNodeName),
  validXMLText: () => (/* binding */ validXMLText)
});

// UNUSED EXPORTS: jwiXML

;// CONCATENATED MODULE: ../tsc/built/ixmlLib.js
function grumble(message, code = "ABCD", location = null) {
    let e = new SaxonJS.XError(message, "Q{http://invisiblexml.org/NS}" + code);
    if (location) {
        e.xsltLineNr = location.line;
    }
    throw e;
}
function isGrumble(e) {
    return e instanceof SaxonJS.XError;
}
function validNCName(s) {
    const NamePattern = /^[\u003a\u0041-\u005a\u005f\u0061-\u007a\u00c0-\u00d6\u00d8-\u00f6\u00f8-\u02ff\u0370-\u037d\u037f-\u1fff\u200c-\u200d\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd\u{10000}-\u{effff}][\u002d-\u002e\u0030-\u003a\u0041-\u005a\u005f\u0061-\u007a\u00b7\u00c0-\u00d6\u00d8-\u00f6\u00f8-\u037d\u037f-\u1fff\u200c-\u200d\u203f-\u2040\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd\u{10000}-\u{effff}]*$/u;
    return NamePattern.test(s) && !/:/.test(s);
    /* try {
         let q = SaxonJS.atom(nodeName, "NCName");
         /\* is it a valid NCName? *\/
     }
     catch (e) {
         return false;
     }
     return true;
     */
}
function lookupOption(options, defaultValue = null) {
    if (options.value) {
        // This may be a wrapped XDMMap
        options = options.value;
    }
    if (options instanceof SaxonJS.XdmMap) {
        return function (key) {
            let xKey = SaxonJS.atom(key);
            return options.containsKey(xKey) ? options.get(xKey)[0].value : defaultValue;
        };
    }
    else {
        return function (key) {
            return options.hasOwn(key) ? options[key] : defaultValue;
        };
    }
}
function XPathEvaluate(expr, context) {
    return SaxonJS.XPath.evaluate(expr, context);
}
function register(name, item) {
    window[name] = function () {
        return item;
    };
}

;// CONCATENATED MODULE: ../tsc/built/ixmlClasses.js
/*  Classes to represent terms in an ixml grammar
 *
 * Most of these have a static fromXML() method to parse the term from the XML representation
 *
 * */

/*import {
    Element
}from "./xmldom/dom.js";*/

/* Print out pattern attributes in XML - for debug purposes only */
const showPattern = true;
class IXMLPart {
    static fromXML(element) {
        let mark;
        if (element.hasAttribute("mark")) {
            mark = element.getAttribute("mark");
        }
        if (element.hasAttribute("tmark")) {
            mark = element.getAttribute("tmark");
        }
        switch (element.nodeName) {
            case "prolog":
                return Prolog.fromXML(element);
            case "version":
                return Version.fromXML(element);
            case "pragma":
                return Pragma.fromXML(element);
            case "ppragma":
                return PPragma.fromXML(element);
            case "pragma-data":
                return PragmaData.fromXML(element);
            case "metadata":
                return Metadata.fromXML(element);
            case "field":
                return Field.fromXML(element);
            case "rule":
                return Rule.fromXML(element, mark);
            case "alts":
                return Alts.fromXML(element.children);
            case "subtraction":
                return Subtraction.fromXML(element.children);
            case "alt":
                return Alt.fromXML(element.children);
            case "comment":
                return CommentX.fromXML(element);
            case 'literal':
                return Literal.fromXML(element, mark);
            case 'insertion':
                return Insertion.fromXML(element);
            case 'inclusion':
                return Charset.fromXML(element, false, mark);
            case 'exclusion':
                return Charset.fromXML(element, true, mark);
            case 'member':
                return Member.fromXML(element);
            case 'nonterminal':
                return NonTerminal.fromXML(element, mark);
            case 'option':
                return OptionX.fromXML(element, mark);
            case 'repeat0':
                return Repeat0.fromXML(element, mark);
            case 'repeat1':
                return Repeat1.fromXML(element, mark);
            case 'sep':
                return Separator.fromXML(element, mark);
            default:
                grumble("Unknown element in ixml tree:" + element.nodeName);
        }
    }
}
class Prolog {
    version;
    metadata;
    pragmas;
    ppragmas;
    annotations;
    static fromXML(element) {
        return new Prolog(Version.fromXML(element.firstElementChild), []);
    }
    constructor(version, ppragmas) {
        this.version = version;
        this.metadata = [];
        this.ppragmas = ppragmas;
    }
    toXML(parent, opts) {
        const e = parent.ownerDocument.createElement("prolog");
        if (this.version) {
            this.version.toXML(e, opts);
        }
        this.metadata.forEach(p => p.toXML(e, opts));
        this.ppragmas.forEach(p => p.toXML(e, opts));
        parent.append(e);
    }
    flat() {
        let s = "";
        if (this.version) {
            s += this.version.flat();
        }
        this.metadata.forEach(p => s += "\n" + p.flat());
        this.ppragmas.forEach(p => s += "\n" + p.flat());
        s += "\n";
        return s;
    }
}
class Version {
    version;
    comments;
    static fromXML(element) {
        return new Version(element.getAttribute("string"));
    }
    constructor(version) {
        this.version = version;
        this.comments = [];
    }
    toXML(parent, opts) {
        const e = parent.ownerDocument.createElement("version");
        e.setAttribute("string", this.version);
        parent.append(e);
        this.comments.forEach(c => c.toXML(e, opts));
    }
    flat() {
        return 'ixml version "' + this.version + '".';
    }
}
class Metadata {
    name;
    fields;
    value;
    static fromXML(element) {
        const r = new Metadata(element.getAttribute("name"), []);
        if (element.childElementCount > 0) {
            for (const c of element.children) {
                r.fields.push(IXMLPart.fromXML(c));
            }
        }
        else {
            r.value = element.textContent;
        }
        return r;
    }
    constructor(name, fields) {
        this.name = name;
        this.fields = fields;
        this.value = null;
    }
    toXML(parent, opts) {
        const e = parent.ownerDocument.createElement("metadata");
        e.setAttribute("name", this.name);
        parent.append(e);
        if (this.value) {
            e.textContent = this.value;
        }
        else {
            this.fields.forEach(c => c.toXML(e, opts));
        }
    }
    flat() {
        if (this.value) {
            return this.name + ' ' + flatQuote(this.value, '"') + '.';
        }
        else {
            return this.name + this.fields.map(c => c.flat()).join(',\n' + " ".repeat(this.name.length)) + '.';
        }
    }
}
class Field {
    name;
    value;
    static fromXML(element) {
        return new Field(element.getAttribute("name"), element.textContent);
    }
    constructor(name, value) {
        this.name = name;
        this.value = value;
    }
    toXML(parent, opts) {
        const e = parent.ownerDocument.createElement("field");
        e.setAttribute("name", this.name);
        e.textContent = this.value;
        parent.append(e);
    }
    flat() {
        return ' ' + this.name + ':' + flatQuote(this.value, '"');
    }
}
class Pragma {
    pname;
    data;
    static fromXML(element) {
        let p = new Pragma(element.getAttribute('pname'), null);
        for (const c of element.children) {
            p.data = IXMLPart.fromXML(c);
        }
        return p;
    }
    constructor(name, data) {
        this.pname = name;
        this.data = data;
    }
    toXML(parent, opts) {
        const e = parent.ownerDocument.createElement("pragma");
        e.setAttribute("pname", this.pname);
        if (this.data) {
            this.data.toXML(e, opts);
        }
        parent.append(e);
    }
    flat() {
        let s = '{[' + this.pname;
        if (this.data) {
            s += " " + this.data.flat();
        }
        return s + ']}';
    }
}
class PPragma extends Pragma {
    static fromXML(element) {
        let p = new PPragma(element.getAttribute('pname'), null);
        for (const c of element.children) {
            p.data = IXMLPart.fromXML(c);
        }
        return p;
    }
    constructor(name, data) {
        super(name, data);
    }
    toXML(parent, opts) {
        const e = parent.ownerDocument.createElement("ppragma");
        e.setAttribute("pname", this.pname);
        if (this.data) {
            this.data.toXML(e, opts);
        }
        parent.append(e);
    }
    flat() {
        let s = '{[+' + this.pname;
        if (this.data) {
            s += " " + this.data.flat();
        }
        return s + ']}';
    }
}
class PragmaData {
    data;
    static fromXML(element) {
        return new PragmaData(element.textContent);
    }
    constructor(data) {
        this.data = data;
    }
    toXML(parent, opts) {
        const e = parent.ownerDocument.createElement("pragma-data");
        e.textContent = this.data;
        parent.append(e);
    }
    flat() {
        return this.data;
    }
}
class Markable {
    /* All grammar items that can be marked */
    mark;
    comments;
    annotations;
    artifact;
    lineNumber;
    sourceLine;
    type;
    constructor(mark) {
        this.mark = mark;
        this.comments = [];
        this.artifact = false;
        // Used to mark generated terms
        this.type = null;
    }
    setMark(mark) {
        this.mark = mark;
    }
    flat(defaultMark = '') {
        return this.mark ? this.mark : defaultMark;
    }
    toXML(parent, opts) {
        if (this.mark) {
            parent.setAttribute("mark", this.mark);
        }
        if (this.type && opts.debug) {
            parent.setAttribute("type", this.type);
        }
    }
    display() { }
    visit(visitor, parent) { }
    flatComments() {
        let s = "";
        this.comments.forEach(c => s += c.flat());
        return s;
    }
}
var altsSeparator = "|";
class Naming {
    name;
    alias;
    annotations;
    static fromXML(element) {
        let name = element.getAttribute('name');
        let alias = null;
        if (element.hasAttribute('alias')) {
            alias = element.getAttribute('alias');
        }
        return new Naming(name, alias);
    }
    constructor(name, alias) {
        this.name = name;
        this.alias = alias;
        this.annotations = [];
    }
    toXML(parent, opts) {
        parent.setAttribute("name", this.name);
        if (this.alias) {
            parent.setAttribute("alias", this.alias);
        }
        this.annotations.forEach(a => a.toXML(parent, opts));
    }
    flat() {
        let r = this.name;
        if (this.alias) {
            r += ">" + this.alias;
        }
        if (this.annotations.length > 0) {
            r += " ";
            this.annotations.forEach(c => r += c.flat());
        }
        return r;
    }
    /*visit(visitor, parent) {
     visitor(this, parent);
     }*/
    value() {
        return this.alias ? this.alias : this.name;
    }
}
class Rule extends Markable {
    name;
    definition;
    /* annotations: Annotations;
     comments: Comments;*/
    pragmas;
    static fromXML(element, mark) {
        let r = new Rule(Naming.fromXML(element), Alts.fromXML(element.children), mark);
        /*let p = element.children.namedItem('pragma');*/
        let p = null;
        for (const c of element.children) {
            if (c.localName == 'pragma') {
                r.annotations.push(Pragma.fromXML(c));
                //r.pragmas.push(Pragma.fromXML(c));
            }
            if (c.localName == 'comment') {
                r.annotations.push(CommentX.fromXML(c));
                //r.comments.push(CommentX.fromXML(c));
            }
        }
        return r;
    }
    constructor(name, definition, mark) {
        super(mark);
        this.name = name instanceof Naming ? name : new Naming(name, null);
        this.definition = definition;
        /*  No brackets for top level alternates and additional spaces between alternates*/
        this.definition.sep += " ";
        this.definition.withBrackets = false;
        this.annotations = [];
        this.comments = [];
        this.pragmas = [];
        //this.pragma = null;
        this.lineNumber = null;
        this.sourceLine = null;
    }
    addComment(comment) {
        this.comments.push(comment);
    }
    toXML(parent, opts) {
        const e = parent.ownerDocument.createElement("rule");
        super.toXML(e, opts);
        this.name.toXML(e, opts);
        /*if (this.name instanceof Naming) {
            this.name.toXML(e, opts);
        } else {
            e.setAttribute("name", this.name);
        }*/
        if (this.artifact) {
            e.setAttributeNS(ixmlNS, "ixml:artifact", 'true');
        }
        this.annotations.forEach(a => a.toXML(e, opts));
        this.pragmas.forEach(p => p.toXML(e, opts));
        this.comments.forEach(c => c.toXML(e, opts));
        this.definition.allParts.forEach(p => p.toXML(e, opts));
        parent.append(e);
    }
    visit(visitor, parent = null) {
        this.definition.visit(visitor, parent);
    }
    lengthLHS() {
        /*let len = this.name instanceof Naming ? this.name.flat().length: this.name.length;*/
        let len = this.name.flat().length;
        this.annotations.filter(a => a instanceof Pragma).forEach(a => len += a.flat().length);
        /*return this.name.length + (this.pragma ? this.pragma.flat().length: 0)*/ ;
        return len;
    }
    flat(colWidth) {
        /* The rule names all align on right edge, colWidth being the length of the longest rule name
         * For definitions that would be more than 50 characters wide,
         * a newline and indent is added to the separator between alternates */
        let s = "\n" + /*this.lineNumber+ ":" +*/ " ".repeat(colWidth - this.lengthLHS());
        this.annotations.filter(a => a instanceof Pragma).forEach(p => s += p.flat());
        this.pragmas.forEach(p => s += p.flat());
        /*if (this.pragma) {
         s += this.pragma.flat();
         }*/
        s += super.flat(" ") + this.name.flat() + ": ";
        /* s += super.flat(" ") +(this.name instanceof Naming ? this.name.flat(): this.name) + ": ";*/
        this.annotations.filter(a => a instanceof CommentX).forEach(p => s += p.flat());
        this.comments.forEach(c => s += c.flat());
        const flat = this.definition.flat();
        if ((this.definition.sep.includes('|') || flat.length > 50) && !this.definition.sep.includes('\n')) {
            this.definition.sep = " " + this.definition.sep + "\n" + " ".repeat(colWidth + 3);
        }
        return s + this.definition.flat() + ". ";
    }
}
/* Using CommentX as the class name avoids confusion with a potential keyword */
class CommentX {
    parts;
    annotations;
    static fromXML(element) {
        let parts = [];
        for (const node of element.childNodes) {
            if (node instanceof Element) {
                parts.push(CommentX.fromXML(node));
            }
            else {
                parts.push(node.textContent);
            }
        }
        return new CommentX(parts);
    }
    constructor(parts) {
        this.parts = parts;
    }
    toXML(parent, opts) {
        const e = parent.ownerDocument.createElement("comment");
        this.parts.forEach(p => {
            if (p instanceof CommentX) {
                p.toXML(e, opts);
            }
            else {
                e.append(new Text(p));
            }
        });
        parent.append(e);
    }
    flat() {
        let s = "{";
        this.parts.forEach(p => {
            if (p instanceof CommentX) {
                s += p.flat();
            }
            else {
                s += p;
            }
        });
        return s + "}";
    }
}
class Container extends Markable {
    tag;
    sep;
    parts;
    allParts;
    withBrackets;
    constructor(mark) {
        super(mark);
        this.tag = null;
        this.sep = null;
        this.parts = [];
        this.allParts = [];
        // Can include comments
        this.withBrackets = false;
    }
    add(a) {
        this.parts.push(a);
        this.allParts.push(a);
    }
    unshift(a) {
        this.parts.unshift(a);
        this.allParts.unshift(a);
    }
    addComment(comment) {
        this.allParts.push(comment);
    }
    isEmpty() {
        return this instanceof Empty || this.parts.every(p => p instanceof Empty);
    }
    replaceWithMany(oldPart, newParts) {
        /* Used when rewriting parts of a container, especially when expanding quoted strings */
        let index = this.parts.indexOf(oldPart);
        this.parts.splice(index, 1, ...newParts);
        index = this.allParts.indexOf(oldPart);
        this.allParts.splice(index, 1, ...newParts);
    }
    replace(oldPart, newPart) {
        /* Used when rewriting parts of a container, especially when expanding alts and the repetition terms */
        let index = this.parts.indexOf(oldPart);
        this.parts[index] = newPart;
        index = this.allParts.indexOf(oldPart);
        this.allParts[index] = newPart;
    }
    visit(visitor, parent) {
        visitor(this, parent);
        this.parts.forEach(p => p.visit(visitor, this));
        // has the parent
    }
    display() {
        return "container";
    }
    toXML(parent, opts) {
        let p = parent;
        p = parent.ownerDocument.createElement(this.tag);
        parent.append(p);
        for (const a of this.allParts) {
            a.toXML(p, opts);
        }
    }
    /*toXML (parent, suppress) {
     let p = parent;
     if (! suppress) {
     p = parent.ownerDocument.createElement(this.tag);
     parent.append(p);
     }
     for (const a of this.allParts) {
     a.toXML (p, false);
     }
     }*/
    flat() {
        if (this.parts.length == 1) {
            return this.parts[0].flat();
        }
        let s = "";
        this.allParts.forEach((p, index) => {
            s += p.flat();
            if (!(p instanceof CommentX) && index < this.allParts.length - 1) {
                s += this.sep;
            }
        });
        return this.withBrackets ? ('(' + s + ')') : s;
    }
}
class Alts extends Container {
    static fromXML(parts) {
        let alts = new Alts();
        for (const p of parts) {
            if (p.localName == "alt") {
                let a = new Alt();
                alts.add(a);
                for (const c of p.children) {
                    a.add(IXMLPart.fromXML(c));
                }
            }
        }
        return alts;
    }
    constructor() {
        super(null);
        this.tag = "alts";
        this.sep = altsSeparator;
        this.withBrackets = true;
        this.lineNumber = null;
        this.sourceLine = null;
    }
    display() {
        return "()";
    }
}
class Alt extends Container {
    static fromXML(parts) {
        let alt = new Alt();
        for (const p of parts) {
            alt.add(IXMLPart.fromXML(p));
        }
        return alt;
    }
    constructor() {
        super(null);
        this.tag = "alt";
        this.sep = ",";
        this.withBrackets = false;
    }
}
class Empty extends Alts {
    /*  Represents the empty string */
    constructor() {
        super();
        this.add(new Alt());
    }
    toXML(parent, opts) {
        this.parts[0].toXML(parent, opts);
        /*super.toXML(parent,opts);*/
    }
}
class Subtraction extends Container {
    static fromXML(parts) {
        let sub = new Subtraction();
        for (const p of parts) {
            sub.add(IXMLPart.fromXML(p));
        }
        return sub;
    }
    constructor() {
        super(null);
        this.tag = "subtraction";
        this.sep = " ¬ ";
        this.withBrackets = false;
    }
    display() {
        return this.parts.map(p => p.display()).join(this.sep);
    }
}
class CompiledSubtraction extends Subtraction {
    constructor(left, right) {
        super();
        this.parts = [left, right];
    }
}
class Term extends Container {
    constructor() {
        super(null);
        this.parts = [];
    }
    toXML(parent, opts) {
        let p = parent;
        p = parent.ownerDocument.createElement("alt");
        parent.append(p);
        for (const a of this.parts) {
            a.toXML(p, opts);
        }
    }
}
var optionCache = {};
class Multiple extends Markable {
    /*  Optional and repetitions
     * These classes will be compiled into nonterminals pointing to other rules that implement the semantics
     * by executing the makeReference and makeRules() method
     * */
    suffix;
    occurrence;
    term;
    sep;
    tag;
    rootName;
    constructor(term, mark) {
        super(mark);
        this.term = term;
        this.sep = null;
        this.suffix = "";
        this.comments = [];
        this.rootName = null;
        this.tag = null;
        this.lineNumber = null;
        // Supports error tracing from multiples
        this.sourceLine = null;
        this.occurrence = null;
    }
    setSeparator(sep) {
        this.sep = sep;
        this.suffix += "-sep";
    }
    replace(oldPart, newPart) {
        if (this.term === oldPart) {
            this.term = newPart;
        }
    }
    makeRules(index, name) {
        return [];
    }
    makeRulesTW(index, name) {
        return this.makeRules(index, name);
    }
    addComment(comment) {
        this.comments.push(comment);
    }
    referenceName(index, single = singleNonTermRepeats) {
        if (single && this.term instanceof NonTerminal && !this.sep) {
            /*  Only use single repeats when there isn't a separator - issue #10 */
            return this.term.ref;
        }
        if (this.rootName) {
            return this.rootName + "_" + index;
        }
        this.rootName = this.term instanceof NonTerminal ? this.term.ref : "Mult";
        /*  TODO - work on only having single non-terminal multiple rules and references */
        return this.rootName + "_" + index;
    }
    makeReference(index) {
        return new NonTerminal(this.referenceName(index) + this.suffix, null);
    }
    visit(visitor, parent) {
        visitor(this, parent);
        this.term.visit(visitor, this);
        if (this.sep) {
            this.sep.visit(visitor, this);
        }
    }
    toXML(parent, opts) {
        let p = parent;
        p = parent.ownerDocument.createElement(this.tag);
        parent.append(p);
        this.term.toXML(p, opts);
        this.comments.forEach(c => c.toXML(p, opts));
        if (this.sep) {
            this.sep.toXML(p, opts);
        }
    }
    flat(symbol) {
        let s = this.term.flat();
        if (this.term instanceof Alts && !(s.startsWith("(") && s.endsWith(")"))) {
            s = "(" + s + ")";
        }
        s += symbol;
        if (this.sep) {
            s += symbol;
            this.comments.forEach(c => s += c.flat());
            s += this.sep.flat();
        }
        else {
            this.comments.forEach(c => s += c.flat());
        }
        return s;
    }
    transferChildren(name /*, sep*/) {
        // Form up the children in an appropriate container TODO - simplify this to the cases we actually should encounter
        const alts = new Alts();
        let a;
        if (this.term instanceof Alts) {
            this.term.parts.forEach((p) => {
                a = new Alt();
                p.parts.forEach(x => a.add(x));
                a.add(new NonTerminal(name, null));
                alts.add(a);
            });
        }
        else {
            a = new Alt();
            a.add(this.term);
            a.add(new NonTerminal(name, null));
            alts.add(a);
        }
        return alts;
    }
    form(name, separator) {
        const alts = new Alts();
        let a = new Alt();
        a.add(this.term);
        if (separator) {
            a.add(separator.term);
        }
        a.add(new NonTerminal(name, null));
        alts.add(a);
        return alts;
    }
}
class OptionX extends Multiple {
    static fromXML(element, mark) {
        return new OptionX(IXMLPart.fromXML(element.firstElementChild), mark);
    }
    constructor(term, mark) {
        super(term, mark);
        this.occurrence = '?';
        this.tag = "option";
        this.suffix = "-option";
    }
    makeRules(index, name) {
        if (name instanceof Naming) {
            name = name.name;
        }
        const oname = (name ? name : this.referenceName(index)) + this.suffix;
        const alts = new Alts();
        let a;
        if (this.term instanceof Alts) {
            this.term.parts.forEach(p => alts.add(p));
        }
        else {
            a = new Alt();
            a.add(this.term);
            alts.add(a);
        }
        a = new Alt();
        a.add(new Empty());
        alts.add(a);
        let newRule = new Rule(new Naming(oname, null), alts, "-");
        newRule.artifact = true;
        return [newRule];
    }
    flat() {
        return super.flat('?');
    }
}
/*
 f* => f-star
 -f-star = f+ | ().

 f+ => f-plus
 -f-plus = f | (f, f-plus).

 f**sep => f-star-sep
 -f-star-sep = f++sep | ().*/
class Repeat0 extends Multiple {
    static fromXML(element, mark) {
        let r = new Repeat0(IXMLPart.fromXML(element.firstElementChild), mark);
        if (element.children.length == 2) {
            r.setSeparator(IXMLPart.fromXML(element.children[1]));
        }
        return r;
    }
    constructor(term, mark) {
        super(term, mark);
        this.occurrence = '*';
        this.tag = "repeat0";
        this.suffix = "-star";
    }
    makeRulesTW(index) {
        if (this.sep) {
            return this.makeRulesSep(index);
        }
        else {
            return this.makeRules(index);
        }
    }
    /*  I think this is implementing
     * f* => f-star.
     * f-star: f, f-star|().
     *  */
    makeRules(index) {
        if (this.sep) {
            return this.makeRulesSep(index);
        }
        const oname = this.referenceName(index) + this.suffix;
        let alts = this.transferChildren(oname);
        let a = new Alt();
        a.add(new Empty());
        alts.add(a);
        let newRule = new Rule(oname, alts, "-");
        newRule.artifact = true;
        return [newRule];
    }
    makeRulesSep(index) {
        const oname = this.referenceName(index) + this.suffix;
        const pname = this.referenceName(index) + "-plus";
        const starName = this.referenceName(index) + "-star";
        const plus = new Repeat1(this.term, null);
        plus.sep = this.sep;
        let ref = new NonTerminal(pname, null);
        const option = new OptionX(ref, null);
        option.suffix = "-star-sep";
        let r = option.makeRules(index, this.referenceName(index));
        // Avoids having -plus-star-sep
        plus.makeRules(index).forEach(p => r.push(p));
        return r;
    }
    flat() {
        return super.flat('*');
    }
}
class Repeat1 extends Multiple {
    static fromXML(element, mark) {
        let r = new Repeat1(IXMLPart.fromXML(element.firstElementChild), mark);
        if (element.children.length == 2) {
            r.setSeparator(IXMLPart.fromXML(element.children[1]));
        }
        return r;
    }
    constructor(term, mark) {
        super(term, mark);
        this.occurrence = '+';
        this.tag = "repeat1";
        this.suffix = "-plus";
    }
    /*   f+ => f-plus
     -f-plus = f | (f, f-plus).
     */
    makeRulesTW(index) {
        const oname = this.referenceName(index) + this.suffix;
        let alts = this.form(oname, this.sep);
        let a = new Alt();
        /*if(this.term instanceof Quoted && this.term.pattern) {
         a.add(this.term);
         this.term.regEx = new RegExp(this.term.pattern.source+this.occurrence,'u');
         alts = new Alts();
         alts.add(a);
         } else {*/
        a.add(this.term);
        alts.unshift(a);
        /*}*/
        let newRule = new Rule(oname, alts, "-");
        newRule.artifact = true;
        return [newRule];
    }
    makeRules(index) {
        if (this.sep) {
            return this.makeRulesSep(index);
        }
        const oname = this.referenceName(index) + this.suffix;
        const starName = this.referenceName(index) + "-star";
        let alts = this.transferChildren(starName);
        const star = new Repeat0(this.term, null);
        let r = star.makeRules(index);
        let newRule = new Rule(oname, alts, "-");
        newRule.artifact = true;
        r.unshift(newRule);
        return r;
    }
    makeRulesSep(index) {
        const oname = this.referenceName(index) + this.suffix;
        const starName = this.referenceName(index, false) + "-star";
        let alts = this.transferChildren(starName);
        let alts2 = new Alts();
        let a = new Alt();
        a.add(this.sep.term);
        a.add(this.term);
        alts2.add(a);
        const star = new Repeat0(alts2, null);
        star.rootName = this.rootName;
        let r = star.makeRules(index);
        let newRule = new Rule(oname, alts, "-");
        newRule.artifact = true;
        r.unshift(newRule);
        return r;
    }
    flat() {
        return super.flat('+');
    }
}
class Separator extends Multiple {
    /*    tag: string;*/
    static fromXML(element, mark) {
        return new Separator(IXMLPart.fromXML(element.firstElementChild), mark);
    }
    constructor(term, mark) {
        super(term, mark);
        this.tag = "sep";
        this.suffix = "-sep";
    }
    flat() {
        let r = this.term.flat();
        if (this.term instanceof Alts && !r.startsWith('(')) {
            r = "(" + r + ")";
        }
        return r;
    }
}
class Terminal extends Markable {
    regex;
    occurrence;
    pattern;
    regEx;
    tag;
    constructor(mark) {
        super(mark);
        this.annotations = [];
        //this.regEx = null;
        this.occurrence = null;
        this.pattern = null;
        this.regEx = null;
        this.lineNumber = null;
        // Supports error tracing from subtractions
        this.sourceLine = null;
        /*this.comments =[];
         this.pragmas =[];*/
    }
    toXML(element, opts) {
        if (this.mark) {
            element.setAttribute("tmark", this.mark);
        }
        if (this.type && opts.debug) {
            element.setAttribute("type", this.type);
        }
        this.annotations.forEach(a => a.toXML(element, opts));
        /*this.comments.forEach(c => c.toXML (element));
         this.pragmas.forEach(c => c.toXML (element));*/
    }
    addComment(comment) {
        this.annotations.push(comment);
        //this.comments.push(comment);
    }
    visit(visitor, parent) {
        visitor(this, parent);
    }
    matches(c) {
        return false;
    }
    flat() {
        let s = "";
        this.annotations.forEach(p => {
            s += p.flat();
        });
        /*this.pragmas.forEach(p => {
         s += p.flat()
         });*/
        return s + super.flat();
        //return s + this.flatComments() + super.flat() + this.ref;
    }
    showPattern(e, opts) {
        if (showPattern && opts.debug) {
            if (this.pattern) {
                e.setAttribute("pattern", this.pattern);
            }
            if (this.regEx) {
                e.setAttribute("regEx", this.regEx);
            }
            if (this.occurrence) {
                e.setAttribute("occurrence", this.occurrence);
            }
        }
    }
}
class NonTerminal extends Markable {
    name;
    parts;
    ref;
    static fromXML(element, mark) {
        return new NonTerminal(element.getAttribute('name'), mark);
    }
    constructor(link, mark) {
        super(mark);
        this.name = link instanceof Naming ? link : new Naming(link, null);
        /*this.ref = link instanceof Naming ? link.name: link;*/
        this.ref = link instanceof Naming ? link.name : link;
        this.parts = [];
        /* They have an empty parts for compliance with StateSet.predictOne()  */
        this.annotations = [];
        /*this.pragmas =[];
         this.comments =[];*/
    }
    visit(visitor, parent) {
        visitor(this, parent);
    }
    display() {
        return super.flat() + this.ref;
    }
    toXML(parent, opts) {
        const e = parent.ownerDocument.createElement("nonterminal");
        super.toXML(e, opts);
        if (this.name instanceof Naming) {
            this.name.toXML(e, opts);
        }
        else {
            e.setAttribute("name", this.ref);
        }
        parent.append(e);
        this.annotations.forEach(a => a.toXML(e, opts));
        /* this.comments.forEach(c => c.toXML (e));
         this.pragmas.forEach(p => p.toXML (e));*/
    }
    flat() {
        let s = "";
        this.annotations.forEach(p => {
            s += p.flat();
        });
        /*this.pragmas.forEach(p => {
         s += p.flat()
         });*/
        return s + super.flat() + (this.name instanceof Naming ? this.name.flat() : this.ref);
        //return s + this.flatComments() + super.flat() + this.ref;
    }
    addComment(comment) {
        this.comments.push(comment);
    }
}
class Insertion {
    isHex; /*  Not worth subclassing at the present - variation too simple */
    text;
    value;
    lineNumber;
    sourceLine;
    static fromXML(element) {
        if (element.hasAttribute("string")) {
            return new Insertion(element.getAttribute('string'), false);
        }
        else if (element.hasAttribute("hex")) {
            return new Insertion(element.getAttribute('hex'), true);
        }
        else {
            grumble("<insertion/> in the XML syntax must have one of @string|@hex");
        }
    }
    constructor(text, isHex) {
        this.isHex = isHex;
        this.text = text;
        this.value = isHex ? String.fromCodePoint(parseInt(text, 16)) : text;
        this.lineNumber = 0;
        this.sourceLine = "";
    }
    visit(visitor, parent) {
        visitor(this, parent);
    }
    display() {
        return "+" + (this.isHex ? ('#' + this.text) : ('"' + this.value.replaceAll('"', '""') + '"'));
    }
    toXML(parent, opts) {
        const e = parent.ownerDocument.createElement("insertion");
        e.setAttribute(this.isHex ? "hex" : "string", this.text);
        parent.append(e);
    }
    flat() {
        return this.display() /* + this.flatComments()*/;
    }
}
class Literal {
    /*Not Markable - This class never actually gets instantiated,
     * but its static method fromXML() is used to generate its associated classes
     * */
    static fromXML(element, mark) {
        if (element.hasAttribute("string")) {
            return new Quoted(element.getAttribute('string'), mark, '"');
        }
        else if (element.hasAttribute("hex")) {
            const hex = element.getAttribute('hex');
            if (!/^[A-Fa-f0-9]+$/.test(hex)) {
                grumble("literal/@hex in the XML syntax must be a valid hexadecimal number. Provided:'" + hex + "'", "S06");
            }
            return new Encoded(hex, mark);
        }
        else {
            grumble("<literal/> in the XML syntax must have one of @string|@hex");
        }
    }
}
function flatQuote(s, quoteChar) {
    return quoteChar + s.replaceAll(quoteChar, quoteChar + quoteChar) + quoteChar;
}
class Quoted extends Terminal {
    quoteChar;
    value;
    constructor(/** string */ s, mark, quoteChar) {
        super(mark);
        /** string */ this.value = s;
        this.quoteChar = quoteChar;
        /* this.regEx = null;
         this.occurrence = null;*/
        //this.pattern = new RegExp(s,'u');
        this.pattern = s.replaceAll(/(\?|\+|\*|\.|\|)/g, "\\$1");
        if (s.match(/^\s+$/)) {
            this.type = "WS";
        }
    }
    matches(c) {
        return this.value == c;
    }
    display() {
        return super.flat() + '"' + this.value.replaceAll('"', '""') + '"' + (this.occurrence ? this.occurrence : "");
    }
    toXML(parent, opts) {
        const e = parent.ownerDocument.createElement("literal");
        super.toXML(e, opts);
        e.setAttribute("string", this.value);
        this.showPattern(e, opts);
        /* e.setAttribute("pattern", this.pattern);*/
        /* if(this.regEx) {
        e.setAttribute("regEx", this.regEx);
        }
        if(this.occurrence) {
        e.setAttribute("occurrence", this.occurrence);
        }*/
        parent.append(e);
    }
    flat() {
        //return super.flat() + '"' + this.value.replaceAll('"', '""') + '"' + this.flatComments();
        return super.flat() + flatQuote(this.value, this.quoteChar) + (this.occurrence ? this.occurrence : "") + this.flatComments();
    }
}
class Encoded extends Terminal {
    text;
    codePoint;
    value;
    constructor(s, mark) {
        super(mark);
        this.text = s;
        this.codePoint = parseInt(s, 16);
        try {
            this.value = String.fromCodePoint(this.codePoint);
        }
        catch (e) {
            grumble("encoded character is not a valid Unicode point. Provided:'" + s + "'", "S06");
        }
        this.pattern = '\\u' + s.padStart(4, '0');
        /*  TODO - check that this is a valid Unicode character */
    }
    matches(c) {
        return this.codePoint == c.codePointAt(0);
    }
    toXML(parent, opts) {
        const e = parent.ownerDocument.createElement("literal");
        super.toXML(e, opts);
        e.setAttribute("hex", this.text);
        this.showPattern(e, opts);
        /* e.setAttribute("pattern", this.pattern);*/
        /* if(this.regEx) {
        e.setAttribute("regEx", this.regEx);
        }
        if(this.occurrence) {
        e.setAttribute("occurrence", this.occurrence);
        }*/
        parent.append(e);
    }
    display() {
        return super.flat() + "#" + this.text;
    }
    flat() {
        return super.flat() + "#" + this.text + this.flatComments();
    }
}
class Charset extends Terminal {
    parts;
    allParts;
    static fromXML(element, exclude, mark) {
        let charSet = exclude ? new Exclusion(mark) : new Inclusion(mark);
        for (const c of element.children) {
            charSet.add(IXMLPart.fromXML(c));
        }
        return charSet;
    }
    constructor(mark) {
        super(mark);
        this.parts = [];
        this.allParts = [];
        this.tag = "charset";
        this.pattern = null;
    }
    add(a) {
        this.parts.push(a);
        this.allParts.push(a);
        if (!this.pattern) {
            this.pattern = a.pattern;
        }
        else {
            //this.pattern = new RegExp(this.pattern.source + "|" + a.pattern.source,'u');
            this.pattern += a.pattern;
        }
    }
    addComment(comment) {
        this.allParts.push(comment);
    }
    visit(visitor, parent) {
        visitor(this, parent);
        this.parts.forEach(p => p.visit(visitor, this));
    }
    toXML(parent, opts) {
        let e = parent.ownerDocument.createElement(this.tag);
        super.toXML(e, opts);
        this.showPattern(e, opts);
        parent.append(e);
        for (const p of this.allParts) {
            p.toXML(e, opts);
        }
    }
    matches(c) {
        for (const v of this.parts) {
            if (v.matches(c)) {
                return true;
            }
        }
        return false;
    }
    display() {
        return "[" + this.parts.map(p => p.display()).join(';') + "]";
    }
    flat() {
        let s = super.flat() + (this.tag == 'exclusion' ? '~' : '') + "[";
        this.allParts.forEach((p, index) => {
            s += p.flat();
            if (!(p instanceof CommentX) && index < this.allParts.length - 1) {
                s += ';';
            }
        });
        s += "]" + this.flatComments();
        return s;
    }
}
class Inclusion extends Charset {
    constructor(mark) {
        super(mark);
        this.tag = "inclusion";
    }
}
class Exclusion extends Charset {
    constructor(mark) {
        super(mark);
        this.tag = "exclusion";
    }
    matches(c) {
        return !super.matches(c);
    }
    display() {
        return "~" + super.display();
    }
}
class Member {
    /* members of a charset and hence not themselves markable */
    value;
    regex;
    pattern;
    attributeName;
    comments;
    static fromXML(element) {
        if (element.hasAttribute("string")) {
            return new MemberString(element.getAttribute('string'));
        }
        if (element.hasAttribute("hex")) {
            return new MemberHex(element.getAttribute('hex'));
        }
        if (element.hasAttribute("code")) {
            return new Code(element.getAttribute('code'));
        }
        if (element.hasAttribute("from")) {
            const fromC = element.getAttribute('from');
            const toC = element.getAttribute('to');
            return new RangeX(fromC[0] == '#' ? new MemberHex(fromC.substring(1)) : new MemberString(fromC), toC[0] == '#' ? new MemberHex(toC.substring(1)) : new MemberString(toC));
        }
        grumble("<member/> in XML syntax must have one of @string|@hex|@code|(@from,@to)");
    }
    constructor() {
        this.comments = [];
        this.value = null;
        this.attributeName = null;
        this.pattern = null;
    }
    visit(visitor, parent) {
        visitor(this, parent);
    }
    display() {
        return this.value;
    }
    matches(c) {
        return false;
    }
    addComment(comment) {
        this.comments.push(comment);
    }
    toXML(parent, opts) {
        const e = parent.ownerDocument.createElement("member");
        e.setAttribute(this.attributeName, this.value);
        this.showPattern(e, opts);
        /*if(this.pattern) {
         e.setAttribute("pattern", this.pattern);
         }*/
        parent.append(e);
        this.comments.forEach(c => c.toXML(e, opts));
    }
    flat() {
        return this.comments.map(c => c.flat()).join('');
    }
    showPattern(e, opts) {
        if (opts.debug && this.pattern) {
            e.setAttribute("pattern", this.pattern);
        }
    }
}
class MemberString extends Member {
    /*value: string;*/
    quoteChar;
    constructor(s, quoteChar = '"') {
        super();
        this.value = s;
        this.attributeName = "string";
        this.quoteChar = quoteChar;
        this.pattern = s;
    }
    getCodePoint() {
        return this.value.codePointAt(0);
    }
    matches(c) {
        return this.value.includes(c);
    }
    flat() {
        return flatQuote(this.value, this.quoteChar) + super.flat();
    }
    rangeValue() {
        return this.value;
    }
}
class MemberHex extends Member {
    codePoint;
    /*value: string;*/
    constructor(s) {
        super();
        this.value = s;
        this.codePoint = parseInt(s, 16);
        this.attributeName = "hex";
        this.pattern = '\\u' + s.padStart(4, '0');
        /*  TODO - check that this is a valid Unicode character */
    }
    getCodePoint() {
        return this.codePoint;
    }
    matches(c) {
        return this.codePoint == c.codePointAt(0);
    }
    display() {
        return this.flat();
    }
    flat() {
        return "#" + this.value /*+ '|' + String.fromCodePoint(this.codePoint) + '|'*/ + super.flat();
    }
    rangeValue() {
        return "#" + this.value;
    }
}
class RangeX extends Member {
    fromChar;
    toChar;
    fromCP;
    toCP;
    constructor(fromChar, toChar) {
        super();
        if ((fromChar instanceof MemberString && fromChar.value.length != 1) || (toChar instanceof MemberString && toChar.value.length != 1)) {
            grumble("The start and end of a charset range must each be exactly one character", "S09");
        }
        this.fromChar = fromChar;
        this.toChar = toChar;
        this.fromCP = fromChar.getCodePoint();
        this.toCP = toChar.getCodePoint();
        if (this.toCP <= this.fromCP) {
            grumble("The start character of a charset range must have a code point value less than that of the end", "S09");
        }
        this.pattern = fromChar.pattern + '-' + toChar.pattern;
    }
    matches(c) {
        const cp = c.codePointAt(0);
        return this.fromCP <= cp && cp <= this.toCP;
    }
    display() {
        return this.flat();
    }
    toXML(parent, opts) {
        const e = parent.ownerDocument.createElement("member");
        e.setAttribute("from", this.fromChar.rangeValue());
        e.setAttribute("to", this.toChar.rangeValue());
        this.showPattern(e, opts);
        /*if(this.pattern) {
         e.setAttribute("pattern", this.pattern);
         }*/
        this.comments.forEach(c => c.toXML(e, opts));
        parent.append(e);
    }
    flat() {
        return this.fromChar.flat() + '-' + this.toChar.flat() + super.flat();
    }
}
class Code extends Member {
    /*value: string;*/
    constructor(code) {
        super();
        this.value = code;
        try {
            this.regex = new RegExp('\\p{' + code + '}', 'u');
        }
        catch (e) {
            grumble("'" + code + "' is not a valid Unicode character class", "S10");
        }
        this.pattern = '\\p{' + code + '}';
        this.attributeName = "code";
    }
    matches(c) {
        return this.regex.test(c);
    }
    flat() {
        return this.value + super.flat();
    }
}

;// CONCATENATED MODULE: ../tsc/built/ixmlParse.js
/* A parser for an iXML grammar, producing a tree of objects representing the grammar
 *  */
/* These functions are called from XSLT using the namespace http://saxonica.com/ns/globalJS,
e.g. xmlns:js="http://saxonica.com/ns/globalJS"  .... js:animProgress($anim)
*/



/* A position in the input text stream */
class Position {
    offset;
    line;
    col;
    constructor(offset, line, col) {
        this.offset = offset;
        this.line = line;
        this.col = col;
    }
}
class Tracker {
    input;
    inputOffset;
    inputLength;
    lineNumber;
    colNumber;
    c;
    line;
    lines;
    savedPositions;
    constructor() {
        this.input = "";
        // The string being parsed
        this.inputOffset = 0;
        // The current position within the input string
        this.inputLength = 0;
        // The length of the input string
        this.lineNumber = 1;
        // The line number (within the expression) of the current token
        this.colNumber = 1;
        this.c = null;
        this.line = "";
        this.lines = null;
        this.savedPositions = [];
    }
    track(source) {
        this.input = source;
        this.inputLength = source.length;
        this.lines = source.split(/\n/);
        if (source.startsWith('\n')) {
            // Advance one line if it starts with a \n
            this.lineNumber++;
        }
    }
    getPoint() {
        return this.inputOffset;
    }
    setPoint(point) {
        this.inputOffset = point;
    }
    /*  Recording positions for potential backtracking - used with literals and certainly in the prolog? */
    savePlace() {
        this.savedPositions.push(new Position(this.inputOffset, this.lineNumber, this.colNumber));
    }
    restorePlace() {
        const p = this.savedPositions.pop();
        this.inputOffset = p.offset;
        this.lineNumber = p.line;
        this.colNumber = p.col;
    }
    discardPlace() {
        this.savedPositions.pop();
    }
    advancePlace(nChars) {
        while (nChars--) {
            this.next();
        }
    }
    getChar() {
        return this.input.charAt(this.inputOffset);
    }
    getLine(lineNo) {
        return this.lines[lineNo - 1];
    }
    hasInput() {
        return this.inputOffset < this.inputLength;
    }
    startsWith(s) {
        return this.input.substring(this.inputOffset).startsWith(s);
    }
    next() {
        if (this.inputOffset == this.inputLength) {
            grumble("End of input");
        }
        this.inputOffset = this.inputOffset + 1;
        this.c = this.input.charAt(this.inputOffset);
        this.line += this.c;
        if (/\n/.test(this.c)) {
            this.lineNumber++;
            this.colNumber = 0;
            this.line = "";
        }
        this.colNumber++;
        return this.c;
    }
    back() {
        if (this.inputOffset == 0) {
            return;
        }
        if (/\n/.test(this.c)) {
            this.lineNumber--;
            /* TODO - fix the column number */
            this.colNumber = 0;
            this.line = "";
        }
        else {
            this.colNumber--;
        }
        this.inputOffset = this.inputOffset - 1;
        this.c = this.input.charAt(this.inputOffset);
    }
    matches(pattern) {
        return this.input.substring(this.inputOffset).match(pattern);
    }
    test(pattern) {
        /*console.log(this.input.substring(this.inputOffset));
         console.log(pattern.test(this.input.substring(this.inputOffset)));*/
        return pattern.test(this.input.substring(this.inputOffset));
    }
    locationString() {
        return "line " + this.lineNumber + ", column " + this.colNumber;
    }
    location() {
        return {
            line: this.lineNumber, col: this.colNumber
        };
    }
    sample() {
        return this.line;
    }
    showChar() {
        let c = this.getChar();
        if (c) {
            return "'" + c + "' (codepoint " + c.codePointAt(0) + ")";
        }
        return "(no character)";
    }
    expect(c, message = "", code = "G000") {
        if (c != this.getChar()) {
            this.grumbleNear(message + "\nExpecting character:'" + c + "' - given: " + this.showChar(), code);
            //this.grumbleNear(message + "\nExpecting character:'" + c + "', given:'" + this.getChar() + "' (codepoint " + this.getChar().codePointAt(0) + ")", "G000");
        }
        this.next();
    }
    expectOneOf(pattern, message = "") {
        if (!pattern.includes(this.getChar())) {
            let s = pattern.split('').map(c => "'" + c + "'").join(',');
            this.grumbleNear(message + "\nExpecting one of " + s + " - given: " + this.showChar(), "G000");
        }
        this.next();
    }
    grumbleNear(message, code = "ABCD") {
        const pos = this.location();
        message += ".\nNear " + this.locationString() + ".\n";
        message += this.getLine(pos.line) + "\n";
        message += " ".repeat(pos.col - 1) + "^\n";
        grumble(message, code);
    }
}
/* Parsing & compiling */
function parse(grammarString, options) {
    const parser = new ixmlParser(options);
    return parser.parse(grammarString);
}
function parseFromXML(xml, options) {
    const parser = new ixmlParser(options);
    return parser.parseXML(xml);
}
function compile(grammarString, options) {
    const grammar = parse(grammarString, options);
    grammar.compile(options);
    return grammar;
}
function compileFromXML(grammarXML, options) {
    const grammar = parseFromXML(grammarXML, options);
    grammar.compile(options);
    return grammar;
}
class ixmlParser {
    tracker;
    grammarString;
    grammarVersion;
    debug;
    supportPragmas;
    supportVersion;
    strictVersion;
    missing;
    constructor(options) {
        this.tracker = null;
        this.grammarString = null;
        let getOptionBoolean = lookupOption(options, false);
        this.debug = getOptionBoolean("debug");
        this.supportPragmas = getOptionBoolean("pragmas");
        this.missing = getOptionBoolean("missing");
        let version = getOptionBoolean('version1.1');
        this.supportVersion = version ? "1.1" : "1.0";
        this.strictVersion = getOptionBoolean('strictVersion');
        this.grammarVersion = "1.0";
    }
    grumbleNear(message, code = "G000") {
        this.tracker.grumbleNear(message, code);
    }
    getPoint() {
        return this.tracker.getPoint();
    }
    hasInput() {
        return this.tracker.hasInput();
    }
    getChar() {
        return this.tracker.getChar();
    }
    startsWith(s) {
        return this.tracker.startsWith(s);
    }
    next() {
        return this.tracker.next();
    }
    back() {
        return this.tracker.back();
    }
    expect(c, message, code = "G000") {
        return this.tracker.expect(c, message, code);
    }
    expectOneOf(c, message) {
        return this.tracker.expectOneOf(c, message);
    }
    expectString(s, message) {
        s.split('').forEach(c => {
            this.expect(c, message);
        });
    }
    matches(pattern) {
        return this.tracker.matches(pattern);
    }
    test(pattern) {
        return this.tracker.test(pattern);
    }
    savePlace() {
        this.tracker.savePlace();
    }
    restorePlace() {
        this.tracker.restorePlace();
    }
    advancePlace(nChars) {
        this.tracker.advancePlace(nChars);
    }
    untilChar(quoteChar) {
        let value = "";
        let c = this.getChar();
        while (c != quoteChar) {
            value += c;
            if (!this.hasInput()) {
                this.grumbleNear("Unterminated string " + quoteChar + "...");
            }
            c = this.next();
        }
        return value;
    }
    parse(grammarString) {
        const startTime = performance.now();
        this.grammarString = grammarString;
        const tracker = new Tracker();
        this.tracker = tracker;
        tracker.track(grammarString);
        try {
            let parts = this.parseIXML();
            const grammar = new Grammar(parts);
            grammar.version = this.grammarVersion.toString();
            grammar.parseTime = performance.now() - startTime;
            return grammar;
        }
        catch (e) {
            if (isGrumble(e)) {
                throw e;
                //this.grumbleNear(e.message, "PARSE");
            }
            this.grumbleNear(e.message, e.code);
        }
    }
    parseXML(grammarXML) {
        const startTime = performance.now();
        if (!(grammarXML instanceof Document || grammarXML instanceof DocumentFragment) || grammarXML.firstChild.nodeName != "ixml") {
            grumble("An ixml grammar in XML format must be supplied as a document-node(element(ixml))");
        }
        let parts = [];
        let children = grammarXML.firstChild.children;
        for (const c of children) {
            parts.push(IXMLPart.fromXML(c));
        }
        const grammar = new Grammar(parts);
        grammar.parseTime = performance.now() - startTime;
        return grammar;
    }
    parseIXML() {
        let parts = this.parseOptWhitespace();
        let prolog = this.parseProlog();
        parts = parts.concat(prolog);
        parts = parts.concat(this.parseOptWhitespace());
        let rules = this.parseRules();
        parts = parts.concat(rules);
        parts = parts.concat(this.parseOptWhitespace());
        return parts;
    }
    /* Whitespace and comment parsing */
    parseTrueWhitespace() {
        let c = this.getChar();
        while (/\s/.test(c)) {
            c = this.next();
        }
    }
    /*  return comments from optional whitespace */
    parseOptWhitespace(target = null) {
        let comments = [];
        let c = this.getChar();
        while (/\s/.test(c)) {
            c = this.next();
        }
        if (c == "{") {
            if (!(this.supportPragmas && this.startsWith("{["))) {
                comments.push(this.parseComment());
                this.parseOptWhitespace().forEach(p => comments.push(p));
            }
        }
        if (target) {
            /*  If there is a target object then add the comments to it */
            comments.forEach(co => target.addComment(co));
        }
        return comments;
    }
    parseOptPragmaWhitespace(target = null) {
        let comments = [];
        let c = this.getChar();
        while (/\s/.test(c)) {
            c = this.next();
        }
        while (c == "{") {
            comments.push((this.supportPragmas && this.startsWith("{[")) ? this.parsePragma() : this.parseComment());
            c = this.getChar();
            while (/\s/.test(c)) {
                c = this.next();
            }
        }
        /*if (target) {
         /\*  If there is a target object then add the comments to it *\/
         comments.forEach(co => target.addComment(co));
         }*/
        return comments;
    }
    /*  return comments from required whitespace */
    parseRequiredWhitespace(target = null) {
        const c = this.getChar();
        if (/\s|\{/.test(c)) {
            return this.parseOptWhitespace(target);
        }
        this.grumbleNear("Must have whitespace, given: '" + c + "' codepoint(" + c.codePointAt(0) + ")", "S01");
    }
    parseComment() {
        let parts = [];
        let comment = "";
        this.expect("{", 'Invalid comment syntax');
        let c = this.getChar();
        while (c != '}') {
            if (c == '{') {
                if (comment != '') {
                    parts.push(comment);
                }
                parts.push(this.parseComment());
                comment = "";
                c = this.getChar();
            }
            else {
                comment += c;
                if (!this.hasInput()) {
                    this.grumbleNear("Unterminated comment");
                }
                c = this.next();
            }
        }
        if (comment != '') {
            parts.push(comment);
        }
        this.expect('}', 'Invalid comment syntax');
        return new CommentX(parts);
    }
    /*  Prolog */
    parseProlog() {
        let c = this.getChar();
        let version;
        let pragmas = [];
        let parts = [];
        switch (c) {
            case 'i':
                version = this.parseVersion();
                break;
            case 'x':
                break;
        }
        if (version) {
            parts = this.parseOptWhitespace();
        }
        if (this.startsWith("{[+")) {
            if (!version) {
                this.grumbleNear("A prolog must contain a declaration of iXML version");
            }
            while (this.startsWith("{[+")) {
                /*pragmas.push(this.parsePPragma());*/
                pragmas.push(this.parsePragma(true));
            }
        }
        if (version || pragmas.length > 0) {
            let p = new Prolog(version, pragmas);
            let meta;
            while (!(this.startsWith("{[") || this.startsWith("-")) && (meta = this.parseMetadata())) {
                p.metadata.push(meta);
            }
            parts.unshift(p);
        }
        return parts;
    }
    parseMetadata() {
        const nameStart = new RegExp(/\p{L}|_/u, 'u');
        this.savePlace();
        let c;
        let name = this.parseName();
        if (name.length > 0) {
            c = this.getChar();
            if (!/\s/.test(c)) {
                this.restorePlace();
                return null;
            }
            this.parseOptWhitespace();
            c = this.getChar();
            let value;
            let fields = [];
            if (/'|"/.test(c)) {
                value = this.parseQuoted(c);
            }
            else if (nameStart.test(c)) {
                let f;
                while (f = this.parseField()) {
                    fields.push(f);
                    if (this.getChar() != ',') {
                        this.parseOptWhitespace();
                        break;
                    }
                    this.next();
                    this.parseOptWhitespace();
                }
                ;
            }
            else {
                this.restorePlace();
                return null;
            }
            c = this.getChar();
            if (/\./.test(c)) {
                let m = new Metadata(name, fields);
                if (value) {
                    m.value = value.value;
                }
                this.next();
                this.parseOptWhitespace();
                return m;
            }
            this.restorePlace();
        }
        return null;
    }
    parseField() {
        this.savePlace();
        let name = this.parseName();
        if (name.length > 0) {
            this.parseOptWhitespace();
            this.expect(':', "Invalid field declaration. ", "G000");
            this.parseOptWhitespace();
            let c = this.getChar();
            let value;
            if (/'|"/.test(c)) {
                value = this.parseQuoted(c);
            }
            else {
                this.grumbleNear("A metadata field value must be a quoted string");
            }
            return new Field(name, value.value);
        }
        this.restorePlace();
        return null;
    }
    parseVersion() {
        this.savePlace();
        /* We may need to backtrack */
        let found = this.matches(/ixml/);
        if (found) {
            this.advancePlace(found[0].length);
            if (/\s|\{/.test(this.getChar())) {
                let comments = this.parseRequiredWhitespace();
                found = this.matches(/version/);
                if (found) {
                    this.advancePlace(found[0].length);
                    comments = comments.concat(this.parseRequiredWhitespace());
                    if (!/'|"/.test(this.getChar())) {
                        this.grumbleNear("Invalid version declaration", "G000");
                    }
                    let version = this.parseQuoted(this.getChar());
                    comments = comments.concat(this.parseOptWhitespace());
                    this.expect('.', "Invalid version declaration. ", "G000");
                    //this.next();
                    if (this.strictVersion && version.value > this.supportVersion) {
                        this.grumbleNear("Version" + version.value + " not supported in this configuration", "G000");
                    }
                    this.grammarVersion = version.value;
                    const v = new Version(version.value);
                    comments.forEach(c => v.comments.push(c));
                    return v;
                }
            }
        }
        this.restorePlace();
        return null;
    }
    parsePragma(isPPragma = false) {
        this.expectString(isPPragma ? '{[+' : '{[', "Invalid pragma syntax. ");
        let name = this.parseQName();
        //let name = this.parseName();
        let data = null;
        let c = this.getChar();
        if (/\s/.test(c)) {
            this.parseTrueWhitespace();
            //this.parseOptWhitespace();
            data = this.parsePragmaData();
        }
        this.expectString(']}', "Invalid pragma syntax. ");
        this.parseTrueWhitespace();
        let p = isPPragma ? new PPragma(name, data) : new Pragma(name, data);
        return p;
    }
    parsePragmaData() {
        let value = "";
        let c = this.getChar();
        while (!(/\]/.test(c))) {
            value += c;
            if (c == "{") {
                c = this.next();
                let pd = this.parseBracketPair();
                value += pd.data + "}";
            }
            c = this.next();
        }
        return new PragmaData(value);
    }
    parseBracketPair() {
        let value = "";
        let c = this.getChar();
        while (!(/\}/.test(c))) {
            value += c;
            if (c == "{") {
                c = this.next();
                let pd = this.parseBracketPair();
                value += pd.data + "}";
            }
            c = this.next();
        }
        return new PragmaData(value);
    }
    /*  Rules */
    parseRules() {
        let parts = [];
        while (this.hasInput()) {
            parts.push(this.parseRule());
            if (this.hasInput()) {
                parts = parts.concat(this.parseRequiredWhitespace());
            }
        }
        return parts;
    }
    parseRule() {
        let mark = null;
        let annotations = [];
        /*let comments =[];
         let pragmas =[];*/
        let c = this.getChar();
        let start = this.getPoint();
        annotations = this.parseOptPragmaWhitespace();
        c = this.getChar();
        /*this.parseOptPragmaWhitespace().forEach(c => {
         if (c instanceof CommentX) {
         comments.push(c)
         } else {
         pragmas.push(c)
         }
         });*/
        /*     if (this.supportPragmas && this.startsWith('{[')) {
        while (this.startsWith('{[')) {
        pragmas.push(this.parsePragma());
        }
        c = this.getChar();
        }*/
        if (/@|-|\^/.test(c)) {
            mark = c;
            c = this.next();
            this.parseOptWhitespace().forEach(c => annotations.push(c));
        }
        /*let name = this.parseName();*/
        let name = this.parseNaming();
        /* name.annotations.forEach(c => annotations.push(c));*/
        this.parseOptWhitespace().forEach(c => annotations.push(c));
        this.expectOneOf(':=', "Invalid rule syntax. Missing name-definition separator.");
        this.parseOptWhitespace().forEach(c => annotations.push(c));
        let definition = this.parseAlts();
        annotations = annotations.concat(this.parseOptPragmaWhitespace());
        /*this.parseOptPragmaWhitespace().forEach(c => {
         if (c instanceof CommentX) {
         comments.push(c)
         } else {
         pragmas.push(c)
         }
         });*/
        this.expect('.', "Invalid rule syntax. Missing rule terminator character.", "S12");
        let rule = new Rule(name, definition, mark);
        let end = this.getPoint();
        rule.sourceLine = this.grammarString.substring(start, end);
        /*if (pragma) {
         rule.pragma = pragma;
         rule.pragmas.push(pragma);
         }*/
        rule.annotations = annotations;
        /*rule.pragmas = pragmas;
         rule.comments = comments;*/
        //comments.forEach(c => rule.addComment(c));
        rule.lineNumber = this.tracker.lineNumber;
        return rule;
    }
    /* Names */
    parseName() {
        let name = "";
        const nameStart = new RegExp(/\p{L}|_/u, 'u');
        //const nameFollowerOLD = new RegExp(/\p{L}|\p{Nd}|\p{Mn}|-|[_.·‿⁀]/u, 'u');
        const nameFollower = new RegExp(/\p{L}|_|\p{Nd}|\p{Mn}|-|\./u, 'u');
        const nameRest = new RegExp(/^\s+(\p{L}|_|-|@|\{)|$/u, 'u');
        let c = this.getChar();
        let lastC = c;
        if (!(nameStart.test(c))) {
            this.grumbleNear("'" + c + "' (codepoint " + c.codePointAt(0) + ") is not a valid name character");
        }
        name = c;
        c = this.next();
        //while (/\w|\-|\./.test(c)) {
        while (nameFollower.test(c)) {
            name += c;
            lastC = c;
            c = this.next();
        }
        if (lastC == '.' && this.test(nameRest)) {
            /* In this case the name ends in a period and the following term is likely to be another name,
             * hence the period is actually a rule ender.
             * Back up one character and truncate the name to remove the trailing period */
            name = name.substring(0, name.length - 1);
            this.back();
        }
        return name;
    }
    parseNaming() {
        let name = this.parseName();
        let annotations = [];
        this.parseOptWhitespace().forEach(c => annotations.push(c));
        let c = this.getChar();
        let alias = null;
        if (c == '>') {
            if (this.grammarVersion < "1.1") {
                this.grumbleNear("Renaming supported only in iXML grammar version >=1.1");
            }
            this.next();
            this.parseOptWhitespace().forEach(c => annotations.push(c));
            c = this.getChar();
            if (c == '"' || c == "'") {
                alias = this.getQuoted(c);
                if (alias.length == 0) {
                    this.grumbleNear("An alias literal string may not be empty", "G00");
                }
            }
            else {
                alias = this.parseName();
            }
        }
        let r = new Naming(name, alias);
        r.annotations = annotations;
        return r;
    }
    parseQName() {
        let name = this.parseName();
        let c = this.getChar();
        if (c == ':') {
            name += c;
            this.next();
            name += this.parseName();
        }
        return name;
    }
    /*  Alternatives and sequences */
    parseAlts() {
        let comments;
        let sep = null;
        const a = new Alts();
        let c = this.getChar();
        let alt;
        if (/;|\|/.test(c)) {
            alt = new Empty();
        }
        else {
            alt = this.parseAlt();
        }
        if (alt) {
            a.add(alt);
        }
        c = this.getChar();
        while (/;|\|/.test(c)) {
            if (!sep) {
                sep = c;
            }
            ;
            this.next();
            this.parseOptWhitespace(a);
            c = this.getChar();
            if (/;|\|/.test(c)) {
                a.add(new Empty());
            }
            else {
                a.add(this.parseAlt());
                this.parseOptWhitespace(a);
                c = this.getChar();
            }
        }
        if (sep) {
            a.sep = sep;
        }
        ;
        return a;
    }
    parseAlt() {
        const a = new Alt();
        let term = this.parseTerm();
        if (term) {
            a.add(term);
        }
        let c = this.getChar();
        while (/,/.test(c)) {
            this.next();
            this.parseOptWhitespace(a);
            term = this.parseTerm();
            if (!term) {
                this.grumbleNear("Invalid start of term");
            }
            a.add(term);
            c = this.getChar();
        }
        //this.parseOptWhitespace(a);
        return a;
    }
    /* Terms */
    parseTerm(inSubtraction = false) {
        let c = this.getChar();
        let term;
        let mark = null;
        /* if(c == '.') {
         this.grumbleNear("'.' is not a valid term", "G00");
         }*/
        /* let comments =[];
        let pragmas =[];*/
        let annotations = [];
        if (this.supportPragmas && this.startsWith('{[')) {
            /* this.parseOptPragmaWhitespace().forEach(p => {
             if (p instanceof CommentX) {
             comments.push(p)
             } else {
             pragmas.push(p)
             }
             });*/
            annotations = this.parseOptPragmaWhitespace();
            //pragma = this.parsePragma();
            c = this.getChar();
        }
        if (/@|-|\^|\+/.test(c)) {
            mark = c;
            c = this.next();
            this.parseOptWhitespace();
            /* TODO - where does this get stored? */
            c = this.getChar();
        }
        if (mark == '+') {
            return this.parseInsertion();
        }
        switch (c) {
            case '(':
                if (mark) {
                    this.grumbleNear("No marker permitted on bracketed constructs (factor), given '" + mark + "'", "S006");
                }
                term = this.parseBracketed();
                break;
            case ')':
                return null;
                break;
            case '"':
                term = this.parseQuoted(c);
                break;
            case "'":
                term = this.parseQuoted(c);
                break;
            case '#':
                term = this.parseEncoded();
                break;
            case '[':
                term = this.parseSet(false);
                break;
            case '~':
                this.next();
                this.parseOptWhitespace();
                /* TODO - where does this get stored? */
                term = this.parseSet(true);
                break;
            case '.':
                break;
            default:
                term = this.parseNonTerminal();
                break;
        }
        if (mark) {
            if (term instanceof Terminal && mark == '@') {
                this.grumbleNear("The only permitted mark for a terminal is '-', '+' or '^', given '" + mark + "'", "S04");
            }
            if (mark == '+' && (!(term instanceof Terminal) || term instanceof Charset)) {
                this.grumbleNear("The insertion mark '+' is only permitted on quoted or encoded literals", "S05");
            }
            term.mark = mark;
        }
        if (term instanceof NonTerminal || term instanceof Terminal) {
            annotations.forEach(a => term.annotations.push(a));
            /* term.pragmas = pragmas;
             term.comments = comments;*/
            /* term.pragmas.add(pragma);*/
        }
        c = this.getChar();
        let possibleSeparator = false;
        switch (c) {
            case "*":
                term = new Repeat0(term, mark);
                possibleSeparator = true;
                this.next();
                break;
            case "+":
                term = new Repeat1(term, mark);
                possibleSeparator = true;
                this.next();
                break;
            case "?":
                term = new OptionX(term, mark);
                this.next();
                this.parseOptWhitespace(term);
                break;
        }
        if (possibleSeparator) {
            let n = this.getChar();
            if (c == n) {
                this.next();
                this.parseOptWhitespace(term);
                /* TODO - there may be a mark for the separator */
                let sep = new Separator(this.parseTerm(), null);
                term.setSeparator(sep);
            }
            else {
                this.parseOptWhitespace(term);
            }
        }
        if (inSubtraction) {
            return term;
        }
        c = this.getChar();
        if (c == "¬") {
            let parts = [term];
            while (c == "¬") {
                this.next();
                this.parseOptWhitespace();
                parts.push(this.parseTerm(true));
                c = this.getChar();
            }
            while (parts.length > 1) {
                let sub = new Subtraction();
                sub.add(parts.shift());
                sub.add(parts.shift());
                parts.unshift(sub);
            }
            return parts[0];
        }
        return term;
    }
    parseBracketed() {
        let term;
        this.expect("(", 'Invalid bracketed syntax');
        this.parseOptWhitespace();
        /*  TODO - where do we store these comments? */
        term = this.parseAlts();
        this.expect(")", 'Invalid bracketed syntax');
        this.parseOptWhitespace();
        return term;
    }
    /* Read a single or double quoted string, which may contain doubled quotes within */
    getQuoted(quoteChar) {
        this.next();
        let c;
        let value = this.untilChar(quoteChar);
        c = this.next();
        while (c == quoteChar) {
            value += quoteChar;
            this.next();
            value += this.untilChar(quoteChar);
            c = this.next();
        }
        if (value.includes('\n')) {
            this.grumbleNear("A literal string may not contain a linebreak", "S11");
        }
        return value;
    }
    parseQuoted(quoteChar) {
        let value = this.getQuoted(quoteChar);
        if (value.length == 0) {
            this.grumbleNear("A literal string may not be empty", "G00");
        }
        /*let regEx = new RegExp('^'+value,'u');*/
        let q = new Quoted(value, null, quoteChar /*,regEx*/);
        this.parseOptWhitespace(q);
        return q;
    }
    parseEncoded() {
        let value = "";
        this.expect('#', 'Invalid hex syntax');
        let c = this.getChar();
        while ((/[0-9]|[A-F]|[a-f]/.test(c))) {
            value += c;
            c = this.next();
        }
        if (value == '') {
            this.grumbleNear("An encoded character must have one or more hexadecimal digits following the # character", "S06");
        }
        const codepoint = parseInt(value, 16);
        const r = codepoint % 0x10000;
        if (codepoint > 0x10FFFF) {
            this.grumbleNear("An encoded character must have a hexadecimal value within the Unicode point range", "S07");
        }
        if ((0xD800 < codepoint && codepoint <= 0xDFFF) ||
            (r == 0xFFFE || r == 0xFFFF)) {
            this.grumbleNear("An encoded character must not denote a Unicode noncharacter or surrogate code point", "S08");
        }
        try {
            let test = String.fromCodePoint(codepoint);
        }
        catch (e) {
            this.grumbleNear("An encoded character must have a hexadecimal value within the Unicode point range", "S0Z7");
        }
        let enc = new Encoded(value, null);
        this.parseOptWhitespace(enc);
        return enc;
    }
    parseInsertion() {
        let value = "";
        let c = this.getChar();
        if (c == '#') {
            const enc = this.parseEncoded();
            return new Insertion(enc.text, true);
        }
        else if (c == '"' || c == "'") {
            const quot = this.getQuoted(c);
            return new Insertion(quot, false);
        }
        else {
            this.grumbleNear("An insertion can only have a literal string or hex value", "S12");
        }
    }
    parseNonTerminal() {
        /*let value = this.parseName();*/
        let value = this.parseNaming();
        let nt = new NonTerminal(value, null);
        //this.parseOptWhitespace(nt);
        nt.annotations = this.parseOptPragmaWhitespace(nt);
        return nt;
    }
    parseSet(exclude) {
        const a = exclude ? new Exclusion(null) : new Inclusion(null);
        this.expect("[", 'Invalid set syntax');
        this.parseOptWhitespace(a);
        let c;
        let member = this.parseMember();
        if (!member) {
            c = this.getChar();
            if (!/\]/.test(c)) {
                this.grumbleNear("No closing square bracket on charset. Provided:'" + c + "'", "G00");
            }
            this.next();
            return a;
        }
        this.parseOptWhitespace(member);
        a.add(member);
        c = this.getChar();
        while (/;|\|/.test(c)) {
            this.next();
            this.parseOptWhitespace(a);
            member = this.parseMember();
            a.add(member);
            this.parseOptWhitespace(member);
            c = this.getChar();
        }
        if (!/\]/.test(c)) {
            this.grumbleNear("No closing square bracket on charset. Provided:'" + c + "'", "G00");
        }
        this.next();
        this.parseOptWhitespace(a);
        return a;
    }
    parseMember() {
        let c = this.getChar();
        let m;
        if (/[A-Z]/.test(c)) {
            return this.parseCode();
        }
        m = this.parseStringHex();
        this.parseOptWhitespace(m);
        c = this.getChar();
        if (c == "-") {
            this.next();
            this.parseOptWhitespace();
            /* TODO - where to store this */
            let toChar = this.parseStringHex();
            if (!toChar) {
                this.grumbleNear("Missing 'to' character of a character range", "G00");
            }
            return new RangeX(m, toChar);
        }
        return m;
    }
    parseStringHex() {
        let c = this.getChar();
        if (c == '#') {
            return this.parseMemberHex();
        }
        else if (c == '"' || c == "'") {
            return this.parseMemberString();
        }
    }
    parseCode() {
        let code = this.getChar();
        let letter = this.next();
        if (/[a-z]/.test(letter) || (code == 'L' && letter == 'C')) {
            code += letter;
            let c = this.next();
            if (/[A-Za-z]/.test(c)) {
                this.grumbleNear("A Unicode character category code must match [A-Z][a-z]?. Provided: '" + code + c + "'", "S10");
            }
            letter = c;
        }
        if (!/\s|;|\||\]/.test(letter)) {
            this.grumbleNear("A Unicode character category code must match [A-Z][a-z]?. Provided: '" + code + letter + "'", "S10");
        }
        let co = new Code(code);
        this.parseOptWhitespace(co);
        return co;
    }
    parseMemberString() {
        //let value = "";
        const quoteChar = this.getChar();
        let value = this.getQuoted(quoteChar);
        /*let c;
        const quoteChar = this.getChar();
        this.next();
        let value = this.untilChar(quoteChar);
        c = this.next();
        while (c == quoteChar) {
            value += quoteChar;
            this.next();
            value += this.untilChar(quoteChar);
            c = this.next();
        }*/
        /*let c = this.next();
         while (c != quoteChar) {
         value += c;
         c = this.next();
         }
         this.next();*/
        if (value.length == 0) {
            this.grumbleNear("A member literal string may not be empty", "G00");
        }
        /*        if (value.includes('\n')) {
                    this.grumbleNear("A literal string may not contain a linebreak", "S11");
                }*/
        return new MemberString(value, quoteChar);
    }
    parseMemberHex() {
        let value = "";
        this.expect('#', 'Invalid hex syntax');
        let c = this.getChar();
        while ((/[0-9]|[A-F]|[a-f]/.test(c))) {
            value += c;
            c = this.next();
        }
        return new MemberHex(value);
    }
}

;// CONCATENATED MODULE: ../tsc/built/earley/state.js



var stateID = 0;
class State {
    id;
    name;
    rule;
    ended;
    origin;
    position;
    charPos;
    endPos;
    parts;
    index;
    alternate;
    remarks;
    left;
    right;
    source;
    used;
    kill;
    killer;
    constructor(name, origin, position, /*rule,*/ parts, alternate, remarks) {
        this.id = stateID++;
        this.name = name;
        this.rule = null;
        this.ended = position >= parts.length;
        this.origin = origin;
        this.position = position;
        this.charPos = 0;
        this.endPos = null;
        this.parts = parts;
        this.index = 0;
        this.alternate = alternate;
        this.remarks = remarks;
        this.left = null;
        this.right = null;
        this.source = null;
        this.used = false;
        this.kill = false;
        this.killer = 0;
    }
    cloneNext() {
        // Return a copy advanced one place
        let n = new State(this.name, this.origin, this.position + 1, /*this.rule,*/ this.parts, this.alternate, this.remarks);
        n.charPos = this.charPos;
        n.rule = this.rule;
        n.killer = this.killer;
        return n;
    }
    equals(state, position = null) {
        if (position == null || position == undefined) {
            position = state.position;
        }
        // Is it at the next position?
        return this.name == state.name && this.alternate == state.alternate && this.position == position && this.origin == state.origin;
    }
    thisPart() {
        //console.log(this.parts);
        return this.parts[this.position - 1];
    }
    nextPart() {
        return this.parts[this.position];
    }
    lastTerminal() {
        let p = this.thisPart();
        return p ? p instanceof Terminal : false;
    }
    needsTerminal() {
        return this.parts[this.position] instanceof Terminal || this.parts[this.position] instanceof Insertion;
    }
    needsNonTerminal() {
        const p = this.parts[this.position];
        return p instanceof NonTerminal || p instanceof Empty || p instanceof Insertion || (p instanceof Markable && p.mark == '+') || p instanceof Subtraction;
        /* TODO - probably not the right place */
    }
    matches(c) {
        const nextPart = this.parts[this.position];
        return (nextPart instanceof Terminal && nextPart.matches(c));
    }
    requires(terms) {
        /*if(this.kill) {
         return false;
         }*/
        function needs(part) {
            return part instanceof NonTerminal && terms.includes(part.ref);
        }
        const nextPart = this.parts[this.position];
        if (needs(nextPart)) {
            return true;
        }
        if (nextPart instanceof Subtraction) {
            const p = nextPart.parts;
            if (needs(p[0]) || needs(p[1])) {
                return true;
            }
        }
        return false;
    }
    finished() {
        return this.position >= this.parts.length;
    }
    setSource(type, local, stateSet, state) {
        this.source = new Source(type, local, stateSet, state);
    }
    display(indent = 0) {
        let s = "(" + this.index + ")" + " ".repeat(indent);
        s += this.name + "→";
        this.parts.forEach((p, i) => {
            s += ((i == this.position) ? "●" : "") + /*(p instanceof Rule ? */ p.display() /*: "")*/ + ((i < this.parts.length - 1) ? ',' : '');
            /* JJJJ */
        });
        if (this.position >= this.parts.length) {
            s += "●";
        }
        return s;
    }
    toXML(parent, stateNo) {
        const tr = parent.ownerDocument.createElement("tr");
        if (this.used) {
            tr.setAttribute('class', 'used');
        }
        if (this.origin == 0 && this.finished()) {
            tr.setAttribute('class', this.used ? 'finished used' : 'finished');
        }
        parent.append(tr);
        let td = parent.ownerDocument.createElement("td");
        td.append(new Text("" + this.index + "-" + this.id));
        tr.append(td);
        td = parent.ownerDocument.createElement("td");
        td.append(new Text("" + this.alternate));
        tr.append(td);
        td = parent.ownerDocument.createElement("td");
        td.append(new Text("" + this.charPos));
        tr.append(td);
        td = parent.ownerDocument.createElement("td");
        td.setAttribute("class", "showDot");
        td.append(new Text(this.display()));
        tr.append(td);
        td = parent.ownerDocument.createElement("td");
        td.append(new Text(this.origin.toString()));
        tr.append(td);
        td = parent.ownerDocument.createElement("td");
        td.append(new Text(this.killer.toString()));
        tr.append(td);
        td = parent.ownerDocument.createElement("td");
        td.setAttribute("class", this.kill ? "description killed" : "description");
        if (this.source) {
            td.append(new Text(this.source.display() + (this.kill ? this.remarks : "")));
        }
        else {
            td.append(new Text(this.remarks));
        }
        tr.append(td);
        function showSource(route) {
            let pre;
            td = parent.ownerDocument.createElement("td");
            pre = parent.ownerDocument.createElement("pre");
            let displayClass = "description sppf";
            if (route instanceof Derivation) {
                displayClass += " derivation";
            }
            pre.setAttribute("class", displayClass);
            if (route) {
                pre.append(new Text(route.display()));
            }
            td.append(pre);
            tr.append(td);
        }
        showSource(this.left);
        showSource(this.right);
        return tr;
    }
    hasDropPragma() {
        let refAnnotations = this.thisPart() ? (this.thisPart().annotations ? this.thisPart().annotations : []) : [];
        return refAnnotations.filter(a => a instanceof Pragma && a.pname == 'drop').length > 0;
    }
    findPragma(name) {
        let refAnnotations = this.thisPart() ? (this.thisPart().annotations ? this.thisPart().annotations : []) : [];
        return refAnnotations.filter(a => a instanceof Pragma).filter(a => a.pname == name);
    }
    textValueOf(input, honourDrop = false, forceDrop = false) {
        let result = "";
        let leftText, rightText;
        let np = this.nextPart();
        let fD = forceDrop;
        if (honourDrop && np && np.annotations && np.annotations.length > 0) {
            console.log(this);
            console.log(np);
        }
        if (this.hasDropPragma()) {
            fD = true;
        }
        if (honourDrop && np && np.annotations && np.annotations.filter(a => a instanceof Pragma && a.pname == 'drop').length > 0) {
            //return "";
            fD = true;
        }
        if (this.left) {
            if (!(this.left instanceof State)) {
                grumble("left not a state:" + this.left);
            }
            result += this.left.textValueOf(input, honourDrop, fD);
        }
        if (this.right) {
            result += this.right.textValueOf(input, honourDrop, fD);
        }
        if (this.needsTerminal() && np instanceof Markable && np.mark != '-' && !fD) {
            //return input.charAt(this.charPos);
            let characterPos = this.charPos;
            let endPos = this.endPos;
            let ch = input[characterPos];
            if (np instanceof Quoted || (np instanceof Charset && endPos)) {
                if (endPos) {
                    ch = input.slice(characterPos, endPos).join('');
                }
                else if (endPos == characterPos) {
                    ch = "";
                }
                else if (np instanceof Quoted) {
                    ch = np.value;
                }
            }
            /*if(np instanceof Quoted && endPos == characterPos) {
             ch = "";
             }*/
            /* result += (this.nextPart() instanceof Insertion /\* || this.nextPart() instanceof Quoted*\/ )? this.nextPart().value: validXMLText(input[ this.charPos]);*/
            result += (np instanceof Insertion /* || this.nextPart() instanceof Quoted*/) ? np.value : validXMLText(ch);
        }
        if (this.needsTerminal() && np instanceof Insertion) {
            result += np.value;
        }
        return result;
    }
    bottomUp(doc, productions, input, mark, alias, justOne, suppressMarks, annotations, ignoreDrop = false) {
        function thread(branch, mark, alias, annotations, ignoreDropThread = ignoreDrop) {
            if (branch) {
                return branch.bottomUp(doc, productions, input, mark, alias, justOne, suppressMarks, annotations, ignoreDropThread);
            }
            return [];
        }
        this.used = true;
        const characterPos = this.charPos;
        const endPos = this.endPos;
        /*  Needed for use inside anonymous closures below? */
        let tP = this.thisPart();
        let refMark = tP instanceof Markable ? tP.mark : null;
        /* JJJJ */
        if ( /*tP && */tP instanceof Subtraction) {
            refMark = tP.parts[0].mark;
        }
        /*let refAlias = null;*/
        let refAlias = tP instanceof Rule ? tP.name.alias : null;
        /* JJJJ */
        if (tP instanceof NonTerminal && tP.name.alias) {
            refAlias = tP.name.alias;
        }
        /*     let refAlias = tP instanceof Rule ? tP.name ? tP.name.alias: null: null;*/
        if ( /*tP && */tP instanceof Subtraction && tP.parts[0] instanceof NonTerminal) {
            refAlias = tP.parts[0].name.alias;
        }
        //console.log('name:' + this.name + " finished:" + this.finished() + " mark:" + mark + " refMark:" + refMark);
        let refAnnotations = this.thisPart() ? (this.thisPart().annotations ? this.thisPart().annotations : []) : [];
        //console.log(refAnnotations);
        //console.log(annotations);
        let left, right;
        /*let left = thread(this.left, refMark, refAnnotations);
         let right = thread(this.right, refMark, refAnnotations);*/
        let ambig;
        let pragmaNur = false;
        let pragmaDiscard = false;
        let pragmaDrop = false;
        let pragmaName = null;
        let pragmaRename = null;
        let pragmaAssert = null;
        //console.log(this);
        //console.log(this.thisPart());
        if (this.finished()) {
            let name = this.name;
            let prod = productions.get(name);
            if (!mark) {
                mark = prod.mark;
            }
            let originalMark = null;
            if (suppressMarks && !(prod.artifact)) {
                originalMark = mark;
                mark = "^";
            }
            prod.annotations.concat(annotations).filter(p => p instanceof Pragma).forEach(p => {
                switch (p.pname) {
                    case "abc":
                    case "nur":
                        pragmaNur = true;
                        /* let nChildren =(Array.isArray(left) ? left.length: 1) + (Array.isArray(right) ? right.length: 1);
                         pragmaNur = nChildren == 1;*/
                        break;
                    case "rename":
                        pragmaRename = p.data.data;
                        break;
                    case "name":
                        pragmaName = p.data.data;
                        break;
                    case "assert":
                        let d = p.data.data.split('>>>');
                        let message = d[1] ? d[1] : "'Assertion ''" + d[0].trim() + "'' failed for rule ''" + name + "'' in:\n'" + "|| string-join((serialize(.,map{'indent':true(),'omit-xml-declaration':true()})=>tokenize('\n'))!(' | '||.),'\n') || '\n'";
                        pragmaAssert = "if(" + d[0] + ") then () else error(QName('','err')," + message + ")";
                        break;
                    case "drop":
                        pragmaDrop = true;
                        break;
                    case "discard":
                        pragmaDiscard = true;
                        break;
                }
            });
            //console.log('pragmaRename:' + pragmaRename);
            if (!mark) {
                mark = '^';
            }
            if (pragmaDrop && !ignoreDrop) {
                return [];
            }
            let newNode;
            let isAliased = /*prod.name instanceof Naming && */ prod.name.alias;
            let nodeName = pragmaRename ? pragmaRename : ( /*prod.name instanceof Naming ?*/prod.name.value() /*: name*/);
            if (alias && !suppressMarks) {
                nodeName = alias;
            }
            if (suppressMarks && isAliased) {
                nodeName = prod.name.name;
            }
            if (pragmaName || pragmaAssert) {
                let testNode = doc.createElement(validNodeName(nodeName));
                left = thread(this.left, refMark, refAlias, refAnnotations, true);
                right = thread(this.right, refMark, refAlias, refAnnotations, true);
                addNodes(left, testNode);
                addNodes(right, testNode);
                if (pragmaName) {
                    nodeName = XPathEvaluate("string(" + pragmaName + ")", testNode);
                }
                if (pragmaAssert) {
                    XPathEvaluate(pragmaAssert, testNode);
                }
                /*left = thread(this.left, refMark, refAnnotations);
                 right = thread(this.right, refMark, refAnnotations);*/
                //nodeName = this.textValueOf(input);
                /*console.log("name");
                 console.log(left);
                 console.log(right);
                 if(right.length > 0) {
                 let r =
                 console.log(r);
                 nodeName = r;
                 }*/
            }
            switch (mark) {
                case '^':
                    newNode = doc.createElement(validNodeName(nodeName));
                    if (originalMark) {
                        newNode.setAttributeNS(ixmlNS, "ixml:mark", originalMark);
                    }
                    if (alias && suppressMarks) {
                        newNode.setAttributeNS(ixmlNS, "ixml:alias", alias);
                    }
                    if (isAliased && suppressMarks) {
                        newNode.setAttributeNS(ixmlNS, "ixml:alias", prod.name.alias);
                    }
                    break;
                case '@':
                    if (nodeName == "xmlns") {
                        grumble("'xmlns' is not a valid name for an attribute", "D07");
                    }
                    newNode = doc.createAttribute(validNodeName(nodeName));
                    let s = "";
                    s = this.textValueOf(input, true);
                    newNode.value = s;
                    break;
                case '+':
                    let tP = this.thisPart();
                    if (tP instanceof Insertion) {
                        const value = tP.value;
                        validXMLText(value);
                        newNode = new Text(value);
                    }
                    break;
                /* case '-':
                 if(suppressMarks) {
                 let p = doc.createElementNS(ixmlNS, "ixml:deletion");
                 p.setAttribute("string", this.thisPart().value);
                 newNode = p;
                 }
                 break;*/
            }
            left = thread(this.left, refMark, refAlias, refAnnotations);
            right = thread(this.right, refMark, refAlias, refAnnotations);
            if (pragmaNur) {
                let nChildren = (Array.isArray(left) ? left.length : 1) + (Array.isArray(right) ? right.length : 1);
                pragmaNur = nChildren == 1;
            }
            if (left instanceof Ambiguity) {
                ambig = new Ambiguity();
                if (mark == '-') {
                    for (const p of left.parts) {
                        if (right instanceof Ambiguity) {
                            for (const r of right.parts) {
                                ambig.add(p.concat(r));
                            }
                        }
                        else {
                            ambig.add(p.concat(partsOf(right)));
                        }
                    }
                    return ambig;
                }
                left.parts.forEach(p => {
                    let n = newNode.cloneNode();
                    if (n instanceof Element) {
                        if (right instanceof Ambiguity) {
                            for (const r of right.parts) {
                                n = newNode.cloneNode();
                                addNodes(p, n, true);
                                addNodes(r, n, true);
                                ambig.add([n]);
                            }
                        }
                        else {
                            addNodes(p, n, true);
                            addNodes(right, n, true);
                            ambig.add([n]);
                        }
                    }
                    else {
                        ambig.add(p.concat([n], partsOf(right)));
                    }
                });
                return ambig;
            }
            else if (right instanceof Ambiguity) {
                ambig = new Ambiguity();
                if (mark == '-') {
                    right.parts.forEach(p => ambig.add(partsOf(left).concat(p)));
                    return ambig;
                }
                right.parts.forEach(p => {
                    let n = newNode.cloneNode();
                    if (n instanceof Element) {
                        let posA = [];
                        p.forEach((x, index) => {
                            if (Array.isArray(x)) {
                                posA.push(index);
                            }
                        });
                        let nA = posA.length;
                        if (nA > 0) {
                            for (let i = 0; i < nA; i++) {
                                n = newNode.cloneNode();
                                //n.setAttribute("i", i);
                                //n.setAttribute("posA", posA);
                                addNodes(left, n, true);
                                p.forEach((x, index) => {
                                    if (!Array.isArray(x) || posA[i] == index) {
                                        addNodes(x, n, true);
                                    }
                                });
                                ambig.add([n]);
                            }
                            ;
                        }
                        else {
                            addNodes(left, n, true);
                            addNodes(p, n, true);
                            ambig.add([n]);
                        }
                    }
                    else {
                        ambig.add(partsOf(left).concat([n], p));
                    }
                });
                return ambig;
            }
            else {
                if (pragmaNur) {
                    return left.concat(right);
                }
                if (pragmaDiscard && Array.isArray(left) && left.length == 0 && Array.isArray(right) && right.length == 0) {
                    return [];
                }
                switch (mark) {
                    case '^':
                        addNodes(left, newNode);
                        addNodes(right, newNode);
                        return [newNode];
                        break;
                    case '-':
                        return left.concat(right);
                        break;
                    default:
                        return [newNode];
                }
            }
        }
        else /* Not finished */ {
            left = thread(this.left, refMark, refAlias, refAnnotations);
            right = thread(this.right, refMark, refAlias, refAnnotations);
            let term = [];
            if (this.needsTerminal()) {
                let np = this.nextPart();
                let innerMark = np instanceof Markable ? (np.mark ? np.mark : "^") : '-';
                //                let innerMark = this.nextPart() ? (this.nextPart().mark ? this.nextPart().mark: '^'): '-';
                if (np && np.annotations && np.annotations.filter(a => a instanceof Pragma && a.pname == 'drop').length > 0) {
                    innerMark = '-';
                }
                if (np instanceof Insertion) {
                    //let value = this.nextPart().value;
                    let value = np.value;
                    validXMLText(value);
                    if (suppressMarks) {
                        let p = doc.createElementNS(ixmlNS, "ixml:insert");
                        p.setAttribute("string", value);
                        term.push(p);
                    }
                    else {
                        term.push(new Text(value));
                    }
                }
                else if (innerMark == '^' || (suppressMarks && innerMark == '-')) {
                    let ch = input[characterPos];
                    if (np instanceof Quoted || (np instanceof Charset && endPos)) {
                        if (endPos) {
                            ch = input.slice(characterPos, endPos).join('');
                        }
                        else if (endPos == characterPos) {
                            ch = "";
                            /*  }  else if(characterPos == 0) {
                             ch = "";*/
                        }
                        else if (np instanceof Quoted) {
                            ch = np.value;
                        }
                    }
                    //console.log('NT@'+characterPos+":"+ch);
                    if (innerMark == '-') {
                        let p = doc.createElementNS(ixmlNS, "ixml:delete");
                        p.setAttribute("string", ch);
                        term.push(p);
                    }
                    else {
                        term.push(new Text(validXMLText(ch)));
                    }
                }
            }
            if (right instanceof Ambiguity) {
                ambig = new Ambiguity();
                for (const r of right.parts) {
                    if (left instanceof Ambiguity) {
                        for (const l of left.parts) {
                            ambig.add(l.concat(r));
                        }
                    }
                    else {
                        ambig.add(partsOf(left).concat(r, term));
                    }
                }
                return ambig;
            }
            else if (left instanceof Ambiguity) {
                ambig = new Ambiguity();
                left.parts.forEach(p => ambig.add(p.concat(partsOf(right), term)));
                return ambig;
            }
            else {
                let newLeft = left.concat(right);
                let tp = this.thisPart();
                if (tp && tp instanceof NonTerminal && tp.annotations) {
                    let check = null;
                    let c = tp.annotations.filter(a => a instanceof Pragma && a.pname == 'require');
                    if (c.length > 0) {
                        check = c[0];
                        //console.log(check);
                        //console.log(newLeft)
                        //console.log('TT'+this.textValueOf(input));
                        let checked = XPathEvaluate(check.data.data, newLeft[0]);
                        //console.log(checked);
                        if (!checked) {
                            throw new RequireError("Failed requirement:" + check.data.data);
                            //newLeft.push(new Text('CHECKED'));
                        }
                    }
                }
                // Array.at() is not defined in iOS until v 15.4
                /*            if (term[0] instanceof Text && newLeft[ 'at'](-1) instanceof Text) {
                 newLeft.at(-1).textContent += term[0].textContent;
                 return newLeft;
                 } */
                const lastLeft = newLeft.length > 0 ? newLeft[newLeft.length - 1] : null;
                if (term[0] instanceof Text && lastLeft instanceof Text) {
                    lastLeft.textContent += term[0].textContent;
                    return newLeft;
                }
                else {
                    return newLeft.concat(term);
                }
            }
        }
    }
}

;// CONCATENATED MODULE: ../tsc/built/earley/stateSet.js




class StateSet {
    states;
    input;
    inputString;
    grammar;
    productions;
    /* reasons: any[];*/
    known;
    queue;
    lastState;
    stateNo;
    constructor(input, stateNo, grammar) {
        this.states = [];
        this.input = input;
        this.inputString = input.slice(stateNo).join('');
        this.stateNo = stateNo;
        this.grammar = grammar;
        this.productions = grammar.productions;
        /*this.reasons =[];*/
        this.known = new Map();
        this.queue = [];
        this.lastState = null;
    }
    add(state) {
        this.states.push(state);
        state.index = this.states.length;
    }
    addQ(state) {
        this.queue.push(state);
    }
    removeQ(killer) {
        let n = this.queue.filter(state => state.killer != killer);
        this.queue = n;
        this.states.forEach(s => { if (s.killer == killer) {
            s.kill = true;
            s.remarks += "AKilled by " + killer;
        } });
    }
    hasStateNext(state) {
        // Does the successor to this state exist already?
        return this.states.some(s => s.equals(state, s.position + 1));
    }
    hasState(state) {
        return this.states.some(s => s.equals(state));
    }
    foundState(state) {
        return this.states.filter(s => s.equals(state))[0];
    }
    /*  Find all the states in this set that have completed for the given non-terminal and origin
     * and which are not those that have just been generated by initial character scanning */
    findCompletedStates(name, origin) {
        return this.states.filter(s => s.name == name && s.ended && s.origin == origin && (!s.source || s.source.type != 'scanned'));
    }
    cloneNext() {
        return new StateSet(this.input, this.stateNo + 1, this.grammar);
    }
    initialise(start) {
        const startRule = this.productions.get(start);
        //const def:never = startRule.definition.parts;
        let starts = startRule.definition.parts.map((p, index) => {
            let s = new State(start, 0, 0, p.parts, index, "start rule");
            s.rule = startRule;
            return s;
        });
        starts.forEach(s => this.add(s));
        this.knowState(start, 0);
        starts.forEach(s => this.queue.push(s));
    }
    knowState(name, origin) {
        if (this.known.has(name)) {
            this.known.get(name).add(origin);
        }
        else {
            const origins = new Set();
            origins.add(origin);
            this.known.set(name, origins);
        }
    }
    stateKnown(name, origin) {
        if (this.known.has(name)) {
            return this.known.get(name).has(origin);
        }
        else {
            return false;
        }
    }
    zeroLengthMatch(state) {
        /* A Terminal has a regular expression that can match an empty string */
        const nP = state.nextPart();
        return this.grammar.options.regEx &&
            (nP instanceof Quoted || nP instanceof Charset) &&
            nP.regEx &&
            (nP.occurrence == "*" || nP.occurrence == "?");
        /*nP.regEx.test(this.inputString) &&
         this.inputString.match(nP.regEx)[0].length == 0*/ ;
    }
    process() {
        if (this.queue.length == 0) {
            return false;
        }
        const n = this.queue.shift();
        /* if (this.lastState && n.equals(this.lastState)) {
         grumble("looping in process");
         }*/
        this.lastState = n;
        if (n.kill) {
            /* The state has been killed, probably due to a subtraction */
            return true;
        }
        else if (n.finished()) {
            //let nStates = this.states.length;
            this.completeOne(n, this.stateNo, 0);
            /*if(nStates == this.states.length && this.queue.length > 0) {
                grumble("Possible looping from state "+n.name);
            }*/
        }
        else if (n.needsNonTerminal()) {
            this.predictOne(n, this.stateNo, 0, 0);
        }
        else if (this.zeroLengthMatch(n)) {
            let z = n.cloneNext();
            z.charPos = n.charPos;
            /*z.endPos = n.charPos - 1;*/
            z.setSource('RegExpredict', n.index, null, null);
            addDerivation(z, n, null);
            this.add(z);
            this.addQ(z);
        }
        return true;
    }
    completes(start) {
        let completions = [];
        for (const s of this.states) {
            if (s.name == start && s.finished() && s.origin == 0 && !s.kill) {
                completions.push(s);
            }
        }
        return completions;
    }
    needsTerminals() {
        return this.states.filter(s => s.needsTerminal());
    }
    advanceState(n, state, origin, killer = 0) {
        let z;
        if (!this.stateKnown(n, /*state.*/ origin)) {
            this.knowState(n, /* state.*/ origin);
            let nextProduction = this.productions.get(n);
            nextProduction.definition.parts.forEach((p, index) => {
                z = new State(n, origin, 0, p.parts, index, 'Spredict from (' + state.index + ')');
                z.charPos = state.charPos;
                z.setSource('Spredict', state.index, null, null);
                z.rule = nextProduction;
                z.killer = killer;
                let zNP = z.nextPart();
                if (z.finished() || zNP instanceof Alts) {
                    // This is an empty - i.e. () or already completed or a textual insertion
                    z = z.cloneNext();
                    z.charPos = state.charPos;
                    z.setSource('SBpredict/complete', state.index, null, null);
                    if (!(zNP instanceof Alts || p instanceof Alt || p instanceof NonTerminal)) {
                        addDerivation(z, state, null);
                    }
                }
                if (!this.hasState(z)) {
                    this.add(z);
                }
                else {
                    z.index = -this.foundState(z).index;
                    z.setSource('SKnownZZA state predict', -z.index, null, null);
                }
                this.addQ(z);
                /*this.queue.push(z);*/
            });
        }
    }
    predictOne(state, origin, pos, offset) {
        const nP = state.nextPart();
        if (state.kill) {
            return;
        }
        let z;
        if (nP instanceof Empty || nP instanceof Insertion || nP.mark == '+') {
            // This is an empty - i.e. () or a textual insertion
            z = state.cloneNext();
            z.charPos = state.charPos;
            z.setSource('predict', state.index, null, null);
            if (z.finished() || nP.mark == '+' || nP instanceof Insertion) {
                z.setSource('Apredict/complete', state.index, null, null);
                addDerivation(z, state, null);
            }
            if (!this.hasState(z)) {
                this.add(z);
                this.addQ(z);
                /*this.queue.push(z);*/
            }
        }
        /* else if(this.grammar.options.regEx &&
         (nP instanceof Quoted || nP instanceof Charset) &&
         nP.regEx &&
         nP.regEx.test(this.inputString) &&
         this.inputString.match(nP.regEx)[0].length == 0) {
         z = state.cloneNext();
         z.charPos = state.charPos;
         z.setSource('RegExpredict', state.index, null, null);
         addDerivation(z, state, null);
         this.add(z);
         this.addQ(z);
         }*/ else if (nP instanceof Subtraction) {
            /* compiled Subtractions contain only NonTerminal references */
            /*nP.parts.forEach((p:NonTerminal) => {
                this.advanceState(p.ref, state, origin);
            });*/
            this.advanceState(nP.parts[0].ref, state, origin);
            this.advanceState(nP.parts[1].ref, state, origin, state.id);
        }
        else if (nP instanceof NonTerminal) {
            const n = nP.ref;
            if (!this.stateKnown(n, /*state.*/ origin)) {
                this.knowState(n, /* state.*/ origin);
                let nextProduction = this.productions.get(n);
                nextProduction.definition.parts.forEach((p, index) => {
                    z = new State(n, origin, 0, p.parts, index, 'predict from (' + state.index + ')');
                    z.charPos = state.charPos;
                    z.setSource('predict', state.index, null, null);
                    z.rule = nextProduction;
                    z.killer = state.killer;
                    let zNP = z.nextPart();
                    if (z.finished() || zNP instanceof Alts /*|| zNP instanceof Insertion*/ /*|| zNP.mark == 'ZZ+'*/) {
                        // This is an empty - i.e. () or already completed or a textual insertion
                        z = z.cloneNext();
                        z.charPos = state.charPos;
                        z.setSource('Bpredict/complete', state.index, null, null);
                        if (!(zNP instanceof Alts || p instanceof Alt || p instanceof NonTerminal)) {
                            addDerivation(z, state, null);
                        }
                    }
                    if (!this.hasState(z)) {
                        this.add(z);
                    }
                    else {
                        /*grumble("Infinite ambiguity with production: " + z.name);*/
                        /* z.index = - this.foundState(state).index;*/
                        z.index = -this.foundState(z).index;
                        z.setSource('KnownZZA state predict', -z.index, null, null);
                        /* z.setSource('Known state predict', - state.index, null, null); */
                    }
                    this.addQ(z);
                    /*this.queue.push(z);*/
                });
            }
            else if (n == state.name && origin == state.origin && state.position == state.parts.length) {
                grumble("Infinite ambiguity with production: " + state.name);
            }
            else {
                /* These are activated usually with insertions multiply referenced via the same non-terminals,
                 * e.g.
                 * S : a, a.
                 * a: +"AAA".
                 *  */
                let completedStates = this.findCompletedStates(n, /*state.*/ origin);
                if (completedStates.length == 0) {
                    // This should only apply in cases with insertions
                    completedStates = this.findCompletedStates(n, origin).filter(s => s.thisPart() instanceof Insertion);
                }
                completedStates.forEach(s => {
                    z = state.cloneNext();
                    z.charPos = state.charPos;
                    z.setSource('Known state predict/complete', state.index, this.stateNo, s.index);
                    addDerivation(z, state, s);
                    this.add(z);
                    this.addQ(z);
                    /* this.queue.push(z);*/
                });
            }
        }
    }
    completeOne(state, position, loops) {
        let available = state.name;
        const stateSet = this.grammar.stateSets[state.origin];
        stateSet.states.forEach(s => {
            if (s.requires([available] /*, position*/)) {
                if (!this.hasStateNext(s)) {
                    let ok = true;
                    let require = s.findPragma('require');
                    if (require.length > 0) {
                        console.log('require:');
                        console.log(require);
                        let t = this.input.slice(s.origin, s.charPos + 1).join('');
                        ok = XPathEvaluate(require[0].data.data, new Text(t));
                        console.log(t, ok);
                    }
                    if (ok) {
                        let n = s.cloneNext();
                        n.charPos = state.charPos;
                        /* let mark = null;
                         mark = s.nextPart().mark;*/
                        n.setSource('complete', state.index, state.origin, s.index);
                        const np = s.nextPart();
                        if (!this.hasState(n)) {
                            this.add(n);
                            addDerivation(n, s, state);
                            if (np instanceof Subtraction && np.parts[1] instanceof NonTerminal && np.parts[1].ref == available) {
                                //console.log("possible negative "+available);
                                /* found.kill = true;
                                 found.remarks = " Killed by ("+state.index+")";*/
                                ok = false;
                            }
                        }
                        else {
                            const found = this.foundState(n);
                            if (np instanceof Subtraction && np.parts[1] instanceof NonTerminal && np.parts[1].ref == available) {
                                //console.log("completed negative "+available);
                                found.kill = true;
                                found.remarks = " Killed by (" + state.index + ")";
                                this.removeQ(state.killer);
                                ok = false;
                            }
                            if (ok) {
                                //console.log(available,found,n);
                                let tP = found.thisPart();
                                if (tP instanceof Subtraction && tP.parts[0] instanceof NonTerminal && tP.parts[0].ref == available) {
                                    found.kill = true;
                                    found.remarks = " ZZKilled by (" + s.index + ")";
                                    ok = false;
                                }
                                n.index = found.index;
                                addDerivation(found /*n*/, s, state.equals(found) ? null : state);
                                n = found;
                                //addDerivation( n , s, state.equals(found) ? null: state);
                            }
                        }
                        if (ok) {
                            this.addQ(n);
                        }
                    }
                }
            }
        });
    }
    scanOne(position, character, previous) {
        let scanned = false;
        let c = character;
        previous.states.forEach((s, index) => {
            let nP = s.nextPart();
            if (this.grammar.options.longStrings && nP instanceof Quoted && nP.value.length > 1) {
                if (previous.inputString.startsWith(nP.value)) {
                    scanned = true;
                    let n = s.cloneNext();
                    s.charPos = position;
                    n.charPos = position;
                    n.setSource('scanned', null, previous.stateNo, index + 1);
                    addDerivation(n, s, null);
                    let stateIndex = position + nP.value.length;
                    let stateSet = this.grammar.stateSets[stateIndex];
                    stateSet.add(n);
                    stateSet.addQ(n);
                    this.grammar.lastStateSet = Math.max(stateIndex, this.grammar.lastStateSet);
                }
            }
            else if (this.grammar.options.regEx && (nP instanceof Quoted || nP instanceof Charset) && nP.regEx) {
                if (nP.regEx.test(previous.inputString)) {
                    scanned = true;
                    let n = s.cloneNext();
                    s.charPos = position;
                    n.charPos = position;
                    n.setSource('scannedABCD', null, previous.stateNo, index + 1);
                    addDerivation(n, s, null);
                    let r = previous.inputString.match(nP.regEx);
                    let stateIndex = position + r[0].length;
                    s.endPos = stateIndex;
                    let stateSet = this.grammar.stateSets[stateIndex];
                    stateSet.add(n);
                    stateSet.addQ(n);
                    /*if(r[0].length == 0) {
                     this.grammar.stateSets[stateIndex+1].addQ(n)
                     this.grammar.stateSets[stateIndex+1].add(n)
                     }*/
                    this.grammar.lastStateSet = Math.max(stateIndex, this.grammar.lastStateSet);
                }
            }
            else if (!s.kill && s.matches(c)) {
                scanned = true;
                let n = s.cloneNext();
                s.charPos = position;
                n.charPos = position;
                //let mark = s.nextPart().mark;
                n.setSource('scanned', null, previous.stateNo, index + 1);
                addDerivation(n, s, null);
                this.add(n);
                this.addQ(n);
                /*this.queue.push(n);*/
            }
        });
        return scanned;
    }
    display() {
        const output = document.implementation.createDocument("", "", null);
        this.toXML(output);
        return output;
    }
    countStates() {
        return this.states.length;
    }
    showDot() {
        if (this.input.length > 80) {
            return "";
        }
        return (this.input.slice(0, this.stateNo)).join('') + "•" + (this.input.slice(this.stateNo)).join('');
        //return this.input.substring(0, this.stateNo) + "•" + this.input.substring(this.stateNo);
    }
    toXML(output) {
        // Returns a table with the positioned input as a header and the states as individual rows
        const table = output.createElement("table");
        output.append(table);
        const thead = output.createElement("thead");
        table.append(thead);
        let tr = output.createElement("tr");
        thead.append(tr);
        const th = output.createElement("th");
        th.setAttribute("colspan", "5");
        th.setAttribute("class", "stateSpace");
        tr.append(th);
        let st = "S(" + this.stateNo + "): " + this.showDot();
        if (this.stateNo > 0) {
            //const cP = this.input.codePointAt(this.stateNo -1);
            const cP = this.input[this.stateNo - 1].codePointAt(0);
            st += " char '" + this.input[this.stateNo - 1] + "' (codepoint " + cP + ',#' + (new Number(cP)).toString(16) + ")";
        }
        th.append(new Text(st));
        tr = output.createElement("tr");
        thead.append(tr);
        let td = output.createElement("td");
        td.setAttribute("colspan", "3");
        tr.append(td);
        const tbody = output.createElement("tbody");
        table.append(tbody);
        this.states.forEach(s => s.toXML(tbody, this.stateNo));
    }
}

;// CONCATENATED MODULE: ../tsc/built/ixmlGrammar.js





const ixmlNS = "http://invisiblexml.org/NS";
const singleNonTermRepeats = true;
/* Make single compiled versions of non-separated nonterminal repeats */
const version = "1.2.1"; // was 1.1.3
const supportedGrammarVersions = [
    "1.0", "1.1", "1.1+"
];
class RequireError extends Error {
    /**
     * Create an XPath/XSLT dynamic error object
     * @param {string} message
     * @param {string} code as 8 char string or EQName
     * @param {?Object} expr the location in the SEF tree of the offending code
     */
    code;
    name;
    message;
    constructor(message = "Require content error", code = "FORG0001", expr = null) {
        super();
        var e = this;
        e.name = 'RequireError';
        e.message = message;
        this.code = code;
        /*if (expr) {
         e.setExpr(expr);
         }
         e.jsStack = (new Error()).stack;*/
    }
    toString() {
        return this.name + ":" + this.message + "; code:" + this.code;
    }
}
function validNodeName(nodeName) {
    /*const reg = /^[\p{L}_][\p{L}.\d_-]*$/u;
    if (!(reg.test(nodeName))) {
     grumble("'" + nodeName + "' is not a valid name for an XML element", "D03");
     }*/
    if (!validNCName(nodeName)) {
        grumble("'" + nodeName + "' is not a valid name for an XML element", "D03");
    }
    return nodeName;
}
function validXMLText(s) {
    for (const c of [...s]) {
        const i = c.codePointAt(0);
        if ((i < 32 && ![9, 10, 13].includes(i)) || (i > 0xD7FF && i < 0xE000) || (i > 0xFFFD && i < 0x10000) || i > 0x10FFFF) {
            grumble("Character codepoint " + i + " in '" + s + "' is not a valid XML character", "D04");
        }
    }
    return s;
}
class Derivation {
    left;
    right;
    next;
    constructor(left, right, next) {
        this.left = left;
        this.right = right;
        this.next = next;
    }
    display(indent = 0) {
        let s = " ".repeat(indent);
        s += "DER:";
        if (this.left) {
            s += this.left.display();
            s += "\n";
        }
        if (this.right) {
            s += this.right.display(indent + 4);
            s += "\n";
        }
        if (this.next) {
            s += " ".repeat(indent) + "|OR|" + this.next.display(indent + 4);
        }
        return s;
    }
    bottomUp(doc, productions, input, mark, alias, justOne, suppressMarks, annotations) {
        let left, right;
        try {
            left = this.left.bottomUp(doc, productions, input, null, null, justOne, suppressMarks, annotations);
        }
        catch (e) {
            console.log('Derivation left');
            if (e instanceof RequireError) {
                left = [];
            }
            else {
                throw e;
            }
        }
        try {
            right = this.right ? this.right.bottomUp(doc, productions, input, null, null, justOne, suppressMarks, annotations) : [];
        }
        catch (e) {
            console.log('Derivation right');
            if (e instanceof RequireError) {
                right = [];
            }
            else {
                throw e;
            }
        }
        if (this.next) {
            let ambig = new Ambiguity();
            if (right instanceof Ambiguity) {
                right.parts.forEach(p => ambig.add(partsOf(left).concat(p)));
            }
            else {
                ambig.add(partsOf(left).concat(partsOf(right)));
            }
            if (justOne) {
                return ambig;
            }
            let nextParts = this.next.bottomUp(doc, productions, input, null, null, false, suppressMarks, annotations);
            if (nextParts instanceof Ambiguity) {
                nextParts.parts.forEach(p => ambig.add(p));
            }
            else {
                ambig.add(nextParts);
            }
            return ambig;
        }
        else if (right instanceof Ambiguity) {
            return right;
        }
        else if (left instanceof Ambiguity) {
            return left;
        }
        else {
            return left.concat(right);
        }
    }
}
function partsOf(input) {
    if (input instanceof Ambiguity && Array.isArray(input.parts[0])) {
        input = input.parts.flat();
        /*grumble("Trying to add arrays in ambiguity:" + input.parts[0]);*/
    }
    return input instanceof Ambiguity ? input.parts : input;
}
class Ambiguity {
    parts;
    constructor() {
        this.parts = [];
    }
    add(part) {
        if (Array.isArray(part) && Array.isArray(part[0])) {
            grumble("Adding an array to an ambiguity:" + part);
        }
        this.parts.push(part);
    }
}
function addNodes(nodes, parent, clone = false) {
    if (!Array.isArray(nodes)) {
        return addNode(nodes, parent, clone);
    }
    nodes.forEach(n => addNode(n, parent, clone));
}
function addNode(node, parent, clone = false) {
    if (Array.isArray(node)) {
        grumble("Internal error: node is array: " + node);
    }
    let n = clone ? node.cloneNode(true) : node;
    if (n instanceof Attr) {
        if (parent.hasAttribute(node.name)) {
            grumble("Attempt to overwrite an existing attribute @" + n.name + " on element " + parent.localName, "D02");
        }
        parent.setAttributeNode(n);
    }
    else if (n instanceof Text) {
        let last = parent.lastChild;
        if (last instanceof Text) {
            last.textContent = last.textContent + n.textContent;
        }
        else if (n.textContent.length > 0) {
            parent.append(n);
        }
    }
    else {
        parent.append(n);
    }
}
function addDerivation(item, left, right) {
    if (!(left || right)) {
        return;
    }
    if (!(item.left || item.right)) {
        setDerivation(item, left, right);
    }
    else if (item.right) {
        addSecondDerivation(item, left, right);
    }
    else {
        addAnotherDerivation(item, left, right);
    }
}
function setDerivation(item, left, right) {
    item.left = left;
    item.right = right;
}
function sameDerivation(item, left, right) {
    return item.left.equals(left) && right && item.right && item.right.equals(right);
}
function addSecondDerivation(item, left, right) {
    if (!sameDerivation(item, left, right)) {
        const old = new Derivation(item.left, item.right, null);
        item.left = new Derivation(left, right, old);
        item.right = null;
    }
}
function addAnotherDerivation(item, left, right) {
    let d = item.left;
    while (d) {
        if (sameDerivation(d, left, right)) {
            return;
        }
        d = d.next;
    }
    item.left = new Derivation(left, right, item.left);
}
class Source {
    type;
    local;
    stateSet;
    state;
    constructor(type, local, stateSet, state) {
        this.type = type;
        this.local = local;
        this.stateSet = stateSet;
        this.state = state;
    }
    display() {
        let s = this.type + " from ";
        if (this.local != null) {
            s += "(" + this.local + ")";
        }
        if (this.stateSet != null) {
            if (this.local != null) {
                s += " and ";
            }
            s += 'S(' + (this.stateSet) + ')(' + (this.state) + ') ';
        }
        return s;
    }
}
class Grammar {
    version;
    versionUsed;
    parts;
    rules;
    start;
    productions;
    stateSets;
    lastStateSet;
    input;
    characters;
    lines;
    options;
    compiled;
    compileTime;
    parseTime;
    constructor(parts) {
        stateID = 1;
        this.version = null;
        this.versionUsed = supportedGrammarVersions.at(-1);
        this.parts = [];
        this.rules = [];
        this.start = null;
        this.productions = new Map();
        parts.forEach(p => {
            if (p instanceof Rule) {
                this.addRule(p);
            }
            else {
                this.parts.push(p);
                if (p instanceof Prolog && p.version) {
                    this.version = p.version.version;
                }
            }
        });
        if (supportedGrammarVersions.includes(this.version)) {
            this.versionUsed = this.version;
        }
        this.stateSets = [];
        this.lastStateSet = 0;
        this.input = null;
        this.characters = null;
        this.lines = [];
        this.options = {};
        this.compiled = false;
        this.compileTime = null;
        this.parseTime = null;
    }
    addRule(rule) {
        /*let name = rule.name instanceof Naming ? rule.name.name: rule.name;*/
        let name = rule.name.name;
        if (this.productions.has(name)) {
            grumble("Adding productions for an already-defined non-terminal: " + name, "S03");
        }
        this.rules.push(rule);
        this.parts.push(rule);
        this.productions.set(name, rule);
    }
    setOption(opt, value) {
        this.options[opt] = value;
    }
    /* Find any non-terminal references that this rule requires, adding new ones to a known set. */
    requires(rule, known) {
        const refs = [];
        rule.visit(x => {
            if (x.ref && !known.has(x.ref)) {
                known.add(x.ref);
                refs.push(x.ref);
            }
        });
        return refs;
    }
    /* Check the grammar for consistency in terms of all non-terminals being defined by rules
     * and optionally checking for unreachable rules */
    check() {
        /*this.start = this.rules[0].name instanceof Naming ? this.rules[0].name.name: this.rules[0].name;*/
        this.start = (this.rules[0]).name.name;
        const defined = new Set();
        /*this.rules.forEach(r => defined.add(r.name instanceof Naming ? r.name.name: r.name));*/
        this.rules.forEach(r => defined.add(r.name.name));
        const refs = new Set();
        for (const r of this.rules) {
            this.requires(r, refs);
        }
        const notDefined = refs.difference(defined);
        //const notDefined = new Set ([...refs].filter(x => ! defined.has(x)));
        if (notDefined.size > 0 && !this.options.missing) {
            grumble("No production rules for non-terminals: " + [...notDefined].join(','), "S02");
        }
        if (this.options.startSymbol) {
            this.start = this.options.startSymbol;
            if (!defined.has(this.start)) {
                grumble("Start symbol '" + this.start + "' is not a production in this grammar");
            }
        }
        const reachable = this.reachable(this.start);
        const unreachable = defined.difference(reachable);
        //const unreachable = new Set ([...defined].filter(x => ! reachable.has(x)));
        if (this.options.unreachable && unreachable.size > 0) {
            if (unreachable.size > 0) {
                grumble("Unreachable production rules for non-terminals: " + [...unreachable].join(','), "S002");
            }
        }
        unreachable.forEach(s => this.productions.delete(s));
    }
    /*  Find all the nonterminals reachable from the start rule */
    reachable(name) {
        let known = new Set();
        /*const start = this.rules[0];
        const name = start.name instanceof Naming ? start.name.name: start.name;*/
        known.add(name);
        /* Naming */
        let refs = [name];
        while (refs.length > 0) {
            let newRefs = [];
            refs.forEach(r => {
                const prod = this.productions.get(r);
                if (prod) {
                    newRefs = newRefs.concat(this.requires(prod, known));
                }
            });
            refs = newRefs;
        }
        return known;
    }
    /* Compile the parsed grammar which involves
     * 1. Expanding Alts into separate rules referenced indirectly.
     * 2. Expanding optional and repetition constructs into a set of suitable rules.
     * 3. Expanding multi-character quoted that are not insertions into a sequence of single characters.
     *  */
    compile(options) {
        let getOptionBoolean = lookupOption(options, false);
        let getOptionString = lookupOption(options);
        const startTime = performance.now();
        let tw = getOptionBoolean("twRewrites");
        tw = true;
        this.options.unreachable = getOptionBoolean("unreachable");
        this.options.supportPragmas = getOptionBoolean("pragmas");
        this.options.missing = getOptionBoolean("missing");
        this.options.longStrings = getOptionBoolean("longStrings");
        this.options.regEx = getOptionBoolean("regEx");
        this.options.startSymbol = getOptionString("startSymbol");
        const version = getOptionString("version");
        if (version) {
            if (supportedGrammarVersions.includes(version)) {
                this.versionUsed = version;
            }
            else {
                grumble(version + " is not a supported version");
            }
        }
        try {
            this.check();
            this.makeAlts();
            this.makeRepeats(tw);
            if (!this.options.longStrings) {
                this.makeMultiQuoted();
            }
            this.check();
        }
        catch (e) {
            if (isGrumble(e)) {
                throw e;
            }
            else {
                grumble("Error in compilation: " + e.message, "S02");
            }
        }
        this.compileTime = performance.now() - startTime;
        this.compiled = true;
    }
    /* Expand all alts and subtraction/terminals into referenced rules */
    makeAlts() {
        const alts = [];
        const subs = [];
        for (const r of this.rules) {
            r.visit((x, parent) => {
                if (parent && x instanceof Alts /*&& !(x instanceof Empty)*/) {
                    parent.replace(x, new NonTerminal("Alt" + alts.length, null));
                    x.lineNumber = r.lineNumber;
                    x.sourceLine = r.sourceLine;
                    alts.push(x);
                    //} else if (parent && parent instanceof Subtraction && (x instanceof Terminal || x instanceof Insertion)) {
                }
                else if (parent && parent instanceof Subtraction && !(x instanceof NonTerminal)) {
                    parent.replace(x, new NonTerminal("Sub" + subs.length, null));
                    x.lineNumber = r.lineNumber;
                    x.sourceLine = r.sourceLine;
                    subs.push(x);
                }
            });
        }
        alts.forEach((a, index) => {
            let newRule = new Rule("Alt" + index, a, "-");
            newRule.artifact = true;
            newRule.lineNumber = a.lineNumber;
            newRule.sourceLine = a.sourceLine;
            this.addRule(newRule);
        });
        subs.forEach((s, index) => {
            let a = new Alt();
            a.add(s);
            let al = new Alts();
            al.add(a);
            let newRule = new Rule("Sub" + index, al, "-");
            newRule.artifact = true;
            newRule.lineNumber = s.lineNumber;
            newRule.sourceLine = s.sourceLine;
            this.addRule(newRule);
        });
    }
    /* Expand all multi-character quoteds which are not insertions into referenced rules
     * We should perhaps be able to expand these inline to avoid the additional rule -
     * This we do but it MUST happen after all Alts and Repetitons have been expanded */
    makeMultiQuoted() {
        const quoted = [];
        for (const r of this.rules) {
            r.visit((x, parent) => {
                if (x instanceof Alt) {
                    const quoted = x.parts.filter(p => p instanceof Quoted);
                    for (const q of quoted) {
                        let chars = [];
                        for (const c of q.value) {
                            chars.push(new Quoted(c, q.mark, q.quoteChar));
                        }
                        let index = x.parts.indexOf(q);
                        x.parts.splice(index, 1, ...chars);
                        index = x.allParts.indexOf(q);
                        x.allParts.splice(index, 1, ...chars);
                    }
                }
                else if (parent && x instanceof Quoted && x.mark != '+' && x.value.length > 1) {
                    let chars = [];
                    for (const c of x.value) {
                        chars.push(new Quoted(c, x.mark, x.quoteChar));
                    }
                    parent.replaceWithMany(x, chars);
                }
            });
        }
    }
    /*  Expand all the repetition constructs */
    makeRepeats(tw) {
        const multiples = [];
        const nonTerms = new Set();
        let originalRules = {};
        let useRegEx = this.options.regEx;
        for (const r of this.rules) {
            r.visit((x, parent) => {
                if (x instanceof Multiple) {
                    let term = x.term;
                    if (useRegEx && (term instanceof Quoted || term instanceof Charset)) {
                        let occurrence = x.occurrence;
                        term.occurrence = occurrence;
                        if (term instanceof Quoted) {
                            term.regEx = new RegExp('^(' + term.pattern + ')' + occurrence, 'u');
                        }
                        if (term instanceof Charset) {
                            term.regEx = new RegExp('^([' + (term instanceof Exclusion ? '^' : '') + term.pattern + '])' + occurrence, 'u');
                        }
                        parent.replace(x, term);
                    }
                    else {
                        let ref = x.makeReference(multiples.length);
                        x.lineNumber = r.lineNumber;
                        x.sourceLine = r.sourceLine;
                        parent.replace(x, ref);
                        originalRules[ref.ref] = r;
                        if (!(nonTerms.has(ref.ref)) || !singleNonTermRepeats) {
                            // See also ixmlClasses/Multiple
                            multiples.push(x);
                            nonTerms.add(ref.ref);
                        }
                    }
                }
            });
        }
        if (multiples.length > 0) {
            multiples.forEach((m, index) => {
                if (tw) {
                    m.makeRulesTW(index).forEach(r => {
                        r.lineNumber = m.lineNumber;
                        r.sourceLine = m.sourceLine;
                        this.addRule(r);
                    });
                }
                else {
                    m.makeRules(index).forEach(r => {
                        r.lineNumber = m.lineNumber;
                        r.sourceLine = m.sourceLine;
                        this.addRule(r);
                    });
                }
            });
        }
    }
    setInput(input) {
        this.input = input;
        this.lines = input.split(/\n/);
    }
    locate(position) {
        let line = 1;
        let col = 1;
        for (let i = 0; i < position; i++) {
            col++;
            if (/\n/.test(this.input[i])) {
                line++;
                col = 1;
            }
        }
        return {
            line: line, col: col
        };
    }
    getLine(line) {
        return this.lines[line - 1];
    }
    /* Parse a string against this compiled grammar
     *  */
    parse(input, options = {}) {
        if (!this.compiled) {
            grumble("An IXML grammar must be compiled before being used to parse");
        }
        /*input = input.replaceAll('\n','\r');*/
        /* normalize line endings to #a */
        let in2 = "";
        /* for(let i = 0; i < input.length; i++){
             if(input[i] != '\r') {
                 in2 += input[i];
             } else if(i == input.length - 1 || input[i + 1] != '\n') {
                 in2 += '\n'; i++;
             }
         }
         input = in2;*/
        /* for(const v of input) {
           console.log(v ,v.codePointAt(0));
           }*/
        if (options.value) {
            // This will be a wrapped XDMMap
            options = options.value;
        }
        let totalStates = 0;
        let getOptionBoolean = lookupOption(options, false);
        let getOptionNumber = lookupOption(options);
        function predictChain(grammar, name) {
            let p = grammar.productions.get(name);
            let starts = p.definition.parts[0].parts[0];
            let r = [];
            if (starts) {
                r.push(starts.flat());
            }
            if (starts instanceof NonTerminal) {
                r = r.concat(predictChain(grammar, starts.ref));
            }
            return r;
        }
        let allS = {};
        for (const n of this.productions.keys()) {
            /*let p = this.productions.get(n);
             let starts = p.definition.parts[0].parts[0];
             allS.push(n + ":" + starts.flat());*/
            //allS[n] = predictChain(this,n);
        }
        //console.dir(allS);
        /*const versionMismatch = this.version != "1.0";*/
        //const versionMismatch = ! supportedGrammarVersions.includes(this.version);
        const versionMismatch = this.version != this.versionUsed;
        const startTime = performance.now();
        //const characters =[...input].map(c => String.fromCodePoint(c));
        const characters = [...input];
        this.characters = characters;
        this.setInput(input);
        this.stateSets = [];
        let origin = 0;
        let loopLimit = getOptionNumber('loopLimit');
        if (!loopLimit)
            loopLimit = 1000;
        let timeOut = getOptionNumber('parseTimeout');
        if (timeOut)
            timeOut += startTime;
        //let s = new StateSet(input, origin++, this);
        let s = new StateSet(characters, origin++, this);
        this.stateSets.push(s);
        for (let i = 0; i < characters.length; i++) {
            this.stateSets[i + 1] = new StateSet(characters, i + 1, this);
        }
        let failure = null;
        s.initialise(this.start);
        let cont = true;
        let count = 0;
        try {
            while (cont) {
                if (count++ > loopLimit) {
                    grumble("Looping at start?");
                    break;
                }
                cont = s.process();
            }
            ;
        }
        catch (e) {
            if (e.message && e.message != "looping in process") {
                failure = e.message;
            }
        }
        function futureState(grammar, pos) {
            /*let states = grammar.stateSets.slice(pos);
             return states.length == 0 || states.some((e) => e.states.length > 0);*/
            return grammar.lastStateSet >= pos;
        }
        let last = s;
        if (!failure) {
            for (let i = 0; i < characters.length; i++) {
                s = this.stateSets[i + 1];
                /*s = new StateSet(characters, origin++, this);
                 this.stateSets.push(s);*/
                if (!s.scanOne(i, characters[i], last) && !futureState(this, i + 1)) {
                    const position = this.locate(i /* + 1*/);
                    const codepoint = input[i].codePointAt(0);
                    failure = "Failure at line " + position.line + " column " + position.col + "\nGiven '" + input[i] + "'" + " (codepoint " + codepoint + "\u2081\u2080,#" + Number(codepoint).toString(16) + ").\n";
                    let expectations = new Set();
                    last.needsTerminals().forEach(n => {
                        let nP = n.nextPart();
                        if ((!n.kill) && nP instanceof Markable && !(nP instanceof Insertion)) {
                            let additional;
                            if (n.rule.lineNumber) {
                                additional = ' {#' + n.rule.lineNumber + ": " + n.rule.sourceLine + "}";
                            }
                            else {
                                additional = ' {generated rule:' + n.name + " (see compiled grammar)}";
                            }
                            expectations.add("   " + nP.display() + additional);
                        }
                    });
                    failure += expectations.size ? "Expecting one of:\n" : "No further inpur expected";
                    failure += [...expectations].join(',\n');
                    failure += "\nInput:\n   " + this.getLine(position.line) + "\n   ";
                    failure += " ".repeat(position.col - 1) + "^\n";
                    break;
                }
                ;
                cont = true;
                count = 0;
                try {
                    while (cont) {
                        if (count++ > loopLimit) {
                            const position = this.locate(i);
                            grumble("Probable looping (" + loopLimit + ") processing character '" + characters[i] + "' @ line " + position.line + ", column " + position.col);
                            break;
                        }
                        if (timeOut && performance.now() > timeOut) {
                            const position = this.locate(i);
                            grumble("Parsing timeout (after " + (timeOut - startTime) + "ms) while processing character '" + characters[i] + "' @ line " + position.line + ", column " + position.col);
                            break;
                        }
                        totalStates++;
                        cont = s.process();
                    }
                    ;
                }
                catch (e) {
                    failure = e.message;
                    break;
                }
                last = s;
            }
        }
        const parseTime = performance.now() - startTime;
        let parseTree;
        let bottomUpTree;
        const justOne = getOptionBoolean('justOne');
        const suppressMarks = getOptionBoolean('suppressMarks');
        let ambigTrees = [];
        function registerIXMLns(element) {
            if (!element.hasAttribute("xmlns:ixml")) {
                element.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:ixml", ixmlNS);
                // This is somewhat heretical
            }
        }
        function recordAmbiguity(element) {
            registerIXMLns(element);
            element.setAttributeNS(ixmlNS, "ixml:state", "ambiguous");
        }
        function recordVersionMismatch(element, version) {
            registerIXMLns(element);
            element.setAttributeNS(ixmlNS, "ixml:version", version);
        }
        function display(node) {
            switch (node.nodeType) {
                case Node.ELEMENT_NODE:
                    return "<" + node.tagName + "/>";
                    break;
                case Node.ATTRIBUTE_NODE:
                    return "@" + node.name;
                    break;
                case Node.TEXT_NODE:
                    return "'" + node.textContent + "'";
                    break;
            }
        }
        function checkTopNode(nodes) {
            let node = nodes[0];
            if (node instanceof Attr) {
                grumble("An attribute node may not be the final parse result @" + node.name, "D05");
            }
            if (node instanceof Text) {
                grumble("A text node may not be the final parse result: '" + node.textContent + "'", "D06");
            }
            if (nodes.length > 1) {
                grumble("Multiple nodes may not be the final parse result:" + nodes.map(n => display(n)), "D06");
            }
        }
        let parsed = s.completes(this.start);
        if (!failure && parsed.length > 0) {
            const isAmbiguous = parsed.length > 1;
            parseTree = document.implementation.createDocument("", "", null);
            bottomUpTree = document.implementation.createDocument("", "", null);
            try {
                /*console.log(justOne.cloneNode());*/
                for (const oneSolution of parsed) {
                    try {
                        let b = oneSolution.bottomUp(bottomUpTree, this.productions, characters, null, null, justOne, suppressMarks, []);
                        if (b instanceof Ambiguity) {
                            for (const p of b.parts) {
                                recordAmbiguity(p[0]);
                                let parent = document.implementation.createDocument("", "", null);
                                ambigTrees.push(parent);
                                checkTopNode(p);
                                parent.append(p[0].cloneNode(true));
                                if (justOne) {
                                    break;
                                }
                            }
                            ;
                        }
                        else {
                            if (isAmbiguous) {
                                recordAmbiguity(b[0]);
                            }
                            if (versionMismatch) {
                                recordVersionMismatch(b[0], this.versionUsed);
                            }
                            let parent = document.implementation.createDocument("", "", null);
                            ambigTrees.push(parent);
                            checkTopNode(b);
                            parent.append(b[0].cloneNode(true));
                        }
                        if (justOne) {
                            break;
                        }
                    }
                    catch (e) {
                        if (!(e instanceof RequireError)) {
                            throw e;
                        }
                    }
                }
            }
            catch (e) {
                if (!e.code) {
                    failure = "Possible internal error: " + e.stack /*+ " :" + e. constructor.name + ":" + e.message*/;
                    //throw (e);
                }
                else {
                    // Catch dynamic errors during tree creation
                    failure = {
                        code: ((typeof e.code == "string") ? e.code.substring(e.code.indexOf('}') + 1) : e.code), message: e.message
                    };
                }
                parsed = [];
            }
            parseTree = ambigTrees[0];
        }
        else if (!failure) {
            failure = "\nEnd of input reached before parse completed.\nExpecting one of the following terminals:\n    ";
            let expectations = new Set();
            last.needsTerminals().forEach(n => {
                let nP = n.nextPart();
                if (nP instanceof Markable && !(nP instanceof Insertion)) {
                    expectations.add(n.name + ":" + nP.display());
                }
            });
            failure += [...expectations].join(';\n    ') + "\n";
        }
        const treeTime = performance.now() - startTime - parseTime;
        let result = {
            'parsed': parsed.length > 0,
            'tree': parseTree,
            'allTrees': ambigTrees,
            'states': this.stateSets,
            'parseTime': parseTime,
            'treeTime': treeTime,
            'compileTime': this.compileTime
        };
        if (failure) {
            result['failed'] = failure;
            result['allTrees'] = null;
            const doc = parseTree = document.implementation.createDocument("", "", null);
            result['tree'] = doc;
            const top = doc.createElement("ixml");
            doc.append(top);
            registerIXMLns(top);
            top.setAttributeNS(ixmlNS, "ixml:state", "failed");
            if (failure.code) {
                result['failed'] = failure.message;
                result['error-code'] = failure.code;
                top.setAttributeNS(ixmlNS, "ixml:error-code", failure.code);
                top.append(new Text('\n' + failure.message));
            }
            else {
                top.append(new Text('\n' + failure));
                if (failure.startsWith("Probable looping") || failure.startsWith("Parsing timeout")) {
                    result['looping'] = true;
                }
            }
        }
        return result;
    }
    flat() {
        let s = "";
        /* Find out the widest rule name so we can line the productions up */
        let col0width = this.parts.reduce((prev, curr) => (curr instanceof Rule && curr.lengthLHS() > prev) ? curr.lengthLHS() : prev, 0);
        for (const r of this.parts) {
            if (r instanceof CommentX || r instanceof Prolog) {
                s += "\n";
            }
            s += r.flat(col0width);
        }
        return s;
    }
    display(opts) {
        let options = {};
        options.debug = opts ? lookupOption(opts, false)('debug') : false;
        const output = document.implementation.createDocument("", "", null);
        this.toXML(output, options);
        return output;
    }
    toXML(output, opts = {
        debug: false
    }) {
        const e = output.createElement("ixml");
        if (this.start) {
            e.setAttribute("startTerm", this.start);
        }
        output.append(e);
        for (const r of this.parts) {
            r.toXML(e, opts);
        }
    }
}
var jwiXML = (function () {
    /** @dict */
    const result = {
        "compile": function (input, options) {
            /* window.confirm('Document:' + (input instanceof Document));
             window.confirm('DocumentFragment:' + (input instanceof DocumentFragment));
             window.confirm('Node:' + (input instanceof Node));*/
            return (input instanceof Document || input instanceof DocumentFragment) ? compileFromXML(input, options) : compile(input instanceof Node ? input.textContent : input, options);
        },
        "parse": function (input, options) {
            return (input instanceof Document || input instanceof DocumentFragment) ? parseFromXML(input, options) : parse(input instanceof Node ? input.textContent : input, options);
        },
        "version": function () {
            return version;
        }
    };
    return result;
})();
register("jwiXML", jwiXML);
/*window[ "jwiXML"] = function () {
    return jwiXML
};*/ 

/******/ })()
;