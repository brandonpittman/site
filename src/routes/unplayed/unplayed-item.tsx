import { component$ } from "@builder.io/qwik";

export type UnplayedItemProps = {
  slug: string;
  title: string;
  platform: string;
};

export const UnplayedItem = component$<UnplayedItemProps>((props) => {
  return (
    <li class="flow-3xs">
      <div class="cluster gutter-3xs" style="--align: baseline;">
        <span>{props.title}</span>
        <a hidden href={`/games/${props.slug}`}>
          <span>{props.title}</span>
        </a>
        <a
          href={`/unplayed?q=${props.platform}`}
          class="no-underline color-gray-light text-2xs white-space-nowrap font-medium"
        >
          {props.platform}
        </a>
      </div>
    </li>
  );
});
