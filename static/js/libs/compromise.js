var e, t;
e = this, t = function() {
	var e = {
		methods: {
			one: {},
			two: {},
			three: {},
			four: {}
		},
		model: {
			one: {},
			two: {},
			three: {}
		},
		compute: {},
		hooks: []
	};
	const t = {
		compute: function(e) {
			const {
				world: t
			} = this, n = t.compute;
			return "string" == typeof e && n.hasOwnProperty(e) ? n[e](this) : (e => "[object Array]" === Object.prototype.toString.call(e))(e) ? e.forEach((r => {
				t.compute.hasOwnProperty(r) ? n[r](this) : console.warn("no compute:", e)
			})) : "function" == typeof e ? e(this) : console.warn("no compute:", e), this
		}
	};
	var n = t,
		r = {
			forEach: function(e) {
				return this.fullPointer.forEach(((t, n) => {
					let r = this.update([t]);
					e(r, n)
				})), this
			},
			map: function(e, t) {
				let n = this.fullPointer.map(((t, n) => {
					let r = this.update([t]),
						a = e(r, n);
					return void 0 === a ? this.none() : a
				}));
				if (0 === n.length) return t || this.update([]);
				if (void 0 !== n[0]) {
					if ("string" == typeof n[0]) return n;
					if ("object" == typeof n[0] && (null === n[0] || !n[0].isView)) return n
				}
				let r = [];
				return n.forEach((e => {
					r = r.concat(e.fullPointer)
				})), this.toView(r)
			},
			filter: function(e) {
				let t = this.fullPointer;
				return t = t.filter(((t, n) => {
					let r = this.update([t]);
					return e(r, n)
				})), this.update(t)
			},
			find: function(e) {
				let t = this.fullPointer.find(((t, n) => {
					let r = this.update([t]);
					return e(r, n)
				}));
				return this.update([t])
			},
			some: function(e) {
				return this.fullPointer.some(((t, n) => {
					let r = this.update([t]);
					return e(r, n)
				}))
			},
			random: function(e = 1) {
				let t = this.fullPointer,
					n = Math.floor(Math.random() * t.length);
				return n + e > this.length && (n = this.length - e, n = n < 0 ? 0 : n), t = t.slice(n, n + e), this.update(t)
			}
		};
	const a = {
		termList: function() {
			return this.methods.one.termList(this.docs)
		},
		terms: function(e) {
			let t = this.match(".");
			return "number" == typeof e ? t.eq(e) : t
		},
		groups: function(e) {
			if (e || 0 === e) return this.update(this._groups[e] || []);
			let t = {};
			return Object.keys(this._groups).forEach((e => {
				t[e] = this.update(this._groups[e])
			})), t
		},
		eq: function(e) {
			let t = this.pointer;
			return t || (t = this.docs.map(((e, t) => [t]))), t[e] ? this.update([t[e]]) : this.none()
		},
		first: function() {
			return this.eq(0)
		},
		last: function() {
			let e = this.fullPointer.length - 1;
			return this.eq(e)
		},
		firstTerms: function() {
			return this.match("^.")
		},
		lastTerms: function() {
			return this.match(".$")
		},
		slice: function(e, t) {
			let n = this.pointer || this.docs.map(((e, t) => [t]));
			return n = n.slice(e, t), this.update(n)
		},
		all: function() {
			return this.update().toView()
		},
		fullSentences: function() {
			let e = this.fullPointer.map((e => [e[0]]));
			return this.update(e).toView()
		},
		none: function() {
			return this.update([])
		},
		isDoc: function(e) {
			if (!e || !e.isView) return !1;
			let t = this.fullPointer,
				n = e.fullPointer;
			return !t.length !== n.length && t.every(((e, t) => !!n[t] && e[0] === n[t][0] && e[1] === n[t][1] && e[2] === n[t][2]))
		},
		wordCount: function() {
			return this.docs.reduce(((e, t) => (e += t.filter((e => "" !== e.text)).length, e)), 0)
		},
		isFull: function() {
			let e = this.pointer;
			if (!e) return !0;
			if (0 === e.length || 0 !== e[0][0]) return !1;
			let t = 0,
				n = 0;
			return this.document.forEach((e => t += e.length)), this.docs.forEach((e => n += e.length)), t === n
		},
		getNth: function(e) {
			return "number" == typeof e ? this.eq(e) : "string" == typeof e ? this.if(e) : this
		}
	};
	a.group = a.groups, a.fullSentence = a.fullSentences, a.sentence = a.fullSentences, a.lastTerm = a.lastTerms, a.firstTerm = a.firstTerms;
	var o = a;
	const i = Object.assign({}, o, n, r);
	i.get = i.eq;
	var s = i;
	class View {
		constructor(t, n, r = {}) {
			[
				["document", t],
				["world", e],
				["_groups", r],
				["_cache", null],
				["viewType", "View"]
			].forEach((e => {
				Object.defineProperty(this, e[0], {
					value: e[1],
					writable: !0
				})
			})), this.ptrs = n
		}
		get docs() {
			let t = this.document;
			return this.ptrs && (t = e.methods.one.getDoc(this.ptrs, this.document)), t
		}
		get pointer() {
			return this.ptrs
		}
		get methods() {
			return this.world.methods
		}
		get model() {
			return this.world.model
		}
		get hooks() {
			return this.world.hooks
		}
		get isView() {
			return !0
		}
		get found() {
			return this.docs.length > 0
		}
		get length() {
			return this.docs.length
		}
		get fullPointer() {
			let {
				docs: e,
				ptrs: t,
				document: n
			} = this, r = t || e.map(((e, t) => [t]));
			return r.map((e => {
				let [t, r, a, o, i] = e;
				return r = r || 0, a = a || (n[t] || []).length, n[t] && n[t][r] && (o = o || n[t][r].id, n[t][a - 1] && (i = i || n[t][a - 1].id)), [t, r, a, o, i]
			}))
		}
		update(e) {
			let t = new View(this.document, e);
			if (this._cache && e && e.length > 0) {
				let n = [];
				e.forEach(((e, t) => {
					let [r, a, o] = e;
					(1 === e.length || 0 === a && this.document[r].length === o) && (n[t] = this._cache[r])
				})), n.length > 0 && (t._cache = n)
			}
			return t.world = this.world, t
		}
		toView(e) {
			return new View(this.document, e || this.pointer)
		}
		fromText(e) {
			const {
				methods: t
			} = this;
			let n = t.one.tokenize.fromString(e, this.world),
				r = new View(n);
			return r.world = this.world, r.compute(["normal", "freeze", "lexicon"]), this.world.compute.preTagger && r.compute("preTagger"), r.compute("unfreeze"), r
		}
		clone() {
			let e = this.document.slice(0);
			e = e.map((e => e.map((e => ((e = Object.assign({}, e)).tags = new Set(e.tags), e)))));
			let t = this.update(this.pointer);
			return t.document = e, t._cache = this._cache, t
		}
	}
	Object.assign(View.prototype, s);
	var l = View;
	const u = function(e) {
		return e && "object" == typeof e && !Array.isArray(e)
	};

	function c(e, t) {
		if (u(t))
			for (const n in t) u(t[n]) ? (e[n] || Object.assign(e, {
				[n]: {}
			}), c(e[n], t[n])) : Object.assign(e, {
				[n]: t[n]
			});
		return e
	}
	var h = function(e, t, n, r) {
		const {
			methods: a,
			model: o,
			compute: i,
			hooks: s
		} = t;
		e.methods && function(e, t) {
			for (const n in t) e[n] = e[n] || {}, Object.assign(e[n], t[n])
		}(a, e.methods), e.model && c(o, e.model), e.irregulars && function(e, t) {
			let n = e.two.models || {};
			Object.keys(t).forEach((e => {
				t[e].pastTense && (n.toPast && (n.toPast.ex[e] = t[e].pastTense), n.fromPast && (n.fromPast.ex[t[e].pastTense] = e)), t[e].presentTense && (n.toPresent && (n.toPresent.ex[e] = t[e].presentTense), n.fromPresent && (n.fromPresent.ex[t[e].presentTense] = e)), t[e].gerund && (n.toGerund && (n.toGerund.ex[e] = t[e].gerund), n.fromGerund && (n.fromGerund.ex[t[e].gerund] = e)), t[e].comparative && (n.toComparative && (n.toComparative.ex[e] = t[e].comparative), n.fromComparative && (n.fromComparative.ex[t[e].comparative] = e)), t[e].superlative && (n.toSuperlative && (n.toSuperlative.ex[e] = t[e].superlative), n.fromSuperlative && (n.fromSuperlative.ex[t[e].superlative] = e))
			}))
		}(o, e.irregulars), e.compute && Object.assign(i, e.compute), s && (t.hooks = s.concat(e.hooks || [])), e.api && e.api(n), e.lib && Object.keys(e.lib).forEach((t => r[t] = e.lib[t])), e.tags && r.addTags(e.tags), e.words && r.addWords(e.words), e.frozen && r.addWords(e.frozen, !0), e.mutate && e.mutate(t)
	};
	const d = function(e) {
		return "[object Array]" === Object.prototype.toString.call(e)
	};
	var m = function(e, t, n) {
		const {
			methods: r
		} = n;
		let a = new t([]);
		if (a.world = n, "number" == typeof e && (e = String(e)), !e) return a;
		if ("string" == typeof e) return new t(r.one.tokenize.fromString(e, n));
		if (o = e, "[object Object]" === Object.prototype.toString.call(o) && e.isView) return new t(e.document, e.ptrs);
		var o;
		if (d(e)) {
			if (d(e[0])) {
				let n = e.map((e => e.map((e => ({
					text: e,
					normal: e,
					pre: "",
					post: " ",
					tags: new Set
				})))));
				return new t(n)
			}
			let n = function(e) {
				return e.map((e => e.terms.map((e => (d(e.tags) && (e.tags = new Set(e.tags)), e)))))
			}(e);
			return new t(n)
		}
		return a
	};
	let p = Object.assign({}, e);
	const f = function(e, t) {
		t && f.addWords(t);
		let n = m(e, l, p);
		return e && n.compute(p.hooks), n
	};
	Object.defineProperty(f, "_world", {
		value: p,
		writable: !0
	}), f.tokenize = function(e, t) {
		const {
			compute: n
		} = this._world;
		t && f.addWords(t);
		let r = m(e, l, p);
		return n.contractions && r.compute(["alias", "normal", "machine", "contractions"]), r
	}, f.plugin = function(e) {
		return h(e, this._world, l, this), this
	}, f.extend = f.plugin, f.world = function() {
		return this._world
	}, f.model = function() {
		return this._world.model
	}, f.methods = function() {
		return this._world.methods
	}, f.hooks = function() {
		return this._world.hooks
	}, f.verbose = function(e) {
		const t = "undefined" != typeof process && process.env ? process.env : self.env || {};
		return t.DEBUG_TAGS = "tagger" === e || !0 === e || "", t.DEBUG_MATCH = "match" === e || !0 === e || "", t.DEBUG_CHUNKS = "chunker" === e || !0 === e || "", this
	}, f.version = "14.13.0";
	var v = f,
		b = function(e) {
			let t = e.map((e => {
				let t = new Set;
				return e.forEach((e => {
					"" !== e.normal && t.add(e.normal), e.switch && t.add(`%${e.switch}%`), e.implicit && t.add(e.implicit), e.machine && t.add(e.machine), e.root && t.add(e.root), e.alias && e.alias.forEach((e => t.add(e)));
					let n = Array.from(e.tags);
					for (let e = 0; e < n.length; e += 1) t.add("#" + n[e])
				})), t
			}));
			return t
		};
	const y = {
		cache: function() {
			return this._cache = this.methods.one.cacheDoc(this.document), this
		},
		uncache: function() {
			return this._cache = null, this
		}
	};
	var w = function(e) {
			Object.assign(e.prototype, y)
		},
		k = {
			api: w,
			compute: {
				cache: function(e) {
					e._cache = e.methods.one.cacheDoc(e.document)
				}
			},
			methods: {
				one: {
					cacheDoc: b
				}
			}
		};
	const P = e => /^\p{Lu}[\p{Ll}'’]/u.test(e) || /^\p{Lu}$/u.test(e),
		A = (e, t, n) => {
			if (n.forEach((e => e.dirty = !0)), e) {
				let r = [t, 0].concat(n);
				Array.prototype.splice.apply(e, r)
			}
			return e
		},
		C = function(e) {
			let t = e[e.length - 1];
			!t || / $/.test(t.post) || /[-–—]/.test(t.post) || (t.post += " ")
		},
		j = (e, t, n) => {
			const r = /[-.?!,;:)–—'"]/g;
			let a = e[t - 1];
			if (!a) return;
			let o = a.post;
			if (r.test(o)) {
				let e = o.match(r).join(""),
					t = n[n.length - 1];
				t.post = e + t.post, a.post = a.post.replace(r, "")
			}
		},
		N = function(e, t, n, r) {
			let [a, o, i] = t;
			0 === o || i === r[a].length ? C(n) : (C(n), C([e[t[1]]])),
				function(e, t, n) {
					let r = e[t];
					if (0 !== t || !P(r.text)) return;
					n[0].text = n[0].text.replace(/^\p{Ll}/u, (e => e.toUpperCase()));
					let a = e[t];
					a.tags.has("ProperNoun") || a.tags.has("Acronym") || P(a.text) && a.text.length > 1 && (a.text = a.text.replace(/^\p{Lu}/u, (e => e.toLowerCase())))
				}(e, o, n), A(e, o, n)
		};
	let x = 0;
	const I = e => (e = e.length < 3 ? "0" + e : e).length < 3 ? "0" + e : e;
	var T = function(e) {
		let [t, n] = e.index || [0, 0];
		x += 1, x = x > 46655 ? 0 : x, t = t > 46655 ? 0 : t, n = n > 1294 ? 0 : n;
		let r = I(x.toString(36));
		r += I(t.toString(36));
		let a = n.toString(36);
		return a = a.length < 2 ? "0" + a : a, r += a, r += parseInt(36 * Math.random(), 10).toString(36), e.normal + "|" + r.toUpperCase()
	};
	const D = function(e) {
			e.has("@hasContraction") && "function" == typeof e.contractions && e.grow("@hasContraction").contractions().expand()
		},
		H = e => "[object Array]" === Object.prototype.toString.call(e),
		G = function(e, t, n) {
			const {
				document: r,
				world: a
			} = t;
			t.uncache();
			let o = t.fullPointer,
				i = t.fullPointer;
			t.forEach(((s, l) => {
				let u = s.fullPointer[0],
					[c] = u,
					h = r[c],
					d = function(e, t) {
						const {
							methods: n
						} = t;
						return "string" == typeof e ? n.one.tokenize.fromString(e, t)[0] : "object" == typeof e && e.isView ? e.clone().docs[0] || [] : H(e) ? H(e[0]) ? e[0] : e : []
					}(e, a);
				0 !== d.length && (d = function(e) {
					return e.map((e => (e.id = T(e), e)))
				}(d), n ? (D(t.update([u]).firstTerm()), N(h, u, d, r)) : (D(t.update([u]).lastTerm()), function(e, t, n, r) {
					let [a, , o] = t, i = (r[a] || []).length;
					o < i ? (j(e, o, n), C(n)) : i === o && (C(e), j(e, o, n), r[a + 1] && (n[n.length - 1].post += " ")), A(e, t[2], n), t[4] = n[n.length - 1].id
				}(h, u, d, r)), r[c] && r[c][u[1]] && (u[3] = r[c][u[1]].id), i[l] = u, u[2] += d.length, o[l] = u)
			}));
			let s = t.toView(o);
			return t.ptrs = i, s.compute(["id", "index", "freeze", "lexicon"]), s.world.compute.preTagger && s.compute("preTagger"), s.compute("unfreeze"), s
		},
		E = {
			insertAfter: function(e) {
				return G(e, this, !1)
			},
			insertBefore: function(e) {
				return G(e, this, !0)
			}
		};
	E.append = E.insertAfter, E.prepend = E.insertBefore, E.insert = E.insertAfter;
	var O = E;
	const F = /\$[0-9a-z]+/g,
		V = {
			replaceWith: function(e, t = {}) {
				let n = this.fullPointer,
					r = this;
				if (this.uncache(), "function" == typeof e) return function(e, t) {
					return e.forEach((e => {
						let n = t(e);
						e.replaceWith(n)
					})), e
				}(r, e);
				let a = r.docs[0],
					o = t.possessives && a[a.length - 1].tags.has("Possessive");
				e = function(e, t) {
					if ("string" != typeof e) return e;
					let n = t.groups();
					return e = e.replace(F, (e => {
						let t = e.replace(/\$/, "");
						return n.hasOwnProperty(t) ? n[t].text() : e
					})), e
				}(e, r);
				let i = this.update(n);
				n = n.map((e => e.slice(0, 3)));
				let s = (i.docs[0] || []).map((e => Array.from(e.tags)));
				if ("string" == typeof e && (e = this.fromText(e).compute("id")), r.insertAfter(e), i.has("@hasContraction") && r.contractions && r.grow("@hasContraction+").contractions().expand(), r.delete(i), o) {
					let e = r.docs[0],
						t = e[e.length - 1];
					t.tags.has("Possessive") || (t.text += "'s", t.normal += "'s", t.tags.add("Possessive"))
				}
				let l = r.toView(n).compute(["index", "freeze", "lexicon"]);
				return l.world.compute.preTagger && l.compute("preTagger"), l.compute("unfreeze"), t.tags && l.terms().forEach(((e, t) => {
					e.tagSafe(s[t])
				})), t.case && l.docs[0] && l.docs[0][0] && 0 === l.docs[0][0].index[1] && (l.docs[0][0].text = l.docs[0][0].text.replace(/\w\S*/g, (e => e.charAt(0).toUpperCase() + e.substring(1).toLowerCase()))), l
			},
			replace: function(e, t, n) {
				if (e && !t) return this.replaceWith(e, n);
				let r = this.match(e);
				return r.found ? (this.soften(), r.replaceWith(t, n)) : this
			}
		};
	var z = V,
		B = function(e, t) {
			t.forEach((t => {
				let [n, r, a] = t, o = a - r;
				e[n] && (a === e[n].length && a > 1 && function(e, t) {
					let n = e.length - 1,
						r = e[n],
						a = e[n - t];
					a && r && (a.post += r.post, a.post = a.post.replace(/ +([.?!,;:])/, "$1"), a.post = a.post.replace(/[,;:]+([.?!])/, "$1"))
				}(e[n], o), e[n].splice(r, o))
			}));
			for (let t = e.length - 1; t >= 0; t -= 1)
				if (0 === e[t].length && (e.splice(t, 1), t === e.length && e[t - 1])) {
					let n = e[t - 1],
						r = n[n.length - 1];
					r && (r.post = r.post.trimEnd())
				} return e
		};
	const $ = {
		remove: function(e) {
			const {
				indexN: t
			} = this.methods.one.pointer;
			this.uncache();
			let n = this.all(),
				r = this;
			e && (n = this, r = this.match(e));
			let a = !n.ptrs;
			r.has("@hasContraction") && r.contractions && r.grow("@hasContraction").contractions().expand();
			let o = n.fullPointer,
				i = r.fullPointer.reverse(),
				s = B(this.document, i);
			return o = function(e, t) {
				return e = e.map((e => {
					let [n] = e;
					return t[n] ? (t[n].forEach((t => {
						let n = t[2] - t[1];
						e[1] <= t[1] && e[2] >= t[2] && (e[2] -= n)
					})), e) : e
				})), e.forEach(((t, n) => {
					if (0 === t[1] && 0 == t[2])
						for (let t = n + 1; t < e.length; t += 1) e[t][0] -= 1, e[t][0] < 0 && (e[t][0] = 0)
				})), e = (e = e.filter((e => e[2] - e[1] > 0))).map((e => (e[3] = null, e[4] = null, e)))
			}(o, t(i)), n.ptrs = o, n.document = s, n.compute("index"), a && (n.ptrs = void 0), e ? n.toView(o) : (this.ptrs = [], n.none())
		}
	};
	$.delete = $.remove;
	var S = $;
	const K = {
		pre: function(e, t) {
			return void 0 === e && this.found ? this.docs[0][0].pre : (this.docs.forEach((n => {
				let r = n[0];
				!0 === t ? r.pre += e : r.pre = e
			})), this)
		},
		post: function(e, t) {
			if (void 0 === e) {
				let e = this.docs[this.docs.length - 1];
				return e[e.length - 1].post
			}
			return this.docs.forEach((n => {
				let r = n[n.length - 1];
				!0 === t ? r.post += e : r.post = e
			})), this
		},
		trim: function() {
			if (!this.found) return this;
			let e = this.docs,
				t = e[0][0];
			t.pre = t.pre.trimStart();
			let n = e[e.length - 1],
				r = n[n.length - 1];
			return r.post = r.post.trimEnd(), this
		},
		hyphenate: function() {
			return this.docs.forEach((e => {
				e.forEach(((t, n) => {
					0 !== n && (t.pre = ""), e[n + 1] && (t.post = "-")
				}))
			})), this
		},
		dehyphenate: function() {
			const e = /[-–—]/;
			return this.docs.forEach((t => {
				t.forEach((t => {
					e.test(t.post) && (t.post = " ")
				}))
			})), this
		},
		toQuotations: function(e, t) {
			return e = e || '"', t = t || '"', this.docs.forEach((n => {
				n[0].pre = e + n[0].pre;
				let r = n[n.length - 1];
				r.post = t + r.post
			})), this
		},
		toParentheses: function(e, t) {
			return e = e || "(", t = t || ")", this.docs.forEach((n => {
				n[0].pre = e + n[0].pre;
				let r = n[n.length - 1];
				r.post = t + r.post
			})), this
		}
	};
	K.deHyphenate = K.dehyphenate, K.toQuotation = K.toQuotations;
	var M = K,
		L = {
			alpha: (e, t) => e.normal < t.normal ? -1 : e.normal > t.normal ? 1 : 0,
			length: (e, t) => {
				let n = e.normal.trim().length,
					r = t.normal.trim().length;
				return n < r ? 1 : n > r ? -1 : 0
			},
			wordCount: (e, t) => e.words < t.words ? 1 : e.words > t.words ? -1 : 0,
			sequential: (e, t) => e[0] < t[0] ? 1 : e[0] > t[0] ? -1 : e[1] > t[1] ? 1 : -1,
			byFreq: function(e) {
				let t = {};
				return e.forEach((e => {
					t[e.normal] = t[e.normal] || 0, t[e.normal] += 1
				})), e.sort(((e, n) => {
					let r = t[e.normal],
						a = t[n.normal];
					return r < a ? 1 : r > a ? -1 : 0
				})), e
			}
		};
	const J = new Set(["index", "sequence", "seq", "sequential", "chron", "chronological"]),
		W = new Set(["freq", "frequency", "topk", "repeats"]),
		q = new Set(["alpha", "alphabetical"]);
	var U = {
		unique: function() {
			let e = new Set,
				t = this.filter((t => {
					let n = t.text("machine");
					return !e.has(n) && (e.add(n), !0)
				}));
			return t
		},
		reverse: function() {
			let e = this.pointer || this.docs.map(((e, t) => [t]));
			return e = [].concat(e), e = e.reverse(), this._cache && (this._cache = this._cache.reverse()), this.update(e)
		},
		sort: function(e) {
			let {
				docs: t,
				pointer: n
			} = this;
			if (this.uncache(), "function" == typeof e) return function(e, t) {
				let n = e.fullPointer;
				return n = n.sort(((n, r) => (n = e.update([n]), r = e.update([r]), t(n, r)))), e.ptrs = n, e
			}(this, e);
			e = e || "alpha";
			let r = n || t.map(((e, t) => [t])),
				a = t.map(((e, t) => ({
					index: t,
					words: e.length,
					normal: e.map((e => e.machine || e.normal || "")).join(" "),
					pointer: r[t]
				})));
			return J.has(e) && (e = "sequential"), q.has(e) && (e = "alpha"), W.has(e) ? (a = L.byFreq(a), this.update(a.map((e => e.pointer)))) : "function" == typeof L[e] ? (a = a.sort(L[e]), this.update(a.map((e => e.pointer)))) : this
		}
	};
	const R = function(e, t) {
		if (e.length > 0) {
			let t = e[e.length - 1],
				n = t[t.length - 1];
			!1 === / /.test(n.post) && (n.post += " ")
		}
		return e = e.concat(t)
	};
	var Q = {
			concat: function(e) {
				if ("string" == typeof e) {
					let t = this.fromText(e);
					if (this.found && this.ptrs) {
						let e = this.fullPointer,
							n = e[e.length - 1][0];
						this.document.splice(n, 0, ...t.document)
					} else this.document = this.document.concat(t.document);
					return this.all().compute("index")
				}
				if ("object" == typeof e && e.isView) return function(e, t) {
					if (e.document === t.document) {
						let n = e.fullPointer.concat(t.fullPointer);
						return e.toView(n).compute("index")
					}
					return t.fullPointer.forEach((t => {
						t[0] += e.document.length
					})), e.document = R(e.document, t.docs), e.all()
				}(this, e);
				if (t = e, "[object Array]" === Object.prototype.toString.call(t)) {
					let t = R(this.document, e);
					return this.document = t, this.all()
				}
				var t;
				return this
			}
		},
		_ = {
			harden: function() {
				return this.ptrs = this.fullPointer, this
			},
			soften: function() {
				let e = this.ptrs;
				return !e || e.length < 1 || (e = e.map((e => e.slice(0, 3))), this.ptrs = e), this
			}
		};
	const Z = Object.assign({}, {
		toLowerCase: function() {
			return this.termList().forEach((e => {
				e.text = e.text.toLowerCase()
			})), this
		},
		toUpperCase: function() {
			return this.termList().forEach((e => {
				e.text = e.text.toUpperCase()
			})), this
		},
		toTitleCase: function() {
			return this.termList().forEach((e => {
				e.text = e.text.replace(/^ *[a-z\u00C0-\u00FF]/, (e => e.toUpperCase()))
			})), this
		},
		toCamelCase: function() {
			return this.docs.forEach((e => {
				e.forEach(((t, n) => {
					0 !== n && (t.text = t.text.replace(/^ *[a-z\u00C0-\u00FF]/, (e => e.toUpperCase()))), n !== e.length - 1 && (t.post = "")
				}))
			})), this
		}
	}, O, z, S, M, U, Q, _);
	var X = function(e) {
		Object.assign(e.prototype, Z)
	};
	const Y = {
		id: function(e) {
			let t = e.docs;
			for (let e = 0; e < t.length; e += 1)
				for (let n = 0; n < t[e].length; n += 1) {
					let r = t[e][n];
					r.id = r.id || T(r)
				}
		}
	};
	var ee = {
		api: X,
		compute: Y
	};
	const te = !0;
	var ne = {
			one: {
				contractions: [{
					word: "@",
					out: ["at"]
				}, {
					word: "arent",
					out: ["are", "not"]
				}, {
					word: "alot",
					out: ["a", "lot"]
				}, {
					word: "brb",
					out: ["be", "right", "back"]
				}, {
					word: "cannot",
					out: ["can", "not"]
				}, {
					word: "dun",
					out: ["do", "not"]
				}, {
					word: "can't",
					out: ["can", "not"]
				}, {
					word: "shan't",
					out: ["should", "not"]
				}, {
					word: "won't",
					out: ["will", "not"]
				}, {
					word: "that's",
					out: ["that", "is"]
				}, {
					word: "what's",
					out: ["what", "is"]
				}, {
					word: "let's",
					out: ["let", "us"]
				}, {
					word: "dunno",
					out: ["do", "not", "know"]
				}, {
					word: "gonna",
					out: ["going", "to"]
				}, {
					word: "gotta",
					out: ["have", "got", "to"]
				}, {
					word: "gimme",
					out: ["give", "me"]
				}, {
					word: "outta",
					out: ["out", "of"]
				}, {
					word: "tryna",
					out: ["trying", "to"]
				}, {
					word: "gtg",
					out: ["got", "to", "go"]
				}, {
					word: "im",
					out: ["i", "am"]
				}, {
					word: "imma",
					out: ["I", "will"]
				}, {
					word: "imo",
					out: ["in", "my", "opinion"]
				}, {
					word: "irl",
					out: ["in", "real", "life"]
				}, {
					word: "ive",
					out: ["i", "have"]
				}, {
					word: "rn",
					out: ["right", "now"]
				}, {
					word: "tbh",
					out: ["to", "be", "honest"]
				}, {
					word: "wanna",
					out: ["want", "to"]
				}, {
					word: "c'mere",
					out: ["come", "here"]
				}, {
					word: "c'mon",
					out: ["come", "on"]
				}, {
					word: "shoulda",
					out: ["should", "have"]
				}, {
					word: "coulda",
					out: ["coulda", "have"]
				}, {
					word: "woulda",
					out: ["woulda", "have"]
				}, {
					word: "musta",
					out: ["must", "have"]
				}, {
					word: "tis",
					out: ["it", "is"]
				}, {
					word: "twas",
					out: ["it", "was"]
				}, {
					word: "y'know",
					out: ["you", "know"]
				}, {
					word: "ne'er",
					out: ["never"]
				}, {
					word: "o'er",
					out: ["over"]
				}, {
					after: "ll",
					out: ["will"]
				}, {
					after: "ve",
					out: ["have"]
				}, {
					after: "re",
					out: ["are"]
				}, {
					after: "m",
					out: ["am"]
				}, {
					before: "c",
					out: ["ce"]
				}, {
					before: "m",
					out: ["me"]
				}, {
					before: "n",
					out: ["ne"]
				}, {
					before: "qu",
					out: ["que"]
				}, {
					before: "s",
					out: ["se"]
				}, {
					before: "t",
					out: ["tu"]
				}, {
					word: "shouldnt",
					out: ["should", "not"]
				}, {
					word: "couldnt",
					out: ["could", "not"]
				}, {
					word: "wouldnt",
					out: ["would", "not"]
				}, {
					word: "hasnt",
					out: ["has", "not"]
				}, {
					word: "wasnt",
					out: ["was", "not"]
				}, {
					word: "isnt",
					out: ["is", "not"]
				}, {
					word: "cant",
					out: ["can", "not"]
				}, {
					word: "dont",
					out: ["do", "not"]
				}, {
					word: "wont",
					out: ["will", "not"]
				}, {
					word: "howd",
					out: ["how", "did"]
				}, {
					word: "whatd",
					out: ["what", "did"]
				}, {
					word: "whend",
					out: ["when", "did"]
				}, {
					word: "whered",
					out: ["where", "did"]
				}],
				numberSuffixes: {
					st: te,
					nd: te,
					rd: te,
					th: te,
					am: te,
					pm: te,
					max: te,
					"°": te,
					s: te,
					e: te,
					er: te,
					"ère": te,
					"ème": te
				}
			}
		},
		re = function(e, t, n) {
			let [r, a] = t;
			n && 0 !== n.length && (n = n.map(((e, t) => (e.implicit = e.text, e.machine = e.text, e.pre = "", e.post = "", e.text = "", e.normal = "", e.index = [r, a + t], e))), n[0] && (n[0].pre = e[r][a].pre, n[n.length - 1].post = e[r][a].post, n[0].text = e[r][a].text, n[0].normal = e[r][a].normal), e[r].splice(a, 1, ...n))
		};
	const ae = /'/,
		oe = new Set(["what", "how", "when", "where", "why"]),
		ie = new Set(["be", "go", "start", "think", "need"]),
		se = new Set(["been", "gone"]);
	var le = function(e, t) {
			let n = e[t].normal.split(ae)[0];
			if (oe.has(n)) return [n, "did"];
			if (e[t + 1]) {
				if (se.has(e[t + 1].normal)) return [n, "had"];
				if (ie.has(e[t + 1].normal)) return [n, "would"]
			}
			return null
		},
		ue = function(e, t) {
			return "ain't" === e[t].normal || "aint" === e[t].normal ? null : [e[t].normal.replace(/n't/, ""), "not"]
		};
	const ce = /'/,
		he = /(e|é|aison|sion|tion)$/,
		de = /(age|isme|acle|ege|oire)$/;
	var ge = (e, t) => ["je", e[t].normal.split(ce)[1]],
		me = (e, t) => {
			let n = e[t].normal.split(ce)[1];
			return n && n.endsWith("e") ? ["la", n] : ["le", n]
		},
		pe = (e, t) => {
			let n = e[t].normal.split(ce)[1];
			return n && he.test(n) && !de.test(n) ? ["du", n] : n && n.endsWith("s") ? ["des", n] : ["de", n]
		};
	const fe = /^([0-9.]{1,4}[a-z]{0,2}) ?[-–—] ?([0-9]{1,4}[a-z]{0,2})$/i,
		ve = /^([0-9]{1,2}(:[0-9][0-9])?(am|pm)?) ?[-–—] ?([0-9]{1,2}(:[0-9][0-9])?(am|pm)?)$/i,
		be = /^[0-9]{3}-[0-9]{4}$/;
	var ye = function(e, t) {
		let n = e[t],
			r = n.text.match(fe);
		return null !== r ? !0 === n.tags.has("PhoneNumber") || be.test(n.text) ? null : [r[1], "to", r[2]] : (r = n.text.match(ve), null !== r ? [r[1], "to", r[4]] : null)
	};
	const we = /^([+-]?[0-9][.,0-9]*)([a-z°²³µ/]+)$/;
	var ke = function(e, t, n) {
		const r = n.model.one.numberSuffixes || {};
		let a = e[t].text.match(we);
		if (null !== a) {
			let e = a[2].toLowerCase().trim();
			return r.hasOwnProperty(e) ? null : [a[1], e]
		}
		return null
	};
	const Pe = /'/,
		Ae = /^[0-9][^-–—]*[-–—].*?[0-9]/,
		Ce = function(e, t, n, r) {
			let a = t.update();
			a.document = [e];
			let o = n + r;
			n > 0 && (n -= 1), e[o] && (o += 1), a.ptrs = [
				[0, n, o]
			]
		},
		je = {
			t: (e, t) => ue(e, t),
			d: (e, t) => le(e, t)
		},
		Ne = {
			j: (e, t) => ge(e, t),
			l: (e, t) => me(e, t),
			d: (e, t) => pe(e, t)
		},
		xe = function(e, t, n, r) {
			for (let a = 0; a < e.length; a += 1) {
				let o = e[a];
				if (o.word === t.normal) return o.out;
				if (null !== r && r === o.after) return [n].concat(o.out);
				if (null !== n && n === o.before && r && r.length > 2) return o.out.concat(r)
			}
			return null
		},
		Ie = function(e, t) {
			let n = t.fromText(e.join(" "));
			return n.compute(["id", "alias"]), n.docs[0]
		},
		Te = function(e, t) {
			for (let n = t + 1; n < 5 && e[n]; n += 1)
				if ("been" === e[n].normal) return ["there", "has"];
			return ["there", "is"]
		};
	var De = e => {
			let {
				world: t,
				document: n
			} = e;
			const {
				model: r,
				methods: a
			} = t;
			let o = r.one.contractions || [];
			n.forEach(((r, i) => {
				for (let s = r.length - 1; s >= 0; s -= 1) {
					let l = null,
						u = null;
					if (!0 === Pe.test(r[s].normal)) {
						let e = r[s].normal.split(Pe);
						l = e[0], u = e[1]
					}
					let c = xe(o, r[s], l, u);
					!c && je.hasOwnProperty(u) && (c = je[u](r, s, t)), !c && Ne.hasOwnProperty(l) && (c = Ne[l](r, s)), "there" === l && "s" === u && (c = Te(r, s)), c ? (c = Ie(c, e), re(n, [i, s], c), Ce(n[i], e, s, c.length)) : Ae.test(r[s].normal) ? (c = ye(r, s), c && (c = Ie(c, e), re(n, [i, s], c), a.one.setTag(c, "NumberRange", t), c[2] && c[2].tags.has("Time") && a.one.setTag([c[0]], "Time", t, null, "time-range"), Ce(n[i], e, s, c.length))) : (c = ke(r, s, t), c && (c = Ie(c, e), re(n, [i, s], c), a.one.setTag([c[1]], "Unit", t, null, "contraction-unit")))
				}
			}))
		},
		He = {
			model: ne,
			compute: {
				contractions: De
			},
			hooks: ["contractions"]
		};
	const Ge = function(e) {
			const t = e.world,
				{
					model: n,
					methods: r
				} = e.world,
				a = r.one.setTag,
				{
					frozenLex: o
				} = n.one,
				i = n.one._multiCache || {};
			e.docs.forEach((e => {
				for (let n = 0; n < e.length; n += 1) {
					let r = e[n],
						s = r.machine || r.normal;
					if (void 0 !== i[s] && e[n + 1])
						for (let r = n + i[s] - 1; r > n; r -= 1) {
							let i = e.slice(n, r + 1),
								s = i.map((e => e.machine || e.normal)).join(" ");
							!0 !== o.hasOwnProperty(s) || (a(i, o[s], t, !1, "1-frozen-multi-lexicon"), i.forEach((e => e.frozen = !0)))
						}
					void 0 !== o[s] && o.hasOwnProperty(s) && (a([r], o[s], t, !1, "1-freeze-lexicon"), r.frozen = !0)
				}
			}))
		},
		Ee = e => "[34m" + e + "[0m",
		Oe = e => "[3m[2m" + e + "[0m";
	var Fe = function(e) {
			e.docs.forEach((e => {
				console.log(Ee("\n  ┌─────────")), e.forEach((e => {
					let t = `  ${Oe("│")}  `,
						n = e.implicit || e.text || "-";
					!0 === e.frozen ? t += `${Ee(n)} ❄️` : t += Oe(n), console.log(t)
				}))
			}))
		},
		Ve = {
			compute: {
				frozen: Ge,
				freeze: Ge,
				unfreeze: function(e) {
					return e.docs.forEach((e => {
						e.forEach((e => {
							delete e.frozen
						}))
					})), e
				}
			},
			mutate: e => {
				const t = e.methods.one;
				t.termMethods.isFrozen = e => !0 === e.frozen, t.debug.freeze = Fe, t.debug.frozen = Fe
			},
			api: function(e) {
				e.prototype.freeze = function() {
					return this.docs.forEach((e => {
						e.forEach((e => {
							e.frozen = !0
						}))
					})), this
				}, e.prototype.unfreeze = function() {
					this.compute("unfreeze")
				}, e.prototype.isFrozen = function() {
					return this.match("@isFrozen+")
				}
			},
			hooks: ["freeze"]
		},
		ze = function(e, t, n) {
			const {
				model: r,
				methods: a
			} = n, o = a.one.setTag, i = r.one._multiCache || {}, {
				lexicon: s
			} = r.one || {};
			let l = e[t],
				u = l.machine || l.normal;
			if (void 0 !== i[u] && e[t + 1]) {
				for (let r = t + i[u] - 1; r > t; r -= 1) {
					let a = e.slice(t, r + 1);
					if (a.length <= 1) return !1;
					let i = a.map((e => e.machine || e.normal)).join(" ");
					if (!0 === s.hasOwnProperty(i)) {
						let e = s[i];
						return o(a, e, n, !1, "1-multi-lexicon"), !e || 2 !== e.length || "PhrasalVerb" !== e[0] && "PhrasalVerb" !== e[1] || o([a[1]], "Particle", n, !1, "1-phrasal-particle"), !0
					}
				}
				return !1
			}
			return null
		};
	const Be = /^(under|over|mis|re|un|dis|semi|pre|post)-?/,
		$e = new Set(["Verb", "Infinitive", "PastTense", "Gerund", "PresentTense", "Adjective", "Participle"]);
	var Se = function(e, t, n) {
			const {
				model: r,
				methods: a
			} = n, o = a.one.setTag, {
				lexicon: i
			} = r.one;
			let s = e[t],
				l = s.machine || s.normal;
			if (void 0 !== i[l] && i.hasOwnProperty(l)) return o([s], i[l], n, !1, "1-lexicon"), !0;
			if (s.alias) {
				let e = s.alias.find((e => i.hasOwnProperty(e)));
				if (e) return o([s], i[e], n, !1, "1-lexicon-alias"), !0
			}
			if (!0 === Be.test(l)) {
				let e = l.replace(Be, "");
				if (i.hasOwnProperty(e) && e.length > 3 && $e.has(i[e])) return o([s], i[e], n, !1, "1-lexicon-prefix"), !0
			}
			return null
		},
		Ke = {
			lexicon: function(e) {
				const t = e.world;
				e.docs.forEach((e => {
					for (let n = 0; n < e.length; n += 1)
						if (0 === e[n].tags.size) {
							let r = null;
							r = r || ze(e, n, t), r = r || Se(e, n, t)
						}
				}))
			}
		},
		Me = function(e) {
			let t = {},
				n = {};
			return Object.keys(e).forEach((r => {
				let a = e[r],
					o = (r = (r = r.toLowerCase().trim()).replace(/'s\b/, "")).split(/ /);
				o.length > 1 && (void 0 === n[o[0]] || o.length > n[o[0]]) && (n[o[0]] = o.length), t[r] = t[r] || a
			})), delete t[""], delete t.null, delete t[" "], {
				lex: t,
				_multi: n
			}
		},
		Le = {
			addWords: function(e, t = !1) {
				const n = this.world(),
					{
						methods: r,
						model: a
					} = n;
				if (!e) return;
				if (Object.keys(e).forEach((t => {
						"string" == typeof e[t] && e[t].startsWith("#") && (e[t] = e[t].replace(/^#/, ""))
					})), !0 === t) {
					let {
						lex: t,
						_multi: o
					} = r.one.expandLexicon(e, n);
					return Object.assign(a.one._multiCache, o), void Object.assign(a.one.frozenLex, t)
				}
				if (r.two.expandLexicon) {
					let {
						lex: t,
						_multi: o
					} = r.two.expandLexicon(e, n);
					Object.assign(a.one.lexicon, t), Object.assign(a.one._multiCache, o)
				}
				let {
					lex: o,
					_multi: i
				} = r.one.expandLexicon(e, n);
				Object.assign(a.one.lexicon, o), Object.assign(a.one._multiCache, i)
			}
		},
		Je = {
			model: {
				one: {
					lexicon: {},
					_multiCache: {},
					frozenLex: {}
				}
			},
			methods: {
				one: {
					expandLexicon: Me
				}
			},
			compute: Ke,
			lib: Le,
			hooks: ["lexicon"]
		},
		We = function(e, t) {
			let n = [{}],
				r = [null],
				a = [0],
				o = [],
				i = 0;
			e.forEach((function(e) {
				let a = 0,
					o = function(e, t) {
						const {
							methods: n,
							model: r
						} = t;
						let a = n.one.tokenize.splitTerms(e, r).map((e => n.one.tokenize.splitWhitespace(e, r)));
						return a.map((e => e.text.toLowerCase()))
					}(e, t);
				for (let e = 0; e < o.length; e++) {
					let t = o[e];
					n[a] && n[a].hasOwnProperty(t) ? a = n[a][t] : (i++, n[a][t] = i, n[i] = {}, a = i, r[i] = null)
				}
				r[a] = [o.length]
			}));
			for (let e in n[0]) i = n[0][e], a[i] = 0, o.push(i);
			for (; o.length;) {
				let e = o.shift(),
					t = Object.keys(n[e]);
				for (let s = 0; s < t.length; s += 1) {
					let l = t[s],
						u = n[e][l];
					for (o.push(u), i = a[e]; i > 0 && !n[i].hasOwnProperty(l);) i = a[i];
					if (n.hasOwnProperty(i)) {
						let e = n[i][l];
						a[u] = e, r[e] && (r[u] = r[u] || [], r[u] = r[u].concat(r[e]))
					} else a[u] = 0
				}
			}
			return {
				goNext: n,
				endAs: r,
				failTo: a
			}
		};
	const qe = function(e, t, n) {
			let r = 0,
				a = [];
			for (let o = 0; o < e.length; o++) {
				let i = e[o][n.form] || e[o].normal;
				for (; r > 0 && (void 0 === t.goNext[r] || !t.goNext[r].hasOwnProperty(i));) r = t.failTo[r] || 0;
				if (t.goNext[r].hasOwnProperty(i) && (r = t.goNext[r][i], t.endAs[r])) {
					let n = t.endAs[r];
					for (let t = 0; t < n.length; t++) {
						let r = n[t],
							i = e[o - r + 1],
							[s, l] = i.index;
						a.push([s, l, l + r, i.id])
					}
				}
			}
			return a
		},
		Ue = function(e, t) {
			for (let n = 0; n < e.length; n += 1)
				if (!0 === t.has(e[n])) return !1;
			return !0
		};
	var Re = function(e, t, n) {
		let r = [];
		n.form = n.form || "normal";
		let a = e.docs;
		if (!t.goNext || !t.goNext[0]) return console.error("Compromise invalid lookup trie"), e.none();
		let o = Object.keys(t.goNext[0]);
		for (let i = 0; i < a.length; i++) {
			if (e._cache && e._cache[i] && !0 === Ue(o, e._cache[i])) continue;
			let s = a[i],
				l = qe(s, t, n);
			l.length > 0 && (r = r.concat(l))
		}
		return e.update(r)
	};
	const Qe = (e, t) => {
		for (let n = e.length - 1; n >= 0; n -= 1)
			if (e[n] !== t) return e = e.slice(0, n + 1);
		return e
	};
	var _e = function(e) {
		return e.goNext = e.goNext.map((e => {
			if (0 !== Object.keys(e).length) return e
		})), e.goNext = Qe(e.goNext, void 0), e.failTo = Qe(e.failTo, 0), e.endAs = Qe(e.endAs, null), e
	};
	const Ze = {
		buildTrie: function(e) {
			const t = We(e, this.world());
			return _e(t)
		}
	};
	Ze.compile = Ze.buildTrie;
	var Xe = {
		api: function(e) {
			e.prototype.lookup = function(e, t = {}) {
				if (!e) return this.none();
				"string" == typeof e && (e = [e]);
				let n = (r = e, "[object Object]" === Object.prototype.toString.call(r) ? e : We(e, this.world));
				var r;
				let a = Re(this, n, t);
				return a = a.settle(), a
			}
		},
		lib: Ze
	};
	const Ye = function(e, t) {
			return t ? (e.forEach((e => {
				let n = e[0];
				t[n] && (e[0] = t[n][0], e[1] += t[n][1], e[2] += t[n][1])
			})), e) : e
		},
		et = function(e, t) {
			let {
				ptrs: n,
				byGroup: r
			} = e;
			return n = Ye(n, t), Object.keys(r).forEach((e => {
				r[e] = Ye(r[e], t)
			})), {
				ptrs: n,
				byGroup: r
			}
		},
		tt = function(e, t, n) {
			const r = n.methods.one;
			return "number" == typeof e && (e = String(e)), "string" == typeof e && (e = r.killUnicode(e, n), e = r.parseMatch(e, t, n)), e
		},
		nt = e => "[object Object]" === Object.prototype.toString.call(e),
		rt = e => e && nt(e) && !0 === e.isView,
		at = e => e && nt(e) && !0 === e.isNet;
	var ot = {
			matchOne: function(e, t, n) {
				const r = this.methods.one;
				if (rt(e)) return this.intersection(e).eq(0);
				if (at(e)) return this.sweep(e, {
					tagger: !1,
					matchOne: !0
				}).view;
				let a = {
						regs: e = tt(e, n, this.world),
						group: t,
						justOne: !0
					},
					o = r.match(this.docs, a, this._cache),
					{
						ptrs: i,
						byGroup: s
					} = et(o, this.fullPointer),
					l = this.toView(i);
				return l._groups = s, l
			},
			match: function(e, t, n) {
				const r = this.methods.one;
				if (rt(e)) return this.intersection(e);
				if (at(e)) return this.sweep(e, {
					tagger: !1
				}).view.settle();
				let a = {
						regs: e = tt(e, n, this.world),
						group: t
					},
					o = r.match(this.docs, a, this._cache),
					{
						ptrs: i,
						byGroup: s
					} = et(o, this.fullPointer),
					l = this.toView(i);
				return l._groups = s, l
			},
			has: function(e, t, n) {
				const r = this.methods.one;
				if (rt(e)) return this.intersection(e).fullPointer.length > 0;
				if (at(e)) return this.sweep(e, {
					tagger: !1
				}).view.found;
				let a = {
					regs: e = tt(e, n, this.world),
					group: t,
					justOne: !0
				};
				return r.match(this.docs, a, this._cache).ptrs.length > 0
			},
			if: function(e, t, n) {
				const r = this.methods.one;
				if (rt(e)) return this.filter((t => t.intersection(e).found));
				if (at(e)) {
					let t = this.sweep(e, {
						tagger: !1
					}).view.settle();
					return this.if(t)
				}
				let a = {
						regs: e = tt(e, n, this.world),
						group: t,
						justOne: !0
					},
					o = this.fullPointer,
					i = this._cache || [];
				o = o.filter(((e, t) => {
					let n = this.update([e]);
					return r.match(n.docs, a, i[t]).ptrs.length > 0
				}));
				let s = this.update(o);
				return this._cache && (s._cache = o.map((e => i[e[0]]))), s
			},
			ifNo: function(e, t, n) {
				const {
					methods: r
				} = this, a = r.one;
				if (rt(e)) return this.filter((t => !t.intersection(e).found));
				if (at(e)) {
					let t = this.sweep(e, {
						tagger: !1
					}).view.settle();
					return this.ifNo(t)
				}
				e = tt(e, n, this.world);
				let o = this._cache || [],
					i = this.filter(((n, r) => {
						let i = {
							regs: e,
							group: t,
							justOne: !0
						};
						return 0 === a.match(n.docs, i, o[r]).ptrs.length
					}));
				return this._cache && (i._cache = i.ptrs.map((e => o[e[0]]))), i
			}
		},
		it = {
			before: function(e, t, n) {
				const {
					indexN: r
				} = this.methods.one.pointer;
				let a = [],
					o = r(this.fullPointer);
				Object.keys(o).forEach((e => {
					let t = o[e].sort(((e, t) => e[1] > t[1] ? 1 : -1))[0];
					t[1] > 0 && a.push([t[0], 0, t[1]])
				}));
				let i = this.toView(a);
				return e ? i.match(e, t, n) : i
			},
			after: function(e, t, n) {
				const {
					indexN: r
				} = this.methods.one.pointer;
				let a = [],
					o = r(this.fullPointer),
					i = this.document;
				Object.keys(o).forEach((e => {
					let t = o[e].sort(((e, t) => e[1] > t[1] ? -1 : 1))[0],
						[n, , r] = t;
					r < i[n].length && a.push([n, r, i[n].length])
				}));
				let s = this.toView(a);
				return e ? s.match(e, t, n) : s
			},
			growLeft: function(e, t, n) {
				"string" == typeof e && (e = this.world.methods.one.parseMatch(e, n, this.world)), e[e.length - 1].end = !0;
				let r = this.fullPointer;
				return this.forEach(((n, a) => {
					let o = n.before(e, t);
					if (o.found) {
						let e = o.terms();
						r[a][1] -= e.length, r[a][3] = e.docs[0][0].id
					}
				})), this.update(r)
			},
			growRight: function(e, t, n) {
				"string" == typeof e && (e = this.world.methods.one.parseMatch(e, n, this.world)), e[0].start = !0;
				let r = this.fullPointer;
				return this.forEach(((n, a) => {
					let o = n.after(e, t);
					if (o.found) {
						let e = o.terms();
						r[a][2] += e.length, r[a][4] = null
					}
				})), this.update(r)
			},
			grow: function(e, t, n) {
				return this.growRight(e, t, n).growLeft(e, t, n)
			}
		};
	const st = function(e, t) {
			return [e[0], e[1], t[2]]
		},
		lt = (e, t, n) => {
			return "string" == typeof e || (r = e, "[object Array]" === Object.prototype.toString.call(r)) ? t.match(e, n) : e || t.none();
			var r
		},
		ut = function(e, t) {
			let [n, r, a] = e;
			return t.document[n] && t.document[n][r] && (e[3] = e[3] || t.document[n][r].id, t.document[n][a - 1] && (e[4] = e[4] || t.document[n][a - 1].id)), e
		},
		ct = {
			splitOn: function(e, t) {
				const {
					splitAll: n
				} = this.methods.one.pointer;
				let r = lt(e, this, t).fullPointer,
					a = n(this.fullPointer, r),
					o = [];
				return a.forEach((e => {
					o.push(e.passthrough), o.push(e.before), o.push(e.match), o.push(e.after)
				})), o = o.filter((e => e)), o = o.map((e => ut(e, this))), this.update(o)
			},
			splitBefore: function(e, t) {
				const {
					splitAll: n
				} = this.methods.one.pointer;
				let r = lt(e, this, t).fullPointer,
					a = n(this.fullPointer, r);
				for (let e = 0; e < a.length; e += 1) !a[e].after && a[e + 1] && a[e + 1].before && a[e].match && a[e].match[0] === a[e + 1].before[0] && (a[e].after = a[e + 1].before, delete a[e + 1].before);
				let o = [];
				return a.forEach((e => {
					o.push(e.passthrough), o.push(e.before), e.match && e.after ? o.push(st(e.match, e.after)) : o.push(e.match)
				})), o = o.filter((e => e)), o = o.map((e => ut(e, this))), this.update(o)
			},
			splitAfter: function(e, t) {
				const {
					splitAll: n
				} = this.methods.one.pointer;
				let r = lt(e, this, t).fullPointer,
					a = n(this.fullPointer, r),
					o = [];
				return a.forEach((e => {
					o.push(e.passthrough), e.before && e.match ? o.push(st(e.before, e.match)) : (o.push(e.before), o.push(e.match)), o.push(e.after)
				})), o = o.filter((e => e)), o = o.map((e => ut(e, this))), this.update(o)
			}
		};
	ct.split = ct.splitAfter;
	var ht = ct;
	const dt = function(e, t) {
			return !(!e || !t) && e[0] === t[0] && e[2] === t[1]
		},
		gt = function(e, t, n) {
			const r = e.world,
				a = r.methods.one.parseMatch;
			n = n || "^.";
			let o = a(t = t || ".$", {}, r),
				i = a(n, {}, r);
			o[o.length - 1].end = !0, i[0].start = !0;
			let s = e.fullPointer,
				l = [s[0]];
			for (let t = 1; t < s.length; t += 1) {
				let n = l[l.length - 1],
					r = s[t],
					a = e.update([n]),
					u = e.update([r]);
				dt(n, r) && a.has(o) && u.has(i) ? l[l.length - 1] = [n[0], n[1], r[2], n[3], r[4]] : l.push(r)
			}
			return e.update(l)
		};
	var mt = {
		joinIf: function(e, t) {
			return gt(this, e, t)
		},
		join: function() {
			return gt(this)
		}
	};
	const pt = Object.assign({}, ot, it, ht, mt);
	pt.lookBehind = pt.before, pt.lookBefore = pt.before, pt.lookAhead = pt.after, pt.lookAfter = pt.after, pt.notIf = pt.ifNo;
	var ft = function(e) {
		Object.assign(e.prototype, pt)
	};
	const vt = /(?:^|\s)([![^]*(?:<[^<]*>)?\/.*?[^\\/]\/[?\]+*$~]*)(?:\s|$)/,
		bt = /([!~[^]*(?:<[^<]*>)?\([^)]+[^\\)]\)[?\]+*$~]*)(?:\s|$)/,
		yt = / /g,
		wt = e => /^[![^]*(<[^<]*>)?\//.test(e) && /\/[?\]+*$~]*$/.test(e),
		kt = function(e) {
			return e = (e = e.map((e => e.trim()))).filter((e => e))
		};
	var Pt = function(e) {
		let t = e.split(vt),
			n = [];
		t.forEach((e => {
			wt(e) ? n.push(e) : n = n.concat(e.split(bt))
		})), n = kt(n);
		let r = [];
		return n.forEach((e => {
			(e => /^[![^]*(<[^<]*>)?\(/.test(e) && /\)[?\]+*$~]*$/.test(e))(e) || wt(e) ? r.push(e) : r = r.concat(e.split(yt))
		})), r = kt(r), r
	};
	const At = /\{([0-9]+)?(, *[0-9]*)?\}/,
		Ct = /&&/,
		jt = new RegExp(/^<\s*(\S+)\s*>/),
		Nt = e => e.charAt(0).toUpperCase() + e.substring(1),
		xt = e => e.charAt(e.length - 1),
		It = e => e.charAt(0),
		Tt = e => e.substring(1),
		Dt = e => e.substring(0, e.length - 1),
		Ht = function(e) {
			return e = Tt(e), e = Dt(e)
		},
		Gt = function(e, t) {
			let n = {};
			for (let r = 0; r < 2; r += 1) {
				if ("$" === xt(e) && (n.end = !0, e = Dt(e)), "^" === It(e) && (n.start = !0, e = Tt(e)), "?" === xt(e) && (n.optional = !0, e = Dt(e)), ("[" === It(e) || "]" === xt(e)) && (n.group = null, "[" === It(e) && (n.groupStart = !0), "]" === xt(e) && (n.groupEnd = !0), e = (e = e.replace(/^\[/, "")).replace(/\]$/, ""), "<" === It(e))) {
					const t = jt.exec(e);
					t.length >= 2 && (n.group = t[1], e = e.replace(t[0], ""))
				}
				if ("+" === xt(e) && (n.greedy = !0, e = Dt(e)), "*" !== e && "*" === xt(e) && "\\*" !== e && (n.greedy = !0, e = Dt(e)), "!" === It(e) && (n.negative = !0, e = Tt(e)), "~" === It(e) && "~" === xt(e) && e.length > 2 && (e = Ht(e), n.fuzzy = !0, n.min = t.fuzzy || .85, !1 === /\(/.test(e))) return n.word = e, n;
				if ("/" === It(e) && "/" === xt(e)) return e = Ht(e), t.caseSensitive && (n.use = "text"), n.regex = new RegExp(e), n;
				if (!0 === At.test(e) && (e = e.replace(At, ((e, t, r) => (void 0 === r ? (n.min = Number(t), n.max = Number(t)) : (r = r.replace(/, */, ""), void 0 === t ? (n.min = 0, n.max = Number(r)) : (n.min = Number(t), n.max = Number(r || 999))), n.greedy = !0, n.min || (n.optional = !0), "")))), "(" === It(e) && ")" === xt(e)) {
					Ct.test(e) ? (n.choices = e.split(Ct), n.operator = "and") : (n.choices = e.split("|"), n.operator = "or"), n.choices[0] = Tt(n.choices[0]);
					let r = n.choices.length - 1;
					n.choices[r] = Dt(n.choices[r]), n.choices = n.choices.map((e => e.trim())), n.choices = n.choices.filter((e => e)), n.choices = n.choices.map((e => e.split(/ /g).map((e => Gt(e, t))))), e = ""
				}
				if ("{" === It(e) && "}" === xt(e)) {
					if (e = Ht(e), n.root = e, /\//.test(e)) {
						let e = n.root.split(/\//);
						n.root = e[0], n.pos = e[1], "adj" === n.pos && (n.pos = "Adjective"), n.pos = n.pos.charAt(0).toUpperCase() + n.pos.substr(1).toLowerCase(), void 0 !== e[2] && (n.sense = e[2])
					}
					return n
				}
				if ("<" === It(e) && ">" === xt(e)) return e = Ht(e), n.chunk = Nt(e), n.greedy = !0, n;
				if ("%" === It(e) && "%" === xt(e)) return e = Ht(e), n.switch = e, n
			}
			return "#" === It(e) ? (n.tag = Tt(e), n.tag = Nt(n.tag), n) : "@" === It(e) ? (n.method = Tt(e), n) : "." === e ? (n.anything = !0, n) : "*" === e ? (n.anything = !0, n.greedy = !0, n.optional = !0, n) : (e && (e = (e = e.replace("\\*", "*")).replace("\\.", "."), t.caseSensitive ? n.use = "text" : e = e.toLowerCase(), n.word = e), n)
		};
	var Et = Gt;
	const Ot = /[a-z0-9][-–—][a-z]/i;
	var Ft = function(e, t) {
		let n = t.model.one.prefixes;
		for (let t = e.length - 1; t >= 0; t -= 1) {
			let r = e[t];
			if (r.word && Ot.test(r.word)) {
				let a = r.word.split(/[-–—]/g);
				if (n.hasOwnProperty(a[0])) continue;
				a = a.filter((e => e)).reverse(), e.splice(t, 1), a.forEach((n => {
					let a = Object.assign({}, r);
					a.word = n, e.splice(t, 0, a)
				}))
			}
		}
		return e
	};
	const Vt = function(e, t) {
			let {
				all: n
			} = t.methods.two.transform.verb || {}, r = e.root;
			return n ? n(r, t.model) : []
		},
		zt = function(e, t) {
			let {
				all: n
			} = t.methods.two.transform.noun || {};
			return n ? n(e.root, t.model) : [e.root]
		},
		Bt = function(e, t) {
			let {
				all: n
			} = t.methods.two.transform.adjective || {};
			return n ? n(e.root, t.model) : [e.root]
		};
	var $t = function(e, t) {
			return e = e.map((e => {
				if (e.root)
					if (t.methods.two && t.methods.two.transform) {
						let n = [];
						e.pos ? "Verb" === e.pos ? n = n.concat(Vt(e, t)) : "Noun" === e.pos ? n = n.concat(zt(e, t)) : "Adjective" === e.pos && (n = n.concat(Bt(e, t))) : (n = n.concat(Vt(e, t)), n = n.concat(zt(e, t)), n = n.concat(Bt(e, t))), n = n.filter((e => e)), n.length > 0 && (e.operator = "or", e.fastOr = new Set(n))
					} else e.machine = e.root, delete e.id, delete e.root;
				return e
			}))
		},
		St = function(e) {
			return e = function(e) {
				let t = 0,
					n = null;
				for (let r = 0; r < e.length; r++) {
					const a = e[r];
					!0 === a.groupStart && (n = a.group, null === n && (n = String(t), t += 1)), null !== n && (a.group = n), !0 === a.groupEnd && (n = null)
				}
				return e
			}(e), e = function(e) {
				return e.map((e => (e.fuzzy && e.choices && e.choices.forEach((t => {
					1 === t.length && t[0].word && (t[0].fuzzy = !0, t[0].min = e.min)
				})), e)))
			}(e = e.map((e => {
				if (void 0 !== e.choices) {
					if ("or" !== e.operator) return e;
					if (!0 === e.fuzzy) return e;
					!0 === e.choices.every((e => {
						if (1 !== e.length) return !1;
						let t = e[0];
						return !0 !== t.fuzzy && !t.start && !t.end && void 0 !== t.word && !0 !== t.negative && !0 !== t.optional && !0 !== t.method
					})) && (e.fastOr = new Set, e.choices.forEach((t => {
						e.fastOr.add(t[0].word)
					})), delete e.choices)
				}
				return e
			}))), e
		},
		Kt = function(e, t, n) {
			if (null == e || "" === e) return [];
			t = t || {}, "number" == typeof e && (e = String(e));
			let r = Pt(e);
			return r = r.map((e => Et(e, t))), r = Ft(r, n), r = $t(r, n), r = St(r), r
		};
	const Mt = function(e, t) {
		for (let n of t)
			if (e.has(n)) return !0;
		return !1
	};
	var Lt = function(e, t) {
			for (let n = 0; n < e.length; n += 1) {
				let r = e[n];
				if (!0 !== r.optional && !0 !== r.negative && !0 !== r.fuzzy) {
					if (void 0 !== r.word && !1 === t.has(r.word)) return !0;
					if (void 0 !== r.tag && !1 === t.has("#" + r.tag)) return !0;
					if (r.fastOr && !1 === Mt(r.fastOr, t)) return !1
				}
			}
			return !1
		},
		Jt = function(e, t, n = 3) {
			if (e === t) return 1;
			if (e.length < n || t.length < n) return 0;
			const r = function(e, t) {
				let n = e.length,
					r = t.length;
				if (0 === n) return r;
				if (0 === r) return n;
				let a = (r > n ? r : n) + 1;
				if (Math.abs(n - r) > (a || 100)) return a || 100;
				let o, i, s, l, u, c, h = [];
				for (let e = 0; e < a; e++) h[e] = [e], h[e].length = a;
				for (let e = 0; e < a; e++) h[0][e] = e;
				for (let a = 1; a <= n; ++a)
					for (i = e[a - 1], o = 1; o <= r; ++o) {
						if (a === o && h[a][o] > 4) return n;
						s = t[o - 1], l = i === s ? 0 : 1, u = h[a - 1][o] + 1, (c = h[a][o - 1] + 1) < u && (u = c), (c = h[a - 1][o - 1] + l) < u && (u = c);
						let r = a > 1 && o > 1 && i === t[o - 2] && e[a - 2] === s && (c = h[a - 2][o - 2] + l) < u;
						h[a][o] = r ? c : u
					}
				return h[n][r]
			}(e, t);
			let a = Math.max(e.length, t.length);
			return 1 - (0 === a ? 0 : r / a)
		};
	const Wt = /([\u0022\uFF02\u0027\u201C\u2018\u201F\u201B\u201E\u2E42\u201A\u00AB\u2039\u2035\u2036\u2037\u301D\u0060\u301F])/,
		qt = /([\u0022\uFF02\u0027\u201D\u2019\u00BB\u203A\u2032\u2033\u2034\u301E\u00B4])/,
		Ut = /^[-–—]$/,
		Rt = / [-–—]{1,3} /,
		Qt = (e, t) => -1 !== e.post.indexOf(t),
		_t = {
			hasQuote: e => Wt.test(e.pre) || qt.test(e.post),
			hasComma: e => Qt(e, ","),
			hasPeriod: e => !0 === Qt(e, ".") && !1 === Qt(e, "..."),
			hasExclamation: e => Qt(e, "!"),
			hasQuestionMark: e => Qt(e, "?") || Qt(e, "¿"),
			hasEllipses: e => Qt(e, "..") || Qt(e, "…"),
			hasSemicolon: e => Qt(e, ";"),
			hasColon: e => Qt(e, ":"),
			hasSlash: e => /\//.test(e.text),
			hasHyphen: e => Ut.test(e.post) || Ut.test(e.pre),
			hasDash: e => Rt.test(e.post) || Rt.test(e.pre),
			hasContraction: e => Boolean(e.implicit),
			isAcronym: e => e.tags.has("Acronym"),
			isKnown: e => e.tags.size > 0,
			isTitleCase: e => /^\p{Lu}[a-z'\u00C0-\u00FF]/u.test(e.text),
			isUpperCase: e => /^\p{Lu}+$/u.test(e.text)
		};
	_t.hasQuotation = _t.hasQuote;
	var Zt = _t;
	let Xt = function() {};
	Xt = function(e, t, n, r) {
		let a = function(e, t, n, r) {
			if (!0 === t.anything) return !0;
			if (!0 === t.start && 0 !== n) return !1;
			if (!0 === t.end && n !== r - 1) return !1;
			if (void 0 !== t.id && t.id === e.id) return !0;
			if (void 0 !== t.word) {
				if (t.use) return t.word === e[t.use];
				if (null !== e.machine && e.machine === t.word) return !0;
				if (void 0 !== e.alias && e.alias.hasOwnProperty(t.word)) return !0;
				if (!0 === t.fuzzy) {
					if (t.word === e.root) return !0;
					if (Jt(t.word, e.normal) >= t.min) return !0
				}
				return !(!e.alias || !e.alias.some((e => e === t.word))) || t.word === e.text || t.word === e.normal
			}
			if (void 0 !== t.tag) return !0 === e.tags.has(t.tag);
			if (void 0 !== t.method) return "function" == typeof Zt[t.method] && !0 === Zt[t.method](e);
			if (void 0 !== t.pre) return e.pre && e.pre.includes(t.pre);
			if (void 0 !== t.post) return e.post && e.post.includes(t.post);
			if (void 0 !== t.regex) {
				let n = e.normal;
				return t.use && (n = e[t.use]), t.regex.test(n)
			}
			if (void 0 !== t.chunk) return e.chunk === t.chunk;
			if (void 0 !== t.switch) return e.switch === t.switch;
			if (void 0 !== t.machine) return e.normal === t.machine || e.machine === t.machine || e.root === t.machine;
			if (void 0 !== t.sense) return e.sense === t.sense;
			if (void 0 !== t.fastOr) {
				if (t.pos && !e.tags.has(t.pos)) return null;
				let n = e.root || e.implicit || e.machine || e.normal;
				return t.fastOr.has(n) || t.fastOr.has(e.text)
			}
			return void 0 !== t.choices && ("and" === t.operator ? t.choices.every((t => Xt(e, t, n, r))) : t.choices.some((t => Xt(e, t, n, r))))
		}(e, t, n, r);
		return !0 === t.negative ? !a : a
	};
	var Yt = Xt;
	const en = function(e, t) {
			if (!0 === e.end && !0 === e.greedy && t.start_i + t.t < t.phrase_length - 1) {
				let n = Object.assign({}, e, {
					end: !1
				});
				if (!0 === Yt(t.terms[t.t], n, t.start_i + t.t, t.phrase_length)) return !0
			}
			return !1
		},
		tn = function(e, t) {
			return e.groups[e.inGroup] || (e.groups[e.inGroup] = {
				start: t,
				length: 0
			}), e.groups[e.inGroup]
		};
	var nn = function(e) {
		let {
			regs: t
		} = e, n = t[e.r], r = function(e, t) {
			let n = e.t;
			if (!t) return e.terms.length;
			for (; n < e.terms.length; n += 1)
				if (!0 === Yt(e.terms[n], t, e.start_i + n, e.phrase_length)) return n;
			return null
		}(e, t[e.r + 1]);
		return null === r || 0 === r || void 0 !== n.min && r - e.t < n.min ? null : void 0 !== n.max && r - e.t > n.max ? (e.t = e.t + n.max, !0) : (!0 === e.hasGroup && (tn(e, e.t).length = r - e.t), e.t = r, !0)
	};
	const rn = function(e, t = 0) {
		let n = e.regs[e.r],
			r = !1;
		for (let o = 0; o < n.choices.length; o += 1) {
			let i = n.choices[o];
			if (a = i, "[object Array]" !== Object.prototype.toString.call(a)) return !1;
			if (r = i.every(((n, r) => {
					let a = 0,
						o = e.t + r + t + a;
					if (void 0 === e.terms[o]) return !1;
					let i = Yt(e.terms[o], n, o + e.start_i, e.phrase_length);
					if (!0 === i && !0 === n.greedy)
						for (let t = 1; t < e.terms.length; t += 1) {
							let r = e.terms[o + t];
							if (r) {
								if (!0 !== Yt(r, n, e.start_i + t, e.phrase_length)) break;
								a += 1
							}
						}
					return t += a, i
				})), r) {
				t += i.length;
				break
			}
		}
		var a;
		return r && !0 === n.greedy ? rn(e, t) : t
	};
	var an = function(e) {
			const {
				regs: t
			} = e;
			let n = t[e.r],
				r = rn(e);
			if (r) {
				if (!0 === n.negative) return null;
				if (!0 === e.hasGroup && (tn(e, e.t).length += r), !0 === n.end) {
					let t = e.phrase_length;
					if (e.t + e.start_i + r !== t) return null
				}
				return e.t += r, !0
			}
			return !!n.optional || null
		},
		on = function(e) {
			const {
				regs: t
			} = e;
			let n = t[e.r],
				r = function(e) {
					let t = 0;
					return !0 === e.regs[e.r].choices.every((n => {
						let r = n.every(((t, n) => {
							let r = e.t + n;
							return void 0 !== e.terms[r] && Yt(e.terms[r], t, r, e.phrase_length)
						}));
						return !0 === r && n.length > t && (t = n.length), r
					})) && t
				}(e);
			if (r) {
				if (!0 === n.negative) return null;
				if (!0 === e.hasGroup && (tn(e, e.t).length += r), !0 === n.end) {
					let t = e.phrase_length - 1;
					if (e.t + e.start_i !== t) return null
				}
				return e.t += r, !0
			}
			return !!n.optional || null
		},
		sn = function(e, t, n) {
			let r = 0;
			for (let a = e.t; a < e.terms.length; a += 1) {
				let o = Yt(e.terms[a], t, e.start_i + e.t, e.phrase_length);
				if (o) break;
				if (n && (o = Yt(e.terms[a], n, e.start_i + e.t, e.phrase_length), o)) break;
				if (r += 1, void 0 !== t.max && r === t.max) break
			}
			return !(0 === r || t.min && t.min > r || (e.t += r, 0))
		},
		ln = function(e) {
			const {
				regs: t
			} = e;
			let n = t[e.r],
				r = Object.assign({}, n);
			if (r.negative = !1, Yt(e.terms[e.t], r, e.start_i + e.t, e.phrase_length)) return !1;
			if (n.optional) {
				let n = t[e.r + 1];
				n && (Yt(e.terms[e.t], n, e.start_i + e.t, e.phrase_length) ? e.r += 1 : n.optional && t[e.r + 2] && Yt(e.terms[e.t], t[e.r + 2], e.start_i + e.t, e.phrase_length) && (e.r += 2))
			}
			return n.greedy ? sn(e, r, t[e.r + 1]) : (e.t += 1, !0)
		},
		un = function(e) {
			const {
				regs: t
			} = e;
			let n = t[e.r],
				r = e.terms[e.t],
				a = Yt(r, t[e.r + 1], e.start_i + e.t, e.phrase_length);
			if (n.negative || a) {
				let n = e.terms[e.t + 1];
				n && Yt(n, t[e.r + 1], e.start_i + e.t, e.phrase_length) || (e.r += 1)
			}
		},
		cn = function(e) {
			const {
				regs: t,
				phrase_length: n
			} = e;
			let r = t[e.r];
			return e.t = function(e, t) {
				let n = Object.assign({}, e.regs[e.r], {
						start: !1,
						end: !1
					}),
					r = e.t;
				for (; e.t < e.terms.length; e.t += 1) {
					if (t && Yt(e.terms[e.t], t, e.start_i + e.t, e.phrase_length)) return e.t;
					let a = e.t - r + 1;
					if (void 0 !== n.max && a === n.max) return e.t;
					if (!1 === Yt(e.terms[e.t], n, e.start_i + e.t, e.phrase_length)) return void 0 !== n.min && a < n.min ? null : e.t
				}
				return e.t
			}(e, t[e.r + 1]), null === e.t || r.min && r.min > e.t ? null : !0 !== r.end || e.start_i + e.t === n || null
		},
		hn = function(e) {
			let t = e.terms[e.t],
				n = e.regs[e.r];
			if (t.implicit && e.terms[e.t + 1]) {
				if (!e.terms[e.t + 1].implicit) return;
				n.word === t.normal && (e.t += 1), "hasContraction" === n.method && (e.t += 1)
			}
		},
		dn = function(e) {
			const {
				regs: t
			} = e;
			let n = t[e.r],
				r = e.terms[e.t],
				a = e.t;
			return !!(n.optional && t[e.r + 1] && n.negative) || (n.optional && t[e.r + 1] && un(e), r.implicit && e.terms[e.t + 1] && hn(e), e.t += 1, !0 === n.end && e.t !== e.terms.length && !0 !== n.greedy ? null : !0 !== n.greedy || cn(e) ? (!0 === e.hasGroup && function(e, t) {
				let n = e.regs[e.r];
				const r = tn(e, t);
				e.t > 1 && n.greedy ? r.length += e.t - t : r.length++
			}(e, a), !0) : null)
		},
		gn = function(e, t, n, r) {
			if (0 === e.length || 0 === t.length) return null;
			let a = {
				t: 0,
				terms: e,
				r: 0,
				regs: t,
				groups: {},
				start_i: n,
				phrase_length: r,
				inGroup: null
			};
			for (; a.r < t.length; a.r += 1) {
				let e = t[a.r];
				if (a.hasGroup = Boolean(e.group), !0 === a.hasGroup ? a.inGroup = e.group : a.inGroup = null, !a.terms[a.t]) {
					if (!1 === t.slice(a.r).some((e => !e.optional))) break;
					return null
				}
				if (!0 !== e.anything || !0 !== e.greedy) {
					if (void 0 === e.choices || "or" !== e.operator) {
						if (void 0 === e.choices || "and" !== e.operator)
							if (!0 !== e.anything) {
								if (!0 !== en(e, a)) {
									if (e.negative) {
										if (!ln(a)) return null
									} else if (!0 !== Yt(a.terms[a.t], e, a.start_i + a.t, a.phrase_length)) {
										if (!0 !== e.optional) return null
									} else if (!dn(a)) return null
								} else if (!dn(a)) return null
							} else {
								if (e.negative && e.anything) return null;
								if (!dn(a)) return null
							}
						else if (!on(a)) return null
					} else if (!an(a)) return null
				} else if (!nn(a)) return null
			}
			let o = [null, n, a.t + n];
			if (o[1] === o[2]) return null;
			let i = {};
			return Object.keys(a.groups).forEach((e => {
				let t = a.groups[e],
					r = n + t.start;
				i[e] = [null, r, r + t.length]
			})), {
				pointer: o,
				groups: i
			}
		},
		mn = function(e, t) {
			let n = [],
				r = {};
			return 0 === e.length || ("number" == typeof t && (t = String(t)), t ? e.forEach((e => {
				e.groups[t] && n.push(e.groups[t])
			})) : e.forEach((e => {
				n.push(e.pointer), Object.keys(e.groups).forEach((t => {
					r[t] = r[t] || [], r[t].push(e.groups[t])
				}))
			}))), {
				ptrs: n,
				byGroup: r
			}
		},
		pn = function(e, t, n) {
			return e = e.filter((e => {
				let [r, a, o] = e.pointer, i = n[r].slice(a, o);
				for (let e = 0; e < i.length; e += 1) {
					let n = i.slice(e);
					if (null !== gn(n, t, e, i.length)) return !1
				}
				return !0
			})), e
		};
	const fn = function(e, t) {
			return e.pointer[0] = t, Object.keys(e.groups).forEach((n => {
				e.groups[n][0] = t
			})), e
		},
		vn = function(e, t, n) {
			let r = gn(e, t, 0, e.length);
			return r ? (r = fn(r, n), r) : null
		};
	var bn = function(e, t, n) {
			n = n || [];
			let {
				regs: r,
				group: a,
				justOne: o
			} = t, i = [];
			if (!r || 0 === r.length) return {
				ptrs: [],
				byGroup: {}
			};
			const s = r.filter((e => !0 !== e.optional && !0 !== e.negative)).length;
			e: for (let t = 0; t < e.length; t += 1) {
				let a = e[t];
				if (!n[t] || !Lt(r, n[t]))
					if (!0 !== r[0].start)
						for (let e = 0; e < a.length; e += 1) {
							let n = a.slice(e);
							if (n.length < s) break;
							let l = gn(n, r, e, a.length);
							if (l) {
								if (l = fn(l, t), i.push(l), !0 === o) break e;
								let n = l.pointer[2];
								Math.abs(n - 1) > e && (e = Math.abs(n - 1))
							}
						} else {
							let e = vn(a, r, t);
							e && i.push(e)
						}
			}
			return !0 === r[r.length - 1].end && (i = i.filter((t => {
				let n = t.pointer[0];
				return e[n].length === t.pointer[2]
			}))), t.notIf && (i = pn(i, t.notIf, e)), i = mn(i, a), i.ptrs.forEach((t => {
				let [n, r, a] = t;
				t[3] = e[n][r].id, t[4] = e[n][a - 1].id
			})), i
		},
		yn = {
			api: ft,
			methods: {
				one: {
					termMethods: Zt,
					parseMatch: Kt,
					match: bn
				}
			},
			lib: {
				parseMatch: function(e, t) {
					const n = this.world();
					let r = n.methods.one.killUnicode;
					return r && (e = r(e, n)), n.methods.one.parseMatch(e, t, n)
				}
			}
		};
	const wn = /^\../,
		kn = /^#./,
		Pn = function(e, t) {
			let n = {},
				r = {};
			return Object.keys(t).forEach((a => {
				let o = t[a],
					i = function(e) {
						let t = "",
							n = "</span>";
						return e = e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;"), wn.test(e) ? t = `<span class="${e.replace(/^\./,"")}"` : kn.test(e) ? t = `<span id="${e.replace(/^#/,"")}"` : (t = `<${e}`, n = `</${e}>`), t += ">", {
							start: t,
							end: n
						}
					}(a);
				"string" == typeof o && (o = e.match(o)), o.docs.forEach((e => {
					if (e.every((e => e.implicit))) return;
					let t = e[0].id;
					n[t] = n[t] || [], n[t].push(i.start);
					let a = e[e.length - 1].id;
					r[a] = r[a] || [], r[a].push(i.end)
				}))
			})), {
				starts: n,
				ends: r
			}
		};
	var An = {
		html: function(e) {
			let {
				starts: t,
				ends: n
			} = Pn(this, e), r = "";
			return this.docs.forEach((e => {
				for (let a = 0; a < e.length; a += 1) {
					let o = e[a];
					t.hasOwnProperty(o.id) && (r += t[o.id].join("")), r += o.pre || "", r += o.text || "", n.hasOwnProperty(o.id) && (r += n[o.id].join("")), r += o.post || ""
				}
			})), r
		}
	};
	const Cn = /[,:;)\]*.?~!\u0022\uFF02\u201D\u2019\u00BB\u203A\u2032\u2033\u2034\u301E\u00B4—-]+$/,
		jn = /^[(['"*~\uFF02\u201C\u2018\u201F\u201B\u201E\u2E42\u201A\u00AB\u2039\u2035\u2036\u2037\u301D\u0060\u301F]+/,
		Nn = /[,:;)('"\u201D\]]/,
		xn = /^[-–—]$/,
		In = / /,
		Tn = function(e, t, n = !0) {
			let r = "";
			return e.forEach((e => {
				let n = e.pre || "",
					a = e.post || "";
				"some" === t.punctuation && (n = n.replace(jn, ""), xn.test(a) && (a = " "), a = a.replace(Nn, ""), a = a.replace(/\?!+/, "?"), a = a.replace(/!+/, "!"), a = a.replace(/\?+/, "?"), a = a.replace(/\.{2,}/, ""), e.tags.has("Abbreviation") && (a = a.replace(/\./, ""))), "some" === t.whitespace && (n = n.replace(/\s/, ""), a = a.replace(/\s+/, " ")), t.keepPunct || (n = n.replace(jn, ""), a = "-" === a ? " " : a.replace(Cn, ""));
				let o = e[t.form || "text"] || e.normal || "";
				"implicit" === t.form && (o = e.implicit || e.text), "root" === t.form && e.implicit && (o = e.root || e.implicit || e.normal), "machine" !== t.form && "implicit" !== t.form && "root" !== t.form || !e.implicit || a && In.test(a) || (a += " "), r += n + o + a
			})), !1 === n && (r = r.trim()), !0 === t.lowerCase && (r = r.toLowerCase()), r
		},
		Dn = {
			text: {
				form: "text"
			},
			normal: {
				whitespace: "some",
				punctuation: "some",
				case: "some",
				unicode: "some",
				form: "normal"
			},
			machine: {
				keepSpace: !1,
				whitespace: "some",
				punctuation: "some",
				case: "none",
				unicode: "some",
				form: "machine"
			},
			root: {
				keepSpace: !1,
				whitespace: "some",
				punctuation: "some",
				case: "some",
				unicode: "some",
				form: "root"
			},
			implicit: {
				form: "implicit"
			}
		};
	Dn.clean = Dn.normal, Dn.reduced = Dn.root;
	var Hn = Dn;
	let Gn = [],
		En = 0;
	for (; En < 64;) Gn[En] = 0 | 4294967296 * Math.sin(++En % Math.PI);
	var On = function(e) {
		let t, n, r, a = [t = 1732584193, n = 4023233417, ~t, ~n],
			o = [],
			i = decodeURI(encodeURI(e)) + "",
			s = i.length;
		for (e = --s / 4 + 2 | 15, o[--e] = 8 * s; ~s;) o[s >> 2] |= i.charCodeAt(s) << 8 * s--;
		for (En = i = 0; En < e; En += 16) {
			for (s = a; i < 64; s = [r = s[3], t + ((r = s[0] + [t & n | ~t & r, r & t | ~r & n, t ^ n ^ r, n ^ (t | ~r)][s = i >> 4] + Gn[i] + ~~o[En | 15 & [i, 5 * i + 1, 3 * i + 5, 7 * i][s]]) << (s = [7, 12, 17, 22, 5, 9, 14, 20, 4, 11, 16, 23, 6, 10, 15, 21][4 * s + i++ % 4]) | r >>> -s), t, n]) t = 0 | s[1], n = s[2];
			for (i = 4; i;) a[--i] += s[i]
		}
		for (e = ""; i < 32;) e += (a[i >> 3] >> 4 * (1 ^ i++) & 15).toString(16);
		return e
	};
	const Fn = {
		text: !0,
		terms: !0
	};
	let Vn = {
		case: "none",
		unicode: "some",
		form: "machine",
		punctuation: "some"
	};
	const zn = function(e, t) {
			return Object.assign({}, e, t)
		},
		Bn = {
			text: e => Tn(e, {
				keepPunct: !0
			}, !1),
			normal: e => Tn(e, zn(Hn.normal, {
				keepPunct: !0
			}), !1),
			implicit: e => Tn(e, zn(Hn.implicit, {
				keepPunct: !0
			}), !1),
			machine: e => Tn(e, Vn, !1),
			root: e => Tn(e, zn(Vn, {
				form: "root"
			}), !1),
			hash: e => On(Tn(e, {
				keepPunct: !0
			}, !1)),
			offset: e => {
				let t = Bn.text(e).length;
				return {
					index: e[0].offset.index,
					start: e[0].offset.start,
					length: t
				}
			},
			terms: e => e.map((e => {
				let t = Object.assign({}, e);
				return t.tags = Array.from(e.tags), t
			})),
			confidence: (e, t, n) => t.eq(n).confidence(),
			syllables: (e, t, n) => t.eq(n).syllables(),
			sentence: (e, t, n) => t.eq(n).fullSentence().text(),
			dirty: e => e.some((e => !0 === e.dirty))
		};
	Bn.sentences = Bn.sentence, Bn.clean = Bn.normal, Bn.reduced = Bn.root;
	const $n = {
		json: function(e) {
			let t = (n = this, "string" == typeof(r = (r = e) || {}) && (r = {}), (r = Object.assign({}, Fn, r)).offset && n.compute("offset"), n.docs.map(((e, t) => {
				let a = {};
				return Object.keys(r).forEach((o => {
					r[o] && Bn[o] && (a[o] = Bn[o](e, n, t))
				})), a
			})));
			var n, r;
			return "number" == typeof e ? t[e] : t
		}
	};
	$n.data = $n.json;
	var Sn = $n,
		Kn = function(e) {
			let t = this.methods.one.debug || {};
			return e && t.hasOwnProperty(e) ? (t[e](this), this) : "undefined" != typeof window && window.document ? (t.clientSide(this), this) : (t.tags(this), this)
		};
	const Mn = function(e) {
		let t = e.pre || "",
			n = e.post || "";
		return t + e.text + n
	};
	var Ln = function(e, t) {
		let n = function(e, t) {
				let n = {};
				return Object.keys(t).forEach((r => {
					e.match(r).fullPointer.forEach((e => {
						n[e[3]] = {
							fn: t[r],
							end: e[2]
						}
					}))
				})), n
			}(e, t),
			r = "";
		return e.docs.forEach(((t, a) => {
			for (let o = 0; o < t.length; o += 1) {
				let i = t[o];
				if (n.hasOwnProperty(i.id)) {
					let {
						fn: s,
						end: l
					} = n[i.id], u = e.update([
						[a, o, l]
					]);
					r += t[o].pre || "", r += s(u), o = l - 1, r += t[o].post || ""
				} else r += Mn(i)
			}
		})), r
	};
	const Jn = {
		debug: Kn,
		out: function(e) {
			if (t = e, "[object Object]" === Object.prototype.toString.call(t)) return Ln(this, e);
			var t;
			if ("text" === e) return this.text();
			if ("normal" === e) return this.text("normal");
			if ("root" === e) return this.text("root");
			if ("machine" === e || "reduced" === e) return this.text("machine");
			if ("hash" === e || "md5" === e) return On(this.text());
			if ("json" === e) return this.json();
			if ("offset" === e || "offsets" === e) return this.compute("offset"), this.json({
				offset: !0
			});
			if ("array" === e) {
				let e = this.docs.map((e => e.reduce(((e, t) => e + t.pre + t.text + t.post), "").trim()));
				return e.filter((e => e))
			}
			if ("freq" === e || "frequency" === e || "topk" === e) return function(e) {
				let t = {};
				e.forEach((e => {
					t[e] = t[e] || 0, t[e] += 1
				}));
				let n = Object.keys(t).map((e => ({
					normal: e,
					count: t[e]
				})));
				return n.sort(((e, t) => e.count > t.count ? -1 : 0))
			}(this.json({
				normal: !0
			}).map((e => e.normal)));
			if ("terms" === e) {
				let e = [];
				return this.docs.forEach((t => {
					let n = t.map((e => e.text));
					n = n.filter((e => e)), e = e.concat(n)
				})), e
			}
			return "tags" === e ? this.docs.map((e => e.reduce(((e, t) => (e[t.implicit || t.normal] = Array.from(t.tags), e)), {}))) : "debug" === e ? this.debug() : this.text()
		},
		wrap: function(e) {
			return Ln(this, e)
		}
	};
	var Wn = Jn,
		qn = {
			text: function(e) {
				let t = {};
				var n;
				if (e && "string" == typeof e && Hn.hasOwnProperty(e) ? t = Object.assign({}, Hn[e]) : e && (n = e, "[object Object]" === Object.prototype.toString.call(n)) && (t = Object.assign({}, e)), void 0 !== t.keepSpace || this.isFull() || (t.keepSpace = !1), void 0 === t.keepEndPunct && this.pointer) {
					let e = this.pointer[0];
					e && e[1] ? t.keepEndPunct = !1 : t.keepEndPunct = !0
				}
				return void 0 === t.keepPunct && (t.keepPunct = !0), void 0 === t.keepSpace && (t.keepSpace = !0),
					function(e, t) {
						let n = "";
						if (!e || !e[0] || !e[0][0]) return n;
						for (let r = 0; r < e.length; r += 1) n += Tn(e[r], t, !0);
						if (t.keepSpace || (n = n.trim()), !1 === t.keepEndPunct) {
							e[0][0].tags.has("Emoticon") || (n = n.replace(jn, ""));
							let t = e[e.length - 1];
							t[t.length - 1].tags.has("Emoticon") || (n = n.replace(Cn, "")), n.endsWith("'") && !n.endsWith("s'") && (n = n.replace(/'/, ""))
						}
						return !0 === t.cleanWhitespace && (n = n.trim()), n
					}(this.docs, t)
			}
		};
	const Un = Object.assign({}, Wn, qn, Sn, An);
	var Rn = function(e) {
			Object.assign(e.prototype, Un)
		},
		Qn = function(e) {
			console.log("%c -=-=- ", "background-color:#6699cc;"), e.forEach((e => {
				console.groupCollapsed(e.text());
				let t = e.docs[0].map((e => {
					let t = e.text || "-";
					return e.implicit && (t = "[" + e.implicit + "]"), {
						text: t,
						tags: "[" + Array.from(e.tags).join(", ") + "]"
					}
				}));
				console.table(t, ["text", "tags"]), console.groupEnd()
			}))
		};
	const _n = "[0m";
	var Zn = {
			green: e => "[32m" + e + _n,
			red: e => "[31m" + e + _n,
			blue: e => "[34m" + e + _n,
			magenta: e => "[35m" + e + _n,
			cyan: e => "[36m" + e + _n,
			yellow: e => "[33m" + e + _n,
			black: e => "[30m" + e + _n,
			dim: e => "[2m" + e + _n,
			i: e => "[3m" + e + _n
		},
		Xn = function(e) {
			let {
				docs: t,
				model: n
			} = e;
			0 === t.length && console.log(Zn.blue("\n     ──────")), t.forEach((t => {
				console.log(Zn.blue("\n  ┌─────────")), t.forEach((t => {
					let r = [...t.tags || []],
						a = t.text || "-";
					t.sense && (a = `{${t.normal}/${t.sense}}`), t.implicit && (a = "[" + t.implicit + "]"), a = Zn.yellow(a);
					let o = "'" + a + "'";
					if (t.reference) {
						let n = e.update([t.reference]).text("normal");
						o += ` - ${Zn.dim(Zn.i("["+n+"]"))}`
					}
					o = o.padEnd(18);
					let i = Zn.blue("  │ ") + Zn.i(o) + "  - " + function(e, t) {
						return t.one.tagSet && (e = e.map((e => {
							if (!t.one.tagSet.hasOwnProperty(e)) return e;
							const n = t.one.tagSet[e].color || "blue";
							return Zn[n](e)
						}))), e.join(", ")
					}(r, n);
					console.log(i)
				}))
			})), console.log("\n")
		},
		Yn = function(e) {
			let {
				docs: t
			} = e;
			console.log(""), t.forEach((e => {
				let t = [];
				e.forEach((e => {
					"Noun" === e.chunk ? t.push(Zn.blue(e.implicit || e.normal)) : "Verb" === e.chunk ? t.push(Zn.green(e.implicit || e.normal)) : "Adjective" === e.chunk ? t.push(Zn.yellow(e.implicit || e.normal)) : "Pivot" === e.chunk ? t.push(Zn.red(e.implicit || e.normal)) : t.push(e.implicit || e.normal)
				})), console.log(t.join(" "), "\n")
			})), console.log("\n")
		},
		er = function(e) {
			if (!e.found) return;
			let t = {};
			e.fullPointer.forEach((e => {
				t[e[0]] = t[e[0]] || [], t[e[0]].push(e)
			})), Object.keys(t).forEach((n => {
				let r = e.update([
					[Number(n)]
				]).text();
				e.update(t[n]).json({
					offset: !0
				}).forEach(((e, t) => {
					r = function(e, t, n) {
						let r = ((e, t, n) => {
							let r = 9 * n,
								a = t.start + r,
								o = a + t.length;
							return [e.substring(0, a), e.substring(a, o), e.substring(o, e.length)]
						})(e, t, n);
						return `${r[0]}${Zn.blue(r[1])}${r[2]}`
					}(r, e.offset, t)
				})), console.log(r)
			})), console.log("\n")
		},
		tr = {
			api: Rn,
			methods: {
				one: {
					hash: On,
					debug: {
						tags: Xn,
						clientSide: Qn,
						chunks: Yn,
						highlight: er
					}
				}
			}
		};
	const nr = function(e, t) {
			if (e[0] !== t[0]) return !1;
			let [, n, r] = e, [, a, o] = t;
			return n <= a && r > a || a <= n && o > n
		},
		rr = function(e) {
			let t = {};
			return e.forEach((e => {
				t[e[0]] = t[e[0]] || [], t[e[0]].push(e)
			})), t
		};
	var ar = function(e, t) {
			let n = rr(t),
				r = [];
			return e.forEach((e => {
				let [t] = e, a = n[t] || [];
				if (a = a.filter((t => function(e, t) {
						return e[1] <= t[1] && t[2] <= e[2]
					}(e, t))), 0 === a.length) return void r.push({
					passthrough: e
				});
				a = a.sort(((e, t) => e[1] - t[1]));
				let o = e;
				a.forEach(((e, t) => {
					let n = function(e, t) {
						let [n, r] = e, a = t[1], o = t[2], i = {};
						if (r < a) {
							let t = a < e[2] ? a : e[2];
							i.before = [n, r, t]
						}
						return i.match = t, e[2] > o && (i.after = [n, o, e[2]]), i
					}(o, e);
					a[t + 1] ? (r.push({
						before: n.before,
						match: n.match
					}), n.after && (o = n.after)) : r.push(n)
				}))
			})), r
		},
		or = function(e, t) {
			let n = [];
			return e.forEach(((r, a) => {
				if (!r) return;
				let [o, i, s, l, u] = r, c = t[o] || [];
				if (void 0 === i && (i = 0), void 0 === s && (s = c.length), !l || c[i] && c[i].id === l) c = c.slice(i, s);
				else {
					let n = function(e, t, n) {
						for (let r = 0; r < 20; r += 1) {
							if (t[n - r]) {
								let a = t[n - r].findIndex((t => t.id === e));
								if (-1 !== a) return [n - r, a]
							}
							if (t[n + r]) {
								let a = t[n + r].findIndex((t => t.id === e));
								if (-1 !== a) return [n + r, a]
							}
						}
						return null
					}(l, t, o);
					if (null !== n) {
						let r = s - i;
						c = t[n[0]].slice(n[1], n[1] + r);
						let o = c[0] ? c[0].id : null;
						e[a] = [n[0], n[1], n[1] + r, o]
					}
				}
				0 !== c.length && i !== s && (u && c[c.length - 1].id !== u && (c = function(e, t) {
					let [n, r, , , a] = e, o = t[n], i = o.findIndex((e => e.id === a));
					return -1 === i ? (e[2] = t[n].length, e[4] = o.length ? o[o.length - 1].id : null) : e[2] = i, t[n].slice(r, e[2] + 1)
				}(r, t)), n.push(c))
			})), n = n.filter((e => e.length > 0)), n
		},
		ir = {
			one: {
				termList: function(e) {
					let t = [];
					for (let n = 0; n < e.length; n += 1)
						for (let r = 0; r < e[n].length; r += 1) t.push(e[n][r]);
					return t
				},
				getDoc: or,
				pointer: {
					indexN: rr,
					splitAll: ar
				}
			}
		},
		sr = function(e, t) {
			let n = e.concat(t),
				r = rr(n),
				a = [];
			return n.forEach((e => {
				let [t] = e;
				if (1 === r[t].length) return void a.push(e);
				let n = r[t].filter((t => nr(e, t)));
				n.push(e);
				let o = function(e) {
					let t = e[0][1],
						n = e[0][2];
					return e.forEach((e => {
						e[1] < t && (t = e[1]), e[2] > n && (n = e[2])
					})), [e[0][0], t, n]
				}(n);
				a.push(o)
			})), a = function(e) {
				let t = {};
				for (let n = 0; n < e.length; n += 1) t[e[n].join(",")] = e[n];
				return Object.values(t)
			}(a), a
		},
		lr = function(e, t) {
			let n = [];
			return ar(e, t).forEach((e => {
				e.passthrough && n.push(e.passthrough), e.before && n.push(e.before), e.after && n.push(e.after)
			})), n
		},
		ur = function(e, t) {
			let n = rr(t),
				r = [];
			return e.forEach((e => {
				let t = n[e[0]] || [];
				t = t.filter((t => nr(e, t))), 0 !== t.length && t.forEach((t => {
					let n = function(e, t) {
						let n = e[1] < t[1] ? t[1] : e[1],
							r = e[2] > t[2] ? t[2] : e[2];
						return n < r ? [e[0], n, r] : null
					}(e, t);
					n && r.push(n)
				}))
			})), r
		};
	const cr = (e, t) => {
			return "string" == typeof e || (n = e, "[object Array]" === Object.prototype.toString.call(n)) ? t.match(e) : e || t.none();
			var n
		},
		hr = function(e, t) {
			return e.map((e => {
				let [n, r] = e;
				return t[n] && t[n][r] && (e[3] = t[n][r].id), e
			}))
		},
		dr = {
			union: function(e) {
				e = cr(e, this);
				let t = sr(this.fullPointer, e.fullPointer);
				return t = hr(t, this.document), this.toView(t)
			}
		};
	dr.and = dr.union, dr.intersection = function(e) {
		e = cr(e, this);
		let t = ur(this.fullPointer, e.fullPointer);
		return t = hr(t, this.document), this.toView(t)
	}, dr.not = function(e) {
		e = cr(e, this);
		let t = lr(this.fullPointer, e.fullPointer);
		return t = hr(t, this.document), this.toView(t)
	}, dr.difference = dr.not, dr.complement = function() {
		let e = this.all(),
			t = lr(e.fullPointer, this.fullPointer);
		return t = hr(t, this.document), this.toView(t)
	}, dr.settle = function() {
		let e = this.fullPointer;
		return e.forEach((t => {
			e = sr(e, [t])
		})), e = hr(e, this.document), this.update(e)
	};
	var gr = function(e) {
			Object.assign(e.prototype, dr)
		},
		mr = {
			methods: ir,
			api: gr
		},
		pr = function(e) {
			e.prototype.sweep = function(e, t = {}) {
				const {
					world: n,
					docs: r
				} = this, {
					methods: a
				} = n;
				let o = a.one.bulkMatch(r, e, this.methods, t);
				!1 !== t.tagger && a.one.bulkTagger(o, r, this.world), o = o.map((e => {
					let t = e.pointer,
						n = r[t[0]][t[1]],
						a = t[2] - t[1];
					return n.index && (e.pointer = [n.index[0], n.index[1], t[1] + a]), e
				}));
				let i = o.map((e => e.pointer));
				return o = o.map((e => (e.view = this.update([e.pointer]), delete e.regs, delete e.needs, delete e.pointer, delete e._expanded, e))), {
					view: this.update(i),
					found: o
				}
			}
		};
	const fr = function(e) {
		return !0 === e.optional || !0 === e.negative ? null : e.tag ? "#" + e.tag : e.word ? e.word : e.switch ? `%${e.switch}%` : null
	};
	var vr = function(e, t) {
			const n = t.methods.one.parseMatch;
			return e.forEach((e => {
				e.regs = n(e.match, {}, t), "string" == typeof e.ifNo && (e.ifNo = [e.ifNo]), e.notIf && (e.notIf = n(e.notIf, {}, t)), e.needs = function(e) {
					let t = [];
					return e.forEach((e => {
						t.push(fr(e)), "and" === e.operator && e.choices && e.choices.forEach((e => {
							e.forEach((e => {
								t.push(fr(e))
							}))
						}))
					})), t.filter((e => e))
				}(e.regs);
				let {
					wants: r,
					count: a
				} = function(e) {
					let t = [],
						n = 0;
					return e.forEach((e => {
						"or" !== e.operator || e.optional || e.negative || (e.fastOr && Array.from(e.fastOr).forEach((e => {
							t.push(e)
						})), e.choices && e.choices.forEach((e => {
							e.forEach((e => {
								let n = fr(e);
								n && t.push(n)
							}))
						})), n += 1)
					})), {
						wants: t,
						count: n
					}
				}(e.regs);
				e.wants = r, e.minWant = a, e.minWords = e.regs.filter((e => !e.optional)).length
			})), e
		},
		br = function(e, t) {
			e = vr(e, t);
			let n = {};
			e.forEach((e => {
				e.needs.forEach((t => {
					n[t] = Array.isArray(n[t]) ? n[t] : [], n[t].push(e)
				})), e.wants.forEach((t => {
					n[t] = Array.isArray(n[t]) ? n[t] : [], n[t].push(e)
				}))
			})), Object.keys(n).forEach((e => {
				let t = {};
				n[e] = n[e].filter((e => "boolean" != typeof t[e.match] && (t[e.match] = !0, !0)))
			}));
			let r = e.filter((e => 0 === e.needs.length && 0 === e.wants.length));
			return {
				hooks: n,
				always: r
			}
		},
		yr = function(e, t) {
			return e.map(((n, r) => {
				let a = [];
				Object.keys(t).forEach((n => {
					e[r].has(n) && (a = a.concat(t[n]))
				}));
				let o = {};
				return a = a.filter((e => "boolean" != typeof o[e.match] && (o[e.match] = !0, !0))), a
			}))
		},
		wr = function(e, t) {
			return e.map(((e, n) => {
				let r = t[n];
				return e = (e = (e = e.filter((e => e.needs.every((e => r.has(e)))))).filter((e => void 0 === e.ifNo || !0 !== e.ifNo.some((e => r.has(e)))))).filter((e => 0 === e.wants.length || e.wants.filter((e => r.has(e))).length >= e.minWant))
			}))
		},
		kr = function(e, t, n, r, a) {
			let o = [];
			for (let n = 0; n < e.length; n += 1)
				for (let i = 0; i < e[n].length; i += 1) {
					let s = e[n][i],
						l = r.one.match([t[n]], s);
					if (l.ptrs.length > 0 && (l.ptrs.forEach((e => {
							e[0] = n;
							let t = Object.assign({}, s, {
								pointer: e
							});
							void 0 !== s.unTag && (t.unTag = s.unTag), o.push(t)
						})), !0 === a.matchOne)) return [o[0]]
				}
			return o
		},
		Pr = function(e, t, n, r = {}) {
			let a = n.one.cacheDoc(e),
				o = yr(a, t.hooks);
			return o = wr(o, a), t.always.length > 0 && (o = o.map((e => e.concat(t.always)))), o = function(e, t) {
				return e.map(((e, n) => {
					let r = t[n].length;
					return e = e.filter((e => r >= e.minWords)), e
				}))
			}(o, e), kr(o, e, a, n, r)
		},
		Ar = function(e, t, n) {
			let r = n.one.tagSet;
			if (!r.hasOwnProperty(t)) return !0;
			let a = r[t].not || [];
			for (let t = 0; t < e.length; t += 1) {
				let n = e[t];
				for (let e = 0; e < a.length; e += 1)
					if (!0 === n.tags.has(a[e])) return !1
			}
			return !0
		},
		Cr = function(e, t, n) {
			const {
				model: r,
				methods: a
			} = n, {
				getDoc: o,
				setTag: i,
				unTag: s
			} = a.one, l = a.two.looksPlural;
			return 0 === e.length ? e : (("undefined" != typeof process && process.env ? process.env : self.env || {}).DEBUG_TAGS && console.log(`\n\n  [32m→ ${e.length} post-tagger:[0m`), e.map((e => {
				if (!e.tag && !e.chunk && !e.unTag) return;
				let a = e.reason || e.match,
					u = o([e.pointer], t)[0];
				if (!0 === e.safe) {
					if (!1 === Ar(u, e.tag, r)) return;
					if ("-" === u[u.length - 1].post) return
				}
				if (void 0 !== e.tag) {
					if (i(u, e.tag, n, e.safe, `[post] '${a}'`), "Noun" === e.tag && l) {
						let t = u[u.length - 1];
						l(t.text) ? i([t], "Plural", n, e.safe, "quick-plural") : i([t], "Singular", n, e.safe, "quick-singular")
					}!0 === e.freeze && u.forEach((e => e.frozen = !0))
				}
				void 0 !== e.unTag && s(u, e.unTag, n, e.safe, a), e.chunk && u.forEach((t => t.chunk = e.chunk))
			})))
		},
		jr = {
			lib: {
				buildNet: function(e) {
					let t = this.methods().one.buildNet(e, this.world());
					return t.isNet = !0, t
				}
			},
			api: pr,
			methods: {
				one: {
					buildNet: br,
					bulkMatch: Pr,
					bulkTagger: Cr
				}
			}
		};
	const Nr = / /,
		xr = function(e, t) {
			"Noun" === t && (e.chunk = t), "Verb" === t && (e.chunk = t)
		},
		Ir = function(e, t, n, r) {
			if (!0 === e.tags.has(t)) return null;
			if ("." === t) return null;
			!0 === e.frozen && (r = !0);
			let a = n[t];
			if (a) {
				if (a.not && a.not.length > 0)
					for (let t = 0; t < a.not.length; t += 1) {
						if (!0 === r && e.tags.has(a.not[t])) return null;
						e.tags.delete(a.not[t])
					}
				if (a.parents && a.parents.length > 0)
					for (let t = 0; t < a.parents.length; t += 1) e.tags.add(a.parents[t]), xr(e, a.parents[t])
			}
			return e.tags.add(t), e.dirty = !0, xr(e, t), !0
		},
		Tr = function(e, t, n = {}, r, a) {
			const o = n.model.one.tagSet || {};
			if (!t) return;
			const i = "undefined" != typeof process && process.env ? process.env : self.env || {};
			var s;
			if (i && i.DEBUG_TAGS && ((e, t, n = "") => {
					let r = e.map((e => e.text || "[" + e.implicit + "]")).join(" ");
					var a;
					"string" != typeof t && t.length > 2 && (t = t.slice(0, 2).join(", #") + " +"), t = "string" != typeof t ? t.join(", #") : t, console.log(` ${(a=r,"[33m[3m"+a+"[0m").padEnd(24)} [32m→[0m #${t.padEnd(22)}  ${(e=>"[3m"+e+"[0m")(n)}`)
				})(e, t, a), 1 != (s = t, "[object Array]" === Object.prototype.toString.call(s)))
				if ("string" == typeof t)
					if (t = t.trim(), Nr.test(t)) ! function(e, t, n, r) {
						let a = t.split(Nr);
						e.forEach(((e, t) => {
							let o = a[t];
							o && (o = o.replace(/^#/, ""), Ir(e, o, n, r))
						}))
					}(e, t, o, r);
					else {
						t = t.replace(/^#/, "");
						for (let n = 0; n < e.length; n += 1) Ir(e[n], t, o, r)
					}
			else console.warn(`compromise: Invalid tag '${t}'`);
			else t.forEach((t => Tr(e, t, n, r)))
		};
	var Dr = Tr,
		Hr = function(e, t, n) {
			t = t.trim().replace(/^#/, "");
			for (let r = 0; r < e.length; r += 1) {
				let a = e[r];
				if (!0 === a.frozen) continue;
				if ("*" === t) {
					a.tags.clear();
					continue
				}
				let o = n[t];
				if (o && o.children.length > 0)
					for (let e = 0; e < o.children.length; e += 1) a.tags.delete(o.children[e]);
				a.tags.delete(t)
			}
		},
		Gr = function(e, t, n) {
			if (!n.hasOwnProperty(t)) return !0;
			let r = n[t].not || [];
			for (let t = 0; t < r.length; t += 1)
				if (e.tags.has(r[t])) return !1;
			return !0
		};
	const Er = function(e) {
			return e.children = e.children || [], e._cache = e._cache || {}, e.props = e.props || {}, e._cache.parents = e._cache.parents || [], e._cache.children = e._cache.children || [], e
		},
		Or = /^ *(#|\/\/)/,
		Fr = function(e) {
			let t = e.trim().split(/->/),
				n = [];
			t.forEach((e => {
				n = n.concat(function(e) {
					if (!(e = e.trim())) return null;
					if (/^\[/.test(e) && /\]$/.test(e)) {
						let t = (e = (e = e.replace(/^\[/, "")).replace(/\]$/, "")).split(/,/);
						return t = t.map((e => e.trim())).filter((e => e)), t = t.map((e => Er({
							id: e
						}))), t
					}
					return [Er({
						id: e
					})]
				}(e))
			})), n = n.filter((e => e));
			let r = n[0];
			for (let e = 1; e < n.length; e += 1) r.children.push(n[e]), r = n[e];
			return n[0]
		},
		Vr = (e, t) => {
			let n = [],
				r = [e];
			for (; r.length > 0;) {
				let e = r.pop();
				n.push(e), e.children && e.children.forEach((n => {
					t && t(e, n), r.push(n)
				}))
			}
			return n
		},
		zr = e => "[object Array]" === Object.prototype.toString.call(e),
		Br = e => (e = e || "").trim(),
		$r = function(e = []) {
			return "string" == typeof e ? function(e) {
				let t = e.split(/\r?\n/),
					n = [];
				t.forEach((e => {
					if (!e.trim() || Or.test(e)) return;
					let t = (e => {
						const t = /^( {2}|\t)/;
						let n = 0;
						for (; t.test(e);) e = e.replace(t, ""), n += 1;
						return n
					})(e);
					n.push({
						indent: t,
						node: Fr(e)
					})
				}));
				let r = function(e) {
					let t = {
						children: []
					};
					return e.forEach(((n, r) => {
						0 === n.indent ? t.children = t.children.concat(n.node) : e[r - 1] && function(e, t) {
							let n = e[t].indent;
							for (; t >= 0; t -= 1)
								if (e[t].indent < n) return e[t];
							return e[0]
						}(e, r).node.children.push(n.node)
					})), t
				}(n);
				return r = Er(r), r
			}(e) : zr(e) ? function(e) {
				let t = {};
				e.forEach((e => {
					t[e.id] = e
				}));
				let n = Er({});
				return e.forEach((e => {
					if ((e = Er(e)).parent)
						if (t.hasOwnProperty(e.parent)) {
							let n = t[e.parent];
							delete e.parent, n.children.push(e)
						} else console.warn(`[Grad] - missing node '${e.parent}'`);
					else n.children.push(e)
				})), n
			}(e) : (Vr(t = e).forEach(Er), t);
			var t
		},
		Sr = function(e, t) {
			let n = "-> ";
			t && (n = (e => "[2m" + e + "[0m")("→ "));
			let r = "";
			return Vr(e).forEach(((e, a) => {
				let o = e.id || "";
				if (t && (o = (e => "[31m" + e + "[0m")(o)), 0 === a && !e.id) return;
				let i = e._cache.parents.length;
				r += "    ".repeat(i) + n + o + "\n"
			})), r
		},
		Kr = function(e) {
			let t = Vr(e);
			t.forEach((e => {
				delete(e = Object.assign({}, e)).children
			}));
			let n = t[0];
			return n && !n.id && 0 === Object.keys(n.props).length && t.shift(), t
		},
		Mr = {
			text: Sr,
			txt: Sr,
			array: Kr,
			flat: Kr
		},
		Lr = function(e, t) {
			return "nested" === t || "json" === t ? e : "debug" === t ? (console.log(Sr(e, !0)), null) : Mr.hasOwnProperty(t) ? Mr[t](e) : e
		},
		Jr = e => {
			Vr(e, ((e, t) => {
				e.id && (e._cache.parents = e._cache.parents || [], t._cache.parents = e._cache.parents.concat([e.id]))
			}))
		},
		Wr = /\//;
	let qr = class g {
		constructor(e = {}) {
			Object.defineProperty(this, "json", {
				enumerable: !1,
				value: e,
				writable: !0
			})
		}
		get children() {
			return this.json.children
		}
		get id() {
			return this.json.id
		}
		get found() {
			return this.json.id || this.json.children.length > 0
		}
		props(e = {}) {
			let t = this.json.props || {};
			return "string" == typeof e && (t[e] = !0), this.json.props = Object.assign(t, e), this
		}
		get(e) {
			if (e = Br(e), !Wr.test(e)) {
				let t = this.json.children.find((t => t.id === e));
				return new g(t)
			}
			let t = ((e, t) => {
				let n = (e => "string" != typeof e ? e : (e = e.replace(/^\//, "")).split(/\//))(t = t || "");
				for (let t = 0; t < n.length; t += 1) {
					let r = e.children.find((e => e.id === n[t]));
					if (!r) return null;
					e = r
				}
				return e
			})(this.json, e) || Er({});
			return new g(t)
		}
		add(e, t = {}) {
			if (zr(e)) return e.forEach((e => this.add(Br(e), t))), this;
			e = Br(e);
			let n = Er({
				id: e,
				props: t
			});
			return this.json.children.push(n), new g(n)
		}
		remove(e) {
			return e = Br(e), this.json.children = this.json.children.filter((t => t.id !== e)), this
		}
		nodes() {
			return Vr(this.json).map((e => (delete(e = Object.assign({}, e)).children, e)))
		}
		cache() {
			return (e => {
				let t = Vr(e, ((e, t) => {
						e.id && (e._cache.parents = e._cache.parents || [], e._cache.children = e._cache.children || [], t._cache.parents = e._cache.parents.concat([e.id]))
					})),
					n = {};
				t.forEach((e => {
					e.id && (n[e.id] = e)
				})), t.forEach((e => {
					e._cache.parents.forEach((t => {
						n.hasOwnProperty(t) && n[t]._cache.children.push(e.id)
					}))
				})), e._cache.children = Object.keys(n)
			})(this.json), this
		}
		list() {
			return Vr(this.json)
		}
		fillDown() {
			var e;
			return e = this.json, Vr(e, ((e, t) => {
				t.props = ((e, t) => (Object.keys(t).forEach((n => {
					if (t[n] instanceof Set) {
						let r = e[n] || new Set;
						e[n] = new Set([...r, ...t[n]])
					} else if ((e => e && "object" == typeof e && !Array.isArray(e))(t[n])) {
						let r = e[n] || {};
						e[n] = Object.assign({}, t[n], r)
					} else zr(t[n]) ? e[n] = t[n].concat(e[n] || []) : void 0 === e[n] && (e[n] = t[n])
				})), e))(t.props, e.props)
			})), this
		}
		depth() {
			Jr(this.json);
			let e = Vr(this.json),
				t = e.length > 1 ? 1 : 0;
			return e.forEach((e => {
				if (0 === e._cache.parents.length) return;
				let n = e._cache.parents.length + 1;
				n > t && (t = n)
			})), t
		}
		out(e) {
			return Jr(this.json), Lr(this.json, e)
		}
		debug() {
			return Jr(this.json), Lr(this.json, "debug"), this
		}
	};
	const Ur = function(e) {
		let t = $r(e);
		return new qr(t)
	};
	Ur.prototype.plugin = function(e) {
		e(this)
	};
	var Rr = {
		Noun: "blue",
		Verb: "green",
		Negative: "green",
		Date: "red",
		Value: "red",
		Adjective: "magenta",
		Preposition: "cyan",
		Conjunction: "cyan",
		Determiner: "cyan",
		Hyphenated: "cyan",
		Adverb: "cyan"
	};
	const Qr = function(e) {
		if (Rr.hasOwnProperty(e.id)) return Rr[e.id];
		if (Rr.hasOwnProperty(e.is)) return Rr[e.is];
		let t = e._cache.parents.find((e => Rr[e]));
		return Rr[t]
	};
	var _r = function(e) {
		const t = {};
		return e.forEach((e => {
			let {
				not: n,
				also: r,
				is: a,
				novel: o
			} = e.props, i = e._cache.parents;
			r && (i = i.concat(r)), t[e.id] = {
				is: a,
				not: n,
				novel: o,
				also: r,
				parents: i,
				children: e._cache.children,
				color: Qr(e)
			}
		})), Object.keys(t).forEach((e => {
			let n = new Set(t[e].not);
			t[e].not.forEach((e => {
				t[e] && t[e].children.forEach((e => n.add(e)))
			})), t[e].not = Array.from(n)
		})), t
	};
	const Zr = function(e) {
		return e ? "string" == typeof e ? [e] : e : []
	};
	var Xr = function(e, t) {
			return e = function(e, t) {
				return Object.keys(e).forEach((n => {
					e[n].isA && (e[n].is = e[n].isA), e[n].notA && (e[n].not = e[n].notA), e[n].is && "string" == typeof e[n].is && (t.hasOwnProperty(e[n].is) || e.hasOwnProperty(e[n].is) || (e[e[n].is] = {})), e[n].not && "string" == typeof e[n].not && !e.hasOwnProperty(e[n].not) && (t.hasOwnProperty(e[n].not) || e.hasOwnProperty(e[n].not) || (e[e[n].not] = {}))
				})), e
			}(e, t), Object.keys(e).forEach((t => {
				e[t].children = Zr(e[t].children), e[t].not = Zr(e[t].not)
			})), Object.keys(e).forEach((t => {
				(e[t].not || []).forEach((n => {
					e[n] && e[n].not && e[n].not.push(t)
				}))
			})), e
		},
		Yr = function(e, t) {
			Object.keys(t).length > 0 && (e = function(e) {
				return Object.keys(e).forEach((t => {
					e[t] = Object.assign({}, e[t]), e[t].novel = !0
				})), e
			}(e)), e = Xr(e, t);
			const n = function(e) {
				const t = Object.keys(e).map((t => {
					let n = e[t];
					const r = {
						not: new Set(n.not),
						also: n.also,
						is: n.is,
						novel: n.novel
					};
					return {
						id: t,
						parent: n.is,
						props: r,
						children: []
					}
				}));
				return Ur(t).cache().fillDown().out("array")
			}(Object.assign({}, t, e));
			return _r(n)
		},
		ea = {
			one: {
				setTag: Dr,
				unTag: Hr,
				addTags: Yr,
				canBe: Gr
			}
		};
	const ta = function(e) {
			return "[object Array]" === Object.prototype.toString.call(e)
		},
		na = {
			tag: function(e, t = "", n) {
				if (!this.found || !e) return this;
				let r = this.termList();
				if (0 === r.length) return this;
				const {
					methods: a,
					verbose: o,
					world: i
				} = this;
				return !0 === o && console.log(" +  ", e, t || ""), ta(e) ? e.forEach((e => a.one.setTag(r, e, i, n, t))) : a.one.setTag(r, e, i, n, t), this.uncache(), this
			},
			tagSafe: function(e, t = "") {
				return this.tag(e, t, !0)
			},
			unTag: function(e, t) {
				if (!this.found || !e) return this;
				let n = this.termList();
				if (0 === n.length) return this;
				const {
					methods: r,
					verbose: a,
					model: o
				} = this;
				!0 === a && console.log(" -  ", e, t || "");
				let i = o.one.tagSet;
				return ta(e) ? e.forEach((e => r.one.unTag(n, e, i))) : r.one.unTag(n, e, i), this.uncache(), this
			},
			canBe: function(e) {
				e = e.replace(/^#/, "");
				let t = this.model.one.tagSet,
					n = this.methods.one.canBe,
					r = [];
				this.document.forEach(((a, o) => {
					a.forEach(((a, i) => {
						n(a, e, t) || r.push([o, i, i + 1])
					}))
				}));
				let a = this.update(r);
				return this.difference(a)
			}
		};
	var ra = na,
		aa = function(e) {
			Object.assign(e.prototype, ra)
		},
		oa = {
			addTags: function(e) {
				const {
					model: t,
					methods: n
				} = this.world(), r = t.one.tagSet;
				let a = (0, n.one.addTags)(e, r);
				return t.one.tagSet = a, this
			}
		};
	const ia = new Set(["Auxiliary", "Possessive"]);
	var sa = function(e) {
			const {
				document: t,
				world: n
			} = e, r = n.model.one.tagSet;
			t.forEach((e => {
				e.forEach((e => {
					let t = Array.from(e.tags);
					e.tagRank = function(e, t) {
						return e = e.sort(((e, n) => {
							if (ia.has(e) || !t.hasOwnProperty(n)) return 1;
							if (ia.has(n) || !t.hasOwnProperty(e)) return -1;
							let r = t[e].children || [],
								a = r.length;
							return r = t[n].children || [], a - r.length
						})), e
					}(t, r)
				}))
			}))
		},
		la = {
			model: {
				one: {
					tagSet: {}
				}
			},
			compute: {
				tagRank: sa
			},
			methods: ea,
			api: aa,
			lib: oa
		};
	const ua = /([.!?\u203D\u2E18\u203C\u2047-\u2049\u3002]+\s)/g,
		ca = /^[.!?\u203D\u2E18\u203C\u2047-\u2049\u3002]+\s$/,
		ha = /((?:\r?\n|\r)+)/;
	var da = function(e) {
		let t = [],
			n = e.split(ha);
		for (let e = 0; e < n.length; e++) {
			let r = n[e].split(ua);
			for (let e = 0; e < r.length; e++) r[e + 1] && !0 === ca.test(r[e + 1]) && (r[e] += r[e + 1], r[e + 1] = ""), "" !== r[e] && t.push(r[e])
		}
		return t
	};
	const ga = /[a-z0-9\u00C0-\u00FF\u00a9\u00ae\u2000-\u3300\ud000-\udfff]/i,
		ma = /\S/;
	var pa = function(e) {
			let t = [];
			for (let n = 0; n < e.length; n++) {
				let r = e[n];
				if (void 0 !== r && "" !== r) {
					if (!1 === ma.test(r) || !1 === ga.test(r)) {
						if (t[t.length - 1]) {
							t[t.length - 1] += r;
							continue
						}
						if (e[n + 1]) {
							e[n + 1] = r + e[n + 1];
							continue
						}
					}
					t.push(r)
				}
			}
			return t
		},
		fa = function(e, t) {
			const n = t.methods.one.tokenize.isSentence,
				r = t.model.one.abbreviations || new Set;
			let a = [];
			for (let t = 0; t < e.length; t++) {
				let o = e[t];
				e[t + 1] && !1 === n(o, r) ? e[t + 1] = o + (e[t + 1] || "") : o && o.length > 0 && (a.push(o), e[t] = "")
			}
			return a
		};
	const va = {
			'"': '"',
			"＂": "＂",
			"“": "”",
			"‟": "”",
			"„": "”",
			"⹂": "”",
			"‚": "’",
			"«": "»",
			"‹": "›",
			"‵": "′",
			"‶": "″",
			"‷": "‴",
			"〝": "〞",
			"〟": "〞"
		},
		ba = RegExp("[" + Object.keys(va).join("") + "]", "g"),
		ya = RegExp("[" + Object.values(va).join("") + "]", "g"),
		wa = function(e) {
			if (!e) return !1;
			let t = e.match(ya);
			return null !== t && 1 === t.length
		};
	var ka = function(e) {
		let t = [];
		for (let n = 0; n < e.length; n += 1) {
			let r = e[n].match(ba);
			if (null !== r && 1 === r.length) {
				if (wa(e[n + 1]) && e[n + 1].length < 280) {
					e[n] += e[n + 1], t.push(e[n]), e[n + 1] = "", n += 1;
					continue
				}
				if (wa(e[n + 2])) {
					let r = e[n + 1] + e[n + 2];
					if (r.length < 280) {
						e[n] += r, t.push(e[n]), e[n + 1] = "", e[n + 2] = "", n += 2;
						continue
					}
				}
			}
			t.push(e[n])
		}
		return t
	};
	const Pa = /\(/g,
		Aa = /\)/g;
	var Ca = function(e) {
		let t = [];
		for (let n = 0; n < e.length; n += 1) {
			let r = e[n].match(Pa);
			null !== r && 1 === r.length && e[n + 1] && e[n + 1].length < 250 && null !== e[n + 1].match(Aa) && 1 === r.length && !Pa.test(e[n + 1]) ? (e[n] += e[n + 1], t.push(e[n]), e[n + 1] = "", n += 1) : t.push(e[n])
		}
		return t
	};
	const ja = /\S/,
		Na = /^\s+/;
	var xa = function(e, t) {
		if (e = e || "", !(e = String(e)) || "string" != typeof e || !1 === ja.test(e)) return [];
		e = e.replace(" ", " ");
		let n = da(e),
			r = pa(n);
		if (r = fa(r, t), r = ka(r), r = Ca(r), 0 === r.length) return [e];
		for (let e = 1; e < r.length; e += 1) {
			let t = r[e].match(Na);
			null !== t && (r[e - 1] += t[0], r[e] = r[e].replace(Na, ""))
		}
		return r
	};
	const Ia = function(e, t) {
			let n = e.split(/[-–—]/);
			if (n.length <= 1) return !1;
			const {
				prefixes: r,
				suffixes: a
			} = t.one;
			return (1 !== n[0].length || !/[a-z]/i.test(n[0])) && (!r.hasOwnProperty(n[0]) && (n[1] = n[1].trim().replace(/[.?!]$/, ""), !a.hasOwnProperty(n[1]) && (!0 === /^([a-z\u00C0-\u00FF`"'/]+)[-–—]([a-z0-9\u00C0-\u00FF].*)/i.test(e) || !0 === /^[('"]?([0-9]{1,4})[-–—]([a-z\u00C0-\u00FF`"'/-]+[)'"]?$)/i.test(e))))
		},
		Ta = function(e) {
			let t = [];
			const n = e.split(/[-–—]/);
			let r = "-",
				a = e.match(/[-–—]/);
			a && a[0] && (r = a);
			for (let e = 0; e < n.length; e++) e === n.length - 1 ? t.push(n[e]) : t.push(n[e] + r);
			return t
		};
	var Da = function(e) {
		const t = /^[0-9]{1,4}(:[0-9][0-9])?([a-z]{1,2})? ?[-–—] ?$/,
			n = /^[0-9]{1,4}([a-z]{1,2})? ?$/;
		for (let r = 0; r < e.length - 1; r += 1) e[r + 1] && t.test(e[r]) && n.test(e[r + 1]) && (e[r] = e[r] + e[r + 1], e[r + 1] = null);
		return e
	};
	const Ha = /\p{L} ?\/ ?\p{L}+$/u;
	var Ga = function(e) {
		for (let t = 1; t < e.length - 1; t++) Ha.test(e[t]) && (e[t - 1] += e[t] + e[t + 1], e[t] = null, e[t + 1] = null);
		return e
	};
	const Ea = /\S/,
		Oa = /^[!?.]+$/,
		Fa = /(\S+)/;
	let Va = [".", "?", "!", ":", ";", "-", "–", "—", "--", "...", "(", ")", "[", "]", '"', "'", "`", "«", "»", "*", "•"];
	Va = Va.reduce(((e, t) => (e[t] = !0, e)), {});
	var za = function(e, t) {
		let n = [],
			r = [];
		if ("number" == typeof(e = e || "") && (e = String(e)), function(e) {
				return "[object Array]" === Object.prototype.toString.call(e)
			}(e)) return e;
		const a = e.split(Fa);
		for (let e = 0; e < a.length; e++) !0 !== Ia(a[e], t) ? r.push(a[e]) : r = r.concat(Ta(a[e]));
		let o = "";
		for (let e = 0; e < r.length; e++) {
			let t = r[e];
			!0 === Ea.test(t) && !1 === Va.hasOwnProperty(t) && !1 === Oa.test(t) ? (n.length > 0 ? (n[n.length - 1] += o, n.push(t)) : n.push(o + t), o = "") : o += t
		}
		return o && (0 === n.length && (n[0] = ""), n[n.length - 1] += o), n = Ga(n), n = Da(n), n = n.filter((e => e)), n
	};
	const Ba = /\p{Letter}/u,
		$a = /[\p{Number}\p{Currency_Symbol}]/u,
		Sa = /^[a-z]\.([a-z]\.)+/i,
		Ka = /[sn]['’]$/;
	var Ma = function(e, t) {
			let {
				prePunctuation: n,
				postPunctuation: r,
				emoticons: a
			} = t.one, o = e, i = "", s = "", l = Array.from(e);
			if (a.hasOwnProperty(e.trim())) return {
				str: e.trim(),
				pre: i,
				post: " "
			};
			let u = l.length;
			for (let e = 0; e < u; e += 1) {
				let e = l[0];
				if (!0 !== n[e]) {
					if (("+" === e || "-" === e) && $a.test(l[1])) break;
					if ("'" === e && 3 === e.length && $a.test(l[1])) break;
					if (Ba.test(e) || $a.test(e)) break;
					i += l.shift()
				}
			}
			u = l.length;
			for (let e = 0; e < u; e += 1) {
				let e = l[l.length - 1];
				if (!0 !== r[e]) {
					if (Ba.test(e) || $a.test(e)) break;
					"." === e && !0 === Sa.test(o) || "'" === e && !0 === Ka.test(o) || (s = l.pop() + s)
				}
			}
			return "" === (e = l.join("")) && (o = o.replace(/ *$/, (e => (s = e || "", ""))), e = o, i = ""), {
				str: e,
				pre: i,
				post: s
			}
		},
		La = (e, t) => {
			let {
				str: n,
				pre: r,
				post: a
			} = Ma(e, t);
			return {
				text: n,
				pre: r,
				post: a,
				tags: new Set
			}
		},
		Ja = function(e, t) {
			const n = t.model.one.unicode || {};
			let r = (e = e || "").split("");
			return r.forEach(((e, t) => {
				n[e] && (r[t] = n[e])
			})), r.join("")
		},
		Wa = function(e) {
			let t = e = (e = (e = e || "").toLowerCase()).trim();
			return e = (e = (e = e.replace(/[,;.!?]+$/, "")).replace(/\u2026/g, "...")).replace(/\u2013/g, "-"), !1 === /^[:;]/.test(e) && (e = (e = (e = e.replace(/\.{3,}$/g, "")).replace(/[",.!:;?)]+$/g, "")).replace(/^['"(]+/g, "")), "" === (e = (e = e.replace(/[\u200B-\u200D\uFEFF]/g, "")).trim()) && (e = t), e = e.replace(/([0-9]),([0-9])/g, "$1$2")
		};
	const qa = /([A-Z]\.)+[A-Z]?,?$/,
		Ua = /^[A-Z]\.,?$/,
		Ra = /[A-Z]{2,}('s|,)?$/,
		Qa = /([a-z]\.)+[a-z]\.?$/;
	var _a = function(e) {
			return function(e) {
				return !0 === qa.test(e) || !0 === Qa.test(e) || !0 === Ua.test(e) || !0 === Ra.test(e)
			}(e) && (e = e.replace(/\./g, "")), e
		},
		Za = function(e, t) {
			const n = t.methods.one.killUnicode;
			let r = e.text || "";
			r = Wa(r), r = n(r, t), r = _a(r), e.normal = r
		},
		Xa = function(e, t) {
			const {
				methods: n,
				model: r
			} = t, {
				splitSentences: a,
				splitTerms: o,
				splitWhitespace: i
			} = n.one.tokenize;
			return e = a(e = e || "", t).map((e => {
				let n = o(e, r);
				return n = n.map((e => i(e, r))), n.forEach((e => {
					Za(e, t)
				})), n
			})), e
		};
	const Ya = /[ .][A-Z]\.? *$/i,
		eo = /(?:\u2026|\.{2,}) *$/,
		to = /\p{L}/u,
		no = /\. *$/,
		ro = /^[A-Z]\. $/;
	var ao = function(e, t) {
			if (!1 === to.test(e)) return !1;
			if (!0 === Ya.test(e)) return !1;
			if (3 === e.length && ro.test(e)) return !1;
			if (!0 === eo.test(e)) return !1;
			let n = e.replace(/[.!?\u203D\u2E18\u203C\u2047-\u2049] *$/, "").split(" "),
				r = n[n.length - 1].toLowerCase();
			return !0 !== t.hasOwnProperty(r) || !0 !== no.test(e)
		},
		oo = {
			one: {
				killUnicode: Ja,
				tokenize: {
					splitSentences: xa,
					isSentence: ao,
					splitTerms: za,
					splitWhitespace: La,
					fromString: Xa
				}
			}
		},
		io = {
			"&": "and",
			"@": "at",
			"%": "percent",
			plz: "please",
			bein: "being"
		};
	let so = {},
		lo = {};
	[
		[
			["approx", "apt", "bc", "cyn", "eg", "esp", "est", "etc", "ex", "exp", "prob", "pron", "gal", "min", "pseud", "fig", "jd", "lat", "lng", "vol", "fm", "def", "misc", "plz", "ea", "ps", "sec", "pt", "pref", "pl", "pp", "qt", "fr", "sq", "nee", "ss", "tel", "temp", "vet", "ver", "fem", "masc", "eng", "adj", "vb", "rb", "inf", "situ", "vivo", "vitro", "wr"]
		],
		[
			["dl", "ml", "gal", "qt", "pt", "tbl", "tsp", "tbsp", "km", "dm", "cm", "mm", "mi", "td", "hr", "hrs", "kg", "hg", "dg", "cg", "mg", "µg", "lb", "oz", "sq ft", "hz", "mps", "mph", "kmph", "kb", "mb", "tb", "lx", "lm", "fl oz", "yb"], "Unit"
		],
		[
			["ad", "al", "arc", "ba", "bl", "ca", "cca", "col", "corp", "ft", "fy", "ie", "lit", "ma", "md", "pd", "tce"], "Noun"
		],
		[
			["adj", "adm", "adv", "asst", "atty", "bldg", "brig", "capt", "cmdr", "comdr", "cpl", "det", "dr", "esq", "gen", "gov", "hon", "jr", "llb", "lt", "maj", "messrs", "mlle", "mme", "mr", "mrs", "ms", "mstr", "phd", "prof", "pvt", "rep", "reps", "res", "rev", "sen", "sens", "sfc", "sgt", "sir", "sr", "supt", "surg"], "Honorific"
		],
		[
			["jan", "feb", "mar", "apr", "jun", "jul", "aug", "sep", "sept", "oct", "nov", "dec"], "Month"
		],
		[
			["dept", "univ", "assn", "bros", "inc", "ltd", "co"], "Organization"
		],
		[
			["rd", "st", "dist", "mt", "ave", "blvd", "cl", "cres", "hwy", "ariz", "cal", "calif", "colo", "conn", "fla", "fl", "ga", "ida", "ia", "kan", "kans", "minn", "neb", "nebr", "okla", "penna", "penn", "pa", "dak", "tenn", "tex", "ut", "vt", "va", "wis", "wisc", "wy", "wyo", "usafa", "alta", "ont", "que", "sask"], "Place"
		]
	].forEach((e => {
		e[0].forEach((t => {
			so[t] = !0, lo[t] = "Abbreviation", void 0 !== e[1] && (lo[t] = [lo[t], e[1]])
		}))
	}));
	var uo = ["anti", "bi", "co", "contra", "de", "extra", "infra", "inter", "intra", "macro", "micro", "mis", "mono", "multi", "peri", "pre", "pro", "proto", "pseudo", "re", "sub", "supra", "trans", "tri", "un", "out", "ex"].reduce(((e, t) => (e[t] = !0, e)), {});
	let co = {
			"!": "¡",
			"?": "¿Ɂ",
			'"': '“”"❝❞',
			"'": "‘‛❛❜’",
			"-": "—–",
			a: "ªÀÁÂÃÄÅàáâãäåĀāĂăĄąǍǎǞǟǠǡǺǻȀȁȂȃȦȧȺΆΑΔΛάαλАаѦѧӐӑӒӓƛæ",
			b: "ßþƀƁƂƃƄƅɃΒβϐϦБВЪЬвъьѢѣҌҍ",
			c: "¢©ÇçĆćĈĉĊċČčƆƇƈȻȼͻͼϲϹϽϾСсєҀҁҪҫ",
			d: "ÐĎďĐđƉƊȡƋƌ",
			e: "ÈÉÊËèéêëĒēĔĕĖėĘęĚěƐȄȅȆȇȨȩɆɇΈΕΞΣέεξϵЀЁЕеѐёҼҽҾҿӖӗễ",
			f: "ƑƒϜϝӺӻҒғſ",
			g: "ĜĝĞğĠġĢģƓǤǥǦǧǴǵ",
			h: "ĤĥĦħƕǶȞȟΉΗЂЊЋНнђћҢңҤҥҺһӉӊ",
			I: "ÌÍÎÏ",
			i: "ìíîïĨĩĪīĬĭĮįİıƖƗȈȉȊȋΊΐΪίιϊІЇіїi̇",
			j: "ĴĵǰȷɈɉϳЈј",
			k: "ĶķĸƘƙǨǩΚκЌЖКжкќҚқҜҝҞҟҠҡ",
			l: "ĹĺĻļĽľĿŀŁłƚƪǀǏǐȴȽΙӀӏ",
			m: "ΜϺϻМмӍӎ",
			n: "ÑñŃńŅņŇňŉŊŋƝƞǸǹȠȵΝΠήηϞЍИЙЛПийлпѝҊҋӅӆӢӣӤӥπ",
			o: "ÒÓÔÕÖØðòóôõöøŌōŎŏŐőƟƠơǑǒǪǫǬǭǾǿȌȍȎȏȪȫȬȭȮȯȰȱΌΘΟθοσόϕϘϙϬϴОФоѲѳӦӧӨөӪӫ",
			p: "ƤΡρϷϸϼРрҎҏÞ",
			q: "Ɋɋ",
			r: "ŔŕŖŗŘřƦȐȑȒȓɌɍЃГЯгяѓҐґ",
			s: "ŚśŜŝŞşŠšƧƨȘșȿЅѕ",
			t: "ŢţŤťŦŧƫƬƭƮȚțȶȾΓΤτϮТт",
			u: "ÙÚÛÜùúûüŨũŪūŬŭŮůŰűŲųƯưƱƲǓǔǕǖǗǘǙǚǛǜȔȕȖȗɄΰυϋύ",
			v: "νѴѵѶѷ",
			w: "ŴŵƜωώϖϢϣШЩшщѡѿ",
			x: "×ΧχϗϰХхҲҳӼӽӾӿ",
			y: "ÝýÿŶŷŸƳƴȲȳɎɏΎΥΫγψϒϓϔЎУучўѰѱҮүҰұӮӯӰӱӲӳ",
			z: "ŹźŻżŽžƵƶȤȥɀΖ"
		},
		ho = {};
	Object.keys(co).forEach((function(e) {
		co[e].split("").forEach((function(t) {
			ho[t] = e
		}))
	}));
	const go = /\//,
		mo = /[a-z]\.[a-z]/i,
		po = /[0-9]/;
	var fo = function(e, t) {
		let n = e.normal || e.text || e.machine;
		const r = t.model.one.aliases;
		if (r.hasOwnProperty(n) && (e.alias = e.alias || [], e.alias.push(r[n])), go.test(n) && !mo.test(n) && !po.test(n)) {
			let t = n.split(go);
			t.length <= 3 && t.forEach((t => {
				"" !== (t = t.trim()) && (e.alias = e.alias || [], e.alias.push(t))
			}))
		}
		return e
	};
	const vo = /^\p{Letter}+-\p{Letter}+$/u;
	var bo = function(e) {
			let t = e.implicit || e.normal || e.text;
			t = t.replace(/['’]s$/, ""), t = t.replace(/s['’]$/, "s"), t = t.replace(/([aeiou][ktrp])in'$/, "$1ing"), vo.test(t) && (t = t.replace(/-/g, "")), t = t.replace(/^[#@]/, ""), t !== e.normal && (e.machine = t)
		},
		yo = function(e) {
			let t = e.docs,
				n = {};
			for (let e = 0; e < t.length; e += 1)
				for (let r = 0; r < t[e].length; r += 1) {
					let a = t[e][r],
						o = a.machine || a.normal;
					n[o] = n[o] || 0, n[o] += 1
				}
			for (let e = 0; e < t.length; e += 1)
				for (let r = 0; r < t[e].length; r += 1) {
					let a = t[e][r],
						o = a.machine || a.normal;
					a.freq = n[o]
				}
		},
		wo = function(e) {
			let t = 0,
				n = 0,
				r = e.document;
			for (let e = 0; e < r.length; e += 1)
				for (let a = 0; a < r[e].length; a += 1) {
					let o = r[e][a];
					o.offset = {
						index: n,
						start: t + o.pre.length,
						length: o.text.length
					}, t += o.pre.length + o.text.length + o.post.length, n += 1
				}
		},
		ko = function(e) {
			let t = e.document;
			for (let e = 0; e < t.length; e += 1)
				for (let n = 0; n < t[e].length; n += 1) t[e][n].index = [e, n]
		},
		Po = function(e) {
			let t = 0,
				n = e.docs;
			for (let e = 0; e < n.length; e += 1)
				for (let r = 0; r < n[e].length; r += 1) "" !== n[e][r].normal && (t += 1, n[e][r].wordCount = t)
		};
	const Ao = function(e, t) {
		let n = e.docs;
		for (let r = 0; r < n.length; r += 1)
			for (let a = 0; a < n[r].length; a += 1) t(n[r][a], e.world)
	};
	var Co = {
			compute: {
				alias: e => Ao(e, fo),
				machine: e => Ao(e, bo),
				normal: e => Ao(e, Za),
				freq: yo,
				offset: wo,
				index: ko,
				wordCount: Po
			},
			methods: oo,
			model: {
				one: {
					aliases: io,
					abbreviations: so,
					prefixes: uo,
					suffixes: {
						like: !0,
						ish: !0,
						less: !0,
						able: !0,
						elect: !0,
						type: !0,
						designate: !0
					},
					prePunctuation: {
						"#": !0,
						"@": !0,
						_: !0,
						"°": !0,
						"​": !0,
						"‌": !0,
						"‍": !0,
						"\ufeff": !0
					},
					postPunctuation: {
						"%": !0,
						_: !0,
						"°": !0,
						"​": !0,
						"‌": !0,
						"‍": !0,
						"\ufeff": !0
					},
					lexicon: lo,
					unicode: ho,
					emoticons: {
						"<3": !0,
						"</3": !0,
						"<\\3": !0,
						":^P": !0,
						":^p": !0,
						":^O": !0,
						":^3": !0
					}
				}
			},
			hooks: ["alias", "machine", "index", "id"]
		},
		jo = {
			typeahead: function(e) {
				const t = e.model.one.typeahead,
					n = e.docs;
				if (0 === n.length || 0 === Object.keys(t).length) return;
				let r = n[n.length - 1] || [],
					a = r[r.length - 1];
				if (!a.post && t.hasOwnProperty(a.normal)) {
					let n = t[a.normal];
					a.implicit = n, a.machine = n, a.typeahead = !0, e.compute.preTagger && e.last().unTag("*").compute(["lexicon", "preTagger"])
				}
			}
		};
	const No = function() {
		const e = this.docs;
		if (0 === e.length) return this;
		let t = e[e.length - 1] || [],
			n = t[t.length - 1];
		return !0 === n.typeahead && n.machine && (n.text = n.machine, n.normal = n.machine), this
	};
	var xo = function(e) {
			e.prototype.autoFill = No
		},
		Io = function(e, t, n) {
			let r = {},
				a = [],
				o = n.prefixes || {};
			return e.forEach((e => {
				let i = (e = e.toLowerCase().trim()).length;
				t.max && i > t.max && (i = t.max);
				for (let s = t.min; s < i; s += 1) {
					let i = e.substring(0, s);
					t.safe && n.model.one.lexicon.hasOwnProperty(i) || (!0 !== o.hasOwnProperty(i) && !0 !== r.hasOwnProperty(i) ? r[i] = e : a.push(i))
				}
			})), r = Object.assign({}, o, r), a.forEach((e => {
				delete r[e]
			})), r
		};
	const To = {
		safe: !0,
		min: 3
	};
	var Do = {
			typeahead: function(e = [], t = {}) {
				let n = this.model();
				var r;
				t = Object.assign({}, To, t), r = e, "[object Object]" === Object.prototype.toString.call(r) && (Object.assign(n.one.lexicon, e), e = Object.keys(e));
				let a = Io(e, t, this.world());
				return Object.keys(a).forEach((e => {
					n.one.typeahead.hasOwnProperty(e) ? delete n.one.typeahead[e] : n.one.typeahead[e] = a[e]
				})), this
			}
		},
		Ho = {
			model: {
				one: {
					typeahead: {}
				}
			},
			api: xo,
			lib: Do,
			compute: jo,
			hooks: ["typeahead"]
		};
	v.extend(ee), v.extend(tr), v.extend(yn), v.extend(mr), v.extend(la), v.plugin(He), v.extend(Co), v.extend(Ve), v.plugin(k), v.extend(Xe), v.extend(Ho), v.extend(Je), v.extend(jr);
	var Go = {
			addendum: "addenda",
			corpus: "corpora",
			criterion: "criteria",
			curriculum: "curricula",
			genus: "genera",
			memorandum: "memoranda",
			opus: "opera",
			ovum: "ova",
			phenomenon: "phenomena",
			referendum: "referenda",
			alga: "algae",
			alumna: "alumnae",
			antenna: "antennae",
			formula: "formulae",
			larva: "larvae",
			nebula: "nebulae",
			vertebra: "vertebrae",
			analysis: "analyses",
			axis: "axes",
			diagnosis: "diagnoses",
			parenthesis: "parentheses",
			prognosis: "prognoses",
			synopsis: "synopses",
			thesis: "theses",
			neurosis: "neuroses",
			appendix: "appendices",
			index: "indices",
			matrix: "matrices",
			ox: "oxen",
			sex: "sexes",
			alumnus: "alumni",
			bacillus: "bacilli",
			cactus: "cacti",
			fungus: "fungi",
			hippopotamus: "hippopotami",
			libretto: "libretti",
			modulus: "moduli",
			nucleus: "nuclei",
			octopus: "octopi",
			radius: "radii",
			stimulus: "stimuli",
			syllabus: "syllabi",
			cookie: "cookies",
			calorie: "calories",
			auntie: "aunties",
			movie: "movies",
			pie: "pies",
			rookie: "rookies",
			tie: "ties",
			zombie: "zombies",
			leaf: "leaves",
			loaf: "loaves",
			thief: "thieves",
			foot: "feet",
			goose: "geese",
			tooth: "teeth",
			beau: "beaux",
			chateau: "chateaux",
			tableau: "tableaux",
			bus: "buses",
			gas: "gases",
			circus: "circuses",
			crisis: "crises",
			virus: "viruses",
			database: "databases",
			excuse: "excuses",
			abuse: "abuses",
			avocado: "avocados",
			barracks: "barracks",
			child: "children",
			clothes: "clothes",
			echo: "echoes",
			embargo: "embargoes",
			epoch: "epochs",
			deer: "deer",
			halo: "halos",
			man: "men",
			woman: "women",
			mosquito: "mosquitoes",
			mouse: "mice",
			person: "people",
			quiz: "quizzes",
			rodeo: "rodeos",
			shoe: "shoes",
			sombrero: "sombreros",
			stomach: "stomachs",
			tornado: "tornados",
			tuxedo: "tuxedos",
			volcano: "volcanoes"
		},
		Eo = {
			Comparative: "true¦bett1f0;arth0ew0in0;er",
			Superlative: "true¦earlier",
			PresentTense: "true¦bests,sounds",
			Condition: "true¦lest,unless",
			PastTense: "true¦began,came,d4had,kneel3l2m0sa4we1;ea0sg2;nt;eap0i0;ed;id",
			Participle: "true¦0:09;a06b01cZdXeat0fSgQhPoJprov0rHs7t6u4w1;ak0ithdra02o2r1;i02uY;k0v0;nd1pr04;ergoJoJ;ak0hHo3;e9h7lain,o6p5t4un3w1;o1um;rn;g,k;ol0reS;iQok0;ught,wn;ak0o1runk;ne,wn;en,wn;ewriNi1uJ;dd0s0;ut3ver1;do4se0t1;ak0h2;do2g1;roG;ne;ast0i7;iv0o1;ne,tt0;all0loBor1;bi3g2s1;ak0e0;iv0o9;dd0;ove,r1;a5eamt,iv0;hos0lu1;ng;e4i3lo2ui1;lt;wn;tt0;at0en,gun;r2w1;ak0ok0;is0;en",
			Gerund: "true¦accord0be0doin,go0result0stain0;ing",
			Expression: "true¦a0Yb0Uc0Sd0Oe0Mfarew0Lg0FhZjeez,lWmVnToOpLsJtIuFvEw7y0;a5e3i1u0;ck,p;k04p0;ee,pee;a0p,s;!h;!a,h,y;a5h2o1t0;af,f;rd up,w;atsoever,e1o0;a,ops;e,w;hoo,t;ery w06oi0L;gh,h0;! 0h,m;huh,oh;here nPsk,ut tut;h0ic;eesh,hh,it,oo;ff,h1l0ow,sst;ease,s,z;ew,ooey;h1i,mg,o0uch,w,y;h,o,ps;! 0h;hTmy go0wT;d,sh;a7evertheless,o0;!pe;eh,mm;ah,eh,m1ol0;!s;ao,fao;aCeBi9o2u0;h,mph,rra0zzC;h,y;l1o0;r6y9;la,y0;! 0;c1moCsmok0;es;ow;!p hip hoor0;ay;ck,e,llo,y;ha1i,lleluj0;ah;!ha;ah,ee4o1r0;eat scott,r;l1od0sh; grief,bye;ly;! whiz;ell;e0h,t cetera,ureka,ww,xcuse me;k,p;'oh,a0rat,uh;m0ng;mit,n0;!it;mon,o0;ngratulations,wabunga;a2oo1r0tw,ye;avo,r;!ya;h,m; 1h0ka,las,men,rgh,ye;!a,em,h,oy;la",
			Negative: "true¦n0;ever,o0;n,t",
			QuestionWord: "true¦how3wh0;at,e1ich,o0y;!m,se;n,re; come,'s",
			Reflexive: "true¦h4it5my5o1the0your2;ir1m1;ne3ur0;sel0;f,ves;er0im0;self",
			Plural: "true¦dick0gre0ones,records;ens",
			"Unit|Noun": "true¦cEfDgChBinchAk9lb,m6newt5oz,p4qt,t1y0;ardEd;able1b0ea1sp;!l,sp;spo1;a,t,x;on9;!b,g,i1l,m,p0;h,s;!les;!b,elvin,g,m;!es;g,z;al,b;eet,oot,t;m,up0;!s",
			Value: "true¦a few",
			Imperative: "true¦bewa0come he0;re",
			"Plural|Verb": "true¦leaves",
			Demonym: "true¦0:15;1:12;a0Vb0Oc0Dd0Ce08f07g04h02iYjVkTlPmLnIomHpEqatari,rCs7t5u4v3welAz2;am0Gimbabwe0;enezuel0ietnam0I;gAkrai1;aiwTex0hai,rinida0Ju2;ni0Prkmen;a5cotti4e3ingapoOlovak,oma0Spaniard,udRw2y0W;ede,iss;negal0Cr09;sh;mo0uT;o5us0Jw2;and0;a2eru0Fhilippi0Nortugu07uerto r0S;kist3lesti1na2raguay0;ma1;ani;ami00i2orweP;caragu0geri2;an,en;a3ex0Lo2;ngo0Drocc0;cedo1la2;gasy,y07;a4eb9i2;b2thua1;e0Cy0;o,t01;azakh,eny0o2uwaiI;re0;a2orda1;ma0Ap2;anO;celandic,nd4r2sraeli,ta01vo05;a2iB;ni0qi;i0oneU;aiAin2ondur0unO;di;amEe2hanai0reek,uatemal0;or2rm0;gi0;ilipino,ren8;cuadoVgyp4mira3ngli2sto1thiopi0urope0;shm0;ti;ti0;aPominUut3;a9h6o4roat3ub0ze2;ch;!i0;lom2ngol5;bi0;a6i2;le0n2;ese;lifor1m2na3;bo2eroo1;di0;angladeshi,el6o4r3ul2;gaE;azi9it;li2s1;vi0;aru2gi0;si0;fAl7merBngol0r5si0us2;sie,tr2;a2i0;li0;genti2me1;ne;ba1ge2;ri0;ni0;gh0r2;ic0;an",
			Organization: "true¦0:4Q;a3Tb3Bc2Od2He2Df27g1Zh1Ti1Pj1Nk1Ll1Gm12n0Po0Mp0Cqu0Br02sTtHuCv9w3xiaomi,y1;amaha,m1Bou1w1B;gov,tu3C;a4e2iki1orld trade organizati33;leaRped0O;lls fargo,st1;fie2Hinghou2R;l1rner br3U;gree3Jl street journ2Im1E;an halOeriz2Xisa,o1;dafo2Yl1;kswagMvo;b4kip,n2ps,s1;a tod3Aps;es3Mi1;lev3Fted natio3C;er,s; mobi32aco beRd bOe9gi frida3Lh3im horto3Amz,o1witt3D;shi49y1;ota,s r 05;e 1in lizzy;b3carpen3Jdaily ma3Dguess w2holli0s1w2;mashing pumpki35uprem0;ho;ea1lack eyed pe3Xyr0Q;ch bo3Dtl0;l2n3Qs1xas instrumen1U;co,la m1F;efoni0Kus;a8cientology,e5ieme2Ymirnoff,np,o3pice gir6quare0Ata1ubaru;rbuc1to34;ks;ny,undgard1;en;a2x pisto1;ls;g1Wrs;few2Minsbur31lesfor03msu2E;adiohead,b8e4o1yana3C;man empi1Xyal 1;b1dutch she4;ank;a3d 1max,vl20;bu1c2Ahot chili peppe2Ylobst2N;ll;ders dige1Ll madrid;c,s;ant3Aizn2Q;a8bs,e5fiz2Ihilip4i3r1;emier 1udenti1D;leagTo2K;nk floyd,zza hut; morrBs;psi2tro1uge0E;br33chi0Tn33;!co;lant2Un1yp16; 2ason27da2P;ld navy,pec,range juli2xf1;am;us;aAb9e6fl,h5i4o1sa,vid3wa;k2tre dame,vart1;is;ia;ke,ntendo,ss0QvZ;l,s;c,st1Otflix,w1; 1sweek;kids on the block,york0D;a,c;nd22s2t1;ional aca2Po,we0U;a,c02d0S;aDcdonalCe9i6lb,o3tv,y1;spa1;ce;b1Tnsanto,ody blu0t1;ley cr1or0T;ue;c2t1;as,subisO;helin,rosoft;dica2rcedes benz,talli1;ca;id,re;ds;cs milk,tt19z24;a3e1g,ittle caesa1P; ore09novo,x1;is,mark,us; 1bour party;pres0Dz boy;atv,fc,kk,lm,m1od1O;art;iffy lu0Roy divisi0Jpmorgan1sa;! cha09;bm,hop,k3n1tv;g,te1;l,rpol;ea;a5ewlett pack1Vi3o1sbc,yundai;me dep1n1P;ot;tac1zbollah;hi;lliburt08sbro;eneral 6hq,ithub,l5mb,o2reen d0Ou1;cci,ns n ros0;ldman sachs,o1;dye1g0H;ar;axo smith kli04encoW;electr0Nm1;oto0Z;a5bi,c barcelo4da,edex,i2leetwood m03o1rito l0G;rd,xcY;at,fa,nancial1restoZ; tim0;na;cebook,nnie mae;b0Asa,u3xxon1; m1m1;ob0J;!rosceptics;aiml0De5isney,o4u1;nkin donu2po0Zran dur1;an;ts;j,w jon0;a,f lepp12ll,peche mode,r spieg02stiny's chi1;ld;aJbc,hFiDloudflaCnn,o3r1;aigsli5eedence clearwater reviv1ossra09;al;c7inba6l4m1o0Est09;ca2p1;aq;st;dplSg1;ate;se;a c1o chanQ;ola;re;a,sco1tigroup;! systems;ev2i1;ck fil a,na daily;r1y;on;d2pital o1rls jr;ne;bury,ill1;ac;aEbc,eBf9l5mw,ni,o1p,rexiteeU;ei3mbardiIston 1;glo1pizza;be;ng;o2ue c1;roV;ckbuster video,omingda1;le; g1g1;oodriL;cht2e ge0rkshire hathaw1;ay;el;cardi,idu,nana republ3s1xt5y5;f,kin robbi1;ns;ic;bYcTdidSerosmith,iRlKmEnheuser busDol,ppleAr6s4u3v2y1;er;is,on;di,todesk;hland o1sociated E;il;b3g2m1;co;os;ys; compu1be0;te1;rs;ch;c,d,erican3t1;!r1;ak; ex1;pre1;ss; 5catel2ta1;ir;! lu1;ce1;nt;jazeera,qae1;da;g,rbnb;as;/dc,a3er,tivision1;! blizz1;ard;demy of scienc0;es;ba",
			Possessive: "true¦its,my,our0thy;!s",
			"Noun|Verb": "true¦0:9W;1:AA;2:96;3:A3;4:9R;5:A2;6:9K;7:8N;8:7L;9:A8;A:93;B:8D;C:8X;a9Ob8Qc7Id6Re6Gf5Sg5Hh55i4Xj4Uk4Rl4Em40n3Vo3Sp2Squ2Rr21s0Jt02u00vVwGyFzD;ip,oD;ne,om;awn,e6Fie68;aOeMhJiHoErD;ap,e9Oink2;nd0rDuC;kDry,sh5Hth;!shop;ck,nDpe,re,sh;!d,g;e86iD;p,sD;k,p0t2;aDed,lco8W;r,th0;it,lk,rEsDt4ve,x;h,te;!ehou1ra9;aGen5FiFoD;iDmAte,w;ce,d;be,ew,sA;cuum,l4B;pDr7;da5gra6Elo6A;aReQhrPiOoMrGuEwiDy5Z;n,st;nDrn;e,n7O;aGeFiEoDu6;t,ub2;bu5ck4Jgg0m,p;at,k,nd;ck,de,in,nsDp,v7J;f0i8R;ll,ne,p,r4Yss,t94uD;ch,r;ck,de,e,le,me,p,re;e5Wow,u6;ar,e,ll,mp0st,xt;g,lDng2rg7Ps5x;k,ly;a0Sc0Ne0Kh0Fi0Dk0Cl0Am08n06o05pXquaBtKuFwD;ea88iD;ng,pe,t4;bGit,m,ppErD;fa3ge,pri1v2U;lDo6S;e6Py;!je8;aMeLiKoHrEuDy2;dy,ff,mb2;a85eEiDo5Pugg2;ke,ng;am,ss,t4;ckEop,p,rD;e,m;ing,pi2;ck,nk,t4;er,m,p;ck,ff,ge,in,ke,lEmp,nd,p2rDte,y;!e,t;k,l;aJeIiHlGoFrDur,y;ay,e56inDu3;g,k2;ns8Bt;a5Qit;ll,n,r87te;ed,ll;m,n,rk;b,uC;aDee1Tow;ke,p;a5Je4FiDo53;le,rk;eep,iDou4;ce,p,t;ateboa7Ii;de,gnDl2Vnk,p,ze;!al;aGeFiEoDuff2;ck,p,re,w;ft,p,v0;d,i3Ylt0;ck,de,pe,re,ve;aEed,nDrv1It;se,t2N;l,r4t;aGhedu2oBrD;aEeDibb2o3Z;en,w;pe,t4;le,n,r2M;cDfegua72il,mp2;k,rifi3;aZeHhy6LiGoEuD;b,in,le,n,s5X;a6ck,ll,oDpe,u5;f,t;de,ng,ot,p,s1W;aTcSdo,el,fQgPje8lOmMnLo17pJque6sFturn,vDwa6V;eDi27;al,r1;er74oFpe8tEuD;lt,me;!a55;l71rt;air,eaDly,o53;l,t;dezvo2Zt;aDedy;ke,rk;ea1i4G;a6Iist0r5N;act6Yer1Vo71uD;nd,se;a38o6F;ch,s6G;c1Dge,iEke,lly,nDp1Wt1W;ge,k,t;n,se;es6Biv0;a04e00hYiXlToNrEsy4uD;mp,n4rcha1sh;aKeIiHoDu4O;be,ceFdu3fi2grDje8mi1p,te6;amDe6W;!me;ed,ss;ce,de,nt;sDy;er6Cs;cti3i1;iHlFoEp,re,sDuCw0;e,i5Yt;l,p;iDl;ce,sh;nt,s5V;aEce,e32uD;g,mp,n7;ce,nDy;!t;ck,le,n17pe,tNvot;a1oD;ne,tograph;ak,eFnErDt;fu55mA;!c32;!l,r;ckJiInHrFsEtDu1y;ch,e9;s,te;k,tD;!y;!ic;nt,r,se;!a7;bje8ff0il,oErDutli3Qver4B;bAd0ie9;ze;a4ReFoDur1;d,tD;e,i3;ed,gle8tD;!work;aMeKiIoEuD;rd0;ck,d3Rld,nEp,uDve;nt,th;it5EkD;ey;lk,n4Brr5CsDx;s,ta2B;asuBn4UrDss;ge,it;il,nFp,rk3WsEtD;ch,t0;h,k,t0;da5n0oeuvB;aLeJiHoEuD;mp,st;aEbby,ck,g,oDve;k,t;d,n;cDe,ft,mAnIst;en1k;aDc0Pe4vK;ch,d,k,p,se;bFcEnd,p,t4uD;gh,n4;e,k;el,o2U;eEiDno4E;ck,d,ll,ss;el,y;aEo1OuD;i3mp;m,zz;mpJnEr46ssD;ue;c1Rdex,fluGha2k,se2HteDvoi3;nt,rD;e6fa3viD;ew;en3;a8le2A;aJeHiGoEuD;g,nt;l3Ano2Dok,pDr1u1;!e;ghli1Fke,nt,re,t;aDd7lp;d,t;ck,mGndFrEsh,tDu9;ch,e;bo3Xm,ne4Eve6;!le;!m0;aMear,ift,lKossJrFuD;arDe4Alp,n;antee,d;aFiEoDumb2;uCwth;ll,nd,p;de,sp;ip;aBoDue;ss,w;g,in,me,ng,s,te,ze;aZeWiRlNoJrFuD;ck,el,nDss,zz;c38d;aEoDy;st,wn;cDgme,me,nchi1;tuB;cFg,il,ld,rD;ce,e29mDwa31;!at;us;aFe0Vip,oDy;at,ck,od,wD;!er;g,ke,me,re,sh,vo1E;eGgFlEnDre,sh,t,x;an3i0Q;e,m,t0;ht,uB;ld;aEeDn3;d,l;r,tuB;ce,il,ll,rm,vo2W;cho,d7ffe8nMsKxFyeD;!baD;ll;cGerci1hFpDtra8;eriDo0W;en3me9;au6ibA;el,han7u1;caDtima5;pe;count0d,vy;a01eSiMoJrEuDye;b,el,mp,pli2X;aGeFiEoD;ne,p;ft,ll,nk,p,ve;am,ss;ft,g,in;cEd7ubt,wnloD;ad;k,u0E;ge6p,sFt4vD;e,iDor3;de;char7gui1h,liEpD;at4lay,u5;ke;al,bKcJfeIlGmaCposAsEtaD;il;e07iD;gn,re;ay,ega5iD;ght;at,ct;li04rea1;a5ut;b,ma7n3rDte;e,t;a0Eent0Dh06irc2l03oKrFuD;be,e,rDt;b,e,l,ve;aGeFoEuDy;sh;p,ss,wd;dAep;ck,ft,sh;at,de,in,lTmMnFordina5py,re,st,uDv0;gh,nDp2rt;s01t;ceHdu8fli8glomeIsFtDveN;a8rD;a6ol;e9tru8;ct;ntDrn;ra5;bHfoGmFpD;leDouCromi1;me9;aCe9it,u5;rt;at,iD;ne;lap1oD;r,ur;aEiDoud,ub;ck,p;im,w;aEeDip;at,ck,er;iGllen7nErD;ge,m,t;ge,nD;el;n,r;er,re;ke,ll,mp,noe,pGrXsFtEuDve;se,ti0I;alog,ch;h,t;!tuB;re;a03eZiXlToPrHuEyD;pa11;bb2ck2dgEff0mp,rDst,zz;den,n;et;anJeHiFoadEuD;i1sh;ca6;be,d7;ge;aDed;ch,k;ch,d;aFg,mb,nEoDrd0tt2x,ycott;k,st,t;d,e;rd,st;aFeCiDoYur;nk,tz;nd;me;as,d,ke,nd,opsy,tD;!ch,e;aFef,lt,nDt;d,efA;it;r,t;ck,il,lan3nIrFsEtt2;le;e,h;!gDk;aDe;in;!d,g,k;bu1c05dZge,iYlVnTppQrLsIttGucEwaD;rd;tiD;on;aDempt;ck;k,sD;i6ocia5;st;chFmD;!oD;ur;!iD;ve;eEroa4;ch;al;chDg0sw0;or;aEt0;er;rm;d,m,r;dreHvD;an3oD;ca5;te;ce;ss;cDe,he,t;eFoD;rd,u9;nt;nt,ss;se",
			Actor: "true¦0:7B;1:7G;2:6A;3:7F;4:7O;5:7K;a6Nb62c4Ud4Be41f3Sg3Bh30i2Uj2Qkin2Pl2Km26n1Zo1Sp0Vqu0Tr0JsQtJuHvEw8yo6;gi,ut6;h,ub0;aAe9i8o7r6;estl0it0;m2rk0;fe,nn0t2Bza2H;atherm2ld0;ge earn0it0nder0rri1;eter7i6oyF;ll5Qp,s3Z;an,ina2U;n6s0;c6Uder03;aoisea23e9herapi5iktok0o8r6ut1yco6S;a6endseLo43;d0mp,nscri0Bvel0;ddl0u1G;a0Qchn7en6na4st0;ag0;i3Oo0D;aiXcUeRhPiMki0mu26oJpGquaFtBu7wee6;p0theart;lt2per7r6;f0ge6Iviv1;h6inten0Ist5Ivis1;ero,um2;a8ep7r6;ang0eam0;bro2Nc2Ofa2Nmo2Nsi20;ff0tesm2;tt0;ec7ir2Do6;kesp59u0M;ia5Jt3;l7me6An,rcere6ul;r,ss;di0oi5;n7s6;sy,t0;g0n0;am2ephe1Iow6;girl,m2r2Q;cretInior cit3Fr6;gea4v6;a4it1;hol4Xi7reen6ulpt1;wr2C;e01on;l1nt;aEe9o8u6;l0nn6;er up,ingE;g40le mod3Zof0;a4Zc8fug2Ppo32searQv6;ere4Uolution6;ary;e6luYru22;ptio3T;bbi,dic5Vpp0;arter6e2Z;back;aYeWhSiRlOoKr8sycho7u6;nk,p31;logi5;aGeDiBo6;d9fess1g7ph47s6;pe2Ktitu51;en6ramm0;it1y;igy,uc0;est4Nme mini0Unce6s3E;!ss;a7si6;de4;ch0;ctiti39nk0P;dca0Oet,li6pula50rnst42;c2Itic6;al scie6i2;nti5;a6umb0;nn0y6;er,ma4Lwright;lgrim,one0;a8iloso7otogra7ra6ysi1V;se;ph0;ntom,rmaci5;r6ssi1T;form0s4O;i3El,nel3Yr8st1tr6wn;i6on;arWot;ent4Wi42tn0;ccupa4ffBp8r7ut6;ca5l0B;ac4Iganiz0ig2Fph2;er3t6;i1Jomet6;ri5;ic0spring;aBe9ie4Xo7u6;n,rser3J;b6mad,vi4V;le2Vo4D;i6mesis,phew;ce,ghb1;nny,rr3t1X;aEeDiAo7u6yst1Y;m8si16;der3gul,m7n6th0;arDk;!my;ni7s6;f02s0Jt0;on,st0;chan1Qnt1rcha4;gi9k0n8rtyr,t6y1;e,riar6;ch;ag0iac;ci2stra3I;a7e2Aieutena4o6;rd,s0v0;bor0d7ndlo6ss,urea3Fwy0ym2;rd;!y;!s28;e8o7u6;ggl0;gg0urna2U;st0;c3Hdol,llu3Ummigra4n6; l9c1Qfa4habi42nov3s7ve6;nt1stig3;pe0Nt6;a1Fig3ru0M;aw;airFeBistoAo8u6ygie1K;man6sba2H;!ita8;bo,st6usekN;age,e3P;ri2;ir,r6;m7o6;!ine;it;dress0sty2C;aLeIhostGirl26ladi3oCrand7u6;e5ru;c9daug0Jfa8m7pa6s2Y;!re4;a,o6;th0;hi1B;al7d6lf0;!de3A;ie,k6te26;eep0;!wr6;it0;isha,n6;i6tl04;us;mbl0rden0;aDella,iAo7r6;eela2Nie1P;e,re6ster pare4;be1Hm2r6st0;unn0;an2ZgZlmm17nanci0r6tt0;e6st la2H; marsh2OfigXm2;rm0th0;conoEdDlectriCm8n7x6;amin0cellency,i2A;emy,trepreneur,vironmenta1J;c8p6;er1loye6;e,r;ee;ci2;it1;mi5;aKeBi8ork,ri7u6we02;de,tche2H;ft0v0;ct3eti7plom2Hre6va;ct1;ci2ti2;aDcor3fencCi0InAput9s7tectLvel6;op0;ce1Ge6ign0;rt0;ee,y;iz6;en;em2;c1Ml0;d8nc0redev7ug6;ht0;il;!dy;a06e04fo,hXitizenWlToBr9u6;r3stomer6;! representat6;ive;e3it6;ic;lJmGnAord9rpor1Nu7w6;boy,ork0;n6ri0;ciTte1Q;in3;fidantAgressSs9t6;e0Kr6;ibut1o6;ll0;tab13ul1O;!e;edi2m6pos0rade;a0EeQissi6;on0;leag8on7um6;ni5;el;ue;e6own;an0r6;ic,k;!s;a9e7i6um;ld;erle6f;ad0;ir7nce6plFract0;ll1;m2wI;lebri6o;ty;dBptAr6shi0;e7pe6;nt0;r,t6;ak0;ain;et;aMeLiJlogg0oErBu6;dd0Fild0rgl9siness6;m2p7w6;om2;ers05;ar;i7o6;!k0th0;cklay0de,gadi0;hemi2oge8y6;!frie6;nd;ym2;an;cyc6sR;li5;atbox0ings;by,nk0r6;b0on7te6;nd0;!e07;c04dWge4nQpLrHsFtAu7yatull6;ah;nt7t6;h1oG;!ie;h8t6;e6orney;nda4;ie5le6;te;sis00tron6;aut,om0;chbis8isto7tis6;an,t;crU;hop;ost9p6;ari6rentiS;ti6;on;le;a9cest1im3nou8y6;bo6;dy;nc0;ly5rc6;hi5;mi8v6;entur0is1;er;ni7r6;al;str3;at1;or;counBquaintanArob9t6;ivi5or,re6;ss;st;at;ce;ta4;nt",
			"Adj|Noun": "true¦0:16;a1Db17c0Ud0Re0Mf0Dg0Ah08i06ju05l02mWnUoSpNrIsBt7u4v1watershed;a1ision0Z;gabo4nilla,ria1;b0Vnt;ndergr1pstairs;adua14ou1;nd;a3e1oken,ri0;en,r1;min0rori13;boo,n;age,e5ilv0Flack,o3quat,ta2u1well;bordina0Xper5;b0Lndard;ciali0Yl1vereign;e,ve16;cret,n1ri0;ior;a4e2ou1ubbiL;nd,tiY;ar,bBl0Wnt0p1side11;resent0Vublican;ci0Qsh;a4eriodic0last0Zotenti0r1;emi2incip0o1;!fession0;er,um;rall4st,tie0U;ff1pposi0Hv0;ens0Oi0C;agg01ov1uts;el;a5e3iniatJo1;bi01der07r1;al,t0;di1tr0N;an,um;le,riG;attOi2u1;sh;ber0ght,qC;stice,veniT;de0mpressioYn1;cumbe0Edividu0no0Dsta0Eterim;alf,o1umdrum;bby,melF;en2old,ra1;ph0Bve;er0ious;a7e5i4l3u1;git03t1;ure;uid;ne;llow,m1;aFiL;ir,t,vo1;riOuriO;l3p00x1;c1ecutUpeV;ess;d1iK;er;ar2e1;mographUrivO;k,l2;hiGlassSo2rude,unn1;ing;m5n1operK;creCstitueOte2vertab1;le;mpor1nt;ary;ic,m2p1;anion,lex;er2u1;ni8;ci0;al;e5lank,o4r1;i2u1;te;ef;ttom,urgeois;st;cadem9d6l2ntarct9r1;ab,ct8;e3tern1;at1;ive;rt;oles1ult;ce1;nt;ic",
			"Adj|Past": "true¦0:4Q;1:4C;2:4H;3:4E;a44b3Tc36d2Je29f20g1Wh1Si1Jj1Gkno1Fl1Am15n12o0Xp0Mqu0Kr08sLtEuAv9w4yellow0;a7ea6o4rinkl0;r4u3Y;n,ri0;k31th3;rp0sh0tZ;ari0e1O;n5p4s0;d1li1Rset;cov3derstood,i4;fi0t0;a8e3Rhr7i6ouTr4urn0wi4C;a4imm0ou2G;ck0in0pp0;ed,r0;eat2Qi37;m0nn0r4;get0ni2T;aOcKeIhGimFm0Hoak0pDt7u4;bsid3Ogge44s4;pe4ta2Y;ct0nd0;a8e7i2Eok0r5u4;ff0mp0nn0;ength2Hip4;ed,p0;am0reotyp0;in0t0;eci4ik0oH;al3Efi0;pRul1;a4ock0ut;d0r0;a4c1Jle2t31;l0s3Ut0;a6or5r4;at4e25;ch0;r0tt3;t4ut0;is2Mur1;aEe5o4;tt0;cAdJf2Bg9je2l8m0Knew0p7qu6s4;eTpe2t4;or0ri2;e3Dir0;e1lac0;at0e2Q;i0Rul1;eiv0o4ycl0;mme2Lrd0v3;in0lli0ti2A;a4ot0;li28;aCer30iBlAo9r5u4;mp0zzl0;e6i2Oo4;ce2Fd4lo1Anou30pos0te2v0;uc0;fe1CocCp0Iss0;i2Kli1L;ann0e2CuS;ck0erc0ss0;ck0i2Hr4st0;allLk0;bse7c6pp13rgan2Dver4;lo4whelm0;ok0;cupi0;rv0;aJe5o4;t0uri1A;ed0gle2;a6e5ix0o4ut0ys1N;di1Nt15u26;as0Clt0;n4rk0;ag0ufact0A;e6i5o4;ad0ck0st,v0;cens0m04st0;ft,v4;el0;tt0wn;a5o15u4;dg0s1B;gg0;llumSmpAn4sol1;br0cre1Ldebt0f8jZspir0t5v4;it0olv0;e4ox0Y;gr1n4re23;d0si15;e2l1o1Wuri1;li0o01r4;ov0;a6e1o4um03;ok0r4;ri0Z;mm3rm0;i6r5u4;a1Bid0;a0Ui0Rown;ft0;aAe9i8l6oc0Ir4;a4i0oz0Y;ctHg19m0;avo0Ju4;st3;ni08tt0x0;ar0;d0il0sc4;in1;dCl1mBn9quipp0s8x4;agger1c6p4te0T;a0Se4os0;ct0rie1D;it0;cap0tabliZ;cha0XgFha1As4;ur0;a0Zbarra0N;i0Buc1;aMeDi5r4;a01i0;gni08miniSre2s4;a9c6grun0Ft4;o4re0Hu17;rt0;iplWou4;nt0r4;ag0;bl0;cBdRf9l8p7ra6t5v4;elop0ot0;ail0ermQ;ng0;re07;ay0ight0;e4in0o0M;rr0;ay0enTor1;m5t0z4;ed,zl0;ag0p4;en0;aPeLhIlHo9r6u4;lt4r0stom03;iv1;a5owd0u4;sh0;ck0mp0;d0loAm7n4ok0v3;centr1f5s4troC;id3olid1;us0;b5pl4;ic1;in0;r0ur0;assi9os0utt3;ar5i4;ll0;g0m0;lebr1n6r4;ti4;fi0;tralJ;g0lcul1;aDewild3iCl9o7r5urn4;ed,t;ok4uis0;en;il0r0t4und;tl0;e5i4;nd0;ss0;as0;ffl0k0laMs0tt3;bPcNdKfIg0lFmaz0nDppBrm0ss9u5wa4;rd0;g5thor4;iz0;me4;nt0;o6u4;m0r0;li0re4;ci1;im1ticip1;at0;a5leg0t3;er0;rm0;fe2;ct0;ju5o7va4;nc0;st0;ce4knowledg0;pt0;and5so4;rb0;on0;ed",
			Singular: "true¦0:5I;1:5G;2:4V;3:4R;4:51;5:56;6:5K;a4Zb4Ic3Ld33e2Vf2Mg2Hh26in22j21k20l1Sm1Jn1Fo19p0Pqu0Or0DsXtKuFvAw7x r55yo yo;a7ha3No3O;f3i4Ot0Ey7;! arou37;arAe8ideo ga2Oo7;cabu4Gl59;gMr7t;di4Wt1W;iety,ni4M;n9p2Yr8s 7;do41s5B;bani1in0;coordinat38der7;estima1to22we3Z; rex,aIeHhFiDoCr9u8v7;! show;m2Mn2rntJto1B;agedy,ib7o4B;e,u7;n0ta43;ni1p2rq3J;c,er,m7;etD;ing7ree24;!y;am,mp3D;ct2le6x return;aLcKeIhor4NiHkFoEpin off,tBu9y7;ll7ner4Jst4Q;ab2V;b7i1n26per bowl,rro1V;st3Jtot0;at8ipe2Eo1Jrate4Fudent7;! lo0G;i37u1;ft ser4Imeo1G;elet5i7;ll,r3S;b36gn2Rte;ab2Hc7min39;t,urity gua2L;e6ho2W;bbatic0la3Gndwi0Opi5;av5eBhetor2i8o7;de6om,w;t8v7;erb2A;e,u0;bBc9f7publ2r0Yspi1;er7orm3;e6r0;i7ord label;p2Ft0;a1u43;estion mark,ot2D;aNeKhoJiGlEoCr8u7yram1D;ddi3EpCrpo1Hs3G;e9o7;bl3Ws7;pe3Gta1;dic1Pmi1Dp1Oroga3Sss relea1D;p7rt0;py;a7ebisci1;q2Bte;cn2e8g7;!gy;!r;ne call,tocoI;anut,d8r7t0yo1;cen3Gsp3H;al,est0;nop4r8t7;e,hog5;adi0Zi2S;atme0bj3Cc9pia1rde0thers,utspok5ve7wn3;n,r7;ti0Nview;cu8e7;an;pi3;ar9it8ot7umb3;a2Chi2O;e,ra1;cot2ra34;aDeAi8o7ur0;nopo4p16rni2Ksq1Pti33uld;c,li0Zn08s7tt5;chief,si31;d8nu,t7;al,i3;al,ic;gna1mm0nd13rsupi0te7yf4;ri0;aBegAi9u7;ddi1n7;ch;me,p07; 9e0K;bor12y7; 7er;up;eyno1itt5;el4ourn0;c9dices,itia2Kni22s8tel0Jvert7;eb1H;e25titu1;en2Hi2Q;aGeCighBo8u7;man right,s1Z;me7rmoDsp1Dtb0I;! r7;un; scho0WriW;a7i1K;d7v5; start,pho7;ne;ndful,sh brown,v5ze;a9elat0Glaci3r7ul4yp1P;an7enadi3id;a19d slam,ny;df4r7;l2ni1F;aEeti1EiDlu1oAr8un7;er0;ee market,i7onti3;ga1;l4ur7;so7;me;eNref4;br2mi4;conoDffi1Mgg,lecto0Pmbas1BnApidem2s1Wth2ven9x8yel7;id;ampXempl0Lte6;i16t;er1Iterp7;ri7;se;my;eJiCo9r7ump tru0R;agonf4i7;er,ve thru;c8g1Bi4or,ssi3wn7;side;to0CumenC;aCgniBnn3s8vide7;nd;conte6incen1Bp7tri0Y;osi7;tion;ta0E;le0U;ath9c8f7ni0terre6;ault 03err0;al,im0;!b7;ed;aUeRhKiJlHoBr7;edit ca9uc7;ib7;le;rd;efficBke,lAmmuniqJns8pi3rr0t0Uus7yo1;in;erv7uG;atoZ;ic,lO;ie6;er0Li7oth;e6n2;ty,vil wK;aBeqAick5oco9r7;istmas car7ysanthemum;ol;la1;ue;ndeli3racteri7;st2;i8llCr7;e0tifica1;liW;hi3nDpCrAt7ucus;erpi7hedr0;ll7;ar;!bohyd7ri3;ra1;it0;a7e,nib0;l,ry;aKeJiop2leHoFrBu7;nny,r7tterf4;g7i0;la7;ry;eak8i7;ck;fa7thro9;st;dy,ro7wl;ugh;mi7;sh;an,l4;nki8rri3;er;ng;cQdKlGnDppeti1rBs9tt2utop7;sy;ic;ce6pe7;ct;r7sen0;ay;ec8oma4ti8;ly;do1;i5l7;er7y;gy;en; hominBj8van7;tage;ec7;ti7;ve;em;cAe8qui7;tt0;ta1;te;i8ru0;al;de6;nt",
			"Person|Noun": "true¦a0Eb07c03dWeUfQgOhLjHkiGlFmCnBolive,p7r4s3trini06v1wa0;ng,rd,tts;an,enus,iol0;a,et;ky,onPumm09;ay,e1o0uby;bin,d,se;ed,x;a2e1o0;l,tt04;aLnJ;dYge,tR;at,orm;a0eloW;t0x,ya;!s;a9eo,iH;ng,tP;a2e1o0;lGy;an,w3;de,smi4y;a0erb,iOolBuntR;ll,z0;el;ail,e0iLuy;ne;a1ern,i0lo;elds,nn;ith,n0;ny;a0dEmir,ula,ve;rl;a4e3i1j,ol0;ly;ck,x0;ie;an,ja;i0wn;sy;am,h0liff,rystal;a0in,ristian;mbers,ri0;ty;a4e3i2o,r0ud;an0ook;dy;ll;nedict,rg;k0nks;er;l0rt;fredo,ma",
			"Actor|Verb": "true¦aCb8c5doctor,engineAfool,g3host,judge,m2nerd,p1recruit,scout,ushAvolunteAwi0;mp,tneA;arent,ilot;an,ime;eek,oof,r0uide;adu8oom;ha1o0;ach,nscript,ok;mpion,uffeur;o2u0;lly,tch0;er;ss;ddi1ffili0rchite1;ate;ct",
			MaleName: "true¦0:H6;1:FZ;2:DS;3:GQ;4:CZ;5:FV;6:GM;7:FP;8:GW;9:ET;A:C2;B:GD;aF8bE1cCQdBMeASfA1g8Yh88i7Uj6Sk6Bl5Mm48n3So3Ip33qu31r26s1Et0Ru0Ov0CwTxSyHzC;aCor0;cChC1karia,nAT;!hDkC;!aF6;!ar7CeF5;aJevgenBSoEuC;en,rFVsCu3FvEF;if,uf;nDs6OusC;ouf,s6N;aCg;s,tC;an,h0;hli,nCrosE1ss09;is,nC;!iBU;avi2ho5;aPeNiDoCyaEL;jcieBJlfgang,odrFutR;lFnC;f8TsC;lCt1;ow;bGey,frEhe4QlC;aE5iCy;am,e,s;ed8iC;d,ed;eAur;i,ndeD2rn2sC;!l9t1;lDyC;l1ne;lDtC;!er;aCHy;aKernDAiFladDoC;jteB0lodymyr;!iC;mFQsDB;cFha0ktBZnceDrgCOvC;a0ek;!nC;t,zo;!e4StBV;lCnC7sily;!entC;in9J;ghE2lCm70nax,ri,sm0;riCyss87;ch,k;aWeRhNiLoGrEuDyC;!l2roEDs1;n6r6E;avD0eCist0oy,um0;ntCRvBKy;bFdAWmCny;!asDmCoharu;aFFie,y;!z;iA6y;mCt4;!my,othy;adEeoDia0SomC;!as;!dor91;!de4;dFrC;enBKrC;anBJeCy;ll,nBI;!dy;dgh,ha,iCnn2req,tsu5V;cDAka;aYcotWeThPiMlobod0oKpenc2tEurDvenAEyCzym1;ed,lvest2;aj,e9V;anFeDuC;!aA;fan17phEQvCwaA;e77ie;!islaCl9;v,w;lom1rBuC;leymaDHta;dDgmu9UlCm1yabonga;as,v8B;!dhart8Yn9;aEeClo75;lCrm0;d1t1;h9Jne,qu1Jun,wn,yne;aDbastiEDk2Yl5Mpp,rgCth,ymoCU;e1Dio;m4n;!tC;!ie,y;eDPlFmEnCq67tosCMul;dCj2UtiA5;e01ro;!iATkeB6mC4u5;!ik,vato9K;aZeUheC8iRoGuDyC;an,ou;b99dDf4peAssC;!elEG;ol00y;an,bLc7MdJel,geIh0lHmGnEry,sDyC;!ce;ar7Ocoe,s;!aCnBU;ld,n;an,eo;a7Ef;l7Jr;e3Eg2n9olfo,riC;go;bBNeDH;cCl9;ar87c86h54kCo;!ey,ie,y;cFeA3gDid,ubByCza;an8Ln06;g85iC;naC6s;ep;ch8Kfa5hHin2je8HlGmFndEoHpha5sDul,wi36yC;an,mo8O;h9Im4;alDSol3O;iD0on;f,ph;ul;e9CinC;cy,t1;aOeLhilJiFrCyoG;aDeC;m,st1;ka85v2O;eDoC;tr;r8GtC;er,ro;!ipCl6H;!p6U;dCLrcy,tC;ar,e9JrC;!o7;b9Udra8So9UscAHtri62ulCv8I;!ie,o7;ctav6Ji2lImHndrBRrGsDtCum6wB;is,to;aDc6k6m0vCwaBE;al79;ma;i,vR;ar,er;aDeksandr,ivC;er,i2;f,v;aNeLguyBiFoCu3O;aDel,j4l0ma0rC;beAm0;h,m;cFels,g5i9EkDlC;es,s;!au,h96l78olaC;!i,y;hCkCol76;ol75;al,d,il,ls1vC;ilAF;hom,tC;e,hC;anCy;!a5i5;aYeViLoGuDyC;l4Nr1;hamDr84staC;fa,p6E;ed,mG;di10e,hamEis4JntDritz,sCussa;es,he;e,y;ad,ed,mC;ad,ed;cGgu5hai,kFlEnDtchC;!e8O;a9Pik;house,o7t1;ae73eC3ha8Iolaj;ah,hDkC;!ey,y;aDeC;al,l;el,l;hDlv3rC;le,ri8Ev4T;di,met;ay0c00gn4hWjd,ks2NlTmadZnSrKsXtDuric7VxC;imilBKwe8B;eHhEi69tCus,y69;!eo,hCia7;ew,i67;eDiC;as,eu,s;us,w;j,o;cHiGkFlEqu8Qsha83tCv3;iCy;!m,n;in,on;el,o7us;a6Yo7us;!elCin,o7us;!l8o;frAEi5Zny,u5;achDcoCik;lm;ai,y;amDdi,e5VmC;oud;adCm6W;ou;aulCi9P;ay;aWeOiMloyd,oJuDyC;le,nd1;cFdEiDkCth2uk;a7e;gi,s,z;ov7Cv6Hw6H;!as,iC;a6Een;g0nn52renDuCvA4we7D;!iS;!zo;am,n4oC;n5r;a9Yevi,la5KnHoFst2thaEvC;eCi;nte;bo;nCpo8V;!a82el,id;!nC;aAy;mEnd1rDsz73urenCwr6K;ce,t;ry,s;ar,beAont;aOeIhalHiFla4onr63rDu5SylC;e,s;istCzysztof;i0oph2;er0ngsl9p,rC;ilA9k,ollos;ed,id;en0iGnDrmCv4Z;it;!dDnCt1;e2Ny;ri4Z;r,th;cp2j4mEna8BrDsp6them,uC;ri;im,l;al,il;a03eXiVoFuC;an,lCst3;en,iC;an,en,o,us;aQeOhKkub4AnIrGsDzC;ef;eDhCi9Wue;!ua;!f,ph;dCge;i,on;!aCny;h,s,th6J;anDnC;!ath6Hie,n72;!nC;!es;!l,sCy;ph;o,qu3;an,mC;!i,m6V;d,ffFns,rCs4;a7JemDmai7QoCry;me,ni1H;i9Dy;!e73rC;ey,y;cKdBkImHrEsDvi2yC;dBs1;on,p2;ed,oDrCv67;e6Qod;d,s61;al,es5Wis1;a,e,oCub;b,v;ob,qu13;aTbNchiMgLke53lija,nuKonut,rIsEtCv0;ai,suC;ki;aDha0i8XmaCsac;el,il;ac,iaC;h,s;a,vinCw3;!g;k,nngu6X;nac1Xor;ka;ai,rahC;im;aReLoIuCyd6;beAgGmFsC;eyDsC;a3e3;in,n;ber5W;h,o;m2raDsse3wC;a5Pie;c49t1K;a0Qct3XiGnDrC;beAman08;dr7VrC;iCy2N;!k,q1R;n0Tt3S;bKlJmza,nIo,rEsDyC;a5KdB;an,s0;lEo67r2IuCv9;hi5Hki,tC;a,o;an,ey;k,s;!im;ib;a08e00iUlenToQrMuCyorgy;iHnFsC;!taC;f,vC;!e,o;n6tC;er,h2;do,lC;herDlC;auCerQ;me;aEegCov2;!g,orC;!io,y;dy,h7C;dfr9nza3XrDttfC;ri6C;an,d47;!n;acoGlEno,oCuseppe;rgiCvan6O;!o,s;be6Ies,lC;es;mo;oFrC;aDha4HrC;it,y;ld,rd8;ffErgC;!e7iCy;!os;!r9;bElBrCv3;eCla1Nr4Hth,y;th;e,rC;e3YielC;!i4;aXeSiQlOorrest,rCyod2E;aHedFiC;edDtC;s,z;ri18;!d42eri11riC;ck,k;nCs2;cEkC;ie,lC;in,yn;esLisC;!co,z3M;etch2oC;ri0yd;d5lConn;ip;deriFliEng,rC;dinaCg4nan0B;nd8;pe,x;co;bCdi,hd;iEriC;ce,zC;io;an,en,o;benez2dZfrYit0lTmMnJo3rFsteb0th0ugenEvCymBzra;an,eCge4D;ns,re3K;!e;gi,iDnCrol,v3w3;est8ie,st;cCk;!h,k;o0DriCzo;co,qC;ue;aHerGiDmC;aGe3A;lCrh0;!iC;a10o,s;s1y;nu5;beAd1iEliDm2t1viCwood;n,s;ot28s;!as,j5Hot,sC;ha;a3en;!dGg6mFoDua2QwC;a2Pin;arC;do;oZuZ;ie;a04eTiOmitrNoFrag0uEwDylC;an,l0;ay3Hig4D;a3Gdl9nc0st3;minFnDri0ugCvydGy2S;!lF;!a36nCov0;e1Eie,y;go,iDykC;as;cCk;!k;i,y;armuFetDll1mitri7neCon,rk;sh;er,m6riC;ch;id;andLepak,j0lbeAmetri4nIon,rGsEvDwCxt2;ay30ey;en,in;hawn,moC;nd;ek,riC;ck;is,nC;is,y;rt;re;an,le,mKnIrEvC;e,iC;!d;en,iEne0PrCyl;eCin,yl;l45n;n,o,us;!iCny;el,lo;iCon;an,en,on;a0Fe0Ch03iar0lRoJrFuDyrC;il,us;rtC;!is;aEistC;iaCob12;no;ig;dy,lInErC;ey,neliCy;s,us;nEor,rDstaC;nt3;ad;or;by,e,in,l3t1;aHeEiCyde;fCnt,ve;fo0Xt1;menDt4;us;s,t;rFuDyC;!t1;dCs;e,io;enC;ce;aHeGrisC;!toC;phCs;!eC;!r;st2t;d,rCs;b5leC;s,y;cDdrCs6;ic;il;lHmFrC;ey,lDroCy;ll;!o7t1;er1iC;lo;!eb,v3;a09eZiVjorn,laUoSrEuCyr1;ddy,rtKst2;er;aKeFiEuDyC;an,ce,on;ce,no;an,ce;nDtC;!t;dDtC;!on;an,on;dFnC;dDisC;lav;en,on;!foOl9y;bby,gd0rCyd;is;i0Lke;bElDshC;al;al,lL;ek;nIrCshoi;at,nEtC;!raC;m,nd;aDhaCie;rd;rd8;!iDjam3nCs1;ie,y;to;kaMlazs,nHrC;n9rDtC;!holomew;eCy;tt;ey;dCeD;ar,iC;le;ar1Nb1Dd16fon15gust3hm12i0Zja0Yl0Bm07nTputsiSrGsaFugustEveDyCziz;a0kh0;ry;o,us;hi;aMchiKiJjun,mHnEon,tCy0;em,hCie,ur8;ur;aDoC;!ld;ud,v;aCin;an,nd8;!el,ki;baCe;ld;ta;aq;aMdHgel8tCw6;hoFoC;iDnC;!i8y;ne;ny;er7rCy;eDzC;ej;!as,i,j,s,w;!s;s,tolC;iCy;!y;ar,iEmaCos;nu5r;el;ne,r,t;aVbSdBeJfHiGl01onFphonsEt1vC;aPin;on;e,o;so,zo;!sR;!onZrC;ed;c,jaHksFssaHxC;!andC;er,rC;e,os,u;andCei;ar,er,r;ndC;ro;en;eDrecC;ht;rt8;dd3in,n,sC;taC;ir;ni;dDm6;ar;an,en;ad,eC;d,t;in;so;aGi,olErDvC;ik;ian8;f8ph;!o;mCn;!a;dGeFraDuC;!bakr,lfazl;hCm;am;!l;allFel,oulaye,ulC;!lDrahm0;an;ah,o;ah;av,on",
			Uncountable: "true¦0:2E;1:2L;2:33;a2Ub2Lc29d22e1Rf1Ng1Eh16i11j0Yk0Wl0Rm0Hn0Do0Cp03rZsLt9uran2Jv7w3you gu0E;a5his17i4oo3;d,l;ldlife,ne;rm8t1;apor,ernacul29i3;neg28ol1Otae;eDhBiAo8r4un3yranny;a,gst1B;aff2Oea1Ko4ue nor3;th;o08u3;bleshoot2Ose1Tt;night,othpas1Vwn3;foEsfoE;me off,n;er3und1;e,mod2S;a,nnis;aDcCeBhAi9ki8o7p6t4u3weepstak0;g1Unshi2Hshi;ati08e3;am,el;ace2Keci0;ap,cc1meth2C;n,ttl0;lk;eep,ingl0or1C;lf,na1Gri0;ene1Kisso1C;d0Wfe2l4nd,t3;i0Iurn;m1Ut;abi0e4ic3;e,ke15;c3i01laxa11search;ogni10rea10;a9e8hys7luto,o5re3ut2;amble,mis0s3ten20;en1Zs0L;l3rk;i28l0EyH; 16i28;a24tr0F;nt3ti0M;i0s;bstetri24vercrowd1Qxyg09;a5e4owada3utella;ys;ptu1Ows;il poliZtional securi2;aAe8o5u3;m3s1H;ps;n3o1K;ey,o3;gamy;a3cha0Elancholy,rchandi1Htallurgy;sl0t;chine3g1Aj1Hrs,thema1Q; learn1Cry;aught1e6i5ogi4u3;ck,g12;c,s1M;ce,ghtn18nguis1LteratWv1;ath1isVss;ara0EindergartPn3;icke0Aowled0Y;e3upit1;a3llyfiGwel0G;ns;ce,gnor6mp5n3;forma00ter3;net,sta07;atiSort3rov;an18;a7e6isto09o3ung1;ckey,mework,ne4o3rseradi8spitali2use arrest;ky;s2y;adquarteXre;ir,libut,ppiHs3;hi3te;sh;ene8l6o5r3um,ymnas11;a3eZ;niUss;lf,re;ut3yce0F;en; 3ti0W;edit0Hpo3;ol;aNicFlour,o4urnit3;ure;od,rgive3uri1wl;ness;arCcono0LducaBlectr9n7quip8thi0Pvery6x3;ist4per3;ti0B;en0J;body,o08th07;joy3tertain3;ment;ici2o3;ni0H;tiS;nings,th;emi02i6o4raugh3ynas2;ts;pe,wnstai3;rs;abet0ce,s3;honZrepu3;te;aDelciChAivi07l8o3urrency;al,ld w6mmenta5n3ral,ttIuscoB;fusiHt 3;ed;ry;ar;assi01oth0;es;aos,e3;eMwK;us;d,rO;a8i6lood,owlHread5u3;ntGtt1;er;!th;lliarJs3;on;g3ss;ga3;ge;cKdviJeroGirFmBn6ppeal court,r4spi3thleL;rin;ithmet3sen3;ic;i6y3;o4th3;ing;ne;se;en5n3;es2;ty;ds;craft;bi8d3nau7;yna3;mi6;ce;id,ous3;ti3;cs",
			Infinitive: "true¦0:9G;1:9T;2:AD;3:90;4:9Z;5:84;6:AH;7:A9;8:92;9:A0;A:AG;B:AI;C:9V;D:8R;E:8O;F:97;G:6H;H:7D;a94b8Hc7Jd68e4Zf4Mg4Gh4Ai3Qj3Nk3Kl3Bm34nou48o2Vp2Equ2Dr1Es0CtZuTvRwI;aOeNiLors5rI;eJiI;ng,te;ak,st3;d5e8TthI;draw,er;a2d,ep;i2ke,nIrn;d1t;aIie;liADniAry;nJpI;ho8Llift;cov1dJear8Hfound8DlIplug,rav82tie,ve94;eaAo3X;erIo;cut,go,staAFvalA3w2G;aSeQhNoMrIu73;aIe72;ffi3Smp3nsI;aBfo7CpI;i8oD;pp3ugh5;aJiJrIwaD;eat5i2;nk;aImA0;ch,se;ck3ilor,keImp1r8L;! paD;a0Ic0He0Fh0Bi0Al08mugg3n07o05p02qu01tUuLwI;aJeeIim;p,t5;ll7Wy;bNccMffLggeCmmKppJrI;mouFpa6Zvi2;o0re6Y;ari0on;er,i4;e7Numb;li9KmJsiIveD;de,st;er9it;aMe8MiKrI;ang3eIi2;ng27w;fIng;f5le;b,gg1rI;t3ve;a4AiA;a4UeJit,l7DoI;il,of;ak,nd;lIot7Kw;icEve;atGeak,i0O;aIi6;m,y;ft,ng,t;aKi6CoJriIun;nk,v6Q;ot,rt5;ke,rp5tt1;eIll,nd,que8Gv1w;!k,m;aven9ul8W;dd5tis1Iy;a0FeKiJoI;am,t,ut;d,p5;a0Ab08c06d05f01group,hea00iZjoi4lXmWnVpTq3MsOtMup,vI;amp,eJiIo3B;sEve;l,rI;e,t;i8rI;ie2ofE;eLiKpo8PtIurfa4;o24rI;aHiBuctu8;de,gn,st;mb3nt;el,hra0lIreseF;a4e71;d1ew,o07;aHe3Fo2;a7eFiIo6Jy;e2nq41ve;mbur0nf38;r0t;inKleBocus,rJuI;el,rbiA;aBeA;an4e;aBu4;ei2k8Bla43oIyc3;gni39nci3up,v1;oot,uI;ff;ct,d,liIp;se,ze;tt3viA;aAenGit,o7;aWerUinpoiFlumm1LoTrLuI;b47ke,niArIt;poDsuI;aFe;eMoI;cKd,fe4XhibEmo7noJpo0sp1tru6vI;e,i6o5L;un4;la3Nu8;aGclu6dJf1occupy,sup0JvI;a6BeF;etermi4TiB;aGllu7rtr5Ksse4Q;cei2fo4NiAmea7plex,sIva6;eve8iCua6;mp1rItrol,ve;a6It6E;bOccuNmEpMutLverIwe;l07sJtu6Yu0wI;helm;ee,h1F;gr5Cnu2Cpa4;era7i4Ipo0;py,r;ey,seItaH;r2ss;aMe0ViJoIultiply;leCu6Pw;micJnIspla4;ce,g3us;!k;iIke,na9;m,ntaH;aPeLiIo0u3N;ke,ng1quIv5;eIi6S;fy;aKnIss5;d,gI;th5;rn,ve;ng2Gu1N;eep,idnJnI;e4Cow;ap;oHuI;gg3xtaI;po0;gno8mVnIrk;cTdRfQgeChPitia7ju8q1CsNtKun6EvI;a6eIo11;nt,rt,st;erJimi6BoxiPrI;odu4u6;aBn,pr03ru6C;iCpi8tIu8;all,il,ruB;abEibE;eCo3Eu0;iIul9;ca7;i7lu6;b5Xmer0pI;aLer4Uin9ly,oJrI;e3Ais6Bo2;rt,se,veI;riA;le,rt;aLeKiIoiCuD;de,jaInd1;ck;ar,iT;mp1ng,pp5raIve;ng5Mss;ath1et,iMle27oLrI;aJeIow;et;b,pp3ze;!ve5A;gg3ve;aTer45i5RlSorMrJuI;lf4Cndrai0r48;eJiIolic;ght5;e0Qsh5;b3XeLfeEgJsI;a3Dee;eIi2;!t;clo0go,shIwa4Z;ad3F;att1ee,i36;lt1st5;a0OdEl0Mm0FnXquip,rWsVtGvTxI;aRcPeDhOiNpJtIu6;ing0Yol;eKi8lIo0un9;aHoI;it,re;ct,di7l;st,t;a3oDu3B;e30lI;a10u6;lt,mi28;alua7oI;ke,l2;chew,pou0tab19;a0u4U;aYcVdTfSgQhan4joy,lPqOrNsuMtKvI;e0YisI;a9i50;er,i4rI;aHenGuC;e,re;iGol0F;ui8;ar9iC;a9eIra2ulf;nd1;or4;ang1oIu8;r0w;irc3lo0ou0ErJuI;mb1;oaGy4D;b3ct;bKer9pI;hasiIow1;ze;aKody,rI;a4oiI;d1l;lm,rk;ap0eBuI;ci40de;rIt;ma0Rn;a0Re04iKo,rIwind3;aw,ed9oI;wn;agno0e,ff1g,mi2Kne,sLvI;eIul9;rIst;ge,t;aWbVcQlod9mant3pNru3TsMtI;iIoDu37;lJngI;uiA;!l;ol2ua6;eJlIo0ro2;a4ea0;n0r0;a2Xe36lKoIu0S;uIv1;ra9;aIo0;im;a3Kur0;b3rm;af5b01cVduBep5fUliTmQnOpMrLsiCtaGvI;eIol2;lop;ch;a20i2;aDiBloIoD;re,y;oIy;te,un4;eJoI;liA;an;mEv1;a4i0Ao06raud,y;ei2iMla8oKrI;ee,yI;!pt;de,mIup3;missi34po0;de,ma7ph1;aJrief,uI;g,nk;rk;mp5rk5uF;a0Dea0h0Ai09l08oKrIurta1G;a2ea7ipp3uI;mb3;ales4e04habEinci6ll03m00nIrro6;cXdUfQju8no7qu1sLtKvI;eIin4;ne,r9y;aHin2Bribu7;er2iLoli2Epi8tJuI;lt,me;itu7raH;in;d1st;eKiJoIroFu0;rm;de,gu8rm;ss;eJoI;ne;mn,n0;eIlu6ur;al,i2;buCe,men4pI;eIi3ly;l,te;eBi6u6;r4xiC;ean0iT;rcumveFte;eJirp,oI;o0p;riAw;ncIre5t1ulk;el;a02eSi6lQoPrKuI;iXrIy;st,y;aLeaKiJoad5;en;ng;stfeLtX;ke;il,l11mba0WrrMth1;eIow;ed;!coQfrie1LgPhMliLqueaKstJtrIwild1;ay;ow;th;e2tt3;a2eJoI;ld;ad;!in,ui3;me;bysEckfi8ff3tI;he;b15c0Rd0Iff0Ggree,l0Cm09n03ppZrXsQttOuMvJwaE;it;eDoI;id;rt;gIto0X;meF;aIeCraB;ch,in;pi8sJtoI;niA;aKeIi04u8;mb3rt,ss;le;il;re;g0Hi0ou0rI;an9i2;eaKly,oiFrI;ai0o2;nt;r,se;aMi0GnJtI;icipa7;eJoIul;un4y;al;ly0;aJu0;se;lga08ze;iKlI;e9oIu6;t,w;gn;ix,oI;rd;a03jNmiKoJsoI;rb;pt,rn;niIt;st1;er;ouJuC;st;rn;cLhie2knowled9quiItiva7;es4re;ce;ge;eQliOoKrJusI;e,tom;ue;mIst;moJpI;any,liA;da7;ma7;te;pt;andPduBet,i6oKsI;coKol2;ve;liArt,uI;nd;sh;de;ct;on",
			Person: "true¦0:1Q;a29b1Zc1Md1Ee18f15g13h0Ri0Qj0Nk0Jl0Gm09n06o05p00rPsItCusain bolt,v9w4xzibit,y1;anni,oko on2uji,v1;an,es;en,o;a3ednesday adams,i2o1;lfram,o0Q;ll ferrell,z khalifa;lt disn1Qr1;hol,r0G;a2i1oltai06;n dies0Zrginia wo17;lentino rossi,n goG;a4h3i2ripp,u1yra banks;lZpac shakur;ger woods,mba07;eresa may,or;kashi,t1ylor;um,ya1B;a5carlett johanss0h4i3lobodan milosevic,no2ocr1Lpider1uperm0Fwami; m0Em0E;op dogg,w whi1H;egfried,nbad;akespeaTerlock holm1Sia labeouf;ddam hussa16nt1;a cla11ig9;aAe6i5o3u1za;mi,n dmc,paul,sh limbau1;gh;bin hood,d stew16nald1thko;in0Mo;han0Yngo starr,valdo;ese witherspo0i1mbrandt;ll2nh1;old;ey,y;chmaninoff,ffi,iJshid,y roma1H;a4e3i2la16o1uff daddy;cahont0Ie;lar,p19;le,rZ;lm17ris hilt0;leg,prah winfr0Sra;a2e1iles cra1Bostradam0J; yo,l5tt06wmQ;pole0s;a5e4i2o1ubar03;by,lie5net,rriss0N;randa ju1tt romn0M;ly;rl0GssiaB;cklemo1rkov,s0ta hari,ya angelou;re;ady gaga,e1ibera0Pu;bron jam0Xch wale1e;sa;anye west,e3i1obe bryant;d cudi,efer suther1;la0P;ats,sha;a2effers0fk,k rowling,rr tolki1;en;ck the ripp0Mwaharlal nehru,y z;liTnez,ron m7;a7e5i3u1;lk hog5mphrey1sa01;! bog05;l1tl0H;de; m1dwig,nry 4;an;ile selassFlle ber4m3rrison1;! 1;ford;id,mo09;ry;ast0iannis,o1;odwPtye;ergus0lorence nightinga08r1;an1ederic chopN;s,z;ff5m2nya,ustaXzeki1;el;eril lagasse,i1;le zatop1nem;ek;ie;a6e4i2octor w1rake;ho;ck w1ego maradoC;olf;g1mi lovaOnzel washingt0;as;l1nHrth vadR;ai lNt0;a8h5lint0o1thulhu;n1olio;an,fuci1;us;on;aucKop2ristian baMy1;na;in;millo,ptain beefhe4r1;dinal wols2son1;! palmF;ey;art;a8e5hatt,i3oHro1;ck,n1;te;ll g1ng crosby;atB;ck,nazir bhut2rtil,yon1;ce;to;nksy,rack ob1;ama;l 6r3shton kutch2vril lavig8yn ra1;nd;er;chimed2istot1;le;es;capo2paci1;no;ne",
			Adjective: "true¦0:AI;1:BS;2:BI;3:BA;4:A8;5:84;6:AV;7:AN;8:AF;9:7H;A:BQ;B:AY;C:BC;D:BH;E:9Y;aA2b9Ec8Fd7We79f6Ng6Eh61i4Xj4Wk4Tl4Im41n3Po36p2Oquart7Pr2Ds1Dt14uSvOwFye29;aMeKhIiHoF;man5oFrth7G;dADzy;despreB1n w97s86;acked1UoleF;!sa6;ather1PeFll o70ste1D;!k5;nt1Ist6Ate4;aHeGiFola5T;bBUce versa,gi3Lle;ng67rsa5R;ca1gBSluAV;lt0PnLpHrGsFttermoBL;ef9Ku3;b96ge1; Hb32pGsFtiAH;ca6ide d4R;er,i85;f52to da2;a0Fbeco0Hc0Bd04e02f01gu1XheaBGiXkn4OmUnTopp06pRrNsJtHus0wF;aFiel3K;nt0rra0P;app0eXoF;ld,uS;eHi37o5ApGuF;perv06spec39;e1ok9O;en,ttl0;eFu5;cogn06gul2RlGqu84sF;erv0olv0;at0en33;aFrecede0E;id,rallel0;am0otic0;aFet;rri0tF;ch0;nFq26vers3;sur0terFv7U;eFrupt0;st0;air,inish0orese98;mploy0n7Ov97xpF;ect0lain0;eHisFocume01ue;clFput0;os0;cid0rF;!a8Scov9ha8Jlyi8nea8Gprivileg0sMwF;aFei9I;t9y;hGircumcFonvin2U;is0;aFeck0;lleng0rt0;b20ppea85ssuGttend0uthorF;iz0;mi8;i4Ara;aLeIhoHip 25oGrF;anspare1encha1i2;geth9leADp notch,rpB;rny,ugh6H;ena8DmpGrFs6U;r49tia4;eCo8P;leFst4M;nt0;a0Dc09e07h06i04ki03l01mug,nobbi4XoVpRqueami4XtKuFymb94;bHccinAi generis,pFr5;erFre7N;! dup9b,vi70;du0li7Lp6IsFurb7J;eq9Atanda9X;aKeJi16o2QrGubboFy4Q;rn;aightFin5GungS; fFfF;or7V;adfa9Pri6;lwa6Ftu82;arHeGir6NlendBot Fry;on;c3Qe1S;k5se; call0lImb9phistic16rHuFviV;ndFth1B;proof;dBry;dFub6; o2A;e60ipF;pe4shod;ll0n d7R;g2HnF;ceEg6ist9;am3Se9;co1Zem5lfFn6Are7; suf4Xi43;aGholFient3A;ar5;rlFt4A;et;cr0me,tisfac7F;aOeIheumatoBiGoF;bu8Ztt7Gy3;ghtFv3; 1Sf6X;cJdu8PlInown0pro69sGtF;ard0;is47oF;lu2na1;e1Suc45;alcit8Xe1ondi2;bBci3mpa1;aSePicayu7laOoNrGuF;bl7Tnjabi;eKiIoF;b7VfGmi49pFxi2M;er,ort81;a7uD;maFor,sti7va2;!ry;ciDexis0Ima2CpaB;in55puli8G;cBid;ac2Ynt 3IrFti2;ma40tFv7W;!i3Z;i2YrFss7R;anoBtF; 5XiF;al,s5V;bSffQkPld OnMrLth9utKverF;!aIbMdHhGni75seas,t,wF;ei74rou74;a63e7A;ue;ll;do1Ger,si6A;d3Qg2Aotu5Z; bFbFe on o7g3Uli7;oa80;fashion0school;!ay; gua7XbFha5Uli7;eat;eHligGsF;ce7er0So1C;at0;diFse;a1e1;aOeNiMoGuF;anc0de; moEnHrthFt6V;!eFwe7L;a7Krn;chaGdescri7Iprof30sF;top;la1;ght5;arby,cessa4ighbor5wlyw0xt;k0usiaFv3;ti8;aQeNiLoHuF;dIltiF;facet0p6;deHlGnFot,rbBst;ochro4Xth5;dy;rn,st;ddle ag0nF;dbloZi,or;ag9diocEga,naGrFtropolit4Q;e,ry;ci8;cIgenta,inHj0Fkeshift,mmGnFri4Oscu61ver18;da5Dy;ali4Lo4U;!stream;abEho;aOeLiIoFumberi8;ngFuti1R;stan3RtF;erm,i4H;ghtGteraF;l,ry,te;heart0wei5O;ft JgFss9th3;al,eFi0M;nda4;nguBps0te5;apGind5noF;wi8;ut;ad0itte4uniW;ce co0Hgno6Mll0Cm04nHpso 2UrF;a2releF;va1; ZaYcoWdReQfOgrNhibi4Ri05nMoLsHtFvalu5M;aAeF;nDrdepe2K;a7iGolFuboI;ub6ve1;de,gF;nifica1;rdi5N;a2er;own;eriIiLluenVrF;ar0eq5H;pt,rt;eHiGoFul1O;or;e,reA;fiFpe26termi5E;ni2;mpFnsideCrreA;le2;ccuCdeq5Ene,ppr4J;fFsitu,vitro;ro1;mJpF;arHeGl15oFrop9;li2r11;n2LrfeA;ti3;aGeFi18;d4BnD;tuE;egGiF;c0YteC;al,iF;tiF;ma2;ld;aOelNiLoFuma7;a4meInHrrGsFur5;ti6;if4E;e58o3U; ma3GsF;ick;ghfalut2HspF;an49;li00pf33;i4llow0ndGrdFtM; 05coEworki8;sy,y;aLener44iga3Blob3oKrGuF;il1Nng ho;aFea1Fizzl0;cGtF;ef2Vis;ef2U;ld3Aod;iFuc2D;nf2R;aVeSiQlOoJrF;aGeFil5ug3;q43tf2O;gFnt3S;i6ra1;lk13oHrF; keeps,eFge0Vm9tu41;g0Ei2Ds3R;liF;sh;ag4Mowe4uF;e1or45;e4nF;al,i2;d Gmini7rF;ti6ve1;up;bl0lDmIr Fst pac0ux;oGreacF;hi8;ff;ed,ili0R;aXfVlTmQnOqu3rMthere3veryday,xF;aApIquisi2traHuF;be48lF;ta1;!va2L;edRlF;icF;it;eAstF;whi6; Famor0ough,tiE;rou2sui2;erGiF;ne1;ge1;dFe2Aoq34;er5;ficF;ie1;g9sF;t,ygF;oi8;er;aWeMiHoGrFue;ea4owY;ci6mina1ne,r31ti8ubQ;dact2Jfficult,m,sGverF;ge1se;creGePjoi1paCtF;a1inA;et,te; Nadp0WceMfiLgeneCliJmuEpeIreliAsGvoF;id,ut;pFtitu2ul1L;eCoF;nde1;ca2ghF;tf13;a1ni2;as0;facto;i5ngero0I;ar0Ce09h07i06l05oOrIuF;rmudgeon5stoma4teF;sy;ly;aIeHu1EystalF; cleFli7;ar;epy;fFv17z0;ty;erUgTloSmPnGrpoCunterclVveFy;rt;cLdJgr21jIsHtrF;aFi2;dic0Yry;eq1Yta1;oi1ug3;escenFuN;di8;a1QeFiD;it0;atoDmensuCpF;ass1SulF;so4;ni3ss3;e1niza1;ci1J;ockwiD;rcumspeAvil;eFintzy;e4wy;leGrtaF;in;ba2;diac,ef00;a00ePiLliJoGrFuck nak0;and new,isk,on22;gGldface,naF; fi05fi05;us;nd,tF;he;gGpartisFzarE;an;tiF;me;autifOhiNlLnHsFyoN;iWtselF;li8;eGiFt;gn;aFfi03;th;at0oF;v0w;nd;ul;ckwards,rF;e,rT; priori,b13c0Zd0Tf0Ng0Ihe0Hl09mp6nt06pZrTsQttracti0MuLvIwF;aGkF;wa1B;ke,re;ant garGeraF;ge;de;diIsteEtF;heFoimmu7;nt07;re;to4;hGlFtu2;eep;en;bitIchiv3roHtF;ifiFsy;ci3;ga1;ra4;ry;pFt;aHetizi8rF;oprF;ia2;llFre1;ed,i8;ng;iquFsy;at0e;ed;cohKiJkaHl,oGriFterX;ght;ne,of;li7;ne;ke,ve;olF;ic;ad;ain07gressiIi6rF;eeF;ab6;le;ve;fGraB;id;ectGlF;ue1;ioF;na2; JaIeGvF;erD;pt,qF;ua2;ma1;hoc,infinitum;cuCquiGtu3u2;al;esce1;ra2;erSjeAlPoNrKsGuF;nda1;e1olu2trF;aAuD;se;te;eaGuF;pt;st;aFve;rd;aFe;ze;ct;ra1;nt",
			Pronoun: "true¦elle,h3i2me,she,th0us,we,you;e0ou;e,m,y;!l,t;e,im",
			Preposition: "true¦aPbMcLdKexcept,fIinGmid,notwithstandiWoDpXqua,sCt7u4v2w0;/o,hereSith0;! whHin,oW;ersus,i0;a,s a vis;n1p0;!on;like,til;h1ill,oward0;!s;an,ereby,r0;ough0u;!oM;ans,ince,o that,uch G;f1n0ut;!to;!f;! 0to;effect,part;or,r0;om;espite,own,u3;hez,irca;ar1e0oBy;sides,tween;ri7;bo8cross,ft7lo6m4propos,round,s1t0;!op;! 0;a whole,long 0;as;id0ong0;!st;ng;er;ut",
			SportsTeam: "true¦0:18;1:1E;2:1D;3:14;a1Db15c0Sd0Kfc dallas,g0Ihouston 0Hindiana0Gjacksonville jagua0k0El0Am01new UoRpKqueens parkJreal salt lake,sBt6utah jazz,vancouver whitecaps,w4yW;ashington 4h10;natio1Mredski2wizar0W;ampa bay 7e6o4;ronto 4ttenham hotspur;blue ja0Mrapto0;nnessee tita2xasD;buccanee0ra0K;a8eattle 6porting kansas0Wt4; louis 4oke0V;c1Drams;marine0s4;eah13ounH;cramento Rn 4;antonio spu0diego 4francisco gJjose earthquak1;char08paB; ran07;a9h6ittsburgh 5ortland t4;imbe0rail blaze0;pirat1steele0;il4oenix su2;adelphia 4li1;eagl1philNunE;dr1;akland 4klahoma city thunder,rlando magic;athle0Lrai4;de0;england 8orleans 7york 4;g5je3knYme3red bul0Xy4;anke1;ian3;pelica2sain3;patrio3revolut4;ion;anchEeAi4ontreal impact;ami 8lwaukee b7nnesota 4;t5vi4;kings;imberwolv1wi2;rewe0uc0J;dolphi2heat,marli2;mphis grizz4ts;li1;a6eic5os angeles 4;clippe0dodFlaB;esterV; galaxy,ke0;ansas city 4nF;chiefs,roya0D; pace0polis col3;astr05dynamo,rocke3texa2;olden state warrio0reen bay pac4;ke0;allas 8e4i04od6;nver 6troit 4;lio2pisto2ti4;ge0;broncYnugge3;cowbo5maver4;icZ;ys;arEelLhAincinnati 8leveland 6ol4;orado r4umbus crew sc;api7ocki1;brow2cavalie0guar4in4;dia2;bengaVre4;ds;arlotte horAicago 4;b5cubs,fire,wh4;iteB;ea0ulQ;diff4olina panthe0; city;altimore Alackburn rove0oston 6rooklyn 4uffalo bilN;ne3;ts;cel5red4; sox;tics;rs;oriol1rave2;rizona Ast8tlanta 4;brav1falco2h4;awA;ns;es;on villa,r4;os;c6di4;amondbac4;ks;ardi4;na4;ls",
			Unit: "true¦a07b04cXdWexVfTgRhePinYjoule0BkMlJmDnan08oCp9quart0Bsq ft,t7volts,w6y2ze3°1µ0;g,s;c,f,n;dVear1o0;ttR; 0s 0;old;att,b;erNon0;!ne02;ascals,e1i0;cXnt00;rcent,tJ;hms,unceY;/s,e4i0m²,²,³;/h,cro2l0;e0liK;!²;grLsR;gCtJ;it1u0;menQx;erPreP;b5elvins,ilo1m0notO;/h,ph,²;!byGgrEmCs;ct0rtzL;aJogrC;allonJb0ig3rB;ps;a0emtEl oz,t4;hrenheit,radG;aby9;eci3m1;aratDe1m0oulombD;²,³;lsius,nti0;gr2lit1m0;et0;er8;am7;b1y0;te5;l,ps;c2tt0;os0;econd1;re0;!s",
			"Noun|Gerund": "true¦0:3O;1:3M;2:3N;3:3D;4:32;5:2V;6:3E;7:3K;8:36;9:3J;A:3B;a3Pb37c2Jd27e23f1Vg1Sh1Mi1Ij1Gk1Dl18m13n11o0Wp0Pques0Sr0EsTtNunderMvKwFyDzB;eroi0oB;ni0o3P;aw2eB;ar2l3;aEed4hispe5i5oCrB;ap8est3i1;n0ErB;ki0r31;i1r2s9tc9;isualizi0oB;lunt1Vti0;stan4ta6;aFeDhin6iCraBy8;c6di0i2vel1M;mi0p8;aBs1;c9si0;l6n2s1;aUcReQhOiMkatKl2Wmo6nowJpeItFuCwB;ea5im37;b35f0FrB;fi0vB;e2Mi2J;aAoryt1KrCuB;d2KfS;etc9ugg3;l3n4;bCi0;ebBi0;oar4;gnBnAt1;a3i0;ip8oB;p8rte2u1;a1r27t1;hCo5reBulp1;a2Qe2;edu3oo3;i3yi0;aKeEi4oCuB;li0n2;oBwi0;fi0;aFcEhear7laxi0nDpor1sB;pon4tructB;r2Iu5;de5;or4yc3;di0so2;p8ti0;aFeacek20laEoCrBublis9;a1Teten4in1oces7;iso2siB;tio2;n2yi0;ckaAin1rB;ki0t1O;fEpeDrganiCvB;erco24ula1;si0zi0;ni0ra1;fe5;avi0QeBur7;gotia1twor6;aDeCi2oB;de3nito5;a2dita1e1ssaA;int0XnBrke1;ifUufactu5;aEeaDiBodAyi0;cen7f1mi1stB;e2i0;r2si0;n4ug9;iCnB;ea4it1;c6l3;ogAuB;dAgg3stif12;ci0llust0VmDnBro2;nova1sp0NterBven1;ac1vie02;agi2plo4;aDea1iCoBun1;l4w3;ki0ri0;nd3rB;roWvB;es1;aCene0Lli4rBui4;ee1ie0N;rde2the5;aHeGiDlCorBros1un4;e0Pmat1;ir1oo4;gh1lCnBs9;anZdi0;i0li0;e3nX;r0Zscina1;a1du01nCxB;erci7plo5;chan1di0ginB;ee5;aLeHiGoub1rCum8wB;el3;aDeCiB;bb3n6vi0;a0Qs7;wi0;rTscoDvi0;ba1coZlBvelo8;eCiB;ve5;ga1;nGti0;aVelebUhSlPoDrBur3yc3;aBos7yi0;f1w3;aLdi0lJmFnBo6pi0ve5;dDsCvinB;ci0;trBul1;uc1;muniDpB;lBo7;ai2;ca1;lBo5;ec1;c9ti0;ap8eaCimToBubT;ni0t9;ni0ri0;aBee5;n1t1;ra1;m8rCs1te5;ri0;vi0;aPeNitMlLoGrDuB;dge1il4llBr8;yi0;an4eat9oadB;cas1;di0;a1mEokB;i0kB;ee8;pi0;bi0;es7oa1;c9i0;gin2lonAt1;gi0;bysit1c6ki0tt3;li0;ki0;bando2cGdverti7gi0pproac9rgDssuCtB;trac1;mi0;ui0;hi0;si0;coun1ti0;ti0;ni0;ng",
			PhrasalVerb: "true¦0:92;1:96;2:8H;3:8V;4:8A;5:83;6:85;7:98;8:90;9:8G;A:8X;B:8R;C:8U;D:8S;E:70;F:97;G:8Y;H:81;I:7H;J:79;a9Fb7Uc6Rd6Le6Jf5Ig50h4Biron0j47k40l3Em31n2Yo2Wp2Cquiet Hr1Xs0KtZuXvacuu6QwNyammerBzK;ero Dip LonK;e0k0;by,ov9up;aQeMhLiKor0Mrit19;mp0n3Fpe0r5s5;ackAeel Di0S;aLiKn33;gh 3Wrd0;n Dr K;do1in,oJ;it 79k5lk Lrm 69sh Kt83v60;aw3do1o7up;aw3in,oC;rgeBsK;e 2herE;a00eYhViRoQrMuKypP;ckErn K;do1in,oJup;aLiKot0y 30;ckl7Zp F;ck HdK;e 5Y;n7Wp 3Es5K;ck MdLe Kghten 6me0p o0Rre0;aw3ba4do1in,up;e Iy 2;by,oG;ink Lrow K;aw3ba4in,up;ba4ov9up;aKe 77ll62;m 2r 5M;ckBke Llk K;ov9shit,u47;aKba4do1in,leave,o4Dup;ba4ft9pa69w3;a0Vc0Te0Mh0Ii0Fl09m08n07o06p01quar5GtQuOwK;earMiK;ngLtch K;aw3ba4o8K; by;cKi6Bm 2ss0;k 64;aReQiPoNrKud35;aigh2Det75iK;ke 7Sng K;al6Yup;p Krm2F;by,in,oG;c3Ln3Lr 2tc4O;p F;c3Jmp0nd LrKveAy 2O;e Ht 2L;ba4do1up;ar3GeNiMlLrKurB;ead0ingBuc5;a49it 6H;c5ll o3Cn 2;ak Fe1Xll0;a3Bber 2rt0und like;ap 5Vow Duggl5;ash 6Noke0;eep NiKow 6;cLp K;o6Dup;e 68;in,oK;ff,v9;de19gn 4NnKt 6Gz5;gKkE; al6Ale0;aMoKu5W;ot Kut0w 7M;aw3ba4f48oC;c2WdeEk6EveA;e Pll1Nnd Orv5tK; Ktl5J;do1foLin,o7upK;!on;ot,r5Z;aw3ba4do1in,o33up;oCto;al66out0rK;ap65ew 6J;ilAv5;aXeUiSoOuK;b 5Yle0n Kstl5;aLba4do1inKo2Ith4Nu5P;!to;c2Xr8w3;ll Mot LpeAuK;g3Ind17;a2Wf3Po7;ar8in,o7up;ng 68p oKs5;ff,p18;aKelAinEnt0;c6Hd K;o4Dup;c27t0;aZeYiWlToQrOsyc35uK;ll Mn5Kt K;aKba4do1in,oJto47up;pa4Dw3;a3Jdo1in,o21to45up;attleBess KiNop 2;ah2Fon;iLp Kr4Zu1Gwer 6N;do1in,o6Nup;nt0;aLuK;gEmp 6;ce u20y 6D;ck Kg0le 4An 6p5B;oJup;el 5NncilE;c53ir 39n0ss MtLy K;ba4oG; Hc2R;aw3ba4in,oJ;pKw4Y;e4Xt D;aLerd0oK;dAt53;il Hrrow H;aTeQiPoLuK;ddl5ll I;c1FnkeyMp 6uthAve K;aKdo1in,o4Lup;l4Nw3; wi4K;ss0x 2;asur5e3SlLss K;a21up;t 6;ke Ln 6rKs2Ax0;k 6ryA;do,fun,oCsure,up;a02eViQoLuK;ck0st I;aNc4Fg MoKse0;k Kse4D;aft9ba4do1forw37in56o0Zu46;in,oJ;d 6;e NghtMnLsKve 00;ten F;e 2k 2; 2e46;ar8do1in;aMt LvelK; oC;do1go,in,o7up;nEve K;in,oK;pKut;en;c5p 2sh LtchBughAy K;do1o59;in4Po7;eMick Lnock K;do1oCup;oCup;eLy K;in,up;l Ip K;aw3ba4do1f04in,oJto,up;aMoLuK;ic5mpE;ke3St H;c43zz 2;a01eWiToPuK;nLrrKsh 6;y 2;keLt K;ar8do1;r H;lKneErse3K;d Ke 2;ba4dKfast,o0Cup;ear,o1;de Lt K;ba4on,up;aw3o7;aKlp0;d Ml Ir Kt 2;fKof;rom;f11in,o03uW;cPm 2nLsh0ve Kz2P;at,it,to;d Lg KkerP;do1in,o2Tup;do1in,oK;ut,v9;k 2;aZeTive Rloss IoMrLunK; f0S;ab hold,in43ow 2U; Kof 2I;aMb1Mit,oLr8th1IuK;nd9;ff,n,v9;bo7ft9hQw3;aw3bKdo1in,oJrise,up,w3;a4ir2H;ar 6ek0t K;aLb1Fdo1in,oKr8up;ff,n,ut,v9;cLhKl2Fr8t,w3;ead;ross;d aKng 2;bo7;a0Ee07iYlUoQrMuK;ck Ke2N;ar8up;eLighten KownBy 2;aw3oG;eKshe27; 2z5;g 2lMol Krk I;aKwi20;bo7r8;d 6low 2;aLeKip0;sh0;g 6ke0mKrKtten H;e F;gRlPnNrLsKzzle0;h F;e Km 2;aw3ba4up;d0isK;h 2;e Kl 1T;aw3fPin,o7;ht ba4ure0;ePnLsK;s 2;cMd K;fKoG;or;e D;d04l 2;cNll Krm0t1G;aLbKdo1in,o09sho0Eth08victim;a4ehi2O;pa0C;e K;do1oGup;at Kdge0nd 12y5;in,o7up;aOi1HoNrK;aLess 6op KuN;aw3b03in,oC;gBwB; Ile0ubl1B;m 2;a0Ah05l02oOrLut K;aw3ba4do1oCup;ackBeep LoKy0;ss Dwd0;by,do1in,o0Uup;me NoLuntK; o2A;k 6l K;do1oG;aRbQforOin,oNtKu0O;hLoKrue;geth9;rough;ff,ut,v9;th,wK;ard;a4y;paKr8w3;rt;eaLose K;in,oCup;n 6r F;aNeLiK;ll0pE;ck Der Kw F;on,up;t 2;lRncel0rOsMtch LveE; in;o1Nup;h Dt K;doubt,oG;ry LvK;e 08;aw3oJ;l Km H;aLba4do1oJup;ff,n,ut;r8w3;a0Ve0MiteAl0Fo04rQuK;bblNckl05il0Dlk 6ndl05rLsKtMy FzzA;t 00;n 0HsK;t D;e I;ov9;anWeaUiLush K;oGup;ghQng K;aNba4do1forMin,oLuK;nd9p;n,ut;th;bo7lKr8w3;ong;teK;n 2;k K;do1in,o7up;ch0;arTg 6iRn5oPrNssMttlLunce Kx D;aw3ba4;e 6; ar8;e H;do1;k Dt 2;e 2;l 6;do1up;d 2;aPeed0oKurt0;cMw K;aw3ba4do1o7up;ck;k K;in,oC;ck0nk0stA; oQaNef 2lt0nd K;do1ov9up;er;up;r Lt K;do1in,oCup;do1o7;ff,nK;to;ck Pil0nMrgLsK;h D;ainBe D;g DkB; on;in,o7;aw3do1in,oCup;ff,ut;ay;ct FdQir0sk MuctionA; oG;ff;ar8o7;ouK;nd; o7;d K;do1oKup;ff,n;wn;o7up;ut",
			ProperNoun: "true¦abid,barbie,c3e2f1iron maiden,kirby,m0nis,riel;cgill,ercedes,issy;lorence,ranco;lmo,uro;atalina,hristi",
			"Person|Place": "true¦a8d6h4jordan,k3orlando,s1vi0;ctor9rgin9;a0ydney;lvador,mara,ntia4;ent,obe;amil0ous0;ton;arw2ie0;go;lexandr1ust0;in;ia",
			LastName: "true¦0:BR;1:BF;2:B5;3:BH;4:AX;5:9Y;6:B6;7:BK;8:B0;9:AV;A:AL;B:8Q;C:8G;D:7K;E:BM;F:AH;aBDb9Zc8Wd88e81f7Kg6Wh64i60j5Lk4Vl4Dm39n2Wo2Op25quispe,r1Ls0Pt0Ev03wTxSyKzG;aIhGimmerm6A;aGou,u;ng,o;khar5ytsE;aKeun9BiHoGun;koya32shiBU;!lG;diGmaz;rim,z;maGng;da,g52mo83sGzaC;aChiBV;iao,u;aLeJiHoGright,u;jcA5lff,ng;lGmm0nkl0sniewsC;kiB1liams33s3;bGiss,lt0;b,er,st0;a6Vgn0lHtG;anabe,s3;k0sh,tG;e2Non;aLeKiHoGukD;gt,lk5roby5;dHllalGnogr3Kr1Css0val3S;ba,ob1W;al,ov4;lasHsel8W;lJn dIrgBEsHzG;qu7;ilyEqu7siljE;en b6Aijk,yk;enzueAIverde;aPeix1VhKi2j8ka43oJrIsui,uG;om5UrG;c2n0un1;an,emblA7ynisC;dorAMlst3Km4rrAth;atch0i8UoG;mHrG;are84laci79;ps3sG;en,on;hirDkah9Mnaka,te,varA;a06ch01eYhUiRmOoMtIuHvGzabo;en9Jobod3N;ar7bot4lliv2zuC;aIeHoG;i7Bj4AyanAB;ele,in2FpheBvens25;l8rm0;kol5lovy5re7Tsa,to,uG;ng,sa;iGy72;rn5tG;!h;l71mHnGrbu;at9cla9Egh;moBo7M;aIeGimizu;hu,vchG;en8Luk;la,r1G;gu9infe5YmGoh,pulveA7rra5P;jGyG;on5;evi6iltz,miHneid0roed0uGwarz;be3Elz;dHtG;!t,z;!t;ar4Th8ito,ka4OlJnGr4saCto,unde19v4;ch7dHtGz;a5Le,os;b53e16;as,ihDm4Po0Y;aVeSiPoJuHyG;a6oo,u;bio,iz,sG;so,u;bKc8Fdrigue67ge10j9YmJosevelt,sItHux,wG;e,li6;a9Ch;enb4Usi;a54e4L;erts15i93;bei4JcHes,vGzzo;as,e9;ci,hards12;ag2es,iHut0yG;es,nol5N;s,t0;dImHnGsmu97v6C;tan1;ir7os;ic,u;aUeOhMiJoHrGut8;asad,if6Zochazk27;lishc2GpGrti72u10we76;e3Aov51;cHe45nG;as,to;as70hl0;aGillips;k,m,n6I;a3Hde3Wete0Bna,rJtG;ersHrovGters54;!a,ic;!en,on;eGic,kiBss3;i9ra,tz,z;h86k,padopoulIrk0tHvG;ic,l4N;el,te39;os;bMconn2Ag2TlJnei6PrHsbor6XweBzG;dem7Rturk;ella4DtGwe6N;ega,iz;iGof7Hs8I;vGyn1R;ei9;aSri1;aPeNiJoGune50ym2;rHvGwak;ak4Qik5otn66;odahl,r4S;cholsZeHkolGls4Jx3;ic,ov84;ls1miG;!n1;ils3mG;co4Xec;gy,kaGray2sh,var38;jiGmu9shiG;ma;a07c04eZiWoMuHyeG;rs;lJnIrGssoli6S;atGp03r7C;i,ov4;oz,te58;d0l0;h2lOnNo0RrHsGza1A;er,s;aKeJiIoz5risHtG;e56on;!on;!n7K;au,i9no,t5J;!lA;r1Btgome59;i3El0;cracFhhail5kkeHlG;l0os64;ls1;hmeJiIj30lHn3Krci0ssiGyer2N;!er;n0Po;er,j0;dDti;cartHlG;aughl8e2;hy;dQe7Egnu68i0jer3TkPmNnMrItHyG;er,r;ei,ic,su21thews;iHkDquAroqu8tinG;ez,s;a5Xc,nG;!o;ci5Vn;a5UmG;ad5;ar5e6Kin1;rig77s1;aVeOiLoJuHyG;!nch;k4nGo;d,gu;mbarGpe3Fvr4we;di;!nGu,yana2B;coln,dG;b21holm,strom;bedEfeKhIitn0kaHn8rGw35;oy;!j;m11tG;in1on1;bvGvG;re;iGmmy,ng,rs2Qu,voie,ws3;ne,t1F;aZeYh2iWlUnez50oNrJuHvar2woG;k,n;cerGmar68znets5;a,o34;aHem0isGyeziu;h23t3O;m0sni4Fus3KvG;ch4O;bay57ch,rh0Usk16vaIwalGzl5;czGsC;yk;cIlG;!cGen4K;huk;!ev4ic,s;e8uiveG;rt;eff0kGl4mu9nnun1;ucF;ll0nnedy;hn,llKminsCne,pIrHstra3Qto,ur,yGzl5;a,s0;j0Rls22;l2oG;or;oe;aPenOha6im14oHuG;ng,r4;e32hInHrge32u6vG;anD;es,ss3;anHnsG;en,on,t3;nesGs1R;en,s1;kiBnings,s1;cJkob4EnGrv0E;kDsG;en,sG;en0Ion;ks3obs2A;brahimDglesi5Nke5Fl0Qno07oneIshikHto,vanoG;u,v54;awa;scu;aVeOiNjaltal8oIrist50uG;!aGb0ghAynh;m2ng;a6dz4fIjgaa3Hk,lHpUrGwe,x3X;ak1Gvat;mAt;er,fm3WmG;ann;ggiBtchcock;iJmingw4BnHrGss;nand7re9;deGriks1;rs3;kkiHnG;on1;la,n1;dz4g1lvoQmOns0ZqNrMsJuIwHyG;asFes;kiB;g1ng;anHhiG;mo14;i,ov0J;di6p0r10t;ue;alaG;in1;rs1;aVeorgUheorghe,iSjonRoLrJuGw3;errGnnar3Co,staf3Ctierr7zm2;a,eG;ro;ayli6ee2Lg4iffithGub0;!s;lIme0UnHodGrbachE;e,m2;calvAzale0S;dGubE;bGs0E;erg;aj,i;bs3l,mGordaO;en7;iev3U;gnMlJmaIndFo,rGsFuthi0;cGdn0za;ia;ge;eaHlG;agh0i,o;no;e,on;aVerQiLjeldsted,lKoIrHuG;chs,entAji41ll0;eem2iedm2;ntaGrt8urni0wl0;na;emi6orA;lipIsHtzgeraG;ld;ch0h0;ovG;!ic;hatDnanIrG;arGei9;a,i;deY;ov4;b0rre1D;dKinsJriksIsGvaB;cob3GpGtra3D;inoza,osiQ;en,s3;te8;er,is3warG;ds;aXePiNjurhuMoKrisco15uHvorakG;!oT;arte,boHmitru,nn,rGt3C;and,ic;is;g2he0Omingu7nErd1ItG;to;us;aGcki2Hmitr2Ossanayake,x3;s,z; JbnaIlHmirGrvisFvi,w2;!ov4;gado,ic;th;bo0groot,jo6lHsilGvriA;va;a cruz,e3uG;ca;hl,mcevsCnIt2WviG;dGes,s;ov,s3;ielsGku22;!en;ki;a0Be06hRiobQlarkPoIrGunningh1H;awfo0RivGuz;elli;h1lKntJoIrGs2Nx;byn,reG;a,ia;ke,p0;i,rer2K;em2liB;ns;!e;anu;aOeMiu,oIristGu6we;eGiaG;ns1;i,ng,p9uHwGy;!dH;dGng;huJ;!n,onGu6;!g;kJnIpm2ttHudhGv7;ry;erjee,o14;!d,g;ma,raboG;rty;bJl0Cng4rG;eghetHnG;a,y;ti;an,ota1C;cerAlder3mpbeLrIstGvadi0B;iGro;llo;doHl0Er,t0uGvalho;so;so,zo;ll;a0Fe01hYiXlUoNrKuIyG;rLtyG;qi;chan2rG;ke,ns;ank5iem,oGyant;oks,wG;ne;gdan5nIruya,su,uchaHyKziG;c,n5;rd;darGik;enG;ko;ov;aGond15;nco,zG;ev4;ancFshw16;a08oGuiy2;umGwmG;ik;ckRethov1gu,ktPnNrG;gJisInG;ascoGds1;ni;ha;er,mG;anG;!n;gtGit7nP;ss3;asF;hi;er,hG;am;b4ch,ez,hRiley,kk0ldw8nMrIshHtAu0;es;ir;bInHtlGua;ett;es,i0;ieYosa;dGik;a9yoG;padhyG;ay;ra;k,ng;ic;bb0Acos09d07g04kht05lZnPrLsl2tJyG;aHd8;in;la;chis3kiG;ns3;aImstro6sl2;an;ng;ujo,ya;dJgelHsaG;ri;ovG;!a;ersJov,reG;aGjEws;ss1;en;en,on,s3;on;eksejEiyEmeiIvG;ar7es;ez;da;ev;arwHuilG;ar;al;ams,l0;er;ta;as",
			Ordinal: "true¦eBf7nin5s3t0zeroE;enDhir1we0;lfCn7;d,t3;e0ixt8;cond,vent7;et0th;e6ie7;i2o0;r0urt3;tie4;ft1rst;ight0lev1;e0h,ie1;en0;th",
			Cardinal: "true¦bEeBf5mEnine7one,s4t0zero;en,h2rDw0;e0o;lve,n5;irt6ousands,ree;even2ix2;i3o0;r1ur0;!t2;ty;ft0ve;e2y;ight0lev1;!e0y;en;illions",
			Multiple: "true¦b3hundred,m3qu2se1t0;housand,r2;pt1xt1;adr0int0;illion",
			City: "true¦0:74;1:61;2:6G;3:6J;4:5S;a68b53c4Id48e44f3Wg3Hh39i31j2Wk2Fl23m1Mn1Co19p0Wq0Ur0Os05tRuQvLwDxiBy9z5;a7h5i4Muri4O;a5e5ongsh0;ng3H;greb,nzib5G;ang2e5okoha3Sunfu;katerin3Hrev0;a5n0Q;m5Hn;arsBeAi6roclBu5;h0xi,zh5P;c7n5;d5nipeg,terth4;hoek,s1L;hi5Zkl3A;l63xford;aw;a8e6i5ladivost5Molgogr6L;en3lni6S;ni22r5;o3saill4N;lenc4Wncouv3Sr3ughn;lan bat1Crumqi,trecht;aFbilisi,eEheDiBo9r7u5;l21n63r5;in,ku;i5ondh62;es51poli;kyo,m2Zron1Pulo5;n,uS;an5jua3l2Tmisoa6Bra3;j4Tshui; hag62ssaloni2H;gucigal26hr0l av1U;briz,i6llinn,mpe56ng5rtu,shk2R;i3Esh0;an,chu1n0p2Eyu0;aEeDh8kopje,owe1Gt7u5;ra5zh4X;ba0Ht;aten is55ockholm,rasbou67uttga2V;an8e6i5;jiazhua1llo1m5Xy0;f50n5;ya1zh4H;gh3Kt4Q;att45o1Vv44;cramen16int ClBn5o paulo,ppo3Rrajevo; 7aa,t5;a 5o domin3E;a3fe,m1M;antonio,die3Cfrancisco,j5ped3Nsalvad0J;o5u0;se;em,t lake ci5Fz25;lou58peters24;a9e8i6o5;me,t59;ga,o5yadh;! de janei3F;cife,ims,nn3Jykjavik;b4Sip4lei2Inc2Pwalpindi;ingdao,u5;ez2i0Q;aFeEhDiCo9r7u6yong5;ya1;eb59ya1;a5etor3M;g52to;rt5zn0; 5la4Co;au prin0Melizabe24sa03;ls3Prae5Atts26;iladelph3Gnom pe1Aoenix;ki1r21tah tik3E;dua,lerYnaji,r4Ot5;na,r32;ak44des0Km1Mr6s5ttawa;a3Vlo;an,d06;a7ew5ing2Fovosibir1Jyc; 5cast36;del24orlea44taip14;g8iro4Wn5pl2Wshv33v0;ch6ji1t5;es,o1;a1o1;a6o5p4;ya;no,sa0W;aEeCi9o6u5;mb2Ani26sc3Y;gadishu,nt6s5;c13ul;evideo,pelli1Rre2Z;ami,l6n14s5;kolc,sissauga;an,waukee;cca,d5lbour2Mmph41ndo1Cssi3;an,ell2Xi3;cau,drAkass2Sl9n8r5shh4A;aca6ib5rakesh,se2L;or;i1Sy;a4EchFdal0Zi47;mo;id;aDeAi8o6u5vSy2;anMckn0Odhia3;n5s angel26;d2g bea1N;brev2Be3Lma5nz,sb2verpo28;!ss27; ma39i5;c5pzig;est16; p6g5ho2Wn0Cusan24;os;az,la33;aHharFiClaipeBo9rak0Du7y5;iv,o5;to;ala lump4n5;mi1sh0;hi0Hlka2Xpavog4si5wlo2;ce;da;ev,n5rkuk;gst2sha5;sa;k5toum;iv;bHdu3llakuric0Qmpa3Fn6ohsiu1ra5un1Iwaguc0Q;c0Pj;d5o,p4;ah1Ty;a7e6i5ohannesV;l1Vn0;dd36rusalem;ip4k5;ar2H;bad0mph1OnArkutUs7taXz5;mir,tapala5;pa;fah0l6tanb5;ul;am2Zi2H;che2d5;ianap2Mo20;aAe7o5yder2W; chi mi5ms,nolulu;nh;f6lsin5rakli2;ki;ei;ifa,lifax,mCn5rb1Dva3;g8nov01oi;aFdanEenDhCiPlasgBo9raz,u5;a5jr23;dal6ng5yaquil;zh1J;aja2Oupe;ld coa1Bthen5;bu2S;ow;ent;e0Uoa;sk;lw7n5za;dhi5gt1E;nag0U;ay;aisal29es,o8r6ukuya5;ma;ankfu5esno;rt;rt5sh0; wor6ale5;za;th;d5indhov0Pl paso;in5mont2;bur5;gh;aBe8ha0Xisp4o7resd0Lu5;b5esseldorf,nkirk,rb0shanbe;ai,l0I;ha,nggu0rtmu13;hradSl6nv5troit;er;hi;donghIe6k09l5masc1Zr es sala1KugavpiY;i0lU;gu,je2;aJebu,hAleve0Vo5raio02uriti1Q;lo7n6penhag0Ar5;do1Ok;akKst0V;gUm5;bo;aBen8i6ongqi1ristchur5;ch;ang m7ca5ttago1;go;g6n5;ai;du,zho1;ng5ttogr14;ch8sha,zh07;gliari,i9lga8mayenJn6pe town,r5tanO;acCdiff;ber1Ac5;un;ry;ro;aWeNhKirmingh0WoJr9u5;chareTdapeTenos air7r5s0tu0;g5sa;as;es;a9is6usse5;ls;ba6t5;ol;ne;sil8tisla7zzav5;il5;le;va;ia;goZst2;op6ubaneshw5;ar;al;iCl9ng8r5;g6l5n;in;en;aluru,hazi;fa6grade,o horizon5;te;st;ji1rut;ghd0BkFn9ot8r7s6yan n4;ur;el,r07;celo3i,ranquil09;ou;du1g6ja lu5;ka;alo6k5;ok;re;ng;ers5u;field;a05b02cc01ddis aba00gartaZhmedXizawl,lSmPnHqa00rEsBt7uck5;la5;nd;he7l5;an5;ta;ns;h5unci2;dod,gab5;at;li5;ngt2;on;a8c5kaOtwerp;hora6o3;na;ge;h7p5;ol5;is;eim;aravati,m0s5;terd5;am; 7buquerq6eppo,giers,ma5;ty;ue;basrah al qadim5mawsil al jadid5;ah;ab5;ad;la;ba;ra;idj0u dha5;bi;an;lbo6rh5;us;rg",
			Region: "true¦0:2K;1:2Q;2:2H;3:2B;a2Ob2Bc1Xd1Ses1Rf1Pg1Kh1Gi1Bj17k12l0Zm0On06o04pYqVrSsJtEuBverAw6y4zacatec2S;akut0o0Cu4;cat2k06;a5est 4isconsin,yomi1K;bengal,virgin0;rwick3shington4;! dc;acruz,mont;dmurt0t4;ah,tar4; 2La0Y;a6e5laxca1Rripu1Xu4;scaEva;langa1nnessee,x2F;bas0Wm4smOtar25;aulip2Dil nadu;a9i7o5taf12u4ylh1F;ffZrr05s1A;me1Cno1Quth 4;cWdV;ber0c4kkim,naloa;hu2ily;n5skatchew2xo4;ny; luis potosi,ta catari1;a4hodeA;j4ngp08;asth2shahi;ingh25u4;e4intana roo;bec,en6retaro;ara8e6rince edward4unjab; i4;sl0C;i,nnsylv4rnambu0C;an0;!na;axa0Ydisha,h4klaho20ntar4reg7ss0Cx0H;io;aKeEo6u4;evo le4nav0W;on;r4tt17va scot0;f9mandy,th4; 4ampton3;c6d5yo4;rk3;ako1N;aroli1;olk;bras1Mva0Cw4; 5foundland4;! and labrador;brunswick,hamp3jers5mexiTyork4;! state;ey;galPyarit;aAeghala0Mi6o4;nta1r4;dov0elos;ch6dlanDn5ss4zor11;issippi,ouri;as geraPneso18;ig2oac2;dhy12harasht0Gine,ni5r4ssachusetts;anhao,i el,ylG;p4toba;ur;anca3e4incoln3ouisI;e4iR;ds;a6e5h4omi;aka06ul1;ntucky,ra01;bardino,lmyk0ns0Qr4;achay,el0nata0X;alis6har4iangxi;kh4;and;co;daho,llino7n4owa;d5gush4;et0;ia1;is;a6ert5i4un2;dalFm0D;ford3;mp3rya1waii;ansu,eorg0lou7oa,u4;an4izhou,jarat;ajuato,gdo4;ng;cester3;lori4uji2;da;sex;ageUe7o5uran4;go;rs4;et;lawaMrby3;aFeaEh9o4rim08umbr0;ahui7l6nnectic5rsi4ventry;ca;ut;i03orado;la;e5hattisgarh,i4uvash0;apRhuahua;chn5rke4;ss0;ya;ra;lGm4;bridge3peche;a9ihar,r8u4;ck4ryat0;ingham3;shi4;re;emen,itish columb0;h0ja cal8lk7s4v7;hkorto4que;st2;an;ar0;iforn0;ia;dygHguascalientes,lBndhr9r5ss4;am;izo1kans5un4;achal 7;as;na;a 4;pradesh;a6ber5t4;ai;ta;ba5s4;ka;ma;ea",
			Country: "true¦0:38;1:2L;2:3B;a2Xb2Ec22d1Ye1Sf1Mg1Ch1Ai14j12k0Zl0Um0Gn05om2pZqat1KrXsKtCu7v5wal4yemTz3;a25imbabwe;es,lis and futu2Y;a3enezue32ietnam;nuatu,tican city;gTk6nited 4ruXs3zbeE; 2Ca,sr;arab emirat0Kkingdom,states3;! of am2Y;!raiV;a8haCimor les0Co7rinidad 5u3;nis0rk3valu;ey,me2Zs and caic1V;and t3t3;oba1L;go,kel10nga;iw2ji3nz2T;ki2V;aDcotl1eCi9lov8o6pa2Dri lanka,u5w3yr0;az3edAitzerl1;il1;d2riname;lomon1Xmal0uth 3;afr2KkMsud2;ak0en0;erra leoFn3;gapo1Yt maart3;en;negLrb0ychellZ;int 3moa,n marino,udi arab0;hele26luc0mart21;epublic of ir0Eom2Euss0w3;an27;a4eIhilippinUitcairn1Mo3uerto riN;l1rtugF;ki2Dl4nama,pua new0Vra3;gu7;au,esti3;ne;aBe9i7or3;folk1Ith4w3;ay; k3ern mariana1D;or0O;caragua,ger3ue;!ia;p3ther1Aw zeal1;al;mib0u3;ru;a7exi6icro0Bo3yanm06;ldova,n3roc5zambA;a4gol0t3;enegro,serrat;co;cAdagasc01l7r5urit4yot3;te;an0i16;shall0Xtin3;ique;a4div3i,ta;es;wi,ys0;ao,ed02;a6e5i3uxembourg;b3echtenste12thu1G;er0ya;ban0Isotho;os,tv0;azakh1Fe4iriba04o3uwait,yrgyz1F;rXsovo;eling0Knya;a3erG;ma16p2;c7nd6r4s3taly,vory coast;le of m2rael;a3el1;n,q;ia,oJ;el1;aiTon3ungary;dur0Ng kong;aBermany,ha0QibraltAre8u3;a6ern5inea3ya0P;! biss3;au;sey;deloupe,m,tema0Q;e3na0N;ce,nl1;ar;bUmb0;a7i6r3;ance,ench 3;guia0Epoly3;nes0;ji,nl1;lklandUroeU;ast tim7cu6gypt,l salv6ngl1quatorial4ritr5st3thiop0;on0; guin3;ea;ad3;or;enmark,jibou5ominica4r con3;go;!n C;ti;aBentral african Ah8o5roat0u4yprRzech3; 9ia;ba,racao;c4lo3morQngo brazzaville,okGsta r04te de ivoiL;mb0;osE;i3ristmasG;le,na;republic;m3naUpe verde,ymanA;bod0ero3;on;aGeDhut2o9r5u3;lgar0r3;kina faso,ma,undi;azil,itish 3unei;virgin3; is3;lands;liv0nai5snia and herzegoviHtswaHuvet3; isl1;and;re;l3n8rmuG;ar3gium,ize;us;h4ngladesh,rbad3;os;am4ra3;in;as;fghaGlDmBn6r4ustr3zerbaij2;al0ia;genti3men0uba;na;dorra,g5t3;arct7igua and barbu3;da;o3uil3;la;er3;ica;b3ger0;an0;ia;ni3;st2;an",
			Place: "true¦a0Gb0Bc03d02e01f00gWhUiSkQlNmLnIorHpDrCsAt5u4v3w2y0;a0yz;kutPngtze;ake isHupatki;irgin islands,ostok;laanbaatar,p02;a3eotihuac0Hh1onto,sarskoe selo,u0;lXzigoot;am09e 0;bronx,hamptons;hiti,j mahE;a0cotts bluff,eine,fo,oho,under9;int lawrence river,khalY;ed s3io grande;a1ek,h0itcairn,ompeii;l,x;cif05pahanaumokuak0rthenX;ea;ange county,d,inoco;e0ile;uschwansteQw eng0;land;a0co,ekong,idLuc;chu picchu,gad00libu,nhatt00;a1gw,hr,incoln memori0;al;s,x;azan kremlJosrae,rasnoyar0ul;sk;ax,cn,nd0st;ianSochina;arlem,kg,nd,ov0;d,enweep;a2odavari,re0;at 0enwich;britaBlakI;ngHy village;co,ra;urope,vergladF;anube,en,fw,own4xb;arrizo pla6dg,edar 5gk,h1lt,olosse0;um;a2i0uuk;chen itza,mney rock,na0ricahua;town;morro,tham;breaks,fa5;in;cn,e2kk,ro0;oklyn,wns cany0;on;l air,verly hi0;lls;driadic,frica,lhambra,m7n3rc2sia,tl1zor0;es;!ant2; de triomphe,t1;adyr,tarct0;ic0; oce0;an;ericas,s",
			FirstName: "true¦aTblair,cQdOfrancoZgabMhinaLilya,jHkClBm6ni4quinn,re3s0;h0umit,yd;ay,e0iloh;a,lby;g9ne;co,ko0;!s;a1el0ina,org6;!okuhF;ds,naia,r1tt0xiB;i,y;ion,lo;ashawn,eif,uca;a3e1ir0rM;an;lsFn0rry;dall,yat5;i,sD;a0essIie,ude;i1m0;ie,mG;me;ta;rie0y;le;arcy,ev0;an,on;as1h0;arl8eyenne;ey,sidy;drien,kira,l4nd1ubr0vi;ey;i,r0;a,e0;a,y;ex2f1o0;is;ie;ei,is",
			WeekDay: "true¦fri2mon2s1t0wednesd3;hurs1ues1;aturd1und1;!d0;ay0;!s",
			Month: "true¦dec0february,july,nov0octo1sept0;em0;ber",
			Date: "true¦ago,on4som4t1week0yesterd5; end,ends;mr1o0;d2morrow;!w;ed0;ay",
			Duration: "true¦centurAd8h7m5q4se3w1y0;ear8r8;eek0k7;!end,s;ason,c5;tr,uarter;i0onth3;llisecond2nute2;our1r1;ay0ecade0;!s;ies,y",
			FemaleName: "true¦0:J7;1:JB;2:IJ;3:IK;4:J1;5:IO;6:JS;7:JO;8:HB;9:JK;A:H4;B:I2;C:IT;D:JH;E:IX;F:BA;G:I4;aGTbFLcDRdD0eBMfB4gADh9Ti9Gj8Dk7Cl5Wm48n3Lo3Hp33qu32r29s15t0Eu0Cv02wVxiTyOzH;aLeIineb,oHsof3;e3Sf3la,ra;h2iKlIna,ynH;ab,ep;da,ma;da,h2iHra;nab;aKeJi0FolB7uIvH;et8onDP;i0na;le0sen3;el,gm3Hn,rGLs8W;aoHme0nyi;m5XyAD;aMendDZhiDGiH;dele9lJnH;if48niHo0;e,f47;a,helmi0lHma;a,ow;ka0nB;aNeKiHusa5;ck84kIl8oleAviH;anFenJ4;ky,toriBK;da,lA8rHs0;a,nHoniH9;a,iFR;leHnesH9;nILrH;i1y;g9rHs6xHA;su5te;aYeUhRiNoLrIuHy2;i,la;acJ3iHu0J;c3na,sH;hFta;nHr0F;iFya;aJffaEOnHs6;a,gtiH;ng;!nFSra;aIeHomasi0;a,l9Oo8Ares1;l3ndolwethu;g9Fo88rIssH;!a,ie;eHi,ri7;sa,za;bOlMmKnIrHs6tia0wa0;a60yn;iHya;a,ka,s6;arFe2iHm77ra;!ka;a,iH;a,t6;at6it6;a0Ecarlett,e0AhWiSkye,neza0oQri,tNuIyH;bIGlvi1;ha,mayIJniAsIzH;an3Net8ie,y;anHi7;!a,e,nH;aCe;aIeH;fan4l5Dphan6E;cI5r5;b3fiAAm0LnHphi1;d2ia,ja,ya;er2lJmon1nIobh8QtH;a,i;dy;lETv3;aMeIirHo0risFDy5;a,lDM;ba,e0i5lJrH;iHr6Jyl;!d8Ifa;ia,lDZ;hd,iMki2nJrIu0w0yH;la,ma,na;i,le9on,ron,yn;aIda,ia,nHon;a,on;!ya;k6mH;!aa;lJrItaye82vH;da,inj;e0ife;en1i0ma;anA9bLd5Oh1SiBkKlJmInd2rHs6vannaC;aCi0;ant6i2;lDOma,ome;ee0in8Tu2;in1ri0;a05eZhXiUoHuthDM;bScRghQl8LnPsJwIxH;anB3ie,y;an,e0;aIeHie,lD;ann7ll1marDGtA;!lHnn1;iHyn;e,nH;a,dF;da,i,na;ayy8G;hel67io;bDRerAyn;a,cIkHmas,nFta,ya;ki,o;h8Xki;ea,iannGMoH;da,n1P;an0bJemFgi0iInHta,y0;a8Bee;han86na;a,eH;cHkaC;a,ca;bi0chIe,i0mo0nHquETy0;di,ia;aERelHiB;!e,le;een4ia0;aPeOhMiLoJrHute6A;iHudenCV;scil3LyamvaB;lHrt3;i0ly;a,paluk;ilome0oebe,ylH;is,lis;ggy,nelope,r5t2;ige,m0VnKo5rvaDMtIulH;a,et8in1;ricHt4T;a,e,ia;do2i07;ctav3dIfD3is6ksa0lHphD3umC5yunbileg;a,ga,iv3;eHvAF;l3t8;aWeUiMoIurHy5;!ay,ul;a,eJor,rIuH;f,r;aCeEma;ll1mi;aNcLhariBQkKlaJna,sHta,vi;anHha;ur;!y;a,iDZki;hoGk9YolH;a,e4P;!mh;hir,lHna,risDEsreE;!a,lBV;asuMdLh3i6Dl5nKomi7rgEVtH;aHhal4;lHs6;i1ya;cy,et8;e9iF0ya;nngu2X;a0Ackenz4e02iMoJrignayani,uriDJyH;a,rH;a,iOlNna,tG;bi0i2llBJnH;a,iH;ca,ka,qD9;a,cUdo4ZkaTlOmi,nMrItzi,yH;ar;aJiIlH;anET;am;!l,nB;dy,eHh,n4;nhGrva;aKdJe0iCUlH;iHy;cent,e;red;!gros;!e5;ae5hH;ae5el3Z;ag5DgNi,lKrH;edi7AiIjem,on,yH;em,l;em,sCG;an4iHliCF;nHsCJ;a,da;!an,han;b09cASd07e,g05ha,i04ja,l02n00rLsoum5YtKuIv84xBKyHz4;bell,ra,soBB;d7rH;a,eE;h8Gild1t4;a,cUgQiKjor4l7Un4s6tJwa,yH;!aHbe6Xja9lAE;m,nBL;a,ha,in1;!aJbCGeIja,lDna,sHt63;!a,ol,sa;!l1D;!h,mInH;!a,e,n1;!awit,i;arJeIie,oHr48ueri8;!t;!ry;et46i3B;el4Xi7Cy;dHon,ue5;akranAy;ak,en,iHlo3S;a,ka,nB;a,re,s4te;daHg4;!l3E;alDd4elHge,isDJon0;ei9in1yn;el,le;a0Ne0CiXoQuLyH;d3la,nH;!a,dIe2OnHsCT;!a,e2N;a,sCR;aD4cJel0Pis1lIna,pHz;e,iA;a,u,wa;iHy;a0Se,ja,l2NnB;is,l1UrItt1LuHvel4;el5is1;aKeIi7na,rH;aADi7;lHn1tA;ei;!in1;aTbb9HdSepa,lNnKsJvIzH;!a,be5Ret8z4;!ia;a,et8;!a,dH;a,sHy;ay,ey,i,y;a,iJja,lH;iHy;aA8e;!aH;!nF;ia,ya;!nH;!a,ne;aPda,e0iNjYla,nMoKsJtHx93y5;iHt4;c3t3;e2PlCO;la,nHra;a,ie,o2;a,or1;a,gh,laH;!ni;!h,nH;a,d2e,n5V;cOdon9DiNkes6mi9Gna,rMtJurIvHxmi,y5;ern1in3;a,e5Aie,yn;as6iIoH;nya,ya;fa,s6;a,isA9;a,la;ey,ie,y;a04eZhXiOlASoNrJyH;lHra;a,ee,ie;istHy6I;a,en,iIyH;!na;!e,n5F;nul,ri,urtnB8;aOerNlB7mJrHzzy;a,stH;en,in;!berlImernH;aq;eHi,y;e,y;a,stE;!na,ra;aHei2ongordzol;dij1w5;el7UiKjsi,lJnIrH;a,i,ri;d2na,za;ey,i,lBLs4y;ra,s6;biAcARdiat7MeBAiSlQmPnyakuma1DrNss6NtKviAyH;!e,lH;a,eH;e,i8T;!a6HeIhHi4TlDri0y;ar8Her8Hie,leErBAy;!lyn8Ori0;a,en,iHl5Xoli0yn;!ma,nFs95;a5il1;ei8Mi,lH;e,ie;a,tl6O;a0AeZiWoOuH;anMdLlHst88;es,iH;a8NeHs8X;!n9tH;!a,te;e5Mi3My;a,iA;!anNcelDdMelGhan7VleLni,sIva0yH;a,ce;eHie;fHlDph7Y;a,in1;en,n1;i7y;!a,e,n45;lHng;!i1DlH;!i1C;anNle0nKrJsH;i8JsH;!e,i8I;i,ri;!a,elGif2CnH;a,et8iHy;!e,f2A;a,eJiInH;a,eIiH;e,n1;!t8;cMda,mi,nIque4YsminFvie2y9zH;min7;a7eIiH;ce,e,n1s;!lHs82t0F;e,le;inIk6HlDquelH;in1yn;da,ta;da,lRmPnOo0rNsIvaHwo0zaro;!a0lu,na;aJiIlaHob89;!n9R;do2;belHdo2;!a,e,l3B;a7Ben1i0ma;di2es,gr72ji;a9elBogH;en1;a,e9iHo0se;a0na;aSeOiJoHus7Kyacin2C;da,ll4rten24snH;a,i9U;lImaH;ri;aIdHlaI;a,egard;ry;ath1BiJlInrietArmi9sH;sa,t1A;en2Uga,mi;di;bi2Fil8MlNnMrJsItHwa,yl8M;i5Tt4;n60ti;iHmo51ri53;etH;!te;aCnaC;a,ey,l4;a02eWiRlPoNrKunJwH;enHyne1R;!dolD;ay,el;acieIetHiselB;a,chE;!la;ld1CogooH;sh;adys,enHor3yn2K;a,da,na;aKgi,lIna,ov8EselHta;a,e,le;da,liH;an;!n0;mLnJorgIrH;ald5Si,m3Etrud7;et8i4X;a,eHna;s29vieve;ma;bIle,mHrnet,yG;al5Si5;iIrielH;a,l1;!ja;aTeQiPlorOoz3rH;anJeIiH;da,eB;da,ja;!cH;esIiHoi0P;n1s66;!ca;a,enc3;en,o0;lIn0rnH;anB;ec3ic3;jr,nArKtHy7;emIiHma,oumaA;ha,ma,n;eh;ah,iBrah,za0;cr4Rd0Re0Qi0Pk0Ol07mXn54rUsOtNuMvHwa;aKelIiH;!e,ta;inFyn;!a;!ngel4V;geni1ni47;h5Yien9ta;mLperanKtH;eIhHrel5;er;l31r7;za;a,eralB;iHma,ne4Lyn;cHka,n;a,ka;aPeNiKmH;aHe21ie,y;!li9nuH;elG;lHn1;e7iHy;a,e,ja;lHrald;da,y;!nue5;aWeUiNlMma,no2oKsJvH;a,iH;na,ra;a,ie;iHuiH;se;a,en,ie,y;a0c3da,e,f,nMsJzaH;!betHveA;e,h;aHe,ka;!beH;th;!a,or;anor,nH;!a,i;!in1na;ate1Rta;leEs6;vi;eIiHna,wi0;e,th;l,n;aYeMh3iLjeneKoH;lor5Vminiq4Ln3FrHtt4;a,eEis,la,othHthy;ea,y;ba;an09naCon9ya;anQbPde,eOiMlJmetr3nHsir5M;a,iH;ce,se;a,iIla,orHphi9;es,is;a,l6F;dHrdH;re;!d5Ena;!b2ForaCraC;a,d2nH;!a,e;hl3i0l0GmNnLphn1rIvi1WyH;le,na;a,by,cIia,lH;a,en1;ey,ie;a,et8iH;!ca,el1Aka,z;arHia;is;a0Re0Nh04i02lUoJristIynH;di,th3;al,i0;lPnMrIurH;tn1D;aJd2OiHn2Ori9;!nH;a,e,n1;!l4;cepci5Cn4sH;tanHuelo;ce,za;eHleE;en,t8;aJeoIotH;il54;!pat2;ir7rJudH;et8iH;a,ne;a,e,iH;ce,sZ;a2er2ndH;i,y;aReNloe,rH;isJyH;stH;al;sy,tH;a1Sen,iHy;an1e,n1;deJlseIrH;!i7yl;a,y;li9;nMrH;isKlImH;ai9;a,eHot8;n1t8;!sa;d2elGtH;al,elG;cIlH;es8i47;el3ilH;e,ia,y;itlYlXmilWndVrMsKtHy5;aIeIhHri0;er1IleErDy;ri0;a38sH;a37ie;a,iOlLmeJolIrH;ie,ol;!e,in1yn;lHn;!a,la;a,eIie,otHy;a,ta;ne,y;na,s1X;a0Ii0I;a,e,l1;isAl4;in,yn;a0Ke02iZlXoUrH;andi7eRiJoIyH;an0nn;nwDoke;an3HdgMgiLtH;n31tH;!aInH;ey,i,y;ny;d,t8;etH;!t7;an0e,nH;da,na;bbi7glarIlo07nH;iAn4;ka;ancHythe;a,he;an1Clja0nHsm3M;iAtH;ou;aWcVlinUniArPssOtJulaCvH;!erlH;ey,y;hJsy,tH;e,iHy7;e,na;!anH;ie,y;!ie;nItHyl;ha,ie;adIiH;ce;et8i9;ay,da;ca,ky;!triH;ce,z;rbJyaH;rmH;aa;a2o2ra;a2Ub2Od25g21i1Sj5l18m0Zn0Boi,r06sWtVuPvOwa,yIzH;ra,u0;aKes6gJlIn,seH;!l;in;un;!nH;a,na;a,i2K;drLguJrIsteH;ja;el3;stH;in1;a,ey,i,y;aahua,he0;hIi2Gja,miAs2DtrH;id;aMlIraqHt21;at;eIi7yH;!n;e,iHy;gh;!nH;ti;iJleIo6piA;ta;en,n1t8;aHelG;!n1J;a01dje5eZgViTjRnKohito,toHya;inet8nH;el5ia;te;!aKeIiHmJ;e,ka;!mHtt7;ar4;!belIliHmU;sa;!l1;a,eliH;ca;ka,sHta;a,sa;elHie;a,iH;a,ca,n1qH;ue;!tH;a,te;!bImHstasiMya;ar3;el;aLberKeliJiHy;e,l3naH;!ta;a,ja;!ly;hGiIl3nB;da;a,ra;le;aWba,ePiMlKthJyH;a,c3sH;a,on,sa;ea;iHys0N;e,s0M;a,cIn1sHza;a,e,ha,on,sa;e,ia,ja;c3is6jaKksaKna,sJxH;aHia;!nd2;ia,saH;nd2;ra;ia;i0nIyH;ah,na;a,is,naCoud;la;c6da,leEmNnLsH;haClH;inHyY;g,n;!h;a,o,slH;ey;ee;en;at6g4nIusH;ti0;es;ie;aWdiTelMrH;eJiH;anMenH;a,e,ne;an0;na;!aLeKiIyH;nn;a,n1;a,e;!ne;!iH;de;e,lDsH;on;yn;!lH;i9yn;ne;aKbIiHrL;!e,gaK;ey,i7y;!e;gaH;il;dKliyJradhIs6;ha;ya;ah;a,ya",
			Honorific: "true¦director1field marsh2lieutenant1rear0sergeant major,vice0; admir1; gener0;al",
			"Adj|Gerund": "true¦0:3F;1:3H;2:31;3:2X;4:35;5:33;6:3C;7:2Z;8:36;9:29;a33b2Tc2Bd1Te1If19g12h0Zi0Rl0Nm0Gnu0Fo0Ap04rYsKtEuBvAw1Ayiel3;ar6e08;nBpA;l1Rs0B;fol3n1Zsett2;aEeDhrBi4ouc7rAwis0;e0Bif2oub2us0yi1;ea1SiA;l2vi1;l2mp0rr1J;nt1Vxi1;aMcreec7enten2NhLkyrocke0lo0Vmi2oJpHtDuBweA;e0Ul2;pp2ArA;gi1pri5roun3;aBea8iAri2Hun9;mula0r4;gge4rA;t2vi1;ark2eAraw2;e3llb2F;aAot7;ki1ri1;i9oc29;dYtisf6;aEeBive0oAus7;a4l2;assu4defi9fres7ig9juve07mai9s0vAwar3;ea2italiAol1G;si1zi1;gi1ll6mb2vi1;a6eDier23lun1VrAun2C;eBoA;mi5vo1Z;ce3s5vai2;n3rpleA;xi1;ffCpWutBverAwi1;arc7lap04p0Pri3whel8;goi1l6st1J;en3sA;et0;m2Jrtu4;aEeDiCoBuAyst0L;mb2;t1Jvi1;s5tiga0;an1Rl0n3smeri26;dAtu4;de9;aCeaBiAo0U;fesa0Tvi1;di1ni1;c1Fg19s0;llumiGmFnArri0R;cDfurHsCtBviA;go23ti1;e1Oimi21oxica0rig0V;pi4ul0;orpo20r0K;po5;na0;eaBorr02umilA;ia0;li1rtwar8;lFrA;atiDipCoBuelA;i1li1;undbrea10wi1;pi1;f6ng;a4ea8;a3etc7it0lEoCrBulfA;il2;ee1FighXust1L;rAun3;ebo3thco8;aCoA;a0wA;e4i1;mi1tte4;lectrJmHnExA;aCci0hBis0pA;an3lo3;aOila1B;c0spe1A;ab2coura0CdBergi13ga0Clive9ric7s02tA;hral2i0J;ea4u4;barras5er09pA;owe4;if6;aQeIiBrA;if0;sAzz6;aEgDhearCsen0tA;rAur11;ac0es5;te9;us0;ppoin0r8;biliGcDfi9gra3ligh0mBpres5sAvasG;erE;an3ea9orA;ali0L;a6eiBli9rA;ea5;vi1;ta0;maPri1s7un0zz2;aPhMlo5oAripp2ut0;mGnArrespon3;cer9fDspi4tA;inBrA;as0ibu0ol2;ui1;lic0u5;ni1;fDmCpA;eAromi5;l2ti1;an3;or0;aAil2;llenAnAr8;gi1;l8ptAri1;iva0;aff2eGin3lFoDrBuA;d3st2;eathtaAui5;ki1;gg2i2o8ri1unA;ci1;in3;co8wiA;lAtc7;de4;bsorVcOgonMlJmHnno6ppea2rFsA;pi4su4toA;nBun3;di1;is7;hi1;res0;li1;aFu5;si1;ar8lu4;ri1;mi1;iAzi1;zi1;cAhi1;eleDomA;moBpan6;yi1;da0;ra0;ti1;bi1;ng",
			Comparable: "true¦0:3C;1:3Q;2:3F;a3Tb3Cc33d2Te2Mf2Ag1Wh1Li1Fj1Ek1Bl13m0Xn0So0Rp0Iqu0Gr07sHtCug0vAw4y3za0Q;el10ouN;ary,e6hi5i3ry;ck0Cde,l3n1ry,se;d,y;ny,te;a3i3R;k,ry;a3erda2ulgar;gue,in,st;a6en2Xhi5i4ouZr3;anqu2Cen1ue;dy,g36me0ny;ck,rs28;ll,me,rt,wd3I;aRcaPeOhMiLkin0BlImGoEpDt6u4w3;eet,ift;b3dd0Wperfi21rre28;sta26t21;a8e7iff,r4u3;pUr1;a4ict,o3;ng;ig2Vn0N;a1ep,rn;le,rk,te0;e1Si2Vright0;ci1Yft,l3on,re;emn,id;a3el0;ll,rt;e4i3y;g2Mm0Z;ek,nd2T;ck24l0mp1L;a3iRrill,y;dy,l01rp;ve0Jxy;n1Jr3;ce,y;d,fe,int0l1Hv0V;a8e6i5o3ude;mantic,o19sy,u3;gh;pe,t1P;a3d,mo0A;dy,l;gg4iFndom,p3re,w;id;ed;ai2i3;ck,et;hoAi1Fl9o8r5u3;ny,r3;e,p11;egna2ic4o3;fouSud;ey,k0;liXor;ain,easa2;ny;dd,i0ld,ranL;aive,e5i4o3u14;b0Sisy,rm0Ysy;bb0ce,mb0R;a3r1w;r,t;ad,e5ild,o4u3;nda12te;ist,o1;a4ek,l3;low;s0ty;a8e7i6o3ucky;f0Jn4o15u3ve0w10y0N;d,sy;e0g;ke0l,mp,tt0Eve0;e1Qwd;me,r3te;ge;e4i3;nd;en;ol0ui19;cy,ll,n3;secu6t3;e3ima4;llege2rmedia3;te;re;aAe7i6o5u3;ge,m3ng1C;bYid;me0t;gh,l0;a3fXsita2;dy,rWv3;en0y;nd13ppy,r3;d3sh;!y;aFenEhCiBlAoofy,r3;a8e6i5o3ue0Z;o3ss;vy;m,s0;at,e3y;dy,n;nd,y;ad,ib,ooD;a2d1;a3o3;st0;tDuiS;u1y;aCeebBi9l8o6r5u3;ll,n3r0N;!ny;aCesh,iend0;a3nd,rmD;my;at,ir7;erce,nan3;ci9;le;r,ul3;ty;a6erie,sse4v3xtre0B;il;nti3;al;r4s3;tern,y;ly,th0;appZe9i5ru4u3;mb;nk;r5vi4z3;zy;ne;e,ty;a3ep,n9;d3f,r;!ly;agey,h8l7o5r4u3;dd0r0te;isp,uel;ar3ld,mmon,st0ward0zy;se;evKou1;e3il0;ap,e3;sy;aHiFlCoAr5u3;ff,r0sy;ly;a6i3oad;g4llia2;nt;ht;sh,ve;ld,un3;cy;a4o3ue;nd,o1;ck,nd;g,tt3;er;d,ld,w1;dy;bsu6ng5we3;so3;me;ry;rd",
			Adverb: "true¦a08b05d00eYfSheQinPjustOkinda,likewiZmMnJoEpCquite,r9s5t2u0very,well;ltima01p0; to,wards5;h1iny bit,o0wiO;o,t6;en,us;eldom,o0uch;!me1rt0; of;how,times,w0C;a1e0;alS;ndomRth05;ar excellenEer0oint blank; Lhaps;f3n0utright;ce0ly;! 0;ag05moX; courGten;ewJo0; longWt 0;onHwithstand9;aybe,eanwhiNore0;!ovT;! aboX;deed,steY;lla,n0;ce;or3u0;ck1l9rther0;!moK;ing; 0evK;exampCgood,suH;n mas0vI;se;e0irect2; 2fini0;te0;ly;juAtrop;ackward,y 0;far,no0; means,w; GbroFd nauseam,gEl7ny5part,s4t 2w0;ay,hi0;le;be7l0mo7wor7;arge,ea6; soon,i4;mo0way;re;l 3mo2ongsi1ready,so,togeth0ways;er;de;st;b1t0;hat;ut;ain;ad;lot,posteriori",
			Conjunction: "true¦aXbTcReNhowMiEjust00noBo9p8supposing,t5wh0yet;e1il0o3;e,st;n1re0thN; if,by,vM;evL;h0il,o;erefOo0;!uU;lus,rovided th9;r0therwiM;! not; mattEr,w0;! 0;since,th4w7;f4n0; 0asmuch;as mIcaForder t0;h0o;at;! 0;only,t0w0;hen;!ev3;ith2ven0;! 0;if,tB;er;o0uz;s,z;e0ut,y the time;cau1f0;ore;se;lt3nd,s 0;far1if,m0soon1t2;uch0; as;hou0;gh",
			Currency: "true¦$,aud,bQcOdJeurIfHgbp,hkd,iGjpy,kElDp8r7s3usd,x2y1z0¢,£,¥,ден,лв,руб,฿,₡,₨,€,₭,﷼;lotyQł;en,uanP;af,of;h0t5;e0il5;k0q0;elK;oubleJp,upeeJ;e2ound st0;er0;lingG;n0soF;ceEnies;empi7i7;n,r0wanzaCyatC;!onaBw;ls,nr;ori7ranc9;!os;en3i2kk,o0;b0ll2;ra5;me4n0rham4;ar3;e0ny;nt1;aht,itcoin0;!s",
			Determiner: "true¦aBboth,d9e6few,le5mu8neiDplenty,s4th2various,wh0;at0ich0;evC;a0e4is,ose;!t;everal,ome;!ast,s;a1l0very;!se;ch;e0u;!s;!n0;!o0y;th0;er",
			"Adj|Present": "true¦a07b04cVdQeNfJhollIidRlEmCnarrIoBp9qua8r7s3t2uttFw0;aKet,ro0;ng,u08;endChin;e2hort,l1mooth,our,pa9tray,u0;re,speU;i2ow;cu6da02leSpaN;eplica01i02;ck;aHerfePr0;eseUime,omV;bscu1pen,wn;atu0e3odeH;re;a2e1ive,ow0;er;an;st,y;ow;a2i1oul,r0;ee,inge;rm;iIke,ncy,st;l1mpty,x0;emHpress;abo4ic7;amp,e2i1oub0ry,ull;le;ffu9re6;fu8libe0;raE;alm,l5o0;mpleCn3ol,rr1unterfe0;it;e0u7;ct;juga8sum7;ea1o0;se;n,r;ankru1lu0;nt;pt;li2pproxi0rticula1;ma0;te;ght",
			"Person|Adj": "true¦b3du2earnest,frank,mi2r0san1woo1;an0ich,u1;dy;sty;ella,rown",
			Modal: "true¦c5lets,m4ought3sh1w0;ill,o5;a0o4;ll,nt;! to,a;ight,ust;an,o0;uld",
			Verb: "true¦born,cannot,gonna,has,keep tabs,msg",
			"Person|Verb": "true¦b8ch7dr6foster,gra5ja9lan4ma2ni9ollie,p1rob,s0wade;kip,pike,t5ue;at,eg,ier2;ck,r0;k,shal;ce;ce,nt;ew;ase,u1;iff,l1ob,u0;ck;aze,ossom",
			"Person|Date": "true¦a2j0sep;an0une;!uary;p0ugust,v0;ril"
		};
	const Oo = 36,
		Fo = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ",
		Vo = Fo.split("").reduce((function(e, t, n) {
			return e[t] = n, e
		}), {});
	var zo = function(e) {
			if (void 0 !== Vo[e]) return Vo[e];
			let t = 0,
				n = 1,
				r = Oo,
				a = 1;
			for (; n < e.length; t += r, n++, r *= Oo);
			for (let n = e.length - 1; n >= 0; n--, a *= Oo) {
				let r = e.charCodeAt(n) - 48;
				r > 10 && (r -= 7), t += r * a
			}
			return t
		},
		Bo = function(e) {
			const t = new RegExp("([0-9A-Z]+):([0-9A-Z]+)");
			for (let n = 0; n < e.nodes.length; n++) {
				const r = t.exec(e.nodes[n]);
				if (!r) {
					e.symCount = n;
					break
				}
				e.syms[zo(r[1])] = zo(r[2])
			}
			e.nodes = e.nodes.slice(e.symCount, e.nodes.length)
		};
	const $o = function(e, t, n) {
		const r = zo(t);
		return r < e.symCount ? e.syms[r] : n + r + 1 - e.symCount
	};
	var So = function(e) {
			const t = {
				nodes: e.split(";"),
				syms: [],
				symCount: 0
			};
			return e.match(":") && Bo(t),
				function(e) {
					const t = [],
						n = (r, a) => {
							let o = e.nodes[r];
							"!" === o[0] && (t.push(a), o = o.slice(1));
							const i = o.split(/([A-Z0-9,]+)/g);
							for (let o = 0; o < i.length; o += 2) {
								const s = i[o],
									l = i[o + 1];
								if (!s) continue;
								const u = a + s;
								if ("," === l || void 0 === l) {
									t.push(u);
									continue
								}
								const c = $o(e, l, r);
								n(c, u)
							}
						};
					return n(0, ""), t
				}(t)
		},
		Ko = function(e) {
			if (!e) return {};
			const t = e.split("|").reduce(((e, t) => {
					const n = t.split("¦");
					return e[n[0]] = n[1], e
				}), {}),
				n = {};
			return Object.keys(t).forEach((function(e) {
				const r = So(t[e]);
				"true" === e && (e = !0);
				for (let t = 0; t < r.length; t++) {
					const a = r[t];
					!0 === n.hasOwnProperty(a) ? !1 === Array.isArray(n[a]) ? n[a] = [n[a], e] : n[a].push(e) : n[a] = e
				}
			})), n
		};
	const Mo = ["Possessive", "Pronoun"];
	var Lo = {
		a: [
			[/(antenn|formul|nebul|vertebr|vit)a$/i, "$1ae"],
			[/ia$/i, "ia"]
		],
		e: [
			[/(kn|l|w)ife$/i, "$1ives"],
			[/(hive)$/i, "$1s"],
			[/([m|l])ouse$/i, "$1ice"],
			[/([m|l])ice$/i, "$1ice"]
		],
		f: [
			[/^(dwar|handkerchie|hoo|scar|whar)f$/i, "$1ves"],
			[/^((?:ca|e|ha|(?:our|them|your)?se|she|wo)l|lea|loa|shea|thie)f$/i, "$1ves"]
		],
		i: [
			[/(octop|vir)i$/i, "$1i"]
		],
		m: [
			[/([ti])um$/i, "$1a"]
		],
		n: [
			[/^(oxen)$/i, "$1"]
		],
		o: [
			[/(al|ad|at|er|et|ed)o$/i, "$1oes"]
		],
		s: [
			[/(ax|test)is$/i, "$1es"],
			[/(alias|status)$/i, "$1es"],
			[/sis$/i, "ses"],
			[/(bu)s$/i, "$1ses"],
			[/(sis)$/i, "ses"],
			[/^(?!talis|.*hu)(.*)man$/i, "$1men"],
			[/(octop|vir|radi|nucle|fung|cact|stimul)us$/i, "$1i"]
		],
		x: [
			[/(matr|vert|ind|cort)(ix|ex)$/i, "$1ices"],
			[/^(ox)$/i, "$1en"]
		],
		y: [
			[/([^aeiouy]|qu)y$/i, "$1ies"]
		],
		z: [
			[/(quiz)$/i, "$1zes"]
		]
	};
	const Jo = /([xsz]|ch|sh)$/;
	var Wo = function(e = "", t) {
		let {
			irregularPlurals: n,
			uncountable: r
		} = t.two;
		if (r.hasOwnProperty(e)) return e;
		if (n.hasOwnProperty(e)) return n[e];
		let a = function(e) {
			let t = e[e.length - 1];
			if (!0 === Lo.hasOwnProperty(t))
				for (let n = 0; n < Lo[t].length; n += 1) {
					let r = Lo[t][n][0];
					if (!0 === r.test(e)) return e.replace(r, Lo[t][n][1])
				}
			return null
		}(e);
		return null !== a ? a : Jo.test(e) ? e + "es" : e + "s"
	};
	const qo = /\|/;
	let Uo = {
			"20th century fox": "Organization",
			"7 eleven": "Organization",
			"motel 6": "Organization",
			g8: "Organization",
			vh1: "Organization",
			"76ers": "SportsTeam",
			"49ers": "SportsTeam",
			q1: "Date",
			q2: "Date",
			q3: "Date",
			q4: "Date",
			km2: "Unit",
			m2: "Unit",
			dm2: "Unit",
			cm2: "Unit",
			mm2: "Unit",
			mile2: "Unit",
			in2: "Unit",
			yd2: "Unit",
			ft2: "Unit",
			m3: "Unit",
			dm3: "Unit",
			cm3: "Unit",
			in3: "Unit",
			ft3: "Unit",
			yd3: "Unit",
			"at&t": "Organization",
			"black & decker": "Organization",
			"h & m": "Organization",
			"johnson & johnson": "Organization",
			"procter & gamble": "Organization",
			"ben & jerry's": "Organization",
			"&": "Conjunction",
			i: ["Pronoun", "Singular"],
			he: ["Pronoun", "Singular"],
			she: ["Pronoun", "Singular"],
			it: ["Pronoun", "Singular"],
			they: ["Pronoun", "Plural"],
			we: ["Pronoun", "Plural"],
			was: ["Copula", "PastTense"],
			is: ["Copula", "PresentTense"],
			are: ["Copula", "PresentTense"],
			am: ["Copula", "PresentTense"],
			were: ["Copula", "PastTense"],
			her: Mo,
			his: Mo,
			hers: Mo,
			their: Mo,
			theirs: Mo,
			themselves: Mo,
			your: Mo,
			our: Mo,
			ours: Mo,
			my: Mo,
			its: Mo,
			vs: ["Conjunction", "Abbreviation"],
			if: ["Condition", "Preposition"],
			closer: "Comparative",
			closest: "Superlative",
			much: "Adverb",
			may: "Modal",
			babysat: "PastTense",
			blew: "PastTense",
			drank: "PastTense",
			drove: "PastTense",
			forgave: "PastTense",
			skiied: "PastTense",
			spilt: "PastTense",
			stung: "PastTense",
			swam: "PastTense",
			swung: "PastTense",
			guaranteed: "PastTense",
			shrunk: "PastTense",
			nears: "PresentTense",
			nearing: "Gerund",
			neared: "PastTense",
			no: ["Negative", "Expression"]
		},
		Ro = {};
	const Qo = {
		two: {
			irregularPlurals: Go,
			uncountable: {}
		}
	};
	Object.keys(Eo).forEach((e => {
		let t = Ko(Eo[e]);
		qo.test(e) ? Object.keys(t).forEach((t => {
			if (Ro[t] = e, "Noun|Verb" === e) {
				let e = Wo(t, Qo);
				Ro[e] = "Plural|Verb"
			}
		})) : Object.keys(t).forEach((t => {
			Uo[t] = e
		}))
	})), [":(", ":)", ":P", ":p", ":O", ";(", ";)", ";P", ";p", ";O", ":3", ":|", ":/", ":\\", ":$", ":*", ":@", ":-(", ":-)", ":-P", ":-p", ":-O", ":-3", ":-|", ":-/", ":-\\", ":-$", ":-*", ":-@", ":^(", ":^)", ":^P", ":^p", ":^O", ":^3", ":^|", ":^/", ":^\\", ":^$", ":^*", ":^@", "):", "(:", "$:", "*:", ")-:", "(-:", "$-:", "*-:", ")^:", "(^:", "$^:", "*^:", "<3", "</3", "<\\3", "=("].forEach((e => Uo[e] = "Emoticon")), delete Uo[""], delete Uo.null, delete Uo[" "];
	const _o = "Singular";
	var Zo = {
		beforeTags: {
			Determiner: _o,
			Possessive: _o,
			Acronym: _o,
			Noun: _o,
			Adjective: _o,
			PresentTense: _o,
			Gerund: _o,
			PastTense: _o,
			Infinitive: _o,
			Date: _o,
			Ordinal: _o,
			Demonym: _o
		},
		afterTags: {
			Value: _o,
			Modal: _o,
			Copula: _o,
			PresentTense: _o,
			PastTense: _o,
			Demonym: _o,
			Actor: _o
		},
		beforeWords: {
			the: _o,
			with: _o,
			without: _o,
			of: _o,
			for: _o,
			any: _o,
			all: _o,
			on: _o,
			cut: _o,
			cuts: _o,
			increase: _o,
			decrease: _o,
			raise: _o,
			drop: _o,
			save: _o,
			saved: _o,
			saves: _o,
			make: _o,
			makes: _o,
			made: _o,
			minus: _o,
			plus: _o,
			than: _o,
			another: _o,
			versus: _o,
			neither: _o,
			about: _o,
			favorite: _o,
			best: _o,
			daily: _o,
			weekly: _o,
			linear: _o,
			binary: _o,
			mobile: _o,
			lexical: _o,
			technical: _o,
			computer: _o,
			scientific: _o,
			security: _o,
			government: _o,
			popular: _o,
			formal: _o,
			no: _o,
			more: _o,
			one: _o,
			let: _o,
			her: _o,
			his: _o,
			their: _o,
			our: _o,
			us: _o,
			sheer: _o,
			monthly: _o,
			yearly: _o,
			current: _o,
			previous: _o,
			upcoming: _o,
			last: _o,
			next: _o,
			main: _o,
			initial: _o,
			final: _o,
			beginning: _o,
			end: _o,
			top: _o,
			bottom: _o,
			future: _o,
			past: _o,
			major: _o,
			minor: _o,
			side: _o,
			central: _o,
			peripheral: _o,
			public: _o,
			private: _o
		},
		afterWords: {
			of: _o,
			system: _o,
			aid: _o,
			method: _o,
			utility: _o,
			tool: _o,
			reform: _o,
			therapy: _o,
			philosophy: _o,
			room: _o,
			authority: _o,
			says: _o,
			said: _o,
			wants: _o,
			wanted: _o,
			is: _o,
			did: _o,
			do: _o,
			can: _o,
			wise: _o
		}
	};
	const Xo = "Infinitive";
	var Yo = {
			beforeTags: {
				Modal: Xo,
				Adverb: Xo,
				Negative: Xo,
				Plural: Xo
			},
			afterTags: {
				Determiner: Xo,
				Adverb: Xo,
				Possessive: Xo,
				Reflexive: Xo,
				Preposition: Xo,
				Cardinal: Xo,
				Comparative: Xo,
				Superlative: Xo
			},
			beforeWords: {
				i: Xo,
				we: Xo,
				you: Xo,
				they: Xo,
				to: Xo,
				please: Xo,
				will: Xo,
				have: Xo,
				had: Xo,
				would: Xo,
				could: Xo,
				should: Xo,
				do: Xo,
				did: Xo,
				does: Xo,
				can: Xo,
				must: Xo,
				us: Xo,
				me: Xo,
				let: Xo,
				even: Xo,
				when: Xo,
				help: Xo,
				he: Xo,
				she: Xo,
				it: Xo,
				being: Xo,
				bi: Xo,
				co: Xo,
				contra: Xo,
				de: Xo,
				inter: Xo,
				intra: Xo,
				mis: Xo,
				pre: Xo,
				out: Xo,
				counter: Xo,
				nobody: Xo,
				somebody: Xo,
				anybody: Xo,
				everybody: Xo
			},
			afterWords: {
				the: Xo,
				me: Xo,
				you: Xo,
				him: Xo,
				us: Xo,
				her: Xo,
				his: Xo,
				them: Xo,
				they: Xo,
				it: Xo,
				himself: Xo,
				herself: Xo,
				itself: Xo,
				myself: Xo,
				ourselves: Xo,
				themselves: Xo,
				something: Xo,
				anything: Xo,
				a: Xo,
				an: Xo,
				up: Xo,
				down: Xo,
				by: Xo,
				out: Xo,
				off: Xo,
				under: Xo,
				what: Xo,
				all: Xo,
				to: Xo,
				because: Xo,
				although: Xo,
				how: Xo,
				otherwise: Xo,
				together: Xo,
				though: Xo,
				into: Xo,
				yet: Xo,
				more: Xo,
				here: Xo,
				there: Xo,
				away: Xo
			}
		},
		ei = {
			beforeTags: Object.assign({}, Yo.beforeTags, Zo.beforeTags, {}),
			afterTags: Object.assign({}, Yo.afterTags, Zo.afterTags, {}),
			beforeWords: Object.assign({}, Yo.beforeWords, Zo.beforeWords, {}),
			afterWords: Object.assign({}, Yo.afterWords, Zo.afterWords, {})
		};
	const ti = "Adjective";
	var ni = {
		beforeTags: {
			Determiner: ti,
			Possessive: ti,
			Hyphenated: ti
		},
		afterTags: {
			Adjective: ti
		},
		beforeWords: {
			seem: ti,
			seemed: ti,
			seems: ti,
			feel: ti,
			feels: ti,
			felt: ti,
			stay: ti,
			appear: ti,
			appears: ti,
			appeared: ti,
			also: ti,
			over: ti,
			under: ti,
			too: ti,
			it: ti,
			but: ti,
			still: ti,
			really: ti,
			quite: ti,
			well: ti,
			very: ti,
			truly: ti,
			how: ti,
			deeply: ti,
			hella: ti,
			profoundly: ti,
			extremely: ti,
			so: ti,
			badly: ti,
			mostly: ti,
			totally: ti,
			awfully: ti,
			rather: ti,
			nothing: ti,
			something: ti,
			anything: ti,
			not: ti,
			me: ti,
			is: ti,
			face: ti,
			faces: ti,
			faced: ti,
			look: ti,
			looks: ti,
			looked: ti,
			reveal: ti,
			reveals: ti,
			revealed: ti,
			sound: ti,
			sounded: ti,
			sounds: ti,
			remains: ti,
			remained: ti,
			prove: ti,
			proves: ti,
			proved: ti,
			becomes: ti,
			stays: ti,
			tastes: ti,
			taste: ti,
			smells: ti,
			smell: ti,
			gets: ti,
			grows: ti,
			as: ti,
			rings: ti,
			radiates: ti,
			conveys: ti,
			convey: ti,
			conveyed: ti,
			of: ti
		},
		afterWords: {
			too: ti,
			also: ti,
			or: ti,
			enough: ti,
			as: ti
		}
	};
	const ri = "Gerund";
	var ai = {
		beforeTags: {
			Adverb: ri,
			Preposition: ri,
			Conjunction: ri
		},
		afterTags: {
			Adverb: ri,
			Possessive: ri,
			Person: ri,
			Pronoun: ri,
			Determiner: ri,
			Copula: ri,
			Preposition: ri,
			Conjunction: ri,
			Comparative: ri
		},
		beforeWords: {
			been: ri,
			keep: ri,
			continue: ri,
			stop: ri,
			am: ri,
			be: ri,
			me: ri,
			began: ri,
			start: ri,
			starts: ri,
			started: ri,
			stops: ri,
			stopped: ri,
			help: ri,
			helps: ri,
			avoid: ri,
			avoids: ri,
			love: ri,
			loves: ri,
			loved: ri,
			hate: ri,
			hates: ri,
			hated: ri
		},
		afterWords: {
			you: ri,
			me: ri,
			her: ri,
			him: ri,
			his: ri,
			them: ri,
			their: ri,
			it: ri,
			this: ri,
			there: ri,
			on: ri,
			about: ri,
			for: ri,
			up: ri,
			down: ri
		}
	};
	const oi = "Gerund",
		ii = "Adjective";
	var si = {
		beforeTags: Object.assign({}, ni.beforeTags, ai.beforeTags, {
			Imperative: oi,
			Infinitive: ii,
			Plural: oi
		}),
		afterTags: Object.assign({}, ni.afterTags, ai.afterTags, {
			Noun: ii
		}),
		beforeWords: Object.assign({}, ni.beforeWords, ai.beforeWords, {
			is: ii,
			are: oi,
			was: ii,
			of: ii,
			suggest: oi,
			suggests: oi,
			suggested: oi,
			recommend: oi,
			recommends: oi,
			recommended: oi,
			imagine: oi,
			imagines: oi,
			imagined: oi,
			consider: oi,
			considered: oi,
			considering: oi,
			resist: oi,
			resists: oi,
			resisted: oi,
			avoid: oi,
			avoided: oi,
			avoiding: oi,
			except: ii,
			accept: ii,
			assess: oi,
			explore: oi,
			fear: oi,
			fears: oi,
			appreciate: oi,
			question: oi,
			help: oi,
			embrace: oi,
			with: ii
		}),
		afterWords: Object.assign({}, ni.afterWords, ai.afterWords, {
			to: oi,
			not: oi,
			the: oi
		})
	};
	const li = {
		beforeTags: {
			Determiner: void 0,
			Cardinal: "Noun",
			PhrasalVerb: "Adjective"
		},
		afterTags: {}
	};
	var ui = {
		beforeTags: Object.assign({}, ni.beforeTags, Zo.beforeTags, li.beforeTags),
		afterTags: Object.assign({}, ni.afterTags, Zo.afterTags, li.afterTags),
		beforeWords: Object.assign({}, ni.beforeWords, Zo.beforeWords, {
			are: "Adjective",
			is: "Adjective",
			was: "Adjective",
			be: "Adjective",
			off: "Adjective",
			out: "Adjective"
		}),
		afterWords: Object.assign({}, ni.afterWords, Zo.afterWords)
	};
	let ci = "PastTense",
		hi = "Adjective";
	const di = {
		beforeTags: {
			Adverb: ci,
			Pronoun: ci,
			ProperNoun: ci,
			Auxiliary: ci,
			Noun: ci
		},
		afterTags: {
			Possessive: ci,
			Pronoun: ci,
			Determiner: ci,
			Adverb: ci,
			Comparative: ci,
			Date: ci,
			Gerund: ci
		},
		beforeWords: {
			be: ci,
			who: ci,
			get: hi,
			had: ci,
			has: ci,
			have: ci,
			been: ci,
			it: ci,
			as: ci,
			for: hi,
			more: hi,
			always: hi
		},
		afterWords: {
			by: ci,
			back: ci,
			out: ci,
			in: ci,
			up: ci,
			down: ci,
			before: ci,
			after: ci,
			for: ci,
			the: ci,
			with: ci,
			as: ci,
			on: ci,
			at: ci,
			between: ci,
			to: ci,
			into: ci,
			us: ci,
			them: ci,
			his: ci,
			her: ci,
			their: ci,
			our: ci,
			me: ci,
			about: hi
		}
	};
	var gi = {
		beforeTags: Object.assign({}, ni.beforeTags, di.beforeTags),
		afterTags: Object.assign({}, ni.afterTags, di.afterTags),
		beforeWords: Object.assign({}, ni.beforeWords, di.beforeWords),
		afterWords: Object.assign({}, ni.afterWords, di.afterWords)
	};
	const mi = {
		afterTags: {
			Noun: "Adjective",
			Conjunction: void 0
		}
	};
	var pi = {
		beforeTags: Object.assign({}, ni.beforeTags, Yo.beforeTags, {
			Adverb: void 0,
			Negative: void 0
		}),
		afterTags: Object.assign({}, ni.afterTags, Yo.afterTags, mi.afterTags),
		beforeWords: Object.assign({}, ni.beforeWords, Yo.beforeWords, {
			have: void 0,
			had: void 0,
			not: void 0,
			went: "Adjective",
			goes: "Adjective",
			got: "Adjective",
			be: "Adjective"
		}),
		afterWords: Object.assign({}, ni.afterWords, Yo.afterWords, {
			to: void 0,
			as: "Adjective"
		})
	};
	const fi = {
			Copula: "Gerund",
			PastTense: "Gerund",
			PresentTense: "Gerund",
			Infinitive: "Gerund"
		},
		vi = {
			Value: "Gerund"
		},
		bi = {
			are: "Gerund",
			were: "Gerund",
			be: "Gerund",
			no: "Gerund",
			without: "Gerund",
			you: "Gerund",
			we: "Gerund",
			they: "Gerund",
			he: "Gerund",
			she: "Gerund",
			us: "Gerund",
			them: "Gerund"
		},
		yi = {
			the: "Gerund",
			this: "Gerund",
			that: "Gerund",
			me: "Gerund",
			us: "Gerund",
			them: "Gerund"
		};
	var wi = {
		beforeTags: Object.assign({}, ai.beforeTags, Zo.beforeTags, fi),
		afterTags: Object.assign({}, ai.afterTags, Zo.afterTags, vi),
		beforeWords: Object.assign({}, ai.beforeWords, Zo.beforeWords, bi),
		afterWords: Object.assign({}, ai.afterWords, Zo.afterWords, yi)
	};
	const ki = "Singular",
		Pi = "Infinitive";
	var Ai = {
		beforeTags: Object.assign({}, Yo.beforeTags, Zo.beforeTags, {
			Adjective: ki,
			Particle: ki
		}),
		afterTags: Object.assign({}, Yo.afterTags, Zo.afterTags, {
			ProperNoun: Pi,
			Gerund: Pi,
			Adjective: Pi,
			Copula: ki
		}),
		beforeWords: Object.assign({}, Yo.beforeWords, Zo.beforeWords, {
			is: ki,
			was: ki,
			of: ki,
			have: null
		}),
		afterWords: Object.assign({}, Yo.afterWords, Zo.afterWords, {
			instead: Pi,
			about: Pi,
			his: Pi,
			her: Pi,
			to: null,
			by: null,
			in: null
		})
	};
	const Ci = "Person";
	var ji = {
		beforeTags: {
			Honorific: Ci,
			Person: Ci
		},
		afterTags: {
			Person: Ci,
			ProperNoun: Ci,
			Verb: Ci
		},
		ownTags: {
			ProperNoun: Ci
		},
		beforeWords: {
			hi: Ci,
			hey: Ci,
			yo: Ci,
			dear: Ci,
			hello: Ci
		},
		afterWords: {
			said: Ci,
			says: Ci,
			told: Ci,
			tells: Ci,
			feels: Ci,
			felt: Ci,
			seems: Ci,
			thinks: Ci,
			thought: Ci,
			spends: Ci,
			spendt: Ci,
			plays: Ci,
			played: Ci,
			sing: Ci,
			sang: Ci,
			learn: Ci,
			learned: Ci,
			wants: Ci,
			wanted: Ci
		}
	};
	const Ni = "Month",
		xi = {
			beforeTags: {
				Date: Ni,
				Value: Ni
			},
			afterTags: {
				Date: Ni,
				Value: Ni
			},
			beforeWords: {
				by: Ni,
				in: Ni,
				on: Ni,
				during: Ni,
				after: Ni,
				before: Ni,
				between: Ni,
				until: Ni,
				til: Ni,
				sometime: Ni,
				of: Ni,
				this: Ni,
				next: Ni,
				last: Ni,
				previous: Ni,
				following: Ni,
				with: "Person"
			},
			afterWords: {
				sometime: Ni,
				in: Ni,
				of: Ni,
				until: Ni,
				the: Ni
			}
		};
	var Ii = {
		beforeTags: Object.assign({}, ji.beforeTags, xi.beforeTags),
		afterTags: Object.assign({}, ji.afterTags, xi.afterTags),
		beforeWords: Object.assign({}, ji.beforeWords, xi.beforeWords),
		afterWords: Object.assign({}, ji.afterWords, xi.afterWords)
	};
	const Ti = "Place",
		Di = {
			beforeTags: {
				Place: Ti
			},
			afterTags: {
				Place: Ti,
				Abbreviation: Ti
			},
			beforeWords: {
				in: Ti,
				by: Ti,
				near: Ti,
				from: Ti,
				to: Ti
			},
			afterWords: {
				in: Ti,
				by: Ti,
				near: Ti,
				from: Ti,
				to: Ti,
				government: Ti,
				council: Ti,
				region: Ti,
				city: Ti
			}
		};
	let Hi = "Unit";
	const Gi = {
			"Actor|Verb": ei,
			"Adj|Gerund": si,
			"Adj|Noun": ui,
			"Adj|Past": gi,
			"Adj|Present": pi,
			"Noun|Verb": Ai,
			"Noun|Gerund": wi,
			"Person|Noun": {
				beforeTags: Object.assign({}, Zo.beforeTags, ji.beforeTags),
				afterTags: Object.assign({}, Zo.afterTags, ji.afterTags),
				beforeWords: Object.assign({}, Zo.beforeWords, ji.beforeWords, {
					i: "Infinitive",
					we: "Infinitive"
				}),
				afterWords: Object.assign({}, Zo.afterWords, ji.afterWords)
			},
			"Person|Date": Ii,
			"Person|Verb": {
				beforeTags: Object.assign({}, Zo.beforeTags, ji.beforeTags, Yo.beforeTags),
				afterTags: Object.assign({}, Zo.afterTags, ji.afterTags, Yo.afterTags),
				beforeWords: Object.assign({}, Zo.beforeWords, ji.beforeWords, Yo.beforeWords),
				afterWords: Object.assign({}, Zo.afterWords, ji.afterWords, Yo.afterWords)
			},
			"Person|Place": {
				beforeTags: Object.assign({}, Di.beforeTags, ji.beforeTags),
				afterTags: Object.assign({}, Di.afterTags, ji.afterTags),
				beforeWords: Object.assign({}, Di.beforeWords, ji.beforeWords),
				afterWords: Object.assign({}, Di.afterWords, ji.afterWords)
			},
			"Person|Adj": {
				beforeTags: Object.assign({}, ji.beforeTags, ni.beforeTags),
				afterTags: Object.assign({}, ji.afterTags, ni.afterTags),
				beforeWords: Object.assign({}, ji.beforeWords, ni.beforeWords),
				afterWords: Object.assign({}, ji.afterWords, ni.afterWords)
			},
			"Unit|Noun": {
				beforeTags: {
					Value: Hi
				},
				afterTags: {},
				beforeWords: {
					per: Hi,
					every: Hi,
					each: Hi,
					square: Hi,
					cubic: Hi,
					sq: Hi,
					metric: Hi
				},
				afterWords: {
					per: Hi,
					squared: Hi,
					cubed: Hi,
					long: Hi
				}
			}
		},
		Ei = (e, t) => {
			let n = Object.keys(e).reduce(((t, n) => (t[n] = "Infinitive" === e[n] ? "PresentTense" : "Plural", t)), {});
			return Object.assign(n, t)
		};
	Gi["Plural|Verb"] = {
		beforeWords: Ei(Gi["Noun|Verb"].beforeWords, {
			had: "Plural",
			have: "Plural"
		}),
		afterWords: Ei(Gi["Noun|Verb"].afterWords, {
			his: "PresentTense",
			her: "PresentTense",
			its: "PresentTense",
			in: null,
			to: null,
			is: "PresentTense",
			by: "PresentTense"
		}),
		beforeTags: Ei(Gi["Noun|Verb"].beforeTags, {
			Conjunction: "PresentTense",
			Noun: void 0,
			ProperNoun: "PresentTense"
		}),
		afterTags: Ei(Gi["Noun|Verb"].afterTags, {
			Gerund: "Plural",
			Noun: "PresentTense",
			Value: "PresentTense"
		})
	};
	var Oi = Gi;
	const Fi = "Adjective",
		Vi = "Infinitive",
		zi = "PresentTense",
		Bi = "Singular",
		$i = "PastTense",
		Si = "Adverb",
		Ki = "Plural",
		Mi = "Actor",
		Li = "Verb",
		Ji = "Noun",
		Wi = "LastName",
		qi = "Modal",
		Ui = "Place",
		Ri = "Participle";
	var Qi = [null, null, {
		ea: Bi,
		ia: Ji,
		ic: Fi,
		ly: Si,
		"'n": Li,
		"'t": Li
	}, {
		oed: $i,
		ued: $i,
		xed: $i,
		" so": Si,
		"'ll": qi,
		"'re": "Copula",
		azy: Fi,
		eer: Ji,
		end: Li,
		ped: $i,
		ffy: Fi,
		ify: Vi,
		ing: "Gerund",
		ize: Vi,
		ibe: Vi,
		lar: Fi,
		mum: Fi,
		nes: zi,
		nny: Fi,
		ous: Fi,
		que: Fi,
		ger: Ji,
		ber: Ji,
		rol: Bi,
		sis: Bi,
		ogy: Bi,
		oid: Bi,
		ian: Bi,
		zes: zi,
		eld: $i,
		ken: Ri,
		ven: Ri,
		ten: Ri,
		ect: Vi,
		ict: Vi,
		ign: Vi,
		oze: Vi,
		ful: Fi,
		bal: Fi,
		ton: Ji
	}, {
		amed: $i,
		aped: $i,
		ched: $i,
		lked: $i,
		rked: $i,
		reed: $i,
		nded: $i,
		mned: Fi,
		cted: $i,
		dged: $i,
		ield: Bi,
		akis: Wi,
		cede: Vi,
		chuk: Wi,
		czyk: Wi,
		ects: zi,
		iend: Bi,
		ends: Li,
		enko: Wi,
		ette: Bi,
		iary: Bi,
		wner: Bi,
		fies: zi,
		fore: Si,
		gate: Vi,
		gone: Fi,
		ices: Ki,
		ints: Ki,
		ruct: Vi,
		ines: Ki,
		ions: Ki,
		ners: Ki,
		pers: Ki,
		lers: Ki,
		less: Fi,
		llen: Fi,
		made: Fi,
		nsen: Wi,
		oses: zi,
		ould: qi,
		some: Fi,
		sson: Wi,
		ians: Ki,
		tion: Bi,
		tage: Ji,
		ique: Bi,
		tive: Fi,
		tors: Ji,
		vice: Bi,
		lier: Bi,
		fier: Bi,
		wned: $i,
		gent: Bi,
		tist: Mi,
		pist: Mi,
		rist: Mi,
		mist: Mi,
		yist: Mi,
		vist: Mi,
		ists: Mi,
		lite: Bi,
		site: Bi,
		rite: Bi,
		mite: Bi,
		bite: Bi,
		mate: Bi,
		date: Bi,
		ndal: Bi,
		vent: Bi,
		uist: Mi,
		gist: Mi,
		note: Bi,
		cide: Bi,
		ence: Bi,
		wide: Fi,
		vide: Vi,
		ract: Vi,
		duce: Vi,
		pose: Vi,
		eive: Vi,
		lyze: Vi,
		lyse: Vi,
		iant: Fi,
		nary: Fi,
		ghty: Fi,
		uent: Fi,
		erer: Mi,
		bury: Ui,
		dorf: Ji,
		esty: Ji,
		wych: Ui,
		dale: Ui,
		folk: Ui
	}, {
		elist: Mi,
		holic: Bi,
		phite: Bi,
		tized: $i,
		urned: $i,
		eased: $i,
		ances: Ki,
		bound: Fi,
		ettes: Ki,
		fully: Si,
		ishes: zi,
		ities: Ki,
		marek: Wi,
		nssen: Wi,
		ology: Ji,
		osome: Bi,
		tment: Bi,
		ports: Ki,
		rough: Fi,
		tches: zi,
		tieth: "Ordinal",
		tures: Ki,
		wards: Si,
		where: Si,
		archy: Ji,
		pathy: Ji,
		opoly: Ji,
		embly: Ji,
		phate: Ji,
		ndent: Bi,
		scent: Bi,
		onist: Mi,
		anist: Mi,
		alist: Mi,
		olist: Mi,
		icist: Mi,
		ounce: Vi,
		iable: Fi,
		borne: Fi,
		gnant: Fi,
		inant: Fi,
		igent: Fi,
		atory: Fi,
		rient: Bi,
		dient: Bi,
		maker: Mi,
		burgh: Ui,
		mouth: Ui,
		ceter: Ui,
		ville: Ui,
		worth: Ji
	}, {
		auskas: Wi,
		parent: Bi,
		cedent: Bi,
		ionary: Bi,
		cklist: Bi,
		keeper: Mi,
		logist: Mi,
		teenth: "Value",
		worker: Mi,
		master: Mi,
		writer: Mi,
		brough: Ui,
		cester: Ui
	}, {
		logists: Mi,
		opoulos: Wi,
		borough: Ui,
		sdottir: Wi
	}];
	const _i = "Adjective",
		Zi = "Noun",
		Xi = "Verb";
	var Yi = [null, null, {}, {
		neo: Zi,
		bio: Zi,
		"de-": Xi,
		"re-": Xi,
		"un-": Xi,
		"ex-": Zi
	}, {
		anti: Zi,
		auto: Zi,
		faux: _i,
		hexa: Zi,
		kilo: Zi,
		mono: Zi,
		nano: Zi,
		octa: Zi,
		poly: Zi,
		semi: _i,
		tele: Zi,
		"pro-": _i,
		"mis-": Xi,
		"dis-": Xi,
		"pre-": _i
	}, {
		anglo: Zi,
		centi: Zi,
		ethno: Zi,
		ferro: Zi,
		grand: Zi,
		hepta: Zi,
		hydro: Zi,
		intro: Zi,
		macro: Zi,
		micro: Zi,
		milli: Zi,
		nitro: Zi,
		penta: Zi,
		quasi: _i,
		radio: Zi,
		tetra: Zi,
		"omni-": _i,
		"post-": _i
	}, {
		pseudo: _i,
		"extra-": _i,
		"hyper-": _i,
		"inter-": _i,
		"intra-": _i,
		"deca-": _i
	}, {
		electro: Zi
	}];
	const es = "Adjective",
		ts = "Infinitive",
		ns = "PresentTense",
		rs = "Singular",
		as = "PastTense",
		os = "Adverb",
		is = "Expression",
		ss = "Actor",
		ls = "Verb",
		us = "Noun",
		cs = "LastName";
	var hs = {
		a: [
			[/.[aeiou]na$/, us, "tuna"],
			[/.[oau][wvl]ska$/, cs],
			[/.[^aeiou]ica$/, rs, "harmonica"],
			[/^([hyj]a+)+$/, is, "haha"]
		],
		c: [
			[/.[^aeiou]ic$/, es]
		],
		d: [
			[/[aeiou](pp|ll|ss|ff|gg|tt|rr|bb|nn|mm)ed$/, as, "popped"],
			[/.[aeo]{2}[bdgmnprvz]ed$/, as, "rammed"],
			[/.[aeiou][sg]hed$/, as, "gushed"],
			[/.[aeiou]red$/, as, "hired"],
			[/.[aeiou]r?ried$/, as, "hurried"],
			[/[^aeiou]ard$/, rs, "steward"],
			[/[aeiou][^aeiou]id$/, es, ""],
			[/.[vrl]id$/, es, "livid"],
			[/..led$/, as, "hurled"],
			[/.[iao]sed$/, as, ""],
			[/[aeiou]n?[cs]ed$/, as, ""],
			[/[aeiou][rl]?[mnf]ed$/, as, ""],
			[/[aeiou][ns]?c?ked$/, as, "bunked"],
			[/[aeiou]gned$/, as],
			[/[aeiou][nl]?ged$/, as],
			[/.[tdbwxyz]ed$/, as],
			[/[^aeiou][aeiou][tvx]ed$/, as],
			[/.[cdflmnprstv]ied$/, as, "emptied"]
		],
		e: [
			[/.[lnr]ize$/, ts, "antagonize"],
			[/.[^aeiou]ise$/, ts, "antagonise"],
			[/.[aeiou]te$/, ts, "bite"],
			[/.[^aeiou][ai]ble$/, es, "fixable"],
			[/.[^aeiou]eable$/, es, "maleable"],
			[/.[ts]ive$/, es, "festive"],
			[/[a-z]-like$/, es, "woman-like"]
		],
		h: [
			[/.[^aeiouf]ish$/, es, "cornish"],
			[/.v[iy]ch$/, cs, "..ovich"],
			[/^ug?h+$/, is, "ughh"],
			[/^uh[ -]?oh$/, is, "uhoh"],
			[/[a-z]-ish$/, es, "cartoon-ish"]
		],
		i: [
			[/.[oau][wvl]ski$/, cs, "polish-male"]
		],
		k: [
			[/^(k){2}$/, is, "kkkk"]
		],
		l: [
			[/.[gl]ial$/, es, "familial"],
			[/.[^aeiou]ful$/, es, "fitful"],
			[/.[nrtumcd]al$/, es, "natal"],
			[/.[^aeiou][ei]al$/, es, "familial"]
		],
		m: [
			[/.[^aeiou]ium$/, rs, "magnesium"],
			[/[^aeiou]ism$/, rs, "schism"],
			[/^[hu]m+$/, is, "hmm"],
			[/^\d+ ?[ap]m$/, "Date", "3am"]
		],
		n: [
			[/.[lsrnpb]ian$/, es, "republican"],
			[/[^aeiou]ician$/, ss, "musician"],
			[/[aeiou][ktrp]in'$/, "Gerund", "cookin'"]
		],
		o: [
			[/^no+$/, is, "noooo"],
			[/^(yo)+$/, is, "yoo"],
			[/^wo{2,}[pt]?$/, is, "woop"]
		],
		r: [
			[/.[bdfklmst]ler$/, "Noun"],
			[/[aeiou][pns]er$/, rs],
			[/[^i]fer$/, ts],
			[/.[^aeiou][ao]pher$/, ss],
			[/.[lk]er$/, "Noun"],
			[/.ier$/, "Comparative"]
		],
		t: [
			[/.[di]est$/, "Superlative"],
			[/.[icldtgrv]ent$/, es],
			[/[aeiou].*ist$/, es],
			[/^[a-z]et$/, ls]
		],
		s: [
			[/.[^aeiou]ises$/, ns],
			[/.[rln]ates$/, ns],
			[/.[^z]ens$/, ls],
			[/.[lstrn]us$/, rs],
			[/.[aeiou]sks$/, ns],
			[/.[aeiou]kes$/, ns],
			[/[aeiou][^aeiou]is$/, rs],
			[/[a-z]'s$/, us],
			[/^yes+$/, is]
		],
		v: [
			[/.[^aeiou][ai][kln]ov$/, cs]
		],
		y: [
			[/.[cts]hy$/, es],
			[/.[st]ty$/, es],
			[/.[tnl]ary$/, es],
			[/.[oe]ry$/, rs],
			[/[rdntkbhs]ly$/, os],
			[/.(gg|bb|zz)ly$/, es],
			[/...lly$/, os],
			[/.[gk]y$/, es],
			[/[bszmp]{2}y$/, es],
			[/.[ai]my$/, es],
			[/[ea]{2}zy$/, es],
			[/.[^aeiou]ity$/, rs]
		]
	};
	const ds = "Verb",
		gs = "Noun";
	var ms = {
			leftTags: [
				["Adjective", gs],
				["Possessive", gs],
				["Determiner", gs],
				["Adverb", ds],
				["Pronoun", ds],
				["Value", gs],
				["Ordinal", gs],
				["Modal", ds],
				["Superlative", gs],
				["Demonym", gs],
				["Honorific", "Person"]
			],
			leftWords: [
				["i", ds],
				["first", gs],
				["it", ds],
				["there", ds],
				["not", ds],
				["because", gs],
				["if", gs],
				["but", gs],
				["who", ds],
				["this", gs],
				["his", gs],
				["when", gs],
				["you", ds],
				["very", "Adjective"],
				["old", gs],
				["never", ds],
				["before", gs],
				["a", gs],
				["the", gs],
				["been", ds]
			],
			rightTags: [
				["Copula", gs],
				["PastTense", gs],
				["Conjunction", gs],
				["Modal", gs]
			],
			rightWords: [
				["there", ds],
				["me", ds],
				["man", "Adjective"],
				["him", ds],
				["it", ds],
				["were", gs],
				["took", gs],
				["himself", ds],
				["went", gs],
				["who", gs],
				["jr", "Person"]
			]
		},
		ps = {
			fwd: "3:ser,ier¦1er:h,t,f,l,n¦1r:e¦2er:ss,or,om",
			both: "3er:ver,ear,alm¦3ner:hin¦3ter:lat¦2mer:im¦2er:ng,rm,mb¦2ber:ib¦2ger:ig¦1er:w,p,k,d¦ier:y",
			rev: "1:tter,yer¦2:uer,ver,ffer,oner,eler,ller,iler,ster,cer,uler,sher,ener,gher,aner,adder,nter,eter,rter,hter,rner,fter¦3:oser,ooler,eafer,user,airer,bler,maler,tler,eater,uger,rger,ainer,urer,ealer,icher,pler,emner,icter,nser,iser¦4:arser,viner,ucher,rosser,somer,ndomer,moter,oother,uarer,hiter¦5:nuiner,esser,emier¦ar:urther",
			ex: "worse:bad¦better:good¦4er:fair,gray,poor¦1urther:far¦3ter:fat,hot,wet¦3der:mad,sad¦3er:shy,fun¦4der:glad¦:¦4r:cute,dire,fake,fine,free,lame,late,pale,rare,ripe,rude,safe,sore,tame,wide¦5r:eerie,stale"
		},
		fs = {
			fwd: "1:nning,tting,rring,pping,eing,mming,gging,dding,bbing,kking¦2:eking,oling,eling,eming¦3:velling,siting,uiting,fiting,loting,geting,ialing,celling¦4:graming",
			both: "1:aing,iing,fing,xing,ying,oing,hing,wing¦2:tzing,rping,izzing,bting,mning,sping,wling,rling,wding,rbing,uping,lming,wning,mping,oning,lting,mbing,lking,fting,hting,sking,gning,pting,cking,ening,nking,iling,eping,ering,rting,rming,cting,lping,ssing,nting,nding,lding,sting,rning,rding,rking¦3:belling,siping,toming,yaking,uaking,oaning,auling,ooping,aiding,naping,euring,tolling,uzzing,ganing,haning,ualing,halling,iasing,auding,ieting,ceting,ouling,voring,ralling,garing,joring,oaming,oaking,roring,nelling,ooring,uelling,eaming,ooding,eaping,eeting,ooting,ooming,xiting,keting,ooking,ulling,airing,oaring,biting,outing,oiting,earing,naling,oading,eeding,ouring,eaking,aiming,illing,oining,eaning,onging,ealing,aining,eading¦4:thoming,melling,aboring,ivoting,weating,dfilling,onoring,eriting,imiting,tialling,rgining,otoring,linging,winging,lleting,louding,spelling,mpelling,heating,feating,opelling,choring,welling,ymaking,ctoring,calling,peating,iloring,laiting,utoring,uditing,mmaking,loating,iciting,waiting,mbating,voiding,otalling,nsoring,nselling,ocusing,itoring,eloping¦5:rselling,umpeting,atrolling,treating,tselling,rpreting,pringing,ummeting,ossoming,elmaking,eselling,rediting,totyping,onmaking,rfeiting,ntrolling¦5e:chmaking,dkeeping,severing,erouting,ecreting,ephoning,uthoring,ravening,reathing,pediting,erfering,eotyping,fringing,entoring,ombining,ompeting¦4e:emaking,eething,twining,rruling,chuting,xciting,rseding,scoping,edoring,pinging,lunging,agining,craping,pleting,eleting,nciting,nfining,ncoding,tponing,ecoding,writing,esaling,nvening,gnoring,evoting,mpeding,rvening,dhering,mpiling,storing,nviting,ploring¦3e:tining,nuring,saking,miring,haling,ceding,xuding,rining,nuting,laring,caring,miling,riding,hoking,piring,lading,curing,uading,noting,taping,futing,paring,hading,loding,siring,guring,vading,voking,during,niting,laning,caping,luting,muting,ruding,ciding,juring,laming,caling,hining,uoting,liding,ciling,duling,tuting,puting,cuting,coring,uiding,tiring,turing,siding,rading,enging,haping,buting,lining,taking,anging,haring,uiring,coming,mining,moting,suring,viding,luding¦2e:tring,zling,uging,oging,gling,iging,vring,fling,lging,obing,psing,pling,ubing,cling,dling,wsing,iking,rsing,dging,kling,ysing,tling,rging,eging,nsing,uning,osing,uming,using,ibing,bling,aging,ising,asing,ating¦2ie:rlying¦1e:zing,uing,cing,ving",
			rev: "ying:ie¦1ing:se,ke,te,we,ne,re,de,pe,me,le,c,he¦2ing:ll,ng,dd,ee,ye,oe,rg,us¦2ning:un¦2ging:og,ag,ug,ig,eg¦2ming:um¦2bing:ub,ab,eb,ob¦3ning:lan,can,hin,pin,win¦3ring:cur,lur,tir,tar,pur,car¦3ing:ait,del,eel,fin,eat,oat,eem,lel,ool,ein,uin¦3ping:rop,rap,top,uip,wap,hip,hop,lap,rip,cap¦3ming:tem,wim,rim,kim,lim¦3ting:mat,cut,pot,lit,lot,hat,set,pit,put¦3ding:hed,bed,bid¦3king:rek¦3ling:cil,pel¦3bing:rib¦4ning:egin¦4ing:isit,ruit,ilot,nsit,dget,rkel,ival,rcel¦4ring:efer,nfer¦4ting:rmit,mmit,ysit,dmit,emit,bmit,tfit,gret¦4ling:evel,xcel,ivel¦4ding:hred¦5ing:arget,posit,rofit¦5ring:nsfer¦5ting:nsmit,orget,cquit¦5ling:ancel,istil",
			ex: "3:adding,eating,aiming,aiding,airing,outing,gassing,setting,getting,putting,cutting,winning,sitting,betting,mapping,tapping,letting,bidding,hitting,tanning,netting,popping,fitting,capping,lapping,barring,banning,vetting,topping,rotting,tipping,potting,wetting,pitting,dipping,budding,hemming,pinning,jetting,kidding,padding,podding,sipping,wedding,bedding,donning,warring,penning,gutting,cueing,wadding,petting,ripping,napping,matting,tinning,binning,dimming,hopping,mopping,nodding,panning,rapping,ridding,sinning¦4:selling,falling,calling,waiting,editing,telling,rolling,heating,boating,hanging,beating,coating,singing,tolling,felling,polling,discing,seating,voiding,gelling,yelling,baiting,reining,ruining,seeking,spanning,stepping,knitting,emitting,slipping,quitting,dialing,omitting,clipping,shutting,skinning,abutting,flipping,trotting,cramming,fretting,suiting¦5:bringing,treating,spelling,stalling,trolling,expelling,rivaling,wringing,deterring,singeing,befitting,refitting¦6:enrolling,distilling,scrolling,strolling,caucusing,travelling¦7:installing,redefining,stencilling,recharging,overeating,benefiting,unraveling,programing¦9:reprogramming¦is:being¦2e:using,aging,owing¦3e:making,taking,coming,noting,hiring,filing,coding,citing,doping,baking,coping,hoping,lading,caring,naming,voting,riding,mining,curing,lining,ruling,typing,boring,dining,firing,hiding,piling,taping,waning,baling,boning,faring,honing,wiping,luring,timing,wading,piping,fading,biting,zoning,daring,waking,gaming,raking,ceding,tiring,coking,wining,joking,paring,gaping,poking,pining,coring,liming,toting,roping,wiring,aching¦4e:writing,storing,eroding,framing,smoking,tasting,wasting,phoning,shaking,abiding,braking,flaking,pasting,priming,shoring,sloping,withing,hinging¦5e:defining,refining,renaming,swathing,fringing,reciting¦1ie:dying,tying,lying,vying¦7e:sunbathing"
		},
		vs = {
			fwd: "1:mt¦2:llen¦3:iven,aken¦:ne¦y:in",
			both: "1:wn¦2:me,aten¦3:seen,bidden,isen¦4:roven,asten¦3l:pilt¦3d:uilt¦2e:itten¦1im:wum¦1eak:poken¦1ine:hone¦1ose:osen¦1in:gun¦1ake:woken¦ear:orn¦eal:olen¦eeze:ozen¦et:otten¦ink:unk¦ing:ung",
			rev: "2:un¦oken:eak¦ought:eek¦oven:eave¦1ne:o¦1own:ly¦1den:de¦1in:ay¦2t:am¦2n:ee¦3en:all¦4n:rive,sake,take¦5n:rgive",
			ex: "2:been¦3:seen,run¦4:given,taken¦5:shaken¦2eak:broken¦1ive:dove¦2y:flown¦3e:hidden,ridden¦1eek:sought¦1ake:woken¦1eave:woven"
		},
		bs = {
			fwd: "1:oes¦1ve:as",
			both: "1:xes¦2:zzes,ches,shes,sses¦3:iases¦2y:llies,plies¦1y:cies,bies,ties,vies,nies,pies,dies,ries,fies¦:s",
			rev: "1ies:ly¦2es:us,go,do¦3es:cho,eto",
			ex: "2:does,goes¦3:gasses¦5:focuses¦is:are¦3y:relies¦2y:flies¦2ve:has"
		},
		ys = {
			fwd: "1st:e¦1est:l,m,f,s¦1iest:cey¦2est:or,ir¦3est:ver",
			both: "4:east¦5:hwest¦5lest:erful¦4est:weet,lgar,tter,oung¦4most:uter¦3est:ger,der,rey,iet,ong,ear¦3test:lat¦3most:ner¦2est:pt,ft,nt,ct,rt,ht¦2test:it¦2gest:ig¦1est:b,k,n,p,h,d,w¦iest:y",
			rev: "1:ttest,nnest,yest¦2:sest,stest,rmest,cest,vest,lmest,olest,ilest,ulest,ssest,imest,uest¦3:rgest,eatest,oorest,plest,allest,urest,iefest,uelest,blest,ugest,amest,yalest,ealest,illest,tlest,itest¦4:cerest,eriest,somest,rmalest,ndomest,motest,uarest,tiffest¦5:leverest,rangest¦ar:urthest¦3ey:riciest",
			ex: "best:good¦worst:bad¦5est:great¦4est:fast,full,fair,dull¦3test:hot,wet,fat¦4nest:thin¦1urthest:far¦3est:gay,shy,ill¦4test:neat¦4st:late,wide,fine,safe,cute,fake,pale,rare,rude,sore,ripe,dire¦6st:severe"
		},
		ws = {
			fwd: "1:tistic,eable,lful,sful,ting,tty¦2:onate,rtable,geous,ced,seful,ctful¦3:ortive,ented¦arity:ear¦y:etic¦fulness:begone¦1ity:re¦1y:tiful,gic¦2ity:ile,imous,ilous,ime¦2ion:ated¦2eness:iving¦2y:trious¦2ation:iring¦2tion:vant¦3ion:ect¦3ce:mant,mantic¦3tion:irable¦3y:est,estic¦3m:mistic,listic¦3ess:ning¦4n:utious¦4on:rative,native,vative,ective¦4ce:erant",
			both: "1:king,wing¦2:alous,ltuous,oyful,rdous¦3:gorous,ectable,werful,amatic¦4:oised,usical,agical,raceful,ocused,lined,ightful¦5ness:stful,lding,itous,nuous,ulous,otous,nable,gious,ayful,rvous,ntous,lsive,peful,entle,ciful,osive,leful,isive,ncise,reful,mious¦5ty:ivacious¦5ties:ubtle¦5ce:ilient,adiant,atient¦5cy:icient¦5sm:gmatic¦5on:sessive,dictive¦5ity:pular,sonal,eative,entic¦5sity:uminous¦5ism:conic¦5nce:mperate¦5ility:mitable¦5ment:xcited¦5n:bitious¦4cy:brant,etent,curate¦4ility:erable,acable,icable,ptable¦4ty:nacious,aive,oyal,dacious¦4n:icious¦4ce:vient,erent,stent,ndent,dient,quent,ident¦4ness:adic,ound,hing,pant,sant,oing,oist,tute¦4icity:imple¦4ment:fined,mused¦4ism:otic¦4ry:dantic¦4ity:tund,eral¦4edness:hand¦4on:uitive¦4lity:pitable¦4sm:eroic,namic¦4sity:nerous¦3th:arm¦3ility:pable,bable,dable,iable¦3cy:hant,nant,icate¦3ness:red,hin,nse,ict,iet,ite,oud,ind,ied,rce¦3ion:lute¦3ity:ual,gal,volous,ial¦3ce:sent,fensive,lant,gant,gent,lent,dant¦3on:asive¦3m:fist,sistic,iastic¦3y:terious,xurious,ronic,tastic¦3ur:amorous¦3e:tunate¦3ation:mined¦3sy:rteous¦3ty:ain¦3ry:ave¦3ment:azed¦2ness:de,on,ue,rn,ur,ft,rp,pe,om,ge,rd,od,ay,ss,er,ll,oy,ap,ht,ld,ad,rt¦2inousness:umous¦2ity:neous,ene,id,ane¦2cy:bate,late¦2ation:ized¦2ility:oble,ible¦2y:odic¦2e:oving,aring¦2s:ost¦2itude:pt¦2dom:ee¦2ance:uring¦2tion:reet¦2ion:oted¦2sion:ending¦2liness:an¦2or:rdent¦1th:ung¦1e:uable¦1ness:w,h,k,f¦1ility:mble¦1or:vent¦1ement:ging¦1tiquity:ncient¦1ment:hed¦verty:or¦ength:ong¦eat:ot¦pth:ep¦iness:y",
			rev: "",
			ex: "5:forceful,humorous¦8:charismatic¦13:understanding¦5ity:active¦11ness:adventurous,inquisitive,resourceful¦8on:aggressive,automatic,perceptive¦7ness:amorous,fatuous,furtive,ominous,serious¦5ness:ample,sweet¦12ness:apprehensive,cantankerous,contemptuous,ostentatious¦13ness:argumentative,conscientious¦9ness:assertive,facetious,imperious,inventive,oblivious,rapacious,receptive,seditious,whimsical¦10ness:attractive,expressive,impressive,loquacious,salubrious,thoughtful¦3edom:boring¦4ness:calm,fast,keen,tame¦8ness:cheerful,gracious,specious,spurious,timorous,unctuous¦5sity:curious¦9ion:deliberate¦8ion:desperate¦6e:expensive¦7ce:fragrant¦3y:furious¦9ility:ineluctable¦6ism:mystical¦8ity:physical,proactive,sensitive,vertical¦5cy:pliant¦7ity:positive¦9ity:practical¦12ism:professional¦6ce:prudent¦3ness:red¦6cy:vagrant¦3dom:wise"
		},
		ks = function(e = "", t = {}) {
			let n = function(e, t = {}) {
				return t.hasOwnProperty(e) ? t[e] : null
			}(e, t.ex);
			return n = n || function(e, t = []) {
				for (let n = 0; n < t.length; n += 1)
					if (e.endsWith(t[n])) return e;
				return null
			}(e, t.same), n = n || function(e, t, n = {}) {
				t = t || {};
				for (let r = e.length - 1; r >= 1; r -= 1) {
					let a = e.length - r,
						o = e.substring(a, e.length);
					if (!0 === t.hasOwnProperty(o)) return e.slice(0, a) + t[o];
					if (!0 === n.hasOwnProperty(o)) return e.slice(0, a) + n[o]
				}
				return t.hasOwnProperty("") ? e + t[""] : n.hasOwnProperty("") ? e + n[""] : null
			}(e, t.fwd, t.both), n = n || e, n
		};
	const Ps = function(e) {
		return Object.entries(e).reduce(((e, t) => (e[t[1]] = t[0], e)), {})
	};
	var As = function(e = {}) {
		return {
			reversed: !0,
			both: Ps(e.both),
			ex: Ps(e.ex),
			fwd: e.rev || {}
		}
	};
	const Cs = /^([0-9]+)/,
		js = function(e) {
			let t = function(e) {
				let t = {};
				return e.split("¦").forEach((e => {
					let [n, r] = e.split(":");
					r = (r || "").split(","), r.forEach((e => {
						t[e] = n
					}))
				})), t
			}(e);
			return Object.keys(t).reduce(((e, n) => (e[n] = function(e = "", t = "") {
				let n = (t = String(t)).match(Cs);
				if (null === n) return t;
				let r = Number(n[1]) || 0;
				return e.substring(0, r) + t.replace(Cs, "")
			}(n, t[n]), e)), {})
		};
	var Ns = function(e = {}) {
		return "string" == typeof e && (e = JSON.parse(e)), e.fwd = js(e.fwd || ""), e.both = js(e.both || ""), e.rev = js(e.rev || ""), e.ex = js(e.ex || ""), e
	};
	const xs = Ns({
			fwd: "1:tted,wed,gged,nned,een,rred,pped,yed,bbed,oed,dded,rd,wn,mmed¦2:eed,nded,et,hted,st,oled,ut,emed,eled,lded,ken,rt,nked,apt,ant,eped,eked¦3:eared,eat,eaded,nelled,ealt,eeded,ooted,eaked,eaned,eeted,mited,bid,uit,ead,uited,ealed,geted,velled,ialed,belled¦4:ebuted,hined,comed¦y:ied¦ome:ame¦ear:ore¦ind:ound¦ing:ung,ang¦ep:pt¦ink:ank,unk¦ig:ug¦all:ell¦ee:aw¦ive:ave¦eeze:oze¦old:eld¦ave:ft¦ake:ook¦ell:old¦ite:ote¦ide:ode¦ine:one¦in:un,on¦eal:ole¦im:am¦ie:ay¦and:ood¦1ise:rose¦1eak:roke¦1ing:rought¦1ive:rove¦1el:elt¦1id:bade¦1et:got¦1y:aid¦1it:sat¦3e:lid¦3d:pent",
			both: "1:aed,fed,xed,hed¦2:sged,xted,wled,rped,lked,kied,lmed,lped,uped,bted,rbed,rked,wned,rled,mped,fted,mned,mbed,zzed,omed,ened,cked,gned,lted,sked,ued,zed,nted,ered,rted,rmed,ced,sted,rned,ssed,rded,pted,ved,cted¦3:cled,eined,siped,ooned,uked,ymed,jored,ouded,ioted,oaned,lged,asped,iged,mured,oided,eiled,yped,taled,moned,yled,lit,kled,oaked,gled,naled,fled,uined,oared,valled,koned,soned,aided,obed,ibed,meted,nicked,rored,micked,keted,vred,ooped,oaded,rited,aired,auled,filled,ouled,ooded,ceted,tolled,oited,bited,aped,tled,vored,dled,eamed,nsed,rsed,sited,owded,pled,sored,rged,osed,pelled,oured,psed,oated,loned,aimed,illed,eured,tred,ioned,celled,bled,wsed,ooked,oiled,itzed,iked,iased,onged,ased,ailed,uned,umed,ained,auded,nulled,ysed,eged,ised,aged,oined,ated,used,dged,doned¦4:ntied,efited,uaked,caded,fired,roped,halled,roked,himed,culed,tared,lared,tuted,uared,routed,pited,naked,miled,houted,helled,hared,cored,caled,tired,peated,futed,ciled,called,tined,moted,filed,sided,poned,iloted,honed,lleted,huted,ruled,cured,named,preted,vaded,sured,talled,haled,peded,gined,nited,uided,ramed,feited,laked,gured,ctored,unged,pired,cuted,voked,eloped,ralled,rined,coded,icited,vided,uaded,voted,mined,sired,noted,lined,nselled,luted,jured,fided,puted,piled,pared,olored,cided,hoked,enged,tured,geoned,cotted,lamed,uiled,waited,udited,anged,luded,mired,uired,raded¦5:modelled,izzled,eleted,umpeted,ailored,rseded,treated,eduled,ecited,rammed,eceded,atrolled,nitored,basted,twined,itialled,ncited,gnored,ploded,xcited,nrolled,namelled,plored,efeated,redited,ntrolled,nfined,pleted,llided,lcined,eathed,ibuted,lloted,dhered,cceded¦3ad:sled¦2aw:drew¦2ot:hot¦2ke:made¦2ow:hrew,grew¦2ose:hose¦2d:ilt¦2in:egan¦1un:ran¦1ink:hought¦1ick:tuck¦1ike:ruck¦1eak:poke,nuck¦1it:pat¦1o:did¦1ow:new¦1ake:woke¦go:went",
			rev: "3:rst,hed,hut,cut,set¦4:tbid¦5:dcast,eread,pread,erbid¦ought:uy,eek¦1ied:ny,ly,dy,ry,fy,py,vy,by,ty,cy¦1ung:ling,ting,wing¦1pt:eep¦1ank:rink¦1ore:bear,wear¦1ave:give¦1oze:reeze¦1ound:rind,wind¦1ook:take,hake¦1aw:see¦1old:sell¦1ote:rite¦1ole:teal¦1unk:tink¦1am:wim¦1ay:lie¦1ood:tand¦1eld:hold¦2d:he,ge,re,le,leed,ne,reed,be,ye,lee,pe,we¦2ed:dd,oy,or,ey,gg,rr,us,ew,to¦2ame:ecome,rcome¦2ped:ap¦2ged:ag,og,ug,eg¦2bed:ub,ab,ib,ob¦2lt:neel¦2id:pay¦2ang:pring¦2ove:trive¦2med:um¦2ode:rride¦2at:ysit¦3ted:mit,hat,mat,lat,pot,rot,bat¦3ed:low,end,tow,und,ond,eem,lay,cho,dow,xit,eld,ald,uld,law,lel,eat,oll,ray,ank,fin,oam,out,how,iek,tay,haw,ait,vet,say,cay,bow¦3d:ste,ede,ode,ete,ree,ude,ame,oke,ote,ime,ute,ade¦3red:lur,cur,pur,car¦3ped:hop,rop,uip,rip,lip,tep,top¦3ded:bed,rod,kid¦3ade:orbid¦3led:uel¦3ned:lan,can,kin,pan,tun¦3med:rim,lim¦4ted:quit,llot¦4ed:pear,rrow,rand,lean,mand,anel,pand,reet,link,abel,evel,imit,ceed,ruit,mind,peal,veal,hool,head,pell,well,mell,uell,band,hear,weak¦4led:nnel,qual,ebel,ivel¦4red:nfer,efer,sfer¦4n:sake,trew¦4d:ntee¦4ded:hred¦4ned:rpin¦5ed:light,nceal,right,ndear,arget,hread,eight,rtial,eboot¦5d:edite,nvite¦5ted:egret¦5led:ravel",
			ex: "2:been,upped¦3:added,aged,aided,aimed,aired,bid,died,dyed,egged,erred,eyed,fit,gassed,hit,lied,owed,pent,pied,tied,used,vied,oiled,outed,banned,barred,bet,canned,cut,dipped,donned,ended,feed,inked,jarred,let,manned,mowed,netted,padded,panned,pitted,popped,potted,put,set,sewn,sowed,tanned,tipped,topped,vowed,weed,bowed,jammed,binned,dimmed,hopped,mopped,nodded,pinned,rigged,sinned,towed,vetted¦4:ached,baked,baled,boned,bored,called,caned,cared,ceded,cited,coded,cored,cubed,cured,dared,dined,edited,exited,faked,fared,filed,fined,fired,fuelled,gamed,gelled,hired,hoped,joked,lined,mined,named,noted,piled,poked,polled,pored,pulled,reaped,roamed,rolled,ruled,seated,shed,sided,timed,tolled,toned,voted,waited,walled,waned,winged,wiped,wired,zoned,yelled,tamed,lubed,roped,faded,mired,caked,honed,banged,culled,heated,raked,welled,banded,beat,cast,cooled,cost,dealt,feared,folded,footed,handed,headed,heard,hurt,knitted,landed,leaked,leapt,linked,meant,minded,molded,neared,needed,peaked,plodded,plotted,pooled,quit,read,rooted,sealed,seeded,seeped,shipped,shunned,skimmed,slammed,sparred,stemmed,stirred,suited,thinned,twinned,swayed,winked,dialed,abutted,blotted,fretted,healed,heeded,peeled,reeled¦5:basted,cheated,equalled,eroded,exiled,focused,opined,pleated,primed,quoted,scouted,shored,sloped,smoked,sniped,spelled,spouted,routed,staked,stored,swelled,tasted,treated,wasted,smelled,dwelled,honored,prided,quelled,eloped,scared,coveted,sweated,breaded,cleared,debuted,deterred,freaked,modeled,pleaded,rebutted,speeded¦6:anchored,defined,endured,impaled,invited,refined,revered,strolled,cringed,recast,thrust,unfolded¦7:authored,combined,competed,conceded,convened,excreted,extruded,redefined,restored,secreted,rescinded,welcomed¦8:expedited,infringed¦9:interfered,intervened,persevered¦10:contravened¦eat:ate¦is:was¦go:went¦are:were¦3d:bent,lent,rent,sent¦3e:bit,fled,hid,lost¦3ed:bled,bred¦2ow:blew,grew¦1uy:bought¦2tch:caught¦1o:did¦1ive:dove,gave¦2aw:drew¦2ed:fed¦2y:flew,laid,paid,said¦1ight:fought¦1et:got¦2ve:had¦1ang:hung¦2ad:led¦2ght:lit¦2ke:made¦2et:met¦1un:ran¦1ise:rose¦1it:sat¦1eek:sought¦1each:taught¦1ake:woke,took¦1eave:wove¦2ise:arose¦1ear:bore,tore,wore¦1ind:bound,found,wound¦2eak:broke¦2ing:brought,wrung¦1ome:came¦2ive:drove¦1ig:dug¦1all:fell¦2el:felt¦4et:forgot¦1old:held¦2ave:left¦1ing:rang,sang¦1ide:rode¦1ink:sank¦1ee:saw¦2ine:shone¦4e:slid¦1ell:sold,told¦4d:spent¦2in:spun¦1in:won"
		}),
		Is = Ns(bs),
		Ts = Ns(fs),
		Ds = Ns(vs),
		Hs = As(xs),
		Gs = As(Is),
		Es = As(Ts),
		Os = As(Ds),
		Fs = Ns(ps),
		Vs = Ns(ys);
	var zs = {
			fromPast: xs,
			fromPresent: Is,
			fromGerund: Ts,
			fromParticiple: Ds,
			toPast: Hs,
			toPresent: Gs,
			toGerund: Es,
			toParticiple: Os,
			toComparative: Fs,
			toSuperlative: Vs,
			fromComparative: As(Fs),
			fromSuperlative: As(Vs),
			adjToNoun: Ns(ws)
		},
		Bs = ["academy", "administration", "agence", "agences", "agencies", "agency", "airlines", "airways", "army", "assoc", "associates", "association", "assurance", "authority", "autorite", "aviation", "bank", "banque", "board", "boys", "brands", "brewery", "brotherhood", "brothers", "bureau", "cafe", "co", "caisse", "capital", "care", "cathedral", "center", "centre", "chemicals", "choir", "chronicle", "church", "circus", "clinic", "clinique", "club", "co", "coalition", "coffee", "collective", "college", "commission", "committee", "communications", "community", "company", "comprehensive", "computers", "confederation", "conference", "conseil", "consulting", "containers", "corporation", "corps", "corp", "council", "crew", "data", "departement", "department", "departments", "design", "development", "directorate", "division", "drilling", "education", "eglise", "electric", "electricity", "energy", "ensemble", "enterprise", "enterprises", "entertainment", "estate", "etat", "faculty", "faction", "federation", "financial", "fm", "foundation", "fund", "gas", "gazette", "girls", "government", "group", "guild", "herald", "holdings", "hospital", "hotel", "hotels", "inc", "industries", "institut", "institute", "institutes", "insurance", "international", "interstate", "investment", "investments", "investors", "journal", "laboratory", "labs", "llc", "ltd", "limited", "machines", "magazine", "management", "marine", "marketing", "markets", "media", "memorial", "ministere", "ministry", "military", "mobile", "motor", "motors", "musee", "museum", "news", "observatory", "office", "oil", "optical", "orchestra", "organization", "partners", "partnership", "petrol", "petroleum", "pharmacare", "pharmaceutical", "pharmaceuticals", "pizza", "plc", "police", "politburo", "polytechnic", "post", "power", "press", "productions", "quartet", "radio", "reserve", "resources", "restaurant", "restaurants", "savings", "school", "securities", "service", "services", "societe", "subsidiary", "society", "sons", "subcommittee", "syndicat", "systems", "telecommunications", "telegraph", "television", "times", "tribunal", "tv", "union", "university", "utilities", "workers"].reduce(((e, t) => (e[t] = !0, e)), {}),
		$s = ["atoll", "basin", "bay", "beach", "bluff", "bog", "camp", "canyon", "canyons", "cape", "cave", "caves", "cliffs", "coast", "cove", "coves", "crater", "creek", "desert", "dune", "dunes", "escarpment", "estuary", "falls", "fjord", "fjords", "forest", "forests", "glacier", "gorge", "gorges", "gulf", "gully", "highland", "hill", "hills", "inlet", "island", "islands", "isthmus", "knoll", "lagoon", "lake", "marsh", "marshes", "mount", "mountain", "mountains", "narrows", "peninsula", "plains", "plateau", "pond", "rapids", "ravine", "reef", "reefs", "ridge", "river", "rivers", "sandhill", "shoal", "shore", "shoreline", "shores", "strait", "straits", "stream", "swamp", "tombolo", "trail", "trails", "trench", "valley", "vallies", "volcano", "waterfall", "watershed", "wetland", "woods", "burough", "county", "district", "municipality", "prefecture", "province", "region", "reservation", "state", "territory", "borough", "metropolis", "downtown", "uptown", "midtown", "city", "town", "township", "hamlet", "country", "kingdom", "enclave", "neighbourhood", "neighborhood", "kingdom", "ward", "zone", "airport", "amphitheater", "arch", "arena", "auditorium", "bar", "barn", "basilica", "battlefield", "bridge", "building", "castle", "centre", "coliseum", "cineplex", "complex", "dam", "farm", "field", "fort", "garden", "gardens", "gymnasium", "hall", "house", "levee", "library", "memorial", "monument", "museum", "gallery", "palace", "pillar", "pits", "plantation", "playhouse", "quarry", "sportsfield", "sportsplex", "stadium", "terrace", "terraces", "theater", "tower", "park", "parks", "site", "raceway", "sportsplex", "st", "street", "rd", "road", "crescent", "cr", "way", "tr", "terrace", "avenue", "ave"].reduce(((e, t) => (e[t] = !0, e)), {}),
		Ss = [
			[/([^v])ies$/i, "$1y"],
			[/(ise)s$/i, "$1"],
			[/(kn|[^o]l|w)ives$/i, "$1ife"],
			[/^((?:ca|e|ha|(?:our|them|your)?se|she|wo)l|lea|loa|shea|thie)ves$/i, "$1f"],
			[/^(dwar|handkerchie|hoo|scar|whar)ves$/i, "$1f"],
			[/(antenn|formul|nebul|vertebr|vit)ae$/i, "$1a"],
			[/(octop|vir|radi|nucle|fung|cact|stimul)(i)$/i, "$1us"],
			[/(buffal|tomat|tornad)(oes)$/i, "$1o"],
			[/(ause)s$/i, "$1"],
			[/(ease)s$/i, "$1"],
			[/(ious)es$/i, "$1"],
			[/(ouse)s$/i, "$1"],
			[/(ose)s$/i, "$1"],
			[/(..ase)s$/i, "$1"],
			[/(..[aeiu]s)es$/i, "$1"],
			[/(vert|ind|cort)(ices)$/i, "$1ex"],
			[/(matr|append)(ices)$/i, "$1ix"],
			[/([xo]|ch|ss|sh)es$/i, "$1"],
			[/men$/i, "man"],
			[/(n)ews$/i, "$1ews"],
			[/([ti])a$/i, "$1um"],
			[/([^aeiouy]|qu)ies$/i, "$1y"],
			[/(s)eries$/i, "$1eries"],
			[/(m)ovies$/i, "$1ovie"],
			[/(cris|ax|test)es$/i, "$1is"],
			[/(alias|status)es$/i, "$1"],
			[/(ss)$/i, "$1"],
			[/(ic)s$/i, "$1"],
			[/s$/i, ""]
		],
		Ks = function(e, t) {
			const {
				irregularPlurals: n
			} = t.two;
			let r = (a = n, Object.keys(a).reduce(((e, t) => (e[a[t]] = t, e)), {}));
			var a;
			if (r.hasOwnProperty(e)) return r[e];
			for (let t = 0; t < Ss.length; t++)
				if (!0 === Ss[t][0].test(e)) return e = e.replace(Ss[t][0], Ss[t][1]);
			return e
		},
		Ms = {
			toPlural: Wo,
			toSingular: Ks,
			all: function(e, t) {
				let n = [e],
					r = Wo(e, t);
				r !== e && n.push(r);
				let a = Ks(e, t);
				return a !== e && n.push(a), n
			}
		};
	let Ls = {
		Gerund: ["ing"],
		Actor: ["erer"],
		Infinitive: ["ate", "ize", "tion", "rify", "then", "ress", "ify", "age", "nce", "ect", "ise", "ine", "ish", "ace", "ash", "ure", "tch", "end", "ack", "and", "ute", "ade", "ock", "ite", "ase", "ose", "use", "ive", "int", "nge", "lay", "est", "ain", "ant", "ent", "eed", "er", "le", "unk", "ung", "upt", "en"],
		PastTense: ["ept", "ed", "lt", "nt", "ew", "ld"],
		PresentTense: ["rks", "cks", "nks", "ngs", "mps", "tes", "zes", "ers", "les", "acks", "ends", "ands", "ocks", "lays", "eads", "lls", "els", "ils", "ows", "nds", "ays", "ams", "ars", "ops", "ffs", "als", "urs", "lds", "ews", "ips", "es", "ts", "ns"],
		Participle: ["ken", "wn"]
	};
	Ls = Object.keys(Ls).reduce(((e, t) => (Ls[t].forEach((n => e[n] = t)), e)), {});
	var Js = Ls,
		Ws = function(e) {
			let t = e.substring(e.length - 3);
			if (!0 === Js.hasOwnProperty(t)) return Js[t];
			let n = e.substring(e.length - 2);
			return !0 === Js.hasOwnProperty(n) ? Js[n] : "s" === e.substring(e.length - 1) ? "PresentTense" : null
		};
	const qs = {
		are: "be",
		were: "be",
		been: "be",
		is: "be",
		am: "be",
		was: "be",
		be: "be",
		being: "be"
	};
	var Us = function(e, t, n) {
			const {
				fromPast: r,
				fromPresent: a,
				fromGerund: o,
				fromParticiple: i
			} = t.two.models;
			let {
				prefix: s,
				verb: l,
				particle: u
			} = function(e, t) {
				let n = "",
					r = {};
				t.one && t.one.prefixes && (r = t.one.prefixes);
				let [a, o] = e.split(/ /);
				return o && !0 === r[a] && (n = a, a = o, o = ""), {
					prefix: n,
					verb: a,
					particle: o
				}
			}(e, t), c = "";
			if (n || (n = Ws(e)), qs.hasOwnProperty(e)) c = qs[e];
			else if ("Participle" === n) c = ks(l, i);
			else if ("PastTense" === n) c = ks(l, r);
			else if ("PresentTense" === n) c = ks(l, a);
			else {
				if ("Gerund" !== n) return e;
				c = ks(l, o)
			}
			return u && (c += " " + u), s && (c = s + " " + c), c
		},
		Rs = function(e, t) {
			const {
				toPast: n,
				toPresent: r,
				toGerund: a,
				toParticiple: o
			} = t.two.models;
			if ("be" === e) return {
				Infinitive: e,
				Gerund: "being",
				PastTense: "was",
				PresentTense: "is"
			};
			let [i, s] = (e => / /.test(e) ? e.split(/ /) : [e, ""])(e), l = {
				Infinitive: i,
				PastTense: ks(i, n),
				PresentTense: ks(i, r),
				Gerund: ks(i, a),
				FutureTense: "will " + i
			}, u = ks(i, o);
			if (u !== e && u !== l.PastTense) {
				let n = t.one.lexicon || {};
				"Participle" !== n[u] && "Adjective" !== n[u] || ("play" === e && (u = "played"), l.Participle = u)
			}
			return s && Object.keys(l).forEach((e => {
				l[e] += " " + s
			})), l
		},
		Qs = {
			toInfinitive: Us,
			conjugate: Rs,
			all: function(e, t) {
				let n = Rs(e, t);
				return delete n.FutureTense, Object.values(n).filter((e => e))
			}
		};
	const _s = function(e, t) {
			const n = t.two.models.toSuperlative;
			return ks(e, n)
		},
		Zs = function(e, t) {
			const n = t.two.models.toComparative;
			return ks(e, n)
		};
	var Xs = function(e = "", t = []) {
		const n = e.length;
		for (let r = n <= 6 ? n - 1 : 6; r >= 1; r -= 1) {
			let a = e.substring(n - r, e.length);
			if (!0 === t[a.length].hasOwnProperty(a)) return e.slice(0, n - r) + t[a.length][a]
		}
		return null
	};
	const Ys = "ically",
		el = new Set(["analyt" + Ys, "chem" + Ys, "class" + Ys, "clin" + Ys, "crit" + Ys, "ecolog" + Ys, "electr" + Ys, "empir" + Ys, "frant" + Ys, "grammat" + Ys, "ident" + Ys, "ideolog" + Ys, "log" + Ys, "mag" + Ys, "mathemat" + Ys, "mechan" + Ys, "med" + Ys, "method" + Ys, "method" + Ys, "mus" + Ys, "phys" + Ys, "phys" + Ys, "polit" + Ys, "pract" + Ys, "rad" + Ys, "satir" + Ys, "statist" + Ys, "techn" + Ys, "technolog" + Ys, "theoret" + Ys, "typ" + Ys, "vert" + Ys, "whims" + Ys]),
		tl = [null, {}, {
			ly: ""
		}, {
			ily: "y",
			bly: "ble",
			ply: "ple"
		}, {
			ally: "al",
			rply: "rp"
		}, {
			ually: "ual",
			ially: "ial",
			cally: "cal",
			eally: "eal",
			rally: "ral",
			nally: "nal",
			mally: "mal",
			eeply: "eep",
			eaply: "eap"
		}, {
			ically: "ic"
		}],
		nl = new Set(["early", "only", "hourly", "daily", "weekly", "monthly", "yearly", "mostly", "duly", "unduly", "especially", "undoubtedly", "conversely", "namely", "exceedingly", "presumably", "accordingly", "overly", "best", "latter", "little", "long", "low"]),
		rl = {
			wholly: "whole",
			fully: "full",
			truly: "true",
			gently: "gentle",
			singly: "single",
			customarily: "customary",
			idly: "idle",
			publically: "public",
			quickly: "quick",
			superbly: "superb",
			cynically: "cynical",
			well: "good"
		},
		al = [null, {
			y: "ily"
		}, {
			ly: "ly",
			ic: "ically"
		}, {
			ial: "ially",
			ual: "ually",
			tle: "tly",
			ble: "bly",
			ple: "ply",
			ary: "arily"
		}, {}, {}, {}],
		ol = {
			cool: "cooly",
			whole: "wholly",
			full: "fully",
			good: "well",
			idle: "idly",
			public: "publicly",
			single: "singly",
			special: "especially"
		};
	var il = function(e) {
			if (ol.hasOwnProperty(e)) return ol[e];
			let t = Xs(e, al);
			return t || (t = e + "ly"), t
		},
		sl = {
			toSuperlative: _s,
			toComparative: Zs,
			toAdverb: il,
			toNoun: function(e, t) {
				const n = t.two.models.adjToNoun;
				return ks(e, n)
			},
			fromAdverb: function(e) {
				return e.endsWith("ly") ? el.has(e) ? e.replace(/ically/, "ical") : nl.has(e) ? null : rl.hasOwnProperty(e) ? rl[e] : Xs(e, tl) || e : null
			},
			fromSuperlative: function(e, t) {
				const n = t.two.models.fromSuperlative;
				return ks(e, n)
			},
			fromComparative: function(e, t) {
				const n = t.two.models.fromComparative;
				return ks(e, n)
			},
			all: function(e, t) {
				let n = [e];
				return n.push(_s(e, t)), n.push(Zs(e, t)), n.push(il(e)), n = n.filter((e => e)), n = new Set(n), Array.from(n)
			}
		},
		ll = {
			noun: Ms,
			verb: Qs,
			adjective: sl
		},
		ul = {
			Singular: (e, t, n, r) => {
				let a = r.one.lexicon,
					o = n.two.transform.noun.toPlural(e, r);
				a[o] || (t[o] = t[o] || "Plural")
			},
			Actor: (e, t, n, r) => {
				let a = r.one.lexicon,
					o = n.two.transform.noun.toPlural(e, r);
				a[o] || (t[o] = t[o] || ["Plural", "Actor"])
			},
			Comparable: (e, t, n, r) => {
				let a = r.one.lexicon,
					{
						toSuperlative: o,
						toComparative: i
					} = n.two.transform.adjective,
					s = o(e, r);
				a[s] || (t[s] = t[s] || "Superlative");
				let l = i(e, r);
				a[l] || (t[l] = t[l] || "Comparative"), t[e] = "Adjective"
			},
			Demonym: (e, t, n, r) => {
				let a = n.two.transform.noun.toPlural(e, r);
				t[a] = t[a] || ["Demonym", "Plural"]
			},
			Infinitive: (e, t, n, r) => {
				let a = r.one.lexicon,
					o = n.two.transform.verb.conjugate(e, r);
				Object.entries(o).forEach((e => {
					a[e[1]] || t[e[1]] || "FutureTense" === e[0] || (t[e[1]] = e[0])
				}))
			},
			PhrasalVerb: (e, t, n, r) => {
				let a = r.one.lexicon;
				t[e] = ["PhrasalVerb", "Infinitive"];
				let o = r.one._multiCache,
					[i, s] = e.split(" ");
				a[i] || (t[i] = t[i] || "Infinitive");
				let l = n.two.transform.verb.conjugate(i, r);
				delete l.FutureTense, Object.entries(l).forEach((e => {
					if ("Actor" === e[0] || "" === e[1]) return;
					t[e[1]] || a[e[1]] || (t[e[1]] = e[0]), o[e[1]] = 2;
					let n = e[1] + " " + s;
					t[n] = t[n] || [e[0], "PhrasalVerb"]
				}))
			},
			Multiple: (e, t) => {
				t[e] = ["Multiple", "Cardinal"], t[e + "th"] = ["Multiple", "Ordinal"], t[e + "ths"] = ["Multiple", "Fraction"]
			},
			Cardinal: (e, t) => {
				t[e] = ["TextValue", "Cardinal"]
			},
			Ordinal: (e, t) => {
				t[e] = ["TextValue", "Ordinal"], t[e + "s"] = ["TextValue", "Fraction"]
			},
			Place: (e, t) => {
				t[e] = ["Place", "ProperNoun"]
			},
			Region: (e, t) => {
				t[e] = ["Region", "ProperNoun"]
			}
		},
		cl = function(e, t) {
			const {
				methods: n,
				model: r
			} = t;
			let a = {},
				o = {};
			return Object.keys(e).forEach((t => {
				let i = e[t],
					s = (t = (t = t.toLowerCase().trim()).replace(/'s\b/, "")).split(/ /);
				s.length > 1 && (void 0 === o[s[0]] || s.length > o[s[0]]) && (o[s[0]] = s.length), !0 === ul.hasOwnProperty(i) && ul[i](t, a, n, r), a[t] = a[t] || i
			})), delete a[""], delete a.null, delete a[" "], {
				lex: a,
				_multi: o
			}
		},
		hl = function(e) {
			const t = /[,:;]/;
			let n = [];
			return e.forEach((e => {
				let r = 0;
				e.forEach(((a, o) => {
					t.test(a.post) && function(e, t) {
						const n = /^[0-9]+$/;
						let r = e[t];
						if (!r) return !1;
						const a = new Set(["may", "april", "august", "jan"]);
						if ("like" === r.normal || a.has(r.normal)) return !1;
						if (r.tags.has("Place") || r.tags.has("Date")) return !1;
						if (e[t - 1]) {
							let n = e[t - 1];
							if (n.tags.has("Date") || a.has(n.normal)) return !1;
							if (n.tags.has("Adjective") || r.tags.has("Adjective")) return !1
						}
						let o = r.normal;
						return 1 !== o.length && 2 !== o.length && 4 !== o.length || !n.test(o)
					}(e, o + 1) && (n.push(e.slice(r, o + 1)), r = o + 1)
				})), r < e.length && n.push(e.slice(r, e.length))
			})), n
		};
	const dl = {
			e: ["mice", "louse", "antennae", "formulae", "nebulae", "vertebrae", "vitae"],
			i: ["tia", "octopi", "viri", "radii", "nuclei", "fungi", "cacti", "stimuli"],
			n: ["men"],
			t: ["feet"]
		},
		gl = new Set(["israelis", "menus", "logos"]),
		ml = ["bus", "mas", "was", "ias", "xas", "vas", "cis", "lis", "nis", "ois", "ris", "sis", "tis", "xis", "aus", "cus", "eus", "fus", "gus", "ius", "lus", "nus", "das", "ous", "pus", "rus", "sus", "tus", "xus", "aos", "igos", "ados", "ogos", "'s", "ss"];
	var pl = function(e) {
			if (!e || e.length <= 3) return !1;
			if (gl.has(e)) return !0;
			let t = e[e.length - 1];
			return dl.hasOwnProperty(t) ? dl[t].find((t => e.endsWith(t))) : "s" === t && !ml.find((t => e.endsWith(t)))
		},
		fl = {
			two: {
				quickSplit: hl,
				expandLexicon: cl,
				transform: ll,
				looksPlural: pl
			}
		},
		vl = function(e) {
			const {
				irregularPlurals: t
			} = e.two, {
				lexicon: n
			} = e.one;
			return Object.entries(t).forEach((e => {
				n[e[0]] = n[e[0]] || "Singular", n[e[1]] = n[e[1]] || "Plural"
			})), e
		};
	let bl = {
		one: {
			lexicon: {}
		},
		two: {
			models: zs
		}
	};
	const yl = {
			"Actor|Verb": "Actor",
			"Adj|Gerund": "Adjective",
			"Adj|Noun": "Adjective",
			"Adj|Past": "Adjective",
			"Adj|Present": "Adjective",
			"Noun|Verb": "Singular",
			"Noun|Gerund": "Gerund",
			"Person|Noun": "Noun",
			"Person|Date": "Month",
			"Person|Verb": "FirstName",
			"Person|Place": "Person",
			"Person|Adj": "Comparative",
			"Plural|Verb": "Plural",
			"Unit|Noun": "Noun"
		},
		wl = function(e, t) {
			const n = {
				model: t,
				methods: fl
			};
			let {
				lex: r,
				_multi: a
			} = fl.two.expandLexicon(e, n);
			return Object.assign(t.one.lexicon, r), Object.assign(t.one._multiCache, a), t
		},
		kl = function(e, t, n) {
			let r = Rs(e, bl);
			t[r.PastTense] = t[r.PastTense] || "PastTense", t[r.Gerund] = t[r.Gerund] || "Gerund", !0 === n && (t[r.PresentTense] = t[r.PresentTense] || "PresentTense")
		},
		Pl = function(e, t, n) {
			let r = _s(e, n);
			t[r] = t[r] || "Superlative";
			let a = Zs(e, n);
			t[a] = t[a] || "Comparative"
		},
		Al = function(e, t) {
			let n = {};
			const r = t.one.lexicon;
			return Object.keys(e).forEach((a => {
				const o = e[a];
				if (n[a] = yl[o], "Noun|Verb" !== o && "Person|Verb" !== o && "Actor|Verb" !== o || kl(a, r, !1), "Adj|Present" === o && (kl(a, r, !0), Pl(a, r, t)), "Person|Adj" === o && Pl(a, r, t), "Adj|Gerund" === o || "Noun|Gerund" === o) {
					let e = Us(a, bl, "Gerund");
					r[e] || (n[e] = "Infinitive")
				}
				if ("Noun|Gerund" !== o && "Adj|Noun" !== o && "Person|Noun" !== o || function(e, t, n) {
						let r = Wo(e, n);
						t[r] = t[r] || "Plural"
					}(a, r, t), "Adj|Past" === o) {
					let e = Us(a, bl, "PastTense");
					r[e] || (n[e] = "Infinitive")
				}
			})), t = wl(n, t)
		};
	var Cl = function(e) {
		return e = function(e, t) {
			return Object.keys(e).forEach((n => {
				"Uncountable" === e[n] && (t.two.uncountable[n] = !0, e[n] = "Uncountable")
			})), t
		}((e = wl(e.one.lexicon, e)).one.lexicon, e), e = Al(e.two.switches, e), e = vl(e)
	};
	let jl = {
		one: {
			_multiCache: {},
			lexicon: Uo,
			frozenLex: {
				"20th century fox": "Organization",
				"7 eleven": "Organization",
				"motel 6": "Organization",
				"excuse me": "Expression",
				"financial times": "Organization",
				"guns n roses": "Organization",
				"la z boy": "Organization",
				"labour party": "Organization",
				"new kids on the block": "Organization",
				"new york times": "Organization",
				"the guess who": "Organization",
				"thin lizzy": "Organization",
				"prime minister": "Actor",
				"free market": "Singular",
				"lay up": "Singular",
				"living room": "Singular",
				"living rooms": "Plural",
				"spin off": "Singular",
				"appeal court": "Uncountable",
				"cold war": "Uncountable",
				"gene pool": "Uncountable",
				"machine learning": "Uncountable",
				"nail polish": "Uncountable",
				"time off": "Uncountable",
				"take part": "Infinitive",
				"bill gates": "Person",
				"doctor who": "Person",
				"dr who": "Person",
				"he man": "Person",
				"iron man": "Person",
				"kid cudi": "Person",
				"run dmc": "Person",
				"rush limbaugh": "Person",
				"snow white": "Person",
				"tiger woods": "Person",
				"brand new": "Adjective",
				"en route": "Adjective",
				"left wing": "Adjective",
				"off guard": "Adjective",
				"on board": "Adjective",
				"part time": "Adjective",
				"right wing": "Adjective",
				"so called": "Adjective",
				"spot on": "Adjective",
				"straight forward": "Adjective",
				"super duper": "Adjective",
				"tip top": "Adjective",
				"top notch": "Adjective",
				"up to date": "Adjective",
				"win win": "Adjective",
				"brooklyn nets": "SportsTeam",
				"chicago bears": "SportsTeam",
				"houston astros": "SportsTeam",
				"houston dynamo": "SportsTeam",
				"houston rockets": "SportsTeam",
				"houston texans": "SportsTeam",
				"minnesota twins": "SportsTeam",
				"orlando magic": "SportsTeam",
				"san antonio spurs": "SportsTeam",
				"san diego chargers": "SportsTeam",
				"san diego padres": "SportsTeam",
				"iron maiden": "ProperNoun",
				"isle of man": "Country",
				"united states": "Country",
				"united states of america": "Country",
				"prince edward island": "Region",
				"cedar breaks": "Place",
				"cedar falls": "Place",
				"point blank": "Adverb",
				"tiny bit": "Adverb",
				"by the time": "Conjunction",
				"no matter": "Conjunction",
				"civil wars": "Plural",
				"credit cards": "Plural",
				"default rates": "Plural",
				"free markets": "Plural",
				"head starts": "Plural",
				"home runs": "Plural",
				"lay ups": "Plural",
				"phone calls": "Plural",
				"press releases": "Plural",
				"record labels": "Plural",
				"soft serves": "Plural",
				"student loans": "Plural",
				"tax returns": "Plural",
				"tv shows": "Plural",
				"video games": "Plural",
				"took part": "PastTense",
				"takes part": "PresentTense",
				"taking part": "Gerund",
				"taken part": "Participle",
				"light bulb": "Noun",
				"rush hour": "Noun",
				"fluid ounce": "Unit",
				"the rolling stones": "Organization"
			}
		},
		two: {
			irregularPlurals: Go,
			models: zs,
			suffixPatterns: Qi,
			prefixPatterns: Yi,
			endsWith: hs,
			neighbours: ms,
			regexNormal: [
				[/^[\w.]+@[\w.]+\.[a-z]{2,3}$/, "Email"],
				[/^(https?:\/\/|www\.)+\w+\.[a-z]{2,3}/, "Url", "http.."],
				[/^[a-z0-9./].+\.(com|net|gov|org|ly|edu|info|biz|dev|ru|jp|de|in|uk|br|io|ai)/, "Url", ".com"],
				[/^[PMCE]ST$/, "Timezone", "EST"],
				[/^ma?c'[a-z]{3}/, "LastName", "mc'neil"],
				[/^o'[a-z]{3}/, "LastName", "o'connor"],
				[/^ma?cd[aeiou][a-z]{3}/, "LastName", "mcdonald"],
				[/^(lol)+[sz]$/, "Expression", "lol"],
				[/^wo{2,}a*h?$/, "Expression", "wooah"],
				[/^(hee?){2,}h?$/, "Expression", "hehe"],
				[/^(un|de|re)\\-[a-z\u00C0-\u00FF]{2}/, "Verb", "un-vite"],
				[/^(m|k|cm|km)\/(s|h|hr)$/, "Unit", "5 k/m"],
				[/^(ug|ng|mg)\/(l|m3|ft3)$/, "Unit", "ug/L"]
			],
			regexText: [
				[/^#[\p{Number}_]*\p{Letter}/u, "HashTag"],
				[/^@\w{2,}$/, "AtMention"],
				[/^([A-Z]\.){2}[A-Z]?/i, ["Acronym", "Noun"], "F.B.I"],
				[/.{3}[lkmnp]in['‘’‛‵′`´]$/, "Gerund", "chillin'"],
				[/.{4}s['‘’‛‵′`´]$/, "Possessive", "flanders'"],
				[/^[\p{Emoji_Presentation}\p{Extended_Pictographic}]/u, "Emoji", "emoji-class"]
			],
			regexNumbers: [
				[/^@1?[0-9](am|pm)$/i, "Time", "3pm"],
				[/^@1?[0-9]:[0-9]{2}(am|pm)?$/i, "Time", "3:30pm"],
				[/^'[0-9]{2}$/, "Year"],
				[/^[012]?[0-9](:[0-5][0-9])(:[0-5][0-9])$/, "Time", "3:12:31"],
				[/^[012]?[0-9](:[0-5][0-9])?(:[0-5][0-9])? ?(am|pm)$/i, "Time", "1:12pm"],
				[/^[012]?[0-9](:[0-5][0-9])(:[0-5][0-9])? ?(am|pm)?$/i, "Time", "1:12:31pm"],
				[/^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}/i, "Date", "iso-date"],
				[/^[0-9]{1,4}-[0-9]{1,2}-[0-9]{1,4}$/, "Date", "iso-dash"],
				[/^[0-9]{1,4}\/[0-9]{1,2}\/([0-9]{4}|[0-9]{2})$/, "Date", "iso-slash"],
				[/^[0-9]{1,4}\.[0-9]{1,2}\.[0-9]{1,4}$/, "Date", "iso-dot"],
				[/^[0-9]{1,4}-[a-z]{2,9}-[0-9]{1,4}$/i, "Date", "12-dec-2019"],
				[/^utc ?[+-]?[0-9]+$/, "Timezone", "utc-9"],
				[/^(gmt|utc)[+-][0-9]{1,2}$/i, "Timezone", "gmt-3"],
				[/^[0-9]{3}-[0-9]{4}$/, "PhoneNumber", "421-0029"],
				[/^(\+?[0-9][ -])?[0-9]{3}[ -]?[0-9]{3}-[0-9]{4}$/, "PhoneNumber", "1-800-"],
				[/^[-+]?\p{Currency_Symbol}[-+]?[0-9]+(,[0-9]{3})*(\.[0-9]+)?([kmb]|bn)?\+?$/u, ["Money", "Value"], "$5.30"],
				[/^[-+]?[0-9]+(,[0-9]{3})*(\.[0-9]+)?\p{Currency_Symbol}\+?$/u, ["Money", "Value"], "5.30£"],
				[/^[-+]?[$£]?[0-9]([0-9,.])+(usd|eur|jpy|gbp|cad|aud|chf|cny|hkd|nzd|kr|rub)$/i, ["Money", "Value"], "$400usd"],
				[/^[-+]?[0-9]+(,[0-9]{3})*(\.[0-9]+)?\+?$/, ["Cardinal", "NumericValue"], "5,999"],
				[/^[-+]?[0-9]+(,[0-9]{3})*(\.[0-9]+)?(st|nd|rd|r?th)$/, ["Ordinal", "NumericValue"], "53rd"],
				[/^\.[0-9]+\+?$/, ["Cardinal", "NumericValue"], ".73th"],
				[/^[-+]?[0-9]+(,[0-9]{3})*(\.[0-9]+)?%\+?$/, ["Percent", "Cardinal", "NumericValue"], "-4%"],
				[/^\.[0-9]+%$/, ["Percent", "Cardinal", "NumericValue"], ".3%"],
				[/^[0-9]{1,4}\/[0-9]{1,4}(st|nd|rd|th)?s?$/, ["Fraction", "NumericValue"], "2/3rds"],
				[/^[0-9.]{1,3}[a-z]{0,2}[-–—][0-9]{1,3}[a-z]{0,2}$/, ["Value", "NumberRange"], "3-4"],
				[/^[0-9]{1,2}(:[0-9][0-9])?(am|pm)? ?[-–—] ?[0-9]{1,2}(:[0-9][0-9])?(am|pm)$/, ["Time", "NumberRange"], "3-4pm"],
				[/^[0-9.]+([a-z°]{1,4})$/, "NumericValue", "9km"]
			],
			switches: Ro,
			clues: Oi,
			uncountable: {},
			orgWords: Bs,
			placeWords: $s
		}
	};
	jl = Cl(jl);
	var Nl = jl,
		xl = function(e, t, n, r) {
			const a = r.methods.one.setTag;
			if (0 === t && e.length >= 3) {
				const t = /:/;
				if (e[0].post.match(t)) {
					let t = e[1];
					if (t.tags.has("Value") || t.tags.has("Email") || t.tags.has("PhoneNumber")) return;
					a([e[0]], "Expression", r, null, "2-punct-colon''")
				}
			}
		},
		Il = function(e, t, n, r) {
			const a = r.methods.one.setTag;
			"-" === e[t].post && e[t + 1] && a([e[t], e[t + 1]], "Hyphenated", r, null, "1-punct-hyphen''")
		};
	const Tl = /^(under|over|mis|re|un|dis|semi)-?/;
	var Dl = function(e, t, n) {
			const r = n.two.switches;
			let a = e[t];
			if (r.hasOwnProperty(a.normal)) a.switch = r[a.normal];
			else if (Tl.test(a.normal)) {
				let e = a.normal.replace(Tl, "");
				e.length > 3 && r.hasOwnProperty(e) && (a.switch = r[e])
			}
		},
		Hl = function(e, t, n) {
			if (!t || 0 === t.length) return;
			if (!0 === e.frozen) return;
			const r = "undefined" != typeof process && process.env ? process.env : self.env || {};
			r && r.DEBUG_TAGS && ((e, t, n = "") => {
				let r = e.text || "[" + e.implicit + "]";
				var a;
				"string" != typeof t && t.length > 2 && (t = t.slice(0, 2).join(", #") + " +"), t = "string" != typeof t ? t.join(", #") : t, console.log(` ${(a=r,"[33m[3m"+a+"[0m").padEnd(24)} [32m→[0m #${t.padEnd(22)}  ${(e=>"[3m"+e+"[0m")(n)}`)
			})(e, t, n), e.tags = e.tags || new Set, "string" == typeof t ? e.tags.add(t) : t.forEach((t => e.tags.add(t)))
		};
	const Gl = ["Acronym", "Abbreviation", "ProperNoun", "Uncountable", "Possessive", "Pronoun", "Activity", "Honorific", "Month"];
	var El = function(e, t, n) {
		let r = e[t],
			a = Array.from(r.tags);
		for (let e = 0; e < a.length; e += 1)
			if (n.one.tagSet[a[e]]) {
				let t = n.one.tagSet[a[e]].parents;
				Hl(r, t, ` -inferred by #${a[e]}`)
			}!
		function(e) {
			!e.tags.has("Noun") || e.tags.has("Plural") || e.tags.has("Singular") || Gl.find((t => e.tags.has(t))) || (pl(e.normal) ? Hl(e, "Plural", "3-plural-guess") : Hl(e, "Singular", "3-singular-guess"))
		}(r),
		function(e) {
			let t = e.tags;
			if (t.has("Verb") && 1 === t.size) {
				let t = Ws(e.normal);
				t && Hl(e, t, "3-verb-tense-guess")
			}
		}(r)
	};
	const Ol = /^\p{Lu}[\p{Ll}'’]/u,
		Fl = /[0-9]/,
		Vl = ["Date", "Month", "WeekDay", "Unit", "Expression"],
		zl = /[IVX]/,
		Bl = /^[IVXLCDM]{2,}$/,
		$l = /^M{0,4}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/,
		Sl = {
			li: !0,
			dc: !0,
			md: !0,
			dm: !0,
			ml: !0
		};
	var Kl = function(e, t, n) {
		let r = e[t];
		r.index = r.index || [0, 0];
		let a = r.index[1],
			o = r.text || "";
		return 0 !== a && !0 === Ol.test(o) && !1 === Fl.test(o) ? Vl.find((e => r.tags.has(e))) || r.pre.match(/["']$/) || "the" === r.normal ? null : (El(e, t, n), r.tags.has("Noun") || r.frozen || r.tags.clear(), Hl(r, "ProperNoun", "2-titlecase"), !0) : o.length >= 2 && Bl.test(o) && zl.test(o) && $l.test(o) && !Sl[r.normal] ? (Hl(r, "RomanNumeral", "2-xvii"), !0) : null
	};
	const Ml = function(e = "", t = []) {
		const n = e.length;
		let r = 7;
		n <= r && (r = n - 1);
		for (let a = r; a > 1; a -= 1) {
			let r = e.substring(n - a, n);
			if (!0 === t[r.length].hasOwnProperty(r)) return t[r.length][r]
		}
		return null
	};
	var Ll = function(e, t, n) {
		let r = e[t];
		if (0 === r.tags.size) {
			let e = Ml(r.normal, n.two.suffixPatterns);
			if (null !== e) return Hl(r, e, "2-suffix"), r.confidence = .7, !0;
			if (r.implicit && (e = Ml(r.implicit, n.two.suffixPatterns), null !== e)) return Hl(r, e, "2-implicit-suffix"), r.confidence = .7, !0
		}
		return null
	};
	const Jl = /['‘’‛‵′`´]/,
		Wl = function(e, t) {
			for (let n = 0; n < t.length; n += 1)
				if (!0 === t[n][0].test(e)) return t[n];
			return null
		};
	var ql = function(e, t, n, r) {
			const a = r.methods.one.setTag;
			let {
				regexText: o,
				regexNormal: i,
				regexNumbers: s,
				endsWith: l
			} = n.two, u = e[t], c = u.machine || u.normal, h = u.text;
			Jl.test(u.post) && !Jl.test(u.pre) && (h += u.post.trim());
			let d = Wl(h, o) || Wl(c, i);
			return !d && /[0-9]/.test(c) && (d = Wl(c, s)), d || 0 !== u.tags.size || (d = function(e = "", t) {
				let n = e[e.length - 1];
				if (!0 === t.hasOwnProperty(n)) {
					let r = t[n] || [];
					for (let t = 0; t < r.length; t += 1)
						if (!0 === r[t][0].test(e)) return r[t]
				}
				return null
			}(c, l)), d ? (a([u], d[1], r, null, `2-regex-'${d[2]||d[0]}'`), u.confidence = .6, !0) : null
		},
		Ul = function(e, t, n) {
			let r = e[t];
			if (0 === r.tags.size) {
				let e = function(e = "", t = []) {
					const n = e.length;
					let r = 7;
					r > n - 3 && (r = n - 3);
					for (let n = r; n > 2; n -= 1) {
						let r = e.substring(0, n);
						if (!0 === t[r.length].hasOwnProperty(r)) return t[r.length][r]
					}
					return null
				}(r.normal, n.two.prefixPatterns);
				if (null !== e) return Hl(r, e, "2-prefix"), r.confidence = .5, !0
			}
			return null
		};
	const Rl = new Set(["in", "on", "by", "until", "for", "to", "during", "throughout", "through", "within", "before", "after", "of", "this", "next", "last", "circa", "around", "post", "pre", "budget", "classic", "plan", "may"]),
		Ql = function(e) {
			if (!e) return !1;
			let t = e.normal || e.implicit;
			return !!Rl.has(t) || !!(e.tags.has("Date") || e.tags.has("Month") || e.tags.has("WeekDay") || e.tags.has("Year")) || !!e.tags.has("ProperNoun")
		},
		_l = function(e) {
			return !(!e || !e.tags.has("Ordinal") && !(e.tags.has("Cardinal") && e.normal.length < 3) && "is" !== e.normal && "was" !== e.normal)
		},
		Zl = function(e) {
			return e && (e.tags.has("Date") || e.tags.has("Month") || e.tags.has("WeekDay") || e.tags.has("Year"))
		};
	var Xl = function(e, t) {
			const n = e[t];
			if (n.tags.has("NumericValue") && n.tags.has("Cardinal") && 4 === n.normal.length) {
				let r = Number(n.normal);
				if (r && !isNaN(r) && r > 1400 && r < 2100) {
					let a = e[t - 1],
						o = e[t + 1];
					if (Ql(a) || Ql(o)) return Hl(n, "Year", "2-tagYear");
					if (r >= 1920 && r < 2025) {
						if (_l(a) || _l(o)) return Hl(n, "Year", "2-tagYear-close");
						if (Zl(e[t - 2]) || Zl(e[t + 2])) return Hl(n, "Year", "2-tagYear-far");
						if (a && (a.tags.has("Determiner") || a.tags.has("Possessive")) && o && o.tags.has("Noun") && !o.tags.has("Plural")) return Hl(n, "Year", "2-tagYear-noun")
					}
				}
			}
			return null
		},
		Yl = function(e, t, n, r) {
			const a = r.methods.one.setTag,
				o = e[t],
				i = ["PastTense", "PresentTense", "Auxiliary", "Modal", "Particle"];
			o.tags.has("Verb") && (i.find((e => o.tags.has(e))) || a([o], "Infinitive", r, null, "2-verb-type''"))
		};
	const eu = /^[A-Z]('s|,)?$/,
		tu = /^[A-Z-]+$/,
		nu = /^[A-Z]+s$/,
		ru = /([A-Z]\.)+[A-Z]?,?$/,
		au = /[A-Z]{2,}('s|,)?$/,
		ou = /([a-z]\.)+[a-z]\.?$/,
		iu = {
			I: !0,
			A: !0
		},
		su = {
			la: !0,
			ny: !0,
			us: !0,
			dc: !0,
			gb: !0
		};
	var lu = function(e, t, n) {
		let r = e[t];
		return r.tags.has("RomanNumeral") || r.tags.has("Acronym") || r.frozen ? null : function(e, t) {
			let n = e.text;
			if (!1 === tu.test(n)) {
				if (!(n.length > 3 && !0 === nu.test(n))) return !1;
				n = n.replace(/s$/, "")
			}
			return !(n.length > 5 || iu.hasOwnProperty(n) || t.one.lexicon.hasOwnProperty(e.normal) || !0 !== ru.test(n) && !0 !== ou.test(n) && !0 !== eu.test(n) && !0 !== au.test(n))
		}(r, n) ? (r.tags.clear(), Hl(r, ["Acronym", "Noun"], "3-no-period-acronym"), !0 === su[r.normal] && Hl(r, "Place", "3-place-acronym"), !0 === nu.test(r.text) && Hl(r, "Plural", "3-plural-acronym"), !0) : !iu.hasOwnProperty(r.text) && eu.test(r.text) ? (r.tags.clear(), Hl(r, ["Acronym", "Noun"], "3-one-letter-acronym"), !0) : r.tags.has("Organization") && r.text.length <= 3 ? (Hl(r, "Acronym", "3-org-acronym"), !0) : r.tags.has("Organization") && tu.test(r.text) && r.text.length <= 6 ? (Hl(r, "Acronym", "3-titlecase-acronym"), !0) : null
	};
	const uu = function(e, t) {
			if (!e) return null;
			let n = t.find((t => e.normal === t[0]));
			return n ? n[1] : null
		},
		cu = function(e, t) {
			if (!e) return null;
			let n = t.find((t => e.tags.has(t[0])));
			return n ? n[1] : null
		};
	var hu = function(e, t, n) {
		const {
			leftTags: r,
			leftWords: a,
			rightWords: o,
			rightTags: i
		} = n.two.neighbours;
		let s = e[t];
		if (0 === s.tags.size) {
			let l = null;
			if (l = l || uu(e[t - 1], a), l = l || uu(e[t + 1], o), l = l || cu(e[t - 1], r), l = l || cu(e[t + 1], i), l) return Hl(s, l, "3-[neighbour]"), El(e, t, n), e[t].confidence = .2, !0
		}
		return null
	};
	const du = function(e, t, n) {
		return !!e && !e.tags.has("FirstName") && !e.tags.has("Place") && (!!(e.tags.has("ProperNoun") || e.tags.has("Organization") || e.tags.has("Acronym")) || !(n || (r = e.text, !/^\p{Lu}[\p{Ll}'’]/u.test(r))) && (0 !== t || e.tags.has("Singular")));
		var r
	};
	var gu = function(e, t, n, r) {
		const a = n.model.two.orgWords,
			o = n.methods.one.setTag;
		let i = e[t];
		if (!0 === a[i.machine || i.normal] && du(e[t - 1], t - 1, r)) {
			o([e[t]], "Organization", n, null, "3-[org-word]");
			for (let a = t; a >= 0 && du(e[a], a, r); a -= 1) o([e[a]], "Organization", n, null, "3-[org-word]")
		}
		return null
	};
	const mu = /'s$/,
		pu = new Set(["athletic", "city", "community", "eastern", "federal", "financial", "great", "historic", "historical", "local", "memorial", "municipal", "national", "northern", "provincial", "southern", "state", "western"]),
		fu = new Set(["center", "centre", "way", "range", "bar", "bridge", "field", "pit"]),
		vu = function(e, t, n) {
			if (!e) return !1;
			let r = e.tags;
			return !(r.has("Organization") || r.has("Possessive") || mu.test(e.normal)) && (!(!r.has("ProperNoun") && !r.has("Place")) || !(n || (a = e.text, !/^\p{Lu}[\p{Ll}'’]/u.test(a))) && (0 !== t || r.has("Singular")));
			var a
		};
	var bu = function(e, t, n, r) {
			const a = n.model.two.placeWords,
				o = n.methods.one.setTag;
			let i = e[t],
				s = i.machine || i.normal;
			if (!0 === a[s]) {
				for (let a = t - 1; a >= 0; a -= 1)
					if (!pu.has(e[a].normal)) {
						if (!vu(e[a], a, r)) break;
						o(e.slice(a, t + 1), "Place", n, null, "3-[place-of-foo]")
					} if (fu.has(s)) return !1;
				for (let a = t + 1; a < e.length; a += 1) {
					if (vu(e[a], a, r)) return o(e.slice(t, a + 1), "Place", n, null, "3-[foo-place]"), !0;
					if ("of" !== e[a].normal && !pu.has(e[a].normal)) break
				}
			}
			return null
		},
		yu = function(e, t, n) {
			let r = !1,
				a = e[t].tags;
			(0 === a.size || 1 === a.size && (a.has("Hyphenated") || a.has("HashTag") || a.has("Prefix"))) && (r = !0), r && (Hl(e[t], "Noun", "3-[fallback]"), El(e, t, n), e[t].confidence = .1)
		};
	const wu = /^[A-Z][a-z]/,
		ku = (e, t) => e[t].tags.has("ProperNoun") && wu.test(e[t].text) ? "Noun" : null,
		Pu = (e, t, n) => 0 !== t || e[1] ? null : n,
		Au = {
			"Adj|Gerund": (e, t) => ku(e, t),
			"Adj|Noun": (e, t) => ku(e, t) || function(e, t) {
				return !e[t + 1] && e[t - 1] && e[t - 1].tags.has("Determiner") ? "Noun" : null
			}(e, t),
			"Actor|Verb": (e, t) => ku(e, t),
			"Adj|Past": (e, t) => ku(e, t),
			"Adj|Present": (e, t) => ku(e, t),
			"Noun|Gerund": (e, t) => ku(e, t),
			"Noun|Verb": (e, t) => t > 0 && ku(e, t) || Pu(e, t, "Infinitive"),
			"Plural|Verb": (e, t) => ku(e, t) || Pu(e, t, "PresentTense") || function(e, t, n) {
				return 0 === t && e.length > 3 ? n : null
			}(e, t, "Plural"),
			"Person|Noun": (e, t) => ku(e, t),
			"Person|Verb": (e, t) => 0 !== t ? ku(e, t) : null,
			"Person|Adj": (e, t) => 0 === t && e.length > 1 || ku(e, t) ? "Person" : null
		};
	var Cu = Au;
	const ju = "undefined" != typeof process && process.env ? process.env : self.env || {},
		Nu = /^(under|over|mis|re|un|dis|semi)-?/,
		xu = (e, t) => {
			if (!e || !t) return null;
			let n = e.normal || e.implicit,
				r = null;
			return t.hasOwnProperty(n) && (r = t[n]), r && ju.DEBUG_TAGS && console.log(`\n  [2m[3m     ↓ - '${n}' [0m`), r
		},
		Iu = (e, t = {}, n) => {
			if (!e || !t) return null;
			let r = Array.from(e.tags).sort(((e, t) => (n[e] ? n[e].parents.length : 0) > (n[t] ? n[t].parents.length : 0) ? -1 : 1)),
				a = r.find((e => t[e]));
			return a && ju.DEBUG_TAGS && console.log(`  [2m[3m      ↓ - '${e.normal||e.implicit}' (#${a})  [0m`), a = t[a], a
		};
	var Tu = function(e, t, n) {
		const r = n.model,
			a = n.methods.one.setTag,
			{
				switches: o,
				clues: i
			} = r.two,
			s = e[t];
		let l = s.normal || s.implicit || "";
		if (Nu.test(l) && !o[l] && (l = l.replace(Nu, "")), s.switch) {
			let o = s.switch;
			if (s.tags.has("Acronym") || s.tags.has("PhrasalVerb")) return;
			let u = function(e, t, n, r) {
				if (!n) return null;
				const a = "also" !== e[t - 1]?.text ? t - 1 : Math.max(0, t - 2),
					o = r.one.tagSet;
				let i = xu(e[t + 1], n.afterWords);
				return i = i || xu(e[a], n.beforeWords), i = i || Iu(e[a], n.beforeTags, o), i = i || Iu(e[t + 1], n.afterTags, o), i
			}(e, t, i[o], r);
			Cu[o] && (u = Cu[o](e, t) || u), u ? (a([s], u, n, null, `3-[switch] (${o})`), El(e, t, r)) : ju.DEBUG_TAGS && console.log(`\n -> X  - '${l}'  : (${o})  `)
		}
	};
	const Du = {
		there: !0,
		this: !0,
		it: !0,
		him: !0,
		her: !0,
		us: !0
	};
	var Hu = function(e, t) {
		const n = t.methods.one.setTag,
			r = t.model.one._multiCache || {};
		let a = e[0];
		if (("Noun|Verb" === a.switch || a.tags.has("Infinitive")) && e.length >= 2) {
			if (e.length < 4 && !Du[e[1].normal]) return;
			if (!a.tags.has("PhrasalVerb") && r.hasOwnProperty(a.normal)) return;
			(e[1].tags.has("Noun") || e[1].tags.has("Determiner")) && (e.slice(1, 3).some((e => e.tags.has("Verb"))) && !a.tags.has("#PhrasalVerb") || n([a], "Imperative", t, null, "3-[imperative]"))
		}
	};
	const Gu = function(e) {
			if (e.filter((e => !e.tags.has("ProperNoun"))).length <= 3) return !1;
			const t = /^[a-z]/;
			return e.every((e => !t.test(e.text)))
		},
		Eu = function(e, t, n, r) {
			for (let a = 0; a < e.length; a += 1) !0 !== e[a].frozen && (Dl(e, a, t), !1 === r && Kl(e, a, t), Ll(e, a, t), ql(e, a, t, n), Ul(e, a, t), Xl(e, a))
		},
		Ou = function(e, t, n, r) {
			for (let n = 0; n < e.length; n += 1) {
				let r = lu(e, n, t);
				El(e, n, t), r = r || hu(e, n, t), r = r || yu(e, n, t)
			}
			for (let a = 0; a < e.length; a += 1) !0 !== e[a].frozen && (gu(e, a, n, r), bu(e, a, n, r), Tu(e, a, n), Yl(e, a, t, n), Il(e, a, t, n));
			Hu(e, n)
		};
	var Fu = function(e) {
		const {
			methods: t,
			model: n,
			world: r
		} = e;
		let a = e.docs;
		! function(e, t, n) {
			e.forEach((e => {
				xl(e, 0, t, n)
			}))
		}(a, n, r);
		let o = t.two.quickSplit(a);
		for (let e = 0; e < o.length; e += 1) {
			let t = o[e];
			const a = Gu(t);
			Eu(t, n, r, a), Ou(t, n, r, a)
		}
		return o
	};
	const Vu = {
		Possessive: e => {
			let t = e.machine || e.normal || e.text;
			return t = t.replace(/'s$/, ""), t
		},
		Plural: (e, t) => {
			let n = e.machine || e.normal || e.text;
			return t.methods.two.transform.noun.toSingular(n, t.model)
		},
		Copula: () => "is",
		PastTense: (e, t) => {
			let n = e.machine || e.normal || e.text;
			return t.methods.two.transform.verb.toInfinitive(n, t.model, "PastTense")
		},
		Gerund: (e, t) => {
			let n = e.machine || e.normal || e.text;
			return t.methods.two.transform.verb.toInfinitive(n, t.model, "Gerund")
		},
		PresentTense: (e, t) => {
			let n = e.machine || e.normal || e.text;
			return e.tags.has("Infinitive") ? n : t.methods.two.transform.verb.toInfinitive(n, t.model, "PresentTense")
		},
		Comparative: (e, t) => {
			let n = e.machine || e.normal || e.text;
			return t.methods.two.transform.adjective.fromComparative(n, t.model)
		},
		Superlative: (e, t) => {
			let n = e.machine || e.normal || e.text;
			return t.methods.two.transform.adjective.fromSuperlative(n, t.model)
		},
		Adverb: (e, t) => {
			const {
				fromAdverb: n
			} = t.methods.two.transform.adjective;
			return n(e.machine || e.normal || e.text)
		}
	};
	var zu = function(e) {
		const t = e.world,
			n = Object.keys(Vu);
		e.docs.forEach((e => {
			for (let r = 0; r < e.length; r += 1) {
				const a = e[r];
				for (let e = 0; e < n.length; e += 1)
					if (a.tags.has(n[e])) {
						let r = (0, Vu[n[e]])(a, t);
						a.normal !== r && (a.root = r);
						break
					}
			}
		}))
	};
	const Bu = {
		Adverb: "RB",
		Comparative: "JJR",
		Superlative: "JJS",
		Adjective: "JJ",
		TO: "Conjunction",
		Modal: "MD",
		Auxiliary: "MD",
		Gerund: "VBG",
		PastTense: "VBD",
		Participle: "VBN",
		PresentTense: "VBZ",
		Infinitive: "VB",
		Particle: "RP",
		Verb: "VB",
		Pronoun: "PRP",
		Cardinal: "CD",
		Conjunction: "CC",
		Determiner: "DT",
		Preposition: "IN",
		QuestionWord: "WP",
		Expression: "UH",
		Possessive: "POS",
		ProperNoun: "NNP",
		Person: "NNP",
		Place: "NNP",
		Organization: "NNP",
		Singular: "NN",
		Plural: "NNS",
		Noun: "NN",
		There: "EX"
	};
	var $u = function(e) {
			e.compute("tagRank"), e.docs.forEach((e => {
				e.forEach((e => {
					e.penn = function(e) {
						if (e.tags.has("ProperNoun") && e.tags.has("Plural")) return "NNPS";
						if (e.tags.has("Possessive") && e.tags.has("Pronoun")) return "PRP$";
						if ("there" === e.normal) return "EX";
						if ("to" === e.normal) return "TO";
						let t = e.tagRank || [];
						for (let e = 0; e < t.length; e += 1)
							if (Bu.hasOwnProperty(t[e])) return Bu[t[e]];
						return null
					}(e)
				}))
			}))
		},
		Su = {
			preTagger: Fu,
			root: zu,
			penn: $u
		};
	const Ku = ["Person", "Place", "Organization"];
	var Mu = {
			Noun: {
				not: ["Verb", "Adjective", "Adverb", "Value", "Determiner"]
			},
			Singular: {
				is: "Noun",
				not: ["Plural", "Uncountable"]
			},
			ProperNoun: {
				is: "Noun"
			},
			Person: {
				is: "Singular",
				also: ["ProperNoun"],
				not: ["Place", "Organization", "Date"]
			},
			FirstName: {
				is: "Person"
			},
			MaleName: {
				is: "FirstName",
				not: ["FemaleName", "LastName"]
			},
			FemaleName: {
				is: "FirstName",
				not: ["MaleName", "LastName"]
			},
			LastName: {
				is: "Person",
				not: ["FirstName"]
			},
			Honorific: {
				is: "Person",
				not: ["FirstName", "LastName", "Value"]
			},
			Place: {
				is: "Singular",
				not: ["Person", "Organization"]
			},
			Country: {
				is: "Place",
				also: ["ProperNoun"],
				not: ["City"]
			},
			City: {
				is: "Place",
				also: ["ProperNoun"],
				not: ["Country"]
			},
			Region: {
				is: "Place",
				also: ["ProperNoun"]
			},
			Address: {},
			Organization: {
				is: "ProperNoun",
				not: ["Person", "Place"]
			},
			SportsTeam: {
				is: "Organization"
			},
			School: {
				is: "Organization"
			},
			Company: {
				is: "Organization"
			},
			Plural: {
				is: "Noun",
				not: ["Singular", "Uncountable"]
			},
			Uncountable: {
				is: "Noun"
			},
			Pronoun: {
				is: "Noun",
				not: Ku
			},
			Actor: {
				is: "Noun",
				not: ["Place", "Organization"]
			},
			Activity: {
				is: "Noun",
				not: ["Person", "Place"]
			},
			Unit: {
				is: "Noun",
				not: Ku
			},
			Demonym: {
				is: "Noun",
				also: ["ProperNoun"],
				not: Ku
			},
			Possessive: {
				is: "Noun"
			},
			Reflexive: {
				is: "Pronoun"
			}
		},
		Lu = {
			Adjective: {
				not: ["Noun", "Verb", "Adverb", "Value"]
			},
			Comparable: {
				is: "Adjective"
			},
			Comparative: {
				is: "Adjective"
			},
			Superlative: {
				is: "Adjective",
				not: ["Comparative"]
			},
			NumberRange: {},
			Adverb: {
				not: ["Noun", "Verb", "Adjective", "Value"]
			},
			Determiner: {
				not: ["Noun", "Verb", "Adjective", "Adverb", "QuestionWord", "Conjunction"]
			},
			Conjunction: {
				not: ["Noun", "Verb", "Adjective", "Adverb", "Value", "QuestionWord"]
			},
			Preposition: {
				not: ["Noun", "Verb", "Adjective", "Adverb", "QuestionWord", "Determiner"]
			},
			QuestionWord: {
				not: ["Determiner"]
			},
			Currency: {
				is: "Noun"
			},
			Expression: {
				not: ["Noun", "Adjective", "Verb", "Adverb"]
			},
			Abbreviation: {},
			Url: {
				not: ["HashTag", "PhoneNumber", "Verb", "Adjective", "Value", "AtMention", "Email"]
			},
			PhoneNumber: {
				not: ["HashTag", "Verb", "Adjective", "Value", "AtMention", "Email"]
			},
			HashTag: {},
			AtMention: {
				is: "Noun",
				not: ["HashTag", "Email"]
			},
			Emoji: {
				not: ["HashTag", "Verb", "Adjective", "Value", "AtMention"]
			},
			Emoticon: {
				not: ["HashTag", "Verb", "Adjective", "Value", "AtMention"]
			},
			Email: {
				not: ["HashTag", "Verb", "Adjective", "Value", "AtMention"]
			},
			Acronym: {
				not: ["Plural", "RomanNumeral", "Pronoun", "Date"]
			},
			Negative: {
				not: ["Noun", "Adjective", "Value", "Expression"]
			},
			Condition: {
				not: ["Verb", "Adjective", "Noun", "Value"]
			},
			There: {
				not: ["Verb", "Adjective", "Noun", "Value", "Conjunction", "Preposition"]
			},
			Prefix: {
				not: ["Abbreviation", "Acronym", "ProperNoun"]
			},
			Hyphenated: {}
		};
	let Ju = Object.assign({}, Mu, {
		Verb: {
			not: ["Noun", "Adjective", "Adverb", "Value", "Expression"]
		},
		PresentTense: {
			is: "Verb",
			not: ["PastTense", "FutureTense"]
		},
		Infinitive: {
			is: "PresentTense",
			not: ["Gerund"]
		},
		Imperative: {
			is: "Verb",
			not: ["PastTense", "Gerund", "Copula"]
		},
		Gerund: {
			is: "PresentTense",
			not: ["Copula"]
		},
		PastTense: {
			is: "Verb",
			not: ["PresentTense", "Gerund", "FutureTense"]
		},
		FutureTense: {
			is: "Verb",
			not: ["PresentTense", "PastTense"]
		},
		Copula: {
			is: "Verb"
		},
		Modal: {
			is: "Verb",
			not: ["Infinitive"]
		},
		Participle: {
			is: "PastTense"
		},
		Auxiliary: {
			is: "Verb",
			not: ["PastTense", "PresentTense", "Gerund", "Conjunction"]
		},
		PhrasalVerb: {
			is: "Verb"
		},
		Particle: {
			is: "PhrasalVerb",
			not: ["PastTense", "PresentTense", "Copula", "Gerund"]
		},
		Passive: {
			is: "Verb"
		}
	}, {
		Value: {
			not: ["Verb", "Adjective", "Adverb"]
		},
		Ordinal: {
			is: "Value",
			not: ["Cardinal"]
		},
		Cardinal: {
			is: "Value",
			not: ["Ordinal"]
		},
		Fraction: {
			is: "Value",
			not: ["Noun"]
		},
		Multiple: {
			is: "TextValue"
		},
		RomanNumeral: {
			is: "Cardinal",
			not: ["TextValue"]
		},
		TextValue: {
			is: "Value",
			not: ["NumericValue"]
		},
		NumericValue: {
			is: "Value",
			not: ["TextValue"]
		},
		Money: {
			is: "Cardinal"
		},
		Percent: {
			is: "Value"
		}
	}, {
		Date: {
			not: ["Verb", "Adverb", "Adjective"]
		},
		Month: {
			is: "Date",
			also: ["Noun"],
			not: ["Year", "WeekDay", "Time"]
		},
		WeekDay: {
			is: "Date",
			also: ["Noun"]
		},
		Year: {
			is: "Date",
			not: ["RomanNumeral"]
		},
		FinancialQuarter: {
			is: "Date",
			not: "Fraction"
		},
		Holiday: {
			is: "Date",
			also: ["Noun"]
		},
		Season: {
			is: "Date"
		},
		Timezone: {
			is: "Date",
			also: ["Noun"],
			not: ["ProperNoun"]
		},
		Time: {
			is: "Date",
			not: ["AtMention"]
		},
		Duration: {
			is: "Date",
			also: ["Noun"]
		}
	}, Lu);
	var Wu = {
		compute: Su,
		methods: fl,
		model: Nl,
		tags: Ju,
		hooks: ["preTagger"]
	};
	const qu = /[,)"';:\-–—.…]/,
		Uu = function(e, t) {
			if (!e.found) return;
			let n = e.termList();
			for (let e = 0; e < n.length - 1; e++) {
				const t = n[e];
				if (qu.test(t.post)) return
			}
			n[0].implicit = n[0].normal, n[0].text += t, n[0].normal += t, n.slice(1).forEach((e => {
				e.implicit = e.normal, e.text = "", e.normal = ""
			}));
			for (let e = 0; e < n.length - 1; e++) n[e].post = n[e].post.replace(/ /, "")
		};
	var Ru = function() {
		let e = this.not("@hasContraction"),
			t = e.match("(we|they|you) are");
		return Uu(t, "'re"), t = e.match("(he|she|they|it|we|you) will"), Uu(t, "'ll"), t = e.match("(he|she|they|it|we) is"), Uu(t, "'s"), t = e.match("#Person is"), Uu(t, "'s"), t = e.match("#Person would"), Uu(t, "'d"), t = e.match("(is|was|had|would|should|could|do|does|have|has|can) not"), Uu(t, "n't"), t = e.match("(i|we|they) have"), Uu(t, "'ve"), t = e.match("(would|should|could) have"), Uu(t, "'ve"), t = e.match("i am"), Uu(t, "'m"), t = e.match("going to"), this
	};
	const Qu = /^\p{Lu}[\p{Ll}'’]/u;
	var _u = function(e) {
			class Contractions extends e {
				constructor(e, t, n) {
					super(e, t, n), this.viewType = "Contraction"
				}
				expand() {
					return this.docs.forEach((e => {
						let t = Qu.test(e[0].text);
						e.forEach(((t, n) => {
							t.text = t.implicit || "", delete t.implicit, n < e.length - 1 && "" === t.post && (t.post += " "), t.dirty = !0
						})), t && (e[0].text = function(e = "") {
							return e.replace(/^ *[a-z\u00C0-\u00FF]/, (e => e.toUpperCase()))
						}(e[0].text))
					})), this.compute("normal"), this
				}
			}
			e.prototype.contractions = function() {
				let e = this.match("@hasContraction+");
				return new Contractions(this.document, e.pointer)
			}, e.prototype.contract = Ru
		},
		Zu = function(e, t, n) {
			let [r, a] = t;
			n && 0 !== n.length && (n = n.map(((e, t) => (e.implicit = e.text, e.machine = e.text, e.pre = "", e.post = "", e.text = "", e.normal = "", e.index = [r, a + t], e))), n[0] && (n[0].pre = e[r][a].pre, n[n.length - 1].post = e[r][a].post, n[0].text = e[r][a].text, n[0].normal = e[r][a].normal), e[r].splice(a, 1, ...n))
		};
	const Xu = /'/,
		Yu = new Set(["been", "become"]),
		ec = new Set(["what", "how", "when", "if", "too"]);
	let tc = new Set(["too", "also", "enough"]);
	var nc = function(e, t) {
		let n = e[t].normal.split(Xu)[0];
		if ("let" === n) return [n, "us"];
		if ("there" === n) {
			let r = e[t + 1];
			if (r && r.tags.has("Plural")) return [n, "are"]
		}
		return "has" === ((e, t) => {
			for (let n = t + 1; n < e.length; n += 1) {
				let t = e[n];
				if (Yu.has(t.normal)) return "has";
				if (ec.has(t.normal)) return "is";
				if (t.tags.has("Gerund")) return "is";
				if (t.tags.has("Determiner")) return "is";
				if (t.tags.has("Adjective")) return "is";
				if ("Adj|Past" === t.switch && e[n + 1]) {
					if (tc.has(e[n + 1].normal)) return "is";
					if (e[n + 1].tags.has("Preposition")) return "is"
				}
				if (t.tags.has("PastTense")) return e[n + 1] && "for" === e[n + 1].normal ? "is" : "has"
			}
			return "is"
		})(e, t) ? [n, "has"] : [n, "is"]
	};
	const rc = /'/,
		ac = new Set(["better", "done", "before", "it", "had"]),
		oc = new Set(["have", "be"]);
	var ic = function(e, t) {
			let n = e[t].normal.split(rc)[0];
			return "how" === n || "what" === n ? [n, "did"] : "had" === ((e, t) => {
				for (let n = t + 1; n < e.length; n += 1) {
					let t = e[n];
					if (ac.has(t.normal)) return "had";
					if (oc.has(t.normal)) return "would";
					if (t.tags.has("PastTense") || "Adj|Past" === t.switch) return "had";
					if (t.tags.has("PresentTense") || t.tags.has("Infinitive")) return "would";
					if (t.tags.has("#Determiner")) return "had";
					if (t.tags.has("Adjective")) return "would"
				}
				return !1
			})(e, t) ? [n, "had"] : [n, "would"]
		},
		sc = function(e, t) {
			if ("ain't" === e[t].normal || "aint" === e[t].normal) {
				if (e[t + 1] && "never" === e[t + 1].normal) return ["have"];
				let n = function(e, t) {
					for (let n = t - 1; n >= 0; n -= 1)
						if (e[n].tags.has("Noun") || e[n].tags.has("Pronoun") || e[n].tags.has("Plural") || e[n].tags.has("Singular")) return e[n];
					return null
				}(e, t);
				if (n) {
					if ("we" === n.normal || "they" === n.normal) return ["are", "not"];
					if ("i" === n.normal) return ["am", "not"];
					if (n.tags && n.tags.has("Plural")) return ["are", "not"]
				}
				return ["is", "not"]
			}
			return [e[t].normal.replace(/n't/, ""), "not"]
		};
	const lc = {
			that: !0,
			there: !0,
			let: !0,
			here: !0,
			everywhere: !0
		},
		uc = {
			in: !0,
			by: !0,
			for: !0
		};
	let cc = new Set(["too", "also", "enough", "about"]),
		hc = new Set(["is", "are", "did", "were", "could", "should", "must", "had", "have"]);
	var dc = (e, t) => {
		let n = e[t];
		if (lc.hasOwnProperty(n.machine || n.normal)) return !1;
		if (n.tags.has("Possessive")) return !0;
		if (n.tags.has("QuestionWord")) return !1;
		if ("he's" === n.normal || "she's" === n.normal) return !1;
		let r = e[t + 1];
		if (!r) return !0;
		if ("it's" === n.normal) return !!r.tags.has("#Noun");
		if ("Noun|Gerund" == r.switch) {
			let r = e[t + 2];
			return r ? !!r.tags.has("Copula") || ("on" === r.normal || r.normal, !1) : !(!n.tags.has("Actor") && !n.tags.has("ProperNoun"))
		}
		if (r.tags.has("Verb")) return !!r.tags.has("Infinitive") || !r.tags.has("Gerund") && !!r.tags.has("PresentTense");
		if ("Adj|Noun" === r.switch) {
			let n = e[t + 2];
			if (!n) return !1;
			if (hc.has(n.normal)) return !0;
			if (cc.has(n.normal)) return !1
		}
		if (r.tags.has("Noun")) {
			let e = r.machine || r.normal;
			return !("here" === e || "there" === e || "everywhere" === e || r.tags.has("Possessive") || r.tags.has("ProperNoun") && !n.tags.has("ProperNoun"))
		}
		if (e[t - 1] && !0 === uc[e[t - 1].normal]) return !0;
		if (r.tags.has("Adjective")) {
			let n = e[t + 2];
			if (!n) return !1;
			if (n.tags.has("Noun") && !n.tags.has("Pronoun")) {
				let e = r.normal;
				return "above" !== e && "below" !== e && "behind" !== e
			}
			return "Noun|Verb" === n.switch
		}
		return !!r.tags.has("Value")
	};
	const gc = /'/,
		mc = function(e, t, n, r) {
			let a = t.update();
			a.document = [e];
			let o = n + r;
			n > 0 && (n -= 1), e[o] && (o += 1), a.ptrs = [
					[0, n, o]
				], a.compute(["freeze", "lexicon", "preTagger", "unfreeze"]),
				function(e) {
					e.forEach(((e, t) => {
						e.index && (e.index[1] = t)
					}))
				}(e)
		},
		pc = {
			d: (e, t) => ic(e, t),
			t: (e, t) => sc(e, t),
			s: (e, t, n) => dc(e, t) ? n.methods.one.setTag([e[t]], "Possessive", n, null, "2-contraction") : nc(e, t)
		},
		fc = function(e, t) {
			let n = t.fromText(e.join(" "));
			return n.compute("id"), n.docs[0]
		};
	var vc = {
			contractionTwo: e => {
				let {
					world: t,
					document: n
				} = e;
				n.forEach(((r, a) => {
					for (let o = r.length - 1; o >= 0; o -= 1) {
						if (r[o].implicit) return;
						let i = null;
						!0 === gc.test(r[o].normal) && (i = r[o].normal.split(gc)[1]);
						let s = null;
						pc.hasOwnProperty(i) && (s = pc[i](r, o, t)), s && (s = fc(s, e), Zu(n, [a, o], s), mc(n[a], e, o, s.length))
					}
				}))
			}
		},
		bc = {
			compute: vc,
			api: _u,
			hooks: ["contractionTwo"]
		};
	const yc = "(hard|fast|late|early|high|right|deep|close|direct)",
		wc = "(i|we|they)";
	let kc = [].concat([{
			match: "(got|were|was|is|are|am) (#PastTense|#Participle)",
			tag: "Passive",
			reason: "got-walked"
		}, {
			match: "(was|were|is|are|am) being (#PastTense|#Participle)",
			tag: "Passive",
			reason: "was-being"
		}, {
			match: "(had|have|has) been (#PastTense|#Participle)",
			tag: "Passive",
			reason: "had-been"
		}, {
			match: "will be being? (#PastTense|#Participle)",
			tag: "Passive",
			reason: "will-be-cleaned"
		}, {
			match: "#Noun [(#PastTense|#Participle)] by (the|a) #Noun",
			group: 0,
			tag: "Passive",
			reason: "suffered-by"
		}], [{
			match: "[(all|both)] #Determiner #Noun",
			group: 0,
			tag: "Noun",
			reason: "all-noun"
		}, {
			match: "#Copula [(just|alone)]$",
			group: 0,
			tag: "Adjective",
			reason: "not-adverb"
		}, {
			match: "#Singular is #Adverb? [#PastTense$]",
			group: 0,
			tag: "Adjective",
			reason: "is-filled"
		}, {
			match: "[#PastTense] #Singular is",
			group: 0,
			tag: "Adjective",
			reason: "smoked-poutine"
		}, {
			match: "[#PastTense] #Plural are",
			group: 0,
			tag: "Adjective",
			reason: "baked-onions"
		}, {
			match: "well [#PastTense]",
			group: 0,
			tag: "Adjective",
			reason: "well-made"
		}, {
			match: "#Copula [fucked up?]",
			group: 0,
			tag: "Adjective",
			reason: "swears-adjective"
		}, {
			match: "#Singular (seems|appears) #Adverb? [#PastTense$]",
			group: 0,
			tag: "Adjective",
			reason: "seems-filled"
		}, {
			match: "#Copula #Adjective? [(out|in|through)]$",
			group: 0,
			tag: "Adjective",
			reason: "still-out"
		}, {
			match: "^[#Adjective] (the|your) #Noun",
			group: 0,
			notIf: "(all|even)",
			tag: "Infinitive",
			reason: "shut-the"
		}, {
			match: "the [said] #Noun",
			group: 0,
			tag: "Adjective",
			reason: "the-said-card"
		}, {
			match: "[#Hyphenated (#Hyphenated && #PastTense)] (#Noun|#Conjunction)",
			group: 0,
			tag: "Adjective",
			notIf: "#Adverb",
			reason: "faith-based"
		}, {
			match: "[#Hyphenated (#Hyphenated && #Gerund)] (#Noun|#Conjunction)",
			group: 0,
			tag: "Adjective",
			notIf: "#Adverb",
			reason: "self-driving"
		}, {
			match: "[#PastTense (#Hyphenated && #PhrasalVerb)] (#Noun|#Conjunction)",
			group: 0,
			tag: "Adjective",
			reason: "dammed-up"
		}, {
			match: "(#Hyphenated && #Value) fold",
			tag: "Adjective",
			reason: "two-fold"
		}, {
			match: "must (#Hyphenated && #Infinitive)",
			tag: "Adjective",
			reason: "must-win"
		}, {
			match: "(#Hyphenated && #Infinitive) #Hyphenated",
			tag: "Adjective",
			notIf: "#PhrasalVerb",
			reason: "vacuum-sealed"
		}, {
			match: "too much",
			tag: "Adverb Adjective",
			reason: "bit-4"
		}, {
			match: "a bit much",
			tag: "Determiner Adverb Adjective",
			reason: "bit-3"
		}, {
			match: "[(un|contra|extra|inter|intra|macro|micro|mid|mis|mono|multi|pre|sub|tri|ex)] #Adjective",
			group: 0,
			tag: ["Adjective", "Prefix"],
			reason: "un-skilled"
		}], [{
			match: "#Adverb [#Adverb] (and|or|then)",
			group: 0,
			tag: "Adjective",
			reason: "kinda-sparkly-and"
		}, {
			match: "[(dark|bright|flat|light|soft|pale|dead|dim|faux|little|wee|sheer|most|near|good|extra|all)] #Adjective",
			group: 0,
			tag: "Adverb",
			reason: "dark-green"
		}, {
			match: "#Copula [far too] #Adjective",
			group: 0,
			tag: "Adverb",
			reason: "far-too"
		}, {
			match: "#Copula [still] (in|#Gerund|#Adjective)",
			group: 0,
			tag: "Adverb",
			reason: "was-still-walking"
		}, {
			match: `#Plural ${yc}`,
			tag: "#PresentTense #Adverb",
			reason: "studies-hard"
		}, {
			match: `#Verb [${yc}] !#Noun?`,
			group: 0,
			notIf: "(#Copula|get|got|getting|become|became|becoming|feel|feels|feeling|#Determiner|#Preposition)",
			tag: "Adverb",
			reason: "shops-direct"
		}, {
			match: "[#Plural] a lot",
			tag: "PresentTense",
			reason: "studies-a-lot"
		}], [{
			match: "as [#Gerund] as",
			group: 0,
			tag: "Adjective",
			reason: "as-gerund-as"
		}, {
			match: "more [#Gerund] than",
			group: 0,
			tag: "Adjective",
			reason: "more-gerund-than"
		}, {
			match: "(so|very|extremely) [#Gerund]",
			group: 0,
			tag: "Adjective",
			reason: "so-gerund"
		}, {
			match: "(found|found) it #Adverb? [#Gerund]",
			group: 0,
			tag: "Adjective",
			reason: "found-it-gerund"
		}, {
			match: "a (little|bit|wee) bit? [#Gerund]",
			group: 0,
			tag: "Adjective",
			reason: "a-bit-gerund"
		}, {
			match: "#Gerund [#Gerund]",
			group: 0,
			tag: "Adjective",
			notIf: "(impersonating|practicing|considering|assuming)",
			reason: "looking-annoying"
		}, {
			match: "(looked|look|looks) #Adverb? [%Adj|Gerund%]",
			group: 0,
			tag: "Adjective",
			notIf: "(impersonating|practicing|considering|assuming)",
			reason: "looked-amazing"
		}, {
			match: "[%Adj|Gerund%] #Determiner",
			group: 0,
			tag: "Gerund",
			reason: "developing-a"
		}, {
			match: "#Possessive [%Adj|Gerund%] #Noun",
			group: 0,
			tag: "Adjective",
			reason: "leading-manufacturer"
		}, {
			match: "%Noun|Gerund% %Adj|Gerund%",
			tag: "Gerund #Adjective",
			reason: "meaning-alluring"
		}, {
			match: "(face|embrace|reveal|stop|start|resume) %Adj|Gerund%",
			tag: "#PresentTense #Adjective",
			reason: "face-shocking"
		}, {
			match: "(are|were) [%Adj|Gerund%] #Plural",
			group: 0,
			tag: "Adjective",
			reason: "are-enduring-symbols"
		}], [{
			match: "#Determiner [#Adjective] #Copula",
			group: 0,
			tag: "Noun",
			reason: "the-adj-is"
		}, {
			match: "#Adjective [#Adjective] #Copula",
			group: 0,
			tag: "Noun",
			reason: "adj-adj-is"
		}, {
			match: "(his|its) [%Adj|Noun%]",
			group: 0,
			tag: "Noun",
			notIf: "#Hyphenated",
			reason: "his-fine"
		}, {
			match: "#Copula #Adverb? [all]",
			group: 0,
			tag: "Noun",
			reason: "is-all"
		}, {
			match: "(have|had) [#Adjective] #Preposition .",
			group: 0,
			tag: "Noun",
			reason: "have-fun"
		}, {
			match: "#Gerund (giant|capital|center|zone|application)",
			tag: "Noun",
			reason: "brewing-giant"
		}, {
			match: "#Preposition (a|an) [#Adjective]$",
			group: 0,
			tag: "Noun",
			reason: "an-instant"
		}, {
			match: "no [#Adjective] #Modal",
			group: 0,
			tag: "Noun",
			reason: "no-golden"
		}, {
			match: "[brand #Gerund?] new",
			group: 0,
			tag: "Adverb",
			reason: "brand-new"
		}, {
			match: "(#Determiner|#Comparative|new|different) [kind]",
			group: 0,
			tag: "Noun",
			reason: "some-kind"
		}, {
			match: "#Possessive [%Adj|Noun%] #Noun",
			group: 0,
			tag: "Adjective",
			reason: "her-favourite"
		}, {
			match: "must && #Hyphenated .",
			tag: "Adjective",
			reason: "must-win"
		}, {
			match: "#Determiner [#Adjective]$",
			tag: "Noun",
			notIf: "(this|that|#Comparative|#Superlative)",
			reason: "the-south"
		}, {
			match: "(#Noun && #Hyphenated) (#Adjective && #Hyphenated)",
			tag: "Adjective",
			notIf: "(this|that|#Comparative|#Superlative)",
			reason: "company-wide"
		}, {
			match: "#Determiner [#Adjective] (#Copula|#Determiner)",
			notIf: "(#Comparative|#Superlative)",
			group: 0,
			tag: "Noun",
			reason: "the-poor"
		}, {
			match: "[%Adj|Noun%] #Noun",
			notIf: "(#Pronoun|#ProperNoun)",
			group: 0,
			tag: "Adjective",
			reason: "stable-foundations"
		}], [{
			match: "[still] #Adjective",
			group: 0,
			tag: "Adverb",
			reason: "still-advb"
		}, {
			match: "[still] #Verb",
			group: 0,
			tag: "Adverb",
			reason: "still-verb"
		}, {
			match: "[so] #Adjective",
			group: 0,
			tag: "Adverb",
			reason: "so-adv"
		}, {
			match: "[way] #Comparative",
			group: 0,
			tag: "Adverb",
			reason: "way-adj"
		}, {
			match: "[way] #Adverb #Adjective",
			group: 0,
			tag: "Adverb",
			reason: "way-too-adj"
		}, {
			match: "[all] #Verb",
			group: 0,
			tag: "Adverb",
			reason: "all-verb"
		}, {
			match: "#Verb  [like]",
			group: 0,
			notIf: "(#Modal|#PhrasalVerb)",
			tag: "Adverb",
			reason: "verb-like"
		}, {
			match: "(barely|hardly) even",
			tag: "Adverb",
			reason: "barely-even"
		}, {
			match: "[even] #Verb",
			group: 0,
			tag: "Adverb",
			reason: "even-walk"
		}, {
			match: "[even] #Comparative",
			group: 0,
			tag: "Adverb",
			reason: "even-worse"
		}, {
			match: "[even] (#Determiner|#Possessive)",
			group: 0,
			tag: "#Adverb",
			reason: "even-the"
		}, {
			match: "even left",
			tag: "#Adverb #Verb",
			reason: "even-left"
		}, {
			match: "[way] #Adjective",
			group: 0,
			tag: "#Adverb",
			reason: "way-over"
		}, {
			match: "#PresentTense [(hard|quick|bright|slow|fast|backwards|forwards)]",
			notIf: "#Copula",
			group: 0,
			tag: "Adverb",
			reason: "lazy-ly"
		}, {
			match: "[much] #Adjective",
			group: 0,
			tag: "Adverb",
			reason: "bit-1"
		}, {
			match: "#Copula [#Adverb]$",
			group: 0,
			tag: "Adjective",
			reason: "is-well"
		}, {
			match: "a [(little|bit|wee) bit?] #Adjective",
			group: 0,
			tag: "Adverb",
			reason: "a-bit-cold"
		}, {
			match: "[(super|pretty)] #Adjective",
			group: 0,
			tag: "Adverb",
			reason: "super-strong"
		}, {
			match: "(become|fall|grow) #Adverb? [#PastTense]",
			group: 0,
			tag: "Adjective",
			reason: "overly-weakened"
		}, {
			match: "(a|an) #Adverb [#Participle] #Noun",
			group: 0,
			tag: "Adjective",
			reason: "completely-beaten"
		}, {
			match: "#Determiner #Adverb? [close]",
			group: 0,
			tag: "Adjective",
			reason: "a-close"
		}, {
			match: "#Gerund #Adverb? [close]",
			group: 0,
			tag: "Adverb",
			notIf: "(getting|becoming|feeling)",
			reason: "being-close"
		}, {
			match: "(the|those|these|a|an) [#Participle] #Noun",
			group: 0,
			tag: "Adjective",
			reason: "blown-motor"
		}, {
			match: "(#PresentTense|#PastTense) [back]",
			group: 0,
			tag: "Adverb",
			notIf: "(#PhrasalVerb|#Copula)",
			reason: "charge-back"
		}, {
			match: "#Verb [around]",
			group: 0,
			tag: "Adverb",
			notIf: "#PhrasalVerb",
			reason: "send-around"
		}, {
			match: "[later] #PresentTense",
			group: 0,
			tag: "Adverb",
			reason: "later-say"
		}, {
			match: "#Determiner [well] !#PastTense?",
			group: 0,
			tag: "Noun",
			reason: "the-well"
		}, {
			match: "#Adjective [enough]",
			group: 0,
			tag: "Adverb",
			reason: "high-enough"
		}], [{
			match: "[sun] the #Ordinal",
			tag: "WeekDay",
			reason: "sun-the-5th"
		}, {
			match: "[sun] #Date",
			group: 0,
			tag: "WeekDay",
			reason: "sun-feb"
		}, {
			match: "#Date (on|this|next|last|during)? [sun]",
			group: 0,
			tag: "WeekDay",
			reason: "1pm-sun"
		}, {
			match: "(in|by|before|during|on|until|after|of|within|all) [sat]",
			group: 0,
			tag: "WeekDay",
			reason: "sat"
		}, {
			match: "(in|by|before|during|on|until|after|of|within|all) [wed]",
			group: 0,
			tag: "WeekDay",
			reason: "wed"
		}, {
			match: "(in|by|before|during|on|until|after|of|within|all) [march]",
			group: 0,
			tag: "Month",
			reason: "march"
		}, {
			match: "[sat] #Date",
			group: 0,
			tag: "WeekDay",
			reason: "sat-feb"
		}, {
			match: "#Preposition [(march|may)]",
			group: 0,
			tag: "Month",
			reason: "in-month"
		}, {
			match: "(this|next|last) (march|may) !#Infinitive?",
			tag: "#Date #Month",
			reason: "this-month"
		}, {
			match: "(march|may) the? #Value",
			tag: "#Month #Date #Date",
			reason: "march-5th"
		}, {
			match: "#Value of? (march|may)",
			tag: "#Date #Date #Month",
			reason: "5th-of-march"
		}, {
			match: "[(march|may)] .? #Date",
			group: 0,
			tag: "Month",
			reason: "march-and-feb"
		}, {
			match: "#Date .? [(march|may)]",
			group: 0,
			tag: "Month",
			reason: "feb-and-march"
		}, {
			match: "#Adverb [(march|may)]",
			group: 0,
			tag: "Verb",
			reason: "quickly-march"
		}, {
			match: "[(march|may)] #Adverb",
			group: 0,
			tag: "Verb",
			reason: "march-quickly"
		}, {
			match: "#Value (am|pm)",
			tag: "Time",
			reason: "2-am"
		}], [{
			match: "#Holiday (day|eve)",
			tag: "Holiday",
			reason: "holiday-day"
		}, {
			match: "#Value of #Month",
			tag: "Date",
			reason: "value-of-month"
		}, {
			match: "#Cardinal #Month",
			tag: "Date",
			reason: "cardinal-month"
		}, {
			match: "#Month #Value to #Value",
			tag: "Date",
			reason: "value-to-value"
		}, {
			match: "#Month the #Value",
			tag: "Date",
			reason: "month-the-value"
		}, {
			match: "(#WeekDay|#Month) #Value",
			tag: "Date",
			reason: "date-value"
		}, {
			match: "#Value (#WeekDay|#Month)",
			tag: "Date",
			reason: "value-date"
		}, {
			match: "(#TextValue && #Date) #TextValue",
			tag: "Date",
			reason: "textvalue-date"
		}, {
			match: "#Month #NumberRange",
			tag: "Date",
			reason: "aug 20-21"
		}, {
			match: "#WeekDay #Month #Ordinal",
			tag: "Date",
			reason: "week mm-dd"
		}, {
			match: "#Month #Ordinal #Cardinal",
			tag: "Date",
			reason: "mm-dd-yyy"
		}, {
			match: "(#Place|#Demonmym|#Time) (standard|daylight|central|mountain)? time",
			tag: "Timezone",
			reason: "std-time"
		}, {
			match: "(eastern|mountain|pacific|central|atlantic) (standard|daylight|summer)? time",
			tag: "Timezone",
			reason: "eastern-time"
		}, {
			match: "#Time [(eastern|mountain|pacific|central|est|pst|gmt)]",
			group: 0,
			tag: "Timezone",
			reason: "5pm-central"
		}, {
			match: "(central|western|eastern) european time",
			tag: "Timezone",
			reason: "cet"
		}], [{
			match: "(the|any) [more]",
			group: 0,
			tag: "Singular",
			reason: "more-noun"
		}, {
			match: "[more] #Noun",
			group: 0,
			tag: "Adjective",
			reason: "more-noun"
		}, {
			match: "(right|rights) of .",
			tag: "Noun",
			reason: "right-of"
		}, {
			match: "a [bit]",
			group: 0,
			tag: "Singular",
			reason: "bit-2"
		}, {
			match: "a [must]",
			group: 0,
			tag: "Singular",
			reason: "must-2"
		}, {
			match: "(we|us) [all]",
			group: 0,
			tag: "Noun",
			reason: "we all"
		}, {
			match: "due to [#Verb]",
			group: 0,
			tag: "Noun",
			reason: "due-to"
		}, {
			match: "some [#Verb] #Plural",
			group: 0,
			tag: "Noun",
			reason: "determiner6"
		}, {
			match: "#Possessive #Ordinal [#PastTense]",
			group: 0,
			tag: "Noun",
			reason: "first-thought"
		}, {
			match: "(the|this|those|these) #Adjective [%Verb|Noun%]",
			group: 0,
			tag: "Noun",
			notIf: "#Copula",
			reason: "the-adj-verb"
		}, {
			match: "(the|this|those|these) #Adverb #Adjective [#Verb]",
			group: 0,
			tag: "Noun",
			reason: "determiner4"
		}, {
			match: "the [#Verb] #Preposition .",
			group: 0,
			tag: "Noun",
			reason: "determiner1"
		}, {
			match: "(a|an|the) [#Verb] of",
			group: 0,
			tag: "Noun",
			reason: "the-verb-of"
		}, {
			match: "#Determiner #Noun of [#Verb]",
			group: 0,
			tag: "Noun",
			notIf: "#Gerund",
			reason: "noun-of-noun"
		}, {
			match: "#PastTense #Preposition [#PresentTense]",
			group: 0,
			notIf: "#Gerund",
			tag: "Noun",
			reason: "ended-in-ruins"
		}, {
			match: "#Conjunction [u]",
			group: 0,
			tag: "Pronoun",
			reason: "u-pronoun-2"
		}, {
			match: "[u] #Verb",
			group: 0,
			tag: "Pronoun",
			reason: "u-pronoun-1"
		}, {
			match: "#Determiner [(western|eastern|northern|southern|central)] #Noun",
			group: 0,
			tag: "Noun",
			reason: "western-line"
		}, {
			match: "(#Singular && @hasHyphen) #PresentTense",
			tag: "Noun",
			reason: "hyphen-verb"
		}, {
			match: "is no [#Verb]",
			group: 0,
			tag: "Noun",
			reason: "is-no-verb"
		}, {
			match: "do [so]",
			group: 0,
			tag: "Noun",
			reason: "so-noun"
		}, {
			match: "#Determiner [(shit|damn|hell)]",
			group: 0,
			tag: "Noun",
			reason: "swears-noun"
		}, {
			match: "to [(shit|hell)]",
			group: 0,
			tag: "Noun",
			reason: "to-swears"
		}, {
			match: "(the|these) [#Singular] (were|are)",
			group: 0,
			tag: "Plural",
			reason: "singular-were"
		}, {
			match: "a #Noun+ or #Adverb+? [#Verb]",
			group: 0,
			tag: "Noun",
			reason: "noun-or-noun"
		}, {
			match: "(the|those|these|a|an) #Adjective? [#PresentTense #Particle?]",
			group: 0,
			tag: "Noun",
			notIf: "(seem|appear|include|#Gerund|#Copula)",
			reason: "det-inf"
		}, {
			match: "#Noun #Actor",
			tag: "Actor",
			notIf: "(#Person|#Pronoun)",
			reason: "thing-doer"
		}, {
			match: "#Gerund #Actor",
			tag: "Actor",
			reason: "gerund-doer"
		}, {
			match: "co #Singular",
			tag: "Actor",
			reason: "co-noun"
		}, {
			match: "[#Noun+] #Actor",
			group: 0,
			tag: "Actor",
			notIf: "(#Honorific|#Pronoun|#Possessive)",
			reason: "air-traffic-controller"
		}, {
			match: "(urban|cardiac|cardiovascular|respiratory|medical|clinical|visual|graphic|creative|dental|exotic|fine|certified|registered|technical|virtual|professional|amateur|junior|senior|special|pharmaceutical|theoretical)+ #Noun? #Actor",
			tag: "Actor",
			reason: "fine-artist"
		}, {
			match: "#Noun+ (coach|chef|king|engineer|fellow|personality|boy|girl|man|woman|master)",
			tag: "Actor",
			reason: "dance-coach"
		}, {
			match: "chief . officer",
			tag: "Actor",
			reason: "chief-x-officer"
		}, {
			match: "chief of #Noun+",
			tag: "Actor",
			reason: "chief-of-police"
		}, {
			match: "senior? vice? president of #Noun+",
			tag: "Actor",
			reason: "president-of"
		}, {
			match: "#Determiner [sun]",
			group: 0,
			tag: "Singular",
			reason: "the-sun"
		}, {
			match: "#Verb (a|an) [#Value]$",
			group: 0,
			tag: "Singular",
			reason: "did-a-value"
		}, {
			match: "the [(can|will|may)]",
			group: 0,
			tag: "Singular",
			reason: "the can"
		}, {
			match: "#FirstName #Acronym? (#Possessive && #LastName)",
			tag: "Possessive",
			reason: "name-poss"
		}, {
			match: "#Organization+ #Possessive",
			tag: "Possessive",
			reason: "org-possessive"
		}, {
			match: "#Place+ #Possessive",
			tag: "Possessive",
			reason: "place-possessive"
		}, {
			match: "#Possessive #PresentTense #Particle?",
			notIf: "(#Gerund|her)",
			tag: "Noun",
			reason: "possessive-verb"
		}, {
			match: "(my|our|their|her|his|its) [(#Plural && #Actor)] #Noun",
			tag: "Possessive",
			reason: "my-dads"
		}, {
			match: "#Value of a [second]",
			group: 0,
			unTag: "Value",
			tag: "Singular",
			reason: "10th-of-a-second"
		}, {
			match: "#Value [seconds]",
			group: 0,
			unTag: "Value",
			tag: "Plural",
			reason: "10-seconds"
		}, {
			match: "in [#Infinitive]",
			group: 0,
			tag: "Singular",
			reason: "in-age"
		}, {
			match: "a [#Adjective] #Preposition",
			group: 0,
			tag: "Noun",
			reason: "a-minor-in"
		}, {
			match: "#Determiner [#Singular] said",
			group: 0,
			tag: "Actor",
			reason: "the-actor-said"
		}, {
			match: "#Determiner #Noun [(feel|sense|process|rush|side|bomb|bully|challenge|cover|crush|dump|exchange|flow|function|issue|lecture|limit|march|process)] !(#Preposition|to|#Adverb)?",
			group: 0,
			tag: "Noun",
			reason: "the-noun-sense"
		}, {
			match: "[#PresentTense] (of|by|for) (a|an|the) #Noun #Copula",
			group: 0,
			tag: "Plural",
			reason: "photographs-of"
		}, {
			match: "#Infinitive and [%Noun|Verb%]",
			group: 0,
			tag: "Infinitive",
			reason: "fight and win"
		}, {
			match: "#Noun and [#Verb] and #Noun",
			group: 0,
			tag: "Noun",
			reason: "peace-and-flowers"
		}, {
			match: "the #Cardinal [%Adj|Noun%]",
			group: 0,
			tag: "Noun",
			reason: "the-1992-classic"
		}, {
			match: "#Copula the [%Adj|Noun%] #Noun",
			group: 0,
			tag: "Adjective",
			reason: "the-premier-university"
		}, {
			match: "i #Verb [me] #Noun",
			group: 0,
			tag: "Possessive",
			reason: "scottish-me"
		}, {
			match: "[#PresentTense] (music|class|lesson|night|party|festival|league|ceremony)",
			group: 0,
			tag: "Noun",
			reason: "dance-music"
		}, {
			match: "[wit] (me|it)",
			group: 0,
			tag: "Presposition",
			reason: "wit-me"
		}, {
			match: "#PastTense #Possessive [#Verb]",
			group: 0,
			tag: "Noun",
			notIf: "(saw|made)",
			reason: "left-her-boots"
		}, {
			match: "#Value [%Plural|Verb%]",
			group: 0,
			tag: "Plural",
			notIf: "(one|1|a|an)",
			reason: "35-signs"
		}, {
			match: "had [#PresentTense]",
			group: 0,
			tag: "Noun",
			notIf: "(#Gerund|come|become)",
			reason: "had-time"
		}, {
			match: "%Adj|Noun% %Noun|Verb%",
			tag: "#Adjective #Noun",
			notIf: "#ProperNoun #Noun",
			reason: "instant-access"
		}, {
			match: "#Determiner [%Adj|Noun%] #Conjunction",
			group: 0,
			tag: "Noun",
			reason: "a-rep-to"
		}, {
			match: "#Adjective #Noun [%Plural|Verb%]$",
			group: 0,
			tag: "Plural",
			notIf: "#Pronoun",
			reason: "near-death-experiences"
		}, {
			match: "#Possessive #Noun [%Plural|Verb%]$",
			group: 0,
			tag: "Plural",
			reason: "your-guild-colors"
		}], [{
			match: "(this|that|the|a|an) [#Gerund #Infinitive]",
			group: 0,
			tag: "Singular",
			reason: "the-planning-process"
		}, {
			match: "(that|the) [#Gerund #PresentTense]",
			group: 0,
			ifNo: "#Copula",
			tag: "Plural",
			reason: "the-paving-stones"
		}, {
			match: "#Determiner [#Gerund] #Noun",
			group: 0,
			tag: "Adjective",
			reason: "the-gerund-noun"
		}, {
			match: "#Pronoun #Infinitive [#Gerund] #PresentTense",
			group: 0,
			tag: "Noun",
			reason: "tipping-sucks"
		}, {
			match: "#Adjective [#Gerund]",
			group: 0,
			tag: "Noun",
			notIf: "(still|even|just)",
			reason: "early-warning"
		}, {
			match: "[#Gerund] #Adverb? not? #Copula",
			group: 0,
			tag: "Activity",
			reason: "gerund-copula"
		}, {
			match: "#Copula [(#Gerund|#Activity)] #Copula",
			group: 0,
			tag: "Gerund",
			reason: "are-doing-is"
		}, {
			match: "[#Gerund] #Modal",
			group: 0,
			tag: "Activity",
			reason: "gerund-modal"
		}, {
			match: "#Singular for [%Noun|Gerund%]",
			group: 0,
			tag: "Gerund",
			reason: "noun-for-gerund"
		}, {
			match: "#Comparative (for|at) [%Noun|Gerund%]",
			group: 0,
			tag: "Gerund",
			reason: "better-for-gerund"
		}, {
			match: "#PresentTense the [#Gerund]",
			group: 0,
			tag: "Noun",
			reason: "keep-the-touching"
		}], [{
			match: "#Infinitive (this|that|the) [#Infinitive]",
			group: 0,
			tag: "Noun",
			reason: "do-this-dance"
		}, {
			match: "#Gerund #Determiner [#Infinitive]",
			group: 0,
			tag: "Noun",
			reason: "running-a-show"
		}, {
			match: "#Determiner (only|further|just|more|backward) [#Infinitive]",
			group: 0,
			tag: "Noun",
			reason: "the-only-reason"
		}, {
			match: "(the|this|a|an) [#Infinitive] #Adverb? #Verb",
			group: 0,
			tag: "Noun",
			reason: "determiner5"
		}, {
			match: "#Determiner #Adjective #Adjective? [#Infinitive]",
			group: 0,
			tag: "Noun",
			reason: "a-nice-inf"
		}, {
			match: "#Determiner #Demonym [#PresentTense]",
			group: 0,
			tag: "Noun",
			reason: "mexican-train"
		}, {
			match: "#Adjective #Noun+ [#Infinitive] #Copula",
			group: 0,
			tag: "Noun",
			reason: "career-move"
		}, {
			match: "at some [#Infinitive]",
			group: 0,
			tag: "Noun",
			reason: "at-some-inf"
		}, {
			match: "(go|goes|went) to [#Infinitive]",
			group: 0,
			tag: "Noun",
			reason: "goes-to-verb"
		}, {
			match: "(a|an) #Adjective? #Noun [#Infinitive] (#Preposition|#Noun)",
			group: 0,
			notIf: "from",
			tag: "Noun",
			reason: "a-noun-inf"
		}, {
			match: "(a|an) #Noun [#Infinitive]$",
			group: 0,
			tag: "Noun",
			reason: "a-noun-inf2"
		}, {
			match: "#Gerund #Adjective? for [#Infinitive]",
			group: 0,
			tag: "Noun",
			reason: "running-for"
		}, {
			match: "about [#Infinitive]",
			group: 0,
			tag: "Singular",
			reason: "about-love"
		}, {
			match: "#Plural on [#Infinitive]",
			group: 0,
			tag: "Noun",
			reason: "on-stage"
		}, {
			match: "any [#Infinitive]",
			group: 0,
			tag: "Noun",
			reason: "any-charge"
		}, {
			match: "no [#Infinitive]",
			group: 0,
			tag: "Noun",
			reason: "no-doubt"
		}, {
			match: "number of [#PresentTense]",
			group: 0,
			tag: "Noun",
			reason: "number-of-x"
		}, {
			match: "(taught|teaches|learns|learned) [#PresentTense]",
			group: 0,
			tag: "Noun",
			reason: "teaches-x"
		}, {
			match: "(try|use|attempt|build|make) [#Verb #Particle?]",
			notIf: "(#Copula|#Noun|sure|fun|up)",
			group: 0,
			tag: "Noun",
			reason: "do-verb"
		}, {
			match: "^[#Infinitive] (is|was)",
			group: 0,
			tag: "Noun",
			reason: "checkmate-is"
		}, {
			match: "#Infinitive much [#Infinitive]",
			group: 0,
			tag: "Noun",
			reason: "get-much"
		}, {
			match: "[cause] #Pronoun #Verb",
			group: 0,
			tag: "Conjunction",
			reason: "cause-cuz"
		}, {
			match: "the #Singular [#Infinitive] #Noun",
			group: 0,
			tag: "Noun",
			notIf: "#Pronoun",
			reason: "cardio-dance"
		}, {
			match: "#Determiner #Modal [#Noun]",
			group: 0,
			tag: "PresentTense",
			reason: "should-smoke"
		}, {
			match: "this [#Plural]",
			group: 0,
			tag: "PresentTense",
			notIf: "(#Preposition|#Date)",
			reason: "this-verbs"
		}, {
			match: "#Noun that [#Plural]",
			group: 0,
			tag: "PresentTense",
			notIf: "(#Preposition|#Pronoun|way)",
			reason: "voice-that-rocks"
		}, {
			match: "that [#Plural] to",
			group: 0,
			tag: "PresentTense",
			notIf: "#Preposition",
			reason: "that-leads-to"
		}, {
			match: "(let|make|made) (him|her|it|#Person|#Place|#Organization)+ [#Singular] (a|an|the|it)",
			group: 0,
			tag: "Infinitive",
			reason: "let-him-glue"
		}, {
			match: "#Verb (all|every|each|most|some|no) [#PresentTense]",
			notIf: "#Modal",
			group: 0,
			tag: "Noun",
			reason: "all-presentTense"
		}, {
			match: "(had|have|#PastTense) #Adjective [#PresentTense]",
			group: 0,
			tag: "Noun",
			notIf: "better",
			reason: "adj-presentTense"
		}, {
			match: "#Value #Adjective [#PresentTense]",
			group: 0,
			tag: "Noun",
			notIf: "#Copula",
			reason: "one-big-reason"
		}, {
			match: "#PastTense #Adjective+ [#PresentTense]",
			group: 0,
			tag: "Noun",
			notIf: "(#Copula|better)",
			reason: "won-wide-support"
		}, {
			match: "(many|few|several|couple) [#PresentTense]",
			group: 0,
			tag: "Noun",
			notIf: "#Copula",
			reason: "many-poses"
		}, {
			match: "#Determiner #Adverb #Adjective [%Noun|Verb%]",
			group: 0,
			tag: "Noun",
			notIf: "#Copula",
			reason: "very-big-dream"
		}, {
			match: "from #Noun to [%Noun|Verb%]",
			group: 0,
			tag: "Noun",
			reason: "start-to-finish"
		}, {
			match: "(for|with|of) #Noun (and|or|not) [%Noun|Verb%]",
			group: 0,
			tag: "Noun",
			notIf: "#Pronoun",
			reason: "for-food-and-gas"
		}, {
			match: "#Adjective #Adjective [#PresentTense]",
			group: 0,
			tag: "Noun",
			notIf: "#Copula",
			reason: "adorable-little-store"
		}, {
			match: "#Gerund #Adverb? #Comparative [#PresentTense]",
			group: 0,
			tag: "Noun",
			notIf: "#Copula",
			reason: "higher-costs"
		}, {
			match: "(#Noun && @hasComma) #Noun (and|or) [#PresentTense]",
			group: 0,
			tag: "Noun",
			notIf: "#Copula",
			reason: "noun-list"
		}, {
			match: "(many|any|some|several) [#PresentTense] for",
			group: 0,
			tag: "Noun",
			reason: "any-verbs-for"
		}, {
			match: "to #PresentTense #Noun [#PresentTense] #Preposition",
			group: 0,
			tag: "Noun",
			reason: "gas-exchange"
		}, {
			match: "#PastTense (until|as|through|without) [#PresentTense]",
			group: 0,
			tag: "Noun",
			reason: "waited-until-release"
		}, {
			match: "#Gerund like #Adjective? [#PresentTense]",
			group: 0,
			tag: "Plural",
			reason: "like-hot-cakes"
		}, {
			match: "some #Adjective [#PresentTense]",
			group: 0,
			tag: "Noun",
			reason: "some-reason"
		}, {
			match: "for some [#PresentTense]",
			group: 0,
			tag: "Noun",
			reason: "for-some-reason"
		}, {
			match: "(same|some|the|that|a) kind of [#PresentTense]",
			group: 0,
			tag: "Noun",
			reason: "some-kind-of"
		}, {
			match: "(same|some|the|that|a) type of [#PresentTense]",
			group: 0,
			tag: "Noun",
			reason: "some-type-of"
		}, {
			match: "#Gerund #Adjective #Preposition [#PresentTense]",
			group: 0,
			tag: "Noun",
			reason: "doing-better-for-x"
		}, {
			match: "(get|got|have) #Comparative [#PresentTense]",
			group: 0,
			tag: "Noun",
			reason: "got-better-aim"
		}, {
			match: "whose [#PresentTense] #Copula",
			group: 0,
			tag: "Noun",
			reason: "whos-name-was"
		}, {
			match: "#PhrasalVerb #Particle #Preposition [#PresentTense]",
			group: 0,
			tag: "Noun",
			reason: "given-up-on-x"
		}, {
			match: "there (are|were) #Adjective? [#PresentTense]",
			group: 0,
			tag: "Plural",
			reason: "there-are"
		}, {
			match: "#Value [#PresentTense] of",
			group: 0,
			notIf: "(one|1|#Copula|#Infinitive)",
			tag: "Plural",
			reason: "2-trains"
		}, {
			match: "[#PresentTense] (are|were) #Adjective",
			group: 0,
			tag: "Plural",
			reason: "compromises-are-possible"
		}, {
			match: "^[(hope|guess|thought|think)] #Pronoun #Verb",
			group: 0,
			tag: "Infinitive",
			reason: "suppose-i"
		}, {
			match: "#Possessive #Adjective [#Verb]",
			group: 0,
			tag: "Noun",
			notIf: "#Copula",
			reason: "our-full-support"
		}, {
			match: "[(tastes|smells)] #Adverb? #Adjective",
			group: 0,
			tag: "PresentTense",
			reason: "tastes-good"
		}, {
			match: "#Copula #Gerund [#PresentTense] !by?",
			group: 0,
			tag: "Noun",
			notIf: "going",
			reason: "ignoring-commute"
		}, {
			match: "#Determiner #Adjective? [(shed|thought|rose|bid|saw|spelt)]",
			group: 0,
			tag: "Noun",
			reason: "noun-past"
		}, {
			match: "how to [%Noun|Verb%]",
			group: 0,
			tag: "Infinitive",
			reason: "how-to-noun"
		}, {
			match: "which [%Noun|Verb%] #Noun",
			group: 0,
			tag: "Infinitive",
			reason: "which-boost-it"
		}, {
			match: "#Gerund [%Plural|Verb%]",
			group: 0,
			tag: "Plural",
			reason: "asking-questions"
		}, {
			match: "(ready|available|difficult|hard|easy|made|attempt|try) to [%Noun|Verb%]",
			group: 0,
			tag: "Infinitive",
			reason: "ready-to-noun"
		}, {
			match: "(bring|went|go|drive|run|bike) to [%Noun|Verb%]",
			group: 0,
			tag: "Noun",
			reason: "bring-to-noun"
		}, {
			match: "#Modal #Noun [%Noun|Verb%]",
			group: 0,
			tag: "Infinitive",
			reason: "would-you-look"
		}, {
			match: "#Copula just [#Infinitive]",
			group: 0,
			tag: "Noun",
			reason: "is-just-spam"
		}, {
			match: "^%Noun|Verb% %Plural|Verb%",
			tag: "Imperative #Plural",
			reason: "request-copies"
		}, {
			match: "#Adjective #Plural and [%Plural|Verb%]",
			group: 0,
			tag: "#Plural",
			reason: "pickles-and-drinks"
		}, {
			match: "#Determiner #Year [#Verb]",
			group: 0,
			tag: "Noun",
			reason: "the-1968-film"
		}, {
			match: "#Determiner [#PhrasalVerb #Particle]",
			group: 0,
			tag: "Noun",
			reason: "the-break-up"
		}, {
			match: "#Determiner [%Adj|Noun%] #Noun",
			group: 0,
			tag: "Adjective",
			notIf: "(#Pronoun|#Possessive|#ProperNoun)",
			reason: "the-individual-goals"
		}, {
			match: "[%Noun|Verb%] or #Infinitive",
			group: 0,
			tag: "Infinitive",
			reason: "work-or-prepare"
		}, {
			match: "to #Infinitive [#PresentTense]",
			group: 0,
			tag: "Noun",
			notIf: "(#Gerund|#Copula|help)",
			reason: "to-give-thanks"
		}, {
			match: "[#Noun] me",
			group: 0,
			tag: "Verb",
			reason: "kills-me"
		}, {
			match: "%Plural|Verb% %Plural|Verb%",
			tag: "#PresentTense #Plural",
			reason: "removes-wrinkles"
		}], [{
			match: "#Money and #Money #Currency?",
			tag: "Money",
			reason: "money-and-money"
		}, {
			match: "#Value #Currency [and] #Value (cents|ore|centavos|sens)",
			group: 0,
			tag: "money",
			reason: "and-5-cents"
		}, {
			match: "#Value (mark|rand|won|rub|ore)",
			tag: "#Money #Currency",
			reason: "4-mark"
		}, {
			match: "a pound",
			tag: "#Money #Unit",
			reason: "a-pound"
		}, {
			match: "#Value (pound|pounds)",
			tag: "#Money #Unit",
			reason: "4-pounds"
		}], [{
			match: "[(half|quarter)] of? (a|an)",
			group: 0,
			tag: "Fraction",
			reason: "millionth"
		}, {
			match: "#Adverb [half]",
			group: 0,
			tag: "Fraction",
			reason: "nearly-half"
		}, {
			match: "[half] the",
			group: 0,
			tag: "Fraction",
			reason: "half-the"
		}, {
			match: "#Cardinal and a half",
			tag: "Fraction",
			reason: "and-a-half"
		}, {
			match: "#Value (halves|halfs|quarters)",
			tag: "Fraction",
			reason: "two-halves"
		}, {
			match: "a #Ordinal",
			tag: "Fraction",
			reason: "a-quarter"
		}, {
			match: "[#Cardinal+] (#Fraction && /s$/)",
			tag: "Fraction",
			reason: "seven-fifths"
		}, {
			match: "[#Cardinal+ #Ordinal] of .",
			group: 0,
			tag: "Fraction",
			reason: "ordinal-of"
		}, {
			match: "[(#NumericValue && #Ordinal)] of .",
			group: 0,
			tag: "Fraction",
			reason: "num-ordinal-of"
		}, {
			match: "(a|one) #Cardinal?+ #Ordinal",
			tag: "Fraction",
			reason: "a-ordinal"
		}, {
			match: "#Cardinal+ out? of every? #Cardinal",
			tag: "Fraction",
			reason: "out-of"
		}], [{
			match: "#Cardinal [second]",
			tag: "Unit",
			reason: "one-second"
		}, {
			match: "!once? [(a|an)] (#Duration|hundred|thousand|million|billion|trillion)",
			group: 0,
			tag: "Value",
			reason: "a-is-one"
		}, {
			match: "1 #Value #PhoneNumber",
			tag: "PhoneNumber",
			reason: "1-800-Value"
		}, {
			match: "#NumericValue #PhoneNumber",
			tag: "PhoneNumber",
			reason: "(800) PhoneNumber"
		}, {
			match: "#Demonym #Currency",
			tag: "Currency",
			reason: "demonym-currency"
		}, {
			match: "#Value [(buck|bucks|grand)]",
			group: 0,
			tag: "Currency",
			reason: "value-bucks"
		}, {
			match: "[#Value+] #Currency",
			group: 0,
			tag: "Money",
			reason: "15 usd"
		}, {
			match: "[second] #Noun",
			group: 0,
			tag: "Ordinal",
			reason: "second-noun"
		}, {
			match: "#Value+ [#Currency]",
			group: 0,
			tag: "Unit",
			reason: "5-yan"
		}, {
			match: "#Value [(foot|feet)]",
			group: 0,
			tag: "Unit",
			reason: "foot-unit"
		}, {
			match: "#Value [#Abbreviation]",
			group: 0,
			tag: "Unit",
			reason: "value-abbr"
		}, {
			match: "#Value [k]",
			group: 0,
			tag: "Unit",
			reason: "value-k"
		}, {
			match: "#Unit an hour",
			tag: "Unit",
			reason: "unit-an-hour"
		}, {
			match: "(minus|negative) #Value",
			tag: "Value",
			reason: "minus-value"
		}, {
			match: "#Value (point|decimal) #Value",
			tag: "Value",
			reason: "value-point-value"
		}, {
			match: "#Determiner [(half|quarter)] #Ordinal",
			group: 0,
			tag: "Value",
			reason: "half-ordinal"
		}, {
			match: "#Multiple+ and #Value",
			tag: "Value",
			reason: "magnitude-and-value"
		}, {
			match: "#Value #Unit [(per|an) (hr|hour|sec|second|min|minute)]",
			group: 0,
			tag: "Unit",
			reason: "12-miles-per-second"
		}, {
			match: "#Value [(square|cubic)] #Unit",
			group: 0,
			tag: "Unit",
			reason: "square-miles"
		}, {
			match: "^[#Value] (#Determiner|#Gerund)",
			group: 0,
			tag: "Expression",
			unTag: "Value",
			reason: "numbered-list"
		}], [{
			match: "#Copula [(#Noun|#PresentTense)] #LastName",
			group: 0,
			tag: "FirstName",
			reason: "copula-noun-lastname"
		}, {
			match: "(sister|pope|brother|father|aunt|uncle|grandpa|grandfather|grandma) #ProperNoun",
			tag: "Person",
			reason: "lady-titlecase",
			safe: !0
		}, {
			match: "#FirstName [#Determiner #Noun] #LastName",
			group: 0,
			tag: "Person",
			reason: "first-noun-last"
		}, {
			match: "#ProperNoun (b|c|d|e|f|g|h|j|k|l|m|n|o|p|q|r|s|t|u|v|w|x|y|z) #ProperNoun",
			tag: "Person",
			reason: "titlecase-acronym-titlecase",
			safe: !0
		}, {
			match: "#Acronym #LastName",
			tag: "Person",
			reason: "acronym-lastname",
			safe: !0
		}, {
			match: "#Person (jr|sr|md)",
			tag: "Person",
			reason: "person-honorific"
		}, {
			match: "#Honorific #Acronym",
			tag: "Person",
			reason: "Honorific-TitleCase"
		}, {
			match: "#Person #Person the? #RomanNumeral",
			tag: "Person",
			reason: "roman-numeral"
		}, {
			match: "#FirstName [/^[^aiurck]$/]",
			group: 0,
			tag: ["Acronym", "Person"],
			reason: "john-e"
		}, {
			match: "#Noun van der? #Noun",
			tag: "Person",
			reason: "van der noun",
			safe: !0
		}, {
			match: "(king|queen|prince|saint|lady) of #Noun",
			tag: "Person",
			reason: "king-of-noun",
			safe: !0
		}, {
			match: "(prince|lady) #Place",
			tag: "Person",
			reason: "lady-place"
		}, {
			match: "(king|queen|prince|saint) #ProperNoun",
			tag: "Person",
			notIf: "#Place",
			reason: "saint-foo"
		}, {
			match: "al (#Person|#ProperNoun)",
			tag: "Person",
			reason: "al-borlen",
			safe: !0
		}, {
			match: "#FirstName de #Noun",
			tag: "Person",
			reason: "bill-de-noun"
		}, {
			match: "#FirstName (bin|al) #Noun",
			tag: "Person",
			reason: "bill-al-noun"
		}, {
			match: "#FirstName #Acronym #ProperNoun",
			tag: "Person",
			reason: "bill-acronym-title"
		}, {
			match: "#FirstName #FirstName #ProperNoun",
			tag: "Person",
			reason: "bill-firstname-title"
		}, {
			match: "#Honorific #FirstName? #ProperNoun",
			tag: "Person",
			reason: "dr-john-Title"
		}, {
			match: "#FirstName the #Adjective",
			tag: "Person",
			reason: "name-the-great"
		}, {
			match: "#ProperNoun (van|al|bin) #ProperNoun",
			tag: "Person",
			reason: "title-van-title",
			safe: !0
		}, {
			match: "#ProperNoun (de|du) la? #ProperNoun",
			tag: "Person",
			notIf: "#Place",
			reason: "title-de-title"
		}, {
			match: "#Singular #Acronym #LastName",
			tag: "#FirstName #Person .",
			reason: "title-acro-noun",
			safe: !0
		}, {
			match: "[#ProperNoun] #Person",
			group: 0,
			tag: "Person",
			reason: "proper-person",
			safe: !0
		}, {
			match: "#Person [#ProperNoun #ProperNoun]",
			group: 0,
			tag: "Person",
			notIf: "#Possessive",
			reason: "three-name-person",
			safe: !0
		}, {
			match: "#FirstName #Acronym? [#ProperNoun]",
			group: 0,
			tag: "LastName",
			notIf: "#Possessive",
			reason: "firstname-titlecase"
		}, {
			match: "#FirstName [#FirstName]",
			group: 0,
			tag: "LastName",
			reason: "firstname-firstname"
		}, {
			match: "#FirstName #Acronym #Noun",
			tag: "Person",
			reason: "n-acro-noun",
			safe: !0
		}, {
			match: "#FirstName [(de|di|du|van|von)] #Person",
			group: 0,
			tag: "LastName",
			reason: "de-firstname"
		}, {
			match: "[(lieutenant|corporal|sergeant|captain|qeen|king|admiral|major|colonel|marshal|president|queen|king)+] #ProperNoun",
			group: 0,
			tag: "Honorific",
			reason: "seargeant-john"
		}, {
			match: "[(private|general|major|rear|prime|field|count|miss)] #Honorific? #Person",
			group: 0,
			tag: ["Honorific", "Person"],
			reason: "ambg-honorifics"
		}, {
			match: "#Honorific #FirstName [#Singular]",
			group: 0,
			tag: "LastName",
			notIf: "#Possessive",
			reason: "dr-john-foo",
			safe: !0
		}, {
			match: "[(his|her) (majesty|honour|worship|excellency|honorable)] #Person",
			group: 0,
			tag: "Honorific",
			reason: "his-excellency"
		}, {
			match: "#Honorific #Actor",
			tag: "Honorific",
			reason: "Lieutenant colonel"
		}, {
			match: "(first|second|third|1st|2nd|3rd) #Actor",
			tag: "Honorific",
			reason: "first lady"
		}, {
			match: "#Person #RomanNumeral",
			tag: "Person",
			reason: "louis-IV"
		}], [{
			match: "#FirstName #Noun$",
			tag: ". #LastName",
			notIf: "(#Possessive|#Organization|#Place|#Pronoun|@hasTitleCase)",
			reason: "firstname-noun"
		}, {
			match: "%Person|Date% #Acronym? #ProperNoun",
			tag: "Person",
			reason: "jan-thierson"
		}, {
			match: "%Person|Noun% #Acronym? #ProperNoun",
			tag: "Person",
			reason: "switch-person",
			safe: !0
		}, {
			match: "%Person|Noun% #Organization",
			tag: "Organization",
			reason: "olive-garden"
		}, {
			match: "%Person|Verb% #Acronym? #ProperNoun",
			tag: "Person",
			reason: "verb-propernoun",
			ifNo: "#Actor"
		}, {
			match: "[%Person|Verb%] (will|had|has|said|says|told|did|learned|wants|wanted)",
			group: 0,
			tag: "Person",
			reason: "person-said"
		}, {
			match: "[%Person|Place%] (harbor|harbour|pier|town|city|place|dump|landfill)",
			group: 0,
			tag: "Place",
			reason: "sydney-harbour"
		}, {
			match: "(west|east|north|south) [%Person|Place%]",
			group: 0,
			tag: "Place",
			reason: "east-sydney"
		}, {
			match: "#Modal [%Person|Verb%]",
			group: 0,
			tag: "Verb",
			reason: "would-mark"
		}, {
			match: "#Adverb [%Person|Verb%]",
			group: 0,
			tag: "Verb",
			reason: "really-mark"
		}, {
			match: "[%Person|Verb%] (#Adverb|#Comparative)",
			group: 0,
			tag: "Verb",
			reason: "drew-closer"
		}, {
			match: "%Person|Verb% #Person",
			tag: "Person",
			reason: "rob-smith"
		}, {
			match: "%Person|Verb% #Acronym #ProperNoun",
			tag: "Person",
			reason: "rob-a-smith"
		}, {
			match: "[will] #Verb",
			group: 0,
			tag: "Modal",
			reason: "will-verb"
		}, {
			match: "(will && @isTitleCase) #ProperNoun",
			tag: "Person",
			reason: "will-name"
		}, {
			match: "(#FirstName && !#Possessive) [#Singular] #Verb",
			group: 0,
			safe: !0,
			tag: "LastName",
			reason: "jack-layton"
		}, {
			match: "^[#Singular] #Person #Verb",
			group: 0,
			safe: !0,
			tag: "Person",
			reason: "sherwood-anderson"
		}, {
			match: "(a|an) [#Person]$",
			group: 0,
			unTag: "Person",
			reason: "a-warhol"
		}], [{
			match: "#Copula (pretty|dead|full|well|sure) (#Adjective|#Noun)",
			tag: "#Copula #Adverb #Adjective",
			reason: "sometimes-adverb"
		}, {
			match: "(#Pronoun|#Person) (had|#Adverb)? [better] #PresentTense",
			group: 0,
			tag: "Modal",
			reason: "i-better"
		}, {
			match: "(#Modal|i|they|we|do) not? [like]",
			group: 0,
			tag: "PresentTense",
			reason: "modal-like"
		}, {
			match: "#Noun #Adverb? [left]",
			group: 0,
			tag: "PastTense",
			reason: "left-verb"
		}, {
			match: "will #Adverb? not? #Adverb? [be] #Gerund",
			group: 0,
			tag: "Copula",
			reason: "will-be-copula"
		}, {
			match: "will #Adverb? not? #Adverb? [be] #Adjective",
			group: 0,
			tag: "Copula",
			reason: "be-copula"
		}, {
			match: "[march] (up|down|back|toward)",
			notIf: "#Date",
			group: 0,
			tag: "Infinitive",
			reason: "march-to"
		}, {
			match: "#Modal [march]",
			group: 0,
			tag: "Infinitive",
			reason: "must-march"
		}, {
			match: "[may] be",
			group: 0,
			tag: "Verb",
			reason: "may-be"
		}, {
			match: "[(subject|subjects|subjected)] to",
			group: 0,
			tag: "Verb",
			reason: "subject to"
		}, {
			match: "[home] to",
			group: 0,
			tag: "PresentTense",
			reason: "home to"
		}, {
			match: "[open] #Determiner",
			group: 0,
			tag: "Infinitive",
			reason: "open-the"
		}, {
			match: "(were|was) being [#PresentTense]",
			group: 0,
			tag: "PastTense",
			reason: "was-being"
		}, {
			match: "(had|has|have) [been /en$/]",
			group: 0,
			tag: "Auxiliary Participle",
			reason: "had-been-broken"
		}, {
			match: "(had|has|have) [been /ed$/]",
			group: 0,
			tag: "Auxiliary PastTense",
			reason: "had-been-smoked"
		}, {
			match: "(had|has) #Adverb? [been] #Adverb? #PastTense",
			group: 0,
			tag: "Auxiliary",
			reason: "had-been-adj"
		}, {
			match: "(had|has) to [#Noun] (#Determiner|#Possessive)",
			group: 0,
			tag: "Infinitive",
			reason: "had-to-noun"
		}, {
			match: "have [#PresentTense]",
			group: 0,
			tag: "PastTense",
			notIf: "(come|gotten)",
			reason: "have-read"
		}, {
			match: "(does|will|#Modal) that [work]",
			group: 0,
			tag: "PastTense",
			reason: "does-that-work"
		}, {
			match: "[(sound|sounds)] #Adjective",
			group: 0,
			tag: "PresentTense",
			reason: "sounds-fun"
		}, {
			match: "[(look|looks)] #Adjective",
			group: 0,
			tag: "PresentTense",
			reason: "looks-good"
		}, {
			match: "[(start|starts|stop|stops|begin|begins)] #Gerund",
			group: 0,
			tag: "Verb",
			reason: "starts-thinking"
		}, {
			match: "(have|had) read",
			tag: "Modal #PastTense",
			reason: "read-read"
		}, {
			match: "(is|was|were) [(under|over) #PastTense]",
			group: 0,
			tag: "Adverb Adjective",
			reason: "was-under-cooked"
		}, {
			match: "[shit] (#Determiner|#Possessive|them)",
			group: 0,
			tag: "Verb",
			reason: "swear1-verb"
		}, {
			match: "[damn] (#Determiner|#Possessive|them)",
			group: 0,
			tag: "Verb",
			reason: "swear2-verb"
		}, {
			match: "[fuck] (#Determiner|#Possessive|them)",
			group: 0,
			tag: "Verb",
			reason: "swear3-verb"
		}, {
			match: "#Plural that %Noun|Verb%",
			tag: ". #Preposition #Infinitive",
			reason: "jobs-that-work"
		}, {
			match: "[works] for me",
			group: 0,
			tag: "PresentTense",
			reason: "works-for-me"
		}, {
			match: "as #Pronoun [please]",
			group: 0,
			tag: "Infinitive",
			reason: "as-we-please"
		}, {
			match: "[(co|mis|de|inter|intra|pre|re|un|out|under|over|counter)] #Verb",
			group: 0,
			tag: ["Verb", "Prefix"],
			notIf: "(#Copula|#PhrasalVerb)",
			reason: "co-write"
		}, {
			match: "#PastTense and [%Adj|Past%]",
			group: 0,
			tag: "PastTense",
			reason: "dressed-and-left"
		}, {
			match: "[%Adj|Past%] and #PastTense",
			group: 0,
			tag: "PastTense",
			reason: "dressed-and-left"
		}, {
			match: "#Copula #Pronoun [%Adj|Past%]",
			group: 0,
			tag: "Adjective",
			reason: "is-he-stoked"
		}, {
			match: "to [%Noun|Verb%] #Preposition",
			group: 0,
			tag: "Infinitive",
			reason: "to-dream-of"
		}], [{
			match: "(slowly|quickly) [#Adjective]",
			group: 0,
			tag: "Verb",
			reason: "slowly-adj"
		}, {
			match: "does (#Adverb|not)? [#Adjective]",
			group: 0,
			tag: "PresentTense",
			reason: "does-mean"
		}, {
			match: "[(fine|okay|cool|ok)] by me",
			group: 0,
			tag: "Adjective",
			reason: "okay-by-me"
		}, {
			match: "i (#Adverb|do)? not? [mean]",
			group: 0,
			tag: "PresentTense",
			reason: "i-mean"
		}, {
			match: "will #Adjective",
			tag: "Auxiliary Infinitive",
			reason: "will-adj"
		}, {
			match: "#Pronoun [#Adjective] #Determiner #Adjective? #Noun",
			group: 0,
			tag: "Verb",
			reason: "he-adj-the"
		}, {
			match: "#Copula [%Adj|Present%] to #Verb",
			group: 0,
			tag: "Verb",
			reason: "adj-to"
		}, {
			match: "#Copula [#Adjective] (well|badly|quickly|slowly)",
			group: 0,
			tag: "Verb",
			reason: "done-well"
		}, {
			match: "#Adjective and [#Gerund] !#Preposition?",
			group: 0,
			tag: "Adjective",
			reason: "rude-and-x"
		}, {
			match: "#Copula #Adverb? (over|under) [#PastTense]",
			group: 0,
			tag: "Adjective",
			reason: "over-cooked"
		}, {
			match: "#Copula #Adjective+ (and|or) [#PastTense]$",
			group: 0,
			tag: "Adjective",
			reason: "bland-and-overcooked"
		}, {
			match: "got #Adverb? [#PastTense] of",
			group: 0,
			tag: "Adjective",
			reason: "got-tired-of"
		}, {
			match: "(seem|seems|seemed|appear|appeared|appears|feel|feels|felt|sound|sounds|sounded) (#Adverb|#Adjective)? [#PastTense]",
			group: 0,
			tag: "Adjective",
			reason: "felt-loved"
		}, {
			match: "(seem|feel|seemed|felt) [#PastTense #Particle?]",
			group: 0,
			tag: "Adjective",
			reason: "seem-confused"
		}, {
			match: "a (bit|little|tad) [#PastTense #Particle?]",
			group: 0,
			tag: "Adjective",
			reason: "a-bit-confused"
		}, {
			match: "not be [%Adj|Past% #Particle?]",
			group: 0,
			tag: "Adjective",
			reason: "do-not-be-confused"
		}, {
			match: "#Copula just [%Adj|Past% #Particle?]",
			group: 0,
			tag: "Adjective",
			reason: "is-just-right"
		}, {
			match: "as [#Infinitive] as",
			group: 0,
			tag: "Adjective",
			reason: "as-pale-as"
		}, {
			match: "[%Adj|Past%] and #Adjective",
			group: 0,
			tag: "Adjective",
			reason: "faled-and-oppressive"
		}, {
			match: "or [#PastTense] #Noun",
			group: 0,
			tag: "Adjective",
			notIf: "(#Copula|#Pronoun)",
			reason: "or-heightened-emotion"
		}, {
			match: "(become|became|becoming|becomes) [#Verb]",
			group: 0,
			tag: "Adjective",
			reason: "become-verb"
		}, {
			match: "#Possessive [#PastTense] #Noun",
			group: 0,
			tag: "Adjective",
			reason: "declared-intentions"
		}, {
			match: "#Copula #Pronoun [%Adj|Present%]",
			group: 0,
			tag: "Adjective",
			reason: "is-he-cool"
		}, {
			match: "#Copula [%Adj|Past%] with",
			group: 0,
			tag: "Adjective",
			notIf: "(associated|worn|baked|aged|armed|bound|fried|loaded|mixed|packed|pumped|filled|sealed)",
			reason: "is-crowded-with"
		}, {
			match: "#Copula #Adverb? [%Adj|Present%]$",
			group: 0,
			tag: "Adjective",
			reason: "was-empty$"
		}], [{
			match: "will (#Adverb|not)+? [have] (#Adverb|not)+? #Verb",
			group: 0,
			tag: "Auxiliary",
			reason: "will-have-vb"
		}, {
			match: "[#Copula] (#Adverb|not)+? (#Gerund|#PastTense)",
			group: 0,
			tag: "Auxiliary",
			reason: "copula-walking"
		}, {
			match: "[(#Modal|did)+] (#Adverb|not)+? #Verb",
			group: 0,
			tag: "Auxiliary",
			reason: "modal-verb"
		}, {
			match: "#Modal (#Adverb|not)+? [have] (#Adverb|not)+? [had] (#Adverb|not)+? #Verb",
			group: 0,
			tag: "Auxiliary",
			reason: "would-have"
		}, {
			match: "[(has|had)] (#Adverb|not)+? #PastTense",
			group: 0,
			tag: "Auxiliary",
			reason: "had-walked"
		}, {
			match: "[(do|does|did|will|have|had|has|got)] (not|#Adverb)+? #Verb",
			group: 0,
			tag: "Auxiliary",
			reason: "have-had"
		}, {
			match: "[about to] #Adverb? #Verb",
			group: 0,
			tag: ["Auxiliary", "Verb"],
			reason: "about-to"
		}, {
			match: "#Modal (#Adverb|not)+? [be] (#Adverb|not)+? #Verb",
			group: 0,
			tag: "Auxiliary",
			reason: "would-be"
		}, {
			match: "[(#Modal|had|has)] (#Adverb|not)+? [been] (#Adverb|not)+? #Verb",
			group: 0,
			tag: "Auxiliary",
			reason: "had-been"
		}, {
			match: "[(be|being|been)] #Participle",
			group: 0,
			tag: "Auxiliary",
			reason: "being-driven"
		}, {
			match: "[may] #Adverb? #Infinitive",
			group: 0,
			tag: "Auxiliary",
			reason: "may-want"
		}, {
			match: "#Copula (#Adverb|not)+? [(be|being|been)] #Adverb+? #PastTense",
			group: 0,
			tag: "Auxiliary",
			reason: "being-walked"
		}, {
			match: "will [be] #PastTense",
			group: 0,
			tag: "Auxiliary",
			reason: "will-be-x"
		}, {
			match: "[(be|been)] (#Adverb|not)+? #Gerund",
			group: 0,
			tag: "Auxiliary",
			reason: "been-walking"
		}, {
			match: "[used to] #PresentTense",
			group: 0,
			tag: "Auxiliary",
			reason: "used-to-walk"
		}, {
			match: "#Copula (#Adverb|not)+? [going to] #Adverb+? #PresentTense",
			group: 0,
			tag: "Auxiliary",
			reason: "going-to-walk"
		}, {
			match: "#Imperative [(me|him|her)]",
			group: 0,
			tag: "Reflexive",
			reason: "tell-him"
		}, {
			match: "(is|was) #Adverb? [no]",
			group: 0,
			tag: "Negative",
			reason: "is-no"
		}, {
			match: "[(been|had|became|came)] #PastTense",
			group: 0,
			notIf: "#PhrasalVerb",
			tag: "Auxiliary",
			reason: "been-told"
		}, {
			match: "[(being|having|getting)] #Verb",
			group: 0,
			tag: "Auxiliary",
			reason: "being-born"
		}, {
			match: "[be] #Gerund",
			group: 0,
			tag: "Auxiliary",
			reason: "be-walking"
		}, {
			match: "[better] #PresentTense",
			group: 0,
			tag: "Modal",
			notIf: "(#Copula|#Gerund)",
			reason: "better-go"
		}, {
			match: "even better",
			tag: "Adverb #Comparative",
			reason: "even-better"
		}], [{
			match: "(#Verb && @hasHyphen) up",
			tag: "PhrasalVerb",
			reason: "foo-up"
		}, {
			match: "(#Verb && @hasHyphen) off",
			tag: "PhrasalVerb",
			reason: "foo-off"
		}, {
			match: "(#Verb && @hasHyphen) over",
			tag: "PhrasalVerb",
			reason: "foo-over"
		}, {
			match: "(#Verb && @hasHyphen) out",
			tag: "PhrasalVerb",
			reason: "foo-out"
		}, {
			match: "[#Verb (in|out|up|down|off|back)] (on|in)",
			notIf: "#Copula",
			tag: "PhrasalVerb Particle",
			reason: "walk-in-on"
		}, {
			match: "(lived|went|crept|go) [on] for",
			group: 0,
			tag: "PhrasalVerb",
			reason: "went-on"
		}, {
			match: "#Verb (up|down|in|on|for)$",
			tag: "PhrasalVerb #Particle",
			notIf: "#PhrasalVerb",
			reason: "come-down$"
		}, {
			match: "help [(stop|end|make|start)]",
			group: 0,
			tag: "Infinitive",
			reason: "help-stop"
		}, {
			match: "#PhrasalVerb (in && #Particle) #Determiner",
			tag: "#Verb #Preposition #Determiner",
			unTag: "PhrasalVerb",
			reason: "work-in-the"
		}, {
			match: "[(stop|start|finish|help)] #Gerund",
			group: 0,
			tag: "Infinitive",
			reason: "start-listening"
		}, {
			match: "#Verb (him|her|it|us|himself|herself|itself|everything|something) [(up|down)]",
			group: 0,
			tag: "Adverb",
			reason: "phrasal-pronoun-advb"
		}], [{
			match: "^do not? [#Infinitive #Particle?]",
			notIf: wc,
			group: 0,
			tag: "Imperative",
			reason: "do-eat"
		}, {
			match: "^please do? not? [#Infinitive #Particle?]",
			group: 0,
			tag: "Imperative",
			reason: "please-go"
		}, {
			match: "^just do? not? [#Infinitive #Particle?]",
			group: 0,
			tag: "Imperative",
			reason: "just-go"
		}, {
			match: "^[#Infinitive] it #Comparative",
			notIf: wc,
			group: 0,
			tag: "Imperative",
			reason: "do-it-better"
		}, {
			match: "^[#Infinitive] it (please|now|again|plz)",
			notIf: wc,
			group: 0,
			tag: "Imperative",
			reason: "do-it-please"
		}, {
			match: "^[#Infinitive] (#Adjective|#Adverb)$",
			group: 0,
			tag: "Imperative",
			notIf: "(so|such|rather|enough)",
			reason: "go-quickly"
		}, {
			match: "^[#Infinitive] (up|down|over) #Determiner",
			group: 0,
			tag: "Imperative",
			reason: "turn-down"
		}, {
			match: "^[#Infinitive] (your|my|the|a|an|any|each|every|some|more|with|on)",
			group: 0,
			notIf: "like",
			tag: "Imperative",
			reason: "eat-my-shorts"
		}, {
			match: "^[#Infinitive] (him|her|it|us|me|there)",
			group: 0,
			tag: "Imperative",
			reason: "tell-him"
		}, {
			match: "^[#Infinitive] #Adjective #Noun$",
			group: 0,
			tag: "Imperative",
			reason: "avoid-loud-noises"
		}, {
			match: "^[#Infinitive] (#Adjective|#Adverb)? and #Infinitive",
			group: 0,
			tag: "Imperative",
			reason: "call-and-reserve"
		}, {
			match: "^(go|stop|wait|hurry) please?$",
			tag: "Imperative",
			reason: "go"
		}, {
			match: "^(somebody|everybody) [#Infinitive]",
			group: 0,
			tag: "Imperative",
			reason: "somebody-call"
		}, {
			match: "^let (us|me) [#Infinitive]",
			group: 0,
			tag: "Imperative",
			reason: "lets-leave"
		}, {
			match: "^[(shut|close|open|start|stop|end|keep)] #Determiner #Noun",
			group: 0,
			tag: "Imperative",
			reason: "shut-the-door"
		}, {
			match: "^[#PhrasalVerb #Particle] #Determiner #Noun",
			group: 0,
			tag: "Imperative",
			reason: "turn-off-the-light"
		}, {
			match: "^[go] to .",
			group: 0,
			tag: "Imperative",
			reason: "go-to-toronto"
		}, {
			match: "^#Modal you [#Infinitive]",
			group: 0,
			tag: "Imperative",
			reason: "would-you-"
		}, {
			match: "^never [#Infinitive]",
			group: 0,
			tag: "Imperative",
			reason: "never-stop"
		}, {
			match: "^come #Infinitive",
			tag: "Imperative",
			notIf: "on",
			reason: "come-have"
		}, {
			match: "^come and? #Infinitive",
			tag: "Imperative . Imperative",
			notIf: "#PhrasalVerb",
			reason: "come-and-have"
		}, {
			match: "^stay (out|away|back)",
			tag: "Imperative",
			reason: "stay-away"
		}, {
			match: "^[(stay|be|keep)] #Adjective",
			group: 0,
			tag: "Imperative",
			reason: "stay-cool"
		}, {
			match: "^[keep it] #Adjective",
			group: 0,
			tag: "Imperative",
			reason: "keep-it-cool"
		}, {
			match: "^do not [#Infinitive]",
			group: 0,
			tag: "Imperative",
			reason: "do-not-be"
		}, {
			match: "[#Infinitive] (yourself|yourselves)",
			group: 0,
			tag: "Imperative",
			reason: "allow-yourself"
		}, {
			match: "[#Infinitive] what .",
			group: 0,
			tag: "Imperative",
			reason: "look-what"
		}, {
			match: "^[#Infinitive] #Gerund",
			group: 0,
			tag: "Imperative",
			reason: "keep-playing"
		}, {
			match: "^[#Infinitive] (to|for|into|toward|here|there)",
			group: 0,
			tag: "Imperative",
			reason: "go-to"
		}, {
			match: "^[#Infinitive] (and|or) #Infinitive",
			group: 0,
			tag: "Imperative",
			reason: "inf-and-inf"
		}, {
			match: "^[%Noun|Verb%] to",
			group: 0,
			tag: "Imperative",
			reason: "commit-to"
		}, {
			match: "^[#Infinitive] #Adjective? #Singular #Singular",
			group: 0,
			tag: "Imperative",
			reason: "maintain-eye-contact"
		}, {
			match: "do not (forget|omit|neglect) to [#Infinitive]",
			group: 0,
			tag: "Imperative",
			reason: "do-not-forget"
		}, {
			match: "^[(ask|wear|pay|look|help|show|watch|act|fix|kill|stop|start|turn|try|win)] #Noun",
			group: 0,
			tag: "Imperative",
			reason: "pay-attention"
		}], [{
			match: "(that|which) were [%Adj|Gerund%]",
			group: 0,
			tag: "Gerund",
			reason: "that-were-growing"
		}, {
			match: "#Gerund [#Gerund] #Plural",
			group: 0,
			tag: "Adjective",
			reason: "hard-working-fam"
		}], [{
			match: "u r",
			tag: "#Pronoun #Copula",
			reason: "u r"
		}, {
			match: "#Noun [(who|whom)]",
			group: 0,
			tag: "Determiner",
			reason: "captain-who"
		}, {
			match: "[had] #Noun+ #PastTense",
			group: 0,
			tag: "Condition",
			reason: "had-he"
		}, {
			match: "[were] #Noun+ to #Infinitive",
			group: 0,
			tag: "Condition",
			reason: "were-he"
		}, {
			match: "some sort of",
			tag: "Adjective Noun Conjunction",
			reason: "some-sort-of"
		}, {
			match: "of some sort",
			tag: "Conjunction Adjective Noun",
			reason: "of-some-sort"
		}, {
			match: "[such] (a|an|is)? #Noun",
			group: 0,
			tag: "Determiner",
			reason: "such-skill"
		}, {
			match: "[right] (before|after|in|into|to|toward)",
			group: 0,
			tag: "#Adverb",
			reason: "right-into"
		}, {
			match: "#Preposition [about]",
			group: 0,
			tag: "Adjective",
			reason: "at-about"
		}, {
			match: "(are|#Modal|see|do|for) [ya]",
			group: 0,
			tag: "Pronoun",
			reason: "are-ya"
		}, {
			match: "[long live] .",
			group: 0,
			tag: "#Adjective #Infinitive",
			reason: "long-live"
		}, {
			match: "[plenty] of",
			group: 0,
			tag: "#Uncountable",
			reason: "plenty-of"
		}, {
			match: "(always|nearly|barely|practically) [there]",
			group: 0,
			tag: "Adjective",
			reason: "always-there"
		}, {
			match: "[there] (#Adverb|#Pronoun)? #Copula",
			group: 0,
			tag: "There",
			reason: "there-is"
		}, {
			match: "#Copula [there] .",
			group: 0,
			tag: "There",
			reason: "is-there"
		}, {
			match: "#Modal #Adverb? [there]",
			group: 0,
			tag: "There",
			reason: "should-there"
		}, {
			match: "^[do] (you|we|they)",
			group: 0,
			tag: "QuestionWord",
			reason: "do-you"
		}, {
			match: "^[does] (he|she|it|#ProperNoun)",
			group: 0,
			tag: "QuestionWord",
			reason: "does-he"
		}, {
			match: "#Determiner #Noun+ [who] #Verb",
			group: 0,
			tag: "Preposition",
			reason: "the-x-who"
		}, {
			match: "#Determiner #Noun+ [which] #Verb",
			group: 0,
			tag: "Preposition",
			reason: "the-x-which"
		}, {
			match: "a [while]",
			group: 0,
			tag: "Noun",
			reason: "a-while"
		}, {
			match: "guess who",
			tag: "#Infinitive #QuestionWord",
			reason: "guess-who"
		}, {
			match: "[fucking] !#Verb",
			group: 0,
			tag: "#Gerund",
			reason: "f-as-gerund"
		}], [{
			match: "university of #Place",
			tag: "Organization",
			reason: "university-of-Foo"
		}, {
			match: "#Noun (&|n) #Noun",
			tag: "Organization",
			reason: "Noun-&-Noun"
		}, {
			match: "#Organization of the? #ProperNoun",
			tag: "Organization",
			reason: "org-of-place",
			safe: !0
		}, {
			match: "#Organization #Country",
			tag: "Organization",
			reason: "org-country"
		}, {
			match: "#ProperNoun #Organization",
			tag: "Organization",
			notIf: "#FirstName",
			reason: "titlecase-org"
		}, {
			match: "#ProperNoun (ltd|co|inc|dept|assn|bros)",
			tag: "Organization",
			reason: "org-abbrv"
		}, {
			match: "the [#Acronym]",
			group: 0,
			tag: "Organization",
			reason: "the-acronym",
			safe: !0
		}, {
			match: "government of the? [#Place+]",
			tag: "Organization",
			reason: "government-of-x"
		}, {
			match: "(health|school|commerce) board",
			tag: "Organization",
			reason: "school-board"
		}, {
			match: "(nominating|special|conference|executive|steering|central|congressional) committee",
			tag: "Organization",
			reason: "special-comittee"
		}, {
			match: "(world|global|international|national|#Demonym) #Organization",
			tag: "Organization",
			reason: "global-org"
		}, {
			match: "#Noun+ (public|private) school",
			tag: "School",
			reason: "noun-public-school"
		}, {
			match: "#Place+ #SportsTeam",
			tag: "SportsTeam",
			reason: "place-sportsteam"
		}, {
			match: "(dc|atlanta|minnesota|manchester|newcastle|sheffield) united",
			tag: "SportsTeam",
			reason: "united-sportsteam"
		}, {
			match: "#Place+ fc",
			tag: "SportsTeam",
			reason: "fc-sportsteam"
		}], [{
			match: "(west|north|south|east|western|northern|southern|eastern)+ #Place",
			tag: "Region",
			reason: "west-norfolk"
		}, {
			match: "#City [(al|ak|az|ar|ca|ct|dc|fl|ga|id|il|nv|nh|nj|ny|oh|pa|sc|tn|tx|ut|vt|pr)]",
			group: 0,
			tag: "Region",
			reason: "us-state"
		}, {
			match: "portland [or]",
			group: 0,
			tag: "Region",
			reason: "portland-or"
		}, {
			match: "#ProperNoun+ (cliff|place|range|pit|place|point|room|grounds|ruins)",
			tag: "Place",
			reason: "foo-point"
		}, {
			match: "in [#ProperNoun] #Place",
			group: 0,
			tag: "Place",
			reason: "propernoun-place"
		}, {
			match: "#Value #Noun (st|street|rd|road|crescent|cr|way|tr|terrace|avenue|ave)",
			tag: "Address",
			reason: "address-st"
		}], [{
			match: "[so] #Noun",
			group: 0,
			tag: "Conjunction",
			reason: "so-conj"
		}, {
			match: "[(who|what|where|why|how|when)] #Noun #Copula #Adverb? (#Verb|#Adjective)",
			group: 0,
			tag: "Conjunction",
			reason: "how-he-is-x"
		}, {
			match: "#Copula [(who|what|where|why|how|when)] #Noun",
			group: 0,
			tag: "Conjunction",
			reason: "when-he"
		}, {
			match: "#Verb [that] #Pronoun",
			group: 0,
			tag: "Conjunction",
			reason: "said-that-he"
		}, {
			match: "#Noun [that] #Copula",
			group: 0,
			tag: "Conjunction",
			reason: "that-are"
		}, {
			match: "#Noun [that] #Verb #Adjective",
			group: 0,
			tag: "Conjunction",
			reason: "that-seem"
		}, {
			match: "#Noun #Copula not? [that] #Adjective",
			group: 0,
			tag: "Adverb",
			reason: "that-adj"
		}, {
			match: "#Verb #Adverb? #Noun [(that|which)]",
			group: 0,
			tag: "Preposition",
			reason: "that-prep"
		}, {
			match: "@hasComma [which] (#Pronoun|#Verb)",
			group: 0,
			tag: "Preposition",
			reason: "which-copula"
		}, {
			match: "#Noun [like] #Noun",
			group: 0,
			tag: "Preposition",
			reason: "noun-like"
		}, {
			match: "^[like] #Determiner",
			group: 0,
			tag: "Preposition",
			reason: "like-the"
		}, {
			match: "a #Noun [like] (#Noun|#Determiner)",
			group: 0,
			tag: "Preposition",
			reason: "a-noun-like"
		}, {
			match: "#Adverb [like]",
			group: 0,
			tag: "Verb",
			reason: "really-like"
		}, {
			match: "(not|nothing|never) [like]",
			group: 0,
			tag: "Preposition",
			reason: "nothing-like"
		}, {
			match: "#Infinitive #Pronoun [like]",
			group: 0,
			tag: "Preposition",
			reason: "treat-them-like"
		}, {
			match: "[#QuestionWord] (#Pronoun|#Determiner)",
			group: 0,
			tag: "Preposition",
			reason: "how-he"
		}, {
			match: "[#QuestionWord] #Participle",
			group: 0,
			tag: "Preposition",
			reason: "when-stolen"
		}, {
			match: "[how] (#Determiner|#Copula|#Modal|#PastTense)",
			group: 0,
			tag: "QuestionWord",
			reason: "how-is"
		}, {
			match: "#Plural [(who|which|when)] .",
			group: 0,
			tag: "Preposition",
			reason: "people-who"
		}], [{
			match: "holy (shit|fuck|hell)",
			tag: "Expression",
			reason: "swears-expression"
		}, {
			match: "^[(well|so|okay|now)] !#Adjective?",
			group: 0,
			tag: "Expression",
			reason: "well-"
		}, {
			match: "^come on",
			tag: "Expression",
			reason: "come-on"
		}, {
			match: "(say|says|said) [sorry]",
			group: 0,
			tag: "Expression",
			reason: "say-sorry"
		}, {
			match: "^(ok|alright|shoot|hell|anyways)",
			tag: "Expression",
			reason: "ok-"
		}, {
			match: "^(say && @hasComma)",
			tag: "Expression",
			reason: "say-"
		}, {
			match: "^(like && @hasComma)",
			tag: "Expression",
			reason: "like-"
		}, {
			match: "^[(dude|man|girl)] #Pronoun",
			group: 0,
			tag: "Expression",
			reason: "dude-i"
		}]),
		Pc = null;
	var Ac = {
		postTagger: function(e) {
			const {
				world: t
			} = e, {
				model: n,
				methods: r
			} = t;
			Pc = Pc || r.one.buildNet(n.two.matches, t);
			let a = r.two.quickSplit(e.document).map((e => {
					let t = e[0];
					return [t.index[0], t.index[1], t.index[1] + e.length]
				})),
				o = e.update(a);
			return o.cache(), o.sweep(Pc), e.uncache(), e.unfreeze(), e
		},
		tagger: e => e.compute(["freeze", "lexicon", "preTagger", "postTagger", "unfreeze"])
	};
	const Cc = {
		api: function(e) {
			e.prototype.confidence = function() {
				let e = 0,
					t = 0;
				return this.docs.forEach((n => {
					n.forEach((n => {
						t += 1, e += n.confidence || 1
					}))
				})), 0 === t ? 1 : (e => Math.round(100 * e) / 100)(e / t)
			}, e.prototype.tagger = function() {
				return this.compute(["tagger"])
			}
		},
		compute: Ac,
		model: {
			two: {
				matches: kc
			}
		},
		hooks: ["postTagger"]
	};
	var jc = Cc,
		Nc = function(e, t) {
			let n = function(e) {
				return Object.keys(e.hooks).filter((e => !e.startsWith("#") && !e.startsWith("%")))
			}(t);
			if (0 === n.length) return e;
			e._cache || e.cache();
			let r = e._cache;
			return e.filter(((e, t) => n.some((e => r[t].has(e)))))
		},
		xc = function(e, t) {
			let n = t;
			"string" == typeof t && (n = this.buildNet([{
				match: t
			}]));
			let r = this.tokenize(e),
				a = Nc(r, n);
			return a.found ? (a.compute(["index", "tagger"]), a.match(t)) : r.none()
		},
		Ic = {
			lib: {
				lazy: xc
			}
		},
		Tc = function(e, t) {
			let n = t;
			return e.forEach((e => {
				e.has("#Infinitive") || (n = function(e, t) {
					let n = (0, e.methods.two.transform.verb.conjugate)(t, e.model);
					return e.has("#Gerund") ? n.Gerund : e.has("#PastTense") ? n.PastTense : e.has("#PresentTense") ? n.PresentTense : e.has("#Gerund") ? n.Gerund : t
				}(e, t)), e.replaceWith(n)
			})), e
		},
		Dc = function(e, t, n) {
			let r = e.split(/ /g).map((e => e.toLowerCase().trim()));
			r = r.filter((e => e)), r = r.map((e => `{${e}}`)).join(" ");
			let a = this.match(r);
			return n && (a = a.if(n)), a.has("#Verb") ? Tc(a, t) : a.has("#Noun") ? function(e, t) {
				let n = t;
				e.has("#Plural") && (n = (0, e.methods.two.transform.noun.toPlural)(t, e.model)), e.replaceWith(n, {
					possessives: !0
				})
			}(a, t) : a.has("#Adverb") ? function(e, t) {
				const {
					toAdverb: n
				} = e.methods.two.transform.adjective;
				let r = n(t);
				r && e.replaceWith(r)
			}(a, t) : a.has("#Adjective") ? function(e, t) {
				const {
					toComparative: n,
					toSuperlative: r
				} = e.methods.two.transform.adjective;
				let a = t;
				e.has("#Comparative") ? a = n(a, e.model) : e.has("#Superlative") && (a = r(a, e.model)), a && e.replaceWith(a)
			}(a, t) : this
		},
		Hc = {
			api: function(e) {
				e.prototype.swap = Dc
			}
		};
	v.plugin(Wu), v.plugin(bc), v.plugin(jc), v.plugin(Ic), v.plugin(Hc);
	const Gc = function(e) {
		const {
			fromComparative: t,
			fromSuperlative: n
		} = e.methods.two.transform.adjective;
		let r = e.text("normal");
		return e.has("#Comparative") ? t(r, e.model) : e.has("#Superlative") ? n(r, e.model) : r
	};
	var Ec = {
			api: function(e) {
				class Adjectives extends e {
					constructor(e, t, n) {
						super(e, t, n), this.viewType = "Adjectives"
					}
					json(e = {}) {
						const {
							toAdverb: t,
							toNoun: n,
							toSuperlative: r,
							toComparative: a
						} = this.methods.two.transform.adjective;
						return e.normal = !0, this.map((o => {
							let i = o.toView().json(e)[0] || {},
								s = Gc(o);
							return i.adjective = {
								adverb: t(s, this.model),
								noun: n(s, this.model),
								superlative: r(s, this.model),
								comparative: a(s, this.model)
							}, i
						}), [])
					}
					adverbs() {
						return this.before("#Adverb+$").concat(this.after("^#Adverb+"))
					}
					conjugate(e) {
						const {
							toComparative: t,
							toSuperlative: n,
							toNoun: r,
							toAdverb: a
						} = this.methods.two.transform.adjective;
						return this.getNth(e).map((e => {
							let o = Gc(e);
							return {
								Adjective: o,
								Comparative: t(o, this.model),
								Superlative: n(o, this.model),
								Noun: r(o, this.model),
								Adverb: a(o, this.model)
							}
						}), [])
					}
					toComparative(e) {
						const {
							toComparative: t
						} = this.methods.two.transform.adjective;
						return this.getNth(e).map((e => {
							let n = Gc(e),
								r = t(n, this.model);
							return e.replaceWith(r)
						}))
					}
					toSuperlative(e) {
						const {
							toSuperlative: t
						} = this.methods.two.transform.adjective;
						return this.getNth(e).map((e => {
							let n = Gc(e),
								r = t(n, this.model);
							return e.replaceWith(r)
						}))
					}
					toAdverb(e) {
						const {
							toAdverb: t
						} = this.methods.two.transform.adjective;
						return this.getNth(e).map((e => {
							let n = Gc(e),
								r = t(n, this.model);
							return e.replaceWith(r)
						}))
					}
					toNoun(e) {
						const {
							toNoun: t
						} = this.methods.two.transform.adjective;
						return this.getNth(e).map((e => {
							let n = Gc(e),
								r = t(n, this.model);
							return e.replaceWith(r)
						}))
					}
				}
				e.prototype.adjectives = function(e) {
					let t = this.match("#Adjective");
					return t = t.getNth(e), new Adjectives(t.document, t.pointer)
				}, e.prototype.superlatives = function(e) {
					let t = this.match("#Superlative");
					return t = t.getNth(e), new Adjectives(t.document, t.pointer)
				}, e.prototype.comparatives = function(e) {
					let t = this.match("#Comparative");
					return t = t.getNth(e), new Adjectives(t.document, t.pointer)
				}
			}
		},
		Oc = {
			api: function(e) {
				class Adverbs extends e {
					constructor(e, t, n) {
						super(e, t, n), this.viewType = "Adverbs"
					}
					conjugate(e) {
						return this.getNth(e).map((e => {
							let t = function(e) {
								return e.compute("root").text("root")
							}(e);
							return {
								Adverb: e.text("normal"),
								Adjective: t
							}
						}), [])
					}
					json(e = {}) {
						const t = this.methods.two.transform.adjective.fromAdverb;
						return e.normal = !0, this.map((n => {
							let r = n.toView().json(e)[0] || {};
							return r.adverb = {
								adjective: t(r.normal)
							}, r
						}), [])
					}
				}
				e.prototype.adverbs = function(e) {
					let t = this.match("#Adverb");
					return t = t.getNth(e), new Adverbs(t.document, t.pointer)
				}
			}
		},
		Fc = function(e) {
			let t = this;
			t = function(e) {
				let t = e.parentheses();
				return t = t.filter((e => e.wordCount() >= 3 && e.has("#Verb") && e.has("#Noun"))), e.splitOn(t)
			}(t), t = function(e) {
				let t = e.quotations();
				return t = t.filter((e => e.wordCount() >= 3 && e.has("#Verb") && e.has("#Noun"))), e.splitOn(t)
			}(t), t = function(e) {
				let t = e.match("@hasComma");
				return t = t.filter((e => {
					if (1 === e.growLeft(".").wordCount()) return !1;
					if (1 === e.growRight(". .").wordCount()) return !1;
					let t = e.grow(".");
					return t = t.ifNo("@hasComma @hasComma"), t = t.ifNo("@hasComma (and|or) ."), t = t.ifNo("(#City && @hasComma) #Country"), t = t.ifNo("(#WeekDay && @hasComma) #Date"), t = t.ifNo("(#Date+ && @hasComma) #Value"), t = t.ifNo("(#Adjective && @hasComma) #Adjective"), t.found
				})), e.splitAfter(t)
			}(t), t = t.splitAfter("(@hasEllipses|@hasSemicolon|@hasDash|@hasColon)"), t = t.splitAfter("^#Pronoun (said|says)"), t = t.splitBefore("(said|says) #ProperNoun$"), t = t.splitBefore(". . if .{4}"), t = t.splitBefore("and while"), t = t.splitBefore("now that"), t = t.splitBefore("ever since"), t = t.splitBefore("(supposing|although)"), t = t.splitBefore("even (while|if|though)"), t = t.splitBefore("(whereas|whose)"), t = t.splitBefore("as (though|if)"), t = t.splitBefore("(til|until)");
			let n = t.match("#Verb .* [but] .* #Verb", 0);
			n.found && (t = t.splitBefore(n));
			let r = t.if("if .{2,9} then .").match("then");
			return t = t.splitBefore(r), "number" == typeof e && (t = t.get(e)), t
		},
		Vc = function(e) {
			let t = [],
				n = null;
			return e.clauses().docs.forEach((e => {
				e.forEach((e => {
					e.chunk && e.chunk === n ? t[t.length - 1][2] = e.index[1] + 1 : (n = e.chunk, t.push([e.index[0], e.index[1], e.index[1] + 1]))
				})), n = null
			})), e.update(t)
		},
		zc = function(e) {
			class Chunks extends e {
				constructor(e, t, n) {
					super(e, t, n), this.viewType = "Chunks"
				}
				isVerb() {
					return this.filter((e => e.has("<Verb>")))
				}
				isNoun() {
					return this.filter((e => e.has("<Noun>")))
				}
				isAdjective() {
					return this.filter((e => e.has("<Adjective>")))
				}
				isPivot() {
					return this.filter((e => e.has("<Pivot>")))
				}
				debug() {
					return this.toView().debug("chunks"), this
				}
				update(e) {
					let t = new Chunks(this.document, e);
					return t._cache = this._cache, t
				}
			}
			e.prototype.chunks = function(e) {
				let t = Vc(this);
				return t = t.getNth(e), new Chunks(this.document, t.pointer)
			}, e.prototype.clauses = Fc
		};
	const Bc = {
		this: "Noun",
		then: "Pivot"
	};
	var $c = function(e) {
			for (let t = 0; t < e.length; t += 1)
				for (let n = 0; n < e[t].length; n += 1) {
					let r = e[t][n];
					!0 !== Bc.hasOwnProperty(r.normal) ? r.tags.has("Verb") ? r.chunk = "Verb" : r.tags.has("Noun") || r.tags.has("Determiner") || r.tags.has("Value") ? r.chunk = "Noun" : r.tags.has("QuestionWord") && (r.chunk = "Pivot") : r.chunk = Bc[r.normal]
				}
		},
		Sc = function(e) {
			for (let t = 0; t < e.length; t += 1)
				for (let n = 0; n < e[t].length; n += 1) {
					let r = e[t][n];
					if (r.chunk) continue;
					let a = e[t][n + 1],
						o = e[t][n - 1];
					if (r.tags.has("Adjective")) {
						if (o && o.tags.has("Copula")) {
							r.chunk = "Adjective";
							continue
						}
						if (o && o.tags.has("Determiner")) {
							r.chunk = "Noun";
							continue
						}
						if (a && a.tags.has("Noun")) {
							r.chunk = "Noun";
							continue
						}
					} else if (r.tags.has("Adverb") || r.tags.has("Negative")) {
						if (o && o.tags.has("Adjective")) {
							r.chunk = "Adjective";
							continue
						}
						if (o && o.tags.has("Verb")) {
							r.chunk = "Verb";
							continue
						}
						if (a && a.tags.has("Adjective")) {
							r.chunk = "Adjective";
							continue
						}
						if (a && a.tags.has("Verb")) {
							r.chunk = "Verb";
							continue
						}
					}
				}
		};
	const Kc = [{
		match: "[that] #Determiner #Noun",
		group: 0,
		chunk: "Pivot"
	}, {
		match: "#PastTense [that]",
		group: 0,
		chunk: "Pivot"
	}, {
		match: "[so] #Determiner",
		group: 0,
		chunk: "Pivot"
	}, {
		match: "#Copula #Adverb+? [#Adjective]",
		group: 0,
		chunk: "Adjective"
	}, {
		match: "#Adjective and #Adjective",
		chunk: "Adjective"
	}, {
		match: "#Adverb+ and #Adverb #Verb",
		chunk: "Verb"
	}, {
		match: "#Gerund #Adjective$",
		chunk: "Verb"
	}, {
		match: "#Gerund to #Verb",
		chunk: "Verb"
	}, {
		match: "#PresentTense and #PresentTense",
		chunk: "Verb"
	}, {
		match: "#Adverb #Negative",
		chunk: "Verb"
	}, {
		match: "(want|wants|wanted) to #Infinitive",
		chunk: "Verb"
	}, {
		match: "#Verb #Reflexive",
		chunk: "Verb"
	}, {
		match: "#Verb [to] #Adverb? #Infinitive",
		group: 0,
		chunk: "Verb"
	}, {
		match: "[#Preposition] #Gerund",
		group: 0,
		chunk: "Verb"
	}, {
		match: "#Infinitive [that] <Noun>",
		group: 0,
		chunk: "Verb"
	}, {
		match: "#Noun of #Determiner? #Noun",
		chunk: "Noun"
	}, {
		match: "#Value+ #Adverb? #Adjective",
		chunk: "Noun"
	}, {
		match: "the [#Adjective] #Noun",
		chunk: "Noun"
	}, {
		match: "#Singular in #Determiner? #Singular",
		chunk: "Noun"
	}, {
		match: "#Plural [in] #Determiner? #Noun",
		group: 0,
		chunk: "Pivot"
	}, {
		match: "#Noun and #Determiner? #Noun",
		notIf: "(#Possessive|#Pronoun)",
		chunk: "Noun"
	}];
	let Mc = null;
	var Lc = function(e, t, n) {
		const {
			methods: r
		} = n;
		Mc = Mc || r.one.buildNet(Kc, n), e.sweep(Mc)
	};
	const Jc = function(e, t) {
		if (("undefined" != typeof process && process.env ? process.env : self.env || {}).DEBUG_CHUNKS) {
			let n = (e.normal + "'").padEnd(8);
			console.log(`  | '${n}  →  [34m${t.padEnd(12)}[0m [2m -fallback- [0m`)
		}
		e.chunk = t
	};
	var Wc = function(e) {
			for (let t = 0; t < e.length; t += 1)
				for (let n = 0; n < e[t].length; n += 1) {
					let r = e[t][n];
					void 0 === r.chunk && (r.tags.has("Conjunction") || r.tags.has("Preposition") ? Jc(r, "Pivot") : r.tags.has("Adverb") ? Jc(r, "Verb") : r.chunk = "Noun")
				}
		},
		qc = function(e) {
			let t = [],
				n = null;
			e.forEach((e => {
				for (let r = 0; r < e.length; r += 1) {
					let a = e[r];
					n && a.chunk === n ? t[t.length - 1].terms.push(a) : (t.push({
						chunk: a.chunk,
						terms: [a]
					}), n = a.chunk)
				}
			})), t.forEach((e => {
				if ("Verb" === e.chunk) {
					const t = e.terms.find((e => e.tags.has("Verb")));
					t || e.terms.forEach((e => e.chunk = null))
				}
			}))
		},
		Uc = {
			chunks: function(e) {
				const {
					document: t,
					world: n
				} = e;
				$c(t), Sc(t), Lc(e, t, n), Wc(t), qc(t)
			}
		},
		Rc = {
			compute: Uc,
			api: zc,
			hooks: ["chunks"]
		};
	const Qc = /\./g;
	var _c = function(e) {
		class Acronyms extends e {
			constructor(e, t, n) {
				super(e, t, n), this.viewType = "Acronyms"
			}
			strip() {
				return this.docs.forEach((e => {
					e.forEach((e => {
						e.text = e.text.replace(Qc, ""), e.normal = e.normal.replace(Qc, "")
					}))
				})), this
			}
			addPeriods() {
				return this.docs.forEach((e => {
					e.forEach((e => {
						e.text = e.text.replace(Qc, ""), e.normal = e.normal.replace(Qc, ""), e.text = e.text.split("").join(".") + ".", e.normal = e.normal.split("").join(".") + "."
					}))
				})), this
			}
		}
		e.prototype.acronyms = function(e) {
			let t = this.match("#Acronym");
			return t = t.getNth(e), new Acronyms(t.document, t.pointer)
		}
	};
	const Zc = /\(/,
		Xc = /\)/,
		Yc = function(e, t) {
			for (; t < e.length; t += 1)
				if (e[t].post && Xc.test(e[t].post)) {
					let [, n] = e[t].index;
					return n = n || 0, n
				} return null
		};
	var eh = function(e) {
		class Parentheses extends e {
			constructor(e, t, n) {
				super(e, t, n), this.viewType = "Possessives"
			}
			strip() {
				return function(e) {
					return e.docs.forEach((e => {
						e[0].pre = e[0].pre.replace(Zc, "");
						let t = e[e.length - 1];
						t.post = t.post.replace(Xc, "")
					})), e
				}(this)
			}
		}
		e.prototype.parentheses = function(e) {
			let t = function(e) {
				let t = [];
				return e.docs.forEach((e => {
					for (let n = 0; n < e.length; n += 1) {
						let r = e[n];
						if (r.pre && Zc.test(r.pre)) {
							let r = Yc(e, n);
							if (null !== r) {
								let [a, o] = e[n].index;
								t.push([a, o, r + 1, e[n].id]), n = r
							}
						}
					}
				})), e.update(t)
			}(this);
			return t = t.getNth(e), new Parentheses(t.document, t.pointer)
		}
	};
	const th = /'s$/;
	var nh = function(e) {
		class Possessives extends e {
			constructor(e, t, n) {
				super(e, t, n), this.viewType = "Possessives"
			}
			strip() {
				return this.docs.forEach((e => {
					e.forEach((e => {
						e.text = e.text.replace(th, ""), e.normal = e.normal.replace(th, "")
					}))
				})), this
			}
		}
		e.prototype.possessives = function(e) {
			let t = function(e) {
				let t = e.match("#Possessive+");
				return t.has("#Person") && (t = t.growLeft("#Person+")), t.has("#Place") && (t = t.growLeft("#Place+")), t.has("#Organization") && (t = t.growLeft("#Organization+")), t
			}(this);
			return t = t.getNth(e), new Possessives(t.document, t.pointer)
		}
	};
	const rh = {
			'"': '"',
			"＂": "＂",
			"'": "'",
			"“": "”",
			"‘": "’",
			"‟": "”",
			"‛": "’",
			"„": "”",
			"⹂": "”",
			"‚": "’",
			"«": "»",
			"‹": "›",
			"‵": "′",
			"‶": "″",
			"‷": "‴",
			"〝": "〞",
			"`": "´",
			"〟": "〞"
		},
		ah = RegExp("[" + Object.keys(rh).join("") + "]"),
		oh = RegExp("[" + Object.values(rh).join("") + "]"),
		ih = function(e, t) {
			const n = e[t].pre.match(ah)[0] || "";
			if (!n || !rh[n]) return null;
			const r = rh[n];
			for (; t < e.length; t += 1)
				if (e[t].post && e[t].post.match(r)) return t;
			return null
		};
	var sh = function(e) {
		class Quotations extends e {
			constructor(e, t, n) {
				super(e, t, n), this.viewType = "Possessives"
			}
			strip() {
				return function(e) {
					e.docs.forEach((e => {
						e[0].pre = e[0].pre.replace(ah, "");
						let t = e[e.length - 1];
						t.post = t.post.replace(oh, "")
					}))
				}(this)
			}
		}
		e.prototype.quotations = function(e) {
			let t = function(e) {
				let t = [];
				return e.docs.forEach((e => {
					for (let n = 0; n < e.length; n += 1) {
						let r = e[n];
						if (r.pre && ah.test(r.pre)) {
							let r = ih(e, n);
							if (null !== r) {
								let [a, o] = e[n].index;
								t.push([a, o, r + 1, e[n].id]), n = r
							}
						}
					}
				})), e.update(t)
			}(this);
			return t = t.getNth(e), new Quotations(t.document, t.pointer)
		}
	};
	const lh = function(e) {
			let t = this.splitAfter("@hasComma");
			return t = t.match("#PhoneNumber+"), t = t.getNth(e), t
		},
		uh = [
			["hyphenated", "@hasHyphen ."],
			["hashTags", "#HashTag"],
			["emails", "#Email"],
			["emoji", "#Emoji"],
			["emoticons", "#Emoticon"],
			["atMentions", "#AtMention"],
			["urls", "#Url"],
			["conjunctions", "#Conjunction"],
			["prepositions", "#Preposition"],
			["abbreviations", "#Abbreviation"],
			["honorifics", "#Honorific"]
		];
	let ch = [
		["emojis", "emoji"],
		["atmentions", "atMentions"]
	];
	var hh = function(e) {
			uh.forEach((t => {
				e.prototype[t[0]] = function(e) {
					let n = this.match(t[1]);
					return "number" == typeof e ? n.get(e) : n
				}
			})), e.prototype.phoneNumbers = lh, ch.forEach((t => {
				e.prototype[t[0]] = e.prototype[t[1]]
			}))
		},
		dh = {
			api: function(e) {
				_c(e), eh(e), nh(e), sh(e), hh(e)
			}
		};
	const gh = function(e, t) {
		e.docs.forEach((e => {
			e.forEach(t)
		}))
	};
	var mh = {
		case: e => {
			gh(e, (e => {
				e.text = e.text.toLowerCase()
			}))
		},
		unicode: e => {
			const t = e.world,
				n = t.methods.one.killUnicode;
			gh(e, (e => e.text = n(e.text, t)))
		},
		whitespace: e => {
			gh(e, (e => {
				e.post = e.post.replace(/\s+/g, " "), e.post = e.post.replace(/\s([.,?!:;])/g, "$1"), e.pre = e.pre.replace(/\s+/g, "")
			}))
		},
		punctuation: e => {
			gh(e, (e => {
				e.post = e.post.replace(/[–—-]/g, " "), e.post = e.post.replace(/[,:;]/g, ""), e.post = e.post.replace(/\.{2,}/g, ""), e.post = e.post.replace(/\?{2,}/g, "?"), e.post = e.post.replace(/!{2,}/g, "!"), e.post = e.post.replace(/\?!+/g, "?")
			}));
			let t = e.docs,
				n = t[t.length - 1];
			if (n && n.length > 0) {
				let e = n[n.length - 1];
				e.post = e.post.replace(/ /g, "")
			}
		},
		contractions: e => {
			e.contractions().expand()
		},
		acronyms: e => {
			e.acronyms().strip()
		},
		parentheses: e => {
			e.parentheses().strip()
		},
		possessives: e => {
			e.possessives().strip()
		},
		quotations: e => {
			e.quotations().strip()
		},
		emoji: e => {
			e.emojis().remove()
		},
		honorifics: e => {
			e.match("#Honorific+ #Person").honorifics().remove()
		},
		adverbs: e => {
			e.adverbs().remove()
		},
		nouns: e => {
			e.nouns().toSingular()
		},
		verbs: e => {
			e.verbs().toInfinitive()
		},
		numbers: e => {
			e.numbers().toNumber()
		},
		debullet: e => {
			const t = /^\s*([-–—*•])\s*$/;
			return e.docs.forEach((e => {
				t.test(e[0].pre) && (e[0].pre = e[0].pre.replace(t, ""))
			})), e
		}
	};
	const ph = e => e.split("|").reduce(((e, t) => (e[t] = !0, e)), {}),
		fh = "unicode|punctuation|whitespace|acronyms",
		vh = "|case|contractions|parentheses|quotations|emoji|honorifics|debullet",
		bh = {
			light: ph(fh),
			medium: ph(fh + vh),
			heavy: ph(fh + vh + "|possessives|adverbs|nouns|verbs")
		};
	var yh = {
			api: function(e) {
				e.prototype.normalize = function(e = "light") {
					return "string" == typeof e && (e = bh[e]), Object.keys(e).forEach((t => {
						mh.hasOwnProperty(t) && mh[t](this, e[t])
					})), this
				}
			}
		},
		wh = function(e) {
			let t = e.clauses().match("<Noun>"),
				n = t.match("@hasComma");
			return n = n.not("#Place"), n.found && (t = t.splitAfter(n)), t = t.splitOn("#Expression"), t = t.splitOn("(he|she|we|you|they|i)"), t = t.splitOn("(#Noun|#Adjective) [(he|him|she|it)]", 0), t = t.splitOn("[(he|him|she|it)] (#Determiner|#Value)", 0), t = t.splitBefore("#Noun [(the|a|an)] #Adjective? #Noun", 0), t = t.splitOn("[(here|there)] #Noun", 0), t = t.splitOn("[#Noun] (here|there)", 0), t = t.splitBefore("(our|my|their|your)"), t = t.splitOn("#Noun [#Determiner]", 0), t = t.if("#Noun"), t
		};
	const kh = ["after", "although", "as if", "as long as", "as", "because", "before", "even if", "even though", "ever since", "if", "in order that", "provided that", "since", "so that", "than", "that", "though", "unless", "until", "what", "whatever", "when", "whenever", "where", "whereas", "wherever", "whether", "which", "whichever", "who", "whoever", "whom", "whomever", "whose"];
	var Ph = function(e) {
			if (e.before("#Preposition$").found) return !0;
			if (!e.before().found) return !1;
			for (let t = 0; t < kh.length; t += 1)
				if (e.has(kh[t])) return !0;
			return !1
		},
		Ah = function(e, t) {
			if (e.has("#Plural")) return !0;
			if (e.has("#Noun and #Noun")) return !0;
			if (e.has("(we|they)")) return !0;
			if (!0 === t.has("(#Pronoun|#Place|#Value|#Person|#Uncountable|#Month|#WeekDay|#Holiday|#Possessive)")) return !1;
			if (e.has("#Singular")) return !1;
			let n = t.text("normal");
			return n.length > 3 && n.endsWith("s") && !n.endsWith("ss")
		},
		Ch = function(e) {
			let t = function(e) {
				let t = e.clone();
				return t = t.match("#Noun+"), t = t.remove("(#Adjective|#Preposition|#Determiner|#Value)"), t = t.not("#Possessive"), t = t.first(), t.found ? t : e
			}(e);
			return {
				determiner: e.match("#Determiner").eq(0),
				adjectives: e.match("#Adjective"),
				number: e.values(),
				isPlural: Ah(e, t),
				isSubordinate: Ph(e),
				root: t
			}
		};
	const jh = e => e.text(),
		Nh = e => e.json({
			terms: !1,
			normal: !0
		}).map((e => e.normal)),
		xh = function(e) {
			if (!e.found) return null;
			let t = e.values(0);
			return t.found ? (t.parse()[0] || {}).num : null
		};
	var Ih = function(e) {
			let t = Ch(e);
			return {
				root: jh(t.root),
				number: xh(t.number),
				determiner: jh(t.determiner),
				adjectives: Nh(t.adjectives),
				isPlural: t.isPlural,
				isSubordinate: t.isSubordinate
			}
		},
		Th = function(e) {
			return !e.has("^(#Uncountable|#ProperNoun|#Place|#Pronoun|#Acronym)+$")
		};
	const Dh = {
		tags: !0
	};
	var Hh = function(e, t) {
		if (!0 === t.isPlural) return e;
		if (t.root.has("#Possessive") && (t.root = t.root.possessives().strip()), !Th(t.root)) return e;
		const {
			methods: n,
			model: r
		} = e.world, {
			toPlural: a
		} = n.two.transform.noun;
		let o = a(t.root.text({
			keepPunct: !1
		}), r);
		e.match(t.root).replaceWith(o, Dh).tag("Plural", "toPlural"), t.determiner.has("(a|an)") && e.remove(t.determiner);
		let i = t.root.after("not? #Adverb+? [#Copula]", 0);
		return i.found && (i.has("is") ? e.replace(i, "are") : i.has("was") && e.replace(i, "were")), e
	};
	const Gh = {
		tags: !0
	};
	var Eh = function(e, t) {
			if (!1 === t.isPlural) return e;
			const {
				methods: n,
				model: r
			} = e.world, {
				toSingular: a
			} = n.two.transform.noun;
			let o = a(t.root.text("normal"), r);
			return e.replace(t.root, o, Gh).tag("Singular", "toPlural"), e
		},
		Oh = function(e) {
			class Nouns extends e {
				constructor(e, t, n) {
					super(e, t, n), this.viewType = "Nouns"
				}
				parse(e) {
					return this.getNth(e).map(Ch)
				}
				json(e) {
					let t = "object" == typeof e ? e : {};
					return this.getNth(e).map((e => {
						let n = e.toView().json(t)[0] || {};
						return t && !1 !== t.noun && (n.noun = Ih(e)), n
					}), [])
				}
				conjugate(e) {
					const t = this.world.methods.two.transform.noun;
					return this.getNth(e).map((e => {
						let n = Ch(e),
							r = n.root.compute("root").text("root"),
							a = {
								Singular: r
							};
						return Th(n.root) && (a.Plural = t.toPlural(r, this.model)), a.Singular === a.Plural && delete a.Plural, a
					}), [])
				}
				isPlural(e) {
					let t = this.filter((e => Ch(e).isPlural));
					return t.getNth(e)
				}
				isSingular(e) {
					let t = this.filter((e => !Ch(e).isPlural));
					return t.getNth(e)
				}
				adjectives(e) {
					let t = this.update([]);
					return this.forEach((e => {
						let n = Ch(e).adjectives;
						n.found && (t = t.concat(n))
					})), t.getNth(e)
				}
				toPlural(e) {
					return this.getNth(e).map((e => Hh(e, Ch(e))))
				}
				toSingular(e) {
					return this.getNth(e).map((e => {
						let t = Ch(e);
						return Eh(e, t)
					}))
				}
				update(e) {
					let t = new Nouns(this.document, e);
					return t._cache = this._cache, t
				}
			}
			e.prototype.nouns = function(e) {
				let t = wh(this);
				return t = t.getNth(e), new Nouns(this.document, t.pointer)
			}
		},
		Fh = {
			api: Oh
		},
		Vh = function(e, t) {
			let n = e.match("#Fraction+");
			return n = n.filter((e => !e.lookBehind("#Value and$").found)), n = n.notIf("#Value seconds"), "number" == typeof t && (n = n.eq(t)), n
		},
		zh = e => {
			const t = [{
				reg: /^(minus|negative)[\s-]/i,
				mult: -1
			}, {
				reg: /^(a\s)?half[\s-](of\s)?/i,
				mult: .5
			}];
			for (let n = 0; n < t.length; n++)
				if (!0 === t[n].reg.test(e)) return {
					amount: t[n].mult,
					str: e.replace(t[n].reg, "")
				};
			return {
				amount: 1,
				str: e
			}
		},
		Bh = {
			ones: {
				zeroth: 0,
				first: 1,
				second: 2,
				third: 3,
				fourth: 4,
				fifth: 5,
				sixth: 6,
				seventh: 7,
				eighth: 8,
				ninth: 9,
				zero: 0,
				one: 1,
				two: 2,
				three: 3,
				four: 4,
				five: 5,
				six: 6,
				seven: 7,
				eight: 8,
				nine: 9
			},
			teens: {
				tenth: 10,
				eleventh: 11,
				twelfth: 12,
				thirteenth: 13,
				fourteenth: 14,
				fifteenth: 15,
				sixteenth: 16,
				seventeenth: 17,
				eighteenth: 18,
				nineteenth: 19,
				ten: 10,
				eleven: 11,
				twelve: 12,
				thirteen: 13,
				fourteen: 14,
				fifteen: 15,
				sixteen: 16,
				seventeen: 17,
				eighteen: 18,
				nineteen: 19
			},
			tens: {
				twentieth: 20,
				thirtieth: 30,
				fortieth: 40,
				fourtieth: 40,
				fiftieth: 50,
				sixtieth: 60,
				seventieth: 70,
				eightieth: 80,
				ninetieth: 90,
				twenty: 20,
				thirty: 30,
				forty: 40,
				fourty: 40,
				fifty: 50,
				sixty: 60,
				seventy: 70,
				eighty: 80,
				ninety: 90
			},
			multiples: {
				hundredth: 100,
				thousandth: 1e3,
				millionth: 1e6,
				billionth: 1e9,
				trillionth: 1e12,
				quadrillionth: 1e15,
				quintillionth: 1e18,
				sextillionth: 1e21,
				septillionth: 1e24,
				hundred: 100,
				thousand: 1e3,
				million: 1e6,
				billion: 1e9,
				trillion: 1e12,
				quadrillion: 1e15,
				quintillion: 1e18,
				sextillion: 1e21,
				septillion: 1e24,
				grand: 1e3
			}
		},
		$h = (e, t) => {
			if (Bh.ones.hasOwnProperty(e)) {
				if (t.ones || t.teens) return !1
			} else if (Bh.teens.hasOwnProperty(e)) {
				if (t.ones || t.teens || t.tens) return !1
			} else if (Bh.tens.hasOwnProperty(e) && (t.ones || t.teens || t.tens)) return !1;
			return !0
		},
		Sh = function(e) {
			let t = "0.";
			for (let n = 0; n < e.length; n++) {
				let r = e[n];
				if (!0 === Bh.ones.hasOwnProperty(r)) t += Bh.ones[r];
				else if (!0 === Bh.teens.hasOwnProperty(r)) t += Bh.teens[r];
				else if (!0 === Bh.tens.hasOwnProperty(r)) t += Bh.tens[r];
				else {
					if (!0 !== /^[0-9]$/.test(r)) return 0;
					t += r
				}
			}
			return parseFloat(t)
		},
		Kh = e => e = (e = (e = (e = (e = (e = (e = (e = e.replace(/1st$/, "1")).replace(/2nd$/, "2")).replace(/3rd$/, "3")).replace(/([4567890])r?th$/, "$1")).replace(/^[$€¥£¢]/, "")).replace(/[%$€¥£¢]$/, "")).replace(/,/g, "")).replace(/([0-9])([a-z\u00C0-\u00FF]{1,2})$/, "$1");
	const Mh = /^([0-9,. ]+)\/([0-9,. ]+)$/,
		Lh = {
			"a few": 3,
			"a couple": 2,
			"a dozen": 12,
			"two dozen": 24,
			zero: 0
		},
		Jh = e => Object.keys(e).reduce(((t, n) => t += e[n]), 0);
	var Wh = function(e) {
		if (!0 === Lh.hasOwnProperty(e)) return Lh[e];
		if ("a" === e || "an" === e) return 1;
		const t = zh(e);
		let n = null,
			r = {},
			a = 0,
			o = !1;
		const i = (e = t.str).split(/[ -]/);
		for (let e = 0; e < i.length; e++) {
			let s = i[e];
			if (s = Kh(s), !s || "and" === s) continue;
			if ("-" === s || "negative" === s) {
				o = !0;
				continue
			}
			if ("-" === s.charAt(0) && (o = !0, s = s.substring(1)), "point" === s) return a += Jh(r), a += Sh(i.slice(e + 1, i.length)), a *= t.amount, a;
			const l = s.match(Mh);
			if (l) {
				const e = parseFloat(l[1].replace(/[, ]/g, "")),
					t = parseFloat(l[2].replace(/[, ]/g, ""));
				t && (a += e / t || 0)
			} else {
				if (Bh.tens.hasOwnProperty(s) && r.ones && 1 === Object.keys(r).length && (a = 100 * r.ones, r = {}), !1 === $h(s, r)) return null;
				if (/^[0-9.]+$/.test(s)) r.ones = parseFloat(s);
				else if (!0 === Bh.ones.hasOwnProperty(s)) r.ones = Bh.ones[s];
				else if (!0 === Bh.teens.hasOwnProperty(s)) r.teens = Bh.teens[s];
				else if (!0 === Bh.tens.hasOwnProperty(s)) r.tens = Bh.tens[s];
				else if (!0 === Bh.multiples.hasOwnProperty(s)) {
					let t = Bh.multiples[s];
					if (t === n) return null;
					if (100 === t && void 0 !== i[e + 1]) {
						const n = i[e + 1];
						Bh.multiples[n] && (t *= Bh.multiples[n], e += 1)
					}
					null === n || t < n ? (a += (Jh(r) || 1) * t, n = t, r = {}) : (a += Jh(r), n = t, a = (a || 1) * t, r = {})
				}
			}
		}
		return a += Jh(r), a *= t.amount, a *= o ? -1 : 1, 0 === a && 0 === Object.keys(r).length ? null : a
	};
	const qh = /s$/,
		Uh = function(e) {
			let t = e.text("reduced");
			return Wh(t)
		};
	let Rh = {
		half: 2,
		halve: 2,
		quarter: 4
	};
	var Qh = function(e) {
			let t = function(e) {
				let t = e.text("reduced");
				return Rh.hasOwnProperty(t) ? {
					numerator: 1,
					denominator: Rh[t]
				} : null
			}(e = e.clone()) || function(e) {
				let t = e.text("reduced").match(/^([-+]?[0-9]+)\/([-+]?[0-9]+)(st|nd|rd|th)?s?$/);
				return t && t[1] && t[0] ? {
					numerator: Number(t[1]),
					denominator: Number(t[2])
				} : null
			}(e) || function(e) {
				let t = e.match("[<num>#Value+] out of every? [<den>#Value+]");
				if (!0 !== t.found) return null;
				let {
					num: n,
					den: r
				} = t.groups();
				return n && r ? (n = Uh(n), r = Uh(r), n && r && "number" == typeof n && "number" == typeof r ? {
					numerator: n,
					denominator: r
				} : null) : null
			}(e) || function(e) {
				let t = e.match("[<num>(#Cardinal|a)+] [<den>#Fraction+]");
				if (!0 !== t.found) return null;
				let {
					num: n,
					den: r
				} = t.groups();
				n = n.has("a") ? 1 : Uh(n);
				let a = r.text("reduced");
				return qh.test(a) && (a = a.replace(qh, ""), r = r.replaceWith(a)), r = Rh.hasOwnProperty(a) ? Rh[a] : Uh(r), "number" == typeof n && "number" == typeof r ? {
					numerator: n,
					denominator: r
				} : null
			}(e) || function(e) {
				let t = e.match("^#Ordinal$");
				return !0 !== t.found ? null : e.lookAhead("^of .") ? {
					numerator: 1,
					denominator: Uh(t)
				} : null
			}(e) || null;
			return null !== t && t.numerator && t.denominator && (t.decimal = t.numerator / t.denominator, t.decimal = (e => {
				let t = Math.round(1e3 * e) / 1e3;
				return 0 === t && 0 !== e ? e : t
			})(t.decimal)), t
		},
		_h = function(e) {
			if (e < 1e6) return String(e);
			let t;
			return t = "number" == typeof e ? e.toFixed(0) : e, -1 === t.indexOf("e+") ? t : t.replace(".", "").split("e+").reduce((function(e, t) {
				return e + Array(t - e.length + 2).join(0)
			}))
		};
	const Zh = [
			["ninety", 90],
			["eighty", 80],
			["seventy", 70],
			["sixty", 60],
			["fifty", 50],
			["forty", 40],
			["thirty", 30],
			["twenty", 20]
		],
		Xh = ["", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"],
		Yh = [
			[1e24, "septillion"],
			[1e20, "hundred sextillion"],
			[1e21, "sextillion"],
			[1e20, "hundred quintillion"],
			[1e18, "quintillion"],
			[1e17, "hundred quadrillion"],
			[1e15, "quadrillion"],
			[1e14, "hundred trillion"],
			[1e12, "trillion"],
			[1e11, "hundred billion"],
			[1e9, "billion"],
			[1e8, "hundred million"],
			[1e6, "million"],
			[1e5, "hundred thousand"],
			[1e3, "thousand"],
			[100, "hundred"],
			[1, "one"]
		],
		ed = function(e) {
			let t = [];
			if (e > 100) return t;
			for (let n = 0; n < Zh.length; n++) e >= Zh[n][1] && (e -= Zh[n][1], t.push(Zh[n][0]));
			return Xh[e] && t.push(Xh[e]), t
		};
	var td = function(e) {
			let t = e.num;
			if (0 === t || "0" === t) return "zero";
			t > 1e21 && (t = _h(t));
			let n = [];
			t < 0 && (n.push("minus"), t = Math.abs(t));
			let r = function(e) {
				let t = e,
					n = [];
				return Yh.forEach((r => {
					if (e >= r[0]) {
						let e = Math.floor(t / r[0]);
						t -= e * r[0], e && n.push({
							unit: r[1],
							count: e
						})
					}
				})), n
			}(t);
			for (let e = 0; e < r.length; e++) {
				let t = r[e].unit;
				"one" === t && (t = "", n.length > 1 && n.push("and")), n = n.concat(ed(r[e].count)), n.push(t)
			}
			return n = n.concat((e => {
				const t = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
				let n = [],
					r = _h(e).match(/\.([0-9]+)/);
				if (!r || !r[0]) return n;
				n.push("point");
				let a = r[0].split("");
				for (let e = 0; e < a.length; e++) n.push(t[a[e]]);
				return n
			})(t)), n = n.filter((e => e)), 0 === n.length && (n[0] = ""), n.join(" ")
		},
		nd = function(e) {
			return e.numerator && e.denominator ? `${td({num:e.numerator})} out of ${td({num:e.denominator})}` : ""
		};
	const rd = {
		one: "first",
		two: "second",
		three: "third",
		five: "fifth",
		eight: "eighth",
		nine: "ninth",
		twelve: "twelfth",
		twenty: "twentieth",
		thirty: "thirtieth",
		forty: "fortieth",
		fourty: "fourtieth",
		fifty: "fiftieth",
		sixty: "sixtieth",
		seventy: "seventieth",
		eighty: "eightieth",
		ninety: "ninetieth"
	};
	var ad = e => {
			let t = td(e).split(" "),
				n = t[t.length - 1];
			return rd.hasOwnProperty(n) ? t[t.length - 1] = rd[n] : t[t.length - 1] = n.replace(/y$/, "i") + "th", t.join(" ")
		},
		od = function(e) {
			if (!e.numerator || !e.denominator) return "";
			let t = td({
					num: e.numerator
				}),
				n = ad({
					num: e.denominator
				});
			return 2 === e.denominator && (n = "half"), t && n ? (1 !== e.numerator && (n += "s"), `${t} ${n}`) : ""
		},
		id = function(e) {
			class Fractions extends e {
				constructor(e, t, n) {
					super(e, t, n), this.viewType = "Fractions"
				}
				parse(e) {
					return this.getNth(e).map(Qh)
				}
				get(e) {
					return this.getNth(e).map(Qh)
				}
				json(e) {
					return this.getNth(e).map((t => {
						let n = t.toView().json(e)[0],
							r = Qh(t);
						return n.fraction = r, n
					}), [])
				}
				toDecimal(e) {
					return this.getNth(e).forEach((e => {
						let {
							decimal: t
						} = Qh(e);
						(e = e.replaceWith(String(t), !0)).tag("NumericValue"), e.unTag("Fraction")
					})), this
				}
				toFraction(e) {
					return this.getNth(e).forEach((e => {
						let t = Qh(e);
						if (t && "number" == typeof t.numerator && "number" == typeof t.denominator) {
							let n = `${t.numerator}/${t.denominator}`;
							this.replace(e, n)
						}
					})), this
				}
				toOrdinal(e) {
					return this.getNth(e).forEach((e => {
						let t = Qh(e),
							n = od(t);
						e.after("^#Noun").found && (n += " of"), e.replaceWith(n)
					})), this
				}
				toCardinal(e) {
					return this.getNth(e).forEach((e => {
						let t = Qh(e),
							n = nd(t);
						e.replaceWith(n)
					})), this
				}
				toPercentage(e) {
					return this.getNth(e).forEach((e => {
						let {
							decimal: t
						} = Qh(e), n = 100 * t;
						n = Math.round(100 * n) / 100, e.replaceWith(`${n}%`)
					})), this
				}
			}
			e.prototype.fractions = function(e) {
				let t = Vh(this);
				return t = t.getNth(e), new Fractions(this.document, t.pointer)
			}
		};
	const sd = "twenty|thirty|forty|fifty|sixty|seventy|eighty|ninety|fourty";
	var ld = function(e) {
			let t = e.match("#Value+");
			if (t.has("#NumericValue #NumericValue") && (t.has("#Value @hasComma #Value") ? t.splitAfter("@hasComma") : t.has("#NumericValue #Fraction") ? t.splitAfter("#NumericValue #Fraction") : t = t.splitAfter("#NumericValue")), t.has("#Value #Value #Value") && !t.has("#Multiple") && t.has("(" + sd + ") #Cardinal #Cardinal") && (t = t.splitAfter("(" + sd + ") #Cardinal")), t.has("#Value #Value")) {
				t.has("#NumericValue #NumericValue") && (t = t.splitOn("#Year")), t.has("(" + sd + ") (eleven|twelve|thirteen|fourteen|fifteen|sixteen|seventeen|eighteen|nineteen)") && (t = t.splitAfter("(" + sd + ")"));
				let e = t.match("#Cardinal #Cardinal");
				if (e.found && !t.has("(point|decimal|#Fraction)") && !e.has("#Cardinal (#Multiple|point|decimal)")) {
					let n = t.has(`(one|two|three|four|five|six|seven|eight|nine) (${sd})`),
						r = e.has("(" + sd + ") #Cardinal"),
						a = e.has("#Multiple #Value");
					n || r || a || e.terms().forEach((e => {
						t = t.splitOn(e)
					}))
				}
				t.match("#Ordinal #Ordinal").match("#TextValue").found && !t.has("#Multiple") && (t.has("(" + sd + ") #Ordinal") || (t = t.splitAfter("#Ordinal"))), t = t.splitBefore("#Ordinal [#Cardinal]", 0), t.has("#TextValue #NumericValue") && !t.has("(" + sd + "|#Multiple)") && (t = t.splitBefore("#TextValue #NumericValue"))
			}
			return t = t.splitAfter("#NumberRange"), t = t.splitBefore("#Year"), t
		},
		ud = function(e) {
			if ("string" == typeof e) return {
				num: Wh(e)
			};
			let t = e.text("reduced"),
				n = e.growRight("#Unit").match("#Unit$").text("machine"),
				r = /[0-9],[0-9]/.test(e.text("text"));
			if (1 === e.terms().length && !e.has("#Multiple")) {
				let a = function(e, t) {
					let n = (e = e.replace(/,/g, "")).split(/([0-9.,]*)/),
						[r, a] = n,
						o = n.slice(2).join("");
					return "" !== a && t.length < 2 ? (a = Number(a || e), "number" != typeof a && (a = null), o = o || "", "st" !== o && "nd" !== o && "rd" !== o && "th" !== o || (o = ""), {
						prefix: r || "",
						num: a,
						suffix: o
					}) : null
				}(t, e);
				if (null !== a) return a.hasComma = r, a.unit = n, a
			}
			let a = e.match("#Fraction{2,}$");
			a = !1 === a.found ? e.match("^#Fraction$") : a;
			let o = null;
			a.found && (a.has("#Value and #Value #Fraction") && (a = a.match("and #Value #Fraction")), o = Qh(a), t = (e = (e = e.not(a)).not("and$")).text("reduced"));
			let i = 0;
			return t && (i = Wh(t) || 0), o && o.decimal && (i += o.decimal), {
				hasComma: r,
				prefix: "",
				num: i,
				suffix: "",
				isOrdinal: e.has("#Ordinal"),
				isText: e.has("#TextValue"),
				isFraction: e.has("#Fraction"),
				isMoney: e.has("#Money"),
				unit: n
			}
		},
		cd = function(e) {
			let t = e.num;
			if (!t && 0 !== t) return null;
			let n = t % 100;
			if (n > 10 && n < 20) return String(t) + "th";
			const r = {
				0: "th",
				1: "st",
				2: "nd",
				3: "rd"
			};
			let a = _h(t),
				o = a.slice(a.length - 1, a.length);
			return a += r[o] ? r[o] : "th", a
		};
	const hd = {
			"¢": "cents",
			$: "dollars",
			"£": "pounds",
			"¥": "yen",
			"€": "euros",
			"₡": "colón",
			"฿": "baht",
			"₭": "kip",
			"₩": "won",
			"₹": "rupees",
			"₽": "ruble",
			"₺": "liras"
		},
		dd = {
			"%": "percent",
			"°": "degrees"
		};
	var gd = function(e) {
			let t = {
				suffix: "",
				prefix: e.prefix
			};
			return hd.hasOwnProperty(e.prefix) && (t.suffix += " " + hd[e.prefix], t.prefix = ""), dd.hasOwnProperty(e.suffix) && (t.suffix += " " + dd[e.suffix]), t.suffix && 1 === e.num && (t.suffix = t.suffix.replace(/s$/, "")), !t.suffix && e.suffix && (t.suffix += " " + e.suffix), t
		},
		md = function(e, t) {
			if ("TextOrdinal" === t) {
				let {
					prefix: t,
					suffix: n
				} = gd(e);
				return t + ad(e) + n
			}
			if ("Ordinal" === t) return e.prefix + cd(e) + e.suffix;
			if ("TextCardinal" === t) {
				let {
					prefix: t,
					suffix: n
				} = gd(e);
				return t + td(e) + n
			}
			let n = e.num;
			return e.hasComma && (n = n.toLocaleString()), e.prefix + String(n) + e.suffix
		};
	const pd = function(e) {
		if ("string" == typeof e || "number" == typeof e) {
			let t = {};
			return t[e] = !0, t
		}
		return t = e, "[object Array]" === Object.prototype.toString.call(t) ? e.reduce(((e, t) => (e[t] = !0, e)), {}) : e || {};
		var t
	};
	var fd = function(e, t = {}) {
			return t = pd(t), e.filter((e => {
				let {
					unit: n
				} = ud(e);
				return !(!n || !0 !== t[n])
			}))
		},
		vd = function(e) {
			class Numbers extends e {
				constructor(e, t, n) {
					super(e, t, n), this.viewType = "Numbers"
				}
				parse(e) {
					return this.getNth(e).map(ud)
				}
				get(e) {
					return this.getNth(e).map(ud).map((e => e.num))
				}
				json(e) {
					let t = "object" == typeof e ? e : {};
					return this.getNth(e).map((e => {
						let n = e.toView().json(t)[0],
							r = ud(e);
						return n.number = {
							prefix: r.prefix,
							num: r.num,
							suffix: r.suffix,
							hasComma: r.hasComma,
							unit: r.unit
						}, n
					}), [])
				}
				units() {
					return this.growRight("#Unit").match("#Unit$")
				}
				isUnit(e) {
					return fd(this, e)
				}
				isOrdinal() {
					return this.if("#Ordinal")
				}
				isCardinal() {
					return this.if("#Cardinal")
				}
				toNumber() {
					return this.if("#TextValue").forEach((e => {
						let t = ud(e);
						if (null === t.num) return;
						let n = e.has("#Ordinal") ? "Ordinal" : "Cardinal",
							r = md(t, n);
						e.replaceWith(r, {
							tags: !0
						}), e.tag("NumericValue")
					})), this
				}
				toLocaleString() {
					return this.forEach((e => {
						let t = ud(e);
						if (null === t.num) return;
						let n = t.num.toLocaleString();
						if (e.has("#Ordinal")) {
							let e = md(t, "Ordinal").match(/[a-z]+$/);
							e && (n += e[0] || "")
						}
						e.replaceWith(n, {
							tags: !0
						})
					})), this
				}
				toText() {
					let e = this.map((e => {
						if (e.has("#TextValue")) return e;
						let t = ud(e);
						if (null === t.num) return e;
						let n = e.has("#Ordinal") ? "TextOrdinal" : "TextCardinal",
							r = md(t, n);
						return e.replaceWith(r, {
							tags: !0
						}), e.tag("TextValue"), e
					}));
					return new Numbers(e.document, e.pointer)
				}
				toCardinal() {
					let e = this.map((e => {
						if (!e.has("#Ordinal")) return e;
						let t = ud(e);
						if (null === t.num) return e;
						let n = e.has("#TextValue") ? "TextCardinal" : "Cardinal",
							r = md(t, n);
						return e.replaceWith(r, {
							tags: !0
						}), e.tag("Cardinal"), e
					}));
					return new Numbers(e.document, e.pointer)
				}
				toOrdinal() {
					let e = this.map((e => {
						if (e.has("#Ordinal")) return e;
						let t = ud(e);
						if (null === t.num) return e;
						let n = e.has("#TextValue") ? "TextOrdinal" : "Ordinal",
							r = md(t, n);
						return e.replaceWith(r, {
							tags: !0
						}), e.tag("Ordinal"), e
					}));
					return new Numbers(e.document, e.pointer)
				}
				isEqual(e) {
					return this.filter((t => ud(t).num === e))
				}
				greaterThan(e) {
					return this.filter((t => ud(t).num > e))
				}
				lessThan(e) {
					return this.filter((t => ud(t).num < e))
				}
				between(e, t) {
					return this.filter((n => {
						let r = ud(n).num;
						return r > e && r < t
					}))
				}
				set(e) {
					if (void 0 === e) return this;
					"string" == typeof e && (e = ud(e).num);
					let t = this.map((t => {
						let n = ud(t);
						if (n.num = e, null === n.num) return t;
						let r = t.has("#Ordinal") ? "Ordinal" : "Cardinal";
						t.has("#TextValue") && (r = t.has("#Ordinal") ? "TextOrdinal" : "TextCardinal");
						let a = md(n, r);
						return n.hasComma && "Cardinal" === r && (a = Number(a).toLocaleString()), (t = t.not("#Currency")).replaceWith(a, {
							tags: !0
						}), t
					}));
					return new Numbers(t.document, t.pointer)
				}
				add(e) {
					if (!e) return this;
					"string" == typeof e && (e = ud(e).num);
					let t = this.map((t => {
						let n = ud(t);
						if (null === n.num) return t;
						n.num += e;
						let r = t.has("#Ordinal") ? "Ordinal" : "Cardinal";
						n.isText && (r = t.has("#Ordinal") ? "TextOrdinal" : "TextCardinal");
						let a = md(n, r);
						return t.replaceWith(a, {
							tags: !0
						}), t
					}));
					return new Numbers(t.document, t.pointer)
				}
				subtract(e, t) {
					return this.add(-1 * e, t)
				}
				increment(e) {
					return this.add(1, e)
				}
				decrement(e) {
					return this.add(-1, e)
				}
				update(e) {
					let t = new Numbers(this.document, e);
					return t._cache = this._cache, t
				}
			}
			Numbers.prototype.toNice = Numbers.prototype.toLocaleString, Numbers.prototype.isBetween = Numbers.prototype.between, Numbers.prototype.minus = Numbers.prototype.subtract, Numbers.prototype.plus = Numbers.prototype.add, Numbers.prototype.equals = Numbers.prototype.isEqual, e.prototype.numbers = function(e) {
				let t = ld(this);
				return t = t.getNth(e), new Numbers(this.document, t.pointer)
			}, e.prototype.percentages = function(e) {
				let t = ld(this);
				return t = t.filter((e => e.has("#Percent") || e.after("^percent"))), t = t.getNth(e), new Numbers(this.document, t.pointer)
			}, e.prototype.money = function(e) {
				let t = ld(this);
				return t = t.filter((e => e.has("#Money") || e.after("^#Currency"))), t = t.getNth(e), new Numbers(this.document, t.pointer)
			}, e.prototype.values = e.prototype.numbers
		},
		bd = {
			api: function(e) {
				id(e), vd(e)
			}
		};
	const yd = {
			people: !0,
			emails: !0,
			phoneNumbers: !0,
			places: !0
		},
		wd = function(e = {}) {
			return !1 !== (e = Object.assign({}, yd, e)).people && this.people().replaceWith("██████████"), !1 !== e.emails && this.emails().replaceWith("██████████"), !1 !== e.places && this.places().replaceWith("██████████"), !1 !== e.phoneNumbers && this.phoneNumbers().replaceWith("███████"), this
		},
		kd = {
			api: function(e) {
				e.prototype.redact = wd
			}
		};
	var Pd = kd,
		Ad = function(e) {
			const t = /\?/,
				{
					document: n
				} = e;
			return e.filter((e => {
				let r = e.docs[0] || [],
					a = r[r.length - 1];
				return !(!a || n[a.index[0]].length !== r.length) && (!!t.test(a.post) || function(e) {
					let t = e.clauses();
					return !(/\.\.$/.test(e.out("text")) || e.has("^#QuestionWord") && e.has("@hasComma") || !e.has("or not$") && !e.has("^#QuestionWord") && !e.has("^(do|does|did|is|was|can|could|will|would|may) #Noun") && !e.has("^(have|must) you") && !t.has("(do|does|is|was) #Noun+ #Adverb? (#Adjective|#Infinitive)$"))
				}(e))
			}))
		},
		Cd = function(e) {
			let t = e;
			return 1 === t.length ? t : (t = t.if("#Verb"), 1 === t.length ? t : (t = t.ifNo("(after|although|as|because|before|if|since|than|that|though|when|whenever|where|whereas|wherever|whether|while|why|unless|until|once)"), t = t.ifNo("^even (if|though)"), t = t.ifNo("^so that"), t = t.ifNo("^rather than"), t = t.ifNo("^provided that"), 1 === t.length ? t : (t = t.ifNo("(that|which|whichever|who|whoever|whom|whose|whomever)"), 1 === t.length ? t : (t = t.ifNo("(^despite|^during|^before|^through|^throughout)"), 1 === t.length ? t : (t = t.ifNo("^#Gerund"), 1 === t.length ? t : (0 === t.length && (t = e), t.eq(0)))))))
		};
	const jd = function(e) {
		let t = null;
		return e.has("#PastTense") ? t = "PastTense" : e.has("#FutureTense") ? t = "FutureTense" : e.has("#PresentTense") && (t = "PresentTense"), {
			tense: t
		}
	};
	var Nd = function(e) {
			let t = e.clauses(),
				n = Cd(t).chunks(),
				r = e.none(),
				a = e.none(),
				o = e.none();
			return n.forEach(((e, t) => {
				0 !== t || e.has("<Verb>") ? a.found || !e.has("<Verb>") ? a.found && (o = o.concat(e)) : a = e : r = e
			})), a.found && !r.found && (r = a.before("<Noun>+").first()), {
				subj: r,
				verb: a,
				pred: o,
				grammar: jd(a)
			}
		},
		xd = function(e) {
			let t = e.verbs(),
				n = t.eq(0);
			if (n.has("#PastTense")) return e;
			if (n.toPastTense(), t.length > 1) {
				t = t.slice(1), t = t.filter((e => !e.lookBehind("to$").found)), t = t.if("#PresentTense"), t = t.notIf("#Gerund");
				let n = e.match("to #Verb+ #Conjunction #Verb").terms();
				t = t.not(n), t.found && t.verbs().toPastTense()
			}
			return e
		},
		Id = function(e) {
			let t = e.verbs();
			return t.eq(0).toPresentTense(), t.length > 1 && (t = t.slice(1), t = t.filter((e => !e.lookBehind("to$").found)), t = t.notIf("#Gerund"), t.found && t.verbs().toPresentTense()), e
		},
		Td = function(e) {
			let t = e.verbs();
			if (t.eq(0).toFutureTense(), t = (e = e.fullSentence()).verbs(), t.length > 1) {
				t = t.slice(1);
				let e = t.filter((e => !(e.lookBehind("to$").found || !e.has("#Copula #Gerund") && (e.has("#Gerund") || !e.has("#Copula") && e.has("#PresentTense") && !e.has("#Infinitive") && e.lookBefore("(he|she|it|that|which)$").found))));
				e.found && e.forEach((e => {
					if (e.has("#Copula")) return e.match("was").replaceWith("is"), void e.match("is").replaceWith("will be");
					e.toInfinitive()
				}))
			}
			return e
		},
		Dd = function(e) {
			return e.verbs().toInfinitive(), e
		},
		Hd = function(e) {
			class Sentences extends e {
				constructor(e, t, n) {
					super(e, t, n), this.viewType = "Sentences"
				}
				json(e = {}) {
					return this.map((t => {
						let n = t.toView().json(e)[0] || {},
							{
								subj: r,
								verb: a,
								pred: o,
								grammar: i
							} = Nd(t);
						return n.sentence = {
							subject: r.text("normal"),
							verb: a.text("normal"),
							predicate: o.text("normal"),
							grammar: i
						}, n
					}), [])
				}
				toPastTense(e) {
					return this.getNth(e).map((e => (Nd(e), xd(e))))
				}
				toPresentTense(e) {
					return this.getNth(e).map((e => (Nd(e), Id(e))))
				}
				toFutureTense(e) {
					return this.getNth(e).map((e => (Nd(e), e = Td(e))))
				}
				toInfinitive(e) {
					return this.getNth(e).map((e => (Nd(e), Dd(e))))
				}
				toNegative(e) {
					return this.getNth(e).map((e => (Nd(e), function(e) {
						return e.verbs().first().toNegative().compute("chunks"), e
					}(e))))
				}
				toPositive(e) {
					return this.getNth(e).map((e => (Nd(e), function(e) {
						return e.verbs().first().toPositive().compute("chunks"), e
					}(e))))
				}
				isQuestion(e) {
					return this.questions(e)
				}
				isExclamation(e) {
					let t = this.filter((e => e.lastTerm().has("@hasExclamation")));
					return t.getNth(e)
				}
				isStatement(e) {
					let t = this.filter((e => !e.isExclamation().found && !e.isQuestion().found));
					return t.getNth(e)
				}
				update(e) {
					let t = new Sentences(this.document, e);
					return t._cache = this._cache, t
				}
			}
			Sentences.prototype.toPresent = Sentences.prototype.toPresentTense, Sentences.prototype.toPast = Sentences.prototype.toPastTense, Sentences.prototype.toFuture = Sentences.prototype.toFutureTense;
			const t = {
				sentences: function(e) {
					let t = this.map((e => e.fullSentence()));
					return t = t.getNth(e), new Sentences(this.document, t.pointer)
				},
				questions: function(e) {
					return Ad(this).getNth(e)
				}
			};
			Object.assign(e.prototype, t)
		},
		Gd = {
			api: Hd
		},
		Ed = function(e) {
			let t = e.match("#Honorific+? #Person+"),
				n = t.match("#Possessive").notIf("(his|her)");
			return t = t.splitAfter(n), t
		},
		Od = function(e) {
			let t = {};
			t.firstName = e.match("#FirstName+"), t.lastName = e.match("#LastName+"), t.honorific = e.match("#Honorific+");
			let n = t.lastName,
				r = t.firstName;
			return r.found && n.found || r.found || n.found || !e.has("^#Honorific .$") || (t.lastName = e.match(".$")), t
		};
	const Fd = "male",
		Vd = "female",
		zd = {
			mr: Fd,
			mrs: Vd,
			miss: Vd,
			madam: Vd,
			king: Fd,
			queen: Vd,
			duke: Fd,
			duchess: Vd,
			baron: Fd,
			baroness: Vd,
			count: Fd,
			countess: Vd,
			prince: Fd,
			princess: Vd,
			sire: Fd,
			dame: Vd,
			lady: Vd,
			ayatullah: Fd,
			congressman: Fd,
			congresswoman: Vd,
			"first lady": Vd,
			mx: null
		};
	var Bd = function(e, t) {
			let {
				firstName: n,
				honorific: r
			} = e;
			if (n.has("#FemaleName")) return Vd;
			if (n.has("#MaleName")) return Fd;
			if (r.found) {
				let e = r.text("normal");
				if (e = e.replace(/\./g, ""), zd.hasOwnProperty(e)) return zd[e];
				if (/^her /.test(e)) return Vd;
				if (/^his /.test(e)) return Fd
			}
			let a = t.after();
			if (!a.has("#Person") && a.has("#Pronoun")) {
				let e = a.match("#Pronoun");
				if (e.has("(they|their)")) return null;
				let t = e.has("(he|his)"),
					n = e.has("(she|her|hers)");
				if (t && !n) return Fd;
				if (n && !t) return Vd
			}
			return null
		},
		$d = function(e) {
			class People extends e {
				constructor(e, t, n) {
					super(e, t, n), this.viewType = "People"
				}
				parse(e) {
					return this.getNth(e).map(Od)
				}
				json(e) {
					let t = "object" == typeof e ? e : {};
					return this.getNth(e).map((e => {
						let n = e.toView().json(t)[0],
							r = Od(e);
						return n.person = {
							firstName: r.firstName.text("normal"),
							lastName: r.lastName.text("normal"),
							honorific: r.honorific.text("normal"),
							presumed_gender: Bd(r, e)
						}, n
					}), [])
				}
				presumedMale() {
					return this.filter((e => e.has("(#MaleName|mr|mister|sr|jr|king|pope|prince|sir)")))
				}
				presumedFemale() {
					return this.filter((e => e.has("(#FemaleName|mrs|miss|queen|princess|madam)")))
				}
				update(e) {
					let t = new People(this.document, e);
					return t._cache = this._cache, t
				}
			}
			e.prototype.people = function(e) {
				let t = Ed(this);
				return t = t.getNth(e), new People(this.document, t.pointer)
			}
		},
		Sd = function(e) {
			let t = e.match("(#Place|#Address)+"),
				n = t.match("@hasComma");
			return n = n.filter((e => !!e.has("(asia|africa|europe|america)$") || !e.has("(#City|#Region|#ProperNoun)$") || !e.after("^(#Country|#Region)").found)), t = t.splitAfter(n), t
		},
		Kd = function(e) {
			e.prototype.places = function(t) {
				let n = Sd(this);
				return n = n.getNth(t), new e(this.document, n.pointer)
			}
		},
		Md = function(e) {
			e.prototype.organizations = function(e) {
				return this.match("#Organization+").getNth(e)
			}
		};
	const Ld = function(e) {
		let t = this.clauses(),
			n = t.people();
		return n = n.concat(t.places()), n = n.concat(t.organizations()), n = n.not("(someone|man|woman|mother|brother|sister|father)"), n = n.sort("seq"), n = n.getNth(e), n
	};
	var Jd = function(e) {
			e.prototype.topics = Ld
		},
		Wd = {
			api: function(e) {
				$d(e), Kd(e), Md(e), Jd(e)
			}
		},
		qd = function(e) {
			let t = e.match("<Verb>");
			return t = t.not("#Conjunction"), t = t.not("#Preposition"), t = t.splitAfter("@hasComma"), t = t.splitAfter("[(do|did|am|was|is|will)] (is|was)", 0), t = t.splitBefore("(#Verb && !#Copula) [being] #Verb", 0), t = t.splitBefore("#Verb [to be] #Verb", 0), t = t.splitAfter("[help] #PresentTense", 0), t = t.splitBefore("(#PresentTense|#PastTense) [#Copula]$", 0), t = t.splitBefore("(#PresentTense|#PastTense) [will be]$", 0), t = t.splitBefore("(#PresentTense|#PastTense) [(had|has)]", 0), t = t.not("#Reflexive$"), t = t.not("#Adjective"), t = t.splitAfter("[#PastTense] #PastTense", 0), t = t.splitAfter("[#PastTense] #Auxiliary+ #PastTense", 0), t = t.splitAfter("#Copula [#Gerund] #PastTense", 0), t = t.if("#Verb"), t.has("(#Verb && !#Auxiliary) #Adverb+? #Copula") && (t = t.splitBefore("#Copula")), t
		},
		Ud = function(e) {
			let t = e;
			return e.wordCount() > 1 && (t = e.not("(#Negative|#Auxiliary|#Modal|#Adverb|#Prefix)")), t.length > 1 && !t.has("#Phrasal #Particle") && (t = t.last()), t = t.not("(want|wants|wanted) to"), t.found || (t = e.not("#Negative")), t
		},
		Rd = function(e, t) {
			let n = {
				pre: e.none(),
				post: e.none()
			};
			if (!e.has("#Adverb")) return n;
			let r = e.splitOn(t);
			return 3 === r.length ? {
				pre: r.eq(0).adverbs(),
				post: r.eq(2).adverbs()
			} : r.eq(0).isDoc(t) ? (n.post = r.eq(1).adverbs(), n) : (n.pre = r.eq(0).adverbs(), n)
		};
	const Qd = function(e, t) {
			let n = e.splitBefore(t);
			if (n.length <= 1) return e.none();
			let r = n.eq(0);
			return r = r.not("(#Adverb|#Negative|#Prefix)"), r
		},
		_d = function(e) {
			return e.match("#Negative")
		},
		Zd = function(e) {
			if (!e.has("(#Particle|#PhrasalVerb)")) return {
				verb: e.none(),
				particle: e.none()
			};
			let t = e.match("#Particle$");
			return {
				verb: e.not(t),
				particle: t
			}
		};
	var Xd = function(e) {
		let t = e.clone();
		t.contractions().expand();
		const n = Ud(t);
		return {
			root: n,
			prefix: t.match("#Prefix"),
			adverbs: Rd(t, n),
			auxiliary: Qd(t, n),
			negative: _d(t),
			phrasal: Zd(n)
		}
	};
	const Yd = {
			tense: "PresentTense"
		},
		eg = {
			conditional: !0
		},
		tg = {
			tense: "FutureTense"
		},
		ng = {
			progressive: !0
		},
		rg = {
			tense: "PastTense"
		},
		ag = {
			complete: !0,
			progressive: !1
		},
		og = {
			passive: !0
		},
		ig = function(e) {
			let t = {};
			return e.forEach((e => {
				Object.assign(t, e)
			})), t
		},
		sg = {
			imperative: [
				["#Imperative", []]
			],
			"want-infinitive": [
				["^(want|wants|wanted) to #Infinitive$", [Yd]],
				["^wanted to #Infinitive$", [rg]],
				["^will want to #Infinitive$", [tg]]
			],
			"gerund-phrase": [
				["^#PastTense #Gerund$", [rg]],
				["^#PresentTense #Gerund$", [Yd]],
				["^#Infinitive #Gerund$", [Yd]],
				["^will #Infinitive #Gerund$", [tg]],
				["^have #PastTense #Gerund$", [rg]],
				["^will have #PastTense #Gerund$", [rg]]
			],
			"simple-present": [
				["^#PresentTense$", [Yd]],
				["^#Infinitive$", [Yd]]
			],
			"simple-past": [
				["^#PastTense$", [rg]]
			],
			"simple-future": [
				["^will #Adverb? #Infinitive", [tg]]
			],
			"present-progressive": [
				["^(is|are|am) #Gerund$", [Yd, ng]]
			],
			"past-progressive": [
				["^(was|were) #Gerund$", [rg, ng]]
			],
			"future-progressive": [
				["^will be #Gerund$", [tg, ng]]
			],
			"present-perfect": [
				["^(has|have) #PastTense$", [rg, ag]]
			],
			"past-perfect": [
				["^had #PastTense$", [rg, ag]],
				["^had #PastTense to #Infinitive", [rg, ag]]
			],
			"future-perfect": [
				["^will have #PastTense$", [tg, ag]]
			],
			"present-perfect-progressive": [
				["^(has|have) been #Gerund$", [rg, ng]]
			],
			"past-perfect-progressive": [
				["^had been #Gerund$", [rg, ng]]
			],
			"future-perfect-progressive": [
				["^will have been #Gerund$", [tg, ng]]
			],
			"passive-past": [
				["(got|were|was) #Passive", [rg, og]],
				["^(was|were) being #Passive", [rg, og]],
				["^(had|have) been #Passive", [rg, og]]
			],
			"passive-present": [
				["^(is|are|am) #Passive", [Yd, og]],
				["^(is|are|am) being #Passive", [Yd, og]],
				["^has been #Passive", [Yd, og]]
			],
			"passive-future": [
				["will have been #Passive", [tg, og, eg]],
				["will be being? #Passive", [tg, og, eg]]
			],
			"present-conditional": [
				["would be #PastTense", [Yd, eg]]
			],
			"past-conditional": [
				["would have been #PastTense", [rg, eg]]
			],
			"auxiliary-future": [
				["(is|are|am|was) going to (#Infinitive|#PresentTense)", [tg]]
			],
			"auxiliary-past": [
				["^did #Infinitive$", [rg, {
					plural: !1
				}]],
				["^used to #Infinitive$", [rg, ag]]
			],
			"auxiliary-present": [
				["^(does|do) #Infinitive$", [Yd, ag, {
					plural: !0
				}]]
			],
			"modal-past": [
				["^(could|must|should|shall) have #PastTense$", [rg]]
			],
			"modal-infinitive": [
				["^#Modal #Infinitive$", []]
			],
			infinitive: [
				["^#Infinitive$", []]
			]
		};
	let lg = [];
	Object.keys(sg).map((e => {
		sg[e].forEach((t => {
			lg.push({
				name: e,
				match: t[0],
				data: ig(t[1])
			})
		}))
	}));
	var ug = lg,
		cg = function(e, t) {
			let n = {};
			e = function(e, t) {
				return e = e.clone(), t.adverbs.post && t.adverbs.post.found && e.remove(t.adverbs.post), t.adverbs.pre && t.adverbs.pre.found && e.remove(t.adverbs.pre), e.has("#Negative") && (e = e.remove("#Negative")), e.has("#Prefix") && (e = e.remove("#Prefix")), t.root.has("#PhrasalVerb #Particle") && e.remove("#Particle$"), e.not("#Adverb")
			}(e, t);
			for (let t = 0; t < ug.length; t += 1) {
				let r = ug[t];
				if (!0 === e.has(r.match)) {
					n.form = r.name, Object.assign(n, r.data);
					break
				}
			}
			return n.form || e.has("^#Verb$") && (n.form = "infinitive"), n.tense || (n.tense = t.root.has("#PastTense") ? "PastTense" : "PresentTense"), n.copula = t.root.has("#Copula"), n.isInfinitive = function(e) {
				return !(!e.has("#Infinitive") || !e.growLeft("to").has("^to #Infinitive"))
			}(e), n
		};
	const hg = function(e) {
			return !(e.length <= 1) && (e.parse()[0] || {}).isSubordinate
		},
		dg = function(e, t) {
			return !!t.has("(are|were|does)") || !!e.has("(those|they|we)") || !(!e.found || !e.isPlural) && e.isPlural().found
		};
	var gg = function(e) {
		let t = function(e) {
			let t = e.before();
			t = function(e) {
				let t = e.clauses();
				return t = t.filter(((e, t) => !(e.has("^(if|unless|while|but|for|per|at|by|that|which|who|from)") || t > 0 && e.has("^#Verb . #Noun+$") || t > 0 && e.has("^#Adverb")))), 0 === t.length ? e : t
			}(t);
			let n = t.nouns(),
				r = n.last(),
				a = r.match("(i|he|she|we|you|they)");
			if (a.found) return a.nouns();
			let o = n.if("^(that|this|those)");
			return o.found || !1 === n.found && (o = t.match("^(that|this|those)"), o.found) ? o : (r = n.last(), hg(r) && (n.remove(r), r = n.last()), hg(r) && (n.remove(r), r = n.last()), r)
		}(e);
		return {
			subject: t,
			plural: dg(t, e)
		}
	};
	const mg = e => e,
		pg = (e, t) => {
			let n = gg(e),
				r = n.subject;
			return !(!r.has("i") && !r.has("we")) || n.plural
		},
		fg = function(e, t) {
			if (e.has("were")) return "are";
			let {
				subject: n,
				plural: r
			} = gg(e);
			return n.has("i") ? "am" : n.has("we") || r ? "are" : "is"
		},
		vg = function(e, t) {
			let n = gg(e),
				r = n.subject;
			return r.has("i") || r.has("we") || n.plural ? "do" : "does"
		},
		bg = function(e) {
			return e.has("#Infinitive") ? "Infinitive" : e.has("#Participle") ? "Participle" : e.has("#PastTense") ? "PastTense" : e.has("#Gerund") ? "Gerund" : e.has("#PresentTense") ? "PresentTense" : void 0
		},
		yg = function(e, t) {
			const {
				toInfinitive: n
			} = e.methods.two.transform.verb;
			let r = t.root.text({
				keepPunct: !1
			});
			return r = n(r, e.model, bg(e)), r && e.replace(t.root, r), e
		},
		wg = e => e.has("will not") ? e.replace("will not", "have not") : e.remove("will"),
		kg = function(e) {
			return e && e.isView ? e.json({
				normal: !0,
				terms: !1,
				text: !1
			}).map((e => e.normal)) : []
		},
		Pg = function(e) {
			return e && e.isView ? e.text("normal") : ""
		},
		Ag = function(e) {
			const {
				toInfinitive: t
			} = e.methods.two.transform.verb;
			return t(e.text("normal"), e.model, bg(e))
		};
	var Cg = function(e) {
		let t = Xd(e);
		e = e.clone().toView();
		const n = cg(e, t);
		return {
			root: t.root.text(),
			preAdverbs: kg(t.adverbs.pre),
			postAdverbs: kg(t.adverbs.post),
			auxiliary: Pg(t.auxiliary),
			negative: t.negative.found,
			prefix: Pg(t.prefix),
			infinitive: Ag(t.root),
			grammar: n
		}
	};
	const jg = {
		tags: !0
	};
	var Ng = function(e, t) {
		const {
			toInfinitive: n
		} = e.methods.two.transform.verb, {
			root: r,
			auxiliary: a
		} = t;
		let o = a.terms().harden(),
			i = r.text("normal");
		if (i = n(i, e.model, bg(r)), i && e.replace(r, i, jg).tag("Verb").firstTerm().tag("Infinitive"), o.found && e.remove(o), t.negative.found) {
			e.has("not") || e.prepend("not");
			let t = vg(e);
			e.prepend(t)
		}
		return e.fullSentence().compute(["freeze", "lexicon", "preTagger", "postTagger", "unfreeze", "chunks"]), e
	};
	const xg = {
			tags: !0
		},
		Ig = {
			noAux: (e, t) => (t.auxiliary.found && (e = e.remove(t.auxiliary)), e),
			simple: (e, t) => {
				const {
					conjugate: n,
					toInfinitive: r
				} = e.methods.two.transform.verb, a = t.root;
				if (a.has("#Modal")) return e;
				let o = a.text({
					keepPunct: !1
				});
				return o = r(o, e.model, bg(a)), o = n(o, e.model).PastTense, o = "been" === o ? "was" : o, "was" === o && (o = ((e, t) => {
					let {
						subject: n,
						plural: r
					} = gg(e);
					return r || n.has("we") ? "were" : "was"
				})(e)), o && e.replace(a, o, xg), e
			},
			both: function(e, t) {
				return t.negative.found ? (e.replace("will", "did"), e) : (e = Ig.simple(e, t), e = Ig.noAux(e, t))
			},
			hasHad: e => (e.replace("has", "had", xg), e),
			hasParticiple: (e, t) => {
				const {
					conjugate: n,
					toInfinitive: r
				} = e.methods.two.transform.verb, a = t.root;
				let o = a.text("normal");
				return o = r(o, e.model, bg(a)), n(o, e.model).Participle
			}
		},
		Tg = {
			infinitive: Ig.simple,
			"simple-present": Ig.simple,
			"simple-past": mg,
			"simple-future": Ig.both,
			"present-progressive": e => (e.replace("are", "were", xg), e.replace("(is|are|am)", "was", xg), e),
			"past-progressive": mg,
			"future-progressive": (e, t) => (e.match(t.root).insertBefore("was"), e.remove("(will|be)"), e),
			"present-perfect": Ig.hasHad,
			"past-perfect": mg,
			"future-perfect": (e, t) => (e.match(t.root).insertBefore("had"), e.has("will") && (e = wg(e)), e.remove("have"), e),
			"present-perfect-progressive": Ig.hasHad,
			"past-perfect-progressive": mg,
			"future-perfect-progressive": e => (e.remove("will"), e.replace("have", "had", xg), e),
			"passive-past": e => (e.replace("have", "had", xg), e),
			"passive-present": e => (e.replace("(is|are)", "was", xg), e),
			"passive-future": (e, t) => (t.auxiliary.has("will be") && (e.match(t.root).insertBefore("had been"), e.remove("(will|be)")), t.auxiliary.has("will have been") && (e.replace("have", "had", xg), e.remove("will")), e),
			"present-conditional": e => (e.replace("be", "have been"), e),
			"past-conditional": mg,
			"auxiliary-future": e => (e.replace("(is|are|am)", "was", xg), e),
			"auxiliary-past": mg,
			"auxiliary-present": e => (e.replace("(do|does)", "did", xg), e),
			"modal-infinitive": (e, t) => (e.has("can") ? e.replace("can", "could", xg) : (Ig.simple(e, t), e.match("#Modal").insertAfter("have").tag("Auxiliary")), e),
			"modal-past": mg,
			"want-infinitive": e => (e.replace("(want|wants)", "wanted", xg), e.remove("will"), e),
			"gerund-phrase": (e, t) => (t.root = t.root.not("#Gerund$"), Ig.simple(e, t), wg(e), e)
		};
	var Dg = function(e, t, n) {
		return Tg.hasOwnProperty(n) ? ((e = Tg[n](e, t)).fullSentence().compute(["tagger", "chunks"]), e) : e
	};
	const Hg = function(e, t) {
			let n = gg(e),
				r = n.subject;
			return r.has("(i|we|you)") ? "have" : !1 === n.plural || r.has("he") || r.has("she") || r.has("#Person") ? "has" : "have"
		},
		Gg = (e, t) => {
			const {
				conjugate: n,
				toInfinitive: r
			} = e.methods.two.transform.verb, {
				root: a,
				auxiliary: o
			} = t;
			if (a.has("#Modal")) return e;
			let i = a.text({
				keepPunct: !1
			});
			i = r(i, e.model, bg(a));
			let s = n(i, e.model);
			if (i = s.Participle || s.PastTense, i) {
				e = e.replace(a, i);
				let t = Hg(e);
				e.prepend(t).match(t).tag("Auxiliary"), e.remove(o)
			}
			return e
		},
		Eg = {
			infinitive: Gg,
			"simple-present": Gg,
			"simple-future": (e, t) => e.replace("will", Hg(e)),
			"present-perfect": mg,
			"past-perfect": mg,
			"future-perfect": (e, t) => e.replace("will have", Hg(e)),
			"present-perfect-progressive": mg,
			"past-perfect-progressive": mg,
			"future-perfect-progressive": mg
		};
	var Og = function(e, t, n) {
		return Eg.hasOwnProperty(n) ? ((e = Eg[n](e, t)).fullSentence().compute(["tagger", "chunks"]), e) : ((e = Gg(e, t)).fullSentence().compute(["tagger", "chunks"]), e)
	};
	const Fg = {
			tags: !0
		},
		Vg = (e, t) => {
			const {
				conjugate: n,
				toInfinitive: r
			} = e.methods.two.transform.verb, a = t.root;
			let o = a.text("normal");
			return o = r(o, e.model, bg(a)), !1 === pg(e) && (o = n(o, e.model).PresentTense), a.has("#Copula") && (o = fg(e)), o && (e = e.replace(a, o, Fg)).not("#Particle").tag("PresentTense"), e
		},
		zg = (e, t) => {
			const {
				conjugate: n,
				toInfinitive: r
			} = e.methods.two.transform.verb, a = t.root;
			let o = a.text("normal");
			return o = r(o, e.model, bg(a)), !1 === pg(e) && (o = n(o, e.model).Gerund), o && (e = e.replace(a, o, Fg)).not("#Particle").tag("Gerund"), e
		},
		Bg = {
			infinitive: Vg,
			"simple-present": (e, t) => {
				const {
					conjugate: n
				} = e.methods.two.transform.verb;
				let {
					root: r
				} = t;
				if (!r.has("#Infinitive")) return Vg(e, t); {
					let t = gg(e).subject;
					if (pg(e) || t.has("i")) return e;
					let a = r.text("normal"),
						o = n(a, e.model).PresentTense;
					a !== o && e.replace(r, o, Fg)
				}
				return e
			},
			"simple-past": Vg,
			"simple-future": (e, t) => {
				const {
					root: n,
					auxiliary: r
				} = t;
				if (r.has("will") && n.has("be")) {
					let t = fg(e);
					e.replace(n, t), (e = e.remove("will")).replace("not " + t, t + " not")
				} else Vg(e, t), e = e.remove("will");
				return e
			},
			"present-progressive": mg,
			"past-progressive": (e, t) => {
				let n = fg(e);
				return e.replace("(were|was)", n, Fg)
			},
			"future-progressive": e => (e.match("will").insertBefore("is"), e.remove("be"), e.remove("will")),
			"present-perfect": (e, t) => (Vg(e, t), e = e.remove("(have|had|has)")),
			"past-perfect": (e, t) => {
				let n = gg(e).subject;
				return pg(e) || n.has("i") ? ((e = yg(e, t)).remove("had"), e) : (e.replace("had", "has", Fg), e)
			},
			"future-perfect": e => (e.match("will").insertBefore("has"), e.remove("have").remove("will")),
			"present-perfect-progressive": mg,
			"past-perfect-progressive": e => e.replace("had", "has", Fg),
			"future-perfect-progressive": e => (e.match("will").insertBefore("has"), e.remove("have").remove("will")),
			"passive-past": (e, t) => {
				let n = fg(e);
				return e.has("(had|have|has)") && e.has("been") ? (e.replace("(had|have|has)", n, Fg), e.replace("been", "being"), e) : e.replace("(got|was|were)", n)
			},
			"passive-present": mg,
			"passive-future": e => (e.replace("will", "is"), e.replace("be", "being")),
			"present-conditional": mg,
			"past-conditional": e => (e.replace("been", "be"), e.remove("have")),
			"auxiliary-future": (e, t) => (zg(e, t), e.remove("(going|to)"), e),
			"auxiliary-past": (e, t) => {
				if (t.auxiliary.has("did")) {
					let n = vg(e);
					return e.replace(t.auxiliary, n), e
				}
				return zg(e, t), e.replace(t.auxiliary, "is"), e
			},
			"auxiliary-present": mg,
			"modal-infinitive": mg,
			"modal-past": (e, t) => (((e, t) => {
				const {
					toInfinitive: n
				} = e.methods.two.transform.verb, r = t.root;
				let a = t.root.text("normal");
				a = n(a, e.model, bg(r)), a && (e = e.replace(t.root, a, Fg))
			})(e, t), e.remove("have")),
			"gerund-phrase": (e, t) => (t.root = t.root.not("#Gerund$"), Vg(e, t), e.remove("(will|have)")),
			"want-infinitive": (e, t) => {
				let n = "wants";
				return pg(e) && (n = "want"), e.replace("(want|wanted|wants)", n, Fg), e.remove("will"), e
			}
		};
	var $g = function(e, t, n) {
		return Bg.hasOwnProperty(n) ? ((e = Bg[n](e, t)).fullSentence().compute(["tagger", "chunks"]), e) : e
	};
	const Sg = {
			tags: !0
		},
		Kg = (e, t) => {
			const {
				toInfinitive: n
			} = e.methods.two.transform.verb, {
				root: r,
				auxiliary: a
			} = t;
			if (r.has("#Modal")) return e;
			let o = r.text("normal");
			return o = n(o, e.model, bg(r)), o && (e = e.replace(r, o, Sg)).not("#Particle").tag("Verb"), e.prepend("will").match("will").tag("Auxiliary"), e.remove(a), e
		},
		Mg = (e, t) => {
			const {
				conjugate: n,
				toInfinitive: r
			} = e.methods.two.transform.verb, {
				root: a,
				auxiliary: o
			} = t;
			let i = a.text("normal");
			return i = r(i, e.model, bg(a)), i && (i = n(i, e.model).Gerund, e.replace(a, i, Sg), e.not("#Particle").tag("PresentTense")), e.remove(o), e.prepend("will be").match("will be").tag("Auxiliary"), e
		},
		Lg = {
			infinitive: Kg,
			"simple-present": Kg,
			"simple-past": Kg,
			"simple-future": mg,
			"present-progressive": Mg,
			"past-progressive": Mg,
			"future-progressive": mg,
			"present-perfect": e => (e.match("(have|has)").replaceWith("will have"), e),
			"past-perfect": e => e.replace("(had|has)", "will have"),
			"future-perfect": mg,
			"present-perfect-progressive": e => e.replace("has", "will have"),
			"past-perfect-progressive": e => e.replace("had", "will have"),
			"future-perfect-progressive": mg,
			"passive-past": e => e.has("got") ? e.replace("got", "will get") : e.has("(was|were)") ? (e.replace("(was|were)", "will be"), e.remove("being")) : e.has("(have|has|had) been") ? e.replace("(have|has|had) been", "will be") : e,
			"passive-present": e => (e.replace("being", "will be"), e.remove("(is|are|am)"), e),
			"passive-future": mg,
			"present-conditional": e => e.replace("would", "will"),
			"past-conditional": e => e.replace("would", "will"),
			"auxiliary-future": mg,
			"auxiliary-past": e => e.has("used") && e.has("to") ? (e.replace("used", "will"), e.remove("to")) : (e.replace("did", "will"), e),
			"auxiliary-present": e => e.replace("(do|does)", "will"),
			"modal-infinitive": mg,
			"modal-past": mg,
			"gerund-phrase": (e, t) => (t.root = t.root.not("#Gerund$"), Kg(e, t), e.remove("(had|have)")),
			"want-infinitive": e => (e.replace("(want|wants|wanted)", "will want"), e)
		};
	var Jg = function(e, t, n) {
		return e.has("will") || e.has("going to") ? e : Lg.hasOwnProperty(n) ? ((e = Lg[n](e, t)).fullSentence().compute(["tagger", "chunks"]), e) : e
	};
	const Wg = {
		tags: !0
	};
	var qg = function(e, t) {
		const {
			toInfinitive: n,
			conjugate: r
		} = e.methods.two.transform.verb, {
			root: a,
			auxiliary: o
		} = t;
		if (e.has("#Gerund")) return e;
		let i = a.text("normal");
		i = n(i, e.model, bg(a));
		let s = r(i, e.model).Gerund;
		if (s) {
			let t = fg(e);
			e.replace(a, s, Wg), e.remove(o), e.prepend(t)
		}
		return e.replace("not is", "is not"), e.replace("not are", "are not"), e.fullSentence().compute(["tagger", "chunks"]), e
	};
	const Ug = {
			tags: !0
		},
		Rg = function(e, t) {
			let n = vg(e);
			return e.prepend(n + " not"), e
		},
		Qg = function(e) {
			let t = e.match("be");
			return t.found ? (t.prepend("not"), e) : (t = e.match("(is|was|am|are|will|were)"), t.found ? (t.append("not"), e) : e)
		},
		_g = e => e.has("(is|was|am|are|will|were|be)"),
		Zg = {
			"simple-present": (e, t) => !0 === _g(e) ? Qg(e) : (e = yg(e, t), e = Rg(e)),
			"simple-past": (e, t) => !0 === _g(e) ? Qg(e) : ((e = yg(e, t)).prepend("did not"), e),
			imperative: e => (e.prepend("do not"), e),
			infinitive: (e, t) => !0 === _g(e) ? Qg(e) : Rg(e),
			"passive-past": e => {
				if (e.has("got")) return e.replace("got", "get", Ug), e.prepend("did not"), e;
				let t = e.match("(was|were|had|have)");
				return t.found && t.append("not"), e
			},
			"auxiliary-past": e => {
				if (e.has("used")) return e.prepend("did not"), e;
				let t = e.match("(did|does|do)");
				return t.found && t.append("not"), e
			},
			"want-infinitive": (e, t) => e = (e = Rg(e)).replace("wants", "want", Ug)
		};
	var Xg = function(e, t, n) {
			if (e.has("#Negative")) return e;
			if (Zg.hasOwnProperty(n)) return e = Zg[n](e, t);
			let r = e.matchOne("be");
			return r.found ? (r.prepend("not"), e) : !0 === _g(e) ? Qg(e) : (r = e.matchOne("(will|had|have|has|did|does|do|#Modal)"), r.found ? (r.append("not"), e) : e)
		},
		Yg = function(e) {
			class Verbs extends e {
				constructor(e, t, n) {
					super(e, t, n), this.viewType = "Verbs"
				}
				parse(e) {
					return this.getNth(e).map(Xd)
				}
				json(e, t) {
					let n = this.getNth(t).map((t => {
						let n = t.toView().json(e)[0] || {};
						return n.verb = Cg(t), n
					}), []);
					return n
				}
				subjects(e) {
					return this.getNth(e).map((e => (Xd(e), gg(e).subject)))
				}
				adverbs(e) {
					return this.getNth(e).map((e => e.match("#Adverb")))
				}
				isSingular(e) {
					return this.getNth(e).filter((e => !0 !== gg(e).plural))
				}
				isPlural(e) {
					return this.getNth(e).filter((e => !0 === gg(e).plural))
				}
				isImperative(e) {
					return this.getNth(e).filter((e => e.has("#Imperative")))
				}
				toInfinitive(e) {
					return this.getNth(e).map((e => {
						let t = Xd(e),
							n = cg(e, t);
						return Ng(e, t, n.form)
					}))
				}
				toPresentTense(e) {
					return this.getNth(e).map((e => {
						let t = Xd(e),
							n = cg(e, t);
						return n.isInfinitive ? e : $g(e, t, n.form)
					}))
				}
				toPastTense(e) {
					return this.getNth(e).map((e => {
						let t = Xd(e),
							n = cg(e, t);
						return n.isInfinitive ? e : Dg(e, t, n.form)
					}))
				}
				toFutureTense(e) {
					return this.getNth(e).map((e => {
						let t = Xd(e),
							n = cg(e, t);
						return n.isInfinitive ? e : Jg(e, t, n.form)
					}))
				}
				toGerund(e) {
					return this.getNth(e).map((e => {
						let t = Xd(e),
							n = cg(e, t);
						return n.isInfinitive ? e : qg(e, t, n.form)
					}))
				}
				toPastParticiple(e) {
					return this.getNth(e).map((e => {
						let t = Xd(e),
							n = cg(e, t);
						return n.isInfinitive ? e : Og(e, t, n.form)
					}))
				}
				conjugate(e) {
					const {
						conjugate: t,
						toInfinitive: n
					} = this.world.methods.two.transform.verb;
					return this.getNth(e).map((e => {
						let r = Xd(e),
							a = cg(e, r);
						"imperative" === a.form && (a.form = "simple-present");
						let o = r.root.text("normal");
						if (!r.root.has("#Infinitive")) {
							let t = bg(r.root);
							o = n(o, e.model, t) || o
						}
						return t(o, e.model)
					}), [])
				}
				isNegative() {
					return this.if("#Negative")
				}
				isPositive() {
					return this.ifNo("#Negative")
				}
				toPositive() {
					let e = this.match("do not #Verb");
					return e.found && e.remove("do not"), this.remove("#Negative")
				}
				toNegative(e) {
					return this.getNth(e).map((e => {
						let t = Xd(e),
							n = cg(e, t);
						return Xg(e, t, n.form)
					}))
				}
				update(e) {
					let t = new Verbs(this.document, e);
					return t._cache = this._cache, t
				}
			}
			Verbs.prototype.toPast = Verbs.prototype.toPastTense, Verbs.prototype.toPresent = Verbs.prototype.toPresentTense, Verbs.prototype.toFuture = Verbs.prototype.toFutureTense, e.prototype.verbs = function(e) {
				let t = qd(this);
				return t = t.getNth(e), new Verbs(this.document, t.pointer)
			}
		},
		em = {
			api: Yg
		};
	const tm = function(e, t) {
			let n = t.match(e);
			if (n.found) {
				let e = n.pronouns().refersTo();
				if (e.found) return e
			}
			return t.none()
		},
		nm = function(e) {
			if (!e.found) return e;
			let [t] = e.fullPointer[0];
			return t && t > 0 ? e.update([
				[t - 1]
			]) : e.none()
		};
	var rm = function(e, t) {
			let n = e.people();
			return n = function(e, t) {
				return "m" === t ? e.filter((e => !e.presumedFemale().found)) : "f" === t ? e.filter((e => !e.presumedMale().found)) : e
			}(n, t), n.found ? n.last() : (n = e.nouns("#Actor"), n.found ? n.last() : "f" === t ? tm("(she|her|hers)", e) : "m" === t ? tm("(he|him|his)", e) : e.none())
		},
		am = function(e) {
			let t = e.nouns(),
				n = t.isPlural().notIf("#Pronoun");
			if (n.found) return n.last();
			let r = tm("(they|their|theirs)", e);
			return r.found ? r : (n = t.match("(somebody|nobody|everybody|anybody|someone|noone|everyone|anyone)"), n.found ? n.last() : e.none())
		};
	const om = function(e, t) {
		let n = e.before(),
			r = t(n);
		return r.found ? r : (n = nm(e), r = t(n), r.found ? r : (n = nm(n), r = t(n), r.found ? r : e.none()))
	};
	var im = function(e) {
			e.pronouns().if("(he|him|his|she|her|hers|they|their|theirs|it|its)").forEach((e => {
				let t = null;
				e.has("(he|him|his)") ? t = om(e, (e => rm(e, "m"))) : e.has("(she|her|hers)") ? t = om(e, (e => rm(e, "f"))) : e.has("(they|their|theirs)") && (t = om(e, am)), t && t.found && function(e, t) {
					t && t.found && (e.docs[0][0].reference = t.ptrs[0])
				}(e, t)
			}))
		},
		sm = function(e) {
			class Pronouns extends e {
				constructor(e, t, n) {
					super(e, t, n), this.viewType = "Pronouns"
				}
				hasReference() {
					return this.compute("coreference"), this.filter((e => e.docs[0][0].reference))
				}
				refersTo() {
					return this.compute("coreference"), this.map((e => {
						if (!e.found) return e.none();
						let t = e.docs[0][0];
						return t.reference ? e.update([t.reference]) : e.none()
					}))
				}
				update(e) {
					let t = new Pronouns(this.document, e);
					return t._cache = this._cache, t
				}
			}
			e.prototype.pronouns = function(e) {
				let t = this.match("#Pronoun");
				return t = t.getNth(e), new Pronouns(t.document, t.pointer)
			}
		},
		lm = {
			compute: {
				coreference: im
			},
			api: sm
		};
	return v.plugin(Ec), v.plugin(Oc), v.plugin(Rc), v.plugin(lm), v.plugin(dh), v.plugin(yh), v.plugin(Fh), v.plugin(bd), v.plugin(Pd), v.plugin(Gd), v.plugin(Wd), v.plugin(em), v
}, "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : (e = "undefined" != typeof globalThis ? globalThis : e || self).nlp = t();
