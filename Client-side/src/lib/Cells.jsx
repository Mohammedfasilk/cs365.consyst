
export const emptyTextCell = { type: "text", text: "" };

const numberFormat = new Intl.NumberFormat("en", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const percentNumberFormat = new Intl.NumberFormat("en", {
  style: "percent",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export const textCell = (text, className = "", style) => ({
  type: "text",
  text,
  className,
  style,
});

export const numberCell = (value, className = "", style) => ({
  type: "number",
  value,
  className,
  style,
  format: numberFormat,
});

export const percentCell = (value, className = "", style) => ({
  type: "number",
  value,
  className,
  style,
  format: percentNumberFormat,
});

export const nonEditable = (cell) => ({
  ...cell,
  nonEditable: true,
});

export const showZero = (cell) => ({
  ...cell,
  nanToZero: true,
  hideZero: false,
});

export const bottomLine = (cell) => ({
  ...cell,
  style: {
    ...cell.style,
    border: {
      ...cell.style?.border,
      bottom: {
        width: "1px",
        color: "#A6A6A6",
        style: "solid",
      },
    },
  },
});

export const noSideBorders = (cell) => ({
  ...cell,
  style: {
    ...cell.style,
    border: {
      ...cell.style?.border,
      left: {
        style: "none",
      },
      right: {
        style: "none",
      },
    },
  },
});

export function headerCell(month, additionalClassNames = "") {
  return nonEditable(
    textCell(month, `text-lg font-bold ${additionalClassNames}`, {
      background: "#336699",
      color: "white",
      border: {
        bottom: { style: "none" },
        left: { style: "none" },
        right: { style: "none" },
      },
      overflow: "wrap",
    })
  );
}
