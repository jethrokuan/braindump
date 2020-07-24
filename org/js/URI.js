/*! URI.js v1.19.2 http://medialize.github.io/URI.js/ */
/* build contains: IPv6.js, punycode.js, SecondLevelDomains.js, URI.js */
/*
 URI.js - Mutating URLs
 IPv6 Support

 Version: 1.19.2

 Author: Rodney Rehm
 Web: http://medialize.github.io/URI.js/

 Licensed under
   MIT License http://www.opensource.org/licenses/mit-license

 https://mths.be/punycode v1.4.0 by @mathias  URI.js - Mutating URLs
 Second Level Domain (SLD) Support

 Version: 1.19.2

 Author: Rodney Rehm
 Web: http://medialize.github.io/URI.js/

 Licensed under
   MIT License http://www.opensource.org/licenses/mit-license

 URI.js - Mutating URLs

 Version: 1.19.2

 Author: Rodney Rehm
 Web: http://medialize.github.io/URI.js/

 Licensed under
   MIT License http://www.opensource.org/licenses/mit-license

*/
(function (k, n) {
  "object" === typeof module && module.exports
    ? (module.exports = n())
    : "function" === typeof define && define.amd
    ? define(n)
    : (k.IPv6 = n(k));
})(this, function (k) {
  var n = k && k.IPv6;
  return {
    best: function (l) {
      l = l.toLowerCase().split(":");
      var h = l.length,
        c = 8;
      "" === l[0] && "" === l[1] && "" === l[2]
        ? (l.shift(), l.shift())
        : "" === l[0] && "" === l[1]
        ? l.shift()
        : "" === l[h - 1] && "" === l[h - 2] && l.pop();
      h = l.length;
      -1 !== l[h - 1].indexOf(".") && (c = 7);
      var m;
      for (m = 0; m < h && "" !== l[m]; m++);
      if (m < c)
        for (l.splice(m, 1, "0000"); l.length < c; ) l.splice(m, 0, "0000");
      for (m = 0; m < c; m++) {
        h = l[m].split("");
        for (var k = 0; 3 > k; k++)
          if ("0" === h[0] && 1 < h.length) h.splice(0, 1);
          else break;
        l[m] = h.join("");
      }
      h = -1;
      var p = (k = 0),
        n = -1,
        u = !1;
      for (m = 0; m < c; m++)
        u
          ? "0" === l[m]
            ? (p += 1)
            : ((u = !1), p > k && ((h = n), (k = p)))
          : "0" === l[m] && ((u = !0), (n = m), (p = 1));
      p > k && ((h = n), (k = p));
      1 < k && l.splice(h, k, "");
      h = l.length;
      c = "";
      "" === l[0] && (c = ":");
      for (m = 0; m < h; m++) {
        c += l[m];
        if (m === h - 1) break;
        c += ":";
      }
      "" === l[h - 1] && (c += ":");
      return c;
    },
    noConflict: function () {
      k.IPv6 === this && (k.IPv6 = n);
      return this;
    },
  };
});
(function (k) {
  function n(c) {
    throw new RangeError(H[c]);
  }
  function l(c, f) {
    for (var h = c.length, m = []; h--; ) m[h] = f(c[h]);
    return m;
  }
  function h(c, f) {
    var h = c.split("@"),
      m = "";
    1 < h.length && ((m = h[0] + "@"), (c = h[1]));
    c = c.replace(F, ".");
    h = c.split(".");
    h = l(h, f).join(".");
    return m + h;
  }
  function c(c) {
    for (var f = [], h = 0, m = c.length, l, a; h < m; )
      (l = c.charCodeAt(h++)),
        55296 <= l && 56319 >= l && h < m
          ? ((a = c.charCodeAt(h++)),
            56320 == (a & 64512)
              ? f.push(((l & 1023) << 10) + (a & 1023) + 65536)
              : (f.push(l), h--))
          : f.push(l);
    return f;
  }
  function m(c) {
    return l(c, function (c) {
      var f = "";
      65535 < c &&
        ((c -= 65536),
        (f += q(((c >>> 10) & 1023) | 55296)),
        (c = 56320 | (c & 1023)));
      return (f += q(c));
    }).join("");
  }
  function w(c, f) {
    return c + 22 + 75 * (26 > c) - ((0 != f) << 5);
  }
  function p(c, h, m) {
    var l = 0;
    c = m ? f(c / 700) : c >> 1;
    for (c += f(c / h); 455 < c; l += 36) c = f(c / 35);
    return f(l + (36 * c) / (c + 38));
  }
  function D(c) {
    var h = [],
      l = c.length,
      k = 0,
      q = 128,
      a = 72,
      b,
      d;
    var e = c.lastIndexOf("-");
    0 > e && (e = 0);
    for (b = 0; b < e; ++b)
      128 <= c.charCodeAt(b) && n("not-basic"), h.push(c.charCodeAt(b));
    for (e = 0 < e ? e + 1 : 0; e < l; ) {
      b = k;
      var g = 1;
      for (d = 36; ; d += 36) {
        e >= l && n("invalid-input");
        var r = c.charCodeAt(e++);
        r =
          10 > r - 48
            ? r - 22
            : 26 > r - 65
            ? r - 65
            : 26 > r - 97
            ? r - 97
            : 36;
        (36 <= r || r > f((2147483647 - k) / g)) && n("overflow");
        k += r * g;
        var A = d <= a ? 1 : d >= a + 26 ? 26 : d - a;
        if (r < A) break;
        r = 36 - A;
        g > f(2147483647 / r) && n("overflow");
        g *= r;
      }
      g = h.length + 1;
      a = p(k - b, g, 0 == b);
      f(k / g) > 2147483647 - q && n("overflow");
      q += f(k / g);
      k %= g;
      h.splice(k++, 0, q);
    }
    return m(h);
  }
  function u(h) {
    var l,
      m,
      k,
      t = [];
    h = c(h);
    var a = h.length;
    var b = 128;
    var d = 0;
    var e = 72;
    for (k = 0; k < a; ++k) {
      var g = h[k];
      128 > g && t.push(q(g));
    }
    for ((l = m = t.length) && t.push("-"); l < a; ) {
      var r = 2147483647;
      for (k = 0; k < a; ++k) (g = h[k]), g >= b && g < r && (r = g);
      var A = l + 1;
      r - b > f((2147483647 - d) / A) && n("overflow");
      d += (r - b) * A;
      b = r;
      for (k = 0; k < a; ++k)
        if (((g = h[k]), g < b && 2147483647 < ++d && n("overflow"), g == b)) {
          var y = d;
          for (r = 36; ; r += 36) {
            g = r <= e ? 1 : r >= e + 26 ? 26 : r - e;
            if (y < g) break;
            var I = y - g;
            y = 36 - g;
            t.push(q(w(g + (I % y), 0)));
            y = f(I / y);
          }
          t.push(q(w(y, 0)));
          e = p(d, A, l == m);
          d = 0;
          ++l;
        }
      ++d;
      ++b;
    }
    return t.join("");
  }
  var B = "object" == typeof exports && exports && !exports.nodeType && exports,
    C = "object" == typeof module && module && !module.nodeType && module,
    x = "object" == typeof global && global;
  if (x.global === x || x.window === x || x.self === x) k = x;
  var E = /^xn--/,
    z = /[^\x20-\x7E]/,
    F = /[\x2E\u3002\uFF0E\uFF61]/g,
    H = {
      overflow: "Overflow: input needs wider integers to process",
      "not-basic": "Illegal input >= 0x80 (not a basic code point)",
      "invalid-input": "Invalid input",
    },
    f = Math.floor,
    q = String.fromCharCode,
    t;
  var v = {
    version: "1.3.2",
    ucs2: { decode: c, encode: m },
    decode: D,
    encode: u,
    toASCII: function (c) {
      return h(c, function (c) {
        return z.test(c) ? "xn--" + u(c) : c;
      });
    },
    toUnicode: function (c) {
      return h(c, function (c) {
        return E.test(c) ? D(c.slice(4).toLowerCase()) : c;
      });
    },
  };
  if (
    "function" == typeof define &&
    "object" == typeof define.amd &&
    define.amd
  )
    define("punycode", function () {
      return v;
    });
  else if (B && C)
    if (module.exports == B) C.exports = v;
    else for (t in v) v.hasOwnProperty(t) && (B[t] = v[t]);
  else k.punycode = v;
})(this);
(function (k, n) {
  "object" === typeof module && module.exports
    ? (module.exports = n())
    : "function" === typeof define && define.amd
    ? define(n)
    : (k.SecondLevelDomains = n(k));
})(this, function (k) {
  var n = k && k.SecondLevelDomains,
    l = {
      list: {
        ac: " com gov mil net org ",
        ae: " ac co gov mil name net org pro sch ",
        af: " com edu gov net org ",
        al: " com edu gov mil net org ",
        ao: " co ed gv it og pb ",
        ar: " com edu gob gov int mil net org tur ",
        at: " ac co gv or ",
        au: " asn com csiro edu gov id net org ",
        ba: " co com edu gov mil net org rs unbi unmo unsa untz unze ",
        bb: " biz co com edu gov info net org store tv ",
        bh: " biz cc com edu gov info net org ",
        bn: " com edu gov net org ",
        bo: " com edu gob gov int mil net org tv ",
        br:
          " adm adv agr am arq art ato b bio blog bmd cim cng cnt com coop ecn edu eng esp etc eti far flog fm fnd fot fst g12 ggf gov imb ind inf jor jus lel mat med mil mus net nom not ntr odo org ppg pro psc psi qsl rec slg srv tmp trd tur tv vet vlog wiki zlg ",
        bs: " com edu gov net org ",
        bz: " du et om ov rg ",
        ca: " ab bc mb nb nf nl ns nt nu on pe qc sk yk ",
        ck: " biz co edu gen gov info net org ",
        cn:
          " ac ah bj com cq edu fj gd gov gs gx gz ha hb he hi hl hn jl js jx ln mil net nm nx org qh sc sd sh sn sx tj tw xj xz yn zj ",
        co: " com edu gov mil net nom org ",
        cr: " ac c co ed fi go or sa ",
        cy: " ac biz com ekloges gov ltd name net org parliament press pro tm ",
        do: " art com edu gob gov mil net org sld web ",
        dz: " art asso com edu gov net org pol ",
        ec: " com edu fin gov info med mil net org pro ",
        eg: " com edu eun gov mil name net org sci ",
        er: " com edu gov ind mil net org rochest w ",
        es: " com edu gob nom org ",
        et: " biz com edu gov info name net org ",
        fj: " ac biz com info mil name net org pro ",
        fk: " ac co gov net nom org ",
        fr: " asso com f gouv nom prd presse tm ",
        gg: " co net org ",
        gh: " com edu gov mil org ",
        gn: " ac com gov net org ",
        gr: " com edu gov mil net org ",
        gt: " com edu gob ind mil net org ",
        gu: " com edu gov net org ",
        hk: " com edu gov idv net org ",
        hu:
          " 2000 agrar bolt casino city co erotica erotika film forum games hotel info ingatlan jogasz konyvelo lakas media news org priv reklam sex shop sport suli szex tm tozsde utazas video ",
        id: " ac co go mil net or sch web ",
        il: " ac co gov idf k12 muni net org ",
        in: " ac co edu ernet firm gen gov i ind mil net nic org res ",
        iq: " com edu gov i mil net org ",
        ir: " ac co dnssec gov i id net org sch ",
        it: " edu gov ",
        je: " co net org ",
        jo: " com edu gov mil name net org sch ",
        jp: " ac ad co ed go gr lg ne or ",
        ke: " ac co go info me mobi ne or sc ",
        kh: " com edu gov mil net org per ",
        ki: " biz com de edu gov info mob net org tel ",
        km:
          " asso com coop edu gouv k medecin mil nom notaires pharmaciens presse tm veterinaire ",
        kn: " edu gov net org ",
        kr:
          " ac busan chungbuk chungnam co daegu daejeon es gangwon go gwangju gyeongbuk gyeonggi gyeongnam hs incheon jeju jeonbuk jeonnam k kg mil ms ne or pe re sc seoul ulsan ",
        kw: " com edu gov net org ",
        ky: " com edu gov net org ",
        kz: " com edu gov mil net org ",
        lb: " com edu gov net org ",
        lk: " assn com edu gov grp hotel int ltd net ngo org sch soc web ",
        lr: " com edu gov net org ",
        lv: " asn com conf edu gov id mil net org ",
        ly: " com edu gov id med net org plc sch ",
        ma: " ac co gov m net org press ",
        mc: " asso tm ",
        me: " ac co edu gov its net org priv ",
        mg: " com edu gov mil nom org prd tm ",
        mk: " com edu gov inf name net org pro ",
        ml: " com edu gov net org presse ",
        mn: " edu gov org ",
        mo: " com edu gov net org ",
        mt: " com edu gov net org ",
        mv: " aero biz com coop edu gov info int mil museum name net org pro ",
        mw: " ac co com coop edu gov int museum net org ",
        mx: " com edu gob net org ",
        my: " com edu gov mil name net org sch ",
        nf: " arts com firm info net other per rec store web ",
        ng: " biz com edu gov mil mobi name net org sch ",
        ni: " ac co com edu gob mil net nom org ",
        np: " com edu gov mil net org ",
        nr: " biz com edu gov info net org ",
        om: " ac biz co com edu gov med mil museum net org pro sch ",
        pe: " com edu gob mil net nom org sld ",
        ph: " com edu gov i mil net ngo org ",
        pk: " biz com edu fam gob gok gon gop gos gov net org web ",
        pl:
          " art bialystok biz com edu gda gdansk gorzow gov info katowice krakow lodz lublin mil net ngo olsztyn org poznan pwr radom slupsk szczecin torun warszawa waw wroc wroclaw zgora ",
        pr: " ac biz com edu est gov info isla name net org pro prof ",
        ps: " com edu gov net org plo sec ",
        pw: " belau co ed go ne or ",
        ro: " arts com firm info nom nt org rec store tm www ",
        rs: " ac co edu gov in org ",
        sb: " com edu gov net org ",
        sc: " com edu gov net org ",
        sh: " co com edu gov net nom org ",
        sl: " com edu gov net org ",
        st:
          " co com consulado edu embaixada gov mil net org principe saotome store ",
        sv: " com edu gob org red ",
        sz: " ac co org ",
        tr:
          " av bbs bel biz com dr edu gen gov info k12 name net org pol tel tsk tv web ",
        tt:
          " aero biz cat co com coop edu gov info int jobs mil mobi museum name net org pro tel travel ",
        tw: " club com ebiz edu game gov idv mil net org ",
        mu: " ac co com gov net or org ",
        mz: " ac co edu gov org ",
        na: " co com ",
        nz:
          " ac co cri geek gen govt health iwi maori mil net org parliament school ",
        pa: " abo ac com edu gob ing med net nom org sld ",
        pt: " com edu gov int net nome org publ ",
        py: " com edu gov mil net org ",
        qa: " com edu gov mil net org ",
        re: " asso com nom ",
        ru:
          " ac adygeya altai amur arkhangelsk astrakhan bashkiria belgorod bir bryansk buryatia cbg chel chelyabinsk chita chukotka chuvashia com dagestan e-burg edu gov grozny int irkutsk ivanovo izhevsk jar joshkar-ola kalmykia kaluga kamchatka karelia kazan kchr kemerovo khabarovsk khakassia khv kirov koenig komi kostroma kranoyarsk kuban kurgan kursk lipetsk magadan mari mari-el marine mil mordovia mosreg msk murmansk nalchik net nnov nov novosibirsk nsk omsk orenburg org oryol penza perm pp pskov ptz rnd ryazan sakhalin samara saratov simbirsk smolensk spb stavropol stv surgut tambov tatarstan tom tomsk tsaritsyn tsk tula tuva tver tyumen udm udmurtia ulan-ude vladikavkaz vladimir vladivostok volgograd vologda voronezh vrn vyatka yakutia yamal yekaterinburg yuzhno-sakhalinsk ",
        rw: " ac co com edu gouv gov int mil net ",
        sa: " com edu gov med net org pub sch ",
        sd: " com edu gov info med net org tv ",
        se:
          " a ac b bd c d e f g h i k l m n o org p parti pp press r s t tm u w x y z ",
        sg: " com edu gov idn net org per ",
        sn: " art com edu gouv org perso univ ",
        sy: " com edu gov mil net news org ",
        th: " ac co go in mi net or ",
        tj: " ac biz co com edu go gov info int mil name net nic org test web ",
        tn:
          " agrinet com defense edunet ens fin gov ind info intl mincom nat net org perso rnrt rns rnu tourism ",
        tz: " ac co go ne or ",
        ua:
          " biz cherkassy chernigov chernovtsy ck cn co com crimea cv dn dnepropetrovsk donetsk dp edu gov if in ivano-frankivsk kh kharkov kherson khmelnitskiy kiev kirovograd km kr ks kv lg lugansk lutsk lviv me mk net nikolaev od odessa org pl poltava pp rovno rv sebastopol sumy te ternopil uzhgorod vinnica vn zaporizhzhe zhitomir zp zt ",
        ug: " ac co go ne or org sc ",
        uk:
          " ac bl british-library co cym gov govt icnet jet lea ltd me mil mod national-library-scotland nel net nhs nic nls org orgn parliament plc police sch scot soc ",
        us: " dni fed isa kids nsn ",
        uy: " com edu gub mil net org ",
        ve: " co com edu gob info mil net org web ",
        vi: " co com k12 net org ",
        vn: " ac biz com edu gov health info int name net org pro ",
        ye: " co com gov ltd me net org plc ",
        yu: " ac co edu gov org ",
        za:
          " ac agric alt bourse city co cybernet db edu gov grondar iaccess imt inca landesign law mil net ngo nis nom olivetti org pix school tm web ",
        zm: " ac co com edu gov net org sch ",
        com: "ar br cn de eu gb gr hu jpn kr no qc ru sa se uk us uy za ",
        net: "gb jp se uk ",
        org: "ae",
        de: "com ",
      },
      has: function (h) {
        var c = h.lastIndexOf(".");
        if (0 >= c || c >= h.length - 1) return !1;
        var k = h.lastIndexOf(".", c - 1);
        if (0 >= k || k >= c - 1) return !1;
        var n = l.list[h.slice(c + 1)];
        return n ? 0 <= n.indexOf(" " + h.slice(k + 1, c) + " ") : !1;
      },
      is: function (h) {
        var c = h.lastIndexOf(".");
        if (0 >= c || c >= h.length - 1 || 0 <= h.lastIndexOf(".", c - 1))
          return !1;
        var k = l.list[h.slice(c + 1)];
        return k ? 0 <= k.indexOf(" " + h.slice(0, c) + " ") : !1;
      },
      get: function (h) {
        var c = h.lastIndexOf(".");
        if (0 >= c || c >= h.length - 1) return null;
        var k = h.lastIndexOf(".", c - 1);
        if (0 >= k || k >= c - 1) return null;
        var n = l.list[h.slice(c + 1)];
        return !n || 0 > n.indexOf(" " + h.slice(k + 1, c) + " ")
          ? null
          : h.slice(k + 1);
      },
      noConflict: function () {
        k.SecondLevelDomains === this && (k.SecondLevelDomains = n);
        return this;
      },
    };
  return l;
});
(function (k, n) {
  "object" === typeof module && module.exports
    ? (module.exports = n(
        require("./punycode"),
        require("./IPv6"),
        require("./SecondLevelDomains")
      ))
    : "function" === typeof define && define.amd
    ? define(["./punycode", "./IPv6", "./SecondLevelDomains"], n)
    : (k.URI = n(k.punycode, k.IPv6, k.SecondLevelDomains, k));
})(this, function (k, n, l, h) {
  function c(a, b) {
    var d = 1 <= arguments.length,
      e = 2 <= arguments.length;
    if (!(this instanceof c)) return d ? (e ? new c(a, b) : new c(a)) : new c();
    if (void 0 === a) {
      if (d) throw new TypeError("undefined is not a valid argument for URI");
      a = "undefined" !== typeof location ? location.href + "" : "";
    }
    if (null === a && d)
      throw new TypeError("null is not a valid argument for URI");
    this.href(a);
    return void 0 !== b ? this.absoluteTo(b) : this;
  }
  function m(a) {
    return a.replace(/([.*+?^=!:${}()|[\]\/\\])/g, "\\$1");
  }
  function w(a) {
    return void 0 === a
      ? "Undefined"
      : String(Object.prototype.toString.call(a)).slice(8, -1);
  }
  function p(a) {
    return "Array" === w(a);
  }
  function D(a, b) {
    var d = {},
      c;
    if ("RegExp" === w(b)) d = null;
    else if (p(b)) {
      var g = 0;
      for (c = b.length; g < c; g++) d[b[g]] = !0;
    } else d[b] = !0;
    g = 0;
    for (c = a.length; g < c; g++)
      if ((d && void 0 !== d[a[g]]) || (!d && b.test(a[g])))
        a.splice(g, 1), c--, g--;
    return a;
  }
  function u(a, b) {
    var d;
    if (p(b)) {
      var c = 0;
      for (d = b.length; c < d; c++) if (!u(a, b[c])) return !1;
      return !0;
    }
    var g = w(b);
    c = 0;
    for (d = a.length; c < d; c++)
      if ("RegExp" === g) {
        if ("string" === typeof a[c] && a[c].match(b)) return !0;
      } else if (a[c] === b) return !0;
    return !1;
  }
  function B(a, b) {
    if (!p(a) || !p(b) || a.length !== b.length) return !1;
    a.sort();
    b.sort();
    for (var d = 0, c = a.length; d < c; d++) if (a[d] !== b[d]) return !1;
    return !0;
  }
  function C(a) {
    return a.replace(/^\/+|\/+$/g, "");
  }
  function x(a) {
    return escape(a);
  }
  function E(a) {
    return encodeURIComponent(a)
      .replace(/[!'()*]/g, x)
      .replace(/\*/g, "%2A");
  }
  function z(a) {
    return function (b, d) {
      if (void 0 === b) return this._parts[a] || "";
      this._parts[a] = b || null;
      this.build(!d);
      return this;
    };
  }
  function F(a, b) {
    return function (d, c) {
      if (void 0 === d) return this._parts[a] || "";
      null !== d && ((d += ""), d.charAt(0) === b && (d = d.substring(1)));
      this._parts[a] = d;
      this.build(!c);
      return this;
    };
  }
  var H = h && h.URI;
  c.version = "1.19.2";
  var f = c.prototype,
    q = Object.prototype.hasOwnProperty;
  c._parts = function () {
    return {
      protocol: null,
      username: null,
      password: null,
      hostname: null,
      urn: null,
      port: null,
      path: null,
      query: null,
      fragment: null,
      preventInvalidHostname: c.preventInvalidHostname,
      duplicateQueryParameters: c.duplicateQueryParameters,
      escapeQuerySpace: c.escapeQuerySpace,
    };
  };
  c.preventInvalidHostname = !1;
  c.duplicateQueryParameters = !1;
  c.escapeQuerySpace = !0;
  c.protocol_expression = /^[a-z][a-z0-9.+-]*$/i;
  c.idn_expression = /[^a-z0-9\._-]/i;
  c.punycode_expression = /(xn--)/i;
  c.ip4_expression = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/;
  c.ip6_expression = /^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/;
  c.find_uri_expression = /\b((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?\u00ab\u00bb\u201c\u201d\u2018\u2019]))/gi;
  c.findUri = {
    start: /\b(?:([a-z][a-z0-9.+-]*:\/\/)|www\.)/gi,
    end: /[\s\r\n]|$/,
    trim: /[`!()\[\]{};:'".,<>?\u00ab\u00bb\u201c\u201d\u201e\u2018\u2019]+$/,
    parens: /(\([^\)]*\)|\[[^\]]*\]|\{[^}]*\}|<[^>]*>)/g,
  };
  c.defaultPorts = {
    http: "80",
    https: "443",
    ftp: "21",
    gopher: "70",
    ws: "80",
    wss: "443",
  };
  c.hostProtocols = ["http", "https"];
  c.invalid_hostname_characters = /[^a-zA-Z0-9\.\-:_]/;
  c.domAttributes = {
    a: "href",
    blockquote: "cite",
    link: "href",
    base: "href",
    script: "src",
    form: "action",
    img: "src",
    area: "href",
    iframe: "src",
    embed: "src",
    source: "src",
    track: "src",
    input: "src",
    audio: "src",
    video: "src",
  };
  c.getDomAttribute = function (a) {
    if (a && a.nodeName) {
      var b = a.nodeName.toLowerCase();
      if ("input" !== b || "image" === a.type) return c.domAttributes[b];
    }
  };
  c.encode = E;
  c.decode = decodeURIComponent;
  c.iso8859 = function () {
    c.encode = escape;
    c.decode = unescape;
  };
  c.unicode = function () {
    c.encode = E;
    c.decode = decodeURIComponent;
  };
  c.characters = {
    pathname: {
      encode: {
        expression: /%(24|26|2B|2C|3B|3D|3A|40)/gi,
        map: {
          "%24": "$",
          "%26": "&",
          "%2B": "+",
          "%2C": ",",
          "%3B": ";",
          "%3D": "=",
          "%3A": ":",
          "%40": "@",
        },
      },
      decode: {
        expression: /[\/\?#]/g,
        map: { "/": "%2F", "?": "%3F", "#": "%23" },
      },
    },
    reserved: {
      encode: {
        expression: /%(21|23|24|26|27|28|29|2A|2B|2C|2F|3A|3B|3D|3F|40|5B|5D)/gi,
        map: {
          "%3A": ":",
          "%2F": "/",
          "%3F": "?",
          "%23": "#",
          "%5B": "[",
          "%5D": "]",
          "%40": "@",
          "%21": "!",
          "%24": "$",
          "%26": "&",
          "%27": "'",
          "%28": "(",
          "%29": ")",
          "%2A": "*",
          "%2B": "+",
          "%2C": ",",
          "%3B": ";",
          "%3D": "=",
        },
      },
    },
    urnpath: {
      encode: {
        expression: /%(21|24|27|28|29|2A|2B|2C|3B|3D|40)/gi,
        map: {
          "%21": "!",
          "%24": "$",
          "%27": "'",
          "%28": "(",
          "%29": ")",
          "%2A": "*",
          "%2B": "+",
          "%2C": ",",
          "%3B": ";",
          "%3D": "=",
          "%40": "@",
        },
      },
      decode: {
        expression: /[\/\?#:]/g,
        map: { "/": "%2F", "?": "%3F", "#": "%23", ":": "%3A" },
      },
    },
  };
  c.encodeQuery = function (a, b) {
    var d = c.encode(a + "");
    void 0 === b && (b = c.escapeQuerySpace);
    return b ? d.replace(/%20/g, "+") : d;
  };
  c.decodeQuery = function (a, b) {
    a += "";
    void 0 === b && (b = c.escapeQuerySpace);
    try {
      return c.decode(b ? a.replace(/\+/g, "%20") : a);
    } catch (d) {
      return a;
    }
  };
  var t = { encode: "encode", decode: "decode" },
    v,
    G = function (a, b) {
      return function (d) {
        try {
          return c[b](d + "").replace(c.characters[a][b].expression, function (
            d
          ) {
            return c.characters[a][b].map[d];
          });
        } catch (e) {
          return d;
        }
      };
    };
  for (v in t)
    (c[v + "PathSegment"] = G("pathname", t[v])),
      (c[v + "UrnPathSegment"] = G("urnpath", t[v]));
  t = function (a, b, d) {
    return function (e) {
      var g = d
        ? function (a) {
            return c[b](c[d](a));
          }
        : c[b];
      e = (e + "").split(a);
      for (var f = 0, h = e.length; f < h; f++) e[f] = g(e[f]);
      return e.join(a);
    };
  };
  c.decodePath = t("/", "decodePathSegment");
  c.decodeUrnPath = t(":", "decodeUrnPathSegment");
  c.recodePath = t("/", "encodePathSegment", "decode");
  c.recodeUrnPath = t(":", "encodeUrnPathSegment", "decode");
  c.encodeReserved = G("reserved", "encode");
  c.parse = function (a, b) {
    b || (b = { preventInvalidHostname: c.preventInvalidHostname });
    var d = a.indexOf("#");
    -1 < d &&
      ((b.fragment = a.substring(d + 1) || null), (a = a.substring(0, d)));
    d = a.indexOf("?");
    -1 < d && ((b.query = a.substring(d + 1) || null), (a = a.substring(0, d)));
    "//" === a.substring(0, 2)
      ? ((b.protocol = null),
        (a = a.substring(2)),
        (a = c.parseAuthority(a, b)))
      : ((d = a.indexOf(":")),
        -1 < d &&
          ((b.protocol = a.substring(0, d) || null),
          b.protocol && !b.protocol.match(c.protocol_expression)
            ? (b.protocol = void 0)
            : "//" === a.substring(d + 1, d + 3)
            ? ((a = a.substring(d + 3)), (a = c.parseAuthority(a, b)))
            : ((a = a.substring(d + 1)), (b.urn = !0))));
    b.path = a;
    return b;
  };
  c.parseHost = function (a, b) {
    a || (a = "");
    a = a.replace(/\\/g, "/");
    var d = a.indexOf("/");
    -1 === d && (d = a.length);
    if ("[" === a.charAt(0)) {
      var e = a.indexOf("]");
      b.hostname = a.substring(1, e) || null;
      b.port = a.substring(e + 2, d) || null;
      "/" === b.port && (b.port = null);
    } else {
      var g = a.indexOf(":");
      e = a.indexOf("/");
      g = a.indexOf(":", g + 1);
      -1 !== g && (-1 === e || g < e)
        ? ((b.hostname = a.substring(0, d) || null), (b.port = null))
        : ((e = a.substring(0, d).split(":")),
          (b.hostname = e[0] || null),
          (b.port = e[1] || null));
    }
    b.hostname && "/" !== a.substring(d).charAt(0) && (d++, (a = "/" + a));
    b.preventInvalidHostname && c.ensureValidHostname(b.hostname, b.protocol);
    b.port && c.ensureValidPort(b.port);
    return a.substring(d) || "/";
  };
  c.parseAuthority = function (a, b) {
    a = c.parseUserinfo(a, b);
    return c.parseHost(a, b);
  };
  c.parseUserinfo = function (a, b) {
    var d = a.indexOf("/"),
      e = a.lastIndexOf("@", -1 < d ? d : a.length - 1);
    -1 < e && (-1 === d || e < d)
      ? ((d = a.substring(0, e).split(":")),
        (b.username = d[0] ? c.decode(d[0]) : null),
        d.shift(),
        (b.password = d[0] ? c.decode(d.join(":")) : null),
        (a = a.substring(e + 1)))
      : ((b.username = null), (b.password = null));
    return a;
  };
  c.parseQuery = function (a, b) {
    if (!a) return {};
    a = a.replace(/&+/g, "&").replace(/^\?*&*|&+$/g, "");
    if (!a) return {};
    for (var d = {}, e = a.split("&"), g = e.length, f, h, k = 0; k < g; k++)
      if (
        ((f = e[k].split("=")),
        (h = c.decodeQuery(f.shift(), b)),
        (f = f.length ? c.decodeQuery(f.join("="), b) : null),
        q.call(d, h))
      ) {
        if ("string" === typeof d[h] || null === d[h]) d[h] = [d[h]];
        d[h].push(f);
      } else d[h] = f;
    return d;
  };
  c.build = function (a) {
    var b = "",
      d = !1;
    a.protocol && (b += a.protocol + ":");
    a.urn || (!b && !a.hostname) || ((b += "//"), (d = !0));
    b += c.buildAuthority(a) || "";
    "string" === typeof a.path &&
      ("/" !== a.path.charAt(0) && d && (b += "/"), (b += a.path));
    "string" === typeof a.query && a.query && (b += "?" + a.query);
    "string" === typeof a.fragment && a.fragment && (b += "#" + a.fragment);
    return b;
  };
  c.buildHost = function (a) {
    var b = "";
    if (a.hostname)
      b = c.ip6_expression.test(a.hostname)
        ? b + ("[" + a.hostname + "]")
        : b + a.hostname;
    else return "";
    a.port && (b += ":" + a.port);
    return b;
  };
  c.buildAuthority = function (a) {
    return c.buildUserinfo(a) + c.buildHost(a);
  };
  c.buildUserinfo = function (a) {
    var b = "";
    a.username && (b += c.encode(a.username));
    a.password && (b += ":" + c.encode(a.password));
    b && (b += "@");
    return b;
  };
  c.buildQuery = function (a, b, d) {
    var e = "",
      g,
      f;
    for (g in a)
      if (q.call(a, g))
        if (p(a[g])) {
          var h = {};
          var k = 0;
          for (f = a[g].length; k < f; k++)
            void 0 !== a[g][k] &&
              void 0 === h[a[g][k] + ""] &&
              ((e += "&" + c.buildQueryParameter(g, a[g][k], d)),
              !0 !== b && (h[a[g][k] + ""] = !0));
        } else
          void 0 !== a[g] && (e += "&" + c.buildQueryParameter(g, a[g], d));
    return e.substring(1);
  };
  c.buildQueryParameter = function (a, b, d) {
    return c.encodeQuery(a, d) + (null !== b ? "=" + c.encodeQuery(b, d) : "");
  };
  c.addQuery = function (a, b, d) {
    if ("object" === typeof b)
      for (var e in b) q.call(b, e) && c.addQuery(a, e, b[e]);
    else if ("string" === typeof b)
      void 0 === a[b]
        ? (a[b] = d)
        : ("string" === typeof a[b] && (a[b] = [a[b]]),
          p(d) || (d = [d]),
          (a[b] = (a[b] || []).concat(d)));
    else
      throw new TypeError(
        "URI.addQuery() accepts an object, string as the name parameter"
      );
  };
  c.setQuery = function (a, b, d) {
    if ("object" === typeof b)
      for (var e in b) q.call(b, e) && c.setQuery(a, e, b[e]);
    else if ("string" === typeof b) a[b] = void 0 === d ? null : d;
    else
      throw new TypeError(
        "URI.setQuery() accepts an object, string as the name parameter"
      );
  };
  c.removeQuery = function (a, b, d) {
    var e;
    if (p(b)) for (d = 0, e = b.length; d < e; d++) a[b[d]] = void 0;
    else if ("RegExp" === w(b)) for (e in a) b.test(e) && (a[e] = void 0);
    else if ("object" === typeof b)
      for (e in b) q.call(b, e) && c.removeQuery(a, e, b[e]);
    else if ("string" === typeof b)
      void 0 !== d
        ? "RegExp" === w(d)
          ? !p(a[b]) && d.test(a[b])
            ? (a[b] = void 0)
            : (a[b] = D(a[b], d))
          : a[b] !== String(d) || (p(d) && 1 !== d.length)
          ? p(a[b]) && (a[b] = D(a[b], d))
          : (a[b] = void 0)
        : (a[b] = void 0);
    else
      throw new TypeError(
        "URI.removeQuery() accepts an object, string, RegExp as the first parameter"
      );
  };
  c.hasQuery = function (a, b, d, e) {
    switch (w(b)) {
      case "String":
        break;
      case "RegExp":
        for (var g in a)
          if (
            q.call(a, g) &&
            b.test(g) &&
            (void 0 === d || c.hasQuery(a, g, d))
          )
            return !0;
        return !1;
      case "Object":
        for (var f in b) if (q.call(b, f) && !c.hasQuery(a, f, b[f])) return !1;
        return !0;
      default:
        throw new TypeError(
          "URI.hasQuery() accepts a string, regular expression or object as the name parameter"
        );
    }
    switch (w(d)) {
      case "Undefined":
        return b in a;
      case "Boolean":
        return (a = !(p(a[b]) ? !a[b].length : !a[b])), d === a;
      case "Function":
        return !!d(a[b], b, a);
      case "Array":
        return p(a[b]) ? (e ? u : B)(a[b], d) : !1;
      case "RegExp":
        return p(a[b]) ? (e ? u(a[b], d) : !1) : !(!a[b] || !a[b].match(d));
      case "Number":
        d = String(d);
      case "String":
        return p(a[b]) ? (e ? u(a[b], d) : !1) : a[b] === d;
      default:
        throw new TypeError(
          "URI.hasQuery() accepts undefined, boolean, string, number, RegExp, Function as the value parameter"
        );
    }
  };
  c.joinPaths = function () {
    for (var a = [], b = [], d = 0, e = 0; e < arguments.length; e++) {
      var g = new c(arguments[e]);
      a.push(g);
      g = g.segment();
      for (var f = 0; f < g.length; f++)
        "string" === typeof g[f] && b.push(g[f]), g[f] && d++;
    }
    if (!b.length || !d) return new c("");
    b = new c("").segment(b);
    ("" !== a[0].path() && "/" !== a[0].path().slice(0, 1)) ||
      b.path("/" + b.path());
    return b.normalize();
  };
  c.commonPath = function (a, b) {
    var d = Math.min(a.length, b.length),
      c;
    for (c = 0; c < d; c++)
      if (a.charAt(c) !== b.charAt(c)) {
        c--;
        break;
      }
    if (1 > c)
      return a.charAt(0) === b.charAt(0) && "/" === a.charAt(0) ? "/" : "";
    if ("/" !== a.charAt(c) || "/" !== b.charAt(c))
      c = a.substring(0, c).lastIndexOf("/");
    return a.substring(0, c + 1);
  };
  c.withinString = function (a, b, d) {
    d || (d = {});
    var e = d.start || c.findUri.start,
      g = d.end || c.findUri.end,
      f = d.trim || c.findUri.trim,
      h = d.parens || c.findUri.parens,
      k = /[a-z0-9-]=["']?$/i;
    for (e.lastIndex = 0; ; ) {
      var l = e.exec(a);
      if (!l) break;
      var m = l.index;
      if (d.ignoreHtml) {
        var n = a.slice(Math.max(m - 3, 0), m);
        if (n && k.test(n)) continue;
      }
      var p = m + a.slice(m).search(g);
      n = a.slice(m, p);
      for (p = -1; ; ) {
        var q = h.exec(n);
        if (!q) break;
        p = Math.max(p, q.index + q[0].length);
      }
      n = -1 < p ? n.slice(0, p) + n.slice(p).replace(f, "") : n.replace(f, "");
      n.length <= l[0].length ||
        (d.ignore && d.ignore.test(n)) ||
        ((p = m + n.length),
        (l = b(n, m, p, a)),
        void 0 === l
          ? (e.lastIndex = p)
          : ((l = String(l)),
            (a = a.slice(0, m) + l + a.slice(p)),
            (e.lastIndex = m + l.length)));
    }
    e.lastIndex = 0;
    return a;
  };
  c.ensureValidHostname = function (a, b) {
    var d = !!a,
      e = !1;
    b && (e = u(c.hostProtocols, b));
    if (e && !d)
      throw new TypeError("Hostname cannot be empty, if protocol is " + b);
    if (a && a.match(c.invalid_hostname_characters)) {
      if (!k)
        throw new TypeError(
          'Hostname "' +
            a +
            '" contains characters other than [A-Z0-9.-:_] and Punycode.js is not available'
        );
      if (k.toASCII(a).match(c.invalid_hostname_characters))
        throw new TypeError(
          'Hostname "' + a + '" contains characters other than [A-Z0-9.-:_]'
        );
    }
  };
  c.ensureValidPort = function (a) {
    if (a) {
      var b = Number(a);
      if (!(/^[0-9]+$/.test(b) && 0 < b && 65536 > b))
        throw new TypeError('Port "' + a + '" is not a valid port');
    }
  };
  c.noConflict = function (a) {
    if (a)
      return (
        (a = { URI: this.noConflict() }),
        h.URITemplate &&
          "function" === typeof h.URITemplate.noConflict &&
          (a.URITemplate = h.URITemplate.noConflict()),
        h.IPv6 &&
          "function" === typeof h.IPv6.noConflict &&
          (a.IPv6 = h.IPv6.noConflict()),
        h.SecondLevelDomains &&
          "function" === typeof h.SecondLevelDomains.noConflict &&
          (a.SecondLevelDomains = h.SecondLevelDomains.noConflict()),
        a
      );
    h.URI === this && (h.URI = H);
    return this;
  };
  f.build = function (a) {
    if (!0 === a) this._deferred_build = !0;
    else if (void 0 === a || this._deferred_build)
      (this._string = c.build(this._parts)), (this._deferred_build = !1);
    return this;
  };
  f.clone = function () {
    return new c(this);
  };
  f.valueOf = f.toString = function () {
    return this.build(!1)._string;
  };
  f.protocol = z("protocol");
  f.username = z("username");
  f.password = z("password");
  f.hostname = z("hostname");
  f.port = z("port");
  f.query = F("query", "?");
  f.fragment = F("fragment", "#");
  f.search = function (a, b) {
    var d = this.query(a, b);
    return "string" === typeof d && d.length ? "?" + d : d;
  };
  f.hash = function (a, b) {
    var d = this.fragment(a, b);
    return "string" === typeof d && d.length ? "#" + d : d;
  };
  f.pathname = function (a, b) {
    if (void 0 === a || !0 === a) {
      var d = this._parts.path || (this._parts.hostname ? "/" : "");
      return a ? (this._parts.urn ? c.decodeUrnPath : c.decodePath)(d) : d;
    }
    this._parts.path = this._parts.urn
      ? a
        ? c.recodeUrnPath(a)
        : ""
      : a
      ? c.recodePath(a)
      : "/";
    this.build(!b);
    return this;
  };
  f.path = f.pathname;
  f.href = function (a, b) {
    var d;
    if (void 0 === a) return this.toString();
    this._string = "";
    this._parts = c._parts();
    var e = a instanceof c,
      g = "object" === typeof a && (a.hostname || a.path || a.pathname);
    a.nodeName && ((g = c.getDomAttribute(a)), (a = a[g] || ""), (g = !1));
    !e && g && void 0 !== a.pathname && (a = a.toString());
    if ("string" === typeof a || a instanceof String)
      this._parts = c.parse(String(a), this._parts);
    else if (e || g) {
      e = e ? a._parts : a;
      for (d in e)
        "query" !== d && q.call(this._parts, d) && (this._parts[d] = e[d]);
      e.query && this.query(e.query, !1);
    } else throw new TypeError("invalid input");
    this.build(!b);
    return this;
  };
  f.is = function (a) {
    var b = !1,
      d = !1,
      e = !1,
      g = !1,
      f = !1,
      h = !1,
      k = !1,
      m = !this._parts.urn;
    this._parts.hostname &&
      ((m = !1),
      (d = c.ip4_expression.test(this._parts.hostname)),
      (e = c.ip6_expression.test(this._parts.hostname)),
      (b = d || e),
      (f = (g = !b) && l && l.has(this._parts.hostname)),
      (h = g && c.idn_expression.test(this._parts.hostname)),
      (k = g && c.punycode_expression.test(this._parts.hostname)));
    switch (a.toLowerCase()) {
      case "relative":
        return m;
      case "absolute":
        return !m;
      case "domain":
      case "name":
        return g;
      case "sld":
        return f;
      case "ip":
        return b;
      case "ip4":
      case "ipv4":
      case "inet4":
        return d;
      case "ip6":
      case "ipv6":
      case "inet6":
        return e;
      case "idn":
        return h;
      case "url":
        return !this._parts.urn;
      case "urn":
        return !!this._parts.urn;
      case "punycode":
        return k;
    }
    return null;
  };
  var J = f.protocol,
    K = f.port,
    L = f.hostname;
  f.protocol = function (a, b) {
    if (
      a &&
      ((a = a.replace(/:(\/\/)?$/, "")), !a.match(c.protocol_expression))
    )
      throw new TypeError(
        'Protocol "' +
          a +
          "\" contains characters other than [A-Z0-9.+-] or doesn't start with [A-Z]"
      );
    return J.call(this, a, b);
  };
  f.scheme = f.protocol;
  f.port = function (a, b) {
    if (this._parts.urn) return void 0 === a ? "" : this;
    void 0 !== a &&
      (0 === a && (a = null),
      a &&
        ((a += ""),
        ":" === a.charAt(0) && (a = a.substring(1)),
        c.ensureValidPort(a)));
    return K.call(this, a, b);
  };
  f.hostname = function (a, b) {
    if (this._parts.urn) return void 0 === a ? "" : this;
    if (void 0 !== a) {
      var d = { preventInvalidHostname: this._parts.preventInvalidHostname };
      if ("/" !== c.parseHost(a, d))
        throw new TypeError(
          'Hostname "' + a + '" contains characters other than [A-Z0-9.-]'
        );
      a = d.hostname;
      this._parts.preventInvalidHostname &&
        c.ensureValidHostname(a, this._parts.protocol);
    }
    return L.call(this, a, b);
  };
  f.origin = function (a, b) {
    if (this._parts.urn) return void 0 === a ? "" : this;
    if (void 0 === a) {
      var d = this.protocol();
      return this.authority() ? (d ? d + "://" : "") + this.authority() : "";
    }
    d = c(a);
    this.protocol(d.protocol()).authority(d.authority()).build(!b);
    return this;
  };
  f.host = function (a, b) {
    if (this._parts.urn) return void 0 === a ? "" : this;
    if (void 0 === a)
      return this._parts.hostname ? c.buildHost(this._parts) : "";
    if ("/" !== c.parseHost(a, this._parts))
      throw new TypeError(
        'Hostname "' + a + '" contains characters other than [A-Z0-9.-]'
      );
    this.build(!b);
    return this;
  };
  f.authority = function (a, b) {
    if (this._parts.urn) return void 0 === a ? "" : this;
    if (void 0 === a)
      return this._parts.hostname ? c.buildAuthority(this._parts) : "";
    if ("/" !== c.parseAuthority(a, this._parts))
      throw new TypeError(
        'Hostname "' + a + '" contains characters other than [A-Z0-9.-]'
      );
    this.build(!b);
    return this;
  };
  f.userinfo = function (a, b) {
    if (this._parts.urn) return void 0 === a ? "" : this;
    if (void 0 === a) {
      var d = c.buildUserinfo(this._parts);
      return d ? d.substring(0, d.length - 1) : d;
    }
    "@" !== a[a.length - 1] && (a += "@");
    c.parseUserinfo(a, this._parts);
    this.build(!b);
    return this;
  };
  f.resource = function (a, b) {
    if (void 0 === a) return this.path() + this.search() + this.hash();
    var d = c.parse(a);
    this._parts.path = d.path;
    this._parts.query = d.query;
    this._parts.fragment = d.fragment;
    this.build(!b);
    return this;
  };
  f.subdomain = function (a, b) {
    if (this._parts.urn) return void 0 === a ? "" : this;
    if (void 0 === a) {
      if (!this._parts.hostname || this.is("IP")) return "";
      var d = this._parts.hostname.length - this.domain().length - 1;
      return this._parts.hostname.substring(0, d) || "";
    }
    d = this._parts.hostname.length - this.domain().length;
    d = this._parts.hostname.substring(0, d);
    d = new RegExp("^" + m(d));
    a && "." !== a.charAt(a.length - 1) && (a += ".");
    if (-1 !== a.indexOf(":"))
      throw new TypeError("Domains cannot contain colons");
    a && c.ensureValidHostname(a, this._parts.protocol);
    this._parts.hostname = this._parts.hostname.replace(d, a);
    this.build(!b);
    return this;
  };
  f.domain = function (a, b) {
    if (this._parts.urn) return void 0 === a ? "" : this;
    "boolean" === typeof a && ((b = a), (a = void 0));
    if (void 0 === a) {
      if (!this._parts.hostname || this.is("IP")) return "";
      var d = this._parts.hostname.match(/\./g);
      if (d && 2 > d.length) return this._parts.hostname;
      d = this._parts.hostname.length - this.tld(b).length - 1;
      d = this._parts.hostname.lastIndexOf(".", d - 1) + 1;
      return this._parts.hostname.substring(d) || "";
    }
    if (!a) throw new TypeError("cannot set domain empty");
    if (-1 !== a.indexOf(":"))
      throw new TypeError("Domains cannot contain colons");
    c.ensureValidHostname(a, this._parts.protocol);
    !this._parts.hostname || this.is("IP")
      ? (this._parts.hostname = a)
      : ((d = new RegExp(m(this.domain()) + "$")),
        (this._parts.hostname = this._parts.hostname.replace(d, a)));
    this.build(!b);
    return this;
  };
  f.tld = function (a, b) {
    if (this._parts.urn) return void 0 === a ? "" : this;
    "boolean" === typeof a && ((b = a), (a = void 0));
    if (void 0 === a) {
      if (!this._parts.hostname || this.is("IP")) return "";
      var d = this._parts.hostname.lastIndexOf(".");
      d = this._parts.hostname.substring(d + 1);
      return !0 !== b && l && l.list[d.toLowerCase()]
        ? l.get(this._parts.hostname) || d
        : d;
    }
    if (a)
      if (a.match(/[^a-zA-Z0-9-]/))
        if (l && l.is(a))
          (d = new RegExp(m(this.tld()) + "$")),
            (this._parts.hostname = this._parts.hostname.replace(d, a));
        else
          throw new TypeError(
            'TLD "' + a + '" contains characters other than [A-Z0-9]'
          );
      else {
        if (!this._parts.hostname || this.is("IP"))
          throw new ReferenceError("cannot set TLD on non-domain host");
        d = new RegExp(m(this.tld()) + "$");
        this._parts.hostname = this._parts.hostname.replace(d, a);
      }
    else throw new TypeError("cannot set TLD empty");
    this.build(!b);
    return this;
  };
  f.directory = function (a, b) {
    if (this._parts.urn) return void 0 === a ? "" : this;
    if (void 0 === a || !0 === a) {
      if (!this._parts.path && !this._parts.hostname) return "";
      if ("/" === this._parts.path) return "/";
      var d = this._parts.path.length - this.filename().length - 1;
      d = this._parts.path.substring(0, d) || (this._parts.hostname ? "/" : "");
      return a ? c.decodePath(d) : d;
    }
    d = this._parts.path.length - this.filename().length;
    d = this._parts.path.substring(0, d);
    d = new RegExp("^" + m(d));
    this.is("relative") ||
      (a || (a = "/"), "/" !== a.charAt(0) && (a = "/" + a));
    a && "/" !== a.charAt(a.length - 1) && (a += "/");
    a = c.recodePath(a);
    this._parts.path = this._parts.path.replace(d, a);
    this.build(!b);
    return this;
  };
  f.filename = function (a, b) {
    if (this._parts.urn) return void 0 === a ? "" : this;
    if ("string" !== typeof a) {
      if (!this._parts.path || "/" === this._parts.path) return "";
      var d = this._parts.path.lastIndexOf("/");
      d = this._parts.path.substring(d + 1);
      return a ? c.decodePathSegment(d) : d;
    }
    d = !1;
    "/" === a.charAt(0) && (a = a.substring(1));
    a.match(/\.?\//) && (d = !0);
    var e = new RegExp(m(this.filename()) + "$");
    a = c.recodePath(a);
    this._parts.path = this._parts.path.replace(e, a);
    d ? this.normalizePath(b) : this.build(!b);
    return this;
  };
  f.suffix = function (a, b) {
    if (this._parts.urn) return void 0 === a ? "" : this;
    if (void 0 === a || !0 === a) {
      if (!this._parts.path || "/" === this._parts.path) return "";
      var d = this.filename(),
        e = d.lastIndexOf(".");
      if (-1 === e) return "";
      d = d.substring(e + 1);
      d = /^[a-z0-9%]+$/i.test(d) ? d : "";
      return a ? c.decodePathSegment(d) : d;
    }
    "." === a.charAt(0) && (a = a.substring(1));
    if ((d = this.suffix()))
      e = a ? new RegExp(m(d) + "$") : new RegExp(m("." + d) + "$");
    else {
      if (!a) return this;
      this._parts.path += "." + c.recodePath(a);
    }
    e &&
      ((a = c.recodePath(a)),
      (this._parts.path = this._parts.path.replace(e, a)));
    this.build(!b);
    return this;
  };
  f.segment = function (a, b, d) {
    var c = this._parts.urn ? ":" : "/",
      g = this.path(),
      f = "/" === g.substring(0, 1);
    g = g.split(c);
    void 0 !== a && "number" !== typeof a && ((d = b), (b = a), (a = void 0));
    if (void 0 !== a && "number" !== typeof a)
      throw Error('Bad segment "' + a + '", must be 0-based integer');
    f && g.shift();
    0 > a && (a = Math.max(g.length + a, 0));
    if (void 0 === b) return void 0 === a ? g : g[a];
    if (null === a || void 0 === g[a])
      if (p(b)) {
        g = [];
        a = 0;
        for (var h = b.length; a < h; a++)
          if (b[a].length || (g.length && g[g.length - 1].length))
            g.length && !g[g.length - 1].length && g.pop(), g.push(C(b[a]));
      } else {
        if (b || "string" === typeof b)
          (b = C(b)),
            "" === g[g.length - 1] ? (g[g.length - 1] = b) : g.push(b);
      }
    else b ? (g[a] = C(b)) : g.splice(a, 1);
    f && g.unshift("");
    return this.path(g.join(c), d);
  };
  f.segmentCoded = function (a, b, d) {
    var e;
    "number" !== typeof a && ((d = b), (b = a), (a = void 0));
    if (void 0 === b) {
      a = this.segment(a, b, d);
      if (p(a)) {
        var g = 0;
        for (e = a.length; g < e; g++) a[g] = c.decode(a[g]);
      } else a = void 0 !== a ? c.decode(a) : void 0;
      return a;
    }
    if (p(b)) for (g = 0, e = b.length; g < e; g++) b[g] = c.encode(b[g]);
    else b = "string" === typeof b || b instanceof String ? c.encode(b) : b;
    return this.segment(a, b, d);
  };
  var M = f.query;
  f.query = function (a, b) {
    if (!0 === a)
      return c.parseQuery(this._parts.query, this._parts.escapeQuerySpace);
    if ("function" === typeof a) {
      var d = c.parseQuery(this._parts.query, this._parts.escapeQuerySpace),
        e = a.call(this, d);
      this._parts.query = c.buildQuery(
        e || d,
        this._parts.duplicateQueryParameters,
        this._parts.escapeQuerySpace
      );
      this.build(!b);
      return this;
    }
    return void 0 !== a && "string" !== typeof a
      ? ((this._parts.query = c.buildQuery(
          a,
          this._parts.duplicateQueryParameters,
          this._parts.escapeQuerySpace
        )),
        this.build(!b),
        this)
      : M.call(this, a, b);
  };
  f.setQuery = function (a, b, d) {
    var e = c.parseQuery(this._parts.query, this._parts.escapeQuerySpace);
    if ("string" === typeof a || a instanceof String)
      e[a] = void 0 !== b ? b : null;
    else if ("object" === typeof a)
      for (var g in a) q.call(a, g) && (e[g] = a[g]);
    else
      throw new TypeError(
        "URI.addQuery() accepts an object, string as the name parameter"
      );
    this._parts.query = c.buildQuery(
      e,
      this._parts.duplicateQueryParameters,
      this._parts.escapeQuerySpace
    );
    "string" !== typeof a && (d = b);
    this.build(!d);
    return this;
  };
  f.addQuery = function (a, b, d) {
    var e = c.parseQuery(this._parts.query, this._parts.escapeQuerySpace);
    c.addQuery(e, a, void 0 === b ? null : b);
    this._parts.query = c.buildQuery(
      e,
      this._parts.duplicateQueryParameters,
      this._parts.escapeQuerySpace
    );
    "string" !== typeof a && (d = b);
    this.build(!d);
    return this;
  };
  f.removeQuery = function (a, b, d) {
    var e = c.parseQuery(this._parts.query, this._parts.escapeQuerySpace);
    c.removeQuery(e, a, b);
    this._parts.query = c.buildQuery(
      e,
      this._parts.duplicateQueryParameters,
      this._parts.escapeQuerySpace
    );
    "string" !== typeof a && (d = b);
    this.build(!d);
    return this;
  };
  f.hasQuery = function (a, b, d) {
    var e = c.parseQuery(this._parts.query, this._parts.escapeQuerySpace);
    return c.hasQuery(e, a, b, d);
  };
  f.setSearch = f.setQuery;
  f.addSearch = f.addQuery;
  f.removeSearch = f.removeQuery;
  f.hasSearch = f.hasQuery;
  f.normalize = function () {
    return this._parts.urn
      ? this.normalizeProtocol(!1)
          .normalizePath(!1)
          .normalizeQuery(!1)
          .normalizeFragment(!1)
          .build()
      : this.normalizeProtocol(!1)
          .normalizeHostname(!1)
          .normalizePort(!1)
          .normalizePath(!1)
          .normalizeQuery(!1)
          .normalizeFragment(!1)
          .build();
  };
  f.normalizeProtocol = function (a) {
    "string" === typeof this._parts.protocol &&
      ((this._parts.protocol = this._parts.protocol.toLowerCase()),
      this.build(!a));
    return this;
  };
  f.normalizeHostname = function (a) {
    this._parts.hostname &&
      (this.is("IDN") && k
        ? (this._parts.hostname = k.toASCII(this._parts.hostname))
        : this.is("IPv6") &&
          n &&
          (this._parts.hostname = n.best(this._parts.hostname)),
      (this._parts.hostname = this._parts.hostname.toLowerCase()),
      this.build(!a));
    return this;
  };
  f.normalizePort = function (a) {
    "string" === typeof this._parts.protocol &&
      this._parts.port === c.defaultPorts[this._parts.protocol] &&
      ((this._parts.port = null), this.build(!a));
    return this;
  };
  f.normalizePath = function (a) {
    var b = this._parts.path;
    if (!b) return this;
    if (this._parts.urn)
      return (
        (this._parts.path = c.recodeUrnPath(this._parts.path)),
        this.build(!a),
        this
      );
    if ("/" === this._parts.path) return this;
    b = c.recodePath(b);
    var d = "";
    if ("/" !== b.charAt(0)) {
      var e = !0;
      b = "/" + b;
    }
    if ("/.." === b.slice(-3) || "/." === b.slice(-2)) b += "/";
    b = b.replace(/(\/(\.\/)+)|(\/\.$)/g, "/").replace(/\/{2,}/g, "/");
    e && (d = b.substring(1).match(/^(\.\.\/)+/) || "") && (d = d[0]);
    for (;;) {
      var g = b.search(/\/\.\.(\/|$)/);
      if (-1 === g) break;
      else if (0 === g) {
        b = b.substring(3);
        continue;
      }
      var f = b.substring(0, g).lastIndexOf("/");
      -1 === f && (f = g);
      b = b.substring(0, f) + b.substring(g + 3);
    }
    e && this.is("relative") && (b = d + b.substring(1));
    this._parts.path = b;
    this.build(!a);
    return this;
  };
  f.normalizePathname = f.normalizePath;
  f.normalizeQuery = function (a) {
    "string" === typeof this._parts.query &&
      (this._parts.query.length
        ? this.query(
            c.parseQuery(this._parts.query, this._parts.escapeQuerySpace)
          )
        : (this._parts.query = null),
      this.build(!a));
    return this;
  };
  f.normalizeFragment = function (a) {
    this._parts.fragment || ((this._parts.fragment = null), this.build(!a));
    return this;
  };
  f.normalizeSearch = f.normalizeQuery;
  f.normalizeHash = f.normalizeFragment;
  f.iso8859 = function () {
    var a = c.encode,
      b = c.decode;
    c.encode = escape;
    c.decode = decodeURIComponent;
    try {
      this.normalize();
    } finally {
      (c.encode = a), (c.decode = b);
    }
    return this;
  };
  f.unicode = function () {
    var a = c.encode,
      b = c.decode;
    c.encode = E;
    c.decode = unescape;
    try {
      this.normalize();
    } finally {
      (c.encode = a), (c.decode = b);
    }
    return this;
  };
  f.readable = function () {
    var a = this.clone();
    a.username("").password("").normalize();
    var b = "";
    a._parts.protocol && (b += a._parts.protocol + "://");
    a._parts.hostname &&
      (a.is("punycode") && k
        ? ((b += k.toUnicode(a._parts.hostname)),
          a._parts.port && (b += ":" + a._parts.port))
        : (b += a.host()));
    a._parts.hostname &&
      a._parts.path &&
      "/" !== a._parts.path.charAt(0) &&
      (b += "/");
    b += a.path(!0);
    if (a._parts.query) {
      for (
        var d = "", e = 0, g = a._parts.query.split("&"), f = g.length;
        e < f;
        e++
      ) {
        var h = (g[e] || "").split("=");
        d +=
          "&" +
          c
            .decodeQuery(h[0], this._parts.escapeQuerySpace)
            .replace(/&/g, "%26");
        void 0 !== h[1] &&
          (d +=
            "=" +
            c
              .decodeQuery(h[1], this._parts.escapeQuerySpace)
              .replace(/&/g, "%26"));
      }
      b += "?" + d.substring(1);
    }
    return (b += c.decodeQuery(a.hash(), !0));
  };
  f.absoluteTo = function (a) {
    var b = this.clone(),
      d = ["protocol", "username", "password", "hostname", "port"],
      e,
      g;
    if (this._parts.urn)
      throw Error(
        "URNs do not have any generally defined hierarchical components"
      );
    a instanceof c || (a = new c(a));
    if (b._parts.protocol) return b;
    b._parts.protocol = a._parts.protocol;
    if (this._parts.hostname) return b;
    for (e = 0; (g = d[e]); e++) b._parts[g] = a._parts[g];
    b._parts.path
      ? (".." === b._parts.path.substring(-2) && (b._parts.path += "/"),
        "/" !== b.path().charAt(0) &&
          ((d = (d = a.directory())
            ? d
            : 0 === a.path().indexOf("/")
            ? "/"
            : ""),
          (b._parts.path = (d ? d + "/" : "") + b._parts.path),
          b.normalizePath()))
      : ((b._parts.path = a._parts.path),
        b._parts.query || (b._parts.query = a._parts.query));
    b.build();
    return b;
  };
  f.relativeTo = function (a) {
    var b = this.clone().normalize();
    if (b._parts.urn)
      throw Error(
        "URNs do not have any generally defined hierarchical components"
      );
    a = new c(a).normalize();
    var d = b._parts;
    var e = a._parts;
    var g = b.path();
    a = a.path();
    if ("/" !== g.charAt(0)) throw Error("URI is already relative");
    if ("/" !== a.charAt(0))
      throw Error("Cannot calculate a URI relative to another relative URI");
    d.protocol === e.protocol && (d.protocol = null);
    if (
      d.username === e.username &&
      d.password === e.password &&
      null === d.protocol &&
      null === d.username &&
      null === d.password &&
      d.hostname === e.hostname &&
      d.port === e.port
    )
      (d.hostname = null), (d.port = null);
    else return b.build();
    if (g === a) return (d.path = ""), b.build();
    g = c.commonPath(g, a);
    if (!g) return b.build();
    e = e.path
      .substring(g.length)
      .replace(/[^\/]*$/, "")
      .replace(/.*?\//g, "../");
    d.path = e + d.path.substring(g.length) || "./";
    return b.build();
  };
  f.equals = function (a) {
    var b = this.clone(),
      d = new c(a);
    a = {};
    var e;
    b.normalize();
    d.normalize();
    if (b.toString() === d.toString()) return !0;
    var g = b.query();
    var f = d.query();
    b.query("");
    d.query("");
    if (b.toString() !== d.toString() || g.length !== f.length) return !1;
    b = c.parseQuery(g, this._parts.escapeQuerySpace);
    f = c.parseQuery(f, this._parts.escapeQuerySpace);
    for (e in b)
      if (q.call(b, e)) {
        if (!p(b[e])) {
          if (b[e] !== f[e]) return !1;
        } else if (!B(b[e], f[e])) return !1;
        a[e] = !0;
      }
    for (e in f) if (q.call(f, e) && !a[e]) return !1;
    return !0;
  };
  f.preventInvalidHostname = function (a) {
    this._parts.preventInvalidHostname = !!a;
    return this;
  };
  f.duplicateQueryParameters = function (a) {
    this._parts.duplicateQueryParameters = !!a;
    return this;
  };
  f.escapeQuerySpace = function (a) {
    this._parts.escapeQuerySpace = !!a;
    return this;
  };
  return c;
});
