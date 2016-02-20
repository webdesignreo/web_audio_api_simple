/*
 * 	Google Code Prettify
 */
!function() {
    var q = null ;
    window.PR_SHOULD_USE_CONTINUATION = !0;
    (function() {
        function S(a) {
            function d(e) {
                var b = e.charCodeAt(0);
                if (b !== 92)
                    return b;
                var a = e.charAt(1);
                return (b = r[a]) ? b : "0" <= a && a <= "7" ? parseInt(e.substring(1), 8) : a === "u" || a === "x" ? parseInt(e.substring(2), 16) : e.charCodeAt(1)
            }
            function g(e) {
                if (e < 32)
                    return (e < 16 ? "\\x0" : "\\x") + e.toString(16);
                e = String.fromCharCode(e);
                return e === "\\" || e === "-" || e === "]" || e === "^" ? "\\" + e : e
            }
            function b(e) {
                var b = e.substring(1, e.length - 1).match(/\\u[\dA-Fa-f]{4}|\\x[\dA-Fa-f]{2}|\\[0-3][0-7]{0,2}|\\[0-7]{1,2}|\\[\S\s]|[^\\]/g)
                  , e = []
                  , a =
                b[0] === "^"
                  , c = ["["];
                a && c.push("^");
                for (var a = a ? 1 : 0, f = b.length; a < f; ++a) {
                    var h = b[a];
                    if (/\\[bdsw]/i.test(h))
                        c.push(h);
                    else {
                        var h = d(h), l;
                        a + 2 < f && "-" === b[a + 1] ? (l = d(b[a + 2]),
                        a += 2) : l = h;
                        e.push([h, l]);
                        l < 65 || h > 122 || (l < 65 || h > 90 || e.push([Math.max(65, h) | 32, Math.min(l, 90) | 32]),
                        l < 97 || h > 122 || e.push([Math.max(97, h) & -33, Math.min(l, 122) & -33]))
                    }
                }
                e.sort(function(e, a) {
                    return e[0] - a[0] || a[1] - e[1]
                });
                b = [];
                f = [];
                for (a = 0; a < e.length; ++a)
                    h = e[a],
                    h[0] <= f[1] + 1 ? f[1] = Math.max(f[1], h[1]) : b.push(f = h);
                for (a = 0; a < b.length; ++a)
                    h = b[a],
                    c.push(g(h[0])),
                    h[1] > h[0] && (h[1] + 1 > h[0] && c.push("-"),
                    c.push(g(h[1])));
                c.push("]");
                return c.join("")
            }
            function s(e) {
                for (var a = e.source.match(/\[(?:[^\\\]]|\\[\S\s])*]|\\u[\dA-Fa-f]{4}|\\x[\dA-Fa-f]{2}|\\\d+|\\[^\dux]|\(\?[!:=]|[()^]|[^()[\\^]+/g), c = a.length, d = [], f = 0, h = 0; f < c; ++f) {
                    var l = a[f];
                    l === "(" ? ++h : "\\" === l.charAt(0) && (l = +l.substring(1)) && (l <= h ? d[l] = -1 : a[f] = g(l))
                }
                for (f = 1; f < d.length; ++f)
                    -1 === d[f] && (d[f] = ++x);
                for (h = f = 0; f < c; ++f)
                    l = a[f],
                    l === "(" ? (++h,
                    d[h] || (a[f] = "(?:")) : "\\" === l.charAt(0) && (l = +l.substring(1)) && l <= h &&
                    (a[f] = "\\" + d[l]);
                for (f = 0; f < c; ++f)
                    "^" === a[f] && "^" !== a[f + 1] && (a[f] = "");
                if (e.ignoreCase && m)
                    for (f = 0; f < c; ++f)
                        l = a[f],
                        e = l.charAt(0),
                        l.length >= 2 && e === "[" ? a[f] = b(l) : e !== "\\" && (a[f] = l.replace(/[A-Za-z]/g, function(a) {
                            a = a.charCodeAt(0);
                            return "[" + String.fromCharCode(a & -33, a | 32) + "]"
                        }));
                return a.join("")
            }
            for (var x = 0, m = !1, j = !1, k = 0, c = a.length; k < c; ++k) {
                var i = a[k];
                if (i.ignoreCase)
                    j = !0;
                else if (/[a-z]/i.test(i.source.replace(/\\u[\da-f]{4}|\\x[\da-f]{2}|\\[^UXux]/gi, ""))) {
                    m = !0;
                    j = !1;
                    break
                }
            }
            for (var r = {
                b: 8,
                t: 9,
                n: 10,
                v: 11,
                f: 12,
                r: 13
            }, n = [], k = 0, c = a.length; k < c; ++k) {
                i = a[k];
                if (i.global || i.multiline)
                    throw Error("" + i);
                n.push("(?:" + s(i) + ")")
            }
            return RegExp(n.join("|"), j ? "gi" : "g")
        }
        function T(a, d) {
            function g(a) {
                var c = a.nodeType;
                if (c == 1) {
                    if (!b.test(a.className)) {
                        for (c = a.firstChild; c; c = c.nextSibling)
                            g(c);
                        c = a.nodeName.toLowerCase();
                        if ("br" === c || "li" === c)
                            s[j] = "\n",
                            m[j << 1] = x++,
                            m[j++ << 1 | 1] = a
                    }
                } else if (c == 3 || c == 4)
                    c = a.nodeValue,
                    c.length && (c = d ? c.replace(/\r\n?/g, "\n") : c.replace(/[\t\n\r ]+/g, " "),
                    s[j] = c,
                    m[j << 1] = x,
                    x += c.length,
                    m[j++ << 1 | 1] =
                    a)
            }
            var b = /(?:^|\s)nocode(?:\s|$)/
              , s = []
              , x = 0
              , m = []
              , j = 0;
            g(a);
            return {
                a: s.join("").replace(/\n$/, ""),
                d: m
            }
        }
        function H(a, d, g, b) {
            d && (a = {
                a: d,
                e: a
            },
            g(a),
            b.push.apply(b, a.g))
        }
        function U(a) {
            for (var d = void 0, g = a.firstChild; g; g = g.nextSibling)
                var b = g.nodeType
                  , d = b === 1 ? d ? a : g : b === 3 ? V.test(g.nodeValue) ? a : d : d;
            return d === a ? void 0 : d
        }
        function C(a, d) {
            function g(a) {
                for (var j = a.e, k = [j, "pln"], c = 0, i = a.a.match(s) || [], r = {}, n = 0, e = i.length; n < e; ++n) {
                    var z = i[n], w = r[z], t = void 0, f;
                    if (typeof w === "string")
                        f = !1;
                    else {
                        var h = b[z.charAt(0)];
                        if (h)
                            t = z.match(h[1]),
                            w = h[0];
                        else {
                            for (f = 0; f < x; ++f)
                                if (h = d[f],
                                t = z.match(h[1])) {
                                    w = h[0];
                                    break
                                }
                            t || (w = "pln")
                        }
                        if ((f = w.length >= 5 && "lang-" === w.substring(0, 5)) && !(t && typeof t[1] === "string"))
                            f = !1,
                            w = "src";
                        f || (r[z] = w)
                    }
                    h = c;
                    c += z.length;
                    if (f) {
                        f = t[1];
                        var l = z.indexOf(f)
                          , B = l + f.length;
                        t[2] && (B = z.length - t[2].length,
                        l = B - f.length);
                        w = w.substring(5);
                        H(j + h, z.substring(0, l), g, k);
                        H(j + h + l, f, I(w, f), k);
                        H(j + h + B, z.substring(B), g, k)
                    } else
                        k.push(j + h, w)
                }
                a.g = k
            }
            var b = {}, s;
            (function() {
                for (var g = a.concat(d), j = [], k = {}, c = 0, i = g.length; c < i; ++c) {
                    var r =
                    g[c]
                      , n = r[3];
                    if (n)
                        for (var e = n.length; --e >= 0; )
                            b[n.charAt(e)] = r;
                    r = r[1];
                    n = "" + r;
                    k.hasOwnProperty(n) || (j.push(r),
                    k[n] = q)
                }
                j.push(/[\S\s]/);
                s = S(j)
            })();
            var x = d.length;
            return g
        }
        function v(a) {
            var d = []
              , g = [];
            a.tripleQuotedStrings ? d.push(["str", /^(?:'''(?:[^'\\]|\\[\S\s]|''?(?=[^']))*(?:'''|$)|"""(?:[^"\\]|\\[\S\s]|""?(?=[^"]))*(?:"""|$)|'(?:[^'\\]|\\[\S\s])*(?:'|$)|"(?:[^"\\]|\\[\S\s])*(?:"|$))/, q, "'\""]) : a.multiLineStrings ? d.push(["str", /^(?:'(?:[^'\\]|\\[\S\s])*(?:'|$)|"(?:[^"\\]|\\[\S\s])*(?:"|$)|`(?:[^\\`]|\\[\S\s])*(?:`|$))/,
            q, "'\"`"]) : d.push(["str", /^(?:'(?:[^\n\r'\\]|\\.)*(?:'|$)|"(?:[^\n\r"\\]|\\.)*(?:"|$))/, q, "\"'"]);
            a.verbatimStrings && g.push(["str", /^@"(?:[^"]|"")*(?:"|$)/, q]);
            var b = a.hashComments;
            b && (a.cStyleComments ? (b > 1 ? d.push(["com", /^#(?:##(?:[^#]|#(?!##))*(?:###|$)|.*)/, q, "#"]) : d.push(["com", /^#(?:(?:define|e(?:l|nd)if|else|error|ifn?def|include|line|pragma|undef|warning)\b|[^\n\r]*)/, q, "#"]),
            g.push(["str", /^<(?:(?:(?:\.\.\/)*|\/?)(?:[\w-]+(?:\/[\w-]+)+)?[\w-]+\.h(?:h|pp|\+\+)?|[a-z]\w*)>/, q])) : d.push(["com",
            /^#[^\n\r]*/, q, "#"]));
            a.cStyleComments && (g.push(["com", /^\/\/[^\n\r]*/, q]),
            g.push(["com", /^\/\*[\S\s]*?(?:\*\/|$)/, q]));
            if (b = a.regexLiterals) {
                var s = (b = b > 1 ? "" : "\n\r") ? "." : "[\\S\\s]";
                g.push(["lang-regex", RegExp("^(?:^^\\.?|[+-]|[!=]=?=?|\\#|%=?|&&?=?|\\(|\\*=?|[+\\-]=|->|\\/=?|::?|<<?=?|>>?>?=?|,|;|\\?|@|\\[|~|{|\\^\\^?=?|\\|\\|?=?|break|case|continue|delete|do|else|finally|instanceof|return|throw|try|typeof)\\s*(" + ("/(?=[^/*" + b + "])(?:[^/\\x5B\\x5C" + b + "]|\\x5C" + s + "|\\x5B(?:[^\\x5C\\x5D" + b + "]|\\x5C" +
                s + ")*(?:\\x5D|$))+/") + ")")])
            }
            (b = a.types) && g.push(["typ", b]);
            b = ("" + a.keywords).replace(/^ | $/g, "");
            b.length && g.push(["kwd", RegExp("^(?:" + b.replace(/[\s,]+/g, "|") + ")\\b"), q]);
            d.push(["pln", /^\s+/, q, " \r\n\t\u00a0"]);
            b = "^.[^\\s\\w.$@'\"`/\\\\]*";
            a.regexLiterals && (b += "(?!s*/)");
            g.push(["lit", /^@[$_a-z][\w$@]*/i, q], ["typ", /^(?:[@_]?[A-Z]+[a-z][\w$@]*|\w+_t\b)/, q], ["pln", /^[$_a-z][\w$@]*/i, q], ["lit", /^(?:0x[\da-f]+|(?:\d(?:_\d+)*\d*(?:\.\d*)?|\.\d\+)(?:e[+-]?\d+)?)[a-z]*/i, q, "0123456789"], ["pln", /^\\[\S\s]?/,
            q], ["pun", RegExp(b), q]);
            return C(d, g)
        }
        function J(a, d, g) {
            function b(a) {
                var c = a.nodeType;
                if (c == 1 && !x.test(a.className))
                    if ("br" === a.nodeName)
                        s(a),
                        a.parentNode && a.parentNode.removeChild(a);
                    else
                        for (a = a.firstChild; a; a = a.nextSibling)
                            b(a);
                else if ((c == 3 || c == 4) && g) {
                    var d = a.nodeValue
                      , i = d.match(m);
                    if (i)
                        c = d.substring(0, i.index),
                        a.nodeValue = c,
                        (d = d.substring(i.index + i[0].length)) && a.parentNode.insertBefore(j.createTextNode(d), a.nextSibling),
                        s(a),
                        c || a.parentNode.removeChild(a)
                }
            }
            function s(a) {
                function b(a, c) {
                    var d =
                    c ? a.cloneNode(!1) : a
                      , e = a.parentNode;
                    if (e) {
                        var e = b(e, 1)
                          , g = a.nextSibling;
                        e.appendChild(d);
                        for (var i = g; i; i = g)
                            g = i.nextSibling,
                            e.appendChild(i)
                    }
                    return d
                }
                for (; !a.nextSibling; )
                    if (a = a.parentNode,
                    !a)
                        return;
                for (var a = b(a.nextSibling, 0), d; (d = a.parentNode) && d.nodeType === 1; )
                    a = d;
                c.push(a)
            }
            for (var x = /(?:^|\s)nocode(?:\s|$)/, m = /\r\n?|\n/, j = a.ownerDocument, k = j.createElement("li"); a.firstChild; )
                k.appendChild(a.firstChild);
            for (var c = [k], i = 0; i < c.length; ++i)
                b(c[i]);
            d === (d | 0) && c[0].setAttribute("value", d);
            var r = j.createElement("ol");
            r.className = "linenums";
            for (var d = Math.max(0, d - 1 | 0) || 0, i = 0, n = c.length; i < n; ++i)
                k = c[i],
                k.className = "L" + (i + d) % 10,
                k.firstChild || k.appendChild(j.createTextNode("\u00a0")),
                r.appendChild(k);
            a.appendChild(r)
        }
        function p(a, d) {
            for (var g = d.length; --g >= 0; ) {
                var b = d[g];
                F.hasOwnProperty(b) ? D.console && console.warn("cannot override language handler %s", b) : F[b] = a
            }
        }
        function I(a, d) {
            if (!a || !F.hasOwnProperty(a))
                a = /^\s*</.test(d) ? "default-markup" : "default-code";
            return F[a]
        }
        function K(a) {
            var d = a.h;
            try {
                var g = T(a.c, a.i)
                  , b = g.a;
                a.a = b;
                a.d = g.d;
                a.e = 0;
                I(d, b)(a);
                var s = /\bMSIE\s(\d+)/.exec(navigator.userAgent)
                  , s = s && +s[1] <= 8
                  , d = /\n/g
                  , x = a.a
                  , m = x.length
                  , g = 0
                  , j = a.d
                  , k = j.length
                  , b = 0
                  , c = a.g
                  , i = c.length
                  , r = 0;
                c[i] = m;
                var n, e;
                for (e = n = 0; e < i; )
                    c[e] !== c[e + 2] ? (c[n++] = c[e++],
                    c[n++] = c[e++]) : e += 2;
                i = n;
                for (e = n = 0; e < i; ) {
                    for (var p = c[e], w = c[e + 1], t = e + 2; t + 2 <= i && c[t + 1] === w; )
                        t += 2;
                    c[n++] = p;
                    c[n++] = w;
                    e = t
                }
                c.length = n;
                var f = a.c, h;
                if (f)
                    h = f.style.display,
                    f.style.display = "none";
                try {
                    for (; b < k; ) {
                        var l = j[b + 2] || m, B = c[r + 2] || m, t = Math.min(l, B), A = j[b + 1], G;
                        if (A.nodeType !== 1 && (G = x.substring(g,
                        t))) {
                            s && (G = G.replace(d, "\r"));
                            A.nodeValue = G;
                            var L = A.ownerDocument
                              , o = L.createElement("span");
                            o.className = c[r + 1];
                            var v = A.parentNode;
                            v.replaceChild(o, A);
                            o.appendChild(A);
                            g < l && (j[b + 1] = A = L.createTextNode(x.substring(t, l)),
                            v.insertBefore(A, o.nextSibling))
                        }
                        g = t;
                        g >= l && (b += 2);
                        g >= B && (r += 2)
                    }
                } finally {
                    if (f)
                        f.style.display = h
                }
            } catch (u) {
                D.console && console.log(u && u.stack || u)
            }
        }
        var D = window
          , y = ["break,continue,do,else,for,if,return,while"]
          , E = [[y, "auto,case,char,const,default,double,enum,extern,float,goto,inline,int,long,register,short,signed,sizeof,static,struct,switch,typedef,union,unsigned,void,volatile"],
        "catch,class,delete,false,import,new,operator,private,protected,public,this,throw,true,try,typeof"]
          , M = [E, "alignof,align_union,asm,axiom,bool,concept,concept_map,const_cast,constexpr,decltype,delegate,dynamic_cast,explicit,export,friend,generic,late_check,mutable,namespace,nullptr,property,reinterpret_cast,static_assert,static_cast,template,typeid,typename,using,virtual,where"]
          , N = [E, "abstract,assert,boolean,byte,extends,final,finally,implements,import,instanceof,interface,null,native,package,strictfp,super,synchronized,throws,transient"]
          ,
        O = [N, "as,base,by,checked,decimal,delegate,descending,dynamic,event,fixed,foreach,from,group,implicit,in,internal,into,is,let,lock,object,out,override,orderby,params,partial,readonly,ref,sbyte,sealed,stackalloc,string,select,uint,ulong,unchecked,unsafe,ushort,var,virtual,where"]
          , E = [E, "debugger,eval,export,function,get,null,set,undefined,var,with,Infinity,NaN"]
          , P = [y, "and,as,assert,class,def,del,elif,except,exec,finally,from,global,import,in,is,lambda,nonlocal,not,or,pass,print,raise,try,with,yield,False,True,None"]
          ,
        Q = [y, "alias,and,begin,case,class,def,defined,elsif,end,ensure,false,in,module,next,nil,not,or,redo,rescue,retry,self,super,then,true,undef,unless,until,when,yield,BEGIN,END"]
          , W = [y, "as,assert,const,copy,drop,enum,extern,fail,false,fn,impl,let,log,loop,match,mod,move,mut,priv,pub,pure,ref,self,static,struct,true,trait,type,unsafe,use"]
          , y = [y, "case,done,elif,esac,eval,fi,function,in,local,set,then,until"]
          , R = /^(DIR|FILE|vector|(de|priority_)?queue|list|stack|(const_)?iterator|(multi)?(set|map)|bitset|u?(int|float)\d*)\b/
          ,
        V = /\S/
          , X = v({
            keywords: [M, O, E, "caller,delete,die,do,dump,elsif,eval,exit,foreach,for,goto,if,import,last,local,my,next,no,our,print,package,redo,require,sub,undef,unless,until,use,wantarray,while,BEGIN,END", P, Q, y],
            hashComments: !0,
            cStyleComments: !0,
            multiLineStrings: !0,
            regexLiterals: !0
        })
          , F = {};
        p(X, ["default-code"]);
        p(C([], [["pln", /^[^<?]+/], ["dec", /^<!\w[^>]*(?:>|$)/], ["com", /^<\!--[\S\s]*?(?:--\>|$)/], ["lang-", /^<\?([\S\s]+?)(?:\?>|$)/], ["lang-", /^<%([\S\s]+?)(?:%>|$)/], ["pun", /^(?:<[%?]|[%?]>)/], ["lang-",
        /^<xmp\b[^>]*>([\S\s]+?)<\/xmp\b[^>]*>/i], ["lang-js", /^<script\b[^>]*>([\S\s]*?)(<\/script\b[^>]*>)/i], ["lang-css", /^<style\b[^>]*>([\S\s]*?)(<\/style\b[^>]*>)/i], ["lang-in.tag", /^(<\/?[a-z][^<>]*>)/i]]), ["default-markup", "htm", "html", "mxml", "xhtml", "xml", "xsl"]);
        p(C([["pln", /^\s+/, q, " \t\r\n"], ["atv", /^(?:"[^"]*"?|'[^']*'?)/, q, "\"'"]], [["tag", /^^<\/?[a-z](?:[\w-.:]*\w)?|\/?>$/i], ["atn", /^(?!style[\s=]|on)[a-z](?:[\w:-]*\w)?/i], ["lang-uq.val", /^=\s*([^\s"'>]*(?:[^\s"'/>]|\/(?=\s)))/], ["pun", /^[/<->]+/],
        ["lang-js", /^on\w+\s*=\s*"([^"]+)"/i], ["lang-js", /^on\w+\s*=\s*'([^']+)'/i], ["lang-js", /^on\w+\s*=\s*([^\s"'>]+)/i], ["lang-css", /^style\s*=\s*"([^"]+)"/i], ["lang-css", /^style\s*=\s*'([^']+)'/i], ["lang-css", /^style\s*=\s*([^\s"'>]+)/i]]), ["in.tag"]);
        p(C([], [["atv", /^[\S\s]+/]]), ["uq.val"]);
        p(v({
            keywords: M,
            hashComments: !0,
            cStyleComments: !0,
            types: R
        }), ["c", "cc", "cpp", "cxx", "cyc", "m"]);
        p(v({
            keywords: "null,true,false"
        }), ["json"]);
        p(v({
            keywords: O,
            hashComments: !0,
            cStyleComments: !0,
            verbatimStrings: !0,
            types: R
        }),
        ["cs"]);
        p(v({
            keywords: N,
            cStyleComments: !0
        }), ["java"]);
        p(v({
            keywords: y,
            hashComments: !0,
            multiLineStrings: !0
        }), ["bash", "bsh", "csh", "sh"]);
        p(v({
            keywords: P,
            hashComments: !0,
            multiLineStrings: !0,
            tripleQuotedStrings: !0
        }), ["cv", "py", "python"]);
        p(v({
            keywords: "caller,delete,die,do,dump,elsif,eval,exit,foreach,for,goto,if,import,last,local,my,next,no,our,print,package,redo,require,sub,undef,unless,until,use,wantarray,while,BEGIN,END",
            hashComments: !0,
            multiLineStrings: !0,
            regexLiterals: 2
        }), ["perl", "pl", "pm"]);
        p(v({
            keywords: Q,
            hashComments: !0,
            multiLineStrings: !0,
            regexLiterals: !0
        }), ["rb", "ruby"]);
        p(v({
            keywords: E,
            cStyleComments: !0,
            regexLiterals: !0
        }), ["javascript", "js"]);
        p(v({
            keywords: "all,and,by,catch,class,else,extends,false,finally,for,if,in,is,isnt,loop,new,no,not,null,of,off,on,or,return,super,then,throw,true,try,unless,until,when,while,yes",
            hashComments: 3,
            cStyleComments: !0,
            multilineStrings: !0,
            tripleQuotedStrings: !0,
            regexLiterals: !0
        }), ["coffee"]);
        p(v({
            keywords: W,
            cStyleComments: !0,
            multilineStrings: !0
        }), ["rc", "rs", "rust"]);
        p(C([], [["str", /^[\S\s]+/]]), ["regex"]);
        var Y = D.PR = {
            createSimpleLexer: C,
            registerLangHandler: p,
            sourceDecorator: v,
            PR_ATTRIB_NAME: "atn",
            PR_ATTRIB_VALUE: "atv",
            PR_COMMENT: "com",
            PR_DECLARATION: "dec",
            PR_KEYWORD: "kwd",
            PR_LITERAL: "lit",
            PR_NOCODE: "nocode",
            PR_PLAIN: "pln",
            PR_PUNCTUATION: "pun",
            PR_SOURCE: "src",
            PR_STRING: "str",
            PR_TAG: "tag",
            PR_TYPE: "typ",
            prettyPrintOne: D.prettyPrintOne = function(a, d, g) {
                var b = document.createElement("div");
                b.innerHTML = "<pre>" + a + "</pre>";
                b = b.firstChild;
                g && J(b, g, !0);
                K({
                    h: d,
                    j: g,
                    c: b,
                    i: 1
                });
                return b.innerHTML
            }
            ,
            prettyPrint: D.prettyPrint = function(a, d) {
                function g() {
                    for (var b = D.PR_SHOULD_USE_CONTINUATION ? c.now() + 250 : Infinity; i < p.length && c.now() < b; i++) {
                        for (var d = p[i], j = h, k = d; k = k.previousSibling; ) {
                            var m = k.nodeType
                              , o = (m === 7 || m === 8) && k.nodeValue;
                            if (o ? !/^\??prettify\b/.test(o) : m !== 3 || /\S/.test(k.nodeValue))
                                break;
                            if (o) {
                                j = {};
                                o.replace(/\b(\w+)=([\w%+\-.:]+)/g, function(a, b, c) {
                                    j[b] = c
                                });
                                break
                            }
                        }
                        k = d.className;
                        if ((j !== h || e.test(k)) && !v.test(k)) {
                            m = !1;
                            for (o = d.parentNode; o; o = o.parentNode)
                                if (f.test(o.tagName) &&
                                o.className && e.test(o.className)) {
                                    m = !0;
                                    break
                                }
                            if (!m) {
                                d.className += " prettyprinted";
                                m = j.lang;
                                if (!m) {
                                    var m = k.match(n), y;
                                    if (!m && (y = U(d)) && t.test(y.tagName))
                                        m = y.className.match(n);
                                    m && (m = m[1])
                                }
                                if (w.test(d.tagName))
                                    o = 1;
                                else
                                    var o = d.currentStyle
                                      , u = s.defaultView
                                      , o = (o = o ? o.whiteSpace : u && u.getComputedStyle ? u.getComputedStyle(d, q).getPropertyValue("white-space") : 0) && "pre" === o.substring(0, 3);
                                u = j.linenums;
                                if (!(u = u === "true" || +u))
                                    u = (u = k.match(/\blinenums\b(?::(\d+))?/)) ? u[1] && u[1].length ? +u[1] : !0 : !1;
                                u && J(d, u, o);
                                r =
                                {
                                    h: m,
                                    c: d,
                                    j: u,
                                    i: o
                                };
                                K(r)
                            }
                        }
                    }
                    i < p.length ? setTimeout(g, 250) : "function" === typeof a && a()
                }
                for (var b = d || document.body, s = b.ownerDocument || document, b = [b.getElementsByTagName("pre"), b.getElementsByTagName("code"), b.getElementsByTagName("xmp")], p = [], m = 0; m < b.length; ++m)
                    for (var j = 0, k = b[m].length; j < k; ++j)
                        p.push(b[m][j]);
                var b = q
                  , c = Date;
                c.now || (c = {
                    now: function() {
                        return +new Date
                    }
                });
                var i = 0, r, n = /\blang(?:uage)?-([\w.]+)(?!\S)/, e = /\bprettyprint\b/, v = /\bprettyprinted\b/, w = /pre|xmp/i, t = /^code$/i, f = /^(?:pre|code|xmp)$/i,
                h = {};
                g()
            }
        };
        typeof define === "function" && define.amd && define("google-code-prettify", [], function() {
            return Y
        })
    })();
}()


/*
 * 	Ex Code Prettify 0.5.2 - jQuery plugin
 *	written by cyokodog
 *
 *	Copyright (c) 2014 cyokodog
 *		http://www.cyokodog.net/
 *		http://d.hatena.ne.jp/cyokodog/)
 *		http://cyokodog.tumblr.com/
 *	MIT LICENCE
 *
 *	Built for jQuery library
 *	http://jquery.com
 *
 */

;
(function($) {

    var addIEStyle = function(style) {
        var exp = /^\s+|\s+$/g;
        var css = document.createStyleSheet()
        var style = style.split('}')
        for (var i = 0; i < style.length; i++) {
            var t = style[i].split('{');
            if (t.length > 1) {
                css.addRule(
                t[0].replace(exp, ''),
                t[1].replace(exp, '')
                );
            }
        }
        return css;
    }

    var repeat = function(v, count) {
        var ret = '';
        for (var i = 0; i < count; i++)
            ret += v;
        return ret;
    }

    var tabIndent = function(target, v) {
        if (!v)
            v = '\t';
        $(target)[plugin_on]('keydown', function(evt) {
            try {
                if (evt.keyCode === 9) {
                    var elm = evt.target;
                    var val = elm.value;
                    var pos = elm.selectionStart;
                    elm.value = val.substr(0, pos) + v + val.substr(pos, val.length);
                    elm.setSelectionRange(pos + v.length, pos + v.length);
                    return false;
                }
            }
            catch (e) {
            }
        });
    }

    var tabToSpace = function(target, tabSize) {
        var spc = repeat(' ', tabSize);
        var arr = target.val().split('\n');
        for (var i = 0; i < arr.length; i++) {
            arr[i] = arr[i].replace(/\t/g, spc);
        }
        target.val(arr.join('\n'));
    }

    var behaveJs = function(target, c) {
        target = $(target);
        if (c.replaceTab && c.softTabs) {
            tabToSpace(target, c.tabSize);
        }
        new Behave($.extend(c, {
            textarea: target[0]
        }));
    }


    // Namespace
    $.ex = $.ex || {};

    $.ex.api = function(api) {
        var api = $(api)
          , api0 = api[0];
        for (var name in api0)
            (function(name) {
                if ($.isFunction(api0[name]))
                    api[name] = (/^get[^a-z]/.test(name)) ?
                    function() {
                        return api0[name].apply(api0, arguments);
                    }
                     :
                    function() {
                        var arg = arguments;
                        api.each(function(idx) {
                            var apix = api[idx];
                            apix[name].apply(apix, arg);
                        })
                        return api;
                    }
            })(name);
        return api;
    }

    // Constructor
    var plugin = $.ex.codePrettify = function(target, option) {
        var o = this
          ,
        c = o.config = $.extend(true, {}, $.ex.codePrettify.defaults, option, o.getJsonData(target) || {});
        plugin.status.runtime++;
        c.savePrefix = c.savePrefix || (plugin.id + '-' + plugin.status.runtime)
        c.target = target;
        c._tag = {
            css: '<style/>',
            html: '<div class="demo-html"/>',
            script: '<script/>',
            jsFile: '<script/>',
            cssFile: '<link media="screen" rel="stylesheet" type="text/css"/>'
        }
        c._result = {};
        c._loaded = false;
        c.container = c.target.parents(c.container).eq(0);
        if (!c.container.size())
            c.container = c.target.parent();

        c.defaultStyle = c.container.hasClass(plugin.id);

        c.codeArea = c.container.find(c.codeArea);
        c.demoArea = c.container.find(c.demoArea);
        c.demoTitleArea = c.container.find('span.demo-title-area');
        c.runButton = c.container.find(c.runButton);
        c.resetButton = c.container.find(c.resetButton);

        if (c.defaultStyle) {
            if (c.codeArea.size())
                c.target.appendTo(c.codeArea);
            else
                c.codeArea = c.target.wrap('<div class="code-area"/>').parent();
        }
        if (!c.demoArea.size()) {
            c.demoArea = $('<div class="demo-area"/>').prependTo(c.container);
            if (c.defaultStyle) {
                c.demoTitleArea = $('<span class="demo-title-area"><span class="demo-title"/></span>').prependTo(c.demoArea);
                c.demoTitleArea.find('span.demo-title').text(c.demoLabel);
            }
        }

        if (c.defaultStyle) {
            c.demoArea[c.container.hasClass('demo-bottom') ? 'appendTo' : 'prependTo'](c.container);
            if (!c.runButton.size() && !c.resetButton.size() && (c.showRunButton || c.showResetButton)) {
                c.demoTool = $('<span class="demo-tool"/>').appendTo(c.demoTitleArea);
                if (c.showRunButton)
                    c.runButton = $('<a class="run-button" href="#"/>').text(c.runLabel).appendTo(c.demoTool);
                if (c.showResetButton)
                    c.resetButton = $('<a class="reset-button" href="#"/>').text(c.resetLabel).appendTo(c.demoTool);
            }
        }

        c.rendarFrom = c.demoArea.data(plugin.id + '-rendar-from') || [];
        c.rendarFrom.push(o);
        c.demoArea.data(plugin.id + '-rendar-from', c.rendarFrom);

        if (c.target.prop('tagName') == 'TEXTAREA') {
            c.textarea = c.target;
            c.pre = $('<pre/>').insertBefore(c.textarea);
        }
        else {
            c.pre = c.target;
            c.textarea = $('<textarea/>').insertAfter(c.pre);
            c.textarea.val($.trim(c.pre.text()));
        }

        !c.clearStorage || o.clearStorage();
        !c.autoLoadFromStorage || o.loadCodeFromStorage();

        if (c.tabToSpace) {
            tabToSpace(c.textarea, c.tabToSpaceSize);
        }

        c.contents = c.pre.add(c.textarea).wrapAll('<div/>').parent().addClass(plugin.id + '-contents');
        c.tools = $('<div><span class="title"></span></div>').addClass(plugin.id + '-tools').prependTo(c.contents);
        c.title = c.title || c.codeTypeTitle[c.codeType];
        !c.title || c.tools.find('.title').text(c.title);
        c.editTools = $('<span/>').addClass(plugin.id + '-edit-tools').appendTo(c.tools);
        c.viewTools = $('<span/>').addClass(plugin.id + '-view-tools').appendTo(c.tools);

        if (!c.editCode && !c.runButton.size() && !c.resetButton.size()) {
            c.textarea.prop('readOnly', true);
            c.raw = $('<a href="#"/>').addClass(plugin.id + '-raw').text(c.rawLabel).appendTo(c.viewTools);
            c.back = $('<a href="#"/>').addClass(plugin.id + '-back').text(c.backLabel).appendTo(c.editTools);
            c.raw[plugin_on]('click', function() {
                o.editMode();
                c.textarea.select();
                return false;
            });
            c.back[plugin_on]('click', function() {
                o.viewMode();
                return false;
            });
            o._reset();
        }
        else {
            c.edit = $('<a href="#"/>').addClass(plugin.id + '-edit').text(c.editLabel).appendTo(c.viewTools);
            c.save = $('<a href="#"/>').addClass(plugin.id + '-save').text(c.saveLabel).appendTo(c.editTools);
            c.cancel = $('<a href="#"/>').addClass(plugin.id + '-cancel').text(c.cancelLabel).appendTo(c.editTools);
            c.edit[plugin_on]('click', function() {
                c._val = c.textarea.val();
                o.editMode();
                c.textarea.focus();
                return false;
            });
            c.cancel[plugin_on]('click', function() {
                c.textarea.val(c._val);
                o.viewMode();
                return false;
            });
            c.save[plugin_on]('click', function() {
                o.viewMode();
                o._pretty();
                o.resetDemo();
                !c.autoSaveToStorage || o.saveCodeToStorage();
                c.onSave.apply(o, [o]);
                return false;
            });
            if (c.runButton.size()) {
                c.runButton[plugin_on]('click', function() {
                    o.runDemo();
                    return false;
                });
            }
            if (c.resetButton.size()) {
                c.resetButton[plugin_on]('click', function() {
                    o.resetDemo();
                    return false;
                });
            }
            if (typeof Behave != 'undefined' && c.behaveJS) {
                behaveJs(c.textarea[0], c.behaveJSParam);
            }
            else
            if (c.tabIndent) {
                //				tabIndent(c.textarea, c.tabToSpace ? repeat(' ', c.tabToSpaceSize) : '\t');
                tabIndent(c.textarea);
            }
            o._reset();
        }
        o._pretty();

        if (!c.showDemo) {
            c.demoArea.hide();
            c.codeArea.addClass('hide-demo');
            c.container.addClass('ex-code-prettify-hide-demo');
        }
        else
        if (!c.showCode) {
            c.contents.hide();
            c.container.addClass('ex-code-prettify-hide-code');
        }

        if (c.adjustEditorHeight && c.editCode) {
            var timer;
            c.textarea[plugin_on]('keyup', function() {
                if (timer)
                    clearTimeout(timer);
                timer = setTimeout(function() {
                    c.textarea.height(o._calcTextareaHeight());
                }, 300);
            });
        }
    }

    // API
    $.extend($.ex.codePrettify.prototype, {

        // config の取得
        getConfig: function() {
            return this.config;
        },

        // json 形式の独自データ属性 の取得
        getJsonData: function(target, name) {
            try {
                eval('var r = ' + (target || this.config.target).attr('data-' + (name || plugin.paramId)));
            } catch (e) {
                return undefined;
            }
            return r;
        },

        // 特定パラメータの取得
        getParam: function(name) {
            var o = this
              , c = o.config;
            var v = c[name];
            return typeof v != 'function' ? v : v.apply(o, [o]);
        },

        // プラグイン適用オブジェクトの取得
        getTarget: function() {
            return this.config.target;
        },

        // 編集モードへの切り替え
        editMode: function() {
            var o = this
              , c = o.config;
            c.contents.addClass(plugin.id + '-edit-mode');
        },

        // 表示モードへの切り替え
        viewMode: function() {
            var o = this
              , c = o.config;
            c.contents.removeClass(plugin.id + '-edit-mode');
        },

        // デモの実行
        runDemo: function() {
            var o = this
              , c = o.config;
            c.rendarFrom = c.demoArea.data(plugin.id + '-rendar-from');
            $.each(c.rendarFrom, function(idx) {
                c.rendarFrom[idx]._rendar();
            });
        },

        // デモのリセット
        resetDemo: function() {
            var o = this
              , c = o.config;
            c.rendarFrom = c.demoArea.data(plugin.id + '-rendar-from');
            $.each(c.rendarFrom, function(idx) {
                c.rendarFrom[idx]._reset();
            });
        },

        // コード種別の取得
        getCodeType: function() {
            var o = this
              , c = o.config;
            return c.codeType;
        },

        // コードの取得
        getCode: function() {
            var o = this
              , c = o.config;
            return c.textarea.val();
        },

        // 全てのコードの取得（json形式）
        getAllCode: function() {
            var o = this
              , c = o.config;
            var codes = {};
            $.each(c.rendarFrom, function(idx) {
                var api = c.rendarFrom[idx];
                codes[api.getCodeType()] = api.getCode();
            });
            return codes;
        },

        // local storage 保存コードの削除
        clearStorage: function(prefix) {
            if (!window.localStorage)
                return;
            var o = this
              , c = o.config;
            var key = (prefix || c.savePrefix) + '-' + o.getCodeType();
            localStorage.removeItem(key, o.getCode());
        },

        // コードの local storage への保存
        saveCodeToStorage: function(prefix) {
            if (!window.localStorage)
                return;
            var o = this
              , c = o.config;
            var key = (prefix || c.savePrefix) + '-' + o.getCodeType();
            return localStorage.setItem(encodeURIComponent(key), o.getCode());
        },

        // local storage 保存コードの取得
        getCodeFromStorage: function(prefix) {
            if (!window.localStorage)
                return;
            var o = this
              , c = o.config;
            var key = (prefix || c.savePrefix) + '-' + o.getCodeType();
            return localStorage.getItem(encodeURIComponent(key));
        },

        // local storage 保存コードのロード
        loadCodeFromStorage: function(prefix) {
            if (!window.localStorage)
                return;
            var o = this
              , c = o.config;
            var code = o.getCodeFromStorage(prefix);
            if (code != null )
                c.textarea.val(code);
        },

        // テキストエリアの高さ調整
        _calcTextareaHeight: function(pre) {
            var o = this
              , c = o.config;
            if (!pre) {
                pre = $('<pre class="dummy"/>').insertBefore(c.textarea);
                pre.text(c.textarea.val());
                pre.addClass('prettyprint');
                prettyPrint();
            }
            var h = (pre.height() +
            parseInt(c.textarea.css('padding-top'), 10) +
            parseInt(c.textarea.css('padding-bottom'), 10) +
            50
            );
            if (pre.hasClass('dummy'))
                pre.remove();
            return h;
        },

        // Google Code Pretty の実行
        _pretty: function() {
            var o = this
              , c = o.config;
            var v = $.trim(c.textarea.val());
            c.textarea.val(v);
            if (c.pre)
                c.pre.remove();
            c.pre = $('<pre/>').insertBefore(c.textarea);
            c.pre.text(v);
            c.pre.addClass(plugin.id).addClass('prettyprint');
            !c.prettyClass || c.pre.addClass(c.prettyClass);
            prettyPrint();
            c.textarea.css({
                'font-family': c.pre.css('font-family'),
                'font-size': c.pre.css('font-size'),
                'line-height': c.pre.css('line-height')
            });
            c.textarea.height(o._calcTextareaHeight(c.pre));
        },

        // 外部ファイル読み込み完了後の実行
        _onFileLoaded: function(f) {
            var o = this
              , c = o.config;
            var callee = arguments.callee;
            var fileLoaded = true;
            $.each(c.rendarFrom, function(idx) {
                var api = c.rendarFrom[idx];
                var conf = api.getConfig();
                if (/cssFile|jsFile/.test(conf.codeType) && !conf._loaded.complete) {
                    fileLoaded = false;
                }
            });
            if (fileLoaded) {
                f();
            }
            else {
                setTimeout(function() {
                    f.count = (f.count || 0) + 1;
                    if (f.count < 1000000)
                        callee.call(o, f);
                }, 0);
            }
        },

        // デモオブジェクトの生成
        _rendar: function() {
            var o = this
              , c = o.config;
            if (!c.showDemo)
                return;
            try {
                o._remove();
                var code = c.textarea.val();
                if (!code || !c.codeType)
                    return undefined;
                if (/file$/ig.test(c.codeType)) {
                    var nodes = [];
                    var arr = code.split('\n');
                    c._loaded = {
                        count: 0,
                        complete: false
                    }
                    $.each(arr, function(idx) {
                        if (arr[idx]) {
                            var node = $(c._tag[c.codeType]);
                            node.on('load', function() {
                                c._loaded.count++;
                                c._loaded.complete = (c._loaded.count == arr.length);
                            });
                            !c.demoArea || node.appendTo(c.demoArea);
                            node.prop(/^js/ig.test(c.codeType) ? 'src' : 'href', arr[idx]);
                            nodes.push(node[0]);
                        }
                    });
                    return c._result[c.codeType] = $(nodes);
                }
                if (c.codeType == 'script') {
                    code = '(function(API, $DEMO){%1})(o, c.demoArea.find(".demo-html"));'.replace('%1', code);
                }
                var r = c._result[c.codeType] = $(c._tag[c.codeType]);
                o._onFileLoaded(function() {
                    if (c.codeType == 'script') {
                        setTimeout(function() {
                            try {
                                eval(code)
                            } catch (e) {}
                        }, 0);
                    }
                    else {
                        try {
                            r.html(code)
                        }
                        catch (e) {
                            c.codeType != 'css' || r.data(plugin.id + '-ie-style', addIEStyle(code));
                        }
                    }
                    !c.demoArea || r.appendTo(c.demoArea);
                });
                return r;
            }
            catch (e) {
            }
        },

        // デモオブジェクトの削除
        _remove: function() {
            var o = this
              , c = o.config;
            var r = c._result[c.codeType];
            if (r) {
                var ie = r.data(plugin.id + '-ie-style');
                !ie || ie.removeRule();
                r.remove();
            }
        },

        // デモの実行をリセット
        _reset: function() {
            var o = this
              , c = o.config;
            o._remove();
            !c.autoRun || setTimeout(function() {
                o._rendar();
            }, 0);
        }
    });

    // Setting
    $.extend($.ex.codePrettify, {
        status: {
            runtime: 0
        },
        defaults: {
            api: false,
            // true の場合 api オブジェクトを返す。
            prettyClass: 'linenums',
            // linenums を指定すると行番号が表示される。
            title: '',
            // コードのヘッダタイトルを指定。
            codeTypeTitle: {
                // title パラメータ未指定時に設定されるコードのヘッダタイトル。
                css: 'CSS',
                html: 'HTML',
                script: 'JavaScript',
                jsFile: 'JS File',
                cssFile: 'CSS File'
            },
            editCode: false,
            // true でコードの編集が可能になる。
            tabIndent: true,
            // true でコード編集時 Tab キーによるインデントが可能になる。
            tabToSpace: false,
            // true で Google Code Prettify によるコード表示時、Tab をスペースに置換する。
            tabToSpaceSize: 4,
            // tabToSpace が true 時に置換するスペースの数を指定。

            behaveJS: false,
            // true で Behave.js を有効にする。
            behaveJSParam: {
                // Behave.js の初期パラメータ。
                textarea: null ,
                replaceTab: true,
                softTabs: true,
                tabSize: 4,
                autoOpen: true,
                overwrite: true,
                autoStrip: true,
                autoIndent: true,
                fence: false
            },

            codeType: '',
            // "css","html","script","jsFile","cssFile" のいずれかを指定。
            autoRun: true,
            // true でデモを自動実行する。
            container: '.ex-code-prettify',
            // デモ、コードのコンテナ要素のセレクタを指定。
            codeArea: 'div.code-area',
            // コードの出力先要素のセレクタを指定。
            demoArea: 'div.demo-area',
            // デモの出力先要素のセレクタを指定。
            editLabel: 'EDIT',
            // 編集ボタンのラベル。
            saveLabel: 'SAVE',
            // 編集内容の確定ボタンのラベル。
            cancelLabel: 'CANCEL',
            // 編集内容の取り消しボタンのラベル。
            rawLabel: 'RAW',
            // プレーン表示モードボタンのラベル。
            backLabel: 'BACK',
            // プレーン表示モードから戻るボタンのラベル。
            demoLabel: 'DEMO',
            // デモコンテンツのタイトルラベル。
            showRunButton: false,
            // true でデモ実行ボタンが表示される。
            runButton: '.run-button',
            // デモ実行ボタンのセレクタを指定。
            runLabel: 'RUN',
            // デモ実行ボタンのラベル。
            showResetButton: false,
            // true でデモリセットボタンが表示される。
            resetButton: '.reset-button',
            // デモリセットボタンのセレクタを指定。
            resetLabel: 'RESET',
            // デモリセットボタンのラベル。
            adjustEditorHeight: true,
            // true で編集モード時のテキストエリアの高さを自動調整する。
            showCode: true,
            // true でコードを表示する。
            showDemo: false,
            // true でデモを表示する。
            autoSaveToStorage: false,
            // true でコードを local storage に自動保存する。
            autoLoadFromStorage: false,
            // true で local storage 保存コードの自動ロードする。
            clearStorage: false,
            // true で local storage 保存コードの自動削除する。
            savePrefix: '',
            // local storage 保存キーのプレフィックスを指定。
            onSave: function(api) {}// 確定ボタンクリック時のコールバック処理を指定。
        },
        version: '0.5.2',
        id: 'ex-code-prettify',
        paramId: 'ex-code-prettify-param'
    });

    // jQuery Method
    $.fn.exCodePrettify = function(option) {
        var targets = this
          , api = [];
        targets.each(function(index) {
            var target = targets.eq(index);
            var obj = target.data(plugin.id) ||
            new $.ex.codePrettify(target,$.extend({}, option, {
                'targets': targets,
                'index': index
            }));
            api.push(obj);
            target.data(plugin.id, obj);
        });
        return option && option.api ? ($.ex.api ? $.ex.api(api) : api) : targets;
    }

    var plugin_on = plugin.id + '_on';
    $.fn[plugin_on] = function(trigger, event) {
        var name = trigger + '.' + plugin.id;
        $(this).off(name).on(name, event);
    }

})(jQuery);






/*
 * 	Easy Code Prettify 0.2 - jQuery plugin
 *	written by cyokodog
 *
 *	Copyright (c) 2014 cyokodog
 *		http://www.cyokodog.net/
 *		http://d.hatena.ne.jp/cyokodog/)
 *		http://cyokodog.tumblr.com/
 *	MIT LICENCE
 *
 *	Built for jQuery library
 *	http://jquery.com
 *
 */
;(function($) {
    var s = $.easyCodePrettify = function(target, option) {
        var o = this
          , c = o.config = $.extend({}, s.defaults, option);
        c.target = $(target);
        var codeSection = c.target.find(c.codeNode).filter(function() {
            return RegExp(c.demoText + '|' + c.codeText).test($(this).text());
        });
        codeSection.each(function() {
            var t = $(this);
            var noAuto = RegExp(c.noAutoText).test(t.text());
            var noReset = RegExp(c.noResetText).test(t.text());
            var code = [];
            (function(t) {
                var callee = arguments.callee;
                var next = t.next();
                if (t.size() && next.size()) {
                    if (t.prop('tagName') == c.codeTypeNode && next.prop('tagName') == 'PRE') {
                        var codeType = (t.text() + ' ').match(/script |html |css |cssFile |jsFile /).toString().trim();
                        var autoRun = (codeType == 'script' && noAuto ? ',autoRun:false' : '');
                        var showCode = (t.text() + ' ').match(/noCode /) == 'noCode ' ? ',showCode:false' : '';
                        next.attr('data-ex-code-prettify-param', '{codeType:"' + codeType + '"' + autoRun + showCode + '}');
                        t.remove();
                        code.push(next[0]);
                        callee(next.next());
                    }
                }
            })(t.next());
            if (code.length) {
                var opt = $.extend({
                    showDemo: RegExp(c.demoText).test(t.text()),
                    showCode: RegExp(c.codeText).test(t.text()),
                    editCode: RegExp(c.editText).test(t.text())
                }, (noAuto ? {
                    showRunButton: true,
                    showResetButton: !noReset
                } : {}));
                $(code).wrapAll('<div class="ex-code-prettify"/>').exCodePrettify(opt);
                t.remove();
            }
        });
        c.target.find('> pre').each(function() {
            var t = $(this)
              , prev = t.prev();
            var opt = {};
            if (prev.prop('tagName') == c.codeTypeNode) {
                opt = {
                    codeType: prev.text()
                }
                prev.remove();
            }
            t.wrap('<div class="ex-code-prettify"/>').exCodePrettify(opt);
        });
    }
    $.fn.easyCodePrettify = function(option) {
        return this.each(function() {
            $(this).data(s.id, new $.easyCodePrettify(this,option));
        });
    }
    $.extend(s, {
        defaults: {
            codeNode: 'H4',
            // グルーピングを指定する要素
            codeTypeNode: 'H5',
            // コード種別を指定する要素
            demoText: 'demo',
            // コード実行の判定テキスト
            codeText: 'code',
            // コード表示の判定テキスト
            editText: 'edit',
            // コード編集の判定テキスト
            noAutoText: 'noAuto',
            // 自動実行の判定テキスト
            noResetText: 'noReset'// リセットボタン表示判定テキスト
        },
        id: 'easy-code-prettify'
    });
})(jQuery);







/*
 * 	External 0.2 - jQuery plugin
 *	written by cyokodog
 *
 *	Copyright (c) 2014 cyokodog
 *		http://d.hatena.ne.jp/cyokodog/
 *		http://cyokodog.tumblr.com/
 *		http://www.cyokodog.net/
 *	MIT LICENCE
 *
 *	Built for jQuery library
 *	http://jquery.com
 *
 */
//External
(function() {
    $.external = function(target, option) {
        var c = $.extend($.external.defaults, option || {});
        target = $(target);
        var reg = new RegExp('^' + location.host);
        if (!reg.test(target[0]['host']) && target.prop('href')) {
            target.prop('target', '_blank');
            var className = c.className;
            typeof className != 'function' || (className = className(target, index));
            if (className && (c.imageLink || !target.find('img').size() || $.trim(target.text()).length)) {
                target.addClass(className);
            }
        }
        return this;
    }
    $.fn.external = function(option) {
        return this.each(function(index) {
            $.external(this, option);
        });
    }
    $.external.defaults = {
        className: 'external',
        // or function(element, index){return 'className'}
        imageLink: false
    }
})(jQuery);


/*
 * 	Go Top 0.2 - jQuery plugin
 *	written by cyokodog
 *
 *	Copyright (c) 2013 cyokodog
 *		http://d.hatena.ne.jp/cyokodog/
 *		http://cyokodog.tumblr.com/
 *		http://www.cyokodog.net/
 *	MIT LICENCE
 *
 *	Built for jQuery library
 *	http://jquery.com
 *
 */
(function() {
    var plugin = $.goTop = function(option) {
        var c = plugin.config = $.extend(plugin.defaults, option || {});
        c.win = $(window);
        if (c.button = c.win.data('go-top'))
            return c.button;
        c.button = $('<a href="#"/>').addClass(c.className).hide().
        on('click', function() {
            $(this).blur();
            $('html,body').animate({
                scrollTop: 0
            }, c.scrollSpeed);
            return false;
        });
        c.win.data('go-top', c.button);
        !c.label || $('<span/>').text(c.label).appendTo(c.button);
        var lazy = plugin.Lazy(plugin.toggleButton, c.delay);
        $(window).on('scroll', function() {
            lazy.run();
        });

        if (c.autoAppend) {
            c.button.appendTo('body');
            plugin.toggleButton();
        }
        var w = c.button.width()
          , m = parseInt(c.button.css('margin-left'));
        c.button.css('margin-left', -w + m);
        return c.button;
    }
    plugin.toggleButton = function() {
        var c = plugin.config;
        if (c.bottom == undefined) {
            c.bottom = parseInt(c.button.css('bottom'));
            c.height = c.button.outerHeight();
        }
        if (c.win.scrollTop() >= c.showTopPosition) {
            !c.button.is(':hidden') ||
            c.button.show().css('bottom', -c.height).animate({
                bottom: -1
            }, function() {
                c.button.animate({
                    bottom: -c.height + 30
                });
            });
        }
        else {
            c.button.is(':hidden') ||
            c.button.animate({
                bottom: -c.height
            }, function() {
                c.button.hide();
            });
        }
    }
    plugin.Lazy = function(f, time) {
        return {
            run: function() {
                var o = this;
                if (o.delay) {
                    clearTimeout(o.delay);
                    o.delay = 0;
                }
                o.delay = setTimeout(f, time);
            }
        }
    }
    plugin.defaults = {
        label: '',
        autoAppend: true,
        delay: 300,
        scrollSpeed: 300,
        fadeSpeed: 500,
        className: 'go-top',
        showTopPosition: 400
    }
})(jQuery);

/*
 * 	Social Info 0.2 - jQuery plugin
 *	written by cyokodog
 *
 *	Copyright (c) 2014 cyokodog
 *		http://www.cyokodog.net/
 *		http://d.hatena.ne.jp/cyokodog/)
 *		http://cyokodog.tumblr.com/
 *	MIT LICENCE
 *
 *	Built for jQuery library
 *	http://jquery.com
 *
 */

;(function($) {

    $.social = $.social || {};
    $.si = $.social.info = {
        jsonp: function(p) {
            return $.ajax({
                url: p.url,
                dataType: 'jsonp',
                data: p.data,
                success: function(r) {
                    p.callback(r);
                }
            });
        },
        reArg: function(url, callback) {
            if (typeof url == 'object')
                return url;
            if (typeof url == 'function') {
                callback = url;
                url = '';
            }
            url = url || location.href;
            return {
                url: url,
                callback: callback
            };
        },
        cache: {
            twitter: {
                entryCount: {}
            }
        },
        version: '0.2',
        id: 'social-info',
        name: 'Social Info'
    }


    $.si.twitter = {
        getEntryCount: function(url, callback) {
            var arg = $.extend({
                url: location.href,
                useCache: true,
                callback: function(count) {}
            }, $.si.reArg(url, callback))
            var cache = $.si.cache.twitter.entryCount;
            var eurl = encodeURIComponent(url);
            if (arg.useCache && cache[eurl] != undefined) {
                arg.callback(cache[eurl]);
                return;
            }
            $.si.jsonp({
                url: 'http://urls.api.twitter.com/1/urls/count.json',
                data: {
                    url: arg.url
                },
                callback: function(r) {
                    var count = r = !r ? 0 : r.count;
                    cache[eurl] = count;
                    arg.callback(count);
                }
            });
        },
        getEntryUrl: function(url, title) {
            url = url || location.href;
            if (title)
                title = '&text=' + encodeURIComponent(title);
            else {
                if (url == location.href)
                    title = '&text=' + encodeURIComponent(document.title);
            }
            return 'https://twitter.com/intent/tweet?url=' + encodeURIComponent(url) + (title || '');
        },
        getSearchUrl: function(url) {
            url = url || location.href;
            return 'https://twitter.com/search?q=' + encodeURIComponent(url);
        }
    }

    $.si.facebook = {
        getEntryCount: function(url, callback) {
            var arg = $.si.reArg(url, callback)
            $.si.jsonp({
                url: 'https://graph.facebook.com/',
                data: {
                    id: arg.url
                },
                callback: function(r) {
                    arg.callback(r.shares || 0);
                }
            });
        },
        getEntryUrl: function(url) {
            url = url || location.href;
            return 'http://www.facebook.com/sharer.php?u=' + encodeURIComponent(url);
        },
        getSearchUrl: function(url) {
            url = url || location.href;
            return 'https://www.facebook.com/#!/search/results.php?q=' + encodeURIComponent(url);
        }
    }

    $.si.googleplus = {
        getEntryCount: function(url, callback) {
            var arg = $.si.reArg(url, callback)
            $.ajax({
                type: "get",
                dataType: "xml",
                url: "http://query.yahooapis.com/v1/public/yql",
                data: {
                    q: "SELECT content FROM data.headers WHERE url='https://plusone.google.com/_/+1/fastbutton?hl=ja&url=" + arg.url + "' and ua='#Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/33.0.1750.154 Safari/537.36'",
                    format: "xml",
                    env: "http://datatables.org/alltables.env"
                },
                success: function(data) {
                    var content = $(data).find("content").text();
                    var match = content.match(/window\.__SSR[\s*]=[\s*]{c:[\s*](\d+)/i);
                    var count = (match != null ) ? match[1] : 0;
                    arg.callback(count);
                }
            });
        },
        getEntryUrl: function(url) {
            url = url || location.href;
            return 'https://plus.google.com/share?url=' + encodeURIComponent(url);
        },
        getSearchUrl: function(url) {
            url = url || location.href;
            return 'https://plus.google.com/u/0/?tab=mX#s/' + encodeURIComponent(url);
        }
    }


    $.si.hatebu = {
        getEntryCount: function(url, callback) {
            var arg = $.si.reArg(url, callback)
            $.si.jsonp({
                url: 'http://api.b.st-hatena.com/entry.count',
                data: {
                    url: arg.url
                },
                callback: arg.callback
            });
        },
        getEntryUrl: function(url) {
            url = url || location.href;
            return 'http://b.hatena.ne.jp/entry/' + url.replace(/^http:\/\//, '').replace(/^https:\/\//, 's/');
        },
        getSearchUrl: function(url) {
            url = url || location.href;
            return 'http://b.hatena.ne.jp/entrylist?url=' + encodeURIComponent(url);
        },
        getEntryList: function(url, sort, callback) {
            if (typeof sort == 'function') {
                callback = sort;
                sort = 'count';
            }
            if (typeof url == 'function') {
                callback = url;
                sort = 'count';
                url = '';
            }
            url = url || location.href;
            $.si.jsonp({
                url: 'http://b.hatena.ne.jp/entrylist/json',
                data: {
                    sort: sort,
                    url: url
                },
                callback: callback
            });
        },
        getEntry: function(url, callback) {
            var arg = $.si.reArg(url, callback)
            $.si.jsonp({
                url: 'http://b.hatena.ne.jp/entry/jsonlite/',
                data: {
                    url: arg.url
                },
                callback: arg.callback
            });
        },
        getProfileImgUrl: function(id, size) {
            size = size ? '_' + size : '';
            return 'http://cdn.www.st-hatena.com/users/mo/' + id + '/profile' + size + '.gif';
        },
        getEntryImgUrl: function(url) {
            return 'http://b.hatena.ne.jp/entry/image/' + url;
        }
    };


})(jQuery);

/*
 * 	Easy Social Buttons 0.2 - jQuery plugin
 *	written by cyokodog
 *
 *	Copyright (c) 2014 cyokodog
 *		http://www.cyokodog.net/
 *		http://d.hatena.ne.jp/cyokodog/)
 *		http://cyokodog.tumblr.com/
 *	MIT LICENCE
 *
 *	Built for jQuery library
 *	http://jquery.com
 *
 */


;(function($) {

    var plugin = $.esb = $.easySocialButtons = function(option) {
        var callee = arguments.callee;
        if (!(this instanceof callee))
            return new callee(option);
        var o = this
          , c = o.config = $.extend(true, {}, callee.defaults, option);
        c.orders = option.orders || c.orders;
        c.buttons = $('<div class="easy-social-buttons-container"/>');
        if (c.inverseColor)
            c.buttons.addClass('esb-inverse');
        $.each(c.orders, function() {
            var sname = this.toString();
            var api = c[sname] = $.esb[sname](option);
            api.getButton().appendTo(c.buttons);
        });
    }
    $.extend(plugin.prototype, {
        getButtons: function() {
            // ボタンの取得
            var o = this
              , c = o.config;
            return c.buttons;
        },
        getButtonAPI: function(name) {
            // API の取得
            var o = this
              , c = o.config;
            return c[name];
        }
    });
    $.extend(plugin, {
        defaults: {
            autoAdd: true,
            // true でボタンの自動挿入を行う
            addMethod: 'insertAfter',
            // ボタンの挿入メソッドを指定
            callback: function(api) {},
            // プラグイン実行後のコールバック処理
            orders: ['hatebu', 'twitter', 'facebook', 'googleplus'],
            // ボタンの表示順
            labels: {
                // サービスの表示名
                'hatebu': 'B!',
                'twitter': 'ｔ',
                'facebook': 'ｆ',
                'googleplus': 'G+'
            }
        },
        version: '0.2',
        id: 'easy-social-buttons',
        name: 'Easy Social Buttons'
    });

    $.fn.easySocialButtons = function(option) {
        var c = $.extend(true, {}, plugin.defaults, option);
        if (option)
            c.orders = option.orders || c.orders;
        return this.each(function() {
            var t = $(this);
            c.url = t.prop('href') || t.data('href') || t.data('url') || c.url;
            if (!c.url) {
                c.url = location.href;
                c.addMethod = 'appendTo';
            }
            var api = $.easySocialButtons(c);
            if (c.autoAdd) {
                api.getButtons(c)[c.addMethod](t);
            }
            c.callback.apply(t[0], [api]);
        });
    }

    var DF = plugin.defaults;
    $.each(DF.orders, function(idx) {
        var sname = this.toString();
        var f = $.esb[sname] = function(option) {
            var callee = arguments.callee;
            if (!(this instanceof callee))
                return new callee(option);
            var o = this
              , c = o.config = $.extend(true, {}, callee.defaults, callee.overwrite[sname] || {}, option, option[sname]);
            c.url = c.url || location.href;
            c.button = $(c.tempalte);
            c.wrapper = c.button.hasClass('esb') ? c.button : c.button.find('.esb');
            c.label = c.wrapper.find('.esb-label').html(c.label);
            c.counter = c.wrapper.find('.esb-counter').html(c.waitCounter);
            c.entryLink = c.wrapper.find('a.esb-entry');
            c.searchLink = c.wrapper.find('a.esb-search');
            if (c.useBrandColor)
                c.wrapper.addClass('esb-' + sname);
            if ($.si) {
                var SI = $.si[sname];
                if (c.counter.size() && SI.getEntryCount) {
                    SI.getEntryCount(c.url, function(count) {
                        c.counter.text(count);
                    });
                }
                !SI.getEntryUrl || c.entryLink.prop('href', SI.getEntryUrl(c.url)).prop('title', c.entryTitle);
                !SI.getSearchUrl || c.searchLink.prop('href', SI.getSearchUrl(c.url)).prop('title', c.searchTitle);
            }
        }
        $.extend(f.prototype, {
            getButton: function() {
                var o = this
                  , c = o.config;
                return c.button;
            }
        });
        $.extend(f, {
            id: sname,
            defaults: {
                url: '',
                label: DF.labels[sname],
                entryTitle: '投稿する',
                // esb-entry クラスを持つ要素に割り当てる title 属性値
                searchTitle: '検索する',
                // esb-search クラスを持つ要素に割り当てる title 属性値
                waitCounter: '<span>&nbsp;</span>',
                // Web API の取得結果待ち時に表示するマークアップ
                tempalte: '<span class="esb"><a class="esb-label esb-search" target="_blank"></a><a class="esb-counter esb-entry" target="_blank"></a></span>',
                // ボタンのテンプレート
                useBrandColor: true,
                // ブランドカラーの使用
                inverseColor: false// ブランドカラー未使用時の配色の反転
            },
            overwrite: {
                hatebu: {
                    entryTitle: 'ブックマークする'
                }
            }
        });
    });
})(jQuery);

/*
 * jQuery Nivo Slider v3.2
 * http://nivo.dev7studios.com
 *
 * Copyright 2012, Dev7studios
 * Free to use and abuse under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 */

;(function(e) {
    var t = function(t, n) {
        var r = e.extend({}, e.fn.nivoSlider.defaults, n);
        var i = {
            currentSlide: 0,
            currentImage: "",
            totalSlides: 0,
            running: false,
            paused: false,
            stop: false,
            controlNavEl: false
        };
        var s = e(t);
        s.data("nivo:vars", i).addClass("nivoSlider");
        var o = s.children();
        o.each(function() {
            var t = e(this);
            var n = "";
            if (!t.is("img")) {
                if (t.is("a")) {
                    t.addClass("nivo-imageLink");
                    n = t
                }
                t = t.find("img:first")
            }
            var r = r === 0 ? t.attr("width") : t.width()
              , s = s === 0 ? t.attr("height") : t.height();
            if (n !== "") {
                n.css("display", "none")
            }
            t.css("display", "none");
            i.totalSlides++
        });
        if (r.randomStart) {
            r.startSlide = Math.floor(Math.random() * i.totalSlides)
        }
        if (r.startSlide > 0) {
            if (r.startSlide >= i.totalSlides) {
                r.startSlide = i.totalSlides - 1
            }
            i.currentSlide = r.startSlide
        }
        if (e(o[i.currentSlide]).is("img")) {
            i.currentImage = e(o[i.currentSlide])
        } else {
            i.currentImage = e(o[i.currentSlide]).find("img:first")
        }
        if (e(o[i.currentSlide]).is("a")) {
            e(o[i.currentSlide]).css("display", "block")
        }
        var u = e("<img/>").addClass("nivo-main-image");
        u.attr("src", i.currentImage.attr("src")).show();
        s.append(u);
        e(window).resize(function() {
            s.children("img").width(s.width());
            u.attr("src", i.currentImage.attr("src"));
            u.stop().height("auto");
            e(".nivo-slice").remove();
            e(".nivo-box").remove()
        });
        s.append(e('<div class="nivo-caption"></div>'));
        var a = function(t) {
            var n = e(".nivo-caption", s);
            if (i.currentImage.attr("title") != "" && i.currentImage.attr("title") != undefined) {
                var r = i.currentImage.attr("title");
                if (r.substr(0, 1) == "#")
                    r = e(r).html();
                if (n.css("display") == "block") {
                    setTimeout(function() {
                        n.html(r)
                    }, t.animSpeed)
                } else {
                    n.html(r);
                    n.stop().fadeIn(t.animSpeed)
                }
            } else {
                n.stop().fadeOut(t.animSpeed)
            }
        }
        ;
        a(r);
        var f = 0;
        if (!r.manualAdvance && o.length > 1) {
            f = setInterval(function() {
                d(s, o, r, false)
            }, r.pauseTime)
        }
        if (r.directionNav) {
            s.append('<div class="nivo-directionNav"><a class="nivo-prevNav">' + r.prevText + '</a><a class="nivo-nextNav">' + r.nextText + "</a></div>");
            e(s).on("click", "a.nivo-prevNav", function() {
                if (i.running) {
                    return false
                }
                clearInterval(f);
                f = "";
                i.currentSlide -= 2;
                d(s, o, r, "prev")
            });
            e(s).on("click", "a.nivo-nextNav", function() {
                if (i.running) {
                    return false
                }
                clearInterval(f);
                f = "";
                d(s, o, r, "next")
            })
        }
        if (r.controlNav) {
            i.controlNavEl = e('<div class="nivo-controlNav"></div>');
            s.after(i.controlNavEl);
            for (var l = 0; l < o.length; l++) {
                if (r.controlNavThumbs) {
                    i.controlNavEl.addClass("nivo-thumbs-enabled");
                    var c = o.eq(l);
                    if (!c.is("img")) {
                        c = c.find("img:first")
                    }
                    if (c.attr("data-thumb"))
                        i.controlNavEl.append('<a class="nivo-control" rel="' + l + '"><img src="' + c.attr("data-thumb") + '" alt="" /></a>')
                } else {
                    i.controlNavEl.append('<a class="nivo-control" rel="' + l + '">' + (l + 1) + "</a>")
                }
            }
            e("a:eq(" + i.currentSlide + ")", i.controlNavEl).addClass("active");
            e("a", i.controlNavEl).bind("click", function() {
                if (i.running)
                    return false;
                if (e(this).hasClass("active"))
                    return false;
                clearInterval(f);
                f = "";
                u.attr("src", i.currentImage.attr("src"));
                i.currentSlide = e(this).attr("rel") - 1;
                d(s, o, r, "control")
            })
        }
        if (r.pauseOnHover) {
            s.hover(function() {
                i.paused = true;
                clearInterval(f);
                f = ""
            }, function() {
                i.paused = false;
                if (f === "" && !r.manualAdvance) {
                    f = setInterval(function() {
                        d(s, o, r, false)
                    }, r.pauseTime)
                }
            })
        }
        s.bind("nivo:animFinished", function() {
            u.attr("src", i.currentImage.attr("src"));
            i.running = false;
            e(o).each(function() {
                if (e(this).is("a")) {
                    e(this).css("display", "none")
                }
            });
            if (e(o[i.currentSlide]).is("a")) {
                e(o[i.currentSlide]).css("display", "block")
            }
            if (f === "" && !i.paused && !r.manualAdvance) {
                f = setInterval(function() {
                    d(s, o, r, false)
                }, r.pauseTime)
            }
            r.afterChange.call(this)
        });
        var h = function(t, n, r) {
            if (e(r.currentImage).parent().is("a"))
                e(r.currentImage).parent().css("display", "block");
            e('img[src="' + r.currentImage.attr("src") + '"]', t).not(".nivo-main-image,.nivo-control img").width(t.width()).css("visibility", "hidden").show();
            var i = e('img[src="' + r.currentImage.attr("src") + '"]', t).not(".nivo-main-image,.nivo-control img").parent().is("a") ? e('img[src="' + r.currentImage.attr("src") + '"]', t).not(".nivo-main-image,.nivo-control img").parent().height() : e('img[src="' + r.currentImage.attr("src") + '"]', t).not(".nivo-main-image,.nivo-control img").height();
            for (var s = 0; s < n.slices; s++) {
                var o = Math.round(t.width() / n.slices);
                if (s === n.slices - 1) {
                    t.append(e('<div class="nivo-slice" name="' + s + '"><img src="' + r.currentImage.attr("src") + '" style="position:absolute; width:' + t.width() + "px; height:auto; display:block !important; top:0; left:-" + (o + s * o - o) + 'px;" /></div>').css({
                        left: o * s + "px",
                        width: t.width() - o * s + "px",
                        height: i + "px",
                        opacity: "0",
                        overflow: "hidden"
                    }))
                } else {
                    t.append(e('<div class="nivo-slice" name="' + s + '"><img src="' + r.currentImage.attr("src") + '" style="position:absolute; width:' + t.width() + "px; height:auto; display:block !important; top:0; left:-" + (o + s * o - o) + 'px;" /></div>').css({
                        left: o * s + "px",
                        width: o + "px",
                        height: i + "px",
                        opacity: "0",
                        overflow: "hidden"
                    }))
                }
            }
            e(".nivo-slice", t).height(i);
            u.stop().animate({
                height: e(r.currentImage).height()
            }, n.animSpeed)
        }
        ;
        var p = function(t, n, r) {
            if (e(r.currentImage).parent().is("a"))
                e(r.currentImage).parent().css("display", "block");
            e('img[src="' + r.currentImage.attr("src") + '"]', t).not(".nivo-main-image,.nivo-control img").width(t.width()).css("visibility", "hidden").show();
            var i = Math.round(t.width() / n.boxCols)
              , s = Math.round(e('img[src="' + r.currentImage.attr("src") + '"]', t).not(".nivo-main-image,.nivo-control img").height() / n.boxRows);
            for (var o = 0; o < n.boxRows; o++) {
                for (var a = 0; a < n.boxCols; a++) {
                    if (a === n.boxCols - 1) {
                        t.append(e('<div class="nivo-box" name="' + a + '" rel="' + o + '"><img src="' + r.currentImage.attr("src") + '" style="position:absolute; width:' + t.width() + "px; height:auto; display:block; top:-" + s * o + "px; left:-" + i * a + 'px;" /></div>').css({
                            opacity: 0,
                            left: i * a + "px",
                            top: s * o + "px",
                            width: t.width() - i * a + "px"
                        }));
                        e('.nivo-box[name="' + a + '"]', t).height(e('.nivo-box[name="' + a + '"] img', t).height() + "px")
                    } else {
                        t.append(e('<div class="nivo-box" name="' + a + '" rel="' + o + '"><img src="' + r.currentImage.attr("src") + '" style="position:absolute; width:' + t.width() + "px; height:auto; display:block; top:-" + s * o + "px; left:-" + i * a + 'px;" /></div>').css({
                            opacity: 0,
                            left: i * a + "px",
                            top: s * o + "px",
                            width: i + "px"
                        }));
                        e('.nivo-box[name="' + a + '"]', t).height(e('.nivo-box[name="' + a + '"] img', t).height() + "px")
                    }
                }
            }
            u.stop().animate({
                height: e(r.currentImage).height()
            }, n.animSpeed)
        }
        ;
        var d = function(t, n, r, i) {
            var s = t.data("nivo:vars");
            if (s && s.currentSlide === s.totalSlides - 1) {
                r.lastSlide.call(this)
            }
            if ((!s || s.stop) && !i) {
                return false
            }
            r.beforeChange.call(this);
            if (!i) {
                u.attr("src", s.currentImage.attr("src"))
            } else {
                if (i === "prev") {
                    u.attr("src", s.currentImage.attr("src"))
                }
                if (i === "next") {
                    u.attr("src", s.currentImage.attr("src"))
                }
            }
            s.currentSlide++;
            if (s.currentSlide === s.totalSlides) {
                s.currentSlide = 0;
                r.slideshowEnd.call(this)
            }
            if (s.currentSlide < 0) {
                s.currentSlide = s.totalSlides - 1
            }
            if (e(n[s.currentSlide]).is("img")) {
                s.currentImage = e(n[s.currentSlide])
            } else {
                s.currentImage = e(n[s.currentSlide]).find("img:first")
            }
            if (r.controlNav) {
                e("a", s.controlNavEl).removeClass("active");
                e("a:eq(" + s.currentSlide + ")", s.controlNavEl).addClass("active")
            }
            a(r);
            e(".nivo-slice", t).remove();
            e(".nivo-box", t).remove();
            var o = r.effect
              , f = "";
            if (r.effect === "random") {
                f = new Array("sliceDownRight","sliceDownLeft","sliceUpRight","sliceUpLeft","sliceUpDown","sliceUpDownLeft","fold","fade","boxRandom","boxRain","boxRainReverse","boxRainGrow","boxRainGrowReverse");
                o = f[Math.floor(Math.random() * (f.length + 1))];
                if (o === undefined) {
                    o = "fade"
                }
            }
            if (r.effect.indexOf(",") !== -1) {
                f = r.effect.split(",");
                o = f[Math.floor(Math.random() * f.length)];
                if (o === undefined) {
                    o = "fade"
                }
            }
            if (s.currentImage.attr("data-transition")) {
                o = s.currentImage.attr("data-transition")
            }
            s.running = true;
            var l = 0
              , c = 0
              , d = ""
              , m = ""
              , g = ""
              , y = "";
            if (o === "sliceDown" || o === "sliceDownRight" || o === "sliceDownLeft") {
                h(t, r, s);
                l = 0;
                c = 0;
                d = e(".nivo-slice", t);
                if (o === "sliceDownLeft") {
                    d = e(".nivo-slice", t)._reverse()
                }
                d.each(function() {
                    var n = e(this);
                    n.css({
                        top: "0px"
                    });
                    if (c === r.slices - 1) {
                        setTimeout(function() {
                            n.animate({
                                opacity: "1.0"
                            }, r.animSpeed, "", function() {
                                t.trigger("nivo:animFinished")
                            })
                        }, 100 + l)
                    } else {
                        setTimeout(function() {
                            n.animate({
                                opacity: "1.0"
                            }, r.animSpeed)
                        }, 100 + l)
                    }
                    l += 50;
                    c++
                })
            } else if (o === "sliceUp" || o === "sliceUpRight" || o === "sliceUpLeft") {
                h(t, r, s);
                l = 0;
                c = 0;
                d = e(".nivo-slice", t);
                if (o === "sliceUpLeft") {
                    d = e(".nivo-slice", t)._reverse()
                }
                d.each(function() {
                    var n = e(this);
                    n.css({
                        bottom: "0px"
                    });
                    if (c === r.slices - 1) {
                        setTimeout(function() {
                            n.animate({
                                opacity: "1.0"
                            }, r.animSpeed, "", function() {
                                t.trigger("nivo:animFinished")
                            })
                        }, 100 + l)
                    } else {
                        setTimeout(function() {
                            n.animate({
                                opacity: "1.0"
                            }, r.animSpeed)
                        }, 100 + l)
                    }
                    l += 50;
                    c++
                })
            } else if (o === "sliceUpDown" || o === "sliceUpDownRight" || o === "sliceUpDownLeft") {
                h(t, r, s);
                l = 0;
                c = 0;
                var b = 0;
                d = e(".nivo-slice", t);
                if (o === "sliceUpDownLeft") {
                    d = e(".nivo-slice", t)._reverse()
                }
                d.each(function() {
                    var n = e(this);
                    if (c === 0) {
                        n.css("top", "0px");
                        c++
                    } else {
                        n.css("bottom", "0px");
                        c = 0
                    }
                    if (b === r.slices - 1) {
                        setTimeout(function() {
                            n.animate({
                                opacity: "1.0"
                            }, r.animSpeed, "", function() {
                                t.trigger("nivo:animFinished")
                            })
                        }, 100 + l)
                    } else {
                        setTimeout(function() {
                            n.animate({
                                opacity: "1.0"
                            }, r.animSpeed)
                        }, 100 + l)
                    }
                    l += 50;
                    b++
                })
            } else if (o === "fold") {
                h(t, r, s);
                l = 0;
                c = 0;
                e(".nivo-slice", t).each(function() {
                    var n = e(this);
                    var i = n.width();
                    n.css({
                        top: "0px",
                        width: "0px"
                    });
                    if (c === r.slices - 1) {
                        setTimeout(function() {
                            n.animate({
                                width: i,
                                opacity: "1.0"
                            }, r.animSpeed, "", function() {
                                t.trigger("nivo:animFinished")
                            })
                        }, 100 + l)
                    } else {
                        setTimeout(function() {
                            n.animate({
                                width: i,
                                opacity: "1.0"
                            }, r.animSpeed)
                        }, 100 + l)
                    }
                    l += 50;
                    c++
                })
            } else if (o === "fade") {
                h(t, r, s);
                m = e(".nivo-slice:first", t);
                m.css({
                    width: t.width() + "px"
                });
                m.animate({
                    opacity: "1.0"
                }, r.animSpeed * 2, "", function() {
                    t.trigger("nivo:animFinished")
                })
            } else if (o === "slideInRight") {
                h(t, r, s);
                m = e(".nivo-slice:first", t);
                m.css({
                    width: "0px",
                    opacity: "1"
                });
                m.animate({
                    width: t.width() + "px"
                }, r.animSpeed * 2, "", function() {
                    t.trigger("nivo:animFinished")
                })
            } else if (o === "slideInLeft") {
                h(t, r, s);
                m = e(".nivo-slice:first", t);
                m.css({
                    width: "0px",
                    opacity: "1",
                    left: "",
                    right: "0px"
                });
                m.animate({
                    width: t.width() + "px"
                }, r.animSpeed * 2, "", function() {
                    m.css({
                        left: "0px",
                        right: ""
                    });
                    t.trigger("nivo:animFinished")
                })
            } else if (o === "boxRandom") {
                p(t, r, s);
                g = r.boxCols * r.boxRows;
                c = 0;
                l = 0;
                y = v(e(".nivo-box", t));
                y.each(function() {
                    var n = e(this);
                    if (c === g - 1) {
                        setTimeout(function() {
                            n.animate({
                                opacity: "1"
                            }, r.animSpeed, "", function() {
                                t.trigger("nivo:animFinished")
                            })
                        }, 100 + l)
                    } else {
                        setTimeout(function() {
                            n.animate({
                                opacity: "1"
                            }, r.animSpeed)
                        }, 100 + l)
                    }
                    l += 20;
                    c++
                })
            } else if (o === "boxRain" || o === "boxRainReverse" || o === "boxRainGrow" || o === "boxRainGrowReverse") {
                p(t, r, s);
                g = r.boxCols * r.boxRows;
                c = 0;
                l = 0;
                var w = 0;
                var E = 0;
                var S = [];
                S[w] = [];
                y = e(".nivo-box", t);
                if (o === "boxRainReverse" || o === "boxRainGrowReverse") {
                    y = e(".nivo-box", t)._reverse()
                }
                y.each(function() {
                    S[w][E] = e(this);
                    E++;
                    if (E === r.boxCols) {
                        w++;
                        E = 0;
                        S[w] = []
                    }
                });
                for (var x = 0; x < r.boxCols * 2; x++) {
                    var T = x;
                    for (var N = 0; N < r.boxRows; N++) {
                        if (T >= 0 && T < r.boxCols) {
                            (function(n, i, s, u, a) {
                                var f = e(S[n][i]);
                                var l = f.width();
                                var c = f.height();
                                if (o === "boxRainGrow" || o === "boxRainGrowReverse") {
                                    f.width(0).height(0)
                                }
                                if (u === a - 1) {
                                    setTimeout(function() {
                                        f.animate({
                                            opacity: "1",
                                            width: l,
                                            height: c
                                        }, r.animSpeed / 1.3, "", function() {
                                            t.trigger("nivo:animFinished")
                                        })
                                    }, 100 + s)
                                } else {
                                    setTimeout(function() {
                                        f.animate({
                                            opacity: "1",
                                            width: l,
                                            height: c
                                        }, r.animSpeed / 1.3)
                                    }, 100 + s)
                                }
                            })(N, T, l, c, g);
                            c++
                        }
                        T--
                    }
                    l += 100
                }
            }
        }
        ;
        var v = function(e) {
            for (var t, n, r = e.length; r; t = parseInt(Math.random() * r, 10),
            n = e[--r],
            e[r] = e[t],
            e[t] = n)
                ;
            return e
        }
        ;
        var m = function(e) {
            if (this.console && typeof console.log !== "undefined") {
                console.log(e)
            }
        }
        ;
        this.stop = function() {
            if (!e(t).data("nivo:vars").stop) {
                e(t).data("nivo:vars").stop = true;
                m("Stop Slider")
            }
        }
        ;
        this.start = function() {
            if (e(t).data("nivo:vars").stop) {
                e(t).data("nivo:vars").stop = false;
                m("Start Slider")
            }
        }
        ;
        r.afterLoad.call(this);
        return this
    }
    ;
    e.fn.nivoSlider = function(n) {
        return this.each(function(r, i) {
            var s = e(this);
            if (s.data("nivoslider")) {
                return s.data("nivoslider")
            }
            var o = new t(this,n);
            s.data("nivoslider", o)
        })
    }
    ;
    e.fn.nivoSlider.defaults = {
        effect: "random",
        slices: 15,
        boxCols: 8,
        boxRows: 4,
        animSpeed: 500,
        pauseTime: 3e3,
        startSlide: 0,
        directionNav: true,
        controlNav: true,
        controlNavThumbs: false,
        pauseOnHover: true,
        manualAdvance: false,
        prevText: "Prev",
        nextText: "Next",
        randomStart: false,
        beforeChange: function() {},
        afterChange: function() {},
        slideshowEnd: function() {},
        lastSlide: function() {},
        afterLoad: function() {}
    };
    e.fn._reverse = [].reverse
})(jQuery);


/*
 * 	Easy Responsive 0.1 - jQuery plugin
 *	written by cyokodog
 *
 *	Copyright (c) 2014 cyokodog
 *		http://www.cyokodog.net/
 *		http://cyokodog.tumblr.com/
 *		http://d.hatena.ne.jp/cyokodog/)
 *	MIT LICENCE
 *
 *	Built for jQuery library
 *	http://jquery.com
 *
 */

;(function($) {
    var plugin = $.easyResponsive = function(widths) {
        if (!widths)
            widths = plugin.widths;
        var $win = $(window)
          , $html = $('html');
        if ($html.hasClass(plugin.id))
            return;
        $html.addClass(plugin.id)
        var adjust = function() {
            var removeClass = function(safix) {
                $html.removeClass(plugin.prefix + widths.join(safix + ' ' + plugin.prefix) + safix);
                return arguments.callee;
            }
            removeClass('')('-and-over')('-and-under')('-over')('-under');
            //			widths.sort(function(a, b) {
            //			  return (parseInt(a) < parseInt(b)) ? 1 : -1;
            //			});
            $.each(widths, function(i) {
                var width = widths[i];
                var winWidth = $win.width();
                var baseName = plugin.prefix + width;
                if ($win.width() == width) {
                    $html.addClass(baseName).addClass(baseName + '-and-over').addClass(baseName + '-and-under')
                }
                if ($win.width() >= width) {
                    $html.addClass(baseName + '-and-over');
                }
                if ($win.width() > width) {
                    $html.addClass(baseName + '-over');
                }
                if ($win.width() <= width) {
                    $html.addClass(baseName + '-and-under');
                }
                if ($win.width() < width) {
                    $html.addClass(baseName + '-under');
                }
            });
        }
        adjust();
        var timer;
        $win.on('resize', function() {
            if (timer)
                clearTimeout(timer);
            timer = setTimeout(function() {
                adjust();
            }, 0);
        });
    }
    ;
    $.extend(plugin, {
        prefix: 'win',
        widths: [320, 480, 568, 600, 768, 800, 1024, 1280],
        id: 'easy-responsive'
    });
})(jQuery);



/*
 * 	fitSidebar 0.1 - jQuery plugin
 *	written by cyokodog
 *
 *	Copyright (c) 2014 cyokodog
 *		http://www.cyokodog.net/
 *		http://d.hatena.ne.jp/cyokodog/)
 *		http://cyokodog.tumblr.com/
 *	MIT LICENCE
 *
 *	Built for jQuery library
 *	http://jquery.com
 *
 */
;(function($) {
    var s = $.fitSidebar = function(target, option) {
        var o = this
          , c = o.config = $.extend({}, s.defaults, option);
        c.target = $(target).addClass('fit-sidebar');
        c.blank = $('<div/>').addClass(s.id + '-blank').insertBefore(c.target);
        c.blank.css('border', 'solid 1px #fff');
        c.blank.css({
            'margin-top': c.target.css('margin-top'),
            'margin-right': c.target.css('margin-right'),
            'margin-bottom': c.target.css('margin-bottom'),
            'margin-left': c.target.css('margin-left'),
            'border-top-width': c.target.css('border-top-width'),
            'border-right-width': c.target.css('border-right-width'),
            'border-bottom-width': c.target.css('border-bottom-width'),
            'border-left-width': c.target.css('border-left-width'),
            'padding-top': c.target.css('padding-top'),
            'padding-right': c.target.css('padding-right'),
            'padding-bottom': c.target.css('padding-bottom'),
            'padding-left': c.target.css('padding-left')
        });
        c.wrapper = $(c.wrapper);
        c._win = $(window)
        .on('scroll', function() {
            o.adjustPosition();
        })
        .on('resize', function() {
            c.target.hasClass('for-chrome-bug');
            o.adjustPosition();
        });
        setTimeout(function() {
            o.adjustPosition();
        }, 0);
        setTimeout(function() {
            o.adjustPosition();
        }, 1000);
    }
    $.extend($.fitSidebar.prototype, {
        adjustPosition: function() {
            var o = this
              , c = o.config;
            if (c._win.width() < c.responsiveWidth) {
                c.wrapper.removeClass(c.fixedClassName);
                c.wrapper.addClass(c.noFixedClassName);
                c.target.removeClass(s.id + '-fixed');
                c.blank.hide();
                c.target.width('auto');
                c.direction = null ;
                return;
            }
            c.wrapper.addClass(c.fixedClassName);
            c.wrapper.removeClass(c.noFixedClassName);
            c.target.addClass(s.id + '-fixed');
            var offset = c.blank.show().offset();
            var scrollTop = c._win.scrollTop()
            var outerHeight = c.target.outerHeight();
            var overHeight = outerHeight - c._win.height();
            if (overHeight < 0)
                overHeight = 0;
            if (!c.direction) {
                c.lastFixedTop = c.lastDownFixedTop = c.lastUpFixedTop = offset.top - scrollTop;
                c.lastScrollTop = c.lastDownScrollTop = c.lastUpScrollTop = scrollTop;
            }
            c.target.width(c.blank.width());
            c.blank.height(c.target.height());
            c.direction = scrollTop < c.lastScrollTop ? 'up' : 'down';
            var adjustDown = function() {
                var top = c.lastUpFixedTop + (c.lastUpScrollTop - scrollTop)
                if (top < 0) {
                    if (top + overHeight < 0) {
                        top = -overHeight;
                        var limit = c.wrapper.offset().top + c.wrapper.height();
                        var pos = scrollTop + outerHeight + top;
                        if (pos > limit) {
                            top = (limit - scrollTop) - outerHeight;
                        }
                    }
                }
                c.target.css({
                    top: top,
                    bottom: 'auto'
                });
                c.lastDownFixedTop = top;
                c.lastDownScrollTop = scrollTop;
            }
            var adjustUp = function() {
                var top = c.lastDownFixedTop + (c.lastDownScrollTop - scrollTop)
                if (top > 0) {
                    top = offset.top - scrollTop;
                    if (top < 0)
                        top = 0;
                }
                c.target.css({
                    top: top,
                    bottom: 'auto'
                });
                c.lastUpFixedTop = top;
                c.lastUpScrollTop = scrollTop;
            }
            if (c.direction == 'down') {
                adjustDown();
                //				adjustUp();
            }
            else {
                adjustUp();
                //				adjustDown();
            }
            c.lastFixedTop = top;
            c.lastScrollTop = scrollTop;



        }
    });
    $.fn.fitSidebar = function(option) {
        return this.each(function() {
            var el = $(this);
            el.data(s.id, new $.fitSidebar(el,option));
        });
    }
    $.extend(s, {
        defaults: {
            wrapper: 'body',
            responsiveWidth: 0,
            fixedClassName: 'fit-sidebar-fixed-now',
            noFixedClassName: 'fit-sidebar-no-fixed-now'
        },
        id: 'fit-sidebar'
    });
})(jQuery);




/*
 * 	Picasa Zoom 0.2 - jQuery plugin
 *	written by cyokodog
 *
 *	Copyright (c) 2014 cyokodog
 *		http://www.cyokodog.net/
 *		http://d.hatena.ne.jp/cyokodog/)
 *		http://cyokodog.tumblr.com/
 *	MIT LICENCE
 *
 *	Built for jQuery library
 *	http://jquery.com
 *
 */
;(function($) {
    var plugin = $.fn.picasaZoom = function(option) {
        return this.each(function() {
            var c = $.extend({}, plugin.defaults, option);
            var target = $(this);
            var link = target.wrap('<a href="javascript:void(0)" class="picasa-zoom"/>').parent();
            var disp = target.css('display');
            link.css({
                'display': (disp += (disp == 'inline' ? '-block' : ''))
            });
            !c.useIcon || (c.icon = $('<span class="picasa-zoom-icon">+</span>').appendTo(link));
            link.on('click', function() {
                var img = $(this).find('img').css('opacity', 0.5);
                var size = [c.thumKey, c.pictKey];
                var src = img.prop('src');
                size = (src.search(size[0]) < 0) ? size.reverse() : size;
                src = img.prop('src').replace(size[0], size[1]);
                var dummy = $('<img/>').on('load', function() {
                    img.prop('src', src).css('opacity', 1).hide().fadeIn();
                    dummy.remove();
                }).prop('src', src);
                !c.icon || c.icon.text(c.icon.text() == '+' ? '-' : '+');
            });
        });
    }
    plugin.defaults = {
        useIcon: true,
        thumKey: '/s144/',
        pictKey: '/s800/',
    }
})(jQuery);



/*
 * 	Fade Page 0.1 - jQuery plugin
 *	written by cyokodog
 *
 *	Copyright (c) 2014 cyokodog
 *		http://www.cyokodog.net/
 *		http://d.hatena.ne.jp/cyokodog/)
 *		http://cyokodog.tumblr.com/
 *	MIT LICENCE
 *
 *	Built for jQuery library
 *	http://jquery.com
 *
 */
;(function($) {

    var f = $.fadePage = $.extend({
        autoRun: true,
        fadeInSpeed: 1500
    }, $.fadePage);

    f.exec = function() {
        $('body').addClass('fade-layer-off');
        $('<div class="fade-layer"/>').prependTo('body').fadeOut(f.fadeInSpeed, function() {
            $(this).remove();
        });
        $(window).on("beforeunload", function(e) {
            $('body').fadeOut();
        });
    }

    jQuery(function($) {
        if (f.autoRun) {
            $.fadePage.exec();
        }
        else {
            $('body').addClass('fade-layer-off');
        }
    });

})(jQuery);







setTimeout(function() {


    //Nivo Slider
    if ($('body').hasClass('home')) {
        $('#slider').nivoSlider({
            effect: 'boxRainGrowReverse',
            pauseTime: 6000
        });
    }




    //Ex Code Prettify
    //		$('pre').exCodePrettify();
    $('div.article__body').easyCodePrettify();

    //Demo Button
    $('a').each(function() {
        var t = $(this);
        if ((/^demo.*$/ig).test(t.text())) {
            t.addClass('demo').addClass('external').prop('target', '_blank').wrap('<div class="for-top"/>');
            var target = t.data('target');
            if (target)
                t.prop('target', target);
        }
        else {
            $.external(t);
        }
    });

    //Go Top
    $.goTop({
        label: ''
    });


    //Easy Social Buttons
    $('h1.article__title a').easySocialButtons({
        autoAdd: false,
        callback: function(api) {
            //.article-info
            $(this).parent().next().after(api.getButtons());
        }
    });


    //Picasa Zoom
    $('.article__body img').each(function() {
        $(this).prop('alt').search('picasa-zoom') == -1 || $(this).picasaZoom();
    });




    // TOC
    ;(function() {
        var headers = $('div.article__body > h2');
        if (($('body.page').size() || $('body.single').size()) && headers.size() > 1) {
            var isColLayout = headers.size() >= 5;
            !isColLayout || $('div.l-page-nav__body').wrapInner('<div class="l-page-nav-col"/>').find('> div').wrapInner('<div/>')
            var widget = $('<div class="wp-widget"><div class="wp-widget__header">ARTICLE INDEX</div><ul class="article-index"></ul></div>').prependTo('div.l-page-nav__body');
            !isColLayout || widget.wrap('<div class="l-page-nav-col"/>').wrap('<div/>');
            var ul = widget.find('ul');
            headers.each(function() {
                var $head = $(this);
                var $a = $('<a href="#"/>').text($head.text()).data('head', $head)
                $a.wrap('<li/>').parent().appendTo(ul);
            });
            ul.on('click', 'a', function() {
                var top = $(this).data('head').offset().top;
                $('html,body').stop().queue([]).animate({
                    scrollTop: top
                }, 1000);
                return false;
            });

        }
    })();

    if ($('div.l-page-nav-col').size()) {
        $('div.l-page-nav-col > div').fitSidebar({
            wrapper: '.l-contents',
            responsiveWidth: 960
        });
    }
    else {
        $('div.l-page-nav__body').fitSidebar({
            wrapper: '.l-contents',
            responsiveWidth: 960
        });
    }


    /*
		//Hatebu Users
//		$('li.widget a').each(function(){
		$('div.wp-widget a').each(function(){
			var t = $(this);
			var url = t.prop('href');
			if(url){
				$.si.hatebu.getEntryCount(url, function( count ){
					!count || $('<a class="hatebu-users"/>').text(count + 'user').prop('href',  $.si.hatebu.getEntryUrl(url)).insertAfter(t);
				})
			}
		});
*/

}, 0);




//INIT
//jQuery(function($){

//debug
/*
	var debug = $('<textarea style="position:fixed;top:0;right:0;height:15px;width:100px;"/>').appendTo('body');
	$(window).resize((function(){
		debug.val($(window).width());
		return arguments.callee;
	})());
*/




//	$.easyResponsive();


/*
	setTimeout(function(){


		// TOC
		;(function(){
			var headers = $('div.article-body > h2');
			if(($('body.page').size() || $('body.single').size()) && headers.size() > 1){
				var ul = $('<ul class="article-index"/>');
				var hasWidget = !!($('#sub-nav .widgets-body > *').size());
				if(hasWidget) $('#sub-nav .widgets-body').wrapInner('<div class="widget-sec"/>');
				var articleIndex = ul.wrap('<div class="widget article-index"/>').parent().
					prepend('<div class="widget-title">ARTICLE INDEX</div>').
					wrap('<div class="widget-sec"/>').parent()
				;
				if($('body.single').size()){
					articleIndex.prependTo('#sub-nav .widgets-body')
				}
				else{
					articleIndex.appendTo('#sub-nav .widgets-body')
				}
				//if(headers.size() > 1 && hasWidget && $('body.single').size()){
//				if(headers.size() > 1 && hasWidget){
				if(headers.size() > 6 && hasWidget){
					$('#sub-nav .widgets').addClass('column-layout');
				}
				headers.each(function(){
					var $head = $(this);
					var $a = $('<a href="#"/>').text($head.text())
					$a.wrap('<li/>').parent().appendTo(ul);
					$a.on('click', function(){
						$a.parents('ul').eq(0).find('a').removeClass('active');
						$a.addClass('active');
						$('html,body').stop().queue([]).animate({scrollTop:$head.offset().top},1000);
						return false;
					});
				});
			}
		})();


		//Nivo Slider
		if($('body').hasClass('home')){
			$('#slider').nivoSlider({
				effect:'boxRainGrowReverse',
				pauseTime:6000
			});
		}


		//Ex Code Prettify
		$('pre').exCodePrettify();


		//Demo Button
		$('a').each(function(){
			var t = $(this);
			if((/^demo.*$/ig).test(t.text())){
				t.addClass('demo').addClass('external').prop('target', '_blank').wrap('<div class="for-top"/>');
				var target = t.data('target');
				if(target) t.prop('target',target);
			}
			else{
				$.external(t);
			}
		});


		//Go Top
		$.goTop({label:''});


		//Easy Social Buttons
//		if($('body').hasClass('blog')){
			$('h1.article-title a').easySocialButtons({
				autoAdd:false,
				callback:function(api ){
					//.article-info
					$(this).parent().next().after(api.getButtons());
				}
			});
//		}


		//Hatebu Users
		$('li.widget a').each(function(){
			var t = $(this);
			var url = t.prop('href');
			if(url){
				$.si.hatebu.getEntryCount(url, function( count ){
					!count || $('<a class="hatebu-users"/>').text(count + 'user').prop('href',  $.si.hatebu.getEntryUrl(url)).insertAfter(t);
				})
			}
		});


		//Fit Sidebar
		if($('#sub-nav .widgets').hasClass('column-layout')){
			$('#sub-nav .widget-sec').wrapInner('<div/>').find('> div').fitSidebar({
				wrapper : '#main',
				responsiveWidth : 800
			});
		}
		else{
			$('#sub-nav .widgets-body').fitSidebar({
				wrapper : '#main',
				responsiveWidth : 800
			});
		}


		//Picasa Zoom
		$('.article-body img').each(function(){
			$(this).prop('alt').search('picasa-zoom') == -1 || $(this).picasaZoom();
		});


	},0);
*/
//});
