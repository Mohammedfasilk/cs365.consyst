import {
  require_react
} from "./chunk-W4EHDCLL.js";
import {
  __toESM
} from "./chunk-EWTE5DHJ.js";

// node_modules/@radix-ui/react-use-previous/dist/index.mjs
var React = __toESM(require_react(), 1);
function usePrevious(value) {
  const ref = React.useRef({ value, previous: value });
  return React.useMemo(() => {
    if (ref.current.value !== value) {
      ref.current.previous = ref.current.value;
      ref.current.value = value;
    }
    return ref.current.previous;
  }, [value]);
}

export {
  usePrevious
};
//# sourceMappingURL=chunk-W3OWQV7F.js.map
