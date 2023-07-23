import { component$ } from "@builder.io/qwik";

export type UnreadItemProps = {
  slug: string;
  title: string;
  author: string;
  translator?: string;
};

export const UnreadItem = component$<UnreadItemProps>((props) => {
  return (
    <li class="flow-3xs">
      <div class="cluster gutter-3xs" style="--align: baseline;">
        <a href={`/books/${props.slug}`}>
          <span>{props.title}</span>
        </a>
        <a
          href={`/unread?q=${props.author}`}
          class="no-underline color-gray-light text-2xs white-space-nowrap font-medium"
        >
          {props.author}
        </a>
        {props.translator ? (
          <>
            <span class="no-underline color-gray-light text-2xs white-space-nowrap font-medium">
              &amp;
            </span>
            <a
              href={`/unread?q=${props.translator}`}
              class="no-underline color-gray-light text-2xs white-space-nowrap font-medium"
            >
              {props.translator}
            </a>
          </>
        ) : null}
      </div>
    </li>
  );
});
