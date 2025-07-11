import {
  createSelectorCreator,
  lruMemoize
} from "./chunk-DFFD22PX.js";
import {
  Button_default,
  IconButton_default,
  NoSsr_default,
  Popper_default,
  Typography_default,
  _objectWithoutPropertiesLoose,
  useMediaQuery_default,
  useThemeProps
} from "./chunk-MWL5LOAP.js";
import {
  _extends,
  shouldForwardProp,
  styled_default,
  useRtl,
  useTheme
} from "./chunk-522FQN6B.js";
import {
  HTMLElementType,
  useLazyRef,
  useSlotProps_default
} from "./chunk-W36W3TFD.js";
import {
  composeClasses,
  generateUtilityClass,
  generateUtilityClasses,
  ownerWindow,
  resolveProps,
  useEnhancedEffect_default,
  useEventCallback_default,
  useForkRef,
  useId
} from "./chunk-Y3TEIJFF.js";
import {
  require_prop_types
} from "./chunk-EZSJO6EY.js";
import {
  clsx_default
} from "./chunk-KDVGFZWC.js";
import {
  Symbol,
  appearance_default,
  area_default,
  ascending_default,
  band,
  bumpX,
  bumpY,
  catmullRom_default,
  date_default,
  descending_default,
  diverging_default,
  expand_default,
  insideOut_default,
  line_default,
  linear,
  linear_default,
  log,
  monotoneX,
  monotoneY,
  natural_default,
  none_default,
  none_default2,
  number_default,
  ordinal,
  pie_default,
  point,
  pow,
  reverse_default,
  sequential,
  silhouette_default,
  sqrt,
  stack_default,
  stepAfter,
  stepBefore,
  step_default,
  string_default,
  symbolsFill,
  threshold,
  time,
  utcTime,
  wiggle_default
} from "./chunk-LGD6GAU7.js";
import "./chunk-JUWM2LYA.js";
import {
  require_jsx_runtime
} from "./chunk-6H6IX42F.js";
import {
  require_react
} from "./chunk-W4EHDCLL.js";
import {
  __commonJS,
  __toESM
} from "./chunk-EWTE5DHJ.js";

// node_modules/use-sync-external-store/cjs/use-sync-external-store-shim.development.js
var require_use_sync_external_store_shim_development = __commonJS({
  "node_modules/use-sync-external-store/cjs/use-sync-external-store-shim.development.js"(exports) {
    "use strict";
    (function() {
      function is2(x, y) {
        return x === y && (0 !== x || 1 / x === 1 / y) || x !== x && y !== y;
      }
      function useSyncExternalStore$2(subscribe, getSnapshot) {
        didWarnOld18Alpha || void 0 === React73.startTransition || (didWarnOld18Alpha = true, console.error(
          "You are using an outdated, pre-release alpha of React 18 that does not support useSyncExternalStore. The use-sync-external-store shim will not work correctly. Upgrade to a newer pre-release."
        ));
        var value = getSnapshot();
        if (!didWarnUncachedGetSnapshot) {
          var cachedValue = getSnapshot();
          objectIs(value, cachedValue) || (console.error(
            "The result of getSnapshot should be cached to avoid an infinite loop"
          ), didWarnUncachedGetSnapshot = true);
        }
        cachedValue = useState6({
          inst: { value, getSnapshot }
        });
        var inst = cachedValue[0].inst, forceUpdate = cachedValue[1];
        useLayoutEffect(
          function() {
            inst.value = value;
            inst.getSnapshot = getSnapshot;
            checkIfSnapshotChanged(inst) && forceUpdate({ inst });
          },
          [subscribe, value, getSnapshot]
        );
        useEffect14(
          function() {
            checkIfSnapshotChanged(inst) && forceUpdate({ inst });
            return subscribe(function() {
              checkIfSnapshotChanged(inst) && forceUpdate({ inst });
            });
          },
          [subscribe]
        );
        useDebugValue(value);
        return value;
      }
      function checkIfSnapshotChanged(inst) {
        var latestGetSnapshot = inst.getSnapshot;
        inst = inst.value;
        try {
          var nextValue = latestGetSnapshot();
          return !objectIs(inst, nextValue);
        } catch (error) {
          return true;
        }
      }
      function useSyncExternalStore$1(subscribe, getSnapshot) {
        return getSnapshot();
      }
      "undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ && "function" === typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());
      var React73 = require_react(), objectIs = "function" === typeof Object.is ? Object.is : is2, useState6 = React73.useState, useEffect14 = React73.useEffect, useLayoutEffect = React73.useLayoutEffect, useDebugValue = React73.useDebugValue, didWarnOld18Alpha = false, didWarnUncachedGetSnapshot = false, shim = "undefined" === typeof window || "undefined" === typeof window.document || "undefined" === typeof window.document.createElement ? useSyncExternalStore$1 : useSyncExternalStore$2;
      exports.useSyncExternalStore = void 0 !== React73.useSyncExternalStore ? React73.useSyncExternalStore : shim;
      "undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ && "function" === typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
    })();
  }
});

// node_modules/use-sync-external-store/shim/index.js
var require_shim = __commonJS({
  "node_modules/use-sync-external-store/shim/index.js"(exports, module) {
    "use strict";
    if (false) {
      module.exports = null;
    } else {
      module.exports = require_use_sync_external_store_shim_development();
    }
  }
});

// node_modules/use-sync-external-store/cjs/use-sync-external-store-shim/with-selector.development.js
var require_with_selector_development = __commonJS({
  "node_modules/use-sync-external-store/cjs/use-sync-external-store-shim/with-selector.development.js"(exports) {
    "use strict";
    (function() {
      function is2(x, y) {
        return x === y && (0 !== x || 1 / x === 1 / y) || x !== x && y !== y;
      }
      "undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ && "function" === typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());
      var React73 = require_react(), shim = require_shim(), objectIs = "function" === typeof Object.is ? Object.is : is2, useSyncExternalStore = shim.useSyncExternalStore, useRef11 = React73.useRef, useEffect14 = React73.useEffect, useMemo13 = React73.useMemo, useDebugValue = React73.useDebugValue;
      exports.useSyncExternalStoreWithSelector = function(subscribe, getSnapshot, getServerSnapshot, selector, isEqual) {
        var instRef = useRef11(null);
        if (null === instRef.current) {
          var inst = { hasValue: false, value: null };
          instRef.current = inst;
        } else inst = instRef.current;
        instRef = useMemo13(
          function() {
            function memoizedSelector(nextSnapshot) {
              if (!hasMemo) {
                hasMemo = true;
                memoizedSnapshot = nextSnapshot;
                nextSnapshot = selector(nextSnapshot);
                if (void 0 !== isEqual && inst.hasValue) {
                  var currentSelection = inst.value;
                  if (isEqual(currentSelection, nextSnapshot))
                    return memoizedSelection = currentSelection;
                }
                return memoizedSelection = nextSnapshot;
              }
              currentSelection = memoizedSelection;
              if (objectIs(memoizedSnapshot, nextSnapshot))
                return currentSelection;
              var nextSelection = selector(nextSnapshot);
              if (void 0 !== isEqual && isEqual(currentSelection, nextSelection))
                return memoizedSnapshot = nextSnapshot, currentSelection;
              memoizedSnapshot = nextSnapshot;
              return memoizedSelection = nextSelection;
            }
            var hasMemo = false, memoizedSnapshot, memoizedSelection, maybeGetServerSnapshot = void 0 === getServerSnapshot ? null : getServerSnapshot;
            return [
              function() {
                return memoizedSelector(getSnapshot());
              },
              null === maybeGetServerSnapshot ? void 0 : function() {
                return memoizedSelector(maybeGetServerSnapshot());
              }
            ];
          },
          [getSnapshot, getServerSnapshot, selector, isEqual]
        );
        var value = useSyncExternalStore(subscribe, instRef[0], instRef[1]);
        useEffect14(
          function() {
            inst.hasValue = true;
            inst.value = value;
          },
          [value]
        );
        useDebugValue(value);
        return value;
      };
      "undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ && "function" === typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
    })();
  }
});

// node_modules/use-sync-external-store/shim/with-selector.js
var require_with_selector = __commonJS({
  "node_modules/use-sync-external-store/shim/with-selector.js"(exports, module) {
    "use strict";
    if (false) {
      module.exports = null;
    } else {
      module.exports = require_with_selector_development();
    }
  }
});

// node_modules/bezier-easing/src/index.js
var require_src = __commonJS({
  "node_modules/bezier-easing/src/index.js"(exports, module) {
    var NEWTON_ITERATIONS = 4;
    var NEWTON_MIN_SLOPE = 1e-3;
    var SUBDIVISION_PRECISION = 1e-7;
    var SUBDIVISION_MAX_ITERATIONS = 10;
    var kSplineTableSize = 11;
    var kSampleStepSize = 1 / (kSplineTableSize - 1);
    var float32ArraySupported = typeof Float32Array === "function";
    function A(aA1, aA2) {
      return 1 - 3 * aA2 + 3 * aA1;
    }
    function B2(aA1, aA2) {
      return 3 * aA2 - 6 * aA1;
    }
    function C(aA1) {
      return 3 * aA1;
    }
    function calcBezier(aT, aA1, aA2) {
      return ((A(aA1, aA2) * aT + B2(aA1, aA2)) * aT + C(aA1)) * aT;
    }
    function getSlope(aT, aA1, aA2) {
      return 3 * A(aA1, aA2) * aT * aT + 2 * B2(aA1, aA2) * aT + C(aA1);
    }
    function binarySubdivide(aX, aA, aB, mX1, mX2) {
      var currentX, currentT, i = 0;
      do {
        currentT = aA + (aB - aA) / 2;
        currentX = calcBezier(currentT, mX1, mX2) - aX;
        if (currentX > 0) {
          aB = currentT;
        } else {
          aA = currentT;
        }
      } while (Math.abs(currentX) > SUBDIVISION_PRECISION && ++i < SUBDIVISION_MAX_ITERATIONS);
      return currentT;
    }
    function newtonRaphsonIterate(aX, aGuessT, mX1, mX2) {
      for (var i = 0; i < NEWTON_ITERATIONS; ++i) {
        var currentSlope = getSlope(aGuessT, mX1, mX2);
        if (currentSlope === 0) {
          return aGuessT;
        }
        var currentX = calcBezier(aGuessT, mX1, mX2) - aX;
        aGuessT -= currentX / currentSlope;
      }
      return aGuessT;
    }
    function LinearEasing(x) {
      return x;
    }
    module.exports = function bezier(mX1, mY1, mX2, mY2) {
      if (!(0 <= mX1 && mX1 <= 1 && 0 <= mX2 && mX2 <= 1)) {
        throw new Error("bezier x values must be in [0, 1] range");
      }
      if (mX1 === mY1 && mX2 === mY2) {
        return LinearEasing;
      }
      var sampleValues = float32ArraySupported ? new Float32Array(kSplineTableSize) : new Array(kSplineTableSize);
      for (var i = 0; i < kSplineTableSize; ++i) {
        sampleValues[i] = calcBezier(i * kSampleStepSize, mX1, mX2);
      }
      function getTForX(aX) {
        var intervalStart = 0;
        var currentSample = 1;
        var lastSample = kSplineTableSize - 1;
        for (; currentSample !== lastSample && sampleValues[currentSample] <= aX; ++currentSample) {
          intervalStart += kSampleStepSize;
        }
        --currentSample;
        var dist2 = (aX - sampleValues[currentSample]) / (sampleValues[currentSample + 1] - sampleValues[currentSample]);
        var guessForT = intervalStart + dist2 * kSampleStepSize;
        var initialSlope = getSlope(guessForT, mX1, mX2);
        if (initialSlope >= NEWTON_MIN_SLOPE) {
          return newtonRaphsonIterate(aX, guessForT, mX1, mX2);
        } else if (initialSlope === 0) {
          return guessForT;
        } else {
          return binarySubdivide(aX, intervalStart, intervalStart + kSampleStepSize, mX1, mX2);
        }
      }
      return function BezierEasing2(x) {
        if (x === 0) {
          return 0;
        }
        if (x === 1) {
          return 1;
        }
        return calcBezier(getTForX(x), mY1, mY2);
      };
    };
  }
});

// node_modules/@mui/x-charts/esm/LineChart/LineChart.js
var React72 = __toESM(require_react(), 1);
var import_prop_types32 = __toESM(require_prop_types(), 1);

// node_modules/@mui/x-charts/esm/LineChart/AreaPlot.js
var React21 = __toESM(require_react(), 1);
var import_prop_types4 = __toESM(require_prop_types(), 1);

// node_modules/@mui/x-charts/esm/LineChart/AreaElement.js
var React20 = __toESM(require_react(), 1);
var import_prop_types3 = __toESM(require_prop_types(), 1);

// node_modules/@mui/x-charts/esm/hooks/useInteractionItemProps.js
var React12 = __toESM(require_react(), 1);

// node_modules/@mui/x-charts/esm/context/ChartProvider/ChartProvider.js
var React10 = __toESM(require_react(), 1);

// node_modules/@mui/x-charts/esm/internals/store/useCharts.js
var React5 = __toESM(require_react(), 1);

// node_modules/@mui/x-charts/esm/internals/plugins/utils/ChartStore.js
var ChartStore = class {
  constructor(value) {
    this.value = void 0;
    this.listeners = void 0;
    this.subscribe = (fn) => {
      this.listeners.add(fn);
      return () => {
        this.listeners.delete(fn);
      };
    };
    this.getSnapshot = () => {
      return this.value;
    };
    this.update = (updater) => {
      const newState = updater(this.value);
      if (newState !== this.value) {
        this.value = newState;
        this.listeners.forEach((l) => l(newState));
      }
    };
    this.value = value;
    this.listeners = /* @__PURE__ */ new Set();
  }
};

// node_modules/@mui/x-charts/esm/internals/plugins/corePlugins/useChartAnimation/useChartAnimation.js
var React = __toESM(require_react(), 1);
var useChartAnimation = ({
  params,
  store
}) => {
  React.useEffect(() => {
    store.update((prevState) => {
      return _extends({}, prevState, {
        animation: _extends({}, prevState.animation, {
          skip: params.skipAnimation
        })
      });
    });
  }, [store, params.skipAnimation]);
  const disableAnimation = React.useCallback(() => {
    let disableCalled = false;
    store.update((prevState) => _extends({}, prevState, {
      animation: _extends({}, prevState.animation, {
        skipAnimationRequests: prevState.animation.skipAnimationRequests + 1
      })
    }));
    return () => {
      if (disableCalled) {
        return;
      }
      disableCalled = true;
      store.update((prevState) => _extends({}, prevState, {
        animation: _extends({}, prevState.animation, {
          skipAnimationRequests: prevState.animation.skipAnimationRequests - 1
        })
      }));
    };
  }, [store]);
  useEnhancedEffect_default(() => {
    const isAnimationDisabledEnvironment = typeof window === "undefined" || !(window == null ? void 0 : window.matchMedia);
    if (isAnimationDisabledEnvironment) {
      return void 0;
    }
    let disableAnimationCleanup;
    const handleMediaChange = (event) => {
      if (event.matches) {
        disableAnimationCleanup = disableAnimation();
      } else {
        disableAnimationCleanup == null ? void 0 : disableAnimationCleanup();
      }
    };
    const mql = window.matchMedia("(prefers-reduced-motion)");
    handleMediaChange(mql);
    mql.addEventListener("change", handleMediaChange);
    return () => {
      mql.removeEventListener("change", handleMediaChange);
    };
  }, [disableAnimation, store]);
  return {
    instance: {
      disableAnimation
    }
  };
};
useChartAnimation.params = {
  skipAnimation: true
};
useChartAnimation.getDefaultizedParams = ({
  params
}) => _extends({}, params, {
  skipAnimation: params.skipAnimation ?? false
});
useChartAnimation.getInitialState = ({
  skipAnimation
}) => {
  const isAnimationDisabledEnvironment = typeof window === "undefined" || !(window == null ? void 0 : window.matchMedia);
  const disableAnimations = false ? isAnimationDisabledEnvironment : false;
  return {
    animation: {
      skip: skipAnimation,
      // By initializing the skipAnimationRequests to 1, we ensure that the animation is always skipped
      skipAnimationRequests: disableAnimations ? 1 : 0
    }
  };
};

// node_modules/@mui/x-charts/esm/internals/plugins/utils/selectors.js
var reselectCreateSelector = createSelectorCreator({
  memoize: lruMemoize,
  memoizeOptions: {
    maxSize: 1,
    equalityCheck: Object.is
  }
});
var cache = /* @__PURE__ */ new WeakMap();
var createSelector = (...createSelectorArgs) => {
  const selector = (state, ...selectorArgs) => {
    const cacheKey = state.cacheKey;
    let cacheForCurrentChartInstance = cache.get(cacheKey);
    if (!cacheForCurrentChartInstance) {
      cacheForCurrentChartInstance = /* @__PURE__ */ new Map();
      cache.set(cacheKey, cacheForCurrentChartInstance);
    }
    const cachedSelector = cacheForCurrentChartInstance.get(createSelectorArgs);
    if (cachedSelector) {
      return cachedSelector(state, ...selectorArgs);
    }
    const fn = reselectCreateSelector(...createSelectorArgs);
    cacheForCurrentChartInstance.set(createSelectorArgs, fn);
    return fn(state, ...selectorArgs);
  };
  return selector;
};

// node_modules/@mui/x-charts/esm/internals/plugins/corePlugins/useChartAnimation/useChartAnimation.selectors.js
var selectorChartAnimationState = (state) => state.animation;
var selectorChartSkipAnimation = createSelector([selectorChartAnimationState], (state) => state.skip || state.skipAnimationRequests > 0);

// node_modules/@mui/x-charts/esm/internals/plugins/corePlugins/useChartDimensions/useChartDimensions.js
var React2 = __toESM(require_react(), 1);

// node_modules/@mui/x-charts/esm/internals/store/useSelector.js
var import_with_selector = __toESM(require_with_selector(), 1);
var defaultCompare = Object.is;
var useSelector = (store, selector, args = [], equals = defaultCompare) => {
  const selectorWithArgs = (state) => selector(state, ...args);
  return (0, import_with_selector.useSyncExternalStoreWithSelector)(store.subscribe, store.getSnapshot, store.getSnapshot, selectorWithArgs, equals);
};

// node_modules/@mui/x-charts/esm/constants/index.js
var DEFAULT_X_AXIS_KEY = "DEFAULT_X_AXIS_KEY";
var DEFAULT_Y_AXIS_KEY = "DEFAULT_Y_AXIS_KEY";
var DEFAULT_ROTATION_AXIS_KEY = "DEFAULT_ROTATION_AXIS_KEY";
var DEFAULT_RADIUS_AXIS_KEY = "DEFAULT_RADIUS_AXIS_KEY";
var DEFAULT_MARGINS = {
  top: 20,
  bottom: 20,
  left: 20,
  right: 20
};
var DEFAULT_AXIS_SIZE_WIDTH = 45;
var DEFAULT_AXIS_SIZE_HEIGHT = 25;
var AXIS_LABEL_DEFAULT_HEIGHT = 20;

// node_modules/@mui/x-charts/esm/internals/plugins/featurePlugins/useChartCartesianAxis/useChartCartesianAxisLayout.selectors.js
var selectorChartRawXAxis = (state) => {
  var _a;
  return (_a = state.cartesianAxis) == null ? void 0 : _a.x;
};
var selectorChartRawYAxis = (state) => {
  var _a;
  return (_a = state.cartesianAxis) == null ? void 0 : _a.y;
};

// node_modules/@mui/x-charts/esm/internals/plugins/featurePlugins/useChartCartesianAxis/useChartAxisSize.selectors.js
var selectorChartLeftAxisSize = createSelector([selectorChartRawYAxis], (yAxis) => (yAxis ?? []).reduce((acc, axis) => {
  var _a;
  return axis.position === "left" ? acc + (axis.width || 0) + (((_a = axis.zoom) == null ? void 0 : _a.slider.enabled) ? axis.zoom.slider.size : 0) : acc;
}, 0));
var selectorChartRightAxisSize = createSelector([selectorChartRawYAxis], (yAxis) => (yAxis ?? []).reduce((acc, axis) => {
  var _a;
  return axis.position === "right" ? acc + (axis.width || 0) + (((_a = axis.zoom) == null ? void 0 : _a.slider.enabled) ? axis.zoom.slider.size : 0) : acc;
}, 0));
var selectorChartTopAxisSize = createSelector([selectorChartRawXAxis], (xAxis) => (xAxis ?? []).reduce((acc, axis) => {
  var _a;
  return axis.position === "top" ? acc + (axis.height || 0) + (((_a = axis.zoom) == null ? void 0 : _a.slider.enabled) ? axis.zoom.slider.size : 0) : acc;
}, 0));
var selectorChartBottomAxisSize = createSelector([selectorChartRawXAxis], (xAxis) => (xAxis ?? []).reduce((acc, axis) => {
  var _a;
  return axis.position === "bottom" ? acc + (axis.height || 0) + (((_a = axis.zoom) == null ? void 0 : _a.slider.enabled) ? axis.zoom.slider.size : 0) : acc;
}, 0));

// node_modules/@mui/x-charts/esm/internals/plugins/corePlugins/useChartDimensions/useChartDimensions.selectors.js
var selectorChartDimensionsState = (state) => state.dimensions;
var selectorChartWidth = (state) => state.dimensions.width;
var selectorChartHeight = (state) => state.dimensions.height;
var selectorChartTopMargin = (state) => state.dimensions.margin.top;
var selectorChartRightMargin = (state) => state.dimensions.margin.right;
var selectorChartBottomMargin = (state) => state.dimensions.margin.bottom;
var selectorChartLeftMargin = (state) => state.dimensions.margin.left;
var selectorChartDrawingArea = createSelector([selectorChartWidth, selectorChartHeight, selectorChartTopMargin, selectorChartRightMargin, selectorChartBottomMargin, selectorChartLeftMargin, selectorChartTopAxisSize, selectorChartRightAxisSize, selectorChartBottomAxisSize, selectorChartLeftAxisSize], (width, height, marginTop, marginRight, marginBottom, marginLeft, axisSizeTop, axisSizeRight, axisSizeBottom, axisSizeLeft) => ({
  width: width - marginLeft - marginRight - axisSizeLeft - axisSizeRight,
  left: marginLeft + axisSizeLeft,
  right: marginRight + axisSizeRight,
  height: height - marginTop - marginBottom - axisSizeTop - axisSizeBottom,
  top: marginTop + axisSizeTop,
  bottom: marginBottom + axisSizeBottom
}));
var selectorChartPropsSize = createSelector([selectorChartDimensionsState], (dimensionsState) => ({
  width: dimensionsState.propsWidth,
  height: dimensionsState.propsHeight
}));
var selectorChartContainerSize = createSelector([selectorChartWidth, selectorChartHeight], (width, height) => ({
  width,
  height
}));

// node_modules/@mui/x-charts/esm/internals/defaultizeMargin.js
function defaultizeMargin(input, defaultMargin) {
  if (typeof input === "number") {
    return {
      top: input,
      bottom: input,
      left: input,
      right: input
    };
  }
  if (defaultMargin) {
    return _extends({}, defaultMargin, input);
  }
  return input;
}

// node_modules/@mui/x-charts/esm/internals/getSVGPoint.js
function getSVGPoint(svg, event) {
  const pt = svg.createSVGPoint();
  pt.x = event.clientX;
  pt.y = event.clientY;
  return pt.matrixTransform(svg.getScreenCTM().inverse());
}

// node_modules/@mui/x-charts/esm/internals/plugins/corePlugins/useChartDimensions/useChartDimensions.js
var MAX_COMPUTE_RUN = 10;
var useChartDimensions = ({
  params,
  store,
  svgRef
}) => {
  const hasInSize = params.width !== void 0 && params.height !== void 0;
  const stateRef = React2.useRef({
    displayError: false,
    initialCompute: true,
    computeRun: 0
  });
  const [innerWidth, setInnerWidth] = React2.useState(0);
  const [innerHeight, setInnerHeight] = React2.useState(0);
  const computeSize = React2.useCallback(() => {
    const mainEl = svgRef == null ? void 0 : svgRef.current;
    if (!mainEl) {
      return {};
    }
    const win = ownerWindow(mainEl);
    const computedStyle = win.getComputedStyle(mainEl);
    const newHeight = Math.floor(parseFloat(computedStyle.height)) || 0;
    const newWidth = Math.floor(parseFloat(computedStyle.width)) || 0;
    store.update((prev) => {
      if (prev.dimensions.width === newWidth && prev.dimensions.height === newHeight) {
        return prev;
      }
      return _extends({}, prev, {
        dimensions: {
          margin: {
            top: params.margin.top,
            right: params.margin.right,
            bottom: params.margin.bottom,
            left: params.margin.left
          },
          width: params.width ?? newWidth,
          height: params.height ?? newHeight,
          propsWidth: params.width,
          propsHeight: params.height
        }
      });
    });
    return {
      height: newHeight,
      width: newWidth
    };
  }, [
    store,
    svgRef,
    params.height,
    params.width,
    // Margin is an object, so we need to include all the properties to prevent infinite loops.
    params.margin.left,
    params.margin.right,
    params.margin.top,
    params.margin.bottom
  ]);
  React2.useEffect(() => {
    store.update((prev) => {
      const width = params.width ?? prev.dimensions.width;
      const height = params.height ?? prev.dimensions.height;
      return _extends({}, prev, {
        dimensions: {
          margin: {
            top: params.margin.top,
            right: params.margin.right,
            bottom: params.margin.bottom,
            left: params.margin.left
          },
          width,
          height,
          propsHeight: params.height,
          propsWidth: params.width
        }
      });
    });
  }, [
    store,
    params.height,
    params.width,
    // Margin is an object, so we need to include all the properties to prevent infinite loops.
    params.margin.left,
    params.margin.right,
    params.margin.top,
    params.margin.bottom
  ]);
  React2.useEffect(() => {
    stateRef.current.displayError = true;
  }, []);
  useEnhancedEffect_default(() => {
    if (hasInSize || !stateRef.current.initialCompute || stateRef.current.computeRun > MAX_COMPUTE_RUN) {
      return;
    }
    const computedSize = computeSize();
    if (computedSize.width !== innerWidth || computedSize.height !== innerHeight) {
      stateRef.current.computeRun += 1;
      if (computedSize.width !== void 0) {
        setInnerWidth(computedSize.width);
      }
      if (computedSize.height !== void 0) {
        setInnerHeight(computedSize.height);
      }
    } else if (stateRef.current.initialCompute) {
      stateRef.current.initialCompute = false;
    }
  }, [innerHeight, innerWidth, computeSize, hasInSize]);
  useEnhancedEffect_default(() => {
    if (hasInSize) {
      return () => {
      };
    }
    computeSize();
    const elementToObserve = svgRef.current;
    if (typeof ResizeObserver === "undefined") {
      return () => {
      };
    }
    let animationFrame;
    const observer = new ResizeObserver(() => {
      animationFrame = requestAnimationFrame(() => {
        computeSize();
      });
    });
    if (elementToObserve) {
      observer.observe(elementToObserve);
    }
    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
      if (elementToObserve) {
        observer.unobserve(elementToObserve);
      }
    };
  }, [computeSize, hasInSize, svgRef]);
  if (true) {
    if (stateRef.current.displayError && params.width === void 0 && innerWidth === 0) {
      console.error(`MUI X Charts: ChartContainer does not have \`width\` prop, and its container has no \`width\` defined.`);
      stateRef.current.displayError = false;
    }
    if (stateRef.current.displayError && params.height === void 0 && innerHeight === 0) {
      console.error(`MUI X Charts: ChartContainer does not have \`height\` prop, and its container has no \`height\` defined.`);
      stateRef.current.displayError = false;
    }
  }
  const drawingArea = useSelector(store, selectorChartDrawingArea);
  const isXInside = React2.useCallback((x) => x >= drawingArea.left - 1 && x <= drawingArea.left + drawingArea.width, [drawingArea.left, drawingArea.width]);
  const isYInside = React2.useCallback((y) => y >= drawingArea.top - 1 && y <= drawingArea.top + drawingArea.height, [drawingArea.height, drawingArea.top]);
  const isPointInside = React2.useCallback((x, y, targetElement) => {
    if (targetElement && "closest" in targetElement && targetElement.closest("[data-drawing-container]")) {
      return true;
    }
    return isXInside(x) && isYInside(y);
  }, [isXInside, isYInside]);
  const isElementInside = React2.useCallback((element) => {
    const svgElement = svgRef.current;
    if (!element || !(element instanceof Element) || !svgElement) {
      return false;
    }
    if (element.closest("[data-drawing-container]")) {
      return true;
    }
    const rect = element.getBoundingClientRect();
    const {
      x: left,
      y: top
    } = getSVGPoint(svgElement, {
      clientX: rect.left,
      clientY: rect.top
    });
    const {
      x: right,
      y: bottom
    } = getSVGPoint(svgElement, {
      clientX: rect.right,
      clientY: rect.bottom
    });
    return isXInside(left) && isXInside(right) && isYInside(top) && isYInside(bottom);
  }, [isXInside, isYInside, svgRef]);
  return {
    instance: {
      isPointInside,
      isXInside,
      isYInside,
      isElementInside
    }
  };
};
useChartDimensions.params = {
  width: true,
  height: true,
  margin: true
};
useChartDimensions.getDefaultizedParams = ({
  params
}) => _extends({}, params, {
  margin: defaultizeMargin(params.margin, DEFAULT_MARGINS)
});
useChartDimensions.getInitialState = ({
  width,
  height,
  margin
}) => {
  return {
    dimensions: {
      margin,
      width: width ?? 0,
      height: height ?? 0,
      propsWidth: width,
      propsHeight: height
    }
  };
};

// node_modules/@mui/x-charts/esm/internals/plugins/corePlugins/useChartId/useChartId.js
var React3 = __toESM(require_react(), 1);

// node_modules/@mui/x-charts/esm/internals/plugins/corePlugins/useChartId/useChartId.utils.js
var globalChartDefaultId = 0;
var createChartDefaultId = () => {
  globalChartDefaultId += 1;
  return `mui-chart-${globalChartDefaultId}`;
};

// node_modules/@mui/x-charts/esm/internals/plugins/corePlugins/useChartId/useChartId.js
var useChartId = ({
  params,
  store
}) => {
  React3.useEffect(() => {
    store.update((prevState) => {
      if (params.id === void 0 || params.id === prevState.id.providedChartId && prevState.id.chartId !== void 0) {
        return prevState;
      }
      return _extends({}, prevState, {
        id: _extends({}, prevState.id, {
          chartId: params.id ?? createChartDefaultId()
        })
      });
    });
  }, [store, params.id]);
  return {};
};
useChartId.params = {
  id: true
};
useChartId.getInitialState = ({
  id
}) => ({
  id: {
    chartId: id,
    providedChartId: id
  }
});

// node_modules/@mui/x-charts/esm/internals/plugins/corePlugins/useChartId/useChartId.selectors.js
var selectorChartIdState = (state) => state.id;
var selectorChartId = createSelector([selectorChartIdState], (idState) => idState.chartId);

// node_modules/@mui/x-charts/esm/internals/plugins/corePlugins/useChartSeries/useChartSeries.js
var React4 = __toESM(require_react(), 1);

// node_modules/@mui/x-charts/esm/colorPalettes/categorical/rainbowSurge.js
var rainbowSurgePaletteLight = ["#4254FB", "#FFB422", "#FA4F58", "#0DBEFF", "#22BF75", "#FA83B4", "#FF7511"];
var rainbowSurgePaletteDark = ["#495AFB", "#FFC758", "#F35865", "#30C8FF", "#44CE8D", "#F286B3", "#FF8C39"];
var rainbowSurgePalette = (mode) => mode === "dark" ? rainbowSurgePaletteDark : rainbowSurgePaletteLight;

// node_modules/@mui/x-charts/esm/internals/plugins/corePlugins/useChartSeries/processSeries.js
var preprocessSeries = ({
  series,
  colors,
  seriesConfig: seriesConfig5,
  dataset
}) => {
  const seriesGroups = {};
  series.forEach((seriesData, seriesIndex) => {
    var _a;
    const seriesWithDefaultValues = seriesConfig5[seriesData.type].getSeriesWithDefaultValues(seriesData, seriesIndex, colors);
    const id = seriesWithDefaultValues.id;
    if (seriesGroups[seriesData.type] === void 0) {
      seriesGroups[seriesData.type] = {
        series: {},
        seriesOrder: []
      };
    }
    if (((_a = seriesGroups[seriesData.type]) == null ? void 0 : _a.series[id]) !== void 0) {
      throw new Error(`MUI X Charts: series' id "${id}" is not unique.`);
    }
    seriesGroups[seriesData.type].series[id] = seriesWithDefaultValues;
    seriesGroups[seriesData.type].seriesOrder.push(id);
  });
  const processedSeries = {};
  Object.keys(seriesConfig5).forEach((type) => {
    var _a, _b;
    const group = seriesGroups[type];
    if (group !== void 0) {
      processedSeries[type] = ((_b = (_a = seriesConfig5[type]) == null ? void 0 : _a.seriesProcessor) == null ? void 0 : _b.call(_a, group, dataset)) ?? seriesGroups[type];
    }
  });
  return processedSeries;
};

// node_modules/@mui/x-charts/esm/internals/plugins/corePlugins/useChartSeries/useChartSeries.js
var useChartSeries = ({
  params,
  store,
  seriesConfig: seriesConfig5
}) => {
  const {
    series,
    dataset,
    theme,
    colors
  } = params;
  const isFirstRender = React4.useRef(true);
  React4.useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    store.update((prev) => _extends({}, prev, {
      series: _extends({}, prev.series, {
        processedSeries: preprocessSeries({
          series,
          colors: typeof colors === "function" ? colors(theme) : colors,
          seriesConfig: seriesConfig5,
          dataset
        })
      })
    }));
  }, [colors, dataset, series, theme, seriesConfig5, store]);
  return {};
};
useChartSeries.params = {
  dataset: true,
  series: true,
  colors: true,
  theme: true
};
var EMPTY_ARRAY = [];
useChartSeries.getDefaultizedParams = ({
  params
}) => {
  var _a;
  return _extends({}, params, {
    series: ((_a = params.series) == null ? void 0 : _a.length) ? params.series : EMPTY_ARRAY,
    colors: params.colors ?? rainbowSurgePalette,
    theme: params.theme ?? "light"
  });
};
useChartSeries.getInitialState = ({
  series = [],
  colors,
  theme,
  dataset
}, _, seriesConfig5) => {
  return {
    series: {
      seriesConfig: seriesConfig5,
      processedSeries: preprocessSeries({
        series,
        colors: typeof colors === "function" ? colors(theme) : colors,
        seriesConfig: seriesConfig5,
        dataset
      })
    }
  };
};

// node_modules/@mui/x-charts/esm/internals/plugins/corePlugins/useChartSeries/useChartSeries.selectors.js
var selectorChartSeriesState = (state) => state.series;
var selectorChartSeriesProcessed = createSelector([selectorChartSeriesState], (seriesState) => seriesState.processedSeries);
var selectorChartSeriesConfig = createSelector([selectorChartSeriesState], (seriesState) => seriesState.seriesConfig);

// node_modules/@mui/x-charts/esm/internals/plugins/corePlugins/corePlugins.js
var CHART_CORE_PLUGINS = [useChartId, useChartDimensions, useChartSeries, useChartAnimation];

// node_modules/@mui/x-charts/esm/internals/store/extractPluginParamsFromProps.js
var _excluded = ["apiRef"];
var extractPluginParamsFromProps = (_ref) => {
  let {
    plugins
  } = _ref, props = _objectWithoutPropertiesLoose(_ref.props, _excluded);
  const paramsLookup = {};
  plugins.forEach((plugin) => {
    Object.assign(paramsLookup, plugin.params);
  });
  const pluginParams = {};
  Object.keys(props).forEach((propName) => {
    const prop = props[propName];
    if (paramsLookup[propName]) {
      pluginParams[propName] = prop;
    }
  });
  const defaultizedPluginParams = plugins.reduce((acc, plugin) => {
    if (plugin.getDefaultizedParams) {
      return plugin.getDefaultizedParams({
        params: acc
      });
    }
    return acc;
  }, pluginParams);
  return defaultizedPluginParams;
};

// node_modules/@mui/x-charts/esm/internals/store/useCharts.js
var globalId = 0;
function useCharts(inPlugins, props, seriesConfig5) {
  const chartId = useId();
  const plugins = React5.useMemo(() => [...CHART_CORE_PLUGINS, ...inPlugins], [inPlugins]);
  const pluginParams = extractPluginParamsFromProps({
    plugins,
    props
  });
  pluginParams.id = pluginParams.id ?? chartId;
  const instanceRef = React5.useRef({});
  const instance = instanceRef.current;
  const publicAPI = useChartApiInitialization(props.apiRef);
  const innerChartRootRef = React5.useRef(null);
  const innerSvgRef = React5.useRef(null);
  const storeRef = React5.useRef(null);
  if (storeRef.current == null) {
    globalId += 1;
    const initialState = {
      cacheKey: {
        id: globalId
      }
    };
    plugins.forEach((plugin) => {
      if (plugin.getInitialState) {
        Object.assign(initialState, plugin.getInitialState(pluginParams, initialState, seriesConfig5));
      }
    });
    storeRef.current = new ChartStore(initialState);
  }
  const runPlugin = (plugin) => {
    const pluginResponse = plugin({
      instance,
      params: pluginParams,
      plugins,
      store: storeRef.current,
      svgRef: innerSvgRef,
      chartRootRef: innerChartRootRef,
      seriesConfig: seriesConfig5
    });
    if (pluginResponse.publicAPI) {
      Object.assign(publicAPI.current, pluginResponse.publicAPI);
    }
    if (pluginResponse.instance) {
      Object.assign(instance, pluginResponse.instance);
    }
  };
  plugins.forEach(runPlugin);
  const contextValue = React5.useMemo(() => ({
    store: storeRef.current,
    publicAPI: publicAPI.current,
    instance,
    svgRef: innerSvgRef,
    chartRootRef: innerChartRootRef
  }), [instance, publicAPI]);
  return {
    contextValue
  };
}
function initializeInputApiRef(inputApiRef) {
  if (inputApiRef.current == null) {
    inputApiRef.current = {};
  }
  return inputApiRef;
}
function useChartApiInitialization(inputApiRef) {
  const fallbackPublicApiRef = React5.useRef({});
  if (inputApiRef) {
    return initializeInputApiRef(inputApiRef);
  }
  return fallbackPublicApiRef;
}

// node_modules/@mui/x-charts/esm/context/ChartProvider/ChartContext.js
var React6 = __toESM(require_react(), 1);
var ChartContext = React6.createContext(null);
if (true) ChartContext.displayName = "ChartContext";

// node_modules/@mui/x-charts/esm/internals/plugins/featurePlugins/useChartCartesianAxis/useChartCartesianAxis.js
var React7 = __toESM(require_react(), 1);

// node_modules/@mui/x-charts/node_modules/@mui/x-internals/esm/warning/warning.js
var warnedOnceCache = /* @__PURE__ */ new Set();
function warnOnce(message, gravity = "warning") {
  if (false) {
    return;
  }
  const cleanMessage = Array.isArray(message) ? message.join("\n") : message;
  if (!warnedOnceCache.has(cleanMessage)) {
    warnedOnceCache.add(cleanMessage);
    if (gravity === "error") {
      console.error(cleanMessage);
    } else {
      console.warn(cleanMessage);
    }
  }
}

// node_modules/@mui/x-charts/esm/internals/constants.js
var ZOOM_SLIDER_MARGIN = 4;
var DEFAULT_ZOOM_SLIDER_SIZE = 20 + 2 * ZOOM_SLIDER_MARGIN;
var DEFAULT_ZOOM_SLIDER_SHOW_TOOLTIP = "hover";

// node_modules/@mui/x-charts/esm/internals/plugins/featurePlugins/useChartCartesianAxis/defaultizeZoom.js
var defaultZoomOptions = {
  minStart: 0,
  maxEnd: 100,
  step: 5,
  minSpan: 10,
  maxSpan: 100,
  panning: true,
  filterMode: "keep",
  slider: {
    enabled: false,
    size: DEFAULT_ZOOM_SLIDER_SIZE,
    showTooltip: DEFAULT_ZOOM_SLIDER_SHOW_TOOLTIP
  }
};
var defaultizeZoom = (zoom, axisId, axisDirection) => {
  if (!zoom) {
    return void 0;
  }
  if (zoom === true) {
    return _extends({
      axisId,
      axisDirection
    }, defaultZoomOptions);
  }
  return _extends({
    axisId,
    axisDirection
  }, defaultZoomOptions, zoom, {
    slider: _extends({}, defaultZoomOptions.slider, zoom.slider)
  });
};

// node_modules/@mui/x-charts/esm/internals/plugins/featurePlugins/useChartCartesianAxis/defaultizeAxis.js
function defaultizeXAxis(inAxes, dataset) {
  const offsets = {
    top: 0,
    bottom: 0,
    none: 0
  };
  const inputAxes = inAxes && inAxes.length > 0 ? inAxes : [{
    id: DEFAULT_X_AXIS_KEY,
    scaleType: "linear"
  }];
  const parsedAxes = inputAxes.map((axisConfig, index) => {
    var _a;
    const dataKey = axisConfig.dataKey;
    const defaultPosition = index === 0 ? "bottom" : "none";
    const position = axisConfig.position ?? defaultPosition;
    const defaultHeight = DEFAULT_AXIS_SIZE_HEIGHT + (axisConfig.label ? AXIS_LABEL_DEFAULT_HEIGHT : 0);
    const id = axisConfig.id ?? `defaultized-x-axis-${index}`;
    const sharedConfig = _extends({
      offset: offsets[position]
    }, axisConfig, {
      id,
      position,
      height: axisConfig.height ?? defaultHeight,
      zoom: defaultizeZoom(axisConfig.zoom, id, "x")
    });
    if (position !== "none") {
      offsets[position] += sharedConfig.height;
      if ((_a = sharedConfig.zoom) == null ? void 0 : _a.slider.enabled) {
        offsets[position] += sharedConfig.zoom.slider.size;
      }
    }
    if (dataKey === void 0 || axisConfig.data !== void 0) {
      return sharedConfig;
    }
    if (dataset === void 0) {
      throw new Error(`MUI X Charts: x-axis uses \`dataKey\` but no \`dataset\` is provided.`);
    }
    return _extends({}, sharedConfig, {
      data: dataset.map((d) => d[dataKey])
    });
  });
  return parsedAxes;
}
function defaultizeYAxis(inAxes, dataset) {
  const offsets = {
    right: 0,
    left: 0,
    none: 0
  };
  const inputAxes = inAxes && inAxes.length > 0 ? inAxes : [{
    id: DEFAULT_Y_AXIS_KEY,
    scaleType: "linear"
  }];
  const parsedAxes = inputAxes.map((axisConfig, index) => {
    var _a;
    const dataKey = axisConfig.dataKey;
    const defaultPosition = index === 0 ? "left" : "none";
    const position = axisConfig.position ?? defaultPosition;
    const defaultWidth = DEFAULT_AXIS_SIZE_WIDTH + (axisConfig.label ? AXIS_LABEL_DEFAULT_HEIGHT : 0);
    const id = axisConfig.id ?? `defaultized-y-axis-${index}`;
    const sharedConfig = _extends({
      offset: offsets[position]
    }, axisConfig, {
      id,
      position,
      width: axisConfig.width ?? defaultWidth,
      zoom: defaultizeZoom(axisConfig.zoom, id, "y")
    });
    if (position !== "none") {
      offsets[position] += sharedConfig.width;
      if ((_a = sharedConfig.zoom) == null ? void 0 : _a.slider.enabled) {
        offsets[position] += sharedConfig.zoom.slider.size;
      }
    }
    if (dataKey === void 0 || axisConfig.data !== void 0) {
      return sharedConfig;
    }
    if (dataset === void 0) {
      throw new Error(`MUI X Charts: y-axis uses \`dataKey\` but no \`dataset\` is provided.`);
    }
    return _extends({}, sharedConfig, {
      data: dataset.map((d) => d[dataKey])
    });
  });
  return parsedAxes;
}

// node_modules/@mui/x-charts/esm/internals/defaultValueFormatters.js
function createScalarFormatter(tickNumber, zoomScale) {
  return function defaultScalarValueFormatter(value, context) {
    if (context.location === "tick") {
      return context.scale.tickFormat(tickNumber)(value);
    }
    if (context.location === "zoom-slider-tooltip") {
      return zoomScale.tickFormat(2)(value);
    }
    return `${value}`;
  };
}

// node_modules/@mui/x-charts/esm/models/axis.js
function isBandScaleConfig(scaleConfig) {
  return scaleConfig.scaleType === "band";
}
function isPointScaleConfig(scaleConfig) {
  return scaleConfig.scaleType === "point";
}

// node_modules/@mui/x-charts/esm/internals/colorScale.js
function getSequentialColorScale(config) {
  if (config.type === "piecewise") {
    return threshold(config.thresholds, config.colors);
  }
  return sequential([config.min ?? 0, config.max ?? 100], config.color);
}
function getOrdinalColorScale(config) {
  if (config.values) {
    return ordinal(config.values, config.colors).unknown(config.unknownColor ?? null);
  }
  return ordinal(config.colors.map((_, index) => index), config.colors).unknown(config.unknownColor ?? null);
}
function getColorScale(config) {
  return config.type === "ordinal" ? getOrdinalColorScale(config) : getSequentialColorScale(config);
}

// node_modules/@mui/x-charts/esm/internals/ticks.js
function getTickNumber(params) {
  const {
    tickMaxStep,
    tickMinStep,
    tickNumber,
    range,
    domain
  } = params;
  const maxTicks = tickMinStep === void 0 ? 999 : Math.floor(Math.abs(domain[1] - domain[0]) / tickMinStep);
  const minTicks = tickMaxStep === void 0 ? 2 : Math.ceil(Math.abs(domain[1] - domain[0]) / tickMaxStep);
  const defaultizedTickNumber = tickNumber ?? Math.floor(Math.abs(range[1] - range[0]) / 50);
  return Math.min(maxTicks, Math.max(minTicks, defaultizedTickNumber));
}
function scaleTickNumberByRange(tickNumber, range) {
  const rangeGap = range[1] - range[0];
  if (rangeGap === 0) {
    return 1;
  }
  return tickNumber / ((range[1] - range[0]) / 100);
}

// node_modules/@mui/x-charts/esm/internals/getScale.js
function getScale(scaleType, domain, range) {
  switch (scaleType) {
    case "log":
      return log(domain, range);
    case "pow":
      return pow(domain, range);
    case "sqrt":
      return sqrt(domain, range);
    case "time":
      return time(domain, range);
    case "utc":
      return utcTime(domain, range);
    default:
      return linear(domain, range);
  }
}

// node_modules/@mui/x-charts/esm/internals/dateHelpers.js
var isDateData = (data) => (data == null ? void 0 : data[0]) instanceof Date;
function createDateFormatter(axis, range) {
  const timeScale = time(axis.data, range);
  return (v2, {
    location
  }) => location === "tick" ? timeScale.tickFormat(axis.tickNumber)(v2) : `${v2.toLocaleString()}`;
}

// node_modules/@mui/x-charts/esm/internals/plugins/featurePlugins/useChartCartesianAxis/zoom.js
var zoomScaleRange = (scaleRange, zoomRange) => {
  const rangeGap = scaleRange[1] - scaleRange[0];
  const zoomGap = zoomRange[1] - zoomRange[0];
  const min = scaleRange[0] - zoomRange[0] * rangeGap / zoomGap;
  const max = scaleRange[1] + (100 - zoomRange[1]) * rangeGap / zoomGap;
  return [min, max];
};

// node_modules/@mui/x-charts/esm/internals/configInit.js
var cartesianInstance;
var polarInstance;
var CartesianSeriesTypes = class {
  constructor() {
    this.types = /* @__PURE__ */ new Set();
    if (cartesianInstance) {
      throw new Error("You can only create one instance!");
    }
    cartesianInstance = this.types;
  }
  addType(value) {
    this.types.add(value);
  }
  getTypes() {
    return this.types;
  }
};
var PolarSeriesTypes = class {
  constructor() {
    this.types = /* @__PURE__ */ new Set();
    if (polarInstance) {
      throw new Error("You can only create one instance!");
    }
    polarInstance = this.types;
  }
  addType(value) {
    this.types.add(value);
  }
  getTypes() {
    return this.types;
  }
};
var cartesianSeriesTypes = new CartesianSeriesTypes();
cartesianSeriesTypes.addType("bar");
cartesianSeriesTypes.addType("line");
cartesianSeriesTypes.addType("scatter");
var polarSeriesTypes = new PolarSeriesTypes();
polarSeriesTypes.addType("radar");

// node_modules/@mui/x-charts/esm/internals/isCartesian.js
function isCartesianSeriesType(seriesType) {
  return cartesianSeriesTypes.getTypes().has(seriesType);
}

// node_modules/@mui/x-charts/esm/internals/plugins/featurePlugins/useChartCartesianAxis/getAxisExtremum.js
var axisExtremumCallback = (acc, chartType, axis, axisDirection, seriesConfig5, axisIndex, formattedSeries, getFilters) => {
  var _a;
  const getter = axisDirection === "x" ? seriesConfig5[chartType].xExtremumGetter : seriesConfig5[chartType].yExtremumGetter;
  const series = ((_a = formattedSeries[chartType]) == null ? void 0 : _a.series) ?? {};
  const [minChartTypeData, maxChartTypeData] = (getter == null ? void 0 : getter({
    series,
    axis,
    axisIndex,
    isDefaultAxis: axisIndex === 0,
    getFilters
  })) ?? [Infinity, -Infinity];
  const [minData, maxData] = acc;
  return [Math.min(minChartTypeData, minData), Math.max(maxChartTypeData, maxData)];
};
var getAxisExtremum = (axis, axisDirection, seriesConfig5, axisIndex, formattedSeries, getFilters) => {
  const charTypes = Object.keys(seriesConfig5).filter(isCartesianSeriesType);
  const extremums = charTypes.reduce((acc, charType) => axisExtremumCallback(acc, charType, axis, axisDirection, seriesConfig5, axisIndex, formattedSeries, getFilters), [Infinity, -Infinity]);
  if (Number.isNaN(extremums[0]) || Number.isNaN(extremums[1])) {
    return [Infinity, -Infinity];
  }
  return extremums;
};

// node_modules/@mui/x-charts/esm/internals/plugins/featurePlugins/useChartCartesianAxis/getAxisTriggerTooltip.js
var getAxisTriggerTooltip = (axisDirection, seriesConfig5, formattedSeries, defaultAxisId) => {
  const tooltipAxesIds = /* @__PURE__ */ new Set();
  const chartTypes = Object.keys(seriesConfig5).filter(isCartesianSeriesType);
  chartTypes.forEach((chartType) => {
    var _a, _b, _c;
    const series = ((_a = formattedSeries[chartType]) == null ? void 0 : _a.series) ?? {};
    const tooltipAxes = (_c = (_b = seriesConfig5[chartType]).axisTooltipGetter) == null ? void 0 : _c.call(_b, series);
    if (tooltipAxes === void 0) {
      return;
    }
    tooltipAxes.forEach(({
      axisId,
      direction
    }) => {
      if (direction === axisDirection) {
        tooltipAxesIds.add(axisId ?? defaultAxisId);
      }
    });
  });
  return tooltipAxesIds;
};

// node_modules/@mui/x-charts/esm/internals/plugins/featurePlugins/useChartCartesianAxis/computeAxisValue.js
function getRange(drawingArea, axisDirection, axis) {
  const range = axisDirection === "x" ? [drawingArea.left, drawingArea.left + drawingArea.width] : [drawingArea.top + drawingArea.height, drawingArea.top];
  return axis.reverse ? [range[1], range[0]] : range;
}
var DEFAULT_CATEGORY_GAP_RATIO = 0.2;
var DEFAULT_BAR_GAP_RATIO = 0.1;
function computeAxisValue({
  drawingArea,
  formattedSeries,
  axis: allAxis,
  seriesConfig: seriesConfig5,
  axisDirection,
  zoomMap,
  zoomOptions,
  getFilters
}) {
  if (allAxis === void 0) {
    return {
      axis: {},
      axisIds: []
    };
  }
  const axisIdsTriggeringTooltip = getAxisTriggerTooltip(axisDirection, seriesConfig5, formattedSeries, allAxis[0].id);
  const completeAxis = {};
  allAxis.forEach((eachAxis, axisIndex) => {
    const axis = eachAxis;
    const zoomOption = zoomOptions == null ? void 0 : zoomOptions[axis.id];
    const zoom = zoomMap == null ? void 0 : zoomMap.get(axis.id);
    const zoomRange = zoom ? [zoom.start, zoom.end] : [0, 100];
    const range = getRange(drawingArea, axisDirection, axis);
    const [minData, maxData] = getAxisExtremum(
      axis,
      axisDirection,
      seriesConfig5,
      axisIndex,
      formattedSeries,
      zoom === void 0 && !zoomOption ? getFilters : void 0
      // Do not apply filtering if zoom is already defined.
    );
    const triggerTooltip = !axis.ignoreTooltip && axisIdsTriggeringTooltip.has(axis.id);
    const data = axis.data ?? [];
    if (isBandScaleConfig(axis)) {
      const categoryGapRatio = axis.categoryGapRatio ?? DEFAULT_CATEGORY_GAP_RATIO;
      const barGapRatio = axis.barGapRatio ?? DEFAULT_BAR_GAP_RATIO;
      const scaleRange = axisDirection === "y" ? [range[1], range[0]] : range;
      const zoomedRange2 = zoomScaleRange(scaleRange, zoomRange);
      completeAxis[axis.id] = _extends({
        offset: 0,
        height: 0,
        categoryGapRatio,
        barGapRatio,
        triggerTooltip
      }, axis, {
        data,
        scale: band(axis.data, zoomedRange2).paddingInner(categoryGapRatio).paddingOuter(categoryGapRatio / 2),
        tickNumber: axis.data.length,
        colorScale: axis.colorMap && (axis.colorMap.type === "ordinal" ? getOrdinalColorScale(_extends({
          values: axis.data
        }, axis.colorMap)) : getColorScale(axis.colorMap))
      });
      if (isDateData(axis.data)) {
        const dateFormatter = createDateFormatter(axis, scaleRange);
        completeAxis[axis.id].valueFormatter = axis.valueFormatter ?? dateFormatter;
      }
    }
    if (isPointScaleConfig(axis)) {
      const scaleRange = axisDirection === "y" ? [...range].reverse() : range;
      const zoomedRange2 = zoomScaleRange(scaleRange, zoomRange);
      completeAxis[axis.id] = _extends({
        offset: 0,
        height: 0,
        triggerTooltip
      }, axis, {
        data,
        scale: point(axis.data, zoomedRange2),
        tickNumber: axis.data.length,
        colorScale: axis.colorMap && (axis.colorMap.type === "ordinal" ? getOrdinalColorScale(_extends({
          values: axis.data
        }, axis.colorMap)) : getColorScale(axis.colorMap))
      });
      if (isDateData(axis.data)) {
        const dateFormatter = createDateFormatter(axis, scaleRange);
        completeAxis[axis.id].valueFormatter = axis.valueFormatter ?? dateFormatter;
      }
    }
    if (axis.scaleType === "band" || axis.scaleType === "point") {
      return;
    }
    const scaleType = axis.scaleType ?? "linear";
    const domainLimit = axis.domainLimit ?? "nice";
    const axisExtremums = [axis.min ?? minData, axis.max ?? maxData];
    if (typeof domainLimit === "function") {
      const {
        min,
        max
      } = domainLimit(minData, maxData);
      axisExtremums[0] = min;
      axisExtremums[1] = max;
    }
    const rawTickNumber = getTickNumber(_extends({}, axis, {
      range,
      domain: axisExtremums
    }));
    const tickNumber = scaleTickNumberByRange(rawTickNumber, zoomRange);
    const zoomedRange = zoomScaleRange(range, zoomRange);
    const scale2 = getScale(scaleType, axisExtremums, zoomedRange);
    const finalScale = domainLimit === "nice" ? scale2.nice(rawTickNumber) : scale2;
    const [minDomain, maxDomain] = finalScale.domain();
    const domain = [axis.min ?? minDomain, axis.max ?? maxDomain];
    completeAxis[axis.id] = _extends({
      offset: 0,
      height: 0,
      triggerTooltip
    }, axis, {
      data,
      scaleType,
      scale: finalScale.domain(domain),
      tickNumber,
      colorScale: axis.colorMap && getColorScale(axis.colorMap),
      valueFormatter: axis.valueFormatter ?? createScalarFormatter(tickNumber, getScale(scaleType, range.map((v2) => scale2.invert(v2)), range))
    });
  });
  return {
    axis: completeAxis,
    axisIds: allAxis.map(({
      id
    }) => id)
  };
}

// node_modules/@mui/x-charts/esm/internals/isDefined.js
function isDefined(value) {
  return value !== null && value !== void 0;
}

// node_modules/@mui/x-charts/esm/internals/plugins/featurePlugins/useChartCartesianAxis/createAxisFilterMapper.js
function createAxisFilterMapper({
  zoomMap,
  zoomOptions,
  seriesConfig: seriesConfig5,
  formattedSeries,
  direction
}) {
  return (axis, axisIndex) => {
    var _a;
    const zoomOption = zoomOptions[axis.id];
    if (!zoomOption || zoomOption.filterMode !== "discard") {
      return null;
    }
    const zoom = zoomMap == null ? void 0 : zoomMap.get(axis.id);
    if (zoom === void 0 || zoom.start <= 0 && zoom.end >= 100) {
      return null;
    }
    let extremums = [];
    const scaleType = axis.scaleType;
    if (scaleType === "point" || scaleType === "band") {
      extremums = [0, (((_a = axis.data) == null ? void 0 : _a.length) ?? 1) - 1];
    } else {
      extremums = getAxisExtremum(axis, direction, seriesConfig5, axisIndex, formattedSeries);
    }
    let min;
    let max;
    const continuousScaleType = !scaleType || scaleType === "band" || scaleType === "point" ? "linear" : scaleType;
    [min, max] = getScale(continuousScaleType, extremums, [0, 100]).nice().domain();
    min = min instanceof Date ? min.getTime() : min;
    max = max instanceof Date ? max.getTime() : max;
    const minVal = min + zoom.start * (max - min) / 100;
    const maxVal = min + zoom.end * (max - min) / 100;
    return (value, dataIndex) => {
      var _a2;
      const val = value[direction] ?? ((_a2 = axis.data) == null ? void 0 : _a2[dataIndex]);
      if (val == null) {
        return true;
      }
      if (axis.scaleType === "point" || axis.scaleType === "band" || typeof val === "string") {
        return dataIndex >= minVal && dataIndex <= maxVal;
      }
      return val >= minVal && val <= maxVal;
    };
  };
}
var createGetAxisFilters = (filters) => ({
  currentAxisId,
  seriesXAxisId,
  seriesYAxisId,
  isDefaultAxis
}) => {
  return (value, dataIndex) => {
    var _a, _b;
    const axisId = currentAxisId === seriesXAxisId ? seriesYAxisId : seriesXAxisId;
    if (!axisId || isDefaultAxis) {
      return ((_b = (_a = Object.values(filters ?? {}))[0]) == null ? void 0 : _b.call(_a, value, dataIndex)) ?? true;
    }
    const data = [seriesYAxisId, seriesXAxisId].filter((id) => id !== currentAxisId).map((id) => filters[id ?? ""]).filter(isDefined);
    return data.every((f) => f(value, dataIndex));
  };
};

// node_modules/@mui/x-charts/esm/internals/plugins/featurePlugins/useChartCartesianAxis/createZoomLookup.js
var createZoomLookup = (axisDirection) => (axes = []) => axes.reduce((acc, v2) => {
  const {
    zoom,
    id: axisId
  } = v2;
  const defaultizedZoom = defaultizeZoom(zoom, axisId, axisDirection);
  if (defaultizedZoom) {
    acc[axisId] = defaultizedZoom;
  }
  return acc;
}, {});

// node_modules/@mui/x-charts/esm/internals/plugins/featurePlugins/useChartCartesianAxis/useChartCartesianAxisRendering.selectors.js
var createZoomMap = (zoom) => {
  const zoomItemMap = /* @__PURE__ */ new Map();
  zoom.forEach((zoomItem) => {
    zoomItemMap.set(zoomItem.axisId, zoomItem);
  });
  return zoomItemMap;
};
var selectorChartZoomState = (state) => state.zoom;
var selectorChartZoomIsInteracting = createSelector([selectorChartZoomState], (zoom) => zoom == null ? void 0 : zoom.isInteracting);
var selectorChartZoomMap = createSelector([selectorChartZoomState], (zoom) => (zoom == null ? void 0 : zoom.zoomData) && createZoomMap(zoom == null ? void 0 : zoom.zoomData));
var selectorChartZoomOptionsLookup = createSelector([selectorChartRawXAxis, selectorChartRawYAxis], (xAxis, yAxis) => _extends({}, createZoomLookup("x")(xAxis), createZoomLookup("y")(yAxis)));
var selectorChartAxisZoomOptionsLookup = createSelector([selectorChartZoomOptionsLookup, (_, axisId) => axisId], (axisLookup, axisId) => axisLookup[axisId]);
var selectorChartXFilter = createSelector([selectorChartZoomMap, selectorChartZoomOptionsLookup, selectorChartSeriesConfig, selectorChartSeriesProcessed], (zoomMap, zoomOptions, seriesConfig5, formattedSeries) => zoomMap && zoomOptions && createAxisFilterMapper({
  zoomMap,
  zoomOptions,
  seriesConfig: seriesConfig5,
  formattedSeries,
  direction: "x"
}));
var selectorChartYFilter = createSelector([selectorChartZoomMap, selectorChartZoomOptionsLookup, selectorChartSeriesConfig, selectorChartSeriesProcessed], (zoomMap, zoomOptions, seriesConfig5, formattedSeries) => zoomMap && zoomOptions && createAxisFilterMapper({
  zoomMap,
  zoomOptions,
  seriesConfig: seriesConfig5,
  formattedSeries,
  direction: "y"
}));
var selectorChartZoomAxisFilters = createSelector([selectorChartXFilter, selectorChartYFilter, selectorChartRawXAxis, selectorChartRawYAxis], (xMapper, yMapper, xAxis, yAxis) => {
  if (xMapper === void 0 || yMapper === void 0) {
    return void 0;
  }
  const xFilters = xAxis == null ? void 0 : xAxis.reduce((acc, axis, index) => {
    const filter = xMapper(axis, index);
    if (filter !== null) {
      acc[axis.id] = filter;
    }
    return acc;
  }, {});
  const yFilters = yAxis == null ? void 0 : yAxis.reduce((acc, axis, index) => {
    const filter = yMapper(axis, index);
    if (filter !== null) {
      acc[axis.id] = filter;
    }
    return acc;
  }, {});
  if (Object.keys(xFilters ?? {}).length === 0 && Object.keys(yFilters ?? {}).length === 0) {
    return void 0;
  }
  return createGetAxisFilters(_extends({}, xFilters, yFilters));
});
var selectorChartXAxis = createSelector([selectorChartRawXAxis, selectorChartDrawingArea, selectorChartSeriesProcessed, selectorChartSeriesConfig, selectorChartZoomMap, selectorChartZoomOptionsLookup, selectorChartZoomAxisFilters], (axis, drawingArea, formattedSeries, seriesConfig5, zoomMap, zoomOptions, getFilters) => computeAxisValue({
  drawingArea,
  formattedSeries,
  axis,
  seriesConfig: seriesConfig5,
  axisDirection: "x",
  zoomMap,
  zoomOptions,
  getFilters
}));
var selectorChartYAxis = createSelector([selectorChartRawYAxis, selectorChartDrawingArea, selectorChartSeriesProcessed, selectorChartSeriesConfig, selectorChartZoomMap, selectorChartZoomOptionsLookup, selectorChartZoomAxisFilters], (axis, drawingArea, formattedSeries, seriesConfig5, zoomMap, zoomOptions, getFilters) => computeAxisValue({
  drawingArea,
  formattedSeries,
  axis,
  seriesConfig: seriesConfig5,
  axisDirection: "y",
  zoomMap,
  zoomOptions,
  getFilters
}));
var selectorChartAxis = createSelector([selectorChartXAxis, selectorChartYAxis, (_, axisId) => axisId], (xAxes, yAxes, axisId) => (xAxes == null ? void 0 : xAxes.axis[axisId]) ?? (yAxes == null ? void 0 : yAxes.axis[axisId]));
var selectorChartRawAxis = createSelector([selectorChartRawXAxis, selectorChartRawYAxis, (state, axisId) => axisId], (xAxes, yAxes, axisId) => {
  const axis = (xAxes == null ? void 0 : xAxes.find((a) => a.id === axisId)) ?? (yAxes == null ? void 0 : yAxes.find((a) => a.id === axisId)) ?? null;
  if (!axis) {
    return void 0;
  }
  return axis;
});

// node_modules/@mui/x-charts/esm/internals/isBandScale.js
function isBandScale(scale2) {
  return scale2.bandwidth !== void 0;
}

// node_modules/@mui/x-charts/esm/internals/plugins/featurePlugins/useChartCartesianAxis/getAxisValue.js
function getAsANumber(value) {
  return value instanceof Date ? value.getTime() : value;
}
function getAxisIndex(axisConfig, pointerValue) {
  const {
    scale: scale2,
    data: axisData,
    reverse
  } = axisConfig;
  if (!isBandScale(scale2)) {
    const value = scale2.invert(pointerValue);
    if (axisData === void 0) {
      return -1;
    }
    const valueAsNumber = getAsANumber(value);
    const closestIndex = axisData == null ? void 0 : axisData.findIndex((pointValue, index) => {
      const v2 = getAsANumber(pointValue);
      if (v2 > valueAsNumber) {
        if (index === 0 || Math.abs(valueAsNumber - v2) <= Math.abs(valueAsNumber - getAsANumber(axisData[index - 1]))) {
          return true;
        }
      }
      if (v2 <= valueAsNumber) {
        if (index === axisData.length - 1 || Math.abs(getAsANumber(value) - v2) < Math.abs(getAsANumber(value) - getAsANumber(axisData[index + 1]))) {
          return true;
        }
      }
      return false;
    });
    return closestIndex;
  }
  const dataIndex = scale2.bandwidth() === 0 ? Math.floor((pointerValue - Math.min(...scale2.range()) + scale2.step() / 2) / scale2.step()) : Math.floor((pointerValue - Math.min(...scale2.range())) / scale2.step());
  if (dataIndex < 0 || dataIndex >= axisData.length) {
    return -1;
  }
  return reverse ? axisData.length - 1 - dataIndex : dataIndex;
}
function getAxisValue(axisConfig, pointerValue, dataIndex) {
  const {
    scale: scale2,
    data: axisData
  } = axisConfig;
  if (!isBandScale(scale2)) {
    const value = scale2.invert(pointerValue);
    if (dataIndex < 0) {
      return value;
    }
    return axisData[dataIndex];
  }
  if (dataIndex < 0 || dataIndex >= axisData.length) {
    return null;
  }
  return axisData[dataIndex];
}

// node_modules/@mui/x-charts/node_modules/@mui/x-internals/esm/fastObjectShallowCompare/fastObjectShallowCompare.js
var is = Object.is;
function fastObjectShallowCompare(a, b) {
  if (a === b) {
    return true;
  }
  if (!(a instanceof Object) || !(b instanceof Object)) {
    return false;
  }
  let aLength = 0;
  let bLength = 0;
  for (const key in a) {
    aLength += 1;
    if (!is(a[key], b[key])) {
      return false;
    }
    if (!(key in b)) {
      return false;
    }
  }
  for (const _ in b) {
    bLength += 1;
  }
  return aLength === bLength;
}

// node_modules/@mui/x-charts/esm/internals/plugins/featurePlugins/useChartInteraction/useChartInteraction.js
var useChartInteraction = ({
  store
}) => {
  const cleanInteraction = useEventCallback_default(() => {
    store.update((prev) => {
      return _extends({}, prev, {
        interaction: {
          pointer: null,
          item: null
        }
      });
    });
  });
  const removeItemInteraction = useEventCallback_default((itemToRemove) => {
    store.update((prev) => {
      const prevItem = prev.interaction.item;
      if (!itemToRemove) {
        return prevItem === null ? prev : _extends({}, prev, {
          interaction: _extends({}, prev.interaction, {
            item: null
          })
        });
      }
      if (prevItem === null || Object.keys(itemToRemove).some((key) => itemToRemove[key] !== prevItem[key])) {
        return prev;
      }
      return _extends({}, prev, {
        interaction: _extends({}, prev.interaction, {
          item: null
        })
      });
    });
  });
  const setItemInteraction = useEventCallback_default((newItem) => {
    store.update((prev) => {
      if (fastObjectShallowCompare(prev.interaction.item, newItem)) {
        return prev;
      }
      return _extends({}, prev, {
        interaction: _extends({}, prev.interaction, {
          item: newItem
        })
      });
    });
  });
  const setPointerCoordinate = useEventCallback_default((coordinate) => {
    store.update((prev) => _extends({}, prev, {
      interaction: _extends({}, prev.interaction, {
        pointer: coordinate
      })
    }));
  });
  return {
    instance: {
      cleanInteraction,
      setItemInteraction,
      removeItemInteraction,
      setPointerCoordinate
    }
  };
};
useChartInteraction.getInitialState = () => ({
  interaction: {
    item: null,
    pointer: null
  }
});
useChartInteraction.params = {};

// node_modules/@mui/x-charts/esm/internals/plugins/featurePlugins/useChartInteraction/useChartInteraction.selectors.js
var selectInteraction = (state) => state.interaction;
var selectorChartsInteractionIsInitialized = createSelector([selectInteraction], (interaction) => interaction !== void 0);
var selectorChartsInteractionItem = createSelector([selectInteraction], (interaction) => (interaction == null ? void 0 : interaction.item) ?? null);
var selectorChartsInteractionPointer = createSelector([selectInteraction], (interaction) => (interaction == null ? void 0 : interaction.pointer) ?? null);
var selectorChartsInteractionPointerX = createSelector([selectorChartsInteractionPointer], (pointer) => pointer && pointer.x);
var selectorChartsInteractionPointerY = createSelector([selectorChartsInteractionPointer], (pointer) => pointer && pointer.y);
var selectorChartsInteractionItemIsDefined = createSelector([selectorChartsInteractionItem], (item) => item !== null);

// node_modules/@mui/x-charts/esm/internals/plugins/featurePlugins/useChartCartesianAxis/useChartCartesianAxis.js
var useChartCartesianAxis = ({
  params,
  store,
  seriesConfig: seriesConfig5,
  svgRef,
  instance
}) => {
  const {
    xAxis,
    yAxis,
    dataset
  } = params;
  if (true) {
    const ids = [...xAxis ?? [], ...yAxis ?? []].filter((axis) => axis.id).map((axis) => axis.id);
    const duplicates = new Set(ids.filter((id, index) => ids.indexOf(id) !== index));
    if (duplicates.size > 0) {
      warnOnce([`MUI X Charts: The following axis ids are duplicated: ${Array.from(duplicates).join(", ")}.`, `Please make sure that each axis has a unique id.`].join("\n"), "error");
    }
  }
  const drawingArea = useSelector(store, selectorChartDrawingArea);
  const processedSeries = useSelector(store, selectorChartSeriesProcessed);
  const isInteractionEnabled = useSelector(store, selectorChartsInteractionIsInitialized);
  const {
    axis: xAxisWithScale,
    axisIds: xAxisIds
  } = useSelector(store, selectorChartXAxis);
  const {
    axis: yAxisWithScale,
    axisIds: yAxisIds
  } = useSelector(store, selectorChartYAxis);
  const isFirstRender = React7.useRef(true);
  React7.useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    store.update((prev) => _extends({}, prev, {
      cartesianAxis: _extends({}, prev.cartesianAxis, {
        x: defaultizeXAxis(xAxis, dataset),
        y: defaultizeYAxis(yAxis, dataset)
      })
    }));
  }, [seriesConfig5, drawingArea, xAxis, yAxis, dataset, store]);
  const usedXAxis = xAxisIds[0];
  const usedYAxis = yAxisIds[0];
  React7.useEffect(() => {
    const element = svgRef.current;
    if (!isInteractionEnabled || element === null || params.disableAxisListener) {
      return () => {
      };
    }
    const handleOut = () => {
      var _a;
      (_a = instance.cleanInteraction) == null ? void 0 : _a.call(instance);
    };
    const handleMove = (event) => {
      var _a, _b;
      const target = "targetTouches" in event ? event.targetTouches[0] : event;
      const svgPoint = getSVGPoint(element, target);
      if (!instance.isPointInside(svgPoint.x, svgPoint.y, event.target)) {
        (_a = instance.cleanInteraction) == null ? void 0 : _a.call(instance);
        return;
      }
      (_b = instance.setPointerCoordinate) == null ? void 0 : _b.call(instance, svgPoint);
    };
    const handleDown = (event) => {
      const target = event.currentTarget;
      if (!target) {
        return;
      }
      if ("hasPointerCapture" in target && target.hasPointerCapture(event.pointerId)) {
        target.releasePointerCapture(event.pointerId);
      }
    };
    element.addEventListener("pointerdown", handleDown);
    element.addEventListener("pointermove", handleMove);
    element.addEventListener("pointercancel", handleOut);
    element.addEventListener("pointerleave", handleOut);
    return () => {
      element.removeEventListener("pointerdown", handleDown);
      element.removeEventListener("pointermove", handleMove);
      element.removeEventListener("pointercancel", handleOut);
      element.removeEventListener("pointerleave", handleOut);
    };
  }, [svgRef, store, xAxisWithScale, usedXAxis, yAxisWithScale, usedYAxis, instance, params.disableAxisListener, isInteractionEnabled]);
  React7.useEffect(() => {
    const element = svgRef.current;
    const onAxisClick = params.onAxisClick;
    if (element === null || !onAxisClick) {
      return () => {
      };
    }
    const handleMouseClick = (event) => {
      event.preventDefault();
      let dataIndex = null;
      let isXAxis = false;
      const svgPoint = getSVGPoint(element, event);
      const xIndex = getAxisIndex(xAxisWithScale[usedXAxis], svgPoint.x);
      isXAxis = xIndex !== -1;
      dataIndex = isXAxis ? xIndex : getAxisIndex(yAxisWithScale[usedYAxis], svgPoint.y);
      const USED_AXIS_ID = isXAxis ? xAxisIds[0] : yAxisIds[0];
      if (dataIndex == null || dataIndex === -1) {
        return;
      }
      const axisValue = (isXAxis ? xAxisWithScale : yAxisWithScale)[USED_AXIS_ID].data[dataIndex];
      const seriesValues = {};
      Object.keys(processedSeries).filter((seriesType) => ["bar", "line"].includes(seriesType)).forEach((seriesType) => {
        var _a;
        (_a = processedSeries[seriesType]) == null ? void 0 : _a.seriesOrder.forEach((seriesId) => {
          const seriesItem = processedSeries[seriesType].series[seriesId];
          const providedXAxisId = seriesItem.xAxisId;
          const providedYAxisId = seriesItem.yAxisId;
          const axisKey = isXAxis ? providedXAxisId : providedYAxisId;
          if (axisKey === void 0 || axisKey === USED_AXIS_ID) {
            seriesValues[seriesId] = seriesItem.data[dataIndex];
          }
        });
      });
      onAxisClick(event, {
        dataIndex,
        axisValue,
        seriesValues
      });
    };
    element.addEventListener("click", handleMouseClick);
    return () => {
      element.removeEventListener("click", handleMouseClick);
    };
  }, [params.onAxisClick, processedSeries, svgRef, xAxisWithScale, xAxisIds, yAxisWithScale, yAxisIds, usedXAxis, usedYAxis]);
  return {};
};
useChartCartesianAxis.params = {
  xAxis: true,
  yAxis: true,
  dataset: true,
  onAxisClick: true,
  disableAxisListener: true
};
useChartCartesianAxis.getDefaultizedParams = ({
  params
}) => {
  return _extends({}, params, {
    colors: params.colors ?? rainbowSurgePalette,
    theme: params.theme ?? "light",
    defaultizedXAxis: defaultizeXAxis(params.xAxis, params.dataset),
    defaultizedYAxis: defaultizeYAxis(params.yAxis, params.dataset)
  });
};
useChartCartesianAxis.getInitialState = (params) => ({
  cartesianAxis: {
    x: params.defaultizedXAxis,
    y: params.defaultizedYAxis
  }
});

// node_modules/@mui/x-charts/node_modules/@mui/x-internals/esm/isDeepEqual/isDeepEqual.js
function isDeepEqual(a, b) {
  if (a === b) {
    return true;
  }
  if (a && b && typeof a === "object" && typeof b === "object") {
    if (a.constructor !== b.constructor) {
      return false;
    }
    if (Array.isArray(a)) {
      const length2 = a.length;
      if (length2 !== b.length) {
        return false;
      }
      for (let i = 0; i < length2; i += 1) {
        if (!isDeepEqual(a[i], b[i])) {
          return false;
        }
      }
      return true;
    }
    if (a instanceof Map && b instanceof Map) {
      if (a.size !== b.size) {
        return false;
      }
      const entriesA = Array.from(a.entries());
      for (let i = 0; i < entriesA.length; i += 1) {
        if (!b.has(entriesA[i][0])) {
          return false;
        }
      }
      for (let i = 0; i < entriesA.length; i += 1) {
        const entryA = entriesA[i];
        if (!isDeepEqual(entryA[1], b.get(entryA[0]))) {
          return false;
        }
      }
      return true;
    }
    if (a instanceof Set && b instanceof Set) {
      if (a.size !== b.size) {
        return false;
      }
      const entries = Array.from(a.entries());
      for (let i = 0; i < entries.length; i += 1) {
        if (!b.has(entries[i][0])) {
          return false;
        }
      }
      return true;
    }
    if (ArrayBuffer.isView(a) && ArrayBuffer.isView(b)) {
      const length2 = a.length;
      if (length2 !== b.length) {
        return false;
      }
      for (let i = 0; i < length2; i += 1) {
        if (a[i] !== b[i]) {
          return false;
        }
      }
      return true;
    }
    if (a.constructor === RegExp) {
      return a.source === b.source && a.flags === b.flags;
    }
    if (a.valueOf !== Object.prototype.valueOf) {
      return a.valueOf() === b.valueOf();
    }
    if (a.toString !== Object.prototype.toString) {
      return a.toString() === b.toString();
    }
    const keys = Object.keys(a);
    const length = keys.length;
    if (length !== Object.keys(b).length) {
      return false;
    }
    for (let i = 0; i < length; i += 1) {
      if (!Object.prototype.hasOwnProperty.call(b, keys[i])) {
        return false;
      }
    }
    for (let i = 0; i < length; i += 1) {
      const key = keys[i];
      if (!isDeepEqual(a[key], b[key])) {
        return false;
      }
    }
    return true;
  }
  return a !== a && b !== b;
}

// node_modules/@mui/x-charts/esm/internals/plugins/featurePlugins/useChartCartesianAxis/useChartCartesianInteraction.selectors.js
var optionalGetAxisId = (_, id) => id;
function indexGetter(value, axes, ids = axes.axisIds[0]) {
  return Array.isArray(ids) ? ids.map((id) => getAxisIndex(axes.axis[id], value)) : getAxisIndex(axes.axis[ids], value);
}
var selectorChartsInteractionXAxisIndex = createSelector([selectorChartsInteractionPointerX, selectorChartXAxis, optionalGetAxisId], (value, axes, id) => value === null ? null : indexGetter(value, axes, id));
var selectorChartsInteractionYAxisIndex = createSelector([selectorChartsInteractionPointerY, selectorChartYAxis, optionalGetAxisId], (value, axes, id) => value === null ? null : indexGetter(value, axes, id));
function valueGetter(value, axes, indexes, ids = axes.axisIds[0]) {
  return Array.isArray(ids) ? ids.map((id, axisIndex) => getAxisValue(axes.axis[id], value, indexes[axisIndex])) : getAxisValue(axes.axis[ids], value, indexes);
}
var selectorChartsInteractionXAxisValue = createSelector([selectorChartsInteractionPointerX, selectorChartXAxis, selectorChartsInteractionXAxisIndex, optionalGetAxisId], (x, xAxes, xIndex, id) => {
  if (x === null || xIndex === null || xAxes.axisIds.length === 0) {
    return null;
  }
  return valueGetter(x, xAxes, xIndex, id);
});
var selectorChartsInteractionYAxisValue = createSelector([selectorChartsInteractionPointerY, selectorChartYAxis, selectorChartsInteractionYAxisIndex, optionalGetAxisId], (y, yAxes, yIndex, id) => {
  if (y === null || yIndex === null || yAxes.axisIds.length === 0) {
    return null;
  }
  return valueGetter(y, yAxes, yIndex, id);
});
var selectorChartsInteractionTooltipXAxes = createSelector([selectorChartsInteractionPointerX, selectorChartXAxis], (value, axes) => {
  if (value === null) {
    return [];
  }
  return axes.axisIds.filter((id) => axes.axis[id].triggerTooltip).map((axisId) => ({
    axisId,
    dataIndex: getAxisIndex(axes.axis[axisId], value)
  })).filter(({
    dataIndex
  }) => dataIndex >= 0);
}, {
  memoizeOptions: {
    // Keep the same reference if array content is the same.
    // If possible, avoid this pattern by creating selectors that
    // uses string/number as arguments.
    resultEqualityCheck: isDeepEqual
  }
});
var selectorChartsInteractionTooltipYAxes = createSelector([selectorChartsInteractionPointerY, selectorChartYAxis], (value, axes) => {
  if (value === null) {
    return [];
  }
  return axes.axisIds.filter((id) => axes.axis[id].triggerTooltip).map((axisId) => ({
    axisId,
    dataIndex: getAxisIndex(axes.axis[axisId], value)
  })).filter(({
    dataIndex
  }) => dataIndex >= 0);
}, {
  memoizeOptions: {
    // Keep the same reference if array content is the same.
    // If possible, avoid this pattern by creating selectors that
    // uses string/number as arguments.
    resultEqualityCheck: isDeepEqual
  }
});
var selectorChartsInteractionAxisTooltip = createSelector([selectorChartsInteractionTooltipXAxes, selectorChartsInteractionTooltipYAxes], (xTooltip, yTooltip) => xTooltip.length > 0 || yTooltip.length > 0);

// node_modules/@mui/x-charts/esm/internals/plugins/featurePlugins/useChartZAxis/useChartZAxis.js
var React8 = __toESM(require_react(), 1);
function addDefaultId(axisConfig, defaultId) {
  if (axisConfig.id !== void 0) {
    return axisConfig;
  }
  return _extends({
    id: defaultId
  }, axisConfig);
}
function processColorMap(axisConfig) {
  if (!axisConfig.colorMap) {
    return axisConfig;
  }
  return _extends({}, axisConfig, {
    colorScale: axisConfig.colorMap.type === "ordinal" && axisConfig.data ? getOrdinalColorScale(_extends({
      values: axisConfig.data
    }, axisConfig.colorMap)) : getColorScale(axisConfig.colorMap.type === "continuous" ? _extends({
      min: axisConfig.min,
      max: axisConfig.max
    }, axisConfig.colorMap) : axisConfig.colorMap)
  });
}
function getZAxisState(zAxis, dataset) {
  if (!zAxis || zAxis.length === 0) {
    return {
      axis: {},
      axisIds: []
    };
  }
  const zAxisLookup = {};
  const axisIds = [];
  zAxis.forEach((axisConfig, index) => {
    const dataKey = axisConfig.dataKey;
    const defaultizedId = axisConfig.id ?? `defaultized-z-axis-${index}`;
    if (dataKey === void 0 || axisConfig.data !== void 0) {
      zAxisLookup[defaultizedId] = processColorMap(addDefaultId(axisConfig, defaultizedId));
      axisIds.push(defaultizedId);
      return;
    }
    if (dataset === void 0) {
      throw new Error("MUI X Charts: z-axis uses `dataKey` but no `dataset` is provided.");
    }
    zAxisLookup[defaultizedId] = processColorMap(addDefaultId(_extends({}, axisConfig, {
      data: dataset.map((d) => d[dataKey])
    }), defaultizedId));
    axisIds.push(defaultizedId);
  });
  return {
    axis: zAxisLookup,
    axisIds
  };
}
var useChartZAxis = ({
  params,
  store
}) => {
  const {
    zAxis,
    dataset
  } = params;
  const isFirstRender = React8.useRef(true);
  React8.useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    store.update((prev) => _extends({}, prev, {
      zAxis: getZAxisState(zAxis, dataset)
    }));
  }, [zAxis, dataset, store]);
  return {};
};
useChartZAxis.params = {
  zAxis: true,
  dataset: true
};
useChartZAxis.getInitialState = (params) => ({
  zAxis: getZAxisState(params.zAxis, params.dataset)
});

// node_modules/@mui/x-charts/esm/internals/plugins/featurePlugins/useChartZAxis/useChartZAxis.selectors.js
var selectRootState = (state) => state;
var selectorChartZAxis = createSelector([selectRootState], (state) => state.zAxis);

// node_modules/@mui/x-charts/node_modules/@mui/x-internals/esm/useAssertModelConsistency/useAssertModelConsistency.js
var React9 = __toESM(require_react(), 1);
function useAssertModelConsistencyOutsideOfProduction(parameters) {
  const {
    componentName,
    propName,
    controlled,
    defaultValue,
    warningPrefix = "MUI X"
  } = parameters;
  const [{
    initialDefaultValue,
    isControlled
  }] = React9.useState({
    initialDefaultValue: defaultValue,
    isControlled: controlled !== void 0
  });
  if (isControlled !== (controlled !== void 0)) {
    warnOnce([`${warningPrefix}: A component is changing the ${isControlled ? "" : "un"}controlled ${propName} state of ${componentName} to be ${isControlled ? "un" : ""}controlled.`, "Elements should not switch from uncontrolled to controlled (or vice versa).", `Decide between using a controlled or uncontrolled ${propName} element for the lifetime of the component.`, "The nature of the state is determined during the first render. It's considered controlled if the value is not `undefined`.", "More info: https://fb.me/react-controlled-components"], "error");
  }
  if (JSON.stringify(initialDefaultValue) !== JSON.stringify(defaultValue)) {
    warnOnce([`${warningPrefix}: A component is changing the default ${propName} state of an uncontrolled ${componentName} after being initialized. To suppress this warning opt to use a controlled ${componentName}.`], "error");
  }
}
var useAssertModelConsistency = false ? () => {
} : useAssertModelConsistencyOutsideOfProduction;

// node_modules/@mui/x-charts/esm/internals/plugins/featurePlugins/useChartHighlight/useChartHighlight.js
var useChartHighlight = ({
  store,
  params
}) => {
  useAssertModelConsistency({
    warningPrefix: "MUI X Charts",
    componentName: "Chart",
    propName: "highlightedItem",
    controlled: params.highlightedItem,
    defaultValue: null
  });
  useEnhancedEffect_default(() => {
    store.update((prevState) => prevState.highlight.item === params.highlightedItem ? prevState : _extends({}, prevState, {
      highlight: _extends({}, prevState.highlight, {
        item: params.highlightedItem
      })
    }));
  }, [store, params.highlightedItem]);
  const clearHighlight = useEventCallback_default(() => {
    var _a;
    (_a = params.onHighlightChange) == null ? void 0 : _a.call(params, null);
    store.update((prev) => _extends({}, prev, {
      highlight: {
        item: null
      }
    }));
  });
  const setHighlight = useEventCallback_default((newItem) => {
    var _a;
    const prevItem = store.getSnapshot().highlight.item;
    if (fastObjectShallowCompare(prevItem, newItem)) {
      return;
    }
    (_a = params.onHighlightChange) == null ? void 0 : _a.call(params, newItem);
    store.update((prev) => _extends({}, prev, {
      highlight: {
        item: newItem
      }
    }));
  });
  return {
    instance: {
      clearHighlight,
      setHighlight
    }
  };
};
useChartHighlight.getDefaultizedParams = ({
  params
}) => _extends({}, params, {
  highlightedItem: params.highlightedItem ?? null
});
useChartHighlight.getInitialState = (params) => ({
  highlight: {
    item: params.highlightedItem
  }
});
useChartHighlight.params = {
  highlightedItem: true,
  onHighlightChange: true
};

// node_modules/@mui/x-charts/esm/BarChart/seriesConfig/extremums.js
var createResult = (data, direction) => {
  if (direction === "x") {
    return {
      x: data,
      y: null
    };
  }
  return {
    x: null,
    y: data
  };
};
var getBaseExtremum = (params) => {
  var _a;
  const {
    axis,
    getFilters,
    isDefaultAxis
  } = params;
  const filter = getFilters == null ? void 0 : getFilters({
    currentAxisId: axis.id,
    isDefaultAxis
  });
  const data = filter ? (_a = axis.data) == null ? void 0 : _a.filter((_, i) => filter({
    x: null,
    y: null
  }, i)) : axis.data;
  const minX = Math.min(...data ?? []);
  const maxX = Math.max(...data ?? []);
  return [minX, maxX];
};
var getValueExtremum = (direction) => (params) => {
  const {
    series,
    axis,
    getFilters,
    isDefaultAxis
  } = params;
  return Object.keys(series).filter((seriesId) => {
    const axisId = direction === "x" ? series[seriesId].xAxisId : series[seriesId].yAxisId;
    return axisId === axis.id || isDefaultAxis && axisId === void 0;
  }).reduce((acc, seriesId) => {
    const {
      stackedData
    } = series[seriesId];
    const filter = getFilters == null ? void 0 : getFilters({
      currentAxisId: axis.id,
      isDefaultAxis,
      seriesXAxisId: series[seriesId].xAxisId,
      seriesYAxisId: series[seriesId].yAxisId
    });
    const [seriesMin, seriesMax] = (stackedData == null ? void 0 : stackedData.reduce((seriesAcc, values, index) => {
      if (filter && (!filter(createResult(values[0], direction), index) || !filter(createResult(values[1], direction), index))) {
        return seriesAcc;
      }
      return [Math.min(...values, seriesAcc[0]), Math.max(...values, seriesAcc[1])];
    }, [Infinity, -Infinity])) ?? [Infinity, -Infinity];
    return [Math.min(seriesMin, acc[0]), Math.max(seriesMax, acc[1])];
  }, [Infinity, -Infinity]);
};
var getExtremumX = (params) => {
  const isHorizontal = Object.keys(params.series).some((seriesId) => params.series[seriesId].layout === "horizontal");
  if (isHorizontal) {
    return getValueExtremum("x")(params);
  }
  return getBaseExtremum(params);
};
var getExtremumY = (params) => {
  const isHorizontal = Object.keys(params.series).some((seriesId) => params.series[seriesId].layout === "horizontal");
  if (isHorizontal) {
    return getBaseExtremum(params);
  }
  return getValueExtremum("y")(params);
};

// node_modules/@mui/x-charts/esm/internals/stackSeries.js
var StackOrder = {
  /**
   * Series order such that the earliest series (according to the maximum value) is at the bottom.
   * */
  appearance: appearance_default,
  /**
   *  Series order such that the smallest series (according to the sum of values) is at the bottom.
   * */
  ascending: ascending_default,
  /**
   * Series order such that the largest series (according to the sum of values) is at the bottom.
   */
  descending: descending_default,
  /**
   * Series order such that the earliest series (according to the maximum value) are on the inside and the later series are on the outside. This order is recommended for streamgraphs in conjunction with the wiggle offset. See Stacked Graphs—Geometry & Aesthetics by Byron & Wattenberg for more information.
   */
  insideOut: insideOut_default,
  /**
   * Given series order [0, 1, … n - 1] where n is the number of elements in series. Thus, the stack order is given by the key accessor.
   */
  none: none_default2,
  /**
   * Reverse of the given series order [n - 1, n - 2, … 0] where n is the number of elements in series. Thus, the stack order is given by the reverse of the key accessor.
   */
  reverse: reverse_default
};
var StackOffset = {
  /**
   * Applies a zero baseline and normalizes the values for each point such that the topline is always one.
   * */
  expand: expand_default,
  /**
   * Positive values are stacked above zero, negative values are stacked below zero, and zero values are stacked at zero.
   * */
  diverging: diverging_default,
  /**
   * Applies a zero baseline.
   * */
  none: none_default,
  /**
   * Shifts the baseline down such that the center of the streamgraph is always at zero.
   * */
  silhouette: silhouette_default,
  /**
   * Shifts the baseline so as to minimize the weighted wiggle of layers. This offset is recommended for streamgraphs in conjunction with the inside-out order. See Stacked Graphs—Geometry & Aesthetics by Bryon & Wattenberg for more information.
   * */
  wiggle: wiggle_default
};
var getStackingGroups = (params) => {
  const {
    series,
    seriesOrder,
    defaultStrategy
  } = params;
  const stackingGroups = [];
  const stackIndex = {};
  seriesOrder.forEach((id) => {
    const {
      stack,
      stackOrder,
      stackOffset
    } = series[id];
    if (stack === void 0) {
      stackingGroups.push({
        ids: [id],
        stackingOrder: StackOrder.none,
        stackingOffset: StackOffset.none
      });
    } else if (stackIndex[stack] === void 0) {
      stackIndex[stack] = stackingGroups.length;
      stackingGroups.push({
        ids: [id],
        stackingOrder: StackOrder[stackOrder ?? (defaultStrategy == null ? void 0 : defaultStrategy.stackOrder) ?? "none"],
        stackingOffset: StackOffset[stackOffset ?? (defaultStrategy == null ? void 0 : defaultStrategy.stackOffset) ?? "diverging"]
      });
    } else {
      stackingGroups[stackIndex[stack]].ids.push(id);
      if (stackOrder !== void 0) {
        stackingGroups[stackIndex[stack]].stackingOrder = StackOrder[stackOrder];
      }
      if (stackOffset !== void 0) {
        stackingGroups[stackIndex[stack]].stackingOffset = StackOffset[stackOffset];
      }
    }
  });
  return stackingGroups;
};

// node_modules/@mui/x-charts/esm/internals/defaultizeValueFormatter.js
function defaultizeValueFormatter(series, defaultValueFormatter) {
  const defaultizedSeries = {};
  Object.keys(series).forEach((seriesId) => {
    defaultizedSeries[seriesId] = _extends({}, series[seriesId], {
      valueFormatter: series[seriesId].valueFormatter ?? defaultValueFormatter
    });
  });
  return defaultizedSeries;
}

// node_modules/@mui/x-charts/esm/BarChart/seriesConfig/seriesProcessor.js
var seriesProcessor = (params, dataset) => {
  const {
    seriesOrder,
    series
  } = params;
  const stackingGroups = getStackingGroups(params);
  const d3Dataset = dataset ?? [];
  seriesOrder.forEach((id) => {
    const data = series[id].data;
    if (data !== void 0) {
      data.forEach((value, index) => {
        if (d3Dataset.length <= index) {
          d3Dataset.push({
            [id]: value
          });
        } else {
          d3Dataset[index][id] = value;
        }
      });
    } else if (dataset === void 0) {
      throw new Error([`MUI X Charts: bar series with id='${id}' has no data.`, "Either provide a data property to the series or use the dataset prop."].join("\n"));
    }
  });
  const completedSeries = {};
  stackingGroups.forEach((stackingGroup) => {
    const {
      ids,
      stackingOffset,
      stackingOrder
    } = stackingGroup;
    const stackedSeries = stack_default().keys(ids.map((id) => {
      const dataKey = series[id].dataKey;
      return series[id].data === void 0 && dataKey !== void 0 ? dataKey : id;
    })).value((d, key) => d[key] ?? 0).order(stackingOrder).offset(stackingOffset)(d3Dataset);
    ids.forEach((id, index) => {
      const dataKey = series[id].dataKey;
      completedSeries[id] = _extends({
        layout: "vertical",
        labelMarkType: "square"
      }, series[id], {
        data: dataKey ? dataset.map((data) => {
          const value = data[dataKey];
          if (typeof value !== "number") {
            if (true) {
              if (value !== null) {
                warnOnce([`MUI X Charts: your dataset key "${dataKey}" is used for plotting bars, but contains nonnumerical elements.`, "Bar plots only support numbers and null values."]);
              }
            }
            return null;
          }
          return value;
        }) : series[id].data,
        stackedData: stackedSeries[index].map(([a, b]) => [a, b])
      });
    });
  });
  return {
    seriesOrder,
    stackingGroups,
    series: defaultizeValueFormatter(completedSeries, (v2) => v2 == null ? "" : v2.toLocaleString())
  };
};
var seriesProcessor_default = seriesProcessor;

// node_modules/@mui/x-charts/esm/internals/getLabel.js
function getLabel(value, location) {
  return typeof value === "function" ? value(location) : value;
}

// node_modules/@mui/x-charts/esm/BarChart/seriesConfig/legend.js
var legendGetter = (params) => {
  const {
    seriesOrder,
    series
  } = params;
  return seriesOrder.reduce((acc, seriesId) => {
    const formattedLabel = getLabel(series[seriesId].label, "legend");
    if (formattedLabel === void 0) {
      return acc;
    }
    acc.push({
      markType: series[seriesId].labelMarkType,
      id: seriesId,
      seriesId,
      color: series[seriesId].color,
      label: formattedLabel
    });
    return acc;
  }, []);
};
var legend_default = legendGetter;

// node_modules/@mui/x-charts/esm/BarChart/seriesConfig/getColor.js
var getColor = (series, xAxis, yAxis) => {
  const verticalLayout = series.layout === "vertical";
  const bandColorScale = verticalLayout ? xAxis == null ? void 0 : xAxis.colorScale : yAxis == null ? void 0 : yAxis.colorScale;
  const valueColorScale = verticalLayout ? yAxis == null ? void 0 : yAxis.colorScale : xAxis == null ? void 0 : xAxis.colorScale;
  const bandValues = verticalLayout ? xAxis == null ? void 0 : xAxis.data : yAxis == null ? void 0 : yAxis.data;
  if (valueColorScale) {
    return (dataIndex) => {
      if (dataIndex === void 0) {
        return series.color;
      }
      const value = series.data[dataIndex];
      const color = value === null ? series.color : valueColorScale(value);
      if (color === null) {
        return series.color;
      }
      return color;
    };
  }
  if (bandColorScale && bandValues) {
    return (dataIndex) => {
      if (dataIndex === void 0) {
        return series.color;
      }
      const value = bandValues[dataIndex];
      const color = value === null ? series.color : bandColorScale(value);
      if (color === null) {
        return series.color;
      }
      return color;
    };
  }
  return () => series.color;
};
var getColor_default = getColor;

// node_modules/@mui/x-charts/esm/BarChart/seriesConfig/tooltip.js
var tooltipGetter = (params) => {
  const {
    series,
    getColor: getColor5,
    identifier
  } = params;
  if (!identifier || identifier.dataIndex === void 0) {
    return null;
  }
  const label = getLabel(series.label, "tooltip");
  const value = series.data[identifier.dataIndex];
  if (value == null) {
    return null;
  }
  const formattedValue = series.valueFormatter(value, {
    dataIndex: identifier.dataIndex
  });
  return {
    identifier,
    color: getColor5(identifier.dataIndex),
    label,
    value,
    formattedValue,
    markType: series.labelMarkType
  };
};
var axisTooltipGetter = (series) => {
  return Object.values(series).map((s) => s.layout === "horizontal" ? {
    direction: "y",
    axisId: s.yAxisId
  } : {
    direction: "x",
    axisId: s.xAxisId
  });
};
var tooltip_default = tooltipGetter;

// node_modules/@mui/x-charts/esm/BarChart/seriesConfig/getSeriesWithDefaultValues.js
var getSeriesWithDefaultValues = (seriesData, seriesIndex, colors) => {
  return _extends({
    id: seriesData.id ?? `auto-generated-id-${seriesIndex}`,
    color: colors[seriesIndex % colors.length]
  }, seriesData);
};
var getSeriesWithDefaultValues_default = getSeriesWithDefaultValues;

// node_modules/@mui/x-charts/esm/BarChart/seriesConfig/index.js
var seriesConfig = {
  seriesProcessor: seriesProcessor_default,
  colorProcessor: getColor_default,
  legendGetter: legend_default,
  tooltipGetter: tooltip_default,
  axisTooltipGetter,
  xExtremumGetter: getExtremumX,
  yExtremumGetter: getExtremumY,
  getSeriesWithDefaultValues: getSeriesWithDefaultValues_default
};

// node_modules/@mui/x-charts/esm/ScatterChart/seriesConfig/extremums.js
var mergeMinMax = (acc, val) => {
  return [val[0] === null ? acc[0] : Math.min(acc[0], val[0]), val[1] === null ? acc[1] : Math.max(acc[1], val[1])];
};
var getExtremumX2 = (params) => {
  const {
    series,
    axis,
    isDefaultAxis,
    getFilters
  } = params;
  return Object.keys(series).filter((seriesId) => {
    const axisId = series[seriesId].xAxisId;
    return axisId === axis.id || axisId === void 0 && isDefaultAxis;
  }).reduce((acc, seriesId) => {
    var _a;
    const filter = getFilters == null ? void 0 : getFilters({
      currentAxisId: axis.id,
      isDefaultAxis,
      seriesXAxisId: series[seriesId].xAxisId,
      seriesYAxisId: series[seriesId].yAxisId
    });
    const seriesMinMax = (_a = series[seriesId].data) == null ? void 0 : _a.reduce((accSeries, d, dataIndex) => {
      if (filter && !filter(d, dataIndex)) {
        return accSeries;
      }
      return mergeMinMax(accSeries, [d.x, d.x]);
    }, [Infinity, -Infinity]);
    return mergeMinMax(acc, seriesMinMax ?? [Infinity, -Infinity]);
  }, [Infinity, -Infinity]);
};
var getExtremumY2 = (params) => {
  const {
    series,
    axis,
    isDefaultAxis,
    getFilters
  } = params;
  return Object.keys(series).filter((seriesId) => {
    const axisId = series[seriesId].yAxisId;
    return axisId === axis.id || axisId === void 0 && isDefaultAxis;
  }).reduce((acc, seriesId) => {
    var _a;
    const filter = getFilters == null ? void 0 : getFilters({
      currentAxisId: axis.id,
      isDefaultAxis,
      seriesXAxisId: series[seriesId].xAxisId,
      seriesYAxisId: series[seriesId].yAxisId
    });
    const seriesMinMax = (_a = series[seriesId].data) == null ? void 0 : _a.reduce((accSeries, d, dataIndex) => {
      if (filter && !filter(d, dataIndex)) {
        return accSeries;
      }
      return mergeMinMax(accSeries, [d.y, d.y]);
    }, [Infinity, -Infinity]);
    return mergeMinMax(acc, seriesMinMax ?? [Infinity, -Infinity]);
  }, [Infinity, -Infinity]);
};

// node_modules/@mui/x-charts/esm/ScatterChart/seriesConfig/seriesProcessor.js
var seriesProcessor2 = ({
  series,
  seriesOrder
}, dataset) => {
  const completeSeries = Object.fromEntries(Object.entries(series).map(([seriesId, seriesData]) => {
    const datasetKeys = seriesData == null ? void 0 : seriesData.datasetKeys;
    const missingKeys = ["x", "y", "id"].filter((key) => typeof (datasetKeys == null ? void 0 : datasetKeys[key]) !== "string");
    if ((seriesData == null ? void 0 : seriesData.datasetKeys) && missingKeys.length > 0) {
      throw new Error([`MUI X Charts: scatter series with id='${seriesId}' has incomplete datasetKeys.`, `Properties ${missingKeys.map((key) => `"${key}"`).join(", ")} are missing.`].join("\n"));
    }
    const data = !datasetKeys ? seriesData.data ?? [] : (dataset == null ? void 0 : dataset.map((d) => {
      return {
        x: d[datasetKeys.x] ?? null,
        y: d[datasetKeys.y] ?? null,
        z: datasetKeys.z && d[datasetKeys.z],
        id: datasetKeys.id && d[datasetKeys.id]
      };
    })) ?? [];
    return [seriesId, _extends({
      labelMarkType: "circle",
      markerSize: 4
    }, seriesData, {
      data,
      valueFormatter: seriesData.valueFormatter ?? ((v2) => v2 && `(${v2.x}, ${v2.y})`)
    })];
  }));
  return {
    series: completeSeries,
    seriesOrder
  };
};
var seriesProcessor_default2 = seriesProcessor2;

// node_modules/@mui/x-charts/esm/ScatterChart/seriesConfig/getColor.js
var getColor2 = (series, xAxis, yAxis, zAxis) => {
  const zColorScale = zAxis == null ? void 0 : zAxis.colorScale;
  const yColorScale = yAxis == null ? void 0 : yAxis.colorScale;
  const xColorScale = xAxis == null ? void 0 : xAxis.colorScale;
  if (zColorScale) {
    return (dataIndex) => {
      var _a, _b;
      if (dataIndex === void 0) {
        return series.color;
      }
      if (((_a = zAxis == null ? void 0 : zAxis.data) == null ? void 0 : _a[dataIndex]) !== void 0) {
        const color2 = zColorScale((_b = zAxis == null ? void 0 : zAxis.data) == null ? void 0 : _b[dataIndex]);
        if (color2 !== null) {
          return color2;
        }
      }
      const value = series.data[dataIndex];
      const color = value === null ? series.color : zColorScale(value.z);
      if (color === null) {
        return series.color;
      }
      return color;
    };
  }
  if (yColorScale) {
    return (dataIndex) => {
      if (dataIndex === void 0) {
        return series.color;
      }
      const value = series.data[dataIndex];
      const color = value === null ? series.color : yColorScale(value.y);
      if (color === null) {
        return series.color;
      }
      return color;
    };
  }
  if (xColorScale) {
    return (dataIndex) => {
      if (dataIndex === void 0) {
        return series.color;
      }
      const value = series.data[dataIndex];
      const color = value === null ? series.color : xColorScale(value.x);
      if (color === null) {
        return series.color;
      }
      return color;
    };
  }
  return () => series.color;
};
var getColor_default2 = getColor2;

// node_modules/@mui/x-charts/esm/ScatterChart/seriesConfig/legend.js
var legendGetter2 = (params) => {
  const {
    seriesOrder,
    series
  } = params;
  return seriesOrder.reduce((acc, seriesId) => {
    const formattedLabel = getLabel(series[seriesId].label, "legend");
    if (formattedLabel === void 0) {
      return acc;
    }
    acc.push({
      markType: series[seriesId].labelMarkType,
      id: seriesId,
      seriesId,
      color: series[seriesId].color,
      label: formattedLabel
    });
    return acc;
  }, []);
};
var legend_default2 = legendGetter2;

// node_modules/@mui/x-charts/esm/ScatterChart/seriesConfig/tooltip.js
var tooltipGetter2 = (params) => {
  const {
    series,
    getColor: getColor5,
    identifier
  } = params;
  if (!identifier || identifier.dataIndex === void 0) {
    return null;
  }
  const label = getLabel(series.label, "tooltip");
  const value = series.data[identifier.dataIndex];
  const formattedValue = series.valueFormatter(value, {
    dataIndex: identifier.dataIndex
  });
  return {
    identifier,
    color: getColor5(identifier.dataIndex),
    label,
    value,
    formattedValue,
    markType: series.labelMarkType
  };
};
var tooltip_default2 = tooltipGetter2;

// node_modules/@mui/x-charts/esm/ScatterChart/seriesConfig/getSeriesWithDefaultValues.js
var getSeriesWithDefaultValues2 = (seriesData, seriesIndex, colors) => {
  return _extends({
    id: seriesData.id ?? `auto-generated-id-${seriesIndex}`,
    color: colors[seriesIndex % colors.length]
  }, seriesData);
};
var getSeriesWithDefaultValues_default2 = getSeriesWithDefaultValues2;

// node_modules/@mui/x-charts/esm/ScatterChart/seriesConfig/index.js
var seriesConfig2 = {
  seriesProcessor: seriesProcessor_default2,
  colorProcessor: getColor_default2,
  legendGetter: legend_default2,
  tooltipGetter: tooltip_default2,
  xExtremumGetter: getExtremumX2,
  yExtremumGetter: getExtremumY2,
  getSeriesWithDefaultValues: getSeriesWithDefaultValues_default2
};

// node_modules/@mui/x-charts/esm/LineChart/seriesConfig/extremums.js
var getExtremumX3 = (params) => {
  const {
    axis
  } = params;
  const minX = Math.min(...axis.data ?? []);
  const maxX = Math.max(...axis.data ?? []);
  return [minX, maxX];
};
function getSeriesExtremums(getValues, data, stackedData, filter) {
  return stackedData.reduce((seriesAcc, stackedValue, index) => {
    if (data[index] === null) {
      return seriesAcc;
    }
    const [base, value] = getValues(stackedValue);
    if (filter && (!filter({
      y: base,
      x: null
    }, index) || !filter({
      y: value,
      x: null
    }, index))) {
      return seriesAcc;
    }
    return [Math.min(base, value, seriesAcc[0]), Math.max(base, value, seriesAcc[1])];
  }, [Infinity, -Infinity]);
}
var getExtremumY3 = (params) => {
  const {
    series,
    axis,
    isDefaultAxis,
    getFilters
  } = params;
  return Object.keys(series).filter((seriesId) => {
    const yAxisId = series[seriesId].yAxisId;
    return yAxisId === axis.id || isDefaultAxis && yAxisId === void 0;
  }).reduce((acc, seriesId) => {
    const {
      area,
      stackedData,
      data
    } = series[seriesId];
    const isArea = area !== void 0;
    const filter = getFilters == null ? void 0 : getFilters({
      currentAxisId: axis.id,
      isDefaultAxis,
      seriesXAxisId: series[seriesId].xAxisId,
      seriesYAxisId: series[seriesId].yAxisId
    });
    const getValues = isArea && axis.scaleType !== "log" && typeof series[seriesId].baseline !== "string" ? (d) => d : (d) => [d[1], d[1]];
    const seriesExtremums = getSeriesExtremums(getValues, data, stackedData, filter);
    const [seriesMin, seriesMax] = seriesExtremums;
    return [Math.min(seriesMin, acc[0]), Math.max(seriesMax, acc[1])];
  }, [Infinity, -Infinity]);
};

// node_modules/@mui/x-charts/esm/LineChart/seriesConfig/seriesProcessor.js
var seriesProcessor3 = (params, dataset) => {
  const {
    seriesOrder,
    series
  } = params;
  const stackingGroups = getStackingGroups(_extends({}, params, {
    defaultStrategy: {
      stackOffset: "none"
    }
  }));
  const d3Dataset = dataset ?? [];
  seriesOrder.forEach((id) => {
    const data = series[id].data;
    if (data !== void 0) {
      data.forEach((value, index) => {
        if (d3Dataset.length <= index) {
          d3Dataset.push({
            [id]: value
          });
        } else {
          d3Dataset[index][id] = value;
        }
      });
    } else if (dataset === void 0 && true) {
      throw new Error([`MUI X Charts: line series with id='${id}' has no data.`, "Either provide a data property to the series or use the dataset prop."].join("\n"));
    }
  });
  const completedSeries = {};
  stackingGroups.forEach((stackingGroup) => {
    const {
      ids,
      stackingOrder,
      stackingOffset
    } = stackingGroup;
    const stackedSeries = stack_default().keys(ids.map((id) => {
      const dataKey = series[id].dataKey;
      return series[id].data === void 0 && dataKey !== void 0 ? dataKey : id;
    })).value((d, key) => d[key] ?? 0).order(stackingOrder).offset(stackingOffset)(d3Dataset);
    ids.forEach((id, index) => {
      const dataKey = series[id].dataKey;
      completedSeries[id] = _extends({
        labelMarkType: "line"
      }, series[id], {
        data: dataKey ? dataset.map((data) => {
          const value = data[dataKey];
          if (typeof value !== "number") {
            if (true) {
              if (value !== null) {
                warnOnce([`MUI X Charts: Your dataset key "${dataKey}" is used for plotting line, but contains nonnumerical elements.`, "Line plots only support numbers and null values."]);
              }
            }
            return null;
          }
          return value;
        }) : series[id].data,
        stackedData: stackedSeries[index].map(([a, b]) => [a, b])
      });
    });
  });
  return {
    seriesOrder,
    stackingGroups,
    series: defaultizeValueFormatter(completedSeries, (v2) => v2 == null ? "" : v2.toLocaleString())
  };
};
var seriesProcessor_default3 = seriesProcessor3;

// node_modules/@mui/x-charts/esm/LineChart/seriesConfig/getColor.js
var getColor3 = (series, xAxis, yAxis) => {
  const yColorScale = yAxis == null ? void 0 : yAxis.colorScale;
  const xColorScale = xAxis == null ? void 0 : xAxis.colorScale;
  if (yColorScale) {
    return (dataIndex) => {
      if (dataIndex === void 0) {
        return series.color;
      }
      const value = series.data[dataIndex];
      const color = value === null ? series.color : yColorScale(value);
      if (color === null) {
        return series.color;
      }
      return color;
    };
  }
  if (xColorScale) {
    return (dataIndex) => {
      var _a;
      if (dataIndex === void 0) {
        return series.color;
      }
      const value = (_a = xAxis.data) == null ? void 0 : _a[dataIndex];
      const color = value === null ? series.color : xColorScale(value);
      if (color === null) {
        return series.color;
      }
      return color;
    };
  }
  return () => series.color;
};
var getColor_default3 = getColor3;

// node_modules/@mui/x-charts/esm/LineChart/seriesConfig/legend.js
var legendGetter3 = (params) => {
  const {
    seriesOrder,
    series
  } = params;
  return seriesOrder.reduce((acc, seriesId) => {
    const formattedLabel = getLabel(series[seriesId].label, "legend");
    if (formattedLabel === void 0) {
      return acc;
    }
    acc.push({
      markType: series[seriesId].labelMarkType,
      id: seriesId,
      seriesId,
      color: series[seriesId].color,
      label: formattedLabel
    });
    return acc;
  }, []);
};
var legend_default3 = legendGetter3;

// node_modules/@mui/x-charts/esm/LineChart/seriesConfig/tooltip.js
var tooltipGetter3 = (params) => {
  const {
    series,
    getColor: getColor5,
    identifier
  } = params;
  if (!identifier || identifier.dataIndex === void 0) {
    return null;
  }
  const label = getLabel(series.label, "tooltip");
  const value = series.data[identifier.dataIndex];
  const formattedValue = series.valueFormatter(value, {
    dataIndex: identifier.dataIndex
  });
  return {
    identifier,
    color: getColor5(identifier.dataIndex),
    label,
    value,
    formattedValue,
    markType: series.labelMarkType
  };
};
var axisTooltipGetter2 = (series) => {
  return Object.values(series).map((s) => ({
    direction: "x",
    axisId: s.xAxisId
  }));
};
var tooltip_default3 = tooltipGetter3;

// node_modules/@mui/x-charts/esm/LineChart/seriesConfig/getSeriesWithDefaultValues.js
var getSeriesWithDefaultValues3 = (seriesData, seriesIndex, colors) => {
  return _extends({
    id: seriesData.id ?? `auto-generated-id-${seriesIndex}`,
    color: colors[seriesIndex % colors.length]
  }, seriesData);
};
var getSeriesWithDefaultValues_default3 = getSeriesWithDefaultValues3;

// node_modules/@mui/x-charts/esm/LineChart/seriesConfig/index.js
var seriesConfig3 = {
  colorProcessor: getColor_default3,
  seriesProcessor: seriesProcessor_default3,
  legendGetter: legend_default3,
  tooltipGetter: tooltip_default3,
  axisTooltipGetter: axisTooltipGetter2,
  xExtremumGetter: getExtremumX3,
  yExtremumGetter: getExtremumY3,
  getSeriesWithDefaultValues: getSeriesWithDefaultValues_default3
};

// node_modules/@mui/x-charts/esm/PieChart/seriesConfig/seriesProcessor.js
var getSortingComparator = (comparator = "none") => {
  if (typeof comparator === "function") {
    return comparator;
  }
  switch (comparator) {
    case "none":
      return null;
    case "desc":
      return (a, b) => b - a;
    case "asc":
      return (a, b) => a - b;
    default:
      return null;
  }
};
var seriesProcessor4 = (params) => {
  const {
    seriesOrder,
    series
  } = params;
  const defaultizedSeries = {};
  seriesOrder.forEach((seriesId) => {
    const arcs = pie_default().startAngle(2 * Math.PI * (series[seriesId].startAngle ?? 0) / 360).endAngle(2 * Math.PI * (series[seriesId].endAngle ?? 360) / 360).padAngle(2 * Math.PI * (series[seriesId].paddingAngle ?? 0) / 360).sortValues(getSortingComparator(series[seriesId].sortingValues ?? "none"))(series[seriesId].data.map((piePoint) => piePoint.value));
    defaultizedSeries[seriesId] = _extends({
      labelMarkType: "circle",
      valueFormatter: (item) => item.value.toLocaleString()
    }, series[seriesId], {
      data: series[seriesId].data.map((item, index) => _extends({}, item, {
        id: item.id ?? `auto-generated-pie-id-${seriesId}-${index}`
      }, arcs[index])).map((item, index) => {
        var _a, _b;
        return _extends({
          labelMarkType: "circle"
        }, item, {
          formattedValue: ((_b = (_a = series[seriesId]).valueFormatter) == null ? void 0 : _b.call(_a, _extends({}, item, {
            label: getLabel(item.label, "arc")
          }), {
            dataIndex: index
          })) ?? item.value.toLocaleString()
        });
      })
    });
  });
  return {
    seriesOrder,
    series: defaultizedSeries
  };
};
var seriesProcessor_default4 = seriesProcessor4;

// node_modules/@mui/x-charts/esm/PieChart/seriesConfig/getColor.js
var getColor4 = (series) => {
  return (dataIndex) => {
    return series.data[dataIndex].color;
  };
};
var getColor_default4 = getColor4;

// node_modules/@mui/x-charts/esm/PieChart/seriesConfig/legend.js
var legendGetter4 = (params) => {
  const {
    seriesOrder,
    series
  } = params;
  return seriesOrder.reduce((acc, seriesId) => {
    series[seriesId].data.forEach((item, dataIndex) => {
      const formattedLabel = getLabel(item.label, "legend");
      if (formattedLabel === void 0) {
        return;
      }
      acc.push({
        markType: item.labelMarkType ?? series[seriesId].labelMarkType,
        id: item.id ?? dataIndex,
        seriesId,
        color: item.color,
        label: formattedLabel,
        itemId: item.id ?? dataIndex
      });
    });
    return acc;
  }, []);
};
var legend_default4 = legendGetter4;

// node_modules/@mui/x-charts/esm/PieChart/seriesConfig/tooltip.js
var tooltipGetter4 = (params) => {
  const {
    series,
    getColor: getColor5,
    identifier
  } = params;
  if (!identifier || identifier.dataIndex === void 0) {
    return null;
  }
  const point2 = series.data[identifier.dataIndex];
  if (point2 == null) {
    return null;
  }
  const label = getLabel(point2.label, "tooltip");
  const value = _extends({}, point2, {
    label
  });
  const formattedValue = series.valueFormatter(value, {
    dataIndex: identifier.dataIndex
  });
  return {
    identifier,
    color: getColor5(identifier.dataIndex),
    label,
    value,
    formattedValue,
    markType: point2.labelMarkType ?? series.labelMarkType
  };
};
var tooltip_default4 = tooltipGetter4;

// node_modules/@mui/x-charts/esm/PieChart/seriesConfig/getSeriesWithDefaultValues.js
var getSeriesWithDefaultValues4 = (seriesData, seriesIndex, colors) => {
  return _extends({
    id: seriesData.id ?? `auto-generated-id-${seriesIndex}`
  }, seriesData, {
    data: seriesData.data.map((d, index) => _extends({
      color: colors[index % colors.length]
    }, d))
  });
};
var getSeriesWithDefaultValues_default4 = getSeriesWithDefaultValues4;

// node_modules/@mui/x-charts/esm/PieChart/seriesConfig/index.js
var seriesConfig4 = {
  colorProcessor: getColor_default4,
  seriesProcessor: seriesProcessor_default4,
  legendGetter: legend_default4,
  tooltipGetter: tooltip_default4,
  getSeriesWithDefaultValues: getSeriesWithDefaultValues_default4
};

// node_modules/@mui/x-charts/esm/context/ChartProvider/ChartProvider.js
var import_jsx_runtime = __toESM(require_jsx_runtime(), 1);
var defaultSeriesConfig = {
  bar: seriesConfig,
  scatter: seriesConfig2,
  line: seriesConfig3,
  pie: seriesConfig4
};
var defaultPlugins = [useChartZAxis, useChartCartesianAxis, useChartInteraction, useChartHighlight];
function ChartProvider(props) {
  const {
    children,
    plugins = defaultPlugins,
    pluginParams = {},
    seriesConfig: seriesConfig5 = defaultSeriesConfig
  } = props;
  const {
    contextValue
  } = useCharts(plugins, pluginParams, seriesConfig5);
  return (0, import_jsx_runtime.jsx)(ChartContext.Provider, {
    value: contextValue,
    children
  });
}

// node_modules/@mui/x-charts/esm/context/ChartProvider/useChartContext.js
var React11 = __toESM(require_react(), 1);
var useChartContext = () => {
  const context = React11.useContext(ChartContext);
  if (context == null) {
    throw new Error(["MUI X Charts: Could not find the Chart context.", "It looks like you rendered your component outside of a ChartDataProvider.", "This can also happen if you are bundling multiple versions of the library."].join("\n"));
  }
  return context;
};

// node_modules/@mui/x-charts/esm/hooks/useInteractionItemProps.js
var onPointerDown = (event) => {
  if ("hasPointerCapture" in event.currentTarget && event.currentTarget.hasPointerCapture(event.pointerId)) {
    event.currentTarget.releasePointerCapture(event.pointerId);
  }
};
var useInteractionItemProps = (data, skip) => {
  const {
    instance
  } = useChartContext();
  const interactionActive = React12.useRef(false);
  const onPointerEnter = React12.useCallback(() => {
    interactionActive.current = true;
    instance.setItemInteraction({
      type: data.type,
      seriesId: data.seriesId,
      dataIndex: data.dataIndex
    });
    instance.setHighlight({
      seriesId: data.seriesId,
      dataIndex: data.dataIndex
    });
  }, [instance, data.type, data.seriesId, data.dataIndex]);
  const onPointerLeave = React12.useCallback(() => {
    interactionActive.current = false;
    instance.removeItemInteraction({
      type: data.type,
      seriesId: data.seriesId,
      dataIndex: data.dataIndex
    });
    instance.clearHighlight();
  }, [instance, data.type, data.seriesId, data.dataIndex]);
  React12.useEffect(() => {
    return () => {
      if (interactionActive.current) {
        onPointerLeave();
      }
    };
  }, [onPointerLeave]);
  if (skip) {
    return {};
  }
  return {
    onPointerEnter,
    onPointerLeave,
    onPointerDown
  };
};

// node_modules/@mui/x-charts/esm/internals/store/useStore.js
function useStore() {
  const context = useChartContext();
  if (!context) {
    throw new Error(["MUI X Charts: Could not find the charts context.", "It looks like you rendered your component outside of a ChartContainer parent component."].join("\n"));
  }
  return context.store;
}

// node_modules/@mui/x-charts/esm/internals/plugins/featurePlugins/useChartHighlight/createIsHighlighted.js
var createIsHighlighted = (highlightScope, highlightedItem) => (item) => {
  if (!highlightScope || !highlightedItem || !item) {
    return false;
  }
  if (highlightScope.highlight === "series") {
    return item.seriesId === highlightedItem.seriesId;
  }
  if (highlightScope.highlight === "item") {
    return item.dataIndex === highlightedItem.dataIndex && item.seriesId === highlightedItem.seriesId;
  }
  return false;
};

// node_modules/@mui/x-charts/esm/internals/plugins/featurePlugins/useChartHighlight/createIsFaded.js
var createIsFaded = (highlightScope, highlightedItem) => (item) => {
  if (!highlightScope || !highlightedItem || !item) {
    return false;
  }
  if (highlightScope.fade === "series") {
    return item.seriesId === highlightedItem.seriesId && item.dataIndex !== highlightedItem.dataIndex;
  }
  if (highlightScope.fade === "global") {
    return item.seriesId !== highlightedItem.seriesId || item.dataIndex !== highlightedItem.dataIndex;
  }
  return false;
};

// node_modules/@mui/x-charts/esm/internals/plugins/featurePlugins/useChartHighlight/useChartHighlight.selectors.js
var selectHighlight = (state) => state.highlight;
var selectSeries = (state) => state.series;
var selectorChartsHighlightScopePerSeriesId = createSelector([selectSeries], (series) => {
  const map = /* @__PURE__ */ new Map();
  Object.keys(series.processedSeries).forEach((seriesType) => {
    var _a;
    const seriesData = series.processedSeries[seriesType];
    (_a = seriesData == null ? void 0 : seriesData.seriesOrder) == null ? void 0 : _a.forEach((seriesId) => {
      const seriesItem = seriesData == null ? void 0 : seriesData.series[seriesId];
      map.set(seriesId, seriesItem == null ? void 0 : seriesItem.highlightScope);
    });
  });
  return map;
});
var selectorChartsHighlightedItem = createSelector([selectHighlight], (highlight) => highlight.item);
var selectorChartsHighlightScope = createSelector([selectorChartsHighlightScopePerSeriesId, selectorChartsHighlightedItem], (seriesIdToHighlightScope, highlightedItem) => {
  if (!highlightedItem) {
    return null;
  }
  const highlightScope = seriesIdToHighlightScope.get(highlightedItem.seriesId);
  if (highlightScope === void 0) {
    return null;
  }
  return highlightScope;
});
var selectorChartsIsHighlightedCallback = createSelector([selectorChartsHighlightScope, selectorChartsHighlightedItem], createIsHighlighted);
var selectorChartsIsFadedCallback = createSelector([selectorChartsHighlightScope, selectorChartsHighlightedItem], createIsFaded);
var selectorChartsIsHighlighted = createSelector([selectorChartsHighlightScope, selectorChartsHighlightedItem, (_, item) => item], (highlightScope, highlightedItem, item) => createIsHighlighted(highlightScope, highlightedItem)(item));
var selectorChartsIsFaded = createSelector([selectorChartsHighlightScope, selectorChartsHighlightedItem, (_, item) => item], (highlightScope, highlightedItem, item) => createIsFaded(highlightScope, highlightedItem)(item));

// node_modules/@mui/x-charts/esm/hooks/useItemHighlighted.js
function useItemHighlighted(item) {
  const store = useStore();
  const isHighlighted = useSelector(store, selectorChartsIsHighlighted, [item]);
  const isFaded = useSelector(store, selectorChartsIsFaded, [item]);
  return {
    isHighlighted,
    isFaded: !isHighlighted && isFaded
  };
}

// node_modules/@mui/x-charts/esm/LineChart/AnimatedArea.js
var React19 = __toESM(require_react(), 1);
var import_prop_types2 = __toESM(require_prop_types(), 1);

// node_modules/@mui/x-charts/esm/internals/animation/useAnimateInternal.js
var React13 = __toESM(require_react(), 1);

// node_modules/@mui/x-charts/esm/internals/animation/animation.js
var import_bezier_easing = __toESM(require_src(), 1);
var ANIMATION_DURATION_MS = 300;
var ANIMATION_TIMING_FUNCTION = "cubic-bezier(0.66, 0, 0.34, 1)";
var ANIMATION_TIMING_FUNCTION_JS = (0, import_bezier_easing.default)(0.66, 0, 0.34, 1);

// node_modules/d3-timer/src/timer.js
var frame = 0;
var timeout = 0;
var interval = 0;
var pokeDelay = 1e3;
var taskHead;
var taskTail;
var clockLast = 0;
var clockNow = 0;
var clockSkew = 0;
var clock = typeof performance === "object" && performance.now ? performance : Date;
var setFrame = typeof window === "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(f) {
  setTimeout(f, 17);
};
function now() {
  return clockNow || (setFrame(clearNow), clockNow = clock.now() + clockSkew);
}
function clearNow() {
  clockNow = 0;
}
function Timer() {
  this._call = this._time = this._next = null;
}
Timer.prototype = timer.prototype = {
  constructor: Timer,
  restart: function(callback, delay, time2) {
    if (typeof callback !== "function") throw new TypeError("callback is not a function");
    time2 = (time2 == null ? now() : +time2) + (delay == null ? 0 : +delay);
    if (!this._next && taskTail !== this) {
      if (taskTail) taskTail._next = this;
      else taskHead = this;
      taskTail = this;
    }
    this._call = callback;
    this._time = time2;
    sleep();
  },
  stop: function() {
    if (this._call) {
      this._call = null;
      this._time = Infinity;
      sleep();
    }
  }
};
function timer(callback, delay, time2) {
  var t = new Timer();
  t.restart(callback, delay, time2);
  return t;
}
function timerFlush() {
  now();
  ++frame;
  var t = taskHead, e;
  while (t) {
    if ((e = clockNow - t._time) >= 0) t._call.call(void 0, e);
    t = t._next;
  }
  --frame;
}
function wake() {
  clockNow = (clockLast = clock.now()) + clockSkew;
  frame = timeout = 0;
  try {
    timerFlush();
  } finally {
    frame = 0;
    nap();
    clockNow = 0;
  }
}
function poke() {
  var now2 = clock.now(), delay = now2 - clockLast;
  if (delay > pokeDelay) clockSkew -= delay, clockLast = now2;
}
function nap() {
  var t0, t1 = taskHead, t2, time2 = Infinity;
  while (t1) {
    if (t1._call) {
      if (time2 > t1._time) time2 = t1._time;
      t0 = t1, t1 = t1._next;
    } else {
      t2 = t1._next, t1._next = null;
      t1 = t0 ? t0._next = t2 : taskHead = t2;
    }
  }
  taskTail = t0;
  sleep(time2);
}
function sleep(time2) {
  if (frame) return;
  if (timeout) timeout = clearTimeout(timeout);
  var delay = time2 - clockNow;
  if (delay > 24) {
    if (time2 < Infinity) timeout = setTimeout(wake, time2 - clock.now() - clockSkew);
    if (interval) interval = clearInterval(interval);
  } else {
    if (!interval) clockLast = clock.now(), interval = setInterval(poke, pokeDelay);
    frame = 1, setFrame(wake);
  }
}

// node_modules/d3-timer/src/timeout.js
function timeout_default(callback, delay, time2) {
  var t = new Timer();
  delay = delay == null ? 0 : +delay;
  t.restart((elapsed) => {
    t.stop();
    callback(elapsed + delay);
  }, delay, time2);
  return t;
}

// node_modules/@mui/x-charts/esm/internals/animation/Transition.js
var Transition = class {
  /**
   * Create a new ResumableTransition.
   * @param duration Duration in milliseconds
   * @param easingFn The easing function
   * @param onTick Callback function called on each animation frame with the eased time in range [0, 1].
   */
  constructor(duration, easingFn, onTick) {
    this.duration = void 0;
    this.elapsed = 0;
    this.easingFn = void 0;
    this.timer = null;
    this.onTickCallback = void 0;
    this.duration = duration;
    this.easingFn = easingFn;
    this.onTickCallback = onTick;
    this.resume();
  }
  get running() {
    return this.timer !== null;
  }
  timerCallback(elapsed) {
    this.elapsed = Math.min(elapsed, this.duration);
    const t = this.duration === 0 ? 1 : this.elapsed / this.duration;
    const easedT = this.easingFn(t);
    this.onTickCallback(easedT);
    if (this.elapsed >= this.duration) {
      this.stop();
    }
  }
  /**
   * Resume the transition
   */
  resume() {
    if (this.running || this.elapsed >= this.duration) {
      return this;
    }
    const time2 = now() - this.elapsed;
    this.timer = timer((elapsed) => this.timerCallback(elapsed), 0, time2);
    timerFlush();
    return this;
  }
  /**
   * Stops the transition.
   */
  stop() {
    if (!this.running) {
      return this;
    }
    if (this.timer) {
      this.timer.stop();
      this.timer = null;
    }
    return this;
  }
  /**
   * Immediately finishes the transition and calls the tick callback with the final value.
   */
  finish() {
    this.stop();
    timeout_default(() => this.timerCallback(this.duration));
    timerFlush();
    return this;
  }
};

// node_modules/@mui/x-charts/esm/internals/shallowEqual.js
function shallowEqual(objA, objB) {
  if (Object.is(objA, objB)) {
    return true;
  }
  if (typeof objA !== "object" || objA === null || typeof objB !== "object" || objB === null) {
    return false;
  }
  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);
  if (keysA.length !== keysB.length) {
    return false;
  }
  for (let i = 0; i < keysA.length; i += 1) {
    const currentKey = keysA[i];
    if (!Object.prototype.hasOwnProperty.call(objB, currentKey) || // @ts-ignore
    !Object.is(objA[currentKey], objB[currentKey])) {
      return false;
    }
  }
  return true;
}

// node_modules/@mui/x-charts/esm/internals/animation/useAnimateInternal.js
function useAnimateInternal(props, {
  createInterpolator,
  applyProps,
  skip,
  initialProps = props
}) {
  const lastInterpolatedPropsRef = React13.useRef(initialProps);
  const transitionRef = React13.useRef(null);
  const elementRef = React13.useRef(null);
  const lastPropsRef = React13.useRef(props);
  useEnhancedEffect_default(() => {
    lastPropsRef.current = props;
  }, [props]);
  useEnhancedEffect_default(() => {
    var _a;
    if (skip) {
      (_a = transitionRef.current) == null ? void 0 : _a.finish();
      transitionRef.current = null;
      elementRef.current = null;
      lastInterpolatedPropsRef.current = props;
    }
  }, [props, skip]);
  const animate = React13.useCallback((element) => {
    const lastInterpolatedProps = lastInterpolatedPropsRef.current;
    const interpolate = createInterpolator(lastInterpolatedProps, props);
    transitionRef.current = new Transition(ANIMATION_DURATION_MS, ANIMATION_TIMING_FUNCTION_JS, (t) => {
      const interpolatedProps = interpolate(t);
      lastInterpolatedPropsRef.current = interpolatedProps;
      applyProps(element, interpolatedProps);
    });
  }, [applyProps, createInterpolator, props]);
  const setRef = React13.useCallback((element) => {
    var _a, _b, _c, _d;
    if (element === null) {
      (_a = transitionRef.current) == null ? void 0 : _a.stop();
      return;
    }
    const lastElement = elementRef.current;
    if (lastElement === element) {
      if (shallowEqual(lastPropsRef.current, props)) {
        (_b = transitionRef.current) == null ? void 0 : _b.resume();
        return;
      }
      (_c = transitionRef.current) == null ? void 0 : _c.stop();
    }
    if (lastElement) {
      (_d = transitionRef.current) == null ? void 0 : _d.stop();
    }
    elementRef.current = element;
    if (transitionRef.current || !skip) {
      animate(element);
    }
  }, [animate, props, skip]);
  return setRef;
}

// node_modules/@mui/x-charts/esm/hooks/animation/useAnimate.js
function useAnimate(props, {
  createInterpolator,
  transformProps,
  applyProps,
  skip,
  initialProps = props,
  ref
}) {
  const transform = transformProps ?? ((p) => p);
  const animateRef = useAnimateInternal(props, {
    initialProps,
    createInterpolator,
    applyProps: (element, animatedProps) => applyProps(element, transform(animatedProps)),
    skip
  });
  const usedProps = skip ? props : initialProps;
  return _extends({}, transformProps(usedProps), {
    ref: useForkRef(animateRef, ref)
  });
}

// node_modules/@mui/x-charts/esm/hooks/animation/useAnimateArea.js
function useAnimateArea(props) {
  return useAnimate({
    d: props.d
  }, {
    createInterpolator: (lastProps, newProps) => {
      const interpolate = string_default(lastProps.d, newProps.d);
      return (t) => ({
        d: interpolate(t)
      });
    },
    applyProps: (element, {
      d
    }) => element.setAttribute("d", d),
    transformProps: (p) => p,
    skip: props.skipAnimation,
    ref: props.ref
  });
}

// node_modules/@mui/x-charts/esm/LineChart/AppearingMask.js
var React18 = __toESM(require_react(), 1);

// node_modules/@mui/x-charts/esm/internals/cleanId.js
function cleanId(id) {
  return id.replace(" ", "_");
}

// node_modules/@mui/x-charts/esm/hooks/useDrawingArea.js
function useDrawingArea() {
  const store = useStore();
  return useSelector(store, selectorChartDrawingArea);
}

// node_modules/@mui/x-charts/esm/hooks/useChartId.js
function useChartId2() {
  const store = useStore();
  return useSelector(store, selectorChartId);
}

// node_modules/@mui/x-charts/esm/internals/plugins/featurePlugins/useChartPolarAxis/useChartPolarAxis.js
var React14 = __toESM(require_react(), 1);

// node_modules/@mui/x-charts/esm/internals/plugins/featurePlugins/useChartPolarAxis/defaultizeAxis.js
function defaultizeAxis(inAxis, dataset, axisName) {
  const DEFAULT_AXIS_KEY = axisName === "rotation" ? DEFAULT_ROTATION_AXIS_KEY : DEFAULT_RADIUS_AXIS_KEY;
  const inputAxes = inAxis && inAxis.length > 0 ? inAxis : [{
    id: DEFAULT_AXIS_KEY
  }];
  return inputAxes.map((axisConfig, index) => {
    const id = `defaultized-${axisName}-axis-${index}`;
    const dataKey = axisConfig.dataKey;
    if (dataKey === void 0 || axisConfig.data !== void 0) {
      return _extends({
        id
      }, axisConfig);
    }
    if (dataset === void 0) {
      throw new Error(`MUI X Charts: ${axisName}-axis uses \`dataKey\` but no \`dataset\` is provided.`);
    }
    return _extends({
      id,
      data: dataset.map((d) => d[dataKey])
    }, axisConfig);
  });
}

// node_modules/@mui/x-charts/esm/internals/isPolar.js
function isPolarSeriesType(seriesType) {
  return polarSeriesTypes.getTypes().has(seriesType);
}

// node_modules/@mui/x-charts/esm/internals/plugins/featurePlugins/useChartPolarAxis/getAxisExtremum.js
var axisExtremumCallback2 = (acc, chartType, axis, axisDirection, seriesConfig5, axisIndex, formattedSeries) => {
  var _a;
  const getter = axisDirection === "rotation" ? seriesConfig5[chartType].rotationExtremumGetter : seriesConfig5[chartType].radiusExtremumGetter;
  const series = ((_a = formattedSeries[chartType]) == null ? void 0 : _a.series) ?? {};
  const [minChartTypeData, maxChartTypeData] = (getter == null ? void 0 : getter({
    series,
    axis,
    axisIndex,
    isDefaultAxis: axisIndex === 0
  })) ?? [Infinity, -Infinity];
  const [minData, maxData] = acc;
  return [Math.min(minChartTypeData, minData), Math.max(maxChartTypeData, maxData)];
};
var getAxisExtremum2 = (axis, axisDirection, seriesConfig5, axisIndex, formattedSeries) => {
  const polarSeriesTypes2 = Object.keys(seriesConfig5).filter(isPolarSeriesType);
  const extremums = polarSeriesTypes2.reduce((acc, charType) => axisExtremumCallback2(acc, charType, axis, axisDirection, seriesConfig5, axisIndex, formattedSeries), [Infinity, -Infinity]);
  if (Number.isNaN(extremums[0]) || Number.isNaN(extremums[1])) {
    return [Infinity, -Infinity];
  }
  return extremums;
};

// node_modules/@mui/x-charts/esm/internals/angleConversion.js
var deg2rad = (value, defaultRad) => {
  if (value === void 0) {
    return defaultRad;
  }
  return Math.PI * value / 180;
};

// node_modules/@mui/x-charts/esm/internals/plugins/featurePlugins/useChartPolarAxis/getAxisTriggerTooltip.js
var getAxisTriggerTooltip2 = (axisDirection, seriesConfig5, formattedSeries, defaultAxisId) => {
  const tooltipAxesIds = /* @__PURE__ */ new Set();
  const chartTypes = Object.keys(seriesConfig5).filter(isPolarSeriesType);
  chartTypes.forEach((chartType) => {
    var _a, _b, _c;
    const series = ((_a = formattedSeries[chartType]) == null ? void 0 : _a.series) ?? {};
    const tooltipAxes = (_c = (_b = seriesConfig5[chartType]).axisTooltipGetter) == null ? void 0 : _c.call(_b, series);
    if (tooltipAxes === void 0) {
      return;
    }
    tooltipAxes.forEach(({
      axisId,
      direction
    }) => {
      if (direction === axisDirection) {
        tooltipAxesIds.add(axisId ?? defaultAxisId);
      }
    });
  });
  return tooltipAxesIds;
};

// node_modules/@mui/x-charts/esm/internals/plugins/featurePlugins/useChartPolarAxis/computeAxisValue.js
function getRange2(drawingArea, axisDirection, axis) {
  if (axisDirection === "rotation") {
    if (axis.scaleType === "point") {
      const angles = [deg2rad(axis.startAngle, 0), deg2rad(axis.endAngle, 2 * Math.PI)];
      const diff = angles[1] - angles[0];
      if (diff > Math.PI * 2 - 0.1) {
        angles[1] -= diff / axis.data.length;
      }
      return angles;
    }
    return [deg2rad(axis.startAngle, 0), deg2rad(axis.endAngle, 2 * Math.PI)];
  }
  return [0, Math.min(drawingArea.height, drawingArea.width) / 2];
}
var DEFAULT_CATEGORY_GAP_RATIO2 = 0.2;
var DEFAULT_BAR_GAP_RATIO2 = 0.1;
function computeAxisValue2({
  drawingArea,
  formattedSeries,
  axis: allAxis,
  seriesConfig: seriesConfig5,
  axisDirection
}) {
  if (allAxis === void 0) {
    return {
      axis: {},
      axisIds: []
    };
  }
  const axisIdsTriggeringTooltip = getAxisTriggerTooltip2(axisDirection, seriesConfig5, formattedSeries, allAxis[0].id);
  const completeAxis = {};
  allAxis.forEach((eachAxis, axisIndex) => {
    const axis = eachAxis;
    const range = getRange2(drawingArea, axisDirection, axis);
    const [minData, maxData] = getAxisExtremum2(axis, axisDirection, seriesConfig5, axisIndex, formattedSeries);
    const triggerTooltip = !axis.ignoreTooltip && axisIdsTriggeringTooltip.has(axis.id);
    const data = axis.data ?? [];
    if (isBandScaleConfig(axis)) {
      const categoryGapRatio = axis.categoryGapRatio ?? DEFAULT_CATEGORY_GAP_RATIO2;
      const barGapRatio = axis.barGapRatio ?? DEFAULT_BAR_GAP_RATIO2;
      completeAxis[axis.id] = _extends({
        offset: 0,
        categoryGapRatio,
        barGapRatio,
        triggerTooltip
      }, axis, {
        data,
        scale: band(axis.data, range).paddingInner(categoryGapRatio).paddingOuter(categoryGapRatio / 2),
        tickNumber: axis.data.length,
        colorScale: axis.colorMap && (axis.colorMap.type === "ordinal" ? getOrdinalColorScale(_extends({
          values: axis.data
        }, axis.colorMap)) : getColorScale(axis.colorMap))
      });
      if (isDateData(axis.data)) {
        const dateFormatter = createDateFormatter(axis, range);
        completeAxis[axis.id].valueFormatter = axis.valueFormatter ?? dateFormatter;
      }
    }
    if (isPointScaleConfig(axis)) {
      completeAxis[axis.id] = _extends({
        offset: 0,
        triggerTooltip
      }, axis, {
        data,
        scale: point(axis.data, range),
        tickNumber: axis.data.length,
        colorScale: axis.colorMap && (axis.colorMap.type === "ordinal" ? getOrdinalColorScale(_extends({
          values: axis.data
        }, axis.colorMap)) : getColorScale(axis.colorMap))
      });
      if (isDateData(axis.data)) {
        const dateFormatter = createDateFormatter(axis, range);
        completeAxis[axis.id].valueFormatter = axis.valueFormatter ?? dateFormatter;
      }
    }
    if (axis.scaleType === "band" || axis.scaleType === "point") {
      return;
    }
    const scaleType = axis.scaleType ?? "linear";
    const domainLimit = axis.domainLimit ?? "nice";
    const axisExtremums = [axis.min ?? minData, axis.max ?? maxData];
    if (typeof domainLimit === "function") {
      const {
        min,
        max
      } = domainLimit(minData, maxData);
      axisExtremums[0] = min;
      axisExtremums[1] = max;
    }
    const rawTickNumber = getTickNumber(_extends({}, axis, {
      range,
      domain: axisExtremums
    }));
    const tickNumber = scaleTickNumberByRange(rawTickNumber, range);
    const scale2 = getScale(scaleType, axisExtremums, range);
    const finalScale = domainLimit === "nice" ? scale2.nice(rawTickNumber) : scale2;
    const [minDomain, maxDomain] = finalScale.domain();
    const domain = [axis.min ?? minDomain, axis.max ?? maxDomain];
    completeAxis[axis.id] = _extends({
      offset: 0,
      triggerTooltip
    }, axis, {
      data,
      scaleType,
      scale: finalScale.domain(domain),
      tickNumber,
      colorScale: axis.colorMap && getColorScale(axis.colorMap)
    });
  });
  return {
    axis: completeAxis,
    axisIds: allAxis.map(({
      id
    }) => id)
  };
}

// node_modules/@mui/x-charts/esm/internals/plugins/featurePlugins/useChartPolarAxis/useChartPolarAxis.selectors.js
var selectorChartPolarAxisState = (state) => state.polarAxis;
var selectorChartRawRotationAxis = createSelector([selectorChartPolarAxisState], (axis) => axis == null ? void 0 : axis.rotation);
var selectorChartRawRadiusAxis = createSelector([selectorChartPolarAxisState], (axis) => axis == null ? void 0 : axis.radius);
var selectorChartRotationAxis = createSelector([selectorChartRawRotationAxis, selectorChartDrawingArea, selectorChartSeriesProcessed, selectorChartSeriesConfig], (axis, drawingArea, formattedSeries, seriesConfig5) => computeAxisValue2({
  drawingArea,
  formattedSeries,
  axis,
  seriesConfig: seriesConfig5,
  axisDirection: "rotation"
}));
var selectorChartRadiusAxis = createSelector([selectorChartRawRadiusAxis, selectorChartDrawingArea, selectorChartSeriesProcessed, selectorChartSeriesConfig], (axis, drawingArea, formattedSeries, seriesConfig5) => computeAxisValue2({
  drawingArea,
  formattedSeries,
  axis,
  seriesConfig: seriesConfig5,
  axisDirection: "radius"
}));
var selectorChartPolarCenter = createSelector([selectorChartDrawingArea], (drawingArea) => ({
  cx: drawingArea.left + drawingArea.width / 2,
  cy: drawingArea.top + drawingArea.height / 2
}));

// node_modules/@mui/x-charts/esm/internals/plugins/featurePlugins/useChartPolarAxis/coordinateTransformation.js
var generateSvg2rotation = (center) => (x, y) => Math.atan2(x - center.cx, center.cy - y);
var generateSvg2polar = (center) => (x, y) => {
  const angle = Math.atan2(x - center.cx, center.cy - y);
  return [Math.sqrt((x - center.cx) ** 2 + (center.cy - y) ** 2), angle];
};
var generatePolar2svg = (center) => (radius, rotation) => {
  return [center.cx + radius * Math.sin(rotation), center.cy - radius * Math.cos(rotation)];
};

// node_modules/@mui/x-charts/esm/internals/plugins/featurePlugins/useChartPolarAxis/useChartPolarAxis.js
var useChartPolarAxis = ({
  params,
  store,
  seriesConfig: seriesConfig5,
  svgRef,
  instance
}) => {
  const {
    rotationAxis,
    radiusAxis,
    dataset
  } = params;
  if (true) {
    const ids = [...rotationAxis ?? [], ...radiusAxis ?? []].filter((axis) => axis.id).map((axis) => axis.id);
    const duplicates = new Set(ids.filter((id, index) => ids.indexOf(id) !== index));
    if (duplicates.size > 0) {
      warnOnce([`MUI X Charts: The following axis ids are duplicated: ${Array.from(duplicates).join(", ")}.`, `Please make sure that each axis has a unique id.`].join("\n"), "error");
    }
  }
  const drawingArea = useSelector(store, selectorChartDrawingArea);
  const center = useSelector(store, selectorChartPolarCenter);
  const isInteractionEnabled = useSelector(store, selectorChartsInteractionIsInitialized);
  const {
    axis: rotationAxisWithScale,
    axisIds: rotationAxisIds
  } = useSelector(store, selectorChartRotationAxis);
  const {
    axis: radiusAxisWithScale,
    axisIds: radiusAxisIds
  } = useSelector(store, selectorChartRadiusAxis);
  const isFirstRender = React14.useRef(true);
  React14.useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    store.update((prev) => _extends({}, prev, {
      polarAxis: _extends({}, prev.polarAxis, {
        rotation: defaultizeAxis(rotationAxis, dataset, "rotation"),
        radius: defaultizeAxis(radiusAxis, dataset, "radius")
      })
    }));
  }, [seriesConfig5, drawingArea, rotationAxis, radiusAxis, dataset, store]);
  const svg2rotation = React14.useMemo(() => generateSvg2rotation({
    cx: center.cx,
    cy: center.cy
  }), [center.cx, center.cy]);
  const svg2polar = React14.useMemo(() => generateSvg2polar({
    cx: center.cx,
    cy: center.cy
  }), [center.cx, center.cy]);
  const polar2svg = React14.useMemo(() => generatePolar2svg({
    cx: center.cx,
    cy: center.cy
  }), [center.cx, center.cy]);
  const usedRotationAxisId = rotationAxisIds[0];
  const usedRadiusAxisId = radiusAxisIds[0];
  const mousePosition = React14.useRef({
    isInChart: false,
    x: -1,
    y: -1
  });
  React14.useEffect(() => {
    const element = svgRef.current;
    if (!isInteractionEnabled || element === null || params.disableAxisListener) {
      return () => {
      };
    }
    const handleOut = () => {
      var _a;
      mousePosition.current = {
        isInChart: false,
        x: -1,
        y: -1
      };
      (_a = instance.cleanInteraction) == null ? void 0 : _a.call(instance);
    };
    const handleMove = (event) => {
      var _a;
      const srcEvent = event;
      if (event.pointerType === "touch") {
        const svgRect = element.getBoundingClientRect();
        if (srcEvent.clientX < svgRect.left || srcEvent.clientX > svgRect.right || srcEvent.clientY < svgRect.top || srcEvent.clientY > svgRect.bottom) {
          mousePosition.current.isInChart = false;
          instance.cleanInteraction();
          return;
        }
        const svgPoint2 = getSVGPoint(element, srcEvent);
        mousePosition.current.isInChart = true;
        instance.setPointerCoordinate(svgPoint2);
        return;
      }
      const svgPoint = getSVGPoint(element, srcEvent);
      if (!instance.isPointInside(svgPoint.x, svgPoint.y, event.target)) {
        if (mousePosition.current.isInChart) {
          instance == null ? void 0 : instance.cleanInteraction();
          mousePosition.current.isInChart = false;
        }
        return;
      }
      const radiusSquare = (center.cx - svgPoint.x) ** 2 + (center.cy - svgPoint.y) ** 2;
      const maxRadius = radiusAxisWithScale[usedRadiusAxisId].scale.range()[1];
      if (radiusSquare > maxRadius ** 2) {
        if (mousePosition.current.isInChart) {
          instance == null ? void 0 : instance.cleanInteraction();
          mousePosition.current.isInChart = false;
        }
        return;
      }
      mousePosition.current.isInChart = true;
      (_a = instance.setPointerCoordinate) == null ? void 0 : _a.call(instance, svgPoint);
    };
    const handleDown = (event) => {
      const target = event.currentTarget;
      if (!target) {
        return;
      }
      if ("hasPointerCapture" in target && target.hasPointerCapture(event.pointerId)) {
        target.releasePointerCapture(event.pointerId);
      }
    };
    element.addEventListener("pointerdown", handleDown);
    element.addEventListener("pointermove", handleMove);
    element.addEventListener("pointerout", handleOut);
    element.addEventListener("pointercancel", handleOut);
    element.addEventListener("pointerleave", handleOut);
    return () => {
      element.removeEventListener("pointerdown", handleDown);
      element.removeEventListener("pointermove", handleMove);
      element.removeEventListener("pointerout", handleOut);
      element.removeEventListener("pointercancel", handleOut);
      element.removeEventListener("pointerleave", handleOut);
    };
  }, [svgRef, store, center, radiusAxisWithScale, usedRadiusAxisId, rotationAxisWithScale, usedRotationAxisId, instance, params.disableAxisListener, isInteractionEnabled, svg2rotation]);
  return {
    instance: {
      svg2polar,
      svg2rotation,
      polar2svg
    }
  };
};
useChartPolarAxis.params = {
  rotationAxis: true,
  radiusAxis: true,
  dataset: true,
  disableAxisListener: true
};
useChartPolarAxis.getInitialState = (params) => ({
  polarAxis: {
    rotation: defaultizeAxis(params.rotationAxis, params.dataset, "rotation"),
    radius: defaultizeAxis(params.radiusAxis, params.dataset, "radius")
  }
});

// node_modules/@mui/x-charts/esm/hooks/useAxis.js
function useXAxes() {
  const store = useStore();
  const {
    axis: xAxis,
    axisIds: xAxisIds
  } = useSelector(store, selectorChartXAxis);
  return {
    xAxis,
    xAxisIds
  };
}
function useYAxes() {
  const store = useStore();
  const {
    axis: yAxis,
    axisIds: yAxisIds
  } = useSelector(store, selectorChartYAxis);
  return {
    yAxis,
    yAxisIds
  };
}
function useXAxis(axisId) {
  const store = useStore();
  const {
    axis: xAxis,
    axisIds: xAxisIds
  } = useSelector(store, selectorChartXAxis);
  const id = axisId ?? xAxisIds[0];
  return xAxis[id];
}
function useYAxis(axisId) {
  const store = useStore();
  const {
    axis: yAxis,
    axisIds: yAxisIds
  } = useSelector(store, selectorChartYAxis);
  const id = axisId ?? yAxisIds[0];
  return yAxis[id];
}
function useRotationAxes() {
  const store = useStore();
  const {
    axis: rotationAxis,
    axisIds: rotationAxisIds
  } = useSelector(store, selectorChartRotationAxis);
  return {
    rotationAxis,
    rotationAxisIds
  };
}
function useRadiusAxes() {
  const store = useStore();
  const {
    axis: radiusAxis,
    axisIds: radiusAxisIds
  } = useSelector(store, selectorChartRadiusAxis);
  return {
    radiusAxis,
    radiusAxisIds
  };
}
function useRotationAxis(identifier) {
  const store = useStore();
  const {
    axis: rotationAxis,
    axisIds: rotationAxisIds
  } = useSelector(store, selectorChartRotationAxis);
  const id = typeof identifier === "string" ? identifier : rotationAxisIds[identifier ?? 0];
  return rotationAxis[id];
}

// node_modules/@mui/x-charts/esm/hooks/useScale.js
function getValueToPositionMapper(scale2) {
  if (isBandScale(scale2)) {
    return (value) => (scale2(value) ?? 0) + scale2.bandwidth() / 2;
  }
  return (value) => scale2(value);
}
function useXScale(axisId) {
  const axis = useXAxis(axisId);
  return axis.scale;
}
function useYScale(axisId) {
  const axis = useYAxis(axisId);
  return axis.scale;
}

// node_modules/@mui/x-charts/esm/hooks/useZAxis.js
function useZAxes() {
  const store = useStore();
  const {
    axis: zAxis,
    axisIds: zAxisIds
  } = useSelector(store, selectorChartZAxis) ?? {
    axis: {},
    axisIds: []
  };
  return {
    zAxis,
    zAxisIds
  };
}

// node_modules/@mui/x-charts/esm/hooks/useSvgRef.js
function useSvgRef() {
  const context = useChartContext();
  if (!context) {
    throw new Error(["MUI X Charts: Could not find the svg ref context.", "It looks like you rendered your component outside of a ChartContainer parent component."].join("\n"));
  }
  return context.svgRef;
}

// node_modules/@mui/x-charts/esm/hooks/useSeries.js
function useSeries() {
  const store = useStore();
  return useSelector(store, selectorChartSeriesProcessed);
}

// node_modules/@mui/x-charts/node_modules/@mui/x-internals/esm/fastArrayCompare/fastArrayCompare.js
function fastArrayCompare(a, b) {
  if (a === b) {
    return true;
  }
  if (!Array.isArray(a) || !Array.isArray(b)) {
    return false;
  }
  let i = a.length;
  if (i !== b.length) {
    return false;
  }
  while (i--) {
    if (a[i] !== b[i]) {
      return false;
    }
  }
  return true;
}

// node_modules/@mui/x-charts/esm/internals/createSeriesSelectorOfType.js
function createSeriesSelectorsOfType(seriesType) {
  const selectorSeriesWithIds = createSelector([selectorChartSeriesProcessed, (_, ids) => ids], (processedSeries, ids) => {
    var _a, _b, _c, _d, _e, _f;
    if (!ids || Array.isArray(ids) && ids.length === 0) {
      return ((_b = (_a = processedSeries[seriesType]) == null ? void 0 : _a.seriesOrder) == null ? void 0 : _b.map((seriesId) => {
        var _a2;
        return (_a2 = processedSeries[seriesType]) == null ? void 0 : _a2.series[seriesId];
      })) ?? [];
    }
    if (!Array.isArray(ids)) {
      return (_d = (_c = processedSeries[seriesType]) == null ? void 0 : _c.series) == null ? void 0 : _d[ids];
    }
    const result = [];
    const failedIds = [];
    for (const id of ids) {
      const series = (_f = (_e = processedSeries[seriesType]) == null ? void 0 : _e.series) == null ? void 0 : _f[id];
      if (series) {
        result.push(series);
      } else {
        failedIds.push(id);
      }
    }
    if (failedIds.length > 0) {
      const formattedIds = failedIds.map((v2) => JSON.stringify(v2)).join(", ");
      const fnName = `use${seriesType.charAt(0).toUpperCase()}${seriesType.slice(1)}Series`;
      warnOnce([`MUI X Charts: The following ids provided to "${fnName}" could not be found: ${formattedIds}.`, `Make sure that they exist and their series are using the "${seriesType}" series type.`]);
    }
    return result;
  });
  return (ids) => {
    const store = useStore();
    return useSelector(store, selectorSeriesWithIds, [ids], fastArrayCompare);
  };
}
function createAllSeriesSelectorOfType(seriesType) {
  const selectorSeries = createSelector([selectorChartSeriesProcessed], (processedSeries) => processedSeries[seriesType]);
  return () => {
    const store = useStore();
    return useSelector(store, selectorSeries);
  };
}

// node_modules/@mui/x-charts/esm/hooks/useScatterSeries.js
var useSelectorSeries = createSeriesSelectorsOfType("scatter");
var useSelectorSeriesContext = createAllSeriesSelectorOfType("scatter");

// node_modules/@mui/x-charts/esm/hooks/usePieSeries.js
var useSelectorSeries2 = createSeriesSelectorsOfType("pie");
var useSelectorSeriesContext2 = createAllSeriesSelectorOfType("pie");

// node_modules/@mui/x-charts/esm/hooks/useBarSeries.js
var useSelectorSeries3 = createSeriesSelectorsOfType("bar");
var useSelectorSeriesContext3 = createAllSeriesSelectorOfType("bar");

// node_modules/@mui/x-charts/esm/hooks/useLineSeries.js
var useSelectorSeries4 = createSeriesSelectorsOfType("line");
var useSelectorSeriesContext4 = createAllSeriesSelectorOfType("line");
function useLineSeriesContext() {
  return useSelectorSeriesContext4();
}

// node_modules/@mui/x-charts/esm/hooks/useRadarSeries.js
var useSelectorSeries5 = createSeriesSelectorsOfType("radar");
var useSelectorSeriesContext5 = createAllSeriesSelectorOfType("radar");

// node_modules/@mui/x-charts/esm/hooks/useItemHighlightedGetter.js
function useItemHighlightedGetter() {
  const store = useStore();
  const isHighlighted = useSelector(store, selectorChartsIsHighlightedCallback);
  const isFaded = useSelector(store, selectorChartsIsFadedCallback);
  return {
    isHighlighted,
    isFaded
  };
}

// node_modules/@mui/x-charts/esm/hooks/useLegend.js
function getSeriesToDisplay(series, seriesConfig5) {
  return Object.keys(series).flatMap((seriesType) => {
    const getter = seriesConfig5[seriesType].legendGetter;
    return getter === void 0 ? [] : getter(series[seriesType]);
  });
}
function useLegend() {
  const series = useSeries();
  const store = useStore();
  const seriesConfig5 = useSelector(store, selectorChartSeriesConfig);
  return {
    items: getSeriesToDisplay(series, seriesConfig5)
  };
}

// node_modules/@mui/x-charts/esm/hooks/useChartGradientId.js
var React15 = __toESM(require_react(), 1);
function useChartGradientIdBuilder() {
  const chartId = useChartId2();
  return React15.useCallback((axisId) => `${chartId}-gradient-${axisId}`, [chartId]);
}
function useChartGradientIdObjectBoundBuilder() {
  const chartId = useChartId2();
  return React15.useCallback((axisId) => `${chartId}-gradient-${axisId}-object-bound`, [chartId]);
}

// node_modules/@mui/x-charts/esm/hooks/animation/useAnimateLine.js
function useAnimateLine(props) {
  return useAnimate({
    d: props.d
  }, {
    createInterpolator: (lastProps, newProps) => {
      const interpolate = string_default(lastProps.d, newProps.d);
      return (t) => ({
        d: interpolate(t)
      });
    },
    applyProps: (element, {
      d
    }) => element.setAttribute("d", d),
    skip: props.skipAnimation,
    transformProps: (p) => p,
    ref: props.ref
  });
}

// node_modules/@mui/x-charts/esm/hooks/useChartRootRef.js
function useChartRootRef() {
  const context = useChartContext();
  return context.chartRootRef;
}

// node_modules/@mui/x-charts/esm/hooks/useChartsLocalization.js
var React17 = __toESM(require_react(), 1);

// node_modules/@mui/x-charts/esm/ChartsLocalizationProvider/ChartsLocalizationProvider.js
var React16 = __toESM(require_react(), 1);
var import_prop_types = __toESM(require_prop_types(), 1);

// node_modules/@mui/x-charts/esm/locales/utils/imageMimeTypes.js
var imageMimeTypes = {
  "image/png": "PNG",
  "image/jpeg": "JPEG",
  "image/webp": "WebP"
};

// node_modules/@mui/x-charts/esm/locales/utils/getChartsLocalization.js
var getChartsLocalization = (chartsTranslations) => {
  return {
    components: {
      MuiChartsLocalizationProvider: {
        defaultProps: {
          localeText: _extends({}, chartsTranslations)
        }
      }
    }
  };
};

// node_modules/@mui/x-charts/esm/locales/enUS.js
var enUSLocaleText = {
  /* Overlay */
  loading: "Loading data…",
  noData: "No data to display",
  /* Toolbar */
  zoomIn: "Zoom in",
  zoomOut: "Zoom out",
  toolbarExport: "Export",
  /* Toolbar Export Menu */
  toolbarExportPrint: "Print",
  toolbarExportImage: (mimeType) => `Export as ${imageMimeTypes[mimeType] ?? mimeType}`
};
var DEFAULT_LOCALE = enUSLocaleText;
var enUS = getChartsLocalization(enUSLocaleText);

// node_modules/@mui/x-charts/esm/ChartsLocalizationProvider/ChartsLocalizationProvider.js
var import_jsx_runtime2 = __toESM(require_jsx_runtime(), 1);
var _excluded2 = ["localeText"];
var ChartsLocalizationContext = React16.createContext(null);
if (true) ChartsLocalizationContext.displayName = "ChartsLocalizationContext";
function ChartsLocalizationProvider(inProps) {
  const {
    localeText: inLocaleText
  } = inProps, other = _objectWithoutPropertiesLoose(inProps, _excluded2);
  const {
    localeText: parentLocaleText
  } = React16.useContext(ChartsLocalizationContext) ?? {
    localeText: void 0
  };
  const props = useThemeProps({
    // We don't want to pass the `localeText` prop to the theme, that way it will always return the theme value,
    // We will then merge this theme value with our value manually
    props: other,
    name: "MuiChartsLocalizationProvider"
  });
  const {
    children,
    localeText: themeLocaleText
  } = props;
  const localeText = React16.useMemo(() => _extends({}, DEFAULT_LOCALE, themeLocaleText, parentLocaleText, inLocaleText), [themeLocaleText, parentLocaleText, inLocaleText]);
  const contextValue = React16.useMemo(() => {
    return {
      localeText
    };
  }, [localeText]);
  return (0, import_jsx_runtime2.jsx)(ChartsLocalizationContext.Provider, {
    value: contextValue,
    children
  });
}
true ? ChartsLocalizationProvider.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "pnpm proptypes"  |
  // ----------------------------------------------------------------------
  children: import_prop_types.default.node,
  /**
   * Localized text for chart components.
   */
  localeText: import_prop_types.default.object
} : void 0;

// node_modules/@mui/x-charts/esm/hooks/useChartsLocalization.js
var useChartsLocalization = () => {
  const localization = React17.useContext(ChartsLocalizationContext);
  if (localization === null) {
    throw new Error(["MUI X Charts: Can not find the charts localization context.", "It looks like you forgot to wrap your component in ChartsLocalizationProvider.", "This can also happen if you are bundling multiple versions of the `@mui/x-charts` package"].join("\n"));
  }
  return localization;
};

// node_modules/@mui/x-charts/esm/LineChart/AppearingMask.js
var import_jsx_runtime3 = __toESM(require_jsx_runtime(), 1);
var appearingMaskClasses = generateUtilityClasses("MuiAppearingMask", ["animate"]);
var AnimatedRect = styled_default("rect")({
  animationName: "animate-width",
  animationTimingFunction: ANIMATION_TIMING_FUNCTION,
  animationDuration: "0s",
  [`&.${appearingMaskClasses.animate}`]: {
    animationDuration: `${ANIMATION_DURATION_MS}ms`
  },
  "@keyframes animate-width": {
    from: {
      width: 0
    }
  }
});
function AppearingMask(props) {
  const drawingArea = useDrawingArea();
  const chartId = useChartId2();
  const clipId = cleanId(`${chartId}-${props.id}`);
  return (0, import_jsx_runtime3.jsxs)(React18.Fragment, {
    children: [(0, import_jsx_runtime3.jsx)("clipPath", {
      id: clipId,
      children: (0, import_jsx_runtime3.jsx)(AnimatedRect, {
        className: props.skipAnimation ? "" : appearingMaskClasses.animate,
        x: 0,
        y: 0,
        width: drawingArea.left + drawingArea.width + drawingArea.right,
        height: drawingArea.top + drawingArea.height + drawingArea.bottom
      })
    }), (0, import_jsx_runtime3.jsx)("g", {
      clipPath: `url(#${clipId})`,
      children: props.children
    })]
  });
}

// node_modules/@mui/x-charts/esm/LineChart/AnimatedArea.js
var import_jsx_runtime4 = __toESM(require_jsx_runtime(), 1);
var _excluded3 = ["skipAnimation", "ownerState"];
function AnimatedArea(props) {
  const {
    skipAnimation,
    ownerState
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded3);
  const animatedProps = useAnimateArea(props);
  return (0, import_jsx_runtime4.jsx)(AppearingMask, {
    skipAnimation,
    id: `${ownerState.id}-area-clip`,
    children: (0, import_jsx_runtime4.jsx)("path", _extends({
      fill: ownerState.gradientId ? `url(#${ownerState.gradientId})` : ownerState.color,
      filter: (
        // eslint-disable-next-line no-nested-ternary
        ownerState.isHighlighted ? "brightness(140%)" : ownerState.gradientId ? void 0 : "brightness(120%)"
      ),
      opacity: ownerState.isFaded ? 0.3 : 1,
      stroke: "none",
      "data-series": ownerState.id,
      "data-highlighted": ownerState.isHighlighted || void 0,
      "data-faded": ownerState.isFaded || void 0
    }, other, animatedProps))
  });
}
true ? AnimatedArea.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "pnpm proptypes"  |
  // ----------------------------------------------------------------------
  d: import_prop_types2.default.string.isRequired,
  ownerState: import_prop_types2.default.shape({
    classes: import_prop_types2.default.object,
    color: import_prop_types2.default.string.isRequired,
    gradientId: import_prop_types2.default.string,
    id: import_prop_types2.default.oneOfType([import_prop_types2.default.number, import_prop_types2.default.string]).isRequired,
    isFaded: import_prop_types2.default.bool.isRequired,
    isHighlighted: import_prop_types2.default.bool.isRequired
  }).isRequired,
  /**
   * If `true`, animations are skipped.
   * @default false
   */
  skipAnimation: import_prop_types2.default.bool
} : void 0;

// node_modules/@mui/x-charts/esm/LineChart/AreaElement.js
var import_jsx_runtime5 = __toESM(require_jsx_runtime(), 1);
var _excluded4 = ["id", "classes", "color", "gradientId", "slots", "slotProps", "onClick"];
function getAreaElementUtilityClass(slot) {
  return generateUtilityClass("MuiAreaElement", slot);
}
var areaElementClasses = generateUtilityClasses("MuiAreaElement", ["root", "highlighted", "faded", "series"]);
var useUtilityClasses = (ownerState) => {
  const {
    classes,
    id,
    isFaded,
    isHighlighted
  } = ownerState;
  const slots = {
    root: ["root", `series-${id}`, isHighlighted && "highlighted", isFaded && "faded"]
  };
  return composeClasses(slots, getAreaElementUtilityClass, classes);
};
function AreaElement(props) {
  const {
    id,
    classes: innerClasses,
    color,
    gradientId,
    slots,
    slotProps,
    onClick
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded4);
  const interactionProps = useInteractionItemProps({
    type: "line",
    seriesId: id
  });
  const {
    isFaded,
    isHighlighted
  } = useItemHighlighted({
    seriesId: id
  });
  const ownerState = {
    id,
    classes: innerClasses,
    color,
    gradientId,
    isFaded,
    isHighlighted
  };
  const classes = useUtilityClasses(ownerState);
  const Area = (slots == null ? void 0 : slots.area) ?? AnimatedArea;
  const areaProps = useSlotProps_default({
    elementType: Area,
    externalSlotProps: slotProps == null ? void 0 : slotProps.area,
    additionalProps: _extends({}, interactionProps, {
      onClick,
      cursor: onClick ? "pointer" : "unset"
    }),
    className: classes.root,
    ownerState
  });
  return (0, import_jsx_runtime5.jsx)(Area, _extends({}, other, areaProps));
}
true ? AreaElement.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "pnpm proptypes"  |
  // ----------------------------------------------------------------------
  classes: import_prop_types3.default.object,
  color: import_prop_types3.default.string.isRequired,
  d: import_prop_types3.default.string.isRequired,
  gradientId: import_prop_types3.default.string,
  id: import_prop_types3.default.oneOfType([import_prop_types3.default.number, import_prop_types3.default.string]).isRequired,
  /**
   * If `true`, animations are skipped.
   * @default false
   */
  skipAnimation: import_prop_types3.default.bool,
  /**
   * The props used for each component slot.
   * @default {}
   */
  slotProps: import_prop_types3.default.object,
  /**
   * Overridable component slots.
   * @default {}
   */
  slots: import_prop_types3.default.object
} : void 0;

// node_modules/@mui/x-charts/esm/internals/getCurve.js
function getCurveFactory(curveType) {
  switch (curveType) {
    case "catmullRom":
      return catmullRom_default.alpha(0.5);
    case "linear":
      return linear_default;
    case "monotoneX":
      return monotoneX;
    case "monotoneY":
      return monotoneY;
    case "natural":
      return natural_default;
    case "step":
      return step_default;
    case "stepBefore":
      return stepBefore;
    case "stepAfter":
      return stepAfter;
    case "bumpY":
      return bumpY;
    case "bumpX":
      return bumpX;
    default:
      return monotoneX;
  }
}

// node_modules/@mui/x-charts/esm/hooks/useSkipAnimation.js
function useSkipAnimation(skipAnimation) {
  const store = useStore();
  const storeSkipAnimation = useSelector(store, selectorChartSkipAnimation);
  return skipAnimation || storeSkipAnimation;
}

// node_modules/@mui/x-charts/esm/internals/plugins/featurePlugins/useChartCartesianAxis/useInternalIsZoomInteracting.js
function useInternalIsZoomInteracting() {
  const store = useStore();
  const isInteracting = useSelector(store, selectorChartZoomIsInteracting);
  return isInteracting;
}

// node_modules/@mui/x-charts/esm/LineChart/AreaPlot.js
var import_jsx_runtime6 = __toESM(require_jsx_runtime(), 1);
var _excluded5 = ["slots", "slotProps", "onItemClick", "skipAnimation"];
var AreaPlotRoot = styled_default("g", {
  name: "MuiAreaPlot",
  slot: "Root"
})({
  [`& .${areaElementClasses.root}`]: {
    transition: "opacity 0.2s ease-in, fill 0.2s ease-in"
  }
});
var useAggregatedData = () => {
  const seriesData = useLineSeriesContext();
  const {
    xAxis,
    xAxisIds
  } = useXAxes();
  const {
    yAxis,
    yAxisIds
  } = useYAxes();
  const getGradientId = useChartGradientIdBuilder();
  const allData = React21.useMemo(() => {
    if (seriesData === void 0) {
      return [];
    }
    const {
      series,
      stackingGroups
    } = seriesData;
    const defaultXAxisId = xAxisIds[0];
    const defaultYAxisId = yAxisIds[0];
    return stackingGroups.flatMap(({
      ids: groupIds
    }) => {
      return [...groupIds].reverse().map((seriesId) => {
        const {
          xAxisId = defaultXAxisId,
          yAxisId = defaultYAxisId,
          stackedData,
          data,
          connectNulls,
          baseline,
          curve,
          strictStepCurve
        } = series[seriesId];
        const xScale = xAxis[xAxisId].scale;
        const xPosition = getValueToPositionMapper(xScale);
        const yScale = yAxis[yAxisId].scale;
        const xData = xAxis[xAxisId].data;
        const gradientId = yAxis[yAxisId].colorScale && getGradientId(yAxisId) || xAxis[xAxisId].colorScale && getGradientId(xAxisId) || void 0;
        if (true) {
          if (xData === void 0) {
            throw new Error(`MUI X Charts: ${xAxisId === DEFAULT_X_AXIS_KEY ? "The first `xAxis`" : `The x-axis with id "${xAxisId}"`} should have data property to be able to display a line plot.`);
          }
          if (xData.length < stackedData.length) {
            throw new Error(`MUI X Charts: The data length of the x axis (${xData.length} items) is lower than the length of series (${stackedData.length} items).`);
          }
        }
        const shouldExpand = (curve == null ? void 0 : curve.includes("step")) && !strictStepCurve && isBandScale(xScale);
        const formattedData = (xData == null ? void 0 : xData.flatMap((x, index) => {
          const nullData = data[index] == null;
          if (shouldExpand) {
            const rep = [{
              x,
              y: stackedData[index],
              nullData,
              isExtension: false
            }];
            if (!nullData && (index === 0 || data[index - 1] == null)) {
              rep.unshift({
                x: (xScale(x) ?? 0) - (xScale.step() - xScale.bandwidth()) / 2,
                y: stackedData[index],
                nullData,
                isExtension: true
              });
            }
            if (!nullData && (index === data.length - 1 || data[index + 1] == null)) {
              rep.push({
                x: (xScale(x) ?? 0) + (xScale.step() + xScale.bandwidth()) / 2,
                y: stackedData[index],
                nullData,
                isExtension: true
              });
            }
            return rep;
          }
          return {
            x,
            y: stackedData[index],
            nullData
          };
        })) ?? [];
        const d3Data = connectNulls ? formattedData.filter((d2) => !d2.nullData) : formattedData;
        const areaPath = area_default().x((d2) => d2.isExtension ? d2.x : xPosition(d2.x)).defined((d2) => connectNulls || !d2.nullData || !!d2.isExtension).y0((d2) => {
          if (typeof baseline === "number") {
            return yScale(baseline);
          }
          if (baseline === "max") {
            return yScale.range()[1];
          }
          if (baseline === "min") {
            return yScale.range()[0];
          }
          const value = d2.y && yScale(d2.y[0]);
          if (Number.isNaN(value)) {
            return yScale.range()[0];
          }
          return value;
        }).y1((d2) => d2.y && yScale(d2.y[1]));
        const d = areaPath.curve(getCurveFactory(curve))(d3Data) || "";
        return _extends({}, series[seriesId], {
          gradientId,
          d,
          seriesId
        });
      });
    });
  }, [seriesData, xAxisIds, yAxisIds, xAxis, yAxis, getGradientId]);
  return allData;
};
function AreaPlot(props) {
  const {
    slots,
    slotProps,
    onItemClick,
    skipAnimation: inSkipAnimation
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded5);
  const isZoomInteracting = useInternalIsZoomInteracting();
  const skipAnimation = useSkipAnimation(isZoomInteracting || inSkipAnimation);
  const completedData = useAggregatedData();
  return (0, import_jsx_runtime6.jsx)(AreaPlotRoot, _extends({}, other, {
    children: completedData.map(({
      d,
      seriesId,
      color,
      area,
      gradientId
    }) => !!area && (0, import_jsx_runtime6.jsx)(AreaElement, {
      id: seriesId,
      d,
      color,
      gradientId,
      slots,
      slotProps,
      onClick: onItemClick && ((event) => onItemClick(event, {
        type: "line",
        seriesId
      })),
      skipAnimation
    }, seriesId))
  }));
}
true ? AreaPlot.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "pnpm proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * Callback fired when a line area item is clicked.
   * @param {React.MouseEvent<SVGPathElement, MouseEvent>} event The event source of the callback.
   * @param {LineItemIdentifier} lineItemIdentifier The line item identifier.
   */
  onItemClick: import_prop_types4.default.func,
  /**
   * If `true`, animations are skipped.
   * @default false
   */
  skipAnimation: import_prop_types4.default.bool,
  /**
   * The props used for each component slot.
   * @default {}
   */
  slotProps: import_prop_types4.default.object,
  /**
   * Overridable component slots.
   * @default {}
   */
  slots: import_prop_types4.default.object
} : void 0;

// node_modules/@mui/x-charts/esm/LineChart/LinePlot.js
var React24 = __toESM(require_react(), 1);
var import_prop_types7 = __toESM(require_prop_types(), 1);

// node_modules/@mui/x-charts/esm/LineChart/LineElement.js
var React23 = __toESM(require_react(), 1);
var import_prop_types6 = __toESM(require_prop_types(), 1);

// node_modules/@mui/x-charts/esm/LineChart/AnimatedLine.js
var React22 = __toESM(require_react(), 1);
var import_prop_types5 = __toESM(require_prop_types(), 1);
var import_jsx_runtime7 = __toESM(require_jsx_runtime(), 1);
var _excluded6 = ["skipAnimation", "ownerState"];
var AnimatedLine = React22.forwardRef(function AnimatedLine2(props, ref) {
  const {
    skipAnimation,
    ownerState
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded6);
  const animateProps = useAnimateLine(_extends({}, props, {
    ref
  }));
  return (0, import_jsx_runtime7.jsx)(AppearingMask, {
    skipAnimation,
    id: `${ownerState.id}-line-clip`,
    children: (0, import_jsx_runtime7.jsx)("path", _extends({
      stroke: ownerState.gradientId ? `url(#${ownerState.gradientId})` : ownerState.color,
      strokeWidth: 2,
      strokeLinejoin: "round",
      fill: "none",
      filter: ownerState.isHighlighted ? "brightness(120%)" : void 0,
      opacity: ownerState.isFaded ? 0.3 : 1,
      "data-series": ownerState.id,
      "data-highlighted": ownerState.isHighlighted || void 0,
      "data-faded": ownerState.isFaded || void 0
    }, other, animateProps))
  });
});
if (true) AnimatedLine.displayName = "AnimatedLine";
true ? AnimatedLine.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "pnpm proptypes"  |
  // ----------------------------------------------------------------------
  d: import_prop_types5.default.string.isRequired,
  ownerState: import_prop_types5.default.shape({
    classes: import_prop_types5.default.object,
    color: import_prop_types5.default.string.isRequired,
    gradientId: import_prop_types5.default.string,
    id: import_prop_types5.default.oneOfType([import_prop_types5.default.number, import_prop_types5.default.string]).isRequired,
    isFaded: import_prop_types5.default.bool.isRequired,
    isHighlighted: import_prop_types5.default.bool.isRequired
  }).isRequired,
  /**
   * If `true`, animations are skipped.
   * @default false
   */
  skipAnimation: import_prop_types5.default.bool
} : void 0;

// node_modules/@mui/x-charts/esm/LineChart/LineElement.js
var import_jsx_runtime8 = __toESM(require_jsx_runtime(), 1);
var _excluded7 = ["id", "classes", "color", "gradientId", "slots", "slotProps", "onClick"];
function getLineElementUtilityClass(slot) {
  return generateUtilityClass("MuiLineElement", slot);
}
var lineElementClasses = generateUtilityClasses("MuiLineElement", ["root", "highlighted", "faded", "series"]);
var useUtilityClasses2 = (ownerState) => {
  const {
    classes,
    id,
    isFaded,
    isHighlighted
  } = ownerState;
  const slots = {
    root: ["root", `series-${id}`, isHighlighted && "highlighted", isFaded && "faded"]
  };
  return composeClasses(slots, getLineElementUtilityClass, classes);
};
function LineElement(props) {
  const {
    id,
    classes: innerClasses,
    color,
    gradientId,
    slots,
    slotProps,
    onClick
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded7);
  const interactionProps = useInteractionItemProps({
    type: "line",
    seriesId: id
  });
  const {
    isFaded,
    isHighlighted
  } = useItemHighlighted({
    seriesId: id
  });
  const ownerState = {
    id,
    classes: innerClasses,
    color,
    gradientId,
    isFaded,
    isHighlighted
  };
  const classes = useUtilityClasses2(ownerState);
  const Line = (slots == null ? void 0 : slots.line) ?? AnimatedLine;
  const lineProps = useSlotProps_default({
    elementType: Line,
    externalSlotProps: slotProps == null ? void 0 : slotProps.line,
    additionalProps: _extends({}, interactionProps, {
      onClick,
      cursor: onClick ? "pointer" : "unset"
    }),
    className: classes.root,
    ownerState
  });
  return (0, import_jsx_runtime8.jsx)(Line, _extends({}, other, lineProps));
}
true ? LineElement.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "pnpm proptypes"  |
  // ----------------------------------------------------------------------
  classes: import_prop_types6.default.object,
  color: import_prop_types6.default.string.isRequired,
  d: import_prop_types6.default.string.isRequired,
  gradientId: import_prop_types6.default.string,
  id: import_prop_types6.default.oneOfType([import_prop_types6.default.number, import_prop_types6.default.string]).isRequired,
  /**
   * If `true`, animations are skipped.
   * @default false
   */
  skipAnimation: import_prop_types6.default.bool,
  /**
   * The props used for each component slot.
   * @default {}
   */
  slotProps: import_prop_types6.default.object,
  /**
   * Overridable component slots.
   * @default {}
   */
  slots: import_prop_types6.default.object
} : void 0;

// node_modules/@mui/x-charts/esm/LineChart/LinePlot.js
var import_jsx_runtime9 = __toESM(require_jsx_runtime(), 1);
var _excluded8 = ["slots", "slotProps", "skipAnimation", "onItemClick"];
var LinePlotRoot = styled_default("g", {
  name: "MuiAreaPlot",
  slot: "Root"
})({
  [`& .${lineElementClasses.root}`]: {
    transition: "opacity 0.2s ease-in, fill 0.2s ease-in"
  }
});
var useAggregatedData2 = () => {
  const seriesData = useLineSeriesContext();
  const {
    xAxis,
    xAxisIds
  } = useXAxes();
  const {
    yAxis,
    yAxisIds
  } = useYAxes();
  const getGradientId = useChartGradientIdBuilder();
  const allData = React24.useMemo(() => {
    if (seriesData === void 0) {
      return [];
    }
    const {
      series,
      stackingGroups
    } = seriesData;
    const defaultXAxisId = xAxisIds[0];
    const defaultYAxisId = yAxisIds[0];
    return stackingGroups.flatMap(({
      ids: groupIds
    }) => {
      return groupIds.flatMap((seriesId) => {
        const {
          xAxisId = defaultXAxisId,
          yAxisId = defaultYAxisId,
          stackedData,
          data,
          connectNulls,
          curve,
          strictStepCurve
        } = series[seriesId];
        const xScale = xAxis[xAxisId].scale;
        const xPosition = getValueToPositionMapper(xScale);
        const yScale = yAxis[yAxisId].scale;
        const xData = xAxis[xAxisId].data;
        const gradientId = yAxis[yAxisId].colorScale && getGradientId(yAxisId) || xAxis[xAxisId].colorScale && getGradientId(xAxisId) || void 0;
        if (true) {
          if (xData === void 0) {
            throw new Error(`MUI X Charts: ${xAxisId === DEFAULT_X_AXIS_KEY ? "The first `xAxis`" : `The x-axis with id "${xAxisId}"`} should have data property to be able to display a line plot.`);
          }
          if (xData.length < stackedData.length) {
            warnOnce(`MUI X Charts: The data length of the x axis (${xData.length} items) is lower than the length of series (${stackedData.length} items).`, "error");
          }
        }
        const shouldExpand = (curve == null ? void 0 : curve.includes("step")) && !strictStepCurve && isBandScale(xScale);
        const formattedData = (xData == null ? void 0 : xData.flatMap((x, index) => {
          const nullData = data[index] == null;
          if (shouldExpand) {
            const rep = [{
              x,
              y: stackedData[index],
              nullData,
              isExtension: false
            }];
            if (!nullData && (index === 0 || data[index - 1] == null)) {
              rep.unshift({
                x: (xScale(x) ?? 0) - (xScale.step() - xScale.bandwidth()) / 2,
                y: stackedData[index],
                nullData,
                isExtension: true
              });
            }
            if (!nullData && (index === data.length - 1 || data[index + 1] == null)) {
              rep.push({
                x: (xScale(x) ?? 0) + (xScale.step() + xScale.bandwidth()) / 2,
                y: stackedData[index],
                nullData,
                isExtension: true
              });
            }
            return rep;
          }
          return {
            x,
            y: stackedData[index],
            nullData
          };
        })) ?? [];
        const d3Data = connectNulls ? formattedData.filter((d2) => !d2.nullData) : formattedData;
        const linePath = line_default().x((d2) => d2.isExtension ? d2.x : xPosition(d2.x)).defined((d2) => connectNulls || !d2.nullData || !!d2.isExtension).y((d2) => yScale(d2.y[1]));
        const d = linePath.curve(getCurveFactory(curve))(d3Data) || "";
        return _extends({}, series[seriesId], {
          gradientId,
          d,
          seriesId
        });
      });
    });
  }, [seriesData, xAxisIds, yAxisIds, xAxis, yAxis, getGradientId]);
  return allData;
};
function LinePlot(props) {
  const {
    slots,
    slotProps,
    skipAnimation: inSkipAnimation,
    onItemClick
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded8);
  const isZoomInteracting = useInternalIsZoomInteracting();
  const skipAnimation = useSkipAnimation(isZoomInteracting || inSkipAnimation);
  const completedData = useAggregatedData2();
  return (0, import_jsx_runtime9.jsx)(LinePlotRoot, _extends({}, other, {
    children: completedData.map(({
      d,
      seriesId,
      color,
      gradientId
    }) => {
      return (0, import_jsx_runtime9.jsx)(LineElement, {
        id: seriesId,
        d,
        color,
        gradientId,
        skipAnimation,
        slots,
        slotProps,
        onClick: onItemClick && ((event) => onItemClick(event, {
          type: "line",
          seriesId
        }))
      }, seriesId);
    })
  }));
}
true ? LinePlot.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "pnpm proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * Callback fired when a line item is clicked.
   * @param {React.MouseEvent<SVGPathElement, MouseEvent>} event The event source of the callback.
   * @param {LineItemIdentifier} lineItemIdentifier The line item identifier.
   */
  onItemClick: import_prop_types7.default.func,
  /**
   * If `true`, animations are skipped.
   * @default false
   */
  skipAnimation: import_prop_types7.default.bool,
  /**
   * The props used for each component slot.
   * @default {}
   */
  slotProps: import_prop_types7.default.object,
  /**
   * Overridable component slots.
   * @default {}
   */
  slots: import_prop_types7.default.object
} : void 0;

// node_modules/@mui/x-charts/esm/LineChart/MarkPlot.js
var import_prop_types10 = __toESM(require_prop_types(), 1);
var React27 = __toESM(require_react(), 1);

// node_modules/@mui/x-charts/esm/LineChart/CircleMarkElement.js
var React25 = __toESM(require_react(), 1);
var import_prop_types8 = __toESM(require_prop_types(), 1);

// node_modules/@mui/x-charts/esm/LineChart/markElementClasses.js
function getMarkElementUtilityClass(slot) {
  return generateUtilityClass("MuiMarkElement", slot);
}
var markElementClasses = generateUtilityClasses("MuiMarkElement", ["root", "highlighted", "faded", "animate", "series"]);
var useUtilityClasses3 = (ownerState) => {
  const {
    classes,
    id,
    isFaded,
    isHighlighted,
    skipAnimation
  } = ownerState;
  const slots = {
    root: ["root", `series-${id}`, isHighlighted && "highlighted", isFaded && "faded", skipAnimation ? void 0 : "animate"]
  };
  return composeClasses(slots, getMarkElementUtilityClass, classes);
};

// node_modules/@mui/x-charts/esm/LineChart/CircleMarkElement.js
var import_jsx_runtime10 = __toESM(require_jsx_runtime(), 1);
var _excluded9 = ["x", "y", "id", "classes", "color", "dataIndex", "onClick", "skipAnimation", "isFaded", "isHighlighted"];
var Circle = styled_default("circle")({
  [`&.${markElementClasses.animate}`]: {
    transitionDuration: `${ANIMATION_DURATION_MS}ms`,
    transitionProperty: "cx, cy",
    transitionTimingFunction: ANIMATION_TIMING_FUNCTION
  }
});
function CircleMarkElement(props) {
  const {
    x,
    y,
    id,
    classes: innerClasses,
    color,
    dataIndex,
    onClick,
    skipAnimation,
    isFaded = false,
    isHighlighted = false
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded9);
  const theme = useTheme();
  const interactionProps = useInteractionItemProps({
    type: "line",
    seriesId: id,
    dataIndex
  });
  const ownerState = {
    id,
    classes: innerClasses,
    isHighlighted,
    isFaded,
    color,
    skipAnimation
  };
  const classes = useUtilityClasses3(ownerState);
  return (0, import_jsx_runtime10.jsx)(Circle, _extends({}, other, {
    cx: x,
    cy: y,
    r: 5,
    fill: (theme.vars || theme).palette.background.paper,
    stroke: color,
    strokeWidth: 2,
    className: classes.root,
    onClick,
    cursor: onClick ? "pointer" : "unset"
  }, interactionProps, {
    "data-highlighted": isHighlighted || void 0,
    "data-faded": isFaded || void 0
  }));
}
true ? CircleMarkElement.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "pnpm proptypes"  |
  // ----------------------------------------------------------------------
  classes: import_prop_types8.default.object,
  /**
   * The index to the element in the series' data array.
   */
  dataIndex: import_prop_types8.default.number.isRequired,
  id: import_prop_types8.default.oneOfType([import_prop_types8.default.number, import_prop_types8.default.string]).isRequired,
  /**
   * The shape of the marker.
   */
  shape: import_prop_types8.default.oneOf(["circle", "cross", "diamond", "square", "star", "triangle", "wye"]).isRequired,
  /**
   * If `true`, animations are skipped.
   * @default false
   */
  skipAnimation: import_prop_types8.default.bool
} : void 0;

// node_modules/@mui/x-charts/esm/LineChart/MarkElement.js
var React26 = __toESM(require_react(), 1);
var import_prop_types9 = __toESM(require_prop_types(), 1);

// node_modules/@mui/x-charts/esm/internals/getSymbol.js
function getSymbol(shape) {
  switch (shape) {
    case "circle":
      return 0;
    case "cross":
      return 1;
    case "diamond":
      return 2;
    case "square":
      return 3;
    case "star":
      return 4;
    case "triangle":
      return 5;
    case "wye":
      return 6;
    default:
      return 0;
  }
}

// node_modules/@mui/x-charts/esm/LineChart/MarkElement.js
var import_jsx_runtime11 = __toESM(require_jsx_runtime(), 1);
var _excluded10 = ["x", "y", "id", "classes", "color", "shape", "dataIndex", "onClick", "skipAnimation", "isFaded", "isHighlighted"];
var MarkElementPath = styled_default("path", {
  name: "MuiMarkElement",
  slot: "Root"
})(({
  ownerState,
  theme
}) => ({
  fill: (theme.vars || theme).palette.background.paper,
  stroke: ownerState.color,
  strokeWidth: 2,
  [`&.${markElementClasses.animate}`]: {
    transitionDuration: `${ANIMATION_DURATION_MS}ms`,
    transitionProperty: "transform, transform-origin",
    transitionTimingFunction: ANIMATION_TIMING_FUNCTION
  }
}));
function MarkElement(props) {
  const {
    x,
    y,
    id,
    classes: innerClasses,
    color,
    shape,
    dataIndex,
    onClick,
    skipAnimation,
    isFaded = false,
    isHighlighted = false
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded10);
  const interactionProps = useInteractionItemProps({
    type: "line",
    seriesId: id,
    dataIndex
  });
  const ownerState = {
    id,
    classes: innerClasses,
    isHighlighted,
    isFaded,
    color,
    skipAnimation
  };
  const classes = useUtilityClasses3(ownerState);
  return (0, import_jsx_runtime11.jsx)(MarkElementPath, _extends({}, other, {
    style: {
      transform: `translate(${x}px, ${y}px)`,
      transformOrigin: `${x}px ${y}px`
    },
    ownerState,
    className: classes.root,
    d: Symbol(symbolsFill[getSymbol(shape)])(),
    onClick,
    cursor: onClick ? "pointer" : "unset"
  }, interactionProps, {
    "data-highlighted": isHighlighted || void 0,
    "data-faded": isFaded || void 0
  }));
}
true ? MarkElement.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "pnpm proptypes"  |
  // ----------------------------------------------------------------------
  classes: import_prop_types9.default.object,
  /**
   * The index to the element in the series' data array.
   */
  dataIndex: import_prop_types9.default.number.isRequired,
  id: import_prop_types9.default.oneOfType([import_prop_types9.default.number, import_prop_types9.default.string]).isRequired,
  /**
   * If `true`, the marker is faded.
   * @default false
   */
  isFaded: import_prop_types9.default.bool,
  /**
   * If `true`, the marker is highlighted.
   * @default false
   */
  isHighlighted: import_prop_types9.default.bool,
  /**
   * The shape of the marker.
   */
  shape: import_prop_types9.default.oneOf(["circle", "cross", "diamond", "square", "star", "triangle", "wye"]).isRequired,
  /**
   * If `true`, animations are skipped.
   */
  skipAnimation: import_prop_types9.default.bool
} : void 0;

// node_modules/@mui/x-charts/esm/LineChart/MarkPlot.js
var import_jsx_runtime12 = __toESM(require_jsx_runtime(), 1);
var _excluded11 = ["slots", "slotProps", "skipAnimation", "onItemClick"];
function MarkPlot(props) {
  const {
    slots,
    slotProps,
    skipAnimation: inSkipAnimation,
    onItemClick
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded11);
  const isZoomInteracting = useInternalIsZoomInteracting();
  const skipAnimation = useSkipAnimation(isZoomInteracting || inSkipAnimation);
  const seriesData = useLineSeriesContext();
  const {
    xAxis,
    xAxisIds
  } = useXAxes();
  const {
    yAxis,
    yAxisIds
  } = useYAxes();
  const chartId = useChartId2();
  const {
    instance,
    store
  } = useChartContext();
  const {
    isFaded,
    isHighlighted
  } = useItemHighlightedGetter();
  const xAxisInteractionIndex = useSelector(store, selectorChartsInteractionXAxisIndex);
  if (seriesData === void 0) {
    return null;
  }
  const {
    series,
    stackingGroups
  } = seriesData;
  const defaultXAxisId = xAxisIds[0];
  const defaultYAxisId = yAxisIds[0];
  return (0, import_jsx_runtime12.jsx)("g", _extends({}, other, {
    children: stackingGroups.flatMap(({
      ids: groupIds
    }) => {
      return groupIds.map((seriesId) => {
        const {
          xAxisId = defaultXAxisId,
          yAxisId = defaultYAxisId,
          stackedData,
          data,
          showMark = true,
          shape = "circle"
        } = series[seriesId];
        if (showMark === false) {
          return null;
        }
        const xScale = getValueToPositionMapper(xAxis[xAxisId].scale);
        const yScale = yAxis[yAxisId].scale;
        const xData = xAxis[xAxisId].data;
        if (xData === void 0) {
          throw new Error(`MUI X Charts: ${xAxisId === DEFAULT_X_AXIS_KEY ? "The first `xAxis`" : `The x-axis with id "${xAxisId}"`} should have data property to be able to display a line plot.`);
        }
        const clipId = cleanId(`${chartId}-${seriesId}-line-clip`);
        const colorGetter = getColor_default3(series[seriesId], xAxis[xAxisId], yAxis[yAxisId]);
        const Mark = (slots == null ? void 0 : slots.mark) ?? (shape === "circle" ? CircleMarkElement : MarkElement);
        const isSeriesHighlighted = isHighlighted({
          seriesId
        });
        const isSeriesFaded = !isSeriesHighlighted && isFaded({
          seriesId
        });
        return (0, import_jsx_runtime12.jsx)("g", {
          clipPath: `url(#${clipId})`,
          "data-series": seriesId,
          children: xData == null ? void 0 : xData.map((x, index) => {
            const value = data[index] == null ? null : stackedData[index][1];
            return {
              x: xScale(x),
              y: value === null ? null : yScale(value),
              position: x,
              value,
              index
            };
          }).filter(({
            x,
            y,
            index,
            position,
            value
          }) => {
            if (value === null || y === null) {
              return false;
            }
            if (!instance.isPointInside(x, y)) {
              return false;
            }
            if (showMark === true) {
              return true;
            }
            return showMark({
              x,
              y,
              index,
              position,
              value
            });
          }).map(({
            x,
            y,
            index
          }) => {
            return (0, import_jsx_runtime12.jsx)(Mark, _extends({
              id: seriesId,
              dataIndex: index,
              shape,
              color: colorGetter(index),
              x,
              y,
              skipAnimation,
              onClick: onItemClick && ((event) => onItemClick(event, {
                type: "line",
                seriesId,
                dataIndex: index
              })),
              isHighlighted: xAxisInteractionIndex === index || isSeriesHighlighted,
              isFaded: isSeriesFaded
            }, slotProps == null ? void 0 : slotProps.mark), `${seriesId}-${index}`);
          })
        }, seriesId);
      });
    })
  }));
}
true ? MarkPlot.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "pnpm proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * Callback fired when a line mark item is clicked.
   * @param {React.MouseEvent<SVGPathElement, MouseEvent>} event The event source of the callback.
   * @param {LineItemIdentifier} lineItemIdentifier The line mark item identifier.
   */
  onItemClick: import_prop_types10.default.func,
  /**
   * If `true`, animations are skipped.
   */
  skipAnimation: import_prop_types10.default.bool,
  /**
   * The props used for each component slot.
   * @default {}
   */
  slotProps: import_prop_types10.default.object,
  /**
   * Overridable component slots.
   * @default {}
   */
  slots: import_prop_types10.default.object
} : void 0;

// node_modules/@mui/x-charts/esm/ChartsAxis/ChartsAxis.js
var React34 = __toESM(require_react(), 1);
var import_prop_types14 = __toESM(require_prop_types(), 1);

// node_modules/@mui/x-charts/esm/ChartsXAxis/ChartsXAxis.js
var React32 = __toESM(require_react(), 1);
var import_prop_types12 = __toESM(require_prop_types(), 1);

// node_modules/@mui/x-charts/esm/hooks/useIsHydrated.js
var React28 = __toESM(require_react(), 1);
function useIsHydrated() {
  const [isHydrated, setIsHydrated] = React28.useState(typeof window !== "undefined" || false);
  React28.useEffect(() => {
    setIsHydrated(true);
  }, []);
  return isHydrated;
}

// node_modules/@mui/x-charts/esm/internals/domUtils.js
function isSsr() {
  return typeof window === "undefined";
}
var stringCache = /* @__PURE__ */ new Map();
var MAX_CACHE_NUM = 2e3;
var SPAN_STYLE = {
  position: "absolute",
  top: "-20000px",
  left: 0,
  padding: 0,
  margin: 0,
  border: "none",
  whiteSpace: "pre"
};
var STYLE_LIST = ["minWidth", "maxWidth", "width", "minHeight", "maxHeight", "height", "top", "left", "fontSize", "padding", "margin", "paddingLeft", "paddingRight", "paddingTop", "paddingBottom", "marginLeft", "marginRight", "marginTop", "marginBottom"];
var MEASUREMENT_SPAN_ID = "mui_measurement_span";
function autoCompleteStyle(name, value) {
  if (STYLE_LIST.indexOf(name) >= 0 && value === +value) {
    return `${value}px`;
  }
  return value;
}
function camelToMiddleLine(text) {
  const strs = text.split("");
  const formatStrs = strs.reduce((result, entry) => {
    if (entry === entry.toUpperCase()) {
      return [...result, "-", entry.toLowerCase()];
    }
    return [...result, entry];
  }, []);
  return formatStrs.join("");
}
var getStyleString = (style) => Object.keys(style).sort().reduce((result, s) => `${result}${camelToMiddleLine(s)}:${autoCompleteStyle(s, style[s])};`, "");
var domCleanTimeout;
var getStringSize = (text, style = {}) => {
  if (text === void 0 || text === null || isSsr()) {
    return {
      width: 0,
      height: 0
    };
  }
  const str = `${text}`;
  const styleString = getStyleString(style);
  const cacheKey = `${str}-${styleString}`;
  const size = stringCache.get(cacheKey);
  if (size) {
    return size;
  }
  try {
    let measurementSpan = document.getElementById(MEASUREMENT_SPAN_ID);
    if (measurementSpan === null) {
      measurementSpan = document.createElement("span");
      measurementSpan.setAttribute("id", MEASUREMENT_SPAN_ID);
      measurementSpan.setAttribute("aria-hidden", "true");
      document.body.appendChild(measurementSpan);
    }
    const measurementSpanStyle = _extends({}, SPAN_STYLE, style);
    Object.keys(measurementSpanStyle).map((styleKey) => {
      measurementSpan.style[camelToMiddleLine(styleKey)] = autoCompleteStyle(styleKey, measurementSpanStyle[styleKey]);
      return styleKey;
    });
    measurementSpan.textContent = str;
    const rect = measurementSpan.getBoundingClientRect();
    const result = {
      width: rect.width,
      height: rect.height
    };
    stringCache.set(cacheKey, result);
    if (stringCache.size + 1 > MAX_CACHE_NUM) {
      stringCache.clear();
    }
    if (false) {
      measurementSpan.textContent = "";
    } else {
      if (domCleanTimeout) {
        clearTimeout(domCleanTimeout);
      }
      domCleanTimeout = setTimeout(() => {
        measurementSpan.textContent = "";
      }, 0);
    }
    return result;
  } catch {
    return {
      width: 0,
      height: 0
    };
  }
};

// node_modules/@mui/x-charts/esm/hooks/useTicks.js
var React29 = __toESM(require_react(), 1);

// node_modules/@mui/x-charts/esm/internals/isInfinity.js
function isInfinity(v2) {
  return typeof v2 === "number" && !Number.isFinite(v2);
}

// node_modules/@mui/x-charts/esm/hooks/useTicks.js
var offsetRatio = {
  start: 0,
  extremities: 0,
  end: 1,
  middle: 0.5
};
function useTicks(options) {
  const {
    scale: scale2,
    tickNumber,
    valueFormatter,
    tickInterval,
    tickPlacement = "extremities",
    tickLabelPlacement: tickLabelPlacementProp,
    direction
  } = options;
  const {
    instance
  } = useChartContext();
  return React29.useMemo(() => {
    if (isBandScale(scale2)) {
      const domain2 = scale2.domain();
      const tickLabelPlacement2 = tickLabelPlacementProp ?? "middle";
      if (scale2.bandwidth() > 0) {
        const filteredDomain2 = typeof tickInterval === "function" && domain2.filter(tickInterval) || typeof tickInterval === "object" && tickInterval || domain2;
        return [...filteredDomain2.map((value) => ({
          value,
          formattedValue: (valueFormatter == null ? void 0 : valueFormatter(value, {
            location: "tick",
            scale: scale2
          })) ?? `${value}`,
          offset: scale2(value) - (scale2.step() - scale2.bandwidth()) / 2 + offsetRatio[tickPlacement] * scale2.step(),
          labelOffset: tickLabelPlacement2 === "tick" ? 0 : scale2.step() * (offsetRatio[tickLabelPlacement2] - offsetRatio[tickPlacement])
        })), ...tickPlacement === "extremities" ? [{
          formattedValue: void 0,
          offset: scale2.range()[1],
          labelOffset: 0
        }] : []];
      }
      const filteredDomain = typeof tickInterval === "function" && domain2.filter(tickInterval) || typeof tickInterval === "object" && tickInterval || domain2;
      return filteredDomain.map((value) => ({
        value,
        formattedValue: (valueFormatter == null ? void 0 : valueFormatter(value, {
          location: "tick",
          scale: scale2
        })) ?? `${value}`,
        offset: scale2(value),
        labelOffset: 0
      }));
    }
    const domain = scale2.domain();
    if (domain.some(isInfinity)) {
      return [];
    }
    const tickLabelPlacement = tickLabelPlacementProp;
    const ticks = typeof tickInterval === "object" ? tickInterval : scale2.ticks(tickNumber);
    const visibleTicks = [];
    for (let i = 0; i < ticks.length; i += 1) {
      const value = ticks[i];
      const offset = scale2(value);
      const isInside = direction === "x" ? instance.isXInside(offset) : instance.isYInside(offset);
      if (isInside) {
        visibleTicks.push({
          value,
          formattedValue: (valueFormatter == null ? void 0 : valueFormatter(value, {
            location: "tick",
            scale: scale2
          })) ?? scale2.tickFormat(tickNumber)(value),
          offset,
          // Allowing the label to be placed in the middle of a continuous scale is weird.
          // But it is useful in some cases, like funnel categories with a linear scale.
          labelOffset: tickLabelPlacement === "middle" ? scale2(ticks[i - 1] ?? 0) - (offset + scale2(ticks[i - 1] ?? 0)) / 2 : 0
        });
      }
    }
    return visibleTicks;
  }, [scale2, tickLabelPlacementProp, tickInterval, tickNumber, tickPlacement, valueFormatter, direction, instance]);
}

// node_modules/@mui/x-charts/esm/ChartsAxis/axisClasses.js
function getAxisUtilityClass(slot) {
  return generateUtilityClass("MuiChartsAxis", slot);
}
var axisClasses = generateUtilityClasses("MuiChartsAxis", ["root", "line", "tickContainer", "tick", "tickLabel", "label", "directionX", "directionY", "top", "bottom", "left", "right", "id"]);

// node_modules/@mui/x-charts/esm/internals/components/AxisSharedComponents.js
var AxisRoot = styled_default("g", {
  name: "MuiChartsAxis",
  slot: "Root"
})(({
  theme
}) => ({
  [`& .${axisClasses.tickLabel}`]: _extends({}, theme.typography.caption, {
    fill: (theme.vars || theme).palette.text.primary
  }),
  [`& .${axisClasses.label}`]: {
    fill: (theme.vars || theme).palette.text.primary
  },
  [`& .${axisClasses.line}`]: {
    stroke: (theme.vars || theme).palette.text.primary,
    shapeRendering: "crispEdges",
    strokeWidth: 1
  },
  [`& .${axisClasses.tick}`]: {
    stroke: (theme.vars || theme).palette.text.primary,
    shapeRendering: "crispEdges"
  }
}));

// node_modules/@mui/x-charts/esm/ChartsText/ChartsText.js
var React30 = __toESM(require_react(), 1);
var import_prop_types11 = __toESM(require_prop_types(), 1);

// node_modules/@mui/x-charts/esm/internals/getWordsByLines.js
function getWordsByLines({
  style,
  needsComputation,
  text
}) {
  return text.split("\n").map((subText) => _extends({
    text: subText
  }, needsComputation ? getStringSize(subText, style) : {
    width: 0,
    height: 0
  }));
}

// node_modules/@mui/x-charts/esm/ChartsText/ChartsText.js
var import_jsx_runtime13 = __toESM(require_jsx_runtime(), 1);
var _excluded12 = ["x", "y", "style", "text", "ownerState"];
var _excluded22 = ["angle", "textAnchor", "dominantBaseline"];
function ChartsText(props) {
  const {
    x,
    y,
    style: styleProps,
    text
  } = props, textProps = _objectWithoutPropertiesLoose(props, _excluded12);
  const _ref = styleProps ?? {}, {
    angle,
    textAnchor,
    dominantBaseline
  } = _ref, style = _objectWithoutPropertiesLoose(_ref, _excluded22);
  const isHydrated = useIsHydrated();
  const wordsByLines = React30.useMemo(() => getWordsByLines({
    style,
    needsComputation: isHydrated && text.includes("\n"),
    text
  }), [style, text, isHydrated]);
  let startDy;
  switch (dominantBaseline) {
    case "hanging":
    case "text-before-edge":
      startDy = 0;
      break;
    case "central":
      startDy = (wordsByLines.length - 1) / 2 * -wordsByLines[0].height;
      break;
    default:
      startDy = (wordsByLines.length - 1) * -wordsByLines[0].height;
      break;
  }
  return (0, import_jsx_runtime13.jsx)("text", _extends({}, textProps, {
    transform: angle ? `rotate(${angle}, ${x}, ${y})` : void 0,
    x,
    y,
    textAnchor,
    dominantBaseline,
    style,
    children: wordsByLines.map((line, index) => (0, import_jsx_runtime13.jsx)("tspan", {
      x,
      dy: `${index === 0 ? startDy : wordsByLines[0].height}px`,
      dominantBaseline,
      children: line.text
    }, index))
  }));
}
true ? ChartsText.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "pnpm proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * Height of a text line (in `em`).
   */
  lineHeight: import_prop_types11.default.number,
  /**
   * If `true`, the line width is computed.
   * @default false
   */
  needsComputation: import_prop_types11.default.bool,
  ownerState: import_prop_types11.default.any,
  /**
   * Style applied to text elements.
   */
  style: import_prop_types11.default.object,
  /**
   * Text displayed.
   */
  text: import_prop_types11.default.string.isRequired
} : void 0;

// node_modules/@mui/x-charts/esm/hooks/useMounted.js
var React31 = __toESM(require_react(), 1);
function useMounted(defer = false) {
  const [mountedState, setMountedState] = React31.useState(false);
  useEnhancedEffect_default(() => {
    if (!defer) {
      setMountedState(true);
    }
  }, [defer]);
  React31.useEffect(() => {
    if (defer) {
      setMountedState(true);
    }
  }, [defer]);
  return mountedState;
}

// node_modules/@mui/x-charts/esm/internals/clampAngle.js
function clampAngle(angle) {
  return (angle % 360 + 360) % 360;
}
var TWO_PI = 2 * Math.PI;
function clampAngleRad(angle) {
  return (angle % TWO_PI + TWO_PI) % TWO_PI;
}

// node_modules/@mui/x-charts/esm/ChartsText/defaultTextPlacement.js
function getDefaultTextAnchor(angle) {
  const adjustedAngle = clampAngle(angle);
  if (adjustedAngle <= 30 || adjustedAngle >= 330) {
    return "middle";
  }
  if (adjustedAngle <= 210 && adjustedAngle >= 150) {
    return "middle";
  }
  if (adjustedAngle <= 180) {
    return "end";
  }
  return "start";
}
function getDefaultBaseline(angle) {
  const adjustedAngle = clampAngle(angle);
  if (adjustedAngle <= 30 || adjustedAngle >= 330) {
    return "hanging";
  }
  if (adjustedAngle <= 210 && adjustedAngle >= 150) {
    return "auto";
  }
  return "central";
}

// node_modules/@mui/x-charts/esm/internals/invertTextAnchor.js
function invertTextAnchor(textAnchor) {
  switch (textAnchor) {
    case "start":
      return "end";
    case "end":
      return "start";
    default:
      return textAnchor;
  }
}

// node_modules/@mui/x-charts/esm/internals/getGraphemeCount.js
var segmenter = typeof window !== "undefined" && "Intl" in window && "Segmenter" in Intl ? new Intl.Segmenter(void 0, {
  granularity: "grapheme"
}) : null;
function getGraphemeCountFallback(text) {
  return text.length;
}
function getGraphemeCountModern(text) {
  const segments = segmenter.segment(text);
  let count = 0;
  for (const _unused of segments) {
    count += 1;
  }
  return count;
}
var getGraphemeCount = segmenter ? getGraphemeCountModern : getGraphemeCountFallback;

// node_modules/@mui/x-charts/esm/internals/degToRad.js
function degToRad(degrees) {
  return degrees * (Math.PI / 180);
}

// node_modules/@mui/x-charts/esm/internals/sliceUntil.js
var segmenter2 = typeof window !== "undefined" && "Intl" in window && "Segmenter" in Intl ? new Intl.Segmenter(void 0, {
  granularity: "grapheme"
}) : null;
function sliceUntilFallback(text, endIndex) {
  return text.slice(0, endIndex);
}
function sliceUntilModern(text, endIndex) {
  const segments = segmenter2.segment(text);
  let newText = "";
  let i = 0;
  for (const segment of segments) {
    newText += segment.segment;
    i += 1;
    if (i >= endIndex) {
      break;
    }
  }
  return newText;
}
var sliceUntil = segmenter2 ? sliceUntilModern : sliceUntilFallback;

// node_modules/@mui/x-charts/esm/internals/ellipsize.js
var ELLIPSIS = "…";
function doesTextFitInRect(text, config) {
  const {
    width,
    height,
    measureText
  } = config;
  const angle = degToRad(config.angle);
  const textSize = measureText(text);
  const angledWidth = Math.abs(textSize.width * Math.cos(angle)) + Math.abs(textSize.height * Math.sin(angle));
  const angledHeight = Math.abs(textSize.width * Math.sin(angle)) + Math.abs(textSize.height * Math.cos(angle));
  return angledWidth <= width && angledHeight <= height;
}
function ellipsize(text, doesTextFit) {
  if (doesTextFit(text)) {
    return text;
  }
  let shortenedText = text;
  let step = 1;
  let by = 1 / 2;
  const graphemeCount = getGraphemeCount(text);
  let newLength = graphemeCount;
  let lastLength = graphemeCount;
  let longestFittingText = null;
  do {
    lastLength = newLength;
    newLength = Math.floor(graphemeCount * by);
    if (newLength === 0) {
      break;
    }
    shortenedText = sliceUntil(text, newLength).trim();
    const fits = doesTextFit(shortenedText + ELLIPSIS);
    step += 1;
    if (fits) {
      longestFittingText = shortenedText;
      by += 1 / 2 ** step;
    } else {
      by -= 1 / 2 ** step;
    }
  } while (Math.abs(newLength - lastLength) !== 1);
  return longestFittingText ? longestFittingText + ELLIPSIS : "";
}

// node_modules/@mui/x-charts/esm/ChartsXAxis/shortenLabels.js
function shortenLabels(visibleLabels, drawingArea, maxHeight, isRtl, tickLabelStyle) {
  const shortenedLabels = /* @__PURE__ */ new Map();
  const angle = clampAngle((tickLabelStyle == null ? void 0 : tickLabelStyle.angle) ?? 0);
  let leftBoundFactor = 1;
  let rightBoundFactor = 1;
  if ((tickLabelStyle == null ? void 0 : tickLabelStyle.textAnchor) === "start") {
    leftBoundFactor = Infinity;
    rightBoundFactor = 1;
  } else if ((tickLabelStyle == null ? void 0 : tickLabelStyle.textAnchor) === "end") {
    leftBoundFactor = 1;
    rightBoundFactor = Infinity;
  } else {
    leftBoundFactor = 2;
    rightBoundFactor = 2;
  }
  if (angle > 90 && angle < 270) {
    [leftBoundFactor, rightBoundFactor] = [rightBoundFactor, leftBoundFactor];
  }
  if (isRtl) {
    [leftBoundFactor, rightBoundFactor] = [rightBoundFactor, leftBoundFactor];
  }
  for (const item of visibleLabels) {
    if (item.formattedValue) {
      const width = Math.min((item.offset + item.labelOffset) * leftBoundFactor, (drawingArea.left + drawingArea.width + drawingArea.right - item.offset - item.labelOffset) * rightBoundFactor);
      const doesTextFit = (text) => doesTextFitInRect(text, {
        width,
        height: maxHeight,
        angle,
        measureText: (string) => getStringSize(string, tickLabelStyle)
      });
      shortenedLabels.set(item, ellipsize(item.formattedValue.toString(), doesTextFit));
    }
  }
  return shortenedLabels;
}

// node_modules/@mui/x-charts/esm/internals/geometry.js
var ANGLE_APPROX = 5;
function getMinXTranslation(width, height, angle = 0) {
  if (true) {
    if (angle > 90 && angle < -90) {
      warnOnce([`MUI X Charts: It seems you applied an angle larger than 90° or smaller than -90° to an axis text.`, `This could cause some text overlapping.`, `If you encounter a use case where it's needed, please open an issue.`]);
    }
  }
  const standardAngle = Math.min(Math.abs(angle) % 180, Math.abs(Math.abs(angle) % 180 - 180) % 180);
  if (standardAngle < ANGLE_APPROX) {
    return width;
  }
  if (standardAngle > 90 - ANGLE_APPROX) {
    return height;
  }
  const radAngle = deg2rad(standardAngle);
  const angleSwich = Math.atan2(height, width);
  if (radAngle < angleSwich) {
    return width / Math.cos(radAngle);
  }
  return height / Math.sin(radAngle);
}

// node_modules/@mui/x-charts/esm/ChartsXAxis/getVisibleLabels.js
function getVisibleLabels(xTicks, {
  tickLabelStyle: style,
  tickLabelInterval,
  tickLabelMinGap,
  reverse,
  isMounted,
  isXInside
}) {
  const getTickLabelSize = (tick) => {
    if (!isMounted || tick.formattedValue === void 0) {
      return {
        width: 0,
        height: 0
      };
    }
    const tickSizes = getWordsByLines({
      style,
      needsComputation: true,
      text: tick.formattedValue
    });
    return {
      width: Math.max(...tickSizes.map((size) => size.width)),
      height: Math.max(tickSizes.length * tickSizes[0].height)
    };
  };
  if (typeof tickLabelInterval === "function") {
    return new Set(xTicks.filter((item, index) => tickLabelInterval(item.value, index)));
  }
  let previousTextLimit = 0;
  const direction = reverse ? -1 : 1;
  return new Set(xTicks.filter((item, labelIndex) => {
    const {
      offset,
      labelOffset
    } = item;
    const textPosition = offset + labelOffset;
    if (labelIndex > 0 && direction * textPosition < direction * (previousTextLimit + tickLabelMinGap)) {
      return false;
    }
    if (!isXInside(textPosition)) {
      return false;
    }
    const {
      width,
      height
    } = getTickLabelSize(item);
    const distance = getMinXTranslation(width, height, style == null ? void 0 : style.angle);
    const currentTextLimit = textPosition - direction * distance / 2;
    if (labelIndex > 0 && direction * currentTextLimit < direction * (previousTextLimit + tickLabelMinGap)) {
      return false;
    }
    previousTextLimit = textPosition + direction * distance / 2;
    return true;
  }));
}

// node_modules/@mui/x-charts/esm/ChartsXAxis/ChartsXAxis.js
var import_jsx_runtime14 = __toESM(require_jsx_runtime(), 1);
var _excluded13 = ["scale", "tickNumber", "reverse"];
var useUtilityClasses4 = (ownerState) => {
  const {
    classes,
    position,
    id
  } = ownerState;
  const slots = {
    root: ["root", "directionX", position, `id-${id}`],
    line: ["line"],
    tickContainer: ["tickContainer"],
    tick: ["tick"],
    tickLabel: ["tickLabel"],
    label: ["label"]
  };
  return composeClasses(slots, getAxisUtilityClass, classes);
};
var TICK_LABEL_GAP = 3;
var AXIS_LABEL_TICK_LABEL_GAP = 4;
var XAxisRoot = styled_default(AxisRoot, {
  name: "MuiChartsXAxis",
  slot: "Root"
})({});
var defaultProps = {
  disableLine: false,
  disableTicks: false,
  tickSize: 6,
  tickLabelMinGap: 4
};
function ChartsXAxis(inProps) {
  const {
    xAxis,
    xAxisIds
  } = useXAxes();
  const _xAxis = xAxis[inProps.axisId ?? xAxisIds[0]], {
    scale: xScale,
    tickNumber,
    reverse
  } = _xAxis, settings = _objectWithoutPropertiesLoose(_xAxis, _excluded13);
  const isMounted = useMounted();
  const themedProps = useThemeProps({
    props: _extends({}, settings, inProps),
    name: "MuiChartsXAxis"
  });
  const defaultizedProps = _extends({}, defaultProps, themedProps);
  const {
    position,
    disableLine,
    disableTicks,
    tickLabelStyle,
    label,
    labelStyle,
    tickSize: tickSizeProp,
    valueFormatter,
    slots,
    slotProps,
    tickInterval,
    tickLabelInterval,
    tickPlacement,
    tickLabelPlacement,
    tickLabelMinGap,
    sx,
    offset,
    height: axisHeight
  } = defaultizedProps;
  const theme = useTheme();
  const isRtl = useRtl();
  const classes = useUtilityClasses4(defaultizedProps);
  const drawingArea = useDrawingArea();
  const {
    left,
    top,
    width,
    height
  } = drawingArea;
  const {
    instance
  } = useChartContext();
  const isHydrated = useIsHydrated();
  const tickSize = disableTicks ? 4 : tickSizeProp;
  const positionSign = position === "bottom" ? 1 : -1;
  const Line = (slots == null ? void 0 : slots.axisLine) ?? "line";
  const Tick = (slots == null ? void 0 : slots.axisTick) ?? "line";
  const TickLabel = (slots == null ? void 0 : slots.axisTickLabel) ?? ChartsText;
  const Label = (slots == null ? void 0 : slots.axisLabel) ?? ChartsText;
  const defaultTextAnchor = getDefaultTextAnchor((position === "bottom" ? 0 : 180) - ((tickLabelStyle == null ? void 0 : tickLabelStyle.angle) ?? 0));
  const defaultDominantBaseline = getDefaultBaseline((position === "bottom" ? 0 : 180) - ((tickLabelStyle == null ? void 0 : tickLabelStyle.angle) ?? 0));
  const axisTickLabelProps = useSlotProps_default({
    elementType: TickLabel,
    externalSlotProps: slotProps == null ? void 0 : slotProps.axisTickLabel,
    additionalProps: {
      style: _extends({}, theme.typography.caption, {
        fontSize: 12,
        lineHeight: 1.25,
        textAnchor: isRtl ? invertTextAnchor(defaultTextAnchor) : defaultTextAnchor,
        dominantBaseline: defaultDominantBaseline
      }, tickLabelStyle)
    },
    className: classes.tickLabel,
    ownerState: {}
  });
  const xTicks = useTicks({
    scale: xScale,
    tickNumber,
    valueFormatter,
    tickInterval,
    tickPlacement,
    tickLabelPlacement,
    direction: "x"
  });
  const visibleLabels = getVisibleLabels(xTicks, {
    tickLabelStyle: axisTickLabelProps.style,
    tickLabelInterval,
    tickLabelMinGap,
    reverse,
    isMounted,
    isXInside: instance.isXInside
  });
  const axisLabelProps = useSlotProps_default({
    elementType: Label,
    externalSlotProps: slotProps == null ? void 0 : slotProps.axisLabel,
    additionalProps: {
      style: _extends({}, theme.typography.body1, {
        lineHeight: 1,
        fontSize: 14,
        textAnchor: "middle",
        dominantBaseline: position === "bottom" ? "text-after-edge" : "text-before-edge"
      }, labelStyle)
    },
    ownerState: {}
  });
  const domain = xScale.domain();
  const ordinalAxis = isBandScale(xScale);
  if (ordinalAxis && domain.length === 0 || !ordinalAxis && domain.some(isInfinity) || position === "none") {
    return null;
  }
  const labelHeight = label ? getStringSize(label, axisLabelProps.style).height : 0;
  const labelRefPoint = {
    x: left + width / 2,
    y: positionSign * axisHeight
  };
  const tickLabelsMaxHeight = Math.max(0, axisHeight - (label ? labelHeight + AXIS_LABEL_TICK_LABEL_GAP : 0) - tickSize - TICK_LABEL_GAP);
  const tickLabels = isHydrated ? shortenLabels(visibleLabels, drawingArea, tickLabelsMaxHeight, isRtl, axisTickLabelProps.style) : new Map(Array.from(visibleLabels).map((item) => [item, item.formattedValue]));
  return (0, import_jsx_runtime14.jsxs)(XAxisRoot, {
    transform: `translate(0, ${position === "bottom" ? top + height + offset : top - offset})`,
    className: classes.root,
    sx,
    children: [!disableLine && (0, import_jsx_runtime14.jsx)(Line, _extends({
      x1: left,
      x2: left + width,
      className: classes.line
    }, slotProps == null ? void 0 : slotProps.axisLine)), xTicks.map((item, index) => {
      const {
        offset: tickOffset,
        labelOffset
      } = item;
      const xTickLabel = labelOffset ?? 0;
      const yTickLabel = positionSign * (tickSize + TICK_LABEL_GAP);
      const showTick = instance.isXInside(tickOffset);
      const tickLabel = tickLabels.get(item);
      const showTickLabel = visibleLabels.has(item);
      return (0, import_jsx_runtime14.jsxs)("g", {
        transform: `translate(${tickOffset}, 0)`,
        className: classes.tickContainer,
        children: [!disableTicks && showTick && (0, import_jsx_runtime14.jsx)(Tick, _extends({
          y2: positionSign * tickSize,
          className: classes.tick
        }, slotProps == null ? void 0 : slotProps.axisTick)), tickLabel !== void 0 && showTickLabel && (0, import_jsx_runtime14.jsx)(TickLabel, _extends({
          x: xTickLabel,
          y: yTickLabel
        }, axisTickLabelProps, {
          text: tickLabel
        }))]
      }, index);
    }), label && (0, import_jsx_runtime14.jsx)("g", {
      className: classes.label,
      children: (0, import_jsx_runtime14.jsx)(Label, _extends({}, labelRefPoint, axisLabelProps, {
        text: label
      }))
    })]
  });
}
true ? ChartsXAxis.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "pnpm proptypes"  |
  // ----------------------------------------------------------------------
  axis: import_prop_types12.default.oneOf(["x"]),
  /**
   * The id of the axis to render.
   * If undefined, it will be the first defined axis.
   */
  axisId: import_prop_types12.default.oneOfType([import_prop_types12.default.number, import_prop_types12.default.string]),
  /**
   * Override or extend the styles applied to the component.
   */
  classes: import_prop_types12.default.object,
  /**
   * If true, the axis line is disabled.
   * @default false
   */
  disableLine: import_prop_types12.default.bool,
  /**
   * If true, the ticks are disabled.
   * @default false
   */
  disableTicks: import_prop_types12.default.bool,
  /**
   * The fill color of the axis text.
   * @default 'currentColor'
   */
  fill: import_prop_types12.default.string,
  /**
   * The label of the axis.
   */
  label: import_prop_types12.default.string,
  /**
   * The style applied to the axis label.
   */
  labelStyle: import_prop_types12.default.object,
  /**
   * The props used for each component slot.
   * @default {}
   */
  slotProps: import_prop_types12.default.object,
  /**
   * Overridable component slots.
   * @default {}
   */
  slots: import_prop_types12.default.object,
  /**
   * The stroke color of the axis line.
   * @default 'currentColor'
   */
  stroke: import_prop_types12.default.string,
  sx: import_prop_types12.default.oneOfType([import_prop_types12.default.arrayOf(import_prop_types12.default.oneOfType([import_prop_types12.default.func, import_prop_types12.default.object, import_prop_types12.default.bool])), import_prop_types12.default.func, import_prop_types12.default.object]),
  /**
   * Defines which ticks are displayed.
   * Its value can be:
   * - 'auto' In such case the ticks are computed based on axis scale and other parameters.
   * - a filtering function of the form `(value, index) => boolean` which is available only if the axis has "point" scale.
   * - an array containing the values where ticks should be displayed.
   * @see See {@link https://mui.com/x/react-charts/axis/#fixed-tick-positions}
   * @default 'auto'
   */
  tickInterval: import_prop_types12.default.oneOfType([import_prop_types12.default.oneOf(["auto"]), import_prop_types12.default.array, import_prop_types12.default.func]),
  /**
   * Defines which ticks get its label displayed. Its value can be:
   * - 'auto' In such case, labels are displayed if they do not overlap with the previous one.
   * - a filtering function of the form (value, index) => boolean. Warning: the index is tick index, not data ones.
   * @default 'auto'
   */
  tickLabelInterval: import_prop_types12.default.oneOfType([import_prop_types12.default.oneOf(["auto"]), import_prop_types12.default.func]),
  /**
   * The minimum gap in pixels between two tick labels.
   * If two tick labels are closer than this minimum gap, one of them will be hidden.
   * @default 4
   */
  tickLabelMinGap: import_prop_types12.default.number,
  /**
   * The placement of ticks label. Can be the middle of the band, or the tick position.
   * Only used if scale is 'band'.
   * @default 'middle'
   */
  tickLabelPlacement: import_prop_types12.default.oneOf(["middle", "tick"]),
  /**
   * The style applied to ticks text.
   */
  tickLabelStyle: import_prop_types12.default.object,
  /**
   * Maximal step between two ticks.
   * When using time data, the value is assumed to be in ms.
   * Not supported by categorical axis (band, points).
   */
  tickMaxStep: import_prop_types12.default.number,
  /**
   * Minimal step between two ticks.
   * When using time data, the value is assumed to be in ms.
   * Not supported by categorical axis (band, points).
   */
  tickMinStep: import_prop_types12.default.number,
  /**
   * The number of ticks. This number is not guaranteed.
   * Not supported by categorical axis (band, points).
   */
  tickNumber: import_prop_types12.default.number,
  /**
   * The placement of ticks in regard to the band interval.
   * Only used if scale is 'band'.
   * @default 'extremities'
   */
  tickPlacement: import_prop_types12.default.oneOf(["end", "extremities", "middle", "start"]),
  /**
   * The size of the ticks.
   * @default 6
   */
  tickSize: import_prop_types12.default.number
} : void 0;

// node_modules/@mui/x-charts/esm/ChartsYAxis/ChartsYAxis.js
var React33 = __toESM(require_react(), 1);
var import_prop_types13 = __toESM(require_prop_types(), 1);

// node_modules/@mui/x-charts/esm/ChartsYAxis/shortenLabels.js
function shortenLabels2(visibleLabels, drawingArea, maxWidth, isRtl, tickLabelStyle) {
  const shortenedLabels = /* @__PURE__ */ new Map();
  const angle = clampAngle((tickLabelStyle == null ? void 0 : tickLabelStyle.angle) ?? 0);
  let topBoundFactor = 1;
  let bottomBoundFactor = 1;
  if ((tickLabelStyle == null ? void 0 : tickLabelStyle.textAnchor) === "start") {
    topBoundFactor = Infinity;
    bottomBoundFactor = 1;
  } else if ((tickLabelStyle == null ? void 0 : tickLabelStyle.textAnchor) === "end") {
    topBoundFactor = 1;
    bottomBoundFactor = Infinity;
  } else {
    topBoundFactor = 2;
    bottomBoundFactor = 2;
  }
  if (angle > 180) {
    [topBoundFactor, bottomBoundFactor] = [bottomBoundFactor, topBoundFactor];
  }
  if (isRtl) {
    [topBoundFactor, bottomBoundFactor] = [bottomBoundFactor, topBoundFactor];
  }
  for (const item of visibleLabels) {
    if (item.formattedValue) {
      const height = Math.min((item.offset + item.labelOffset) * topBoundFactor, (drawingArea.top + drawingArea.height + drawingArea.bottom - item.offset - item.labelOffset) * bottomBoundFactor);
      const doesTextFit = (text) => doesTextFitInRect(text, {
        width: maxWidth,
        height,
        angle,
        measureText: (string) => getStringSize(string, tickLabelStyle)
      });
      shortenedLabels.set(item, ellipsize(item.formattedValue.toString(), doesTextFit));
    }
  }
  return shortenedLabels;
}

// node_modules/@mui/x-charts/esm/ChartsYAxis/ChartsYAxis.js
var import_jsx_runtime15 = __toESM(require_jsx_runtime(), 1);
var _excluded14 = ["scale", "tickNumber"];
var useUtilityClasses5 = (ownerState) => {
  const {
    classes,
    position,
    id
  } = ownerState;
  const slots = {
    root: ["root", "directionY", position, `id-${id}`],
    line: ["line"],
    tickContainer: ["tickContainer"],
    tick: ["tick"],
    tickLabel: ["tickLabel"],
    label: ["label"]
  };
  return composeClasses(slots, getAxisUtilityClass, classes);
};
var TICK_LABEL_GAP2 = 2;
var AXIS_LABEL_TICK_LABEL_GAP2 = 2;
var YAxisRoot = styled_default(AxisRoot, {
  name: "MuiChartsYAxis",
  slot: "Root"
})({});
var defaultProps2 = {
  disableLine: false,
  disableTicks: false,
  tickSize: 6
};
function ChartsYAxis(inProps) {
  const {
    yAxisIds,
    yAxis
  } = useYAxes();
  const _yAxis = yAxis[inProps.axisId ?? yAxisIds[0]], {
    scale: yScale,
    tickNumber
  } = _yAxis, settings = _objectWithoutPropertiesLoose(_yAxis, _excluded14);
  const themedProps = useThemeProps({
    props: _extends({}, settings, inProps),
    name: "MuiChartsYAxis"
  });
  const defaultizedProps = _extends({}, defaultProps2, themedProps);
  const {
    position,
    disableLine,
    disableTicks,
    label,
    labelStyle,
    tickLabelStyle,
    tickSize: tickSizeProp,
    valueFormatter,
    slots,
    slotProps,
    tickPlacement,
    tickLabelPlacement,
    tickInterval,
    tickLabelInterval,
    sx,
    offset,
    width: axisWidth
  } = defaultizedProps;
  const theme = useTheme();
  const isRtl = useRtl();
  const isHydrated = useIsHydrated();
  const classes = useUtilityClasses5(defaultizedProps);
  const {
    instance
  } = useChartContext();
  const drawingArea = useDrawingArea();
  const {
    left,
    top,
    width,
    height
  } = drawingArea;
  const tickSize = disableTicks ? 4 : tickSizeProp;
  const yTicks = useTicks({
    scale: yScale,
    tickNumber,
    valueFormatter,
    tickPlacement,
    tickLabelPlacement,
    tickInterval,
    direction: "y"
  });
  const positionSign = position === "right" ? 1 : -1;
  const tickFontSize = typeof (tickLabelStyle == null ? void 0 : tickLabelStyle.fontSize) === "number" ? tickLabelStyle.fontSize : 12;
  const Line = (slots == null ? void 0 : slots.axisLine) ?? "line";
  const Tick = (slots == null ? void 0 : slots.axisTick) ?? "line";
  const TickLabel = (slots == null ? void 0 : slots.axisTickLabel) ?? ChartsText;
  const Label = (slots == null ? void 0 : slots.axisLabel) ?? ChartsText;
  const defaultTextAnchor = getDefaultTextAnchor((position === "right" ? -90 : 90) - ((tickLabelStyle == null ? void 0 : tickLabelStyle.angle) ?? 0));
  const defaultDominantBaseline = getDefaultBaseline((position === "right" ? -90 : 90) - ((tickLabelStyle == null ? void 0 : tickLabelStyle.angle) ?? 0));
  const axisTickLabelProps = useSlotProps_default({
    elementType: TickLabel,
    externalSlotProps: slotProps == null ? void 0 : slotProps.axisTickLabel,
    additionalProps: {
      style: _extends({}, theme.typography.caption, {
        fontSize: tickFontSize,
        textAnchor: isRtl ? invertTextAnchor(defaultTextAnchor) : defaultTextAnchor,
        dominantBaseline: defaultDominantBaseline
      }, tickLabelStyle)
    },
    className: classes.tickLabel,
    ownerState: {}
  });
  const axisLabelProps = useSlotProps_default({
    elementType: Label,
    externalSlotProps: slotProps == null ? void 0 : slotProps.axisLabel,
    additionalProps: {
      style: _extends({}, theme.typography.body1, {
        lineHeight: 1,
        fontSize: 14,
        angle: positionSign * 90,
        textAnchor: "middle",
        dominantBaseline: "text-before-edge"
      }, labelStyle)
    },
    ownerState: {}
  });
  const lineSlotProps = useSlotProps_default({
    elementType: Line,
    externalSlotProps: slotProps == null ? void 0 : slotProps.axisLine,
    additionalProps: {
      strokeLinecap: "square"
    },
    ownerState: {}
  });
  const domain = yScale.domain();
  const ordinalAxis = isBandScale(yScale);
  if (ordinalAxis && domain.length === 0 || !ordinalAxis && domain.some(isInfinity) || position === "none") {
    return null;
  }
  const labelRefPoint = {
    x: positionSign * axisWidth,
    y: top + height / 2
  };
  const tickLabelsMaxWidth = Math.max(0, axisWidth - (label ? getStringSize(label, axisLabelProps.style).height + AXIS_LABEL_TICK_LABEL_GAP2 : 0) - tickSize - TICK_LABEL_GAP2);
  const tickLabels = isHydrated ? shortenLabels2(yTicks, drawingArea, tickLabelsMaxWidth, isRtl, axisTickLabelProps.style) : new Map(Array.from(yTicks).map((item) => [item, item.formattedValue]));
  return (0, import_jsx_runtime15.jsxs)(YAxisRoot, {
    transform: `translate(${position === "right" ? left + width + offset : left - offset}, 0)`,
    className: classes.root,
    sx,
    children: [!disableLine && (0, import_jsx_runtime15.jsx)(Line, _extends({
      y1: top,
      y2: top + height,
      className: classes.line
    }, lineSlotProps)), yTicks.map((item, index) => {
      const {
        offset: tickOffset,
        labelOffset,
        value
      } = item;
      const xTickLabel = positionSign * (tickSize + TICK_LABEL_GAP2);
      const yTickLabel = labelOffset;
      const skipLabel = typeof tickLabelInterval === "function" && !(tickLabelInterval == null ? void 0 : tickLabelInterval(value, index));
      const showLabel = instance.isYInside(tickOffset);
      const tickLabel = tickLabels.get(item);
      if (!showLabel) {
        return null;
      }
      return (0, import_jsx_runtime15.jsxs)("g", {
        transform: `translate(0, ${tickOffset})`,
        className: classes.tickContainer,
        children: [!disableTicks && (0, import_jsx_runtime15.jsx)(Tick, _extends({
          x2: positionSign * tickSize,
          className: classes.tick
        }, slotProps == null ? void 0 : slotProps.axisTick)), tickLabel !== void 0 && !skipLabel && (0, import_jsx_runtime15.jsx)(TickLabel, _extends({
          x: xTickLabel,
          y: yTickLabel,
          text: tickLabel
        }, axisTickLabelProps))]
      }, index);
    }), label && isHydrated && (0, import_jsx_runtime15.jsx)("g", {
      className: classes.label,
      children: (0, import_jsx_runtime15.jsx)(Label, _extends({}, labelRefPoint, axisLabelProps, {
        text: label
      }))
    })]
  });
}
true ? ChartsYAxis.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "pnpm proptypes"  |
  // ----------------------------------------------------------------------
  axis: import_prop_types13.default.oneOf(["y"]),
  /**
   * The id of the axis to render.
   * If undefined, it will be the first defined axis.
   */
  axisId: import_prop_types13.default.oneOfType([import_prop_types13.default.number, import_prop_types13.default.string]),
  /**
   * Override or extend the styles applied to the component.
   */
  classes: import_prop_types13.default.object,
  /**
   * If true, the axis line is disabled.
   * @default false
   */
  disableLine: import_prop_types13.default.bool,
  /**
   * If true, the ticks are disabled.
   * @default false
   */
  disableTicks: import_prop_types13.default.bool,
  /**
   * The fill color of the axis text.
   * @default 'currentColor'
   */
  fill: import_prop_types13.default.string,
  /**
   * The label of the axis.
   */
  label: import_prop_types13.default.string,
  /**
   * The style applied to the axis label.
   */
  labelStyle: import_prop_types13.default.object,
  /**
   * The props used for each component slot.
   * @default {}
   */
  slotProps: import_prop_types13.default.object,
  /**
   * Overridable component slots.
   * @default {}
   */
  slots: import_prop_types13.default.object,
  /**
   * The stroke color of the axis line.
   * @default 'currentColor'
   */
  stroke: import_prop_types13.default.string,
  sx: import_prop_types13.default.oneOfType([import_prop_types13.default.arrayOf(import_prop_types13.default.oneOfType([import_prop_types13.default.func, import_prop_types13.default.object, import_prop_types13.default.bool])), import_prop_types13.default.func, import_prop_types13.default.object]),
  /**
   * Defines which ticks are displayed.
   * Its value can be:
   * - 'auto' In such case the ticks are computed based on axis scale and other parameters.
   * - a filtering function of the form `(value, index) => boolean` which is available only if the axis has "point" scale.
   * - an array containing the values where ticks should be displayed.
   * @see See {@link https://mui.com/x/react-charts/axis/#fixed-tick-positions}
   * @default 'auto'
   */
  tickInterval: import_prop_types13.default.oneOfType([import_prop_types13.default.oneOf(["auto"]), import_prop_types13.default.array, import_prop_types13.default.func]),
  /**
   * Defines which ticks get its label displayed. Its value can be:
   * - 'auto' In such case, labels are displayed if they do not overlap with the previous one.
   * - a filtering function of the form (value, index) => boolean. Warning: the index is tick index, not data ones.
   * @default 'auto'
   */
  tickLabelInterval: import_prop_types13.default.oneOfType([import_prop_types13.default.oneOf(["auto"]), import_prop_types13.default.func]),
  /**
   * The placement of ticks label. Can be the middle of the band, or the tick position.
   * Only used if scale is 'band'.
   * @default 'middle'
   */
  tickLabelPlacement: import_prop_types13.default.oneOf(["middle", "tick"]),
  /**
   * The style applied to ticks text.
   */
  tickLabelStyle: import_prop_types13.default.object,
  /**
   * Maximal step between two ticks.
   * When using time data, the value is assumed to be in ms.
   * Not supported by categorical axis (band, points).
   */
  tickMaxStep: import_prop_types13.default.number,
  /**
   * Minimal step between two ticks.
   * When using time data, the value is assumed to be in ms.
   * Not supported by categorical axis (band, points).
   */
  tickMinStep: import_prop_types13.default.number,
  /**
   * The number of ticks. This number is not guaranteed.
   * Not supported by categorical axis (band, points).
   */
  tickNumber: import_prop_types13.default.number,
  /**
   * The placement of ticks in regard to the band interval.
   * Only used if scale is 'band'.
   * @default 'extremities'
   */
  tickPlacement: import_prop_types13.default.oneOf(["end", "extremities", "middle", "start"]),
  /**
   * The size of the ticks.
   * @default 6
   */
  tickSize: import_prop_types13.default.number
} : void 0;

// node_modules/@mui/x-charts/esm/ChartsAxis/ChartsAxis.js
var import_jsx_runtime16 = __toESM(require_jsx_runtime(), 1);
function ChartsAxis(props) {
  const {
    slots,
    slotProps
  } = props;
  const {
    xAxisIds,
    xAxis
  } = useXAxes();
  const {
    yAxisIds,
    yAxis
  } = useYAxes();
  return (0, import_jsx_runtime16.jsxs)(React34.Fragment, {
    children: [xAxisIds.map((axisId) => {
      if (!xAxis[axisId].position || xAxis[axisId].position === "none") {
        return null;
      }
      return (0, import_jsx_runtime16.jsx)(ChartsXAxis, {
        slots,
        slotProps,
        axisId
      }, axisId);
    }), yAxisIds.map((axisId) => {
      if (!yAxis[axisId].position || yAxis[axisId].position === "none") {
        return null;
      }
      return (0, import_jsx_runtime16.jsx)(ChartsYAxis, {
        slots,
        slotProps,
        axisId
      }, axisId);
    })]
  });
}
true ? ChartsAxis.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "pnpm proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * The props used for each component slot.
   * @default {}
   */
  slotProps: import_prop_types14.default.object,
  /**
   * Overridable component slots.
   * @default {}
   */
  slots: import_prop_types14.default.object
} : void 0;

// node_modules/@mui/x-charts/esm/ChartsTooltip/ChartsTooltip.js
var React42 = __toESM(require_react(), 1);
var import_prop_types19 = __toESM(require_prop_types(), 1);

// node_modules/@mui/x-charts/esm/ChartsTooltip/ChartsItemTooltipContent.js
var React37 = __toESM(require_react(), 1);
var import_prop_types16 = __toESM(require_prop_types(), 1);

// node_modules/@mui/x-charts/esm/ChartsTooltip/chartsTooltipClasses.js
function getChartsTooltipUtilityClass(slot) {
  return generateUtilityClass("MuiChartsTooltip", slot);
}
var chartsTooltipClasses = generateUtilityClasses("MuiChartsTooltip", ["root", "paper", "table", "row", "cell", "mark", "markContainer", "labelCell", "valueCell", "axisValueCell"]);
var useUtilityClasses6 = (classes) => {
  const slots = {
    root: ["root"],
    paper: ["paper"],
    table: ["table"],
    row: ["row"],
    cell: ["cell"],
    mark: ["mark"],
    markContainer: ["markContainer"],
    labelCell: ["labelCell"],
    valueCell: ["valueCell"],
    axisValueCell: ["axisValueCell"]
  };
  return composeClasses(slots, getChartsTooltipUtilityClass, classes);
};

// node_modules/@mui/x-charts/esm/ChartsTooltip/useItemTooltip.js
function useInternalItemTooltip() {
  var _a, _b, _c;
  const store = useStore();
  const identifier = useSelector(store, selectorChartsInteractionItem);
  const seriesConfig5 = useSelector(store, selectorChartSeriesConfig);
  const series = useSeries();
  const {
    xAxis,
    xAxisIds
  } = useXAxes();
  const {
    yAxis,
    yAxisIds
  } = useYAxes();
  const {
    zAxis,
    zAxisIds
  } = useZAxes();
  const {
    rotationAxis,
    rotationAxisIds
  } = useRotationAxes();
  const {
    radiusAxis,
    radiusAxisIds
  } = useRadiusAxes();
  const xAxisId = series.xAxisId ?? xAxisIds[0];
  const yAxisId = series.yAxisId ?? yAxisIds[0];
  const zAxisId = series.zAxisId ?? zAxisIds[0];
  const rotationAxisId = series.rotationAxisId ?? rotationAxisIds[0];
  const radiusAxisId = series.radiusAxisId ?? radiusAxisIds[0];
  if (!identifier) {
    return null;
  }
  const itemSeries = (_a = series[identifier.type]) == null ? void 0 : _a.series[identifier.seriesId];
  if (!itemSeries) {
    return null;
  }
  const getColor5 = ((_c = (_b = seriesConfig5[itemSeries.type]).colorProcessor) == null ? void 0 : _c.call(_b, itemSeries, xAxisId && xAxis[xAxisId], yAxisId && yAxis[yAxisId], zAxisId && zAxis[zAxisId])) ?? (() => "");
  const axesConfig = {};
  if (xAxisId !== void 0) {
    axesConfig.x = xAxis[xAxisId];
  }
  if (yAxisId !== void 0) {
    axesConfig.y = yAxis[yAxisId];
  }
  if (rotationAxisId !== void 0) {
    axesConfig.rotation = rotationAxis[rotationAxisId];
  }
  if (radiusAxisId !== void 0) {
    axesConfig.radius = radiusAxis[radiusAxisId];
  }
  return seriesConfig5[itemSeries.type].tooltipGetter({
    series: itemSeries,
    axesConfig,
    getColor: getColor5,
    identifier
  });
}

// node_modules/@mui/x-charts/esm/ChartsTooltip/ChartsTooltipTable.js
var ChartsTooltipPaper = styled_default("div", {
  name: "MuiChartsTooltip",
  slot: "Container",
  overridesResolver: (props, styles) => styles.paper
  // FIXME: Inconsistent naming with slot
})(({
  theme
}) => {
  var _a;
  return {
    backgroundColor: (theme.vars || theme).palette.background.paper,
    color: (theme.vars || theme).palette.text.primary,
    borderRadius: (_a = (theme.vars || theme).shape) == null ? void 0 : _a.borderRadius,
    border: `solid ${(theme.vars || theme).palette.divider} 1px`
  };
});
var ChartsTooltipTable = styled_default("table", {
  name: "MuiChartsTooltip",
  slot: "Table"
})(({
  theme
}) => ({
  borderSpacing: 0,
  [`& .${chartsTooltipClasses.markContainer}`]: {
    display: "inline-block",
    width: `calc(20px + ${theme.spacing(1.5)})`,
    verticalAlign: "middle"
  },
  "& caption": {
    borderBottom: `solid ${(theme.vars || theme).palette.divider} 1px`,
    padding: theme.spacing(0.5, 1.5),
    textAlign: "start",
    whiteSpace: "nowrap",
    "& span": {
      marginRight: theme.spacing(1.5)
    }
  }
}));
var ChartsTooltipRow = styled_default("tr", {
  name: "MuiChartsTooltip",
  slot: "Row"
})(({
  theme
}) => ({
  "tr:first-of-type& td": {
    paddingTop: theme.spacing(0.5)
  },
  "tr:last-of-type& td": {
    paddingBottom: theme.spacing(0.5)
  }
}));
var ChartsTooltipCell = styled_default(Typography_default, {
  name: "MuiChartsTooltip",
  slot: "Cell"
})(({
  theme
}) => ({
  verticalAlign: "middle",
  color: (theme.vars || theme).palette.text.secondary,
  textAlign: "start",
  [`&.${chartsTooltipClasses.cell}`]: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1)
  },
  [`&.${chartsTooltipClasses.labelCell}`]: {
    fontWeight: theme.typography.fontWeightRegular
  },
  [`&.${chartsTooltipClasses.valueCell}, &.${chartsTooltipClasses.axisValueCell}`]: {
    color: (theme.vars || theme).palette.text.primary,
    fontWeight: theme.typography.fontWeightMedium
  },
  [`&.${chartsTooltipClasses.valueCell}`]: {
    paddingLeft: theme.spacing(1.5),
    paddingRight: theme.spacing(1.5)
  },
  "td:first-of-type&, th:first-of-type&": {
    paddingLeft: theme.spacing(1.5)
  },
  "td:last-of-type&, th:last-of-type&": {
    paddingRight: theme.spacing(1.5)
  }
}));

// node_modules/@mui/x-charts/esm/ChartsLabel/ChartsLabelMark.js
var React36 = __toESM(require_react(), 1);
var import_prop_types15 = __toESM(require_prop_types(), 1);

// node_modules/@mui/x-charts/esm/ChartsLabel/labelMarkClasses.js
function getLabelMarkUtilityClass(slot) {
  return generateUtilityClass("MuiChartsLabelMark", slot);
}
var labelMarkClasses = generateUtilityClasses("MuiChartsLabelMark", ["root", "line", "square", "circle", "mask", "fill"]);
var useUtilityClasses7 = (props) => {
  const {
    type
  } = props;
  const slots = {
    root: typeof type === "function" ? ["root"] : ["root", type],
    mask: ["mask"],
    fill: ["fill"]
  };
  return composeClasses(slots, getLabelMarkUtilityClass, props.classes);
};

// node_modules/@mui/x-charts/esm/internals/consumeThemeProps.js
var React35 = __toESM(require_react(), 1);
var import_jsx_runtime17 = __toESM(require_jsx_runtime(), 1);
var consumeThemeProps = (name, options, InComponent) => React35.forwardRef(function ConsumeThemeInternal(props, ref) {
  var _a;
  const themedProps = useThemeProps({
    props,
    // eslint-disable-next-line material-ui/mui-name-matches-component-name
    name
  });
  const defaultProps3 = typeof options.defaultProps === "function" ? options.defaultProps(themedProps) : options.defaultProps ?? {};
  const outProps = resolveProps(defaultProps3, themedProps);
  const theme = useTheme();
  const classes = (_a = options.classesResolver) == null ? void 0 : _a.call(options, outProps, theme);
  const OutComponent = React35.forwardRef(InComponent);
  if (true) OutComponent.displayName = "OutComponent";
  if (true) {
    OutComponent.displayName = `consumeThemeProps(${name})`;
  }
  return (0, import_jsx_runtime17.jsx)(OutComponent, _extends({}, outProps, {
    classes,
    ref
  }));
});
if (true) consumeThemeProps.displayName = "consumeThemeProps";

// node_modules/@mui/x-charts/esm/ChartsLabel/ChartsLabelMark.js
var import_jsx_runtime18 = __toESM(require_jsx_runtime(), 1);
var _excluded15 = ["type", "color", "className", "classes"];
var Root = styled_default("div", {
  name: "MuiChartsLabelMark",
  slot: "Root"
})(() => {
  return {
    display: "flex",
    width: 14,
    height: 14,
    [`&.${labelMarkClasses.line}`]: {
      width: 16,
      height: "unset",
      alignItems: "center",
      [`.${labelMarkClasses.mask}`]: {
        height: 4,
        width: "100%",
        borderRadius: 1,
        overflow: "hidden"
      }
    },
    [`&.${labelMarkClasses.square}`]: {
      height: 13,
      width: 13,
      borderRadius: 2,
      overflow: "hidden"
    },
    [`&.${labelMarkClasses.circle}`]: {
      height: 15,
      width: 15
    },
    svg: {
      display: "block"
    },
    [`& .${labelMarkClasses.mask} > *`]: {
      height: "100%",
      width: "100%"
    },
    [`& .${labelMarkClasses.mask}`]: {
      height: "100%",
      width: "100%"
    }
  };
});
var ChartsLabelMark = consumeThemeProps("MuiChartsLabelMark", {
  defaultProps: {
    type: "square"
  },
  classesResolver: useUtilityClasses7
}, function ChartsLabelMark2(props, ref) {
  const {
    type,
    color,
    className,
    classes
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded15);
  const Component = type;
  return (0, import_jsx_runtime18.jsx)(Root, _extends({
    className: clsx_default(classes == null ? void 0 : classes.root, className),
    ownerState: props,
    "aria-hidden": "true",
    ref
  }, other, {
    children: (0, import_jsx_runtime18.jsx)("div", {
      className: classes == null ? void 0 : classes.mask,
      children: typeof Component === "function" ? (0, import_jsx_runtime18.jsx)(Component, {
        className: classes == null ? void 0 : classes.fill,
        color
      }) : (0, import_jsx_runtime18.jsx)("svg", {
        viewBox: "0 0 24 24",
        preserveAspectRatio: type === "line" ? "none" : void 0,
        children: type === "circle" ? (0, import_jsx_runtime18.jsx)("circle", {
          className: classes == null ? void 0 : classes.fill,
          r: "12",
          cx: "12",
          cy: "12",
          fill: color
        }) : (0, import_jsx_runtime18.jsx)("rect", {
          className: classes == null ? void 0 : classes.fill,
          width: "24",
          height: "24",
          fill: color
        })
      })
    })
  }));
});
true ? ChartsLabelMark.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "pnpm proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * Override or extend the styles applied to the component.
   */
  classes: import_prop_types15.default.object,
  /**
   * The color of the mark.
   */
  color: import_prop_types15.default.string,
  /**
   * The type of the mark.
   * @default 'square'
   */
  type: import_prop_types15.default.oneOf(["circle", "line", "square"])
} : void 0;

// node_modules/@mui/x-charts/esm/ChartsTooltip/ChartsItemTooltipContent.js
var import_jsx_runtime19 = __toESM(require_jsx_runtime(), 1);
function ChartsItemTooltipContent(props) {
  const {
    classes: propClasses,
    sx
  } = props;
  const tooltipData = useInternalItemTooltip();
  const classes = useUtilityClasses6(propClasses);
  if (!tooltipData) {
    return null;
  }
  if ("values" in tooltipData) {
    const {
      label: seriesLabel,
      color: color2,
      markType: markType2
    } = tooltipData;
    return (0, import_jsx_runtime19.jsx)(ChartsTooltipPaper, {
      sx,
      className: classes.paper,
      children: (0, import_jsx_runtime19.jsxs)(ChartsTooltipTable, {
        className: classes.table,
        children: [(0, import_jsx_runtime19.jsxs)(Typography_default, {
          component: "caption",
          children: [(0, import_jsx_runtime19.jsx)("div", {
            className: classes.markContainer,
            children: (0, import_jsx_runtime19.jsx)(ChartsLabelMark, {
              type: markType2,
              color: color2,
              className: classes.mark
            })
          }), seriesLabel]
        }), (0, import_jsx_runtime19.jsx)("tbody", {
          children: tooltipData.values.map(({
            formattedValue: formattedValue2,
            label: label2
          }) => (0, import_jsx_runtime19.jsxs)(ChartsTooltipRow, {
            className: classes.row,
            children: [(0, import_jsx_runtime19.jsx)(ChartsTooltipCell, {
              className: clsx_default(classes.labelCell, classes.cell),
              component: "th",
              children: label2
            }), (0, import_jsx_runtime19.jsx)(ChartsTooltipCell, {
              className: clsx_default(classes.valueCell, classes.cell),
              component: "td",
              children: formattedValue2
            })]
          }, label2))
        })]
      })
    });
  }
  const {
    color,
    label,
    formattedValue,
    markType
  } = tooltipData;
  return (0, import_jsx_runtime19.jsx)(ChartsTooltipPaper, {
    sx,
    className: classes.paper,
    children: (0, import_jsx_runtime19.jsx)(ChartsTooltipTable, {
      className: classes.table,
      children: (0, import_jsx_runtime19.jsx)("tbody", {
        children: (0, import_jsx_runtime19.jsxs)(ChartsTooltipRow, {
          className: classes.row,
          children: [(0, import_jsx_runtime19.jsxs)(ChartsTooltipCell, {
            className: clsx_default(classes.labelCell, classes.cell),
            component: "th",
            children: [(0, import_jsx_runtime19.jsx)("div", {
              className: classes.markContainer,
              children: (0, import_jsx_runtime19.jsx)(ChartsLabelMark, {
                type: markType,
                color,
                className: classes.mark
              })
            }), label]
          }), (0, import_jsx_runtime19.jsx)(ChartsTooltipCell, {
            className: clsx_default(classes.valueCell, classes.cell),
            component: "td",
            children: formattedValue
          })]
        })
      })
    })
  });
}
true ? ChartsItemTooltipContent.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "pnpm proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * Override or extend the styles applied to the component.
   */
  classes: import_prop_types16.default.object,
  sx: import_prop_types16.default.oneOfType([import_prop_types16.default.arrayOf(import_prop_types16.default.oneOfType([import_prop_types16.default.func, import_prop_types16.default.object, import_prop_types16.default.bool])), import_prop_types16.default.func, import_prop_types16.default.object])
} : void 0;

// node_modules/@mui/x-charts/esm/ChartsTooltip/ChartsAxisTooltipContent.js
var React40 = __toESM(require_react(), 1);
var import_prop_types17 = __toESM(require_prop_types(), 1);

// node_modules/@mui/x-charts/esm/internals/plugins/corePlugins/useChartSeries/useColorProcessor.js
var React38 = __toESM(require_react(), 1);
function useColorProcessor(seriesType) {
  const store = useStore();
  const seriesConfig5 = useSelector(store, selectorChartSeriesConfig);
  const colorProcessors = React38.useMemo(() => {
    const rep = {};
    Object.keys(seriesConfig5).forEach((seriesT) => {
      rep[seriesT] = seriesConfig5[seriesT].colorProcessor;
    });
    return rep;
  }, [seriesConfig5]);
  if (!seriesType) {
    return colorProcessors;
  }
  return colorProcessors[seriesType];
}

// node_modules/@mui/x-charts/esm/ChartsTooltip/utils.js
var React39 = __toESM(require_react(), 1);
function usePointerType() {
  const svgRef = useSvgRef();
  const [pointerType, setPointerType] = React39.useState(null);
  React39.useEffect(() => {
    const element = svgRef.current;
    if (element === null) {
      return () => {
      };
    }
    const handleOut = (event) => {
      if (event.pointerType !== "mouse") {
        setPointerType(null);
      }
    };
    const handleEnter = (event) => {
      setPointerType({
        pointerType: event.pointerType
      });
    };
    element.addEventListener("pointerenter", handleEnter);
    element.addEventListener("pointerup", handleOut);
    return () => {
      element.removeEventListener("pointerenter", handleEnter);
      element.removeEventListener("pointerup", handleOut);
    };
  }, [svgRef]);
  return pointerType;
}
function utcFormatter(v2) {
  if (v2 instanceof Date) {
    return v2.toUTCString();
  }
  return v2.toLocaleString();
}
var mainPointerFineMediaQuery = "@media (pointer: fine)";
var useIsFineMainPointer = () => {
  return useMediaQuery_default(mainPointerFineMediaQuery, {
    defaultMatches: true
  });
};

// node_modules/@mui/x-charts/esm/internals/plugins/featurePlugins/useChartPolarAxis/getAxisIndex.js
function getAxisIndex2(axisConfig, pointerValue) {
  const {
    scale: scale2,
    data: axisData,
    reverse
  } = axisConfig;
  if (!isBandScale(scale2)) {
    throw new Error("MUI X Charts: getAxisValue is not implemented for polare continuous axes.");
  }
  if (!axisData) {
    return -1;
  }
  const angleGap = clampAngleRad(pointerValue - Math.min(...scale2.range()));
  const dataIndex = scale2.bandwidth() === 0 ? Math.floor((angleGap + scale2.step() / 2) / scale2.step()) % axisData.length : Math.floor(angleGap / scale2.step());
  if (dataIndex < 0 || dataIndex >= axisData.length) {
    return -1;
  }
  return reverse ? axisData.length - 1 - dataIndex : dataIndex;
}

// node_modules/@mui/x-charts/esm/internals/plugins/featurePlugins/useChartPolarAxis/useChartPolarInteraction.selectors.js
var optionalGetAxisId2 = (_, id) => id;
var optionalGetAxisIds = (_, ids) => ids;
function indexGetter2(value, axes, ids) {
  return Array.isArray(ids) ? ids.map((id) => getAxisIndex2(axes.axis[id], value)) : getAxisIndex2(axes.axis[ids], value);
}
var selectorChartsInteractionRotationAngle = createSelector([selectorChartsInteractionPointerX, selectorChartsInteractionPointerY, selectorChartPolarCenter], (x, y, center) => {
  if (x === null || y === null) {
    return null;
  }
  return generateSvg2rotation(center)(x, y);
});
var selectorChartsInteractionRotationAxisIndex = createSelector([selectorChartsInteractionRotationAngle, selectorChartRotationAxis, optionalGetAxisId2], (rotation, rotationAxis, id = rotationAxis.axisIds[0]) => rotation === null ? null : indexGetter2(rotation, rotationAxis, id));
var selectorChartsInteractionRotationAxisIndexes = createSelector([selectorChartsInteractionRotationAngle, selectorChartRotationAxis, optionalGetAxisIds], (rotation, rotationAxis, ids = rotationAxis.axisIds) => rotation === null ? null : indexGetter2(rotation, rotationAxis, ids));
var selectorChartsInteractionRotationAxisValue = createSelector([selectorChartRotationAxis, selectorChartsInteractionRotationAxisIndex, optionalGetAxisId2], (rotationAxis, rotationIndex, id = rotationAxis.axisIds[0]) => {
  var _a;
  if (rotationIndex === null || rotationIndex === -1 || rotationAxis.axisIds.length === 0) {
    return null;
  }
  const data = (_a = rotationAxis.axis[id]) == null ? void 0 : _a.data;
  if (!data) {
    return null;
  }
  return data[rotationIndex];
});
var selectorChartsInteractionRotationAxisValues = createSelector([selectorChartRotationAxis, selectorChartsInteractionRotationAxisIndexes, optionalGetAxisIds], (rotationAxis, rotationIndexes, ids = rotationAxis.axisIds) => {
  if (rotationIndexes === null) {
    return null;
  }
  return ids.map((id, axisIndex) => {
    var _a;
    const rotationIndex = rotationIndexes[axisIndex];
    if (rotationIndex === -1) {
      return null;
    }
    return (_a = rotationAxis.axis[id].data) == null ? void 0 : _a[rotationIndex];
  });
});
var selectorChartsInteractionTooltipRotationAxes = createSelector([selectorChartsInteractionRotationAxisIndexes, selectorChartRotationAxis], (indexes, axes) => {
  if (indexes === null) {
    return [];
  }
  return axes.axisIds.map((axisId, axisIndex) => ({
    axisId,
    dataIndex: indexes[axisIndex]
  })).filter(({
    axisId,
    dataIndex
  }) => axes.axis[axisId].triggerTooltip && dataIndex >= 0);
}, {
  memoizeOptions: {
    // Keep the same reference if array content is the same.
    // If possible, avoid this pattern by creating selectors that
    // uses string/number as arguments.
    resultEqualityCheck: isDeepEqual
  }
});
var selectorChartsInteractionTooltipRadiusAxes = createSelector([], () => {
  return [];
});
var selectorChartsInteractionPolarAxisTooltip = createSelector([selectorChartsInteractionTooltipRotationAxes], (rotationTooltip) => rotationTooltip.length > 0);

// node_modules/@mui/x-charts/esm/ChartsTooltip/useAxisTooltip.js
function defaultAxisTooltipConfig(axis, dataIndex, axisDirection) {
  var _a;
  const axisValue = ((_a = axis.data) == null ? void 0 : _a[dataIndex]) ?? null;
  const axisFormatter = axis.valueFormatter ?? ((v2) => axis.scaleType === "utc" ? utcFormatter(v2) : v2.toLocaleString());
  const axisFormattedValue = axisFormatter(axisValue, {
    location: "tooltip",
    scale: axis.scale
  });
  return {
    axisDirection,
    axisId: axis.id,
    mainAxis: axis,
    dataIndex,
    axisValue,
    axisFormattedValue,
    seriesItems: []
  };
}
function useAxisTooltip(params = {}) {
  const {
    multipleAxes,
    directions
  } = params;
  const defaultXAxis = useXAxis();
  const defaultYAxis = useYAxis();
  const defaultRotationAxis = useRotationAxis();
  const store = useStore();
  const tooltipXAxes = useSelector(store, selectorChartsInteractionTooltipXAxes);
  const tooltipYAxes = useSelector(store, selectorChartsInteractionTooltipYAxes);
  const tooltipRotationAxes = useSelector(store, selectorChartsInteractionTooltipRotationAxes);
  const series = useSeries();
  const {
    xAxis
  } = useXAxes();
  const {
    yAxis
  } = useYAxes();
  const {
    zAxis,
    zAxisIds
  } = useZAxes();
  const {
    rotationAxis
  } = useRotationAxes();
  const colorProcessors = useColorProcessor();
  if (tooltipXAxes.length === 0 && tooltipYAxes.length === 0 && tooltipRotationAxes.length === 0) {
    return null;
  }
  const tooltipAxes = [];
  if (directions === void 0 || directions.includes("x")) {
    tooltipXAxes.forEach(({
      axisId,
      dataIndex
    }) => {
      if (!multipleAxes && tooltipAxes.length > 1) {
        return;
      }
      tooltipAxes.push(defaultAxisTooltipConfig(xAxis[axisId], dataIndex, "x"));
    });
  }
  if (directions === void 0 || directions.includes("y")) {
    tooltipYAxes.forEach(({
      axisId,
      dataIndex
    }) => {
      if (!multipleAxes && tooltipAxes.length > 1) {
        return;
      }
      tooltipAxes.push(defaultAxisTooltipConfig(yAxis[axisId], dataIndex, "y"));
    });
  }
  if (directions === void 0 || directions.includes("rotation")) {
    tooltipRotationAxes.forEach(({
      axisId,
      dataIndex
    }) => {
      if (!multipleAxes && tooltipAxes.length > 1) {
        return;
      }
      tooltipAxes.push(defaultAxisTooltipConfig(rotationAxis[axisId], dataIndex, "rotation"));
    });
  }
  Object.keys(series).filter(isCartesianSeriesType).forEach((seriesType) => {
    const seriesOfType = series[seriesType];
    if (!seriesOfType) {
      return [];
    }
    return seriesOfType.seriesOrder.forEach((seriesId) => {
      var _a;
      const seriesToAdd = seriesOfType.series[seriesId];
      const providedXAxisId = seriesToAdd.xAxisId ?? defaultXAxis.id;
      const providedYAxisId = seriesToAdd.yAxisId ?? defaultYAxis.id;
      const tooltipItemIndex = tooltipAxes.findIndex(({
        axisDirection,
        axisId
      }) => axisDirection === "x" && axisId === providedXAxisId || axisDirection === "y" && axisId === providedYAxisId);
      if (tooltipItemIndex >= 0) {
        const zAxisId = "zAxisId" in seriesToAdd ? seriesToAdd.zAxisId : zAxisIds[0];
        const {
          dataIndex
        } = tooltipAxes[tooltipItemIndex];
        const color = ((_a = colorProcessors[seriesType]) == null ? void 0 : _a.call(colorProcessors, seriesToAdd, xAxis[providedXAxisId], yAxis[providedYAxisId], zAxisId ? zAxis[zAxisId] : void 0)(dataIndex)) ?? "";
        const value = seriesToAdd.data[dataIndex] ?? null;
        const formattedValue = seriesToAdd.valueFormatter(value, {
          dataIndex
        });
        const formattedLabel = getLabel(seriesToAdd.label, "tooltip") ?? null;
        tooltipAxes[tooltipItemIndex].seriesItems.push({
          seriesId,
          color,
          value,
          formattedValue,
          formattedLabel,
          markType: seriesToAdd.labelMarkType
        });
      }
    });
  });
  Object.keys(series).filter(isPolarSeriesType).forEach((seriesType) => {
    const seriesOfType = series[seriesType];
    if (!seriesOfType) {
      return [];
    }
    return seriesOfType.seriesOrder.forEach((seriesId) => {
      var _a;
      const seriesToAdd = seriesOfType.series[seriesId];
      const providedRotationAxisId = (
        // @ts-expect-error Should be fixed when we introduce a polar series with a rotationAxisId
        seriesToAdd.rotationAxisId ?? (defaultRotationAxis == null ? void 0 : defaultRotationAxis.id)
      );
      const tooltipItemIndex = tooltipAxes.findIndex(({
        axisDirection,
        axisId
      }) => axisDirection === "rotation" && axisId === providedRotationAxisId);
      if (tooltipItemIndex >= 0) {
        const {
          dataIndex
        } = tooltipAxes[tooltipItemIndex];
        const color = ((_a = colorProcessors[seriesType]) == null ? void 0 : _a.call(colorProcessors, seriesToAdd)(dataIndex)) ?? "";
        const value = seriesToAdd.data[dataIndex] ?? null;
        const formattedValue = seriesToAdd.valueFormatter(value, {
          dataIndex
        });
        const formattedLabel = getLabel(seriesToAdd.label, "tooltip") ?? null;
        tooltipAxes[tooltipItemIndex].seriesItems.push({
          seriesId,
          color,
          value,
          formattedValue,
          formattedLabel,
          markType: seriesToAdd.labelMarkType
        });
      }
    });
  });
  if (!multipleAxes) {
    return tooltipAxes.length === 0 ? tooltipAxes[0] : null;
  }
  return tooltipAxes;
}

// node_modules/@mui/x-charts/esm/ChartsTooltip/useAxesTooltip.js
function useAxesTooltip(params) {
  return useAxisTooltip(_extends({}, params, {
    multipleAxes: true
  }));
}

// node_modules/@mui/x-charts/esm/ChartsTooltip/ChartsAxisTooltipContent.js
var import_jsx_runtime20 = __toESM(require_jsx_runtime(), 1);
function ChartsAxisTooltipContent(props) {
  const classes = useUtilityClasses6(props.classes);
  const tooltipData = useAxesTooltip();
  if (tooltipData === null) {
    return null;
  }
  return (0, import_jsx_runtime20.jsx)(ChartsTooltipPaper, {
    sx: props.sx,
    className: classes.paper,
    children: tooltipData.map(({
      axisId,
      mainAxis,
      axisValue,
      axisFormattedValue,
      seriesItems
    }) => {
      return (0, import_jsx_runtime20.jsxs)(ChartsTooltipTable, {
        className: classes.table,
        children: [axisValue != null && !mainAxis.hideTooltip && (0, import_jsx_runtime20.jsx)(Typography_default, {
          component: "caption",
          children: axisFormattedValue
        }), (0, import_jsx_runtime20.jsx)("tbody", {
          children: seriesItems.map(({
            seriesId,
            color,
            formattedValue,
            formattedLabel,
            markType
          }) => {
            if (formattedValue == null) {
              return null;
            }
            return (0, import_jsx_runtime20.jsxs)(ChartsTooltipRow, {
              className: classes.row,
              children: [(0, import_jsx_runtime20.jsxs)(ChartsTooltipCell, {
                className: clsx_default(classes.labelCell, classes.cell),
                component: "th",
                children: [(0, import_jsx_runtime20.jsx)("div", {
                  className: classes.markContainer,
                  children: (0, import_jsx_runtime20.jsx)(ChartsLabelMark, {
                    type: markType,
                    color,
                    className: classes.mark
                  })
                }), formattedLabel || null]
              }), (0, import_jsx_runtime20.jsx)(ChartsTooltipCell, {
                className: clsx_default(classes.valueCell, classes.cell),
                component: "td",
                children: formattedValue
              })]
            }, seriesId);
          })
        })]
      }, axisId);
    })
  });
}
true ? ChartsAxisTooltipContent.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "pnpm proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * Override or extend the styles applied to the component.
   */
  classes: import_prop_types17.default.object,
  sx: import_prop_types17.default.oneOfType([import_prop_types17.default.arrayOf(import_prop_types17.default.oneOfType([import_prop_types17.default.func, import_prop_types17.default.object, import_prop_types17.default.bool])), import_prop_types17.default.func, import_prop_types17.default.object])
} : void 0;

// node_modules/@mui/x-charts/esm/ChartsTooltip/ChartsTooltipContainer.js
var React41 = __toESM(require_react(), 1);
var import_prop_types18 = __toESM(require_prop_types(), 1);

// node_modules/@mui/x-charts/esm/hooks/useAxisSystem.js
function useAxisSystem() {
  const store = useStore();
  const rawRotationAxis = useSelector(store, selectorChartRawRotationAxis);
  const rawXAxis = useSelector(store, selectorChartRawXAxis);
  if (rawRotationAxis !== void 0) {
    return "polar";
  }
  if (rawXAxis !== void 0) {
    return "cartesian";
  }
  return "none";
}

// node_modules/@mui/x-charts/esm/ChartsTooltip/ChartsTooltipContainer.js
var import_jsx_runtime21 = __toESM(require_jsx_runtime(), 1);
var _excluded16 = ["trigger", "classes", "children"];
var noAxis = () => false;
var ChartsTooltipRoot = styled_default(Popper_default, {
  name: "MuiChartsTooltip",
  slot: "Root"
})(({
  theme
}) => ({
  pointerEvents: "none",
  zIndex: theme.zIndex.modal
}));
function ChartsTooltipContainer(inProps) {
  const props = useThemeProps({
    props: inProps,
    name: "MuiChartsTooltipContainer"
  });
  const {
    trigger = "axis",
    classes: propClasses,
    children
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded16);
  const classes = useUtilityClasses6(propClasses);
  const svgRef = useSvgRef();
  const pointerType = usePointerType();
  const isFineMainPointer = useIsFineMainPointer();
  const popperRef = React41.useRef(null);
  const positionRef = useLazyRef(() => ({
    x: 0,
    y: 0
  }));
  const axisSystem = useAxisSystem();
  const store = useStore();
  const isOpen = useSelector(store, trigger === "axis" ? axisSystem === "polar" && selectorChartsInteractionPolarAxisTooltip || axisSystem === "cartesian" && selectorChartsInteractionAxisTooltip || noAxis : selectorChartsInteractionItemIsDefined);
  React41.useEffect(() => {
    const element = svgRef.current;
    if (element === null) {
      return () => {
      };
    }
    const handlePointerEvent = (event) => {
      var _a;
      positionRef.current = {
        x: event.clientX,
        y: event.clientY
      };
      (_a = popperRef.current) == null ? void 0 : _a.update();
    };
    element.addEventListener("pointerdown", handlePointerEvent);
    element.addEventListener("pointermove", handlePointerEvent);
    return () => {
      element.removeEventListener("pointerdown", handlePointerEvent);
      element.removeEventListener("pointermove", handlePointerEvent);
    };
  }, [svgRef, positionRef]);
  const anchorEl = React41.useMemo(() => ({
    getBoundingClientRect: () => ({
      x: positionRef.current.x,
      y: positionRef.current.y,
      top: positionRef.current.y,
      left: positionRef.current.x,
      right: positionRef.current.x,
      bottom: positionRef.current.y,
      width: 0,
      height: 0,
      toJSON: () => ""
    })
  }), [positionRef]);
  const isMouse = (pointerType == null ? void 0 : pointerType.pointerType) === "mouse" || isFineMainPointer;
  const isTouch = (pointerType == null ? void 0 : pointerType.pointerType) === "touch" || !isFineMainPointer;
  const modifiers = React41.useMemo(() => [
    {
      name: "offset",
      options: {
        offset: () => {
          if (isTouch) {
            return [0, 64];
          }
          return [0, 8];
        }
      }
    },
    ...!isMouse ? [{
      name: "flip",
      options: {
        fallbackPlacements: ["top-end", "top-start", "bottom-end", "bottom"]
      }
    }] : []
    // Keep default behavior
  ], [isMouse, isTouch]);
  if (trigger === "none") {
    return null;
  }
  return (0, import_jsx_runtime21.jsx)(NoSsr_default, {
    children: isOpen && (0, import_jsx_runtime21.jsx)(ChartsTooltipRoot, _extends({
      className: classes == null ? void 0 : classes.root,
      open: isOpen,
      placement: isMouse ? "right-start" : "top",
      popperRef,
      anchorEl,
      modifiers
    }, other, {
      children
    }))
  });
}
true ? ChartsTooltipContainer.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "pnpm proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * An HTML element, [virtualElement](https://popper.js.org/docs/v2/virtual-elements/),
   * or a function that returns either.
   * It's used to set the position of the popper.
   * The return value will passed as the reference object of the Popper instance.
   */
  anchorEl: import_prop_types18.default.oneOfType([HTMLElementType, import_prop_types18.default.object, import_prop_types18.default.func]),
  /**
   * Popper render function or node.
   */
  children: import_prop_types18.default.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: import_prop_types18.default.object,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: import_prop_types18.default.elementType,
  /**
   * The components used for each slot inside the Popper.
   * Either a string to use a HTML element or a component.
   *
   * @deprecated use the `slots` prop instead. This prop will be removed in a future major release. [How to migrate](/material-ui/migration/migrating-from-deprecated-apis/).
   * @default {}
   */
  components: import_prop_types18.default.shape({
    Root: import_prop_types18.default.elementType
  }),
  /**
   * The props used for each slot inside the Popper.
   *
   * @deprecated use the `slotProps` prop instead. This prop will be removed in a future major release. [How to migrate](/material-ui/migration/migrating-from-deprecated-apis/).
   * @default {}
   */
  componentsProps: import_prop_types18.default.shape({
    root: import_prop_types18.default.oneOfType([import_prop_types18.default.func, import_prop_types18.default.object])
  }),
  /**
   * An HTML element or function that returns one.
   * The `container` will have the portal children appended to it.
   *
   * You can also provide a callback, which is called in a React layout effect.
   * This lets you set the container from a ref, and also makes server-side rendering possible.
   *
   * By default, it uses the body of the top-level document object,
   * so it's simply `document.body` most of the time.
   */
  container: import_prop_types18.default.oneOfType([(props, propName) => {
    if (props[propName] == null) {
      return new Error(`Prop '${propName}' is required but wasn't specified`);
    }
    if (typeof props[propName] !== "object" || props[propName].nodeType !== 1) {
      return new Error(`Expected prop '${propName}' to be of type Element`);
    }
    return null;
  }, import_prop_types18.default.func]),
  /**
   * The `children` will be under the DOM hierarchy of the parent component.
   * @default false
   */
  disablePortal: import_prop_types18.default.bool,
  /**
   * Always keep the children in the DOM.
   * This prop can be useful in SEO situation or
   * when you want to maximize the responsiveness of the Popper.
   * @default false
   */
  keepMounted: import_prop_types18.default.bool,
  /**
   * Popper.js is based on a "plugin-like" architecture,
   * most of its features are fully encapsulated "modifiers".
   *
   * A modifier is a function that is called each time Popper.js needs to
   * compute the position of the popper.
   * For this reason, modifiers should be very performant to avoid bottlenecks.
   * To learn how to create a modifier, [read the modifiers documentation](https://popper.js.org/docs/v2/modifiers/).
   */
  modifiers: import_prop_types18.default.arrayOf(import_prop_types18.default.shape({
    data: import_prop_types18.default.object,
    effect: import_prop_types18.default.func,
    enabled: import_prop_types18.default.bool,
    fn: import_prop_types18.default.func,
    name: import_prop_types18.default.any,
    options: import_prop_types18.default.object,
    phase: import_prop_types18.default.oneOf(["afterMain", "afterRead", "afterWrite", "beforeMain", "beforeRead", "beforeWrite", "main", "read", "write"]),
    requires: import_prop_types18.default.arrayOf(import_prop_types18.default.string),
    requiresIfExists: import_prop_types18.default.arrayOf(import_prop_types18.default.string)
  })),
  /**
   * If `true`, the component is shown.
   */
  open: import_prop_types18.default.bool,
  /**
   * Popper placement.
   * @default 'bottom'
   */
  placement: import_prop_types18.default.oneOf(["auto-end", "auto-start", "auto", "bottom-end", "bottom-start", "bottom", "left-end", "left-start", "left", "right-end", "right-start", "right", "top-end", "top-start", "top"]),
  /**
   * Options provided to the [`Popper.js`](https://popper.js.org/docs/v2/constructors/#options) instance.
   * @default {}
   */
  popperOptions: import_prop_types18.default.shape({
    modifiers: import_prop_types18.default.array,
    onFirstUpdate: import_prop_types18.default.func,
    placement: import_prop_types18.default.oneOf(["auto-end", "auto-start", "auto", "bottom-end", "bottom-start", "bottom", "left-end", "left-start", "left", "right-end", "right-start", "right", "top-end", "top-start", "top"]),
    strategy: import_prop_types18.default.oneOf(["absolute", "fixed"])
  }),
  /**
   * A ref that points to the used popper instance.
   */
  popperRef: import_prop_types18.default.oneOfType([import_prop_types18.default.func, import_prop_types18.default.shape({
    current: import_prop_types18.default.shape({
      destroy: import_prop_types18.default.func.isRequired,
      forceUpdate: import_prop_types18.default.func.isRequired,
      setOptions: import_prop_types18.default.func.isRequired,
      state: import_prop_types18.default.shape({
        attributes: import_prop_types18.default.object.isRequired,
        elements: import_prop_types18.default.object.isRequired,
        modifiersData: import_prop_types18.default.object.isRequired,
        options: import_prop_types18.default.object.isRequired,
        orderedModifiers: import_prop_types18.default.arrayOf(import_prop_types18.default.object).isRequired,
        placement: import_prop_types18.default.oneOf(["auto-end", "auto-start", "auto", "bottom-end", "bottom-start", "bottom", "left-end", "left-start", "left", "right-end", "right-start", "right", "top-end", "top-start", "top"]).isRequired,
        rects: import_prop_types18.default.object.isRequired,
        reset: import_prop_types18.default.bool.isRequired,
        scrollParents: import_prop_types18.default.object.isRequired,
        strategy: import_prop_types18.default.oneOf(["absolute", "fixed"]).isRequired,
        styles: import_prop_types18.default.object.isRequired
      }).isRequired,
      update: import_prop_types18.default.func.isRequired
    })
  })]),
  /**
   * The props used for each slot inside the Popper.
   * @default {}
   */
  slotProps: import_prop_types18.default.object,
  /**
   * The components used for each slot inside the Popper.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots: import_prop_types18.default.object,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: import_prop_types18.default.oneOfType([import_prop_types18.default.arrayOf(import_prop_types18.default.oneOfType([import_prop_types18.default.func, import_prop_types18.default.object, import_prop_types18.default.bool])), import_prop_types18.default.func, import_prop_types18.default.object]),
  /**
   * Help supporting a react-transition-group/Transition component.
   * @default false
   */
  transition: import_prop_types18.default.bool,
  /**
   * Select the kind of tooltip to display
   * - 'item': Shows data about the item below the mouse.
   * - 'axis': Shows values associated with the hovered x value
   * - 'none': Does not display tooltip
   * @default 'axis'
   */
  trigger: import_prop_types18.default.oneOf(["axis", "item", "none"])
} : void 0;

// node_modules/@mui/x-charts/esm/ChartsTooltip/ChartsTooltip.js
var import_jsx_runtime22 = __toESM(require_jsx_runtime(), 1);
function ChartsTooltip(props) {
  const {
    classes: propClasses,
    trigger = "axis"
  } = props;
  const classes = useUtilityClasses6(propClasses);
  return (0, import_jsx_runtime22.jsx)(ChartsTooltipContainer, _extends({}, props, {
    classes: propClasses,
    children: trigger === "axis" ? (0, import_jsx_runtime22.jsx)(ChartsAxisTooltipContent, {
      classes
    }) : (0, import_jsx_runtime22.jsx)(ChartsItemTooltipContent, {
      classes
    })
  }));
}
true ? ChartsTooltip.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "pnpm proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * An HTML element, [virtualElement](https://popper.js.org/docs/v2/virtual-elements/),
   * or a function that returns either.
   * It's used to set the position of the popper.
   * The return value will passed as the reference object of the Popper instance.
   */
  anchorEl: import_prop_types19.default.oneOfType([HTMLElementType, import_prop_types19.default.object, import_prop_types19.default.func]),
  /**
   * Override or extend the styles applied to the component.
   */
  classes: import_prop_types19.default.object,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: import_prop_types19.default.elementType,
  /**
   * The components used for each slot inside the Popper.
   * Either a string to use a HTML element or a component.
   *
   * @deprecated use the `slots` prop instead. This prop will be removed in a future major release. [How to migrate](/material-ui/migration/migrating-from-deprecated-apis/).
   * @default {}
   */
  components: import_prop_types19.default.shape({
    Root: import_prop_types19.default.elementType
  }),
  /**
   * The props used for each slot inside the Popper.
   *
   * @deprecated use the `slotProps` prop instead. This prop will be removed in a future major release. [How to migrate](/material-ui/migration/migrating-from-deprecated-apis/).
   * @default {}
   */
  componentsProps: import_prop_types19.default.shape({
    root: import_prop_types19.default.oneOfType([import_prop_types19.default.func, import_prop_types19.default.object])
  }),
  /**
   * An HTML element or function that returns one.
   * The `container` will have the portal children appended to it.
   *
   * You can also provide a callback, which is called in a React layout effect.
   * This lets you set the container from a ref, and also makes server-side rendering possible.
   *
   * By default, it uses the body of the top-level document object,
   * so it's simply `document.body` most of the time.
   */
  container: import_prop_types19.default.oneOfType([(props, propName) => {
    if (props[propName] == null) {
      return new Error(`Prop '${propName}' is required but wasn't specified`);
    }
    if (typeof props[propName] !== "object" || props[propName].nodeType !== 1) {
      return new Error(`Expected prop '${propName}' to be of type Element`);
    }
    return null;
  }, import_prop_types19.default.func]),
  /**
   * The `children` will be under the DOM hierarchy of the parent component.
   * @default false
   */
  disablePortal: import_prop_types19.default.bool,
  /**
   * Always keep the children in the DOM.
   * This prop can be useful in SEO situation or
   * when you want to maximize the responsiveness of the Popper.
   * @default false
   */
  keepMounted: import_prop_types19.default.bool,
  /**
   * Popper.js is based on a "plugin-like" architecture,
   * most of its features are fully encapsulated "modifiers".
   *
   * A modifier is a function that is called each time Popper.js needs to
   * compute the position of the popper.
   * For this reason, modifiers should be very performant to avoid bottlenecks.
   * To learn how to create a modifier, [read the modifiers documentation](https://popper.js.org/docs/v2/modifiers/).
   */
  modifiers: import_prop_types19.default.arrayOf(import_prop_types19.default.shape({
    data: import_prop_types19.default.object,
    effect: import_prop_types19.default.func,
    enabled: import_prop_types19.default.bool,
    fn: import_prop_types19.default.func,
    name: import_prop_types19.default.any,
    options: import_prop_types19.default.object,
    phase: import_prop_types19.default.oneOf(["afterMain", "afterRead", "afterWrite", "beforeMain", "beforeRead", "beforeWrite", "main", "read", "write"]),
    requires: import_prop_types19.default.arrayOf(import_prop_types19.default.string),
    requiresIfExists: import_prop_types19.default.arrayOf(import_prop_types19.default.string)
  })),
  /**
   * If `true`, the component is shown.
   */
  open: import_prop_types19.default.bool,
  /**
   * Popper placement.
   * @default 'bottom'
   */
  placement: import_prop_types19.default.oneOf(["auto-end", "auto-start", "auto", "bottom-end", "bottom-start", "bottom", "left-end", "left-start", "left", "right-end", "right-start", "right", "top-end", "top-start", "top"]),
  /**
   * Options provided to the [`Popper.js`](https://popper.js.org/docs/v2/constructors/#options) instance.
   * @default {}
   */
  popperOptions: import_prop_types19.default.shape({
    modifiers: import_prop_types19.default.array,
    onFirstUpdate: import_prop_types19.default.func,
    placement: import_prop_types19.default.oneOf(["auto-end", "auto-start", "auto", "bottom-end", "bottom-start", "bottom", "left-end", "left-start", "left", "right-end", "right-start", "right", "top-end", "top-start", "top"]),
    strategy: import_prop_types19.default.oneOf(["absolute", "fixed"])
  }),
  /**
   * A ref that points to the used popper instance.
   */
  popperRef: import_prop_types19.default.oneOfType([import_prop_types19.default.func, import_prop_types19.default.shape({
    current: import_prop_types19.default.shape({
      destroy: import_prop_types19.default.func.isRequired,
      forceUpdate: import_prop_types19.default.func.isRequired,
      setOptions: import_prop_types19.default.func.isRequired,
      state: import_prop_types19.default.shape({
        attributes: import_prop_types19.default.object.isRequired,
        elements: import_prop_types19.default.object.isRequired,
        modifiersData: import_prop_types19.default.object.isRequired,
        options: import_prop_types19.default.object.isRequired,
        orderedModifiers: import_prop_types19.default.arrayOf(import_prop_types19.default.object).isRequired,
        placement: import_prop_types19.default.oneOf(["auto-end", "auto-start", "auto", "bottom-end", "bottom-start", "bottom", "left-end", "left-start", "left", "right-end", "right-start", "right", "top-end", "top-start", "top"]).isRequired,
        rects: import_prop_types19.default.object.isRequired,
        reset: import_prop_types19.default.bool.isRequired,
        scrollParents: import_prop_types19.default.object.isRequired,
        strategy: import_prop_types19.default.oneOf(["absolute", "fixed"]).isRequired,
        styles: import_prop_types19.default.object.isRequired
      }).isRequired,
      update: import_prop_types19.default.func.isRequired
    })
  })]),
  /**
   * The props used for each slot inside the Popper.
   * @default {}
   */
  slotProps: import_prop_types19.default.object,
  /**
   * The components used for each slot inside the Popper.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots: import_prop_types19.default.object,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: import_prop_types19.default.oneOfType([import_prop_types19.default.arrayOf(import_prop_types19.default.oneOfType([import_prop_types19.default.func, import_prop_types19.default.object, import_prop_types19.default.bool])), import_prop_types19.default.func, import_prop_types19.default.object]),
  /**
   * Help supporting a react-transition-group/Transition component.
   * @default false
   */
  transition: import_prop_types19.default.bool,
  /**
   * Select the kind of tooltip to display
   * - 'item': Shows data about the item below the mouse.
   * - 'axis': Shows values associated with the hovered x value
   * - 'none': Does not display tooltip
   * @default 'axis'
   */
  trigger: import_prop_types19.default.oneOf(["axis", "item", "none"])
} : void 0;

// node_modules/@mui/x-charts/esm/ChartsLegend/ChartsLegend.js
var React45 = __toESM(require_react(), 1);
var import_prop_types21 = __toESM(require_prop_types(), 1);

// node_modules/@mui/x-charts/esm/ChartsLegend/onClickContextBuilder.js
var seriesContextBuilder = (context) => ({
  type: "series",
  color: context.color,
  label: context.label,
  seriesId: context.seriesId,
  itemId: context.itemId
});

// node_modules/@mui/x-charts/esm/ChartsLegend/chartsLegendClasses.js
function getLegendUtilityClass(slot) {
  return generateUtilityClass("MuiChartsLegend", slot);
}
var useUtilityClasses8 = (props) => {
  const {
    classes,
    direction
  } = props;
  const slots = {
    root: ["root", direction],
    item: ["item"],
    mark: ["mark"],
    label: ["label"],
    series: ["series"]
  };
  return composeClasses(slots, getLegendUtilityClass, classes);
};
var legendClasses = generateUtilityClasses("MuiChartsLegend", ["root", "item", "series", "mark", "label", "vertical", "horizontal"]);

// node_modules/@mui/x-charts/esm/internals/consumeSlots.js
var React43 = __toESM(require_react(), 1);
var import_jsx_runtime23 = __toESM(require_jsx_runtime(), 1);
var _excluded17 = ["slots", "slotProps"];
var _excluded23 = ["ownerState"];
var consumeSlots = (name, slotPropName, options, InComponent) => {
  function ConsumeSlotsInternal(props, ref) {
    var _a;
    const themedProps = useThemeProps({
      props,
      // eslint-disable-next-line material-ui/mui-name-matches-component-name
      name
    });
    const defaultProps3 = typeof options.defaultProps === "function" ? options.defaultProps(themedProps) : options.defaultProps ?? {};
    const defaultizedProps = resolveProps(defaultProps3, themedProps);
    const _ref = defaultizedProps, {
      slots,
      slotProps
    } = _ref, other = _objectWithoutPropertiesLoose(_ref, _excluded17);
    const theme = useTheme();
    const classes = (_a = options.classesResolver) == null ? void 0 : _a.call(options, defaultizedProps, theme);
    const Component = (slots == null ? void 0 : slots[slotPropName]) ?? InComponent;
    const propagateSlots = options.propagateSlots && !(slots == null ? void 0 : slots[slotPropName]);
    const _useSlotProps = useSlotProps_default({
      elementType: Component,
      externalSlotProps: slotProps == null ? void 0 : slotProps[slotPropName],
      additionalProps: _extends({}, other, {
        classes
      }, propagateSlots && {
        slots,
        slotProps
      }),
      ownerState: {}
    }), originalOutProps = _objectWithoutPropertiesLoose(_useSlotProps, _excluded23);
    const outProps = _extends({}, originalOutProps);
    for (const prop of options.omitProps ?? []) {
      delete outProps[prop];
    }
    if (true) {
      Component.displayName = `${name}.slots.${slotPropName}`;
    }
    return (0, import_jsx_runtime23.jsx)(Component, _extends({}, outProps, {
      ref
    }));
  }
  return React43.forwardRef(ConsumeSlotsInternal);
};
if (true) consumeSlots.displayName = "consumeSlots";

// node_modules/@mui/x-charts/esm/ChartsLabel/ChartsLabel.js
var React44 = __toESM(require_react(), 1);
var import_prop_types20 = __toESM(require_prop_types(), 1);

// node_modules/@mui/x-charts/esm/ChartsLabel/labelClasses.js
function getLabelUtilityClass(slot) {
  return generateUtilityClass("MuiChartsLabel", slot);
}
var labelClasses = generateUtilityClasses("MuiChartsLabel", ["root"]);
var useUtilityClasses9 = (props) => {
  const slots = {
    root: ["root"]
  };
  return composeClasses(slots, getLabelUtilityClass, props.classes);
};

// node_modules/@mui/x-charts/esm/ChartsLabel/ChartsLabel.js
var import_jsx_runtime24 = __toESM(require_jsx_runtime(), 1);
var _excluded18 = ["children", "className", "classes"];
var ChartsLabel = consumeThemeProps("MuiChartsLabel", {
  classesResolver: useUtilityClasses9
}, function ChartsLabel2(props, ref) {
  const {
    children,
    className,
    classes
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded18);
  return (0, import_jsx_runtime24.jsx)("span", _extends({
    className: clsx_default(classes == null ? void 0 : classes.root, className),
    ref
  }, other, {
    children
  }));
});
true ? ChartsLabel.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "pnpm proptypes"  |
  // ----------------------------------------------------------------------
  children: import_prop_types20.default.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: import_prop_types20.default.object
} : void 0;

// node_modules/@mui/x-charts/esm/ChartsLegend/ChartsLegend.js
var import_jsx_runtime25 = __toESM(require_jsx_runtime(), 1);
var _excluded19 = ["direction", "onItemClick", "className", "classes"];
var RootElement = styled_default("ul", {
  name: "MuiChartsLegend",
  slot: "Root"
})(({
  ownerState,
  theme
}) => _extends({}, theme.typography.caption, {
  color: (theme.vars || theme).palette.text.primary,
  lineHeight: "100%",
  display: "flex",
  flexDirection: ownerState.direction === "vertical" ? "column" : "row",
  alignItems: ownerState.direction === "vertical" ? void 0 : "center",
  flexShrink: 0,
  gap: theme.spacing(2),
  listStyleType: "none",
  paddingInlineStart: 0,
  marginBlock: theme.spacing(1),
  marginInline: theme.spacing(1),
  flexWrap: "wrap",
  li: {
    display: ownerState.direction === "horizontal" ? "inline-flex" : void 0
  },
  [`button.${legendClasses.series}`]: {
    // Reset button styles
    background: "none",
    border: "none",
    padding: 0,
    fontFamily: "inherit",
    fontWeight: "inherit",
    fontSize: "inherit",
    letterSpacing: "inherit",
    color: "inherit"
  },
  [`& .${legendClasses.series}`]: {
    display: ownerState.direction === "vertical" ? "flex" : "inline-flex",
    alignItems: "center",
    gap: theme.spacing(1)
  }
}));
var ChartsLegend = consumeSlots("MuiChartsLegend", "legend", {
  defaultProps: {
    direction: "horizontal"
  },
  // @ts-expect-error position is used only in the slots, but it is passed to the SVG wrapper.
  // We omit it here to avoid passing to slots.
  omitProps: ["position"],
  classesResolver: useUtilityClasses8
}, React45.forwardRef(function ChartsLegend2(props, ref) {
  const data = useLegend();
  const {
    onItemClick,
    className,
    classes
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded19);
  if (data.items.length === 0) {
    return null;
  }
  const Element2 = onItemClick ? "button" : "div";
  return (0, import_jsx_runtime25.jsx)(RootElement, _extends({
    className: clsx_default(classes == null ? void 0 : classes.root, className),
    ref
  }, other, {
    ownerState: props,
    children: data.items.map((item, i) => {
      return (0, import_jsx_runtime25.jsx)("li", {
        className: classes == null ? void 0 : classes.item,
        "data-series": item.id,
        children: (0, import_jsx_runtime25.jsxs)(Element2, {
          className: classes == null ? void 0 : classes.series,
          role: onItemClick ? "button" : void 0,
          type: onItemClick ? "button" : void 0,
          onClick: onItemClick ? (
            // @ts-ignore onClick is only attached to a button
            (event) => onItemClick(event, seriesContextBuilder(item), i)
          ) : void 0,
          children: [(0, import_jsx_runtime25.jsx)(ChartsLabelMark, {
            className: classes == null ? void 0 : classes.mark,
            color: item.color,
            type: item.markType
          }), (0, import_jsx_runtime25.jsx)(ChartsLabel, {
            className: classes == null ? void 0 : classes.label,
            children: item.label
          })]
        })
      }, item.id);
    })
  }));
}));
if (true) ChartsLegend.displayName = "ChartsLegend";
true ? ChartsLegend.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "pnpm proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * Override or extend the styles applied to the component.
   */
  classes: import_prop_types21.default.object,
  className: import_prop_types21.default.string,
  /**
   * The direction of the legend layout.
   * The default depends on the chart.
   */
  direction: import_prop_types21.default.oneOf(["horizontal", "vertical"]),
  /**
   * Callback fired when a legend item is clicked.
   * @param {React.MouseEvent<HTMLButtonElement, MouseEvent>} event The click event.
   * @param {SeriesLegendItemContext} legendItem The legend item data.
   * @param {number} index The index of the clicked legend item.
   */
  onItemClick: import_prop_types21.default.func,
  /**
   * The props used for each component slot.
   * @default {}
   */
  slotProps: import_prop_types21.default.object,
  /**
   * Overridable component slots.
   * @default {}
   */
  slots: import_prop_types21.default.object,
  sx: import_prop_types21.default.oneOfType([import_prop_types21.default.arrayOf(import_prop_types21.default.oneOfType([import_prop_types21.default.func, import_prop_types21.default.object, import_prop_types21.default.bool])), import_prop_types21.default.func, import_prop_types21.default.object])
} : void 0;

// node_modules/@mui/x-charts/esm/ChartsLegend/ContinuousColorLegend.js
var React47 = __toESM(require_react(), 1);
var import_prop_types23 = __toESM(require_prop_types(), 1);

// node_modules/@mui/x-charts/esm/ChartsLegend/useAxis.js
function useAxis({
  axisDirection,
  axisId
}) {
  const {
    xAxis,
    xAxisIds
  } = useXAxes();
  const {
    yAxis,
    yAxisIds
  } = useYAxes();
  const {
    zAxis,
    zAxisIds
  } = useZAxes();
  switch (axisDirection) {
    case "x": {
      const id = typeof axisId === "string" ? axisId : xAxisIds[axisId ?? 0];
      return xAxis[id];
    }
    case "y": {
      const id = typeof axisId === "string" ? axisId : yAxisIds[axisId ?? 0];
      return yAxis[id];
    }
    case "z":
    default: {
      const id = typeof axisId === "string" ? axisId : zAxisIds[axisId ?? 0];
      return zAxis[id];
    }
  }
}

// node_modules/@mui/x-charts/esm/ChartsLabel/ChartsLabelGradient.js
var React46 = __toESM(require_react(), 1);
var import_prop_types22 = __toESM(require_prop_types(), 1);

// node_modules/@mui/x-charts/esm/ChartsLabel/labelGradientClasses.js
function getLabelGradientUtilityClass(slot) {
  return generateUtilityClass("MuiChartsLabelGradient", slot);
}
var labelGradientClasses = generateUtilityClasses("MuiChartsLabelGradient", ["root", "vertical", "horizontal", "mask", "fill"]);
var useUtilityClasses10 = (props) => {
  const {
    direction
  } = props;
  const slots = {
    root: ["root", direction],
    mask: ["mask"],
    fill: ["fill"]
  };
  return composeClasses(slots, getLabelGradientUtilityClass, props.classes);
};

// node_modules/@mui/x-charts/esm/ChartsLabel/ChartsLabelGradient.js
var import_jsx_runtime26 = __toESM(require_jsx_runtime(), 1);
var _excluded20 = ["gradientId", "direction", "classes", "className", "rotate", "reverse", "thickness"];
var getRotation = (direction, reverse, rotate, isRtl) => {
  const angle = (direction === "vertical" ? -90 : 0) + (rotate ? 90 : 0) + (reverse ? 180 : 0);
  if (isRtl && direction !== "vertical") {
    return angle + 180;
  }
  return angle;
};
var Root2 = styled_default("div", {
  name: "MuiChartsLabelGradient",
  slot: "Root"
})(({
  ownerState
}) => {
  const rotation = getRotation(ownerState.direction, ownerState.reverse, ownerState.rotate, ownerState.isRtl);
  return {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    [`.${labelGradientClasses.mask}`]: {
      borderRadius: 2,
      overflow: "hidden"
    },
    [`&.${labelGradientClasses.horizontal}`]: {
      width: "100%",
      [`.${labelGradientClasses.mask}`]: {
        height: ownerState.thickness,
        width: "100%"
      }
    },
    [`&.${labelGradientClasses.vertical}`]: {
      height: "100%",
      [`.${labelGradientClasses.mask}`]: {
        width: ownerState.thickness,
        height: "100%",
        "> svg": {
          height: "100%"
        }
      }
    },
    svg: {
      transform: `rotate(${rotation}deg)`,
      display: "block"
    }
  };
});
var ChartsLabelGradient = consumeThemeProps("MuiChartsLabelGradient", {
  defaultProps: {
    direction: "horizontal",
    thickness: 12
  },
  classesResolver: useUtilityClasses10
}, function ChartsLabelGradient2(props, ref) {
  const {
    gradientId,
    classes,
    className
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded20);
  const isRtl = useRtl();
  return (0, import_jsx_runtime26.jsx)(Root2, _extends({
    className: clsx_default(classes == null ? void 0 : classes.root, className),
    ownerState: _extends({}, props, {
      isRtl
    }),
    "aria-hidden": "true",
    ref
  }, other, {
    children: (0, import_jsx_runtime26.jsx)("div", {
      className: classes == null ? void 0 : classes.mask,
      children: (0, import_jsx_runtime26.jsx)("svg", {
        viewBox: "0 0 24 24",
        children: (0, import_jsx_runtime26.jsx)("rect", {
          className: classes == null ? void 0 : classes.fill,
          width: "24",
          height: "24",
          fill: `url(#${gradientId})`
        })
      })
    })
  }));
});
true ? ChartsLabelGradient.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "pnpm proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * Override or extend the styles applied to the component.
   */
  classes: import_prop_types22.default.object,
  /**
   * The direction of the gradient.
   * @default 'horizontal'
   */
  direction: import_prop_types22.default.oneOf(["vertical", "horizontal"]),
  /**
   * A unique identifier for the gradient.
   * The `gradientId` will be used as `fill="url(#gradientId)"`.
   */
  gradientId: import_prop_types22.default.string.isRequired,
  /**
   * If `true`, the gradient will be reversed.
   */
  reverse: import_prop_types22.default.bool,
  /**
   * If provided, the gradient will be rotated by 90deg.
   * Useful for linear gradients that are not in the correct orientation.
   */
  rotate: import_prop_types22.default.bool,
  /**
   * The thickness of the gradient
   * @default 12
   */
  thickness: import_prop_types22.default.number
} : void 0;

// node_modules/@mui/x-charts/esm/ChartsLegend/continuousColorLegendClasses.js
function getLegendUtilityClass2(slot) {
  return generateUtilityClass("MuiContinuousColorLegend", slot);
}
var useUtilityClasses11 = (props) => {
  const {
    classes,
    direction,
    labelPosition
  } = props;
  const slots = {
    root: ["root", direction, labelPosition],
    minLabel: ["minLabel"],
    maxLabel: ["maxLabel"],
    gradient: ["gradient"],
    mark: ["mark"],
    label: ["label"]
  };
  return composeClasses(slots, getLegendUtilityClass2, classes);
};
var continuousColorLegendClasses = generateUtilityClasses("MuiContinuousColorLegend", ["root", "minLabel", "maxLabel", "gradient", "vertical", "horizontal", "start", "end", "extremes", "label"]);

// node_modules/@mui/x-charts/esm/ChartsLegend/ContinuousColorLegend.js
var import_jsx_runtime27 = __toESM(require_jsx_runtime(), 1);
var _excluded21 = ["minLabel", "maxLabel", "direction", "axisDirection", "axisId", "rotateGradient", "reverse", "classes", "className", "gradientId", "labelPosition", "thickness"];
var templateAreas = (reverse) => {
  const startLabel = reverse ? "max-label" : "min-label";
  const endLabel = reverse ? "min-label" : "max-label";
  return {
    row: {
      start: `
    '${startLabel} . ${endLabel}'
    'gradient gradient gradient'
  `,
      end: `
      'gradient gradient gradient'
      '${startLabel} . ${endLabel}'
    `,
      extremes: `
      '${startLabel} gradient ${endLabel}'
    `
    },
    column: {
      start: `
      '${endLabel} gradient'
      '. gradient'
      '${startLabel} gradient'
    `,
      end: `
      'gradient ${endLabel}'
      'gradient .'
      'gradient ${startLabel}'
    `,
      extremes: `
      '${endLabel}'
      'gradient'
      '${startLabel}'
    `
    }
  };
};
var RootElement2 = styled_default("ul", {
  name: "MuiContinuousColorLegend",
  slot: "Root"
})(({
  theme,
  ownerState
}) => _extends({}, theme.typography.caption, {
  color: (theme.vars || theme).palette.text.primary,
  lineHeight: "100%",
  display: "grid",
  flexShrink: 0,
  gap: theme.spacing(0.5),
  listStyleType: "none",
  paddingInlineStart: 0,
  marginBlock: theme.spacing(1),
  marginInline: theme.spacing(1),
  [`&.${continuousColorLegendClasses.horizontal}`]: {
    gridTemplateRows: "min-content min-content",
    gridTemplateColumns: "min-content auto min-content",
    [`&.${continuousColorLegendClasses.start}`]: {
      gridTemplateAreas: templateAreas(ownerState.reverse).row.start
    },
    [`&.${continuousColorLegendClasses.end}`]: {
      gridTemplateAreas: templateAreas(ownerState.reverse).row.end
    },
    [`&.${continuousColorLegendClasses.extremes}`]: {
      gridTemplateAreas: templateAreas(ownerState.reverse).row.extremes,
      gridTemplateRows: "min-content",
      alignItems: "center"
    }
  },
  [`&.${continuousColorLegendClasses.vertical}`]: {
    gridTemplateRows: "min-content auto min-content",
    gridTemplateColumns: "min-content min-content",
    [`&.${continuousColorLegendClasses.start}`]: {
      gridTemplateAreas: templateAreas(ownerState.reverse).column.start,
      [`.${continuousColorLegendClasses.maxLabel}, .${continuousColorLegendClasses.minLabel}`]: {
        justifySelf: "end"
      }
    },
    [`&.${continuousColorLegendClasses.end}`]: {
      gridTemplateAreas: templateAreas(ownerState.reverse).column.end,
      [`.${continuousColorLegendClasses.maxLabel}, .${continuousColorLegendClasses.minLabel}`]: {
        justifySelf: "start"
      }
    },
    [`&.${continuousColorLegendClasses.extremes}`]: {
      gridTemplateAreas: templateAreas(ownerState.reverse).column.extremes,
      gridTemplateColumns: "min-content",
      [`.${continuousColorLegendClasses.maxLabel}, .${continuousColorLegendClasses.minLabel}`]: {
        justifySelf: "center"
      }
    }
  },
  [`.${continuousColorLegendClasses.gradient}`]: {
    gridArea: "gradient"
  },
  [`.${continuousColorLegendClasses.maxLabel}`]: {
    gridArea: "max-label"
  },
  [`.${continuousColorLegendClasses.minLabel}`]: {
    gridArea: "min-label"
  }
}));
var getText = (label, value, formattedValue) => {
  if (typeof label === "string") {
    return label;
  }
  return (label == null ? void 0 : label({
    value,
    formattedValue
  })) ?? formattedValue;
};
var isZAxis = (axis) => axis.scale === void 0;
var ContinuousColorLegend = consumeThemeProps("MuiContinuousColorLegend", {
  defaultProps: {
    direction: "horizontal",
    labelPosition: "end",
    axisDirection: "z"
  },
  classesResolver: useUtilityClasses11
}, function ContinuousColorLegend2(props, ref) {
  const {
    minLabel,
    maxLabel,
    direction,
    axisDirection,
    axisId,
    rotateGradient,
    reverse,
    classes,
    className,
    gradientId,
    thickness
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded21);
  const generateGradientId = useChartGradientIdObjectBoundBuilder();
  const axisItem = useAxis({
    axisDirection,
    axisId
  });
  const colorMap = axisItem == null ? void 0 : axisItem.colorMap;
  if (!colorMap || !colorMap.type || colorMap.type !== "continuous") {
    return null;
  }
  const minValue = colorMap.min ?? 0;
  const maxValue = colorMap.max ?? 100;
  const valueFormatter = isZAxis(axisItem) ? void 0 : axisItem.valueFormatter;
  const formattedMin = valueFormatter ? valueFormatter(minValue, {
    location: "legend"
  }) : minValue.toLocaleString();
  const formattedMax = valueFormatter ? valueFormatter(maxValue, {
    location: "legend"
  }) : maxValue.toLocaleString();
  const minText = getText(minLabel, minValue, formattedMin);
  const maxText = getText(maxLabel, maxValue, formattedMax);
  const minComponent = (0, import_jsx_runtime27.jsx)("li", {
    className: classes == null ? void 0 : classes.minLabel,
    children: (0, import_jsx_runtime27.jsx)(ChartsLabel, {
      className: classes == null ? void 0 : classes.label,
      children: minText
    })
  });
  const maxComponent = (0, import_jsx_runtime27.jsx)("li", {
    className: classes == null ? void 0 : classes.maxLabel,
    children: (0, import_jsx_runtime27.jsx)(ChartsLabel, {
      className: classes == null ? void 0 : classes.label,
      children: maxText
    })
  });
  return (0, import_jsx_runtime27.jsxs)(RootElement2, _extends({
    className: clsx_default(classes == null ? void 0 : classes.root, className),
    ref
  }, other, {
    ownerState: props,
    children: [reverse ? maxComponent : minComponent, (0, import_jsx_runtime27.jsx)("li", {
      className: classes == null ? void 0 : classes.gradient,
      children: (0, import_jsx_runtime27.jsx)(ChartsLabelGradient, {
        direction,
        rotate: rotateGradient,
        reverse,
        thickness,
        gradientId: gradientId ?? generateGradientId(axisItem.id)
      })
    }), reverse ? minComponent : maxComponent]
  }));
});
true ? ContinuousColorLegend.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "pnpm proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * The axis direction containing the color configuration to represent.
   * @default 'z'
   */
  axisDirection: import_prop_types23.default.oneOf(["x", "y", "z"]),
  /**
   * The id of the axis item with the color configuration to represent.
   * @default The first axis item.
   */
  axisId: import_prop_types23.default.oneOfType([import_prop_types23.default.number, import_prop_types23.default.string]),
  /**
   * Override or extend the styles applied to the component.
   */
  classes: import_prop_types23.default.object,
  className: import_prop_types23.default.string,
  /**
   * The direction of the legend layout.
   * @default 'horizontal'
   */
  direction: import_prop_types23.default.oneOf(["horizontal", "vertical"]),
  /**
   * The id for the gradient to use.
   * If not provided, it will use the generated gradient from the axis configuration.
   * The `gradientId` will be used as `fill="url(#gradientId)"`.
   * @default auto-generated id
   */
  gradientId: import_prop_types23.default.string,
  /**
   * Where to position the labels relative to the gradient.
   * @default 'end'
   */
  labelPosition: import_prop_types23.default.oneOf(["start", "end", "extremes"]),
  /**
   * The label to display at the maximum side of the gradient.
   * Can either be a string, or a function.
   * If not defined, the formatted maximal value is display.
   * @default formattedValue
   */
  maxLabel: import_prop_types23.default.oneOfType([import_prop_types23.default.func, import_prop_types23.default.string]),
  /**
   * The label to display at the minimum side of the gradient.
   * Can either be a string, or a function.
   * @default formattedValue
   */
  minLabel: import_prop_types23.default.oneOfType([import_prop_types23.default.func, import_prop_types23.default.string]),
  /**
   * If `true`, the gradient and labels will be reversed.
   * @default false
   */
  reverse: import_prop_types23.default.bool,
  /**
   * If provided, the gradient will be rotated by 90deg.
   * Useful for linear gradients that are not in the correct orientation.
   */
  rotateGradient: import_prop_types23.default.bool,
  /**
   * The thickness of the gradient
   * @default 12
   */
  thickness: import_prop_types23.default.number,
  sx: import_prop_types23.default.oneOfType([import_prop_types23.default.arrayOf(import_prop_types23.default.oneOfType([import_prop_types23.default.func, import_prop_types23.default.object, import_prop_types23.default.bool])), import_prop_types23.default.func, import_prop_types23.default.object])
} : void 0;

// node_modules/@mui/x-charts/esm/ChartsLegend/PiecewiseColorLegend.js
var React48 = __toESM(require_react(), 1);
var import_prop_types24 = __toESM(require_prop_types(), 1);

// node_modules/@mui/x-charts/esm/ChartsLegend/piecewiseColorLegendClasses.js
function getLegendUtilityClass3(slot) {
  return generateUtilityClass("MuiPiecewiseColorLegendClasses", slot);
}
var useUtilityClasses12 = (props) => {
  const {
    classes,
    direction,
    labelPosition
  } = props;
  const slots = {
    root: ["root", direction, labelPosition],
    minLabel: ["minLabel"],
    maxLabel: ["maxLabel"],
    item: ["item"],
    mark: ["mark"],
    label: ["label"]
  };
  return composeClasses(slots, getLegendUtilityClass3, classes);
};
var piecewiseColorLegendClasses = generateUtilityClasses("MuiPiecewiseColorLegendClasses", ["root", "minLabel", "maxLabel", "item", "vertical", "horizontal", "start", "end", "extremes", "mark", "label"]);

// node_modules/@mui/x-charts/esm/ChartsLegend/piecewiseColorDefaultLabelFormatter.js
function piecewiseColorDefaultLabelFormatter(params) {
  if (params.min === null) {
    return `<${params.formattedMax}`;
  }
  if (params.max === null) {
    return `>${params.formattedMin}`;
  }
  return `${params.formattedMin}-${params.formattedMax}`;
}

// node_modules/@mui/x-charts/esm/ChartsLegend/PiecewiseColorLegend.js
var import_jsx_runtime28 = __toESM(require_jsx_runtime(), 1);
var _excluded24 = ["direction", "classes", "className", "markType", "labelPosition", "axisDirection", "axisId", "labelFormatter", "onItemClick"];
var RootElement3 = styled_default("ul", {
  name: "MuiPiecewiseColorLegend",
  slot: "Root"
})(({
  theme,
  ownerState
}) => {
  var _a;
  return _extends({}, theme.typography.caption, {
    color: (theme.vars || theme).palette.text.primary,
    lineHeight: "100%",
    display: "flex",
    flexDirection: ownerState.direction === "vertical" ? "column" : "row",
    flexShrink: 0,
    gap: theme.spacing(0.5),
    listStyleType: "none",
    paddingInlineStart: 0,
    marginBlock: theme.spacing(1),
    marginInline: theme.spacing(1),
    width: "max-content",
    [`button.${piecewiseColorLegendClasses.item}`]: {
      // Reset button styles
      background: "none",
      border: "none",
      padding: 0,
      cursor: ownerState.onItemClick ? "pointer" : "unset",
      fontFamily: "inherit",
      fontWeight: "inherit",
      fontSize: "inherit",
      letterSpacing: "inherit",
      color: "inherit"
    },
    [`.${piecewiseColorLegendClasses.item}`]: {
      display: "flex",
      gap: theme.spacing(0.5)
    },
    [`li :not(.${piecewiseColorLegendClasses.minLabel}, .${piecewiseColorLegendClasses.maxLabel}) .${(_a = piecewiseColorLegendClasses) == null ? void 0 : _a.mark}`]: {
      alignSelf: "center"
    },
    [`&.${piecewiseColorLegendClasses.start}`]: {
      alignItems: "end"
    },
    [`&.${piecewiseColorLegendClasses.end}`]: {
      alignItems: "start"
    },
    [`&.${piecewiseColorLegendClasses.horizontal}`]: {
      alignItems: "center",
      [`.${piecewiseColorLegendClasses.item}`]: {
        flexDirection: "column"
      },
      [`&.${piecewiseColorLegendClasses.start}`]: {
        alignItems: "end"
      },
      [`&.${piecewiseColorLegendClasses.end}`]: {
        alignItems: "start"
      },
      [`.${piecewiseColorLegendClasses.minLabel}`]: {
        alignItems: "end"
      },
      [`&.${piecewiseColorLegendClasses.extremes}`]: {
        [`.${piecewiseColorLegendClasses.minLabel}, .${piecewiseColorLegendClasses.maxLabel}`]: {
          alignItems: "center",
          display: "flex",
          flexDirection: "row"
        }
      }
    },
    [`&.${piecewiseColorLegendClasses.vertical}`]: {
      [`.${piecewiseColorLegendClasses.item}`]: {
        flexDirection: "row",
        alignItems: "center"
      },
      [`&.${piecewiseColorLegendClasses.start}`]: {
        alignItems: "end"
      },
      [`&.${piecewiseColorLegendClasses.end}`]: {
        alignItems: "start"
      },
      [`&.${piecewiseColorLegendClasses.extremes}`]: {
        alignItems: "center",
        [`.${piecewiseColorLegendClasses.minLabel}, .${piecewiseColorLegendClasses.maxLabel}`]: {
          alignItems: "center",
          display: "flex",
          flexDirection: "column"
        }
      }
    }
  });
});
var PiecewiseColorLegend = consumeThemeProps("MuiPiecewiseColorLegend", {
  defaultProps: {
    direction: "horizontal",
    labelPosition: "extremes",
    labelFormatter: piecewiseColorDefaultLabelFormatter
  },
  classesResolver: useUtilityClasses12
}, function PiecewiseColorLegend2(props, ref) {
  const {
    direction,
    classes,
    className,
    markType,
    labelPosition,
    axisDirection,
    axisId,
    labelFormatter,
    onItemClick
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded24);
  const isVertical = direction === "vertical";
  const isReverse = isVertical;
  const axisItem = useAxis({
    axisDirection,
    axisId
  });
  const colorMap = axisItem == null ? void 0 : axisItem.colorMap;
  if (!colorMap || !colorMap.type || colorMap.type !== "piecewise") {
    return null;
  }
  const valueFormatter = (v2) => {
    var _a;
    return ((_a = axisItem.valueFormatter) == null ? void 0 : _a.call(axisItem, v2, {
      location: "legend"
    })) ?? v2.toLocaleString();
  };
  const formattedLabels = colorMap.thresholds.map(valueFormatter);
  const startClass = isReverse ? classes == null ? void 0 : classes.maxLabel : classes == null ? void 0 : classes.minLabel;
  const endClass = isReverse ? classes == null ? void 0 : classes.minLabel : classes == null ? void 0 : classes.maxLabel;
  const colors = colorMap.colors.map((color, colorIndex) => ({
    color,
    colorIndex
  }));
  const orderedColors = isReverse ? colors.reverse() : colors;
  const isStart = labelPosition === "start";
  const isEnd = labelPosition === "end";
  const isExtremes = labelPosition === "extremes";
  return (0, import_jsx_runtime28.jsx)(RootElement3, _extends({
    className: clsx_default(classes == null ? void 0 : classes.root, className),
    ref
  }, other, {
    ownerState: props,
    children: orderedColors.map(({
      color,
      colorIndex
    }, index) => {
      const isFirst = index === 0;
      const isLast = index === colorMap.colors.length - 1;
      const isFirstColor = colorIndex === 0;
      const isLastColor = colorIndex === colorMap.colors.length - 1;
      const data = _extends({
        index: colorIndex,
        length: formattedLabels.length
      }, isFirstColor ? {
        min: null,
        formattedMin: null
      } : {
        min: colorMap.thresholds[colorIndex - 1],
        formattedMin: formattedLabels[colorIndex - 1]
      }, isLastColor ? {
        max: null,
        formattedMax: null
      } : {
        max: colorMap.thresholds[colorIndex],
        formattedMax: formattedLabels[colorIndex]
      });
      const label = labelFormatter == null ? void 0 : labelFormatter(data);
      if (label === null || label === void 0) {
        return null;
      }
      const isTextBefore = isStart || isExtremes && isFirst;
      const isTextAfter = isEnd || isExtremes && isLast;
      const clickObject = {
        type: "piecewiseColor",
        color,
        label,
        minValue: data.min,
        maxValue: data.max
      };
      const Element2 = onItemClick ? "button" : "div";
      return (0, import_jsx_runtime28.jsx)("li", {
        children: (0, import_jsx_runtime28.jsxs)(Element2, {
          role: onItemClick ? "button" : void 0,
          type: onItemClick ? "button" : void 0,
          onClick: (
            // @ts-ignore onClick is only attached to a button
            onItemClick ? (event) => onItemClick(event, clickObject, index) : void 0
          ),
          className: clsx_default(classes == null ? void 0 : classes.item, index === 0 && `${startClass}`, index === orderedColors.length - 1 && `${endClass}`),
          children: [isTextBefore && (0, import_jsx_runtime28.jsx)(ChartsLabel, {
            className: classes == null ? void 0 : classes.label,
            children: label
          }), (0, import_jsx_runtime28.jsx)(ChartsLabelMark, {
            className: classes == null ? void 0 : classes.mark,
            type: markType,
            color
          }), isTextAfter && (0, import_jsx_runtime28.jsx)(ChartsLabel, {
            className: classes == null ? void 0 : classes.label,
            children: label
          })]
        })
      }, colorIndex);
    })
  }));
});
true ? PiecewiseColorLegend.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "pnpm proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * The axis direction containing the color configuration to represent.
   * @default 'z'
   */
  axisDirection: import_prop_types24.default.oneOf(["x", "y", "z"]),
  /**
   * The id of the axis item with the color configuration to represent.
   * @default The first axis item.
   */
  axisId: import_prop_types24.default.oneOfType([import_prop_types24.default.number, import_prop_types24.default.string]),
  /**
   * Override or extend the styles applied to the component.
   */
  classes: import_prop_types24.default.object,
  className: import_prop_types24.default.string,
  /**
   * The direction of the legend layout.
   * @default 'horizontal'
   */
  direction: import_prop_types24.default.oneOf(["horizontal", "vertical"]),
  /**
   * Format the legend labels.
   * @param {PiecewiseLabelFormatterParams} params The bound of the piece to format.
   * @returns {string|null} The displayed label, `''` to skip the label but show the color mark, or `null` to skip it entirely.
   */
  labelFormatter: import_prop_types24.default.func,
  /**
   * Where to position the labels relative to the gradient.
   * @default 'extremes'
   */
  labelPosition: import_prop_types24.default.oneOf(["start", "end", "extremes"]),
  /**
   * The type of the mark.
   * @default 'square'
   */
  markType: import_prop_types24.default.oneOf(["square", "circle", "line"]),
  /**
   * Callback fired when a legend item is clicked.
   * @param {React.MouseEvent<HTMLButtonElement, MouseEvent>} event The click event.
   * @param {PiecewiseColorLegendItemContext} legendItem The legend item data.
   * @param {number} index The index of the clicked legend item.
   */
  onItemClick: import_prop_types24.default.func,
  sx: import_prop_types24.default.oneOfType([import_prop_types24.default.arrayOf(import_prop_types24.default.oneOfType([import_prop_types24.default.func, import_prop_types24.default.object, import_prop_types24.default.bool])), import_prop_types24.default.func, import_prop_types24.default.object])
} : void 0;

// node_modules/@mui/x-charts/esm/ChartsAxisHighlight/ChartsAxisHighlight.js
var React51 = __toESM(require_react(), 1);
var import_prop_types25 = __toESM(require_prop_types(), 1);

// node_modules/@mui/x-charts/esm/ChartsAxisHighlight/chartsAxisHighlightClasses.js
function getAxisHighlightUtilityClass(slot) {
  return generateUtilityClass("MuiChartsAxisHighlight", slot);
}
var chartsAxisHighlightClasses = generateUtilityClasses("MuiChartsAxisHighlight", ["root"]);

// node_modules/@mui/x-charts/esm/ChartsAxisHighlight/ChartsYAxisHighlight.js
var React49 = __toESM(require_react(), 1);

// node_modules/@mui/x-charts/esm/ChartsAxisHighlight/ChartsAxisHighlightPath.js
var ChartsAxisHighlightPath = styled_default("path", {
  name: "MuiChartsAxisHighlight",
  slot: "Root"
})(({
  theme
}) => ({
  pointerEvents: "none",
  variants: [{
    props: {
      axisHighlight: "band"
    },
    style: _extends({
      fill: "white",
      fillOpacity: 0.1
    }, theme.applyStyles("light", {
      fill: "gray"
    }))
  }, {
    props: {
      axisHighlight: "line"
    },
    style: _extends({
      strokeDasharray: "5 2",
      stroke: "#ffffff"
    }, theme.applyStyles("light", {
      stroke: "#000000"
    }))
  }]
}));

// node_modules/@mui/x-charts/esm/ChartsAxisHighlight/ChartsYAxisHighlight.js
var import_jsx_runtime29 = __toESM(require_jsx_runtime(), 1);
function ChartsYHighlight(props) {
  const {
    type,
    classes
  } = props;
  const {
    left,
    width
  } = useDrawingArea();
  const yScale = useYScale();
  const store = useStore();
  const axisYValue = useSelector(store, selectorChartsInteractionYAxisValue);
  const getYPosition = getValueToPositionMapper(yScale);
  const isBandScaleY = type === "band" && axisYValue !== null && isBandScale(yScale);
  if (true) {
    const isError = isBandScaleY && yScale(axisYValue) === void 0;
    if (isError) {
      console.error([`MUI X Charts: The position value provided for the axis is not valid for the current scale.`, `This probably means something is wrong with the data passed to the chart.`, `The ChartsAxisHighlight component will not be displayed.`].join("\n"));
    }
  }
  return (0, import_jsx_runtime29.jsxs)(React49.Fragment, {
    children: [isBandScaleY && yScale(axisYValue) !== void 0 && (0, import_jsx_runtime29.jsx)(ChartsAxisHighlightPath, {
      d: `M ${left} ${// @ts-expect-error, yScale value is checked in the statement above
      yScale(axisYValue) - (yScale.step() - yScale.bandwidth()) / 2} l 0 ${yScale.step()} l ${width} 0 l 0 ${-yScale.step()} Z`,
      className: classes.root,
      ownerState: {
        axisHighlight: "band"
      }
    }), type === "line" && axisYValue !== null && (0, import_jsx_runtime29.jsx)(ChartsAxisHighlightPath, {
      d: `M ${left} ${getYPosition(axisYValue)} L ${left + width} ${getYPosition(axisYValue)}`,
      className: classes.root,
      ownerState: {
        axisHighlight: "line"
      }
    })]
  });
}

// node_modules/@mui/x-charts/esm/ChartsAxisHighlight/ChartsXAxisHighlight.js
var React50 = __toESM(require_react(), 1);
var import_jsx_runtime30 = __toESM(require_jsx_runtime(), 1);
function ChartsXHighlight(props) {
  const {
    type,
    classes
  } = props;
  const {
    top,
    height
  } = useDrawingArea();
  const xScale = useXScale();
  const store = useStore();
  const axisXValue = useSelector(store, selectorChartsInteractionXAxisValue);
  const getXPosition = getValueToPositionMapper(xScale);
  const isBandScaleX = type === "band" && axisXValue !== null && isBandScale(xScale);
  if (true) {
    const isError = isBandScaleX && xScale(axisXValue) === void 0;
    if (isError) {
      console.error([`MUI X Charts: The position value provided for the axis is not valid for the current scale.`, `This probably means something is wrong with the data passed to the chart.`, `The ChartsAxisHighlight component will not be displayed.`].join("\n"));
    }
  }
  return (0, import_jsx_runtime30.jsxs)(React50.Fragment, {
    children: [isBandScaleX && xScale(axisXValue) !== void 0 && (0, import_jsx_runtime30.jsx)(
      ChartsAxisHighlightPath,
      {
        d: `M ${xScale(axisXValue) - (xScale.step() - xScale.bandwidth()) / 2} ${top} l ${xScale.step()} 0 l 0 ${height} l ${-xScale.step()} 0 Z`,
        className: classes.root,
        ownerState: {
          axisHighlight: "band"
        }
      }
    ), type === "line" && axisXValue !== null && (0, import_jsx_runtime30.jsx)(ChartsAxisHighlightPath, {
      d: `M ${getXPosition(axisXValue)} ${top} L ${getXPosition(axisXValue)} ${top + height}`,
      className: classes.root,
      ownerState: {
        axisHighlight: "line"
      }
    })]
  });
}

// node_modules/@mui/x-charts/esm/ChartsAxisHighlight/ChartsAxisHighlight.js
var import_jsx_runtime31 = __toESM(require_jsx_runtime(), 1);
var useUtilityClasses13 = () => {
  const slots = {
    root: ["root"]
  };
  return composeClasses(slots, getAxisHighlightUtilityClass);
};
function ChartsAxisHighlight(props) {
  const {
    x: xAxisHighlight,
    y: yAxisHighlight
  } = props;
  const classes = useUtilityClasses13();
  return (0, import_jsx_runtime31.jsxs)(React51.Fragment, {
    children: [xAxisHighlight && (0, import_jsx_runtime31.jsx)(ChartsXHighlight, {
      type: xAxisHighlight,
      classes
    }), yAxisHighlight && (0, import_jsx_runtime31.jsx)(ChartsYHighlight, {
      type: yAxisHighlight,
      classes
    })]
  });
}
true ? ChartsAxisHighlight.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "pnpm proptypes"  |
  // ----------------------------------------------------------------------
  x: import_prop_types25.default.oneOf(["band", "line", "none"]),
  y: import_prop_types25.default.oneOf(["band", "line", "none"])
} : void 0;

// node_modules/@mui/x-charts/esm/ChartsClipPath/ChartsClipPath.js
var React52 = __toESM(require_react(), 1);
var import_prop_types26 = __toESM(require_prop_types(), 1);
var import_jsx_runtime32 = __toESM(require_jsx_runtime(), 1);
function ChartsClipPath(props) {
  const {
    id,
    offset: offsetProps
  } = props;
  const {
    left,
    top,
    width,
    height
  } = useDrawingArea();
  const offset = _extends({
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  }, offsetProps);
  return (0, import_jsx_runtime32.jsx)("clipPath", {
    id,
    children: (0, import_jsx_runtime32.jsx)("rect", {
      x: left - offset.left,
      y: top - offset.top,
      width: width + offset.left + offset.right,
      height: height + offset.top + offset.bottom
    })
  });
}
true ? ChartsClipPath.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "pnpm proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * The id of the clip path.
   */
  id: import_prop_types26.default.string.isRequired,
  /**
   * Offset, in pixels, of the clip path rectangle from the drawing area.
   *
   * A positive value will move the rectangle outside the drawing area.
   */
  offset: import_prop_types26.default.shape({
    bottom: import_prop_types26.default.number,
    left: import_prop_types26.default.number,
    right: import_prop_types26.default.number,
    top: import_prop_types26.default.number
  })
} : void 0;

// node_modules/@mui/x-charts/esm/LineChart/LineHighlightPlot.js
var React55 = __toESM(require_react(), 1);
var import_prop_types28 = __toESM(require_prop_types(), 1);

// node_modules/@mui/x-charts/esm/LineChart/LineHighlightElement.js
var React54 = __toESM(require_react(), 1);
var import_prop_types27 = __toESM(require_prop_types(), 1);

// node_modules/@mui/x-charts/node_modules/@mui/x-internals/esm/reactMajor/index.js
var React53 = __toESM(require_react());
var reactMajor_default = parseInt(React53.version, 10);

// node_modules/@mui/x-charts/esm/LineChart/LineHighlightElement.js
var import_jsx_runtime33 = __toESM(require_jsx_runtime(), 1);
var _excluded25 = ["x", "y", "id", "classes", "color", "shape"];
function getHighlightElementUtilityClass(slot) {
  return generateUtilityClass("MuiHighlightElement", slot);
}
var lineHighlightElementClasses = generateUtilityClasses("MuiHighlightElement", ["root"]);
var useUtilityClasses14 = (ownerState) => {
  const {
    classes,
    id
  } = ownerState;
  const slots = {
    root: ["root", `series-${id}`]
  };
  return composeClasses(slots, getHighlightElementUtilityClass, classes);
};
function LineHighlightElement(props) {
  const {
    x,
    y,
    color,
    shape
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded25);
  const classes = useUtilityClasses14(props);
  const Element2 = shape === "circle" ? "circle" : "path";
  const additionalProps = shape === "circle" ? {
    cx: 0,
    cy: 0,
    r: other.r === void 0 ? 5 : other.r
  } : {
    d: Symbol(symbolsFill[getSymbol(shape)])()
  };
  const transformOrigin = reactMajor_default > 18 ? {
    transformOrigin: `${x} ${y}`
  } : {
    "transform-origin": `${x} ${y}`
  };
  return (0, import_jsx_runtime33.jsx)(Element2, _extends({
    pointerEvents: "none",
    className: classes.root,
    transform: `translate(${x} ${y})`,
    fill: color
  }, transformOrigin, additionalProps, other));
}
true ? LineHighlightElement.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "pnpm proptypes"  |
  // ----------------------------------------------------------------------
  classes: import_prop_types27.default.object,
  id: import_prop_types27.default.oneOfType([import_prop_types27.default.number, import_prop_types27.default.string]).isRequired,
  shape: import_prop_types27.default.oneOf(["circle", "cross", "diamond", "square", "star", "triangle", "wye"]).isRequired
} : void 0;

// node_modules/@mui/x-charts/esm/LineChart/LineHighlightPlot.js
var import_jsx_runtime34 = __toESM(require_jsx_runtime(), 1);
var _excluded26 = ["slots", "slotProps"];
function LineHighlightPlot(props) {
  const {
    slots,
    slotProps
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded26);
  const seriesData = useLineSeriesContext();
  const {
    xAxis,
    xAxisIds
  } = useXAxes();
  const {
    yAxis,
    yAxisIds
  } = useYAxes();
  const {
    instance
  } = useChartContext();
  const store = useStore();
  const highlightedIndex = useSelector(store, selectorChartsInteractionXAxisIndex);
  if (highlightedIndex === null) {
    return null;
  }
  if (seriesData === void 0) {
    return null;
  }
  const {
    series,
    stackingGroups
  } = seriesData;
  const defaultXAxisId = xAxisIds[0];
  const defaultYAxisId = yAxisIds[0];
  const Element2 = (slots == null ? void 0 : slots.lineHighlight) ?? LineHighlightElement;
  return (0, import_jsx_runtime34.jsx)("g", _extends({}, other, {
    children: stackingGroups.flatMap(({
      ids: groupIds
    }) => {
      return groupIds.flatMap((seriesId) => {
        const {
          xAxisId = defaultXAxisId,
          yAxisId = defaultYAxisId,
          stackedData,
          data,
          disableHighlight,
          shape = "circle"
        } = series[seriesId];
        if (disableHighlight || data[highlightedIndex] == null) {
          return null;
        }
        const xScale = getValueToPositionMapper(xAxis[xAxisId].scale);
        const yScale = yAxis[yAxisId].scale;
        const xData = xAxis[xAxisId].data;
        if (xData === void 0) {
          throw new Error(`MUI X Charts: ${xAxisId === DEFAULT_X_AXIS_KEY ? "The first `xAxis`" : `The x-axis with id "${xAxisId}"`} should have data property to be able to display a line plot.`);
        }
        const x = xScale(xData[highlightedIndex]);
        const y = yScale(stackedData[highlightedIndex][1]);
        if (!instance.isPointInside(x, y)) {
          return null;
        }
        const colorGetter = getColor_default3(series[seriesId], xAxis[xAxisId], yAxis[yAxisId]);
        return (0, import_jsx_runtime34.jsx)(Element2, _extends({
          id: seriesId,
          color: colorGetter(highlightedIndex),
          x,
          y,
          shape
        }, slotProps == null ? void 0 : slotProps.lineHighlight), `${seriesId}`);
      });
    })
  }));
}
true ? LineHighlightPlot.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "pnpm proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * The props used for each component slot.
   * @default {}
   */
  slotProps: import_prop_types28.default.object,
  /**
   * Overridable component slots.
   * @default {}
   */
  slots: import_prop_types28.default.object
} : void 0;

// node_modules/@mui/x-charts/esm/ChartsGrid/ChartsGrid.js
var React58 = __toESM(require_react(), 1);
var import_prop_types29 = __toESM(require_prop_types(), 1);

// node_modules/@mui/x-charts/esm/ChartsGrid/chartsGridClasses.js
function getChartsGridUtilityClass(slot) {
  return generateUtilityClass("MuiChartsGrid", slot);
}
var chartsGridClasses = generateUtilityClasses("MuiChartsGrid", ["root", "line", "horizontalLine", "verticalLine"]);

// node_modules/@mui/x-charts/esm/ChartsGrid/styledComponents.js
var GridRoot = styled_default("g", {
  name: "MuiChartsGrid",
  slot: "Root",
  overridesResolver: (props, styles) => [{
    [`&.${chartsGridClasses.verticalLine}`]: styles.verticalLine
  }, {
    [`&.${chartsGridClasses.horizontalLine}`]: styles.horizontalLine
  }, styles.root]
})({});
var GridLine = styled_default("line", {
  name: "MuiChartsGrid",
  slot: "Line"
})(({
  theme
}) => ({
  stroke: (theme.vars || theme).palette.divider,
  shapeRendering: "crispEdges",
  strokeWidth: 1
}));

// node_modules/@mui/x-charts/esm/ChartsGrid/ChartsVerticalGrid.js
var React56 = __toESM(require_react(), 1);
var import_jsx_runtime35 = __toESM(require_jsx_runtime(), 1);
function ChartsGridVertical(props) {
  const {
    axis,
    start,
    end,
    classes
  } = props;
  const {
    scale: scale2,
    tickNumber,
    tickInterval
  } = axis;
  const xTicks = useTicks({
    scale: scale2,
    tickNumber,
    tickInterval,
    direction: "x"
  });
  return (0, import_jsx_runtime35.jsx)(React56.Fragment, {
    children: xTicks.map(({
      value,
      offset
    }) => {
      var _a;
      return (0, import_jsx_runtime35.jsx)(GridLine, {
        y1: start,
        y2: end,
        x1: offset,
        x2: offset,
        className: classes.verticalLine
      }, `vertical-${((_a = value == null ? void 0 : value.getTime) == null ? void 0 : _a.call(value)) ?? value}`);
    })
  });
}

// node_modules/@mui/x-charts/esm/ChartsGrid/ChartsHorizontalGrid.js
var React57 = __toESM(require_react(), 1);
var import_jsx_runtime36 = __toESM(require_jsx_runtime(), 1);
function ChartsGridHorizontal(props) {
  const {
    axis,
    start,
    end,
    classes
  } = props;
  const {
    scale: scale2,
    tickNumber,
    tickInterval
  } = axis;
  const yTicks = useTicks({
    scale: scale2,
    tickNumber,
    tickInterval,
    direction: "y"
  });
  return (0, import_jsx_runtime36.jsx)(React57.Fragment, {
    children: yTicks.map(({
      value,
      offset
    }) => {
      var _a;
      return (0, import_jsx_runtime36.jsx)(GridLine, {
        y1: offset,
        y2: offset,
        x1: start,
        x2: end,
        className: classes.horizontalLine
      }, `horizontal-${((_a = value == null ? void 0 : value.getTime) == null ? void 0 : _a.call(value)) ?? value}`);
    })
  });
}

// node_modules/@mui/x-charts/esm/ChartsGrid/ChartsGrid.js
var import_jsx_runtime37 = __toESM(require_jsx_runtime(), 1);
var _excluded27 = ["vertical", "horizontal"];
var useUtilityClasses15 = ({
  classes
}) => {
  const slots = {
    root: ["root"],
    verticalLine: ["line", "verticalLine"],
    horizontalLine: ["line", "horizontalLine"]
  };
  return composeClasses(slots, getChartsGridUtilityClass, classes);
};
function ChartsGrid(inProps) {
  const props = useThemeProps({
    props: inProps,
    name: "MuiChartsGrid"
  });
  const drawingArea = useDrawingArea();
  const {
    vertical,
    horizontal
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded27);
  const {
    xAxis,
    xAxisIds
  } = useXAxes();
  const {
    yAxis,
    yAxisIds
  } = useYAxes();
  const classes = useUtilityClasses15(props);
  const horizontalAxis = yAxis[yAxisIds[0]];
  const verticalAxis = xAxis[xAxisIds[0]];
  return (0, import_jsx_runtime37.jsxs)(GridRoot, _extends({}, other, {
    className: classes.root,
    children: [vertical && (0, import_jsx_runtime37.jsx)(ChartsGridVertical, {
      axis: verticalAxis,
      start: drawingArea.top,
      end: drawingArea.height + drawingArea.top,
      classes
    }), horizontal && (0, import_jsx_runtime37.jsx)(ChartsGridHorizontal, {
      axis: horizontalAxis,
      start: drawingArea.left,
      end: drawingArea.width + drawingArea.left,
      classes
    })]
  }));
}
true ? ChartsGrid.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "pnpm proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * Override or extend the styles applied to the component.
   */
  classes: import_prop_types29.default.object,
  /**
   * Displays horizontal grid.
   */
  horizontal: import_prop_types29.default.bool,
  /**
   * Displays vertical grid.
   */
  vertical: import_prop_types29.default.bool
} : void 0;

// node_modules/@mui/x-charts/esm/ChartsOverlay/ChartsOverlay.js
var React61 = __toESM(require_react(), 1);

// node_modules/@mui/x-charts/esm/ChartsOverlay/ChartsLoadingOverlay.js
var React59 = __toESM(require_react(), 1);
var import_jsx_runtime38 = __toESM(require_jsx_runtime(), 1);
var _excluded28 = ["message"];
var StyledText = styled_default("text")(({
  theme
}) => _extends({}, theme.typography.body2, {
  stroke: "none",
  fill: (theme.vars || theme).palette.text.primary,
  shapeRendering: "crispEdges",
  textAnchor: "middle",
  dominantBaseline: "middle"
}));
function ChartsLoadingOverlay(props) {
  const {
    message
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded28);
  const {
    top,
    left,
    height,
    width
  } = useDrawingArea();
  const {
    localeText
  } = useChartsLocalization();
  return (0, import_jsx_runtime38.jsx)(StyledText, _extends({
    x: left + width / 2,
    y: top + height / 2
  }, other, {
    children: message ?? localeText.loading
  }));
}

// node_modules/@mui/x-charts/esm/ChartsOverlay/ChartsNoDataOverlay.js
var React60 = __toESM(require_react(), 1);
var import_jsx_runtime39 = __toESM(require_jsx_runtime(), 1);
var _excluded29 = ["message"];
var StyledText2 = styled_default("text")(({
  theme
}) => _extends({}, theme.typography.body2, {
  stroke: "none",
  fill: (theme.vars || theme).palette.text.primary,
  shapeRendering: "crispEdges",
  textAnchor: "middle",
  dominantBaseline: "middle"
}));
function ChartsNoDataOverlay(props) {
  const {
    message
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded29);
  const {
    top,
    left,
    height,
    width
  } = useDrawingArea();
  const {
    localeText
  } = useChartsLocalization();
  return (0, import_jsx_runtime39.jsx)(StyledText2, _extends({
    x: left + width / 2,
    y: top + height / 2
  }, other, {
    children: message ?? localeText.noData
  }));
}

// node_modules/@mui/x-charts/esm/ChartsOverlay/ChartsOverlay.js
var import_jsx_runtime40 = __toESM(require_jsx_runtime(), 1);
function useNoData() {
  const seriesPerType = useSeries();
  return Object.values(seriesPerType).every((seriesOfGivenType) => {
    if (!seriesOfGivenType) {
      return true;
    }
    const {
      series,
      seriesOrder
    } = seriesOfGivenType;
    return seriesOrder.every((seriesId) => series[seriesId].data.length === 0);
  });
}
function ChartsOverlay(props) {
  var _a, _b, _c, _d;
  const noData = useNoData();
  if (props.loading) {
    const LoadingOverlay = ((_a = props.slots) == null ? void 0 : _a.loadingOverlay) ?? ChartsLoadingOverlay;
    return (0, import_jsx_runtime40.jsx)(LoadingOverlay, _extends({}, (_b = props.slotProps) == null ? void 0 : _b.loadingOverlay));
  }
  if (noData) {
    const NoDataOverlay = ((_c = props.slots) == null ? void 0 : _c.noDataOverlay) ?? ChartsNoDataOverlay;
    return (0, import_jsx_runtime40.jsx)(NoDataOverlay, _extends({}, (_d = props.slotProps) == null ? void 0 : _d.noDataOverlay));
  }
  return null;
}

// node_modules/@mui/x-charts/esm/LineChart/useLineChartProps.js
var React62 = __toESM(require_react(), 1);

// node_modules/@mui/x-charts/esm/LineChart/LineChart.plugins.js
var LINE_CHART_PLUGINS = [useChartZAxis, useChartCartesianAxis, useChartInteraction, useChartHighlight];

// node_modules/@mui/x-charts/esm/LineChart/useLineChartProps.js
var _excluded30 = ["xAxis", "yAxis", "series", "width", "height", "margin", "colors", "dataset", "sx", "onAreaClick", "onLineClick", "onMarkClick", "axisHighlight", "disableLineItemHighlight", "hideLegend", "grid", "children", "slots", "slotProps", "skipAnimation", "loading", "highlightedItem", "onHighlightChange", "className", "showToolbar"];
var useLineChartProps = (props) => {
  var _a, _b, _c, _d, _e;
  const {
    xAxis,
    yAxis,
    series,
    width,
    height,
    margin,
    colors,
    dataset,
    sx,
    onAreaClick,
    onLineClick,
    onMarkClick,
    axisHighlight,
    disableLineItemHighlight,
    grid,
    children,
    slots,
    slotProps,
    skipAnimation,
    loading,
    highlightedItem,
    onHighlightChange,
    className
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded30);
  const id = useId();
  const clipPathId = `${id}-clip-path`;
  const seriesWithDefault = React62.useMemo(() => series.map((s) => _extends({
    disableHighlight: !!disableLineItemHighlight,
    type: "line"
  }, s)), [disableLineItemHighlight, series]);
  const chartContainerProps = _extends({}, other, {
    series: seriesWithDefault,
    width,
    height,
    margin,
    colors,
    dataset,
    xAxis: xAxis ?? [{
      id: DEFAULT_X_AXIS_KEY,
      scaleType: "point",
      data: Array.from({
        length: Math.max(...series.map((s) => (s.data ?? dataset ?? []).length))
      }, (_, index) => index)
    }],
    yAxis,
    highlightedItem,
    onHighlightChange,
    disableAxisListener: ((_a = slotProps == null ? void 0 : slotProps.tooltip) == null ? void 0 : _a.trigger) !== "axis" && (axisHighlight == null ? void 0 : axisHighlight.x) === "none" && (axisHighlight == null ? void 0 : axisHighlight.y) === "none",
    className,
    skipAnimation,
    plugins: LINE_CHART_PLUGINS
  });
  const gridProps = {
    vertical: grid == null ? void 0 : grid.vertical,
    horizontal: grid == null ? void 0 : grid.horizontal
  };
  const clipPathGroupProps = {
    clipPath: `url(#${clipPathId})`
  };
  const clipPathProps = {
    id: clipPathId
  };
  const areaPlotProps = {
    slots,
    slotProps,
    onItemClick: onAreaClick
  };
  const linePlotProps = {
    slots,
    slotProps,
    onItemClick: onLineClick
  };
  const markPlotProps = {
    slots,
    slotProps,
    onItemClick: onMarkClick,
    skipAnimation
  };
  const overlayProps = {
    slots,
    slotProps,
    loading
  };
  const chartsAxisProps = {
    slots,
    slotProps
  };
  const axisHighlightProps = _extends({
    x: "line"
  }, axisHighlight);
  const lineHighlightPlotProps = {
    slots,
    slotProps
  };
  const legendProps = {
    slots,
    slotProps
  };
  const chartsWrapperProps = {
    sx,
    legendPosition: (_c = (_b = props.slotProps) == null ? void 0 : _b.legend) == null ? void 0 : _c.position,
    legendDirection: (_e = (_d = props.slotProps) == null ? void 0 : _d.legend) == null ? void 0 : _e.direction
  };
  return {
    chartsWrapperProps,
    chartContainerProps,
    gridProps,
    clipPathProps,
    clipPathGroupProps,
    areaPlotProps,
    linePlotProps,
    markPlotProps,
    overlayProps,
    chartsAxisProps,
    axisHighlightProps,
    lineHighlightPlotProps,
    legendProps,
    children
  };
};

// node_modules/@mui/x-charts/esm/internals/plugins/featurePlugins/useChartVoronoi/useChartVoronoi.js
var React63 = __toESM(require_react(), 1);

// node_modules/robust-predicates/esm/util.js
var epsilon = 11102230246251565e-32;
var splitter = 134217729;
var resulterrbound = (3 + 8 * epsilon) * epsilon;
function sum(elen, e, flen, f, h) {
  let Q, Qnew, hh, bvirt;
  let enow = e[0];
  let fnow = f[0];
  let eindex = 0;
  let findex = 0;
  if (fnow > enow === fnow > -enow) {
    Q = enow;
    enow = e[++eindex];
  } else {
    Q = fnow;
    fnow = f[++findex];
  }
  let hindex = 0;
  if (eindex < elen && findex < flen) {
    if (fnow > enow === fnow > -enow) {
      Qnew = enow + Q;
      hh = Q - (Qnew - enow);
      enow = e[++eindex];
    } else {
      Qnew = fnow + Q;
      hh = Q - (Qnew - fnow);
      fnow = f[++findex];
    }
    Q = Qnew;
    if (hh !== 0) {
      h[hindex++] = hh;
    }
    while (eindex < elen && findex < flen) {
      if (fnow > enow === fnow > -enow) {
        Qnew = Q + enow;
        bvirt = Qnew - Q;
        hh = Q - (Qnew - bvirt) + (enow - bvirt);
        enow = e[++eindex];
      } else {
        Qnew = Q + fnow;
        bvirt = Qnew - Q;
        hh = Q - (Qnew - bvirt) + (fnow - bvirt);
        fnow = f[++findex];
      }
      Q = Qnew;
      if (hh !== 0) {
        h[hindex++] = hh;
      }
    }
  }
  while (eindex < elen) {
    Qnew = Q + enow;
    bvirt = Qnew - Q;
    hh = Q - (Qnew - bvirt) + (enow - bvirt);
    enow = e[++eindex];
    Q = Qnew;
    if (hh !== 0) {
      h[hindex++] = hh;
    }
  }
  while (findex < flen) {
    Qnew = Q + fnow;
    bvirt = Qnew - Q;
    hh = Q - (Qnew - bvirt) + (fnow - bvirt);
    fnow = f[++findex];
    Q = Qnew;
    if (hh !== 0) {
      h[hindex++] = hh;
    }
  }
  if (Q !== 0 || hindex === 0) {
    h[hindex++] = Q;
  }
  return hindex;
}
function estimate(elen, e) {
  let Q = e[0];
  for (let i = 1; i < elen; i++) Q += e[i];
  return Q;
}
function vec(n) {
  return new Float64Array(n);
}

// node_modules/robust-predicates/esm/orient2d.js
var ccwerrboundA = (3 + 16 * epsilon) * epsilon;
var ccwerrboundB = (2 + 12 * epsilon) * epsilon;
var ccwerrboundC = (9 + 64 * epsilon) * epsilon * epsilon;
var B = vec(4);
var C1 = vec(8);
var C2 = vec(12);
var D = vec(16);
var u = vec(4);
function orient2dadapt(ax, ay, bx, by, cx, cy, detsum) {
  let acxtail, acytail, bcxtail, bcytail;
  let bvirt, c, ahi, alo, bhi, blo, _i, _j, _0, s1, s0, t1, t0, u32;
  const acx = ax - cx;
  const bcx = bx - cx;
  const acy = ay - cy;
  const bcy = by - cy;
  s1 = acx * bcy;
  c = splitter * acx;
  ahi = c - (c - acx);
  alo = acx - ahi;
  c = splitter * bcy;
  bhi = c - (c - bcy);
  blo = bcy - bhi;
  s0 = alo * blo - (s1 - ahi * bhi - alo * bhi - ahi * blo);
  t1 = acy * bcx;
  c = splitter * acy;
  ahi = c - (c - acy);
  alo = acy - ahi;
  c = splitter * bcx;
  bhi = c - (c - bcx);
  blo = bcx - bhi;
  t0 = alo * blo - (t1 - ahi * bhi - alo * bhi - ahi * blo);
  _i = s0 - t0;
  bvirt = s0 - _i;
  B[0] = s0 - (_i + bvirt) + (bvirt - t0);
  _j = s1 + _i;
  bvirt = _j - s1;
  _0 = s1 - (_j - bvirt) + (_i - bvirt);
  _i = _0 - t1;
  bvirt = _0 - _i;
  B[1] = _0 - (_i + bvirt) + (bvirt - t1);
  u32 = _j + _i;
  bvirt = u32 - _j;
  B[2] = _j - (u32 - bvirt) + (_i - bvirt);
  B[3] = u32;
  let det = estimate(4, B);
  let errbound = ccwerrboundB * detsum;
  if (det >= errbound || -det >= errbound) {
    return det;
  }
  bvirt = ax - acx;
  acxtail = ax - (acx + bvirt) + (bvirt - cx);
  bvirt = bx - bcx;
  bcxtail = bx - (bcx + bvirt) + (bvirt - cx);
  bvirt = ay - acy;
  acytail = ay - (acy + bvirt) + (bvirt - cy);
  bvirt = by - bcy;
  bcytail = by - (bcy + bvirt) + (bvirt - cy);
  if (acxtail === 0 && acytail === 0 && bcxtail === 0 && bcytail === 0) {
    return det;
  }
  errbound = ccwerrboundC * detsum + resulterrbound * Math.abs(det);
  det += acx * bcytail + bcy * acxtail - (acy * bcxtail + bcx * acytail);
  if (det >= errbound || -det >= errbound) return det;
  s1 = acxtail * bcy;
  c = splitter * acxtail;
  ahi = c - (c - acxtail);
  alo = acxtail - ahi;
  c = splitter * bcy;
  bhi = c - (c - bcy);
  blo = bcy - bhi;
  s0 = alo * blo - (s1 - ahi * bhi - alo * bhi - ahi * blo);
  t1 = acytail * bcx;
  c = splitter * acytail;
  ahi = c - (c - acytail);
  alo = acytail - ahi;
  c = splitter * bcx;
  bhi = c - (c - bcx);
  blo = bcx - bhi;
  t0 = alo * blo - (t1 - ahi * bhi - alo * bhi - ahi * blo);
  _i = s0 - t0;
  bvirt = s0 - _i;
  u[0] = s0 - (_i + bvirt) + (bvirt - t0);
  _j = s1 + _i;
  bvirt = _j - s1;
  _0 = s1 - (_j - bvirt) + (_i - bvirt);
  _i = _0 - t1;
  bvirt = _0 - _i;
  u[1] = _0 - (_i + bvirt) + (bvirt - t1);
  u32 = _j + _i;
  bvirt = u32 - _j;
  u[2] = _j - (u32 - bvirt) + (_i - bvirt);
  u[3] = u32;
  const C1len = sum(4, B, 4, u, C1);
  s1 = acx * bcytail;
  c = splitter * acx;
  ahi = c - (c - acx);
  alo = acx - ahi;
  c = splitter * bcytail;
  bhi = c - (c - bcytail);
  blo = bcytail - bhi;
  s0 = alo * blo - (s1 - ahi * bhi - alo * bhi - ahi * blo);
  t1 = acy * bcxtail;
  c = splitter * acy;
  ahi = c - (c - acy);
  alo = acy - ahi;
  c = splitter * bcxtail;
  bhi = c - (c - bcxtail);
  blo = bcxtail - bhi;
  t0 = alo * blo - (t1 - ahi * bhi - alo * bhi - ahi * blo);
  _i = s0 - t0;
  bvirt = s0 - _i;
  u[0] = s0 - (_i + bvirt) + (bvirt - t0);
  _j = s1 + _i;
  bvirt = _j - s1;
  _0 = s1 - (_j - bvirt) + (_i - bvirt);
  _i = _0 - t1;
  bvirt = _0 - _i;
  u[1] = _0 - (_i + bvirt) + (bvirt - t1);
  u32 = _j + _i;
  bvirt = u32 - _j;
  u[2] = _j - (u32 - bvirt) + (_i - bvirt);
  u[3] = u32;
  const C2len = sum(C1len, C1, 4, u, C2);
  s1 = acxtail * bcytail;
  c = splitter * acxtail;
  ahi = c - (c - acxtail);
  alo = acxtail - ahi;
  c = splitter * bcytail;
  bhi = c - (c - bcytail);
  blo = bcytail - bhi;
  s0 = alo * blo - (s1 - ahi * bhi - alo * bhi - ahi * blo);
  t1 = acytail * bcxtail;
  c = splitter * acytail;
  ahi = c - (c - acytail);
  alo = acytail - ahi;
  c = splitter * bcxtail;
  bhi = c - (c - bcxtail);
  blo = bcxtail - bhi;
  t0 = alo * blo - (t1 - ahi * bhi - alo * bhi - ahi * blo);
  _i = s0 - t0;
  bvirt = s0 - _i;
  u[0] = s0 - (_i + bvirt) + (bvirt - t0);
  _j = s1 + _i;
  bvirt = _j - s1;
  _0 = s1 - (_j - bvirt) + (_i - bvirt);
  _i = _0 - t1;
  bvirt = _0 - _i;
  u[1] = _0 - (_i + bvirt) + (bvirt - t1);
  u32 = _j + _i;
  bvirt = u32 - _j;
  u[2] = _j - (u32 - bvirt) + (_i - bvirt);
  u[3] = u32;
  const Dlen = sum(C2len, C2, 4, u, D);
  return D[Dlen - 1];
}
function orient2d(ax, ay, bx, by, cx, cy) {
  const detleft = (ay - cy) * (bx - cx);
  const detright = (ax - cx) * (by - cy);
  const det = detleft - detright;
  const detsum = Math.abs(detleft + detright);
  if (Math.abs(det) >= ccwerrboundA * detsum) return det;
  return -orient2dadapt(ax, ay, bx, by, cx, cy, detsum);
}

// node_modules/robust-predicates/esm/orient3d.js
var o3derrboundA = (7 + 56 * epsilon) * epsilon;
var o3derrboundB = (3 + 28 * epsilon) * epsilon;
var o3derrboundC = (26 + 288 * epsilon) * epsilon * epsilon;
var bc = vec(4);
var ca = vec(4);
var ab = vec(4);
var at_b = vec(4);
var at_c = vec(4);
var bt_c = vec(4);
var bt_a = vec(4);
var ct_a = vec(4);
var ct_b = vec(4);
var bct = vec(8);
var cat = vec(8);
var abt = vec(8);
var u2 = vec(4);
var _8 = vec(8);
var _8b = vec(8);
var _16 = vec(8);
var _12 = vec(12);
var fin = vec(192);
var fin2 = vec(192);

// node_modules/robust-predicates/esm/incircle.js
var iccerrboundA = (10 + 96 * epsilon) * epsilon;
var iccerrboundB = (4 + 48 * epsilon) * epsilon;
var iccerrboundC = (44 + 576 * epsilon) * epsilon * epsilon;
var bc2 = vec(4);
var ca2 = vec(4);
var ab2 = vec(4);
var aa = vec(4);
var bb = vec(4);
var cc = vec(4);
var u3 = vec(4);
var v = vec(4);
var axtbc = vec(8);
var aytbc = vec(8);
var bxtca = vec(8);
var bytca = vec(8);
var cxtab = vec(8);
var cytab = vec(8);
var abt2 = vec(8);
var bct2 = vec(8);
var cat2 = vec(8);
var abtt = vec(4);
var bctt = vec(4);
var catt = vec(4);
var _82 = vec(8);
var _162 = vec(16);
var _16b = vec(16);
var _16c = vec(16);
var _32 = vec(32);
var _32b = vec(32);
var _48 = vec(48);
var _64 = vec(64);
var fin3 = vec(1152);
var fin22 = vec(1152);

// node_modules/robust-predicates/esm/insphere.js
var isperrboundA = (16 + 224 * epsilon) * epsilon;
var isperrboundB = (5 + 72 * epsilon) * epsilon;
var isperrboundC = (71 + 1408 * epsilon) * epsilon * epsilon;
var ab3 = vec(4);
var bc3 = vec(4);
var cd = vec(4);
var de = vec(4);
var ea = vec(4);
var ac = vec(4);
var bd = vec(4);
var ce = vec(4);
var da = vec(4);
var eb = vec(4);
var abc = vec(24);
var bcd = vec(24);
var cde = vec(24);
var dea = vec(24);
var eab = vec(24);
var abd = vec(24);
var bce = vec(24);
var cda = vec(24);
var deb = vec(24);
var eac = vec(24);
var adet = vec(1152);
var bdet = vec(1152);
var cdet = vec(1152);
var ddet = vec(1152);
var edet = vec(1152);
var abdet = vec(2304);
var cddet = vec(2304);
var cdedet = vec(3456);
var deter = vec(5760);
var _83 = vec(8);
var _8b2 = vec(8);
var _8c = vec(8);
var _163 = vec(16);
var _24 = vec(24);
var _482 = vec(48);
var _48b = vec(48);
var _96 = vec(96);
var _192 = vec(192);
var _384x = vec(384);
var _384y = vec(384);
var _384z = vec(384);
var _768 = vec(768);
var xdet = vec(96);
var ydet = vec(96);
var zdet = vec(96);
var fin4 = vec(1152);

// node_modules/delaunator/index.js
var EPSILON = Math.pow(2, -52);
var EDGE_STACK = new Uint32Array(512);
var Delaunator = class _Delaunator {
  static from(points, getX = defaultGetX, getY = defaultGetY) {
    const n = points.length;
    const coords = new Float64Array(n * 2);
    for (let i = 0; i < n; i++) {
      const p = points[i];
      coords[2 * i] = getX(p);
      coords[2 * i + 1] = getY(p);
    }
    return new _Delaunator(coords);
  }
  constructor(coords) {
    const n = coords.length >> 1;
    if (n > 0 && typeof coords[0] !== "number") throw new Error("Expected coords to contain numbers.");
    this.coords = coords;
    const maxTriangles = Math.max(2 * n - 5, 0);
    this._triangles = new Uint32Array(maxTriangles * 3);
    this._halfedges = new Int32Array(maxTriangles * 3);
    this._hashSize = Math.ceil(Math.sqrt(n));
    this._hullPrev = new Uint32Array(n);
    this._hullNext = new Uint32Array(n);
    this._hullTri = new Uint32Array(n);
    this._hullHash = new Int32Array(this._hashSize);
    this._ids = new Uint32Array(n);
    this._dists = new Float64Array(n);
    this.update();
  }
  update() {
    const { coords, _hullPrev: hullPrev, _hullNext: hullNext, _hullTri: hullTri, _hullHash: hullHash } = this;
    const n = coords.length >> 1;
    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;
    for (let i = 0; i < n; i++) {
      const x = coords[2 * i];
      const y = coords[2 * i + 1];
      if (x < minX) minX = x;
      if (y < minY) minY = y;
      if (x > maxX) maxX = x;
      if (y > maxY) maxY = y;
      this._ids[i] = i;
    }
    const cx = (minX + maxX) / 2;
    const cy = (minY + maxY) / 2;
    let i0, i1, i2;
    for (let i = 0, minDist = Infinity; i < n; i++) {
      const d = dist(cx, cy, coords[2 * i], coords[2 * i + 1]);
      if (d < minDist) {
        i0 = i;
        minDist = d;
      }
    }
    const i0x = coords[2 * i0];
    const i0y = coords[2 * i0 + 1];
    for (let i = 0, minDist = Infinity; i < n; i++) {
      if (i === i0) continue;
      const d = dist(i0x, i0y, coords[2 * i], coords[2 * i + 1]);
      if (d < minDist && d > 0) {
        i1 = i;
        minDist = d;
      }
    }
    let i1x = coords[2 * i1];
    let i1y = coords[2 * i1 + 1];
    let minRadius = Infinity;
    for (let i = 0; i < n; i++) {
      if (i === i0 || i === i1) continue;
      const r = circumradius(i0x, i0y, i1x, i1y, coords[2 * i], coords[2 * i + 1]);
      if (r < minRadius) {
        i2 = i;
        minRadius = r;
      }
    }
    let i2x = coords[2 * i2];
    let i2y = coords[2 * i2 + 1];
    if (minRadius === Infinity) {
      for (let i = 0; i < n; i++) {
        this._dists[i] = coords[2 * i] - coords[0] || coords[2 * i + 1] - coords[1];
      }
      quicksort(this._ids, this._dists, 0, n - 1);
      const hull = new Uint32Array(n);
      let j = 0;
      for (let i = 0, d0 = -Infinity; i < n; i++) {
        const id = this._ids[i];
        const d = this._dists[id];
        if (d > d0) {
          hull[j++] = id;
          d0 = d;
        }
      }
      this.hull = hull.subarray(0, j);
      this.triangles = new Uint32Array(0);
      this.halfedges = new Uint32Array(0);
      return;
    }
    if (orient2d(i0x, i0y, i1x, i1y, i2x, i2y) < 0) {
      const i = i1;
      const x = i1x;
      const y = i1y;
      i1 = i2;
      i1x = i2x;
      i1y = i2y;
      i2 = i;
      i2x = x;
      i2y = y;
    }
    const center = circumcenter(i0x, i0y, i1x, i1y, i2x, i2y);
    this._cx = center.x;
    this._cy = center.y;
    for (let i = 0; i < n; i++) {
      this._dists[i] = dist(coords[2 * i], coords[2 * i + 1], center.x, center.y);
    }
    quicksort(this._ids, this._dists, 0, n - 1);
    this._hullStart = i0;
    let hullSize = 3;
    hullNext[i0] = hullPrev[i2] = i1;
    hullNext[i1] = hullPrev[i0] = i2;
    hullNext[i2] = hullPrev[i1] = i0;
    hullTri[i0] = 0;
    hullTri[i1] = 1;
    hullTri[i2] = 2;
    hullHash.fill(-1);
    hullHash[this._hashKey(i0x, i0y)] = i0;
    hullHash[this._hashKey(i1x, i1y)] = i1;
    hullHash[this._hashKey(i2x, i2y)] = i2;
    this.trianglesLen = 0;
    this._addTriangle(i0, i1, i2, -1, -1, -1);
    for (let k = 0, xp, yp; k < this._ids.length; k++) {
      const i = this._ids[k];
      const x = coords[2 * i];
      const y = coords[2 * i + 1];
      if (k > 0 && Math.abs(x - xp) <= EPSILON && Math.abs(y - yp) <= EPSILON) continue;
      xp = x;
      yp = y;
      if (i === i0 || i === i1 || i === i2) continue;
      let start = 0;
      for (let j = 0, key = this._hashKey(x, y); j < this._hashSize; j++) {
        start = hullHash[(key + j) % this._hashSize];
        if (start !== -1 && start !== hullNext[start]) break;
      }
      start = hullPrev[start];
      let e = start, q;
      while (q = hullNext[e], orient2d(x, y, coords[2 * e], coords[2 * e + 1], coords[2 * q], coords[2 * q + 1]) >= 0) {
        e = q;
        if (e === start) {
          e = -1;
          break;
        }
      }
      if (e === -1) continue;
      let t = this._addTriangle(e, i, hullNext[e], -1, -1, hullTri[e]);
      hullTri[i] = this._legalize(t + 2);
      hullTri[e] = t;
      hullSize++;
      let n2 = hullNext[e];
      while (q = hullNext[n2], orient2d(x, y, coords[2 * n2], coords[2 * n2 + 1], coords[2 * q], coords[2 * q + 1]) < 0) {
        t = this._addTriangle(n2, i, q, hullTri[i], -1, hullTri[n2]);
        hullTri[i] = this._legalize(t + 2);
        hullNext[n2] = n2;
        hullSize--;
        n2 = q;
      }
      if (e === start) {
        while (q = hullPrev[e], orient2d(x, y, coords[2 * q], coords[2 * q + 1], coords[2 * e], coords[2 * e + 1]) < 0) {
          t = this._addTriangle(q, i, e, -1, hullTri[e], hullTri[q]);
          this._legalize(t + 2);
          hullTri[q] = t;
          hullNext[e] = e;
          hullSize--;
          e = q;
        }
      }
      this._hullStart = hullPrev[i] = e;
      hullNext[e] = hullPrev[n2] = i;
      hullNext[i] = n2;
      hullHash[this._hashKey(x, y)] = i;
      hullHash[this._hashKey(coords[2 * e], coords[2 * e + 1])] = e;
    }
    this.hull = new Uint32Array(hullSize);
    for (let i = 0, e = this._hullStart; i < hullSize; i++) {
      this.hull[i] = e;
      e = hullNext[e];
    }
    this.triangles = this._triangles.subarray(0, this.trianglesLen);
    this.halfedges = this._halfedges.subarray(0, this.trianglesLen);
  }
  _hashKey(x, y) {
    return Math.floor(pseudoAngle(x - this._cx, y - this._cy) * this._hashSize) % this._hashSize;
  }
  _legalize(a) {
    const { _triangles: triangles, _halfedges: halfedges, coords } = this;
    let i = 0;
    let ar = 0;
    while (true) {
      const b = halfedges[a];
      const a0 = a - a % 3;
      ar = a0 + (a + 2) % 3;
      if (b === -1) {
        if (i === 0) break;
        a = EDGE_STACK[--i];
        continue;
      }
      const b0 = b - b % 3;
      const al = a0 + (a + 1) % 3;
      const bl = b0 + (b + 2) % 3;
      const p0 = triangles[ar];
      const pr = triangles[a];
      const pl = triangles[al];
      const p1 = triangles[bl];
      const illegal = inCircle(
        coords[2 * p0],
        coords[2 * p0 + 1],
        coords[2 * pr],
        coords[2 * pr + 1],
        coords[2 * pl],
        coords[2 * pl + 1],
        coords[2 * p1],
        coords[2 * p1 + 1]
      );
      if (illegal) {
        triangles[a] = p1;
        triangles[b] = p0;
        const hbl = halfedges[bl];
        if (hbl === -1) {
          let e = this._hullStart;
          do {
            if (this._hullTri[e] === bl) {
              this._hullTri[e] = a;
              break;
            }
            e = this._hullPrev[e];
          } while (e !== this._hullStart);
        }
        this._link(a, hbl);
        this._link(b, halfedges[ar]);
        this._link(ar, bl);
        const br = b0 + (b + 1) % 3;
        if (i < EDGE_STACK.length) {
          EDGE_STACK[i++] = br;
        }
      } else {
        if (i === 0) break;
        a = EDGE_STACK[--i];
      }
    }
    return ar;
  }
  _link(a, b) {
    this._halfedges[a] = b;
    if (b !== -1) this._halfedges[b] = a;
  }
  // add a new triangle given vertex indices and adjacent half-edge ids
  _addTriangle(i0, i1, i2, a, b, c) {
    const t = this.trianglesLen;
    this._triangles[t] = i0;
    this._triangles[t + 1] = i1;
    this._triangles[t + 2] = i2;
    this._link(t, a);
    this._link(t + 1, b);
    this._link(t + 2, c);
    this.trianglesLen += 3;
    return t;
  }
};
function pseudoAngle(dx, dy) {
  const p = dx / (Math.abs(dx) + Math.abs(dy));
  return (dy > 0 ? 3 - p : 1 + p) / 4;
}
function dist(ax, ay, bx, by) {
  const dx = ax - bx;
  const dy = ay - by;
  return dx * dx + dy * dy;
}
function inCircle(ax, ay, bx, by, cx, cy, px, py) {
  const dx = ax - px;
  const dy = ay - py;
  const ex = bx - px;
  const ey = by - py;
  const fx = cx - px;
  const fy = cy - py;
  const ap = dx * dx + dy * dy;
  const bp = ex * ex + ey * ey;
  const cp = fx * fx + fy * fy;
  return dx * (ey * cp - bp * fy) - dy * (ex * cp - bp * fx) + ap * (ex * fy - ey * fx) < 0;
}
function circumradius(ax, ay, bx, by, cx, cy) {
  const dx = bx - ax;
  const dy = by - ay;
  const ex = cx - ax;
  const ey = cy - ay;
  const bl = dx * dx + dy * dy;
  const cl = ex * ex + ey * ey;
  const d = 0.5 / (dx * ey - dy * ex);
  const x = (ey * bl - dy * cl) * d;
  const y = (dx * cl - ex * bl) * d;
  return x * x + y * y;
}
function circumcenter(ax, ay, bx, by, cx, cy) {
  const dx = bx - ax;
  const dy = by - ay;
  const ex = cx - ax;
  const ey = cy - ay;
  const bl = dx * dx + dy * dy;
  const cl = ex * ex + ey * ey;
  const d = 0.5 / (dx * ey - dy * ex);
  const x = ax + (ey * bl - dy * cl) * d;
  const y = ay + (dx * cl - ex * bl) * d;
  return { x, y };
}
function quicksort(ids, dists, left, right) {
  if (right - left <= 20) {
    for (let i = left + 1; i <= right; i++) {
      const temp = ids[i];
      const tempDist = dists[temp];
      let j = i - 1;
      while (j >= left && dists[ids[j]] > tempDist) ids[j + 1] = ids[j--];
      ids[j + 1] = temp;
    }
  } else {
    const median = left + right >> 1;
    let i = left + 1;
    let j = right;
    swap(ids, median, i);
    if (dists[ids[left]] > dists[ids[right]]) swap(ids, left, right);
    if (dists[ids[i]] > dists[ids[right]]) swap(ids, i, right);
    if (dists[ids[left]] > dists[ids[i]]) swap(ids, left, i);
    const temp = ids[i];
    const tempDist = dists[temp];
    while (true) {
      do
        i++;
      while (dists[ids[i]] < tempDist);
      do
        j--;
      while (dists[ids[j]] > tempDist);
      if (j < i) break;
      swap(ids, i, j);
    }
    ids[left + 1] = ids[j];
    ids[j] = temp;
    if (right - i + 1 >= j - left) {
      quicksort(ids, dists, i, right);
      quicksort(ids, dists, left, j - 1);
    } else {
      quicksort(ids, dists, left, j - 1);
      quicksort(ids, dists, i, right);
    }
  }
}
function swap(arr, i, j) {
  const tmp = arr[i];
  arr[i] = arr[j];
  arr[j] = tmp;
}
function defaultGetX(p) {
  return p[0];
}
function defaultGetY(p) {
  return p[1];
}

// node_modules/d3-delaunay/src/path.js
var epsilon2 = 1e-6;
var Path = class {
  constructor() {
    this._x0 = this._y0 = // start of current subpath
    this._x1 = this._y1 = null;
    this._ = "";
  }
  moveTo(x, y) {
    this._ += `M${this._x0 = this._x1 = +x},${this._y0 = this._y1 = +y}`;
  }
  closePath() {
    if (this._x1 !== null) {
      this._x1 = this._x0, this._y1 = this._y0;
      this._ += "Z";
    }
  }
  lineTo(x, y) {
    this._ += `L${this._x1 = +x},${this._y1 = +y}`;
  }
  arc(x, y, r) {
    x = +x, y = +y, r = +r;
    const x0 = x + r;
    const y0 = y;
    if (r < 0) throw new Error("negative radius");
    if (this._x1 === null) this._ += `M${x0},${y0}`;
    else if (Math.abs(this._x1 - x0) > epsilon2 || Math.abs(this._y1 - y0) > epsilon2) this._ += "L" + x0 + "," + y0;
    if (!r) return;
    this._ += `A${r},${r},0,1,1,${x - r},${y}A${r},${r},0,1,1,${this._x1 = x0},${this._y1 = y0}`;
  }
  rect(x, y, w, h) {
    this._ += `M${this._x0 = this._x1 = +x},${this._y0 = this._y1 = +y}h${+w}v${+h}h${-w}Z`;
  }
  value() {
    return this._ || null;
  }
};

// node_modules/d3-delaunay/src/polygon.js
var Polygon = class {
  constructor() {
    this._ = [];
  }
  moveTo(x, y) {
    this._.push([x, y]);
  }
  closePath() {
    this._.push(this._[0].slice());
  }
  lineTo(x, y) {
    this._.push([x, y]);
  }
  value() {
    return this._.length ? this._ : null;
  }
};

// node_modules/d3-delaunay/src/voronoi.js
var Voronoi = class {
  constructor(delaunay, [xmin, ymin, xmax, ymax] = [0, 0, 960, 500]) {
    if (!((xmax = +xmax) >= (xmin = +xmin)) || !((ymax = +ymax) >= (ymin = +ymin))) throw new Error("invalid bounds");
    this.delaunay = delaunay;
    this._circumcenters = new Float64Array(delaunay.points.length * 2);
    this.vectors = new Float64Array(delaunay.points.length * 2);
    this.xmax = xmax, this.xmin = xmin;
    this.ymax = ymax, this.ymin = ymin;
    this._init();
  }
  update() {
    this.delaunay.update();
    this._init();
    return this;
  }
  _init() {
    const { delaunay: { points, hull, triangles }, vectors } = this;
    let bx, by;
    const circumcenters = this.circumcenters = this._circumcenters.subarray(0, triangles.length / 3 * 2);
    for (let i = 0, j = 0, n = triangles.length, x, y; i < n; i += 3, j += 2) {
      const t1 = triangles[i] * 2;
      const t2 = triangles[i + 1] * 2;
      const t3 = triangles[i + 2] * 2;
      const x12 = points[t1];
      const y12 = points[t1 + 1];
      const x2 = points[t2];
      const y2 = points[t2 + 1];
      const x3 = points[t3];
      const y3 = points[t3 + 1];
      const dx = x2 - x12;
      const dy = y2 - y12;
      const ex = x3 - x12;
      const ey = y3 - y12;
      const ab4 = (dx * ey - dy * ex) * 2;
      if (Math.abs(ab4) < 1e-9) {
        if (bx === void 0) {
          bx = by = 0;
          for (const i2 of hull) bx += points[i2 * 2], by += points[i2 * 2 + 1];
          bx /= hull.length, by /= hull.length;
        }
        const a = 1e9 * Math.sign((bx - x12) * ey - (by - y12) * ex);
        x = (x12 + x3) / 2 - a * ey;
        y = (y12 + y3) / 2 + a * ex;
      } else {
        const d = 1 / ab4;
        const bl = dx * dx + dy * dy;
        const cl = ex * ex + ey * ey;
        x = x12 + (ey * bl - dy * cl) * d;
        y = y12 + (dx * cl - ex * bl) * d;
      }
      circumcenters[j] = x;
      circumcenters[j + 1] = y;
    }
    let h = hull[hull.length - 1];
    let p0, p1 = h * 4;
    let x0, x1 = points[2 * h];
    let y0, y1 = points[2 * h + 1];
    vectors.fill(0);
    for (let i = 0; i < hull.length; ++i) {
      h = hull[i];
      p0 = p1, x0 = x1, y0 = y1;
      p1 = h * 4, x1 = points[2 * h], y1 = points[2 * h + 1];
      vectors[p0 + 2] = vectors[p1] = y0 - y1;
      vectors[p0 + 3] = vectors[p1 + 1] = x1 - x0;
    }
  }
  render(context) {
    const buffer = context == null ? context = new Path() : void 0;
    const { delaunay: { halfedges, inedges, hull }, circumcenters, vectors } = this;
    if (hull.length <= 1) return null;
    for (let i = 0, n = halfedges.length; i < n; ++i) {
      const j = halfedges[i];
      if (j < i) continue;
      const ti = Math.floor(i / 3) * 2;
      const tj = Math.floor(j / 3) * 2;
      const xi = circumcenters[ti];
      const yi = circumcenters[ti + 1];
      const xj = circumcenters[tj];
      const yj = circumcenters[tj + 1];
      this._renderSegment(xi, yi, xj, yj, context);
    }
    let h0, h1 = hull[hull.length - 1];
    for (let i = 0; i < hull.length; ++i) {
      h0 = h1, h1 = hull[i];
      const t = Math.floor(inedges[h1] / 3) * 2;
      const x = circumcenters[t];
      const y = circumcenters[t + 1];
      const v2 = h0 * 4;
      const p = this._project(x, y, vectors[v2 + 2], vectors[v2 + 3]);
      if (p) this._renderSegment(x, y, p[0], p[1], context);
    }
    return buffer && buffer.value();
  }
  renderBounds(context) {
    const buffer = context == null ? context = new Path() : void 0;
    context.rect(this.xmin, this.ymin, this.xmax - this.xmin, this.ymax - this.ymin);
    return buffer && buffer.value();
  }
  renderCell(i, context) {
    const buffer = context == null ? context = new Path() : void 0;
    const points = this._clip(i);
    if (points === null || !points.length) return;
    context.moveTo(points[0], points[1]);
    let n = points.length;
    while (points[0] === points[n - 2] && points[1] === points[n - 1] && n > 1) n -= 2;
    for (let i2 = 2; i2 < n; i2 += 2) {
      if (points[i2] !== points[i2 - 2] || points[i2 + 1] !== points[i2 - 1])
        context.lineTo(points[i2], points[i2 + 1]);
    }
    context.closePath();
    return buffer && buffer.value();
  }
  *cellPolygons() {
    const { delaunay: { points } } = this;
    for (let i = 0, n = points.length / 2; i < n; ++i) {
      const cell = this.cellPolygon(i);
      if (cell) cell.index = i, yield cell;
    }
  }
  cellPolygon(i) {
    const polygon = new Polygon();
    this.renderCell(i, polygon);
    return polygon.value();
  }
  _renderSegment(x0, y0, x1, y1, context) {
    let S;
    const c0 = this._regioncode(x0, y0);
    const c1 = this._regioncode(x1, y1);
    if (c0 === 0 && c1 === 0) {
      context.moveTo(x0, y0);
      context.lineTo(x1, y1);
    } else if (S = this._clipSegment(x0, y0, x1, y1, c0, c1)) {
      context.moveTo(S[0], S[1]);
      context.lineTo(S[2], S[3]);
    }
  }
  contains(i, x, y) {
    if ((x = +x, x !== x) || (y = +y, y !== y)) return false;
    return this.delaunay._step(i, x, y) === i;
  }
  *neighbors(i) {
    const ci = this._clip(i);
    if (ci) for (const j of this.delaunay.neighbors(i)) {
      const cj = this._clip(j);
      if (cj) loop: for (let ai = 0, li = ci.length; ai < li; ai += 2) {
        for (let aj = 0, lj = cj.length; aj < lj; aj += 2) {
          if (ci[ai] === cj[aj] && ci[ai + 1] === cj[aj + 1] && ci[(ai + 2) % li] === cj[(aj + lj - 2) % lj] && ci[(ai + 3) % li] === cj[(aj + lj - 1) % lj]) {
            yield j;
            break loop;
          }
        }
      }
    }
  }
  _cell(i) {
    const { circumcenters, delaunay: { inedges, halfedges, triangles } } = this;
    const e0 = inedges[i];
    if (e0 === -1) return null;
    const points = [];
    let e = e0;
    do {
      const t = Math.floor(e / 3);
      points.push(circumcenters[t * 2], circumcenters[t * 2 + 1]);
      e = e % 3 === 2 ? e - 2 : e + 1;
      if (triangles[e] !== i) break;
      e = halfedges[e];
    } while (e !== e0 && e !== -1);
    return points;
  }
  _clip(i) {
    if (i === 0 && this.delaunay.hull.length === 1) {
      return [this.xmax, this.ymin, this.xmax, this.ymax, this.xmin, this.ymax, this.xmin, this.ymin];
    }
    const points = this._cell(i);
    if (points === null) return null;
    const { vectors: V } = this;
    const v2 = i * 4;
    return this._simplify(V[v2] || V[v2 + 1] ? this._clipInfinite(i, points, V[v2], V[v2 + 1], V[v2 + 2], V[v2 + 3]) : this._clipFinite(i, points));
  }
  _clipFinite(i, points) {
    const n = points.length;
    let P = null;
    let x0, y0, x1 = points[n - 2], y1 = points[n - 1];
    let c0, c1 = this._regioncode(x1, y1);
    let e0, e1 = 0;
    for (let j = 0; j < n; j += 2) {
      x0 = x1, y0 = y1, x1 = points[j], y1 = points[j + 1];
      c0 = c1, c1 = this._regioncode(x1, y1);
      if (c0 === 0 && c1 === 0) {
        e0 = e1, e1 = 0;
        if (P) P.push(x1, y1);
        else P = [x1, y1];
      } else {
        let S, sx0, sy0, sx1, sy1;
        if (c0 === 0) {
          if ((S = this._clipSegment(x0, y0, x1, y1, c0, c1)) === null) continue;
          [sx0, sy0, sx1, sy1] = S;
        } else {
          if ((S = this._clipSegment(x1, y1, x0, y0, c1, c0)) === null) continue;
          [sx1, sy1, sx0, sy0] = S;
          e0 = e1, e1 = this._edgecode(sx0, sy0);
          if (e0 && e1) this._edge(i, e0, e1, P, P.length);
          if (P) P.push(sx0, sy0);
          else P = [sx0, sy0];
        }
        e0 = e1, e1 = this._edgecode(sx1, sy1);
        if (e0 && e1) this._edge(i, e0, e1, P, P.length);
        if (P) P.push(sx1, sy1);
        else P = [sx1, sy1];
      }
    }
    if (P) {
      e0 = e1, e1 = this._edgecode(P[0], P[1]);
      if (e0 && e1) this._edge(i, e0, e1, P, P.length);
    } else if (this.contains(i, (this.xmin + this.xmax) / 2, (this.ymin + this.ymax) / 2)) {
      return [this.xmax, this.ymin, this.xmax, this.ymax, this.xmin, this.ymax, this.xmin, this.ymin];
    }
    return P;
  }
  _clipSegment(x0, y0, x1, y1, c0, c1) {
    const flip = c0 < c1;
    if (flip) [x0, y0, x1, y1, c0, c1] = [x1, y1, x0, y0, c1, c0];
    while (true) {
      if (c0 === 0 && c1 === 0) return flip ? [x1, y1, x0, y0] : [x0, y0, x1, y1];
      if (c0 & c1) return null;
      let x, y, c = c0 || c1;
      if (c & 8) x = x0 + (x1 - x0) * (this.ymax - y0) / (y1 - y0), y = this.ymax;
      else if (c & 4) x = x0 + (x1 - x0) * (this.ymin - y0) / (y1 - y0), y = this.ymin;
      else if (c & 2) y = y0 + (y1 - y0) * (this.xmax - x0) / (x1 - x0), x = this.xmax;
      else y = y0 + (y1 - y0) * (this.xmin - x0) / (x1 - x0), x = this.xmin;
      if (c0) x0 = x, y0 = y, c0 = this._regioncode(x0, y0);
      else x1 = x, y1 = y, c1 = this._regioncode(x1, y1);
    }
  }
  _clipInfinite(i, points, vx0, vy0, vxn, vyn) {
    let P = Array.from(points), p;
    if (p = this._project(P[0], P[1], vx0, vy0)) P.unshift(p[0], p[1]);
    if (p = this._project(P[P.length - 2], P[P.length - 1], vxn, vyn)) P.push(p[0], p[1]);
    if (P = this._clipFinite(i, P)) {
      for (let j = 0, n = P.length, c0, c1 = this._edgecode(P[n - 2], P[n - 1]); j < n; j += 2) {
        c0 = c1, c1 = this._edgecode(P[j], P[j + 1]);
        if (c0 && c1) j = this._edge(i, c0, c1, P, j), n = P.length;
      }
    } else if (this.contains(i, (this.xmin + this.xmax) / 2, (this.ymin + this.ymax) / 2)) {
      P = [this.xmin, this.ymin, this.xmax, this.ymin, this.xmax, this.ymax, this.xmin, this.ymax];
    }
    return P;
  }
  _edge(i, e0, e1, P, j) {
    while (e0 !== e1) {
      let x, y;
      switch (e0) {
        case 5:
          e0 = 4;
          continue;
        // top-left
        case 4:
          e0 = 6, x = this.xmax, y = this.ymin;
          break;
        // top
        case 6:
          e0 = 2;
          continue;
        // top-right
        case 2:
          e0 = 10, x = this.xmax, y = this.ymax;
          break;
        // right
        case 10:
          e0 = 8;
          continue;
        // bottom-right
        case 8:
          e0 = 9, x = this.xmin, y = this.ymax;
          break;
        // bottom
        case 9:
          e0 = 1;
          continue;
        // bottom-left
        case 1:
          e0 = 5, x = this.xmin, y = this.ymin;
          break;
      }
      if ((P[j] !== x || P[j + 1] !== y) && this.contains(i, x, y)) {
        P.splice(j, 0, x, y), j += 2;
      }
    }
    return j;
  }
  _project(x0, y0, vx, vy) {
    let t = Infinity, c, x, y;
    if (vy < 0) {
      if (y0 <= this.ymin) return null;
      if ((c = (this.ymin - y0) / vy) < t) y = this.ymin, x = x0 + (t = c) * vx;
    } else if (vy > 0) {
      if (y0 >= this.ymax) return null;
      if ((c = (this.ymax - y0) / vy) < t) y = this.ymax, x = x0 + (t = c) * vx;
    }
    if (vx > 0) {
      if (x0 >= this.xmax) return null;
      if ((c = (this.xmax - x0) / vx) < t) x = this.xmax, y = y0 + (t = c) * vy;
    } else if (vx < 0) {
      if (x0 <= this.xmin) return null;
      if ((c = (this.xmin - x0) / vx) < t) x = this.xmin, y = y0 + (t = c) * vy;
    }
    return [x, y];
  }
  _edgecode(x, y) {
    return (x === this.xmin ? 1 : x === this.xmax ? 2 : 0) | (y === this.ymin ? 4 : y === this.ymax ? 8 : 0);
  }
  _regioncode(x, y) {
    return (x < this.xmin ? 1 : x > this.xmax ? 2 : 0) | (y < this.ymin ? 4 : y > this.ymax ? 8 : 0);
  }
  _simplify(P) {
    if (P && P.length > 4) {
      for (let i = 0; i < P.length; i += 2) {
        const j = (i + 2) % P.length, k = (i + 4) % P.length;
        if (P[i] === P[j] && P[j] === P[k] || P[i + 1] === P[j + 1] && P[j + 1] === P[k + 1]) {
          P.splice(j, 2), i -= 2;
        }
      }
      if (!P.length) P = null;
    }
    return P;
  }
};

// node_modules/d3-delaunay/src/delaunay.js
var tau = 2 * Math.PI;
var pow2 = Math.pow;
function pointX(p) {
  return p[0];
}
function pointY(p) {
  return p[1];
}
function collinear(d) {
  const { triangles, coords } = d;
  for (let i = 0; i < triangles.length; i += 3) {
    const a = 2 * triangles[i], b = 2 * triangles[i + 1], c = 2 * triangles[i + 2], cross = (coords[c] - coords[a]) * (coords[b + 1] - coords[a + 1]) - (coords[b] - coords[a]) * (coords[c + 1] - coords[a + 1]);
    if (cross > 1e-10) return false;
  }
  return true;
}
function jitter(x, y, r) {
  return [x + Math.sin(x + y) * r, y + Math.cos(x - y) * r];
}
var Delaunay = class _Delaunay {
  static from(points, fx = pointX, fy = pointY, that) {
    return new _Delaunay("length" in points ? flatArray(points, fx, fy, that) : Float64Array.from(flatIterable(points, fx, fy, that)));
  }
  constructor(points) {
    this._delaunator = new Delaunator(points);
    this.inedges = new Int32Array(points.length / 2);
    this._hullIndex = new Int32Array(points.length / 2);
    this.points = this._delaunator.coords;
    this._init();
  }
  update() {
    this._delaunator.update();
    this._init();
    return this;
  }
  _init() {
    const d = this._delaunator, points = this.points;
    if (d.hull && d.hull.length > 2 && collinear(d)) {
      this.collinear = Int32Array.from({ length: points.length / 2 }, (_, i) => i).sort((i, j) => points[2 * i] - points[2 * j] || points[2 * i + 1] - points[2 * j + 1]);
      const e = this.collinear[0], f = this.collinear[this.collinear.length - 1], bounds = [points[2 * e], points[2 * e + 1], points[2 * f], points[2 * f + 1]], r = 1e-8 * Math.hypot(bounds[3] - bounds[1], bounds[2] - bounds[0]);
      for (let i = 0, n = points.length / 2; i < n; ++i) {
        const p = jitter(points[2 * i], points[2 * i + 1], r);
        points[2 * i] = p[0];
        points[2 * i + 1] = p[1];
      }
      this._delaunator = new Delaunator(points);
    } else {
      delete this.collinear;
    }
    const halfedges = this.halfedges = this._delaunator.halfedges;
    const hull = this.hull = this._delaunator.hull;
    const triangles = this.triangles = this._delaunator.triangles;
    const inedges = this.inedges.fill(-1);
    const hullIndex = this._hullIndex.fill(-1);
    for (let e = 0, n = halfedges.length; e < n; ++e) {
      const p = triangles[e % 3 === 2 ? e - 2 : e + 1];
      if (halfedges[e] === -1 || inedges[p] === -1) inedges[p] = e;
    }
    for (let i = 0, n = hull.length; i < n; ++i) {
      hullIndex[hull[i]] = i;
    }
    if (hull.length <= 2 && hull.length > 0) {
      this.triangles = new Int32Array(3).fill(-1);
      this.halfedges = new Int32Array(3).fill(-1);
      this.triangles[0] = hull[0];
      inedges[hull[0]] = 1;
      if (hull.length === 2) {
        inedges[hull[1]] = 0;
        this.triangles[1] = hull[1];
        this.triangles[2] = hull[1];
      }
    }
  }
  voronoi(bounds) {
    return new Voronoi(this, bounds);
  }
  *neighbors(i) {
    const { inedges, hull, _hullIndex, halfedges, triangles, collinear: collinear2 } = this;
    if (collinear2) {
      const l = collinear2.indexOf(i);
      if (l > 0) yield collinear2[l - 1];
      if (l < collinear2.length - 1) yield collinear2[l + 1];
      return;
    }
    const e0 = inedges[i];
    if (e0 === -1) return;
    let e = e0, p0 = -1;
    do {
      yield p0 = triangles[e];
      e = e % 3 === 2 ? e - 2 : e + 1;
      if (triangles[e] !== i) return;
      e = halfedges[e];
      if (e === -1) {
        const p = hull[(_hullIndex[i] + 1) % hull.length];
        if (p !== p0) yield p;
        return;
      }
    } while (e !== e0);
  }
  find(x, y, i = 0) {
    if ((x = +x, x !== x) || (y = +y, y !== y)) return -1;
    const i0 = i;
    let c;
    while ((c = this._step(i, x, y)) >= 0 && c !== i && c !== i0) i = c;
    return c;
  }
  _step(i, x, y) {
    const { inedges, hull, _hullIndex, halfedges, triangles, points } = this;
    if (inedges[i] === -1 || !points.length) return (i + 1) % (points.length >> 1);
    let c = i;
    let dc = pow2(x - points[i * 2], 2) + pow2(y - points[i * 2 + 1], 2);
    const e0 = inedges[i];
    let e = e0;
    do {
      let t = triangles[e];
      const dt = pow2(x - points[t * 2], 2) + pow2(y - points[t * 2 + 1], 2);
      if (dt < dc) dc = dt, c = t;
      e = e % 3 === 2 ? e - 2 : e + 1;
      if (triangles[e] !== i) break;
      e = halfedges[e];
      if (e === -1) {
        e = hull[(_hullIndex[i] + 1) % hull.length];
        if (e !== t) {
          if (pow2(x - points[e * 2], 2) + pow2(y - points[e * 2 + 1], 2) < dc) return e;
        }
        break;
      }
    } while (e !== e0);
    return c;
  }
  render(context) {
    const buffer = context == null ? context = new Path() : void 0;
    const { points, halfedges, triangles } = this;
    for (let i = 0, n = halfedges.length; i < n; ++i) {
      const j = halfedges[i];
      if (j < i) continue;
      const ti = triangles[i] * 2;
      const tj = triangles[j] * 2;
      context.moveTo(points[ti], points[ti + 1]);
      context.lineTo(points[tj], points[tj + 1]);
    }
    this.renderHull(context);
    return buffer && buffer.value();
  }
  renderPoints(context, r) {
    if (r === void 0 && (!context || typeof context.moveTo !== "function")) r = context, context = null;
    r = r == void 0 ? 2 : +r;
    const buffer = context == null ? context = new Path() : void 0;
    const { points } = this;
    for (let i = 0, n = points.length; i < n; i += 2) {
      const x = points[i], y = points[i + 1];
      context.moveTo(x + r, y);
      context.arc(x, y, r, 0, tau);
    }
    return buffer && buffer.value();
  }
  renderHull(context) {
    const buffer = context == null ? context = new Path() : void 0;
    const { hull, points } = this;
    const h = hull[0] * 2, n = hull.length;
    context.moveTo(points[h], points[h + 1]);
    for (let i = 1; i < n; ++i) {
      const h2 = 2 * hull[i];
      context.lineTo(points[h2], points[h2 + 1]);
    }
    context.closePath();
    return buffer && buffer.value();
  }
  hullPolygon() {
    const polygon = new Polygon();
    this.renderHull(polygon);
    return polygon.value();
  }
  renderTriangle(i, context) {
    const buffer = context == null ? context = new Path() : void 0;
    const { points, triangles } = this;
    const t0 = triangles[i *= 3] * 2;
    const t1 = triangles[i + 1] * 2;
    const t2 = triangles[i + 2] * 2;
    context.moveTo(points[t0], points[t0 + 1]);
    context.lineTo(points[t1], points[t1 + 1]);
    context.lineTo(points[t2], points[t2 + 1]);
    context.closePath();
    return buffer && buffer.value();
  }
  *trianglePolygons() {
    const { triangles } = this;
    for (let i = 0, n = triangles.length / 3; i < n; ++i) {
      yield this.trianglePolygon(i);
    }
  }
  trianglePolygon(i) {
    const polygon = new Polygon();
    this.renderTriangle(i, polygon);
    return polygon.value();
  }
};
function flatArray(points, fx, fy, that) {
  const n = points.length;
  const array = new Float64Array(n * 2);
  for (let i = 0; i < n; ++i) {
    const p = points[i];
    array[i * 2] = fx.call(that, p, i, points);
    array[i * 2 + 1] = fy.call(that, p, i, points);
  }
  return array;
}
function* flatIterable(points, fx, fy, that) {
  let i = 0;
  for (const p of points) {
    yield fx.call(that, p, i, points);
    yield fy.call(that, p, i, points);
    ++i;
  }
}

// node_modules/@mui/x-charts/esm/internals/plugins/featurePlugins/useChartVoronoi/useChartVoronoi.js
var useChartVoronoi = ({
  svgRef,
  params,
  store,
  instance
}) => {
  var _a;
  const {
    disableVoronoi,
    voronoiMaxRadius,
    onItemClick
  } = params;
  const drawingArea = useSelector(store, selectorChartDrawingArea);
  const {
    axis: xAxis,
    axisIds: xAxisIds
  } = useSelector(store, selectorChartXAxis);
  const {
    axis: yAxis,
    axisIds: yAxisIds
  } = useSelector(store, selectorChartYAxis);
  const zoomIsInteracting = useSelector(store, selectorChartZoomIsInteracting);
  const {
    series,
    seriesOrder
  } = ((_a = useSelector(store, selectorChartSeriesProcessed)) == null ? void 0 : _a.scatter) ?? {};
  const voronoiRef = React63.useRef({});
  const delauneyRef = React63.useRef(void 0);
  const lastFind = React63.useRef(void 0);
  const defaultXAxisId = xAxisIds[0];
  const defaultYAxisId = yAxisIds[0];
  useEnhancedEffect_default(() => {
    store.update((prev) => prev.voronoi.isVoronoiEnabled === !disableVoronoi ? prev : _extends({}, prev, {
      voronoi: {
        isVoronoiEnabled: !disableVoronoi
      }
    }));
  }, [store, disableVoronoi]);
  useEnhancedEffect_default(() => {
    if (zoomIsInteracting || seriesOrder === void 0 || series === void 0 || disableVoronoi) {
      return;
    }
    voronoiRef.current = {};
    let points = [];
    seriesOrder.forEach((seriesId) => {
      const {
        data,
        xAxisId,
        yAxisId
      } = series[seriesId];
      const xScale = xAxis[xAxisId ?? defaultXAxisId].scale;
      const yScale = yAxis[yAxisId ?? defaultYAxisId].scale;
      const getXPosition = getValueToPositionMapper(xScale);
      const getYPosition = getValueToPositionMapper(yScale);
      const seriesPoints = data.flatMap(({
        x,
        y
      }) => {
        const pointX2 = getXPosition(x);
        const pointY2 = getYPosition(y);
        if (!instance.isPointInside(pointX2, pointY2)) {
          return [-drawingArea.width, -drawingArea.height];
        }
        return [pointX2, pointY2];
      });
      voronoiRef.current[seriesId] = {
        seriesId,
        startIndex: points.length,
        endIndex: points.length + seriesPoints.length
      };
      points = points.concat(seriesPoints);
    });
    delauneyRef.current = new Delaunay(points);
    lastFind.current = void 0;
  }, [zoomIsInteracting, defaultXAxisId, defaultYAxisId, series, seriesOrder, xAxis, yAxis, drawingArea, instance, disableVoronoi]);
  React63.useEffect(() => {
    if (svgRef.current === null || disableVoronoi) {
      return void 0;
    }
    const element = svgRef.current;
    function getClosestPoint(event) {
      const svgPoint = getSVGPoint(element, event);
      if (!instance.isPointInside(svgPoint.x, svgPoint.y)) {
        lastFind.current = void 0;
        return "outside-chart";
      }
      if (!delauneyRef.current) {
        return "no-point-found";
      }
      const closestPointIndex = delauneyRef.current.find(svgPoint.x, svgPoint.y, lastFind.current);
      if (closestPointIndex === void 0) {
        return "no-point-found";
      }
      lastFind.current = closestPointIndex;
      const closestSeries = Object.values(voronoiRef.current).find((value) => {
        return 2 * closestPointIndex >= value.startIndex && 2 * closestPointIndex < value.endIndex;
      });
      if (closestSeries === void 0) {
        return "no-point-found";
      }
      const dataIndex = (2 * closestPointIndex - voronoiRef.current[closestSeries.seriesId].startIndex) / 2;
      if (voronoiMaxRadius !== void 0) {
        const pointX2 = delauneyRef.current.points[2 * closestPointIndex];
        const pointY2 = delauneyRef.current.points[2 * closestPointIndex + 1];
        const dist2 = (pointX2 - svgPoint.x) ** 2 + (pointY2 - svgPoint.y) ** 2;
        if (dist2 > voronoiMaxRadius ** 2) {
          return "outside-voronoi-max-radius";
        }
      }
      return {
        seriesId: closestSeries.seriesId,
        dataIndex
      };
    }
    const handleMouseLeave = () => {
      var _a2, _b;
      (_a2 = instance.cleanInteraction) == null ? void 0 : _a2.call(instance);
      (_b = instance.clearHighlight) == null ? void 0 : _b.call(instance);
    };
    const handleMouseMove = (event) => {
      var _a2, _b, _c, _d, _e, _f;
      const closestPoint = getClosestPoint(event);
      if (closestPoint === "outside-chart") {
        (_a2 = instance.cleanInteraction) == null ? void 0 : _a2.call(instance);
        (_b = instance.clearHighlight) == null ? void 0 : _b.call(instance);
        return;
      }
      if (closestPoint === "outside-voronoi-max-radius" || closestPoint === "no-point-found") {
        (_c = instance.removeItemInteraction) == null ? void 0 : _c.call(instance);
        (_d = instance.clearHighlight) == null ? void 0 : _d.call(instance);
        return;
      }
      const {
        seriesId,
        dataIndex
      } = closestPoint;
      (_e = instance.setItemInteraction) == null ? void 0 : _e.call(instance, {
        type: "scatter",
        seriesId,
        dataIndex
      });
      (_f = instance.setHighlight) == null ? void 0 : _f.call(instance, {
        seriesId,
        dataIndex
      });
    };
    const handleMouseClick = (event) => {
      if (!onItemClick) {
        return;
      }
      const closestPoint = getClosestPoint(event);
      if (typeof closestPoint === "string") {
        return;
      }
      const {
        seriesId,
        dataIndex
      } = closestPoint;
      onItemClick(event, {
        type: "scatter",
        seriesId,
        dataIndex
      });
    };
    element.addEventListener("pointerleave", handleMouseLeave);
    element.addEventListener("pointermove", handleMouseMove);
    element.addEventListener("click", handleMouseClick);
    return () => {
      element.removeEventListener("pointerleave", handleMouseLeave);
      element.removeEventListener("pointermove", handleMouseMove);
      element.removeEventListener("click", handleMouseClick);
    };
  }, [svgRef, yAxis, xAxis, voronoiMaxRadius, onItemClick, disableVoronoi, drawingArea, instance]);
  const enableVoronoiCallback = useEventCallback_default(() => {
    store.update((prev) => _extends({}, prev, {
      voronoi: _extends({}, prev.voronoi, {
        isVoronoiEnabled: true
      })
    }));
  });
  const disableVoronoiCallback = useEventCallback_default(() => {
    store.update((prev) => _extends({}, prev, {
      voronoi: _extends({}, prev.voronoi, {
        isVoronoiEnabled: false
      })
    }));
  });
  return {
    instance: {
      enableVoronoi: enableVoronoiCallback,
      disableVoronoi: disableVoronoiCallback
    }
  };
};
useChartVoronoi.getDefaultizedParams = ({
  params
}) => _extends({}, params, {
  disableVoronoi: params.disableVoronoi ?? !params.series.some((item) => item.type === "scatter")
});
useChartVoronoi.getInitialState = (params) => ({
  voronoi: {
    isVoronoiEnabled: !params.disableVoronoi
  }
});
useChartVoronoi.params = {
  disableVoronoi: true,
  voronoiMaxRadius: true,
  onItemClick: true
};

// node_modules/@mui/x-charts/esm/internals/plugins/featurePlugins/useChartVoronoi/useChartVoronoi.selectors.js
var selectVoronoi = (state) => state.voronoi;
var selectorChartsVoronoiIsVoronoiEnabled = createSelector([selectVoronoi], (voronoi) => voronoi == null ? void 0 : voronoi.isVoronoiEnabled);

// node_modules/@mui/x-charts/esm/internals/plugins/allPlugins.js
var DEFAULT_PLUGINS = [useChartZAxis, useChartCartesianAxis, useChartInteraction, useChartHighlight, useChartVoronoi];

// node_modules/@mui/x-charts/esm/ChartContainer/useChartContainerProps.js
var _excluded31 = ["width", "height", "margin", "children", "series", "colors", "dataset", "desc", "onAxisClick", "disableVoronoi", "voronoiMaxRadius", "onItemClick", "disableAxisListener", "highlightedItem", "onHighlightChange", "sx", "title", "xAxis", "yAxis", "zAxis", "rotationAxis", "radiusAxis", "skipAnimation", "seriesConfig", "plugins", "localeText", "slots", "slotProps"];
var useChartContainerProps = (props, ref) => {
  const _ref = props, {
    width,
    height,
    margin,
    children,
    series,
    colors,
    dataset,
    desc,
    onAxisClick,
    disableVoronoi,
    voronoiMaxRadius,
    onItemClick,
    disableAxisListener,
    highlightedItem,
    onHighlightChange,
    sx,
    title,
    xAxis,
    yAxis,
    zAxis,
    rotationAxis,
    radiusAxis,
    skipAnimation,
    seriesConfig: seriesConfig5,
    plugins,
    localeText,
    slots,
    slotProps
  } = _ref, other = _objectWithoutPropertiesLoose(_ref, _excluded31);
  const chartsSurfaceProps = _extends({
    title,
    desc,
    sx,
    ref
  }, other);
  const chartDataProviderProps = {
    margin,
    series,
    colors,
    dataset,
    disableAxisListener,
    highlightedItem,
    onHighlightChange,
    onAxisClick,
    disableVoronoi,
    voronoiMaxRadius,
    onItemClick,
    xAxis,
    yAxis,
    zAxis,
    rotationAxis,
    radiusAxis,
    skipAnimation,
    width,
    height,
    localeText,
    seriesConfig: seriesConfig5,
    plugins: plugins ?? DEFAULT_PLUGINS,
    slots,
    slotProps
  };
  return {
    chartDataProviderProps,
    chartsSurfaceProps,
    children
  };
};

// node_modules/@mui/x-charts/esm/ChartDataProvider/ChartDataProvider.js
var React65 = __toESM(require_react(), 1);
var import_prop_types30 = __toESM(require_prop_types(), 1);

// node_modules/@mui/x-charts/esm/internals/material/index.js
var baseSlots = {
  baseButton: Button_default,
  baseIconButton: IconButton_default
};
var iconSlots = {};
var defaultSlotsMaterial = _extends({}, baseSlots, iconSlots);

// node_modules/@mui/x-charts/esm/context/ChartsSlotsContext.js
var React64 = __toESM(require_react(), 1);
var import_jsx_runtime41 = __toESM(require_jsx_runtime(), 1);
var ChartsSlotsContext = React64.createContext(null);
if (true) ChartsSlotsContext.displayName = "ChartsSlotsContext";
function ChartsSlotsProvider(props) {
  const {
    slots,
    slotProps = {},
    defaultSlots,
    children
  } = props;
  const value = React64.useMemo(() => ({
    slots: _extends({}, defaultSlots, slots),
    slotProps
  }), [defaultSlots, slots, slotProps]);
  return (0, import_jsx_runtime41.jsx)(ChartsSlotsContext.Provider, {
    value,
    children
  });
}

// node_modules/@mui/x-charts/esm/ChartDataProvider/useChartDataProviderProps.js
var _excluded32 = ["children", "localeText", "plugins", "seriesConfig", "slots", "slotProps"];
var useChartDataProviderProps = (props) => {
  const {
    children,
    localeText,
    plugins = DEFAULT_PLUGINS,
    seriesConfig: seriesConfig5,
    slots,
    slotProps
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded32);
  const theme = useTheme();
  const chartProviderProps = {
    plugins,
    seriesConfig: seriesConfig5,
    pluginParams: _extends({
      theme: theme.palette.mode
    }, other)
  };
  return {
    children,
    localeText,
    chartProviderProps,
    slots,
    slotProps
  };
};

// node_modules/@mui/x-charts/esm/ChartDataProvider/ChartDataProvider.js
var import_jsx_runtime42 = __toESM(require_jsx_runtime(), 1);
function ChartDataProvider(props) {
  const {
    children,
    localeText,
    chartProviderProps,
    slots,
    slotProps
  } = useChartDataProviderProps(props);
  return (0, import_jsx_runtime42.jsx)(ChartProvider, _extends({}, chartProviderProps, {
    children: (0, import_jsx_runtime42.jsx)(ChartsLocalizationProvider, {
      localeText,
      children: (0, import_jsx_runtime42.jsx)(ChartsSlotsProvider, {
        slots,
        slotProps,
        defaultSlots: defaultSlotsMaterial,
        children
      })
    })
  }));
}
true ? ChartDataProvider.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "pnpm proptypes"  |
  // ----------------------------------------------------------------------
  apiRef: import_prop_types30.default.shape({
    current: import_prop_types30.default.any
  }),
  /**
   * Color palette used to colorize multiple series.
   * @default rainbowSurgePalette
   */
  colors: import_prop_types30.default.oneOfType([import_prop_types30.default.arrayOf(import_prop_types30.default.string), import_prop_types30.default.func]),
  /**
   * An array of objects that can be used to populate series and axes data using their `dataKey` property.
   */
  dataset: import_prop_types30.default.arrayOf(import_prop_types30.default.object),
  /**
   * The height of the chart in px. If not defined, it takes the height of the parent element.
   */
  height: import_prop_types30.default.number,
  /**
   * This prop is used to help implement the accessibility logic.
   * If you don't provide this prop. It falls back to a randomly generated id.
   */
  id: import_prop_types30.default.string,
  /**
   * Localized text for chart components.
   */
  localeText: import_prop_types30.default.object,
  /**
   * The margin between the SVG and the drawing area.
   * It's used for leaving some space for extra information such as the x- and y-axis or legend.
   *
   * Accepts a `number` to be used on all sides or an object with the optional properties: `top`, `bottom`, `left`, and `right`.
   */
  margin: import_prop_types30.default.oneOfType([import_prop_types30.default.number, import_prop_types30.default.shape({
    bottom: import_prop_types30.default.number,
    left: import_prop_types30.default.number,
    right: import_prop_types30.default.number,
    top: import_prop_types30.default.number
  })]),
  /**
   * The array of series to display.
   * Each type of series has its own specificity.
   * Please refer to the appropriate docs page to learn more about it.
   */
  series: import_prop_types30.default.arrayOf(import_prop_types30.default.object),
  /**
   * If `true`, animations are skipped.
   * If unset or `false`, the animations respects the user's `prefers-reduced-motion` setting.
   */
  skipAnimation: import_prop_types30.default.bool,
  /**
   * The props for the slots.
   */
  slotProps: import_prop_types30.default.object,
  /**
   * Slots to customize charts' components.
   */
  slots: import_prop_types30.default.object,
  theme: import_prop_types30.default.oneOf(["dark", "light"]),
  /**
   * The width of the chart in px. If not defined, it takes the width of the parent element.
   */
  width: import_prop_types30.default.number
} : void 0;

// node_modules/@mui/x-charts/esm/ChartsSurface/ChartsSurface.js
var import_prop_types31 = __toESM(require_prop_types(), 1);
var React70 = __toESM(require_react(), 1);

// node_modules/@mui/x-charts/esm/internals/components/ChartsAxesGradients/ChartsAxesGradients.js
var React69 = __toESM(require_react(), 1);

// node_modules/@mui/x-charts/esm/internals/components/ChartsAxesGradients/ChartsPiecewiseGradient.js
var React66 = __toESM(require_react(), 1);
var import_jsx_runtime43 = __toESM(require_jsx_runtime(), 1);
function ChartsPiecewiseGradient(props) {
  const {
    isReversed,
    gradientId,
    size,
    direction,
    scale: scale2,
    colorMap
  } = props;
  if (size <= 0) {
    return null;
  }
  return (0, import_jsx_runtime43.jsx)("linearGradient", {
    id: gradientId,
    x1: "0",
    x2: "0",
    y1: "0",
    y2: "0",
    [`${direction}${isReversed ? 1 : 2}`]: `${size}px`,
    gradientUnits: "userSpaceOnUse",
    children: colorMap.thresholds.map((threshold2, index) => {
      const x = scale2(threshold2);
      if (x === void 0) {
        return null;
      }
      const offset = isReversed ? 1 - x / size : x / size;
      if (Number.isNaN(offset)) {
        return null;
      }
      return (0, import_jsx_runtime43.jsxs)(React66.Fragment, {
        children: [(0, import_jsx_runtime43.jsx)("stop", {
          offset,
          stopColor: colorMap.colors[index],
          stopOpacity: 1
        }), (0, import_jsx_runtime43.jsx)("stop", {
          offset,
          stopColor: colorMap.colors[index + 1],
          stopOpacity: 1
        })]
      }, threshold2.toString() + index);
    })
  });
}

// node_modules/@mui/x-charts/esm/internals/components/ChartsAxesGradients/ChartsContinuousGradient.js
var React67 = __toESM(require_react(), 1);
var import_jsx_runtime44 = __toESM(require_jsx_runtime(), 1);
var PX_PRECISION = 10;
function ChartsContinuousGradient(props) {
  const {
    gradientUnits,
    isReversed,
    gradientId,
    size,
    direction,
    scale: scale2,
    colorScale,
    colorMap
  } = props;
  const extremumValues = [colorMap.min ?? 0, colorMap.max ?? 100];
  const extremumPositions = extremumValues.map(scale2).filter((p) => p !== void 0);
  if (extremumPositions.length !== 2) {
    return null;
  }
  const interpolator = typeof extremumValues[0] === "number" ? number_default(extremumValues[0], extremumValues[1]) : date_default(extremumValues[0], extremumValues[1]);
  const numberOfPoints = Math.round((Math.max(...extremumPositions) - Math.min(...extremumPositions)) / PX_PRECISION);
  const keyPrefix = `${extremumValues[0]}-${extremumValues[1]}-`;
  return (0, import_jsx_runtime44.jsx)("linearGradient", {
    id: gradientId,
    x1: "0",
    x2: "0",
    y1: "0",
    y2: "0",
    [`${direction}${isReversed ? 1 : 2}`]: gradientUnits === "objectBoundingBox" ? 1 : `${size}px`,
    gradientUnits: gradientUnits ?? "userSpaceOnUse",
    children: Array.from({
      length: numberOfPoints + 1
    }, (_, index) => {
      const value = interpolator(index / numberOfPoints);
      if (value === void 0) {
        return null;
      }
      const x = scale2(value);
      if (x === void 0) {
        return null;
      }
      const offset = isReversed ? 1 - x / size : x / size;
      const color = colorScale(value);
      if (color === null) {
        return null;
      }
      return (0, import_jsx_runtime44.jsx)("stop", {
        offset,
        stopColor: color,
        stopOpacity: 1
      }, keyPrefix + index);
    })
  });
}

// node_modules/@mui/x-charts/esm/internals/components/ChartsAxesGradients/ChartsContinuousGradientObjectBound.js
var React68 = __toESM(require_react(), 1);
var import_jsx_runtime45 = __toESM(require_jsx_runtime(), 1);
var PX_PRECISION2 = 10;
var getDirection = (isReversed) => {
  if (isReversed) {
    return {
      x1: "1",
      x2: "0",
      y1: "0",
      y2: "0"
    };
  }
  return {
    x1: "0",
    x2: "1",
    y1: "0",
    y2: "0"
  };
};
function ChartsContinuousGradientObjectBound(props) {
  const {
    isReversed,
    gradientId,
    colorScale,
    colorMap
  } = props;
  const extremumValues = [colorMap.min ?? 0, colorMap.max ?? 100];
  const interpolator = typeof extremumValues[0] === "number" ? number_default(extremumValues[0], extremumValues[1]) : date_default(extremumValues[0], extremumValues[1]);
  const numberOfPoints = PX_PRECISION2;
  const keyPrefix = `${extremumValues[0]}-${extremumValues[1]}-`;
  return (0, import_jsx_runtime45.jsx)("linearGradient", _extends({
    id: gradientId
  }, getDirection(isReversed), {
    gradientUnits: "objectBoundingBox",
    children: Array.from({
      length: numberOfPoints + 1
    }, (_, index) => {
      const offset = index / numberOfPoints;
      const value = interpolator(offset);
      if (value === void 0) {
        return null;
      }
      const color = colorScale(value);
      if (color === null) {
        return null;
      }
      return (0, import_jsx_runtime45.jsx)("stop", {
        offset,
        stopColor: color,
        stopOpacity: 1
      }, keyPrefix + index);
    })
  }));
}

// node_modules/@mui/x-charts/esm/internals/components/ChartsAxesGradients/ChartsAxesGradients.js
var import_jsx_runtime46 = __toESM(require_jsx_runtime(), 1);
function ChartsAxesGradients() {
  const {
    top,
    height,
    bottom,
    left,
    width,
    right
  } = useDrawingArea();
  const svgHeight = top + height + bottom;
  const svgWidth = left + width + right;
  const getGradientId = useChartGradientIdBuilder();
  const getObjectBoundGradientId = useChartGradientIdObjectBoundBuilder();
  const {
    xAxis,
    xAxisIds
  } = useXAxes();
  const {
    yAxis,
    yAxisIds
  } = useYAxes();
  const {
    zAxis,
    zAxisIds
  } = useZAxes();
  const filteredYAxisIds = yAxisIds.filter((axisId) => yAxis[axisId].colorMap !== void 0);
  const filteredXAxisIds = xAxisIds.filter((axisId) => xAxis[axisId].colorMap !== void 0);
  const filteredZAxisIds = zAxisIds.filter((axisId) => zAxis[axisId].colorMap !== void 0);
  if (filteredYAxisIds.length === 0 && filteredXAxisIds.length === 0 && filteredZAxisIds.length === 0) {
    return null;
  }
  return (0, import_jsx_runtime46.jsxs)("defs", {
    children: [filteredYAxisIds.map((axisId) => {
      const gradientId = getGradientId(axisId);
      const objectBoundGradientId = getObjectBoundGradientId(axisId);
      const {
        colorMap,
        scale: scale2,
        colorScale,
        reverse
      } = yAxis[axisId];
      if ((colorMap == null ? void 0 : colorMap.type) === "piecewise") {
        return (0, import_jsx_runtime46.jsx)(ChartsPiecewiseGradient, {
          isReversed: !reverse,
          scale: scale2,
          colorMap,
          size: svgHeight,
          gradientId,
          direction: "y"
        }, gradientId);
      }
      if ((colorMap == null ? void 0 : colorMap.type) === "continuous") {
        return (0, import_jsx_runtime46.jsxs)(React69.Fragment, {
          children: [(0, import_jsx_runtime46.jsx)(ChartsContinuousGradient, {
            isReversed: !reverse,
            scale: scale2,
            colorScale,
            colorMap,
            size: svgHeight,
            gradientId,
            direction: "y"
          }), (0, import_jsx_runtime46.jsx)(ChartsContinuousGradientObjectBound, {
            isReversed: reverse,
            colorScale,
            colorMap,
            gradientId: objectBoundGradientId
          })]
        }, gradientId);
      }
      return null;
    }), filteredXAxisIds.map((axisId) => {
      const gradientId = getGradientId(axisId);
      const objectBoundGradientId = getObjectBoundGradientId(axisId);
      const {
        colorMap,
        scale: scale2,
        reverse,
        colorScale
      } = xAxis[axisId];
      if ((colorMap == null ? void 0 : colorMap.type) === "piecewise") {
        return (0, import_jsx_runtime46.jsx)(ChartsPiecewiseGradient, {
          isReversed: reverse,
          scale: scale2,
          colorMap,
          size: svgWidth,
          gradientId,
          direction: "x"
        }, gradientId);
      }
      if ((colorMap == null ? void 0 : colorMap.type) === "continuous") {
        return (0, import_jsx_runtime46.jsxs)(React69.Fragment, {
          children: [(0, import_jsx_runtime46.jsx)(ChartsContinuousGradient, {
            isReversed: reverse,
            scale: scale2,
            colorScale,
            colorMap,
            size: svgWidth,
            gradientId,
            direction: "x"
          }), (0, import_jsx_runtime46.jsx)(ChartsContinuousGradientObjectBound, {
            isReversed: reverse,
            colorScale,
            colorMap,
            gradientId: objectBoundGradientId
          })]
        }, gradientId);
      }
      return null;
    }), filteredZAxisIds.map((axisId) => {
      const objectBoundGradientId = getObjectBoundGradientId(axisId);
      const {
        colorMap,
        colorScale
      } = zAxis[axisId];
      if ((colorMap == null ? void 0 : colorMap.type) === "continuous") {
        return (0, import_jsx_runtime46.jsx)(ChartsContinuousGradientObjectBound, {
          colorScale,
          colorMap,
          gradientId: objectBoundGradientId
        }, objectBoundGradientId);
      }
      return null;
    })]
  });
}

// node_modules/@mui/x-charts/esm/ChartsSurface/ChartsSurface.js
var import_jsx_runtime47 = __toESM(require_jsx_runtime(), 1);
var _excluded33 = ["children", "className", "title", "desc"];
var ChartsSurfaceStyles = styled_default("svg", {
  name: "MuiChartsSurface",
  slot: "Root"
})(({
  ownerState
}) => ({
  width: ownerState.width ?? "100%",
  height: ownerState.height ?? "100%",
  display: "flex",
  position: "relative",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  overflow: "hidden",
  // This prevents default touch actions when using the svg on mobile devices.
  // For example, prevent page scroll & zoom.
  touchAction: "none"
}));
var ChartsSurface = React70.forwardRef(function ChartsSurface2(inProps, ref) {
  const store = useStore();
  const {
    width: svgWidth,
    height: svgHeight
  } = useSelector(store, selectorChartContainerSize);
  const {
    width: propsWidth,
    height: propsHeight
  } = useSelector(store, selectorChartPropsSize);
  const svgRef = useSvgRef();
  const handleRef = useForkRef(svgRef, ref);
  const themeProps = useThemeProps({
    props: inProps,
    name: "MuiChartsSurface"
  });
  const {
    children,
    className,
    title,
    desc
  } = themeProps, other = _objectWithoutPropertiesLoose(themeProps, _excluded33);
  const hasIntrinsicSize = svgHeight > 0 && svgWidth > 0;
  return (0, import_jsx_runtime47.jsxs)(ChartsSurfaceStyles, _extends({
    ownerState: {
      width: propsWidth,
      height: propsHeight
    },
    viewBox: `${0} ${0} ${svgWidth} ${svgHeight}`,
    className
  }, other, {
    ref: handleRef,
    children: [title && (0, import_jsx_runtime47.jsx)("title", {
      children: title
    }), desc && (0, import_jsx_runtime47.jsx)("desc", {
      children: desc
    }), (0, import_jsx_runtime47.jsx)(ChartsAxesGradients, {}), hasIntrinsicSize && children]
  }));
});
if (true) ChartsSurface.displayName = "ChartsSurface";
true ? ChartsSurface.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "pnpm proptypes"  |
  // ----------------------------------------------------------------------
  children: import_prop_types31.default.node,
  className: import_prop_types31.default.string,
  desc: import_prop_types31.default.string,
  sx: import_prop_types31.default.oneOfType([import_prop_types31.default.arrayOf(import_prop_types31.default.oneOfType([import_prop_types31.default.func, import_prop_types31.default.object, import_prop_types31.default.bool])), import_prop_types31.default.func, import_prop_types31.default.object]),
  title: import_prop_types31.default.string
} : void 0;

// node_modules/@mui/x-charts/esm/internals/components/ChartsWrapper/ChartsWrapper.js
var React71 = __toESM(require_react(), 1);
var import_jsx_runtime48 = __toESM(require_jsx_runtime(), 1);
var getDirection2 = (direction, position) => {
  if (direction === "vertical") {
    if ((position == null ? void 0 : position.horizontal) === "start") {
      return "row";
    }
    return "row-reverse";
  }
  if ((position == null ? void 0 : position.vertical) === "bottom") {
    return "column-reverse";
  }
  return "column";
};
var getAlign = (direction, position) => {
  if (direction === "vertical") {
    if ((position == null ? void 0 : position.vertical) === "top") {
      return "flex-start";
    }
    if ((position == null ? void 0 : position.vertical) === "bottom") {
      return "flex-end";
    }
  }
  if (direction === "horizontal") {
    if ((position == null ? void 0 : position.horizontal) === "start") {
      return "flex-start";
    }
    if ((position == null ? void 0 : position.horizontal) === "end") {
      return "flex-end";
    }
  }
  return "center";
};
var Root3 = styled_default("div", {
  name: "MuiChartsWrapper",
  slot: "Root",
  shouldForwardProp: (prop) => shouldForwardProp(prop) && prop !== "extendVertically"
})(({
  ownerState
}) => ({
  display: "flex",
  flexDirection: getDirection2(ownerState.legendDirection, ownerState.legendPosition),
  flex: 1,
  justifyContent: "center",
  alignItems: getAlign(ownerState.legendDirection, ownerState.legendPosition),
  variants: [{
    props: {
      extendVertically: true
    },
    style: {
      height: "100%"
    }
  }]
}));
function ChartsWrapper(props) {
  const {
    children,
    sx,
    extendVertically
  } = props;
  const chartRootRef = useChartRootRef();
  const store = useStore();
  const {
    height: propsHeight
  } = useSelector(store, selectorChartPropsSize);
  return (0, import_jsx_runtime48.jsx)(Root3, {
    ref: chartRootRef,
    ownerState: props,
    sx,
    extendVertically: extendVertically ?? propsHeight === void 0,
    children
  });
}

// node_modules/@mui/x-charts/esm/LineChart/LineChart.js
var import_jsx_runtime49 = __toESM(require_jsx_runtime(), 1);
var LineChart = React72.forwardRef(function LineChart2(inProps, ref) {
  var _a, _b, _c, _d;
  const props = useThemeProps({
    props: inProps,
    name: "MuiLineChart"
  });
  const {
    chartsWrapperProps,
    chartContainerProps,
    gridProps,
    clipPathProps,
    clipPathGroupProps,
    areaPlotProps,
    linePlotProps,
    markPlotProps,
    overlayProps,
    chartsAxisProps,
    axisHighlightProps,
    lineHighlightPlotProps,
    legendProps,
    children
  } = useLineChartProps(props);
  const {
    chartDataProviderProps,
    chartsSurfaceProps
  } = useChartContainerProps(chartContainerProps, ref);
  const Tooltip = ((_a = props.slots) == null ? void 0 : _a.tooltip) ?? ChartsTooltip;
  const Toolbar = (_b = props.slots) == null ? void 0 : _b.toolbar;
  return (0, import_jsx_runtime49.jsx)(ChartDataProvider, _extends({}, chartDataProviderProps, {
    children: (0, import_jsx_runtime49.jsxs)(ChartsWrapper, _extends({}, chartsWrapperProps, {
      children: [props.showToolbar && Toolbar ? (0, import_jsx_runtime49.jsx)(Toolbar, _extends({}, (_c = props.slotProps) == null ? void 0 : _c.toolbar)) : null, !props.hideLegend && (0, import_jsx_runtime49.jsx)(ChartsLegend, _extends({}, legendProps)), (0, import_jsx_runtime49.jsxs)(ChartsSurface, _extends({}, chartsSurfaceProps, {
        children: [(0, import_jsx_runtime49.jsx)(ChartsGrid, _extends({}, gridProps)), (0, import_jsx_runtime49.jsxs)("g", _extends({}, clipPathGroupProps, {
          children: [(0, import_jsx_runtime49.jsx)(AreaPlot, _extends({}, areaPlotProps)), (0, import_jsx_runtime49.jsx)(LinePlot, _extends({}, linePlotProps)), (0, import_jsx_runtime49.jsx)(ChartsOverlay, _extends({}, overlayProps)), (0, import_jsx_runtime49.jsx)(ChartsAxisHighlight, _extends({}, axisHighlightProps))]
        })), (0, import_jsx_runtime49.jsx)(ChartsAxis, _extends({}, chartsAxisProps)), (0, import_jsx_runtime49.jsx)("g", {
          "data-drawing-container": true,
          children: (0, import_jsx_runtime49.jsx)(MarkPlot, _extends({}, markPlotProps))
        }), (0, import_jsx_runtime49.jsx)(LineHighlightPlot, _extends({}, lineHighlightPlotProps)), (0, import_jsx_runtime49.jsx)(ChartsClipPath, _extends({}, clipPathProps)), children]
      })), !props.loading && (0, import_jsx_runtime49.jsx)(Tooltip, _extends({}, (_d = props.slotProps) == null ? void 0 : _d.tooltip))]
    }))
  }));
});
if (true) LineChart.displayName = "LineChart";
true ? LineChart.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "pnpm proptypes"  |
  // ----------------------------------------------------------------------
  apiRef: import_prop_types32.default.shape({
    current: import_prop_types32.default.object
  }),
  /**
   * The configuration of axes highlight.
   * @see See {@link https://mui.com/x/react-charts/highlighting/ highlighting docs} for more details.
   * @default { x: 'line' }
   */
  axisHighlight: import_prop_types32.default.shape({
    x: import_prop_types32.default.oneOf(["band", "line", "none"]),
    y: import_prop_types32.default.oneOf(["band", "line", "none"])
  }),
  children: import_prop_types32.default.node,
  className: import_prop_types32.default.string,
  /**
   * Color palette used to colorize multiple series.
   * @default rainbowSurgePalette
   */
  colors: import_prop_types32.default.oneOfType([import_prop_types32.default.arrayOf(import_prop_types32.default.string), import_prop_types32.default.func]),
  /**
   * An array of objects that can be used to populate series and axes data using their `dataKey` property.
   */
  dataset: import_prop_types32.default.arrayOf(import_prop_types32.default.object),
  desc: import_prop_types32.default.string,
  /**
   * If `true`, the charts will not listen to the mouse move event.
   * It might break interactive features, but will improve performance.
   * @default false
   */
  disableAxisListener: import_prop_types32.default.bool,
  /**
   * If `true`, render the line highlight item.
   */
  disableLineItemHighlight: import_prop_types32.default.bool,
  /**
   * Option to display a cartesian grid in the background.
   */
  grid: import_prop_types32.default.shape({
    horizontal: import_prop_types32.default.bool,
    vertical: import_prop_types32.default.bool
  }),
  /**
   * The height of the chart in px. If not defined, it takes the height of the parent element.
   */
  height: import_prop_types32.default.number,
  /**
   * If `true`, the legend is not rendered.
   */
  hideLegend: import_prop_types32.default.bool,
  /**
   * The highlighted item.
   * Used when the highlight is controlled.
   */
  highlightedItem: import_prop_types32.default.shape({
    dataIndex: import_prop_types32.default.number,
    seriesId: import_prop_types32.default.oneOfType([import_prop_types32.default.number, import_prop_types32.default.string]).isRequired
  }),
  /**
   * This prop is used to help implement the accessibility logic.
   * If you don't provide this prop. It falls back to a randomly generated id.
   */
  id: import_prop_types32.default.string,
  /**
   * If `true`, a loading overlay is displayed.
   * @default false
   */
  loading: import_prop_types32.default.bool,
  /**
   * Localized text for chart components.
   */
  localeText: import_prop_types32.default.object,
  /**
   * The margin between the SVG and the drawing area.
   * It's used for leaving some space for extra information such as the x- and y-axis or legend.
   *
   * Accepts a `number` to be used on all sides or an object with the optional properties: `top`, `bottom`, `left`, and `right`.
   */
  margin: import_prop_types32.default.oneOfType([import_prop_types32.default.number, import_prop_types32.default.shape({
    bottom: import_prop_types32.default.number,
    left: import_prop_types32.default.number,
    right: import_prop_types32.default.number,
    top: import_prop_types32.default.number
  })]),
  /**
   * Callback fired when an area element is clicked.
   */
  onAreaClick: import_prop_types32.default.func,
  /**
   * The function called for onClick events.
   * The second argument contains information about all line/bar elements at the current mouse position.
   * @param {MouseEvent} event The mouse event recorded on the `<svg/>` element.
   * @param {null | ChartsAxisData} data The data about the clicked axis and items associated with it.
   */
  onAxisClick: import_prop_types32.default.func,
  /**
   * The callback fired when the highlighted item changes.
   *
   * @param {HighlightItemData | null} highlightedItem  The newly highlighted item.
   */
  onHighlightChange: import_prop_types32.default.func,
  /**
   * Callback fired when a line element is clicked.
   */
  onLineClick: import_prop_types32.default.func,
  /**
   * Callback fired when a mark element is clicked.
   */
  onMarkClick: import_prop_types32.default.func,
  /**
   * The series to display in the line chart.
   * An array of [[LineSeriesType]] objects.
   */
  series: import_prop_types32.default.arrayOf(import_prop_types32.default.object).isRequired,
  /**
   * If true, shows the default chart toolbar.
   * @default false
   */
  showToolbar: import_prop_types32.default.bool,
  /**
   * If `true`, animations are skipped.
   * @default false
   */
  skipAnimation: import_prop_types32.default.bool,
  /**
   * The props used for each component slot.
   * @default {}
   */
  slotProps: import_prop_types32.default.object,
  /**
   * Overridable component slots.
   * @default {}
   */
  slots: import_prop_types32.default.object,
  sx: import_prop_types32.default.oneOfType([import_prop_types32.default.arrayOf(import_prop_types32.default.oneOfType([import_prop_types32.default.func, import_prop_types32.default.object, import_prop_types32.default.bool])), import_prop_types32.default.func, import_prop_types32.default.object]),
  theme: import_prop_types32.default.oneOf(["dark", "light"]),
  title: import_prop_types32.default.string,
  /**
   * The width of the chart in px. If not defined, it takes the width of the parent element.
   */
  width: import_prop_types32.default.number,
  /**
   * The configuration of the x-axes.
   * If not provided, a default axis config is used.
   * An array of [[AxisConfig]] objects.
   */
  xAxis: import_prop_types32.default.arrayOf(import_prop_types32.default.oneOfType([import_prop_types32.default.shape({
    axis: import_prop_types32.default.oneOf(["x"]),
    barGapRatio: import_prop_types32.default.number,
    categoryGapRatio: import_prop_types32.default.number,
    classes: import_prop_types32.default.object,
    colorMap: import_prop_types32.default.oneOfType([import_prop_types32.default.shape({
      colors: import_prop_types32.default.arrayOf(import_prop_types32.default.string).isRequired,
      type: import_prop_types32.default.oneOf(["ordinal"]).isRequired,
      unknownColor: import_prop_types32.default.string,
      values: import_prop_types32.default.arrayOf(import_prop_types32.default.oneOfType([import_prop_types32.default.instanceOf(Date), import_prop_types32.default.number, import_prop_types32.default.string]).isRequired)
    }), import_prop_types32.default.shape({
      color: import_prop_types32.default.oneOfType([import_prop_types32.default.arrayOf(import_prop_types32.default.string.isRequired), import_prop_types32.default.func]).isRequired,
      max: import_prop_types32.default.oneOfType([import_prop_types32.default.instanceOf(Date), import_prop_types32.default.number]),
      min: import_prop_types32.default.oneOfType([import_prop_types32.default.instanceOf(Date), import_prop_types32.default.number]),
      type: import_prop_types32.default.oneOf(["continuous"]).isRequired
    }), import_prop_types32.default.shape({
      colors: import_prop_types32.default.arrayOf(import_prop_types32.default.string).isRequired,
      thresholds: import_prop_types32.default.arrayOf(import_prop_types32.default.oneOfType([import_prop_types32.default.instanceOf(Date), import_prop_types32.default.number]).isRequired).isRequired,
      type: import_prop_types32.default.oneOf(["piecewise"]).isRequired
    })]),
    data: import_prop_types32.default.array,
    dataKey: import_prop_types32.default.string,
    disableLine: import_prop_types32.default.bool,
    disableTicks: import_prop_types32.default.bool,
    domainLimit: import_prop_types32.default.oneOfType([import_prop_types32.default.oneOf(["nice", "strict"]), import_prop_types32.default.func]),
    fill: import_prop_types32.default.string,
    height: import_prop_types32.default.number,
    hideTooltip: import_prop_types32.default.bool,
    id: import_prop_types32.default.oneOfType([import_prop_types32.default.number, import_prop_types32.default.string]),
    ignoreTooltip: import_prop_types32.default.bool,
    label: import_prop_types32.default.string,
    labelStyle: import_prop_types32.default.object,
    max: import_prop_types32.default.oneOfType([import_prop_types32.default.instanceOf(Date), import_prop_types32.default.number]),
    min: import_prop_types32.default.oneOfType([import_prop_types32.default.instanceOf(Date), import_prop_types32.default.number]),
    offset: import_prop_types32.default.number,
    position: import_prop_types32.default.oneOf(["bottom", "none", "top"]),
    reverse: import_prop_types32.default.bool,
    scaleType: import_prop_types32.default.oneOf(["band"]),
    slotProps: import_prop_types32.default.object,
    slots: import_prop_types32.default.object,
    stroke: import_prop_types32.default.string,
    sx: import_prop_types32.default.oneOfType([import_prop_types32.default.arrayOf(import_prop_types32.default.oneOfType([import_prop_types32.default.func, import_prop_types32.default.object, import_prop_types32.default.bool])), import_prop_types32.default.func, import_prop_types32.default.object]),
    tickInterval: import_prop_types32.default.oneOfType([import_prop_types32.default.oneOf(["auto"]), import_prop_types32.default.array, import_prop_types32.default.func]),
    tickLabelInterval: import_prop_types32.default.oneOfType([import_prop_types32.default.oneOf(["auto"]), import_prop_types32.default.func]),
    tickLabelMinGap: import_prop_types32.default.number,
    tickLabelPlacement: import_prop_types32.default.oneOf(["middle", "tick"]),
    tickLabelStyle: import_prop_types32.default.object,
    tickMaxStep: import_prop_types32.default.number,
    tickMinStep: import_prop_types32.default.number,
    tickNumber: import_prop_types32.default.number,
    tickPlacement: import_prop_types32.default.oneOf(["end", "extremities", "middle", "start"]),
    tickSize: import_prop_types32.default.number,
    valueFormatter: import_prop_types32.default.func
  }), import_prop_types32.default.shape({
    axis: import_prop_types32.default.oneOf(["x"]),
    classes: import_prop_types32.default.object,
    colorMap: import_prop_types32.default.oneOfType([import_prop_types32.default.shape({
      colors: import_prop_types32.default.arrayOf(import_prop_types32.default.string).isRequired,
      type: import_prop_types32.default.oneOf(["ordinal"]).isRequired,
      unknownColor: import_prop_types32.default.string,
      values: import_prop_types32.default.arrayOf(import_prop_types32.default.oneOfType([import_prop_types32.default.instanceOf(Date), import_prop_types32.default.number, import_prop_types32.default.string]).isRequired)
    }), import_prop_types32.default.shape({
      color: import_prop_types32.default.oneOfType([import_prop_types32.default.arrayOf(import_prop_types32.default.string.isRequired), import_prop_types32.default.func]).isRequired,
      max: import_prop_types32.default.oneOfType([import_prop_types32.default.instanceOf(Date), import_prop_types32.default.number]),
      min: import_prop_types32.default.oneOfType([import_prop_types32.default.instanceOf(Date), import_prop_types32.default.number]),
      type: import_prop_types32.default.oneOf(["continuous"]).isRequired
    }), import_prop_types32.default.shape({
      colors: import_prop_types32.default.arrayOf(import_prop_types32.default.string).isRequired,
      thresholds: import_prop_types32.default.arrayOf(import_prop_types32.default.oneOfType([import_prop_types32.default.instanceOf(Date), import_prop_types32.default.number]).isRequired).isRequired,
      type: import_prop_types32.default.oneOf(["piecewise"]).isRequired
    })]),
    data: import_prop_types32.default.array,
    dataKey: import_prop_types32.default.string,
    disableLine: import_prop_types32.default.bool,
    disableTicks: import_prop_types32.default.bool,
    domainLimit: import_prop_types32.default.oneOfType([import_prop_types32.default.oneOf(["nice", "strict"]), import_prop_types32.default.func]),
    fill: import_prop_types32.default.string,
    height: import_prop_types32.default.number,
    hideTooltip: import_prop_types32.default.bool,
    id: import_prop_types32.default.oneOfType([import_prop_types32.default.number, import_prop_types32.default.string]),
    ignoreTooltip: import_prop_types32.default.bool,
    label: import_prop_types32.default.string,
    labelStyle: import_prop_types32.default.object,
    max: import_prop_types32.default.oneOfType([import_prop_types32.default.instanceOf(Date), import_prop_types32.default.number]),
    min: import_prop_types32.default.oneOfType([import_prop_types32.default.instanceOf(Date), import_prop_types32.default.number]),
    offset: import_prop_types32.default.number,
    position: import_prop_types32.default.oneOf(["bottom", "none", "top"]),
    reverse: import_prop_types32.default.bool,
    scaleType: import_prop_types32.default.oneOf(["point"]),
    slotProps: import_prop_types32.default.object,
    slots: import_prop_types32.default.object,
    stroke: import_prop_types32.default.string,
    sx: import_prop_types32.default.oneOfType([import_prop_types32.default.arrayOf(import_prop_types32.default.oneOfType([import_prop_types32.default.func, import_prop_types32.default.object, import_prop_types32.default.bool])), import_prop_types32.default.func, import_prop_types32.default.object]),
    tickInterval: import_prop_types32.default.oneOfType([import_prop_types32.default.oneOf(["auto"]), import_prop_types32.default.array, import_prop_types32.default.func]),
    tickLabelInterval: import_prop_types32.default.oneOfType([import_prop_types32.default.oneOf(["auto"]), import_prop_types32.default.func]),
    tickLabelMinGap: import_prop_types32.default.number,
    tickLabelPlacement: import_prop_types32.default.oneOf(["middle", "tick"]),
    tickLabelStyle: import_prop_types32.default.object,
    tickMaxStep: import_prop_types32.default.number,
    tickMinStep: import_prop_types32.default.number,
    tickNumber: import_prop_types32.default.number,
    tickPlacement: import_prop_types32.default.oneOf(["end", "extremities", "middle", "start"]),
    tickSize: import_prop_types32.default.number,
    valueFormatter: import_prop_types32.default.func
  }), import_prop_types32.default.shape({
    axis: import_prop_types32.default.oneOf(["x"]),
    classes: import_prop_types32.default.object,
    colorMap: import_prop_types32.default.oneOfType([import_prop_types32.default.shape({
      color: import_prop_types32.default.oneOfType([import_prop_types32.default.arrayOf(import_prop_types32.default.string.isRequired), import_prop_types32.default.func]).isRequired,
      max: import_prop_types32.default.oneOfType([import_prop_types32.default.instanceOf(Date), import_prop_types32.default.number]),
      min: import_prop_types32.default.oneOfType([import_prop_types32.default.instanceOf(Date), import_prop_types32.default.number]),
      type: import_prop_types32.default.oneOf(["continuous"]).isRequired
    }), import_prop_types32.default.shape({
      colors: import_prop_types32.default.arrayOf(import_prop_types32.default.string).isRequired,
      thresholds: import_prop_types32.default.arrayOf(import_prop_types32.default.oneOfType([import_prop_types32.default.instanceOf(Date), import_prop_types32.default.number]).isRequired).isRequired,
      type: import_prop_types32.default.oneOf(["piecewise"]).isRequired
    })]),
    data: import_prop_types32.default.array,
    dataKey: import_prop_types32.default.string,
    disableLine: import_prop_types32.default.bool,
    disableTicks: import_prop_types32.default.bool,
    domainLimit: import_prop_types32.default.oneOfType([import_prop_types32.default.oneOf(["nice", "strict"]), import_prop_types32.default.func]),
    fill: import_prop_types32.default.string,
    height: import_prop_types32.default.number,
    hideTooltip: import_prop_types32.default.bool,
    id: import_prop_types32.default.oneOfType([import_prop_types32.default.number, import_prop_types32.default.string]),
    ignoreTooltip: import_prop_types32.default.bool,
    label: import_prop_types32.default.string,
    labelStyle: import_prop_types32.default.object,
    max: import_prop_types32.default.oneOfType([import_prop_types32.default.instanceOf(Date), import_prop_types32.default.number]),
    min: import_prop_types32.default.oneOfType([import_prop_types32.default.instanceOf(Date), import_prop_types32.default.number]),
    offset: import_prop_types32.default.number,
    position: import_prop_types32.default.oneOf(["bottom", "none", "top"]),
    reverse: import_prop_types32.default.bool,
    scaleType: import_prop_types32.default.oneOf(["log"]),
    slotProps: import_prop_types32.default.object,
    slots: import_prop_types32.default.object,
    stroke: import_prop_types32.default.string,
    sx: import_prop_types32.default.oneOfType([import_prop_types32.default.arrayOf(import_prop_types32.default.oneOfType([import_prop_types32.default.func, import_prop_types32.default.object, import_prop_types32.default.bool])), import_prop_types32.default.func, import_prop_types32.default.object]),
    tickInterval: import_prop_types32.default.oneOfType([import_prop_types32.default.oneOf(["auto"]), import_prop_types32.default.array, import_prop_types32.default.func]),
    tickLabelInterval: import_prop_types32.default.oneOfType([import_prop_types32.default.oneOf(["auto"]), import_prop_types32.default.func]),
    tickLabelMinGap: import_prop_types32.default.number,
    tickLabelPlacement: import_prop_types32.default.oneOf(["middle", "tick"]),
    tickLabelStyle: import_prop_types32.default.object,
    tickMaxStep: import_prop_types32.default.number,
    tickMinStep: import_prop_types32.default.number,
    tickNumber: import_prop_types32.default.number,
    tickPlacement: import_prop_types32.default.oneOf(["end", "extremities", "middle", "start"]),
    tickSize: import_prop_types32.default.number,
    valueFormatter: import_prop_types32.default.func
  }), import_prop_types32.default.shape({
    axis: import_prop_types32.default.oneOf(["x"]),
    classes: import_prop_types32.default.object,
    colorMap: import_prop_types32.default.oneOfType([import_prop_types32.default.shape({
      color: import_prop_types32.default.oneOfType([import_prop_types32.default.arrayOf(import_prop_types32.default.string.isRequired), import_prop_types32.default.func]).isRequired,
      max: import_prop_types32.default.oneOfType([import_prop_types32.default.instanceOf(Date), import_prop_types32.default.number]),
      min: import_prop_types32.default.oneOfType([import_prop_types32.default.instanceOf(Date), import_prop_types32.default.number]),
      type: import_prop_types32.default.oneOf(["continuous"]).isRequired
    }), import_prop_types32.default.shape({
      colors: import_prop_types32.default.arrayOf(import_prop_types32.default.string).isRequired,
      thresholds: import_prop_types32.default.arrayOf(import_prop_types32.default.oneOfType([import_prop_types32.default.instanceOf(Date), import_prop_types32.default.number]).isRequired).isRequired,
      type: import_prop_types32.default.oneOf(["piecewise"]).isRequired
    })]),
    data: import_prop_types32.default.array,
    dataKey: import_prop_types32.default.string,
    disableLine: import_prop_types32.default.bool,
    disableTicks: import_prop_types32.default.bool,
    domainLimit: import_prop_types32.default.oneOfType([import_prop_types32.default.oneOf(["nice", "strict"]), import_prop_types32.default.func]),
    fill: import_prop_types32.default.string,
    height: import_prop_types32.default.number,
    hideTooltip: import_prop_types32.default.bool,
    id: import_prop_types32.default.oneOfType([import_prop_types32.default.number, import_prop_types32.default.string]),
    ignoreTooltip: import_prop_types32.default.bool,
    label: import_prop_types32.default.string,
    labelStyle: import_prop_types32.default.object,
    max: import_prop_types32.default.oneOfType([import_prop_types32.default.instanceOf(Date), import_prop_types32.default.number]),
    min: import_prop_types32.default.oneOfType([import_prop_types32.default.instanceOf(Date), import_prop_types32.default.number]),
    offset: import_prop_types32.default.number,
    position: import_prop_types32.default.oneOf(["bottom", "none", "top"]),
    reverse: import_prop_types32.default.bool,
    scaleType: import_prop_types32.default.oneOf(["pow"]),
    slotProps: import_prop_types32.default.object,
    slots: import_prop_types32.default.object,
    stroke: import_prop_types32.default.string,
    sx: import_prop_types32.default.oneOfType([import_prop_types32.default.arrayOf(import_prop_types32.default.oneOfType([import_prop_types32.default.func, import_prop_types32.default.object, import_prop_types32.default.bool])), import_prop_types32.default.func, import_prop_types32.default.object]),
    tickInterval: import_prop_types32.default.oneOfType([import_prop_types32.default.oneOf(["auto"]), import_prop_types32.default.array, import_prop_types32.default.func]),
    tickLabelInterval: import_prop_types32.default.oneOfType([import_prop_types32.default.oneOf(["auto"]), import_prop_types32.default.func]),
    tickLabelMinGap: import_prop_types32.default.number,
    tickLabelPlacement: import_prop_types32.default.oneOf(["middle", "tick"]),
    tickLabelStyle: import_prop_types32.default.object,
    tickMaxStep: import_prop_types32.default.number,
    tickMinStep: import_prop_types32.default.number,
    tickNumber: import_prop_types32.default.number,
    tickPlacement: import_prop_types32.default.oneOf(["end", "extremities", "middle", "start"]),
    tickSize: import_prop_types32.default.number,
    valueFormatter: import_prop_types32.default.func
  }), import_prop_types32.default.shape({
    axis: import_prop_types32.default.oneOf(["x"]),
    classes: import_prop_types32.default.object,
    colorMap: import_prop_types32.default.oneOfType([import_prop_types32.default.shape({
      color: import_prop_types32.default.oneOfType([import_prop_types32.default.arrayOf(import_prop_types32.default.string.isRequired), import_prop_types32.default.func]).isRequired,
      max: import_prop_types32.default.oneOfType([import_prop_types32.default.instanceOf(Date), import_prop_types32.default.number]),
      min: import_prop_types32.default.oneOfType([import_prop_types32.default.instanceOf(Date), import_prop_types32.default.number]),
      type: import_prop_types32.default.oneOf(["continuous"]).isRequired
    }), import_prop_types32.default.shape({
      colors: import_prop_types32.default.arrayOf(import_prop_types32.default.string).isRequired,
      thresholds: import_prop_types32.default.arrayOf(import_prop_types32.default.oneOfType([import_prop_types32.default.instanceOf(Date), import_prop_types32.default.number]).isRequired).isRequired,
      type: import_prop_types32.default.oneOf(["piecewise"]).isRequired
    })]),
    data: import_prop_types32.default.array,
    dataKey: import_prop_types32.default.string,
    disableLine: import_prop_types32.default.bool,
    disableTicks: import_prop_types32.default.bool,
    domainLimit: import_prop_types32.default.oneOfType([import_prop_types32.default.oneOf(["nice", "strict"]), import_prop_types32.default.func]),
    fill: import_prop_types32.default.string,
    height: import_prop_types32.default.number,
    hideTooltip: import_prop_types32.default.bool,
    id: import_prop_types32.default.oneOfType([import_prop_types32.default.number, import_prop_types32.default.string]),
    ignoreTooltip: import_prop_types32.default.bool,
    label: import_prop_types32.default.string,
    labelStyle: import_prop_types32.default.object,
    max: import_prop_types32.default.oneOfType([import_prop_types32.default.instanceOf(Date), import_prop_types32.default.number]),
    min: import_prop_types32.default.oneOfType([import_prop_types32.default.instanceOf(Date), import_prop_types32.default.number]),
    offset: import_prop_types32.default.number,
    position: import_prop_types32.default.oneOf(["bottom", "none", "top"]),
    reverse: import_prop_types32.default.bool,
    scaleType: import_prop_types32.default.oneOf(["sqrt"]),
    slotProps: import_prop_types32.default.object,
    slots: import_prop_types32.default.object,
    stroke: import_prop_types32.default.string,
    sx: import_prop_types32.default.oneOfType([import_prop_types32.default.arrayOf(import_prop_types32.default.oneOfType([import_prop_types32.default.func, import_prop_types32.default.object, import_prop_types32.default.bool])), import_prop_types32.default.func, import_prop_types32.default.object]),
    tickInterval: import_prop_types32.default.oneOfType([import_prop_types32.default.oneOf(["auto"]), import_prop_types32.default.array, import_prop_types32.default.func]),
    tickLabelInterval: import_prop_types32.default.oneOfType([import_prop_types32.default.oneOf(["auto"]), import_prop_types32.default.func]),
    tickLabelMinGap: import_prop_types32.default.number,
    tickLabelPlacement: import_prop_types32.default.oneOf(["middle", "tick"]),
    tickLabelStyle: import_prop_types32.default.object,
    tickMaxStep: import_prop_types32.default.number,
    tickMinStep: import_prop_types32.default.number,
    tickNumber: import_prop_types32.default.number,
    tickPlacement: import_prop_types32.default.oneOf(["end", "extremities", "middle", "start"]),
    tickSize: import_prop_types32.default.number,
    valueFormatter: import_prop_types32.default.func
  }), import_prop_types32.default.shape({
    axis: import_prop_types32.default.oneOf(["x"]),
    classes: import_prop_types32.default.object,
    colorMap: import_prop_types32.default.oneOfType([import_prop_types32.default.shape({
      color: import_prop_types32.default.oneOfType([import_prop_types32.default.arrayOf(import_prop_types32.default.string.isRequired), import_prop_types32.default.func]).isRequired,
      max: import_prop_types32.default.oneOfType([import_prop_types32.default.instanceOf(Date), import_prop_types32.default.number]),
      min: import_prop_types32.default.oneOfType([import_prop_types32.default.instanceOf(Date), import_prop_types32.default.number]),
      type: import_prop_types32.default.oneOf(["continuous"]).isRequired
    }), import_prop_types32.default.shape({
      colors: import_prop_types32.default.arrayOf(import_prop_types32.default.string).isRequired,
      thresholds: import_prop_types32.default.arrayOf(import_prop_types32.default.oneOfType([import_prop_types32.default.instanceOf(Date), import_prop_types32.default.number]).isRequired).isRequired,
      type: import_prop_types32.default.oneOf(["piecewise"]).isRequired
    })]),
    data: import_prop_types32.default.array,
    dataKey: import_prop_types32.default.string,
    disableLine: import_prop_types32.default.bool,
    disableTicks: import_prop_types32.default.bool,
    domainLimit: import_prop_types32.default.oneOfType([import_prop_types32.default.oneOf(["nice", "strict"]), import_prop_types32.default.func]),
    fill: import_prop_types32.default.string,
    height: import_prop_types32.default.number,
    hideTooltip: import_prop_types32.default.bool,
    id: import_prop_types32.default.oneOfType([import_prop_types32.default.number, import_prop_types32.default.string]),
    ignoreTooltip: import_prop_types32.default.bool,
    label: import_prop_types32.default.string,
    labelStyle: import_prop_types32.default.object,
    max: import_prop_types32.default.oneOfType([import_prop_types32.default.instanceOf(Date), import_prop_types32.default.number]),
    min: import_prop_types32.default.oneOfType([import_prop_types32.default.instanceOf(Date), import_prop_types32.default.number]),
    offset: import_prop_types32.default.number,
    position: import_prop_types32.default.oneOf(["bottom", "none", "top"]),
    reverse: import_prop_types32.default.bool,
    scaleType: import_prop_types32.default.oneOf(["time"]),
    slotProps: import_prop_types32.default.object,
    slots: import_prop_types32.default.object,
    stroke: import_prop_types32.default.string,
    sx: import_prop_types32.default.oneOfType([import_prop_types32.default.arrayOf(import_prop_types32.default.oneOfType([import_prop_types32.default.func, import_prop_types32.default.object, import_prop_types32.default.bool])), import_prop_types32.default.func, import_prop_types32.default.object]),
    tickInterval: import_prop_types32.default.oneOfType([import_prop_types32.default.oneOf(["auto"]), import_prop_types32.default.array, import_prop_types32.default.func]),
    tickLabelInterval: import_prop_types32.default.oneOfType([import_prop_types32.default.oneOf(["auto"]), import_prop_types32.default.func]),
    tickLabelMinGap: import_prop_types32.default.number,
    tickLabelPlacement: import_prop_types32.default.oneOf(["middle", "tick"]),
    tickLabelStyle: import_prop_types32.default.object,
    tickMaxStep: import_prop_types32.default.number,
    tickMinStep: import_prop_types32.default.number,
    tickNumber: import_prop_types32.default.number,
    tickPlacement: import_prop_types32.default.oneOf(["end", "extremities", "middle", "start"]),
    tickSize: import_prop_types32.default.number,
    valueFormatter: import_prop_types32.default.func
  }), import_prop_types32.default.shape({
    axis: import_prop_types32.default.oneOf(["x"]),
    classes: import_prop_types32.default.object,
    colorMap: import_prop_types32.default.oneOfType([import_prop_types32.default.shape({
      color: import_prop_types32.default.oneOfType([import_prop_types32.default.arrayOf(import_prop_types32.default.string.isRequired), import_prop_types32.default.func]).isRequired,
      max: import_prop_types32.default.oneOfType([import_prop_types32.default.instanceOf(Date), import_prop_types32.default.number]),
      min: import_prop_types32.default.oneOfType([import_prop_types32.default.instanceOf(Date), import_prop_types32.default.number]),
      type: import_prop_types32.default.oneOf(["continuous"]).isRequired
    }), import_prop_types32.default.shape({
      colors: import_prop_types32.default.arrayOf(import_prop_types32.default.string).isRequired,
      thresholds: import_prop_types32.default.arrayOf(import_prop_types32.default.oneOfType([import_prop_types32.default.instanceOf(Date), import_prop_types32.default.number]).isRequired).isRequired,
      type: import_prop_types32.default.oneOf(["piecewise"]).isRequired
    })]),
    data: import_prop_types32.default.array,
    dataKey: import_prop_types32.default.string,
    disableLine: import_prop_types32.default.bool,
    disableTicks: import_prop_types32.default.bool,
    domainLimit: import_prop_types32.default.oneOfType([import_prop_types32.default.oneOf(["nice", "strict"]), import_prop_types32.default.func]),
    fill: import_prop_types32.default.string,
    height: import_prop_types32.default.number,
    hideTooltip: import_prop_types32.default.bool,
    id: import_prop_types32.default.oneOfType([import_prop_types32.default.number, import_prop_types32.default.string]),
    ignoreTooltip: import_prop_types32.default.bool,
    label: import_prop_types32.default.string,
    labelStyle: import_prop_types32.default.object,
    max: import_prop_types32.default.oneOfType([import_prop_types32.default.instanceOf(Date), import_prop_types32.default.number]),
    min: import_prop_types32.default.oneOfType([import_prop_types32.default.instanceOf(Date), import_prop_types32.default.number]),
    offset: import_prop_types32.default.number,
    position: import_prop_types32.default.oneOf(["bottom", "none", "top"]),
    reverse: import_prop_types32.default.bool,
    scaleType: import_prop_types32.default.oneOf(["utc"]),
    slotProps: import_prop_types32.default.object,
    slots: import_prop_types32.default.object,
    stroke: import_prop_types32.default.string,
    sx: import_prop_types32.default.oneOfType([import_prop_types32.default.arrayOf(import_prop_types32.default.oneOfType([import_prop_types32.default.func, import_prop_types32.default.object, import_prop_types32.default.bool])), import_prop_types32.default.func, import_prop_types32.default.object]),
    tickInterval: import_prop_types32.default.oneOfType([import_prop_types32.default.oneOf(["auto"]), import_prop_types32.default.array, import_prop_types32.default.func]),
    tickLabelInterval: import_prop_types32.default.oneOfType([import_prop_types32.default.oneOf(["auto"]), import_prop_types32.default.func]),
    tickLabelMinGap: import_prop_types32.default.number,
    tickLabelPlacement: import_prop_types32.default.oneOf(["middle", "tick"]),
    tickLabelStyle: import_prop_types32.default.object,
    tickMaxStep: import_prop_types32.default.number,
    tickMinStep: import_prop_types32.default.number,
    tickNumber: import_prop_types32.default.number,
    tickPlacement: import_prop_types32.default.oneOf(["end", "extremities", "middle", "start"]),
    tickSize: import_prop_types32.default.number,
    valueFormatter: import_prop_types32.default.func
  }), import_prop_types32.default.shape({
    axis: import_prop_types32.default.oneOf(["x"]),
    classes: import_prop_types32.default.object,
    colorMap: import_prop_types32.default.oneOfType([import_prop_types32.default.shape({
      color: import_prop_types32.default.oneOfType([import_prop_types32.default.arrayOf(import_prop_types32.default.string.isRequired), import_prop_types32.default.func]).isRequired,
      max: import_prop_types32.default.oneOfType([import_prop_types32.default.instanceOf(Date), import_prop_types32.default.number]),
      min: import_prop_types32.default.oneOfType([import_prop_types32.default.instanceOf(Date), import_prop_types32.default.number]),
      type: import_prop_types32.default.oneOf(["continuous"]).isRequired
    }), import_prop_types32.default.shape({
      colors: import_prop_types32.default.arrayOf(import_prop_types32.default.string).isRequired,
      thresholds: import_prop_types32.default.arrayOf(import_prop_types32.default.oneOfType([import_prop_types32.default.instanceOf(Date), import_prop_types32.default.number]).isRequired).isRequired,
      type: import_prop_types32.default.oneOf(["piecewise"]).isRequired
    })]),
    data: import_prop_types32.default.array,
    dataKey: import_prop_types32.default.string,
    disableLine: import_prop_types32.default.bool,
    disableTicks: import_prop_types32.default.bool,
    domainLimit: import_prop_types32.default.oneOfType([import_prop_types32.default.oneOf(["nice", "strict"]), import_prop_types32.default.func]),
    fill: import_prop_types32.default.string,
    height: import_prop_types32.default.number,
    hideTooltip: import_prop_types32.default.bool,
    id: import_prop_types32.default.oneOfType([import_prop_types32.default.number, import_prop_types32.default.string]),
    ignoreTooltip: import_prop_types32.default.bool,
    label: import_prop_types32.default.string,
    labelStyle: import_prop_types32.default.object,
    max: import_prop_types32.default.oneOfType([import_prop_types32.default.instanceOf(Date), import_prop_types32.default.number]),
    min: import_prop_types32.default.oneOfType([import_prop_types32.default.instanceOf(Date), import_prop_types32.default.number]),
    offset: import_prop_types32.default.number,
    position: import_prop_types32.default.oneOf(["bottom", "none", "top"]),
    reverse: import_prop_types32.default.bool,
    scaleType: import_prop_types32.default.oneOf(["linear"]),
    slotProps: import_prop_types32.default.object,
    slots: import_prop_types32.default.object,
    stroke: import_prop_types32.default.string,
    sx: import_prop_types32.default.oneOfType([import_prop_types32.default.arrayOf(import_prop_types32.default.oneOfType([import_prop_types32.default.func, import_prop_types32.default.object, import_prop_types32.default.bool])), import_prop_types32.default.func, import_prop_types32.default.object]),
    tickInterval: import_prop_types32.default.oneOfType([import_prop_types32.default.oneOf(["auto"]), import_prop_types32.default.array, import_prop_types32.default.func]),
    tickLabelInterval: import_prop_types32.default.oneOfType([import_prop_types32.default.oneOf(["auto"]), import_prop_types32.default.func]),
    tickLabelMinGap: import_prop_types32.default.number,
    tickLabelPlacement: import_prop_types32.default.oneOf(["middle", "tick"]),
    tickLabelStyle: import_prop_types32.default.object,
    tickMaxStep: import_prop_types32.default.number,
    tickMinStep: import_prop_types32.default.number,
    tickNumber: import_prop_types32.default.number,
    tickPlacement: import_prop_types32.default.oneOf(["end", "extremities", "middle", "start"]),
    tickSize: import_prop_types32.default.number,
    valueFormatter: import_prop_types32.default.func
  })]).isRequired),
  /**
   * The configuration of the y-axes.
   * If not provided, a default axis config is used.
   * An array of [[AxisConfig]] objects.
   */
  yAxis: import_prop_types32.default.arrayOf(import_prop_types32.default.oneOfType([import_prop_types32.default.shape({
    axis: import_prop_types32.default.oneOf(["y"]),
    barGapRatio: import_prop_types32.default.number,
    categoryGapRatio: import_prop_types32.default.number,
    classes: import_prop_types32.default.object,
    colorMap: import_prop_types32.default.oneOfType([import_prop_types32.default.shape({
      colors: import_prop_types32.default.arrayOf(import_prop_types32.default.string).isRequired,
      type: import_prop_types32.default.oneOf(["ordinal"]).isRequired,
      unknownColor: import_prop_types32.default.string,
      values: import_prop_types32.default.arrayOf(import_prop_types32.default.oneOfType([import_prop_types32.default.instanceOf(Date), import_prop_types32.default.number, import_prop_types32.default.string]).isRequired)
    }), import_prop_types32.default.shape({
      color: import_prop_types32.default.oneOfType([import_prop_types32.default.arrayOf(import_prop_types32.default.string.isRequired), import_prop_types32.default.func]).isRequired,
      max: import_prop_types32.default.oneOfType([import_prop_types32.default.instanceOf(Date), import_prop_types32.default.number]),
      min: import_prop_types32.default.oneOfType([import_prop_types32.default.instanceOf(Date), import_prop_types32.default.number]),
      type: import_prop_types32.default.oneOf(["continuous"]).isRequired
    }), import_prop_types32.default.shape({
      colors: import_prop_types32.default.arrayOf(import_prop_types32.default.string).isRequired,
      thresholds: import_prop_types32.default.arrayOf(import_prop_types32.default.oneOfType([import_prop_types32.default.instanceOf(Date), import_prop_types32.default.number]).isRequired).isRequired,
      type: import_prop_types32.default.oneOf(["piecewise"]).isRequired
    })]),
    data: import_prop_types32.default.array,
    dataKey: import_prop_types32.default.string,
    disableLine: import_prop_types32.default.bool,
    disableTicks: import_prop_types32.default.bool,
    domainLimit: import_prop_types32.default.oneOfType([import_prop_types32.default.oneOf(["nice", "strict"]), import_prop_types32.default.func]),
    fill: import_prop_types32.default.string,
    hideTooltip: import_prop_types32.default.bool,
    id: import_prop_types32.default.oneOfType([import_prop_types32.default.number, import_prop_types32.default.string]),
    ignoreTooltip: import_prop_types32.default.bool,
    label: import_prop_types32.default.string,
    labelStyle: import_prop_types32.default.object,
    max: import_prop_types32.default.oneOfType([import_prop_types32.default.instanceOf(Date), import_prop_types32.default.number]),
    min: import_prop_types32.default.oneOfType([import_prop_types32.default.instanceOf(Date), import_prop_types32.default.number]),
    offset: import_prop_types32.default.number,
    position: import_prop_types32.default.oneOf(["left", "none", "right"]),
    reverse: import_prop_types32.default.bool,
    scaleType: import_prop_types32.default.oneOf(["band"]),
    slotProps: import_prop_types32.default.object,
    slots: import_prop_types32.default.object,
    stroke: import_prop_types32.default.string,
    sx: import_prop_types32.default.oneOfType([import_prop_types32.default.arrayOf(import_prop_types32.default.oneOfType([import_prop_types32.default.func, import_prop_types32.default.object, import_prop_types32.default.bool])), import_prop_types32.default.func, import_prop_types32.default.object]),
    tickInterval: import_prop_types32.default.oneOfType([import_prop_types32.default.oneOf(["auto"]), import_prop_types32.default.array, import_prop_types32.default.func]),
    tickLabelInterval: import_prop_types32.default.oneOfType([import_prop_types32.default.oneOf(["auto"]), import_prop_types32.default.func]),
    tickLabelPlacement: import_prop_types32.default.oneOf(["middle", "tick"]),
    tickLabelStyle: import_prop_types32.default.object,
    tickMaxStep: import_prop_types32.default.number,
    tickMinStep: import_prop_types32.default.number,
    tickNumber: import_prop_types32.default.number,
    tickPlacement: import_prop_types32.default.oneOf(["end", "extremities", "middle", "start"]),
    tickSize: import_prop_types32.default.number,
    valueFormatter: import_prop_types32.default.func,
    width: import_prop_types32.default.number
  }), import_prop_types32.default.shape({
    axis: import_prop_types32.default.oneOf(["y"]),
    classes: import_prop_types32.default.object,
    colorMap: import_prop_types32.default.oneOfType([import_prop_types32.default.shape({
      colors: import_prop_types32.default.arrayOf(import_prop_types32.default.string).isRequired,
      type: import_prop_types32.default.oneOf(["ordinal"]).isRequired,
      unknownColor: import_prop_types32.default.string,
      values: import_prop_types32.default.arrayOf(import_prop_types32.default.oneOfType([import_prop_types32.default.instanceOf(Date), import_prop_types32.default.number, import_prop_types32.default.string]).isRequired)
    }), import_prop_types32.default.shape({
      color: import_prop_types32.default.oneOfType([import_prop_types32.default.arrayOf(import_prop_types32.default.string.isRequired), import_prop_types32.default.func]).isRequired,
      max: import_prop_types32.default.oneOfType([import_prop_types32.default.instanceOf(Date), import_prop_types32.default.number]),
      min: import_prop_types32.default.oneOfType([import_prop_types32.default.instanceOf(Date), import_prop_types32.default.number]),
      type: import_prop_types32.default.oneOf(["continuous"]).isRequired
    }), import_prop_types32.default.shape({
      colors: import_prop_types32.default.arrayOf(import_prop_types32.default.string).isRequired,
      thresholds: import_prop_types32.default.arrayOf(import_prop_types32.default.oneOfType([import_prop_types32.default.instanceOf(Date), import_prop_types32.default.number]).isRequired).isRequired,
      type: import_prop_types32.default.oneOf(["piecewise"]).isRequired
    })]),
    data: import_prop_types32.default.array,
    dataKey: import_prop_types32.default.string,
    disableLine: import_prop_types32.default.bool,
    disableTicks: import_prop_types32.default.bool,
    domainLimit: import_prop_types32.default.oneOfType([import_prop_types32.default.oneOf(["nice", "strict"]), import_prop_types32.default.func]),
    fill: import_prop_types32.default.string,
    hideTooltip: import_prop_types32.default.bool,
    id: import_prop_types32.default.oneOfType([import_prop_types32.default.number, import_prop_types32.default.string]),
    ignoreTooltip: import_prop_types32.default.bool,
    label: import_prop_types32.default.string,
    labelStyle: import_prop_types32.default.object,
    max: import_prop_types32.default.oneOfType([import_prop_types32.default.instanceOf(Date), import_prop_types32.default.number]),
    min: import_prop_types32.default.oneOfType([import_prop_types32.default.instanceOf(Date), import_prop_types32.default.number]),
    offset: import_prop_types32.default.number,
    position: import_prop_types32.default.oneOf(["left", "none", "right"]),
    reverse: import_prop_types32.default.bool,
    scaleType: import_prop_types32.default.oneOf(["point"]),
    slotProps: import_prop_types32.default.object,
    slots: import_prop_types32.default.object,
    stroke: import_prop_types32.default.string,
    sx: import_prop_types32.default.oneOfType([import_prop_types32.default.arrayOf(import_prop_types32.default.oneOfType([import_prop_types32.default.func, import_prop_types32.default.object, import_prop_types32.default.bool])), import_prop_types32.default.func, import_prop_types32.default.object]),
    tickInterval: import_prop_types32.default.oneOfType([import_prop_types32.default.oneOf(["auto"]), import_prop_types32.default.array, import_prop_types32.default.func]),
    tickLabelInterval: import_prop_types32.default.oneOfType([import_prop_types32.default.oneOf(["auto"]), import_prop_types32.default.func]),
    tickLabelPlacement: import_prop_types32.default.oneOf(["middle", "tick"]),
    tickLabelStyle: import_prop_types32.default.object,
    tickMaxStep: import_prop_types32.default.number,
    tickMinStep: import_prop_types32.default.number,
    tickNumber: import_prop_types32.default.number,
    tickPlacement: import_prop_types32.default.oneOf(["end", "extremities", "middle", "start"]),
    tickSize: import_prop_types32.default.number,
    valueFormatter: import_prop_types32.default.func,
    width: import_prop_types32.default.number
  }), import_prop_types32.default.shape({
    axis: import_prop_types32.default.oneOf(["y"]),
    classes: import_prop_types32.default.object,
    colorMap: import_prop_types32.default.oneOfType([import_prop_types32.default.shape({
      color: import_prop_types32.default.oneOfType([import_prop_types32.default.arrayOf(import_prop_types32.default.string.isRequired), import_prop_types32.default.func]).isRequired,
      max: import_prop_types32.default.oneOfType([import_prop_types32.default.instanceOf(Date), import_prop_types32.default.number]),
      min: import_prop_types32.default.oneOfType([import_prop_types32.default.instanceOf(Date), import_prop_types32.default.number]),
      type: import_prop_types32.default.oneOf(["continuous"]).isRequired
    }), import_prop_types32.default.shape({
      colors: import_prop_types32.default.arrayOf(import_prop_types32.default.string).isRequired,
      thresholds: import_prop_types32.default.arrayOf(import_prop_types32.default.oneOfType([import_prop_types32.default.instanceOf(Date), import_prop_types32.default.number]).isRequired).isRequired,
      type: import_prop_types32.default.oneOf(["piecewise"]).isRequired
    })]),
    data: import_prop_types32.default.array,
    dataKey: import_prop_types32.default.string,
    disableLine: import_prop_types32.default.bool,
    disableTicks: import_prop_types32.default.bool,
    domainLimit: import_prop_types32.default.oneOfType([import_prop_types32.default.oneOf(["nice", "strict"]), import_prop_types32.default.func]),
    fill: import_prop_types32.default.string,
    hideTooltip: import_prop_types32.default.bool,
    id: import_prop_types32.default.oneOfType([import_prop_types32.default.number, import_prop_types32.default.string]),
    ignoreTooltip: import_prop_types32.default.bool,
    label: import_prop_types32.default.string,
    labelStyle: import_prop_types32.default.object,
    max: import_prop_types32.default.oneOfType([import_prop_types32.default.instanceOf(Date), import_prop_types32.default.number]),
    min: import_prop_types32.default.oneOfType([import_prop_types32.default.instanceOf(Date), import_prop_types32.default.number]),
    offset: import_prop_types32.default.number,
    position: import_prop_types32.default.oneOf(["left", "none", "right"]),
    reverse: import_prop_types32.default.bool,
    scaleType: import_prop_types32.default.oneOf(["log"]),
    slotProps: import_prop_types32.default.object,
    slots: import_prop_types32.default.object,
    stroke: import_prop_types32.default.string,
    sx: import_prop_types32.default.oneOfType([import_prop_types32.default.arrayOf(import_prop_types32.default.oneOfType([import_prop_types32.default.func, import_prop_types32.default.object, import_prop_types32.default.bool])), import_prop_types32.default.func, import_prop_types32.default.object]),
    tickInterval: import_prop_types32.default.oneOfType([import_prop_types32.default.oneOf(["auto"]), import_prop_types32.default.array, import_prop_types32.default.func]),
    tickLabelInterval: import_prop_types32.default.oneOfType([import_prop_types32.default.oneOf(["auto"]), import_prop_types32.default.func]),
    tickLabelPlacement: import_prop_types32.default.oneOf(["middle", "tick"]),
    tickLabelStyle: import_prop_types32.default.object,
    tickMaxStep: import_prop_types32.default.number,
    tickMinStep: import_prop_types32.default.number,
    tickNumber: import_prop_types32.default.number,
    tickPlacement: import_prop_types32.default.oneOf(["end", "extremities", "middle", "start"]),
    tickSize: import_prop_types32.default.number,
    valueFormatter: import_prop_types32.default.func,
    width: import_prop_types32.default.number
  }), import_prop_types32.default.shape({
    axis: import_prop_types32.default.oneOf(["y"]),
    classes: import_prop_types32.default.object,
    colorMap: import_prop_types32.default.oneOfType([import_prop_types32.default.shape({
      color: import_prop_types32.default.oneOfType([import_prop_types32.default.arrayOf(import_prop_types32.default.string.isRequired), import_prop_types32.default.func]).isRequired,
      max: import_prop_types32.default.oneOfType([import_prop_types32.default.instanceOf(Date), import_prop_types32.default.number]),
      min: import_prop_types32.default.oneOfType([import_prop_types32.default.instanceOf(Date), import_prop_types32.default.number]),
      type: import_prop_types32.default.oneOf(["continuous"]).isRequired
    }), import_prop_types32.default.shape({
      colors: import_prop_types32.default.arrayOf(import_prop_types32.default.string).isRequired,
      thresholds: import_prop_types32.default.arrayOf(import_prop_types32.default.oneOfType([import_prop_types32.default.instanceOf(Date), import_prop_types32.default.number]).isRequired).isRequired,
      type: import_prop_types32.default.oneOf(["piecewise"]).isRequired
    })]),
    data: import_prop_types32.default.array,
    dataKey: import_prop_types32.default.string,
    disableLine: import_prop_types32.default.bool,
    disableTicks: import_prop_types32.default.bool,
    domainLimit: import_prop_types32.default.oneOfType([import_prop_types32.default.oneOf(["nice", "strict"]), import_prop_types32.default.func]),
    fill: import_prop_types32.default.string,
    hideTooltip: import_prop_types32.default.bool,
    id: import_prop_types32.default.oneOfType([import_prop_types32.default.number, import_prop_types32.default.string]),
    ignoreTooltip: import_prop_types32.default.bool,
    label: import_prop_types32.default.string,
    labelStyle: import_prop_types32.default.object,
    max: import_prop_types32.default.oneOfType([import_prop_types32.default.instanceOf(Date), import_prop_types32.default.number]),
    min: import_prop_types32.default.oneOfType([import_prop_types32.default.instanceOf(Date), import_prop_types32.default.number]),
    offset: import_prop_types32.default.number,
    position: import_prop_types32.default.oneOf(["left", "none", "right"]),
    reverse: import_prop_types32.default.bool,
    scaleType: import_prop_types32.default.oneOf(["pow"]),
    slotProps: import_prop_types32.default.object,
    slots: import_prop_types32.default.object,
    stroke: import_prop_types32.default.string,
    sx: import_prop_types32.default.oneOfType([import_prop_types32.default.arrayOf(import_prop_types32.default.oneOfType([import_prop_types32.default.func, import_prop_types32.default.object, import_prop_types32.default.bool])), import_prop_types32.default.func, import_prop_types32.default.object]),
    tickInterval: import_prop_types32.default.oneOfType([import_prop_types32.default.oneOf(["auto"]), import_prop_types32.default.array, import_prop_types32.default.func]),
    tickLabelInterval: import_prop_types32.default.oneOfType([import_prop_types32.default.oneOf(["auto"]), import_prop_types32.default.func]),
    tickLabelPlacement: import_prop_types32.default.oneOf(["middle", "tick"]),
    tickLabelStyle: import_prop_types32.default.object,
    tickMaxStep: import_prop_types32.default.number,
    tickMinStep: import_prop_types32.default.number,
    tickNumber: import_prop_types32.default.number,
    tickPlacement: import_prop_types32.default.oneOf(["end", "extremities", "middle", "start"]),
    tickSize: import_prop_types32.default.number,
    valueFormatter: import_prop_types32.default.func,
    width: import_prop_types32.default.number
  }), import_prop_types32.default.shape({
    axis: import_prop_types32.default.oneOf(["y"]),
    classes: import_prop_types32.default.object,
    colorMap: import_prop_types32.default.oneOfType([import_prop_types32.default.shape({
      color: import_prop_types32.default.oneOfType([import_prop_types32.default.arrayOf(import_prop_types32.default.string.isRequired), import_prop_types32.default.func]).isRequired,
      max: import_prop_types32.default.oneOfType([import_prop_types32.default.instanceOf(Date), import_prop_types32.default.number]),
      min: import_prop_types32.default.oneOfType([import_prop_types32.default.instanceOf(Date), import_prop_types32.default.number]),
      type: import_prop_types32.default.oneOf(["continuous"]).isRequired
    }), import_prop_types32.default.shape({
      colors: import_prop_types32.default.arrayOf(import_prop_types32.default.string).isRequired,
      thresholds: import_prop_types32.default.arrayOf(import_prop_types32.default.oneOfType([import_prop_types32.default.instanceOf(Date), import_prop_types32.default.number]).isRequired).isRequired,
      type: import_prop_types32.default.oneOf(["piecewise"]).isRequired
    })]),
    data: import_prop_types32.default.array,
    dataKey: import_prop_types32.default.string,
    disableLine: import_prop_types32.default.bool,
    disableTicks: import_prop_types32.default.bool,
    domainLimit: import_prop_types32.default.oneOfType([import_prop_types32.default.oneOf(["nice", "strict"]), import_prop_types32.default.func]),
    fill: import_prop_types32.default.string,
    hideTooltip: import_prop_types32.default.bool,
    id: import_prop_types32.default.oneOfType([import_prop_types32.default.number, import_prop_types32.default.string]),
    ignoreTooltip: import_prop_types32.default.bool,
    label: import_prop_types32.default.string,
    labelStyle: import_prop_types32.default.object,
    max: import_prop_types32.default.oneOfType([import_prop_types32.default.instanceOf(Date), import_prop_types32.default.number]),
    min: import_prop_types32.default.oneOfType([import_prop_types32.default.instanceOf(Date), import_prop_types32.default.number]),
    offset: import_prop_types32.default.number,
    position: import_prop_types32.default.oneOf(["left", "none", "right"]),
    reverse: import_prop_types32.default.bool,
    scaleType: import_prop_types32.default.oneOf(["sqrt"]),
    slotProps: import_prop_types32.default.object,
    slots: import_prop_types32.default.object,
    stroke: import_prop_types32.default.string,
    sx: import_prop_types32.default.oneOfType([import_prop_types32.default.arrayOf(import_prop_types32.default.oneOfType([import_prop_types32.default.func, import_prop_types32.default.object, import_prop_types32.default.bool])), import_prop_types32.default.func, import_prop_types32.default.object]),
    tickInterval: import_prop_types32.default.oneOfType([import_prop_types32.default.oneOf(["auto"]), import_prop_types32.default.array, import_prop_types32.default.func]),
    tickLabelInterval: import_prop_types32.default.oneOfType([import_prop_types32.default.oneOf(["auto"]), import_prop_types32.default.func]),
    tickLabelPlacement: import_prop_types32.default.oneOf(["middle", "tick"]),
    tickLabelStyle: import_prop_types32.default.object,
    tickMaxStep: import_prop_types32.default.number,
    tickMinStep: import_prop_types32.default.number,
    tickNumber: import_prop_types32.default.number,
    tickPlacement: import_prop_types32.default.oneOf(["end", "extremities", "middle", "start"]),
    tickSize: import_prop_types32.default.number,
    valueFormatter: import_prop_types32.default.func,
    width: import_prop_types32.default.number
  }), import_prop_types32.default.shape({
    axis: import_prop_types32.default.oneOf(["y"]),
    classes: import_prop_types32.default.object,
    colorMap: import_prop_types32.default.oneOfType([import_prop_types32.default.shape({
      color: import_prop_types32.default.oneOfType([import_prop_types32.default.arrayOf(import_prop_types32.default.string.isRequired), import_prop_types32.default.func]).isRequired,
      max: import_prop_types32.default.oneOfType([import_prop_types32.default.instanceOf(Date), import_prop_types32.default.number]),
      min: import_prop_types32.default.oneOfType([import_prop_types32.default.instanceOf(Date), import_prop_types32.default.number]),
      type: import_prop_types32.default.oneOf(["continuous"]).isRequired
    }), import_prop_types32.default.shape({
      colors: import_prop_types32.default.arrayOf(import_prop_types32.default.string).isRequired,
      thresholds: import_prop_types32.default.arrayOf(import_prop_types32.default.oneOfType([import_prop_types32.default.instanceOf(Date), import_prop_types32.default.number]).isRequired).isRequired,
      type: import_prop_types32.default.oneOf(["piecewise"]).isRequired
    })]),
    data: import_prop_types32.default.array,
    dataKey: import_prop_types32.default.string,
    disableLine: import_prop_types32.default.bool,
    disableTicks: import_prop_types32.default.bool,
    domainLimit: import_prop_types32.default.oneOfType([import_prop_types32.default.oneOf(["nice", "strict"]), import_prop_types32.default.func]),
    fill: import_prop_types32.default.string,
    hideTooltip: import_prop_types32.default.bool,
    id: import_prop_types32.default.oneOfType([import_prop_types32.default.number, import_prop_types32.default.string]),
    ignoreTooltip: import_prop_types32.default.bool,
    label: import_prop_types32.default.string,
    labelStyle: import_prop_types32.default.object,
    max: import_prop_types32.default.oneOfType([import_prop_types32.default.instanceOf(Date), import_prop_types32.default.number]),
    min: import_prop_types32.default.oneOfType([import_prop_types32.default.instanceOf(Date), import_prop_types32.default.number]),
    offset: import_prop_types32.default.number,
    position: import_prop_types32.default.oneOf(["left", "none", "right"]),
    reverse: import_prop_types32.default.bool,
    scaleType: import_prop_types32.default.oneOf(["time"]),
    slotProps: import_prop_types32.default.object,
    slots: import_prop_types32.default.object,
    stroke: import_prop_types32.default.string,
    sx: import_prop_types32.default.oneOfType([import_prop_types32.default.arrayOf(import_prop_types32.default.oneOfType([import_prop_types32.default.func, import_prop_types32.default.object, import_prop_types32.default.bool])), import_prop_types32.default.func, import_prop_types32.default.object]),
    tickInterval: import_prop_types32.default.oneOfType([import_prop_types32.default.oneOf(["auto"]), import_prop_types32.default.array, import_prop_types32.default.func]),
    tickLabelInterval: import_prop_types32.default.oneOfType([import_prop_types32.default.oneOf(["auto"]), import_prop_types32.default.func]),
    tickLabelPlacement: import_prop_types32.default.oneOf(["middle", "tick"]),
    tickLabelStyle: import_prop_types32.default.object,
    tickMaxStep: import_prop_types32.default.number,
    tickMinStep: import_prop_types32.default.number,
    tickNumber: import_prop_types32.default.number,
    tickPlacement: import_prop_types32.default.oneOf(["end", "extremities", "middle", "start"]),
    tickSize: import_prop_types32.default.number,
    valueFormatter: import_prop_types32.default.func,
    width: import_prop_types32.default.number
  }), import_prop_types32.default.shape({
    axis: import_prop_types32.default.oneOf(["y"]),
    classes: import_prop_types32.default.object,
    colorMap: import_prop_types32.default.oneOfType([import_prop_types32.default.shape({
      color: import_prop_types32.default.oneOfType([import_prop_types32.default.arrayOf(import_prop_types32.default.string.isRequired), import_prop_types32.default.func]).isRequired,
      max: import_prop_types32.default.oneOfType([import_prop_types32.default.instanceOf(Date), import_prop_types32.default.number]),
      min: import_prop_types32.default.oneOfType([import_prop_types32.default.instanceOf(Date), import_prop_types32.default.number]),
      type: import_prop_types32.default.oneOf(["continuous"]).isRequired
    }), import_prop_types32.default.shape({
      colors: import_prop_types32.default.arrayOf(import_prop_types32.default.string).isRequired,
      thresholds: import_prop_types32.default.arrayOf(import_prop_types32.default.oneOfType([import_prop_types32.default.instanceOf(Date), import_prop_types32.default.number]).isRequired).isRequired,
      type: import_prop_types32.default.oneOf(["piecewise"]).isRequired
    })]),
    data: import_prop_types32.default.array,
    dataKey: import_prop_types32.default.string,
    disableLine: import_prop_types32.default.bool,
    disableTicks: import_prop_types32.default.bool,
    domainLimit: import_prop_types32.default.oneOfType([import_prop_types32.default.oneOf(["nice", "strict"]), import_prop_types32.default.func]),
    fill: import_prop_types32.default.string,
    hideTooltip: import_prop_types32.default.bool,
    id: import_prop_types32.default.oneOfType([import_prop_types32.default.number, import_prop_types32.default.string]),
    ignoreTooltip: import_prop_types32.default.bool,
    label: import_prop_types32.default.string,
    labelStyle: import_prop_types32.default.object,
    max: import_prop_types32.default.oneOfType([import_prop_types32.default.instanceOf(Date), import_prop_types32.default.number]),
    min: import_prop_types32.default.oneOfType([import_prop_types32.default.instanceOf(Date), import_prop_types32.default.number]),
    offset: import_prop_types32.default.number,
    position: import_prop_types32.default.oneOf(["left", "none", "right"]),
    reverse: import_prop_types32.default.bool,
    scaleType: import_prop_types32.default.oneOf(["utc"]),
    slotProps: import_prop_types32.default.object,
    slots: import_prop_types32.default.object,
    stroke: import_prop_types32.default.string,
    sx: import_prop_types32.default.oneOfType([import_prop_types32.default.arrayOf(import_prop_types32.default.oneOfType([import_prop_types32.default.func, import_prop_types32.default.object, import_prop_types32.default.bool])), import_prop_types32.default.func, import_prop_types32.default.object]),
    tickInterval: import_prop_types32.default.oneOfType([import_prop_types32.default.oneOf(["auto"]), import_prop_types32.default.array, import_prop_types32.default.func]),
    tickLabelInterval: import_prop_types32.default.oneOfType([import_prop_types32.default.oneOf(["auto"]), import_prop_types32.default.func]),
    tickLabelPlacement: import_prop_types32.default.oneOf(["middle", "tick"]),
    tickLabelStyle: import_prop_types32.default.object,
    tickMaxStep: import_prop_types32.default.number,
    tickMinStep: import_prop_types32.default.number,
    tickNumber: import_prop_types32.default.number,
    tickPlacement: import_prop_types32.default.oneOf(["end", "extremities", "middle", "start"]),
    tickSize: import_prop_types32.default.number,
    valueFormatter: import_prop_types32.default.func,
    width: import_prop_types32.default.number
  }), import_prop_types32.default.shape({
    axis: import_prop_types32.default.oneOf(["y"]),
    classes: import_prop_types32.default.object,
    colorMap: import_prop_types32.default.oneOfType([import_prop_types32.default.shape({
      color: import_prop_types32.default.oneOfType([import_prop_types32.default.arrayOf(import_prop_types32.default.string.isRequired), import_prop_types32.default.func]).isRequired,
      max: import_prop_types32.default.oneOfType([import_prop_types32.default.instanceOf(Date), import_prop_types32.default.number]),
      min: import_prop_types32.default.oneOfType([import_prop_types32.default.instanceOf(Date), import_prop_types32.default.number]),
      type: import_prop_types32.default.oneOf(["continuous"]).isRequired
    }), import_prop_types32.default.shape({
      colors: import_prop_types32.default.arrayOf(import_prop_types32.default.string).isRequired,
      thresholds: import_prop_types32.default.arrayOf(import_prop_types32.default.oneOfType([import_prop_types32.default.instanceOf(Date), import_prop_types32.default.number]).isRequired).isRequired,
      type: import_prop_types32.default.oneOf(["piecewise"]).isRequired
    })]),
    data: import_prop_types32.default.array,
    dataKey: import_prop_types32.default.string,
    disableLine: import_prop_types32.default.bool,
    disableTicks: import_prop_types32.default.bool,
    domainLimit: import_prop_types32.default.oneOfType([import_prop_types32.default.oneOf(["nice", "strict"]), import_prop_types32.default.func]),
    fill: import_prop_types32.default.string,
    hideTooltip: import_prop_types32.default.bool,
    id: import_prop_types32.default.oneOfType([import_prop_types32.default.number, import_prop_types32.default.string]),
    ignoreTooltip: import_prop_types32.default.bool,
    label: import_prop_types32.default.string,
    labelStyle: import_prop_types32.default.object,
    max: import_prop_types32.default.oneOfType([import_prop_types32.default.instanceOf(Date), import_prop_types32.default.number]),
    min: import_prop_types32.default.oneOfType([import_prop_types32.default.instanceOf(Date), import_prop_types32.default.number]),
    offset: import_prop_types32.default.number,
    position: import_prop_types32.default.oneOf(["left", "none", "right"]),
    reverse: import_prop_types32.default.bool,
    scaleType: import_prop_types32.default.oneOf(["linear"]),
    slotProps: import_prop_types32.default.object,
    slots: import_prop_types32.default.object,
    stroke: import_prop_types32.default.string,
    sx: import_prop_types32.default.oneOfType([import_prop_types32.default.arrayOf(import_prop_types32.default.oneOfType([import_prop_types32.default.func, import_prop_types32.default.object, import_prop_types32.default.bool])), import_prop_types32.default.func, import_prop_types32.default.object]),
    tickInterval: import_prop_types32.default.oneOfType([import_prop_types32.default.oneOf(["auto"]), import_prop_types32.default.array, import_prop_types32.default.func]),
    tickLabelInterval: import_prop_types32.default.oneOfType([import_prop_types32.default.oneOf(["auto"]), import_prop_types32.default.func]),
    tickLabelPlacement: import_prop_types32.default.oneOf(["middle", "tick"]),
    tickLabelStyle: import_prop_types32.default.object,
    tickMaxStep: import_prop_types32.default.number,
    tickMinStep: import_prop_types32.default.number,
    tickNumber: import_prop_types32.default.number,
    tickPlacement: import_prop_types32.default.oneOf(["end", "extremities", "middle", "start"]),
    tickSize: import_prop_types32.default.number,
    valueFormatter: import_prop_types32.default.func,
    width: import_prop_types32.default.number
  })]).isRequired)
} : void 0;
export {
  AnimatedArea,
  AnimatedLine,
  AreaElement,
  AreaPlot,
  LineChart,
  LineElement,
  LineHighlightElement,
  LineHighlightPlot,
  LinePlot,
  MarkElement,
  MarkPlot,
  areaElementClasses,
  getAreaElementUtilityClass,
  getHighlightElementUtilityClass,
  getLineElementUtilityClass,
  getMarkElementUtilityClass,
  lineElementClasses,
  lineHighlightElementClasses,
  markElementClasses
};
/*! Bundled license information:

use-sync-external-store/cjs/use-sync-external-store-shim.development.js:
  (**
   * @license React
   * use-sync-external-store-shim.development.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

use-sync-external-store/cjs/use-sync-external-store-shim/with-selector.development.js:
  (**
   * @license React
   * use-sync-external-store-shim/with-selector.development.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)
*/
//# sourceMappingURL=@mui_x-charts_LineChart.js.map
