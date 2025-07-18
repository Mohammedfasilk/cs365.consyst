import {
  elementAcceptingRef_default,
  getScrollbarSize,
  getValidReactChildren,
  integerPropType_default,
  usePreviousProps_default,
  visuallyHidden_default
} from "./chunk-X47RXYIZ.js";
import {
  HTMLElementType,
  Timeout,
  chainPropTypes,
  elementTypeAcceptingRef_default,
  extractEventHandlers_default,
  getReactElementRef,
  isFocusVisible,
  refType_default,
  resolveComponentProps_default,
  useLazyRef,
  useOnMount,
  useSlotProps_default,
  useTimeout
} from "./chunk-W36W3TFD.js";
import {
  ClassNameGenerator_default,
  capitalize,
  clamp_default,
  composeClasses,
  createChainedFunction,
  debounce,
  deepmerge,
  deprecatedPropType,
  exactProp,
  formatMuiErrorMessage,
  generateUtilityClass,
  generateUtilityClasses,
  getDisplayName,
  globalStateClasses,
  isGlobalState,
  isMuiElement,
  isPlainObject,
  ownerDocument,
  ownerWindow,
  requirePropFactory,
  resolveProps,
  setRef,
  unsupportedProp,
  useControlled,
  useEnhancedEffect_default,
  useEventCallback_default,
  useForkRef,
  useId
} from "./chunk-Y3TEIJFF.js";
import "./chunk-EZSJO6EY.js";
import "./chunk-KDVGFZWC.js";
import {
  require_react
} from "./chunk-W4EHDCLL.js";
import {
  __toESM
} from "./chunk-EWTE5DHJ.js";

// node_modules/@mui/utils/esm/ponyfillGlobal/ponyfillGlobal.js
var ponyfillGlobal_default = typeof window != "undefined" && window.Math == Math ? window : typeof self != "undefined" && self.Math == Math ? self : Function("return this")();

// node_modules/@mui/utils/esm/useIsFocusVisible/useIsFocusVisible.js
var React = __toESM(require_react(), 1);
var hadKeyboardEvent = true;
var hadFocusVisibleRecently = false;
var hadFocusVisibleRecentlyTimeout = new Timeout();
var inputTypesWhitelist = {
  text: true,
  search: true,
  url: true,
  tel: true,
  email: true,
  password: true,
  number: true,
  date: true,
  month: true,
  week: true,
  time: true,
  datetime: true,
  "datetime-local": true
};
function focusTriggersKeyboardModality(node) {
  const {
    type,
    tagName
  } = node;
  if (tagName === "INPUT" && inputTypesWhitelist[type] && !node.readOnly) {
    return true;
  }
  if (tagName === "TEXTAREA" && !node.readOnly) {
    return true;
  }
  if (node.isContentEditable) {
    return true;
  }
  return false;
}
function handleKeyDown(event) {
  if (event.metaKey || event.altKey || event.ctrlKey) {
    return;
  }
  hadKeyboardEvent = true;
}
function handlePointerDown() {
  hadKeyboardEvent = false;
}
function handleVisibilityChange() {
  if (this.visibilityState === "hidden") {
    if (hadFocusVisibleRecently) {
      hadKeyboardEvent = true;
    }
  }
}
function prepare(doc) {
  doc.addEventListener("keydown", handleKeyDown, true);
  doc.addEventListener("mousedown", handlePointerDown, true);
  doc.addEventListener("pointerdown", handlePointerDown, true);
  doc.addEventListener("touchstart", handlePointerDown, true);
  doc.addEventListener("visibilitychange", handleVisibilityChange, true);
}
function isFocusVisible2(event) {
  const {
    target
  } = event;
  try {
    return target.matches(":focus-visible");
  } catch (error) {
  }
  return hadKeyboardEvent || focusTriggersKeyboardModality(target);
}
function useIsFocusVisible() {
  const ref = React.useCallback((node) => {
    if (node != null) {
      prepare(node.ownerDocument);
    }
  }, []);
  const isFocusVisibleRef = React.useRef(false);
  function handleBlurVisible() {
    if (isFocusVisibleRef.current) {
      hadFocusVisibleRecently = true;
      hadFocusVisibleRecentlyTimeout.start(100, () => {
        hadFocusVisibleRecently = false;
      });
      isFocusVisibleRef.current = false;
      return true;
    }
    return false;
  }
  function handleFocusVisible(event) {
    if (isFocusVisible2(event)) {
      isFocusVisibleRef.current = true;
      return true;
    }
    return false;
  }
  return {
    isFocusVisibleRef,
    onFocus: handleFocusVisible,
    onBlur: handleBlurVisible,
    ref
  };
}

// node_modules/@mui/utils/esm/getReactNodeRef/getReactNodeRef.js
var React2 = __toESM(require_react(), 1);
function getReactNodeRef(element) {
  if (!element || !React2.isValidElement(element)) {
    return null;
  }
  return element.props.propertyIsEnumerable("ref") ? element.props.ref : (
    // @ts-expect-error element.ref is not included in the ReactElement type
    // We cannot check for it, but isValidElement is true at this point
    // https://github.com/DefinitelyTyped/DefinitelyTyped/discussions/70189
    element.ref
  );
}
export {
  HTMLElementType,
  chainPropTypes,
  clamp_default as clamp,
  deepmerge,
  elementAcceptingRef_default as elementAcceptingRef,
  elementTypeAcceptingRef_default as elementTypeAcceptingRef,
  exactProp,
  formatMuiErrorMessage,
  getDisplayName,
  getValidReactChildren,
  globalStateClasses,
  integerPropType_default as integerPropType,
  resolveProps as internal_resolveProps,
  isGlobalState,
  isPlainObject,
  ponyfillGlobal_default as ponyfillGlobal,
  refType_default as refType,
  ClassNameGenerator_default as unstable_ClassNameGenerator,
  Timeout as unstable_Timeout,
  capitalize as unstable_capitalize,
  composeClasses as unstable_composeClasses,
  createChainedFunction as unstable_createChainedFunction,
  debounce as unstable_debounce,
  deprecatedPropType as unstable_deprecatedPropType,
  extractEventHandlers_default as unstable_extractEventHandlers,
  generateUtilityClass as unstable_generateUtilityClass,
  generateUtilityClasses as unstable_generateUtilityClasses,
  getReactElementRef as unstable_getReactElementRef,
  getReactNodeRef as unstable_getReactNodeRef,
  getScrollbarSize as unstable_getScrollbarSize,
  isFocusVisible as unstable_isFocusVisible,
  isGlobalState as unstable_isGlobalState,
  isMuiElement as unstable_isMuiElement,
  ownerDocument as unstable_ownerDocument,
  ownerWindow as unstable_ownerWindow,
  requirePropFactory as unstable_requirePropFactory,
  resolveComponentProps_default as unstable_resolveComponentProps,
  setRef as unstable_setRef,
  unsupportedProp as unstable_unsupportedProp,
  useControlled as unstable_useControlled,
  useEnhancedEffect_default as unstable_useEnhancedEffect,
  useEventCallback_default as unstable_useEventCallback,
  useForkRef as unstable_useForkRef,
  useId as unstable_useId,
  useIsFocusVisible as unstable_useIsFocusVisible,
  useLazyRef as unstable_useLazyRef,
  useOnMount as unstable_useOnMount,
  useSlotProps_default as unstable_useSlotProps,
  useTimeout as unstable_useTimeout,
  usePreviousProps_default as usePreviousProps,
  visuallyHidden_default as visuallyHidden
};
/*! Bundled license information:

@mui/utils/esm/index.js:
  (**
   * @mui/utils v7.1.1
   *
   * @license MIT
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)
*/
//# sourceMappingURL=@mui_utils.js.map
