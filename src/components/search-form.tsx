import { component$, Slot } from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";

export const SearchForm = component$<{ placeholder?: string }>(
  ({ placeholder }) => {
    const location = useLocation();
    const q = location.url.searchParams.get("q");

    return (
      <form
        onInput$={async ({ target }, ev) => {
          if ((target as HTMLInputElement).value.trim() === "") {
            ev.submit();
          }
        }}
      >
        <label for="search" class="visually-hidden">
          <Slot />
        </label>
        <div
          class="sidebar"
          data-dir="rtl"
          style="--gutter: var(--space-2xs); --sidebar-min-inline-size: 80%; max-inline-size: var(--size-15)"
        >
          <input
            list="datalist"
            autoFocus
            value={q}
            id="search"
            type="search"
            name="q"
            placeholder={placeholder}
          />
          <button type="submit" class="cta">
            {" "}
            Search
          </button>
        </div>
      </form>
    );
  }
);
