import {
  addDays,
  addMonths,
  addWeeks,
  addYears,
  differenceInCalendarDays,
  differenceInCalendarMonths,
  eachMonthOfInterval,
  enUS,
  endOfISOWeek,
  endOfMonth,
  endOfWeek,
  endOfYear,
  format,
  getISOWeek,
  getMonth,
  getWeek,
  getYear,
  isAfter,
  isBefore,
  isDate,
  isSameDay,
  isSameMonth,
  isSameYear,
  max,
  min,
  setMonth,
  setYear,
  startOfDay,
  startOfISOWeek,
  startOfMonth,
  startOfWeek,
  startOfYear
} from "./chunk-SVOPI2PF.js";
import {
  require_react
} from "./chunk-W4EHDCLL.js";
import {
  __export,
  __toESM
} from "./chunk-EWTE5DHJ.js";

// node_modules/react-day-picker/dist/esm/DayPicker.js
var import_react32 = __toESM(require_react(), 1);

// node_modules/@date-fns/tz/constants/index.js
var constructFromSymbol = Symbol.for("constructDateFrom");

// node_modules/@date-fns/tz/tzOffset/index.js
var offsetFormatCache = {};
var offsetCache = {};
function tzOffset(timeZone, date) {
  try {
    const format2 = offsetFormatCache[timeZone] || (offsetFormatCache[timeZone] = new Intl.DateTimeFormat("en-GB", {
      timeZone,
      hour: "numeric",
      timeZoneName: "longOffset"
    }).format);
    const offsetStr = format2(date).split("GMT")[1] || "";
    if (offsetStr in offsetCache) return offsetCache[offsetStr];
    return calcOffset(offsetStr, offsetStr.split(":"));
  } catch {
    if (timeZone in offsetCache) return offsetCache[timeZone];
    const captures = timeZone == null ? void 0 : timeZone.match(offsetRe);
    if (captures) return calcOffset(timeZone, captures.slice(1));
    return NaN;
  }
}
var offsetRe = /([+-]\d\d):?(\d\d)?/;
function calcOffset(cacheStr, values) {
  const hours = +values[0];
  const minutes = +(values[1] || 0);
  return offsetCache[cacheStr] = hours > 0 ? hours * 60 + minutes : hours * 60 - minutes;
}

// node_modules/@date-fns/tz/date/mini.js
var TZDateMini = class _TZDateMini extends Date {
  //#region static
  constructor(...args) {
    super();
    if (args.length > 1 && typeof args[args.length - 1] === "string") {
      this.timeZone = args.pop();
    }
    this.internal = /* @__PURE__ */ new Date();
    if (isNaN(tzOffset(this.timeZone, this))) {
      this.setTime(NaN);
    } else {
      if (!args.length) {
        this.setTime(Date.now());
      } else if (typeof args[0] === "number" && (args.length === 1 || args.length === 2 && typeof args[1] !== "number")) {
        this.setTime(args[0]);
      } else if (typeof args[0] === "string") {
        this.setTime(+new Date(args[0]));
      } else if (args[0] instanceof Date) {
        this.setTime(+args[0]);
      } else {
        this.setTime(+new Date(...args));
        adjustToSystemTZ(this, NaN);
        syncToInternal(this);
      }
    }
  }
  static tz(tz, ...args) {
    return args.length ? new _TZDateMini(...args, tz) : new _TZDateMini(Date.now(), tz);
  }
  //#endregion
  //#region time zone
  withTimeZone(timeZone) {
    return new _TZDateMini(+this, timeZone);
  }
  getTimezoneOffset() {
    return -tzOffset(this.timeZone, this);
  }
  //#endregion
  //#region time
  setTime(time) {
    Date.prototype.setTime.apply(this, arguments);
    syncToInternal(this);
    return +this;
  }
  //#endregion
  //#region date-fns integration
  [Symbol.for("constructDateFrom")](date) {
    return new _TZDateMini(+new Date(date), this.timeZone);
  }
  //#endregion
};
var re = /^(get|set)(?!UTC)/;
Object.getOwnPropertyNames(Date.prototype).forEach((method) => {
  if (!re.test(method)) return;
  const utcMethod = method.replace(re, "$1UTC");
  if (!TZDateMini.prototype[utcMethod]) return;
  if (method.startsWith("get")) {
    TZDateMini.prototype[method] = function() {
      return this.internal[utcMethod]();
    };
  } else {
    TZDateMini.prototype[method] = function() {
      Date.prototype[utcMethod].apply(this.internal, arguments);
      syncFromInternal(this);
      return +this;
    };
    TZDateMini.prototype[utcMethod] = function() {
      Date.prototype[utcMethod].apply(this, arguments);
      syncToInternal(this);
      return +this;
    };
  }
});
function syncToInternal(date) {
  date.internal.setTime(+date);
  date.internal.setUTCMinutes(date.internal.getUTCMinutes() - date.getTimezoneOffset());
}
function syncFromInternal(date) {
  Date.prototype.setFullYear.call(date, date.internal.getUTCFullYear(), date.internal.getUTCMonth(), date.internal.getUTCDate());
  Date.prototype.setHours.call(date, date.internal.getUTCHours(), date.internal.getUTCMinutes(), date.internal.getUTCSeconds(), date.internal.getUTCMilliseconds());
  adjustToSystemTZ(date);
}
function adjustToSystemTZ(date) {
  const offset = tzOffset(date.timeZone, date);
  const prevHour = /* @__PURE__ */ new Date(+date);
  prevHour.setUTCHours(prevHour.getUTCHours() - 1);
  const systemOffset = -(/* @__PURE__ */ new Date(+date)).getTimezoneOffset();
  const prevHourSystemOffset = -(/* @__PURE__ */ new Date(+prevHour)).getTimezoneOffset();
  const systemDSTChange = systemOffset - prevHourSystemOffset;
  const dstShift = Date.prototype.getHours.apply(date) !== date.internal.getUTCHours();
  if (systemDSTChange && dstShift) date.internal.setUTCMinutes(date.internal.getUTCMinutes() + systemDSTChange);
  const offsetDiff = systemOffset - offset;
  if (offsetDiff) Date.prototype.setUTCMinutes.call(date, Date.prototype.getUTCMinutes.call(date) + offsetDiff);
  const postOffset = tzOffset(date.timeZone, date);
  const postSystemOffset = -(/* @__PURE__ */ new Date(+date)).getTimezoneOffset();
  const postOffsetDiff = postSystemOffset - postOffset;
  const offsetChanged = postOffset !== offset;
  const postDiff = postOffsetDiff - offsetDiff;
  if (offsetChanged && postDiff) {
    Date.prototype.setUTCMinutes.call(date, Date.prototype.getUTCMinutes.call(date) + postDiff);
    const newOffset = tzOffset(date.timeZone, date);
    const offsetChange = postOffset - newOffset;
    if (offsetChange) {
      date.internal.setUTCMinutes(date.internal.getUTCMinutes() + offsetChange);
      Date.prototype.setUTCMinutes.call(date, Date.prototype.getUTCMinutes.call(date) + offsetChange);
    }
  }
}

// node_modules/@date-fns/tz/date/index.js
var TZDate = class _TZDate extends TZDateMini {
  //#region static
  static tz(tz, ...args) {
    return args.length ? new _TZDate(...args, tz) : new _TZDate(Date.now(), tz);
  }
  //#endregion
  //#region representation
  toISOString() {
    const [sign, hours, minutes] = this.tzComponents();
    const tz = `${sign}${hours}:${minutes}`;
    return this.internal.toISOString().slice(0, -1) + tz;
  }
  toString() {
    return `${this.toDateString()} ${this.toTimeString()}`;
  }
  toDateString() {
    const [day, date, month, year] = this.internal.toUTCString().split(" ");
    return `${day == null ? void 0 : day.slice(0, -1)} ${month} ${date} ${year}`;
  }
  toTimeString() {
    const time = this.internal.toUTCString().split(" ")[4];
    const [sign, hours, minutes] = this.tzComponents();
    return `${time} GMT${sign}${hours}${minutes} (${tzName(this.timeZone, this)})`;
  }
  toLocaleString(locales, options) {
    return Date.prototype.toLocaleString.call(this, locales, {
      ...options,
      timeZone: (options == null ? void 0 : options.timeZone) || this.timeZone
    });
  }
  toLocaleDateString(locales, options) {
    return Date.prototype.toLocaleDateString.call(this, locales, {
      ...options,
      timeZone: (options == null ? void 0 : options.timeZone) || this.timeZone
    });
  }
  toLocaleTimeString(locales, options) {
    return Date.prototype.toLocaleTimeString.call(this, locales, {
      ...options,
      timeZone: (options == null ? void 0 : options.timeZone) || this.timeZone
    });
  }
  //#endregion
  //#region private
  tzComponents() {
    const offset = this.getTimezoneOffset();
    const sign = offset > 0 ? "-" : "+";
    const hours = String(Math.floor(Math.abs(offset) / 60)).padStart(2, "0");
    const minutes = String(Math.abs(offset) % 60).padStart(2, "0");
    return [sign, hours, minutes];
  }
  //#endregion
  withTimeZone(timeZone) {
    return new _TZDate(+this, timeZone);
  }
  //#region date-fns integration
  [Symbol.for("constructDateFrom")](date) {
    return new _TZDate(+new Date(date), this.timeZone);
  }
  //#endregion
};
function tzName(tz, date) {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: tz,
    timeZoneName: "long"
  }).format(date).slice(12);
}

// node_modules/react-day-picker/dist/esm/UI.js
var UI;
(function(UI2) {
  UI2["Root"] = "root";
  UI2["Chevron"] = "chevron";
  UI2["Day"] = "day";
  UI2["DayButton"] = "day_button";
  UI2["CaptionLabel"] = "caption_label";
  UI2["Dropdowns"] = "dropdowns";
  UI2["Dropdown"] = "dropdown";
  UI2["DropdownRoot"] = "dropdown_root";
  UI2["Footer"] = "footer";
  UI2["MonthGrid"] = "month_grid";
  UI2["MonthCaption"] = "month_caption";
  UI2["MonthsDropdown"] = "months_dropdown";
  UI2["Month"] = "month";
  UI2["Months"] = "months";
  UI2["Nav"] = "nav";
  UI2["NextMonthButton"] = "button_next";
  UI2["PreviousMonthButton"] = "button_previous";
  UI2["Week"] = "week";
  UI2["Weeks"] = "weeks";
  UI2["Weekday"] = "weekday";
  UI2["Weekdays"] = "weekdays";
  UI2["WeekNumber"] = "week_number";
  UI2["WeekNumberHeader"] = "week_number_header";
  UI2["YearsDropdown"] = "years_dropdown";
})(UI || (UI = {}));
var DayFlag;
(function(DayFlag2) {
  DayFlag2["disabled"] = "disabled";
  DayFlag2["hidden"] = "hidden";
  DayFlag2["outside"] = "outside";
  DayFlag2["focused"] = "focused";
  DayFlag2["today"] = "today";
})(DayFlag || (DayFlag = {}));
var SelectionState;
(function(SelectionState2) {
  SelectionState2["range_end"] = "range_end";
  SelectionState2["range_middle"] = "range_middle";
  SelectionState2["range_start"] = "range_start";
  SelectionState2["selected"] = "selected";
})(SelectionState || (SelectionState = {}));
var Animation;
(function(Animation2) {
  Animation2["weeks_before_enter"] = "weeks_before_enter";
  Animation2["weeks_before_exit"] = "weeks_before_exit";
  Animation2["weeks_after_enter"] = "weeks_after_enter";
  Animation2["weeks_after_exit"] = "weeks_after_exit";
  Animation2["caption_after_enter"] = "caption_after_enter";
  Animation2["caption_after_exit"] = "caption_after_exit";
  Animation2["caption_before_enter"] = "caption_before_enter";
  Animation2["caption_before_exit"] = "caption_before_exit";
})(Animation || (Animation = {}));

// node_modules/react-day-picker/dist/esm/helpers/getBroadcastWeeksInMonth.js
var FIVE_WEEKS = 5;
var FOUR_WEEKS = 4;
function getBroadcastWeeksInMonth(month, dateLib2) {
  const firstDayOfMonth = dateLib2.startOfMonth(month);
  const firstDayOfWeek = firstDayOfMonth.getDay() > 0 ? firstDayOfMonth.getDay() : 7;
  const broadcastStartDate = dateLib2.addDays(month, -firstDayOfWeek + 1);
  const lastDateOfLastWeek = dateLib2.addDays(broadcastStartDate, FIVE_WEEKS * 7 - 1);
  const numberOfWeeks = dateLib2.getMonth(month) === dateLib2.getMonth(lastDateOfLastWeek) ? FIVE_WEEKS : FOUR_WEEKS;
  return numberOfWeeks;
}

// node_modules/react-day-picker/dist/esm/helpers/startOfBroadcastWeek.js
function startOfBroadcastWeek(date, dateLib2) {
  const firstOfMonth = dateLib2.startOfMonth(date);
  const dayOfWeek = firstOfMonth.getDay();
  if (dayOfWeek === 1) {
    return firstOfMonth;
  } else if (dayOfWeek === 0) {
    return dateLib2.addDays(firstOfMonth, -1 * 6);
  } else {
    return dateLib2.addDays(firstOfMonth, -1 * (dayOfWeek - 1));
  }
}

// node_modules/react-day-picker/dist/esm/helpers/endOfBroadcastWeek.js
function endOfBroadcastWeek(date, dateLib2) {
  const startDate = startOfBroadcastWeek(date, dateLib2);
  const numberOfWeeks = getBroadcastWeeksInMonth(date, dateLib2);
  const endDate = dateLib2.addDays(startDate, numberOfWeeks * 7 - 1);
  return endDate;
}

// node_modules/react-day-picker/dist/esm/classes/DateLib.js
var DateLib = class {
  /**
   * Creates an instance of `DateLib`.
   *
   * @param options Configuration options for the date library.
   * @param overrides Custom overrides for the date library functions.
   */
  constructor(options, overrides) {
    this.Date = Date;
    this.today = () => {
      var _a;
      if ((_a = this.overrides) == null ? void 0 : _a.today) {
        return this.overrides.today();
      }
      if (this.options.timeZone) {
        return TZDate.tz(this.options.timeZone);
      }
      return new this.Date();
    };
    this.newDate = (year, monthIndex, date) => {
      var _a;
      if ((_a = this.overrides) == null ? void 0 : _a.newDate) {
        return this.overrides.newDate(year, monthIndex, date);
      }
      if (this.options.timeZone) {
        return new TZDate(year, monthIndex, date, this.options.timeZone);
      }
      return new Date(year, monthIndex, date);
    };
    this.addDays = (date, amount) => {
      var _a;
      return ((_a = this.overrides) == null ? void 0 : _a.addDays) ? this.overrides.addDays(date, amount) : addDays(date, amount);
    };
    this.addMonths = (date, amount) => {
      var _a;
      return ((_a = this.overrides) == null ? void 0 : _a.addMonths) ? this.overrides.addMonths(date, amount) : addMonths(date, amount);
    };
    this.addWeeks = (date, amount) => {
      var _a;
      return ((_a = this.overrides) == null ? void 0 : _a.addWeeks) ? this.overrides.addWeeks(date, amount) : addWeeks(date, amount);
    };
    this.addYears = (date, amount) => {
      var _a;
      return ((_a = this.overrides) == null ? void 0 : _a.addYears) ? this.overrides.addYears(date, amount) : addYears(date, amount);
    };
    this.differenceInCalendarDays = (dateLeft, dateRight) => {
      var _a;
      return ((_a = this.overrides) == null ? void 0 : _a.differenceInCalendarDays) ? this.overrides.differenceInCalendarDays(dateLeft, dateRight) : differenceInCalendarDays(dateLeft, dateRight);
    };
    this.differenceInCalendarMonths = (dateLeft, dateRight) => {
      var _a;
      return ((_a = this.overrides) == null ? void 0 : _a.differenceInCalendarMonths) ? this.overrides.differenceInCalendarMonths(dateLeft, dateRight) : differenceInCalendarMonths(dateLeft, dateRight);
    };
    this.eachMonthOfInterval = (interval) => {
      var _a;
      return ((_a = this.overrides) == null ? void 0 : _a.eachMonthOfInterval) ? this.overrides.eachMonthOfInterval(interval) : eachMonthOfInterval(interval);
    };
    this.endOfBroadcastWeek = (date) => {
      var _a;
      return ((_a = this.overrides) == null ? void 0 : _a.endOfBroadcastWeek) ? this.overrides.endOfBroadcastWeek(date) : endOfBroadcastWeek(date, this);
    };
    this.endOfISOWeek = (date) => {
      var _a;
      return ((_a = this.overrides) == null ? void 0 : _a.endOfISOWeek) ? this.overrides.endOfISOWeek(date) : endOfISOWeek(date);
    };
    this.endOfMonth = (date) => {
      var _a;
      return ((_a = this.overrides) == null ? void 0 : _a.endOfMonth) ? this.overrides.endOfMonth(date) : endOfMonth(date);
    };
    this.endOfWeek = (date, options2) => {
      var _a;
      return ((_a = this.overrides) == null ? void 0 : _a.endOfWeek) ? this.overrides.endOfWeek(date, options2) : endOfWeek(date, this.options);
    };
    this.endOfYear = (date) => {
      var _a;
      return ((_a = this.overrides) == null ? void 0 : _a.endOfYear) ? this.overrides.endOfYear(date) : endOfYear(date);
    };
    this.format = (date, formatStr, options2) => {
      var _a;
      const formatted = ((_a = this.overrides) == null ? void 0 : _a.format) ? this.overrides.format(date, formatStr, this.options) : format(date, formatStr, this.options);
      if (this.options.numerals && this.options.numerals !== "latn") {
        return this.replaceDigits(formatted);
      }
      return formatted;
    };
    this.getISOWeek = (date) => {
      var _a;
      return ((_a = this.overrides) == null ? void 0 : _a.getISOWeek) ? this.overrides.getISOWeek(date) : getISOWeek(date);
    };
    this.getMonth = (date, options2) => {
      var _a;
      return ((_a = this.overrides) == null ? void 0 : _a.getMonth) ? this.overrides.getMonth(date, this.options) : getMonth(date, this.options);
    };
    this.getYear = (date, options2) => {
      var _a;
      return ((_a = this.overrides) == null ? void 0 : _a.getYear) ? this.overrides.getYear(date, this.options) : getYear(date, this.options);
    };
    this.getWeek = (date, options2) => {
      var _a;
      return ((_a = this.overrides) == null ? void 0 : _a.getWeek) ? this.overrides.getWeek(date, this.options) : getWeek(date, this.options);
    };
    this.isAfter = (date, dateToCompare) => {
      var _a;
      return ((_a = this.overrides) == null ? void 0 : _a.isAfter) ? this.overrides.isAfter(date, dateToCompare) : isAfter(date, dateToCompare);
    };
    this.isBefore = (date, dateToCompare) => {
      var _a;
      return ((_a = this.overrides) == null ? void 0 : _a.isBefore) ? this.overrides.isBefore(date, dateToCompare) : isBefore(date, dateToCompare);
    };
    this.isDate = (value) => {
      var _a;
      return ((_a = this.overrides) == null ? void 0 : _a.isDate) ? this.overrides.isDate(value) : isDate(value);
    };
    this.isSameDay = (dateLeft, dateRight) => {
      var _a;
      return ((_a = this.overrides) == null ? void 0 : _a.isSameDay) ? this.overrides.isSameDay(dateLeft, dateRight) : isSameDay(dateLeft, dateRight);
    };
    this.isSameMonth = (dateLeft, dateRight) => {
      var _a;
      return ((_a = this.overrides) == null ? void 0 : _a.isSameMonth) ? this.overrides.isSameMonth(dateLeft, dateRight) : isSameMonth(dateLeft, dateRight);
    };
    this.isSameYear = (dateLeft, dateRight) => {
      var _a;
      return ((_a = this.overrides) == null ? void 0 : _a.isSameYear) ? this.overrides.isSameYear(dateLeft, dateRight) : isSameYear(dateLeft, dateRight);
    };
    this.max = (dates) => {
      var _a;
      return ((_a = this.overrides) == null ? void 0 : _a.max) ? this.overrides.max(dates) : max(dates);
    };
    this.min = (dates) => {
      var _a;
      return ((_a = this.overrides) == null ? void 0 : _a.min) ? this.overrides.min(dates) : min(dates);
    };
    this.setMonth = (date, month) => {
      var _a;
      return ((_a = this.overrides) == null ? void 0 : _a.setMonth) ? this.overrides.setMonth(date, month) : setMonth(date, month);
    };
    this.setYear = (date, year) => {
      var _a;
      return ((_a = this.overrides) == null ? void 0 : _a.setYear) ? this.overrides.setYear(date, year) : setYear(date, year);
    };
    this.startOfBroadcastWeek = (date, dateLib2) => {
      var _a;
      return ((_a = this.overrides) == null ? void 0 : _a.startOfBroadcastWeek) ? this.overrides.startOfBroadcastWeek(date, this) : startOfBroadcastWeek(date, this);
    };
    this.startOfDay = (date) => {
      var _a;
      return ((_a = this.overrides) == null ? void 0 : _a.startOfDay) ? this.overrides.startOfDay(date) : startOfDay(date);
    };
    this.startOfISOWeek = (date) => {
      var _a;
      return ((_a = this.overrides) == null ? void 0 : _a.startOfISOWeek) ? this.overrides.startOfISOWeek(date) : startOfISOWeek(date);
    };
    this.startOfMonth = (date) => {
      var _a;
      return ((_a = this.overrides) == null ? void 0 : _a.startOfMonth) ? this.overrides.startOfMonth(date) : startOfMonth(date);
    };
    this.startOfWeek = (date, options2) => {
      var _a;
      return ((_a = this.overrides) == null ? void 0 : _a.startOfWeek) ? this.overrides.startOfWeek(date, this.options) : startOfWeek(date, this.options);
    };
    this.startOfYear = (date) => {
      var _a;
      return ((_a = this.overrides) == null ? void 0 : _a.startOfYear) ? this.overrides.startOfYear(date) : startOfYear(date);
    };
    this.options = { locale: enUS, ...options };
    this.overrides = overrides;
  }
  /**
   * Generates a mapping of Arabic digits (0-9) to the target numbering system
   * digits.
   *
   * @since 9.5.0
   * @returns A record mapping Arabic digits to the target numerals.
   */
  getDigitMap() {
    const { numerals = "latn" } = this.options;
    const formatter = new Intl.NumberFormat("en-US", {
      numberingSystem: numerals
    });
    const digitMap = {};
    for (let i = 0; i < 10; i++) {
      digitMap[i.toString()] = formatter.format(i);
    }
    return digitMap;
  }
  /**
   * Replaces Arabic digits in a string with the target numbering system digits.
   *
   * @since 9.5.0
   * @param input The string containing Arabic digits.
   * @returns The string with digits replaced.
   */
  replaceDigits(input) {
    const digitMap = this.getDigitMap();
    return input.replace(/\d/g, (digit) => digitMap[digit] || digit);
  }
  /**
   * Formats a number using the configured numbering system.
   *
   * @since 9.5.0
   * @param value The number to format.
   * @returns The formatted number as a string.
   */
  formatNumber(value) {
    return this.replaceDigits(value.toString());
  }
};
var defaultDateLib = new DateLib();
var dateLib = defaultDateLib;

// node_modules/react-day-picker/dist/esm/classes/CalendarDay.js
var CalendarDay = class {
  constructor(date, displayMonth, dateLib2 = defaultDateLib) {
    this.date = date;
    this.displayMonth = displayMonth;
    this.outside = Boolean(displayMonth && !dateLib2.isSameMonth(date, displayMonth));
    this.dateLib = dateLib2;
  }
  /**
   * Checks if this day is equal to another `CalendarDay`, considering both the
   * date and the displayed month.
   *
   * @param day The `CalendarDay` to compare with.
   * @returns `true` if the days are equal, otherwise `false`.
   */
  isEqualTo(day) {
    return this.dateLib.isSameDay(day.date, this.date) && this.dateLib.isSameMonth(day.displayMonth, this.displayMonth);
  }
};

// node_modules/react-day-picker/dist/esm/classes/CalendarMonth.js
var CalendarMonth = class {
  constructor(month, weeks) {
    this.date = month;
    this.weeks = weeks;
  }
};

// node_modules/react-day-picker/dist/esm/classes/CalendarWeek.js
var CalendarWeek = class {
  constructor(weekNumber, days) {
    this.days = days;
    this.weekNumber = weekNumber;
  }
};

// node_modules/react-day-picker/dist/esm/utils/rangeIncludesDate.js
function rangeIncludesDate(range, date, excludeEnds = false, dateLib2 = defaultDateLib) {
  let { from, to } = range;
  const { differenceInCalendarDays: differenceInCalendarDays2, isSameDay: isSameDay2 } = dateLib2;
  if (from && to) {
    const isRangeInverted = differenceInCalendarDays2(to, from) < 0;
    if (isRangeInverted) {
      [from, to] = [to, from];
    }
    const isInRange = differenceInCalendarDays2(date, from) >= (excludeEnds ? 1 : 0) && differenceInCalendarDays2(to, date) >= (excludeEnds ? 1 : 0);
    return isInRange;
  }
  if (!excludeEnds && to) {
    return isSameDay2(to, date);
  }
  if (!excludeEnds && from) {
    return isSameDay2(from, date);
  }
  return false;
}
var isDateInRange = (range, date) => rangeIncludesDate(range, date, false, defaultDateLib);

// node_modules/react-day-picker/dist/esm/utils/typeguards.js
function isDateInterval(matcher) {
  return Boolean(matcher && typeof matcher === "object" && "before" in matcher && "after" in matcher);
}
function isDateRange(value) {
  return Boolean(value && typeof value === "object" && "from" in value);
}
function isDateAfterType(value) {
  return Boolean(value && typeof value === "object" && "after" in value);
}
function isDateBeforeType(value) {
  return Boolean(value && typeof value === "object" && "before" in value);
}
function isDayOfWeekType(value) {
  return Boolean(value && typeof value === "object" && "dayOfWeek" in value);
}
function isDatesArray(value, dateLib2) {
  return Array.isArray(value) && value.every(dateLib2.isDate);
}

// node_modules/react-day-picker/dist/esm/utils/dateMatchModifiers.js
function dateMatchModifiers(date, matchers, dateLib2 = defaultDateLib) {
  const matchersArr = !Array.isArray(matchers) ? [matchers] : matchers;
  const { isSameDay: isSameDay2, differenceInCalendarDays: differenceInCalendarDays2, isAfter: isAfter2 } = dateLib2;
  return matchersArr.some((matcher) => {
    if (typeof matcher === "boolean") {
      return matcher;
    }
    if (dateLib2.isDate(matcher)) {
      return isSameDay2(date, matcher);
    }
    if (isDatesArray(matcher, dateLib2)) {
      return matcher.includes(date);
    }
    if (isDateRange(matcher)) {
      return rangeIncludesDate(matcher, date, false, dateLib2);
    }
    if (isDayOfWeekType(matcher)) {
      if (!Array.isArray(matcher.dayOfWeek)) {
        return matcher.dayOfWeek === date.getDay();
      }
      return matcher.dayOfWeek.includes(date.getDay());
    }
    if (isDateInterval(matcher)) {
      const diffBefore = differenceInCalendarDays2(matcher.before, date);
      const diffAfter = differenceInCalendarDays2(matcher.after, date);
      const isDayBefore = diffBefore > 0;
      const isDayAfter = diffAfter < 0;
      const isClosedInterval = isAfter2(matcher.before, matcher.after);
      if (isClosedInterval) {
        return isDayAfter && isDayBefore;
      } else {
        return isDayBefore || isDayAfter;
      }
    }
    if (isDateAfterType(matcher)) {
      return differenceInCalendarDays2(date, matcher.after) > 0;
    }
    if (isDateBeforeType(matcher)) {
      return differenceInCalendarDays2(matcher.before, date) > 0;
    }
    if (typeof matcher === "function") {
      return matcher(date);
    }
    return false;
  });
}
var isMatch = dateMatchModifiers;

// node_modules/react-day-picker/dist/esm/helpers/createGetModifiers.js
function createGetModifiers(days, props, dateLib2) {
  const { disabled, hidden, modifiers, showOutsideDays, broadcastCalendar, today } = props;
  const { isSameDay: isSameDay2, isSameMonth: isSameMonth2, startOfMonth: startOfMonth2, isBefore: isBefore2, endOfMonth: endOfMonth2, isAfter: isAfter2 } = dateLib2;
  const startMonth = props.startMonth && startOfMonth2(props.startMonth);
  const endMonth = props.endMonth && endOfMonth2(props.endMonth);
  const internalModifiersMap = {
    [DayFlag.focused]: [],
    [DayFlag.outside]: [],
    [DayFlag.disabled]: [],
    [DayFlag.hidden]: [],
    [DayFlag.today]: []
  };
  const customModifiersMap = {};
  for (const day of days) {
    const { date, displayMonth } = day;
    const isOutside = Boolean(displayMonth && !isSameMonth2(date, displayMonth));
    const isBeforeStartMonth = Boolean(startMonth && isBefore2(date, startMonth));
    const isAfterEndMonth = Boolean(endMonth && isAfter2(date, endMonth));
    const isDisabled = Boolean(disabled && dateMatchModifiers(date, disabled, dateLib2));
    const isHidden = Boolean(hidden && dateMatchModifiers(date, hidden, dateLib2)) || isBeforeStartMonth || isAfterEndMonth || // Broadcast calendar will show outside days as default
    !broadcastCalendar && !showOutsideDays && isOutside || broadcastCalendar && showOutsideDays === false && isOutside;
    const isToday = isSameDay2(date, today ?? dateLib2.today());
    if (isOutside)
      internalModifiersMap.outside.push(day);
    if (isDisabled)
      internalModifiersMap.disabled.push(day);
    if (isHidden)
      internalModifiersMap.hidden.push(day);
    if (isToday)
      internalModifiersMap.today.push(day);
    if (modifiers) {
      Object.keys(modifiers).forEach((name) => {
        const modifierValue = modifiers == null ? void 0 : modifiers[name];
        const isMatch2 = modifierValue ? dateMatchModifiers(date, modifierValue, dateLib2) : false;
        if (!isMatch2)
          return;
        if (customModifiersMap[name]) {
          customModifiersMap[name].push(day);
        } else {
          customModifiersMap[name] = [day];
        }
      });
    }
  }
  return (day) => {
    const dayFlags = {
      [DayFlag.focused]: false,
      [DayFlag.disabled]: false,
      [DayFlag.hidden]: false,
      [DayFlag.outside]: false,
      [DayFlag.today]: false
    };
    const customModifiers = {};
    for (const name in internalModifiersMap) {
      const days2 = internalModifiersMap[name];
      dayFlags[name] = days2.some((d) => d === day);
    }
    for (const name in customModifiersMap) {
      customModifiers[name] = customModifiersMap[name].some((d) => d === day);
    }
    return {
      ...dayFlags,
      // custom modifiers should override all the previous ones
      ...customModifiers
    };
  };
}

// node_modules/react-day-picker/dist/esm/helpers/getClassNamesForModifiers.js
function getClassNamesForModifiers(modifiers, classNames, modifiersClassNames = {}) {
  const modifierClassNames = Object.entries(modifiers).filter(([, active]) => active === true).reduce((previousValue, [key]) => {
    if (modifiersClassNames[key]) {
      previousValue.push(modifiersClassNames[key]);
    } else if (classNames[DayFlag[key]]) {
      previousValue.push(classNames[DayFlag[key]]);
    } else if (classNames[SelectionState[key]]) {
      previousValue.push(classNames[SelectionState[key]]);
    }
    return previousValue;
  }, [classNames[UI.Day]]);
  return modifierClassNames;
}

// node_modules/react-day-picker/dist/esm/components/custom-components.js
var custom_components_exports = {};
__export(custom_components_exports, {
  Button: () => Button,
  CaptionLabel: () => CaptionLabel,
  Chevron: () => Chevron,
  Day: () => Day,
  DayButton: () => DayButton,
  Dropdown: () => Dropdown,
  DropdownNav: () => DropdownNav,
  Footer: () => Footer,
  Month: () => Month,
  MonthCaption: () => MonthCaption,
  MonthGrid: () => MonthGrid,
  Months: () => Months,
  MonthsDropdown: () => MonthsDropdown,
  Nav: () => Nav,
  NextMonthButton: () => NextMonthButton,
  Option: () => Option,
  PreviousMonthButton: () => PreviousMonthButton,
  Root: () => Root,
  Select: () => Select,
  Week: () => Week,
  WeekNumber: () => WeekNumber,
  WeekNumberHeader: () => WeekNumberHeader,
  Weekday: () => Weekday,
  Weekdays: () => Weekdays,
  Weeks: () => Weeks,
  YearsDropdown: () => YearsDropdown
});

// node_modules/react-day-picker/dist/esm/components/Button.js
var import_react = __toESM(require_react(), 1);
function Button(props) {
  return import_react.default.createElement("button", { ...props });
}

// node_modules/react-day-picker/dist/esm/components/CaptionLabel.js
var import_react2 = __toESM(require_react(), 1);
function CaptionLabel(props) {
  return import_react2.default.createElement("span", { ...props });
}

// node_modules/react-day-picker/dist/esm/components/Chevron.js
var import_react3 = __toESM(require_react(), 1);
function Chevron(props) {
  const { size = 24, orientation = "left", className } = props;
  return import_react3.default.createElement(
    "svg",
    { className, width: size, height: size, viewBox: "0 0 24 24" },
    orientation === "up" && import_react3.default.createElement("polygon", { points: "6.77 17 12.5 11.43 18.24 17 20 15.28 12.5 8 5 15.28" }),
    orientation === "down" && import_react3.default.createElement("polygon", { points: "6.77 8 12.5 13.57 18.24 8 20 9.72 12.5 17 5 9.72" }),
    orientation === "left" && import_react3.default.createElement("polygon", { points: "16 18.112 9.81111111 12 16 5.87733333 14.0888889 4 6 12 14.0888889 20" }),
    orientation === "right" && import_react3.default.createElement("polygon", { points: "8 18.112 14.18888889 12 8 5.87733333 9.91111111 4 18 12 9.91111111 20" })
  );
}

// node_modules/react-day-picker/dist/esm/components/Day.js
var import_react4 = __toESM(require_react(), 1);
function Day(props) {
  const { day, modifiers, ...tdProps } = props;
  return import_react4.default.createElement("td", { ...tdProps });
}

// node_modules/react-day-picker/dist/esm/components/DayButton.js
var import_react5 = __toESM(require_react(), 1);
function DayButton(props) {
  const { day, modifiers, ...buttonProps } = props;
  const ref = import_react5.default.useRef(null);
  import_react5.default.useEffect(() => {
    var _a;
    if (modifiers.focused)
      (_a = ref.current) == null ? void 0 : _a.focus();
  }, [modifiers.focused]);
  return import_react5.default.createElement("button", { ref, ...buttonProps });
}

// node_modules/react-day-picker/dist/esm/components/Dropdown.js
var import_react6 = __toESM(require_react(), 1);
function Dropdown(props) {
  const { options, className, components, classNames, ...selectProps } = props;
  const cssClassSelect = [classNames[UI.Dropdown], className].join(" ");
  const selectedOption = options == null ? void 0 : options.find(({ value }) => value === selectProps.value);
  return import_react6.default.createElement(
    "span",
    { "data-disabled": selectProps.disabled, className: classNames[UI.DropdownRoot] },
    import_react6.default.createElement(components.Select, { className: cssClassSelect, ...selectProps }, options == null ? void 0 : options.map(({ value, label, disabled }) => import_react6.default.createElement(components.Option, { key: value, value, disabled }, label))),
    import_react6.default.createElement(
      "span",
      { className: classNames[UI.CaptionLabel], "aria-hidden": true },
      selectedOption == null ? void 0 : selectedOption.label,
      import_react6.default.createElement(components.Chevron, { orientation: "down", size: 18, className: classNames[UI.Chevron] })
    )
  );
}

// node_modules/react-day-picker/dist/esm/components/DropdownNav.js
var import_react7 = __toESM(require_react(), 1);
function DropdownNav(props) {
  return import_react7.default.createElement("div", { ...props });
}

// node_modules/react-day-picker/dist/esm/components/Footer.js
var import_react8 = __toESM(require_react(), 1);
function Footer(props) {
  return import_react8.default.createElement("div", { ...props });
}

// node_modules/react-day-picker/dist/esm/components/Month.js
var import_react9 = __toESM(require_react(), 1);
function Month(props) {
  const { calendarMonth, displayIndex, ...divProps } = props;
  return import_react9.default.createElement("div", { ...divProps }, props.children);
}

// node_modules/react-day-picker/dist/esm/components/MonthCaption.js
var import_react10 = __toESM(require_react(), 1);
function MonthCaption(props) {
  const { calendarMonth, displayIndex, ...divProps } = props;
  return import_react10.default.createElement("div", { ...divProps });
}

// node_modules/react-day-picker/dist/esm/components/MonthGrid.js
var import_react11 = __toESM(require_react(), 1);
function MonthGrid(props) {
  return import_react11.default.createElement("table", { ...props });
}

// node_modules/react-day-picker/dist/esm/components/Months.js
var import_react12 = __toESM(require_react(), 1);
function Months(props) {
  return import_react12.default.createElement("div", { ...props });
}

// node_modules/react-day-picker/dist/esm/components/MonthsDropdown.js
var import_react14 = __toESM(require_react(), 1);

// node_modules/react-day-picker/dist/esm/useDayPicker.js
var import_react13 = __toESM(require_react(), 1);
var dayPickerContext = (0, import_react13.createContext)(void 0);
function useDayPicker() {
  const context = (0, import_react13.useContext)(dayPickerContext);
  if (context === void 0) {
    throw new Error("useDayPicker() must be used within a custom component.");
  }
  return context;
}

// node_modules/react-day-picker/dist/esm/components/MonthsDropdown.js
function MonthsDropdown(props) {
  const { components } = useDayPicker();
  return import_react14.default.createElement(components.Dropdown, { ...props });
}

// node_modules/react-day-picker/dist/esm/components/Nav.js
var import_react15 = __toESM(require_react(), 1);
function Nav(props) {
  const { onPreviousClick, onNextClick, previousMonth, nextMonth, ...navProps } = props;
  const { components, classNames, labels: { labelPrevious: labelPrevious2, labelNext: labelNext2 } } = useDayPicker();
  const handleNextClick = (0, import_react15.useCallback)((e) => {
    if (nextMonth) {
      onNextClick == null ? void 0 : onNextClick(e);
    }
  }, [nextMonth, onNextClick]);
  const handlePreviousClick = (0, import_react15.useCallback)((e) => {
    if (previousMonth) {
      onPreviousClick == null ? void 0 : onPreviousClick(e);
    }
  }, [previousMonth, onPreviousClick]);
  return import_react15.default.createElement(
    "nav",
    { ...navProps },
    import_react15.default.createElement(
      components.PreviousMonthButton,
      { type: "button", className: classNames[UI.PreviousMonthButton], tabIndex: previousMonth ? void 0 : -1, "aria-disabled": previousMonth ? void 0 : true, "aria-label": labelPrevious2(previousMonth), onClick: handlePreviousClick },
      import_react15.default.createElement(components.Chevron, { disabled: previousMonth ? void 0 : true, className: classNames[UI.Chevron], orientation: "left" })
    ),
    import_react15.default.createElement(
      components.NextMonthButton,
      { type: "button", className: classNames[UI.NextMonthButton], tabIndex: nextMonth ? void 0 : -1, "aria-disabled": nextMonth ? void 0 : true, "aria-label": labelNext2(nextMonth), onClick: handleNextClick },
      import_react15.default.createElement(components.Chevron, { disabled: nextMonth ? void 0 : true, orientation: "right", className: classNames[UI.Chevron] })
    )
  );
}

// node_modules/react-day-picker/dist/esm/components/NextMonthButton.js
var import_react16 = __toESM(require_react(), 1);
function NextMonthButton(props) {
  const { components } = useDayPicker();
  return import_react16.default.createElement(components.Button, { ...props });
}

// node_modules/react-day-picker/dist/esm/components/Option.js
var import_react17 = __toESM(require_react(), 1);
function Option(props) {
  return import_react17.default.createElement("option", { ...props });
}

// node_modules/react-day-picker/dist/esm/components/PreviousMonthButton.js
var import_react18 = __toESM(require_react(), 1);
function PreviousMonthButton(props) {
  const { components } = useDayPicker();
  return import_react18.default.createElement(components.Button, { ...props });
}

// node_modules/react-day-picker/dist/esm/components/Root.js
var import_react19 = __toESM(require_react(), 1);
function Root(props) {
  const { rootRef, ...rest } = props;
  return import_react19.default.createElement("div", { ...rest, ref: rootRef });
}

// node_modules/react-day-picker/dist/esm/components/Select.js
var import_react20 = __toESM(require_react(), 1);
function Select(props) {
  return import_react20.default.createElement("select", { ...props });
}

// node_modules/react-day-picker/dist/esm/components/Week.js
var import_react21 = __toESM(require_react(), 1);
function Week(props) {
  const { week, ...trProps } = props;
  return import_react21.default.createElement("tr", { ...trProps });
}

// node_modules/react-day-picker/dist/esm/components/Weekday.js
var import_react22 = __toESM(require_react(), 1);
function Weekday(props) {
  return import_react22.default.createElement("th", { ...props });
}

// node_modules/react-day-picker/dist/esm/components/Weekdays.js
var import_react23 = __toESM(require_react(), 1);
function Weekdays(props) {
  return import_react23.default.createElement(
    "thead",
    { "aria-hidden": true },
    import_react23.default.createElement("tr", { ...props })
  );
}

// node_modules/react-day-picker/dist/esm/components/WeekNumber.js
var import_react24 = __toESM(require_react(), 1);
function WeekNumber(props) {
  const { week, ...thProps } = props;
  return import_react24.default.createElement("th", { ...thProps });
}

// node_modules/react-day-picker/dist/esm/components/WeekNumberHeader.js
var import_react25 = __toESM(require_react(), 1);
function WeekNumberHeader(props) {
  return import_react25.default.createElement("th", { ...props });
}

// node_modules/react-day-picker/dist/esm/components/Weeks.js
var import_react26 = __toESM(require_react(), 1);
function Weeks(props) {
  return import_react26.default.createElement("tbody", { ...props });
}

// node_modules/react-day-picker/dist/esm/components/YearsDropdown.js
var import_react27 = __toESM(require_react(), 1);
function YearsDropdown(props) {
  const { components } = useDayPicker();
  return import_react27.default.createElement(components.Dropdown, { ...props });
}

// node_modules/react-day-picker/dist/esm/helpers/getComponents.js
function getComponents(customComponents) {
  return {
    ...custom_components_exports,
    ...customComponents
  };
}

// node_modules/react-day-picker/dist/esm/helpers/getDataAttributes.js
function getDataAttributes(props) {
  const dataAttributes = {
    "data-mode": props.mode ?? void 0,
    "data-required": "required" in props ? props.required : void 0,
    "data-multiple-months": props.numberOfMonths && props.numberOfMonths > 1 || void 0,
    "data-week-numbers": props.showWeekNumber || void 0,
    "data-broadcast-calendar": props.broadcastCalendar || void 0,
    "data-nav-layout": props.navLayout || void 0
  };
  Object.entries(props).forEach(([key, val]) => {
    if (key.startsWith("data-")) {
      dataAttributes[key] = val;
    }
  });
  return dataAttributes;
}

// node_modules/react-day-picker/dist/esm/helpers/getDefaultClassNames.js
function getDefaultClassNames() {
  const classNames = {};
  for (const key in UI) {
    classNames[UI[key]] = `rdp-${UI[key]}`;
  }
  for (const key in DayFlag) {
    classNames[DayFlag[key]] = `rdp-${DayFlag[key]}`;
  }
  for (const key in SelectionState) {
    classNames[SelectionState[key]] = `rdp-${SelectionState[key]}`;
  }
  for (const key in Animation) {
    classNames[Animation[key]] = `rdp-${Animation[key]}`;
  }
  return classNames;
}

// node_modules/react-day-picker/dist/esm/formatters/index.js
var formatters_exports = {};
__export(formatters_exports, {
  formatCaption: () => formatCaption,
  formatDay: () => formatDay,
  formatMonthCaption: () => formatMonthCaption,
  formatMonthDropdown: () => formatMonthDropdown,
  formatWeekNumber: () => formatWeekNumber,
  formatWeekNumberHeader: () => formatWeekNumberHeader,
  formatWeekdayName: () => formatWeekdayName,
  formatYearCaption: () => formatYearCaption,
  formatYearDropdown: () => formatYearDropdown
});

// node_modules/react-day-picker/dist/esm/formatters/formatCaption.js
function formatCaption(month, options, dateLib2) {
  return (dateLib2 ?? new DateLib(options)).format(month, "LLLL y");
}
var formatMonthCaption = formatCaption;

// node_modules/react-day-picker/dist/esm/formatters/formatDay.js
function formatDay(date, options, dateLib2) {
  return (dateLib2 ?? new DateLib(options)).format(date, "d");
}

// node_modules/react-day-picker/dist/esm/formatters/formatMonthDropdown.js
function formatMonthDropdown(month, dateLib2 = defaultDateLib) {
  return dateLib2.format(month, "LLLL");
}

// node_modules/react-day-picker/dist/esm/formatters/formatWeekNumber.js
function formatWeekNumber(weekNumber, dateLib2 = defaultDateLib) {
  if (weekNumber < 10) {
    return dateLib2.formatNumber(`0${weekNumber.toLocaleString()}`);
  }
  return dateLib2.formatNumber(`${weekNumber.toLocaleString()}`);
}

// node_modules/react-day-picker/dist/esm/formatters/formatWeekNumberHeader.js
function formatWeekNumberHeader() {
  return ``;
}

// node_modules/react-day-picker/dist/esm/formatters/formatWeekdayName.js
function formatWeekdayName(weekday, options, dateLib2) {
  return (dateLib2 ?? new DateLib(options)).format(weekday, "cccccc");
}

// node_modules/react-day-picker/dist/esm/formatters/formatYearDropdown.js
function formatYearDropdown(year, dateLib2 = defaultDateLib) {
  return dateLib2.format(year, "yyyy");
}
var formatYearCaption = formatYearDropdown;

// node_modules/react-day-picker/dist/esm/helpers/getFormatters.js
function getFormatters(customFormatters) {
  if ((customFormatters == null ? void 0 : customFormatters.formatMonthCaption) && !customFormatters.formatCaption) {
    customFormatters.formatCaption = customFormatters.formatMonthCaption;
  }
  if ((customFormatters == null ? void 0 : customFormatters.formatYearCaption) && !customFormatters.formatYearDropdown) {
    customFormatters.formatYearDropdown = customFormatters.formatYearCaption;
  }
  return {
    ...formatters_exports,
    ...customFormatters
  };
}

// node_modules/react-day-picker/dist/esm/helpers/getMonthOptions.js
function getMonthOptions(displayMonth, navStart, navEnd, formatters, dateLib2) {
  const { startOfMonth: startOfMonth2, startOfYear: startOfYear2, endOfYear: endOfYear2, eachMonthOfInterval: eachMonthOfInterval2, getMonth: getMonth2 } = dateLib2;
  const months = eachMonthOfInterval2({
    start: startOfYear2(displayMonth),
    end: endOfYear2(displayMonth)
  });
  const options = months.map((month) => {
    const label = formatters.formatMonthDropdown(month, dateLib2);
    const value = getMonth2(month);
    const disabled = navStart && month < startOfMonth2(navStart) || navEnd && month > startOfMonth2(navEnd) || false;
    return { value, label, disabled };
  });
  return options;
}

// node_modules/react-day-picker/dist/esm/helpers/getStyleForModifiers.js
function getStyleForModifiers(dayModifiers, styles = {}, modifiersStyles = {}) {
  let style = { ...styles == null ? void 0 : styles[UI.Day] };
  Object.entries(dayModifiers).filter(([, active]) => active === true).forEach(([modifier]) => {
    style = {
      ...style,
      ...modifiersStyles == null ? void 0 : modifiersStyles[modifier]
    };
  });
  return style;
}

// node_modules/react-day-picker/dist/esm/helpers/getWeekdays.js
function getWeekdays(dateLib2, ISOWeek, broadcastCalendar) {
  const today = dateLib2.today();
  const start = broadcastCalendar ? dateLib2.startOfBroadcastWeek(today, dateLib2) : ISOWeek ? dateLib2.startOfISOWeek(today) : dateLib2.startOfWeek(today);
  const days = [];
  for (let i = 0; i < 7; i++) {
    const day = dateLib2.addDays(start, i);
    days.push(day);
  }
  return days;
}

// node_modules/react-day-picker/dist/esm/helpers/getYearOptions.js
function getYearOptions(navStart, navEnd, formatters, dateLib2) {
  if (!navStart)
    return void 0;
  if (!navEnd)
    return void 0;
  const { startOfYear: startOfYear2, endOfYear: endOfYear2, addYears: addYears2, getYear: getYear2, isBefore: isBefore2, isSameYear: isSameYear2 } = dateLib2;
  const firstNavYear = startOfYear2(navStart);
  const lastNavYear = endOfYear2(navEnd);
  const years = [];
  let year = firstNavYear;
  while (isBefore2(year, lastNavYear) || isSameYear2(year, lastNavYear)) {
    years.push(year);
    year = addYears2(year, 1);
  }
  return years.map((year2) => {
    const label = formatters.formatYearDropdown(year2, dateLib2);
    return {
      value: getYear2(year2),
      label,
      disabled: false
    };
  });
}

// node_modules/react-day-picker/dist/esm/labels/index.js
var labels_exports = {};
__export(labels_exports, {
  labelCaption: () => labelCaption,
  labelDay: () => labelDay,
  labelDayButton: () => labelDayButton,
  labelGrid: () => labelGrid,
  labelGridcell: () => labelGridcell,
  labelMonthDropdown: () => labelMonthDropdown,
  labelNav: () => labelNav,
  labelNext: () => labelNext,
  labelPrevious: () => labelPrevious,
  labelWeekNumber: () => labelWeekNumber,
  labelWeekNumberHeader: () => labelWeekNumberHeader,
  labelWeekday: () => labelWeekday,
  labelYearDropdown: () => labelYearDropdown
});

// node_modules/react-day-picker/dist/esm/labels/labelGrid.js
function labelGrid(date, options, dateLib2) {
  return (dateLib2 ?? new DateLib(options)).format(date, "LLLL y");
}
var labelCaption = labelGrid;

// node_modules/react-day-picker/dist/esm/labels/labelGridcell.js
function labelGridcell(date, modifiers, options, dateLib2) {
  let label = (dateLib2 ?? new DateLib(options)).format(date, "PPPP");
  if (modifiers == null ? void 0 : modifiers.today) {
    label = `Today, ${label}`;
  }
  return label;
}

// node_modules/react-day-picker/dist/esm/labels/labelDayButton.js
function labelDayButton(date, modifiers, options, dateLib2) {
  let label = (dateLib2 ?? new DateLib(options)).format(date, "PPPP");
  if (modifiers.today)
    label = `Today, ${label}`;
  if (modifiers.selected)
    label = `${label}, selected`;
  return label;
}
var labelDay = labelDayButton;

// node_modules/react-day-picker/dist/esm/labels/labelNav.js
function labelNav() {
  return "";
}

// node_modules/react-day-picker/dist/esm/labels/labelMonthDropdown.js
function labelMonthDropdown(options) {
  return "Choose the Month";
}

// node_modules/react-day-picker/dist/esm/labels/labelNext.js
function labelNext(month) {
  return "Go to the Next Month";
}

// node_modules/react-day-picker/dist/esm/labels/labelPrevious.js
function labelPrevious(month) {
  return "Go to the Previous Month";
}

// node_modules/react-day-picker/dist/esm/labels/labelWeekday.js
function labelWeekday(date, options, dateLib2) {
  return (dateLib2 ?? new DateLib(options)).format(date, "cccc");
}

// node_modules/react-day-picker/dist/esm/labels/labelWeekNumber.js
function labelWeekNumber(weekNumber, options) {
  return `Week ${weekNumber}`;
}

// node_modules/react-day-picker/dist/esm/labels/labelWeekNumberHeader.js
function labelWeekNumberHeader(options) {
  return "Week Number";
}

// node_modules/react-day-picker/dist/esm/labels/labelYearDropdown.js
function labelYearDropdown(options) {
  return "Choose the Year";
}

// node_modules/react-day-picker/dist/esm/useAnimation.js
var import_react28 = __toESM(require_react(), 1);
var asHtmlElement = (element) => {
  if (element instanceof HTMLElement)
    return element;
  return null;
};
var queryMonthEls = (element) => [
  ...element.querySelectorAll("[data-animated-month]") ?? []
];
var queryMonthEl = (element) => asHtmlElement(element.querySelector("[data-animated-month]"));
var queryCaptionEl = (element) => asHtmlElement(element.querySelector("[data-animated-caption]"));
var queryWeeksEl = (element) => asHtmlElement(element.querySelector("[data-animated-weeks]"));
var queryNavEl = (element) => asHtmlElement(element.querySelector("[data-animated-nav]"));
var queryWeekdaysEl = (element) => asHtmlElement(element.querySelector("[data-animated-weekdays]"));
function useAnimation(rootElRef, enabled, { classNames, months, focused, dateLib: dateLib2 }) {
  const previousRootElSnapshotRef = (0, import_react28.useRef)(null);
  const previousMonthsRef = (0, import_react28.useRef)(months);
  const animatingRef = (0, import_react28.useRef)(false);
  (0, import_react28.useLayoutEffect)(() => {
    const previousMonths = previousMonthsRef.current;
    previousMonthsRef.current = months;
    if (!enabled || !rootElRef.current || // safety check because the ref can be set to anything by consumers
    !(rootElRef.current instanceof HTMLElement) || // validation required for the animation to work as expected
    months.length === 0 || previousMonths.length === 0 || months.length !== previousMonths.length) {
      return;
    }
    const isSameMonth2 = dateLib2.isSameMonth(months[0].date, previousMonths[0].date);
    const isAfterPreviousMonth = dateLib2.isAfter(months[0].date, previousMonths[0].date);
    const captionAnimationClass = isAfterPreviousMonth ? classNames[Animation.caption_after_enter] : classNames[Animation.caption_before_enter];
    const weeksAnimationClass = isAfterPreviousMonth ? classNames[Animation.weeks_after_enter] : classNames[Animation.weeks_before_enter];
    const previousRootElSnapshot = previousRootElSnapshotRef.current;
    const rootElSnapshot = rootElRef.current.cloneNode(true);
    if (rootElSnapshot instanceof HTMLElement) {
      const currentMonthElsSnapshot = queryMonthEls(rootElSnapshot);
      currentMonthElsSnapshot.forEach((currentMonthElSnapshot) => {
        if (!(currentMonthElSnapshot instanceof HTMLElement))
          return;
        const previousMonthElSnapshot = queryMonthEl(currentMonthElSnapshot);
        if (previousMonthElSnapshot && currentMonthElSnapshot.contains(previousMonthElSnapshot)) {
          currentMonthElSnapshot.removeChild(previousMonthElSnapshot);
        }
        const captionEl = queryCaptionEl(currentMonthElSnapshot);
        if (captionEl) {
          captionEl.classList.remove(captionAnimationClass);
        }
        const weeksEl = queryWeeksEl(currentMonthElSnapshot);
        if (weeksEl) {
          weeksEl.classList.remove(weeksAnimationClass);
        }
      });
      previousRootElSnapshotRef.current = rootElSnapshot;
    } else {
      previousRootElSnapshotRef.current = null;
    }
    if (animatingRef.current || isSameMonth2 || // skip animation if a day is focused because it can cause issues to the animation and is better for a11y
    focused) {
      return;
    }
    const previousMonthEls = previousRootElSnapshot instanceof HTMLElement ? queryMonthEls(previousRootElSnapshot) : [];
    const currentMonthEls = queryMonthEls(rootElRef.current);
    if (currentMonthEls && currentMonthEls.every((el) => el instanceof HTMLElement) && previousMonthEls && previousMonthEls.every((el) => el instanceof HTMLElement)) {
      animatingRef.current = true;
      const cleanUpFunctions = [];
      rootElRef.current.style.isolation = "isolate";
      const navEl = queryNavEl(rootElRef.current);
      if (navEl) {
        navEl.style.zIndex = "1";
      }
      currentMonthEls.forEach((currentMonthEl, index) => {
        const previousMonthEl = previousMonthEls[index];
        if (!previousMonthEl) {
          return;
        }
        currentMonthEl.style.position = "relative";
        currentMonthEl.style.overflow = "hidden";
        const captionEl = queryCaptionEl(currentMonthEl);
        if (captionEl) {
          captionEl.classList.add(captionAnimationClass);
        }
        const weeksEl = queryWeeksEl(currentMonthEl);
        if (weeksEl) {
          weeksEl.classList.add(weeksAnimationClass);
        }
        const cleanUp = () => {
          animatingRef.current = false;
          if (rootElRef.current) {
            rootElRef.current.style.isolation = "";
          }
          if (navEl) {
            navEl.style.zIndex = "";
          }
          if (captionEl) {
            captionEl.classList.remove(captionAnimationClass);
          }
          if (weeksEl) {
            weeksEl.classList.remove(weeksAnimationClass);
          }
          currentMonthEl.style.position = "";
          currentMonthEl.style.overflow = "";
          if (currentMonthEl.contains(previousMonthEl)) {
            currentMonthEl.removeChild(previousMonthEl);
          }
        };
        cleanUpFunctions.push(cleanUp);
        previousMonthEl.style.pointerEvents = "none";
        previousMonthEl.style.position = "absolute";
        previousMonthEl.style.overflow = "hidden";
        previousMonthEl.setAttribute("aria-hidden", "true");
        const previousWeekdaysEl = queryWeekdaysEl(previousMonthEl);
        if (previousWeekdaysEl) {
          previousWeekdaysEl.style.opacity = "0";
        }
        const previousCaptionEl = queryCaptionEl(previousMonthEl);
        if (previousCaptionEl) {
          previousCaptionEl.classList.add(isAfterPreviousMonth ? classNames[Animation.caption_before_exit] : classNames[Animation.caption_after_exit]);
          previousCaptionEl.addEventListener("animationend", cleanUp);
        }
        const previousWeeksEl = queryWeeksEl(previousMonthEl);
        if (previousWeeksEl) {
          previousWeeksEl.classList.add(isAfterPreviousMonth ? classNames[Animation.weeks_before_exit] : classNames[Animation.weeks_after_exit]);
        }
        currentMonthEl.insertBefore(previousMonthEl, currentMonthEl.firstChild);
      });
    }
  });
}

// node_modules/react-day-picker/dist/esm/useCalendar.js
var import_react30 = __toESM(require_react(), 1);

// node_modules/react-day-picker/dist/esm/helpers/getDates.js
function getDates(displayMonths, maxDate, props, dateLib2) {
  const firstMonth = displayMonths[0];
  const lastMonth = displayMonths[displayMonths.length - 1];
  const { ISOWeek, fixedWeeks, broadcastCalendar } = props ?? {};
  const { addDays: addDays2, differenceInCalendarDays: differenceInCalendarDays2, differenceInCalendarMonths: differenceInCalendarMonths2, endOfBroadcastWeek: endOfBroadcastWeek2, endOfISOWeek: endOfISOWeek2, endOfMonth: endOfMonth2, endOfWeek: endOfWeek2, isAfter: isAfter2, startOfBroadcastWeek: startOfBroadcastWeek2, startOfISOWeek: startOfISOWeek2, startOfWeek: startOfWeek2 } = dateLib2;
  const startWeekFirstDate = broadcastCalendar ? startOfBroadcastWeek2(firstMonth, dateLib2) : ISOWeek ? startOfISOWeek2(firstMonth) : startOfWeek2(firstMonth);
  const endWeekLastDate = broadcastCalendar ? endOfBroadcastWeek2(lastMonth) : ISOWeek ? endOfISOWeek2(endOfMonth2(lastMonth)) : endOfWeek2(endOfMonth2(lastMonth));
  const nOfDays = differenceInCalendarDays2(endWeekLastDate, startWeekFirstDate);
  const nOfMonths = differenceInCalendarMonths2(lastMonth, firstMonth) + 1;
  const dates = [];
  for (let i = 0; i <= nOfDays; i++) {
    const date = addDays2(startWeekFirstDate, i);
    if (maxDate && isAfter2(date, maxDate)) {
      break;
    }
    dates.push(date);
  }
  const nrOfDaysWithFixedWeeks = broadcastCalendar ? 35 : 42;
  const extraDates = nrOfDaysWithFixedWeeks * nOfMonths;
  if (fixedWeeks && dates.length < extraDates) {
    const daysToAdd = extraDates - dates.length;
    for (let i = 0; i < daysToAdd; i++) {
      const date = addDays2(dates[dates.length - 1], 1);
      dates.push(date);
    }
  }
  return dates;
}

// node_modules/react-day-picker/dist/esm/helpers/getDays.js
function getDays(calendarMonths) {
  const initialDays = [];
  return calendarMonths.reduce((days, month) => {
    const weekDays = month.weeks.reduce((weekDays2, week) => {
      return [...weekDays2, ...week.days];
    }, initialDays);
    return [...days, ...weekDays];
  }, initialDays);
}

// node_modules/react-day-picker/dist/esm/helpers/getDisplayMonths.js
function getDisplayMonths(firstDisplayedMonth, calendarEndMonth, props, dateLib2) {
  const { numberOfMonths = 1 } = props;
  const months = [];
  for (let i = 0; i < numberOfMonths; i++) {
    const month = dateLib2.addMonths(firstDisplayedMonth, i);
    if (calendarEndMonth && month > calendarEndMonth) {
      break;
    }
    months.push(month);
  }
  return months;
}

// node_modules/react-day-picker/dist/esm/helpers/getInitialMonth.js
function getInitialMonth(props, dateLib2) {
  const { month, defaultMonth, today = dateLib2.today(), numberOfMonths = 1, endMonth, startMonth } = props;
  let initialMonth = month || defaultMonth || today;
  const { differenceInCalendarMonths: differenceInCalendarMonths2, addMonths: addMonths2, startOfMonth: startOfMonth2 } = dateLib2;
  if (endMonth && differenceInCalendarMonths2(endMonth, initialMonth) < 0) {
    const offset = -1 * (numberOfMonths - 1);
    initialMonth = addMonths2(endMonth, offset);
  }
  if (startMonth && differenceInCalendarMonths2(initialMonth, startMonth) < 0) {
    initialMonth = startMonth;
  }
  return startOfMonth2(initialMonth);
}

// node_modules/react-day-picker/dist/esm/helpers/getMonths.js
function getMonths(displayMonths, dates, props, dateLib2) {
  const { addDays: addDays2, endOfBroadcastWeek: endOfBroadcastWeek2, endOfISOWeek: endOfISOWeek2, endOfMonth: endOfMonth2, endOfWeek: endOfWeek2, getISOWeek: getISOWeek2, getWeek: getWeek2, startOfBroadcastWeek: startOfBroadcastWeek2, startOfISOWeek: startOfISOWeek2, startOfWeek: startOfWeek2 } = dateLib2;
  const dayPickerMonths = displayMonths.reduce((months, month) => {
    const firstDateOfFirstWeek = props.broadcastCalendar ? startOfBroadcastWeek2(month, dateLib2) : props.ISOWeek ? startOfISOWeek2(month) : startOfWeek2(month);
    const lastDateOfLastWeek = props.broadcastCalendar ? endOfBroadcastWeek2(month) : props.ISOWeek ? endOfISOWeek2(endOfMonth2(month)) : endOfWeek2(endOfMonth2(month));
    const monthDates = dates.filter((date) => {
      return date >= firstDateOfFirstWeek && date <= lastDateOfLastWeek;
    });
    const nrOfDaysWithFixedWeeks = props.broadcastCalendar ? 35 : 42;
    if (props.fixedWeeks && monthDates.length < nrOfDaysWithFixedWeeks) {
      const extraDates = dates.filter((date) => {
        const daysToAdd = nrOfDaysWithFixedWeeks - monthDates.length;
        return date > lastDateOfLastWeek && date <= addDays2(lastDateOfLastWeek, daysToAdd);
      });
      monthDates.push(...extraDates);
    }
    const weeks = monthDates.reduce((weeks2, date) => {
      const weekNumber = props.ISOWeek ? getISOWeek2(date) : getWeek2(date);
      const week = weeks2.find((week2) => week2.weekNumber === weekNumber);
      const day = new CalendarDay(date, month, dateLib2);
      if (!week) {
        weeks2.push(new CalendarWeek(weekNumber, [day]));
      } else {
        week.days.push(day);
      }
      return weeks2;
    }, []);
    const dayPickerMonth = new CalendarMonth(month, weeks);
    months.push(dayPickerMonth);
    return months;
  }, []);
  if (!props.reverseMonths) {
    return dayPickerMonths;
  } else {
    return dayPickerMonths.reverse();
  }
}

// node_modules/react-day-picker/dist/esm/helpers/getNavMonth.js
function getNavMonths(props, dateLib2) {
  let { startMonth, endMonth } = props;
  const { startOfYear: startOfYear2, startOfDay: startOfDay2, startOfMonth: startOfMonth2, endOfMonth: endOfMonth2, addYears: addYears2, endOfYear: endOfYear2, newDate, today } = dateLib2;
  const { fromYear, toYear, fromMonth, toMonth } = props;
  if (!startMonth && fromMonth) {
    startMonth = fromMonth;
  }
  if (!startMonth && fromYear) {
    startMonth = dateLib2.newDate(fromYear, 0, 1);
  }
  if (!endMonth && toMonth) {
    endMonth = toMonth;
  }
  if (!endMonth && toYear) {
    endMonth = newDate(toYear, 11, 31);
  }
  const hasYearDropdown = props.captionLayout === "dropdown" || props.captionLayout === "dropdown-years";
  if (startMonth) {
    startMonth = startOfMonth2(startMonth);
  } else if (fromYear) {
    startMonth = newDate(fromYear, 0, 1);
  } else if (!startMonth && hasYearDropdown) {
    startMonth = startOfYear2(addYears2(props.today ?? today(), -100));
  }
  if (endMonth) {
    endMonth = endOfMonth2(endMonth);
  } else if (toYear) {
    endMonth = newDate(toYear, 11, 31);
  } else if (!endMonth && hasYearDropdown) {
    endMonth = endOfYear2(props.today ?? today());
  }
  return [
    startMonth ? startOfDay2(startMonth) : startMonth,
    endMonth ? startOfDay2(endMonth) : endMonth
  ];
}

// node_modules/react-day-picker/dist/esm/helpers/getNextMonth.js
function getNextMonth(firstDisplayedMonth, calendarEndMonth, options, dateLib2) {
  if (options.disableNavigation) {
    return void 0;
  }
  const { pagedNavigation, numberOfMonths = 1 } = options;
  const { startOfMonth: startOfMonth2, addMonths: addMonths2, differenceInCalendarMonths: differenceInCalendarMonths2 } = dateLib2;
  const offset = pagedNavigation ? numberOfMonths : 1;
  const month = startOfMonth2(firstDisplayedMonth);
  if (!calendarEndMonth) {
    return addMonths2(month, offset);
  }
  const monthsDiff = differenceInCalendarMonths2(calendarEndMonth, firstDisplayedMonth);
  if (monthsDiff < numberOfMonths) {
    return void 0;
  }
  return addMonths2(month, offset);
}

// node_modules/react-day-picker/dist/esm/helpers/getPreviousMonth.js
function getPreviousMonth(firstDisplayedMonth, calendarStartMonth, options, dateLib2) {
  if (options.disableNavigation) {
    return void 0;
  }
  const { pagedNavigation, numberOfMonths } = options;
  const { startOfMonth: startOfMonth2, addMonths: addMonths2, differenceInCalendarMonths: differenceInCalendarMonths2 } = dateLib2;
  const offset = pagedNavigation ? numberOfMonths ?? 1 : 1;
  const month = startOfMonth2(firstDisplayedMonth);
  if (!calendarStartMonth) {
    return addMonths2(month, -offset);
  }
  const monthsDiff = differenceInCalendarMonths2(month, calendarStartMonth);
  if (monthsDiff <= 0) {
    return void 0;
  }
  return addMonths2(month, -offset);
}

// node_modules/react-day-picker/dist/esm/helpers/getWeeks.js
function getWeeks(months) {
  const initialWeeks = [];
  return months.reduce((weeks, month) => {
    return [...weeks, ...month.weeks];
  }, initialWeeks);
}

// node_modules/react-day-picker/dist/esm/helpers/useControlledValue.js
var import_react29 = __toESM(require_react(), 1);
function useControlledValue(defaultValue, controlledValue) {
  const [uncontrolledValue, setValue] = (0, import_react29.useState)(defaultValue);
  const value = controlledValue === void 0 ? uncontrolledValue : controlledValue;
  return [value, setValue];
}

// node_modules/react-day-picker/dist/esm/useCalendar.js
function useCalendar(props, dateLib2) {
  const [navStart, navEnd] = getNavMonths(props, dateLib2);
  const { startOfMonth: startOfMonth2, endOfMonth: endOfMonth2 } = dateLib2;
  const initialMonth = getInitialMonth(props, dateLib2);
  const [firstMonth, setFirstMonth] = useControlledValue(
    initialMonth,
    // initialMonth is always computed from props.month if provided
    props.month ? initialMonth : void 0
  );
  (0, import_react30.useEffect)(() => {
    const newInitialMonth = getInitialMonth(props, dateLib2);
    setFirstMonth(newInitialMonth);
  }, [props.timeZone]);
  const displayMonths = getDisplayMonths(firstMonth, navEnd, props, dateLib2);
  const dates = getDates(displayMonths, props.endMonth ? endOfMonth2(props.endMonth) : void 0, props, dateLib2);
  const months = getMonths(displayMonths, dates, props, dateLib2);
  const weeks = getWeeks(months);
  const days = getDays(months);
  const previousMonth = getPreviousMonth(firstMonth, navStart, props, dateLib2);
  const nextMonth = getNextMonth(firstMonth, navEnd, props, dateLib2);
  const { disableNavigation, onMonthChange } = props;
  const isDayInCalendar = (day) => weeks.some((week) => week.days.some((d) => d.isEqualTo(day)));
  const goToMonth = (date) => {
    if (disableNavigation) {
      return;
    }
    let newMonth = startOfMonth2(date);
    if (navStart && newMonth < startOfMonth2(navStart)) {
      newMonth = startOfMonth2(navStart);
    }
    if (navEnd && newMonth > startOfMonth2(navEnd)) {
      newMonth = startOfMonth2(navEnd);
    }
    setFirstMonth(newMonth);
    onMonthChange == null ? void 0 : onMonthChange(newMonth);
  };
  const goToDay = (day) => {
    if (isDayInCalendar(day)) {
      return;
    }
    goToMonth(day.date);
  };
  const calendar = {
    months,
    weeks,
    days,
    navStart,
    navEnd,
    previousMonth,
    nextMonth,
    goToMonth,
    goToDay
  };
  return calendar;
}

// node_modules/react-day-picker/dist/esm/useFocus.js
var import_react31 = __toESM(require_react(), 1);

// node_modules/react-day-picker/dist/esm/helpers/calculateFocusTarget.js
var FocusTargetPriority;
(function(FocusTargetPriority2) {
  FocusTargetPriority2[FocusTargetPriority2["Today"] = 0] = "Today";
  FocusTargetPriority2[FocusTargetPriority2["Selected"] = 1] = "Selected";
  FocusTargetPriority2[FocusTargetPriority2["LastFocused"] = 2] = "LastFocused";
  FocusTargetPriority2[FocusTargetPriority2["FocusedModifier"] = 3] = "FocusedModifier";
})(FocusTargetPriority || (FocusTargetPriority = {}));
function isFocusableDay(modifiers) {
  return !modifiers[DayFlag.disabled] && !modifiers[DayFlag.hidden] && !modifiers[DayFlag.outside];
}
function calculateFocusTarget(days, getModifiers, isSelected, lastFocused) {
  let focusTarget;
  let foundFocusTargetPriority = -1;
  for (const day of days) {
    const modifiers = getModifiers(day);
    if (isFocusableDay(modifiers)) {
      if (modifiers[DayFlag.focused] && foundFocusTargetPriority < FocusTargetPriority.FocusedModifier) {
        focusTarget = day;
        foundFocusTargetPriority = FocusTargetPriority.FocusedModifier;
      } else if ((lastFocused == null ? void 0 : lastFocused.isEqualTo(day)) && foundFocusTargetPriority < FocusTargetPriority.LastFocused) {
        focusTarget = day;
        foundFocusTargetPriority = FocusTargetPriority.LastFocused;
      } else if (isSelected(day.date) && foundFocusTargetPriority < FocusTargetPriority.Selected) {
        focusTarget = day;
        foundFocusTargetPriority = FocusTargetPriority.Selected;
      } else if (modifiers[DayFlag.today] && foundFocusTargetPriority < FocusTargetPriority.Today) {
        focusTarget = day;
        foundFocusTargetPriority = FocusTargetPriority.Today;
      }
    }
  }
  if (!focusTarget) {
    focusTarget = days.find((day) => isFocusableDay(getModifiers(day)));
  }
  return focusTarget;
}

// node_modules/react-day-picker/dist/esm/helpers/getFocusableDate.js
function getFocusableDate(moveBy, moveDir, refDate, navStart, navEnd, props, dateLib2) {
  const { ISOWeek, broadcastCalendar } = props;
  const { addDays: addDays2, addMonths: addMonths2, addWeeks: addWeeks2, addYears: addYears2, endOfBroadcastWeek: endOfBroadcastWeek2, endOfISOWeek: endOfISOWeek2, endOfWeek: endOfWeek2, max: max2, min: min2, startOfBroadcastWeek: startOfBroadcastWeek2, startOfISOWeek: startOfISOWeek2, startOfWeek: startOfWeek2 } = dateLib2;
  const moveFns = {
    day: addDays2,
    week: addWeeks2,
    month: addMonths2,
    year: addYears2,
    startOfWeek: (date) => broadcastCalendar ? startOfBroadcastWeek2(date, dateLib2) : ISOWeek ? startOfISOWeek2(date) : startOfWeek2(date),
    endOfWeek: (date) => broadcastCalendar ? endOfBroadcastWeek2(date) : ISOWeek ? endOfISOWeek2(date) : endOfWeek2(date)
  };
  let focusableDate = moveFns[moveBy](refDate, moveDir === "after" ? 1 : -1);
  if (moveDir === "before" && navStart) {
    focusableDate = max2([navStart, focusableDate]);
  } else if (moveDir === "after" && navEnd) {
    focusableDate = min2([navEnd, focusableDate]);
  }
  return focusableDate;
}

// node_modules/react-day-picker/dist/esm/helpers/getNextFocus.js
function getNextFocus(moveBy, moveDir, refDay, calendarStartMonth, calendarEndMonth, props, dateLib2, attempt = 0) {
  if (attempt > 365) {
    return void 0;
  }
  const focusableDate = getFocusableDate(moveBy, moveDir, refDay.date, calendarStartMonth, calendarEndMonth, props, dateLib2);
  const isDisabled = Boolean(props.disabled && dateMatchModifiers(focusableDate, props.disabled, dateLib2));
  const isHidden = Boolean(props.hidden && dateMatchModifiers(focusableDate, props.hidden, dateLib2));
  const targetMonth = focusableDate;
  const focusDay = new CalendarDay(focusableDate, targetMonth, dateLib2);
  if (!isDisabled && !isHidden) {
    return focusDay;
  }
  return getNextFocus(moveBy, moveDir, focusDay, calendarStartMonth, calendarEndMonth, props, dateLib2, attempt + 1);
}

// node_modules/react-day-picker/dist/esm/useFocus.js
function useFocus(props, calendar, getModifiers, isSelected, dateLib2) {
  const { autoFocus } = props;
  const [lastFocused, setLastFocused] = (0, import_react31.useState)();
  const focusTarget = calculateFocusTarget(calendar.days, getModifiers, isSelected || (() => false), lastFocused);
  const [focusedDay, setFocused] = (0, import_react31.useState)(autoFocus ? focusTarget : void 0);
  const blur = () => {
    setLastFocused(focusedDay);
    setFocused(void 0);
  };
  const moveFocus = (moveBy, moveDir) => {
    if (!focusedDay)
      return;
    const nextFocus = getNextFocus(moveBy, moveDir, focusedDay, calendar.navStart, calendar.navEnd, props, dateLib2);
    if (!nextFocus)
      return;
    calendar.goToDay(nextFocus);
    setFocused(nextFocus);
  };
  const isFocusTarget = (day) => {
    return Boolean(focusTarget == null ? void 0 : focusTarget.isEqualTo(day));
  };
  const useFocus2 = {
    isFocusTarget,
    setFocused,
    focused: focusedDay,
    blur,
    moveFocus
  };
  return useFocus2;
}

// node_modules/react-day-picker/dist/esm/selection/useMulti.js
function useMulti(props, dateLib2) {
  const { selected: initiallySelected, required, onSelect } = props;
  const [internallySelected, setSelected] = useControlledValue(initiallySelected, onSelect ? initiallySelected : void 0);
  const selected = !onSelect ? internallySelected : initiallySelected;
  const { isSameDay: isSameDay2 } = dateLib2;
  const isSelected = (date) => {
    return (selected == null ? void 0 : selected.some((d) => isSameDay2(d, date))) ?? false;
  };
  const { min: min2, max: max2 } = props;
  const select = (triggerDate, modifiers, e) => {
    let newDates = [...selected ?? []];
    if (isSelected(triggerDate)) {
      if ((selected == null ? void 0 : selected.length) === min2) {
        return;
      }
      if (required && (selected == null ? void 0 : selected.length) === 1) {
        return;
      }
      newDates = selected == null ? void 0 : selected.filter((d) => !isSameDay2(d, triggerDate));
    } else {
      if ((selected == null ? void 0 : selected.length) === max2) {
        newDates = [triggerDate];
      } else {
        newDates = [...newDates, triggerDate];
      }
    }
    if (!onSelect) {
      setSelected(newDates);
    }
    onSelect == null ? void 0 : onSelect(newDates, triggerDate, modifiers, e);
    return newDates;
  };
  return {
    selected,
    select,
    isSelected
  };
}

// node_modules/react-day-picker/dist/esm/utils/addToRange.js
function addToRange(date, initialRange, min2 = 0, max2 = 0, required = false, dateLib2 = defaultDateLib) {
  const { from, to } = initialRange || {};
  const { isSameDay: isSameDay2, isAfter: isAfter2, isBefore: isBefore2 } = dateLib2;
  let range;
  if (!from && !to) {
    range = { from: date, to: min2 > 0 ? void 0 : date };
  } else if (from && !to) {
    if (isSameDay2(from, date)) {
      if (required) {
        range = { from, to: void 0 };
      } else {
        range = void 0;
      }
    } else if (isBefore2(date, from)) {
      range = { from: date, to: from };
    } else {
      range = { from, to: date };
    }
  } else if (from && to) {
    if (isSameDay2(from, date) && isSameDay2(to, date)) {
      if (required) {
        range = { from, to };
      } else {
        range = void 0;
      }
    } else if (isSameDay2(from, date)) {
      range = { from, to: min2 > 0 ? void 0 : date };
    } else if (isSameDay2(to, date)) {
      range = { from: date, to: min2 > 0 ? void 0 : date };
    } else if (isBefore2(date, from)) {
      range = { from: date, to };
    } else if (isAfter2(date, from)) {
      range = { from, to: date };
    } else if (isAfter2(date, to)) {
      range = { from, to: date };
    } else {
      throw new Error("Invalid range");
    }
  }
  if ((range == null ? void 0 : range.from) && (range == null ? void 0 : range.to)) {
    const diff = dateLib2.differenceInCalendarDays(range.to, range.from);
    if (max2 > 0 && diff > max2) {
      range = { from: date, to: void 0 };
    } else if (min2 > 1 && diff < min2) {
      range = { from: date, to: void 0 };
    }
  }
  return range;
}

// node_modules/react-day-picker/dist/esm/utils/rangeContainsDayOfWeek.js
function rangeContainsDayOfWeek(range, dayOfWeek, dateLib2 = defaultDateLib) {
  const dayOfWeekArr = !Array.isArray(dayOfWeek) ? [dayOfWeek] : dayOfWeek;
  let date = range.from;
  const totalDays = dateLib2.differenceInCalendarDays(range.to, range.from);
  const totalDaysLimit = Math.min(totalDays, 6);
  for (let i = 0; i <= totalDaysLimit; i++) {
    if (dayOfWeekArr.includes(date.getDay())) {
      return true;
    }
    date = dateLib2.addDays(date, 1);
  }
  return false;
}

// node_modules/react-day-picker/dist/esm/utils/rangeOverlaps.js
function rangeOverlaps(rangeLeft, rangeRight, dateLib2 = defaultDateLib) {
  return rangeIncludesDate(rangeLeft, rangeRight.from, false, dateLib2) || rangeIncludesDate(rangeLeft, rangeRight.to, false, dateLib2) || rangeIncludesDate(rangeRight, rangeLeft.from, false, dateLib2) || rangeIncludesDate(rangeRight, rangeLeft.to, false, dateLib2);
}

// node_modules/react-day-picker/dist/esm/utils/rangeContainsModifiers.js
function rangeContainsModifiers(range, modifiers, dateLib2 = defaultDateLib) {
  const matchers = Array.isArray(modifiers) ? modifiers : [modifiers];
  const nonFunctionMatchers = matchers.filter((matcher) => typeof matcher !== "function");
  const nonFunctionMatchersResult = nonFunctionMatchers.some((matcher) => {
    if (typeof matcher === "boolean")
      return matcher;
    if (dateLib2.isDate(matcher)) {
      return rangeIncludesDate(range, matcher, false, dateLib2);
    }
    if (isDatesArray(matcher, dateLib2)) {
      return matcher.some((date) => rangeIncludesDate(range, date, false, dateLib2));
    }
    if (isDateRange(matcher)) {
      if (matcher.from && matcher.to) {
        return rangeOverlaps(range, { from: matcher.from, to: matcher.to }, dateLib2);
      }
      return false;
    }
    if (isDayOfWeekType(matcher)) {
      return rangeContainsDayOfWeek(range, matcher.dayOfWeek, dateLib2);
    }
    if (isDateInterval(matcher)) {
      const isClosedInterval = dateLib2.isAfter(matcher.before, matcher.after);
      if (isClosedInterval) {
        return rangeOverlaps(range, {
          from: dateLib2.addDays(matcher.after, 1),
          to: dateLib2.addDays(matcher.before, -1)
        }, dateLib2);
      }
      return dateMatchModifiers(range.from, matcher, dateLib2) || dateMatchModifiers(range.to, matcher, dateLib2);
    }
    if (isDateAfterType(matcher) || isDateBeforeType(matcher)) {
      return dateMatchModifiers(range.from, matcher, dateLib2) || dateMatchModifiers(range.to, matcher, dateLib2);
    }
    return false;
  });
  if (nonFunctionMatchersResult) {
    return true;
  }
  const functionMatchers = matchers.filter((matcher) => typeof matcher === "function");
  if (functionMatchers.length) {
    let date = range.from;
    const totalDays = dateLib2.differenceInCalendarDays(range.to, range.from);
    for (let i = 0; i <= totalDays; i++) {
      if (functionMatchers.some((matcher) => matcher(date))) {
        return true;
      }
      date = dateLib2.addDays(date, 1);
    }
  }
  return false;
}

// node_modules/react-day-picker/dist/esm/selection/useRange.js
function useRange(props, dateLib2) {
  const { disabled, excludeDisabled, selected: initiallySelected, required, onSelect } = props;
  const [internallySelected, setSelected] = useControlledValue(initiallySelected, onSelect ? initiallySelected : void 0);
  const selected = !onSelect ? internallySelected : initiallySelected;
  const isSelected = (date) => selected && rangeIncludesDate(selected, date, false, dateLib2);
  const select = (triggerDate, modifiers, e) => {
    const { min: min2, max: max2 } = props;
    const newRange = triggerDate ? addToRange(triggerDate, selected, min2, max2, required, dateLib2) : void 0;
    if (excludeDisabled && disabled && (newRange == null ? void 0 : newRange.from) && newRange.to) {
      if (rangeContainsModifiers({ from: newRange.from, to: newRange.to }, disabled, dateLib2)) {
        newRange.from = triggerDate;
        newRange.to = void 0;
      }
    }
    if (!onSelect) {
      setSelected(newRange);
    }
    onSelect == null ? void 0 : onSelect(newRange, triggerDate, modifiers, e);
    return newRange;
  };
  return {
    selected,
    select,
    isSelected
  };
}

// node_modules/react-day-picker/dist/esm/selection/useSingle.js
function useSingle(props, dateLib2) {
  const { selected: initiallySelected, required, onSelect } = props;
  const [internallySelected, setSelected] = useControlledValue(initiallySelected, onSelect ? initiallySelected : void 0);
  const selected = !onSelect ? internallySelected : initiallySelected;
  const { isSameDay: isSameDay2 } = dateLib2;
  const isSelected = (compareDate) => {
    return selected ? isSameDay2(selected, compareDate) : false;
  };
  const select = (triggerDate, modifiers, e) => {
    let newDate = triggerDate;
    if (!required && selected && selected && isSameDay2(triggerDate, selected)) {
      newDate = void 0;
    }
    if (!onSelect) {
      setSelected(newDate);
    }
    if (required) {
      onSelect == null ? void 0 : onSelect(newDate, triggerDate, modifiers, e);
    } else {
      onSelect == null ? void 0 : onSelect(newDate, triggerDate, modifiers, e);
    }
    return newDate;
  };
  return {
    selected,
    select,
    isSelected
  };
}

// node_modules/react-day-picker/dist/esm/useSelection.js
function useSelection(props, dateLib2) {
  const single = useSingle(props, dateLib2);
  const multi = useMulti(props, dateLib2);
  const range = useRange(props, dateLib2);
  switch (props.mode) {
    case "single":
      return single;
    case "multiple":
      return multi;
    case "range":
      return range;
    default:
      return void 0;
  }
}

// node_modules/react-day-picker/dist/esm/DayPicker.js
function DayPicker(initialProps) {
  var _a;
  let props = initialProps;
  if (props.timeZone) {
    props = {
      ...initialProps
    };
    if (props.today) {
      props.today = new TZDate(props.today, props.timeZone);
    }
    if (props.month) {
      props.month = new TZDate(props.month, props.timeZone);
    }
    if (props.defaultMonth) {
      props.defaultMonth = new TZDate(props.defaultMonth, props.timeZone);
    }
    if (props.startMonth) {
      props.startMonth = new TZDate(props.startMonth, props.timeZone);
    }
    if (props.endMonth) {
      props.endMonth = new TZDate(props.endMonth, props.timeZone);
    }
    if (props.mode === "single" && props.selected) {
      props.selected = new TZDate(props.selected, props.timeZone);
    } else if (props.mode === "multiple" && props.selected) {
      props.selected = (_a = props.selected) == null ? void 0 : _a.map((date) => new TZDate(date, props.timeZone));
    } else if (props.mode === "range" && props.selected) {
      props.selected = {
        from: props.selected.from ? new TZDate(props.selected.from, props.timeZone) : void 0,
        to: props.selected.to ? new TZDate(props.selected.to, props.timeZone) : void 0
      };
    }
  }
  const { components, formatters, labels, dateLib: dateLib2, locale, classNames } = (0, import_react32.useMemo)(() => {
    const locale2 = { ...enUS, ...props.locale };
    const dateLib3 = new DateLib({
      locale: locale2,
      weekStartsOn: props.broadcastCalendar ? 1 : props.weekStartsOn,
      firstWeekContainsDate: props.firstWeekContainsDate,
      useAdditionalWeekYearTokens: props.useAdditionalWeekYearTokens,
      useAdditionalDayOfYearTokens: props.useAdditionalDayOfYearTokens,
      timeZone: props.timeZone,
      numerals: props.numerals
    }, props.dateLib);
    return {
      dateLib: dateLib3,
      components: getComponents(props.components),
      formatters: getFormatters(props.formatters),
      labels: { ...labels_exports, ...props.labels },
      locale: locale2,
      classNames: { ...getDefaultClassNames(), ...props.classNames }
    };
  }, [
    props.locale,
    props.broadcastCalendar,
    props.weekStartsOn,
    props.firstWeekContainsDate,
    props.useAdditionalWeekYearTokens,
    props.useAdditionalDayOfYearTokens,
    props.timeZone,
    props.numerals,
    props.dateLib,
    props.components,
    props.formatters,
    props.labels,
    props.classNames
  ]);
  const { captionLayout, mode, navLayout, numberOfMonths = 1, onDayBlur, onDayClick, onDayFocus, onDayKeyDown, onDayMouseEnter, onDayMouseLeave, onNextClick, onPrevClick, showWeekNumber, styles } = props;
  const { formatCaption: formatCaption2, formatDay: formatDay2, formatMonthDropdown: formatMonthDropdown2, formatWeekNumber: formatWeekNumber2, formatWeekNumberHeader: formatWeekNumberHeader2, formatWeekdayName: formatWeekdayName2, formatYearDropdown: formatYearDropdown2 } = formatters;
  const calendar = useCalendar(props, dateLib2);
  const { days, months, navStart, navEnd, previousMonth, nextMonth, goToMonth } = calendar;
  const getModifiers = createGetModifiers(days, props, dateLib2);
  const { isSelected, select, selected: selectedValue } = useSelection(props, dateLib2) ?? {};
  const { blur, focused, isFocusTarget, moveFocus, setFocused } = useFocus(props, calendar, getModifiers, isSelected ?? (() => false), dateLib2);
  const { labelDayButton: labelDayButton2, labelGridcell: labelGridcell2, labelGrid: labelGrid2, labelMonthDropdown: labelMonthDropdown2, labelNav: labelNav2, labelPrevious: labelPrevious2, labelNext: labelNext2, labelWeekday: labelWeekday2, labelWeekNumber: labelWeekNumber2, labelWeekNumberHeader: labelWeekNumberHeader2, labelYearDropdown: labelYearDropdown2 } = labels;
  const weekdays = (0, import_react32.useMemo)(() => getWeekdays(dateLib2, props.ISOWeek), [dateLib2, props.ISOWeek]);
  const isInteractive = mode !== void 0 || onDayClick !== void 0;
  const handlePreviousClick = (0, import_react32.useCallback)(() => {
    if (!previousMonth)
      return;
    goToMonth(previousMonth);
    onPrevClick == null ? void 0 : onPrevClick(previousMonth);
  }, [previousMonth, goToMonth, onPrevClick]);
  const handleNextClick = (0, import_react32.useCallback)(() => {
    if (!nextMonth)
      return;
    goToMonth(nextMonth);
    onNextClick == null ? void 0 : onNextClick(nextMonth);
  }, [goToMonth, nextMonth, onNextClick]);
  const handleDayClick = (0, import_react32.useCallback)((day, m) => (e) => {
    e.preventDefault();
    e.stopPropagation();
    setFocused(day);
    select == null ? void 0 : select(day.date, m, e);
    onDayClick == null ? void 0 : onDayClick(day.date, m, e);
  }, [select, onDayClick, setFocused]);
  const handleDayFocus = (0, import_react32.useCallback)((day, m) => (e) => {
    setFocused(day);
    onDayFocus == null ? void 0 : onDayFocus(day.date, m, e);
  }, [onDayFocus, setFocused]);
  const handleDayBlur = (0, import_react32.useCallback)((day, m) => (e) => {
    blur();
    onDayBlur == null ? void 0 : onDayBlur(day.date, m, e);
  }, [blur, onDayBlur]);
  const handleDayKeyDown = (0, import_react32.useCallback)((day, modifiers) => (e) => {
    const keyMap = {
      ArrowLeft: ["day", props.dir === "rtl" ? "after" : "before"],
      ArrowRight: ["day", props.dir === "rtl" ? "before" : "after"],
      ArrowDown: ["week", "after"],
      ArrowUp: ["week", "before"],
      PageUp: [e.shiftKey ? "year" : "month", "before"],
      PageDown: [e.shiftKey ? "year" : "month", "after"],
      Home: ["startOfWeek", "before"],
      End: ["endOfWeek", "after"]
    };
    if (keyMap[e.key]) {
      e.preventDefault();
      e.stopPropagation();
      const [moveBy, moveDir] = keyMap[e.key];
      moveFocus(moveBy, moveDir);
    }
    onDayKeyDown == null ? void 0 : onDayKeyDown(day.date, modifiers, e);
  }, [moveFocus, onDayKeyDown, props.dir]);
  const handleDayMouseEnter = (0, import_react32.useCallback)((day, modifiers) => (e) => {
    onDayMouseEnter == null ? void 0 : onDayMouseEnter(day.date, modifiers, e);
  }, [onDayMouseEnter]);
  const handleDayMouseLeave = (0, import_react32.useCallback)((day, modifiers) => (e) => {
    onDayMouseLeave == null ? void 0 : onDayMouseLeave(day.date, modifiers, e);
  }, [onDayMouseLeave]);
  const handleMonthChange = (0, import_react32.useCallback)((date) => (e) => {
    const selectedMonth = Number(e.target.value);
    const month = dateLib2.setMonth(dateLib2.startOfMonth(date), selectedMonth);
    goToMonth(month);
  }, [dateLib2, goToMonth]);
  const handleYearChange = (0, import_react32.useCallback)((date) => (e) => {
    const selectedYear = Number(e.target.value);
    const month = dateLib2.setYear(dateLib2.startOfMonth(date), selectedYear);
    goToMonth(month);
  }, [dateLib2, goToMonth]);
  const { className, style } = (0, import_react32.useMemo)(() => ({
    className: [classNames[UI.Root], props.className].filter(Boolean).join(" "),
    style: { ...styles == null ? void 0 : styles[UI.Root], ...props.style }
  }), [classNames, props.className, props.style, styles]);
  const dataAttributes = getDataAttributes(props);
  const rootElRef = (0, import_react32.useRef)(null);
  useAnimation(rootElRef, Boolean(props.animate), {
    classNames,
    months,
    focused,
    dateLib: dateLib2
  });
  const contextValue = {
    dayPickerProps: props,
    selected: selectedValue,
    select,
    isSelected,
    months,
    nextMonth,
    previousMonth,
    goToMonth,
    getModifiers,
    components,
    classNames,
    styles,
    labels,
    formatters
  };
  return import_react32.default.createElement(
    dayPickerContext.Provider,
    { value: contextValue },
    import_react32.default.createElement(
      components.Root,
      { rootRef: props.animate ? rootElRef : void 0, className, style, dir: props.dir, id: props.id, lang: props.lang, nonce: props.nonce, title: props.title, role: props.role, "aria-label": props["aria-label"], ...dataAttributes },
      import_react32.default.createElement(
        components.Months,
        { className: classNames[UI.Months], style: styles == null ? void 0 : styles[UI.Months] },
        !props.hideNavigation && !navLayout && import_react32.default.createElement(components.Nav, { "data-animated-nav": props.animate ? "true" : void 0, className: classNames[UI.Nav], style: styles == null ? void 0 : styles[UI.Nav], "aria-label": labelNav2(), onPreviousClick: handlePreviousClick, onNextClick: handleNextClick, previousMonth, nextMonth }),
        months.map((calendarMonth, displayIndex) => {
          const dropdownMonths = getMonthOptions(calendarMonth.date, navStart, navEnd, formatters, dateLib2);
          const dropdownYears = getYearOptions(navStart, navEnd, formatters, dateLib2);
          return import_react32.default.createElement(
            components.Month,
            { "data-animated-month": props.animate ? "true" : void 0, className: classNames[UI.Month], style: styles == null ? void 0 : styles[UI.Month], key: displayIndex, displayIndex, calendarMonth },
            navLayout === "around" && !props.hideNavigation && displayIndex === 0 && import_react32.default.createElement(
              components.PreviousMonthButton,
              { type: "button", className: classNames[UI.PreviousMonthButton], tabIndex: previousMonth ? void 0 : -1, "aria-disabled": previousMonth ? void 0 : true, "aria-label": labelPrevious2(previousMonth), onClick: handlePreviousClick, "data-animated-button": props.animate ? "true" : void 0 },
              import_react32.default.createElement(components.Chevron, { disabled: previousMonth ? void 0 : true, className: classNames[UI.Chevron], orientation: props.dir === "rtl" ? "right" : "left" })
            ),
            import_react32.default.createElement(components.MonthCaption, { "data-animated-caption": props.animate ? "true" : void 0, className: classNames[UI.MonthCaption], style: styles == null ? void 0 : styles[UI.MonthCaption], calendarMonth, displayIndex }, (captionLayout == null ? void 0 : captionLayout.startsWith("dropdown")) ? import_react32.default.createElement(
              components.DropdownNav,
              { className: classNames[UI.Dropdowns], style: styles == null ? void 0 : styles[UI.Dropdowns] },
              captionLayout === "dropdown" || captionLayout === "dropdown-months" ? import_react32.default.createElement(components.MonthsDropdown, { className: classNames[UI.MonthsDropdown], "aria-label": labelMonthDropdown2(), classNames, components, disabled: Boolean(props.disableNavigation), onChange: handleMonthChange(calendarMonth.date), options: dropdownMonths, style: styles == null ? void 0 : styles[UI.Dropdown], value: dateLib2.getMonth(calendarMonth.date) }) : import_react32.default.createElement("span", null, formatMonthDropdown2(calendarMonth.date, dateLib2)),
              captionLayout === "dropdown" || captionLayout === "dropdown-years" ? import_react32.default.createElement(components.YearsDropdown, { className: classNames[UI.YearsDropdown], "aria-label": labelYearDropdown2(dateLib2.options), classNames, components, disabled: Boolean(props.disableNavigation), onChange: handleYearChange(calendarMonth.date), options: dropdownYears, style: styles == null ? void 0 : styles[UI.Dropdown], value: dateLib2.getYear(calendarMonth.date) }) : import_react32.default.createElement("span", null, formatYearDropdown2(calendarMonth.date, dateLib2)),
              import_react32.default.createElement("span", { role: "status", "aria-live": "polite", style: {
                border: 0,
                clip: "rect(0 0 0 0)",
                height: "1px",
                margin: "-1px",
                overflow: "hidden",
                padding: 0,
                position: "absolute",
                width: "1px",
                whiteSpace: "nowrap",
                wordWrap: "normal"
              } }, formatCaption2(calendarMonth.date, dateLib2.options, dateLib2))
            ) : import_react32.default.createElement(components.CaptionLabel, { className: classNames[UI.CaptionLabel], role: "status", "aria-live": "polite" }, formatCaption2(calendarMonth.date, dateLib2.options, dateLib2))),
            navLayout === "around" && !props.hideNavigation && displayIndex === numberOfMonths - 1 && import_react32.default.createElement(
              components.NextMonthButton,
              { type: "button", className: classNames[UI.NextMonthButton], tabIndex: nextMonth ? void 0 : -1, "aria-disabled": nextMonth ? void 0 : true, "aria-label": labelNext2(nextMonth), onClick: handleNextClick, "data-animated-button": props.animate ? "true" : void 0 },
              import_react32.default.createElement(components.Chevron, { disabled: nextMonth ? void 0 : true, className: classNames[UI.Chevron], orientation: props.dir === "rtl" ? "left" : "right" })
            ),
            displayIndex === numberOfMonths - 1 && navLayout === "after" && !props.hideNavigation && import_react32.default.createElement(components.Nav, { "data-animated-nav": props.animate ? "true" : void 0, className: classNames[UI.Nav], style: styles == null ? void 0 : styles[UI.Nav], "aria-label": labelNav2(), onPreviousClick: handlePreviousClick, onNextClick: handleNextClick, previousMonth, nextMonth }),
            import_react32.default.createElement(
              components.MonthGrid,
              { role: "grid", "aria-multiselectable": mode === "multiple" || mode === "range", "aria-label": labelGrid2(calendarMonth.date, dateLib2.options, dateLib2) || void 0, className: classNames[UI.MonthGrid], style: styles == null ? void 0 : styles[UI.MonthGrid] },
              !props.hideWeekdays && import_react32.default.createElement(
                components.Weekdays,
                { "data-animated-weekdays": props.animate ? "true" : void 0, className: classNames[UI.Weekdays], style: styles == null ? void 0 : styles[UI.Weekdays] },
                showWeekNumber && import_react32.default.createElement(components.WeekNumberHeader, { "aria-label": labelWeekNumberHeader2(dateLib2.options), className: classNames[UI.WeekNumberHeader], style: styles == null ? void 0 : styles[UI.WeekNumberHeader], scope: "col" }, formatWeekNumberHeader2()),
                weekdays.map((weekday, i) => import_react32.default.createElement(components.Weekday, { "aria-label": labelWeekday2(weekday, dateLib2.options, dateLib2), className: classNames[UI.Weekday], key: i, style: styles == null ? void 0 : styles[UI.Weekday], scope: "col" }, formatWeekdayName2(weekday, dateLib2.options, dateLib2)))
              ),
              import_react32.default.createElement(components.Weeks, { "data-animated-weeks": props.animate ? "true" : void 0, className: classNames[UI.Weeks], style: styles == null ? void 0 : styles[UI.Weeks] }, calendarMonth.weeks.map((week, weekIndex) => {
                return import_react32.default.createElement(
                  components.Week,
                  { className: classNames[UI.Week], key: week.weekNumber, style: styles == null ? void 0 : styles[UI.Week], week },
                  showWeekNumber && import_react32.default.createElement(components.WeekNumber, { week, style: styles == null ? void 0 : styles[UI.WeekNumber], "aria-label": labelWeekNumber2(week.weekNumber, {
                    locale
                  }), className: classNames[UI.WeekNumber], scope: "row", role: "rowheader" }, formatWeekNumber2(week.weekNumber, dateLib2)),
                  week.days.map((day) => {
                    const { date } = day;
                    const modifiers = getModifiers(day);
                    modifiers[DayFlag.focused] = !modifiers.hidden && Boolean(focused == null ? void 0 : focused.isEqualTo(day));
                    modifiers[SelectionState.selected] = (isSelected == null ? void 0 : isSelected(date)) || modifiers.selected;
                    if (isDateRange(selectedValue)) {
                      const { from, to } = selectedValue;
                      modifiers[SelectionState.range_start] = Boolean(from && to && dateLib2.isSameDay(date, from));
                      modifiers[SelectionState.range_end] = Boolean(from && to && dateLib2.isSameDay(date, to));
                      modifiers[SelectionState.range_middle] = rangeIncludesDate(selectedValue, date, true, dateLib2);
                    }
                    const style2 = getStyleForModifiers(modifiers, styles, props.modifiersStyles);
                    const className2 = getClassNamesForModifiers(modifiers, classNames, props.modifiersClassNames);
                    const ariaLabel = !isInteractive && !modifiers.hidden ? labelGridcell2(date, modifiers, dateLib2.options, dateLib2) : void 0;
                    return import_react32.default.createElement(components.Day, { key: `${dateLib2.format(date, "yyyy-MM-dd")}_${dateLib2.format(day.displayMonth, "yyyy-MM")}`, day, modifiers, className: className2.join(" "), style: style2, role: "gridcell", "aria-selected": modifiers.selected || void 0, "aria-label": ariaLabel, "data-day": dateLib2.format(date, "yyyy-MM-dd"), "data-month": day.outside ? dateLib2.format(date, "yyyy-MM") : void 0, "data-selected": modifiers.selected || void 0, "data-disabled": modifiers.disabled || void 0, "data-hidden": modifiers.hidden || void 0, "data-outside": day.outside || void 0, "data-focused": modifiers.focused || void 0, "data-today": modifiers.today || void 0 }, !modifiers.hidden && isInteractive ? import_react32.default.createElement(components.DayButton, { className: classNames[UI.DayButton], style: styles == null ? void 0 : styles[UI.DayButton], type: "button", day, modifiers, disabled: modifiers.disabled || void 0, tabIndex: isFocusTarget(day) ? 0 : -1, "aria-label": labelDayButton2(date, modifiers, dateLib2.options, dateLib2), onClick: handleDayClick(day, modifiers), onBlur: handleDayBlur(day, modifiers), onFocus: handleDayFocus(day, modifiers), onKeyDown: handleDayKeyDown(day, modifiers), onMouseEnter: handleDayMouseEnter(day, modifiers), onMouseLeave: handleDayMouseLeave(day, modifiers) }, formatDay2(date, dateLib2.options, dateLib2)) : !modifiers.hidden && formatDay2(day.date, dateLib2.options, dateLib2));
                  })
                );
              }))
            )
          );
        })
      ),
      props.footer && import_react32.default.createElement(components.Footer, { className: classNames[UI.Footer], style: styles == null ? void 0 : styles[UI.Footer], role: "status", "aria-live": "polite" }, props.footer)
    )
  );
}

// node_modules/react-day-picker/dist/esm/types/deprecated.js
var Caption = MonthCaption;
var Row = Week;
var useNavigation = useDayPicker;
export {
  Animation,
  Button,
  CalendarDay,
  CalendarMonth,
  CalendarWeek,
  Caption,
  CaptionLabel,
  Chevron,
  DateLib,
  Day,
  DayButton,
  DayFlag,
  DayPicker,
  Dropdown,
  DropdownNav,
  Footer,
  Month,
  MonthCaption,
  MonthGrid,
  Months,
  MonthsDropdown,
  Nav,
  NextMonthButton,
  Option,
  PreviousMonthButton,
  Root,
  Row,
  Select,
  SelectionState,
  TZDate,
  UI,
  Week,
  WeekNumber,
  WeekNumberHeader,
  Weekday,
  Weekdays,
  Weeks,
  YearsDropdown,
  addToRange,
  dateLib,
  dateMatchModifiers,
  dayPickerContext,
  defaultDateLib,
  enUS as defaultLocale,
  formatCaption,
  formatDay,
  formatMonthCaption,
  formatMonthDropdown,
  formatWeekNumber,
  formatWeekNumberHeader,
  formatWeekdayName,
  formatYearCaption,
  formatYearDropdown,
  getDefaultClassNames,
  isDateAfterType,
  isDateBeforeType,
  isDateInRange,
  isDateInterval,
  isDateRange,
  isDatesArray,
  isDayOfWeekType,
  isMatch,
  labelCaption,
  labelDay,
  labelDayButton,
  labelGrid,
  labelGridcell,
  labelMonthDropdown,
  labelNav,
  labelNext,
  labelPrevious,
  labelWeekNumber,
  labelWeekNumberHeader,
  labelWeekday,
  labelYearDropdown,
  rangeContainsDayOfWeek,
  rangeContainsModifiers,
  rangeIncludesDate,
  rangeOverlaps,
  useDayPicker,
  useNavigation
};
//# sourceMappingURL=react-day-picker.js.map
