// Generated by BUCKLESCRIPT, PLEASE EDIT WITH CARE

import * as React from "react";

var today = new Date();

var thisYear = today.getFullYear();

var thisYearAsString = thisYear.toString();

var copy = "©";

var nbsp = "\u00A0";

function s(prim) {
  return prim;
}

function Footer(Props) {
  return React.createElement("footer", {
              className: "flex justify-center py-16 text-sm text-gray-700"
            }, React.createElement("span", undefined, "Copyright " + (copy + (thisYearAsString + ("." + nbsp)))), React.createElement("a", {
                  className: "underline text-key",
                  href: "https://nextjs.org",
                  rel: "noreferrer noopener",
                  target: "_blank"
                }, "Powered by Next.js."));
}

var make = Footer;

export {
  today ,
  thisYear ,
  thisYearAsString ,
  copy ,
  nbsp ,
  s ,
  make ,
  
}
/* today Not a pure module */
