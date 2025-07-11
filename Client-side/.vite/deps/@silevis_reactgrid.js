import {
  require_react_dom
} from "./chunk-JUWM2LYA.js";
import {
  require_react
} from "./chunk-W4EHDCLL.js";
import {
  __toESM
} from "./chunk-EWTE5DHJ.js";

// node_modules/@silevis/reactgrid/core/handleStateUpdate-a12d3c0b.js
var e = __toESM(require_react());
var import_react = __toESM(require_react());
var import_react_dom = __toESM(require_react_dom());
var f = function() {
  function e3(e4, t2) {
    this.rows = e4, this.columns = t2, this.first = { row: this.rows[0], column: this.columns[0] }, this.last = { row: this.rows[this.rows.length - 1], column: this.columns[this.columns.length - 1] }, this.height = this.rows.reduce(function(e5, t3) {
      return e5 + t3.height;
    }, 0), this.width = this.columns.reduce(function(e5, t3) {
      return e5 + t3.width;
    }, 0);
  }
  return e3.prototype.contains = function(e4) {
    var t2, n2, o2, r2, i2, l2, a2, c2;
    return (null === (t2 = e4.column) || void 0 === t2 ? void 0 : t2.idx) >= (null === (n2 = this.first.column) || void 0 === n2 ? void 0 : n2.idx) && (null === (o2 = e4.column) || void 0 === o2 ? void 0 : o2.idx) <= (null === (r2 = this.last.column) || void 0 === r2 ? void 0 : r2.idx) && (null === (i2 = e4.row) || void 0 === i2 ? void 0 : i2.idx) >= (null === (l2 = this.first.row) || void 0 === l2 ? void 0 : l2.idx) && (null === (a2 = e4.row) || void 0 === a2 ? void 0 : a2.idx) <= (null === (c2 = this.last.row) || void 0 === c2 ? void 0 : c2.idx);
  }, e3.prototype.slice = function(t2, n2) {
    var o2 = "rows" === n2 && t2 ? t2.first.row : this.first.row, r2 = "columns" === n2 && t2 ? t2.first.column : this.first.column, i2 = "rows" === n2 && t2 ? t2.last.row : this.last.row, l2 = "columns" === n2 && t2 ? t2.last.column : this.last.column;
    return new e3(this.rows.slice(o2.idx - this.first.row.idx, i2.idx - this.first.row.idx + 1), this.columns.slice(r2.idx - this.first.column.idx, l2.idx - this.first.column.idx + 1));
  }, e3;
}();
var h = function() {
  function e3(e4) {
    this.ranges = e4, this.width = 0, this.height = 0, this.rowIndexLookup = {}, this.columnIndexLookup = {}, this.spanCellLookup = {}, this.rangesToRender = {};
  }
  return e3.prototype.getRange = function(e4, t2) {
    var n2 = this.columns.slice(Math.min(e4.column.idx, t2.column.idx), Math.max(e4.column.idx, t2.column.idx) + 1), o2 = this.rows.slice(Math.min(e4.row.idx, t2.row.idx), Math.max(e4.row.idx, t2.row.idx) + 1);
    return new f(o2, n2);
  }, e3.prototype.getLocation = function(e4, t2) {
    return { row: this.rows[e4], column: this.columns[t2] };
  }, e3.prototype.getLocationById = function(e4, t2) {
    try {
      var n2 = this.rows[this.rowIndexLookup[e4]], o2 = this.columns[this.columnIndexLookup[t2]];
      return this.validateLocation({ row: n2, column: o2 });
    } catch (n3) {
      throw new RangeError("column: '".concat(t2, "', row: '").concat(e4, "'"));
    }
  }, e3.prototype.validateLocation = function(e4) {
    var t2, n2, o2 = null !== (t2 = this.columnIndexLookup[e4.column.columnId]) && void 0 !== t2 ? t2 : Math.min(e4.column.idx, this.last.column.idx), r2 = null !== (n2 = this.rowIndexLookup[e4.row.rowId]) && void 0 !== n2 ? n2 : Math.min(e4.row.idx, this.last.row.idx);
    return this.getLocation(r2, o2);
  }, e3.prototype.validateRange = function(e4) {
    return this.getRange(this.validateLocation(e4.first), this.validateLocation(e4.last));
  }, e3.prototype.getCell = function(e4) {
    return this.rows[e4.row.idx].cells[e4.column.idx];
  }, e3.DEFAULT_ROW_HEIGHT = 25, e3.MIN_ROW_HEIGHT = 25, e3.DEFAULT_COLUMN_WIDTH = 150, e3.MIN_COLUMN_WIDTH = 40, e3;
}();
function m(e3, t2) {
  return "".concat(e3, ", ").concat(t2);
}
function b(e3, t2) {
  return e3.column.columnId === (null == t2 ? void 0 : t2.column.columnId) && e3.row.rowId === (null == t2 ? void 0 : t2.row.rowId);
}
var v = function() {
  function e3(e4) {
    this.updateState = e4, this.eventTimestamps = [0, 0], this.eventLocations = [void 0, void 0], this.currentIndex = 0;
  }
  return e3.prototype.handlePointerDownInternal = function(e4, t2, n2) {
    this.pointerDownLocation = t2;
    var o2 = this.eventLocations[this.currentIndex];
    this.currentIndex = 1 - this.currentIndex, this.eventTimestamps[this.currentIndex] = (/* @__PURE__ */ new Date()).valueOf(), this.eventLocations[this.currentIndex] = t2;
    var r2 = 0 === t2.row.idx || 0 === t2.column.idx;
    return ("mouse" === e4.pointerType || r2 || b(t2, o2)) && (n2 = n2.currentBehavior.handlePointerDown(e4, t2, n2)), n2;
  }, e3.prototype.shouldHandleDoubleClick = function(e4, t2, n2) {
    return t2 - n2 < 500 && b(e4, this.eventLocations[0]) && b(e4, this.eventLocations[1]);
  }, e3.prototype.shouldHandleCellSelectionOnMobile = function(e4, t2, n2) {
    return "mouse" !== e4.pointerType && b(t2, this.pointerDownLocation) && void 0 !== e4.pointerType && n2 - this.eventTimestamps[this.currentIndex] < 500 && t2.row.idx > 0 && t2.column.idx > 0;
  }, e3;
}();
function y(e3) {
  return !(0 !== e3.button && void 0 !== e3.button || "reactgrid-content" === e3.target.className && void 0 !== e3.pointerType);
}
function x(e3, t2) {
  if (!t2.reactGridElement) return false;
  var n2 = t2.reactGridElement.getBoundingClientRect().left;
  return !(e3.clientX - n2 > t2.cellMatrix.width);
}
var I = function(e3, t2) {
  return I = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e4, t3) {
    e4.__proto__ = t3;
  } || function(e4, t3) {
    for (var n2 in t3) Object.prototype.hasOwnProperty.call(t3, n2) && (e4[n2] = t3[n2]);
  }, I(e3, t2);
};
function w(e3, t2) {
  if ("function" != typeof t2 && null !== t2) throw new TypeError("Class extends value " + String(t2) + " is not a constructor or null");
  function n2() {
    this.constructor = e3;
  }
  I(e3, t2), e3.prototype = null === t2 ? Object.create(t2) : (n2.prototype = t2.prototype, new n2());
}
var C = function() {
  return C = Object.assign || function(e3) {
    for (var t2, n2 = 1, o2 = arguments.length; n2 < o2; n2++) for (var r2 in t2 = arguments[n2]) Object.prototype.hasOwnProperty.call(t2, r2) && (e3[r2] = t2[r2]);
    return e3;
  }, C.apply(this, arguments);
};
function R(e3, t2, n2, o2) {
  return new (n2 || (n2 = Promise))(function(r2, i2) {
    function l2(e4) {
      try {
        c2(o2.next(e4));
      } catch (e5) {
        i2(e5);
      }
    }
    function a2(e4) {
      try {
        c2(o2.throw(e4));
      } catch (e5) {
        i2(e5);
      }
    }
    function c2(e4) {
      var t3;
      e4.done ? r2(e4.value) : (t3 = e4.value, t3 instanceof n2 ? t3 : new n2(function(e5) {
        e5(t3);
      })).then(l2, a2);
    }
    c2((o2 = o2.apply(e3, t2 || [])).next());
  });
}
function A(e3, t2) {
  var n2, o2, r2, i2, l2 = { label: 0, sent: function() {
    if (1 & r2[0]) throw r2[1];
    return r2[1];
  }, trys: [], ops: [] };
  return i2 = { next: a2(0), throw: a2(1), return: a2(2) }, "function" == typeof Symbol && (i2[Symbol.iterator] = function() {
    return this;
  }), i2;
  function a2(a3) {
    return function(c2) {
      return function(a4) {
        if (n2) throw new TypeError("Generator is already executing.");
        for (; i2 && (i2 = 0, a4[0] && (l2 = 0)), l2; ) try {
          if (n2 = 1, o2 && (r2 = 2 & a4[0] ? o2.return : a4[0] ? o2.throw || ((r2 = o2.return) && r2.call(o2), 0) : o2.next) && !(r2 = r2.call(o2, a4[1])).done) return r2;
          switch (o2 = 0, r2 && (a4 = [2 & a4[0], r2.value]), a4[0]) {
            case 0:
            case 1:
              r2 = a4;
              break;
            case 4:
              return l2.label++, { value: a4[1], done: false };
            case 5:
              l2.label++, o2 = a4[1], a4 = [0];
              continue;
            case 7:
              a4 = l2.ops.pop(), l2.trys.pop();
              continue;
            default:
              if (!(r2 = l2.trys, (r2 = r2.length > 0 && r2[r2.length - 1]) || 6 !== a4[0] && 2 !== a4[0])) {
                l2 = 0;
                continue;
              }
              if (3 === a4[0] && (!r2 || a4[1] > r2[0] && a4[1] < r2[3])) {
                l2.label = a4[1];
                break;
              }
              if (6 === a4[0] && l2.label < r2[1]) {
                l2.label = r2[1], r2 = a4;
                break;
              }
              if (r2 && l2.label < r2[2]) {
                l2.label = r2[2], l2.ops.push(a4);
                break;
              }
              r2[2] && l2.ops.pop(), l2.trys.pop();
              continue;
          }
          a4 = t2.call(e3, l2);
        } catch (e4) {
          a4 = [6, e4], o2 = 0;
        } finally {
          n2 = r2 = 0;
        }
        if (5 & a4[0]) throw a4[1];
        return { value: a4[0] ? a4[1] : void 0, done: true };
      }([a3, c2]);
    };
  }
}
function E(e3, t2, n2) {
  if (n2 || 2 === arguments.length) for (var o2, r2 = 0, i2 = t2.length; r2 < i2; r2++) !o2 && r2 in t2 || (o2 || (o2 = Array.prototype.slice.call(t2, 0, r2)), o2[r2] = t2[r2]);
  return e3.concat(o2 || Array.prototype.slice.call(t2));
}
var M = function(e3, t2) {
  return { row: e3, column: t2 };
};
function G(e3, t2) {
  var n2, o2 = e3.cellMatrix.getRange(t2, t2);
  return (null === (n2 = null == e3 ? void 0 : e3.props) || void 0 === n2 ? void 0 : n2.onSelectionChanged) && e3.props.onSelectionChanged([o2]), C(C({}, e3), { activeSelectedRangeIdx: 0, selectedRanges: [o2], selectedIndexes: [], selectedIds: [], selectionMode: "range" });
}
function N(e3, t2, n2) {
  return C(C({}, e3), { selectionMode: "range", selectedRanges: (n2 && "range" === e3.selectionMode ? e3.selectedRanges : []).concat([t2]), selectedIndexes: [], selectedIds: [], activeSelectedRangeIdx: n2 && "range" === e3.selectionMode ? e3.selectedRanges.length : 0 });
}
function k(e3, t2) {
  var n2;
  return C(C({}, e3), { selectionMode: "range", selectedRanges: Object.assign([], e3.selectedRanges, (n2 = {}, n2[e3.activeSelectedRangeIdx] = t2, n2)), selectedIndexes: [], selectedIds: [] });
}
function T(e3, t2, n2, o2) {
  var r2 = e3.cellMatrix.first.row, i2 = e3.cellMatrix.last.row, l2 = e3.cellMatrix.getRange(M(r2, t2), M(i2, n2));
  return C(C({}, e3), { selectionMode: "column", selectedIndexes: o2 ? e3.selectedIndexes.concat(l2.columns.map(function(e4) {
    return e4.idx;
  })) : l2.columns.map(function(e4) {
    return e4.idx;
  }), selectedIds: o2 ? e3.selectedIds.concat(l2.columns.map(function(e4) {
    return e4.columnId;
  })) : l2.columns.map(function(e4) {
    return e4.columnId;
  }) });
}
function S(e3, t2, n2, o2) {
  var r2 = e3.cellMatrix.first.column, i2 = e3.cellMatrix.last.column, l2 = e3.cellMatrix.getRange(M(t2, r2), M(n2, i2));
  return C(C({}, e3), { selectionMode: "row", selectedIndexes: o2 ? e3.selectedIndexes.concat(l2.rows.map(function(e4) {
    return e4.idx;
  })) : l2.rows.map(function(e4) {
    return e4.idx;
  }), selectedIds: o2 ? e3.selectedIds.concat(l2.rows.map(function(e4) {
    return e4.rowId;
  })) : l2.rows.map(function(e4) {
    return e4.rowId;
  }) });
}
var B;
var L = function() {
  function e3() {
    this.autoScrollDirection = "both";
  }
  return e3.prototype.handleKeyDown = function(e4, t2) {
    return t2;
  }, e3.prototype.handlePointerUp = function(e4, t2, n2) {
    return n2;
  }, e3.prototype.handleKeyUp = function(e4, t2) {
    return t2;
  }, e3.prototype.handleCompositionEnd = function(e4, t2) {
    return t2;
  }, e3.prototype.handleCopy = function(e4, t2) {
    return t2;
  }, e3.prototype.handlePaste = function(e4, t2) {
    return t2;
  }, e3.prototype.handleCut = function(e4, t2) {
    return t2;
  }, e3.prototype.handlePointerDown = function(e4, t2, n2) {
    return n2;
  }, e3.prototype.handleDoubleClick = function(e4, t2, n2) {
    return n2;
  }, e3.prototype.handlePointerMove = function(e4, t2, n2) {
    return n2;
  }, e3.prototype.handlePointerEnter = function(e4, t2, n2) {
    return n2;
  }, e3.prototype.handleContextMenu = function(e4, t2) {
    return t2;
  }, e3.prototype.renderPanePart = function(e4, t2) {
  }, e3;
}();
function P(e3, t2) {
  try {
    var n2 = e3.cellMatrix.getCell(t2);
    if (!n2) throw new TypeError("Cell doesn't exists at location");
    if (!n2.type) throw new Error("Cell is missing type property");
    var o2 = e3.cellTemplates[n2.type];
    if (!o2) throw new Error("CellTemplate missing for type '".concat(n2.type, "'"));
    var r2 = o2.getCompatibleCell(C(C({}, n2), { type: n2.type }));
    if (!r2) throw new Error("Cell validation failed");
    return { cell: r2, cellTemplate: o2 };
  } catch (e4) {
    throw new Error("".concat(e4.message, " (rowId: '").concat(t2.row.rowId, "', columnId: '").concat(t2.column.columnId, "')"));
  }
}
function W(e3, t2, n2) {
  var o2 = P(e3, t2), r2 = o2.cell, i2 = o2.cellTemplate;
  if (r2 === n2 || JSON.stringify(r2) === JSON.stringify(n2) || void 0 === i2.update) return e3;
  var l2 = i2.update(r2, n2);
  return l2 === r2 && JSON.stringify(l2) === JSON.stringify(r2) || l2.nonEditable || e3.queuedCellChanges.push({ previousCell: r2, newCell: l2, type: l2.type, rowId: t2.row.rowId, columnId: t2.column.columnId }), C({}, e3);
}
function X(e3, t2, n2, o2) {
  if (void 0 === n2 && (n2 = true), e3.focusedLocation && e3.currentlyEditedCell && o2 !== B.ENTER && (e3 = W(e3, e3.focusedLocation, e3.currentlyEditedCell)), !e3.props) throw new Error('"props" field on "state" object should be initiated before possible location focus');
  var r2 = e3.props, i2 = r2.onFocusLocationChanged, l2 = r2.onFocusLocationChanging, a2 = r2.focusLocation, c2 = P(e3, t2), s2 = c2.cell, u2 = c2.cellTemplate, d2 = { rowId: t2.row.rowId, columnId: t2.column.columnId }, g2 = !l2 || l2(d2), p2 = !u2.isFocusable || u2.isFocusable(s2), f2 = a2 ? e3.cellMatrix.getLocationById(a2.rowId, a2.columnId) : void 0, h2 = b(t2, e3.focusedLocation) || !f2 || b(t2, f2);
  if (!p2 || !g2 || !h2) return e3;
  i2 && i2(d2);
  var m2 = e3.cellMatrix.validateLocation(t2);
  return n2 && (e3 = G(e3, m2)), C(C({}, e3), { focusedLocation: m2, contextMenuPosition: { top: -1, left: -1 }, currentlyEditedCell: void 0 });
}
function H(e3, t2) {
  var n2 = getComputedStyle(e3), o2 = "absolute" === n2.position, r2 = t2 ? /(auto|scroll|hidden)/ : /(auto|scroll)/;
  if ("fixed" === n2.position) return document.documentElement;
  for (var i2 = e3; i2 = i2.parentElement; ) if (n2 = getComputedStyle(i2), (!o2 || "static" !== n2.position) && r2.test(n2.overflow + n2.overflowY + n2.overflowX)) return i2;
  return Z();
}
function F(e3) {
  var t2, n2;
  return { scrollLeft: void 0 !== e3 ? (null !== (t2 = e3.scrollLeft) && void 0 !== t2 ? t2 : Z().scrollX) - (e3.clientLeft || 0) : 0, scrollTop: void 0 !== e3 ? (null !== (n2 = e3.scrollTop) && void 0 !== n2 ? n2 : Z().scrollY) - (e3.clientTop || 0) : 0 };
}
function Z() {
  return window;
}
function V() {
  return "undefined" != typeof window && -1 !== window.navigator.appVersion.indexOf("Mac");
}
function O() {
  return "undefined" != typeof window && (!!/iPad|iPhone|iPod/.test(window.navigator.platform) || D());
}
function D() {
  return "undefined" != typeof window && (window.navigator.maxTouchPoints > 2 && /MacIntel/.test(window.navigator.platform));
}
function Y(e3) {
  return e3 ? { width: e3 instanceof HTMLElement ? e3.clientWidth : O() ? window.innerWidth : document.documentElement.clientWidth, height: e3 instanceof HTMLElement ? e3.clientHeight : O() ? window.innerHeight : document.documentElement.clientHeight } : { width: 0, height: 0 };
}
function z(e3) {
  var t2 = F(e3.scrollableElement), n2 = t2.scrollLeft, o2 = t2.scrollTop;
  if (!e3.reactGridElement) throw new Error('"state.reactGridElement" field should be initiated before calling "getBoundingClientRect()"');
  var r2 = e3.reactGridElement.getBoundingClientRect(), i2 = r2.left + n2, l2 = r2.top + o2;
  if (void 0 !== e3.scrollableElement && e3.scrollableElement !== Z()) {
    var a2 = e3.scrollableElement.getBoundingClientRect();
    i2 -= a2.left, l2 -= a2.top;
  }
  return { left: i2, top: l2 };
}
function J(e3) {
  var t2 = F(e3.scrollableElement), n2 = t2.scrollLeft, o2 = t2.scrollTop, r2 = Y(e3.scrollableElement), i2 = r2.width, l2 = r2.height, a2 = z(e3), c2 = a2.left, s2 = a2.top, u2 = o2 + l2, d2 = s2 + e3.cellMatrix.height, g2 = s2 < o2 ? o2 : s2, p2 = d2 > u2 ? u2 : d2, f2 = n2 + i2, h2 = c2 + e3.cellMatrix.width, m2 = c2 < n2 ? n2 : c2, b2 = h2 > f2 ? f2 : h2;
  return { width: Math.max(b2 - m2, 0), height: Math.max(p2 - g2, 0), visibleOffsetRight: f2 - b2, visibleOffsetBottom: u2 - p2 };
}
!function(e3) {
  e3[e3.POINTER = 1] = "POINTER", e3[e3.BACKSPACE = 8] = "BACKSPACE", e3[e3.TAB = 9] = "TAB", e3[e3.ENTER = 13] = "ENTER", e3[e3.SHIFT = 16] = "SHIFT", e3[e3.CTRL = 17] = "CTRL", e3[e3.ALT = 18] = "ALT", e3[e3.PAUSE = 19] = "PAUSE", e3[e3.CAPS_LOCK = 20] = "CAPS_LOCK", e3[e3.ESCAPE = 27] = "ESCAPE", e3[e3.SPACE = 32] = "SPACE", e3[e3.PAGE_UP = 33] = "PAGE_UP", e3[e3.PAGE_DOWN = 34] = "PAGE_DOWN", e3[e3.END = 35] = "END", e3[e3.HOME = 36] = "HOME", e3[e3.LEFT_ARROW = 37] = "LEFT_ARROW", e3[e3.UP_ARROW = 38] = "UP_ARROW", e3[e3.RIGHT_ARROW = 39] = "RIGHT_ARROW", e3[e3.DOWN_ARROW = 40] = "DOWN_ARROW", e3[e3.INSERT = 45] = "INSERT", e3[e3.DELETE = 46] = "DELETE", e3[e3.KEY_0 = 48] = "KEY_0", e3[e3.KEY_1 = 49] = "KEY_1", e3[e3.KEY_2 = 50] = "KEY_2", e3[e3.KEY_3 = 51] = "KEY_3", e3[e3.KEY_4 = 52] = "KEY_4", e3[e3.KEY_5 = 53] = "KEY_5", e3[e3.KEY_6 = 54] = "KEY_6", e3[e3.KEY_7 = 55] = "KEY_7", e3[e3.KEY_8 = 56] = "KEY_8", e3[e3.KEY_9 = 57] = "KEY_9", e3[e3.KEY_A = 65] = "KEY_A", e3[e3.KEY_B = 66] = "KEY_B", e3[e3.KEY_C = 67] = "KEY_C", e3[e3.KEY_D = 68] = "KEY_D", e3[e3.KEY_E = 69] = "KEY_E", e3[e3.KEY_F = 70] = "KEY_F", e3[e3.KEY_G = 71] = "KEY_G", e3[e3.KEY_H = 72] = "KEY_H", e3[e3.KEY_I = 73] = "KEY_I", e3[e3.KEY_J = 74] = "KEY_J", e3[e3.KEY_K = 75] = "KEY_K", e3[e3.KEY_L = 76] = "KEY_L", e3[e3.KEY_M = 77] = "KEY_M", e3[e3.KEY_N = 78] = "KEY_N", e3[e3.KEY_O = 79] = "KEY_O", e3[e3.KEY_P = 80] = "KEY_P", e3[e3.KEY_Q = 81] = "KEY_Q", e3[e3.KEY_R = 82] = "KEY_R", e3[e3.KEY_S = 83] = "KEY_S", e3[e3.KEY_T = 84] = "KEY_T", e3[e3.KEY_U = 85] = "KEY_U", e3[e3.KEY_V = 86] = "KEY_V", e3[e3.KEY_W = 87] = "KEY_W", e3[e3.KEY_X = 88] = "KEY_X", e3[e3.KEY_Y = 89] = "KEY_Y", e3[e3.KEY_Z = 90] = "KEY_Z", e3[e3.LEFT_META = 91] = "LEFT_META", e3[e3.RIGHT_META = 92] = "RIGHT_META", e3[e3.SELECT = 93] = "SELECT", e3[e3.NUMPAD_0 = 96] = "NUMPAD_0", e3[e3.NUMPAD_1 = 97] = "NUMPAD_1", e3[e3.NUMPAD_2 = 98] = "NUMPAD_2", e3[e3.NUMPAD_3 = 99] = "NUMPAD_3", e3[e3.NUMPAD_4 = 100] = "NUMPAD_4", e3[e3.NUMPAD_5 = 101] = "NUMPAD_5", e3[e3.NUMPAD_6 = 102] = "NUMPAD_6", e3[e3.NUMPAD_7 = 103] = "NUMPAD_7", e3[e3.NUMPAD_8 = 104] = "NUMPAD_8", e3[e3.NUMPAD_9 = 105] = "NUMPAD_9", e3[e3.MULTIPLY = 106] = "MULTIPLY", e3[e3.ADD = 107] = "ADD", e3[e3.SUBTRACT = 109] = "SUBTRACT", e3[e3.DECIMAL = 110] = "DECIMAL", e3[e3.DIVIDE = 111] = "DIVIDE", e3[e3.F1 = 112] = "F1", e3[e3.F2 = 113] = "F2", e3[e3.F3 = 114] = "F3", e3[e3.F4 = 115] = "F4", e3[e3.F5 = 116] = "F5", e3[e3.F6 = 117] = "F6", e3[e3.F7 = 118] = "F7", e3[e3.F8 = 119] = "F8", e3[e3.F9 = 120] = "F9", e3[e3.F10 = 121] = "F10", e3[e3.F11 = 122] = "F11", e3[e3.F12 = 123] = "F12", e3[e3.NUM_LOCK = 144] = "NUM_LOCK", e3[e3.SCROLL_LOCK = 145] = "SCROLL_LOCK", e3[e3.FIREFOX_DASH = 173] = "FIREFOX_DASH", e3[e3.SEMICOLON = 186] = "SEMICOLON", e3[e3.EQUALS = 187] = "EQUALS", e3[e3.COMMA = 188] = "COMMA", e3[e3.DASH = 189] = "DASH", e3[e3.PERIOD = 190] = "PERIOD", e3[e3.FORWARD_SLASH = 191] = "FORWARD_SLASH", e3[e3.GRAVE_ACCENT = 192] = "GRAVE_ACCENT", e3[e3.OPEN_BRACKET = 219] = "OPEN_BRACKET", e3[e3.BACK_SLASH = 220] = "BACK_SLASH", e3[e3.CLOSE_BRACKET = 221] = "CLOSE_BRACKET", e3[e3.SINGLE_QUOTE = 222] = "SINGLE_QUOTE";
}(B || (B = {}));
var j = function(e3, t2) {
  return e3 > t2 ? e3 - t2 : 0;
};
function U(e3, t2, n2, o2) {
  if (!e3.reactGridElement) throw new Error('"state.reactGridElement" field should be initiated before calling the "getBoundingClientRect()"');
  var r2 = e3.reactGridElement.getBoundingClientRect(), i2 = t2 - r2.left, l2 = n2 - r2.top, a2 = function(e4, t3, n3) {
    return Q(e4, t3, n3) || function(e5, t4, n4) {
      var o3 = e5.cellMatrix, r3 = F(e5.scrollableElement).scrollTop, i3 = z(e5).top, l3 = Y(e5.scrollableElement).height, a3 = j(r3, i3), c3 = Math.max(o3.height - l3 + i3, 0), s3 = J(e5).height + a3 - o3.ranges.stickyBottomRange.height;
      if (o3.ranges.stickyBottomRange.rows.length > 0 && t4 >= s3 && !(n4 && r3 + 1 < c3)) {
        var u3 = o3.ranges.stickyBottomRange.rows.find(function(e6) {
          return e6.bottom > t4 - s3;
        }) || o3.last.row;
        return { cellY: t4 - s3 - u3.top, row: u3 };
      }
    }(e4, t3, n3) || function(e5, t4) {
      if (e5.cellMatrix.scrollableRange.rows.length < 1) {
        var n4 = t4 >= e5.cellMatrix.height ? e5.cellMatrix.last : e5.cellMatrix.first;
        return { cellY: n4.row.height, row: n4.row };
      }
      return $(e5, t4);
    }(e4, t3);
  }(e3, l2, "vertical" === o2 || "both" === o2), c2 = a2.cellY, s2 = a2.row, u2 = function(e4, t3, n3) {
    return K(e4, t3, n3) || _(e4, t3, n3) || function(e5, t4) {
      if (e5.cellMatrix.scrollableRange.columns.length < 1) {
        var n4 = t4 >= e5.cellMatrix.width ? e5.cellMatrix.last : e5.cellMatrix.first;
        return { cellX: n4.column.width, column: n4.column };
      }
      return q(e5, t4);
    }(e4, t3);
  }(e3, i2, "horizontal" === o2 || "both" === o2), d2 = u2.cellX;
  return { row: s2, column: u2.column, viewportX: i2, viewportY: l2, cellX: d2, cellY: c2 };
}
function _(e3, t2, n2) {
  var o2 = e3.cellMatrix, r2 = F(e3.scrollableElement).scrollLeft, i2 = z(e3).left, l2 = Y(e3.scrollableElement).width, a2 = j(r2, i2), c2 = Math.max(o2.width - l2 + i2, 0), s2 = J(e3).width + a2 - o2.ranges.stickyRightRange.width;
  if (o2.ranges.stickyRightRange.columns.length > 0 && t2 >= s2 && !(n2 && r2 + 1 < c2)) {
    var u2 = o2.ranges.stickyRightRange.columns.find(function(e4) {
      return e4.right > t2 - s2;
    }) || o2.last.column;
    return { cellX: t2 - s2 - u2.left, column: u2 };
  }
}
function Q(e3, t2, n2) {
  var o2 = e3.cellMatrix, r2 = F(e3.scrollableElement).scrollTop, i2 = z(e3).top, l2 = j(r2, i2);
  if (o2.ranges.stickyTopRange.rows.find(function(e4) {
    return e4.bottom > t2 - l2;
  }) && t2 < o2.ranges.stickyTopRange.height + l2 && !(n2 && r2 > i2)) {
    var a2 = o2.ranges.stickyTopRange.rows.find(function(e4) {
      return e4.bottom > t2 - l2;
    }) || o2.ranges.stickyTopRange.first.row;
    return { cellY: t2 - a2.top, row: a2 };
  }
}
function K(e3, t2, n2) {
  var o2 = e3.cellMatrix, r2 = F(e3.scrollableElement).scrollLeft, i2 = z(e3).left, l2 = j(r2, i2);
  if (o2.ranges.stickyLeftRange.columns.find(function(e4) {
    return e4.right > t2 - l2;
  }) && t2 < o2.ranges.stickyLeftRange.width + l2 && !(n2 && r2 > i2)) {
    var a2 = o2.ranges.stickyLeftRange.columns.find(function(e4) {
      return e4.right > t2 - l2;
    }) || o2.ranges.stickyLeftRange.first.column;
    return { cellX: t2 - a2.left, column: a2 };
  }
}
function $(e3, t2) {
  var n2 = e3.cellMatrix, o2 = t2 - n2.ranges.stickyTopRange.height, r2 = n2.scrollableRange.rows.find(function(e4) {
    return e4.bottom >= o2;
  }) || n2.scrollableRange.last.row;
  return { cellY: o2 - r2.top, row: r2 };
}
function q(e3, t2) {
  var n2 = e3.cellMatrix, o2 = t2 - n2.ranges.stickyLeftRange.width, r2 = n2.scrollableRange.columns.find(function(e4) {
    return e4.right >= o2;
  }) || n2.scrollableRange.last.column;
  return { cellX: o2 - r2.left, column: r2 };
}
function ee(e3, t2) {
  e3.preventDefault();
  var n2 = e3.clientX, o2 = e3.clientY, r2 = t2.contextMenuPosition;
  r2.top = o2, r2.left = n2;
  var i2 = U(t2, n2, o2);
  return t2.selectedRanges.find(function(e4) {
    return e4.contains(i2);
  }) || (t2 = X(t2, i2)), C(C({}, t2), { contextMenuPosition: r2 });
}
var te = function(e3) {
  function t2() {
    return null !== e3 && e3.apply(this, arguments) || this;
  }
  return w(t2, e3), t2.prototype.handlePointerDown = function(e4, t3, n2) {
    if ("reactgrid-content" === e4.target.className) return n2;
    if (n2.enableRangeSelection && e4.shiftKey && n2.focusedLocation) {
      var o2 = n2.cellMatrix.getRange(n2.focusedLocation, t3);
      return Fc(e4) && "range" === n2.selectionMode ? k(n2, o2) : N(n2, o2, false);
    }
    if (n2.enableRangeSelection && Fc(e4)) {
      var r2 = n2.selectedRanges.findIndex(function(e5) {
        return e5.contains(t3);
      }), i2 = n2.selectedRanges[r2], l2 = P(n2, t3).cellTemplate;
      if (i2) n2 = X(n2, t3, false), n2 = C(C({}, n2), { activeSelectedRangeIdx: r2 });
      else if (!l2.isFocusable) {
        o2 = n2.cellMatrix.getRange(t3, t3);
        n2 = X(n2 = N(n2, o2, true), t3, false);
      }
    } else n2 = X(n2, t3);
    return n2;
  }, t2.prototype.handlePointerEnter = function(e4, t3, n2) {
    if (!n2.enableRangeSelection || !n2.focusedLocation || "reactgrid-content" === e4.target.className) return n2;
    var o2 = n2.cellMatrix.getRange(n2.focusedLocation, t3);
    return "range" === n2.selectionMode && x(e4, n2) ? k(n2, o2) : N(n2, o2, false);
  }, t2.prototype.handlePointerUp = function(e4, t3, n2) {
    var o2, r2;
    if ((null === (o2 = n2.props) || void 0 === o2 ? void 0 : o2.onSelectionChanging) && !n2.props.onSelectionChanging(n2.selectedRanges)) {
      var i2 = E([], n2.selectedRanges, true).filter(function(e5, t4) {
        return t4 !== n2.activeSelectedRangeIdx;
      });
      return C(C({}, n2), { selectedRanges: i2, activeSelectedRangeIdx: i2.length - 1 });
    }
    return (null === (r2 = n2.props) || void 0 === r2 ? void 0 : r2.onSelectionChanged) && n2.props.onSelectionChanged(n2.selectedRanges), n2;
  }, t2.prototype.handleContextMenu = function(e4, t3) {
    return ee(e4, t3);
  }, t2;
}(L);
var ne = function(t2) {
  var n2 = t2.left, o2 = t2.linePosition, r2 = t2.offset;
  return e.createElement(e.Fragment, null, -1 !== o2 && e.createElement("div", { className: "rg-column-resize-hint", style: { left: o2 - r2 } }, e.createElement("span", { style: { whiteSpace: "nowrap" } }, "Width: ", Math.floor(o2 - n2 - r2), "px")));
};
var oe = function(t2) {
  var n2 = t2.top, o2 = t2.linePosition, r2 = t2.offset;
  return e.createElement(e.Fragment, null, -1 !== o2 && e.createElement("div", { className: "rg-row-resize-hint", style: { top: o2 - r2 } }, e.createElement("span", { style: { whiteSpace: "nowrap" } }, "Height: ", Math.floor(o2 - n2 - r2), "px")));
};
var re = function(e3) {
  function n2() {
    var t2 = null !== e3 && e3.apply(this, arguments) || this;
    return t2.autoScrollDirection = "horizontal", t2;
  }
  return w(n2, e3), n2.prototype.handlePointerDown = function(e4, t2, n3) {
    var o2 = this;
    return this.initialLocation = t2, this.resizedColumn = t2.column, this.isInScrollableRange = n3.cellMatrix.scrollableRange.columns.some(function(e5) {
      return e5.idx === o2.resizedColumn.idx;
    }), n3;
  }, n2.prototype.handlePointerMove = function(e4, t2, n3) {
    var o2, r2, i2, l2, a2 = t2.viewportX;
    if (!(t2.column.idx === this.resizedColumn.idx && t2.cellX > (null !== (r2 = null === (o2 = n3.props) || void 0 === o2 ? void 0 : o2.minColumnWidth) && void 0 !== r2 ? r2 : h.MIN_COLUMN_WIDTH) || t2.column.idx > this.resizedColumn.idx)) {
      var c2 = this.getLinePositionOffset(n3);
      a2 = (null !== (l2 = null === (i2 = n3.props) || void 0 === i2 ? void 0 : i2.minColumnWidth) && void 0 !== l2 ? l2 : h.MIN_COLUMN_WIDTH) + this.resizedColumn.left + c2;
    }
    return C(C({}, n3), { linePosition: a2, lineOrientation: "vertical" });
  }, n2.prototype.handlePointerUp = function(e4, t2, n3) {
    var o2, r2, i2, l2, a2, c2 = this.resizedColumn.width + t2.viewportX - this.initialLocation.viewportX;
    if (null === (o2 = n3.props) || void 0 === o2 ? void 0 : o2.onColumnResized) {
      var s2 = c2 >= (null !== (i2 = null === (r2 = n3.props) || void 0 === r2 ? void 0 : r2.minColumnWidth) && void 0 !== i2 ? i2 : h.MIN_COLUMN_WIDTH) ? c2 : null !== (a2 = null === (l2 = n3.props) || void 0 === l2 ? void 0 : l2.minColumnWidth) && void 0 !== a2 ? a2 : h.MIN_COLUMN_WIDTH;
      n3.props.onColumnResized(this.resizedColumn.columnId, s2, n3.selectedIds);
    }
    var u2 = n3.focusedLocation;
    if (void 0 !== u2 && this.resizedColumn.columnId === u2.column.idx) {
      var d2 = C(C({}, u2.column), { width: c2 });
      u2 = C(C({}, u2), { column: d2 });
    }
    return C(C({}, n3), { linePosition: -1, focusedLocation: u2 });
  }, n2.prototype.renderPanePart = function(e4, n3) {
    var o2 = this.getLinePositionOffset(e4);
    return n3.contains(this.initialLocation) && import_react.default.createElement(ne, { left: this.resizedColumn.left, linePosition: e4.linePosition, offset: o2 });
  }, n2.prototype.getLinePositionOffset = function(e4) {
    var t2 = this, n3 = F(e4.scrollableElement).scrollLeft, o2 = z(e4).left, r2 = j(n3, o2), i2 = J(e4).width + r2 - e4.cellMatrix.ranges.stickyRightRange.width;
    return e4.cellMatrix.scrollableRange.columns.some(function(e5) {
      return e5.idx === t2.resizedColumn.idx;
    }) ? e4.cellMatrix.ranges.stickyLeftRange.width : e4.cellMatrix.ranges.stickyRightRange.columns.some(function(e5) {
      return e5.idx === t2.resizedColumn.idx;
    }) ? i2 : n3;
  }, n2;
}(L);
var ie = function(e3) {
  function t2() {
    var t3 = null !== e3 && e3.apply(this, arguments) || this;
    return t3.autoScrollDirection = "horizontal", t3;
  }
  return w(t2, e3), t2.prototype.handlePointerDown = function(e4, t3, n2) {
    this.initialColumnIdx = t3.column.idx, this.lastPossibleDropLocation = t3, this.selectedIdxs = n2.selectedIndexes.sort();
    var o2 = this.selectedIdxs.map(function(e5) {
      return n2.cellMatrix.columns[e5];
    }), r2 = this.selectedIdxs.filter(function(e5) {
      return e5 < t3.column.idx;
    }), i2 = r2.map(function(e5) {
      return n2.cellMatrix.columns[e5];
    }), l2 = i2.reduce(function(e5, t4) {
      return e5 + t4.width;
    }, 0);
    return this.pointerOffset = l2 + t3.cellX, C(C({}, n2), { lineOrientation: "vertical", shadowSize: o2.reduce(function(e5, t4) {
      return e5 + t4.width;
    }, 0), shadowPosition: this.getShadowPosition(t3, n2) });
  }, t2.prototype.handlePointerMove = function(e4, t3, n2) {
    return C(C({}, n2), { shadowPosition: this.getShadowPosition(t3, n2) });
  }, t2.prototype.getShadowPosition = function(e4, t3) {
    var n2 = e4.viewportX - this.pointerOffset, o2 = t3.cellMatrix.width - t3.shadowSize;
    return n2 < 0 ? 0 : n2 > o2 ? o2 : n2;
  }, t2.prototype.handlePointerEnter = function(e4, t3, n2) {
    var o2, r2 = this.getLastPossibleDropLocation(t3, n2), i2 = F(n2.scrollableElement).scrollLeft;
    if (!r2) return n2;
    var l2 = r2.column.idx > this.initialColumnIdx, a2 = Math.min(r2.viewportX - r2.cellX + (l2 ? r2.column.width : 0), ((null === (o2 = n2.visibleRange) || void 0 === o2 ? void 0 : o2.width) || 0) + n2.cellMatrix.ranges.stickyLeftRange.width + n2.cellMatrix.ranges.stickyRightRange.width + i2);
    return this.lastPossibleDropLocation = r2, C(C({}, n2), { linePosition: a2 });
  }, t2.prototype.getLastPossibleDropLocation = function(e4, t3) {
    var n2, o2 = e4.column.idx <= this.initialColumnIdx ? "before" : "after", r2 = this.selectedIdxs.map(function(e5) {
      return t3.cellMatrix.columns[e5].columnId;
    });
    return !(null === (n2 = t3.props) || void 0 === n2 ? void 0 : n2.canReorderColumns) || t3.props.canReorderColumns(e4.column.columnId, r2, o2) ? e4 : this.lastPossibleDropLocation;
  }, t2.prototype.handlePointerUp = function(e4, t3, n2) {
    var o2, r2;
    if (t3.column.idx !== this.initialColumnIdx && this.lastPossibleDropLocation && (null === (o2 = n2.props) || void 0 === o2 ? void 0 : o2.onColumnsReordered)) {
      var i2 = this.lastPossibleDropLocation.column.idx <= this.initialColumnIdx, l2 = this.selectedIdxs.map(function(e5) {
        return n2.cellMatrix.columns[e5].columnId;
      });
      null === (r2 = n2.props) || void 0 === r2 || r2.onColumnsReordered(this.lastPossibleDropLocation.column.columnId, l2, i2 ? "before" : "after");
    }
    return C(C({}, n2), { linePosition: -1, shadowPosition: -1, shadowCursor: "default" });
  }, t2.prototype.handleContextMenu = function(e4, t3) {
    return ee(e4, t3);
  }, t2;
}(L);
function le(e3, t2, n2) {
  var o2 = e3.scrollableElement;
  void 0 !== o2.scrollTop ? o2.scrollTop = t2 : o2.scrollTo({ top: t2 }), void 0 !== o2.scrollLeft ? o2.scrollLeft = n2 : o2.scrollTo({ left: n2 });
}
function ae(e3, t2) {
  return J(e3).height - t2;
}
function ce(e3, t2, n2, o2) {
  return n2 + e3.row.bottom - t2 - o2;
}
function se(e3, t2, n2) {
  return t2 - n2 + e3.row.top - 1;
}
function ue(e3, t2, n2) {
  var o2 = F(e3.scrollableElement).scrollTop, r2 = z(e3).top, i2 = j(o2, r2);
  return n2 < t2.row.bottom - i2;
}
function de(e3, t2) {
  var n2 = F(e3.scrollableElement).scrollTop, o2 = z(e3).top, r2 = j(n2, o2);
  return t2.row.top < r2;
}
function ge(e3, t2) {
  var n2 = e3.cellMatrix.ranges.stickyTopRange, o2 = t2.row;
  return n2.rows.length > 0 && o2.idx <= n2.last.row.idx;
}
function pe(e3, t2) {
  return J(e3).width - t2;
}
function fe(e3, t2, n2, o2) {
  return n2 + e3.column.right - t2 - o2;
}
function he(e3, t2, n2) {
  return t2 - n2 + e3.column.left - 1;
}
function me(e3, t2, n2) {
  var o2 = F(e3.scrollableElement).scrollLeft, r2 = z(e3).left, i2 = j(o2, r2);
  return n2 < t2.column.right - i2;
}
function be(e3, t2) {
  var n2 = F(e3.scrollableElement).scrollLeft, o2 = z(e3).left, r2 = j(n2, o2);
  return t2.column.left < r2;
}
function ve(e3, t2) {
  var n2 = e3.cellMatrix.ranges.stickyLeftRange, o2 = t2.column;
  return n2.columns.length > 0 && o2.idx <= n2.last.column.idx;
}
function ye(e3, t2, n2) {
  var o2 = n2.focusedLocation;
  if (o2) {
    var r2 = !(b(o2, t2.focusedLocation) || n2.currentBehavior instanceof re), i2 = void 0 !== n2.currentlyEditedCell && n2.currentlyEditedCell !== t2.currentlyEditedCell;
    if (r2 || i2) {
      var l2 = xe(n2, o2), a2 = l2.left;
      le(n2, l2.top, a2);
    }
  }
}
function xe(e3, t2, n2) {
  return void 0 === n2 && (n2 = "both"), { top: Ie(e3, t2, "horizontal" === n2), left: we(e3, t2, "vertical" === n2) };
}
function Ie(e3, t2, n2) {
  var o2 = e3.cellMatrix.ranges, r2 = o2.stickyTopRange, i2 = o2.stickyBottomRange, l2 = F(e3.scrollableElement).scrollTop, a2 = ae(e3, r2.height + i2.height), c2 = z(e3).top, s2 = j(l2, c2), u2 = t2.row;
  if (n2 || !u2) return l2;
  var d2 = Ce(e3, t2) ? 1 : 0;
  return ge(e3, t2) || function(e4, t3) {
    var n3 = e4.cellMatrix.ranges.stickyBottomRange, o3 = t3.row;
    return n3.rows.length > 0 && o3.idx >= n3.first.row.idx;
  }(e3, t2) ? l2 : ue(e3, t2, a2 + d2) ? ce(t2, a2 - 1 - d2, l2, s2) : de(e3, t2) ? se(t2, l2, s2) : l2;
}
function we(e3, t2, n2) {
  var o2 = e3.cellMatrix.ranges, r2 = o2.stickyLeftRange, i2 = o2.stickyRightRange, l2 = F(e3.scrollableElement).scrollLeft, a2 = pe(e3, r2.width + i2.width), c2 = z(e3).left, s2 = j(l2, c2), u2 = t2.column;
  if (n2 || !u2) return l2;
  var d2 = Ce(e3, t2) ? 1 : 0;
  return ve(e3, t2) || function(e4, t3) {
    var n3 = e4.cellMatrix.ranges.stickyRightRange, o3 = t3.column;
    return n3.columns.length > 0 && o3.idx >= n3.first.column.idx;
  }(e3, t2) ? l2 : me(e3, t2, a2 + d2) ? fe(t2, a2 - 1 - d2, l2, s2) : be(e3, t2) ? he(t2, l2, s2) : l2;
}
function Ce(e3, t2) {
  return e3.cellMatrix.scrollableRange.contains(t2) && e3.scrollableElement === Z();
}
var Re = function(e3) {
  function t2() {
    var t3 = null !== e3 && e3.apply(this, arguments) || this;
    return t3.handlePointerDown = function(e4, n2) {
      var o2;
      t3.isInLeftSticky = false, t3.isInRightSticky = false, t3.isInTopSticky = false, t3.isInBottomSticky = false;
      var r2 = function(e5, t4) {
        if (!t4.reactGridElement) throw new Error('"state.reactGridElement" field should be initiated before calling the "getBoundingClientRect()"');
        var n3 = t4.reactGridElement.getBoundingClientRect(), o3 = n3.left, r3 = n3.right, i3 = e5.clientX - o3, l2 = t4.cellMatrix.ranges.stickyRightRange.width;
        return !(i3 >= t4.cellMatrix.width - l2) || e5.clientX >= r3 - l2;
      }(e4, n2);
      if ((null === (o2 = n2.props) || void 0 === o2 ? void 0 : o2.onContextMenu) && r2 && window.addEventListener("contextmenu", t3.handleContextMenu, true), !r2) return C(C({}, n2), { contextMenuPosition: { top: -1, left: -1 } });
      if (!y(e4)) return n2;
      window.addEventListener("pointermove", t3.handlePointerMove), window.addEventListener("pointerup", t3.handlePointerUp);
      var i2 = U(n2, e4.clientX, e4.clientY);
      return t3.handlePointerDownInternal(e4, i2, n2);
    }, t3.handleHideContextMenu = function(e4) {
      window.removeEventListener("pointerdown", t3.handleHideContextMenu), t3.updateState(function(n2) {
        return e4 instanceof MouseEvent && t3.isContainElement(e4, n2) ? n2 : C(C({}, n2), { contextMenuPosition: { top: -1, left: -1 } });
      });
    }, t3.isContainElement = function(e4, t4) {
      var n2;
      return null === (n2 = t4.reactGridElement) || void 0 === n2 ? void 0 : n2.contains(e4.target);
    }, t3.handleContextMenu = function(e4) {
      window.removeEventListener("pointerup", t3.handlePointerUp), window.removeEventListener("pointermove", t3.handlePointerMove), window.removeEventListener("contextmenu", t3.handleContextMenu, true), window.addEventListener("pointerdown", t3.handleHideContextMenu), t3.updateState(function(n2) {
        var o2;
        if (t3.isContainElement(e4, n2)) {
          var r2 = U(n2, e4.clientX, e4.clientY);
          null === (o2 = (n2 = (n2 = n2.currentBehavior.handlePointerUp(e4, r2, n2)).currentBehavior.handleContextMenu(e4, n2)).hiddenFocusElement) || void 0 === o2 || o2.focus();
        }
        return n2;
      });
    }, t3.handlePointerMove = function(e4) {
      t3.updateState(function(n2) {
        var o2, r2 = n2.currentBehavior.autoScrollDirection, i2 = U(n2, e4.clientX, e4.clientY, void 0), l2 = U(n2, e4.clientX, e4.clientY, r2);
        if (i2.column.idx < l2.column.idx && !t3.isFromLeftToRightScroll && !t3.isInLeftSticky ? l2 = i2 : i2.column.idx > l2.column.idx && !t3.isFromRightToLeftScroll && !t3.isInRightSticky ? (t3.isFromRightToLeftScroll = false, l2 = i2) : i2.row.idx < l2.row.idx && !t3.isFromTopToBottomScroll && !t3.isInTopSticky ? (t3.isFromTopToBottomScroll = false, l2 = i2) : i2.row.idx > l2.row.idx && !t3.isFromBottomToTopScroll && !t3.isInBottomSticky ? (t3.isFromBottomToTopScroll = false, l2 = i2) : (t3.isInLeftSticky = true, t3.isInRightSticky = true, t3.isInTopSticky = true, t3.isInBottomSticky = true), "reactgrid-content" !== e4.target.className && !(n2.currentBehavior instanceof re) && (null === (o2 = n2.props) || void 0 === o2 ? void 0 : o2.enableRangeSelection) || n2.currentBehavior instanceof ie) {
          var a2 = xe(n2, l2), c2 = a2.left;
          le(n2, a2.top, c2);
        }
        n2 = n2.currentBehavior.handlePointerMove(e4, l2, n2);
        var s2 = t3.eventLocations[t3.currentIndex];
        return t3.eventLocations[t3.currentIndex] = l2, b(l2, s2) || (n2 = n2.currentBehavior.handlePointerEnter(e4, l2, n2)), n2;
      });
    }, t3.handlePointerUp = function(e4) {
      0 !== e4.button && void 0 !== e4.button || (window.removeEventListener("pointerup", t3.handlePointerUp), window.removeEventListener("pointermove", t3.handlePointerMove), window.removeEventListener("contextmenu", t3.handleContextMenu, true), t3.updateState(function(n2) {
        var o2, r2 = U(n2, e4.clientX, e4.clientY), i2 = (/* @__PURE__ */ new Date()).valueOf(), l2 = t3.eventTimestamps[1 - t3.currentIndex];
        return n2 = n2.currentBehavior.handlePointerUp(e4, r2, n2), t3.shouldHandleCellSelectionOnMobile(e4, r2, i2) && (n2 = n2.currentBehavior.handlePointerDown(e4, r2, n2)), n2 = C(C({}, n2), { currentBehavior: new qa() }), t3.shouldHandleDoubleClick(r2, i2, l2) && (n2 = n2.currentBehavior.handleDoubleClick(e4, r2, n2)), null === (o2 = n2.hiddenFocusElement) || void 0 === o2 || o2.focus(), n2;
      }));
    }, t3;
  }
  return w(t2, e3), t2;
}(v);
var Ae = 400;
var Ee = 300;
var Me = 1;
function Ge(e3) {
  if (e3.disableVirtualScrolling) {
    var t2 = e3.cellMatrix.scrollableRange, n2 = t2.rows, o2 = t2.columns, r2 = new f(n2, o2);
    return C(C({}, e3), { visibleRange: r2 });
  }
  var i2 = F(e3.scrollableElement), l2 = i2.scrollTop, a2 = i2.scrollLeft, c2 = Ne(e3, [-e3.cellMatrix.ranges.stickyTopRange.height], [-e3.cellMatrix.ranges.stickyLeftRange.width]), s2 = c2.width, u2 = c2.height, d2 = ke(e3, s2), g2 = Te(e3, u2), p2 = new f(g2, d2);
  return C(C({}, e3), { leftScrollBoudary: p2.columns.length > 0 ? a2 - Ee : 0, rightScrollBoudary: void 0 === p2.last.column ? 0 : Ee + a2, topScrollBoudary: p2.columns.length > 0 ? l2 - Ae : 0, bottomScrollBoudary: void 0 === p2.last.row ? 0 : Ae + l2, visibleRange: p2 });
}
function Ne(e3, t2, n2) {
  var o2 = J(e3), r2 = o2.height, i2 = o2.width, l2 = function(e4, t3) {
    return e4 + t3;
  };
  return { height: Math.max(t2.reduce(l2, r2), 0), width: Math.max(n2.reduce(l2, i2), 0) };
}
function ke(e3, t2) {
  var n2 = e3.cellMatrix.scrollableRange.columns, o2 = z(e3).left, r2 = F(e3.scrollableElement).scrollLeft, i2 = Math.max(Be(n2, r2 - o2 - Ee) - Me - 1, 0), l2 = Be(n2, t2 + j(r2, o2) + Ee, i2);
  return n2.slice(i2, l2 + Me);
}
function Te(e3, t2) {
  var n2 = e3.cellMatrix.scrollableRange.rows, o2 = z(e3).top, r2 = F(e3.scrollableElement).scrollTop, i2 = Math.max(Se(n2, r2 - o2 - Ae) - Me - 1, 0), l2 = Se(n2, t2 + j(r2, o2) + Ae, i2);
  return n2.slice(i2, l2 + Me);
}
function Se(e3, t2, n2, o2) {
  void 0 === n2 && (n2 = 0), void 0 === o2 && (o2 = e3.length - 1);
  var r2 = n2 + o2 >> 1;
  return r2 < 0 ? 0 : n2 >= o2 ? r2 : t2 < e3[r2].top ? Se(e3, t2, n2, r2) : Se(e3, t2, r2 + 1, o2);
}
function Be(e3, t2, n2, o2) {
  void 0 === n2 && (n2 = 0), void 0 === o2 && (o2 = e3.length - 1);
  var r2 = n2 + o2 >> 1;
  return r2 < 0 ? 0 : n2 >= o2 ? r2 : t2 < e3[r2].left ? Be(e3, t2, n2, r2) : Be(e3, t2, r2 + 1, o2);
}
var Le = 50;
function Pe(e3, t2) {
  var n2 = e3.horizontalStickyBreakpoint, o2 = void 0 === n2 ? Le : n2, r2 = e3.verticalStickyBreakpoint, i2 = void 0 === r2 ? Le : r2, l2 = e3.stickyLeftColumns || 0, a2 = e3.stickyTopRows || 0, c2 = e3.stickyRightColumns || 0, s2 = e3.stickyBottomRows || 0;
  if (e3.stickyTopRows || e3.stickyLeftColumns || e3.stickyRightColumns || e3.stickyBottomRows) {
    var u2 = Y(t2.scrollableElement), d2 = u2.width, g2 = u2.height;
    if (e3.stickyLeftColumns || e3.stickyRightColumns) {
      var p2 = e3.columns.slice(0, l2).reduce(function(e4, t3) {
        return e4 + (t3.width || h.DEFAULT_COLUMN_WIDTH);
      }, 0), f2 = 0;
      c2 > 0 && (f2 = e3.columns.slice(-c2).reduce(function(e4, t3) {
        return e4 + (t3.width || h.DEFAULT_COLUMN_WIDTH);
      }, 0));
      var m2 = p2 + f2 > o2 * d2 / 100;
      l2 = m2 ? 0 : l2, c2 = m2 ? 0 : c2;
    }
    if (e3.stickyTopRows || e3.stickyBottomRows) {
      var b2 = e3.rows.slice(0, a2).reduce(function(e4, t3) {
        return e4 + (t3.height || h.DEFAULT_ROW_HEIGHT);
      }, 0), v2 = 0;
      s2 > 0 && (v2 = e3.rows.slice(-s2).reduce(function(e4, t3) {
        return e4 + (t3.height || h.DEFAULT_ROW_HEIGHT);
      }, 0));
      var y2 = b2 + v2 > i2 * g2 / 100;
      a2 = y2 ? 0 : a2, s2 = y2 ? 0 : s2;
    }
  }
  return C(C({}, t2), { leftStickyColumns: l2, topStickyRows: a2, rightStickyColumns: c2, bottomStickyRows: s2 });
}
var We = function(e3, t2) {
  var n2 = this;
  this.updateState = e3, this.pointerEventsController = t2, this.pointerDownHandler = function(e4) {
    return n2.updateState(function(t3) {
      return n2.pointerEventsController.handlePointerDown(e4, t3);
    });
  }, this.keyDownHandler = function(e4) {
    return n2.updateState(function(t3) {
      return t3.currentBehavior.handleKeyDown(e4, t3);
    });
  }, this.keyUpHandler = function(e4) {
    return n2.updateState(function(t3) {
      return t3.currentBehavior.handleKeyUp(e4, t3);
    });
  }, this.compositionEndHandler = function(e4) {
    return n2.updateState(function(t3) {
      return t3.currentBehavior.handleCompositionEnd(e4, t3);
    });
  }, this.copyHandler = function(e4) {
    return n2.updateState(function(t3) {
      return t3.currentBehavior.handleCopy(e4, t3);
    });
  }, this.pasteHandler = function(e4) {
    return n2.updateState(function(t3) {
      return t3.currentBehavior.handlePaste(e4, t3);
    });
  }, this.cutHandler = function(e4) {
    return n2.updateState(function(t3) {
      return t3.currentBehavior.handleCut(e4, t3);
    });
  }, this.blurHandler = function(e4) {
    return n2.updateState(function(t3) {
      var n3, o2, r2;
      return (null === (o2 = null === (n3 = e4.target) || void 0 === n3 ? void 0 : n3.id) || void 0 === o2 ? void 0 : o2.startsWith("react-select-")) && (null === (r2 = t3.hiddenFocusElement) || void 0 === r2 || r2.focus({ preventScroll: true })), t3;
    });
  }, this.windowResizeHandler = function() {
    return n2.updateState(Ge);
  }, this.reactgridRefHandler = function(e4) {
    return n2.assignElementsRefs(e4, Ge);
  }, this.hiddenElementRefHandler = function(e4) {
    return n2.updateState(function(t3) {
      var n3;
      return (null === (n3 = t3.props) || void 0 === n3 ? void 0 : n3.initialFocusLocation) && e4 && e4.focus({ preventScroll: true }), t3.hiddenFocusElement = e4, t3;
    });
  }, this.pasteCaptureHandler = function(e4) {
    var t3, n3 = e4.clipboardData.getData("text/html"), o2 = new DOMParser().parseFromString(n3, "text/html");
    n3 && "reactgrid-content" === (null === (t3 = o2.body.firstElementChild) || void 0 === t3 ? void 0 : t3.getAttribute("data-reactgrid")) && (e4.bubbles = false);
  }, this.scrollHandlerInternal = function(e4) {
    try {
      return n2.updateOnScrollChange(e4);
    } catch (e5) {
      console.error(e5);
    }
  }, this.scrollHandler = function() {
    return n2.scrollHandlerInternal(Ge);
  }, this.assignElementsRefs = function(e4, t3) {
    e4 && n2.updateState(function(n3) {
      var o2 = H(e4, true);
      return n3.props && (n3 = Pe(n3.props, n3)), t3(C(C({}, n3), { reactGridElement: e4, scrollableElement: o2 }));
    });
  }, this.updateOnScrollChange = function(e4) {
    n2.updateState(function(t3) {
      if (t3.disableVirtualScrolling) return t3;
      var n3 = 200, o2 = F(t3.scrollableElement), r2 = o2.scrollTop, i2 = o2.scrollLeft, l2 = J(t3), a2 = l2.width, c2 = l2.height;
      return a2 > 0 && c2 > 0 && (r2 >= t3.bottomScrollBoudary - n3 || r2 <= t3.topScrollBoudary + n3 || i2 >= t3.rightScrollBoudary - n3 || i2 <= t3.leftScrollBoudary + n3) ? e4(t3) : t3;
    });
  };
};
var Xe = function() {
  function e3() {
    this.reset();
  }
  return e3.prototype.reset = function() {
    return this.cellMatrix = new h({}), this;
  }, e3.prototype.setProps = function(e4) {
    return this.cellMatrix.props = e4, this;
  }, e3.prototype.fillRowsAndCols = function(e4) {
    var t2 = this;
    void 0 === e4 && (e4 = { leftStickyColumns: 0, topStickyRows: 0, rightStickyColumns: 0, bottomStickyRows: 0 });
    var n2 = e4.leftStickyColumns, o2 = e4.topStickyRows, r2 = e4.rightStickyColumns, i2 = e4.bottomStickyRows;
    if (!Array.isArray(this.cellMatrix.props.rows)) throw new TypeError('Feeded ReactGrids "rows" property is not an array!');
    if (!Array.isArray(this.cellMatrix.props.columns)) throw new TypeError('Feeded ReactGrids "columns" property is not an array!');
    return this.cellMatrix.rows = this.cellMatrix.props.rows.reduce(function(e5, n3, r3) {
      var l2, a2, c2, s2, u2 = t2.getTop(r3, o2, i2, e5), d2 = n3.height ? n3.height < (null !== (a2 = null === (l2 = t2.cellMatrix.props) || void 0 === l2 ? void 0 : l2.minRowHeight) && void 0 !== a2 ? a2 : h.MIN_ROW_HEIGHT) ? null !== (s2 = null === (c2 = t2.cellMatrix.props) || void 0 === c2 ? void 0 : c2.minRowHeight) && void 0 !== s2 ? s2 : h.MIN_ROW_HEIGHT : n3.height : h.DEFAULT_ROW_HEIGHT;
      return e5.push(C(C({}, n3), { top: u2, height: d2, idx: r3, bottom: u2 + d2 })), t2.cellMatrix.height += d2, t2.cellMatrix.rowIndexLookup[n3.rowId] = r3, e5;
    }, []), this.cellMatrix.columns = this.cellMatrix.props.columns.reduce(function(e5, o3, i3) {
      var l2, a2, c2, s2, u2 = t2.getLeft(i3, n2, r2, e5), d2 = o3.width ? o3.width < (null !== (a2 = null === (l2 = t2.cellMatrix.props) || void 0 === l2 ? void 0 : l2.minColumnWidth) && void 0 !== a2 ? a2 : h.MIN_COLUMN_WIDTH) ? null !== (s2 = null === (c2 = t2.cellMatrix.props) || void 0 === c2 ? void 0 : c2.minColumnWidth) && void 0 !== s2 ? s2 : h.MIN_COLUMN_WIDTH : o3.width : h.DEFAULT_COLUMN_WIDTH;
      return e5.push(C(C({}, o3), { idx: i3, left: u2, width: d2, right: u2 + d2 })), t2.cellMatrix.width += d2, t2.cellMatrix.columnIndexLookup[o3.columnId] = i3, e5;
    }, []), this;
  }, e3.prototype.setRangesToRenderLookup = function() {
    var e4 = this, t2 = [];
    this.cellMatrix.rows.forEach(function(n3, o2) {
      n3.cells.forEach(function(n4, r2) {
        var i2 = "rowspan" in n4 && n4.rowspan || 0, l2 = "colspan" in n4 && n4.colspan || 0, a2 = i2 ? e4.cellMatrix.rows.slice(o2, o2 + i2) : [e4.cellMatrix.rows[o2]], c2 = l2 ? e4.cellMatrix.columns.slice(r2, r2 + l2) : [e4.cellMatrix.columns[r2]], s2 = new f(a2, c2);
        t2 = E(E([], t2, true), e4.getRangesToRender(s2), true), e4.cellMatrix.spanCellLookup[m(r2, o2)] = { range: s2 };
      });
    });
    var n2 = t2.map(function(e5) {
      return m(e5.first.column.idx, e5.first.row.idx);
    });
    return Object.keys(this.cellMatrix.spanCellLookup).forEach(function(t3) {
      n2.includes(t3) || (e4.cellMatrix.rangesToRender[t3] = e4.cellMatrix.spanCellLookup[t3]);
    }), this;
  }, e3.prototype.getRangesToRender = function(e4) {
    var t2 = e4.rows.flatMap(function(t3) {
      return e4.columns.map(function(e5) {
        return new f([t3], [e5]);
      });
    });
    return t2.shift(), t2;
  }, e3.prototype.fillSticky = function(e4) {
    void 0 === e4 && (e4 = { leftStickyColumns: 0, topStickyRows: 0, rightStickyColumns: 0, bottomStickyRows: 0 });
    var t2 = e4.leftStickyColumns, n2 = e4.topStickyRows, o2 = e4.rightStickyColumns, r2 = e4.bottomStickyRows;
    return this.cellMatrix.ranges.stickyLeftRange = new f(this.cellMatrix.rows, this.cellMatrix.columns.slice(0, t2 || 0)), this.cellMatrix.ranges.stickyTopRange = new f(this.cellMatrix.rows.slice(0, n2 || 0), this.cellMatrix.columns), this.cellMatrix.ranges.stickyRightRange = new f(this.cellMatrix.rows, this.cellMatrix.columns.slice(this.getStickyRightFirstIdx(t2, o2), this.cellMatrix.columns.length)), this.cellMatrix.ranges.stickyBottomRange = new f(this.cellMatrix.rows.slice(this.getStickyBottomFirstIdx(n2, r2), this.cellMatrix.rows.length), this.cellMatrix.columns), this;
  }, e3.prototype.fillScrollableRange = function(e4) {
    void 0 === e4 && (e4 = { leftStickyColumns: 0, topStickyRows: 0, rightStickyColumns: 0, bottomStickyRows: 0 });
    var t2 = e4.leftStickyColumns, n2 = e4.topStickyRows, o2 = e4.rightStickyColumns, r2 = e4.bottomStickyRows;
    return this.cellMatrix.scrollableRange = this.getScrollableRange(t2, n2, o2, r2), this;
  }, e3.prototype.setEdgeLocations = function() {
    return this.cellMatrix.first = this.cellMatrix.getLocation(0, 0), this.cellMatrix.last = this.cellMatrix.getLocation(this.cellMatrix.rows.length - 1, this.cellMatrix.columns.length - 1), this;
  }, e3.prototype.getTop = function(e4, t2, n2, o2) {
    return 0 === e4 || e4 === t2 || e4 === this.getStickyBottomFirstIdx(t2 || 0, n2 || 0) ? 0 : o2[e4 - 1].top + o2[e4 - 1].height;
  }, e3.prototype.getLeft = function(e4, t2, n2, o2) {
    return 0 === e4 || e4 === t2 || e4 === this.getStickyRightFirstIdx(t2 || 0, n2 || 0) ? 0 : o2[e4 - 1].left + o2[e4 - 1].width;
  }, e3.prototype.getScrollableRange = function(e4, t2, n2, o2) {
    return new f(this.cellMatrix.rows.slice(t2 || 0, this.getStickyBottomFirstIdx(t2, o2)), this.cellMatrix.columns.slice(e4 || 0, this.getStickyRightFirstIdx(e4, n2)));
  }, e3.prototype.getStickyBottomFirstIdx = function(e4, t2) {
    var n2 = t2 || 0, o2 = e4 || 0, r2 = this.cellMatrix.props.rows.length;
    return r2 - (n2 + o2 > r2 ? 0 : n2);
  }, e3.prototype.getStickyRightFirstIdx = function(e4, t2) {
    var n2 = t2 || 0, o2 = e4 || 0, r2 = this.cellMatrix.props.columns.length;
    return r2 - (n2 + o2 > r2 ? 0 : n2);
  }, e3.prototype.getCellMatrix = function() {
    var e4 = this.cellMatrix;
    return this.reset(), e4;
  }, e3;
}();
var He = function(e3, t2, n2) {
  var o2 = e3[t2];
  if (null == o2) throw new Error("Cell is missing property '".concat(String(t2), "'"));
  if (typeof o2 !== n2) throw new Error("Property '".concat(String(t2), "' expected to be of type '").concat(n2, "' but is '").concat(typeof o2, "'"));
  return o2;
};
var Fe = function() {
  function t2() {
  }
  return t2.prototype.getCompatibleCell = function(e3) {
    var t3 = He(e3, "checked", "boolean"), n2 = t3 ? e3.checkedText ? e3.checkedText : "1" : e3.uncheckedText ? e3.uncheckedText : "";
    return C(C({}, e3), { checked: !!t3, value: t3 ? 1 : NaN, text: n2 });
  }, t2.prototype.handleKeyDown = function(e3, t3, n2, o2, r2) {
    return o2 || t3 !== B.SPACE && t3 !== B.ENTER ? { cell: e3, enableEditMode: false } : { cell: this.getCompatibleCell(this.toggleCheckboxCell(e3)), enableEditMode: false };
  }, t2.prototype.toggleCheckboxCell = function(e3) {
    return this.getCompatibleCell(C(C({}, e3), { checked: !e3.checked }));
  }, t2.prototype.update = function(e3, t3) {
    var n2 = "checkbox" === t3.type ? t3.checked : !!t3.value;
    return this.getCompatibleCell(C(C({}, e3), { checked: n2 }));
  }, t2.prototype.getClassName = function(e3) {
    return e3.className ? e3.className : "";
  }, t2.prototype.render = function(t3, n2, o2) {
    var r2 = this;
    return e.createElement("label", null, e.createElement("input", { className: "rg-input", type: "checkbox", checked: t3.checked, onChange: function(e3) {
      return o2(r2.toggleCheckboxCell(t3), true);
    } }), e.createElement("span", null));
  }, t2;
}();
var Ze = function(e3) {
  return e3 >= B.KEY_0 && e3 <= B.KEY_Z || Ye(e3) || e3 >= B.MULTIPLY && e3 <= B.DIVIDE || e3 >= B.SEMICOLON && e3 <= B.SINGLE_QUOTE || e3 === B.SPACE;
};
var Ve = function(e3) {
  return null !== e3.match(/^[a-zA-Z0-9]$/);
};
var Oe = function(e3) {
  return 1 === e3.length;
};
var De = function(e3) {
  return e3 >= B.KEY_0 && e3 <= B.KEY_9 || Ye(e3);
};
var Ye = function(e3) {
  return e3 >= B.NUMPAD_0 && e3 <= B.NUMPAD_9;
};
var ze = function(e3) {
  return e3 >= B.COMMA && e3 <= B.PERIOD || e3 === B.DECIMAL || e3 === B.SUBTRACT || e3 === B.FIREFOX_DASH;
};
var Je = function(e3) {
  return null !== e3.match(/[\d.,+-]/);
};
var je = function(e3) {
  return e3 === B.LEFT_ARROW || e3 === B.RIGHT_ARROW || e3 === B.UP_ARROW || e3 === B.DOWN_ARROW || e3 === B.END || e3 === B.HOME || e3 === B.BACKSPACE || e3 === B.DELETE;
};
var Ue = function(e3) {
  return e3 >= B.F1 && e3 <= B.F12;
};
var _e = function(e3, t2) {
  "" !== t2 && (t2 = Ke());
  var n2 = "".concat(t2 && "".concat(t2, " ")).concat(e3);
  return Date.parse(n2);
};
var Qe = function(e3) {
  return e3.toString().padStart(2, "0");
};
var Ke = function() {
  return O() || D() ? "1970/01/01" : "1970-01-01";
};
var $e = [];
$e[8] = "", $e[9] = "", $e[13] = "\n", $e[16] = "", $e[17] = "", $e[18] = "", $e[19] = "", $e[20] = "", $e[27] = "", $e[32] = " ", $e[33] = "", $e[34] = "", $e[35] = "", $e[36] = "", $e[37] = "", $e[38] = "", $e[39] = "", $e[40] = "", $e[45] = "", $e[46] = "", $e[48] = ")", $e[49] = "!", $e[50] = "@", $e[51] = "#", $e[52] = "$", $e[53] = "%", $e[54] = "^", $e[55] = "&", $e[56] = "*", $e[57] = "(", $e[59] = ":", $e[61] = "+", $e[65] = "A", $e[66] = "B", $e[67] = "C", $e[68] = "D", $e[69] = "E", $e[70] = "F", $e[71] = "G", $e[72] = "H", $e[73] = "I", $e[74] = "J", $e[75] = "K", $e[76] = "L", $e[77] = "M", $e[78] = "N", $e[79] = "O", $e[80] = "P", $e[81] = "Q", $e[82] = "R", $e[83] = "S", $e[84] = "T", $e[85] = "U", $e[86] = "V", $e[87] = "W", $e[88] = "X", $e[89] = "Y", $e[90] = "Z", $e[91] = "", $e[92] = "", $e[93] = "", $e[96] = "0", $e[97] = "1", $e[98] = "2", $e[99] = "3", $e[100] = "4", $e[101] = "5", $e[102] = "6", $e[103] = "7", $e[104] = "8", $e[105] = "9", $e[106] = "*", $e[107] = "+", $e[109] = "_", $e[107] = "+", $e[111] = "/", $e[112] = "", $e[113] = "", $e[114] = "", $e[115] = "", $e[116] = "", $e[117] = "", $e[118] = "", $e[119] = "", $e[120] = "", $e[121] = "", $e[122] = "", $e[123] = "", $e[144] = "", $e[145] = "", $e[186] = ":", $e[187] = "+", $e[188] = "<", $e[189] = "_", $e[190] = ">", $e[191] = "?", $e[192] = "~", $e[219] = "{", $e[220] = "|", $e[221] = "}", $e[222] = '"';
var qe = [];
qe[8] = "", qe[9] = "", qe[13] = "\n", qe[16] = "", qe[17] = "", qe[18] = "", qe[19] = "", qe[20] = "", qe[27] = "", qe[32] = " ", qe[33] = "", qe[34] = "", qe[35] = "", qe[36] = "", qe[37] = "", qe[38] = "", qe[39] = "", qe[40] = "", qe[45] = "", qe[46] = "", qe[48] = "0", qe[49] = "1", qe[50] = "2", qe[51] = "3", qe[52] = "4", qe[53] = "5", qe[54] = "6", qe[55] = "7", qe[56] = "8", qe[57] = "9", qe[59] = ";", qe[61] = "=", qe[65] = "a", qe[66] = "b", qe[67] = "c", qe[68] = "d", qe[69] = "e", qe[70] = "f", qe[71] = "g", qe[72] = "h", qe[73] = "i", qe[74] = "j", qe[75] = "k", qe[76] = "l", qe[77] = "m", qe[78] = "n", qe[79] = "o", qe[80] = "p", qe[81] = "q", qe[82] = "r", qe[83] = "s", qe[84] = "t", qe[85] = "u", qe[86] = "v", qe[87] = "w", qe[88] = "x", qe[89] = "y", qe[90] = "z", qe[91] = "", qe[92] = "", qe[93] = "", qe[96] = "0", qe[97] = "1", qe[98] = "2", qe[99] = "3", qe[100] = "4", qe[101] = "5", qe[102] = "6", qe[103] = "7", qe[104] = "8", qe[105] = "9", qe[106] = "*", qe[107] = "+", qe[109] = "_", qe[107] = "+", qe[111] = "/", qe[112] = "", qe[113] = "", qe[114] = "", qe[115] = "", qe[116] = "", qe[117] = "", qe[118] = "", qe[119] = "", qe[120] = "", qe[121] = "", qe[122] = "", qe[123] = "", qe[144] = "", qe[145] = "", qe[186] = ";", qe[187] = "=", qe[188] = ",", qe[189] = "-", qe[190] = ".", qe[191] = "/", qe[192] = "`", qe[219] = "[", qe[220] = "\\", qe[221] = "]", qe[222] = "'";
var et = function(e3, t2) {
  return void 0 === t2 && (t2 = false), t2 ? $e[e3] : qe[e3];
};
var tt = function(e3, t2, n2) {
  void 0 === t2 && (t2 = false), void 0 === n2 && (n2 = false);
  var o2 = navigator.language || "en-US";
  return t2 || n2 ? e3.toLocaleUpperCase(o2) : e3.toLocaleLowerCase(o2);
};
var nt = function() {
  function t2() {
    this.wasEscKeyPressed = false;
  }
  return t2.prototype.getCompatibleCell = function(e3) {
    var t3 = e3.date ? He(e3, "date", "object") : /* @__PURE__ */ new Date(NaN), n2 = e3.format || new Intl.DateTimeFormat(window.navigator.language), o2 = t3.getTime(), r2 = Number.isNaN(o2) ? "" : n2.format(t3);
    return C(C({}, e3), { date: t3, value: o2, text: r2 });
  }, t2.prototype.handleKeyDown = function(e3, t3, n2, o2, r2, i2, l2) {
    return Ue(t3) ? t3 === B.F2 ? { cell: e3, enableEditMode: true } : { cell: e3, enableEditMode: false } : !n2 && Ve(tt(i2)) ? { cell: this.getCompatibleCell(C({}, e3)), enableEditMode: true } : { cell: e3, enableEditMode: t3 === B.POINTER || t3 === B.ENTER };
  }, t2.prototype.update = function(e3, t3) {
    return this.getCompatibleCell(C(C({}, e3), { date: new Date(t3.value) }));
  }, t2.prototype.getClassName = function(e3, t3) {
    return e3.className ? e3.className : "";
  }, t2.prototype.render = function(t3, n2, o2) {
    var r2 = this;
    if (!n2) return t3.text;
    if (!t3.date) return '"cell.date" is not initialized with a date value';
    var i2 = Qe(t3.date.getFullYear()), l2 = Qe(t3.date.getMonth() + 1), a2 = Qe(t3.date.getDate());
    return e.createElement("input", { className: "rg-input", ref: function(e3) {
      e3 && e3.focus();
    }, type: "date", defaultValue: "".concat(i2, "-").concat(l2, "-").concat(a2), onChange: function(e3) {
      if (e3.currentTarget.value) {
        var n3 = e3.currentTarget.value.split("-").map(function(e4) {
          return parseInt(e4);
        }), i3 = n3[0], l3 = n3[1], a3 = n3[2];
        o2(r2.getCompatibleCell(C(C({}, t3), { date: new Date(i3, l3 - 1, a3) })), false);
      }
    }, onBlur: function(e3) {
      if (e3.currentTarget.value) {
        var n3 = e3.currentTarget.value.split("-").map(function(e4) {
          return parseInt(e4);
        }), i3 = n3[0], l3 = n3[1], a3 = n3[2];
        o2(r2.getCompatibleCell(C(C({}, t3), { date: new Date(i3, l3 - 1, a3) })), !r2.wasEscKeyPressed), r2.wasEscKeyPressed = false;
      }
    }, onKeyDown: function(e3) {
      (De(e3.keyCode) || je(e3.keyCode) || e3.keyCode === B.COMMA || e3.keyCode === B.PERIOD || (e3.ctrlKey || e3.metaKey) && e3.keyCode === B.KEY_A) && e3.stopPropagation(), De(e3.keyCode) || je(e3.keyCode) || e3.keyCode === B.COMMA || e3.keyCode === B.PERIOD || e3.preventDefault(), e3.keyCode === B.ESCAPE && (r2.wasEscKeyPressed = true);
    }, onCopy: function(e3) {
      return e3.stopPropagation();
    }, onCut: function(e3) {
      return e3.stopPropagation();
    }, onPaste: function(e3) {
      return e3.stopPropagation();
    }, onPointerDown: function(e3) {
      return e3.stopPropagation();
    } });
  }, t2;
}();
var ot = function() {
  function t2() {
    this.wasEscKeyPressed = false;
  }
  return t2.prototype.getCompatibleCell = function(e3) {
    var t3 = He(e3, "text", "string"), n2 = parseFloat(t3);
    return C(C({}, e3), { text: t3, value: n2 });
  }, t2.prototype.handleKeyDown = function(e3, t3, n2, o2, r2, i2, l2) {
    if (Ue(t3)) return t3 === B.F2 ? { cell: e3, enableEditMode: true } : { cell: e3, enableEditMode: false };
    var a2 = tt(i2, o2, l2);
    return n2 || r2 || !Ze(t3) || o2 && t3 === B.SPACE ? { cell: e3, enableEditMode: t3 === B.POINTER || t3 === B.ENTER } : { cell: C(C({}, e3), { text: a2 }), enableEditMode: true };
  }, t2.prototype.handleCompositionEnd = function(e3, t3) {
    return { cell: C(C({}, e3), { text: t3 }), enableEditMode: true };
  }, t2.prototype.update = function(e3, t3) {
    return this.getCompatibleCell(C(C({}, e3), { text: t3.text }));
  }, t2.prototype.getClassName = function(e3, t3) {
    return !e3.validator || e3.validator(e3.text) ? "valid" : "rg-invalid";
  }, t2.prototype.render = function(t3, n2, o2) {
    var r2 = this;
    if (!n2) {
      var i2 = !(!t3.validator || t3.validator(t3.text)) && t3.errorMessage ? t3.errorMessage : t3.text;
      return t3.renderer ? t3.renderer(i2) : i2;
    }
    return e.createElement("input", { className: "rg-input", ref: function(e3) {
      e3 && e3.focus();
    }, onChange: function(e3) {
      return o2(r2.getCompatibleCell(C(C({}, t3), { text: e3.currentTarget.value })), false);
    }, onBlur: function(e3) {
      o2(r2.getCompatibleCell(C(C({}, t3), { text: e3.currentTarget.value })), !r2.wasEscKeyPressed), r2.wasEscKeyPressed = false;
    }, onKeyDown: function(e3) {
      (Ze(e3.keyCode) || je(e3.keyCode)) && e3.stopPropagation(), e3.keyCode === B.ESCAPE && (r2.wasEscKeyPressed = true);
    }, defaultValue: t3.text, onCopy: function(e3) {
      return e3.stopPropagation();
    }, onCut: function(e3) {
      return e3.stopPropagation();
    }, onPaste: function(e3) {
      return e3.stopPropagation();
    }, onPointerDown: function(e3) {
      return e3.stopPropagation();
    } });
  }, t2;
}();
var rt = function() {
  function t2() {
    this.wasEscKeyPressed = false;
  }
  return t2.prototype.getCompatibleCell = function(e3) {
    var t3 = He(e3, "text", "string"), n2 = false;
    try {
      n2 = He(e3, "isExpanded", "boolean");
    } catch (e4) {
      n2 = true;
    }
    var o2 = -1;
    try {
      o2 = He(e3, "indent", "number");
    } catch (e4) {
      o2 = 0;
    }
    var r2 = false;
    try {
      r2 = He(e3, "hasChildren", "boolean");
    } catch (e4) {
      r2 = false;
    }
    var i2 = parseFloat(t3);
    return C(C({}, e3), { text: t3, value: i2, isExpanded: n2, indent: o2, hasChildren: r2 });
  }, t2.prototype.update = function(e3, t3) {
    return this.getCompatibleCell(C(C({}, e3), { isExpanded: t3.isExpanded, text: t3.text }));
  }, t2.prototype.handleKeyDown = function(e3, t3, n2, o2, r2, i2, l2) {
    if (Ue(t3)) return t3 === B.F2 ? { cell: e3, enableEditMode: true } : { cell: e3, enableEditMode: false };
    var a2 = t3 === B.POINTER || t3 === B.ENTER, c2 = C({}, e3), s2 = tt(i2, o2, l2);
    return t3 !== B.SPACE || void 0 === c2.isExpanded || o2 ? n2 || r2 || !Ze(t3) || o2 && t3 === B.SPACE || (c2.text = s2, a2 = true) : c2.isExpanded = !c2.isExpanded, { cell: c2, enableEditMode: a2 };
  }, t2.prototype.handleCompositionEnd = function(e3, t3) {
    return { cell: C(C({}, e3), { text: t3 }), enableEditMode: true };
  }, t2.prototype.getClassName = function(e3, t3) {
    var n2, o2 = e3.hasChildren ? e3.isExpanded ? "expanded" : "collapsed" : "", r2 = null !== (n2 = e3.className) && void 0 !== n2 ? n2 : "";
    return "".concat(o2, " ").concat(r2);
  }, t2.prototype.getStyle = function(e3, t3) {
    var n2, o2 = null !== (n2 = e3.indent) && void 0 !== n2 ? n2 : 0;
    return { paddingLeft: "calc(".concat(1.4 * o2, "em + 2px)") };
  }, t2.prototype.render = function(t3, n2, o2) {
    var r2 = this;
    return n2 ? e.createElement("input", { className: "rg-input", ref: function(e3) {
      e3 && (e3.focus(), e3.setSelectionRange(e3.value.length, e3.value.length));
    }, defaultValue: t3.text, onChange: function(e3) {
      return o2(r2.getCompatibleCell(C(C({}, t3), { text: e3.currentTarget.value })), false);
    }, onBlur: function(e3) {
      o2(r2.getCompatibleCell(C(C({}, t3), { text: e3.currentTarget.value })), !r2.wasEscKeyPressed), r2.wasEscKeyPressed = false;
    }, onCopy: function(e3) {
      return e3.stopPropagation();
    }, onCut: function(e3) {
      return e3.stopPropagation();
    }, onPaste: function(e3) {
      return e3.stopPropagation();
    }, onPointerDown: function(e3) {
      return e3.stopPropagation();
    }, onKeyDown: function(e3) {
      (Ze(e3.keyCode) || je(e3.keyCode)) && e3.stopPropagation(), e3.keyCode === B.ESCAPE && (r2.wasEscKeyPressed = true);
    } }) : e.createElement(e.Fragment, null, t3.hasChildren ? e.createElement("div", { className: "chevron", onPointerDown: function(e3) {
      e3.stopPropagation(), o2(r2.getCompatibleCell(C(C({}, t3), { isExpanded: !t3.isExpanded })), true);
    } }, e.createElement("span", { className: "icon" }, "❯")) : e.createElement("div", { className: "no-child" }), t3.text);
  }, t2;
}();
var it = function() {
  function e3() {
    this.isFocusable = function(e4) {
      return false;
    }, this.getStyle = function(e4) {
      return { background: "rgba(128, 128, 128, 0.1)" };
    };
  }
  return e3.prototype.getCompatibleCell = function(e4) {
    var t2 = He(e4, "text", "string"), n2 = parseFloat(t2);
    return C(C({}, e4), { text: t2, value: n2 });
  }, e3.prototype.render = function(e4, t2, n2) {
    return e4.text;
  }, e3.prototype.getClassName = function(e4, t2) {
    return e4.className ? e4.className : "";
  }, e3;
}();
var lt = function() {
  return navigator.language || "en-US";
};
function at(e3, t2) {
  if (void 0 === t2 && (t2 = lt()), !e3.trim()) return NaN;
  var n2 = function(e4) {
    var t3 = Intl.NumberFormat(e4).format(123456.789);
    return { thousandsSeparator: t3.split("123")[1][0], decimalSeparator: t3.split("123")[1][4] };
  }(t2), o2 = n2.thousandsSeparator, r2 = n2.decimalSeparator, i2 = e3.replace(/\u00A0/g, " ").replace(new RegExp("[".concat(o2, "\\s]"), "g"), "").replace(new RegExp("\\".concat(r2), "g"), ".").replace(/^(?!-)\D+|\D+$/g, "");
  return null === i2 || 0 === i2.trim().length ? NaN : Number(i2);
}
var ct = function() {
  function t2() {
    this.wasEscKeyPressed = false, this.getTextFromCharCode = function(e3) {
      switch (e3.charCodeAt(0)) {
        case B.DASH:
        case B.FIREFOX_DASH:
        case B.SUBTRACT:
          return "-";
        case B.COMMA:
          return ",";
        case B.PERIOD:
        case B.DECIMAL:
          return ".";
        default:
          return e3;
      }
    };
  }
  return t2.prototype.getCompatibleCell = function(e3) {
    var t3;
    try {
      t3 = He(e3, "value", "number");
    } catch (e4) {
      t3 = NaN;
    }
    var n2 = e3.format || new Intl.NumberFormat(window.navigator.language), o2 = e3.nanToZero && Number.isNaN(t3) ? 0 : t3, r2 = Number.isNaN(o2) || e3.hideZero && 0 === o2 ? "" : n2.format(o2);
    return C(C({}, e3), { value: o2, text: r2 });
  }, t2.prototype.handleKeyDown = function(e3, t3, n2, o2, r2, i2, l2) {
    if (Ye(t3) && (t3 -= 48), Ue(t3)) return t3 === B.F2 ? { cell: e3, enableEditMode: true } : { cell: e3, enableEditMode: false };
    var a2 = tt(i2);
    if (!n2 && Je(a2)) {
      var c2 = Number(a2);
      return Number.isNaN(c2) && Je(a2) ? { cell: C(C({}, this.getCompatibleCell(C(C({}, e3), { value: c2 }))), { text: a2 }), enableEditMode: true } : { cell: this.getCompatibleCell(C(C({}, e3), { value: c2 })), enableEditMode: true };
    }
    return { cell: e3, enableEditMode: t3 === B.POINTER || t3 === B.ENTER };
  }, t2.prototype.update = function(e3, t3) {
    return this.getCompatibleCell(C(C({}, e3), { value: t3.value }));
  }, t2.prototype.getClassName = function(e3, t3) {
    var n2, o2, r2 = null === (o2 = null === (n2 = e3.validator) || void 0 === n2 ? void 0 : n2.call(e3, e3.value)) || void 0 === o2 || o2, i2 = e3.className || "";
    return "".concat(r2 ? "" : "rg-invalid", " ").concat(i2);
  }, t2.prototype.render = function(t3, n2, o2) {
    var r2, i2, l2 = this;
    if (!n2) return !(null === (i2 = null === (r2 = t3.validator) || void 0 === r2 ? void 0 : r2.call(t3, t3.value)) || void 0 === i2 || i2) && t3.errorMessage ? t3.errorMessage : t3.text;
    var a2 = t3.format ? t3.format.resolvedOptions().locale : window.navigator.languages[0], c2 = new Intl.NumberFormat(a2, { useGrouping: false, maximumFractionDigits: 20 });
    return e.createElement("input", { className: "rg-input", inputMode: "decimal", ref: function(e3) {
      e3 && (e3.focus(), e3.setSelectionRange(e3.value.length, e3.value.length));
    }, defaultValue: Number.isNaN(t3.value) ? this.getTextFromCharCode(t3.text) : c2.format(t3.value), onChange: function(e3) {
      return o2(l2.getCompatibleCell(C(C({}, t3), { value: at(e3.currentTarget.value) })), false);
    }, onBlur: function(e3) {
      o2(l2.getCompatibleCell(C(C({}, t3), { value: at(e3.currentTarget.value) })), !l2.wasEscKeyPressed), l2.wasEscKeyPressed = false;
    }, onKeyDown: function(e3) {
      (De(e3.keyCode) || je(e3.keyCode) || ze(e3.keyCode) || (e3.ctrlKey || e3.metaKey) && e3.keyCode === B.KEY_A) && e3.stopPropagation(), De(e3.keyCode) || je(e3.keyCode) || Je(tt(e3.key)) || e3.preventDefault(), e3.keyCode === B.ESCAPE && (l2.wasEscKeyPressed = true);
    }, onCopy: function(e3) {
      return e3.stopPropagation();
    }, onCut: function(e3) {
      return e3.stopPropagation();
    }, onPaste: function(e3) {
      return e3.stopPropagation();
    }, onPointerDown: function(e3) {
      return e3.stopPropagation();
    } });
  }, t2;
}();
var st = function() {
  function t2() {
    this.wasEscKeyPressed = false;
  }
  return t2.prototype.getCompatibleCell = function(e3) {
    var t3, n2 = He(e3, "text", "string");
    try {
      t3 = He(e3, "placeholder", "string");
    } catch (e4) {
      t3 = "";
    }
    var o2 = parseFloat(n2);
    return C(C({}, e3), { text: n2, value: o2, placeholder: t3 });
  }, t2.prototype.update = function(e3, t3) {
    return this.getCompatibleCell(C(C({}, e3), { text: t3.text, placeholder: t3.placeholder }));
  }, t2.prototype.handleKeyDown = function(e3, t3, n2, o2, r2, i2, l2) {
    if (Ue(t3)) return t3 === B.F2 ? { cell: e3, enableEditMode: true } : { cell: e3, enableEditMode: false };
    var a2 = tt(i2, o2, l2);
    return n2 || r2 || !Ze(t3) || o2 && t3 === B.SPACE ? { cell: e3, enableEditMode: t3 === B.POINTER || t3 === B.ENTER } : { cell: this.getCompatibleCell(C(C({}, e3), { text: a2 })), enableEditMode: true };
  }, t2.prototype.handleCompositionEnd = function(e3, t3) {
    return { cell: C(C({}, e3), { text: t3 }), enableEditMode: true };
  }, t2.prototype.getClassName = function(e3, t3) {
    var n2 = !e3.validator || e3.validator(e3.text), o2 = e3.className ? e3.className : "";
    return "".concat(n2 ? "valid" : "rg-invalid", " ").concat(e3.placeholder && "" === e3.text ? "placeholder" : "", " ").concat(o2);
  }, t2.prototype.render = function(t3, n2, o2) {
    var r2 = this;
    if (!n2) {
      var i2 = !t3.validator || t3.validator(t3.text), l2 = t3.text || t3.placeholder || "", a2 = !i2 && t3.errorMessage ? t3.errorMessage : l2;
      return t3.renderer ? t3.renderer(a2) : a2;
    }
    return e.createElement("input", { className: "rg-input", ref: function(e3) {
      e3 && (e3.focus(), e3.setSelectionRange(e3.value.length, e3.value.length));
    }, defaultValue: t3.text, onChange: function(e3) {
      return o2(r2.getCompatibleCell(C(C({}, t3), { text: e3.currentTarget.value })), false);
    }, onBlur: function(e3) {
      o2(r2.getCompatibleCell(C(C({}, t3), { text: e3.currentTarget.value })), !r2.wasEscKeyPressed), r2.wasEscKeyPressed = false;
    }, onCopy: function(e3) {
      return e3.stopPropagation();
    }, onCut: function(e3) {
      return e3.stopPropagation();
    }, onPaste: function(e3) {
      return e3.stopPropagation();
    }, onPointerDown: function(e3) {
      return e3.stopPropagation();
    }, placeholder: t3.placeholder, onKeyDown: function(e3) {
      (Ze(e3.keyCode) || je(e3.keyCode)) && e3.stopPropagation(), e3.keyCode === B.ESCAPE && (r2.wasEscKeyPressed = true);
    } });
  }, t2;
}();
var ut = function() {
  function t2() {
    this.wasEscKeyPressed = false;
  }
  return t2.prototype.getCompatibleCell = function(e3) {
    var n2 = e3.time ? He(e3, "time", "object") : /* @__PURE__ */ new Date(NaN), o2 = e3.format || new Intl.DateTimeFormat(window.navigator.language), r2 = n2.getTime() % t2.dayInMillis, i2 = Number.isNaN(r2) ? "" : o2.format(n2);
    return C(C({}, e3), { time: n2, value: r2, text: i2 });
  }, t2.prototype.handleKeyDown = function(e3, t3, n2, o2, r2, i2) {
    return Ue(t3) ? t3 === B.F2 ? { cell: e3, enableEditMode: true } : { cell: e3, enableEditMode: false } : !n2 && Je(tt(i2)) ? { cell: this.getCompatibleCell(C({}, e3)), enableEditMode: true } : { cell: e3, enableEditMode: t3 === B.POINTER || t3 === B.ENTER };
  }, t2.prototype.update = function(e3, t3) {
    var n2 = _e(t3.text);
    return "" === t3.text || Number.isNaN(n2) ? this.getCompatibleCell(C(C({}, e3), { time: new Date(t3.value) })) : this.getCompatibleCell(C(C({}, e3), { time: new Date(n2) }));
  }, t2.prototype.getClassName = function(e3, t3) {
    return e3.className ? e3.className : "";
  }, t2.prototype.render = function(t3, n2, o2) {
    var r2 = this;
    if (!n2) return t3.text;
    if (!t3.time) return '"cell.time" is not initialized with a time value';
    var i2 = Qe(t3.time.getHours()), l2 = Qe(t3.time.getMinutes());
    return e.createElement("input", { className: "rg-input", ref: function(e3) {
      e3 && e3.focus();
    }, type: "time", defaultValue: "".concat(i2, ":").concat(l2), onChange: function(e3) {
      var n3 = _e(e3.currentTarget.value);
      Number.isNaN(n3) || o2(r2.getCompatibleCell(C(C({}, t3), { time: new Date(n3) })), false);
    }, onBlur: function(e3) {
      var n3 = _e(e3.currentTarget.value);
      Number.isNaN(n3) || (o2(r2.getCompatibleCell(C(C({}, t3), { time: new Date(n3) })), !r2.wasEscKeyPressed), r2.wasEscKeyPressed = false);
    }, onKeyDown: function(e3) {
      (De(e3.keyCode) || je(e3.keyCode) || e3.keyCode === B.COMMA || e3.keyCode === B.PERIOD || (e3.ctrlKey || e3.metaKey) && e3.keyCode === B.KEY_A) && e3.stopPropagation(), De(e3.keyCode) || je(e3.keyCode) || e3.keyCode === B.COMMA || e3.keyCode === B.PERIOD || e3.preventDefault(), e3.keyCode === B.ESCAPE && (r2.wasEscKeyPressed = true);
    }, onCopy: function(e3) {
      return e3.stopPropagation();
    }, onCut: function(e3) {
      return e3.stopPropagation();
    }, onPaste: function(e3) {
      return e3.stopPropagation();
    }, onPointerDown: function(e3) {
      return e3.stopPropagation();
    } });
  }, t2.dayInMillis = 864e5, t2.defaultDate = Ke(), t2;
}();
function dt(e3) {
  return dt = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e4) {
    return typeof e4;
  } : function(e4) {
    return e4 && "function" == typeof Symbol && e4.constructor === Symbol && e4 !== Symbol.prototype ? "symbol" : typeof e4;
  }, dt(e3);
}
function gt(e3) {
  var t2 = function(e4, t3) {
    if ("object" !== dt(e4) || null === e4) return e4;
    var n2 = e4[Symbol.toPrimitive];
    if (void 0 !== n2) {
      var o2 = n2.call(e4, t3 || "default");
      if ("object" !== dt(o2)) return o2;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return ("string" === t3 ? String : Number)(e4);
  }(e3, "string");
  return "symbol" === dt(t2) ? t2 : String(t2);
}
function pt(e3, t2, n2) {
  return (t2 = gt(t2)) in e3 ? Object.defineProperty(e3, t2, { value: n2, enumerable: true, configurable: true, writable: true }) : e3[t2] = n2, e3;
}
function ft(e3, t2) {
  var n2 = Object.keys(e3);
  if (Object.getOwnPropertySymbols) {
    var o2 = Object.getOwnPropertySymbols(e3);
    t2 && (o2 = o2.filter(function(t3) {
      return Object.getOwnPropertyDescriptor(e3, t3).enumerable;
    })), n2.push.apply(n2, o2);
  }
  return n2;
}
function ht(e3) {
  for (var t2 = 1; t2 < arguments.length; t2++) {
    var n2 = null != arguments[t2] ? arguments[t2] : {};
    t2 % 2 ? ft(Object(n2), true).forEach(function(t3) {
      pt(e3, t3, n2[t3]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e3, Object.getOwnPropertyDescriptors(n2)) : ft(Object(n2)).forEach(function(t3) {
      Object.defineProperty(e3, t3, Object.getOwnPropertyDescriptor(n2, t3));
    });
  }
  return e3;
}
function mt(e3, t2) {
  (null == t2 || t2 > e3.length) && (t2 = e3.length);
  for (var n2 = 0, o2 = new Array(t2); n2 < t2; n2++) o2[n2] = e3[n2];
  return o2;
}
function bt(e3, t2) {
  if (e3) {
    if ("string" == typeof e3) return mt(e3, t2);
    var n2 = Object.prototype.toString.call(e3).slice(8, -1);
    return "Object" === n2 && e3.constructor && (n2 = e3.constructor.name), "Map" === n2 || "Set" === n2 ? Array.from(e3) : "Arguments" === n2 || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n2) ? mt(e3, t2) : void 0;
  }
}
function vt(e3, t2) {
  return function(e4) {
    if (Array.isArray(e4)) return e4;
  }(e3) || function(e4, t3) {
    var n2 = null == e4 ? null : "undefined" != typeof Symbol && e4[Symbol.iterator] || e4["@@iterator"];
    if (null != n2) {
      var o2, r2, i2, l2, a2 = [], c2 = true, s2 = false;
      try {
        if (i2 = (n2 = n2.call(e4)).next, 0 === t3) {
          if (Object(n2) !== n2) return;
          c2 = false;
        } else for (; !(c2 = (o2 = i2.call(n2)).done) && (a2.push(o2.value), a2.length !== t3); c2 = true) ;
      } catch (e5) {
        s2 = true, r2 = e5;
      } finally {
        try {
          if (!c2 && null != n2.return && (l2 = n2.return(), Object(l2) !== l2)) return;
        } finally {
          if (s2) throw r2;
        }
      }
      return a2;
    }
  }(e3, t2) || bt(e3, t2) || function() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }();
}
function yt(e3, t2) {
  if (null == e3) return {};
  var n2, o2, r2 = function(e4, t3) {
    if (null == e4) return {};
    var n3, o3, r3 = {}, i3 = Object.keys(e4);
    for (o3 = 0; o3 < i3.length; o3++) n3 = i3[o3], t3.indexOf(n3) >= 0 || (r3[n3] = e4[n3]);
    return r3;
  }(e3, t2);
  if (Object.getOwnPropertySymbols) {
    var i2 = Object.getOwnPropertySymbols(e3);
    for (o2 = 0; o2 < i2.length; o2++) n2 = i2[o2], t2.indexOf(n2) >= 0 || Object.prototype.propertyIsEnumerable.call(e3, n2) && (r2[n2] = e3[n2]);
  }
  return r2;
}
var xt = ["defaultInputValue", "defaultMenuIsOpen", "defaultValue", "inputValue", "menuIsOpen", "onChange", "onInputChange", "onMenuClose", "onMenuOpen", "value"];
function It() {
  return It = Object.assign ? Object.assign.bind() : function(e3) {
    for (var t2 = 1; t2 < arguments.length; t2++) {
      var n2 = arguments[t2];
      for (var o2 in n2) Object.prototype.hasOwnProperty.call(n2, o2) && (e3[o2] = n2[o2]);
    }
    return e3;
  }, It.apply(this, arguments);
}
function wt(e3, t2) {
  for (var n2 = 0; n2 < t2.length; n2++) {
    var o2 = t2[n2];
    o2.enumerable = o2.enumerable || false, o2.configurable = true, "value" in o2 && (o2.writable = true), Object.defineProperty(e3, gt(o2.key), o2);
  }
}
function Ct(e3, t2) {
  return Ct = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(e4, t3) {
    return e4.__proto__ = t3, e4;
  }, Ct(e3, t2);
}
function Rt(e3) {
  return Rt = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(e4) {
    return e4.__proto__ || Object.getPrototypeOf(e4);
  }, Rt(e3);
}
function At(e3, t2) {
  if (t2 && ("object" === dt(t2) || "function" == typeof t2)) return t2;
  if (void 0 !== t2) throw new TypeError("Derived constructors may only return object or undefined");
  return function(e4) {
    if (void 0 === e4) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return e4;
  }(e3);
}
function Et(e3) {
  var t2 = function() {
    if ("undefined" == typeof Reflect || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if ("function" == typeof Proxy) return true;
    try {
      return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
      })), true;
    } catch (e4) {
      return false;
    }
  }();
  return function() {
    var n2, o2 = Rt(e3);
    if (t2) {
      var r2 = Rt(this).constructor;
      n2 = Reflect.construct(o2, arguments, r2);
    } else n2 = o2.apply(this, arguments);
    return At(this, n2);
  };
}
function Mt(e3) {
  return function(e4) {
    if (Array.isArray(e4)) return mt(e4);
  }(e3) || function(e4) {
    if ("undefined" != typeof Symbol && null != e4[Symbol.iterator] || null != e4["@@iterator"]) return Array.from(e4);
  }(e3) || bt(e3) || function() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }();
}
var Gt = function() {
  function e3(e4) {
    var t3 = this;
    this._insertTag = function(e5) {
      var n2;
      n2 = 0 === t3.tags.length ? t3.insertionPoint ? t3.insertionPoint.nextSibling : t3.prepend ? t3.container.firstChild : t3.before : t3.tags[t3.tags.length - 1].nextSibling, t3.container.insertBefore(e5, n2), t3.tags.push(e5);
    }, this.isSpeedy = void 0 !== e4.speedy && e4.speedy, this.tags = [], this.ctr = 0, this.nonce = e4.nonce, this.key = e4.key, this.container = e4.container, this.prepend = e4.prepend, this.insertionPoint = e4.insertionPoint, this.before = null;
  }
  var t2 = e3.prototype;
  return t2.hydrate = function(e4) {
    e4.forEach(this._insertTag);
  }, t2.insert = function(e4) {
    this.ctr % (this.isSpeedy ? 65e3 : 1) == 0 && this._insertTag(function(e5) {
      var t4 = document.createElement("style");
      return t4.setAttribute("data-emotion", e5.key), void 0 !== e5.nonce && t4.setAttribute("nonce", e5.nonce), t4.appendChild(document.createTextNode("")), t4.setAttribute("data-s", ""), t4;
    }(this));
    var t3 = this.tags[this.tags.length - 1], n2 = 64 === e4.charCodeAt(0) && 105 === e4.charCodeAt(1);
    if (n2 && this._alreadyInsertedOrderInsensitiveRule && console.error("You're attempting to insert the following rule:\n" + e4 + "\n\n`@import` rules must be before all other types of rules in a stylesheet but other rules have already been inserted. Please ensure that `@import` rules are before all other rules."), this._alreadyInsertedOrderInsensitiveRule = this._alreadyInsertedOrderInsensitiveRule || !n2, this.isSpeedy) {
      var o2 = function(e5) {
        if (e5.sheet) return e5.sheet;
        for (var t4 = 0; t4 < document.styleSheets.length; t4++) if (document.styleSheets[t4].ownerNode === e5) return document.styleSheets[t4];
      }(t3);
      try {
        o2.insertRule(e4, o2.cssRules.length);
      } catch (t4) {
        /:(-moz-placeholder|-moz-focus-inner|-moz-focusring|-ms-input-placeholder|-moz-read-write|-moz-read-only|-ms-clear|-ms-expand|-ms-reveal){/.test(e4) || console.error('There was a problem inserting the following rule: "' + e4 + '"', t4);
      }
    } else t3.appendChild(document.createTextNode(e4));
    this.ctr++;
  }, t2.flush = function() {
    this.tags.forEach(function(e4) {
      return e4.parentNode && e4.parentNode.removeChild(e4);
    }), this.tags = [], this.ctr = 0, this._alreadyInsertedOrderInsensitiveRule = false;
  }, e3;
}();
var Nt = "-ms-";
var kt = "-moz-";
var Tt = "-webkit-";
var St = "comm";
var Bt = "rule";
var Lt = "decl";
var Pt = "@keyframes";
var Wt = Math.abs;
var Xt = String.fromCharCode;
var Ht = Object.assign;
function Ft(e3) {
  return e3.trim();
}
function Zt(e3, t2, n2) {
  return e3.replace(t2, n2);
}
function Vt(e3, t2) {
  return e3.indexOf(t2);
}
function Ot(e3, t2) {
  return 0 | e3.charCodeAt(t2);
}
function Dt(e3, t2, n2) {
  return e3.slice(t2, n2);
}
function Yt(e3) {
  return e3.length;
}
function zt(e3) {
  return e3.length;
}
function Jt(e3, t2) {
  return t2.push(e3), e3;
}
var jt = 1;
var Ut = 1;
var _t = 0;
var Qt = 0;
var Kt = 0;
var $t = "";
function qt(e3, t2, n2, o2, r2, i2, l2) {
  return { value: e3, root: t2, parent: n2, type: o2, props: r2, children: i2, line: jt, column: Ut, length: l2, return: "" };
}
function en(e3, t2) {
  return Ht(qt("", null, null, "", null, null, 0), e3, { length: -e3.length }, t2);
}
function tn() {
  return Kt = Qt > 0 ? Ot($t, --Qt) : 0, Ut--, 10 === Kt && (Ut = 1, jt--), Kt;
}
function nn() {
  return Kt = Qt < _t ? Ot($t, Qt++) : 0, Ut++, 10 === Kt && (Ut = 1, jt++), Kt;
}
function on() {
  return Ot($t, Qt);
}
function rn() {
  return Qt;
}
function ln(e3, t2) {
  return Dt($t, e3, t2);
}
function an(e3) {
  switch (e3) {
    case 0:
    case 9:
    case 10:
    case 13:
    case 32:
      return 5;
    case 33:
    case 43:
    case 44:
    case 47:
    case 62:
    case 64:
    case 126:
    case 59:
    case 123:
    case 125:
      return 4;
    case 58:
      return 3;
    case 34:
    case 39:
    case 40:
    case 91:
      return 2;
    case 41:
    case 93:
      return 1;
  }
  return 0;
}
function cn(e3) {
  return jt = Ut = 1, _t = Yt($t = e3), Qt = 0, [];
}
function sn(e3) {
  return $t = "", e3;
}
function un(e3) {
  return Ft(ln(Qt - 1, pn(91 === e3 ? e3 + 2 : 40 === e3 ? e3 + 1 : e3)));
}
function dn(e3) {
  for (; (Kt = on()) && Kt < 33; ) nn();
  return an(e3) > 2 || an(Kt) > 3 ? "" : " ";
}
function gn(e3, t2) {
  for (; --t2 && nn() && !(Kt < 48 || Kt > 102 || Kt > 57 && Kt < 65 || Kt > 70 && Kt < 97); ) ;
  return ln(e3, rn() + (t2 < 6 && 32 == on() && 32 == nn()));
}
function pn(e3) {
  for (; nn(); ) switch (Kt) {
    case e3:
      return Qt;
    case 34:
    case 39:
      34 !== e3 && 39 !== e3 && pn(Kt);
      break;
    case 40:
      41 === e3 && pn(e3);
      break;
    case 92:
      nn();
  }
  return Qt;
}
function fn(e3, t2) {
  for (; nn() && e3 + Kt !== 57 && (e3 + Kt !== 84 || 47 !== on()); ) ;
  return "/*" + ln(t2, Qt - 1) + "*" + Xt(47 === e3 ? e3 : nn());
}
function hn(e3) {
  for (; !an(on()); ) nn();
  return ln(e3, Qt);
}
function mn(e3) {
  return sn(bn("", null, null, null, [""], e3 = cn(e3), 0, [0], e3));
}
function bn(e3, t2, n2, o2, r2, i2, l2, a2, c2) {
  for (var s2 = 0, u2 = 0, d2 = l2, g2 = 0, p2 = 0, f2 = 0, h2 = 1, m2 = 1, b2 = 1, v2 = 0, y2 = "", x2 = r2, I2 = i2, w2 = o2, C2 = y2; m2; ) switch (f2 = v2, v2 = nn()) {
    case 40:
      if (108 != f2 && 58 == Ot(C2, d2 - 1)) {
        -1 != Vt(C2 += Zt(un(v2), "&", "&\f"), "&\f") && (b2 = -1);
        break;
      }
    case 34:
    case 39:
    case 91:
      C2 += un(v2);
      break;
    case 9:
    case 10:
    case 13:
    case 32:
      C2 += dn(f2);
      break;
    case 92:
      C2 += gn(rn() - 1, 7);
      continue;
    case 47:
      switch (on()) {
        case 42:
        case 47:
          Jt(yn(fn(nn(), rn()), t2, n2), c2);
          break;
        default:
          C2 += "/";
      }
      break;
    case 123 * h2:
      a2[s2++] = Yt(C2) * b2;
    case 125 * h2:
    case 59:
    case 0:
      switch (v2) {
        case 0:
        case 125:
          m2 = 0;
        case 59 + u2:
          -1 == b2 && (C2 = Zt(C2, /\f/g, "")), p2 > 0 && Yt(C2) - d2 && Jt(p2 > 32 ? xn(C2 + ";", o2, n2, d2 - 1) : xn(Zt(C2, " ", "") + ";", o2, n2, d2 - 2), c2);
          break;
        case 59:
          C2 += ";";
        default:
          if (Jt(w2 = vn(C2, t2, n2, s2, u2, r2, a2, y2, x2 = [], I2 = [], d2), i2), 123 === v2) if (0 === u2) bn(C2, t2, w2, w2, x2, i2, d2, a2, I2);
          else switch (99 === g2 && 110 === Ot(C2, 3) ? 100 : g2) {
            case 100:
            case 108:
            case 109:
            case 115:
              bn(e3, w2, w2, o2 && Jt(vn(e3, w2, w2, 0, 0, r2, a2, y2, r2, x2 = [], d2), I2), r2, I2, d2, a2, o2 ? x2 : I2);
              break;
            default:
              bn(C2, w2, w2, w2, [""], I2, 0, a2, I2);
          }
      }
      s2 = u2 = p2 = 0, h2 = b2 = 1, y2 = C2 = "", d2 = l2;
      break;
    case 58:
      d2 = 1 + Yt(C2), p2 = f2;
    default:
      if (h2 < 1) {
        if (123 == v2) --h2;
        else if (125 == v2 && 0 == h2++ && 125 == tn()) continue;
      }
      switch (C2 += Xt(v2), v2 * h2) {
        case 38:
          b2 = u2 > 0 ? 1 : (C2 += "\f", -1);
          break;
        case 44:
          a2[s2++] = (Yt(C2) - 1) * b2, b2 = 1;
          break;
        case 64:
          45 === on() && (C2 += un(nn())), g2 = on(), u2 = d2 = Yt(y2 = C2 += hn(rn())), v2++;
          break;
        case 45:
          45 === f2 && 2 == Yt(C2) && (h2 = 0);
      }
  }
  return i2;
}
function vn(e3, t2, n2, o2, r2, i2, l2, a2, c2, s2, u2) {
  for (var d2 = r2 - 1, g2 = 0 === r2 ? i2 : [""], p2 = zt(g2), f2 = 0, h2 = 0, m2 = 0; f2 < o2; ++f2) for (var b2 = 0, v2 = Dt(e3, d2 + 1, d2 = Wt(h2 = l2[f2])), y2 = e3; b2 < p2; ++b2) (y2 = Ft(h2 > 0 ? g2[b2] + " " + v2 : Zt(v2, /&\f/g, g2[b2]))) && (c2[m2++] = y2);
  return qt(e3, t2, n2, 0 === r2 ? Bt : a2, c2, s2, u2);
}
function yn(e3, t2, n2) {
  return qt(e3, t2, n2, St, Xt(Kt), Dt(e3, 2, -2), 0);
}
function xn(e3, t2, n2, o2) {
  return qt(e3, t2, n2, Lt, Dt(e3, 0, o2), Dt(e3, o2 + 1, -1), o2);
}
function In(e3, t2) {
  for (var n2 = "", o2 = zt(e3), r2 = 0; r2 < o2; r2++) n2 += t2(e3[r2], r2, e3, t2) || "";
  return n2;
}
function wn(e3, t2, n2, o2) {
  switch (e3.type) {
    case "@layer":
      if (e3.children.length) break;
    case "@import":
    case Lt:
      return e3.return = e3.return || e3.value;
    case St:
      return "";
    case Pt:
      return e3.return = e3.value + "{" + In(e3.children, o2) + "}";
    case Bt:
      e3.value = e3.props.join(",");
  }
  return Yt(n2 = In(e3.children, o2)) ? e3.return = e3.value + "{" + n2 + "}" : "";
}
function Cn(e3) {
  var t2 = zt(e3);
  return function(n2, o2, r2, i2) {
    for (var l2 = "", a2 = 0; a2 < t2; a2++) l2 += e3[a2](n2, o2, r2, i2) || "";
    return l2;
  };
}
function Rn(e3) {
  var t2 = /* @__PURE__ */ Object.create(null);
  return function(n2) {
    return void 0 === t2[n2] && (t2[n2] = e3(n2)), t2[n2];
  };
}
var An = function(e3, t2, n2) {
  for (var o2 = 0, r2 = 0; o2 = r2, r2 = on(), 38 === o2 && 12 === r2 && (t2[n2] = 1), !an(r2); ) nn();
  return ln(e3, Qt);
};
var En = function(e3, t2) {
  return sn(function(e4, t3) {
    var n2 = -1, o2 = 44;
    do {
      switch (an(o2)) {
        case 0:
          38 === o2 && 12 === on() && (t3[n2] = 1), e4[n2] += An(Qt - 1, t3, n2);
          break;
        case 2:
          e4[n2] += un(o2);
          break;
        case 4:
          if (44 === o2) {
            e4[++n2] = 58 === on() ? "&\f" : "", t3[n2] = e4[n2].length;
            break;
          }
        default:
          e4[n2] += Xt(o2);
      }
    } while (o2 = nn());
    return e4;
  }(cn(e3), t2));
};
var Mn = /* @__PURE__ */ new WeakMap();
var Gn = function(e3) {
  if ("rule" === e3.type && e3.parent && !(e3.length < 1)) {
    for (var t2 = e3.value, n2 = e3.parent, o2 = e3.column === n2.column && e3.line === n2.line; "rule" !== n2.type; ) if (!(n2 = n2.parent)) return;
    if ((1 !== e3.props.length || 58 === t2.charCodeAt(0) || Mn.get(n2)) && !o2) {
      Mn.set(e3, true);
      for (var r2 = [], i2 = En(t2, r2), l2 = n2.props, a2 = 0, c2 = 0; a2 < i2.length; a2++) for (var s2 = 0; s2 < l2.length; s2++, c2++) e3.props[c2] = r2[a2] ? i2[a2].replace(/&\f/g, l2[s2]) : l2[s2] + " " + i2[a2];
    }
  }
};
var Nn = function(e3) {
  if ("decl" === e3.type) {
    var t2 = e3.value;
    108 === t2.charCodeAt(0) && 98 === t2.charCodeAt(2) && (e3.return = "", e3.value = "");
  }
};
var kn = function(e3) {
  return "comm" === e3.type && e3.children.indexOf("emotion-disable-server-rendering-unsafe-selector-warning-please-do-not-use-this-the-warning-exists-for-a-reason") > -1;
};
var Tn = function(e3) {
  return 105 === e3.type.charCodeAt(1) && 64 === e3.type.charCodeAt(0);
};
var Sn = function(e3) {
  e3.type = "", e3.value = "", e3.return = "", e3.children = "", e3.props = "";
};
var Bn = function(e3, t2, n2) {
  Tn(e3) && (e3.parent ? (console.error("`@import` rules can't be nested inside other rules. Please move it to the top level and put it before regular rules. Keep in mind that they can only be used within global styles."), Sn(e3)) : function(e4, t3) {
    for (var n3 = e4 - 1; n3 >= 0; n3--) if (!Tn(t3[n3])) return true;
    return false;
  }(t2, n2) && (console.error("`@import` rules can't be after other rules. Please put your `@import` rules before your other rules."), Sn(e3)));
};
function Ln(e3, t2) {
  switch (function(e4, t3) {
    return 45 ^ Ot(e4, 0) ? (((t3 << 2 ^ Ot(e4, 0)) << 2 ^ Ot(e4, 1)) << 2 ^ Ot(e4, 2)) << 2 ^ Ot(e4, 3) : 0;
  }(e3, t2)) {
    case 5103:
      return Tt + "print-" + e3 + e3;
    case 5737:
    case 4201:
    case 3177:
    case 3433:
    case 1641:
    case 4457:
    case 2921:
    case 5572:
    case 6356:
    case 5844:
    case 3191:
    case 6645:
    case 3005:
    case 6391:
    case 5879:
    case 5623:
    case 6135:
    case 4599:
    case 4855:
    case 4215:
    case 6389:
    case 5109:
    case 5365:
    case 5621:
    case 3829:
      return Tt + e3 + e3;
    case 5349:
    case 4246:
    case 4810:
    case 6968:
    case 2756:
      return Tt + e3 + kt + e3 + Nt + e3 + e3;
    case 6828:
    case 4268:
      return Tt + e3 + Nt + e3 + e3;
    case 6165:
      return Tt + e3 + Nt + "flex-" + e3 + e3;
    case 5187:
      return Tt + e3 + Zt(e3, /(\w+).+(:[^]+)/, Tt + "box-$1$2" + Nt + "flex-$1$2") + e3;
    case 5443:
      return Tt + e3 + Nt + "flex-item-" + Zt(e3, /flex-|-self/, "") + e3;
    case 4675:
      return Tt + e3 + Nt + "flex-line-pack" + Zt(e3, /align-content|flex-|-self/, "") + e3;
    case 5548:
      return Tt + e3 + Nt + Zt(e3, "shrink", "negative") + e3;
    case 5292:
      return Tt + e3 + Nt + Zt(e3, "basis", "preferred-size") + e3;
    case 6060:
      return Tt + "box-" + Zt(e3, "-grow", "") + Tt + e3 + Nt + Zt(e3, "grow", "positive") + e3;
    case 4554:
      return Tt + Zt(e3, /([^-])(transform)/g, "$1" + Tt + "$2") + e3;
    case 6187:
      return Zt(Zt(Zt(e3, /(zoom-|grab)/, Tt + "$1"), /(image-set)/, Tt + "$1"), e3, "") + e3;
    case 5495:
    case 3959:
      return Zt(e3, /(image-set\([^]*)/, Tt + "$1$`$1");
    case 4968:
      return Zt(Zt(e3, /(.+:)(flex-)?(.*)/, Tt + "box-pack:$3" + Nt + "flex-pack:$3"), /s.+-b[^;]+/, "justify") + Tt + e3 + e3;
    case 4095:
    case 3583:
    case 4068:
    case 2532:
      return Zt(e3, /(.+)-inline(.+)/, Tt + "$1$2") + e3;
    case 8116:
    case 7059:
    case 5753:
    case 5535:
    case 5445:
    case 5701:
    case 4933:
    case 4677:
    case 5533:
    case 5789:
    case 5021:
    case 4765:
      if (Yt(e3) - 1 - t2 > 6) switch (Ot(e3, t2 + 1)) {
        case 109:
          if (45 !== Ot(e3, t2 + 4)) break;
        case 102:
          return Zt(e3, /(.+:)(.+)-([^]+)/, "$1" + Tt + "$2-$3$1" + kt + (108 == Ot(e3, t2 + 3) ? "$3" : "$2-$3")) + e3;
        case 115:
          return ~Vt(e3, "stretch") ? Ln(Zt(e3, "stretch", "fill-available"), t2) + e3 : e3;
      }
      break;
    case 4949:
      if (115 !== Ot(e3, t2 + 1)) break;
    case 6444:
      switch (Ot(e3, Yt(e3) - 3 - (~Vt(e3, "!important") && 10))) {
        case 107:
          return Zt(e3, ":", ":" + Tt) + e3;
        case 101:
          return Zt(e3, /(.+:)([^;!]+)(;|!.+)?/, "$1" + Tt + (45 === Ot(e3, 14) ? "inline-" : "") + "box$3$1" + Tt + "$2$3$1" + Nt + "$2box$3") + e3;
      }
      break;
    case 5936:
      switch (Ot(e3, t2 + 11)) {
        case 114:
          return Tt + e3 + Nt + Zt(e3, /[svh]\w+-[tblr]{2}/, "tb") + e3;
        case 108:
          return Tt + e3 + Nt + Zt(e3, /[svh]\w+-[tblr]{2}/, "tb-rl") + e3;
        case 45:
          return Tt + e3 + Nt + Zt(e3, /[svh]\w+-[tblr]{2}/, "lr") + e3;
      }
      return Tt + e3 + Nt + e3 + e3;
  }
  return e3;
}
var Pn;
var Wn;
var Xn = "undefined" != typeof document;
var Hn = Xn ? void 0 : (Pn = function() {
  return Rn(function() {
    var e3 = {};
    return function(t2) {
      return e3[t2];
    };
  });
}, Wn = /* @__PURE__ */ new WeakMap(), function(e3) {
  if (Wn.has(e3)) return Wn.get(e3);
  var t2 = Pn(e3);
  return Wn.set(e3, t2), t2;
});
var Fn = [function(e3, t2, n2, o2) {
  if (e3.length > -1 && !e3.return) switch (e3.type) {
    case Lt:
      e3.return = Ln(e3.value, e3.length);
      break;
    case Pt:
      return In([en(e3, { value: Zt(e3.value, "@", "@" + Tt) })], o2);
    case Bt:
      if (e3.length) return function(e4, t3) {
        return e4.map(t3).join("");
      }(e3.props, function(t3) {
        switch (function(e4, t4) {
          return (e4 = t4.exec(e4)) ? e4[0] : e4;
        }(t3, /(::plac\w+|:read-\w+)/)) {
          case ":read-only":
          case ":read-write":
            return In([en(e3, { props: [Zt(t3, /:(read-\w+)/, ":-moz-$1")] })], o2);
          case "::placeholder":
            return In([en(e3, { props: [Zt(t3, /:(plac\w+)/, ":" + Tt + "input-$1")] }), en(e3, { props: [Zt(t3, /:(plac\w+)/, ":-moz-$1")] }), en(e3, { props: [Zt(t3, /:(plac\w+)/, Nt + "input-$1")] })], o2);
        }
        return "";
      });
  }
}];
var Zn = function(e3) {
  var t2 = e3.key;
  if (!t2) throw new Error("You have to configure `key` for your cache. Please make sure it's unique (and not equal to 'css') as it's used for linking styles to your cache.\nIf multiple caches share the same key they might \"fight\" for each other's style elements.");
  if (Xn && "css" === t2) {
    var n2 = document.querySelectorAll("style[data-emotion]:not([data-s])");
    Array.prototype.forEach.call(n2, function(e4) {
      -1 !== e4.getAttribute("data-emotion").indexOf(" ") && (document.head.appendChild(e4), e4.setAttribute("data-s", ""));
    });
  }
  var o2 = e3.stylisPlugins || Fn;
  if (/[^a-z-]/.test(t2)) throw new Error('Emotion key must only contain lower case alphabetical characters and - but "' + t2 + '" was passed');
  var r2, i2, l2 = {}, a2 = [];
  Xn && (r2 = e3.container || document.head, Array.prototype.forEach.call(document.querySelectorAll('style[data-emotion^="' + t2 + ' "]'), function(e4) {
    for (var t3 = e4.getAttribute("data-emotion").split(" "), n3 = 1; n3 < t3.length; n3++) l2[t3[n3]] = true;
    a2.push(e4);
  }));
  var c2 = [Gn, Nn];
  if (c2.push(/* @__PURE__ */ function(e4) {
    return function(t3, n3, o3) {
      if ("rule" === t3.type && !e4.compat) {
        var r3 = t3.value.match(/(:first|:nth|:nth-last)-child/g);
        if (r3) {
          for (var i3 = t3.parent ? t3.parent.children : o3, l3 = i3.length - 1; l3 >= 0; l3--) {
            var a3 = i3[l3];
            if (a3.line < t3.line) break;
            if (a3.column < t3.column) {
              if (kn(a3)) return;
              break;
            }
          }
          r3.forEach(function(e5) {
            console.error('The pseudo class "' + e5 + '" is potentially unsafe when doing server-side rendering. Try changing it to "' + e5.split("-child")[0] + '-of-type".');
          });
        }
      }
    };
  }({ get compat() {
    return m2.compat;
  } }), Bn), Xn) {
    var s2, u2 = [wn, function(e4) {
      e4.root || (e4.return ? s2.insert(e4.return) : e4.value && e4.type !== St && s2.insert(e4.value + "{}"));
    }], d2 = Cn(c2.concat(o2, u2));
    i2 = function(e4, t3, n3, o3) {
      s2 = n3, void 0 !== t3.map && (s2 = { insert: function(e5) {
        n3.insert(e5 + t3.map);
      } }), In(mn(e4 ? e4 + "{" + t3.styles + "}" : t3.styles), d2), o3 && (m2.inserted[t3.name] = true);
    };
  } else {
    var g2 = [wn], p2 = Cn(c2.concat(o2, g2)), f2 = Hn(o2)(t2), h2 = function(e4, t3) {
      var n3 = t3.name;
      return void 0 === f2[n3] && (f2[n3] = In(mn(e4 ? e4 + "{" + t3.styles + "}" : t3.styles), p2)), f2[n3];
    };
    i2 = function(e4, t3, n3, o3) {
      var r3 = t3.name, i3 = h2(e4, t3);
      return void 0 === m2.compat ? (o3 && (m2.inserted[r3] = true), void 0 !== t3.map ? i3 + t3.map : i3) : o3 ? void (m2.inserted[r3] = i3) : i3;
    };
  }
  var m2 = { key: t2, sheet: new Gt({ key: t2, container: r2, nonce: e3.nonce, speedy: e3.speedy, prepend: e3.prepend, insertionPoint: e3.insertionPoint }), nonce: e3.nonce, inserted: l2, registered: {}, insert: i2 };
  return m2.sheet.hydrate(a2), m2;
};
function Vn(e3) {
  var t2 = { exports: {} };
  return e3(t2, t2.exports), t2.exports;
}
var On = Vn(function(e3, t2) {
  !function() {
    var e4 = "function" == typeof Symbol && Symbol.for, n2 = e4 ? Symbol.for("react.element") : 60103, o2 = e4 ? Symbol.for("react.portal") : 60106, r2 = e4 ? Symbol.for("react.fragment") : 60107, i2 = e4 ? Symbol.for("react.strict_mode") : 60108, l2 = e4 ? Symbol.for("react.profiler") : 60114, a2 = e4 ? Symbol.for("react.provider") : 60109, c2 = e4 ? Symbol.for("react.context") : 60110, s2 = e4 ? Symbol.for("react.async_mode") : 60111, u2 = e4 ? Symbol.for("react.concurrent_mode") : 60111, d2 = e4 ? Symbol.for("react.forward_ref") : 60112, g2 = e4 ? Symbol.for("react.suspense") : 60113, p2 = e4 ? Symbol.for("react.suspense_list") : 60120, f2 = e4 ? Symbol.for("react.memo") : 60115, h2 = e4 ? Symbol.for("react.lazy") : 60116, m2 = e4 ? Symbol.for("react.block") : 60121, b2 = e4 ? Symbol.for("react.fundamental") : 60117, v2 = e4 ? Symbol.for("react.responder") : 60118, y2 = e4 ? Symbol.for("react.scope") : 60119;
    function x2(e5) {
      if ("object" == typeof e5 && null !== e5) {
        var t3 = e5.$$typeof;
        switch (t3) {
          case n2:
            var p3 = e5.type;
            switch (p3) {
              case s2:
              case u2:
              case r2:
              case l2:
              case i2:
              case g2:
                return p3;
              default:
                var m3 = p3 && p3.$$typeof;
                switch (m3) {
                  case c2:
                  case d2:
                  case h2:
                  case f2:
                  case a2:
                    return m3;
                  default:
                    return t3;
                }
            }
          case o2:
            return t3;
        }
      }
    }
    var I2 = s2, w2 = u2, C2 = c2, R2 = a2, A2 = n2, E2 = d2, M2 = r2, G2 = h2, N2 = f2, k2 = o2, T2 = l2, S2 = i2, B2 = g2, L2 = false;
    function P2(e5) {
      return x2(e5) === u2;
    }
    t2.AsyncMode = I2, t2.ConcurrentMode = w2, t2.ContextConsumer = C2, t2.ContextProvider = R2, t2.Element = A2, t2.ForwardRef = E2, t2.Fragment = M2, t2.Lazy = G2, t2.Memo = N2, t2.Portal = k2, t2.Profiler = T2, t2.StrictMode = S2, t2.Suspense = B2, t2.isAsyncMode = function(e5) {
      return L2 || (L2 = true, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")), P2(e5) || x2(e5) === s2;
    }, t2.isConcurrentMode = P2, t2.isContextConsumer = function(e5) {
      return x2(e5) === c2;
    }, t2.isContextProvider = function(e5) {
      return x2(e5) === a2;
    }, t2.isElement = function(e5) {
      return "object" == typeof e5 && null !== e5 && e5.$$typeof === n2;
    }, t2.isForwardRef = function(e5) {
      return x2(e5) === d2;
    }, t2.isFragment = function(e5) {
      return x2(e5) === r2;
    }, t2.isLazy = function(e5) {
      return x2(e5) === h2;
    }, t2.isMemo = function(e5) {
      return x2(e5) === f2;
    }, t2.isPortal = function(e5) {
      return x2(e5) === o2;
    }, t2.isProfiler = function(e5) {
      return x2(e5) === l2;
    }, t2.isStrictMode = function(e5) {
      return x2(e5) === i2;
    }, t2.isSuspense = function(e5) {
      return x2(e5) === g2;
    }, t2.isValidElementType = function(e5) {
      return "string" == typeof e5 || "function" == typeof e5 || e5 === r2 || e5 === u2 || e5 === l2 || e5 === i2 || e5 === g2 || e5 === p2 || "object" == typeof e5 && null !== e5 && (e5.$$typeof === h2 || e5.$$typeof === f2 || e5.$$typeof === a2 || e5.$$typeof === c2 || e5.$$typeof === d2 || e5.$$typeof === b2 || e5.$$typeof === v2 || e5.$$typeof === y2 || e5.$$typeof === m2);
    }, t2.typeOf = x2;
  }();
});
var Dn = Vn(function(e3) {
  e3.exports = On;
});
var Yn = {};
Yn[Dn.ForwardRef] = { $$typeof: true, render: true, defaultProps: true, displayName: true, propTypes: true }, Yn[Dn.Memo] = { $$typeof: true, compare: true, defaultProps: true, displayName: true, propTypes: true, type: true };
var zn = "undefined" != typeof document;
function Jn(e3, t2, n2) {
  var o2 = "";
  return n2.split(" ").forEach(function(n3) {
    void 0 !== e3[n3] ? t2.push(e3[n3] + ";") : o2 += n3 + " ";
  }), o2;
}
var jn = function(e3, t2, n2) {
  var o2 = e3.key + "-" + t2.name;
  (false === n2 || false === zn && void 0 !== e3.compat) && void 0 === e3.registered[o2] && (e3.registered[o2] = t2.styles);
};
var Un = function(e3, t2, n2) {
  jn(e3, t2, n2);
  var o2 = e3.key + "-" + t2.name;
  if (void 0 === e3.inserted[t2.name]) {
    var r2 = "", i2 = t2;
    do {
      var l2 = e3.insert(t2 === i2 ? "." + o2 : "", i2, e3.sheet, true);
      zn || void 0 === l2 || (r2 += l2), i2 = i2.next;
    } while (void 0 !== i2);
    if (!zn && 0 !== r2.length) return r2;
  }
};
var _n = { animationIterationCount: 1, aspectRatio: 1, borderImageOutset: 1, borderImageSlice: 1, borderImageWidth: 1, boxFlex: 1, boxFlexGroup: 1, boxOrdinalGroup: 1, columnCount: 1, columns: 1, flex: 1, flexGrow: 1, flexPositive: 1, flexShrink: 1, flexNegative: 1, flexOrder: 1, gridRow: 1, gridRowEnd: 1, gridRowSpan: 1, gridRowStart: 1, gridColumn: 1, gridColumnEnd: 1, gridColumnSpan: 1, gridColumnStart: 1, msGridRow: 1, msGridRowSpan: 1, msGridColumn: 1, msGridColumnSpan: 1, fontWeight: 1, lineHeight: 1, opacity: 1, order: 1, orphans: 1, tabSize: 1, widows: 1, zIndex: 1, zoom: 1, WebkitLineClamp: 1, fillOpacity: 1, floodOpacity: 1, stopOpacity: 1, strokeDasharray: 1, strokeDashoffset: 1, strokeMiterlimit: 1, strokeOpacity: 1, strokeWidth: 1 };
var Qn = `You have illegal escape sequence in your template literal, most likely inside content's property value.
Because you write your CSS inside a JavaScript string you actually have to do double escaping, so for example "content: '\\00d7';" should become "content: '\\\\00d7';".
You can read more about this here:
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#ES2018_revision_of_illegal_escape_sequences`;
var Kn = "You have passed in falsy value as style object's key (can happen when in example you pass unexported component as computed key).";
var $n = /[A-Z]|^ms/g;
var qn = /_EMO_([^_]+?)_([^]*?)_EMO_/g;
var eo = function(e3) {
  return 45 === e3.charCodeAt(1);
};
var to = function(e3) {
  return null != e3 && "boolean" != typeof e3;
};
var no = Rn(function(e3) {
  return eo(e3) ? e3 : e3.replace($n, "-$&").toLowerCase();
});
var oo = function(e3, t2) {
  switch (e3) {
    case "animation":
    case "animationName":
      if ("string" == typeof t2) return t2.replace(qn, function(e4, t3, n2) {
        return fo = { name: t3, styles: n2, next: fo }, t3;
      });
  }
  return 1 === _n[e3] || eo(e3) || "number" != typeof t2 || 0 === t2 ? t2 : t2 + "px";
};
var ro = /(var|attr|counters?|url|element|(((repeating-)?(linear|radial))|conic)-gradient)\(|(no-)?(open|close)-quote/;
var io = ["normal", "none", "initial", "inherit", "unset"];
var lo = oo;
var ao = /^-ms-/;
var co = /-(.)/g;
var so = {};
oo = function(e3, t2) {
  if ("content" === e3 && ("string" != typeof t2 || -1 === io.indexOf(t2) && !ro.test(t2) && (t2.charAt(0) !== t2.charAt(t2.length - 1) || '"' !== t2.charAt(0) && "'" !== t2.charAt(0)))) throw new Error("You seem to be using a value for 'content' without quotes, try replacing it with `content: '\"" + t2 + "\"'`");
  var n2 = lo(e3, t2);
  return "" === n2 || eo(e3) || -1 === e3.indexOf("-") || void 0 !== so[e3] || (so[e3] = true, console.error("Using kebab-case for css properties in objects is not supported. Did you mean " + e3.replace(ao, "ms-").replace(co, function(e4, t3) {
    return t3.toUpperCase();
  }) + "?")), n2;
};
var uo = "Component selectors can only be used in conjunction with @emotion/babel-plugin, the swc Emotion plugin, or another Emotion-aware compiler transform.";
function go(e3, t2, n2) {
  if (null == n2) return "";
  if (void 0 !== n2.__emotion_styles) {
    if ("NO_COMPONENT_SELECTOR" === n2.toString()) throw new Error(uo);
    return n2;
  }
  switch (typeof n2) {
    case "boolean":
      return "";
    case "object":
      if (1 === n2.anim) return fo = { name: n2.name, styles: n2.styles, next: fo }, n2.name;
      if (void 0 !== n2.styles) {
        var o2 = n2.next;
        if (void 0 !== o2) for (; void 0 !== o2; ) fo = { name: o2.name, styles: o2.styles, next: fo }, o2 = o2.next;
        var r2 = n2.styles + ";";
        return void 0 !== n2.map && (r2 += n2.map), r2;
      }
      return function(e4, t3, n3) {
        var o3 = "";
        if (Array.isArray(n3)) for (var r3 = 0; r3 < n3.length; r3++) o3 += go(e4, t3, n3[r3]) + ";";
        else for (var i3 in n3) {
          var l3 = n3[i3];
          if ("object" != typeof l3) null != t3 && void 0 !== t3[l3] ? o3 += i3 + "{" + t3[l3] + "}" : to(l3) && (o3 += no(i3) + ":" + oo(i3, l3) + ";");
          else {
            if ("NO_COMPONENT_SELECTOR" === i3) throw new Error(uo);
            if (!Array.isArray(l3) || "string" != typeof l3[0] || null != t3 && void 0 !== t3[l3[0]]) {
              var a3 = go(e4, t3, l3);
              switch (i3) {
                case "animation":
                case "animationName":
                  o3 += no(i3) + ":" + a3 + ";";
                  break;
                default:
                  "undefined" === i3 && console.error(Kn), o3 += i3 + "{" + a3 + "}";
              }
            } else for (var c3 = 0; c3 < l3.length; c3++) to(l3[c3]) && (o3 += no(i3) + ":" + oo(i3, l3[c3]) + ";");
          }
        }
        return o3;
      }(e3, t2, n2);
    case "function":
      if (void 0 !== e3) {
        var i2 = fo, l2 = n2(e3);
        return fo = i2, go(e3, t2, l2);
      }
      console.error("Functions that are interpolated in css calls will be stringified.\nIf you want to have a css call based on props, create a function that returns a css call like this\nlet dynamicStyle = (props) => css`color: ${props.color}`\nIt can be called directly with props or interpolated in a styled call like this\nlet SomeComponent = styled('div')`${dynamicStyle}`");
      break;
    case "string":
      var a2 = [], c2 = n2.replace(qn, function(e4, t3, n3) {
        var o3 = "animation" + a2.length;
        return a2.push("const " + o3 + " = keyframes`" + n3.replace(/^@keyframes animation-\w+/, "") + "`"), "${" + o3 + "}";
      });
      a2.length && console.error("`keyframes` output got interpolated into plain string, please wrap it with `css`.\n\nInstead of doing this:\n\n" + [].concat(a2, ["`" + c2 + "`"]).join("\n") + "\n\nYou should wrap it with `css` like this:\n\ncss`" + c2 + "`");
  }
  if (null == t2) return n2;
  var s2 = t2[n2];
  return void 0 !== s2 ? s2 : n2;
}
var po;
var fo;
var ho = /label:\s*([^\s;\n{]+)\s*(;|$)/g;
po = /\/\*#\ssourceMappingURL=data:application\/json;\S+\s+\*\//g;
var mo = function(e3, t2, n2) {
  if (1 === e3.length && "object" == typeof e3[0] && null !== e3[0] && void 0 !== e3[0].styles) return e3[0];
  var o2 = true, r2 = "";
  fo = void 0;
  var i2, l2 = e3[0];
  null == l2 || void 0 === l2.raw ? (o2 = false, r2 += go(n2, t2, l2)) : (void 0 === l2[0] && console.error(Qn), r2 += l2[0]);
  for (var a2 = 1; a2 < e3.length; a2++) r2 += go(n2, t2, e3[a2]), o2 && (void 0 === l2[a2] && console.error(Qn), r2 += l2[a2]);
  r2 = r2.replace(po, function(e4) {
    return i2 = e4, "";
  }), ho.lastIndex = 0;
  for (var c2, s2 = ""; null !== (c2 = ho.exec(r2)); ) s2 += "-" + c2[1];
  var u2 = function(e4) {
    for (var t3, n3 = 0, o3 = 0, r3 = e4.length; r3 >= 4; ++o3, r3 -= 4) t3 = 1540483477 * (65535 & (t3 = 255 & e4.charCodeAt(o3) | (255 & e4.charCodeAt(++o3)) << 8 | (255 & e4.charCodeAt(++o3)) << 16 | (255 & e4.charCodeAt(++o3)) << 24)) + (59797 * (t3 >>> 16) << 16), n3 = 1540483477 * (65535 & (t3 ^= t3 >>> 24)) + (59797 * (t3 >>> 16) << 16) ^ 1540483477 * (65535 & n3) + (59797 * (n3 >>> 16) << 16);
    switch (r3) {
      case 3:
        n3 ^= (255 & e4.charCodeAt(o3 + 2)) << 16;
      case 2:
        n3 ^= (255 & e4.charCodeAt(o3 + 1)) << 8;
      case 1:
        n3 = 1540483477 * (65535 & (n3 ^= 255 & e4.charCodeAt(o3))) + (59797 * (n3 >>> 16) << 16);
    }
    return (((n3 = 1540483477 * (65535 & (n3 ^= n3 >>> 13)) + (59797 * (n3 >>> 16) << 16)) ^ n3 >>> 15) >>> 0).toString(36);
  }(r2) + s2;
  return { name: u2, styles: r2, map: i2, next: fo, toString: function() {
    return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop).";
  } };
};
var bo = "undefined" != typeof document;
var vo = function(e3) {
  return e3();
};
var yo = !!e.useInsertionEffect && e.useInsertionEffect;
var xo = bo && yo || vo;
var Io = yo || e.useLayoutEffect;
var wo = "undefined" != typeof document;
var Co = {}.hasOwnProperty;
var Ro = e.createContext("undefined" != typeof HTMLElement ? Zn({ key: "css" }) : null);
Ro.displayName = "EmotionCacheContext", Ro.Provider;
var Ao = function(e3) {
  return (0, import_react.forwardRef)(function(t2, n2) {
    var o2 = (0, import_react.useContext)(Ro);
    return e3(t2, o2, n2);
  });
};
wo || (Ao = function(t2) {
  return function(n2) {
    var o2 = (0, import_react.useContext)(Ro);
    return null === o2 ? (o2 = Zn({ key: "css" }), e.createElement(Ro.Provider, { value: o2 }, t2(n2, o2))) : t2(n2, o2);
  };
});
var Eo = e.createContext({});
Eo.displayName = "EmotionThemeContext";
var Mo = function(e3) {
  var t2 = e3.split(".");
  return t2[t2.length - 1];
};
var Go = function(e3) {
  var t2 = /^\s+at\s+([A-Za-z0-9$.]+)\s/.exec(e3);
  return t2 || (t2 = /^([A-Za-z0-9$.]+)@/.exec(e3)) ? Mo(t2[1]) : void 0;
};
var No = /* @__PURE__ */ new Set(["renderWithHooks", "processChild", "finishClassComponent", "renderToString"]);
var ko = function(e3) {
  return e3.replace(/\$/g, "-");
};
var To = "__EMOTION_TYPE_PLEASE_DO_NOT_USE__";
var So = "__EMOTION_LABEL_PLEASE_DO_NOT_USE__";
var Bo = function(e3, t2) {
  if ("string" == typeof t2.css && -1 !== t2.css.indexOf(":")) throw new Error("Strings are not allowed as css prop values, please wrap it in a css template literal from '@emotion/react' like this: css`" + t2.css + "`");
  var n2 = {};
  for (var o2 in t2) Co.call(t2, o2) && (n2[o2] = t2[o2]);
  if (n2[To] = e3, t2.css && ("object" != typeof t2.css || "string" != typeof t2.css.name || -1 === t2.css.name.indexOf("-"))) {
    var r2 = function(e4) {
      if (e4) for (var t3 = e4.split("\n"), n3 = 0; n3 < t3.length; n3++) {
        var o3 = Go(t3[n3]);
        if (o3) {
          if (No.has(o3)) break;
          if (/^[A-Z]/.test(o3)) return ko(o3);
        }
      }
    }(new Error().stack);
    r2 && (n2[So] = r2);
  }
  return n2;
};
var Lo = function(t2) {
  var n2 = t2.cache, o2 = t2.serialized, r2 = t2.isStringTag;
  jn(n2, o2, r2);
  var i2 = xo(function() {
    return Un(n2, o2, r2);
  });
  if (!wo && void 0 !== i2) {
    for (var l2, a2 = o2.name, c2 = o2.next; void 0 !== c2; ) a2 += " " + c2.name, c2 = c2.next;
    return e.createElement("style", ((l2 = {})["data-emotion"] = n2.key + " " + a2, l2.dangerouslySetInnerHTML = { __html: i2 }, l2.nonce = n2.sheet.nonce, l2));
  }
  return null;
};
var Po = Ao(function(t2, n2, o2) {
  var r2 = t2.css;
  "string" == typeof r2 && void 0 !== n2.registered[r2] && (r2 = n2.registered[r2]);
  var i2 = t2[To], l2 = [r2], a2 = "";
  "string" == typeof t2.className ? a2 = Jn(n2.registered, l2, t2.className) : null != t2.className && (a2 = t2.className + " ");
  var c2 = mo(l2, void 0, e.useContext(Eo));
  if (-1 === c2.name.indexOf("-")) {
    var s2 = t2[So];
    s2 && (c2 = mo([c2, "label:" + s2 + ";"]));
  }
  a2 += n2.key + "-" + c2.name;
  var u2 = {};
  for (var d2 in t2) Co.call(t2, d2) && "css" !== d2 && d2 !== To && d2 !== So && (u2[d2] = t2[d2]);
  return u2.ref = o2, u2.className = a2, e.createElement(e.Fragment, null, e.createElement(Lo, { cache: n2, serialized: c2, isStringTag: "string" == typeof i2 }), e.createElement(i2, u2));
});
Po.displayName = "EmotionCssPropInternal";
var Wo = Po;
var Xo = function(t2, n2) {
  var o2 = arguments;
  if (null == n2 || !Co.call(n2, "css")) return e.createElement.apply(void 0, o2);
  var r2 = o2.length, i2 = new Array(r2);
  i2[0] = Wo, i2[1] = Bo(t2, n2);
  for (var l2 = 2; l2 < r2; l2++) i2[l2] = o2[l2];
  return e.createElement.apply(null, i2);
};
var Ho = false;
var Fo = Ao(function(t2, n2) {
  Ho || !t2.className && !t2.css || (console.error("It looks like you're using the css prop on Global, did you mean to use the styles prop instead?"), Ho = true);
  var o2 = t2.styles, r2 = mo([o2], void 0, e.useContext(Eo));
  if (!wo) {
    for (var i2, l2 = r2.name, a2 = r2.styles, c2 = r2.next; void 0 !== c2; ) l2 += " " + c2.name, a2 += c2.styles, c2 = c2.next;
    var s2 = true === n2.compat, u2 = n2.insert("", { name: l2, styles: a2 }, n2.sheet, s2);
    return s2 ? null : e.createElement("style", ((i2 = {})["data-emotion"] = n2.key + "-global " + l2, i2.dangerouslySetInnerHTML = { __html: u2 }, i2.nonce = n2.sheet.nonce, i2));
  }
  var d2 = e.useRef();
  return Io(function() {
    var e3 = n2.key + "-global", t3 = new n2.sheet.constructor({ key: e3, nonce: n2.sheet.nonce, container: n2.sheet.container, speedy: n2.sheet.isSpeedy }), o3 = false, i3 = document.querySelector('style[data-emotion="' + e3 + " " + r2.name + '"]');
    return n2.sheet.tags.length && (t3.before = n2.sheet.tags[0]), null !== i3 && (o3 = true, i3.setAttribute("data-emotion", e3), t3.hydrate([i3])), d2.current = [t3, o3], function() {
      t3.flush();
    };
  }, [n2]), Io(function() {
    var e3 = d2.current, t3 = e3[0];
    if (e3[1]) e3[1] = false;
    else {
      if (void 0 !== r2.next && Un(n2, r2.next, true), t3.tags.length) {
        var o3 = t3.tags[t3.tags.length - 1].nextElementSibling;
        t3.before = o3, t3.flush();
      }
      n2.insert("", r2, t3, false);
    }
  }, [n2, r2.name]), null;
});
function Zo() {
  for (var e3 = arguments.length, t2 = new Array(e3), n2 = 0; n2 < e3; n2++) t2[n2] = arguments[n2];
  return mo(t2);
}
Fo.displayName = "EmotionGlobal";
var Vo = function e2(t2) {
  for (var n2 = t2.length, o2 = 0, r2 = ""; o2 < n2; o2++) {
    var i2 = t2[o2];
    if (null != i2) {
      var l2 = void 0;
      switch (typeof i2) {
        case "boolean":
          break;
        case "object":
          if (Array.isArray(i2)) l2 = e2(i2);
          else for (var a2 in void 0 !== i2.styles && void 0 !== i2.name && console.error("You have passed styles created with `css` from `@emotion/react` package to the `cx`.\n`cx` is meant to compose class names (strings) so you should convert those styles to a class name by passing them to the `css` received from <ClassNames/> component."), l2 = "", i2) i2[a2] && a2 && (l2 && (l2 += " "), l2 += a2);
          break;
        default:
          l2 = i2;
      }
      l2 && (r2 && (r2 += " "), r2 += l2);
    }
  }
  return r2;
};
var Oo = function(t2) {
  var n2, o2 = t2.cache, r2 = t2.serializedArr, i2 = xo(function() {
    for (var e3 = "", t3 = 0; t3 < r2.length; t3++) {
      var n3 = Un(o2, r2[t3], false);
      wo || void 0 === n3 || (e3 += n3);
    }
    if (!wo) return e3;
  });
  return wo || 0 === i2.length ? null : e.createElement("style", ((n2 = {})["data-emotion"] = o2.key + " " + r2.map(function(e3) {
    return e3.name;
  }).join(" "), n2.dangerouslySetInnerHTML = { __html: i2 }, n2.nonce = o2.sheet.nonce, n2));
};
var Do = Ao(function(t2, n2) {
  var o2 = false, r2 = [], i2 = function() {
    if (o2) throw new Error("css can only be used during render");
    for (var e3 = arguments.length, t3 = new Array(e3), i3 = 0; i3 < e3; i3++) t3[i3] = arguments[i3];
    var l3 = mo(t3, n2.registered);
    return r2.push(l3), jn(n2, l3, false), n2.key + "-" + l3.name;
  }, l2 = { css: i2, cx: function() {
    if (o2) throw new Error("cx can only be used during render");
    for (var e3 = arguments.length, t3 = new Array(e3), r3 = 0; r3 < e3; r3++) t3[r3] = arguments[r3];
    return function(e4, t4, n3) {
      var o3 = [], r4 = Jn(e4, o3, n3);
      return o3.length < 2 ? n3 : r4 + t4(o3);
    }(n2.registered, i2, Vo(t3));
  }, theme: e.useContext(Eo) }, a2 = t2.children(l2);
  return o2 = true, e.createElement(e.Fragment, null, e.createElement(Oo, { cache: n2, serializedArr: r2 }), a2);
});
Do.displayName = "EmotionClassNames";
var Yo = "undefined" != typeof document;
var zo = "undefined" != typeof jest || "undefined" != typeof vi;
if (Yo && !zo) {
  Jo = "undefined" != typeof globalThis ? globalThis : Yo ? window : global, jo = "__EMOTION_REACT_" + "11.11.1".split(".")[0] + "__";
  Jo[jo] && console.warn("You are loading @emotion/react when it is already loaded. Running multiple instances may cause problems. This can happen if multiple versions are used, or if multiple builds of the same version are used."), Jo[jo] = true;
}
var Jo;
var jo;
var Uo = Math.min;
var _o = Math.max;
var Qo = Math.round;
var Ko = Math.floor;
var $o = (e3) => ({ x: e3, y: e3 });
function qo(e3) {
  return nr(e3) ? (e3.nodeName || "").toLowerCase() : "#document";
}
function er(e3) {
  var t2;
  return (null == e3 || null == (t2 = e3.ownerDocument) ? void 0 : t2.defaultView) || window;
}
function tr(e3) {
  var t2;
  return null == (t2 = (nr(e3) ? e3.ownerDocument : e3.document) || window.document) ? void 0 : t2.documentElement;
}
function nr(e3) {
  return e3 instanceof Node || e3 instanceof er(e3).Node;
}
function or(e3) {
  return e3 instanceof Element || e3 instanceof er(e3).Element;
}
function rr(e3) {
  return e3 instanceof HTMLElement || e3 instanceof er(e3).HTMLElement;
}
function ir(e3) {
  return "undefined" != typeof ShadowRoot && (e3 instanceof ShadowRoot || e3 instanceof er(e3).ShadowRoot);
}
function lr(e3) {
  const { overflow: t2, overflowX: n2, overflowY: o2, display: r2 } = ar(e3);
  return /auto|scroll|overlay|hidden|clip/.test(t2 + o2 + n2) && !["inline", "contents"].includes(r2);
}
function ar(e3) {
  return er(e3).getComputedStyle(e3);
}
function cr(e3) {
  const t2 = function(e4) {
    if ("html" === qo(e4)) return e4;
    const t3 = e4.assignedSlot || e4.parentNode || ir(e4) && e4.host || tr(e4);
    return ir(t3) ? t3.host : t3;
  }(e3);
  return function(e4) {
    return ["html", "body", "#document"].includes(qo(e4));
  }(t2) ? e3.ownerDocument ? e3.ownerDocument.body : e3.body : rr(t2) && lr(t2) ? t2 : cr(t2);
}
function sr(e3, t2) {
  var n2;
  void 0 === t2 && (t2 = []);
  const o2 = cr(e3), r2 = o2 === (null == (n2 = e3.ownerDocument) ? void 0 : n2.body), i2 = er(o2);
  return r2 ? t2.concat(i2, i2.visualViewport || [], lr(o2) ? o2 : []) : t2.concat(o2, sr(o2));
}
function ur(e3) {
  return or(e3) ? e3 : e3.contextElement;
}
function dr(e3) {
  const t2 = ur(e3);
  if (!rr(t2)) return $o(1);
  const n2 = t2.getBoundingClientRect(), { width: o2, height: r2, $: i2 } = function(e4) {
    const t3 = ar(e4);
    let n3 = parseFloat(t3.width) || 0, o3 = parseFloat(t3.height) || 0;
    const r3 = rr(e4), i3 = r3 ? e4.offsetWidth : n3, l3 = r3 ? e4.offsetHeight : o3, a3 = Qo(n3) !== i3 || Qo(o3) !== l3;
    return a3 && (n3 = i3, o3 = l3), { width: n3, height: o3, $: a3 };
  }(t2);
  let l2 = (i2 ? Qo(n2.width) : n2.width) / o2, a2 = (i2 ? Qo(n2.height) : n2.height) / r2;
  return l2 && Number.isFinite(l2) || (l2 = 1), a2 && Number.isFinite(a2) || (a2 = 1), { x: l2, y: a2 };
}
var gr = $o(0);
function pr(e3) {
  const t2 = er(e3);
  return "undefined" != typeof CSS && CSS.supports && CSS.supports("-webkit-backdrop-filter", "none") && t2.visualViewport ? { x: t2.visualViewport.offsetLeft, y: t2.visualViewport.offsetTop } : gr;
}
function fr(e3, t2, n2, o2) {
  void 0 === t2 && (t2 = false), void 0 === n2 && (n2 = false);
  const r2 = e3.getBoundingClientRect(), i2 = ur(e3);
  let l2 = $o(1);
  t2 && (o2 ? or(o2) && (l2 = dr(o2)) : l2 = dr(e3));
  const a2 = function(e4, t3, n3) {
    return void 0 === t3 && (t3 = false), !(!n3 || t3 && n3 !== er(e4)) && t3;
  }(i2, n2, o2) ? pr(i2) : $o(0);
  let c2 = (r2.left + a2.x) / l2.x, s2 = (r2.top + a2.y) / l2.y, u2 = r2.width / l2.x, d2 = r2.height / l2.y;
  if (i2) {
    const e4 = er(i2), t3 = o2 && or(o2) ? er(o2) : o2;
    let n3 = e4.frameElement;
    for (; n3 && o2 && t3 !== e4; ) {
      const e5 = dr(n3), t4 = n3.getBoundingClientRect(), o3 = ar(n3), r3 = t4.left + (n3.clientLeft + parseFloat(o3.paddingLeft)) * e5.x, i3 = t4.top + (n3.clientTop + parseFloat(o3.paddingTop)) * e5.y;
      c2 *= e5.x, s2 *= e5.y, u2 *= e5.x, d2 *= e5.y, c2 += r3, s2 += i3, n3 = er(n3).frameElement;
    }
  }
  return g2 = { width: u2, height: d2, x: c2, y: s2 }, { ...g2, top: g2.y, left: g2.x, right: g2.x + g2.width, bottom: g2.y + g2.height };
  var g2;
}
function hr(e3, t2, n2, o2) {
  void 0 === o2 && (o2 = {});
  const { ancestorScroll: r2 = true, ancestorResize: i2 = true, elementResize: l2 = "function" == typeof ResizeObserver, layoutShift: a2 = "function" == typeof IntersectionObserver, animationFrame: c2 = false } = o2, s2 = ur(e3), u2 = r2 || i2 ? [...s2 ? sr(s2) : [], ...sr(t2)] : [];
  u2.forEach((e4) => {
    r2 && e4.addEventListener("scroll", n2, { passive: true }), i2 && e4.addEventListener("resize", n2);
  });
  const d2 = s2 && a2 ? function(e4, t3) {
    let n3, o3 = null;
    const r3 = tr(e4);
    function i3() {
      clearTimeout(n3), o3 && o3.disconnect(), o3 = null;
    }
    return function l3(a3, c3) {
      void 0 === a3 && (a3 = false), void 0 === c3 && (c3 = 1), i3();
      const { left: s3, top: u3, width: d3, height: g3 } = e4.getBoundingClientRect();
      if (a3 || t3(), !d3 || !g3) return;
      const p3 = { rootMargin: -Ko(u3) + "px " + -Ko(r3.clientWidth - (s3 + d3)) + "px " + -Ko(r3.clientHeight - (u3 + g3)) + "px " + -Ko(s3) + "px", threshold: _o(0, Uo(1, c3)) || 1 };
      let f3 = true;
      function h3(e5) {
        const t4 = e5[0].intersectionRatio;
        if (t4 !== c3) {
          if (!f3) return l3();
          t4 ? l3(false, t4) : n3 = setTimeout(() => {
            l3(false, 1e-7);
          }, 100);
        }
        f3 = false;
      }
      try {
        o3 = new IntersectionObserver(h3, { ...p3, root: r3.ownerDocument });
      } catch (e5) {
        o3 = new IntersectionObserver(h3, p3);
      }
      o3.observe(e4);
    }(true), i3;
  }(s2, n2) : null;
  let g2, p2 = -1, f2 = null;
  l2 && (f2 = new ResizeObserver((e4) => {
    let [o3] = e4;
    o3 && o3.target === s2 && f2 && (f2.unobserve(t2), cancelAnimationFrame(p2), p2 = requestAnimationFrame(() => {
      f2 && f2.observe(t2);
    })), n2();
  }), s2 && !c2 && f2.observe(s2), f2.observe(t2));
  let h2 = c2 ? fr(e3) : null;
  return c2 && function t3() {
    const o3 = fr(e3);
    !h2 || o3.x === h2.x && o3.y === h2.y && o3.width === h2.width && o3.height === h2.height || n2();
    h2 = o3, g2 = requestAnimationFrame(t3);
  }(), n2(), () => {
    u2.forEach((e4) => {
      r2 && e4.removeEventListener("scroll", n2), i2 && e4.removeEventListener("resize", n2);
    }), d2 && d2(), f2 && f2.disconnect(), f2 = null, c2 && cancelAnimationFrame(g2);
  };
}
var mr = "undefined" != typeof document ? import_react.useLayoutEffect : import_react.useEffect;
var br = ["className", "clearValue", "cx", "getStyles", "getClassNames", "getValue", "hasValue", "isMulti", "isRtl", "options", "selectOption", "selectProps", "setValue", "theme"];
var vr = function() {
};
function yr(e3, t2) {
  return t2 ? "-" === t2[0] ? e3 + t2 : e3 + "__" + t2 : e3;
}
function xr(e3, t2) {
  for (var n2 = arguments.length, o2 = new Array(n2 > 2 ? n2 - 2 : 0), r2 = 2; r2 < n2; r2++) o2[r2 - 2] = arguments[r2];
  var i2 = [].concat(o2);
  if (t2 && e3) for (var l2 in t2) t2.hasOwnProperty(l2) && t2[l2] && i2.push("".concat(yr(e3, l2)));
  return i2.filter(function(e4) {
    return e4;
  }).map(function(e4) {
    return String(e4).trim();
  }).join(" ");
}
var Ir = function(e3) {
  return t2 = e3, Array.isArray(t2) ? e3.filter(Boolean) : "object" === dt(e3) && null !== e3 ? [e3] : [];
  var t2;
};
var wr = function(e3) {
  return e3.className, e3.clearValue, e3.cx, e3.getStyles, e3.getClassNames, e3.getValue, e3.hasValue, e3.isMulti, e3.isRtl, e3.options, e3.selectOption, e3.selectProps, e3.setValue, e3.theme, ht({}, yt(e3, br));
};
var Cr = function(e3, t2, n2) {
  var o2 = e3.cx, r2 = e3.getStyles, i2 = e3.getClassNames, l2 = e3.className;
  return { css: r2(t2, e3), className: o2(null != n2 ? n2 : {}, i2(t2, e3), l2) };
};
function Rr(e3) {
  return [document.documentElement, document.body, window].indexOf(e3) > -1;
}
function Ar(e3) {
  return Rr(e3) ? window.pageYOffset : e3.scrollTop;
}
function Er(e3, t2) {
  Rr(e3) ? window.scrollTo(0, t2) : e3.scrollTop = t2;
}
function Mr(e3, t2) {
  var n2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 200, o2 = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : vr, r2 = Ar(e3), i2 = t2 - r2, l2 = 0;
  !function t3() {
    var a2, c2 = i2 * ((a2 = (a2 = l2 += 10) / n2 - 1) * a2 * a2 + 1) + r2;
    Er(e3, c2), l2 < n2 ? window.requestAnimationFrame(t3) : o2(e3);
  }();
}
function Gr(e3, t2) {
  var n2 = e3.getBoundingClientRect(), o2 = t2.getBoundingClientRect(), r2 = t2.offsetHeight / 3;
  o2.bottom + r2 > n2.bottom ? Er(e3, Math.min(t2.offsetTop + t2.clientHeight - e3.offsetHeight + r2, e3.scrollHeight)) : o2.top - r2 < n2.top && Er(e3, Math.max(t2.offsetTop - r2, 0));
}
function Nr() {
  try {
    return document.createEvent("TouchEvent"), true;
  } catch (e3) {
    return false;
  }
}
var kr = false;
var Tr = { get passive() {
  return kr = true;
} };
var Sr = "undefined" != typeof window ? window : {};
Sr.addEventListener && Sr.removeEventListener && (Sr.addEventListener("p", vr, Tr), Sr.removeEventListener("p", vr, false));
var Br = kr;
function Lr(e3) {
  return null != e3;
}
function Pr(e3, t2, n2) {
  return e3 ? t2 : n2;
}
var Wr = ["children", "innerProps"];
var Xr = ["children", "innerProps"];
function Hr(e3) {
  var t2 = e3.maxHeight, n2 = e3.menuEl, o2 = e3.minHeight, r2 = e3.placement, i2 = e3.shouldScroll, l2 = e3.isFixedPosition, a2 = e3.controlHeight, c2 = function(e4) {
    var t3 = getComputedStyle(e4), n3 = "absolute" === t3.position, o3 = /(auto|scroll)/;
    if ("fixed" === t3.position) return document.documentElement;
    for (var r3 = e4; r3 = r3.parentElement; ) if (t3 = getComputedStyle(r3), (!n3 || "static" !== t3.position) && o3.test(t3.overflow + t3.overflowY + t3.overflowX)) return r3;
    return document.documentElement;
  }(n2), s2 = { placement: "bottom", maxHeight: t2 };
  if (!n2 || !n2.offsetParent) return s2;
  var u2, d2 = c2.getBoundingClientRect().height, g2 = n2.getBoundingClientRect(), p2 = g2.bottom, f2 = g2.height, h2 = g2.top, m2 = n2.offsetParent.getBoundingClientRect().top, b2 = l2 ? window.innerHeight : Rr(u2 = c2) ? window.innerHeight : u2.clientHeight, v2 = Ar(c2), y2 = parseInt(getComputedStyle(n2).marginBottom, 10), x2 = parseInt(getComputedStyle(n2).marginTop, 10), I2 = m2 - x2, w2 = b2 - h2, C2 = I2 + v2, R2 = d2 - v2 - h2, A2 = p2 - b2 + v2 + y2, E2 = v2 + h2 - x2, M2 = 160;
  switch (r2) {
    case "auto":
    case "bottom":
      if (w2 >= f2) return { placement: "bottom", maxHeight: t2 };
      if (R2 >= f2 && !l2) return i2 && Mr(c2, A2, M2), { placement: "bottom", maxHeight: t2 };
      if (!l2 && R2 >= o2 || l2 && w2 >= o2) return i2 && Mr(c2, A2, M2), { placement: "bottom", maxHeight: l2 ? w2 - y2 : R2 - y2 };
      if ("auto" === r2 || l2) {
        var G2 = t2, N2 = l2 ? I2 : C2;
        return N2 >= o2 && (G2 = Math.min(N2 - y2 - a2, t2)), { placement: "top", maxHeight: G2 };
      }
      if ("bottom" === r2) return i2 && Er(c2, A2), { placement: "bottom", maxHeight: t2 };
      break;
    case "top":
      if (I2 >= f2) return { placement: "top", maxHeight: t2 };
      if (C2 >= f2 && !l2) return i2 && Mr(c2, E2, M2), { placement: "top", maxHeight: t2 };
      if (!l2 && C2 >= o2 || l2 && I2 >= o2) {
        var k2 = t2;
        return (!l2 && C2 >= o2 || l2 && I2 >= o2) && (k2 = l2 ? I2 - x2 : C2 - x2), i2 && Mr(c2, E2, M2), { placement: "top", maxHeight: k2 };
      }
      return { placement: "bottom", maxHeight: t2 };
    default:
      throw new Error('Invalid placement provided "'.concat(r2, '".'));
  }
  return s2;
}
var Fr;
var Zr = function(e3) {
  return "auto" === e3 ? "bottom" : e3;
};
var Vr = (0, import_react.createContext)(null);
var Or = function(e3) {
  var t2 = e3.children, o2 = e3.minMenuHeight, r2 = e3.maxMenuHeight, l2 = e3.menuPlacement, a2 = e3.menuPosition, s2 = e3.menuShouldScrollIntoView, u2 = e3.theme, d2 = ((0, import_react.useContext)(Vr) || {}).setPortalPlacement, g2 = (0, import_react.useRef)(null), p2 = vt((0, import_react.useState)(r2), 2), f2 = p2[0], h2 = p2[1], m2 = vt((0, import_react.useState)(null), 2), b2 = m2[0], v2 = m2[1], y2 = u2.spacing.controlHeight;
  return mr(function() {
    var e4 = g2.current;
    if (e4) {
      var t3 = "fixed" === a2, n2 = Hr({ maxHeight: r2, menuEl: e4, minHeight: o2, placement: l2, shouldScroll: s2 && !t3, isFixedPosition: t3, controlHeight: y2 });
      h2(n2.maxHeight), v2(n2.placement), null == d2 || d2(n2.placement);
    }
  }, [r2, l2, a2, s2, o2, d2, y2]), t2({ ref: g2, placerProps: ht(ht({}, e3), {}, { placement: b2 || Zr(l2), maxHeight: f2 }) });
};
var Dr = function(e3) {
  var t2 = e3.children, n2 = e3.innerRef, o2 = e3.innerProps;
  return Xo("div", It({}, Cr(e3, "menu", { menu: true }), { ref: n2 }, o2), t2);
};
var Yr = function(e3, t2) {
  var n2 = e3.theme, o2 = n2.spacing.baseUnit, r2 = n2.colors;
  return ht({ textAlign: "center" }, t2 ? {} : { color: r2.neutral40, padding: "".concat(2 * o2, "px ").concat(3 * o2, "px") });
};
var zr = Yr;
var Jr = Yr;
var jr = ["size"];
var Ur = ["innerProps", "isRtl", "size"];
var _r;
var Qr;
var Kr = { name: "tj5bde-Svg", styles: "display:inline-block;fill:currentColor;line-height:1;stroke:currentColor;stroke-width:0;label:Svg;", map: "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGljYXRvcnMudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQXlCSSIsImZpbGUiOiJpbmRpY2F0b3JzLnRzeCIsInNvdXJjZXNDb250ZW50IjpbIi8qKiBAanN4IGpzeCAqL1xuaW1wb3J0IHsgUmVhY3ROb2RlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsganN4LCBrZXlmcmFtZXMgfSBmcm9tICdAZW1vdGlvbi9yZWFjdCc7XG5cbmltcG9ydCB7XG4gIENvbW1vblByb3BzQW5kQ2xhc3NOYW1lLFxuICBDU1NPYmplY3RXaXRoTGFiZWwsXG4gIEdyb3VwQmFzZSxcbn0gZnJvbSAnLi4vdHlwZXMnO1xuaW1wb3J0IHsgZ2V0U3R5bGVQcm9wcyB9IGZyb20gJy4uL3V0aWxzJztcblxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4vLyBEcm9wZG93biAmIENsZWFyIEljb25zXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuY29uc3QgU3ZnID0gKHtcbiAgc2l6ZSxcbiAgLi4ucHJvcHNcbn06IEpTWC5JbnRyaW5zaWNFbGVtZW50c1snc3ZnJ10gJiB7IHNpemU6IG51bWJlciB9KSA9PiAoXG4gIDxzdmdcbiAgICBoZWlnaHQ9e3NpemV9XG4gICAgd2lkdGg9e3NpemV9XG4gICAgdmlld0JveD1cIjAgMCAyMCAyMFwiXG4gICAgYXJpYS1oaWRkZW49XCJ0cnVlXCJcbiAgICBmb2N1c2FibGU9XCJmYWxzZVwiXG4gICAgY3NzPXt7XG4gICAgICBkaXNwbGF5OiAnaW5saW5lLWJsb2NrJyxcbiAgICAgIGZpbGw6ICdjdXJyZW50Q29sb3InLFxuICAgICAgbGluZUhlaWdodDogMSxcbiAgICAgIHN0cm9rZTogJ2N1cnJlbnRDb2xvcicsXG4gICAgICBzdHJva2VXaWR0aDogMCxcbiAgICB9fVxuICAgIHsuLi5wcm9wc31cbiAgLz5cbik7XG5cbmV4cG9ydCB0eXBlIENyb3NzSWNvblByb3BzID0gSlNYLkludHJpbnNpY0VsZW1lbnRzWydzdmcnXSAmIHsgc2l6ZT86IG51bWJlciB9O1xuZXhwb3J0IGNvbnN0IENyb3NzSWNvbiA9IChwcm9wczogQ3Jvc3NJY29uUHJvcHMpID0+IChcbiAgPFN2ZyBzaXplPXsyMH0gey4uLnByb3BzfT5cbiAgICA8cGF0aCBkPVwiTTE0LjM0OCAxNC44NDljLTAuNDY5IDAuNDY5LTEuMjI5IDAuNDY5LTEuNjk3IDBsLTIuNjUxLTMuMDMwLTIuNjUxIDMuMDI5Yy0wLjQ2OSAwLjQ2OS0xLjIyOSAwLjQ2OS0xLjY5NyAwLTAuNDY5LTAuNDY5LTAuNDY5LTEuMjI5IDAtMS42OTdsMi43NTgtMy4xNS0yLjc1OS0zLjE1MmMtMC40NjktMC40NjktMC40NjktMS4yMjggMC0xLjY5N3MxLjIyOC0wLjQ2OSAxLjY5NyAwbDIuNjUyIDMuMDMxIDIuNjUxLTMuMDMxYzAuNDY5LTAuNDY5IDEuMjI4LTAuNDY5IDEuNjk3IDBzMC40NjkgMS4yMjkgMCAxLjY5N2wtMi43NTggMy4xNTIgMi43NTggMy4xNWMwLjQ2OSAwLjQ2OSAwLjQ2OSAxLjIyOSAwIDEuNjk4elwiIC8+XG4gIDwvU3ZnPlxuKTtcbmV4cG9ydCB0eXBlIERvd25DaGV2cm9uUHJvcHMgPSBKU1guSW50cmluc2ljRWxlbWVudHNbJ3N2ZyddICYgeyBzaXplPzogbnVtYmVyIH07XG5leHBvcnQgY29uc3QgRG93bkNoZXZyb24gPSAocHJvcHM6IERvd25DaGV2cm9uUHJvcHMpID0+IChcbiAgPFN2ZyBzaXplPXsyMH0gey4uLnByb3BzfT5cbiAgICA8cGF0aCBkPVwiTTQuNTE2IDcuNTQ4YzAuNDM2LTAuNDQ2IDEuMDQzLTAuNDgxIDEuNTc2IDBsMy45MDggMy43NDcgMy45MDgtMy43NDdjMC41MzMtMC40ODEgMS4xNDEtMC40NDYgMS41NzQgMCAwLjQzNiAwLjQ0NSAwLjQwOCAxLjE5NyAwIDEuNjE1LTAuNDA2IDAuNDE4LTQuNjk1IDQuNTAyLTQuNjk1IDQuNTAyLTAuMjE3IDAuMjIzLTAuNTAyIDAuMzM1LTAuNzg3IDAuMzM1cy0wLjU3LTAuMTEyLTAuNzg5LTAuMzM1YzAgMC00LjI4Ny00LjA4NC00LjY5NS00LjUwMnMtMC40MzYtMS4xNyAwLTEuNjE1elwiIC8+XG4gIDwvU3ZnPlxuKTtcblxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4vLyBEcm9wZG93biAmIENsZWFyIEJ1dHRvbnNcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5leHBvcnQgaW50ZXJmYWNlIERyb3Bkb3duSW5kaWNhdG9yUHJvcHM8XG4gIE9wdGlvbiA9IHVua25vd24sXG4gIElzTXVsdGkgZXh0ZW5kcyBib29sZWFuID0gYm9vbGVhbixcbiAgR3JvdXAgZXh0ZW5kcyBHcm91cEJhc2U8T3B0aW9uPiA9IEdyb3VwQmFzZTxPcHRpb24+XG4+IGV4dGVuZHMgQ29tbW9uUHJvcHNBbmRDbGFzc05hbWU8T3B0aW9uLCBJc011bHRpLCBHcm91cD4ge1xuICAvKiogVGhlIGNoaWxkcmVuIHRvIGJlIHJlbmRlcmVkIGluc2lkZSB0aGUgaW5kaWNhdG9yLiAqL1xuICBjaGlsZHJlbj86IFJlYWN0Tm9kZTtcbiAgLyoqIFByb3BzIHRoYXQgd2lsbCBiZSBwYXNzZWQgb24gdG8gdGhlIGNoaWxkcmVuLiAqL1xuICBpbm5lclByb3BzOiBKU1guSW50cmluc2ljRWxlbWVudHNbJ2RpdiddO1xuICAvKiogVGhlIGZvY3VzZWQgc3RhdGUgb2YgdGhlIHNlbGVjdC4gKi9cbiAgaXNGb2N1c2VkOiBib29sZWFuO1xuICBpc0Rpc2FibGVkOiBib29sZWFuO1xufVxuXG5jb25zdCBiYXNlQ1NTID0gPFxuICBPcHRpb24sXG4gIElzTXVsdGkgZXh0ZW5kcyBib29sZWFuLFxuICBHcm91cCBleHRlbmRzIEdyb3VwQmFzZTxPcHRpb24+XG4+KFxuICB7XG4gICAgaXNGb2N1c2VkLFxuICAgIHRoZW1lOiB7XG4gICAgICBzcGFjaW5nOiB7IGJhc2VVbml0IH0sXG4gICAgICBjb2xvcnMsXG4gICAgfSxcbiAgfTpcbiAgICB8IERyb3Bkb3duSW5kaWNhdG9yUHJvcHM8T3B0aW9uLCBJc011bHRpLCBHcm91cD5cbiAgICB8IENsZWFySW5kaWNhdG9yUHJvcHM8T3B0aW9uLCBJc011bHRpLCBHcm91cD4sXG4gIHVuc3R5bGVkOiBib29sZWFuXG4pOiBDU1NPYmplY3RXaXRoTGFiZWwgPT4gKHtcbiAgbGFiZWw6ICdpbmRpY2F0b3JDb250YWluZXInLFxuICBkaXNwbGF5OiAnZmxleCcsXG4gIHRyYW5zaXRpb246ICdjb2xvciAxNTBtcycsXG4gIC4uLih1bnN0eWxlZFxuICAgID8ge31cbiAgICA6IHtcbiAgICAgICAgY29sb3I6IGlzRm9jdXNlZCA/IGNvbG9ycy5uZXV0cmFsNjAgOiBjb2xvcnMubmV1dHJhbDIwLFxuICAgICAgICBwYWRkaW5nOiBiYXNlVW5pdCAqIDIsXG4gICAgICAgICc6aG92ZXInOiB7XG4gICAgICAgICAgY29sb3I6IGlzRm9jdXNlZCA/IGNvbG9ycy5uZXV0cmFsODAgOiBjb2xvcnMubmV1dHJhbDQwLFxuICAgICAgICB9LFxuICAgICAgfSksXG59KTtcblxuZXhwb3J0IGNvbnN0IGRyb3Bkb3duSW5kaWNhdG9yQ1NTID0gYmFzZUNTUztcbmV4cG9ydCBjb25zdCBEcm9wZG93bkluZGljYXRvciA9IDxcbiAgT3B0aW9uLFxuICBJc011bHRpIGV4dGVuZHMgYm9vbGVhbixcbiAgR3JvdXAgZXh0ZW5kcyBHcm91cEJhc2U8T3B0aW9uPlxuPihcbiAgcHJvcHM6IERyb3Bkb3duSW5kaWNhdG9yUHJvcHM8T3B0aW9uLCBJc011bHRpLCBHcm91cD5cbikgPT4ge1xuICBjb25zdCB7IGNoaWxkcmVuLCBpbm5lclByb3BzIH0gPSBwcm9wcztcbiAgcmV0dXJuIChcbiAgICA8ZGl2XG4gICAgICB7Li4uZ2V0U3R5bGVQcm9wcyhwcm9wcywgJ2Ryb3Bkb3duSW5kaWNhdG9yJywge1xuICAgICAgICBpbmRpY2F0b3I6IHRydWUsXG4gICAgICAgICdkcm9wZG93bi1pbmRpY2F0b3InOiB0cnVlLFxuICAgICAgfSl9XG4gICAgICB7Li4uaW5uZXJQcm9wc31cbiAgICA+XG4gICAgICB7Y2hpbGRyZW4gfHwgPERvd25DaGV2cm9uIC8+fVxuICAgIDwvZGl2PlxuICApO1xufTtcblxuZXhwb3J0IGludGVyZmFjZSBDbGVhckluZGljYXRvclByb3BzPFxuICBPcHRpb24gPSB1bmtub3duLFxuICBJc011bHRpIGV4dGVuZHMgYm9vbGVhbiA9IGJvb2xlYW4sXG4gIEdyb3VwIGV4dGVuZHMgR3JvdXBCYXNlPE9wdGlvbj4gPSBHcm91cEJhc2U8T3B0aW9uPlxuPiBleHRlbmRzIENvbW1vblByb3BzQW5kQ2xhc3NOYW1lPE9wdGlvbiwgSXNNdWx0aSwgR3JvdXA+IHtcbiAgLyoqIFRoZSBjaGlsZHJlbiB0byBiZSByZW5kZXJlZCBpbnNpZGUgdGhlIGluZGljYXRvci4gKi9cbiAgY2hpbGRyZW4/OiBSZWFjdE5vZGU7XG4gIC8qKiBQcm9wcyB0aGF0IHdpbGwgYmUgcGFzc2VkIG9uIHRvIHRoZSBjaGlsZHJlbi4gKi9cbiAgaW5uZXJQcm9wczogSlNYLkludHJpbnNpY0VsZW1lbnRzWydkaXYnXTtcbiAgLyoqIFRoZSBmb2N1c2VkIHN0YXRlIG9mIHRoZSBzZWxlY3QuICovXG4gIGlzRm9jdXNlZDogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGNvbnN0IGNsZWFySW5kaWNhdG9yQ1NTID0gYmFzZUNTUztcbmV4cG9ydCBjb25zdCBDbGVhckluZGljYXRvciA9IDxcbiAgT3B0aW9uLFxuICBJc011bHRpIGV4dGVuZHMgYm9vbGVhbixcbiAgR3JvdXAgZXh0ZW5kcyBHcm91cEJhc2U8T3B0aW9uPlxuPihcbiAgcHJvcHM6IENsZWFySW5kaWNhdG9yUHJvcHM8T3B0aW9uLCBJc011bHRpLCBHcm91cD5cbikgPT4ge1xuICBjb25zdCB7IGNoaWxkcmVuLCBpbm5lclByb3BzIH0gPSBwcm9wcztcbiAgcmV0dXJuIChcbiAgICA8ZGl2XG4gICAgICB7Li4uZ2V0U3R5bGVQcm9wcyhwcm9wcywgJ2NsZWFySW5kaWNhdG9yJywge1xuICAgICAgICBpbmRpY2F0b3I6IHRydWUsXG4gICAgICAgICdjbGVhci1pbmRpY2F0b3InOiB0cnVlLFxuICAgICAgfSl9XG4gICAgICB7Li4uaW5uZXJQcm9wc31cbiAgICA+XG4gICAgICB7Y2hpbGRyZW4gfHwgPENyb3NzSWNvbiAvPn1cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG5cbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuLy8gU2VwYXJhdG9yXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuZXhwb3J0IGludGVyZmFjZSBJbmRpY2F0b3JTZXBhcmF0b3JQcm9wczxcbiAgT3B0aW9uID0gdW5rbm93bixcbiAgSXNNdWx0aSBleHRlbmRzIGJvb2xlYW4gPSBib29sZWFuLFxuICBHcm91cCBleHRlbmRzIEdyb3VwQmFzZTxPcHRpb24+ID0gR3JvdXBCYXNlPE9wdGlvbj5cbj4gZXh0ZW5kcyBDb21tb25Qcm9wc0FuZENsYXNzTmFtZTxPcHRpb24sIElzTXVsdGksIEdyb3VwPiB7XG4gIGlzRGlzYWJsZWQ6IGJvb2xlYW47XG4gIGlzRm9jdXNlZDogYm9vbGVhbjtcbiAgaW5uZXJQcm9wcz86IEpTWC5JbnRyaW5zaWNFbGVtZW50c1snc3BhbiddO1xufVxuXG5leHBvcnQgY29uc3QgaW5kaWNhdG9yU2VwYXJhdG9yQ1NTID0gPFxuICBPcHRpb24sXG4gIElzTXVsdGkgZXh0ZW5kcyBib29sZWFuLFxuICBHcm91cCBleHRlbmRzIEdyb3VwQmFzZTxPcHRpb24+XG4+KFxuICB7XG4gICAgaXNEaXNhYmxlZCxcbiAgICB0aGVtZToge1xuICAgICAgc3BhY2luZzogeyBiYXNlVW5pdCB9LFxuICAgICAgY29sb3JzLFxuICAgIH0sXG4gIH06IEluZGljYXRvclNlcGFyYXRvclByb3BzPE9wdGlvbiwgSXNNdWx0aSwgR3JvdXA+LFxuICB1bnN0eWxlZDogYm9vbGVhblxuKTogQ1NTT2JqZWN0V2l0aExhYmVsID0+ICh7XG4gIGxhYmVsOiAnaW5kaWNhdG9yU2VwYXJhdG9yJyxcbiAgYWxpZ25TZWxmOiAnc3RyZXRjaCcsXG4gIHdpZHRoOiAxLFxuICAuLi4odW5zdHlsZWRcbiAgICA/IHt9XG4gICAgOiB7XG4gICAgICAgIGJhY2tncm91bmRDb2xvcjogaXNEaXNhYmxlZCA/IGNvbG9ycy5uZXV0cmFsMTAgOiBjb2xvcnMubmV1dHJhbDIwLFxuICAgICAgICBtYXJnaW5Cb3R0b206IGJhc2VVbml0ICogMixcbiAgICAgICAgbWFyZ2luVG9wOiBiYXNlVW5pdCAqIDIsXG4gICAgICB9KSxcbn0pO1xuXG5leHBvcnQgY29uc3QgSW5kaWNhdG9yU2VwYXJhdG9yID0gPFxuICBPcHRpb24sXG4gIElzTXVsdGkgZXh0ZW5kcyBib29sZWFuLFxuICBHcm91cCBleHRlbmRzIEdyb3VwQmFzZTxPcHRpb24+XG4+KFxuICBwcm9wczogSW5kaWNhdG9yU2VwYXJhdG9yUHJvcHM8T3B0aW9uLCBJc011bHRpLCBHcm91cD5cbikgPT4ge1xuICBjb25zdCB7IGlubmVyUHJvcHMgfSA9IHByb3BzO1xuICByZXR1cm4gKFxuICAgIDxzcGFuXG4gICAgICB7Li4uaW5uZXJQcm9wc31cbiAgICAgIHsuLi5nZXRTdHlsZVByb3BzKHByb3BzLCAnaW5kaWNhdG9yU2VwYXJhdG9yJywge1xuICAgICAgICAnaW5kaWNhdG9yLXNlcGFyYXRvcic6IHRydWUsXG4gICAgICB9KX1cbiAgICAvPlxuICApO1xufTtcblxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4vLyBMb2FkaW5nXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuY29uc3QgbG9hZGluZ0RvdEFuaW1hdGlvbnMgPSBrZXlmcmFtZXNgXG4gIDAlLCA4MCUsIDEwMCUgeyBvcGFjaXR5OiAwOyB9XG4gIDQwJSB7IG9wYWNpdHk6IDE7IH1cbmA7XG5cbmV4cG9ydCBjb25zdCBsb2FkaW5nSW5kaWNhdG9yQ1NTID0gPFxuICBPcHRpb24sXG4gIElzTXVsdGkgZXh0ZW5kcyBib29sZWFuLFxuICBHcm91cCBleHRlbmRzIEdyb3VwQmFzZTxPcHRpb24+XG4+KFxuICB7XG4gICAgaXNGb2N1c2VkLFxuICAgIHNpemUsXG4gICAgdGhlbWU6IHtcbiAgICAgIGNvbG9ycyxcbiAgICAgIHNwYWNpbmc6IHsgYmFzZVVuaXQgfSxcbiAgICB9LFxuICB9OiBMb2FkaW5nSW5kaWNhdG9yUHJvcHM8T3B0aW9uLCBJc011bHRpLCBHcm91cD4sXG4gIHVuc3R5bGVkOiBib29sZWFuXG4pOiBDU1NPYmplY3RXaXRoTGFiZWwgPT4gKHtcbiAgbGFiZWw6ICdsb2FkaW5nSW5kaWNhdG9yJyxcbiAgZGlzcGxheTogJ2ZsZXgnLFxuICB0cmFuc2l0aW9uOiAnY29sb3IgMTUwbXMnLFxuICBhbGlnblNlbGY6ICdjZW50ZXInLFxuICBmb250U2l6ZTogc2l6ZSxcbiAgbGluZUhlaWdodDogMSxcbiAgbWFyZ2luUmlnaHQ6IHNpemUsXG4gIHRleHRBbGlnbjogJ2NlbnRlcicsXG4gIHZlcnRpY2FsQWxpZ246ICdtaWRkbGUnLFxuICAuLi4odW5zdHlsZWRcbiAgICA/IHt9XG4gICAgOiB7XG4gICAgICAgIGNvbG9yOiBpc0ZvY3VzZWQgPyBjb2xvcnMubmV1dHJhbDYwIDogY29sb3JzLm5ldXRyYWwyMCxcbiAgICAgICAgcGFkZGluZzogYmFzZVVuaXQgKiAyLFxuICAgICAgfSksXG59KTtcblxuaW50ZXJmYWNlIExvYWRpbmdEb3RQcm9wcyB7XG4gIGRlbGF5OiBudW1iZXI7XG4gIG9mZnNldDogYm9vbGVhbjtcbn1cbmNvbnN0IExvYWRpbmdEb3QgPSAoeyBkZWxheSwgb2Zmc2V0IH06IExvYWRpbmdEb3RQcm9wcykgPT4gKFxuICA8c3BhblxuICAgIGNzcz17e1xuICAgICAgYW5pbWF0aW9uOiBgJHtsb2FkaW5nRG90QW5pbWF0aW9uc30gMXMgZWFzZS1pbi1vdXQgJHtkZWxheX1tcyBpbmZpbml0ZTtgLFxuICAgICAgYmFja2dyb3VuZENvbG9yOiAnY3VycmVudENvbG9yJyxcbiAgICAgIGJvcmRlclJhZGl1czogJzFlbScsXG4gICAgICBkaXNwbGF5OiAnaW5saW5lLWJsb2NrJyxcbiAgICAgIG1hcmdpbkxlZnQ6IG9mZnNldCA/ICcxZW0nIDogdW5kZWZpbmVkLFxuICAgICAgaGVpZ2h0OiAnMWVtJyxcbiAgICAgIHZlcnRpY2FsQWxpZ246ICd0b3AnLFxuICAgICAgd2lkdGg6ICcxZW0nLFxuICAgIH19XG4gIC8+XG4pO1xuXG5leHBvcnQgaW50ZXJmYWNlIExvYWRpbmdJbmRpY2F0b3JQcm9wczxcbiAgT3B0aW9uID0gdW5rbm93bixcbiAgSXNNdWx0aSBleHRlbmRzIGJvb2xlYW4gPSBib29sZWFuLFxuICBHcm91cCBleHRlbmRzIEdyb3VwQmFzZTxPcHRpb24+ID0gR3JvdXBCYXNlPE9wdGlvbj5cbj4gZXh0ZW5kcyBDb21tb25Qcm9wc0FuZENsYXNzTmFtZTxPcHRpb24sIElzTXVsdGksIEdyb3VwPiB7XG4gIC8qKiBQcm9wcyB0aGF0IHdpbGwgYmUgcGFzc2VkIG9uIHRvIHRoZSBjaGlsZHJlbi4gKi9cbiAgaW5uZXJQcm9wczogSlNYLkludHJpbnNpY0VsZW1lbnRzWydkaXYnXTtcbiAgLyoqIFRoZSBmb2N1c2VkIHN0YXRlIG9mIHRoZSBzZWxlY3QuICovXG4gIGlzRm9jdXNlZDogYm9vbGVhbjtcbiAgaXNEaXNhYmxlZDogYm9vbGVhbjtcbiAgLyoqIFNldCBzaXplIG9mIHRoZSBjb250YWluZXIuICovXG4gIHNpemU6IG51bWJlcjtcbn1cbmV4cG9ydCBjb25zdCBMb2FkaW5nSW5kaWNhdG9yID0gPFxuICBPcHRpb24sXG4gIElzTXVsdGkgZXh0ZW5kcyBib29sZWFuLFxuICBHcm91cCBleHRlbmRzIEdyb3VwQmFzZTxPcHRpb24+XG4+KHtcbiAgaW5uZXJQcm9wcyxcbiAgaXNSdGwsXG4gIHNpemUgPSA0LFxuICAuLi5yZXN0UHJvcHNcbn06IExvYWRpbmdJbmRpY2F0b3JQcm9wczxPcHRpb24sIElzTXVsdGksIEdyb3VwPikgPT4ge1xuICByZXR1cm4gKFxuICAgIDxkaXZcbiAgICAgIHsuLi5nZXRTdHlsZVByb3BzKFxuICAgICAgICB7IC4uLnJlc3RQcm9wcywgaW5uZXJQcm9wcywgaXNSdGwsIHNpemUgfSxcbiAgICAgICAgJ2xvYWRpbmdJbmRpY2F0b3InLFxuICAgICAgICB7XG4gICAgICAgICAgaW5kaWNhdG9yOiB0cnVlLFxuICAgICAgICAgICdsb2FkaW5nLWluZGljYXRvcic6IHRydWUsXG4gICAgICAgIH1cbiAgICAgICl9XG4gICAgICB7Li4uaW5uZXJQcm9wc31cbiAgICA+XG4gICAgICA8TG9hZGluZ0RvdCBkZWxheT17MH0gb2Zmc2V0PXtpc1J0bH0gLz5cbiAgICAgIDxMb2FkaW5nRG90IGRlbGF5PXsxNjB9IG9mZnNldCAvPlxuICAgICAgPExvYWRpbmdEb3QgZGVsYXk9ezMyMH0gb2Zmc2V0PXshaXNSdGx9IC8+XG4gICAgPC9kaXY+XG4gICk7XG59O1xuIl19 */", toString: function() {
  return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop).";
} };
var $r = function(e3) {
  var t2 = e3.size, n2 = yt(e3, jr);
  return Xo("svg", It({ height: t2, width: t2, viewBox: "0 0 20 20", "aria-hidden": "true", focusable: "false", css: Kr }, n2));
};
var qr = function(e3) {
  return Xo($r, It({ size: 20 }, e3), Xo("path", { d: "M14.348 14.849c-0.469 0.469-1.229 0.469-1.697 0l-2.651-3.030-2.651 3.029c-0.469 0.469-1.229 0.469-1.697 0-0.469-0.469-0.469-1.229 0-1.697l2.758-3.15-2.759-3.152c-0.469-0.469-0.469-1.228 0-1.697s1.228-0.469 1.697 0l2.652 3.031 2.651-3.031c0.469-0.469 1.228-0.469 1.697 0s0.469 1.229 0 1.697l-2.758 3.152 2.758 3.15c0.469 0.469 0.469 1.229 0 1.698z" }));
};
var ei = function(e3) {
  return Xo($r, It({ size: 20 }, e3), Xo("path", { d: "M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z" }));
};
var ti = function(e3, t2) {
  var n2 = e3.isFocused, o2 = e3.theme, r2 = o2.spacing.baseUnit, i2 = o2.colors;
  return ht({ label: "indicatorContainer", display: "flex", transition: "color 150ms" }, t2 ? {} : { color: n2 ? i2.neutral60 : i2.neutral20, padding: 2 * r2, ":hover": { color: n2 ? i2.neutral80 : i2.neutral40 } });
};
var ni = ti;
var oi = ti;
var ri = function() {
  var e3 = Zo.apply(void 0, arguments), t2 = "animation-" + e3.name;
  return { name: t2, styles: "@keyframes " + t2 + "{" + e3.styles + "}", anim: 1, toString: function() {
    return "_EMO_" + this.name + "_" + this.styles + "_EMO_";
  } };
}(Fr || (_r = ["\n  0%, 80%, 100% { opacity: 0; }\n  40% { opacity: 1; }\n"], Qr || (Qr = _r.slice(0)), Fr = Object.freeze(Object.defineProperties(_r, { raw: { value: Object.freeze(Qr) } }))));
var ii = function(e3) {
  var t2 = e3.delay, n2 = e3.offset;
  return Xo("span", { css: Zo({ animation: "".concat(ri, " 1s ease-in-out ").concat(t2, "ms infinite;"), backgroundColor: "currentColor", borderRadius: "1em", display: "inline-block", marginLeft: n2 ? "1em" : void 0, height: "1em", verticalAlign: "top", width: "1em" }, ";label:LoadingDot;", "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGljYXRvcnMudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQW1RSSIsImZpbGUiOiJpbmRpY2F0b3JzLnRzeCIsInNvdXJjZXNDb250ZW50IjpbIi8qKiBAanN4IGpzeCAqL1xuaW1wb3J0IHsgUmVhY3ROb2RlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsganN4LCBrZXlmcmFtZXMgfSBmcm9tICdAZW1vdGlvbi9yZWFjdCc7XG5cbmltcG9ydCB7XG4gIENvbW1vblByb3BzQW5kQ2xhc3NOYW1lLFxuICBDU1NPYmplY3RXaXRoTGFiZWwsXG4gIEdyb3VwQmFzZSxcbn0gZnJvbSAnLi4vdHlwZXMnO1xuaW1wb3J0IHsgZ2V0U3R5bGVQcm9wcyB9IGZyb20gJy4uL3V0aWxzJztcblxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4vLyBEcm9wZG93biAmIENsZWFyIEljb25zXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuY29uc3QgU3ZnID0gKHtcbiAgc2l6ZSxcbiAgLi4ucHJvcHNcbn06IEpTWC5JbnRyaW5zaWNFbGVtZW50c1snc3ZnJ10gJiB7IHNpemU6IG51bWJlciB9KSA9PiAoXG4gIDxzdmdcbiAgICBoZWlnaHQ9e3NpemV9XG4gICAgd2lkdGg9e3NpemV9XG4gICAgdmlld0JveD1cIjAgMCAyMCAyMFwiXG4gICAgYXJpYS1oaWRkZW49XCJ0cnVlXCJcbiAgICBmb2N1c2FibGU9XCJmYWxzZVwiXG4gICAgY3NzPXt7XG4gICAgICBkaXNwbGF5OiAnaW5saW5lLWJsb2NrJyxcbiAgICAgIGZpbGw6ICdjdXJyZW50Q29sb3InLFxuICAgICAgbGluZUhlaWdodDogMSxcbiAgICAgIHN0cm9rZTogJ2N1cnJlbnRDb2xvcicsXG4gICAgICBzdHJva2VXaWR0aDogMCxcbiAgICB9fVxuICAgIHsuLi5wcm9wc31cbiAgLz5cbik7XG5cbmV4cG9ydCB0eXBlIENyb3NzSWNvblByb3BzID0gSlNYLkludHJpbnNpY0VsZW1lbnRzWydzdmcnXSAmIHsgc2l6ZT86IG51bWJlciB9O1xuZXhwb3J0IGNvbnN0IENyb3NzSWNvbiA9IChwcm9wczogQ3Jvc3NJY29uUHJvcHMpID0+IChcbiAgPFN2ZyBzaXplPXsyMH0gey4uLnByb3BzfT5cbiAgICA8cGF0aCBkPVwiTTE0LjM0OCAxNC44NDljLTAuNDY5IDAuNDY5LTEuMjI5IDAuNDY5LTEuNjk3IDBsLTIuNjUxLTMuMDMwLTIuNjUxIDMuMDI5Yy0wLjQ2OSAwLjQ2OS0xLjIyOSAwLjQ2OS0xLjY5NyAwLTAuNDY5LTAuNDY5LTAuNDY5LTEuMjI5IDAtMS42OTdsMi43NTgtMy4xNS0yLjc1OS0zLjE1MmMtMC40NjktMC40NjktMC40NjktMS4yMjggMC0xLjY5N3MxLjIyOC0wLjQ2OSAxLjY5NyAwbDIuNjUyIDMuMDMxIDIuNjUxLTMuMDMxYzAuNDY5LTAuNDY5IDEuMjI4LTAuNDY5IDEuNjk3IDBzMC40NjkgMS4yMjkgMCAxLjY5N2wtMi43NTggMy4xNTIgMi43NTggMy4xNWMwLjQ2OSAwLjQ2OSAwLjQ2OSAxLjIyOSAwIDEuNjk4elwiIC8+XG4gIDwvU3ZnPlxuKTtcbmV4cG9ydCB0eXBlIERvd25DaGV2cm9uUHJvcHMgPSBKU1guSW50cmluc2ljRWxlbWVudHNbJ3N2ZyddICYgeyBzaXplPzogbnVtYmVyIH07XG5leHBvcnQgY29uc3QgRG93bkNoZXZyb24gPSAocHJvcHM6IERvd25DaGV2cm9uUHJvcHMpID0+IChcbiAgPFN2ZyBzaXplPXsyMH0gey4uLnByb3BzfT5cbiAgICA8cGF0aCBkPVwiTTQuNTE2IDcuNTQ4YzAuNDM2LTAuNDQ2IDEuMDQzLTAuNDgxIDEuNTc2IDBsMy45MDggMy43NDcgMy45MDgtMy43NDdjMC41MzMtMC40ODEgMS4xNDEtMC40NDYgMS41NzQgMCAwLjQzNiAwLjQ0NSAwLjQwOCAxLjE5NyAwIDEuNjE1LTAuNDA2IDAuNDE4LTQuNjk1IDQuNTAyLTQuNjk1IDQuNTAyLTAuMjE3IDAuMjIzLTAuNTAyIDAuMzM1LTAuNzg3IDAuMzM1cy0wLjU3LTAuMTEyLTAuNzg5LTAuMzM1YzAgMC00LjI4Ny00LjA4NC00LjY5NS00LjUwMnMtMC40MzYtMS4xNyAwLTEuNjE1elwiIC8+XG4gIDwvU3ZnPlxuKTtcblxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4vLyBEcm9wZG93biAmIENsZWFyIEJ1dHRvbnNcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5leHBvcnQgaW50ZXJmYWNlIERyb3Bkb3duSW5kaWNhdG9yUHJvcHM8XG4gIE9wdGlvbiA9IHVua25vd24sXG4gIElzTXVsdGkgZXh0ZW5kcyBib29sZWFuID0gYm9vbGVhbixcbiAgR3JvdXAgZXh0ZW5kcyBHcm91cEJhc2U8T3B0aW9uPiA9IEdyb3VwQmFzZTxPcHRpb24+XG4+IGV4dGVuZHMgQ29tbW9uUHJvcHNBbmRDbGFzc05hbWU8T3B0aW9uLCBJc011bHRpLCBHcm91cD4ge1xuICAvKiogVGhlIGNoaWxkcmVuIHRvIGJlIHJlbmRlcmVkIGluc2lkZSB0aGUgaW5kaWNhdG9yLiAqL1xuICBjaGlsZHJlbj86IFJlYWN0Tm9kZTtcbiAgLyoqIFByb3BzIHRoYXQgd2lsbCBiZSBwYXNzZWQgb24gdG8gdGhlIGNoaWxkcmVuLiAqL1xuICBpbm5lclByb3BzOiBKU1guSW50cmluc2ljRWxlbWVudHNbJ2RpdiddO1xuICAvKiogVGhlIGZvY3VzZWQgc3RhdGUgb2YgdGhlIHNlbGVjdC4gKi9cbiAgaXNGb2N1c2VkOiBib29sZWFuO1xuICBpc0Rpc2FibGVkOiBib29sZWFuO1xufVxuXG5jb25zdCBiYXNlQ1NTID0gPFxuICBPcHRpb24sXG4gIElzTXVsdGkgZXh0ZW5kcyBib29sZWFuLFxuICBHcm91cCBleHRlbmRzIEdyb3VwQmFzZTxPcHRpb24+XG4+KFxuICB7XG4gICAgaXNGb2N1c2VkLFxuICAgIHRoZW1lOiB7XG4gICAgICBzcGFjaW5nOiB7IGJhc2VVbml0IH0sXG4gICAgICBjb2xvcnMsXG4gICAgfSxcbiAgfTpcbiAgICB8IERyb3Bkb3duSW5kaWNhdG9yUHJvcHM8T3B0aW9uLCBJc011bHRpLCBHcm91cD5cbiAgICB8IENsZWFySW5kaWNhdG9yUHJvcHM8T3B0aW9uLCBJc011bHRpLCBHcm91cD4sXG4gIHVuc3R5bGVkOiBib29sZWFuXG4pOiBDU1NPYmplY3RXaXRoTGFiZWwgPT4gKHtcbiAgbGFiZWw6ICdpbmRpY2F0b3JDb250YWluZXInLFxuICBkaXNwbGF5OiAnZmxleCcsXG4gIHRyYW5zaXRpb246ICdjb2xvciAxNTBtcycsXG4gIC4uLih1bnN0eWxlZFxuICAgID8ge31cbiAgICA6IHtcbiAgICAgICAgY29sb3I6IGlzRm9jdXNlZCA/IGNvbG9ycy5uZXV0cmFsNjAgOiBjb2xvcnMubmV1dHJhbDIwLFxuICAgICAgICBwYWRkaW5nOiBiYXNlVW5pdCAqIDIsXG4gICAgICAgICc6aG92ZXInOiB7XG4gICAgICAgICAgY29sb3I6IGlzRm9jdXNlZCA/IGNvbG9ycy5uZXV0cmFsODAgOiBjb2xvcnMubmV1dHJhbDQwLFxuICAgICAgICB9LFxuICAgICAgfSksXG59KTtcblxuZXhwb3J0IGNvbnN0IGRyb3Bkb3duSW5kaWNhdG9yQ1NTID0gYmFzZUNTUztcbmV4cG9ydCBjb25zdCBEcm9wZG93bkluZGljYXRvciA9IDxcbiAgT3B0aW9uLFxuICBJc011bHRpIGV4dGVuZHMgYm9vbGVhbixcbiAgR3JvdXAgZXh0ZW5kcyBHcm91cEJhc2U8T3B0aW9uPlxuPihcbiAgcHJvcHM6IERyb3Bkb3duSW5kaWNhdG9yUHJvcHM8T3B0aW9uLCBJc011bHRpLCBHcm91cD5cbikgPT4ge1xuICBjb25zdCB7IGNoaWxkcmVuLCBpbm5lclByb3BzIH0gPSBwcm9wcztcbiAgcmV0dXJuIChcbiAgICA8ZGl2XG4gICAgICB7Li4uZ2V0U3R5bGVQcm9wcyhwcm9wcywgJ2Ryb3Bkb3duSW5kaWNhdG9yJywge1xuICAgICAgICBpbmRpY2F0b3I6IHRydWUsXG4gICAgICAgICdkcm9wZG93bi1pbmRpY2F0b3InOiB0cnVlLFxuICAgICAgfSl9XG4gICAgICB7Li4uaW5uZXJQcm9wc31cbiAgICA+XG4gICAgICB7Y2hpbGRyZW4gfHwgPERvd25DaGV2cm9uIC8+fVxuICAgIDwvZGl2PlxuICApO1xufTtcblxuZXhwb3J0IGludGVyZmFjZSBDbGVhckluZGljYXRvclByb3BzPFxuICBPcHRpb24gPSB1bmtub3duLFxuICBJc011bHRpIGV4dGVuZHMgYm9vbGVhbiA9IGJvb2xlYW4sXG4gIEdyb3VwIGV4dGVuZHMgR3JvdXBCYXNlPE9wdGlvbj4gPSBHcm91cEJhc2U8T3B0aW9uPlxuPiBleHRlbmRzIENvbW1vblByb3BzQW5kQ2xhc3NOYW1lPE9wdGlvbiwgSXNNdWx0aSwgR3JvdXA+IHtcbiAgLyoqIFRoZSBjaGlsZHJlbiB0byBiZSByZW5kZXJlZCBpbnNpZGUgdGhlIGluZGljYXRvci4gKi9cbiAgY2hpbGRyZW4/OiBSZWFjdE5vZGU7XG4gIC8qKiBQcm9wcyB0aGF0IHdpbGwgYmUgcGFzc2VkIG9uIHRvIHRoZSBjaGlsZHJlbi4gKi9cbiAgaW5uZXJQcm9wczogSlNYLkludHJpbnNpY0VsZW1lbnRzWydkaXYnXTtcbiAgLyoqIFRoZSBmb2N1c2VkIHN0YXRlIG9mIHRoZSBzZWxlY3QuICovXG4gIGlzRm9jdXNlZDogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGNvbnN0IGNsZWFySW5kaWNhdG9yQ1NTID0gYmFzZUNTUztcbmV4cG9ydCBjb25zdCBDbGVhckluZGljYXRvciA9IDxcbiAgT3B0aW9uLFxuICBJc011bHRpIGV4dGVuZHMgYm9vbGVhbixcbiAgR3JvdXAgZXh0ZW5kcyBHcm91cEJhc2U8T3B0aW9uPlxuPihcbiAgcHJvcHM6IENsZWFySW5kaWNhdG9yUHJvcHM8T3B0aW9uLCBJc011bHRpLCBHcm91cD5cbikgPT4ge1xuICBjb25zdCB7IGNoaWxkcmVuLCBpbm5lclByb3BzIH0gPSBwcm9wcztcbiAgcmV0dXJuIChcbiAgICA8ZGl2XG4gICAgICB7Li4uZ2V0U3R5bGVQcm9wcyhwcm9wcywgJ2NsZWFySW5kaWNhdG9yJywge1xuICAgICAgICBpbmRpY2F0b3I6IHRydWUsXG4gICAgICAgICdjbGVhci1pbmRpY2F0b3InOiB0cnVlLFxuICAgICAgfSl9XG4gICAgICB7Li4uaW5uZXJQcm9wc31cbiAgICA+XG4gICAgICB7Y2hpbGRyZW4gfHwgPENyb3NzSWNvbiAvPn1cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG5cbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuLy8gU2VwYXJhdG9yXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuZXhwb3J0IGludGVyZmFjZSBJbmRpY2F0b3JTZXBhcmF0b3JQcm9wczxcbiAgT3B0aW9uID0gdW5rbm93bixcbiAgSXNNdWx0aSBleHRlbmRzIGJvb2xlYW4gPSBib29sZWFuLFxuICBHcm91cCBleHRlbmRzIEdyb3VwQmFzZTxPcHRpb24+ID0gR3JvdXBCYXNlPE9wdGlvbj5cbj4gZXh0ZW5kcyBDb21tb25Qcm9wc0FuZENsYXNzTmFtZTxPcHRpb24sIElzTXVsdGksIEdyb3VwPiB7XG4gIGlzRGlzYWJsZWQ6IGJvb2xlYW47XG4gIGlzRm9jdXNlZDogYm9vbGVhbjtcbiAgaW5uZXJQcm9wcz86IEpTWC5JbnRyaW5zaWNFbGVtZW50c1snc3BhbiddO1xufVxuXG5leHBvcnQgY29uc3QgaW5kaWNhdG9yU2VwYXJhdG9yQ1NTID0gPFxuICBPcHRpb24sXG4gIElzTXVsdGkgZXh0ZW5kcyBib29sZWFuLFxuICBHcm91cCBleHRlbmRzIEdyb3VwQmFzZTxPcHRpb24+XG4+KFxuICB7XG4gICAgaXNEaXNhYmxlZCxcbiAgICB0aGVtZToge1xuICAgICAgc3BhY2luZzogeyBiYXNlVW5pdCB9LFxuICAgICAgY29sb3JzLFxuICAgIH0sXG4gIH06IEluZGljYXRvclNlcGFyYXRvclByb3BzPE9wdGlvbiwgSXNNdWx0aSwgR3JvdXA+LFxuICB1bnN0eWxlZDogYm9vbGVhblxuKTogQ1NTT2JqZWN0V2l0aExhYmVsID0+ICh7XG4gIGxhYmVsOiAnaW5kaWNhdG9yU2VwYXJhdG9yJyxcbiAgYWxpZ25TZWxmOiAnc3RyZXRjaCcsXG4gIHdpZHRoOiAxLFxuICAuLi4odW5zdHlsZWRcbiAgICA/IHt9XG4gICAgOiB7XG4gICAgICAgIGJhY2tncm91bmRDb2xvcjogaXNEaXNhYmxlZCA/IGNvbG9ycy5uZXV0cmFsMTAgOiBjb2xvcnMubmV1dHJhbDIwLFxuICAgICAgICBtYXJnaW5Cb3R0b206IGJhc2VVbml0ICogMixcbiAgICAgICAgbWFyZ2luVG9wOiBiYXNlVW5pdCAqIDIsXG4gICAgICB9KSxcbn0pO1xuXG5leHBvcnQgY29uc3QgSW5kaWNhdG9yU2VwYXJhdG9yID0gPFxuICBPcHRpb24sXG4gIElzTXVsdGkgZXh0ZW5kcyBib29sZWFuLFxuICBHcm91cCBleHRlbmRzIEdyb3VwQmFzZTxPcHRpb24+XG4+KFxuICBwcm9wczogSW5kaWNhdG9yU2VwYXJhdG9yUHJvcHM8T3B0aW9uLCBJc011bHRpLCBHcm91cD5cbikgPT4ge1xuICBjb25zdCB7IGlubmVyUHJvcHMgfSA9IHByb3BzO1xuICByZXR1cm4gKFxuICAgIDxzcGFuXG4gICAgICB7Li4uaW5uZXJQcm9wc31cbiAgICAgIHsuLi5nZXRTdHlsZVByb3BzKHByb3BzLCAnaW5kaWNhdG9yU2VwYXJhdG9yJywge1xuICAgICAgICAnaW5kaWNhdG9yLXNlcGFyYXRvcic6IHRydWUsXG4gICAgICB9KX1cbiAgICAvPlxuICApO1xufTtcblxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4vLyBMb2FkaW5nXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuY29uc3QgbG9hZGluZ0RvdEFuaW1hdGlvbnMgPSBrZXlmcmFtZXNgXG4gIDAlLCA4MCUsIDEwMCUgeyBvcGFjaXR5OiAwOyB9XG4gIDQwJSB7IG9wYWNpdHk6IDE7IH1cbmA7XG5cbmV4cG9ydCBjb25zdCBsb2FkaW5nSW5kaWNhdG9yQ1NTID0gPFxuICBPcHRpb24sXG4gIElzTXVsdGkgZXh0ZW5kcyBib29sZWFuLFxuICBHcm91cCBleHRlbmRzIEdyb3VwQmFzZTxPcHRpb24+XG4+KFxuICB7XG4gICAgaXNGb2N1c2VkLFxuICAgIHNpemUsXG4gICAgdGhlbWU6IHtcbiAgICAgIGNvbG9ycyxcbiAgICAgIHNwYWNpbmc6IHsgYmFzZVVuaXQgfSxcbiAgICB9LFxuICB9OiBMb2FkaW5nSW5kaWNhdG9yUHJvcHM8T3B0aW9uLCBJc011bHRpLCBHcm91cD4sXG4gIHVuc3R5bGVkOiBib29sZWFuXG4pOiBDU1NPYmplY3RXaXRoTGFiZWwgPT4gKHtcbiAgbGFiZWw6ICdsb2FkaW5nSW5kaWNhdG9yJyxcbiAgZGlzcGxheTogJ2ZsZXgnLFxuICB0cmFuc2l0aW9uOiAnY29sb3IgMTUwbXMnLFxuICBhbGlnblNlbGY6ICdjZW50ZXInLFxuICBmb250U2l6ZTogc2l6ZSxcbiAgbGluZUhlaWdodDogMSxcbiAgbWFyZ2luUmlnaHQ6IHNpemUsXG4gIHRleHRBbGlnbjogJ2NlbnRlcicsXG4gIHZlcnRpY2FsQWxpZ246ICdtaWRkbGUnLFxuICAuLi4odW5zdHlsZWRcbiAgICA/IHt9XG4gICAgOiB7XG4gICAgICAgIGNvbG9yOiBpc0ZvY3VzZWQgPyBjb2xvcnMubmV1dHJhbDYwIDogY29sb3JzLm5ldXRyYWwyMCxcbiAgICAgICAgcGFkZGluZzogYmFzZVVuaXQgKiAyLFxuICAgICAgfSksXG59KTtcblxuaW50ZXJmYWNlIExvYWRpbmdEb3RQcm9wcyB7XG4gIGRlbGF5OiBudW1iZXI7XG4gIG9mZnNldDogYm9vbGVhbjtcbn1cbmNvbnN0IExvYWRpbmdEb3QgPSAoeyBkZWxheSwgb2Zmc2V0IH06IExvYWRpbmdEb3RQcm9wcykgPT4gKFxuICA8c3BhblxuICAgIGNzcz17e1xuICAgICAgYW5pbWF0aW9uOiBgJHtsb2FkaW5nRG90QW5pbWF0aW9uc30gMXMgZWFzZS1pbi1vdXQgJHtkZWxheX1tcyBpbmZpbml0ZTtgLFxuICAgICAgYmFja2dyb3VuZENvbG9yOiAnY3VycmVudENvbG9yJyxcbiAgICAgIGJvcmRlclJhZGl1czogJzFlbScsXG4gICAgICBkaXNwbGF5OiAnaW5saW5lLWJsb2NrJyxcbiAgICAgIG1hcmdpbkxlZnQ6IG9mZnNldCA/ICcxZW0nIDogdW5kZWZpbmVkLFxuICAgICAgaGVpZ2h0OiAnMWVtJyxcbiAgICAgIHZlcnRpY2FsQWxpZ246ICd0b3AnLFxuICAgICAgd2lkdGg6ICcxZW0nLFxuICAgIH19XG4gIC8+XG4pO1xuXG5leHBvcnQgaW50ZXJmYWNlIExvYWRpbmdJbmRpY2F0b3JQcm9wczxcbiAgT3B0aW9uID0gdW5rbm93bixcbiAgSXNNdWx0aSBleHRlbmRzIGJvb2xlYW4gPSBib29sZWFuLFxuICBHcm91cCBleHRlbmRzIEdyb3VwQmFzZTxPcHRpb24+ID0gR3JvdXBCYXNlPE9wdGlvbj5cbj4gZXh0ZW5kcyBDb21tb25Qcm9wc0FuZENsYXNzTmFtZTxPcHRpb24sIElzTXVsdGksIEdyb3VwPiB7XG4gIC8qKiBQcm9wcyB0aGF0IHdpbGwgYmUgcGFzc2VkIG9uIHRvIHRoZSBjaGlsZHJlbi4gKi9cbiAgaW5uZXJQcm9wczogSlNYLkludHJpbnNpY0VsZW1lbnRzWydkaXYnXTtcbiAgLyoqIFRoZSBmb2N1c2VkIHN0YXRlIG9mIHRoZSBzZWxlY3QuICovXG4gIGlzRm9jdXNlZDogYm9vbGVhbjtcbiAgaXNEaXNhYmxlZDogYm9vbGVhbjtcbiAgLyoqIFNldCBzaXplIG9mIHRoZSBjb250YWluZXIuICovXG4gIHNpemU6IG51bWJlcjtcbn1cbmV4cG9ydCBjb25zdCBMb2FkaW5nSW5kaWNhdG9yID0gPFxuICBPcHRpb24sXG4gIElzTXVsdGkgZXh0ZW5kcyBib29sZWFuLFxuICBHcm91cCBleHRlbmRzIEdyb3VwQmFzZTxPcHRpb24+XG4+KHtcbiAgaW5uZXJQcm9wcyxcbiAgaXNSdGwsXG4gIHNpemUgPSA0LFxuICAuLi5yZXN0UHJvcHNcbn06IExvYWRpbmdJbmRpY2F0b3JQcm9wczxPcHRpb24sIElzTXVsdGksIEdyb3VwPikgPT4ge1xuICByZXR1cm4gKFxuICAgIDxkaXZcbiAgICAgIHsuLi5nZXRTdHlsZVByb3BzKFxuICAgICAgICB7IC4uLnJlc3RQcm9wcywgaW5uZXJQcm9wcywgaXNSdGwsIHNpemUgfSxcbiAgICAgICAgJ2xvYWRpbmdJbmRpY2F0b3InLFxuICAgICAgICB7XG4gICAgICAgICAgaW5kaWNhdG9yOiB0cnVlLFxuICAgICAgICAgICdsb2FkaW5nLWluZGljYXRvcic6IHRydWUsXG4gICAgICAgIH1cbiAgICAgICl9XG4gICAgICB7Li4uaW5uZXJQcm9wc31cbiAgICA+XG4gICAgICA8TG9hZGluZ0RvdCBkZWxheT17MH0gb2Zmc2V0PXtpc1J0bH0gLz5cbiAgICAgIDxMb2FkaW5nRG90IGRlbGF5PXsxNjB9IG9mZnNldCAvPlxuICAgICAgPExvYWRpbmdEb3QgZGVsYXk9ezMyMH0gb2Zmc2V0PXshaXNSdGx9IC8+XG4gICAgPC9kaXY+XG4gICk7XG59O1xuIl19 */") });
};
var li = function(e3) {
  var t2 = e3.children, n2 = e3.isDisabled, o2 = e3.isFocused, r2 = e3.innerRef, i2 = e3.innerProps, l2 = e3.menuIsOpen;
  return Xo("div", It({ ref: r2 }, Cr(e3, "control", { control: true, "control--is-disabled": n2, "control--is-focused": o2, "control--menu-is-open": l2 }), i2), t2);
};
var ai = ["data"];
var ci = function(e3) {
  var t2 = e3.children, n2 = e3.cx, o2 = e3.getStyles, r2 = e3.getClassNames, i2 = e3.Heading, l2 = e3.headingProps, a2 = e3.innerProps, c2 = e3.label, s2 = e3.theme, u2 = e3.selectProps;
  return Xo("div", It({}, Cr(e3, "group", { group: true }), a2), Xo(i2, It({}, l2, { selectProps: u2, theme: s2, getStyles: o2, getClassNames: r2, cx: n2 }), c2), Xo("div", null, t2));
};
var si = ["innerRef", "isDisabled", "isHidden", "inputClassName"];
var ui = { gridArea: "1 / 2", font: "inherit", minWidth: "2px", border: 0, margin: 0, outline: 0, padding: 0 };
var di = { flex: "1 1 auto", display: "inline-grid", gridArea: "1 / 1 / 2 / 3", gridTemplateColumns: "0 min-content", "&:after": ht({ content: 'attr(data-value) " "', visibility: "hidden", whiteSpace: "pre" }, ui) };
var gi = function(e3) {
  return ht({ label: "input", color: "inherit", background: 0, opacity: e3 ? 0 : 1, width: "100%" }, ui);
};
var pi = function(e3) {
  var t2 = e3.children, n2 = e3.innerProps;
  return Xo("div", n2, t2);
};
var fi = function(e3) {
  var t2 = e3.children, n2 = e3.components, o2 = e3.data, r2 = e3.innerProps, i2 = e3.isDisabled, l2 = e3.removeProps, a2 = e3.selectProps, c2 = n2.Container, s2 = n2.Label, u2 = n2.Remove;
  return Xo(c2, { data: o2, innerProps: ht(ht({}, Cr(e3, "multiValue", { "multi-value": true, "multi-value--is-disabled": i2 })), r2), selectProps: a2 }, Xo(s2, { data: o2, innerProps: ht({}, Cr(e3, "multiValueLabel", { "multi-value__label": true })), selectProps: a2 }, t2), Xo(u2, { data: o2, innerProps: ht(ht({}, Cr(e3, "multiValueRemove", { "multi-value__remove": true })), {}, { "aria-label": "Remove ".concat(t2 || "option") }, l2), selectProps: a2 }));
};
var hi = { ClearIndicator: function(e3) {
  var t2 = e3.children, n2 = e3.innerProps;
  return Xo("div", It({}, Cr(e3, "clearIndicator", { indicator: true, "clear-indicator": true }), n2), t2 || Xo(qr, null));
}, Control: li, DropdownIndicator: function(e3) {
  var t2 = e3.children, n2 = e3.innerProps;
  return Xo("div", It({}, Cr(e3, "dropdownIndicator", { indicator: true, "dropdown-indicator": true }), n2), t2 || Xo(ei, null));
}, DownChevron: ei, CrossIcon: qr, Group: ci, GroupHeading: function(e3) {
  var t2 = wr(e3);
  t2.data;
  var n2 = yt(t2, ai);
  return Xo("div", It({}, Cr(e3, "groupHeading", { "group-heading": true }), n2));
}, IndicatorsContainer: function(e3) {
  var t2 = e3.children, n2 = e3.innerProps;
  return Xo("div", It({}, Cr(e3, "indicatorsContainer", { indicators: true }), n2), t2);
}, IndicatorSeparator: function(e3) {
  var t2 = e3.innerProps;
  return Xo("span", It({}, t2, Cr(e3, "indicatorSeparator", { "indicator-separator": true })));
}, Input: function(e3) {
  var t2 = e3.cx, n2 = e3.value, o2 = wr(e3), r2 = o2.innerRef, i2 = o2.isDisabled, l2 = o2.isHidden, a2 = o2.inputClassName, c2 = yt(o2, si);
  return Xo("div", It({}, Cr(e3, "input", { "input-container": true }), { "data-value": n2 || "" }), Xo("input", It({ className: t2({ input: true }, a2), ref: r2, style: gi(l2), disabled: i2 }, c2)));
}, LoadingIndicator: function(e3) {
  var t2 = e3.innerProps, n2 = e3.isRtl, o2 = e3.size, r2 = void 0 === o2 ? 4 : o2, i2 = yt(e3, Ur);
  return Xo("div", It({}, Cr(ht(ht({}, i2), {}, { innerProps: t2, isRtl: n2, size: r2 }), "loadingIndicator", { indicator: true, "loading-indicator": true }), t2), Xo(ii, { delay: 0, offset: n2 }), Xo(ii, { delay: 160, offset: true }), Xo(ii, { delay: 320, offset: !n2 }));
}, Menu: Dr, MenuList: function(e3) {
  var t2 = e3.children, n2 = e3.innerProps, o2 = e3.innerRef, r2 = e3.isMulti;
  return Xo("div", It({}, Cr(e3, "menuList", { "menu-list": true, "menu-list--is-multi": r2 }), { ref: o2 }, n2), t2);
}, MenuPortal: function(e3) {
  var t2 = e3.appendTo, r2 = e3.children, i2 = e3.controlElement, l2 = e3.innerProps, a2 = e3.menuPlacement, s2 = e3.menuPosition, d2 = (0, import_react.useRef)(null), g2 = (0, import_react.useRef)(null), f2 = vt((0, import_react.useState)(Zr(a2)), 2), h2 = f2[0], m2 = f2[1], b2 = (0, import_react.useMemo)(function() {
    return { setPortalPlacement: m2 };
  }, []), v2 = vt((0, import_react.useState)(null), 2), y2 = v2[0], x2 = v2[1], I2 = (0, import_react.useCallback)(function() {
    if (i2) {
      var e4 = function(e5) {
        var t4 = e5.getBoundingClientRect();
        return { bottom: t4.bottom, height: t4.height, left: t4.left, right: t4.right, top: t4.top, width: t4.width };
      }(i2), t3 = "fixed" === s2 ? 0 : window.pageYOffset, n2 = e4[h2] + t3;
      n2 === (null == y2 ? void 0 : y2.offset) && e4.left === (null == y2 ? void 0 : y2.rect.left) && e4.width === (null == y2 ? void 0 : y2.rect.width) || x2({ offset: n2, rect: e4 });
    }
  }, [i2, s2, h2, null == y2 ? void 0 : y2.offset, null == y2 ? void 0 : y2.rect.left, null == y2 ? void 0 : y2.rect.width]);
  mr(function() {
    I2();
  }, [I2]);
  var w2 = (0, import_react.useCallback)(function() {
    "function" == typeof g2.current && (g2.current(), g2.current = null), i2 && d2.current && (g2.current = hr(i2, d2.current, I2, { elementResize: "ResizeObserver" in window }));
  }, [i2, I2]);
  mr(function() {
    w2();
  }, [w2]);
  var C2 = (0, import_react.useCallback)(function(e4) {
    d2.current = e4, w2();
  }, [w2]);
  if (!t2 && "fixed" !== s2 || !y2) return null;
  var R2 = Xo("div", It({ ref: C2 }, Cr(ht(ht({}, e3), {}, { offset: y2.offset, position: s2, rect: y2.rect }), "menuPortal", { "menu-portal": true }), l2), r2);
  return Xo(Vr.Provider, { value: b2 }, t2 ? (0, import_react_dom.createPortal)(R2, t2) : R2);
}, LoadingMessage: function(e3) {
  var t2 = e3.children, n2 = void 0 === t2 ? "Loading..." : t2, o2 = e3.innerProps, r2 = yt(e3, Xr);
  return Xo("div", It({}, Cr(ht(ht({}, r2), {}, { children: n2, innerProps: o2 }), "loadingMessage", { "menu-notice": true, "menu-notice--loading": true }), o2), n2);
}, NoOptionsMessage: function(e3) {
  var t2 = e3.children, n2 = void 0 === t2 ? "No options" : t2, o2 = e3.innerProps, r2 = yt(e3, Wr);
  return Xo("div", It({}, Cr(ht(ht({}, r2), {}, { children: n2, innerProps: o2 }), "noOptionsMessage", { "menu-notice": true, "menu-notice--no-options": true }), o2), n2);
}, MultiValue: fi, MultiValueContainer: pi, MultiValueLabel: pi, MultiValueRemove: function(e3) {
  var t2 = e3.children, n2 = e3.innerProps;
  return Xo("div", It({ role: "button" }, n2), t2 || Xo(qr, { size: 14 }));
}, Option: function(e3) {
  var t2 = e3.children, n2 = e3.isDisabled, o2 = e3.isFocused, r2 = e3.isSelected, i2 = e3.innerRef, l2 = e3.innerProps;
  return Xo("div", It({}, Cr(e3, "option", { option: true, "option--is-disabled": n2, "option--is-focused": o2, "option--is-selected": r2 }), { ref: i2, "aria-disabled": n2 }, l2), t2);
}, Placeholder: function(e3) {
  var t2 = e3.children, n2 = e3.innerProps;
  return Xo("div", It({}, Cr(e3, "placeholder", { placeholder: true }), n2), t2);
}, SelectContainer: function(e3) {
  var t2 = e3.children, n2 = e3.innerProps, o2 = e3.isDisabled, r2 = e3.isRtl;
  return Xo("div", It({}, Cr(e3, "container", { "--is-disabled": o2, "--is-rtl": r2 }), n2), t2);
}, SingleValue: function(e3) {
  var t2 = e3.children, n2 = e3.isDisabled, o2 = e3.innerProps;
  return Xo("div", It({}, Cr(e3, "singleValue", { "single-value": true, "single-value--is-disabled": n2 }), o2), t2);
}, ValueContainer: function(e3) {
  var t2 = e3.children, n2 = e3.innerProps, o2 = e3.isMulti, r2 = e3.hasValue;
  return Xo("div", It({}, Cr(e3, "valueContainer", { "value-container": true, "value-container--is-multi": o2, "value-container--has-value": r2 }), n2), t2);
} };
var mi = Number.isNaN || function(e3) {
  return "number" == typeof e3 && e3 != e3;
};
function bi(e3, t2) {
  if (e3.length !== t2.length) return false;
  for (var n2 = 0; n2 < e3.length; n2++) if (o2 = e3[n2], r2 = t2[n2], !(o2 === r2 || mi(o2) && mi(r2))) return false;
  var o2, r2;
  return true;
}
for (yi = { name: "1f43avz-a11yText-A11yText", styles: "label:a11yText;z-index:9999;border:0;clip:rect(1px, 1px, 1px, 1px);height:1px;width:1px;position:absolute;overflow:hidden;padding:0;white-space:nowrap;label:A11yText;", map: "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkExMXlUZXh0LnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFNSSIsImZpbGUiOiJBMTF5VGV4dC50c3giLCJzb3VyY2VzQ29udGVudCI6WyIvKiogQGpzeCBqc3ggKi9cbmltcG9ydCB7IGpzeCB9IGZyb20gJ0BlbW90aW9uL3JlYWN0JztcblxuLy8gQXNzaXN0aXZlIHRleHQgdG8gZGVzY3JpYmUgdmlzdWFsIGVsZW1lbnRzLiBIaWRkZW4gZm9yIHNpZ2h0ZWQgdXNlcnMuXG5jb25zdCBBMTF5VGV4dCA9IChwcm9wczogSlNYLkludHJpbnNpY0VsZW1lbnRzWydzcGFuJ10pID0+IChcbiAgPHNwYW5cbiAgICBjc3M9e3tcbiAgICAgIGxhYmVsOiAnYTExeVRleHQnLFxuICAgICAgekluZGV4OiA5OTk5LFxuICAgICAgYm9yZGVyOiAwLFxuICAgICAgY2xpcDogJ3JlY3QoMXB4LCAxcHgsIDFweCwgMXB4KScsXG4gICAgICBoZWlnaHQ6IDEsXG4gICAgICB3aWR0aDogMSxcbiAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgICAgb3ZlcmZsb3c6ICdoaWRkZW4nLFxuICAgICAgcGFkZGluZzogMCxcbiAgICAgIHdoaXRlU3BhY2U6ICdub3dyYXAnLFxuICAgIH19XG4gICAgey4uLnByb3BzfVxuICAvPlxuKTtcblxuZXhwb3J0IGRlZmF1bHQgQTExeVRleHQ7XG4iXX0= */", toString: function() {
  return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop).";
} }, xi = function(e3) {
  return Xo("span", It({ css: yi }, e3));
}, Ii = { guidance: function(e3) {
  var t2 = e3.isSearchable, n2 = e3.isMulti, o2 = e3.isDisabled, r2 = e3.tabSelectsValue;
  switch (e3.context) {
    case "menu":
      return "Use Up and Down to choose options".concat(o2 ? "" : ", press Enter to select the currently focused option", ", press Escape to exit the menu").concat(r2 ? ", press Tab to select the option and exit the menu" : "", ".");
    case "input":
      return "".concat(e3["aria-label"] || "Select", " is focused ").concat(t2 ? ",type to refine list" : "", ", press Down to open the menu, ").concat(n2 ? " press left to focus selected values" : "");
    case "value":
      return "Use left and right to toggle between focused values, press Backspace to remove the currently focused value";
    default:
      return "";
  }
}, onChange: function(e3) {
  var t2 = e3.action, n2 = e3.label, o2 = void 0 === n2 ? "" : n2, r2 = e3.labels, i2 = e3.isDisabled;
  switch (t2) {
    case "deselect-option":
    case "pop-value":
    case "remove-value":
      return "option ".concat(o2, ", deselected.");
    case "clear":
      return "All selected options have been cleared.";
    case "initial-input-focus":
      return "option".concat(r2.length > 1 ? "s" : "", " ").concat(r2.join(","), ", selected.");
    case "select-option":
      return "option ".concat(o2, i2 ? " is disabled. Select another option." : ", selected.");
    default:
      return "";
  }
}, onFocus: function(e3) {
  var t2 = e3.context, n2 = e3.focused, o2 = e3.options, r2 = e3.label, i2 = void 0 === r2 ? "" : r2, l2 = e3.selectValue, a2 = e3.isDisabled, c2 = e3.isSelected, s2 = function(e4, t3) {
    return e4 && e4.length ? "".concat(e4.indexOf(t3) + 1, " of ").concat(e4.length) : "";
  };
  if ("value" === t2 && l2) return "value ".concat(i2, " focused, ").concat(s2(l2, n2), ".");
  if ("menu" === t2) {
    var u2 = a2 ? " disabled" : "", d2 = "".concat(c2 ? "selected" : "focused").concat(u2);
    return "option ".concat(i2, " ").concat(d2, ", ").concat(s2(o2, n2), ".");
  }
  return "";
}, onFilter: function(e3) {
  var t2 = e3.inputValue, n2 = e3.resultsMessage;
  return "".concat(n2).concat(t2 ? " for search term " + t2 : "", ".");
} }, wi = function(e3) {
  var t2 = e3.ariaSelection, n2 = e3.focusedOption, o2 = e3.focusedValue, r2 = e3.focusableOptions, i2 = e3.isFocused, l2 = e3.selectValue, a2 = e3.selectProps, c2 = e3.id, s2 = a2.ariaLiveMessages, d2 = a2.getOptionLabel, p2 = a2.inputValue, f2 = a2.isMulti, h2 = a2.isOptionDisabled, m2 = a2.isSearchable, b2 = a2.menuIsOpen, v2 = a2.options, y2 = a2.screenReaderStatus, x2 = a2.tabSelectsValue, I2 = a2["aria-label"], w2 = a2["aria-live"], C2 = (0, import_react.useMemo)(function() {
    return ht(ht({}, Ii), s2 || {});
  }, [s2]), R2 = (0, import_react.useMemo)(function() {
    var e4, n3 = "";
    if (t2 && C2.onChange) {
      var o3 = t2.option, r3 = t2.options, i3 = t2.removedValue, a3 = t2.removedValues, c3 = t2.value, s3 = i3 || o3 || (e4 = c3, Array.isArray(e4) ? null : e4), u2 = s3 ? d2(s3) : "", g2 = r3 || a3 || void 0, p3 = g2 ? g2.map(d2) : [], f3 = ht({ isDisabled: s3 && h2(s3, l2), label: u2, labels: p3 }, t2);
      n3 = C2.onChange(f3);
    }
    return n3;
  }, [t2, C2, h2, l2, d2]), A2 = (0, import_react.useMemo)(function() {
    var e4 = "", t3 = n2 || o2, i3 = !!(n2 && l2 && l2.includes(n2));
    if (t3 && C2.onFocus) {
      var a3 = { focused: t3, label: d2(t3), isDisabled: h2(t3, l2), isSelected: i3, options: r2, context: t3 === n2 ? "menu" : "value", selectValue: l2 };
      e4 = C2.onFocus(a3);
    }
    return e4;
  }, [n2, o2, d2, h2, C2, r2, l2]), E2 = (0, import_react.useMemo)(function() {
    var e4 = "";
    if (b2 && v2.length && C2.onFilter) {
      var t3 = y2({ count: r2.length });
      e4 = C2.onFilter({ inputValue: p2, resultsMessage: t3 });
    }
    return e4;
  }, [r2, p2, b2, C2, v2, y2]), M2 = (0, import_react.useMemo)(function() {
    var e4 = "";
    if (C2.guidance) {
      var t3 = o2 ? "value" : b2 ? "menu" : "input";
      e4 = C2.guidance({ "aria-label": I2, context: t3, isDisabled: n2 && h2(n2, l2), isMulti: f2, isSearchable: m2, tabSelectsValue: x2 });
    }
    return e4;
  }, [I2, n2, o2, f2, h2, m2, b2, C2, l2, x2]), G2 = "".concat(A2, " ").concat(E2, " ").concat(M2), N2 = Xo(import_react.Fragment, null, Xo("span", { id: "aria-selection" }, R2), Xo("span", { id: "aria-context" }, G2)), k2 = "initial-input-focus" === (null == t2 ? void 0 : t2.action);
  return Xo(import_react.Fragment, null, Xo(xi, { id: c2 }, k2 && N2), Xo(xi, { "aria-live": w2, "aria-atomic": "false", "aria-relevant": "additions text" }, i2 && !k2 && N2));
}, Ci = [{ base: "A", letters: "AⒶＡÀÁÂẦẤẪẨÃĀĂẰẮẴẲȦǠÄǞẢÅǺǍȀȂẠẬẶḀĄȺⱯ" }, { base: "AA", letters: "Ꜳ" }, { base: "AE", letters: "ÆǼǢ" }, { base: "AO", letters: "Ꜵ" }, { base: "AU", letters: "Ꜷ" }, { base: "AV", letters: "ꜸꜺ" }, { base: "AY", letters: "Ꜽ" }, { base: "B", letters: "BⒷＢḂḄḆɃƂƁ" }, { base: "C", letters: "CⒸＣĆĈĊČÇḈƇȻꜾ" }, { base: "D", letters: "DⒹＤḊĎḌḐḒḎĐƋƊƉꝹ" }, { base: "DZ", letters: "ǱǄ" }, { base: "Dz", letters: "ǲǅ" }, { base: "E", letters: "EⒺＥÈÉÊỀẾỄỂẼĒḔḖĔĖËẺĚȄȆẸỆȨḜĘḘḚƐƎ" }, { base: "F", letters: "FⒻＦḞƑꝻ" }, { base: "G", letters: "GⒼＧǴĜḠĞĠǦĢǤƓꞠꝽꝾ" }, { base: "H", letters: "HⒽＨĤḢḦȞḤḨḪĦⱧⱵꞍ" }, { base: "I", letters: "IⒾＩÌÍÎĨĪĬİÏḮỈǏȈȊỊĮḬƗ" }, { base: "J", letters: "JⒿＪĴɈ" }, { base: "K", letters: "KⓀＫḰǨḲĶḴƘⱩꝀꝂꝄꞢ" }, { base: "L", letters: "LⓁＬĿĹĽḶḸĻḼḺŁȽⱢⱠꝈꝆꞀ" }, { base: "LJ", letters: "Ǉ" }, { base: "Lj", letters: "ǈ" }, { base: "M", letters: "MⓂＭḾṀṂⱮƜ" }, { base: "N", letters: "NⓃＮǸŃÑṄŇṆŅṊṈȠƝꞐꞤ" }, { base: "NJ", letters: "Ǌ" }, { base: "Nj", letters: "ǋ" }, { base: "O", letters: "OⓄＯÒÓÔỒỐỖỔÕṌȬṎŌṐṒŎȮȰÖȪỎŐǑȌȎƠỜỚỠỞỢỌỘǪǬØǾƆƟꝊꝌ" }, { base: "OI", letters: "Ƣ" }, { base: "OO", letters: "Ꝏ" }, { base: "OU", letters: "Ȣ" }, { base: "P", letters: "PⓅＰṔṖƤⱣꝐꝒꝔ" }, { base: "Q", letters: "QⓆＱꝖꝘɊ" }, { base: "R", letters: "RⓇＲŔṘŘȐȒṚṜŖṞɌⱤꝚꞦꞂ" }, { base: "S", letters: "SⓈＳẞŚṤŜṠŠṦṢṨȘŞⱾꞨꞄ" }, { base: "T", letters: "TⓉＴṪŤṬȚŢṰṮŦƬƮȾꞆ" }, { base: "TZ", letters: "Ꜩ" }, { base: "U", letters: "UⓊＵÙÚÛŨṸŪṺŬÜǛǗǕǙỦŮŰǓȔȖƯỪỨỮỬỰỤṲŲṶṴɄ" }, { base: "V", letters: "VⓋＶṼṾƲꝞɅ" }, { base: "VY", letters: "Ꝡ" }, { base: "W", letters: "WⓌＷẀẂŴẆẄẈⱲ" }, { base: "X", letters: "XⓍＸẊẌ" }, { base: "Y", letters: "YⓎＹỲÝŶỸȲẎŸỶỴƳɎỾ" }, { base: "Z", letters: "ZⓏＺŹẐŻŽẒẔƵȤⱿⱫꝢ" }, { base: "a", letters: "aⓐａẚàáâầấẫẩãāăằắẵẳȧǡäǟảåǻǎȁȃạậặḁąⱥɐ" }, { base: "aa", letters: "ꜳ" }, { base: "ae", letters: "æǽǣ" }, { base: "ao", letters: "ꜵ" }, { base: "au", letters: "ꜷ" }, { base: "av", letters: "ꜹꜻ" }, { base: "ay", letters: "ꜽ" }, { base: "b", letters: "bⓑｂḃḅḇƀƃɓ" }, { base: "c", letters: "cⓒｃćĉċčçḉƈȼꜿↄ" }, { base: "d", letters: "dⓓｄḋďḍḑḓḏđƌɖɗꝺ" }, { base: "dz", letters: "ǳǆ" }, { base: "e", letters: "eⓔｅèéêềếễểẽēḕḗĕėëẻěȅȇẹệȩḝęḙḛɇɛǝ" }, { base: "f", letters: "fⓕｆḟƒꝼ" }, { base: "g", letters: "gⓖｇǵĝḡğġǧģǥɠꞡᵹꝿ" }, { base: "h", letters: "hⓗｈĥḣḧȟḥḩḫẖħⱨⱶɥ" }, { base: "hv", letters: "ƕ" }, { base: "i", letters: "iⓘｉìíîĩīĭïḯỉǐȉȋịįḭɨı" }, { base: "j", letters: "jⓙｊĵǰɉ" }, { base: "k", letters: "kⓚｋḱǩḳķḵƙⱪꝁꝃꝅꞣ" }, { base: "l", letters: "lⓛｌŀĺľḷḹļḽḻſłƚɫⱡꝉꞁꝇ" }, { base: "lj", letters: "ǉ" }, { base: "m", letters: "mⓜｍḿṁṃɱɯ" }, { base: "n", letters: "nⓝｎǹńñṅňṇņṋṉƞɲŉꞑꞥ" }, { base: "nj", letters: "ǌ" }, { base: "o", letters: "oⓞｏòóôồốỗổõṍȭṏōṑṓŏȯȱöȫỏőǒȍȏơờớỡởợọộǫǭøǿɔꝋꝍɵ" }, { base: "oi", letters: "ƣ" }, { base: "ou", letters: "ȣ" }, { base: "oo", letters: "ꝏ" }, { base: "p", letters: "pⓟｐṕṗƥᵽꝑꝓꝕ" }, { base: "q", letters: "qⓠｑɋꝗꝙ" }, { base: "r", letters: "rⓡｒŕṙřȑȓṛṝŗṟɍɽꝛꞧꞃ" }, { base: "s", letters: "sⓢｓßśṥŝṡšṧṣṩșşȿꞩꞅẛ" }, { base: "t", letters: "tⓣｔṫẗťṭțţṱṯŧƭʈⱦꞇ" }, { base: "tz", letters: "ꜩ" }, { base: "u", letters: "uⓤｕùúûũṹūṻŭüǜǘǖǚủůűǔȕȗưừứữửựụṳųṷṵʉ" }, { base: "v", letters: "vⓥｖṽṿʋꝟʌ" }, { base: "vy", letters: "ꝡ" }, { base: "w", letters: "wⓦｗẁẃŵẇẅẘẉⱳ" }, { base: "x", letters: "xⓧｘẋẍ" }, { base: "y", letters: "yⓨｙỳýŷỹȳẏÿỷẙỵƴɏỿ" }, { base: "z", letters: "zⓩｚźẑżžẓẕƶȥɀⱬꝣ" }], Ri = new RegExp("[" + Ci.map(function(e3) {
  return e3.letters;
}).join("") + "]", "g"), Ai = {}, Ei = 0; Ei < Ci.length; Ei++) for (Mi = Ci[Ei], Gi = 0; Gi < Mi.letters.length; Gi++) Ai[Mi.letters[Gi]] = Mi.base;
var Mi;
var Gi;
var yi;
var xi;
var Ii;
var wi;
var Ci;
var Ri;
var Ai;
var Ei;
var Ni = function(e3) {
  return e3.replace(Ri, function(e4) {
    return Ai[e4];
  });
};
var ki = function(e3, t2) {
  void 0 === t2 && (t2 = bi);
  var n2 = null;
  function o2() {
    for (var o3 = [], r2 = 0; r2 < arguments.length; r2++) o3[r2] = arguments[r2];
    if (n2 && n2.lastThis === this && t2(o3, n2.lastArgs)) return n2.lastResult;
    var i2 = e3.apply(this, o3);
    return n2 = { lastResult: i2, lastArgs: o3, lastThis: this }, i2;
  }
  return o2.clear = function() {
    n2 = null;
  }, o2;
}(Ni);
var Ti = function(e3) {
  return e3.replace(/^\s+|\s+$/g, "");
};
var Si = function(e3) {
  return "".concat(e3.label, " ").concat(e3.value);
};
var Bi = ["innerRef"];
function Li(e3) {
  var t2 = e3.innerRef, n2 = function(e4) {
    for (var t3 = arguments.length, n3 = new Array(t3 > 1 ? t3 - 1 : 0), o2 = 1; o2 < t3; o2++) n3[o2 - 1] = arguments[o2];
    var r2 = Object.entries(e4).filter(function(e5) {
      var t4 = vt(e5, 1)[0];
      return !n3.includes(t4);
    });
    return r2.reduce(function(e5, t4) {
      var n4 = vt(t4, 2), o3 = n4[0], r3 = n4[1];
      return e5[o3] = r3, e5;
    }, {});
  }(yt(e3, Bi), "onExited", "in", "enter", "exit", "appear");
  return Xo("input", It({ ref: t2 }, n2, { css: Zo({ label: "dummyInput", background: 0, border: 0, caretColor: "transparent", fontSize: "inherit", gridArea: "1 / 1 / 2 / 3", outline: 0, padding: 0, width: 1, color: "transparent", left: -100, opacity: 0, position: "relative", transform: "scale(.01)" }, ";label:DummyInput;", "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkR1bW15SW5wdXQudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQXlCTSIsImZpbGUiOiJEdW1teUlucHV0LnRzeCIsInNvdXJjZXNDb250ZW50IjpbIi8qKiBAanN4IGpzeCAqL1xuaW1wb3J0IHsgUmVmIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsganN4IH0gZnJvbSAnQGVtb3Rpb24vcmVhY3QnO1xuaW1wb3J0IHsgcmVtb3ZlUHJvcHMgfSBmcm9tICcuLi91dGlscyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIER1bW15SW5wdXQoe1xuICBpbm5lclJlZixcbiAgLi4ucHJvcHNcbn06IEpTWC5JbnRyaW5zaWNFbGVtZW50c1snaW5wdXQnXSAmIHtcbiAgcmVhZG9ubHkgaW5uZXJSZWY6IFJlZjxIVE1MSW5wdXRFbGVtZW50Pjtcbn0pIHtcbiAgLy8gUmVtb3ZlIGFuaW1hdGlvbiBwcm9wcyBub3QgbWVhbnQgZm9yIEhUTUwgZWxlbWVudHNcbiAgY29uc3QgZmlsdGVyZWRQcm9wcyA9IHJlbW92ZVByb3BzKFxuICAgIHByb3BzLFxuICAgICdvbkV4aXRlZCcsXG4gICAgJ2luJyxcbiAgICAnZW50ZXInLFxuICAgICdleGl0JyxcbiAgICAnYXBwZWFyJ1xuICApO1xuXG4gIHJldHVybiAoXG4gICAgPGlucHV0XG4gICAgICByZWY9e2lubmVyUmVmfVxuICAgICAgey4uLmZpbHRlcmVkUHJvcHN9XG4gICAgICBjc3M9e3tcbiAgICAgICAgbGFiZWw6ICdkdW1teUlucHV0JyxcbiAgICAgICAgLy8gZ2V0IHJpZCBvZiBhbnkgZGVmYXVsdCBzdHlsZXNcbiAgICAgICAgYmFja2dyb3VuZDogMCxcbiAgICAgICAgYm9yZGVyOiAwLFxuICAgICAgICAvLyBpbXBvcnRhbnQhIHRoaXMgaGlkZXMgdGhlIGZsYXNoaW5nIGN1cnNvclxuICAgICAgICBjYXJldENvbG9yOiAndHJhbnNwYXJlbnQnLFxuICAgICAgICBmb250U2l6ZTogJ2luaGVyaXQnLFxuICAgICAgICBncmlkQXJlYTogJzEgLyAxIC8gMiAvIDMnLFxuICAgICAgICBvdXRsaW5lOiAwLFxuICAgICAgICBwYWRkaW5nOiAwLFxuICAgICAgICAvLyBpbXBvcnRhbnQhIHdpdGhvdXQgYHdpZHRoYCBicm93c2VycyB3b24ndCBhbGxvdyBmb2N1c1xuICAgICAgICB3aWR0aDogMSxcblxuICAgICAgICAvLyByZW1vdmUgY3Vyc29yIG9uIGRlc2t0b3BcbiAgICAgICAgY29sb3I6ICd0cmFuc3BhcmVudCcsXG5cbiAgICAgICAgLy8gcmVtb3ZlIGN1cnNvciBvbiBtb2JpbGUgd2hpbHN0IG1haW50YWluaW5nIFwic2Nyb2xsIGludG8gdmlld1wiIGJlaGF2aW91clxuICAgICAgICBsZWZ0OiAtMTAwLFxuICAgICAgICBvcGFjaXR5OiAwLFxuICAgICAgICBwb3NpdGlvbjogJ3JlbGF0aXZlJyxcbiAgICAgICAgdHJhbnNmb3JtOiAnc2NhbGUoLjAxKScsXG4gICAgICB9fVxuICAgIC8+XG4gICk7XG59XG4iXX0= */") }));
}
var Pi = function(e3) {
  e3.preventDefault(), e3.stopPropagation();
};
var Wi = ["boxSizing", "height", "overflow", "paddingRight", "position"];
var Xi = { boxSizing: "border-box", overflow: "hidden", position: "relative", height: "100%" };
function Hi(e3) {
  e3.preventDefault();
}
function Fi(e3) {
  e3.stopPropagation();
}
function Zi() {
  var e3 = this.scrollTop, t2 = this.scrollHeight, n2 = e3 + this.offsetHeight;
  0 === e3 ? this.scrollTop = 1 : n2 === t2 && (this.scrollTop = e3 - 1);
}
function Vi() {
  return "ontouchstart" in window || navigator.maxTouchPoints;
}
var Oi = !("undefined" == typeof window || !window.document || !window.document.createElement);
var Di = 0;
var Yi = { capture: false, passive: false };
var zi = function() {
  return document.activeElement && document.activeElement.blur();
};
var Ji = { name: "bp8cua-ScrollManager", styles: "position:fixed;left:0;bottom:0;right:0;top:0;label:ScrollManager;", map: "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlNjcm9sbE1hbmFnZXIudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQStDVSIsImZpbGUiOiJTY3JvbGxNYW5hZ2VyLnRzeCIsInNvdXJjZXNDb250ZW50IjpbIi8qKiBAanN4IGpzeCAqL1xuaW1wb3J0IHsganN4IH0gZnJvbSAnQGVtb3Rpb24vcmVhY3QnO1xuaW1wb3J0IHsgRnJhZ21lbnQsIFJlYWN0RWxlbWVudCwgUmVmQ2FsbGJhY2sgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgdXNlU2Nyb2xsQ2FwdHVyZSBmcm9tICcuL3VzZVNjcm9sbENhcHR1cmUnO1xuaW1wb3J0IHVzZVNjcm9sbExvY2sgZnJvbSAnLi91c2VTY3JvbGxMb2NrJztcblxuaW50ZXJmYWNlIFByb3BzIHtcbiAgcmVhZG9ubHkgY2hpbGRyZW46IChyZWY6IFJlZkNhbGxiYWNrPEhUTUxFbGVtZW50PikgPT4gUmVhY3RFbGVtZW50O1xuICByZWFkb25seSBsb2NrRW5hYmxlZDogYm9vbGVhbjtcbiAgcmVhZG9ubHkgY2FwdHVyZUVuYWJsZWQ6IGJvb2xlYW47XG4gIHJlYWRvbmx5IG9uQm90dG9tQXJyaXZlPzogKGV2ZW50OiBXaGVlbEV2ZW50IHwgVG91Y2hFdmVudCkgPT4gdm9pZDtcbiAgcmVhZG9ubHkgb25Cb3R0b21MZWF2ZT86IChldmVudDogV2hlZWxFdmVudCB8IFRvdWNoRXZlbnQpID0+IHZvaWQ7XG4gIHJlYWRvbmx5IG9uVG9wQXJyaXZlPzogKGV2ZW50OiBXaGVlbEV2ZW50IHwgVG91Y2hFdmVudCkgPT4gdm9pZDtcbiAgcmVhZG9ubHkgb25Ub3BMZWF2ZT86IChldmVudDogV2hlZWxFdmVudCB8IFRvdWNoRXZlbnQpID0+IHZvaWQ7XG59XG5cbmNvbnN0IGJsdXJTZWxlY3RJbnB1dCA9ICgpID0+XG4gIGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgJiYgKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgYXMgSFRNTEVsZW1lbnQpLmJsdXIoKTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gU2Nyb2xsTWFuYWdlcih7XG4gIGNoaWxkcmVuLFxuICBsb2NrRW5hYmxlZCxcbiAgY2FwdHVyZUVuYWJsZWQgPSB0cnVlLFxuICBvbkJvdHRvbUFycml2ZSxcbiAgb25Cb3R0b21MZWF2ZSxcbiAgb25Ub3BBcnJpdmUsXG4gIG9uVG9wTGVhdmUsXG59OiBQcm9wcykge1xuICBjb25zdCBzZXRTY3JvbGxDYXB0dXJlVGFyZ2V0ID0gdXNlU2Nyb2xsQ2FwdHVyZSh7XG4gICAgaXNFbmFibGVkOiBjYXB0dXJlRW5hYmxlZCxcbiAgICBvbkJvdHRvbUFycml2ZSxcbiAgICBvbkJvdHRvbUxlYXZlLFxuICAgIG9uVG9wQXJyaXZlLFxuICAgIG9uVG9wTGVhdmUsXG4gIH0pO1xuICBjb25zdCBzZXRTY3JvbGxMb2NrVGFyZ2V0ID0gdXNlU2Nyb2xsTG9jayh7IGlzRW5hYmxlZDogbG9ja0VuYWJsZWQgfSk7XG5cbiAgY29uc3QgdGFyZ2V0UmVmOiBSZWZDYWxsYmFjazxIVE1MRWxlbWVudD4gPSAoZWxlbWVudCkgPT4ge1xuICAgIHNldFNjcm9sbENhcHR1cmVUYXJnZXQoZWxlbWVudCk7XG4gICAgc2V0U2Nyb2xsTG9ja1RhcmdldChlbGVtZW50KTtcbiAgfTtcblxuICByZXR1cm4gKFxuICAgIDxGcmFnbWVudD5cbiAgICAgIHtsb2NrRW5hYmxlZCAmJiAoXG4gICAgICAgIDxkaXZcbiAgICAgICAgICBvbkNsaWNrPXtibHVyU2VsZWN0SW5wdXR9XG4gICAgICAgICAgY3NzPXt7IHBvc2l0aW9uOiAnZml4ZWQnLCBsZWZ0OiAwLCBib3R0b206IDAsIHJpZ2h0OiAwLCB0b3A6IDAgfX1cbiAgICAgICAgLz5cbiAgICAgICl9XG4gICAgICB7Y2hpbGRyZW4odGFyZ2V0UmVmKX1cbiAgICA8L0ZyYWdtZW50PlxuICApO1xufVxuIl19 */", toString: function() {
  return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop).";
} };
function ji(e3) {
  var t2 = e3.children, n2 = e3.lockEnabled, r2 = e3.captureEnabled, i2 = function(e4) {
    var t3 = e4.isEnabled, n3 = e4.onBottomArrive, r3 = e4.onBottomLeave, i3 = e4.onTopArrive, l3 = e4.onTopLeave, s2 = (0, import_react.useRef)(false), u2 = (0, import_react.useRef)(false), d2 = (0, import_react.useRef)(0), g2 = (0, import_react.useRef)(null), p2 = (0, import_react.useCallback)(function(e5, t4) {
      if (null !== g2.current) {
        var o2 = g2.current, a2 = o2.scrollTop, c2 = o2.scrollHeight, d3 = o2.clientHeight, p3 = g2.current, f3 = t4 > 0, h3 = c2 - d3 - a2, m3 = false;
        h3 > t4 && s2.current && (r3 && r3(e5), s2.current = false), f3 && u2.current && (l3 && l3(e5), u2.current = false), f3 && t4 > h3 ? (n3 && !s2.current && n3(e5), p3.scrollTop = c2, m3 = true, s2.current = true) : !f3 && -t4 > a2 && (i3 && !u2.current && i3(e5), p3.scrollTop = 0, m3 = true, u2.current = true), m3 && Pi(e5);
      }
    }, [n3, r3, i3, l3]), f2 = (0, import_react.useCallback)(function(e5) {
      p2(e5, e5.deltaY);
    }, [p2]), h2 = (0, import_react.useCallback)(function(e5) {
      d2.current = e5.changedTouches[0].clientY;
    }, []), m2 = (0, import_react.useCallback)(function(e5) {
      var t4 = d2.current - e5.changedTouches[0].clientY;
      p2(e5, t4);
    }, [p2]), b2 = (0, import_react.useCallback)(function(e5) {
      if (e5) {
        var t4 = !!Br && { passive: false };
        e5.addEventListener("wheel", f2, t4), e5.addEventListener("touchstart", h2, t4), e5.addEventListener("touchmove", m2, t4);
      }
    }, [m2, h2, f2]), v2 = (0, import_react.useCallback)(function(e5) {
      e5 && (e5.removeEventListener("wheel", f2, false), e5.removeEventListener("touchstart", h2, false), e5.removeEventListener("touchmove", m2, false));
    }, [m2, h2, f2]);
    return (0, import_react.useEffect)(function() {
      if (t3) {
        var e5 = g2.current;
        return b2(e5), function() {
          v2(e5);
        };
      }
    }, [t3, b2, v2]), function(e5) {
      g2.current = e5;
    };
  }({ isEnabled: void 0 === r2 || r2, onBottomArrive: e3.onBottomArrive, onBottomLeave: e3.onBottomLeave, onTopArrive: e3.onTopArrive, onTopLeave: e3.onTopLeave }), l2 = function(e4) {
    var t3 = e4.isEnabled, n3 = e4.accountForScrollbars, r3 = void 0 === n3 || n3, i3 = (0, import_react.useRef)({}), l3 = (0, import_react.useRef)(null), s2 = (0, import_react.useCallback)(function(e5) {
      if (Oi) {
        var t4 = document.body, n4 = t4 && t4.style;
        if (r3 && Wi.forEach(function(e6) {
          var t5 = n4 && n4[e6];
          i3.current[e6] = t5;
        }), r3 && Di < 1) {
          var o2 = parseInt(i3.current.paddingRight, 10) || 0, l4 = document.body ? document.body.clientWidth : 0, a2 = window.innerWidth - l4 + o2 || 0;
          Object.keys(Xi).forEach(function(e6) {
            var t5 = Xi[e6];
            n4 && (n4[e6] = t5);
          }), n4 && (n4.paddingRight = "".concat(a2, "px"));
        }
        t4 && Vi() && (t4.addEventListener("touchmove", Hi, Yi), e5 && (e5.addEventListener("touchstart", Zi, Yi), e5.addEventListener("touchmove", Fi, Yi))), Di += 1;
      }
    }, [r3]), u2 = (0, import_react.useCallback)(function(e5) {
      if (Oi) {
        var t4 = document.body, n4 = t4 && t4.style;
        Di = Math.max(Di - 1, 0), r3 && Di < 1 && Wi.forEach(function(e6) {
          var t5 = i3.current[e6];
          n4 && (n4[e6] = t5);
        }), t4 && Vi() && (t4.removeEventListener("touchmove", Hi, Yi), e5 && (e5.removeEventListener("touchstart", Zi, Yi), e5.removeEventListener("touchmove", Fi, Yi)));
      }
    }, [r3]);
    return (0, import_react.useEffect)(function() {
      if (t3) {
        var e5 = l3.current;
        return s2(e5), function() {
          u2(e5);
        };
      }
    }, [t3, s2, u2]), function(e5) {
      l3.current = e5;
    };
  }({ isEnabled: n2 });
  return Xo(import_react.Fragment, null, n2 && Xo("div", { onClick: zi, css: Ji }), t2(function(e4) {
    i2(e4), l2(e4);
  }));
}
var Ui;
var _i = { name: "5kkxb2-requiredInput-RequiredInput", styles: "label:requiredInput;opacity:0;pointer-events:none;position:absolute;bottom:0;left:0;right:0;width:100%;label:RequiredInput;", map: "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlJlcXVpcmVkSW5wdXQudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQWNJIiwiZmlsZSI6IlJlcXVpcmVkSW5wdXQudHN4Iiwic291cmNlc0NvbnRlbnQiOlsiLyoqIEBqc3gganN4ICovXG5pbXBvcnQgeyBGb2N1c0V2ZW50SGFuZGxlciwgRnVuY3Rpb25Db21wb25lbnQgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBqc3ggfSBmcm9tICdAZW1vdGlvbi9yZWFjdCc7XG5cbmNvbnN0IFJlcXVpcmVkSW5wdXQ6IEZ1bmN0aW9uQ29tcG9uZW50PHtcbiAgcmVhZG9ubHkgbmFtZT86IHN0cmluZztcbiAgcmVhZG9ubHkgb25Gb2N1czogRm9jdXNFdmVudEhhbmRsZXI8SFRNTElucHV0RWxlbWVudD47XG59PiA9ICh7IG5hbWUsIG9uRm9jdXMgfSkgPT4gKFxuICA8aW5wdXRcbiAgICByZXF1aXJlZFxuICAgIG5hbWU9e25hbWV9XG4gICAgdGFiSW5kZXg9ey0xfVxuICAgIGFyaWEtaGlkZGVuPVwidHJ1ZVwiXG4gICAgb25Gb2N1cz17b25Gb2N1c31cbiAgICBjc3M9e3tcbiAgICAgIGxhYmVsOiAncmVxdWlyZWRJbnB1dCcsXG4gICAgICBvcGFjaXR5OiAwLFxuICAgICAgcG9pbnRlckV2ZW50czogJ25vbmUnLFxuICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICBib3R0b206IDAsXG4gICAgICBsZWZ0OiAwLFxuICAgICAgcmlnaHQ6IDAsXG4gICAgICB3aWR0aDogJzEwMCUnLFxuICAgIH19XG4gICAgLy8gUHJldmVudCBgU3dpdGNoaW5nIGZyb20gdW5jb250cm9sbGVkIHRvIGNvbnRyb2xsZWRgIGVycm9yXG4gICAgdmFsdWU9XCJcIlxuICAgIG9uQ2hhbmdlPXsoKSA9PiB7fX1cbiAgLz5cbik7XG5cbmV4cG9ydCBkZWZhdWx0IFJlcXVpcmVkSW5wdXQ7XG4iXX0= */", toString: function() {
  return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop).";
} };
var Qi = function(e3) {
  var t2 = e3.name, n2 = e3.onFocus;
  return Xo("input", { required: true, name: t2, tabIndex: -1, "aria-hidden": "true", onFocus: n2, css: _i, value: "", onChange: function() {
  } });
};
var Ki = { clearIndicator: oi, container: function(e3) {
  var t2 = e3.isDisabled;
  return { label: "container", direction: e3.isRtl ? "rtl" : void 0, pointerEvents: t2 ? "none" : void 0, position: "relative" };
}, control: function(e3, t2) {
  var n2 = e3.isDisabled, o2 = e3.isFocused, r2 = e3.theme, i2 = r2.colors, l2 = r2.borderRadius;
  return ht({ label: "control", alignItems: "center", cursor: "default", display: "flex", flexWrap: "wrap", justifyContent: "space-between", minHeight: r2.spacing.controlHeight, outline: "0 !important", position: "relative", transition: "all 100ms" }, t2 ? {} : { backgroundColor: n2 ? i2.neutral5 : i2.neutral0, borderColor: n2 ? i2.neutral10 : o2 ? i2.primary : i2.neutral20, borderRadius: l2, borderStyle: "solid", borderWidth: 1, boxShadow: o2 ? "0 0 0 1px ".concat(i2.primary) : void 0, "&:hover": { borderColor: o2 ? i2.primary : i2.neutral30 } });
}, dropdownIndicator: ni, group: function(e3, t2) {
  var n2 = e3.theme.spacing;
  return t2 ? {} : { paddingBottom: 2 * n2.baseUnit, paddingTop: 2 * n2.baseUnit };
}, groupHeading: function(e3, t2) {
  var n2 = e3.theme, o2 = n2.colors, r2 = n2.spacing;
  return ht({ label: "group", cursor: "default", display: "block" }, t2 ? {} : { color: o2.neutral40, fontSize: "75%", fontWeight: 500, marginBottom: "0.25em", paddingLeft: 3 * r2.baseUnit, paddingRight: 3 * r2.baseUnit, textTransform: "uppercase" });
}, indicatorsContainer: function() {
  return { alignItems: "center", alignSelf: "stretch", display: "flex", flexShrink: 0 };
}, indicatorSeparator: function(e3, t2) {
  var n2 = e3.isDisabled, o2 = e3.theme, r2 = o2.spacing.baseUnit, i2 = o2.colors;
  return ht({ label: "indicatorSeparator", alignSelf: "stretch", width: 1 }, t2 ? {} : { backgroundColor: n2 ? i2.neutral10 : i2.neutral20, marginBottom: 2 * r2, marginTop: 2 * r2 });
}, input: function(e3, t2) {
  var n2 = e3.isDisabled, o2 = e3.value, r2 = e3.theme, i2 = r2.spacing, l2 = r2.colors;
  return ht(ht({ visibility: n2 ? "hidden" : "visible", transform: o2 ? "translateZ(0)" : "" }, di), t2 ? {} : { margin: i2.baseUnit / 2, paddingBottom: i2.baseUnit / 2, paddingTop: i2.baseUnit / 2, color: l2.neutral80 });
}, loadingIndicator: function(e3, t2) {
  var n2 = e3.isFocused, o2 = e3.size, r2 = e3.theme, i2 = r2.colors, l2 = r2.spacing.baseUnit;
  return ht({ label: "loadingIndicator", display: "flex", transition: "color 150ms", alignSelf: "center", fontSize: o2, lineHeight: 1, marginRight: o2, textAlign: "center", verticalAlign: "middle" }, t2 ? {} : { color: n2 ? i2.neutral60 : i2.neutral20, padding: 2 * l2 });
}, loadingMessage: Jr, menu: function(e3, t2) {
  var n2, o2 = e3.placement, r2 = e3.theme, i2 = r2.borderRadius, l2 = r2.spacing, a2 = r2.colors;
  return ht((pt(n2 = { label: "menu" }, function(e4) {
    return e4 ? { bottom: "top", top: "bottom" }[e4] : "bottom";
  }(o2), "100%"), pt(n2, "position", "absolute"), pt(n2, "width", "100%"), pt(n2, "zIndex", 1), n2), t2 ? {} : { backgroundColor: a2.neutral0, borderRadius: i2, boxShadow: "0 0 0 1px hsla(0, 0%, 0%, 0.1), 0 4px 11px hsla(0, 0%, 0%, 0.1)", marginBottom: l2.menuGutter, marginTop: l2.menuGutter });
}, menuList: function(e3, t2) {
  var n2 = e3.maxHeight, o2 = e3.theme.spacing.baseUnit;
  return ht({ maxHeight: n2, overflowY: "auto", position: "relative", WebkitOverflowScrolling: "touch" }, t2 ? {} : { paddingBottom: o2, paddingTop: o2 });
}, menuPortal: function(e3) {
  var t2 = e3.rect, n2 = e3.offset, o2 = e3.position;
  return { left: t2.left, position: o2, top: n2, width: t2.width, zIndex: 1 };
}, multiValue: function(e3, t2) {
  var n2 = e3.theme, o2 = n2.spacing, r2 = n2.borderRadius, i2 = n2.colors;
  return ht({ label: "multiValue", display: "flex", minWidth: 0 }, t2 ? {} : { backgroundColor: i2.neutral10, borderRadius: r2 / 2, margin: o2.baseUnit / 2 });
}, multiValueLabel: function(e3, t2) {
  var n2 = e3.theme, o2 = n2.borderRadius, r2 = n2.colors, i2 = e3.cropWithEllipsis;
  return ht({ overflow: "hidden", textOverflow: i2 || void 0 === i2 ? "ellipsis" : void 0, whiteSpace: "nowrap" }, t2 ? {} : { borderRadius: o2 / 2, color: r2.neutral80, fontSize: "85%", padding: 3, paddingLeft: 6 });
}, multiValueRemove: function(e3, t2) {
  var n2 = e3.theme, o2 = n2.spacing, r2 = n2.borderRadius, i2 = n2.colors, l2 = e3.isFocused;
  return ht({ alignItems: "center", display: "flex" }, t2 ? {} : { borderRadius: r2 / 2, backgroundColor: l2 ? i2.dangerLight : void 0, paddingLeft: o2.baseUnit, paddingRight: o2.baseUnit, ":hover": { backgroundColor: i2.dangerLight, color: i2.danger } });
}, noOptionsMessage: zr, option: function(e3, t2) {
  var n2 = e3.isDisabled, o2 = e3.isFocused, r2 = e3.isSelected, i2 = e3.theme, l2 = i2.spacing, a2 = i2.colors;
  return ht({ label: "option", cursor: "default", display: "block", fontSize: "inherit", width: "100%", userSelect: "none", WebkitTapHighlightColor: "rgba(0, 0, 0, 0)" }, t2 ? {} : { backgroundColor: r2 ? a2.primary : o2 ? a2.primary25 : "transparent", color: n2 ? a2.neutral20 : r2 ? a2.neutral0 : "inherit", padding: "".concat(2 * l2.baseUnit, "px ").concat(3 * l2.baseUnit, "px"), ":active": { backgroundColor: n2 ? void 0 : r2 ? a2.primary : a2.primary50 } });
}, placeholder: function(e3, t2) {
  var n2 = e3.theme, o2 = n2.spacing, r2 = n2.colors;
  return ht({ label: "placeholder", gridArea: "1 / 1 / 2 / 3" }, t2 ? {} : { color: r2.neutral50, marginLeft: o2.baseUnit / 2, marginRight: o2.baseUnit / 2 });
}, singleValue: function(e3, t2) {
  var n2 = e3.isDisabled, o2 = e3.theme, r2 = o2.spacing, i2 = o2.colors;
  return ht({ label: "singleValue", gridArea: "1 / 1 / 2 / 3", maxWidth: "100%", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }, t2 ? {} : { color: n2 ? i2.neutral40 : i2.neutral80, marginLeft: r2.baseUnit / 2, marginRight: r2.baseUnit / 2 });
}, valueContainer: function(e3, t2) {
  var n2 = e3.theme.spacing, o2 = e3.isMulti, r2 = e3.hasValue, i2 = e3.selectProps.controlShouldRenderValue;
  return ht({ alignItems: "center", display: o2 && r2 && i2 ? "flex" : "grid", flex: 1, flexWrap: "wrap", WebkitOverflowScrolling: "touch", position: "relative", overflow: "hidden" }, t2 ? {} : { padding: "".concat(n2.baseUnit / 2, "px ").concat(2 * n2.baseUnit, "px") });
} };
var $i = { borderRadius: 4, colors: { primary: "#2684FF", primary75: "#4C9AFF", primary50: "#B2D4FF", primary25: "#DEEBFF", danger: "#DE350B", dangerLight: "#FFBDAD", neutral0: "hsl(0, 0%, 100%)", neutral5: "hsl(0, 0%, 95%)", neutral10: "hsl(0, 0%, 90%)", neutral20: "hsl(0, 0%, 80%)", neutral30: "hsl(0, 0%, 70%)", neutral40: "hsl(0, 0%, 60%)", neutral50: "hsl(0, 0%, 50%)", neutral60: "hsl(0, 0%, 40%)", neutral70: "hsl(0, 0%, 30%)", neutral80: "hsl(0, 0%, 20%)", neutral90: "hsl(0, 0%, 10%)" }, spacing: { baseUnit: 4, controlHeight: 38, menuGutter: 8 } };
var qi = { "aria-live": "polite", backspaceRemovesValue: true, blurInputOnSelect: Nr(), captureMenuScroll: !Nr(), classNames: {}, closeMenuOnSelect: true, closeMenuOnScroll: false, components: {}, controlShouldRenderValue: true, escapeClearsValue: false, filterOption: function(e3, t2) {
  if (e3.data.__isNew__) return true;
  var n2 = ht({ ignoreCase: true, ignoreAccents: true, stringify: Si, trim: true, matchFrom: "any" }, Ui), o2 = n2.ignoreCase, r2 = n2.ignoreAccents, i2 = n2.stringify, l2 = n2.trim, a2 = n2.matchFrom, c2 = l2 ? Ti(t2) : t2, s2 = l2 ? Ti(i2(e3)) : i2(e3);
  return o2 && (c2 = c2.toLowerCase(), s2 = s2.toLowerCase()), r2 && (c2 = ki(c2), s2 = Ni(s2)), "start" === a2 ? s2.substr(0, c2.length) === c2 : s2.indexOf(c2) > -1;
}, formatGroupLabel: function(e3) {
  return e3.label;
}, getOptionLabel: function(e3) {
  return e3.label;
}, getOptionValue: function(e3) {
  return e3.value;
}, isDisabled: false, isLoading: false, isMulti: false, isRtl: false, isSearchable: true, isOptionDisabled: function(e3) {
  return !!e3.isDisabled;
}, loadingMessage: function() {
  return "Loading...";
}, maxMenuHeight: 300, minMenuHeight: 140, menuIsOpen: false, menuPlacement: "bottom", menuPosition: "absolute", menuShouldBlockScroll: false, menuShouldScrollIntoView: !function() {
  try {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  } catch (e3) {
    return false;
  }
}(), noOptionsMessage: function() {
  return "No options";
}, openMenuOnFocus: false, openMenuOnClick: true, options: [], pageSize: 5, placeholder: "Select...", screenReaderStatus: function(e3) {
  var t2 = e3.count;
  return "".concat(t2, " result").concat(1 !== t2 ? "s" : "", " available");
}, styles: {}, tabIndex: 0, tabSelectsValue: true, unstyled: false };
function el(e3, t2, n2, o2) {
  return { type: "option", data: t2, isDisabled: ll(e3, t2, n2), isSelected: al(e3, t2, n2), label: rl(e3, t2), value: il(e3, t2), index: o2 };
}
function tl(e3, t2) {
  return e3.options.map(function(n2, o2) {
    if ("options" in n2) {
      var r2 = n2.options.map(function(n3, o3) {
        return el(e3, n3, t2, o3);
      }).filter(function(t3) {
        return ol(e3, t3);
      });
      return r2.length > 0 ? { type: "group", data: n2, options: r2, index: o2 } : void 0;
    }
    var i2 = el(e3, n2, t2, o2);
    return ol(e3, i2) ? i2 : void 0;
  }).filter(Lr);
}
function nl(e3) {
  return e3.reduce(function(e4, t2) {
    return "group" === t2.type ? e4.push.apply(e4, Mt(t2.options.map(function(e5) {
      return e5.data;
    }))) : e4.push(t2.data), e4;
  }, []);
}
function ol(e3, t2) {
  var n2 = e3.inputValue, o2 = void 0 === n2 ? "" : n2, r2 = t2.data, i2 = t2.isSelected, l2 = t2.label, a2 = t2.value;
  return (!sl(e3) || !i2) && cl(e3, { label: l2, value: a2, data: r2 }, o2);
}
var rl = function(e3, t2) {
  return e3.getOptionLabel(t2);
};
var il = function(e3, t2) {
  return e3.getOptionValue(t2);
};
function ll(e3, t2, n2) {
  return "function" == typeof e3.isOptionDisabled && e3.isOptionDisabled(t2, n2);
}
function al(e3, t2, n2) {
  if (n2.indexOf(t2) > -1) return true;
  if ("function" == typeof e3.isOptionSelected) return e3.isOptionSelected(t2, n2);
  var o2 = il(e3, t2);
  return n2.some(function(t3) {
    return il(e3, t3) === o2;
  });
}
function cl(e3, t2, n2) {
  return !e3.filterOption || e3.filterOption(t2, n2);
}
var sl = function(e3) {
  var t2 = e3.hideSelectedOptions, n2 = e3.isMulti;
  return void 0 === t2 ? n2 : t2;
};
var ul = 1;
var dl = function(t2) {
  !function(e3, t3) {
    if ("function" != typeof t3 && null !== t3) throw new TypeError("Super expression must either be null or a function");
    e3.prototype = Object.create(t3 && t3.prototype, { constructor: { value: e3, writable: true, configurable: true } }), Object.defineProperty(e3, "prototype", { writable: false }), t3 && Ct(e3, t3);
  }(l2, import_react.Component);
  var n2, o2, r2, i2 = Et(l2);
  function l2(e3) {
    var t3;
    if (function(e4, t4) {
      if (!(e4 instanceof t4)) throw new TypeError("Cannot call a class as a function");
    }(this, l2), (t3 = i2.call(this, e3)).state = { ariaSelection: null, focusedOption: null, focusedValue: null, inputIsHidden: false, isFocused: false, selectValue: [], clearFocusValueOnUpdate: false, prevWasFocused: false, inputIsHiddenAfterUpdate: void 0, prevProps: void 0 }, t3.blockOptionHover = false, t3.isComposing = false, t3.commonProps = void 0, t3.initialTouchX = 0, t3.initialTouchY = 0, t3.instancePrefix = "", t3.openAfterFocus = false, t3.scrollToFocusedOptionOnUpdate = false, t3.userIsDragging = void 0, t3.controlRef = null, t3.getControlRef = function(e4) {
      t3.controlRef = e4;
    }, t3.focusedOptionRef = null, t3.getFocusedOptionRef = function(e4) {
      t3.focusedOptionRef = e4;
    }, t3.menuListRef = null, t3.getMenuListRef = function(e4) {
      t3.menuListRef = e4;
    }, t3.inputRef = null, t3.getInputRef = function(e4) {
      t3.inputRef = e4;
    }, t3.focus = t3.focusInput, t3.blur = t3.blurInput, t3.onChange = function(e4, n4) {
      var o4 = t3.props, r3 = o4.onChange, i3 = o4.name;
      n4.name = i3, t3.ariaOnChange(e4, n4), r3(e4, n4);
    }, t3.setValue = function(e4, n4, o4) {
      var r3 = t3.props, i3 = r3.closeMenuOnSelect, l3 = r3.isMulti, a2 = r3.inputValue;
      t3.onInputChange("", { action: "set-value", prevInputValue: a2 }), i3 && (t3.setState({ inputIsHiddenAfterUpdate: !l3 }), t3.onMenuClose()), t3.setState({ clearFocusValueOnUpdate: true }), t3.onChange(e4, { action: n4, option: o4 });
    }, t3.selectOption = function(e4) {
      var n4 = t3.props, o4 = n4.blurInputOnSelect, r3 = n4.isMulti, i3 = n4.name, l3 = t3.state.selectValue, a2 = r3 && t3.isOptionSelected(e4, l3), c2 = t3.isOptionDisabled(e4, l3);
      if (a2) {
        var s2 = t3.getOptionValue(e4);
        t3.setValue(l3.filter(function(e5) {
          return t3.getOptionValue(e5) !== s2;
        }), "deselect-option", e4);
      } else {
        if (c2) return void t3.ariaOnChange(e4, { action: "select-option", option: e4, name: i3 });
        r3 ? t3.setValue([].concat(Mt(l3), [e4]), "select-option", e4) : t3.setValue(e4, "select-option");
      }
      o4 && t3.blurInput();
    }, t3.removeValue = function(e4) {
      var n4 = t3.props.isMulti, o4 = t3.state.selectValue, r3 = t3.getOptionValue(e4), i3 = o4.filter(function(e5) {
        return t3.getOptionValue(e5) !== r3;
      }), l3 = Pr(n4, i3, i3[0] || null);
      t3.onChange(l3, { action: "remove-value", removedValue: e4 }), t3.focusInput();
    }, t3.clearValue = function() {
      var e4 = t3.state.selectValue;
      t3.onChange(Pr(t3.props.isMulti, [], null), { action: "clear", removedValues: e4 });
    }, t3.popValue = function() {
      var e4 = t3.props.isMulti, n4 = t3.state.selectValue, o4 = n4[n4.length - 1], r3 = n4.slice(0, n4.length - 1), i3 = Pr(e4, r3, r3[0] || null);
      t3.onChange(i3, { action: "pop-value", removedValue: o4 });
    }, t3.getValue = function() {
      return t3.state.selectValue;
    }, t3.cx = function() {
      for (var e4 = arguments.length, n4 = new Array(e4), o4 = 0; o4 < e4; o4++) n4[o4] = arguments[o4];
      return xr.apply(void 0, [t3.props.classNamePrefix].concat(n4));
    }, t3.getOptionLabel = function(e4) {
      return rl(t3.props, e4);
    }, t3.getOptionValue = function(e4) {
      return il(t3.props, e4);
    }, t3.getStyles = function(e4, n4) {
      var o4 = t3.props.unstyled, r3 = Ki[e4](n4, o4);
      r3.boxSizing = "border-box";
      var i3 = t3.props.styles[e4];
      return i3 ? i3(r3, n4) : r3;
    }, t3.getClassNames = function(e4, n4) {
      var o4, r3;
      return null === (o4 = (r3 = t3.props.classNames)[e4]) || void 0 === o4 ? void 0 : o4.call(r3, n4);
    }, t3.getElementId = function(e4) {
      return "".concat(t3.instancePrefix, "-").concat(e4);
    }, t3.getComponents = function() {
      return e4 = t3.props, ht(ht({}, hi), e4.components);
      var e4;
    }, t3.buildCategorizedOptions = function() {
      return tl(t3.props, t3.state.selectValue);
    }, t3.getCategorizedOptions = function() {
      return t3.props.menuIsOpen ? t3.buildCategorizedOptions() : [];
    }, t3.buildFocusableOptions = function() {
      return nl(t3.buildCategorizedOptions());
    }, t3.getFocusableOptions = function() {
      return t3.props.menuIsOpen ? t3.buildFocusableOptions() : [];
    }, t3.ariaOnChange = function(e4, n4) {
      t3.setState({ ariaSelection: ht({ value: e4 }, n4) });
    }, t3.onMenuMouseDown = function(e4) {
      0 === e4.button && (e4.stopPropagation(), e4.preventDefault(), t3.focusInput());
    }, t3.onMenuMouseMove = function(e4) {
      t3.blockOptionHover = false;
    }, t3.onControlMouseDown = function(e4) {
      if (!e4.defaultPrevented) {
        var n4 = t3.props.openMenuOnClick;
        t3.state.isFocused ? t3.props.menuIsOpen ? "INPUT" !== e4.target.tagName && "TEXTAREA" !== e4.target.tagName && t3.onMenuClose() : n4 && t3.openMenu("first") : (n4 && (t3.openAfterFocus = true), t3.focusInput()), "INPUT" !== e4.target.tagName && "TEXTAREA" !== e4.target.tagName && e4.preventDefault();
      }
    }, t3.onDropdownIndicatorMouseDown = function(e4) {
      if (!(e4 && "mousedown" === e4.type && 0 !== e4.button || t3.props.isDisabled)) {
        var n4 = t3.props, o4 = n4.isMulti, r3 = n4.menuIsOpen;
        t3.focusInput(), r3 ? (t3.setState({ inputIsHiddenAfterUpdate: !o4 }), t3.onMenuClose()) : t3.openMenu("first"), e4.preventDefault();
      }
    }, t3.onClearIndicatorMouseDown = function(e4) {
      e4 && "mousedown" === e4.type && 0 !== e4.button || (t3.clearValue(), e4.preventDefault(), t3.openAfterFocus = false, "touchend" === e4.type ? t3.focusInput() : setTimeout(function() {
        return t3.focusInput();
      }));
    }, t3.onScroll = function(e4) {
      "boolean" == typeof t3.props.closeMenuOnScroll ? e4.target instanceof HTMLElement && Rr(e4.target) && t3.props.onMenuClose() : "function" == typeof t3.props.closeMenuOnScroll && t3.props.closeMenuOnScroll(e4) && t3.props.onMenuClose();
    }, t3.onCompositionStart = function() {
      t3.isComposing = true;
    }, t3.onCompositionEnd = function() {
      t3.isComposing = false;
    }, t3.onTouchStart = function(e4) {
      var n4 = e4.touches, o4 = n4 && n4.item(0);
      o4 && (t3.initialTouchX = o4.clientX, t3.initialTouchY = o4.clientY, t3.userIsDragging = false);
    }, t3.onTouchMove = function(e4) {
      var n4 = e4.touches, o4 = n4 && n4.item(0);
      if (o4) {
        var r3 = Math.abs(o4.clientX - t3.initialTouchX), i3 = Math.abs(o4.clientY - t3.initialTouchY);
        t3.userIsDragging = r3 > 5 || i3 > 5;
      }
    }, t3.onTouchEnd = function(e4) {
      t3.userIsDragging || (t3.controlRef && !t3.controlRef.contains(e4.target) && t3.menuListRef && !t3.menuListRef.contains(e4.target) && t3.blurInput(), t3.initialTouchX = 0, t3.initialTouchY = 0);
    }, t3.onControlTouchEnd = function(e4) {
      t3.userIsDragging || t3.onControlMouseDown(e4);
    }, t3.onClearIndicatorTouchEnd = function(e4) {
      t3.userIsDragging || t3.onClearIndicatorMouseDown(e4);
    }, t3.onDropdownIndicatorTouchEnd = function(e4) {
      t3.userIsDragging || t3.onDropdownIndicatorMouseDown(e4);
    }, t3.handleInputChange = function(e4) {
      var n4 = t3.props.inputValue, o4 = e4.currentTarget.value;
      t3.setState({ inputIsHiddenAfterUpdate: false }), t3.onInputChange(o4, { action: "input-change", prevInputValue: n4 }), t3.props.menuIsOpen || t3.onMenuOpen();
    }, t3.onInputFocus = function(e4) {
      t3.props.onFocus && t3.props.onFocus(e4), t3.setState({ inputIsHiddenAfterUpdate: false, isFocused: true }), (t3.openAfterFocus || t3.props.openMenuOnFocus) && t3.openMenu("first"), t3.openAfterFocus = false;
    }, t3.onInputBlur = function(e4) {
      var n4 = t3.props.inputValue;
      t3.menuListRef && t3.menuListRef.contains(document.activeElement) ? t3.inputRef.focus() : (t3.props.onBlur && t3.props.onBlur(e4), t3.onInputChange("", { action: "input-blur", prevInputValue: n4 }), t3.onMenuClose(), t3.setState({ focusedValue: null, isFocused: false }));
    }, t3.onOptionHover = function(e4) {
      t3.blockOptionHover || t3.state.focusedOption === e4 || t3.setState({ focusedOption: e4 });
    }, t3.shouldHideSelectedOptions = function() {
      return sl(t3.props);
    }, t3.onValueInputFocus = function(e4) {
      e4.preventDefault(), e4.stopPropagation(), t3.focus();
    }, t3.onKeyDown = function(e4) {
      var n4 = t3.props, o4 = n4.isMulti, r3 = n4.backspaceRemovesValue, i3 = n4.escapeClearsValue, l3 = n4.inputValue, a2 = n4.isClearable, c2 = n4.isDisabled, s2 = n4.menuIsOpen, u2 = n4.onKeyDown, d2 = n4.tabSelectsValue, g2 = n4.openMenuOnFocus, p2 = t3.state, f2 = p2.focusedOption, h2 = p2.focusedValue, m2 = p2.selectValue;
      if (!(c2 || "function" == typeof u2 && (u2(e4), e4.defaultPrevented))) {
        switch (t3.blockOptionHover = true, e4.key) {
          case "ArrowLeft":
            if (!o4 || l3) return;
            t3.focusValue("previous");
            break;
          case "ArrowRight":
            if (!o4 || l3) return;
            t3.focusValue("next");
            break;
          case "Delete":
          case "Backspace":
            if (l3) return;
            if (h2) t3.removeValue(h2);
            else {
              if (!r3) return;
              o4 ? t3.popValue() : a2 && t3.clearValue();
            }
            break;
          case "Tab":
            if (t3.isComposing) return;
            if (e4.shiftKey || !s2 || !d2 || !f2 || g2 && t3.isOptionSelected(f2, m2)) return;
            t3.selectOption(f2);
            break;
          case "Enter":
            if (229 === e4.keyCode) break;
            if (s2) {
              if (!f2) return;
              if (t3.isComposing) return;
              t3.selectOption(f2);
              break;
            }
            return;
          case "Escape":
            s2 ? (t3.setState({ inputIsHiddenAfterUpdate: false }), t3.onInputChange("", { action: "menu-close", prevInputValue: l3 }), t3.onMenuClose()) : a2 && i3 && t3.clearValue();
            break;
          case " ":
            if (l3) return;
            if (!s2) {
              t3.openMenu("first");
              break;
            }
            if (!f2) return;
            t3.selectOption(f2);
            break;
          case "ArrowUp":
            s2 ? t3.focusOption("up") : t3.openMenu("last");
            break;
          case "ArrowDown":
            s2 ? t3.focusOption("down") : t3.openMenu("first");
            break;
          case "PageUp":
            if (!s2) return;
            t3.focusOption("pageup");
            break;
          case "PageDown":
            if (!s2) return;
            t3.focusOption("pagedown");
            break;
          case "Home":
            if (!s2) return;
            t3.focusOption("first");
            break;
          case "End":
            if (!s2) return;
            t3.focusOption("last");
            break;
          default:
            return;
        }
        e4.preventDefault();
      }
    }, t3.instancePrefix = "react-select-" + (t3.props.instanceId || ++ul), t3.state.selectValue = Ir(e3.value), e3.menuIsOpen && t3.state.selectValue.length) {
      var n3 = t3.buildFocusableOptions(), o3 = n3.indexOf(t3.state.selectValue[0]);
      t3.state.focusedOption = n3[o3];
    }
    return t3;
  }
  return n2 = l2, o2 = [{ key: "componentDidMount", value: function() {
    this.startListeningComposition(), this.startListeningToTouch(), this.props.closeMenuOnScroll && document && document.addEventListener && document.addEventListener("scroll", this.onScroll, true), this.props.autoFocus && this.focusInput(), this.props.menuIsOpen && this.state.focusedOption && this.menuListRef && this.focusedOptionRef && Gr(this.menuListRef, this.focusedOptionRef);
  } }, { key: "componentDidUpdate", value: function(e3) {
    var t3 = this.props, n3 = t3.isDisabled, o3 = t3.menuIsOpen, r3 = this.state.isFocused;
    (r3 && !n3 && e3.isDisabled || r3 && o3 && !e3.menuIsOpen) && this.focusInput(), r3 && n3 && !e3.isDisabled ? this.setState({ isFocused: false }, this.onMenuClose) : r3 || n3 || !e3.isDisabled || this.inputRef !== document.activeElement || this.setState({ isFocused: true }), this.menuListRef && this.focusedOptionRef && this.scrollToFocusedOptionOnUpdate && (Gr(this.menuListRef, this.focusedOptionRef), this.scrollToFocusedOptionOnUpdate = false);
  } }, { key: "componentWillUnmount", value: function() {
    this.stopListeningComposition(), this.stopListeningToTouch(), document.removeEventListener("scroll", this.onScroll, true);
  } }, { key: "onMenuOpen", value: function() {
    this.props.onMenuOpen();
  } }, { key: "onMenuClose", value: function() {
    this.onInputChange("", { action: "menu-close", prevInputValue: this.props.inputValue }), this.props.onMenuClose();
  } }, { key: "onInputChange", value: function(e3, t3) {
    this.props.onInputChange(e3, t3);
  } }, { key: "focusInput", value: function() {
    this.inputRef && this.inputRef.focus();
  } }, { key: "blurInput", value: function() {
    this.inputRef && this.inputRef.blur();
  } }, { key: "openMenu", value: function(e3) {
    var t3 = this, n3 = this.state, o3 = n3.selectValue, r3 = n3.isFocused, i3 = this.buildFocusableOptions(), l3 = "first" === e3 ? 0 : i3.length - 1;
    if (!this.props.isMulti) {
      var a2 = i3.indexOf(o3[0]);
      a2 > -1 && (l3 = a2);
    }
    this.scrollToFocusedOptionOnUpdate = !(r3 && this.menuListRef), this.setState({ inputIsHiddenAfterUpdate: false, focusedValue: null, focusedOption: i3[l3] }, function() {
      return t3.onMenuOpen();
    });
  } }, { key: "focusValue", value: function(e3) {
    var t3 = this.state, n3 = t3.selectValue, o3 = t3.focusedValue;
    if (this.props.isMulti) {
      this.setState({ focusedOption: null });
      var r3 = n3.indexOf(o3);
      o3 || (r3 = -1);
      var i3 = n3.length - 1, l3 = -1;
      if (n3.length) {
        switch (e3) {
          case "previous":
            l3 = 0 === r3 ? 0 : -1 === r3 ? i3 : r3 - 1;
            break;
          case "next":
            r3 > -1 && r3 < i3 && (l3 = r3 + 1);
        }
        this.setState({ inputIsHidden: -1 !== l3, focusedValue: n3[l3] });
      }
    }
  } }, { key: "focusOption", value: function() {
    var e3 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "first", t3 = this.props.pageSize, n3 = this.state.focusedOption, o3 = this.getFocusableOptions();
    if (o3.length) {
      var r3 = 0, i3 = o3.indexOf(n3);
      n3 || (i3 = -1), "up" === e3 ? r3 = i3 > 0 ? i3 - 1 : o3.length - 1 : "down" === e3 ? r3 = (i3 + 1) % o3.length : "pageup" === e3 ? (r3 = i3 - t3) < 0 && (r3 = 0) : "pagedown" === e3 ? (r3 = i3 + t3) > o3.length - 1 && (r3 = o3.length - 1) : "last" === e3 && (r3 = o3.length - 1), this.scrollToFocusedOptionOnUpdate = true, this.setState({ focusedOption: o3[r3], focusedValue: null });
    }
  } }, { key: "getTheme", value: function() {
    return this.props.theme ? "function" == typeof this.props.theme ? this.props.theme($i) : ht(ht({}, $i), this.props.theme) : $i;
  } }, { key: "getCommonProps", value: function() {
    var e3 = this.clearValue, t3 = this.cx, n3 = this.getStyles, o3 = this.getClassNames, r3 = this.getValue, i3 = this.selectOption, l3 = this.setValue, a2 = this.props, c2 = a2.isMulti, s2 = a2.isRtl, u2 = a2.options;
    return { clearValue: e3, cx: t3, getStyles: n3, getClassNames: o3, getValue: r3, hasValue: this.hasValue(), isMulti: c2, isRtl: s2, options: u2, selectOption: i3, selectProps: a2, setValue: l3, theme: this.getTheme() };
  } }, { key: "hasValue", value: function() {
    return this.state.selectValue.length > 0;
  } }, { key: "hasOptions", value: function() {
    return !!this.getFocusableOptions().length;
  } }, { key: "isClearable", value: function() {
    var e3 = this.props, t3 = e3.isClearable, n3 = e3.isMulti;
    return void 0 === t3 ? n3 : t3;
  } }, { key: "isOptionDisabled", value: function(e3, t3) {
    return ll(this.props, e3, t3);
  } }, { key: "isOptionSelected", value: function(e3, t3) {
    return al(this.props, e3, t3);
  } }, { key: "filterOption", value: function(e3, t3) {
    return cl(this.props, e3, t3);
  } }, { key: "formatOptionLabel", value: function(e3, t3) {
    if ("function" == typeof this.props.formatOptionLabel) {
      var n3 = this.props.inputValue, o3 = this.state.selectValue;
      return this.props.formatOptionLabel(e3, { context: t3, inputValue: n3, selectValue: o3 });
    }
    return this.getOptionLabel(e3);
  } }, { key: "formatGroupLabel", value: function(e3) {
    return this.props.formatGroupLabel(e3);
  } }, { key: "startListeningComposition", value: function() {
    document && document.addEventListener && (document.addEventListener("compositionstart", this.onCompositionStart, false), document.addEventListener("compositionend", this.onCompositionEnd, false));
  } }, { key: "stopListeningComposition", value: function() {
    document && document.removeEventListener && (document.removeEventListener("compositionstart", this.onCompositionStart), document.removeEventListener("compositionend", this.onCompositionEnd));
  } }, { key: "startListeningToTouch", value: function() {
    document && document.addEventListener && (document.addEventListener("touchstart", this.onTouchStart, false), document.addEventListener("touchmove", this.onTouchMove, false), document.addEventListener("touchend", this.onTouchEnd, false));
  } }, { key: "stopListeningToTouch", value: function() {
    document && document.removeEventListener && (document.removeEventListener("touchstart", this.onTouchStart), document.removeEventListener("touchmove", this.onTouchMove), document.removeEventListener("touchend", this.onTouchEnd));
  } }, { key: "renderInput", value: function() {
    var t3 = this.props, n3 = t3.isDisabled, o3 = t3.isSearchable, r3 = t3.inputId, i3 = t3.inputValue, l3 = t3.tabIndex, a2 = t3.form, c2 = t3.menuIsOpen, s2 = t3.required, u2 = this.getComponents().Input, d2 = this.state, g2 = d2.inputIsHidden, p2 = d2.ariaSelection, f2 = this.commonProps, h2 = r3 || this.getElementId("input"), m2 = ht(ht(ht({ "aria-autocomplete": "list", "aria-expanded": c2, "aria-haspopup": true, "aria-errormessage": this.props["aria-errormessage"], "aria-invalid": this.props["aria-invalid"], "aria-label": this.props["aria-label"], "aria-labelledby": this.props["aria-labelledby"], "aria-required": s2, role: "combobox" }, c2 && { "aria-controls": this.getElementId("listbox"), "aria-owns": this.getElementId("listbox") }), !o3 && { "aria-readonly": true }), this.hasValue() ? "initial-input-focus" === (null == p2 ? void 0 : p2.action) && { "aria-describedby": this.getElementId("live-region") } : { "aria-describedby": this.getElementId("placeholder") });
    return o3 ? e.createElement(u2, It({}, f2, { autoCapitalize: "none", autoComplete: "off", autoCorrect: "off", id: h2, innerRef: this.getInputRef, isDisabled: n3, isHidden: g2, onBlur: this.onInputBlur, onChange: this.handleInputChange, onFocus: this.onInputFocus, spellCheck: "false", tabIndex: l3, form: a2, type: "text", value: i3 }, m2)) : e.createElement(Li, It({ id: h2, innerRef: this.getInputRef, onBlur: this.onInputBlur, onChange: vr, onFocus: this.onInputFocus, disabled: n3, tabIndex: l3, inputMode: "none", form: a2, value: "" }, m2));
  } }, { key: "renderPlaceholderOrValue", value: function() {
    var t3 = this, n3 = this.getComponents(), o3 = n3.MultiValue, r3 = n3.MultiValueContainer, i3 = n3.MultiValueLabel, l3 = n3.MultiValueRemove, a2 = n3.SingleValue, c2 = n3.Placeholder, s2 = this.commonProps, u2 = this.props, d2 = u2.controlShouldRenderValue, g2 = u2.isDisabled, p2 = u2.isMulti, f2 = u2.inputValue, h2 = u2.placeholder, m2 = this.state, b2 = m2.selectValue, v2 = m2.focusedValue, y2 = m2.isFocused;
    if (!this.hasValue() || !d2) return f2 ? null : e.createElement(c2, It({}, s2, { key: "placeholder", isDisabled: g2, isFocused: y2, innerProps: { id: this.getElementId("placeholder") } }), h2);
    if (p2) return b2.map(function(n4, a3) {
      var c3 = n4 === v2, u3 = "".concat(t3.getOptionLabel(n4), "-").concat(t3.getOptionValue(n4));
      return e.createElement(o3, It({}, s2, { components: { Container: r3, Label: i3, Remove: l3 }, isFocused: c3, isDisabled: g2, key: u3, index: a3, removeProps: { onClick: function() {
        return t3.removeValue(n4);
      }, onTouchEnd: function() {
        return t3.removeValue(n4);
      }, onMouseDown: function(e3) {
        e3.preventDefault();
      } }, data: n4 }), t3.formatOptionLabel(n4, "value"));
    });
    if (f2) return null;
    var x2 = b2[0];
    return e.createElement(a2, It({}, s2, { data: x2, isDisabled: g2 }), this.formatOptionLabel(x2, "value"));
  } }, { key: "renderClearIndicator", value: function() {
    var t3 = this.getComponents().ClearIndicator, n3 = this.commonProps, o3 = this.props, r3 = o3.isDisabled, i3 = o3.isLoading, l3 = this.state.isFocused;
    if (!this.isClearable() || !t3 || r3 || !this.hasValue() || i3) return null;
    var a2 = { onMouseDown: this.onClearIndicatorMouseDown, onTouchEnd: this.onClearIndicatorTouchEnd, "aria-hidden": "true" };
    return e.createElement(t3, It({}, n3, { innerProps: a2, isFocused: l3 }));
  } }, { key: "renderLoadingIndicator", value: function() {
    var t3 = this.getComponents().LoadingIndicator, n3 = this.commonProps, o3 = this.props, r3 = o3.isDisabled, i3 = o3.isLoading, l3 = this.state.isFocused;
    return t3 && i3 ? e.createElement(t3, It({}, n3, { innerProps: { "aria-hidden": "true" }, isDisabled: r3, isFocused: l3 })) : null;
  } }, { key: "renderIndicatorSeparator", value: function() {
    var t3 = this.getComponents(), n3 = t3.DropdownIndicator, o3 = t3.IndicatorSeparator;
    if (!n3 || !o3) return null;
    var r3 = this.commonProps, i3 = this.props.isDisabled, l3 = this.state.isFocused;
    return e.createElement(o3, It({}, r3, { isDisabled: i3, isFocused: l3 }));
  } }, { key: "renderDropdownIndicator", value: function() {
    var t3 = this.getComponents().DropdownIndicator;
    if (!t3) return null;
    var n3 = this.commonProps, o3 = this.props.isDisabled, r3 = this.state.isFocused, i3 = { onMouseDown: this.onDropdownIndicatorMouseDown, onTouchEnd: this.onDropdownIndicatorTouchEnd, "aria-hidden": "true" };
    return e.createElement(t3, It({}, n3, { innerProps: i3, isDisabled: o3, isFocused: r3 }));
  } }, { key: "renderMenu", value: function() {
    var t3 = this, n3 = this.getComponents(), o3 = n3.Group, r3 = n3.GroupHeading, i3 = n3.Menu, l3 = n3.MenuList, a2 = n3.MenuPortal, c2 = n3.LoadingMessage, s2 = n3.NoOptionsMessage, u2 = n3.Option, d2 = this.commonProps, g2 = this.state.focusedOption, p2 = this.props, f2 = p2.captureMenuScroll, h2 = p2.inputValue, m2 = p2.isLoading, b2 = p2.loadingMessage, v2 = p2.minMenuHeight, y2 = p2.maxMenuHeight, x2 = p2.menuIsOpen, I2 = p2.menuPlacement, w2 = p2.menuPosition, C2 = p2.menuPortalTarget, R2 = p2.menuShouldBlockScroll, A2 = p2.menuShouldScrollIntoView, E2 = p2.noOptionsMessage, M2 = p2.onMenuScrollToTop, G2 = p2.onMenuScrollToBottom;
    if (!x2) return null;
    var N2, k2 = function(n4, o4) {
      var r4 = n4.type, i4 = n4.data, l4 = n4.isDisabled, a3 = n4.isSelected, c3 = n4.label, s3 = n4.value, p3 = g2 === i4, f3 = l4 ? void 0 : function() {
        return t3.onOptionHover(i4);
      }, h3 = l4 ? void 0 : function() {
        return t3.selectOption(i4);
      }, m3 = "".concat(t3.getElementId("option"), "-").concat(o4), b3 = { id: m3, onClick: h3, onMouseMove: f3, onMouseOver: f3, tabIndex: -1 };
      return e.createElement(u2, It({}, d2, { innerProps: b3, data: i4, isDisabled: l4, isSelected: a3, key: m3, label: c3, type: r4, value: s3, isFocused: p3, innerRef: p3 ? t3.getFocusedOptionRef : void 0 }), t3.formatOptionLabel(n4.data, "menu"));
    };
    if (this.hasOptions()) N2 = this.getCategorizedOptions().map(function(n4) {
      if ("group" === n4.type) {
        var i4 = n4.data, l4 = n4.options, a3 = n4.index, c3 = "".concat(t3.getElementId("group"), "-").concat(a3), s3 = "".concat(c3, "-heading");
        return e.createElement(o3, It({}, d2, { key: c3, data: i4, options: l4, Heading: r3, headingProps: { id: s3, data: n4.data }, label: t3.formatGroupLabel(n4.data) }), n4.options.map(function(e3) {
          return k2(e3, "".concat(a3, "-").concat(e3.index));
        }));
      }
      if ("option" === n4.type) return k2(n4, "".concat(n4.index));
    });
    else if (m2) {
      var T2 = b2({ inputValue: h2 });
      if (null === T2) return null;
      N2 = e.createElement(c2, d2, T2);
    } else {
      var S2 = E2({ inputValue: h2 });
      if (null === S2) return null;
      N2 = e.createElement(s2, d2, S2);
    }
    var B2 = { minMenuHeight: v2, maxMenuHeight: y2, menuPlacement: I2, menuPosition: w2, menuShouldScrollIntoView: A2 }, L2 = e.createElement(Or, It({}, d2, B2), function(n4) {
      var o4 = n4.ref, r4 = n4.placerProps, a3 = r4.placement, c3 = r4.maxHeight;
      return e.createElement(i3, It({}, d2, B2, { innerRef: o4, innerProps: { onMouseDown: t3.onMenuMouseDown, onMouseMove: t3.onMenuMouseMove, id: t3.getElementId("listbox") }, isLoading: m2, placement: a3 }), e.createElement(ji, { captureEnabled: f2, onTopArrive: M2, onBottomArrive: G2, lockEnabled: R2 }, function(n5) {
        return e.createElement(l3, It({}, d2, { innerRef: function(e3) {
          t3.getMenuListRef(e3), n5(e3);
        }, isLoading: m2, maxHeight: c3, focusedOption: g2 }), N2);
      }));
    });
    return C2 || "fixed" === w2 ? e.createElement(a2, It({}, d2, { appendTo: C2, controlElement: this.controlRef, menuPlacement: I2, menuPosition: w2 }), L2) : L2;
  } }, { key: "renderFormField", value: function() {
    var t3 = this, n3 = this.props, o3 = n3.delimiter, r3 = n3.isDisabled, i3 = n3.isMulti, l3 = n3.name, a2 = n3.required, c2 = this.state.selectValue;
    if (a2 && !this.hasValue() && !r3) return e.createElement(Qi, { name: l3, onFocus: this.onValueInputFocus });
    if (l3 && !r3) {
      if (i3) {
        if (o3) {
          var s2 = c2.map(function(e3) {
            return t3.getOptionValue(e3);
          }).join(o3);
          return e.createElement("input", { name: l3, type: "hidden", value: s2 });
        }
        var u2 = c2.length > 0 ? c2.map(function(n4, o4) {
          return e.createElement("input", { key: "i-".concat(o4), name: l3, type: "hidden", value: t3.getOptionValue(n4) });
        }) : e.createElement("input", { name: l3, type: "hidden", value: "" });
        return e.createElement("div", null, u2);
      }
      var d2 = c2[0] ? this.getOptionValue(c2[0]) : "";
      return e.createElement("input", { name: l3, type: "hidden", value: d2 });
    }
  } }, { key: "renderLiveRegion", value: function() {
    var t3 = this.commonProps, n3 = this.state, o3 = n3.ariaSelection, r3 = n3.focusedOption, i3 = n3.focusedValue, l3 = n3.isFocused, a2 = n3.selectValue, c2 = this.getFocusableOptions();
    return e.createElement(wi, It({}, t3, { id: this.getElementId("live-region"), ariaSelection: o3, focusedOption: r3, focusedValue: i3, isFocused: l3, selectValue: a2, focusableOptions: c2 }));
  } }, { key: "render", value: function() {
    var t3 = this.getComponents(), n3 = t3.Control, o3 = t3.IndicatorsContainer, r3 = t3.SelectContainer, i3 = t3.ValueContainer, l3 = this.props, a2 = l3.className, c2 = l3.id, s2 = l3.isDisabled, u2 = l3.menuIsOpen, d2 = this.state.isFocused, g2 = this.commonProps = this.getCommonProps();
    return e.createElement(r3, It({}, g2, { className: a2, innerProps: { id: c2, onKeyDown: this.onKeyDown }, isDisabled: s2, isFocused: d2 }), this.renderLiveRegion(), e.createElement(n3, It({}, g2, { innerRef: this.getControlRef, innerProps: { onMouseDown: this.onControlMouseDown, onTouchEnd: this.onControlTouchEnd }, isDisabled: s2, isFocused: d2, menuIsOpen: u2 }), e.createElement(i3, It({}, g2, { isDisabled: s2 }), this.renderPlaceholderOrValue(), this.renderInput()), e.createElement(o3, It({}, g2, { isDisabled: s2 }), this.renderClearIndicator(), this.renderLoadingIndicator(), this.renderIndicatorSeparator(), this.renderDropdownIndicator())), this.renderMenu(), this.renderFormField());
  } }], r2 = [{ key: "getDerivedStateFromProps", value: function(e3, t3) {
    var n3 = t3.prevProps, o3 = t3.clearFocusValueOnUpdate, r3 = t3.inputIsHiddenAfterUpdate, i3 = t3.ariaSelection, l3 = t3.isFocused, a2 = t3.prevWasFocused, c2 = e3.options, s2 = e3.value, u2 = e3.menuIsOpen, d2 = e3.inputValue, g2 = e3.isMulti, p2 = Ir(s2), f2 = {};
    if (n3 && (s2 !== n3.value || c2 !== n3.options || u2 !== n3.menuIsOpen || d2 !== n3.inputValue)) {
      var h2 = u2 ? function(e4, t4) {
        return nl(tl(e4, t4));
      }(e3, p2) : [], m2 = o3 ? function(e4, t4) {
        var n4 = e4.focusedValue, o4 = e4.selectValue.indexOf(n4);
        if (o4 > -1) {
          if (t4.indexOf(n4) > -1) return n4;
          if (o4 < t4.length) return t4[o4];
        }
        return null;
      }(t3, p2) : null, b2 = function(e4, t4) {
        var n4 = e4.focusedOption;
        return n4 && t4.indexOf(n4) > -1 ? n4 : t4[0];
      }(t3, h2);
      f2 = { selectValue: p2, focusedOption: b2, focusedValue: m2, clearFocusValueOnUpdate: false };
    }
    var v2 = null != r3 && e3 !== n3 ? { inputIsHidden: r3, inputIsHiddenAfterUpdate: void 0 } : {}, y2 = i3, x2 = l3 && a2;
    return l3 && !x2 && (y2 = { value: Pr(g2, p2, p2[0] || null), options: p2, action: "initial-input-focus" }, x2 = !a2), "initial-input-focus" === (null == i3 ? void 0 : i3.action) && (y2 = null), ht(ht(ht({}, f2), v2), {}, { prevProps: e3, ariaSelection: y2, prevWasFocused: x2 });
  } }], o2 && wt(n2.prototype, o2), r2 && wt(n2, r2), Object.defineProperty(n2, "prototype", { writable: false }), l2;
}();
dl.defaultProps = qi;
var gl = (0, import_react.forwardRef)(function(t2, r2) {
  var i2 = function(e3) {
    var t3 = e3.defaultInputValue, r3 = void 0 === t3 ? "" : t3, i3 = e3.defaultMenuIsOpen, l2 = void 0 !== i3 && i3, a2 = e3.defaultValue, c2 = void 0 === a2 ? null : a2, s2 = e3.inputValue, u2 = e3.menuIsOpen, d2 = e3.onChange, g2 = e3.onInputChange, p2 = e3.onMenuClose, f2 = e3.onMenuOpen, h2 = e3.value, m2 = yt(e3, xt), b2 = vt((0, import_react.useState)(void 0 !== s2 ? s2 : r3), 2), v2 = b2[0], y2 = b2[1], x2 = vt((0, import_react.useState)(void 0 !== u2 ? u2 : l2), 2), I2 = x2[0], w2 = x2[1], C2 = vt((0, import_react.useState)(void 0 !== h2 ? h2 : c2), 2), R2 = C2[0], A2 = C2[1], E2 = (0, import_react.useCallback)(function(e4, t4) {
      "function" == typeof d2 && d2(e4, t4), A2(e4);
    }, [d2]), M2 = (0, import_react.useCallback)(function(e4, t4) {
      var n2;
      "function" == typeof g2 && (n2 = g2(e4, t4)), y2(void 0 !== n2 ? n2 : e4);
    }, [g2]), G2 = (0, import_react.useCallback)(function() {
      "function" == typeof f2 && f2(), w2(true);
    }, [f2]), N2 = (0, import_react.useCallback)(function() {
      "function" == typeof p2 && p2(), w2(false);
    }, [p2]), k2 = void 0 !== s2 ? s2 : v2, T2 = void 0 !== u2 ? u2 : I2, S2 = void 0 !== h2 ? h2 : R2;
    return ht(ht({}, m2), {}, { inputValue: k2, menuIsOpen: T2, onChange: E2, onInputChange: M2, onMenuClose: N2, onMenuOpen: G2, value: S2 });
  }(t2);
  return e.createElement(dl, It({ ref: r2 }, i2));
});
var pl = gl;
var fl = function() {
  function t2() {
  }
  return t2.prototype.getCompatibleCell = function(e3) {
    var t3;
    try {
      t3 = He(e3, "selectedValue", "string");
    } catch (e4) {
      t3 = void 0;
    }
    var n2, o2, r2 = He(e3, "values", "object"), i2 = t3 ? parseFloat(t3) : NaN, l2 = true;
    try {
      l2 = He(e3, "isDisabled", "boolean");
    } catch (e4) {
      l2 = false;
    }
    try {
      n2 = He(e3, "inputValue", "string");
    } catch (e4) {
      n2 = void 0;
    }
    try {
      o2 = He(e3, "isOpen", "boolean");
    } catch (e4) {
      o2 = false;
    }
    var a2 = t3 || "";
    return C(C({}, e3), { selectedValue: t3, text: a2, value: i2, values: r2, isDisabled: l2, isOpen: o2, inputValue: n2 });
  }, t2.prototype.update = function(e3, t3) {
    var n2 = e3.values.some(function(e4) {
      return e4.value === t3.text;
    }) ? t3.text : void 0;
    return this.getCompatibleCell(C(C({}, e3), { selectedValue: n2, isOpen: t3.isOpen, inputValue: t3.inputValue }));
  }, t2.prototype.getClassName = function(e3, t3) {
    var n2 = e3.isOpen ? "open" : "closed";
    return "".concat(e3.className ? e3.className : "").concat(n2);
  }, t2.prototype.handleKeyDown = function(e3, t3, n2, o2, r2, i2, l2) {
    if ((t3 === B.SPACE || t3 === B.ENTER) && !o2) return { cell: this.getCompatibleCell(C(C({}, e3), { isOpen: !e3.isOpen })), enableEditMode: false };
    var a2 = tt(i2, o2, l2);
    return n2 || r2 || !Ze(t3) || o2 && t3 === B.SPACE ? { cell: e3, enableEditMode: false } : { cell: this.getCompatibleCell(C(C({}, e3), { inputValue: a2, isOpen: !e3.isOpen })), enableEditMode: false };
  }, t2.prototype.handleCompositionEnd = function(e3, t3) {
    return { cell: C(C({}, e3), { inputValue: t3, isOpen: !e3.isOpen }), enableEditMode: false };
  }, t2.prototype.render = function(t3, n2, o2) {
    var r2 = this;
    return e.createElement(hl, { onCellChanged: function(e3) {
      return o2(r2.getCompatibleCell(e3), true);
    }, cell: t3 });
  }, t2;
}();
var hl = function(t2) {
  var n2 = t2.onCellChanged, o2 = t2.cell, r2 = e.useRef(null), i2 = e.useState(o2.inputValue), l2 = i2[0], a2 = i2[1], c2 = e.useMemo(function() {
    return o2.values.find(function(e3) {
      return e3.value === o2.text;
    });
  }, [o2.text, o2.values]);
  return e.useEffect(function() {
    o2.isOpen && r2.current && (r2.current.focus(), a2(o2.inputValue));
  }, [o2.isOpen, o2.inputValue]), e.createElement("div", { style: { width: "100%" }, onPointerDown: function(e3) {
    return n2(C(C({}, o2), { isOpen: true }));
  } }, e.createElement(pl, C({}, o2.inputValue && { inputValue: l2, defaultInputValue: l2, onInputChange: function(e3) {
    return a2(e3);
  } }, { isSearchable: true, ref: r2 }, void 0 !== o2.isOpen && { menuIsOpen: o2.isOpen }, { onMenuClose: function() {
    return n2(C(C({}, o2), { isOpen: !o2.isOpen, inputValue: void 0 }));
  }, onMenuOpen: function() {
    return n2(C(C({}, o2), { isOpen: true }));
  }, onChange: function(e3) {
    return n2(C(C({}, o2), { selectedValue: e3.value, isOpen: false, inputValue: void 0 }));
  }, blurInputOnSelect: true, defaultValue: c2, value: void 0 !== c2 ? c2 : null, isDisabled: o2.isDisabled, options: o2.values, onKeyDown: function(e3) {
    if (e3.stopPropagation(), "Escape" === e3.key) return r2.current.blur(), n2(C(C({}, o2), { isOpen: false, inputValue: void 0 }));
  }, components: { Option: ml, Menu: bl }, styles: { container: function(e3) {
    var t3;
    return C(C(C({}, e3), { width: "100%", height: "100%" }), null === (t3 = o2.styles) || void 0 === t3 ? void 0 : t3.container);
  }, control: function(e3) {
    var t3;
    return C(C(C({}, e3), { border: "none", borderColor: "transparent", minHeight: "25px", background: "transparent", boxShadow: "none" }), null === (t3 = o2.styles) || void 0 === t3 ? void 0 : t3.control);
  }, indicatorsContainer: function(e3) {
    var t3;
    return C(C(C({}, e3), { paddingTop: "0px" }), null === (t3 = o2.styles) || void 0 === t3 ? void 0 : t3.indicatorsContainer);
  }, dropdownIndicator: function(e3) {
    var t3;
    return C(C(C({}, e3), { padding: "0px 4px" }), null === (t3 = o2.styles) || void 0 === t3 ? void 0 : t3.dropdownIndicator);
  }, singleValue: function(e3) {
    var t3;
    return C(C(C({}, e3), { color: "inherit" }), null === (t3 = o2.styles) || void 0 === t3 ? void 0 : t3.singleValue);
  }, indicatorSeparator: function(e3) {
    var t3;
    return C(C(C({}, e3), { marginTop: "4px", marginBottom: "4px" }), null === (t3 = o2.styles) || void 0 === t3 ? void 0 : t3.indicatorSeparator);
  }, input: function(e3) {
    var t3;
    return C(C(C({}, e3), { padding: 0 }), null === (t3 = o2.styles) || void 0 === t3 ? void 0 : t3.input);
  }, valueContainer: function(e3) {
    var t3;
    return C(C(C({}, e3), { padding: "0 8px" }), null === (t3 = o2.styles) || void 0 === t3 ? void 0 : t3.valueContainer);
  } } })));
};
var ml = function(t2) {
  var n2 = t2.innerProps, o2 = t2.label, r2 = t2.isSelected, i2 = t2.isFocused, l2 = t2.isDisabled;
  return e.createElement("div", C({}, n2, { onPointerDown: function(e3) {
    return e3.stopPropagation();
  }, className: "rg-dropdown-option".concat(r2 ? " selected" : "").concat(i2 ? " focused" : "").concat(l2 ? " disabled" : "") }), o2);
};
var bl = function(t2) {
  var n2 = t2.innerProps, o2 = t2.children;
  return e.createElement("div", C({}, n2, { className: "rg-dropdown-menu", onPointerDown: function(e3) {
    return e3.stopPropagation();
  } }), o2);
};
var vl = { text: new st(), number: new ct(), header: new it(), checkbox: new Fe(), date: new nt(), email: new ot(), time: new ut(), chevron: new rt(), dropdown: new fl() };
var yl = function(e3) {
  var t2 = [], n2 = 0;
  return e3.forEach(function(o2, r2) {
    if (e3[r2 - 1]) {
      var i2 = e3[r2 - 1];
      o2.idx - i2.idx == 1 ? t2[n2] ? t2[n2].push(o2) : t2.push([i2, o2]) : (t2.push([o2]), n2 += 1);
    } else t2.push([o2]);
  }), t2;
};
var xl = function(e3) {
  var t2 = [], n2 = 0;
  return e3.forEach(function(o2, r2) {
    if (e3[r2 - 1]) {
      var i2 = e3[r2 - 1];
      o2.idx - i2.idx == 1 ? t2[n2] ? t2[n2].push(o2) : t2.push([i2, o2]) : (t2.push([o2]), n2 += 1);
    } else t2.push([o2]);
  }), t2;
};
function Il(e3, t2) {
  var n2 = Al(e3);
  Ml(e3, t2) && (t2 = n2(t2)(Pl)), t2 = n2(t2)(Gl), t2 = n2(t2)(Sl), t2 = n2(t2)(Bl);
  var o2 = El(e3, t2);
  return t2 = n2(t2)(Pe), t2 = n2(t2)(Ll), o2 && (t2 = n2(t2)(Nl)), t2 = n2(t2)(wl), t2 = n2(t2)(kl), o2 && (t2 = n2(t2)(Tl)), t2 = n2(t2)(Wl), Rl(e3, t2) && (t2 = n2(t2)(Xl)), t2 = n2(t2)(Cl);
}
function wl(e3, t2) {
  return t2 = "row" === t2.selectionMode && t2.selectedIds.length > 0 ? function(e4) {
    var t3 = e4.cellMatrix.first.column, n2 = e4.cellMatrix.last.column, o2 = e4.cellMatrix.rows.filter(function(t4) {
      return e4.selectedIds.includes(t4.rowId);
    }).sort(function(e5, t4) {
      return e5.idx - t4.idx;
    }), r2 = yl(o2).map(function(o3) {
      return e4.cellMatrix.getRange(M(o3[0], t3), M(o3[o3.length - 1], n2));
    }), i2 = e4.selectedRanges.length - 1;
    return e4.focusedLocation && r2.forEach(function(t4, n3) {
      t4.rows.forEach(function(t5) {
        var o3;
        (null === (o3 = e4.focusedLocation) || void 0 === o3 ? void 0 : o3.row.rowId) === t5.rowId && (i2 = n3);
      });
    }), C(C({}, e4), { selectionMode: "row", activeSelectedRangeIdx: i2, selectedRanges: E([], r2, true), selectedIndexes: o2.map(function(e5) {
      return e5.idx;
    }), selectedIds: o2.map(function(e5) {
      return e5.rowId;
    }) });
  }(t2) : "column" === t2.selectionMode && t2.selectedIds.length > 0 ? function(e4) {
    var t3 = e4.cellMatrix.first.row, n2 = e4.cellMatrix.last.row, o2 = e4.cellMatrix.columns.filter(function(t4) {
      return e4.selectedIds.includes(t4.columnId);
    }).sort(function(e5, t4) {
      return e5.idx - t4.idx;
    }), r2 = xl(o2).map(function(o3) {
      return e4.cellMatrix.getRange(M(t3, o3[0]), M(n2, o3[o3.length - 1]));
    }), i2 = e4.selectedRanges.length - 1;
    return e4.focusedLocation && r2.forEach(function(t4, n3) {
      t4.columns.forEach(function(t5) {
        var o3;
        (null === (o3 = e4.focusedLocation) || void 0 === o3 ? void 0 : o3.column.columnId) === t5.columnId && (i2 = n3);
      });
    }), C(C({}, e4), { selectionMode: "column", activeSelectedRangeIdx: i2, selectedRanges: E([], r2, true), selectedIndexes: o2.map(function(e5) {
      return e5.idx;
    }), selectedIds: o2.map(function(e5) {
      return e5.columnId;
    }) });
  }(t2) : C(C({}, t2), { selectedRanges: E([], t2.selectedRanges, true).map(function(e4) {
    return t2.cellMatrix.validateRange(e4);
  }) });
}
function Cl(e3, t2) {
  return C(C({}, t2), { enableFillHandle: !!e3.enableFillHandle, enableRangeSelection: !!e3.enableRangeSelection, enableColumnSelection: !!e3.enableColumnSelection, enableRowSelection: !!e3.enableRowSelection });
}
var Rl = function(e3, t2) {
  var n2, o2, r2, i2;
  return (null === (n2 = e3.focusLocation) || void 0 === n2 ? void 0 : n2.columnId) !== (null === (o2 = t2.focusedLocation) || void 0 === o2 ? void 0 : o2.column.columnId) || (null === (r2 = e3.focusLocation) || void 0 === r2 ? void 0 : r2.rowId) !== (null === (i2 = t2.focusedLocation) || void 0 === i2 ? void 0 : i2.row.rowId) || void 0 !== e3.stickyRightColumns && e3.stickyRightColumns !== t2.rightStickyColumns || void 0 !== e3.stickyBottomRows && e3.stickyBottomRows !== t2.bottomStickyRows;
};
var Al = function(e3) {
  return function(t2) {
    return function(n2) {
      return n2(e3, t2);
    };
  };
};
var El = function(e3, t2) {
  return !t2.cellMatrix || e3 !== t2.cellMatrix.props || void 0 !== e3.stickyLeftColumns && e3.stickyLeftColumns !== t2.leftStickyColumns || void 0 !== e3.stickyTopRows && e3.stickyTopRows !== t2.topStickyRows || void 0 !== e3.stickyBottomRows && e3.stickyBottomRows !== t2.bottomStickyRows || void 0 !== e3.stickyRightColumns && e3.stickyRightColumns !== t2.rightStickyColumns;
};
var Ml = function(e3, t2) {
  var n2;
  return e3.highlights !== (null === (n2 = t2.props) || void 0 === n2 ? void 0 : n2.highlights);
};
function Gl(e3, t2) {
  return t2.props !== e3 && (t2 = C(C({}, t2), { props: e3 })), t2;
}
function Nl(e3, t2) {
  var n2 = new Xe();
  return C(C({}, t2), { cellMatrix: n2.setProps(e3).fillRowsAndCols({ leftStickyColumns: t2.leftStickyColumns || 0, topStickyRows: t2.topStickyRows || 0, rightStickyColumns: t2.rightStickyColumns || 0, bottomStickyRows: t2.bottomStickyRows || 0 }).setRangesToRenderLookup().fillSticky({ leftStickyColumns: t2.leftStickyColumns || 0, topStickyRows: t2.topStickyRows || 0, rightStickyColumns: t2.rightStickyColumns || 0, bottomStickyRows: t2.bottomStickyRows || 0 }).fillScrollableRange({ leftStickyColumns: t2.leftStickyColumns || 0, topStickyRows: t2.topStickyRows || 0, rightStickyColumns: t2.rightStickyColumns || 0, bottomStickyRows: t2.bottomStickyRows || 0 }).setEdgeLocations().getCellMatrix() });
}
function kl(e3, t2) {
  return t2.cellMatrix.columns.length > 0 && t2.focusedLocation && !t2.currentlyEditedCell && (t2 = C(C({}, t2), { focusedLocation: t2.cellMatrix.validateLocation(t2.focusedLocation) })), t2;
}
function Tl(e3, t2) {
  return t2.visibleRange && (t2 = Ge(t2)), t2;
}
function Sl(e3, t2) {
  return C(C({}, t2), { cellTemplates: C(C({}, vl), e3.customCellTemplates) });
}
function Bl(e3, t2) {
  return C(C({}, t2), { enableGroupIdRender: !!e3.enableGroupIdRender });
}
function Ll(e3, t2) {
  return C(C({}, t2), { disableVirtualScrolling: !!e3.disableVirtualScrolling });
}
function Pl(e3, t2) {
  var n2, o2, r2 = null === (n2 = e3.highlights) || void 0 === n2 ? void 0 : n2.filter(function(e4) {
    return void 0 !== t2.cellMatrix.rowIndexLookup[e4.rowId] && void 0 !== t2.cellMatrix.columnIndexLookup[e4.columnId];
  });
  return (null == r2 ? void 0 : r2.length) !== (null === (o2 = e3.highlights) || void 0 === o2 ? void 0 : o2.length) && console.error('Data inconsistency in ReactGrid "highlights" prop'), C(C({}, t2), { highlightLocations: r2 || [] });
}
function Wl(e3, t2) {
  var n2 = e3.initialFocusLocation, o2 = !!t2.focusedLocation;
  if (n2 && !t2.focusedLocation) if (Hl(t2, n2)) console.error('Data inconsistency in ReactGrid "initialFocusLocation" prop');
  else {
    var r2 = t2.cellMatrix.getLocationById(n2.rowId, n2.columnId);
    t2 = X(t2, r2);
  }
  var i2 = t2.focusedLocation;
  return !o2 && i2 && (t2 = G(t2, i2)), t2;
}
function Xl(e3, t2) {
  var n2 = e3.focusLocation, o2 = !!t2.focusedLocation;
  if (n2) if (Hl(t2, n2)) console.error('Data inconsistency in ReactGrid "focusLocation" prop');
  else {
    var r2 = t2.cellMatrix.getLocationById(n2.rowId, n2.columnId);
    t2 = X(t2, r2);
  }
  var i2 = t2.focusedLocation;
  return !o2 && i2 && e3.focusLocation && t2.selectedRanges.length <= 1 && (t2 = G(t2, i2)), t2;
}
function Hl(e3, t2) {
  return !(void 0 !== e3.cellMatrix.columnIndexLookup[t2.columnId] && void 0 !== e3.cellMatrix.rowIndexLookup[t2.rowId]);
}
function Fl(e3) {
  return e3.cellMatrix.ranges.stickyTopRange.height > 0;
}
function Zl(e3) {
  return e3.cellMatrix.ranges.stickyLeftRange.width > 0;
}
function Vl(e3) {
  return !!(e3.visibleRange && e3.visibleRange.width > 0);
}
function Ol(e3) {
  return !!(e3.cellMatrix.scrollableRange.height > 0 && e3.cellMatrix.scrollableRange.first.column && e3.cellMatrix.scrollableRange.first.row && e3.cellMatrix.scrollableRange.last.row && e3.visibleRange && e3.visibleRange.height > 0);
}
function Dl(e3) {
  return !!(e3.cellMatrix.ranges.stickyBottomRange.height > 0 && e3.cellMatrix.rows.length > 0);
}
function Yl(e3) {
  return !!(e3.cellMatrix.ranges.stickyRightRange.width > 0);
}
var zl = (0, import_react.createContext)({});
var Jl = function(e3) {
  var n2 = e3.children, o2 = e3.state;
  return import_react.default.createElement(zl.Provider, { value: o2 }, n2);
};
var jl = function() {
  return import_react.default.useContext(zl);
};
var Ul = function(t2) {
  var n2, o2, r2, i2, l2, a2, c2, s2, u2, d2, g2, p2, f2, h2, m2 = t2.cellRenderer, b2 = jl(), v2 = b2.cellMatrix, y2 = Fl(b2), x2 = Ol(b2), I2 = Zl(b2), w2 = Vl(b2), C2 = Dl(b2), R2 = Yl(b2);
  if (!(y2 || x2 || I2 || w2)) return null;
  var A2 = void 0, E2 = b2.visibleRange;
  x2 && (A2 = v2.scrollableRange.slice(E2, "rows"));
  var M2 = v2.ranges.stickyTopRange.height ? -v2.ranges.stickyBottomRange.height : 0, G2 = v2.ranges.stickyLeftRange.width ? -v2.ranges.stickyRightRange.width : 0, N2 = v2.ranges.stickyRightRange.width ? -v2.ranges.stickyLeftRange.width : 0, k2 = v2.ranges.stickyBottomRange.height ? -v2.ranges.stickyTopRange.height : 0, T2 = 0 !== v2.scrollableRange.rows.length ? v2.ranges.stickyTopRange.height : 0, S2 = 0 !== v2.scrollableRange.columns.length ? v2.ranges.stickyLeftRange.width : 0, B2 = 0 !== v2.scrollableRange.rows.length ? v2.ranges.stickyBottomRange.height : 0, L2 = 0 !== v2.scrollableRange.columns.length ? v2.ranges.stickyRightRange.width : 0;
  return e.createElement(e.Fragment, null, e.createElement(Pc, { renderChildren: x2 && w2, className: "rg-pane-center-middle", style: { position: "relative", width: "calc(100% - ".concat(v2.ranges.stickyLeftRange.width + v2.ranges.stickyRightRange.width, "px)"), height: v2.scrollableRange.height, marginLeft: G2, marginRight: N2, marginTop: M2, marginBottom: k2, order: 4 } }, e.createElement(Wc, { state: b2, range: zc(A2)(E2), borders: { bottom: !C2, right: !R2, left: !I2, top: !y2 }, cellRenderer: m2 })), e.createElement(Hc, { renderCondition: I2, className: "shadow-left", zIndex: 2, style: { width: v2.ranges.stickyLeftRange.width, height: v2.height, marginTop: -v2.height, order: 9 } }), e.createElement(Hc, { renderCondition: R2, className: "shadow-right", zIndex: 2, style: { width: v2.ranges.stickyRightRange.width, height: v2.height, marginLeft: -v2.ranges.stickyRightRange.width, marginTop: y2 || C2 ? -v2.height : 0, order: y2 || C2 ? 12 : 8 } }), e.createElement(Hc, { renderCondition: y2, className: "shadow-top", zIndex: 1, style: { width: (null === (n2 = b2.props) || void 0 === n2 ? void 0 : n2.enableFullWidthHeader) ? "calc(100%)" : v2.width, height: v2.ranges.stickyTopRange.height, marginTop: -v2.height, order: 10 } }), e.createElement(Hc, { renderCondition: C2, className: "shadow-bottom", zIndex: 1, style: { width: (null === (o2 = b2.props) || void 0 === o2 ? void 0 : o2.enableFullWidthHeader) ? "calc(100%)" : v2.width, height: v2.ranges.stickyBottomRange.height, marginTop: -v2.ranges.stickyBottomRange.height, order: 11 } }), e.createElement(Pc, { renderChildren: w2 && C2, className: "rg-pane-bottom", style: { width: "calc(100% - ".concat(v2.ranges.stickyLeftRange.width + v2.ranges.stickyRightRange.width, "px)"), height: v2.ranges.stickyBottomRange.height, marginLeft: G2, marginRight: N2, marginTop: T2, order: 7 } }, e.createElement(Wc, { state: b2, range: zc(v2.ranges.stickyBottomRange)(E2), borders: { top: true, bottom: true, right: !R2, left: !I2 }, cellRenderer: m2 })), e.createElement(Pc, { renderChildren: x2 && R2 || !A2, className: "rg-pane-right", style: { height: v2.scrollableRange.height, width: v2.width - v2.ranges.stickyLeftRange.width - v2.scrollableRange.width, marginTop: M2, marginBottom: k2, marginLeft: S2, order: 5 } }, e.createElement(Wc, { state: b2, range: Jc(v2.ranges.stickyRightRange)(A2 || v2.ranges.stickyLeftRange), borders: { left: true, top: !y2, bottom: !C2 }, cellRenderer: m2 })), e.createElement(Pc, { renderChildren: y2 && w2, className: "rg-pane-top", style: { width: "calc(100% - ".concat(v2.ranges.stickyLeftRange.width + v2.ranges.stickyRightRange.width, "px)"), height: v2.ranges.stickyTopRange.height, marginBottom: B2, marginLeft: G2, marginRight: N2, order: 1, zIndex: (null !== (i2 = null === (r2 = b2.props) || void 0 === r2 ? void 0 : r2.zIndexBase) && void 0 !== i2 ? i2 : 0) + 1 } }, e.createElement(Wc, { state: b2, range: zc(v2.ranges.stickyTopRange)(E2), borders: { top: true, right: !R2, left: !I2 }, cellRenderer: m2 })), e.createElement(Pc, { renderChildren: x2 && I2 || !A2, className: "rg-pane-left", style: { height: v2.scrollableRange.height, width: v2.width - v2.scrollableRange.width - v2.ranges.stickyRightRange.width, marginRight: L2, marginBottom: k2, marginTop: M2, order: 3, zIndex: (null !== (a2 = null === (l2 = b2.props) || void 0 === l2 ? void 0 : l2.zIndexBase) && void 0 !== a2 ? a2 : 0) + 1 } }, e.createElement(Wc, { state: b2, range: Jc(v2.ranges.stickyLeftRange)(A2 || v2.ranges.stickyLeftRange), borders: { bottom: !C2, top: !y2, left: true }, cellRenderer: m2 })), e.createElement(Pc, { renderChildren: C2 && R2, className: "rg-pane-bottom rg-pane-right rg-pane-shadow shadow-bottom-right-corner", style: { height: v2.ranges.stickyBottomRange.height, width: v2.width - v2.ranges.stickyLeftRange.width - v2.scrollableRange.width, marginTop: T2, marginLeft: S2, order: 8, zIndex: (null !== (s2 = null === (c2 = b2.props) || void 0 === c2 ? void 0 : c2.zIndexBase) && void 0 !== s2 ? s2 : 0) + 1 } }, e.createElement(Wc, { state: b2, range: Jc(v2.ranges.stickyRightRange)(v2.ranges.stickyBottomRange), borders: { top: true, left: true, right: true, bottom: true }, cellRenderer: m2 })), e.createElement(Pc, { renderChildren: C2 && I2, className: "rg-pane-bottom rg-pane-left rg-pane-shadow shadow-bottom-left-corner", style: { height: v2.ranges.stickyBottomRange.height, width: v2.width - v2.ranges.stickyRightRange.width - v2.scrollableRange.width, marginRight: L2, marginTop: T2, order: 6, zIndex: (null !== (d2 = null === (u2 = b2.props) || void 0 === u2 ? void 0 : u2.zIndexBase) && void 0 !== d2 ? d2 : 0) + 2 } }, e.createElement(Wc, { state: b2, range: Jc(v2.ranges.stickyLeftRange)(v2.ranges.stickyBottomRange), borders: { top: true, left: true, right: true, bottom: true }, cellRenderer: m2 })), e.createElement(Pc, { renderChildren: y2 && R2, className: "rg-pane-top rg-pane-right rg-pane-shadow shadow-top-right-corner", style: { height: v2.ranges.stickyTopRange.height, width: v2.width - v2.scrollableRange.width - v2.ranges.stickyLeftRange.width, marginLeft: S2, marginBottom: B2, order: 2, zIndex: (null !== (p2 = null === (g2 = b2.props) || void 0 === g2 ? void 0 : g2.zIndexBase) && void 0 !== p2 ? p2 : 0) + 2 } }, e.createElement(Wc, { state: b2, range: Jc(v2.ranges.stickyRightRange)(v2.ranges.stickyTopRange), borders: { top: true, left: true, right: true, bottom: true }, cellRenderer: m2 })), e.createElement(Pc, { renderChildren: y2 && I2, className: "rg-pane-top rg-pane-left rg-pane-shadow shadow-top-left-corner", style: { height: v2.ranges.stickyTopRange.height, width: v2.width - v2.scrollableRange.width - v2.ranges.stickyRightRange.width, marginRight: L2, marginBottom: B2, order: 0, zIndex: (null !== (h2 = null === (f2 = b2.props) || void 0 === f2 ? void 0 : f2.zIndexBase) && void 0 !== h2 ? h2 : 0) + 3 } }, e.createElement(Wc, { state: b2, range: Jc(v2.ranges.stickyLeftRange)(v2.ranges.stickyTopRange), borders: { top: true, left: true, right: true, bottom: true }, cellRenderer: m2 })));
};
var _l = function() {
  var t2 = jl(), n2 = t2.linePosition, o2 = t2.lineOrientation, r2 = t2.cellMatrix, i2 = "vertical" === o2, l2 = Object.assign({}, i2 ? { left: n2, height: r2.height } : { top: n2, width: r2.width });
  return -1 === n2 ? null : e.createElement("div", { className: "rg-line ".concat(i2 ? "rg-line-vertical" : "rg-line-horizontal"), style: l2 });
};
var Ql = function() {
  var e3 = jl(), n2 = e3.lineOrientation, o2 = e3.shadowSize, r2 = e3.shadowPosition, i2 = e3.shadowCursor, l2 = e3.cellMatrix, a2 = "vertical" === n2;
  return -1 === r2 ? null : import_react.default.createElement("div", { className: "rg-shadow", style: { cursor: i2, top: a2 ? 0 : r2, left: a2 ? r2 : 0, width: a2 ? o2 : l2.width, height: a2 ? l2.height : o2 } });
};
function Kl(e3) {
  return e3.selectedRanges[e3.activeSelectedRangeIdx];
}
var $l = { type: "", text: "", value: NaN };
function ql(e3, t2, n2) {
  void 0 === n2 && (n2 = false);
  var o2 = ta(t2), r2 = o2.div, i2 = o2.table, l2 = (o2.location, function(e4, t3, n3, o3, r3) {
    var i3 = "", l3 = "";
    return n3.rows.forEach(function(t4) {
      var a2 = o3.insertRow();
      n3.columns.forEach(function(n4) {
        var o4 = a2.insertCell(), c2 = P(e4, { row: t4, column: n4 }).cell, s2 = c2.text || " ";
        o4.textContent = s2, i3 = "" === l3 ? c2.text : i3 + (l3 === t4.rowId ? "	" : "\n") + s2, l3 = t4.rowId, o4.setAttribute("data-reactgrid", JSON.stringify(c2)), o4.style.color = "initial", o4.style.border = "initial", o4.style.fontSize = "initial", o4.style.backgroundColor = "initial", oa(e4, { row: t4, column: n4 }, r3);
      });
    }), i3;
  }(e3, 0, t2, i2, n2));
  return na(r2, i2), { div: r2, text: l2 };
}
function ea(e3, t2, n2) {
  var o2 = e3.insertCell(), r2 = P(t2, n2).cell;
  o2.textContent = r2.text ? r2.text : " ", o2.setAttribute("data-reactgrid", JSON.stringify(r2)), o2.style.border = "initial";
}
function ta(e3) {
  var t2 = document.createElement("div"), n2 = document.createElement("table");
  return n2.setAttribute("empty-cells", "show"), n2.setAttribute("data-reactgrid", "reactgrid-content"), { div: t2, table: n2, location: { row: e3.first.row, column: e3.first.column } };
}
function na(e3, t2) {
  e3.classList.add("rg-copy-container"), e3.setAttribute("contenteditable", "true"), e3.style.position = "fixed", e3.style.top = "50%", e3.style.left = "50%", e3.appendChild(t2);
}
function oa(e3, t2, n2) {
  n2 && (e3 = W(e3, t2, $l));
}
function ra(e3, t2, n2) {
  return P(e3, t2).cell.groupId === n2.groupId ? W(e3, t2, n2) : (console.warn("New cells data can't be appended into location: ('".concat(t2.column.columnId, "', '").concat(t2.row.rowId, "'). Cell's 'groupId' field doesn't match!")), e3);
}
function ia(e3, t2) {
  var n2, o2, r2 = Kl(e3);
  if (1 !== t2.length || 1 !== t2[0].length) {
    var i2, l2 = e3.cellMatrix;
    if (t2.forEach(function(t3, n3) {
      return t3.forEach(function(t4, o3) {
        var a3 = r2.first.row.idx + n3, c2 = r2.first.column.idx + o3;
        a3 <= l2.last.row.idx && c2 <= l2.last.column.idx && (i2 = l2.getLocation(a3, c2), e3 = ra(e3, i2, t4));
      });
    }), !i2) return e3;
    var a2 = l2.getRange(r2.first, i2);
    return (null === (n2 = null == e3 ? void 0 : e3.props) || void 0 === n2 ? void 0 : n2.onSelectionChanging) && !e3.props.onSelectionChanging([a2]) ? e3 : ((null === (o2 = null == e3 ? void 0 : e3.props) || void 0 === o2 ? void 0 : o2.onSelectionChanged) && e3.props.onSelectionChanged([a2]), C(C({}, e3), { selectedRanges: [l2.getRange(r2.first, i2)], activeSelectedRangeIdx: 0 }));
  }
  return r2.rows.forEach(function(n3) {
    return r2.columns.forEach(function(o3) {
      e3 = ra(e3, M(n3, o3), t2[0][0]);
    });
  }), e3;
}
function la(e3) {
  return e3.selectedRanges.map(function(e4) {
    return e4.rows.flatMap(function(t2) {
      return e4.columns.map(function(e5) {
        return { columnId: e5.columnId, rowId: t2.rowId };
      });
    });
  });
}
function aa() {
  return R(this, void 0, void 0, function() {
    return A(this, function(e3) {
      switch (e3.label) {
        case 0:
          return [4, navigator.clipboard.readText().catch(function() {
            throw new Error("Failed to read textual data from clipboard!");
          })];
        case 1:
          return [2, e3.sent().split("\n").map(function(e4) {
            return e4.split("	").map(function(e5) {
              return { type: "text", text: e5, value: at(e5) };
            });
          })];
      }
    });
  });
}
function ca(e3) {
  return R(this, void 0, void 0, function() {
    var t2;
    return A(this, function(n2) {
      switch (n2.label) {
        case 0:
          return [4, e3.getType("text/html").catch(function() {
            throw new Error("Failed to get HTML Blob data from clipboard!");
          })];
        case 1:
          return [4, n2.sent().text().catch(function() {
            throw new Error("Failed to parse HTML Blob to text!");
          })];
        case 2:
          t2 = n2.sent();
          try {
            return [2, new DOMParser().parseFromString(t2, "text/html")];
          } catch (e4) {
            throw new Error("Failed to parse HTML string to DOM!");
          }
          return [2];
      }
    });
  });
}
function sa(e3) {
  var t2, n2;
  return R(this, void 0, void 0, function() {
    var o2, r2, i2, l2, a2, c2, s2, u2;
    return A(this, function(d2) {
      switch (d2.label) {
        case 0:
          return o2 = [], (null === (t2 = e3.firstElementChild) || void 0 === t2 ? void 0 : t2.firstElementChild) ? [3, 2] : [4, aa()];
        case 1:
          return [2, d2.sent()];
        case 2:
          for (r2 = e3.firstElementChild.firstElementChild.children, i2 = 0; i2 < r2.length; i2++) {
            for (l2 = [], a2 = 0; a2 < r2[i2].children.length; a2++) c2 = r2[i2].children[a2].getAttribute("data-reactgrid"), s2 = c2 && JSON.parse(c2), u2 = null !== (n2 = r2[i2].children[a2].textContent) && void 0 !== n2 ? n2 : "", l2.push(s2 || { type: "text", text: u2, value: at(u2) });
            o2.push(l2);
          }
          return [2, o2];
      }
    });
  });
}
var ua = function() {
  return R(void 0, void 0, void 0, function() {
    var e3, t2, n2, o2, r2;
    return A(this, function(i2) {
      switch (i2.label) {
        case 0:
          return [4, navigator.clipboard.read()];
        case 1:
          return e3 = i2.sent(), (t2 = e3.find(function(e4) {
            return e4.types.includes("text/html");
          })) ? [4, ca(t2)] : [3, 3];
        case 2:
          return o2 = i2.sent(), [3, 4];
        case 3:
          o2 = null, i2.label = 4;
        case 4:
          return "reactgrid-content" === (null === (r2 = null == (n2 = o2) ? void 0 : n2.body.firstElementChild) || void 0 === r2 ? void 0 : r2.getAttribute("data-reactgrid")) ? [2, sa(n2.body)] : [4, aa()];
        case 5:
          return [2, i2.sent()];
      }
    });
  });
};
var da = function() {
  var t2 = e.useRef(null), n2 = jl(), o2 = n2.contextMenuPosition, r2 = n2.selectedIds, i2 = n2.selectionMode, l2 = o2.left, a2 = o2.top;
  if (-1 !== a2 && -1 !== l2 && t2.current) {
    var c2 = window.innerWidth, s2 = window.innerHeight, u2 = t2.current.offsetWidth, d2 = t2.current.offsetHeight;
    o2.top = s2 - a2 < d2 ? s2 - d2 - 20 : a2, o2.left = c2 - l2 < u2 ? c2 - u2 - 20 : l2;
  }
  var g2, p2, f2, h2, m2 = function(e3) {
    var t3 = vc(e3), n3 = t3.copyLabel, o3 = t3.cutLabel, r3 = t3.pasteLabel;
    return [{ id: "copy", label: n3, handler: function() {
      return ga(e3, false);
    } }, { id: "cut", label: o3, handler: function() {
      return ga(e3, true);
    } }, { id: "paste", label: r3, handler: function() {
      return function(e4) {
        var t4 = O() || D();
        if (hc() || t4) {
          var n4 = vc(e4), o4 = n4.appleMobileDeviceContextMenuPasteAlert, r4 = n4.otherBrowsersContextMenuPasteAlert, i3 = n4.actionNotSupported;
          alert("".concat(i3, " ").concat(t4 ? o4 : r4));
        } else ua().then(function(t5) {
          e4.update(function(e5) {
            return ia(e5, t5);
          });
        });
      }(e3);
    } }];
  }(n2), b2 = (g2 = m2, null !== (h2 = null === (f2 = null === (p2 = n2.props) || void 0 === p2 ? void 0 : p2.onContextMenu) || void 0 === f2 ? void 0 : f2.call(p2, "row" === n2.selectionMode ? n2.selectedIds : [], "column" === n2.selectionMode ? n2.selectedIds : [], n2.selectionMode, g2, la(n2))) && void 0 !== h2 ? h2 : []);
  return b2.length >= 0 && (m2 = b2), e.createElement("div", { ref: t2, className: "rg-context-menu", style: { visibility: -1 === a2 && -1 === l2 ? "hidden" : "visible", top: o2.top + "px", left: o2.left + "px" } }, m2.map(function(t3, o3) {
    var l3 = t3.handler, a3 = t3.id, c3 = t3.label;
    return e.createElement("div", { key: o3, className: "rg-context-menu-option", onPointerDown: function(e3) {
      return e3.stopPropagation();
    }, onClick: function() {
      l3("row" === i2 ? r2 : [], "column" === i2 ? r2 : [], i2, la(n2)), n2.update(function(e3) {
        return C(C(C({}, e3), { contextMenuPosition: { top: -1, left: -1 } }), ("copy" === a3 || "cut" === a3) && { copyRange: Kl(e3) });
      });
    } }, c3);
  }));
};
function ga(e3, t2) {
  void 0 === t2 && (t2 = false), function(e4, t3) {
    var n2;
    void 0 === t3 && (t3 = false);
    var o2 = Kl(e4);
    if (o2) {
      var r2 = ql(e4, o2, t3).div;
      document.body.appendChild(r2), r2.focus(), document.execCommand("selectAll", false, void 0), document.execCommand("copy"), document.body.removeChild(r2), null === (n2 = e4.hiddenFocusElement) || void 0 === n2 || n2.focus();
    }
  }(e3, t2);
}
var pa = function(t2) {
  function n2() {
    var e3 = null !== t2 && t2.apply(this, arguments) || this;
    return e3.updateState = function(t3) {
      return e3.setState(t3);
    }, e3.stateUpdater = function(t3) {
      return jc(t3(e3.state), e3.state, e3.props, e3.updateState);
    }, e3.pointerEventsController = new Re(e3.stateUpdater), e3.eventHandlers = new We(e3.stateUpdater, e3.pointerEventsController), e3.cellMatrixBuilder = new Xe(), e3.state = C(C({ update: e3.stateUpdater }, ec), { currentBehavior: new qa(), cellMatrix: e3.cellMatrixBuilder.setProps(e3.props).fillRowsAndCols().setRangesToRenderLookup().fillSticky().fillScrollableRange().setEdgeLocations().getCellMatrix() }), e3.clearSelections = function() {
      e3.setState(function(e4) {
        return 0 === e4.selectedIds.length && 0 === e4.selectedIndexes.length && 0 === e4.selectedRanges.length ? null : { selectedIds: [], selectedIndexes: [], selectedRanges: [] };
      });
    }, e3;
  }
  return w(n2, t2), n2.getDerivedStateFromProps = function(e3, t3) {
    try {
      return Il(e3, t3);
    } catch (e4) {
      return console.error(e4), null;
    }
  }, n2.prototype.componentDidUpdate = function(e3, t3) {
    var n3;
    !t3.reactGridElement && this.state.reactGridElement && (null === (n3 = this.state.scrollableElement) || void 0 === n3 || n3.addEventListener("scroll", this.eventHandlers.scrollHandler)), ye(0, t3, this.state);
  }, n2.prototype.componentDidMount = function() {
    window.addEventListener("resize", this.eventHandlers.windowResizeHandler);
  }, n2.prototype.componentWillUnmount = function() {
    var e3;
    window.removeEventListener("resize", this.eventHandlers.windowResizeHandler), null === (e3 = this.state.scrollableElement) || void 0 === e3 || e3.removeEventListener("scroll", this.eventHandlers.scrollHandler), this.setState({ contextMenuPosition: { top: -1, left: -1 } });
  }, n2.prototype.render = function() {
    var t3 = this.state, n3 = this.eventHandlers;
    return t3.legacyBrowserMode ? e.createElement(Jl, { state: t3 }, e.createElement(yc, { eventHandlers: n3 })) : e.createElement(Jl, { state: t3 }, e.createElement(mc, { eventHandlers: n3 }, e.createElement(Ul, { cellRenderer: Ac }), e.createElement(_l, null), e.createElement(Ql, null), e.createElement(da, null), t3.currentlyEditedCell && e.createElement(rc, null)));
  }, n2;
}(e.Component);
var fa = Ra(X);
var ha = Ea(fa);
var ma = Aa(fa);
var ba = Ma(fa);
var va = ka(fa);
var ya = Sa(fa);
var xa = La(fa);
var Ia = Wa(fa);
var wa = Ia(function(e3, t2) {
  var n2, o2 = Xa(e3, e3.cellMatrix.ranges.stickyTopRange.height + e3.cellMatrix.ranges.stickyBottomRange.height), r2 = e3.cellMatrix.ranges.stickyTopRange.rows.length > 0, i2 = r2 && ge(e3, t2), l2 = e3.cellMatrix.scrollableRange.rows.length > 0, a2 = l2 && t2.row.idx > e3.cellMatrix.scrollableRange.first.row.idx && t2.row.idx <= e3.cellMatrix.scrollableRange.last.row.idx, c2 = l2 && t2.row.idx === e3.cellMatrix.scrollableRange.first.row.idx, s2 = e3.cellMatrix.ranges.stickyBottomRange.rows.length > 0, u2 = s2 && t2.row.idx >= e3.cellMatrix.ranges.stickyBottomRange.first.row.idx, d2 = s2 && (null == t2 ? void 0 : t2.row.idx) === (null === (n2 = e3.cellMatrix.ranges) || void 0 === n2 ? void 0 : n2.stickyBottomRange.first.row.idx), g2 = e3.cellMatrix.scrollableRange.rows.filter(function(e4) {
    return e4.top + e4.height < o2;
  }), p2 = 0;
  u2 ? p2 = u2 && !d2 ? e3.cellMatrix.ranges.stickyBottomRange.first.row.idx : l2 ? e3.cellMatrix.scrollableRange.last.row.idx : r2 ? e3.cellMatrix.ranges.stickyTopRange.last.row.idx : e3.cellMatrix.ranges.stickyBottomRange.first.row.idx : a2 ? p2 = t2.row.idx - g2.length < e3.cellMatrix.scrollableRange.first.row.idx ? e3.cellMatrix.scrollableRange.first.row.idx : t2.row.idx - g2.length : c2 ? p2 = r2 ? e3.cellMatrix.ranges.stickyTopRange.last.row.idx : e3.cellMatrix.scrollableRange.first.row.idx : i2 && (p2 = e3.cellMatrix.ranges.stickyTopRange.first.row.idx);
  if (!Ga(e3, p2, t2.column.idx)) {
    var f2 = e3.cellMatrix.getLocation(p2, t2.column.idx), h2 = Pa(e3, f2);
    return h2 ? h2.row.idx : t2.row.idx;
  }
  return p2;
});
var Ca = Ia(function(e3, t2) {
  var n2, o2 = e3.cellMatrix.ranges.stickyTopRange.rows.length > 0, r2 = o2 && ge(e3, t2), i2 = o2 && t2.row.idx === (null === (n2 = e3.cellMatrix.ranges) || void 0 === n2 ? void 0 : n2.stickyTopRange.last.row.idx), l2 = e3.cellMatrix.scrollableRange.rows.length > 0, a2 = l2 && t2.row.idx >= e3.cellMatrix.scrollableRange.first.row.idx && t2.row.idx < e3.cellMatrix.scrollableRange.last.row.idx, c2 = l2 && t2.row.idx === e3.cellMatrix.scrollableRange.last.row.idx, s2 = e3.cellMatrix.ranges.stickyBottomRange.rows.length > 0, u2 = s2 && t2.row.idx >= e3.cellMatrix.ranges.stickyBottomRange.first.row.idx, d2 = Xa(e3, e3.cellMatrix.ranges.stickyTopRange.height + e3.cellMatrix.ranges.stickyBottomRange.height), g2 = e3.cellMatrix.scrollableRange.rows.filter(function(e4) {
    return e4.top + e4.height < d2;
  }), p2 = 0;
  r2 ? p2 = r2 && !i2 ? e3.cellMatrix.ranges.stickyTopRange.last.row.idx : l2 ? e3.cellMatrix.scrollableRange.first.row.idx : s2 ? e3.cellMatrix.ranges.stickyBottomRange.first.row.idx : e3.cellMatrix.ranges.stickyTopRange.last.row.idx : a2 ? p2 = t2.row.idx + g2.length < e3.cellMatrix.scrollableRange.rows.length ? t2.row.idx + g2.length : e3.cellMatrix.scrollableRange.last.row.idx : c2 ? p2 = s2 ? e3.cellMatrix.ranges.stickyBottomRange.first.row.idx : e3.cellMatrix.scrollableRange.last.row.idx : u2 && (p2 = e3.cellMatrix.ranges.stickyBottomRange.last.row.idx);
  if (!Ga(e3, p2, t2.column.idx)) {
    var f2 = e3.cellMatrix.getLocation(p2, t2.column.idx), h2 = Ba(e3, f2);
    return h2 ? h2.row.idx : t2.row.idx;
  }
  return p2;
});
function Ra(e3) {
  return function(t2, n2, o2, r2) {
    return e3(o2, o2.cellMatrix.getLocation(n2, t2), true, r2);
  };
}
function Aa(e3) {
  return function(t2) {
    if (t2.focusedLocation) {
      var n2 = Ga(t2, t2.focusedLocation.row.idx, t2.cellMatrix.columns.length - 1);
      if (!n2) {
        var o2 = t2.cellMatrix.getLocation(t2.focusedLocation.row.idx, t2.cellMatrix.columns.length - 1), r2 = Na(t2, o2);
        return r2 ? e3(r2.column.idx, r2.row.idx, t2) : t2;
      }
      return e3(n2.column.idx, n2.row.idx, t2);
    }
    return t2;
  };
}
function Ea(e3) {
  return function(t2) {
    if (t2.focusedLocation) {
      var n2 = Ga(t2, t2.focusedLocation.row.idx, 0);
      if (!n2) {
        var o2 = t2.cellMatrix.getLocation(t2.focusedLocation.row.idx, 0), r2 = Ta(t2, o2);
        return r2 ? e3(r2.column.idx, r2.row.idx, t2) : t2;
      }
      return e3(n2.column.idx, n2.row.idx, t2);
    }
    return t2;
  };
}
function Ma(e3) {
  return function(t2) {
    var n2 = Na(t2, t2.focusedLocation);
    return n2 ? e3(n2.column.idx, n2.row.idx, t2) : t2;
  };
}
function Ga(e3, t2, n2) {
  var o2 = e3.cellMatrix.getLocation(t2, n2), r2 = P(e3, o2), i2 = r2.cell, l2 = r2.cellTemplate;
  if (!e3.props) throw new Error('"props" field on "state" object should be initiated before possible location focus');
  var a2 = e3.props.onFocusLocationChanging, c2 = { rowId: o2.row.rowId, columnId: o2.column.columnId }, s2 = !a2 || a2(c2);
  return (!l2.isFocusable || l2.isFocusable(i2)) && s2 ? o2 : void 0;
}
function Na(e3, t2) {
  if (t2) for (var n2 = t2.column.idx - 1; n2 >= e3.cellMatrix.first.column.idx; --n2) {
    var o2 = Ga(e3, t2.row.idx, n2);
    if (o2) return o2;
  }
}
function ka(e3) {
  return function(t2, n2) {
    var o2 = Ta(t2, t2.focusedLocation);
    return o2 ? e3(o2.column.idx, o2.row.idx, t2, n2) : t2;
  };
}
function Ta(e3, t2) {
  if (t2) for (var n2 = t2.column.idx + 1; n2 <= e3.cellMatrix.last.column.idx; ++n2) {
    var o2 = Ga(e3, t2.row.idx, n2);
    if (o2) return o2;
  }
}
function Sa(e3) {
  return function(t2) {
    var n2 = Ba(t2, t2.focusedLocation);
    return n2 ? e3(n2.column.idx, n2.row.idx, t2) : t2;
  };
}
function Ba(e3, t2) {
  if (t2) for (var n2 = t2.row.idx - 1; n2 >= e3.cellMatrix.first.row.idx; --n2) {
    var o2 = Ga(e3, n2, t2.column.idx);
    if (o2) return o2;
  }
}
function La(e3) {
  return function(t2, n2) {
    var o2 = Pa(t2, t2.focusedLocation);
    return o2 ? e3(o2.column.idx, o2.row.idx, t2, n2) : t2;
  };
}
function Pa(e3, t2) {
  if (t2) for (var n2 = t2.row.idx + 1; n2 <= e3.cellMatrix.last.row.idx; ++n2) {
    var o2 = Ga(e3, n2, t2.column.idx);
    if (o2) return o2;
  }
}
function Wa(e3) {
  return function(t2) {
    return function(n2) {
      var o2 = n2.focusedLocation;
      if (!o2) return n2;
      var r2 = t2(n2, o2);
      return e3(o2.column.idx, r2, n2);
    };
  };
}
function Xa(e3, t2) {
  return ae(e3, t2);
}
function Ha(e3, t2) {
  var n2 = function(e4, t3) {
    var n3, o2, r2, i2, l2, a2, c2, s2, u2, d2, g2, p2, f2, h2, m2, v2, y2, x2, I2 = e4.focusedLocation;
    if (!I2) return e4;
    var w2 = null !== (n3 = Kl(e4)) && void 0 !== n3 ? n3 : e4.cellMatrix.getRange(I2, I2);
    if (t3.ctrlKey && V() && t3.keyCode === B.SPACE) return Va(e4, w2.first.column.idx, w2.last.column.idx, 0, e4.cellMatrix.last.row.idx);
    var R2 = 1 === e4.selectedRanges.length && b(w2.first, w2.last), A2 = Dc(e4, t3);
    if (A2 !== e4) {
      if (!R2 && t3.keyCode === B.ENTER) {
        var E2 = t3.shiftKey ? "up" : (null === (o2 = e4.props) || void 0 === o2 ? void 0 : o2.moveRightOnEnter) ? "right" : "down";
        return null === (r2 = e4.hiddenFocusElement) || void 0 === r2 || r2.focus(), Fa(e4, E2, w2, I2);
      }
      return A2;
    }
    if (t3.altKey) return e4;
    if (Fc(t3) && t3.shiftKey) switch (t3.keyCode) {
      case B.HOME:
        return Va(e4, w2.first.column.idx, w2.last.column.idx, 0, w2.last.row.idx);
      case B.END:
        return Va(e4, w2.first.column.idx, w2.last.column.idx, w2.first.row.idx, e4.cellMatrix.last.row.idx);
    }
    else if (Fc(t3)) {
      var M2 = e4.cellMatrix;
      switch (t3.keyCode) {
        case B.KEY_A:
          if (1 === e4.selectedRanges.length && b(e4.selectedRanges[0].first, M2.first) && b(e4.selectedRanges[0].last, M2.last)) return G(e4, I2);
          var N2 = M2.getRange(M2.first, M2.last);
          return (null === (i2 = e4.props) || void 0 === i2 ? void 0 : i2.onSelectionChanging) && !e4.props.onSelectionChanging([N2]) ? e4 : C(C({}, e4), { selectedRanges: [N2], selectionMode: "range", activeSelectedRangeIdx: 0 });
        case B.HOME:
          return X(e4, e4.cellMatrix.first);
        case B.END:
          return X(e4, e4.cellMatrix.last);
        case B.SPACE:
          return Va(e4, w2.first.column.idx, w2.last.column.idx, 0, e4.cellMatrix.last.row.idx);
      }
    } else if (t3.shiftKey) switch (t3.keyCode) {
      case B.UP_ARROW:
        return function(e5, t4, n4) {
          return t4.first.row.idx >= 0 ? t4.last.row.idx > n4.row.idx ? Va(e5, t4.first.column.idx, t4.last.column.idx, t4.first.row.idx, t4.last.row.idx > 0 ? t4.last.row.idx - 1 : 0, "vertical") : Va(e5, t4.last.column.idx, t4.first.column.idx, t4.last.row.idx, t4.first.row.idx > 0 ? t4.first.row.idx - 1 : 0, "vertical") : e5;
        }(e4, w2, I2);
      case B.DOWN_ARROW:
        return function(e5, t4, n4) {
          return t4.last.row.idx <= e5.cellMatrix.last.row.idx ? t4.first.row.idx < n4.row.idx ? Va(e5, t4.last.column.idx, t4.first.column.idx, t4.last.row.idx, t4.first.row.idx >= e5.cellMatrix.last.row.idx ? e5.cellMatrix.last.row.idx : t4.first.row.idx + 1, "vertical") : Va(e5, t4.first.column.idx, t4.last.column.idx, t4.first.row.idx, t4.last.row.idx >= e5.cellMatrix.last.row.idx ? e5.cellMatrix.last.row.idx : t4.last.row.idx + 1, "vertical") : e5;
        }(e4, w2, I2);
      case B.LEFT_ARROW:
        return function(e5, t4, n4) {
          return t4.first.column.idx >= 0 ? t4.last.column.idx > n4.column.idx ? Va(e5, t4.first.column.idx, t4.last.column.idx > 0 ? t4.last.column.idx - 1 : 0, t4.first.row.idx, t4.last.row.idx, "horizontal") : Va(e5, t4.last.column.idx, t4.first.column.idx > 0 ? t4.first.column.idx - 1 : 0, t4.last.row.idx, t4.first.row.idx, "horizontal") : e5;
        }(e4, w2, I2);
      case B.RIGHT_ARROW:
        return function(e5, t4, n4) {
          return t4.last.column.idx <= e5.cellMatrix.last.column.idx ? t4.first.column.idx < n4.column.idx ? Va(e5, t4.last.column.idx, t4.first.column.idx >= e5.cellMatrix.last.column.idx ? e5.cellMatrix.last.column.idx : t4.first.column.idx + 1, t4.last.row.idx, t4.first.row.idx, "horizontal") : Va(e5, t4.first.column.idx, t4.last.column.idx >= e5.cellMatrix.last.column.idx ? e5.cellMatrix.last.column.idx : t4.last.column.idx + 1, t4.first.row.idx, t4.last.row.idx, "horizontal") : e5;
        }(e4, w2, I2);
      case B.TAB:
        return t3.preventDefault(), R2 ? ba(e4) : Fa(e4, "left", w2, I2);
      case B.ENTER:
        return null === (l2 = e4.hiddenFocusElement) || void 0 === l2 || l2.focus(), R2 ? ya(e4) : Fa(e4, "up", w2, I2);
      case B.SPACE:
        return Va(e4, 0, e4.cellMatrix.last.column.idx, w2.first.row.idx, w2.last.row.idx);
      case B.HOME:
        return Va(e4, 0, w2.last.column.idx, w2.first.row.idx, w2.last.row.idx);
      case B.END:
        return Va(e4, w2.first.column.idx, e4.cellMatrix.last.column.idx, w2.first.row.idx, w2.last.row.idx);
      case B.PAGE_UP:
        return function(e5, t4, n4) {
          var o3 = Za(e5), r3 = e5.cellMatrix.ranges.stickyBottomRange.rows.length > 0 && t4.first.row.idx > e5.cellMatrix.ranges.stickyBottomRange.first.row.idx, i3 = e5.cellMatrix.ranges.stickyBottomRange.rows.length > 0 && t4.last.row.idx === e5.cellMatrix.ranges.stickyBottomRange.last.row.idx, l3 = e5.cellMatrix.ranges.stickyBottomRange.rows.length > 0 && t4.last.row.idx === e5.cellMatrix.ranges.stickyBottomRange.first.row.idx, a3 = e5.cellMatrix.ranges.stickyBottomRange.rows.length > 0 && t4.first.row.idx === e5.cellMatrix.ranges.stickyBottomRange.first.row.idx, c3 = e5.cellMatrix.ranges.stickyTopRange.rows.length > 0 && t4.last.row.idx === e5.cellMatrix.ranges.stickyTopRange.last.row.idx, s3 = e5.cellMatrix.scrollableRange.rows.length > 0 && e5.cellMatrix.ranges.stickyTopRange.rows.length > 0 && t4.first.row.idx === e5.cellMatrix.scrollableRange.first.row.idx, u3 = e5.cellMatrix.scrollableRange.rows.length > 0 && e5.cellMatrix.ranges.stickyTopRange.rows.length > 0 && t4.last.row.idx === e5.cellMatrix.scrollableRange.first.row.idx, d3 = e5.cellMatrix.ranges.stickyTopRange.rows.length > 0 && t4.first.row.idx <= e5.cellMatrix.ranges.stickyTopRange.last.row.idx, g3 = e5.cellMatrix.scrollableRange.rows.filter(function(e6) {
            return e6.top + e6.height < o3;
          });
          return t4.first.row.idx >= 0 ? t4.last.row.idx > n4.row.idx ? Va(e5, t4.first.column.idx, t4.last.column.idx, t4.first.row.idx, i3 ? e5.cellMatrix.ranges.stickyBottomRange.first.row.idx : l3 ? e5.cellMatrix.scrollableRange.rows.length > 0 ? e5.cellMatrix.scrollableRange.last.row.idx : e5.cellMatrix.ranges.stickyTopRange.first.row.idx : u3 ? e5.cellMatrix.ranges.stickyTopRange.last.row.idx : c3 ? e5.cellMatrix.ranges.stickyTopRange.first.row.idx : t4.last.row.idx - g3.length > e5.cellMatrix.scrollableRange.first.row.idx ? t4.last.row.idx - g3.length : e5.cellMatrix.scrollableRange.first.row.idx, "vertical") : Va(e5, t4.last.column.idx, t4.first.column.idx, t4.last.row.idx, r3 ? e5.cellMatrix.ranges.stickyBottomRange.first.row.idx : a3 ? e5.cellMatrix.scrollableRange.rows.length > 0 ? e5.cellMatrix.scrollableRange.last.row.idx : e5.cellMatrix.ranges.stickyTopRange.rows.length > 0 ? e5.cellMatrix.ranges.stickyTopRange.first.row.idx : e5.cellMatrix.ranges.stickyBottomRange.first.row.idx : s3 ? e5.cellMatrix.ranges.stickyTopRange.last.row.idx : d3 ? e5.cellMatrix.ranges.stickyTopRange.first.row.idx : r3 ? e5.cellMatrix.ranges.stickyBottomRange.first.row.idx : t4.first.row.idx - g3.length > e5.cellMatrix.scrollableRange.first.row.idx ? t4.first.row.idx - g3.length : e5.cellMatrix.scrollableRange.first.row.idx, "vertical") : e5;
        }(e4, w2, I2);
      case B.PAGE_DOWN:
        return function(e5, t4, n4) {
          var o3 = Za(e5), r3 = e5.cellMatrix.ranges.stickyTopRange.rows.length > 0 && t4.last.row.idx < e5.cellMatrix.ranges.stickyTopRange.last.row.idx, i3 = e5.cellMatrix.ranges.stickyTopRange.rows.length > 0 && t4.first.row.idx < e5.cellMatrix.ranges.stickyTopRange.last.row.idx, l3 = e5.cellMatrix.ranges.stickyTopRange.rows.length > 0 && t4.last.row.idx === e5.cellMatrix.ranges.stickyTopRange.last.row.idx, a3 = e5.cellMatrix.ranges.stickyTopRange.rows.length > 0 && t4.first.row.idx === e5.cellMatrix.ranges.stickyTopRange.last.row.idx, c3 = e5.cellMatrix.scrollableRange.rows.length > 0 && e5.cellMatrix.ranges.stickyBottomRange.rows.length > 0 && t4.last.row.idx === e5.cellMatrix.scrollableRange.last.row.idx, s3 = e5.cellMatrix.scrollableRange.rows.length > 0 && e5.cellMatrix.ranges.stickyBottomRange.rows.length > 0 && t4.first.row.idx === e5.cellMatrix.scrollableRange.last.row.idx, u3 = e5.cellMatrix.ranges.stickyBottomRange.rows.length > 0 && t4.last.row.idx >= e5.cellMatrix.ranges.stickyBottomRange.first.row.idx, d3 = e5.cellMatrix.ranges.stickyBottomRange.rows.length > 0 && t4.first.row.idx >= e5.cellMatrix.ranges.stickyBottomRange.first.row.idx, g3 = e5.cellMatrix.scrollableRange.rows.filter(function(e6) {
            return e6.top + e6.height < o3;
          });
          return t4.last.row.idx <= e5.cellMatrix.last.row.idx ? t4.first.row.idx < n4.row.idx ? Va(e5, t4.last.column.idx, t4.first.column.idx, t4.last.row.idx, i3 ? e5.cellMatrix.ranges.stickyTopRange.last.row.idx : a3 ? e5.cellMatrix.scrollableRange.rows.length > 0 ? e5.cellMatrix.scrollableRange.first.row.idx : e5.cellMatrix.ranges.stickyBottomRange.first.row.idx : s3 ? e5.cellMatrix.ranges.stickyBottomRange.first.row.idx : d3 ? e5.cellMatrix.ranges.stickyBottomRange.last.row.idx : t4.first.row.idx + g3.length >= e5.cellMatrix.scrollableRange.last.row.idx ? e5.cellMatrix.scrollableRange.last.row.idx : t4.first.row.idx + g3.length, "vertical") : Va(e5, t4.first.column.idx, t4.last.column.idx, t4.first.row.idx, u3 ? e5.cellMatrix.ranges.stickyBottomRange.last.row.idx : l3 ? e5.cellMatrix.scrollableRange.rows.length > 0 ? e5.cellMatrix.scrollableRange.first.row.idx : e5.cellMatrix.ranges.stickyBottomRange.rows.length > 0 ? e5.cellMatrix.ranges.stickyBottomRange.first.row.idx : e5.cellMatrix.ranges.stickyTopRange.last.row.idx : c3 ? e5.cellMatrix.ranges.stickyBottomRange.first.row.idx : r3 ? e5.cellMatrix.ranges.stickyTopRange.last.row.idx : t4.last.row.idx + g3.length >= e5.cellMatrix.scrollableRange.last.row.idx ? e5.cellMatrix.scrollableRange.last.row.idx : t4.last.row.idx + g3.length, "vertical") : e5;
        }(e4, w2, I2);
    }
    else switch (t3.keyCode) {
      case B.DELETE:
      case B.BACKSPACE:
        return null === (a2 = e4.hiddenFocusElement) || void 0 === a2 || a2.focus(), function(e5) {
          return e5.selectedRanges.forEach(function(t4) {
            return t4.rows.forEach(function(n4) {
              return t4.columns.forEach(function(t5) {
                return e5 = W(e5, { row: n4, column: t5 }, $l);
              });
            });
          }), e5;
        }(e4);
      case B.UP_ARROW:
        return null === (c2 = e4.hiddenFocusElement) || void 0 === c2 || c2.focus(), ya(e4);
      case B.DOWN_ARROW:
        return null === (s2 = e4.hiddenFocusElement) || void 0 === s2 || s2.focus(), xa(e4);
      case B.LEFT_ARROW:
        return null === (u2 = e4.hiddenFocusElement) || void 0 === u2 || u2.focus(), ba(e4);
      case B.RIGHT_ARROW:
        return null === (d2 = e4.hiddenFocusElement) || void 0 === d2 || d2.focus(), va(e4);
      case B.TAB:
        return null === (g2 = e4.hiddenFocusElement) || void 0 === g2 || g2.focus(), t3.preventDefault(), R2 ? va(e4) : Fa(e4, "right", w2, I2);
      case B.HOME:
        return null === (p2 = e4.hiddenFocusElement) || void 0 === p2 || p2.focus(), ha(e4);
      case B.END:
        return null === (f2 = e4.hiddenFocusElement) || void 0 === f2 || f2.focus(), ma(e4);
      case B.PAGE_UP:
        return null === (h2 = e4.hiddenFocusElement) || void 0 === h2 || h2.focus(), wa(e4);
      case B.PAGE_DOWN:
        return null === (m2 = e4.hiddenFocusElement) || void 0 === m2 || m2.focus(), Ca(e4);
      case B.ENTER:
        var k2 = (null === (v2 = e4.props) || void 0 === v2 ? void 0 : v2.moveRightOnEnter) ? C(C({}, va(e4, t3.keyCode)), { currentlyEditedCell: void 0 }) : C(C({}, xa(e4, t3.keyCode)), { currentlyEditedCell: void 0 });
        return null === (y2 = e4.hiddenFocusElement) || void 0 === y2 || y2.focus(), R2 ? k2 : Fa(e4, "right", w2, I2);
      case B.ESCAPE:
        return t3.preventDefault(), null === (x2 = e4.hiddenFocusElement) || void 0 === x2 || x2.focus(), e4.currentlyEditedCell ? C(C({}, e4), { currentlyEditedCell: void 0 }) : e4;
    }
    return e4;
  }(e3, t2);
  return n2 !== e3 && (t2.stopPropagation(), t2.preventDefault()), n2;
}
function Fa(e3, t2, n2, o2) {
  var r2 = e3.activeSelectedRangeIdx, i2 = n2 ? n2.columns.length : 0, l2 = n2 ? n2.rows.length : 0, a2 = "up" === t2 || "left" === t2 ? -1 : 1, c2 = "up" === t2 || "down" === t2 ? o2.row.idx - n2.first.row.idx + (o2.column.idx - n2.first.column.idx) * l2 : (o2.row.idx - n2.first.row.idx) * i2 + (o2.column.idx - n2.first.column.idx), s2 = (c2 + a2) % (n2.rows.length * n2.columns.length), u2 = s2 < 0 && 0 === c2 || 1 === l2 && 1 === i2 && -1 === a2, d2 = 0 === s2 && c2 === n2.rows.length * n2.columns.length - 1 && (l2 >= 3 && i2 >= 1 || l2 >= 1 && i2 >= 3) || 0 === s2 && c2 === n2.rows.length * n2.columns.length - 1 && (2 === l2 && i2 >= 1 || l2 >= 1 && 2 === i2) && 1 === a2 || s2 < 0 && 0 === c2 || 1 === l2 && 1 === i2 && 1 === a2;
  if (u2) {
    var g2 = 0 === r2 ? e3.selectedRanges.length - 1 : (r2 - 1) % e3.selectedRanges.length, p2 = e3.selectedRanges[g2];
    return e3 = X(e3, M(p2.last.row, p2.last.column), false), C(C({}, e3), { activeSelectedRangeIdx: g2 });
  }
  if (d2) {
    g2 = (r2 + 1) % e3.selectedRanges.length, p2 = e3.selectedRanges[g2];
    return e3 = X(e3, M(p2.first.row, p2.first.column), false), C(C({}, e3), { activeSelectedRangeIdx: g2 });
  }
  var f2 = "up" === t2 || "down" === t2 ? Math.floor(s2 / l2) : s2 % i2, h2 = "up" === t2 || "down" === t2 ? s2 % l2 : Math.floor(s2 / i2), m2 = n2.first.column.idx + f2, b2 = n2.first.row.idx + h2;
  return e3 = X(e3, e3.cellMatrix.getLocation(b2, m2), !n2 || !(n2.columns.length > 1 || n2.rows.length > 1));
}
function Za(e3) {
  var t2 = e3.cellMatrix.ranges, n2 = t2.stickyBottomRange, o2 = t2.stickyTopRange;
  return ae(e3, n2.height + o2.height);
}
function Va(e3, t2, n2, o2, r2, i2) {
  var l2, a2, c2;
  if (!e3.enableRangeSelection) return e3;
  var s2 = e3.cellMatrix.getLocation(o2, t2), u2 = e3.cellMatrix.getLocation(r2, n2), d2 = e3.selectedRanges.slice();
  if (d2[e3.activeSelectedRangeIdx] = e3.cellMatrix.getRange(s2, u2), i2) {
    var g2 = e3.focusedLocation;
    if (!g2) return e3;
    var p2 = 0, f2 = 0;
    switch (i2) {
      case "horizontal":
        p2 = g2.row.idx, f2 = g2.column.idx !== t2 ? t2 : n2;
        break;
      case "vertical":
        p2 = g2.row.idx !== o2 ? o2 : r2, f2 = g2.column.idx;
    }
    var h2 = xe(e3, e3.cellMatrix.getLocation(p2, f2), i2), m2 = h2.left;
    le(e3, h2.top, m2);
  }
  return (null === (l2 = e3.props) || void 0 === l2 ? void 0 : l2.onSelectionChanging) && !e3.props.onSelectionChanging(d2) ? e3 : (null === (c2 = null === (a2 = e3.props) || void 0 === a2 ? void 0 : a2.onSelectionChanged) || void 0 === c2 || c2.call(a2, d2), C(C({}, e3), { selectedRanges: d2 }));
}
var Oa = function(e3) {
  function t2() {
    var t3 = null !== e3 && e3.apply(this, arguments) || this;
    return t3.autoScrollDirection = "horizontal", t3;
  }
  return w(t2, e3), t2.prototype.handlePointerDown = function(e4, t3, n2) {
    return this.initialColumn = t3.column, n2 = Fc(e4) && "column" === n2.selectionMode && n2.selectedIds.some(function(e5) {
      return e5 === t3.column.columnId;
    }) ? function(e5, t4) {
      var n3 = e5.selectedIndexes.filter(function(e6) {
        return e6 !== t4.idx;
      }), o2 = e5.selectedIds.filter(function(e6) {
        return e6 !== t4.columnId;
      });
      return C(C({}, e5), { selectionMode: "column", selectedIndexes: n3, selectedIds: o2 });
    }(n2, t3.column) : e4.shiftKey && n2.focusedLocation ? T(n2, n2.focusedLocation.column, t3.column, Fc(e4)) : function(e5, t4, n3) {
      return C(C({}, e5), { selectionMode: "column", selectedIndexes: (n3 && "column" === e5.selectionMode ? e5.selectedIndexes : []).concat(t4.idx), selectedIds: (n3 && "column" === e5.selectionMode ? e5.selectedIds : []).concat(t4.columnId) });
    }(n2 = X(n2, t3, false), t3.column, Fc(e4));
  }, t2.prototype.handlePointerEnter = function(e4, t3, n2) {
    return T(n2, this.initialColumn, t3.column, Fc(e4));
  }, t2.prototype.handlePointerUp = function(e4, t3, n2) {
    var o2, r2;
    if ((null === (o2 = n2.props) || void 0 === o2 ? void 0 : o2.onSelectionChanging) && !n2.props.onSelectionChanging(n2.selectedRanges)) {
      var i2 = E([], n2.selectedRanges, true).filter(function(e5, t4) {
        return t4 !== n2.activeSelectedRangeIdx;
      });
      return C(C({}, n2), { selectedRanges: i2, activeSelectedRangeIdx: i2.length - 1 });
    }
    return (null === (r2 = n2.props) || void 0 === r2 ? void 0 : r2.onSelectionChanged) && n2.props.onSelectionChanged(n2.selectedRanges), n2;
  }, t2.prototype.handleContextMenu = function(e4, t3) {
    return ee(e4, t3);
  }, t2;
}(L);
var Da = function(e3) {
  function t2() {
    var t3 = null !== e3 && e3.apply(this, arguments) || this;
    return t3.autoScrollDirection = "vertical", t3;
  }
  return w(t2, e3), t2.prototype.handlePointerDown = function(e4, t3, n2) {
    return this.initialRow = t3.row, n2 = Fc(e4) && "row" === n2.selectionMode && n2.selectedIds.some(function(e5) {
      return e5 === t3.row.rowId;
    }) ? function(e5, t4) {
      var n3 = e5.selectedIndexes.filter(function(e6) {
        return e6 !== t4.idx;
      }), o2 = e5.selectedIds.filter(function(e6) {
        return e6 !== t4.rowId;
      });
      return C(C({}, e5), { selectionMode: "row", selectedIndexes: n3, selectedIds: o2 });
    }(n2, t3.row) : e4.shiftKey && n2.focusedLocation ? S(n2, n2.focusedLocation.row, t3.row, Fc(e4)) : function(e5, t4, n3) {
      return C(C({}, e5), { selectionMode: "row", selectedIndexes: (n3 && "row" === e5.selectionMode ? e5.selectedIndexes : []).concat(t4.idx), selectedIds: (n3 && "row" === e5.selectionMode ? e5.selectedIds : []).concat(t4.rowId) });
    }(n2 = X(n2, t3, false), t3.row, Fc(e4));
  }, t2.prototype.handlePointerEnter = function(e4, t3, n2) {
    return S(n2, this.initialRow, t3.row, Fc(e4));
  }, t2.prototype.handlePointerUp = function(e4, t3, n2) {
    var o2, r2;
    if ((null === (o2 = n2.props) || void 0 === o2 ? void 0 : o2.onSelectionChanging) && !n2.props.onSelectionChanging(n2.selectedRanges)) {
      var i2 = E([], n2.selectedRanges, true).filter(function(e5, t4) {
        return t4 !== n2.activeSelectedRangeIdx;
      });
      return C(C({}, n2), { selectedRanges: i2, activeSelectedRangeIdx: i2.length - 1 });
    }
    return (null === (r2 = n2.props) || void 0 === r2 ? void 0 : r2.onSelectionChanged) && n2.props.onSelectionChanged(n2.selectedRanges), n2;
  }, t2.prototype.handleContextMenu = function(e4, t3) {
    return ee(e4, t3);
  }, t2;
}(L);
var Ya = function(t2) {
  var n2 = t2.range, o2 = t2.pane, r2 = t2.style, i2 = t2.className, l2 = n2.first.row.idx <= o2.first.row.idx ? o2.first.row.top : n2.first.row.top, a2 = n2.first.column.idx <= o2.first.column.idx ? o2.first.column.left : n2.first.column.left, c2 = (n2.last.column.idx > o2.last.column.idx ? o2.last.column.right : n2.last.column.right) - a2, s2 = (n2.last.row.idx > o2.last.row.idx ? o2.last.row.bottom : n2.last.row.bottom) - l2, u2 = n2.first.row.idx >= o2.first.row.idx, d2 = n2.last.row.idx <= o2.last.row.idx, g2 = n2.last.column.idx <= o2.last.column.idx, p2 = n2.first.column.idx >= o2.first.column.idx;
  return e.createElement("div", { className: "rg-partial-area ".concat(i2), key: n2.first.column.idx + o2.last.column.idx, style: C(C({}, r2), { top: l2 - (0 === l2 ? 0 : 1), left: a2 - (0 === a2 ? 0 : 1), width: c2 + (0 === a2 ? 0 : 1), height: s2 + (0 === l2 ? 0 : 1), borderTop: u2 ? r2.borderTop : "unset", borderBottom: d2 ? r2.borderBottom : "unset", borderRight: g2 ? r2.borderRight : "unset", borderLeft: p2 ? r2.borderLeft : "unset" }) });
};
function za(e3, t2) {
  return t2.first.column.idx <= e3.last.column.idx && t2.first.row.idx <= e3.last.row.idx && t2.last.column.idx >= e3.first.column.idx && t2.last.row.idx >= e3.first.row.idx;
}
var Ja = function(e3) {
  function n2() {
    var t2 = null !== e3 && e3.apply(this, arguments) || this;
    return t2.fillDirection = "", t2;
  }
  return w(n2, e3), n2.prototype.handlePointerEnter = function(e4, t2, n3) {
    var o2 = Kl(n3);
    return this.fillDirection = this.getFillDirection(o2, t2), this.fillRange = this.getFillRange(n3.cellMatrix, o2, t2, this.fillDirection), C({}, n3);
  }, n2.prototype.handlePointerUp = function(e4, t2, n3) {
    var o2, r2, i2, l2, a2, c2, s2, u2, d2 = this, g2 = Kl(n3), p2 = n3.cellMatrix;
    if (!g2 || void 0 === this.fillRange) return n3;
    var f2 = V() ? e4.altKey : e4.ctrlKey;
    this.fillRange = n3.cellMatrix.validateRange(this.fillRange);
    var h2 = function(e5) {
      return P(n3, e5);
    }, m2 = function(e5, t3) {
      var n4 = e5.map(function(e6) {
        return e6.value;
      }), o3 = d2.findRegressionFunction(n4, Array.from({ length: n4.length }, function(e6, t4) {
        return t4 + 1;
      })), r3 = isNaN(o3.a) && isNaN(o3.b);
      return t3.map(function(t4, i3) {
        var l3 = d2.calculateXForRegressionFunction(i3 + n4.length + 1, o3.a, o3.b), a3 = e5[i3 % e5.length];
        return C(C(C({}, t4), "checkbox" === t4.type && { checked: "checked" in a3 ? a3.checked : !!a3.value }), { text: r3 || f2 ? a3.text : l3.toString(), groupId: a3.groupId, value: r3 || f2 ? a3.value : l3 });
      });
    }, b2 = function(e5, t3, n4) {
      return t3.columns.forEach(function(o3) {
        var r3 = t3.rows.map(function(e6) {
          return h2(M(e6, o3)).cell;
        });
        if (r3 = "up" === n4 ? r3.reverse() : r3, d2.fillRange) {
          var i3 = d2.fillRange.rows.map(function(e6) {
            return h2(M(e6, o3)).cell;
          });
          i3 = m2(r3, i3), i3 = "up" === n4 ? i3.reverse() : i3, e5 = d2.fillColumn(e5, o3, i3);
        }
      }), e5;
    }, v2 = function(e5, t3, n4) {
      return t3.rows.forEach(function(o3) {
        var r3 = t3.columns.map(function(e6) {
          return h2(M(o3, e6)).cell;
        });
        if (r3 = "left" === n4 ? r3.reverse() : r3, d2.fillRange) {
          var i3 = d2.fillRange.columns.map(function(e6) {
            return h2(M(o3, e6)).cell;
          });
          i3 = m2(r3, i3), i3 = "left" === n4 ? i3.reverse() : i3, e5 = d2.fillRow(e5, o3, i3);
        }
      }), e5;
    };
    switch (this.fillDirection) {
      case "right":
        var y2 = p2.getRange(g2.first, M(g2.last.row, t2.column));
        if ((null === (o2 = null == (n3 = v2(n3, g2, "right")) ? void 0 : n3.props) || void 0 === o2 ? void 0 : o2.onSelectionChanging) && !n3.props.onSelectionChanging([y2])) return n3;
        (null === (r2 = (n3 = C(C({}, n3), { selectedRanges: [y2], selectedIds: E(E([], g2.columns.map(function(e5) {
          return e5.columnId;
        }), true), this.fillRange.columns.map(function(e5) {
          return e5.columnId;
        }), true) })).props) || void 0 === r2 ? void 0 : r2.onSelectionChanged) && n3.props.onSelectionChanged(n3.selectedRanges);
        break;
      case "left":
        y2 = p2.getRange(g2.last, M(g2.first.row, t2.column));
        if ((null === (i2 = null == (n3 = v2(n3, g2, "left")) ? void 0 : n3.props) || void 0 === i2 ? void 0 : i2.onSelectionChanging) && !n3.props.onSelectionChanging([y2])) return n3;
        (null === (l2 = (n3 = C(C({}, n3), { selectedRanges: [y2], selectedIds: E(E([], g2.columns.map(function(e5) {
          return e5.columnId;
        }), true), this.fillRange.columns.map(function(e5) {
          return e5.columnId;
        }), true) })).props) || void 0 === l2 ? void 0 : l2.onSelectionChanged) && n3.props.onSelectionChanged(n3.selectedRanges);
        break;
      case "up":
        y2 = p2.getRange(g2.last, { row: t2.row, column: g2.first.column });
        if ((null === (a2 = null == (n3 = b2(n3, g2, "up")) ? void 0 : n3.props) || void 0 === a2 ? void 0 : a2.onSelectionChanging) && !n3.props.onSelectionChanging([y2])) return n3;
        (null === (c2 = (n3 = C(C({}, n3), { selectedRanges: [y2], selectedIds: E(E([], g2.rows.map(function(e5) {
          return e5.rowId;
        }), true), this.fillRange.rows.map(function(e5) {
          return e5.rowId;
        }), true) })).props) || void 0 === c2 ? void 0 : c2.onSelectionChanged) && n3.props.onSelectionChanged(n3.selectedRanges);
        break;
      case "down":
        y2 = p2.getRange(g2.first, M(t2.row, g2.last.column));
        if ((null === (s2 = null == (n3 = b2(n3, g2, "down")) ? void 0 : n3.props) || void 0 === s2 ? void 0 : s2.onSelectionChanging) && !n3.props.onSelectionChanging([y2])) return n3;
        (null === (u2 = (n3 = C(C({}, n3), { selectedRanges: [y2], selectedIds: E(E([], g2.rows.map(function(e5) {
          return e5.rowId;
        }), true), this.fillRange.rows.map(function(e5) {
          return e5.rowId;
        }), true) })).props) || void 0 === u2 ? void 0 : u2.onSelectionChanged) && n3.props.onSelectionChanged(n3.selectedRanges);
    }
    return n3;
  }, n2.prototype.calculateXForRegressionFunction = function(e4, t2, n3) {
    return Math.round((e4 - t2) / n3 * 1e5) / 1e5;
  }, n2.prototype.findRegressionFunction = function(e4, t2) {
    var n3 = this.sumArray(e4), o2 = this.sumArray(t2), r2 = this.sumArray(this.multipleArrays(e4, t2)), i2 = this.sumArray(this.powerArray(e4, 2)), l2 = e4.length, a2 = Math.fround(l2 * r2 - n3 * o2) / Math.fround(l2 * i2 - Math.pow(n3, 2));
    return { a: o2 / l2 - a2 * (n3 / l2), b: a2 };
  }, n2.prototype.sumArray = function(e4) {
    return e4.reduce(function(e5, t2) {
      return e5 + t2;
    });
  }, n2.prototype.multipleArrays = function(e4, t2) {
    for (var n3 = [], o2 = e4.length <= t2.length ? e4.length : t2.length, r2 = 0; r2 < o2; ++r2) n3.push(e4[r2] * t2[r2]);
    return n3;
  }, n2.prototype.powerArray = function(e4, t2) {
    return e4.map(function(e5) {
      return Math.pow(e5, t2);
    });
  }, n2.prototype.renderPanePart = function(e4, n3) {
    return this.fillDirection && this.fillRange && za(n3, this.fillRange) && import_react.default.createElement(Ya, { range: e4.cellMatrix.validateRange(this.fillRange), className: "rg-partial-area-part", pane: n3, style: { backgroundColor: "", borderTop: "down" === this.fillDirection ? "0px solid transparent" : "", borderBottom: "up" === this.fillDirection ? "0px solid transparent" : "", borderLeft: "right" === this.fillDirection ? "0px solid transparent" : "", borderRight: "left" === this.fillDirection ? "0px solid transparent" : "" } });
  }, n2.prototype.getFillDirection = function(e4, t2) {
    var n3 = [];
    return n3.push({ direction: "", value: 0 }), n3.push({ direction: "up", value: t2.row.idx < e4.first.row.idx ? e4.first.row.idx - t2.row.idx : 0 }), n3.push({ direction: "down", value: t2.row.idx > e4.last.row.idx ? t2.row.idx - e4.last.row.idx : 0 }), n3.push({ direction: "left", value: t2.column.idx < e4.first.column.idx ? e4.first.column.idx - t2.column.idx : 0 }), n3.push({ direction: "right", value: t2.column.idx > e4.last.column.idx ? t2.column.idx - e4.last.column.idx : 0 }), n3.reduce(function(e5, t3) {
      return e5.value >= t3.value ? e5 : t3;
    }).direction;
  }, n2.prototype.getFillRange = function(e4, t2, n3, o2) {
    switch (o2) {
      case "right":
        return e4.getRange(e4.getLocation(t2.first.row.idx, e4.last.column.idx < t2.last.column.idx + 1 ? e4.last.column.idx : t2.last.column.idx + 1), M(t2.last.row, n3.column));
      case "left":
        return e4.getRange(M(t2.first.row, n3.column), e4.getLocation(t2.last.row.idx, e4.first.column.idx > t2.first.column.idx - 1 ? e4.first.column.idx : t2.first.column.idx - 1));
      case "up":
        return e4.getRange(M(n3.row, t2.first.column), e4.getLocation(e4.first.row.idx > t2.first.row.idx - 1 ? e4.first.row.idx : t2.first.row.idx - 1, t2.last.column.idx));
      case "down":
        return e4.getRange(e4.getLocation(e4.last.row.idx < t2.last.row.idx + 1 ? e4.last.row.idx : t2.last.row.idx + 1, t2.first.column.idx), M(n3.row, t2.last.column));
    }
  }, n2.prototype.fillRow = function(e4, t2, n3) {
    var o2;
    return null === (o2 = this.fillRange) || void 0 === o2 || o2.columns.forEach(function(o3, r2) {
      e4 = ra(e4, M(t2, o3), n3[r2]);
    }), e4;
  }, n2.prototype.fillColumn = function(e4, t2, n3) {
    var o2;
    return null === (o2 = this.fillRange) || void 0 === o2 || o2.rows.forEach(function(o3, r2) {
      e4 = ra(e4, M(o3, t2), n3[r2]);
    }), e4;
  }, n2;
}(L);
var ja = function(e3) {
  function t2() {
    var t3 = null !== e3 && e3.apply(this, arguments) || this;
    return t3.autoScrollDirection = "vertical", t3;
  }
  return w(t2, e3), t2.prototype.handlePointerDown = function(e4, t3, n2) {
    this.initialRowIdx = t3.row.idx, this.lastPossibleDropLocation = t3;
    var o2 = n2.selectedIndexes.sort(), r2 = o2.map(function(e5) {
      return n2.cellMatrix.rows[e5];
    }), i2 = o2.filter(function(e5) {
      return e5 < t3.row.idx;
    }), l2 = i2.map(function(e5) {
      return n2.cellMatrix.rows[e5];
    }), a2 = l2.reduce(function(e5, t4) {
      return e5 + t4.height;
    }, 0);
    return this.pointerOffset = a2 + t3.cellY, this.selectedIds = r2.map(function(e5) {
      return e5.rowId;
    }), C(C({}, n2), { lineOrientation: "horizontal", shadowSize: r2.reduce(function(e5, t4) {
      return e5 + t4.height;
    }, 0), shadowPosition: this.getShadowPosition(t3, n2) });
  }, t2.prototype.handlePointerMove = function(e4, t3, n2) {
    var o2, r2, i2 = this.getShadowPosition(t3, n2), l2 = "-webkit-grabbing", a2 = n2.linePosition, c2 = F(n2.scrollableElement).scrollTop, s2 = t3.viewportY + 0;
    if (this.lastPossibleDropLocation = this.getLastPossibleDropLocation(n2, t3), this.lastPossibleDropLocation && this.lastPossibleDropLocation.row.idx !== this.initialRowIdx) {
      var u2 = this.lastPossibleDropLocation.row.idx > this.initialRowIdx;
      a2 = Math.min(this.lastPossibleDropLocation.viewportY - this.lastPossibleDropLocation.cellY + (u2 ? this.lastPossibleDropLocation.row.height : 0), ((null === (o2 = n2.visibleRange) || void 0 === o2 ? void 0 : o2.height) || 0) + n2.cellMatrix.ranges.stickyTopRange.height + n2.cellMatrix.ranges.stickyBottomRange.height + c2), (null === (r2 = n2.props) || void 0 === r2 ? void 0 : r2.canReorderRows) ? n2.props.canReorderRows && n2.props.canReorderRows(this.lastPossibleDropLocation.row.rowId, this.selectedIds, this.position) ? u2 ? s2 > t3.row.top + n2.cellMatrix.ranges.stickyTopRange.height && s2 < t3.row.top + n2.cellMatrix.ranges.stickyTopRange.height + t3.row.height / 2 ? (this.position = "on", l2 = "move", a2 = -1) : this.position = "after" : s2 > t3.row.top + n2.cellMatrix.ranges.stickyTopRange.height + t3.row.height / 2 && s2 < t3.row.top + n2.cellMatrix.ranges.stickyTopRange.height + t3.row.height ? (this.position = "on", l2 = "move", a2 = -1) : this.position = "before" : a2 = -1 : this.position = u2 ? "after" : "before";
    }
    return C(C({}, n2), { shadowPosition: i2, linePosition: a2, shadowCursor: l2 });
  }, t2.prototype.getShadowPosition = function(e4, t3) {
    var n2 = e4.viewportY - this.pointerOffset, o2 = t3.cellMatrix.height - t3.shadowSize;
    return n2 < 0 ? 0 : n2 > o2 ? o2 : n2;
  }, t2.prototype.getLastPossibleDropLocation = function(e4, t3) {
    var n2;
    return !(null === (n2 = e4.props) || void 0 === n2 ? void 0 : n2.canReorderRows) || e4.props.canReorderRows(t3.row.rowId, this.selectedIds, this.position) ? t3 : this.lastPossibleDropLocation;
  }, t2.prototype.handlePointerUp = function(e4, t3, n2) {
    var o2, r2;
    return t3.row.idx !== this.initialRowIdx && this.lastPossibleDropLocation && (null === (o2 = n2.props) || void 0 === o2 ? void 0 : o2.onRowsReordered) && (null === (r2 = n2.props) || void 0 === r2 || r2.onRowsReordered(this.lastPossibleDropLocation.row.rowId, this.selectedIds, this.position)), C(C({}, n2), { linePosition: -1, shadowPosition: -1, shadowCursor: "default" });
  }, t2.prototype.handleContextMenu = function(e4, t3) {
    return ee(e4, t3);
  }, t2;
}(L);
function Ua() {
  return "undefined" != typeof window && (-1 !== window.navigator.userAgent.indexOf("Safari") && -1 === navigator.userAgent.indexOf("Chrome"));
}
function _a(e3, t2, n2) {
  void 0 === n2 && (n2 = false);
  var o2 = Kl(t2);
  return o2 ? (Qa(e3, t2, ql(t2, o2, n2).div), C(C({}, t2), { copyRange: o2 })) : t2;
}
function Qa(e3, t2, n2) {
  var o2, r2, i2 = !!(null === (o2 = null === navigator || void 0 === navigator ? void 0 : navigator.clipboard) || void 0 === o2 ? void 0 : o2.write);
  if (Ua()) e3.clipboardData.setData("text/html", n2.innerHTML);
  else if (i2) {
    var l2 = { "text/html": new Blob([n2.innerHTML], { type: "text/html" }), "text/plain": new Blob([n2.textContent || ""], { type: "text/plain" }) }, a2 = new ClipboardItem(l2);
    navigator.clipboard.write([a2]).catch(function(e4) {
      console.error("Error copying to clipboard: ", e4);
    });
  } else document.body.appendChild(n2), n2.focus(), document.execCommand("selectAll", false), document.execCommand("copy"), document.body.removeChild(n2);
  null === (r2 = t2.hiddenFocusElement) || void 0 === r2 || r2.focus({ preventScroll: true }), e3.preventDefault();
}
function Ka(e3, t2) {
  var n2, o2;
  if (!Kl(t2)) return t2;
  var r2 = [], i2 = e3.clipboardData.getData("text/html"), l2 = new DOMParser().parseFromString(i2, "text/html");
  if ("reactgrid-content" === (null === (n2 = l2.body.firstElementChild) || void 0 === n2 ? void 0 : n2.getAttribute("data-reactgrid")) && (null === (o2 = l2.body.firstElementChild) || void 0 === o2 ? void 0 : o2.firstElementChild)) for (var a2 = l2.body.firstElementChild.firstElementChild.children, c2 = 0; c2 < a2.length; c2++) {
    for (var s2 = [], u2 = 0; u2 < a2[c2].children.length; u2++) {
      var d2 = a2[c2].children[u2].getAttribute("data-reactgrid"), g2 = d2 && JSON.parse(d2), p2 = a2[c2].children[u2].innerHTML;
      s2.push(g2 || { type: "text", text: p2, value: at(p2) });
    }
    r2.push(s2);
  }
  else r2 = e3.clipboardData.getData("text/plain").replace(/(\r\n)$/, "").split("\n").map(function(e4) {
    return e4.split("	").map(function(e5) {
      var t3 = function(e6) {
        if (!/^\d{4}-\d{2}-\d{2}$|^\d{2}\/\d{2}\/\d{4}$|^\d{2}\.\d{2}\.\d{4}$|^\d{2}-\d{2}-\d{4}$|^\d{4}\.\d{2}\.\d{2}$/.test(e6)) return null;
        var t4 = Date.parse(e6);
        return isNaN(t4) ? null : new Date(t4);
      }(e5);
      return t3 ? { type: "date", text: e5, value: t3.getTime() } : { type: "text", text: e5, value: at(e5) };
    });
  });
  return e3.preventDefault(), C({}, ia(t2, r2));
}
var $a = function(e3) {
  function n2() {
    var t2 = null !== e3 && e3.apply(this, arguments) || this;
    return t2.autoScrollDirection = "vertical", t2;
  }
  return w(n2, e3), n2.prototype.handlePointerDown = function(e4, t2, n3) {
    var o2 = this;
    return this.initialLocation = t2, this.resizedRow = t2.row, this.isInScrollableRange = n3.cellMatrix.scrollableRange.rows.some(function(e5) {
      return e5.idx === o2.resizedRow.idx;
    }), n3;
  }, n2.prototype.handlePointerMove = function(e4, t2, n3) {
    var o2, r2, i2, l2, a2 = t2.viewportY;
    if (!(t2.row.idx === this.resizedRow.idx && t2.cellY > (null !== (r2 = null === (o2 = n3.props) || void 0 === o2 ? void 0 : o2.minRowHeight) && void 0 !== r2 ? r2 : h.MIN_ROW_HEIGHT) || t2.row.idx > this.resizedRow.idx)) {
      var c2 = this.getLinePositionOffset(n3);
      a2 = (null !== (l2 = null === (i2 = n3.props) || void 0 === i2 ? void 0 : i2.minRowHeight) && void 0 !== l2 ? l2 : h.MIN_ROW_HEIGHT) + this.resizedRow.top + c2;
    }
    return C(C({}, n3), { linePosition: a2, lineOrientation: "horizontal" });
  }, n2.prototype.handlePointerUp = function(e4, t2, n3) {
    var o2, r2, i2, l2, a2, c2 = this.resizedRow.height + t2.viewportY - this.initialLocation.viewportY;
    if (null === (o2 = n3.props) || void 0 === o2 ? void 0 : o2.onRowResized) {
      var s2 = c2 >= (null !== (i2 = null === (r2 = n3.props) || void 0 === r2 ? void 0 : r2.minRowHeight) && void 0 !== i2 ? i2 : h.MIN_ROW_HEIGHT) ? c2 : null !== (a2 = null === (l2 = n3.props) || void 0 === l2 ? void 0 : l2.minRowHeight) && void 0 !== a2 ? a2 : h.MIN_ROW_HEIGHT;
      n3.props.onRowResized(this.resizedRow.rowId, s2, n3.selectedIds);
    }
    var u2 = n3.focusedLocation;
    if (void 0 !== u2 && this.resizedRow.rowId === u2.row.idx) {
      var d2 = C(C({}, u2.row), { height: c2 });
      u2 = C(C({}, u2), { row: d2 });
    }
    return C(C({}, n3), { linePosition: -1, focusedLocation: u2 });
  }, n2.prototype.renderPanePart = function(e4, n3) {
    var o2 = this.getLinePositionOffset(e4);
    return n3.contains(this.initialLocation) && import_react.default.createElement(oe, { top: this.resizedRow.top, linePosition: e4.linePosition, offset: o2 });
  }, n2.prototype.getLinePositionOffset = function(e4) {
    var t2 = this, n3 = F(e4.scrollableElement).scrollTop, o2 = z(e4).top, r2 = j(n3, o2), i2 = J(e4).height + r2 - e4.cellMatrix.ranges.stickyBottomRange.height;
    return e4.cellMatrix.scrollableRange.rows.some(function(e5) {
      return e5.idx === t2.resizedRow.idx;
    }) ? e4.cellMatrix.ranges.stickyTopRange.height : e4.cellMatrix.ranges.stickyBottomRange.rows.some(function(e5) {
      return e5.idx === t2.resizedRow.idx;
    }) ? i2 : n3;
  }, n2;
}(L);
var qa = function(e3) {
  function t2() {
    return null !== e3 && e3.apply(this, arguments) || this;
  }
  return w(t2, e3), t2.prototype.handlePointerDown = function(e4, t3, n2) {
    return (n2 = C(C({}, n2), { currentBehavior: this.getNewBehavior(e4, t3, n2), contextMenuPosition: { top: -1, left: -1 } })).currentBehavior.handlePointerDown(e4, t3, n2);
  }, t2.prototype.getNewBehavior = function(e4, t3, n2) {
    var o2, r2, i2, l2, a2 = P(n2, t3).cell, c2 = e4.target;
    return ("mouse" === e4.pointerType && "rg-resize-handle" === c2.className || "touch" === e4.pointerType && ("rg-touch-column-resize-handle" === c2.className || "rg-resize-handle" === c2.className)) && (0 === t3.row.idx || "header" === a2.type) && t3.column.resizable && t3.cellX > t3.column.width - ((null === (r2 = null === (o2 = n2.reactGridElement) || void 0 === o2 ? void 0 : o2.querySelector(".rg-resize-handle")) || void 0 === r2 ? void 0 : r2.clientWidth) || 0) - F(n2.scrollableElement).scrollLeft ? new re() : ("mouse" === e4.pointerType && "rg-resize-handle" === c2.className || "touch" === e4.pointerType && ("rg-touch-row-resize-handle" === c2.className || "rg-resize-handle" === c2.className)) && 0 === t3.column.idx && t3.row.resizable && t3.cellY > t3.row.height - ((null === (l2 = null === (i2 = n2.reactGridElement) || void 0 === i2 ? void 0 : i2.querySelector(".rg-resize-handle")) || void 0 === l2 ? void 0 : l2.clientHeight) || 0) - F(n2.scrollableElement).scrollTop ? new $a() : n2.enableColumnSelection && 0 === t3.row.idx && n2.selectedIds.includes(t3.column.columnId) && !Fc(e4) && "column" === n2.selectionMode && t3.column.reorderable ? new ie() : n2.enableColumnSelection && 0 === t3.row.idx && "rg-fill-handle" !== c2.className && "rg-touch-fill-handle" !== c2.className ? new Oa() : n2.enableRowSelection && 0 === t3.column.idx && n2.selectedIds.includes(t3.row.rowId) && !Fc(e4) && "row" === n2.selectionMode && t3.row.reorderable ? new ja() : n2.enableRowSelection && 0 === t3.column.idx && "rg-fill-handle" !== c2.className && "rg-touch-fill-handle" !== c2.className ? new Da() : ("mouse" === e4.pointerType && "rg-fill-handle" === c2.className || "touch" === e4.pointerType && ("rg-touch-fill-handle" === c2.className || "rg-fill-handle" === c2.className)) && n2.enableFillHandle ? new Ja() : new te();
  }, t2.prototype.handleContextMenu = function(e4, t3) {
    return ee(e4, t3);
  }, t2.prototype.handleDoubleClick = function(e4, t3, n2) {
    return Zc(e4, t3, n2);
  }, t2.prototype.handleKeyDown = function(e4, t3) {
    return Ha(t3, e4);
  }, t2.prototype.handleKeyUp = function(e4, t3) {
    return Vc(e4, t3);
  }, t2.prototype.handleCompositionEnd = function(e4, t3) {
    return Oc(e4, t3);
  }, t2.prototype.handleCopy = function(e4, t3) {
    return _a(e4, t3);
  }, t2.prototype.handlePaste = function(e4, t3) {
    return Ka(e4, t3);
  }, t2.prototype.handleCut = function(e4, t3) {
    return _a(e4, t3, true);
  }, t2;
}(L);
var ec = { legacyBrowserMode: "undefined" != typeof window && window.navigator.userAgent.indexOf("Trident") > 0 || "undefined" != typeof window && window.navigator.userAgent.indexOf("Edge/") > 0, focusedLocation: void 0, currentBehavior: new qa(), cellTemplates: vl, hiddenFocusElement: void 0, reactGridElement: void 0, scrollableElement: void 0, queuedCellChanges: [], currentlyEditedCell: void 0, highlightLocations: [], visibleRange: void 0, topScrollBoudary: -1, bottomScrollBoudary: -1, leftScrollBoudary: -1, rightScrollBoudary: -1, enableGroupIdRender: false, leftStickyColumns: void 0, topStickyRows: void 0, enableFillHandle: false, enableRangeSelection: true, enableColumnSelection: false, enableRowSelection: false, contextMenuPosition: { top: -1, left: -1 }, lineOrientation: "horizontal", linePosition: -1, shadowSize: 0, shadowPosition: -1, shadowCursor: "default", selectionMode: "range", selectedRanges: [], selectedIndexes: [], selectedIds: [], activeSelectedRangeIdx: 0, copyRange: void 0, rightStickyColumns: void 0, bottomStickyRows: void 0, disableVirtualScrolling: false };
var tc = function(e3, t2) {
  var n2 = t2.cellMatrix, o2 = function(e4, t3, n3) {
    if (e4.ranges.stickyRightRange.first.column && t3.column.idx >= e4.ranges.stickyRightRange.first.column.idx) {
      var o3 = F(n3.scrollableElement).scrollLeft, r2 = z(n3).left, i2 = j(o3, r2);
      return J(n3).width + i2 - e4.ranges.stickyRightRange.width;
    }
  }(n2, e3, t2) || cc(n2, e3) || uc(n2, e3, t2);
  return o2 || 0;
};
var nc = function(e3, t2) {
  var n2 = t2.cellMatrix, o2 = function(e4, t3, n3) {
    if (e4.ranges.stickyBottomRange.first.row && t3.row.idx >= e4.ranges.stickyBottomRange.first.row.idx) {
      var o3 = F(n3.scrollableElement).scrollTop, r2 = z(n3).top, i2 = j(o3, r2);
      return J(n3).height + i2 - e4.ranges.stickyBottomRange.height;
    }
  }(n2, e3, t2) || sc(n2, e3) || dc(n2, e3, t2);
  return o2 || 0;
};
var oc = function(e3) {
  var t2 = e3.state, n2 = e3.location, o2 = F(t2.scrollableElement), r2 = o2.scrollTop, i2 = o2.scrollLeft, l2 = z(t2), a2 = l2.top, c2 = l2.left, s2 = 0, u2 = 0;
  if (t2.scrollableElement !== Z()) {
    var d2 = t2.scrollableElement.getBoundingClientRect();
    s2 = d2.left, u2 = d2.top;
  }
  return { state: t2, location: n2, left: n2.column.left + tc(n2, t2) + s2 + c2 - i2, top: n2.row.top + nc(n2, t2) + u2 + a2 - r2 };
};
var rc = function() {
  var t2 = jl(), n2 = t2.currentlyEditedCell, o2 = t2.focusedLocation, r2 = e.useRef(0), i2 = e.useReducer(oc, { state: t2, location: o2 }), l2 = i2[0], a2 = i2[1];
  if (e.useEffect(function() {
    r2.current += 1, a2();
  }, []), !n2 || !o2 || 0 === r2.current) return null;
  var c2 = t2.cellTemplates[n2.type];
  return e.createElement(ic, { cellType: n2.type, style: { top: l2.top && l2.top - 1, left: l2.left && l2.left - 1, height: o2.row.height + 1, width: o2.column.width + 1, position: "fixed" } }, c2.render(n2, true, function(e3, n3) {
    t2.currentlyEditedCell = n3 ? void 0 : e3, n3 && t2.update(function(t3) {
      return W(t3, o2, e3);
    });
  }));
};
var ic = function(t2) {
  var n2 = t2.style, o2 = t2.cellType, r2 = t2.children;
  return e.createElement("div", { className: "rg-celleditor rg-".concat(o2, "-celleditor"), style: n2 }, r2);
};
var lc = function(e3, t2) {
  var n2 = t2.cellMatrix, o2 = cc(n2, e3) || uc(n2, e3, t2);
  return o2 || 0;
};
var ac = function(e3, t2) {
  var n2 = t2.cellMatrix, o2 = sc(n2, e3) || dc(n2, e3, t2);
  return o2 || 0;
};
function cc(e3, t2) {
  var n2;
  if (t2.column.idx > (e3.ranges.stickyLeftRange.last.column ? e3.ranges.stickyLeftRange.last.column.idx : e3.first.column.idx) || t2.column.idx === e3.last.column.idx && t2.column.idx !== (null === (n2 = e3.ranges.stickyLeftRange.last.column) || void 0 === n2 ? void 0 : n2.idx)) return e3.ranges.stickyLeftRange.width;
}
function sc(e3, t2) {
  var n2;
  if (t2.row.idx > (e3.ranges.stickyTopRange.last.row ? e3.ranges.stickyTopRange.last.row.idx : e3.first.row.idx) || t2.row.idx === e3.last.row.idx && t2.row.idx !== (null === (n2 = e3.ranges.stickyTopRange.last.row) || void 0 === n2 ? void 0 : n2.idx)) return e3.ranges.stickyTopRange.height;
}
function uc(e3, t2, n2) {
  if (e3.ranges.stickyLeftRange.first.column && t2.column.idx >= e3.ranges.stickyLeftRange.first.column.idx && t2.column.idx <= e3.ranges.stickyLeftRange.last.column.idx) {
    var o2 = F(n2.scrollableElement).scrollLeft, r2 = z(n2).left;
    return j(o2, r2);
  }
}
function dc(e3, t2, n2) {
  if (e3.ranges.stickyTopRange.first.row && t2.row.idx >= e3.ranges.stickyTopRange.first.row.idx && t2.row.idx <= e3.ranges.stickyTopRange.last.row.idx) {
    var o2 = F(n2.scrollableElement).scrollTop, r2 = z(n2).top;
    return j(o2, r2);
  }
}
var gc = function(e3) {
  var t2 = e3.state, n2 = e3.location, o2 = F(t2.scrollableElement), r2 = o2.scrollTop, i2 = o2.scrollLeft, l2 = z(t2), a2 = l2.top, c2 = l2.left, s2 = 0, u2 = 0;
  if (t2.scrollableElement !== Z()) {
    var d2 = t2.scrollableElement.getBoundingClientRect();
    s2 = d2.left, u2 = d2.top;
  }
  return { state: t2, location: n2, left: n2.column.left + lc(n2, t2) + s2 + c2 - i2, top: n2.row.top + ac(n2, t2) + u2 + a2 - r2 };
};
var pc = function(t2) {
  var n2 = t2.hiddenElementRefHandler, o2 = jl().hiddenFocusElement;
  return e.createElement("input", { className: "rg-hidden-element", ref: n2, inputMode: "none", onBlur: function(e3) {
    e3.relatedTarget || null == o2 || o2.focus({ preventScroll: true });
  } });
};
var fc = function(e3) {
  function n2() {
    var t2 = null !== e3 && e3.apply(this, arguments) || this;
    return t2.state = { hasError: false }, t2;
  }
  return w(n2, e3), n2.getDerivedStateFromError = function(e4) {
    return { hasError: true, error: e4 };
  }, n2.prototype.componentDidCatch = function(e4, t2) {
    this.setState({ errorInfo: t2 });
  }, n2.prototype.render = function() {
    var e4 = this.state, n3 = e4.hasError, o2 = e4.errorInfo, r2 = e4.error;
    return n3 ? import_react.default.createElement(import_react.default.Fragment, null, import_react.default.createElement("h1", null, null == r2 ? void 0 : r2.message), " ", import_react.default.createElement("br", null), import_react.default.createElement("br", null), import_react.default.createElement("details", null, null == r2 ? void 0 : r2.stack, null == o2 ? void 0 : o2.componentStack)) : this.props.children;
  }, n2;
}(import_react.Component);
function hc() {
  return "undefined" != typeof window && navigator.userAgent.includes("Firefox");
}
var mc = function(t2) {
  var n2 = t2.eventHandlers, o2 = t2.children, r2 = jl(), i2 = r2.cellMatrix, l2 = r2.props, a2 = { width: (null == l2 ? void 0 : l2.enableFullWidthHeader) ? "100%" : i2.width, height: i2.height };
  return e.createElement(fc, null, e.createElement("div", { className: "reactgrid", style: C({ position: "relative", paddingRight: hc() ? "10px" : "" }, a2), ref: n2.reactgridRefHandler }, e.createElement("div", { className: "reactgrid-content", onKeyDown: n2.keyDownHandler, onKeyUp: n2.keyUpHandler, onCompositionEnd: n2.compositionEndHandler, onPointerDown: n2.pointerDownHandler, onPasteCapture: n2.pasteCaptureHandler, onPaste: n2.pasteHandler, onCopy: n2.copyHandler, onCut: n2.cutHandler, onBlur: n2.blurHandler, style: a2 }, o2, e.createElement(pc, { hiddenElementRefHandler: n2.hiddenElementRefHandler }))));
};
var bc = { legacyBrowserHeader: "Please update to a modern browser.", legacyBrowserText: "Your current browser cannot run our content, please make sure you browser is fully updated or try adifferent browser. We highly recommend using the most recent release of Google Chrome, Microsoft Edge, Firefox, Safari, and Opera browser", copyLabel: "Copy", cutLabel: "Cut", pasteLabel: "Paste", appleMobileDeviceContextMenuPasteAlert: "Use ⌘ + c for copy, ⌘ + x for cut and ⌘ + v for paste.", otherBrowsersContextMenuPasteAlert: " Use ctrl + c for copy, ctrl + x for cut and ctrl + v for paste.", actionNotSupported: "This action is not supported in this browser." };
function vc(e3) {
  var t2;
  return C(C({}, bc), null === (t2 = e3.props) || void 0 === t2 ? void 0 : t2.labels);
}
var yc = function() {
  var t2 = jl();
  return e.createElement(e.Fragment, null, e.createElement("h3", null, vc(t2).legacyBrowserHeader), e.createElement("p", null, vc(t2).legacyBrowserText));
};
var xc = function(e3) {
  e3.border;
  var t2 = function(e4, t3) {
    var n2 = {};
    for (var o2 in e4) Object.prototype.hasOwnProperty.call(e4, o2) && t3.indexOf(o2) < 0 && (n2[o2] = e4[o2]);
    if (null != e4 && "function" == typeof Object.getOwnPropertySymbols) {
      var r2 = 0;
      for (o2 = Object.getOwnPropertySymbols(e4); r2 < o2.length; r2++) t3.indexOf(o2[r2]) < 0 && Object.prototype.propertyIsEnumerable.call(e4, o2[r2]) && (n2[o2[r2]] = e4[o2[r2]]);
    }
    return n2;
  }(e3, ["border"]);
  return t2;
};
function Ic() {
  return "undefined" != typeof window && (void 0 !== window.orientation || -1 !== navigator.userAgent.indexOf("IEMobile"));
}
var wc = function() {
  return e.createElement("div", { className: "rg-touch-column-resize-handle", "data-cy": "rg-touch-column-resize-handle" }, e.createElement("div", { className: "rg-resize-handle", "data-cy": "rg-resize-handle" }));
};
var Cc = function() {
  return e.createElement("div", { className: "rg-touch-row-resize-handle", "data-cy": "rg-touch-row-resize-handle" }, e.createElement("div", { className: "rg-resize-handle", "data-cy": "rg-resize-handle" }));
};
function Rc(e3) {
  return { left: e3("left"), right: e3("right"), top: e3("top"), bottom: e3("bottom") };
}
var Ac = function(t2) {
  var n2, o2, r2, i2, l2 = t2.state, a2 = t2.location, c2 = t2.range, s2 = t2.borders, u2 = t2.update, d2 = t2.currentlyEditedCell, g2 = P(l2, a2), p2 = g2.cell, f2 = g2.cellTemplate, h2 = void 0 !== l2.focusedLocation && b(l2.focusedLocation, a2), m2 = null !== (n2 = f2.getClassName && f2.getClassName(p2, false)) && void 0 !== n2 ? n2 : "", v2 = e.useRef(d2), y2 = /* @__PURE__ */ function(e3, t3) {
    return function(n3, o3) {
      return function(r3) {
        var i3, l3, a3, c3, s3, u3, d3, g3;
        return e3[r3] ? (null === (a3 = null === (l3 = null === (i3 = t3.style) || void 0 === i3 ? void 0 : i3.border) || void 0 === l3 ? void 0 : l3[r3]) || void 0 === a3 ? void 0 : a3[n3]) ? null === (c3 = t3.style.border[r3]) || void 0 === c3 ? void 0 : c3[n3] : o3 : (null === (d3 = null === (u3 = null === (s3 = t3.style) || void 0 === s3 ? void 0 : s3.border) || void 0 === u3 ? void 0 : u3[r3]) || void 0 === d3 ? void 0 : d3[n3]) ? null === (g3 = t3.style.border[r3]) || void 0 === g3 ? void 0 : g3[n3] : "unset";
      };
    };
  }(s2, p2), x2 = Rc(y2("width", "1px")), I2 = Rc(y2("style", "solid")), w2 = Rc(y2("color", "#e8e8e8")), R2 = { borderLeftWidth: x2.left, borderLeftStyle: I2.left, borderLeftColor: w2.left, borderRightWidth: x2.right, borderRightStyle: I2.right, borderRightColor: w2.right, borderTopWidth: x2.top, borderTopStyle: I2.top, borderTopColor: w2.top, borderBottomWidth: x2.bottom, borderBottomStyle: I2.bottom, borderBottomColor: w2.bottom }, A2 = Ic(), E2 = (null === (o2 = l2.props) || void 0 === o2 ? void 0 : o2.enableRowSelection) && 0 === a2.row.idx || (null === (r2 = l2.props) || void 0 === r2 ? void 0 : r2.enableColumnSelection) && 0 === a2.column.idx, M2 = C(C(C(C(C({}, f2.getStyle && (f2.getStyle(p2, false) || {})), p2.style && xc(p2.style)), { left: a2.column.left, top: a2.row.top, width: c2.width, height: c2.height }), !(h2 && v2.current) && R2), (h2 || "header" === p2.type || E2) && { touchAction: "none" }), G2 = h2 && !!v2.current, N2 = p2.groupId ? " rg-groupId-".concat(p2.groupId) : "", k2 = p2.nonEditable ? " rg-cell-nonEditable" : "", T2 = G2 && A2 ? " rg-celleditor rg-".concat(p2.type, "-celleditor") : " rg-".concat(p2.type, "-cell"), S2 = "rg-cell".concat(T2).concat(N2).concat(k2, " ").concat(m2), B2 = h2 && v2.current && A2 ? v2.current : p2, L2 = e.useCallback(function(e3, t3) {
    if (G2) v2.current = t3 ? void 0 : e3, t3 && u2(function(t4) {
      return W(t4, a2, e3);
    });
    else {
      if (!t3) throw new Error("commit should be set to true in this case.");
      u2(function(t4) {
        return W(t4, a2, e3);
      });
    }
  }, [G2, a2, u2, v2]);
  return e.createElement("div", C({ className: S2, style: M2 }, { "data-cell-colidx": a2.column.idx, "data-cell-rowidx": a2.row.idx }), f2.render(B2, !!A2 && G2, L2), (0 === a2.row.idx || "header" === p2.type && (null === (i2 = l2.props) || void 0 === i2 ? void 0 : i2.enableColumnResizeOnAllHeaders)) && a2.column.resizable && e.createElement(wc, null), 0 === a2.column.idx && a2.row.resizable && e.createElement(Cc, null), l2.enableGroupIdRender && void 0 !== (null == p2 ? void 0 : p2.groupId) && !(G2 && A2) && e.createElement("span", { className: "rg-groupId" }, p2.groupId));
};
var Ec = function(t2) {
  var n2, o2 = t2.borderColor, r2 = t2.location, i2 = t2.className, l2 = t2.state, a2 = r2.column.idx, c2 = r2.row.idx, s2 = null === (n2 = null == l2 ? void 0 : l2.cellMatrix.rangesToRender[m(a2, c2)]) || void 0 === n2 ? void 0 : n2.range;
  return s2 ? e.createElement(Gc, { location: r2, className: "rg-cell-highlight ".concat(i2 || ""), borderColor: o2, width: s2.width, height: s2.height }) : null;
};
var Mc = function(t2) {
  var n2 = t2.borderColor, o2 = t2.location, r2 = t2.className;
  return e.createElement(Gc, { location: o2, className: "rg-cell-focus ".concat(r2 || ""), borderColor: n2, width: o2.column.width, height: o2.row.height });
};
var Gc = function(t2) {
  var n2 = t2.className, o2 = t2.location, r2 = t2.borderColor, i2 = t2.height, l2 = t2.width;
  return e.createElement("div", { className: n2, style: { top: o2.row.top - (0 === o2.row.top ? 0 : 1), left: o2.column.left - (0 === o2.column.left ? 0 : 1), width: l2 + (0 === o2.column.left ? 0 : 1), height: i2 + (0 === o2.row.top ? 0 : 1), borderColor: "".concat(r2) } });
};
var Nc = e.memo(function(t2) {
  var n2 = t2.columns, o2 = t2.row, r2 = t2.cellRenderer, i2 = t2.borders, l2 = t2.state, a2 = n2[n2.length - 1].idx, c2 = r2;
  return e.createElement(e.Fragment, null, n2.map(function(t3) {
    var n3, r3, s2 = null === (n3 = l2.cellMatrix.rangesToRender[m(t3.idx, o2.idx)]) || void 0 === n3 ? void 0 : n3.range;
    if (!s2) return null;
    var u2 = { row: o2, column: t3 };
    return e.createElement(c2, { key: o2.idx + "-" + t3.idx, borders: C(C({}, i2), { left: i2.left && 0 === t3.left, right: i2.right && t3.idx === a2 || !((null === (r3 = l2.cellMatrix.scrollableRange.last.column) || void 0 === r3 ? void 0 : r3.idx) === u2.column.idx) }), state: l2, location: u2, range: s2, currentlyEditedCell: l2.currentlyEditedCell, update: l2.update });
  }));
}, function(e3, t2) {
  var n2 = e3.columns, o2 = t2.columns;
  return !(t2.forceUpdate || o2[0].idx !== n2[0].idx || o2.length !== n2.length || o2[o2.length - 1].idx !== n2[n2.length - 1].idx);
});
Nc.displayName = "RowRenderer";
var kc = function(t2) {
  var n2 = t2.state, o2 = t2.calculatedRange;
  return e.createElement(e.Fragment, null, n2.currentBehavior.renderPanePart(n2, o2));
};
var Tc = function(e3) {
  var o2 = e3.state, r2 = e3.location, i2 = (0, import_react.useRef)(null), a2 = (0, import_react.useState)({ width: 0, height: 0 }), s2 = a2[0], u2 = a2[1];
  return (0, import_react.useLayoutEffect)(function() {
    i2.current && u2({ width: i2.current.offsetWidth, height: i2.current.offsetHeight });
  }, []), import_react.default.createElement("div", { className: "rg-touch-fill-handle", ref: i2, style: { top: r2.row.bottom - s2.width / 2, left: r2.column.right - s2.height / 2 }, onPointerDown: function(e4) {
    "mouse" !== e4.pointerType && o2.update(function(e5) {
      return C(C({}, e5), { currentBehavior: new Ja() });
    });
  } }, import_react.default.createElement("div", { className: "rg-fill-handle" }));
};
var Sc = function(t2) {
  var n2 = t2.state, o2 = t2.calculatedRange;
  return e.createElement(e.Fragment, null, n2.selectedRanges[n2.activeSelectedRangeIdx] && o2 instanceof f && o2.contains(n2.selectedRanges[n2.activeSelectedRangeIdx].last) && n2.enableFillHandle && !n2.currentlyEditedCell && !(n2.currentBehavior instanceof te) && e.createElement(Tc, { state: n2, location: n2.selectedRanges[n2.activeSelectedRangeIdx].last }));
};
var Bc = function(t2) {
  var n2 = t2.state, o2 = t2.calculatedRange;
  return e.createElement(e.Fragment, null, n2.selectedRanges.map(function(t3, r2) {
    return !(n2.focusedLocation && t3.contains(n2.focusedLocation) && 1 === t3.columns.length && 1 === t3.rows.length) && o2 && za(o2, t3) && e.createElement(Ya, { key: r2, pane: o2, range: t3, className: "rg-partial-area-selected-range", style: {} });
  }));
};
var Lc = e.memo(function(t2) {
  var n2 = t2.range, o2 = t2.state, r2 = t2.borders, i2 = t2.cellRenderer;
  return e.createElement(e.Fragment, null, n2.rows.map(function(t3) {
    var l2;
    return e.createElement(Nc, { key: t3.rowId, state: o2, row: t3, columns: n2.columns, forceUpdate: true, cellRenderer: i2, borders: C(C({}, r2), { top: r2.top && 0 === t3.top, bottom: r2.bottom && t3.idx === n2.last.row.idx || !((null === (l2 = o2.cellMatrix.scrollableRange.last.row) || void 0 === l2 ? void 0 : l2.idx) === t3.idx) }) });
  }));
}, function(e3, t2) {
  var n2 = e3.state, o2 = t2.state;
  return !(!n2.focusedLocation || !o2.focusedLocation || n2.currentlyEditedCell !== o2.currentlyEditedCell) && (n2.focusedLocation.column.columnId === o2.focusedLocation.column.columnId && n2.focusedLocation.row.rowId === o2.focusedLocation.row.rowId && !(n2.visibleRange !== o2.visibleRange || n2.cellMatrix.props !== o2.cellMatrix.props));
});
Lc.displayName = "PaneGridContent";
var Pc = function(t2) {
  var n2 = t2.className, o2 = t2.style, r2 = t2.renderChildren, i2 = t2.children;
  return o2.width && o2.height ? e.createElement(Xc, { className: n2, style: o2 }, " ", r2 && i2, " ") : null;
};
var Wc = function(t2) {
  var n2 = t2.state, o2 = t2.range, r2 = t2.borders, i2 = t2.cellRenderer, l2 = o2();
  return e.createElement(e.Fragment, null, e.createElement(Lc, { state: n2, range: l2, borders: r2, cellRenderer: i2 }), function(t3, n3) {
    return t3.highlightLocations.map(function(o3, r3) {
      try {
        var i3 = t3.cellMatrix.getLocationById(o3.rowId, o3.columnId);
        return i3 && n3.contains(i3) && e.createElement(Ec, { key: r3, location: i3, state: t3, borderColor: o3.borderColor, className: o3.className });
      } catch (e3) {
        return console.error("Cell location fot found while rendering highlights at: ".concat(e3.message)), null;
      }
    });
  }(n2, l2), n2.focusedLocation && !(n2.currentlyEditedCell && Ic()) && l2.contains(n2.focusedLocation) && e.createElement(Mc, { location: n2.focusedLocation }), e.createElement(Bc, { state: n2, calculatedRange: l2 }), e.createElement(kc, { state: n2, calculatedRange: l2 }), e.createElement(Sc, { state: n2, calculatedRange: l2 }));
};
var Xc = function(t2) {
  return e.createElement("div", { className: "rg-pane ".concat(t2.className), style: t2.style }, " ", t2.children, " ");
};
var Hc = function(t2) {
  var n2 = t2.renderCondition, o2 = t2.className, r2 = t2.style, i2 = t2.zIndex, l2 = t2.children;
  return n2 ? e.createElement("div", { className: "rg-pane-shadow ".concat(o2), style: C(C({}, r2), hc() && { zIndex: i2 }) }, l2) : null;
};
function Fc(e3) {
  return !V() && e3.ctrlKey || e3.metaKey;
}
function Zc(e3, t2, n2) {
  if (b(t2, n2.focusedLocation)) {
    var o2 = P(n2, t2), r2 = o2.cell, i2 = o2.cellTemplate;
    if (i2.handleKeyDown) {
      var l2 = i2.handleKeyDown(r2, 1, Fc(e3), e3.shiftKey, e3.altKey, "DoubleClick"), a2 = l2.cell;
      if (l2.enableEditMode && !r2.nonEditable) return C(C({}, n2), { currentlyEditedCell: a2 });
    }
  }
  return n2;
}
function Vc(e3, t2) {
  return e3.keyCode !== B.TAB && e3.keyCode !== B.ENTER || (e3.preventDefault(), e3.stopPropagation()), t2;
}
function Oc(e3, t2) {
  var n2 = function(e4, t3) {
    var n3 = e4.focusedLocation;
    if (!n3) return e4;
    var o2 = P(e4, n3), r2 = o2.cell, i2 = o2.cellTemplate;
    if (i2.handleCompositionEnd && !e4.currentlyEditedCell) {
      var l2 = i2.handleCompositionEnd(r2, t3.data), a2 = l2.cell, c2 = l2.enableEditMode;
      if (JSON.stringify(a2) !== JSON.stringify(r2) || c2) return c2 && !r2.nonEditable ? C(C({}, e4), { currentlyEditedCell: a2 }) : W(e4, n3, a2);
    }
    return e4;
  }(t2, e3);
  return n2 !== t2 && (e3.stopPropagation(), e3.preventDefault()), n2;
}
function Dc(e3, t2) {
  var n2 = e3.focusedLocation;
  if (!n2) return e3;
  var o2 = P(e3, n2), r2 = o2.cell, i2 = o2.cellTemplate;
  if (i2.handleKeyDown && !e3.currentlyEditedCell) {
    var l2 = i2.handleKeyDown(r2, t2.keyCode, Fc(t2), t2.shiftKey, t2.altKey, t2.key, t2.getModifierState("CapsLock")), a2 = l2.cell, c2 = l2.enableEditMode;
    if (JSON.stringify(a2) !== JSON.stringify(r2) || c2) return c2 && !r2.nonEditable ? C(C({}, e3), { currentlyEditedCell: a2 }) : W(e3, n2, a2);
  }
  return e3;
}
var Yc = function(e3) {
  return function(t2) {
    return function(n2) {
      return function() {
        return t2.slice(n2, e3);
      };
    };
  };
};
var zc = Yc("columns");
var Jc = Yc("rows");
function jc(e3, t2, n2, o2) {
  var r2 = E([], e3.queuedCellChanges, true);
  r2.length > 0 && (n2.onCellsChanged && n2.onCellsChanged(E([], r2, true)), r2.forEach(function() {
    return e3.queuedCellChanges.pop();
  })), e3 !== t2 && o2(e3);
}

// node_modules/@silevis/reactgrid/core/reactgrid.esm.js
var import_react2 = __toESM(require_react());
var import_react_dom2 = __toESM(require_react_dom());
export {
  v as AbstractPointerEventsController,
  L as Behavior,
  rc as CellEditorRenderer,
  h as CellMatrix,
  Xe as CellMatrixBuilder,
  Ac as CellRenderer,
  Fe as CheckboxCellTemplate,
  rt as ChevronCellTemplate,
  nt as DateCellTemplate,
  fl as DropdownCellTemplate,
  ot as EmailCellTemplate,
  We as EventHandlers,
  mc as GridRenderer,
  it as HeaderCellTemplate,
  yc as LegacyBrowserGridRenderer,
  ct as NumberCellTemplate,
  Pc as Pane,
  Wc as PaneContent,
  Lc as PaneGridContent,
  Hc as PaneShadow,
  Ul as PanesRenderer,
  f as Range,
  pa as ReactGrid,
  st as TextCellTemplate,
  ut as TimeCellTemplate,
  Ae as VS_PAGE_HEIGHT,
  Ee as VS_PAGE_WIDTH,
  Sl as appendCellTemplates,
  Bl as appendGroupIdRender,
  Pl as appendHighlights,
  Rl as areFocusesDiff,
  b as areLocationsEqual,
  gc as cellEditorCalculator,
  oa as clearCell,
  zc as columnsSlicer,
  ye as componentDidUpdate,
  Qa as copyDataCommands,
  ta as createHTMLElements,
  El as dataHasChanged,
  ec as defaultStateFields,
  $l as emptyCell,
  fa as focusCell,
  X as focusLocation,
  he as getCalculatedScrollLeftValueToLeft,
  fe as getCalculatedScrollLeftValueToRight,
  ce as getCalculatedScrollTopValueToBottom,
  se as getCalculatedScrollTopValueToTop,
  He as getCellProperty,
  tt as getCharFromKey,
  et as getCharFromKeyCode,
  P as getCompatibleCellAndTemplate,
  ql as getDataToCopy,
  Il as getDerivedStateFromProps,
  Pa as getFocusLocationToDown,
  Na as getFocusLocationToLeft,
  Ta as getFocusLocationToRight,
  Ba as getFocusLocationToUp,
  K as getLeftStickyColumn,
  uc as getLeftStickyOffset,
  U as getLocationFromClient,
  Ga as getNextFocusableLocation,
  z as getReactGridOffsets,
  _ as getRightStickyColumn,
  we as getScrollLeft,
  F as getScrollOfScrollableElement,
  Ie as getScrollTop,
  q as getScrollableContentColumn,
  $ as getScrollableContentRow,
  H as getScrollableParent,
  Y as getSizeOfElement,
  cc as getStickyLeftRangeWidth,
  j as getStickyOffset,
  sc as getStickyTopRangeWidth,
  Q as getStickyTopRow,
  Z as getTopScrollableElement,
  dc as getTopStickyOffset,
  ke as getVisibleColumns,
  Xa as getVisibleHeight,
  Te as getVisibleRows,
  ae as getVisibleScrollAreaHeight,
  pe as getVisibleScrollAreaWidth,
  Ne as getVisibleScrollableSize,
  J as getVisibleSizeOfReactGrid,
  Oc as handleCompositionEnd,
  _a as handleCopy,
  Zc as handleDoubleClick,
  Ha as handleKeyDown,
  Dc as handleKeyDownOnCellTemplate,
  Vc as handleKeyUp,
  Ka as handlePaste,
  jc as handleStateUpdate,
  Ml as highlightsHasChanged,
  vc as i18n,
  De as inNumericKey,
  ze as isAllowedOnNumberTypingKey,
  Ze as isAlphaNumericKey,
  ue as isBottomCellAllVisible,
  hc as isBrowserFirefox,
  Ua as isBrowserSafari,
  Je as isCharAllowedOnNumberInput,
  Ve as isCharAlphaNumeric,
  ve as isFocusLocationOnLeftSticky,
  ge as isFocusLocationOnTopSticky,
  Ue as isFunctionKey,
  O as isIOS,
  D as isIpadOS,
  Oe as isKeyPrintable,
  be as isLeftCellAllVisible,
  V as isMacOs,
  Ic as isMobileDevice,
  je as isNavigationKey,
  Ye as isNumpadNumericKey,
  x as isOnClickableArea,
  y as isReadyToHandleEvent,
  me as isRightCellAllVisible,
  Fc as isSelectionKey,
  de as isTopCellAllVisible,
  B as keyCodes,
  xa as moveFocusDown,
  ma as moveFocusEnd,
  ha as moveFocusHome,
  ba as moveFocusLeft,
  Ia as moveFocusPage,
  Ca as moveFocusPageDown,
  wa as moveFocusPageUp,
  va as moveFocusRight,
  ya as moveFocusUp,
  ia as pasteData,
  ea as processSingleCell,
  Ge as recalcVisibleRange,
  Jc as rowsSlicer,
  xe as scrollCalculator,
  le as scrollIntoView,
  Xl as setFocusLocation,
  Wl as setInitialFocusLocation,
  na as setStyles,
  Dl as shouldRenderBottomSticky,
  Vl as shouldRenderCenterRange,
  Zl as shouldRenderLeftSticky,
  Ol as shouldRenderMiddleRange,
  Yl as shouldRenderRightSticky,
  Fl as shouldRenderTopSticky,
  Al as stateDeriver,
  m as translateLocationIdxToLookupKey,
  W as tryAppendChange,
  ra as tryAppendChangeHavingGroupId,
  kl as updateFocusedLocation,
  Gl as updateStateProps,
  Ra as withFocusLocation,
  La as withMoveFocusDown,
  Aa as withMoveFocusEnd,
  Ea as withMoveFocusHome,
  Ma as withMoveFocusLeft,
  Wa as withMoveFocusPage,
  ka as withMoveFocusRight,
  Sa as withMoveFocusUp
};
//# sourceMappingURL=@silevis_reactgrid.js.map
