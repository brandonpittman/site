import { U as store_get, V as attr, W as unsubscribe_stores, X as head, Y as attr_class } from "../../chunks/index2.js";
import "clsx";
import { g as getContext, e as escape_html } from "../../chunks/context.js";
import "@sveltejs/kit/internal";
import "../../chunks/exports.js";
import "../../chunks/utils.js";
import "@sveltejs/kit/internal/server";
import "../../chunks/state.svelte.js";
const getStores = () => {
  const stores$1 = getContext("__svelte__");
  return {
    /** @type {typeof page} */
    page: {
      subscribe: stores$1.page.subscribe
    },
    /** @type {typeof navigating} */
    navigating: {
      subscribe: stores$1.navigating.subscribe
    },
    /** @type {typeof updated} */
    updated: stores$1.updated
  };
};
const page = {
  subscribe(fn) {
    const store = getStores().page;
    return store.subscribe(fn);
  }
};
function NavLink($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let { href, matches = [], children } = $$props;
    const isCurrentPage = [href, ...matches].some((v) => store_get($$store_subs ??= {}, "$page", page).url.pathname.match(v));
    $$renderer2.push(`<li><a${attr("href", href)}${attr("aria-current", isCurrentPage ? "page" : void 0)} class="svelte-1y1xep9">`);
    children($$renderer2);
    $$renderer2.push(`<!----></a></li>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
function Header($$renderer) {
  $$renderer.push(`<header class="header wrapper repel w-full"><a href="/" class="cluster gutter-3xs no-underline font-bold"><span>🏛</span> <span>Brandon Pittman</span></a> <ul role="list" class="cluster font-bold gutter-s">`);
  NavLink($$renderer, {
    href: "/about",
    children: ($$renderer2) => {
      $$renderer2.push(`<!---->About`);
    }
  });
  $$renderer.push(`<!----> `);
  NavLink($$renderer, {
    href: "/notes",
    children: ($$renderer2) => {
      $$renderer2.push(`<!---->Notes`);
    }
  });
  $$renderer.push(`<!----> `);
  NavLink($$renderer, {
    href: "/colophon",
    children: ($$renderer2) => {
      $$renderer2.push(`<!---->Colophon`);
    }
  });
  $$renderer.push(`<!----></ul></header>`);
}
function _layout($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let { children } = $$props;
    const baseName = "Brandon Pittman";
    const titleSuffix = " | " + baseName;
    const pageTitle = store_get($$store_subs ??= {}, "$page", page).data.title || "";
    const hideH1 = store_get($$store_subs ??= {}, "$page", page).data.hideH1 || false;
    head("12qhfyh", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>${escape_html(pageTitle ? pageTitle + titleSuffix : baseName)}</title>`);
      });
    });
    Header($$renderer2);
    $$renderer2.push(`<!----> <main class="region wrapper prose w-full flow"><h1${attr_class("", void 0, { "visually-hidden": hideH1 })}>${escape_html(pageTitle.replace(titleSuffix, ""))}</h1> `);
    children($$renderer2);
    $$renderer2.push(`<!----></main>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
export {
  _layout as default
};
