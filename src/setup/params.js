/**
 * URL parameters
 * @module ./setup/params
 *
 */
let params = {
  action: "query",
  format: "json",
  prop: "description|info",
  inprop: "url",
  generator: "prefixsearch",
  gpsprofile: "classic",
  gpslimit: 10,
  get getGpslimit() {
    return this.gpslimit;
  },
  /**
   * @param {number} l
   */
  set setGpslimit(l) {
    if (l > 0) {
      this.gpslimit = l;
    } else {
      this.gpslimit = 10;
    }
  },
  gpssearch: "",
  get getGpssearch() {
    if (this.gpssearch !== "") {
      return this.gpssearch;
    } else {
      return "Not set";
    }
  },
  /**
   * @param {string} s
   */
  set setGpssearch(s) {
    if (s.trim() !== "" && s.trim() !== null) {
      this.gpssearch = s;
    } else {
      this.gpssearch = "";
    }
  },
};

// Hides mutators and accessors in params from Object.keys()
const PROPS_TO_HIDE = [
  "getGpslimit",
  "setGpslimit",
  "getGpssearch",
  "setGpssearch",
];

PROPS_TO_HIDE.map((p) =>
  Object.defineProperty(params, p, { enumerable: false })
);

export { params };
