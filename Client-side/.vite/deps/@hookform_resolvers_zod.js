import {
  appendErrors,
  get,
  set
} from "./chunk-7IAZAPP2.js";
import "./chunk-W4EHDCLL.js";
import "./chunk-EWTE5DHJ.js";

// node_modules/@hookform/resolvers/dist/resolvers.mjs
var r = (t, r2, o2) => {
  if (t && "reportValidity" in t) {
    const s3 = get(o2, r2);
    t.setCustomValidity(s3 && s3.message || ""), t.reportValidity();
  }
};
var o = (e, t) => {
  for (const o2 in t.fields) {
    const s3 = t.fields[o2];
    s3 && s3.ref && "reportValidity" in s3.ref ? r(s3.ref, o2, e) : s3 && s3.refs && s3.refs.forEach((t2) => r(t2, o2, e));
  }
};
var s = (r2, s3) => {
  s3.shouldUseNativeValidation && o(r2, s3);
  const n3 = {};
  for (const o2 in r2) {
    const f = get(s3.fields, o2), c = Object.assign(r2[o2] || {}, { ref: f && f.ref });
    if (i(s3.names || Object.keys(r2), o2)) {
      const r3 = Object.assign({}, get(n3, o2));
      set(r3, "root", c), set(n3, o2, r3);
    } else set(n3, o2, c);
  }
  return n3;
};
var i = (e, t) => {
  const r2 = n(t);
  return e.some((e2) => n(e2).match(`^${r2}\\.\\d+`));
};
function n(e) {
  return e.replace(/\]|\[/g, "");
}

// node_modules/@hookform/resolvers/zod/dist/zod.mjs
function n2(r2, e) {
  for (var n3 = {}; r2.length; ) {
    var s3 = r2[0], t = s3.code, i2 = s3.message, a = s3.path.join(".");
    if (!n3[a]) if ("unionErrors" in s3) {
      var u = s3.unionErrors[0].errors[0];
      n3[a] = { message: u.message, type: u.code };
    } else n3[a] = { message: i2, type: t };
    if ("unionErrors" in s3 && s3.unionErrors.forEach(function(e2) {
      return e2.errors.forEach(function(e3) {
        return r2.push(e3);
      });
    }), e) {
      var c = n3[a].types, f = c && c[s3.code];
      n3[a] = appendErrors(a, e, n3, t, f ? [].concat(f, s3.message) : s3.message);
    }
    r2.shift();
  }
  return n3;
}
function s2(o2, s3, t) {
  return void 0 === t && (t = {}), function(i2, a, u) {
    try {
      return Promise.resolve(function(e, n3) {
        try {
          var a2 = Promise.resolve(o2["sync" === t.mode ? "parse" : "parseAsync"](i2, s3)).then(function(e2) {
            return u.shouldUseNativeValidation && o({}, u), { errors: {}, values: t.raw ? Object.assign({}, i2) : e2 };
          });
        } catch (r2) {
          return n3(r2);
        }
        return a2 && a2.then ? a2.then(void 0, n3) : a2;
      }(0, function(r2) {
        if (function(r3) {
          return Array.isArray(null == r3 ? void 0 : r3.errors);
        }(r2)) return { values: {}, errors: s(n2(r2.errors, !u.shouldUseNativeValidation && "all" === u.criteriaMode), u) };
        throw r2;
      }));
    } catch (r2) {
      return Promise.reject(r2);
    }
  };
}
export {
  s2 as zodResolver
};
//# sourceMappingURL=@hookform_resolvers_zod.js.map
