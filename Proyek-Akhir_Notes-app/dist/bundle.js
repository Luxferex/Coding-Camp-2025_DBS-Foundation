/*! For license information please see bundle.js.LICENSE.txt */
(() => {
  'use strict';
  var t = {
      56: (t, e, n) => {
        t.exports = function (t) {
          var e = n.nc;
          e && t.setAttribute('nonce', e);
        };
      },
      72: (t) => {
        var e = [];
        function n(t) {
          for (var n = -1, r = 0; r < e.length; r++)
            if (e[r].identifier === t) {
              n = r;
              break;
            }
          return n;
        }
        function r(t, r) {
          for (var a = {}, i = [], c = 0; c < t.length; c++) {
            var u = t[c],
              s = r.base ? u[0] + r.base : u[0],
              l = a[s] || 0,
              d = ''.concat(s, ' ').concat(l);
            a[s] = l + 1;
            var f = n(d),
              p = {
                css: u[1],
                media: u[2],
                sourceMap: u[3],
                supports: u[4],
                layer: u[5],
              };
            if (-1 !== f) e[f].references++, e[f].updater(p);
            else {
              var h = o(p, r);
              (r.byIndex = c),
                e.splice(c, 0, { identifier: d, updater: h, references: 1 });
            }
            i.push(d);
          }
          return i;
        }
        function o(t, e) {
          var n = e.domAPI(e);
          return (
            n.update(t),
            function (e) {
              if (e) {
                if (
                  e.css === t.css &&
                  e.media === t.media &&
                  e.sourceMap === t.sourceMap &&
                  e.supports === t.supports &&
                  e.layer === t.layer
                )
                  return;
                n.update((t = e));
              } else n.remove();
            }
          );
        }
        t.exports = function (t, o) {
          var a = r((t = t || []), (o = o || {}));
          return function (t) {
            t = t || [];
            for (var i = 0; i < a.length; i++) {
              var c = n(a[i]);
              e[c].references--;
            }
            for (var u = r(t, o), s = 0; s < a.length; s++) {
              var l = n(a[s]);
              0 === e[l].references && (e[l].updater(), e.splice(l, 1));
            }
            a = u;
          };
        };
      },
      113: (t) => {
        t.exports = function (t, e) {
          if (e.styleSheet) e.styleSheet.cssText = t;
          else {
            for (; e.firstChild; ) e.removeChild(e.firstChild);
            e.appendChild(document.createTextNode(t));
          }
        };
      },
      208: (t, e, n) => {
        n.d(e, { A: () => c });
        var r = n(601),
          o = n.n(r),
          a = n(314),
          i = n.n(a)()(o());
        i.push([
          t.id,
          '@import url(https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap);',
        ]),
          i.push([
            t.id,
            "* {\n  box-sizing: border-box;\n  margin: 0;\n  padding: 0;\n}\n\n:root {\n  --primary-color: #2c6b2f; /* Hijau tua */\n  --primary-hover: #1e5321; /* Hijau lebih gelap untuk hover */\n  --bg-color: #f9f9fb;\n  --card-bg: #ffffff;\n  --text-color: #333;\n  --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.05);\n  --shadow-lg: 0 6px 16px rgba(0, 0, 0, 0.1);\n  --radius: 12px;\n}\n\nbody {\n  font-family: 'Poppins', sans-serif;\n  margin: 0;\n  padding: 0;\n  background: var(--bg-color);\n  color: var(--text-color);\n}\n\n/* Header */\nheader {\n  background: var(--primary-color);\n  color: white;\n  text-align: center;\n  padding: 20px;\n  font-size: 2rem;\n  font-weight: 600;\n  letter-spacing: 0.5px;\n  box-shadow: var(--shadow-sm);\n}\n\n/* Main */\nmain {\n  width: 90%;\n  max-width: 960px;\n  margin: 30px auto;\n}\n\n/* Form */\nform {\n  display: flex;\n  flex-direction: column;\n  gap: 16px;\n  background: var(--card-bg);\n  padding: 24px;\n  border-radius: var(--radius);\n  box-shadow: var(--shadow-lg);\n}\n\n/* Input & Textarea */\ninput,\ntextarea {\n  padding: 14px 16px;\n  border: 1px solid #dcdcdc;\n  border-radius: var(--radius);\n  font-size: 1rem;\n  transition: 0.3s ease;\n  background-color: #fff;\n}\n\ninput:focus,\ntextarea:focus {\n  outline: none;\n  border-color: var(--primary-color);\n  box-shadow: 0 0 10px rgba(44, 107, 47, 0.25);\n}\n\n/* Button */\nbutton {\n  padding: 14px;\n  border: none;\n  border-radius: var(--radius);\n  background: var(--primary-color);\n  color: white;\n  font-size: 1rem;\n  font-weight: 600;\n  cursor: pointer;\n  transition: 0.3s ease;\n  letter-spacing: 0.3px;\n}\n\nbutton:hover {\n  background: var(--primary-hover);\n  box-shadow: 0 4px 10px rgba(44, 107, 47, 0.25);\n}\n\n/* Grid Layout */\n.grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));\n  gap: 20px;\n  margin-top: 30px;\n}\n\n/* Note Card */\n.note {\n  background: var(--card-bg);\n  padding: 20px;\n  border-radius: var(--radius);\n  box-shadow: var(--shadow-sm);\n  transition: 0.3s ease;\n  border-left: 5px solid var(--primary-color);\n}\n\n.note:hover {\n  transform: translateY(-4px);\n  box-shadow: var(--shadow-lg);\n}\n\n.note h3 {\n  margin: 0 0 10px 0;\n  font-size: 1.25rem;\n  font-weight: 600;\n  color: var(--primary-color);\n}\n\n.note p {\n  font-size: 1rem;\n  line-height: 1.6;\n  color: #555;\n}\n",
            '',
          ]);
        const c = i;
      },
      314: (t) => {
        t.exports = function (t) {
          var e = [];
          return (
            (e.toString = function () {
              return this.map(function (e) {
                var n = '',
                  r = void 0 !== e[5];
                return (
                  e[4] && (n += '@supports ('.concat(e[4], ') {')),
                  e[2] && (n += '@media '.concat(e[2], ' {')),
                  r &&
                    (n += '@layer'.concat(
                      e[5].length > 0 ? ' '.concat(e[5]) : '',
                      ' {'
                    )),
                  (n += t(e)),
                  r && (n += '}'),
                  e[2] && (n += '}'),
                  e[4] && (n += '}'),
                  n
                );
              }).join('');
            }),
            (e.i = function (t, n, r, o, a) {
              'string' == typeof t && (t = [[null, t, void 0]]);
              var i = {};
              if (r)
                for (var c = 0; c < this.length; c++) {
                  var u = this[c][0];
                  null != u && (i[u] = !0);
                }
              for (var s = 0; s < t.length; s++) {
                var l = [].concat(t[s]);
                (r && i[l[0]]) ||
                  (void 0 !== a &&
                    (void 0 === l[5] ||
                      (l[1] = '@layer'
                        .concat(l[5].length > 0 ? ' '.concat(l[5]) : '', ' {')
                        .concat(l[1], '}')),
                    (l[5] = a)),
                  n &&
                    (l[2]
                      ? ((l[1] = '@media '
                          .concat(l[2], ' {')
                          .concat(l[1], '}')),
                        (l[2] = n))
                      : (l[2] = n)),
                  o &&
                    (l[4]
                      ? ((l[1] = '@supports ('
                          .concat(l[4], ') {')
                          .concat(l[1], '}')),
                        (l[4] = o))
                      : (l[4] = ''.concat(o))),
                  e.push(l));
              }
            }),
            e
          );
        };
      },
      540: (t) => {
        t.exports = function (t) {
          var e = document.createElement('style');
          return t.setAttributes(e, t.attributes), t.insert(e, t.options), e;
        };
      },
      601: (t) => {
        t.exports = function (t) {
          return t[1];
        };
      },
      659: (t) => {
        var e = {};
        t.exports = function (t, n) {
          var r = (function (t) {
            if (void 0 === e[t]) {
              var n = document.querySelector(t);
              if (
                window.HTMLIFrameElement &&
                n instanceof window.HTMLIFrameElement
              )
                try {
                  n = n.contentDocument.head;
                } catch (t) {
                  n = null;
                }
              e[t] = n;
            }
            return e[t];
          })(t);
          if (!r)
            throw new Error(
              "Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid."
            );
          r.appendChild(n);
        };
      },
      825: (t) => {
        t.exports = function (t) {
          if ('undefined' == typeof document)
            return { update: function () {}, remove: function () {} };
          var e = t.insertStyleElement(t);
          return {
            update: function (n) {
              !(function (t, e, n) {
                var r = '';
                n.supports && (r += '@supports ('.concat(n.supports, ') {')),
                  n.media && (r += '@media '.concat(n.media, ' {'));
                var o = void 0 !== n.layer;
                o &&
                  (r += '@layer'.concat(
                    n.layer.length > 0 ? ' '.concat(n.layer) : '',
                    ' {'
                  )),
                  (r += n.css),
                  o && (r += '}'),
                  n.media && (r += '}'),
                  n.supports && (r += '}');
                var a = n.sourceMap;
                a &&
                  'undefined' != typeof btoa &&
                  (r +=
                    '\n/*# sourceMappingURL=data:application/json;base64,'.concat(
                      btoa(unescape(encodeURIComponent(JSON.stringify(a)))),
                      ' */'
                    )),
                  e.styleTagTransform(r, t, e.options);
              })(e, t, n);
            },
            remove: function () {
              !(function (t) {
                if (null === t.parentNode) return !1;
                t.parentNode.removeChild(t);
              })(e);
            },
          };
        };
      },
    },
    e = {};
  function n(r) {
    var o = e[r];
    if (void 0 !== o) return o.exports;
    var a = (e[r] = { id: r, exports: {} });
    return t[r](a, a.exports, n), a.exports;
  }
  (n.n = (t) => {
    var e = t && t.__esModule ? () => t.default : () => t;
    return n.d(e, { a: e }), e;
  }),
    (n.d = (t, e) => {
      for (var r in e)
        n.o(e, r) &&
          !n.o(t, r) &&
          Object.defineProperty(t, r, { enumerable: !0, get: e[r] });
    }),
    (n.o = (t, e) => Object.prototype.hasOwnProperty.call(t, e)),
    (n.nc = void 0);
  var r = n(72),
    o = n.n(r),
    a = n(825),
    i = n.n(a),
    c = n(659),
    u = n.n(c),
    s = n(56),
    l = n.n(s),
    d = n(540),
    f = n.n(d),
    p = n(113),
    h = n.n(p),
    v = n(208),
    y = {};
  function m(t) {
    return (
      (m =
        'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
          ? function (t) {
              return typeof t;
            }
          : function (t) {
              return t &&
                'function' == typeof Symbol &&
                t.constructor === Symbol &&
                t !== Symbol.prototype
                ? 'symbol'
                : typeof t;
            }),
      m(t)
    );
  }
  function b(t, e) {
    var n = Object.keys(t);
    if (Object.getOwnPropertySymbols) {
      var r = Object.getOwnPropertySymbols(t);
      e &&
        (r = r.filter(function (e) {
          return Object.getOwnPropertyDescriptor(t, e).enumerable;
        })),
        n.push.apply(n, r);
    }
    return n;
  }
  function g(t) {
    for (var e = 1; e < arguments.length; e++) {
      var n = null != arguments[e] ? arguments[e] : {};
      e % 2
        ? b(Object(n), !0).forEach(function (e) {
            w(t, e, n[e]);
          })
        : Object.getOwnPropertyDescriptors
          ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n))
          : b(Object(n)).forEach(function (e) {
              Object.defineProperty(
                t,
                e,
                Object.getOwnPropertyDescriptor(n, e)
              );
            });
    }
    return t;
  }
  function w(t, e, n) {
    return (
      (e = T(e)) in t
        ? Object.defineProperty(t, e, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (t[e] = n),
      t
    );
  }
  function x(t, e) {
    (null == e || e > t.length) && (e = t.length);
    for (var n = 0, r = Array(e); n < e; n++) r[n] = t[n];
    return r;
  }
  function E() {
    E = function () {
      return e;
    };
    var t,
      e = {},
      n = Object.prototype,
      r = n.hasOwnProperty,
      o =
        Object.defineProperty ||
        function (t, e, n) {
          t[e] = n.value;
        },
      a = 'function' == typeof Symbol ? Symbol : {},
      i = a.iterator || '@@iterator',
      c = a.asyncIterator || '@@asyncIterator',
      u = a.toStringTag || '@@toStringTag';
    function s(t, e, n) {
      return (
        Object.defineProperty(t, e, {
          value: n,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        }),
        t[e]
      );
    }
    try {
      s({}, '');
    } catch (t) {
      s = function (t, e, n) {
        return (t[e] = n);
      };
    }
    function l(t, e, n, r) {
      var a = e && e.prototype instanceof b ? e : b,
        i = Object.create(a.prototype),
        c = new A(r || []);
      return o(i, '_invoke', { value: T(t, n, c) }), i;
    }
    function d(t, e, n) {
      try {
        return { type: 'normal', arg: t.call(e, n) };
      } catch (t) {
        return { type: 'throw', arg: t };
      }
    }
    e.wrap = l;
    var f = 'suspendedStart',
      p = 'suspendedYield',
      h = 'executing',
      v = 'completed',
      y = {};
    function b() {}
    function g() {}
    function w() {}
    var x = {};
    s(x, i, function () {
      return this;
    });
    var k = Object.getPrototypeOf,
      j = k && k(k(M([])));
    j && j !== n && r.call(j, i) && (x = j);
    var O = (w.prototype = b.prototype = Object.create(x));
    function L(t) {
      ['next', 'throw', 'return'].forEach(function (e) {
        s(t, e, function (t) {
          return this._invoke(e, t);
        });
      });
    }
    function S(t, e) {
      function n(o, a, i, c) {
        var u = d(t[o], t, a);
        if ('throw' !== u.type) {
          var s = u.arg,
            l = s.value;
          return l && 'object' == m(l) && r.call(l, '__await')
            ? e.resolve(l.__await).then(
                function (t) {
                  n('next', t, i, c);
                },
                function (t) {
                  n('throw', t, i, c);
                }
              )
            : e.resolve(l).then(
                function (t) {
                  (s.value = t), i(s);
                },
                function (t) {
                  return n('throw', t, i, c);
                }
              );
        }
        c(u.arg);
      }
      var a;
      o(this, '_invoke', {
        value: function (t, r) {
          function o() {
            return new e(function (e, o) {
              n(t, r, e, o);
            });
          }
          return (a = a ? a.then(o, o) : o());
        },
      });
    }
    function T(e, n, r) {
      var o = f;
      return function (a, i) {
        if (o === h) throw Error('Generator is already running');
        if (o === v) {
          if ('throw' === a) throw i;
          return { value: t, done: !0 };
        }
        for (r.method = a, r.arg = i; ; ) {
          var c = r.delegate;
          if (c) {
            var u = P(c, r);
            if (u) {
              if (u === y) continue;
              return u;
            }
          }
          if ('next' === r.method) r.sent = r._sent = r.arg;
          else if ('throw' === r.method) {
            if (o === f) throw ((o = v), r.arg);
            r.dispatchException(r.arg);
          } else 'return' === r.method && r.abrupt('return', r.arg);
          o = h;
          var s = d(e, n, r);
          if ('normal' === s.type) {
            if (((o = r.done ? v : p), s.arg === y)) continue;
            return { value: s.arg, done: r.done };
          }
          'throw' === s.type &&
            ((o = v), (r.method = 'throw'), (r.arg = s.arg));
        }
      };
    }
    function P(e, n) {
      var r = n.method,
        o = e.iterator[r];
      if (o === t)
        return (
          (n.delegate = null),
          ('throw' === r &&
            e.iterator.return &&
            ((n.method = 'return'),
            (n.arg = t),
            P(e, n),
            'throw' === n.method)) ||
            ('return' !== r &&
              ((n.method = 'throw'),
              (n.arg = new TypeError(
                "The iterator does not provide a '" + r + "' method"
              )))),
          y
        );
      var a = d(o, e.iterator, n.arg);
      if ('throw' === a.type)
        return (n.method = 'throw'), (n.arg = a.arg), (n.delegate = null), y;
      var i = a.arg;
      return i
        ? i.done
          ? ((n[e.resultName] = i.value),
            (n.next = e.nextLoc),
            'return' !== n.method && ((n.method = 'next'), (n.arg = t)),
            (n.delegate = null),
            y)
          : i
        : ((n.method = 'throw'),
          (n.arg = new TypeError('iterator result is not an object')),
          (n.delegate = null),
          y);
    }
    function C(t) {
      var e = { tryLoc: t[0] };
      1 in t && (e.catchLoc = t[1]),
        2 in t && ((e.finallyLoc = t[2]), (e.afterLoc = t[3])),
        this.tryEntries.push(e);
    }
    function _(t) {
      var e = t.completion || {};
      (e.type = 'normal'), delete e.arg, (t.completion = e);
    }
    function A(t) {
      (this.tryEntries = [{ tryLoc: 'root' }]),
        t.forEach(C, this),
        this.reset(!0);
    }
    function M(e) {
      if (e || '' === e) {
        var n = e[i];
        if (n) return n.call(e);
        if ('function' == typeof e.next) return e;
        if (!isNaN(e.length)) {
          var o = -1,
            a = function n() {
              for (; ++o < e.length; )
                if (r.call(e, o)) return (n.value = e[o]), (n.done = !1), n;
              return (n.value = t), (n.done = !0), n;
            };
          return (a.next = a);
        }
      }
      throw new TypeError(m(e) + ' is not iterable');
    }
    return (
      (g.prototype = w),
      o(O, 'constructor', { value: w, configurable: !0 }),
      o(w, 'constructor', { value: g, configurable: !0 }),
      (g.displayName = s(w, u, 'GeneratorFunction')),
      (e.isGeneratorFunction = function (t) {
        var e = 'function' == typeof t && t.constructor;
        return (
          !!e && (e === g || 'GeneratorFunction' === (e.displayName || e.name))
        );
      }),
      (e.mark = function (t) {
        return (
          Object.setPrototypeOf
            ? Object.setPrototypeOf(t, w)
            : ((t.__proto__ = w), s(t, u, 'GeneratorFunction')),
          (t.prototype = Object.create(O)),
          t
        );
      }),
      (e.awrap = function (t) {
        return { __await: t };
      }),
      L(S.prototype),
      s(S.prototype, c, function () {
        return this;
      }),
      (e.AsyncIterator = S),
      (e.async = function (t, n, r, o, a) {
        void 0 === a && (a = Promise);
        var i = new S(l(t, n, r, o), a);
        return e.isGeneratorFunction(n)
          ? i
          : i.next().then(function (t) {
              return t.done ? t.value : i.next();
            });
      }),
      L(O),
      s(O, u, 'Generator'),
      s(O, i, function () {
        return this;
      }),
      s(O, 'toString', function () {
        return '[object Generator]';
      }),
      (e.keys = function (t) {
        var e = Object(t),
          n = [];
        for (var r in e) n.push(r);
        return (
          n.reverse(),
          function t() {
            for (; n.length; ) {
              var r = n.pop();
              if (r in e) return (t.value = r), (t.done = !1), t;
            }
            return (t.done = !0), t;
          }
        );
      }),
      (e.values = M),
      (A.prototype = {
        constructor: A,
        reset: function (e) {
          if (
            ((this.prev = 0),
            (this.next = 0),
            (this.sent = this._sent = t),
            (this.done = !1),
            (this.delegate = null),
            (this.method = 'next'),
            (this.arg = t),
            this.tryEntries.forEach(_),
            !e)
          )
            for (var n in this)
              't' === n.charAt(0) &&
                r.call(this, n) &&
                !isNaN(+n.slice(1)) &&
                (this[n] = t);
        },
        stop: function () {
          this.done = !0;
          var t = this.tryEntries[0].completion;
          if ('throw' === t.type) throw t.arg;
          return this.rval;
        },
        dispatchException: function (e) {
          if (this.done) throw e;
          var n = this;
          function o(r, o) {
            return (
              (c.type = 'throw'),
              (c.arg = e),
              (n.next = r),
              o && ((n.method = 'next'), (n.arg = t)),
              !!o
            );
          }
          for (var a = this.tryEntries.length - 1; a >= 0; --a) {
            var i = this.tryEntries[a],
              c = i.completion;
            if ('root' === i.tryLoc) return o('end');
            if (i.tryLoc <= this.prev) {
              var u = r.call(i, 'catchLoc'),
                s = r.call(i, 'finallyLoc');
              if (u && s) {
                if (this.prev < i.catchLoc) return o(i.catchLoc, !0);
                if (this.prev < i.finallyLoc) return o(i.finallyLoc);
              } else if (u) {
                if (this.prev < i.catchLoc) return o(i.catchLoc, !0);
              } else {
                if (!s) throw Error('try statement without catch or finally');
                if (this.prev < i.finallyLoc) return o(i.finallyLoc);
              }
            }
          }
        },
        abrupt: function (t, e) {
          for (var n = this.tryEntries.length - 1; n >= 0; --n) {
            var o = this.tryEntries[n];
            if (
              o.tryLoc <= this.prev &&
              r.call(o, 'finallyLoc') &&
              this.prev < o.finallyLoc
            ) {
              var a = o;
              break;
            }
          }
          a &&
            ('break' === t || 'continue' === t) &&
            a.tryLoc <= e &&
            e <= a.finallyLoc &&
            (a = null);
          var i = a ? a.completion : {};
          return (
            (i.type = t),
            (i.arg = e),
            a
              ? ((this.method = 'next'), (this.next = a.finallyLoc), y)
              : this.complete(i)
          );
        },
        complete: function (t, e) {
          if ('throw' === t.type) throw t.arg;
          return (
            'break' === t.type || 'continue' === t.type
              ? (this.next = t.arg)
              : 'return' === t.type
                ? ((this.rval = this.arg = t.arg),
                  (this.method = 'return'),
                  (this.next = 'end'))
                : 'normal' === t.type && e && (this.next = e),
            y
          );
        },
        finish: function (t) {
          for (var e = this.tryEntries.length - 1; e >= 0; --e) {
            var n = this.tryEntries[e];
            if (n.finallyLoc === t)
              return this.complete(n.completion, n.afterLoc), _(n), y;
          }
        },
        catch: function (t) {
          for (var e = this.tryEntries.length - 1; e >= 0; --e) {
            var n = this.tryEntries[e];
            if (n.tryLoc === t) {
              var r = n.completion;
              if ('throw' === r.type) {
                var o = r.arg;
                _(n);
              }
              return o;
            }
          }
          throw Error('illegal catch attempt');
        },
        delegateYield: function (e, n, r) {
          return (
            (this.delegate = { iterator: M(e), resultName: n, nextLoc: r }),
            'next' === this.method && (this.arg = t),
            y
          );
        },
      }),
      e
    );
  }
  function k(t, e, n, r, o, a, i) {
    try {
      var c = t[a](i),
        u = c.value;
    } catch (t) {
      return void n(t);
    }
    c.done ? e(u) : Promise.resolve(u).then(r, o);
  }
  function j(t) {
    return function () {
      var e = this,
        n = arguments;
      return new Promise(function (r, o) {
        var a = t.apply(e, n);
        function i(t) {
          k(a, r, o, i, c, 'next', t);
        }
        function c(t) {
          k(a, r, o, i, c, 'throw', t);
        }
        i(void 0);
      });
    };
  }
  function O(t, e) {
    if (!(t instanceof e))
      throw new TypeError('Cannot call a class as a function');
  }
  function L(t, e) {
    for (var n = 0; n < e.length; n++) {
      var r = e[n];
      (r.enumerable = r.enumerable || !1),
        (r.configurable = !0),
        'value' in r && (r.writable = !0),
        Object.defineProperty(t, T(r.key), r);
    }
  }
  function S(t, e, n) {
    return (
      e && L(t.prototype, e),
      n && L(t, n),
      Object.defineProperty(t, 'prototype', { writable: !1 }),
      t
    );
  }
  function T(t) {
    var e = (function (t) {
      if ('object' != m(t) || !t) return t;
      var e = t[Symbol.toPrimitive];
      if (void 0 !== e) {
        var n = e.call(t, 'string');
        if ('object' != m(n)) return n;
        throw new TypeError('@@toPrimitive must return a primitive value.');
      }
      return String(t);
    })(t);
    return 'symbol' == m(e) ? e : e + '';
  }
  function P(t, e, n) {
    return (
      (e = R(e)),
      (function (t, e) {
        if (e && ('object' == m(e) || 'function' == typeof e)) return e;
        if (void 0 !== e)
          throw new TypeError(
            'Derived constructors may only return object or undefined'
          );
        return (function (t) {
          if (void 0 === t)
            throw new ReferenceError(
              "this hasn't been initialised - super() hasn't been called"
            );
          return t;
        })(t);
      })(
        t,
        A() ? Reflect.construct(e, n || [], R(t).constructor) : e.apply(t, n)
      )
    );
  }
  function C(t, e) {
    if ('function' != typeof e && null !== e)
      throw new TypeError('Super expression must either be null or a function');
    (t.prototype = Object.create(e && e.prototype, {
      constructor: { value: t, writable: !0, configurable: !0 },
    })),
      Object.defineProperty(t, 'prototype', { writable: !1 }),
      e && M(t, e);
  }
  function _(t) {
    var e = 'function' == typeof Map ? new Map() : void 0;
    return (
      (_ = function (t) {
        if (
          null === t ||
          !(function (t) {
            try {
              return -1 !== Function.toString.call(t).indexOf('[native code]');
            } catch (e) {
              return 'function' == typeof t;
            }
          })(t)
        )
          return t;
        if ('function' != typeof t)
          throw new TypeError(
            'Super expression must either be null or a function'
          );
        if (void 0 !== e) {
          if (e.has(t)) return e.get(t);
          e.set(t, n);
        }
        function n() {
          return (function (t, e, n) {
            if (A()) return Reflect.construct.apply(null, arguments);
            var r = [null];
            r.push.apply(r, e);
            var o = new (t.bind.apply(t, r))();
            return n && M(o, n.prototype), o;
          })(t, arguments, R(this).constructor);
        }
        return (
          (n.prototype = Object.create(t.prototype, {
            constructor: {
              value: n,
              enumerable: !1,
              writable: !0,
              configurable: !0,
            },
          })),
          M(n, t)
        );
      }),
      _(t)
    );
  }
  function A() {
    try {
      var t = !Boolean.prototype.valueOf.call(
        Reflect.construct(Boolean, [], function () {})
      );
    } catch (t) {}
    return (A = function () {
      return !!t;
    })();
  }
  function M(t, e) {
    return (
      (M = Object.setPrototypeOf
        ? Object.setPrototypeOf.bind()
        : function (t, e) {
            return (t.__proto__ = e), t;
          }),
      M(t, e)
    );
  }
  function R(t) {
    return (
      (R = Object.setPrototypeOf
        ? Object.getPrototypeOf.bind()
        : function (t) {
            return t.__proto__ || Object.getPrototypeOf(t);
          }),
      R(t)
    );
  }
  (y.styleTagTransform = h()),
    (y.setAttributes = l()),
    (y.insert = u().bind(null, 'head')),
    (y.domAPI = i()),
    (y.insertStyleElement = f()),
    o()(v.A, y),
    v.A && v.A.locals && v.A.locals;
  var q = (function (t) {
    function e() {
      var t;
      return O(this, e), (t = P(this, e)).attachShadow({ mode: 'open' }), t;
    }
    return (
      C(e, t),
      S(e, [
        {
          key: 'connectedCallback',
          value: function () {
            this.shadowRoot.innerHTML =
              '\n      <style>\n        .loading {\n          position: fixed;\n          top: 50%;\n          left: 50%;\n          transform: translate(-50%, -50%);\n          font-size: 20px;\n          font-weight: bold;\n          color: #333;\n        }\n        .spinner {\n          border: 4px solid #f3f3f3;\n          border-top: 4px solid #3498db;\n          border-radius: 50%;\n          width: 50px;\n          height: 50px;\n          animation: spin 2s linear infinite;\n        }\n        @keyframes spin {\n          0% { transform: rotate(0deg); }\n          100% { transform: rotate(360deg); }\n        }\n      </style>\n      <div class="loading">\n        <div class="spinner"></div>\n        Loading...\n      </div>\n    ';
          },
        },
      ])
    );
  })(_(HTMLElement));
  customElements.define('loading-indicator', q);
  var I = (function (t) {
    function e() {
      var t;
      return O(this, e), (t = P(this, e)).attachShadow({ mode: 'open' }), t;
    }
    return (
      C(e, t),
      S(e, [
        {
          key: 'note',
          set: function (t) {
            var e,
              n,
              r = this;
            (this.shadowRoot.innerHTML =
              '\n      <style>\n        .note {\n          border: 1px solid #ddd;\n          padding: 10px;\n          margin: 5px;\n          border-radius: 5px;\n          background: #fff;\n        }\n        .archived {\n          background: #f0f0f0;\n        }\n      </style>\n      <div class="note '
                .concat(t.archived ? 'archived' : '', '">\n        <h3>')
                .concat(t.title, '</h3>\n        <p>')
                .concat(t.body, '</p>\n        <small>')
                .concat(
                  new Date(t.createdAt).toLocaleDateString(),
                  '</small>\n        <button class="delete-button">Hapus</button>\n        '
                )
                .concat(
                  t.archived
                    ? '<button class="unarchive-button">Kembalikan Arsip</button>'
                    : '<button class="archive-button">Arsipkan</button>',
                  '\n      </div>\n    '
                )),
              this.shadowRoot
                .querySelector('.delete-button')
                .addEventListener('click', function () {
                  r.dispatchEvent(
                    new CustomEvent('note-deleted', {
                      detail: t.id,
                      bubbles: !0,
                      composed: !0,
                    })
                  );
                }),
              null === (e = this.shadowRoot.querySelector('.archive-button')) ||
                void 0 === e ||
                e.addEventListener('click', function () {
                  r.dispatchEvent(
                    new CustomEvent('note-archived', {
                      detail: t.id,
                      bubbles: !0,
                      composed: !0,
                    })
                  );
                }),
              null ===
                (n = this.shadowRoot.querySelector('.unarchive-button')) ||
                void 0 === n ||
                n.addEventListener('click', function () {
                  r.dispatchEvent(
                    new CustomEvent('note-unarchived', {
                      detail: t.id,
                      bubbles: !0,
                      composed: !0,
                    })
                  );
                });
          },
        },
      ])
    );
  })(_(HTMLElement));
  customElements.define('note-item', I);
  var G = (function (t) {
    function e() {
      var t;
      return O(this, e), (t = P(this, e)).attachShadow({ mode: 'open' }), t;
    }
    return (
      C(e, t),
      S(e, [
        {
          key: 'notes',
          set: function (t) {
            this.shadowRoot.innerHTML =
              '\n      <style>\n        .grid {\n          display: grid;\n          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));\n          gap: 10px;\n        }\n      </style>\n      <div class="grid">\n        '.concat(
                t
                  .map(function (t) {
                    return '<note-item></note-item>';
                  })
                  .join(''),
                '\n      </div>\n    '
              );
            var e = this.shadowRoot.querySelectorAll('note-item');
            t.forEach(function (t, n) {
              return (e[n].note = t);
            });
          },
        },
      ])
    );
  })(_(HTMLElement));
  customElements.define('notes-list', G);
  var H = (function (t) {
    function e() {
      var t;
      return O(this, e), (t = P(this, e)).attachShadow({ mode: 'open' }), t;
    }
    return (
      C(e, t),
      S(e, [
        {
          key: 'connectedCallback',
          value: function () {
            var t = this;
            this.shadowRoot.innerHTML =
              '\n      <style>\n        form {\n          display: flex;\n          flex-direction: column;\n          gap: 10px;\n        }\n        .error {\n          color: red;\n          font-size: 0.8rem;\n        }\n        button:disabled {\n          background: #ccc;\n          cursor: not-allowed;\n        }\n      </style>\n      <form>\n        <input type="text" id="title" placeholder="Judul Catatan" required>\n        <span class="error" id="title-error"></span>\n        <textarea id="body" placeholder="Isi Catatan" required></textarea>\n        <span class="error" id="body-error"></span>\n        <button type="submit" disabled>Tambah Catatan</button>\n      </form>\n    ';
            var e = this.shadowRoot.querySelector('form'),
              n = this.shadowRoot.querySelector('#title'),
              r = this.shadowRoot.querySelector('#body'),
              o = this.shadowRoot.querySelector('#title-error'),
              a = this.shadowRoot.querySelector('#body-error'),
              i = this.shadowRoot.querySelector('button'),
              c = function () {
                var t = !0;
                n.value.length < 3
                  ? ((o.textContent = 'Judul minimal 3 karakter'), (t = !1))
                  : (o.textContent = ''),
                  r.value.length < 5
                    ? ((a.textContent = 'Isi catatan minimal 5 karakter'),
                      (t = !1))
                    : (a.textContent = ''),
                  (i.disabled = !t);
              };
            n.addEventListener('input', c),
              r.addEventListener('input', c),
              e.addEventListener(
                'submit',
                (function () {
                  var o = j(
                    E().mark(function o(a) {
                      var i, u, s, l, d, f;
                      return E().wrap(
                        function (o) {
                          for (;;)
                            switch ((o.prev = o.next)) {
                              case 0:
                                return (
                                  a.preventDefault(),
                                  (i = n.value),
                                  (u = r.value),
                                  (s = { title: i, body: u }),
                                  (l =
                                    document.createElement(
                                      'loading-indicator'
                                    )),
                                  document.body.appendChild(l),
                                  (o.prev = 6),
                                  (o.next = 9),
                                  fetch(
                                    'https://notes-api.dicoding.dev/v2/notes',
                                    {
                                      method: 'POST',
                                      headers: {
                                        'Content-Type': 'application/json',
                                      },
                                      body: JSON.stringify(s),
                                    }
                                  )
                                );
                              case 9:
                                if ((d = o.sent).ok) {
                                  o.next = 12;
                                  break;
                                }
                                throw new Error('Gagal menambahkan catatan');
                              case 12:
                                return (o.next = 14), d.json();
                              case 14:
                                'success' === (f = o.sent).status &&
                                  t.dispatchEvent(
                                    new CustomEvent('note-added', {
                                      detail: f.data,
                                      bubbles: !0,
                                      composed: !0,
                                    })
                                  ),
                                  (o.next = 21);
                                break;
                              case 18:
                                (o.prev = 18),
                                  (o.t0 = o.catch(6)),
                                  alert(
                                    'Terjadi kesalahan: '.concat(o.t0.message)
                                  );
                              case 21:
                                return (
                                  (o.prev = 21),
                                  document.body.removeChild(l),
                                  e.reset(),
                                  c(),
                                  o.finish(21)
                                );
                              case 26:
                              case 'end':
                                return o.stop();
                            }
                        },
                        o,
                        null,
                        [[6, 18, 21, 26]]
                      );
                    })
                  );
                  return function (t) {
                    return o.apply(this, arguments);
                  };
                })()
              );
          },
        },
      ])
    );
  })(_(HTMLElement));
  customElements.define('note-form', H);
  var N = (function () {
      var t = j(
        E().mark(function t(e) {
          var n, r;
          return E().wrap(
            function (t) {
              for (;;)
                switch ((t.prev = t.next)) {
                  case 0:
                    return (
                      (t.prev = 0),
                      (t.next = 3),
                      fetch(
                        'https://notes-api.dicoding.dev/v2/notes/'.concat(
                          e,
                          '/archive'
                        ),
                        { method: 'POST' }
                      )
                    );
                  case 3:
                    if ((n = t.sent).ok) {
                      t.next = 6;
                      break;
                    }
                    throw new Error('Gagal mengarsipkan catatan');
                  case 6:
                    return (t.next = 8), n.json();
                  case 8:
                    return (
                      (r = t.sent), t.abrupt('return', 'success' === r.status)
                    );
                  case 12:
                    return (
                      (t.prev = 12),
                      (t.t0 = t.catch(0)),
                      alert('Terjadi kesalahan: '.concat(t.t0.message)),
                      t.abrupt('return', !1)
                    );
                  case 16:
                  case 'end':
                    return t.stop();
                }
            },
            t,
            null,
            [[0, 12]]
          );
        })
      );
      return function (e) {
        return t.apply(this, arguments);
      };
    })(),
    D = (function () {
      var t = j(
        E().mark(function t(e) {
          var n, r;
          return E().wrap(
            function (t) {
              for (;;)
                switch ((t.prev = t.next)) {
                  case 0:
                    return (
                      (t.prev = 0),
                      (t.next = 3),
                      fetch(
                        'https://notes-api.dicoding.dev/v2/notes/'.concat(
                          e,
                          '/unarchive'
                        ),
                        { method: 'POST' }
                      )
                    );
                  case 3:
                    if ((n = t.sent).ok) {
                      t.next = 6;
                      break;
                    }
                    throw new Error('Gagal mengembalikan arsip catatan');
                  case 6:
                    return (t.next = 8), n.json();
                  case 8:
                    return (
                      (r = t.sent), t.abrupt('return', 'success' === r.status)
                    );
                  case 12:
                    return (
                      (t.prev = 12),
                      (t.t0 = t.catch(0)),
                      alert('Terjadi kesalahan: '.concat(t.t0.message)),
                      t.abrupt('return', !1)
                    );
                  case 16:
                  case 'end':
                    return t.stop();
                }
            },
            t,
            null,
            [[0, 12]]
          );
        })
      );
      return function (e) {
        return t.apply(this, arguments);
      };
    })(),
    F = (function () {
      var t = j(
        E().mark(function t(e) {
          var n, r;
          return E().wrap(
            function (t) {
              for (;;)
                switch ((t.prev = t.next)) {
                  case 0:
                    return (
                      (t.prev = 0),
                      (t.next = 3),
                      fetch(
                        'https://notes-api.dicoding.dev/v2/notes/'.concat(e),
                        { method: 'DELETE' }
                      )
                    );
                  case 3:
                    if ((n = t.sent).ok) {
                      t.next = 6;
                      break;
                    }
                    throw new Error('Gagal menghapus catatan');
                  case 6:
                    return (t.next = 8), n.json();
                  case 8:
                    return (
                      (r = t.sent), t.abrupt('return', 'success' === r.status)
                    );
                  case 12:
                    return (
                      (t.prev = 12),
                      (t.t0 = t.catch(0)),
                      alert('Terjadi kesalahan: '.concat(t.t0.message)),
                      t.abrupt('return', !1)
                    );
                  case 16:
                  case 'end':
                    return t.stop();
                }
            },
            t,
            null,
            [[0, 12]]
          );
        })
      );
      return function (e) {
        return t.apply(this, arguments);
      };
    })(),
    z = (function () {
      var t = j(
        E().mark(function t() {
          var e, n, r;
          return E().wrap(
            function (t) {
              for (;;)
                switch ((t.prev = t.next)) {
                  case 0:
                    return (
                      (e = document.createElement('loading-indicator')),
                      document.body.appendChild(e),
                      (t.prev = 2),
                      (t.next = 5),
                      fetch('https://notes-api.dicoding.dev/v2/notes')
                    );
                  case 5:
                    if ((n = t.sent).ok) {
                      t.next = 8;
                      break;
                    }
                    throw new Error('Gagal memuat catatan');
                  case 8:
                    return (t.next = 10), n.json();
                  case 10:
                    return (r = t.sent), t.abrupt('return', r.data);
                  case 14:
                    return (
                      (t.prev = 14),
                      (t.t0 = t.catch(2)),
                      alert('Terjadi kesalahan: '.concat(t.t0.message)),
                      t.abrupt('return', [])
                    );
                  case 18:
                    return (
                      (t.prev = 18), document.body.removeChild(e), t.finish(18)
                    );
                  case 21:
                  case 'end':
                    return t.stop();
                }
            },
            t,
            null,
            [[2, 14, 18, 21]]
          );
        })
      );
      return function () {
        return t.apply(this, arguments);
      };
    })();
  document.addEventListener(
    'DOMContentLoaded',
    j(
      E().mark(function t() {
        var e, n, r;
        return E().wrap(function (t) {
          for (;;)
            switch ((t.prev = t.next)) {
              case 0:
                return (
                  (e = document.querySelector('notes-list')),
                  (n = document.querySelector('note-form')),
                  (t.next = 4),
                  z()
                );
              case 4:
                (r = t.sent),
                  (e.notes = r),
                  n.addEventListener('note-added', function (t) {
                    var n;
                    (r = [].concat(
                      (function (t) {
                        if (Array.isArray(t)) return x(t);
                      })((n = r)) ||
                        (function (t) {
                          if (
                            ('undefined' != typeof Symbol &&
                              null != t[Symbol.iterator]) ||
                            null != t['@@iterator']
                          )
                            return Array.from(t);
                        })(n) ||
                        (function (t, e) {
                          if (t) {
                            if ('string' == typeof t) return x(t, e);
                            var n = {}.toString.call(t).slice(8, -1);
                            return (
                              'Object' === n &&
                                t.constructor &&
                                (n = t.constructor.name),
                              'Map' === n || 'Set' === n
                                ? Array.from(t)
                                : 'Arguments' === n ||
                                    /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(
                                      n
                                    )
                                  ? x(t, e)
                                  : void 0
                            );
                          }
                        })(n) ||
                        (function () {
                          throw new TypeError(
                            'Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
                          );
                        })(),
                      [t.detail]
                    )),
                      (e.notes = r);
                  }),
                  e.addEventListener(
                    'note-deleted',
                    (function () {
                      var t = j(
                        E().mark(function t(n) {
                          return E().wrap(function (t) {
                            for (;;)
                              switch ((t.prev = t.next)) {
                                case 0:
                                  return (t.next = 2), F(n.detail);
                                case 2:
                                  t.sent &&
                                    ((r = r.filter(function (t) {
                                      return t.id !== n.detail;
                                    })),
                                    (e.notes = r));
                                case 4:
                                case 'end':
                                  return t.stop();
                              }
                          }, t);
                        })
                      );
                      return function (e) {
                        return t.apply(this, arguments);
                      };
                    })()
                  ),
                  e.addEventListener(
                    'note-archived',
                    (function () {
                      var t = j(
                        E().mark(function t(n) {
                          return E().wrap(function (t) {
                            for (;;)
                              switch ((t.prev = t.next)) {
                                case 0:
                                  return (t.next = 2), N(n.detail);
                                case 2:
                                  t.sent &&
                                    ((r = r.map(function (t) {
                                      return t.id === n.detail
                                        ? g(g({}, t), {}, { archived: !0 })
                                        : t;
                                    })),
                                    (e.notes = r));
                                case 4:
                                case 'end':
                                  return t.stop();
                              }
                          }, t);
                        })
                      );
                      return function (e) {
                        return t.apply(this, arguments);
                      };
                    })()
                  ),
                  e.addEventListener(
                    'note-unarchived',
                    (function () {
                      var t = j(
                        E().mark(function t(n) {
                          return E().wrap(function (t) {
                            for (;;)
                              switch ((t.prev = t.next)) {
                                case 0:
                                  return (t.next = 2), D(n.detail);
                                case 2:
                                  t.sent &&
                                    ((r = r.map(function (t) {
                                      return t.id === n.detail
                                        ? g(g({}, t), {}, { archived: !1 })
                                        : t;
                                    })),
                                    (e.notes = r));
                                case 4:
                                case 'end':
                                  return t.stop();
                              }
                          }, t);
                        })
                      );
                      return function (e) {
                        return t.apply(this, arguments);
                      };
                    })()
                  );
              case 10:
              case 'end':
                return t.stop();
            }
        }, t);
      })
    )
  );
})();
