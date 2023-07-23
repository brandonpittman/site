import { component$ } from "@builder.io/qwik";
import type { UnreadItemProps } from "./unread-item";
import { UnreadItem } from "./unread-item";

type UnreadBlockProps = {
  list: any[];
  title: string;
};
export const UnreadBlock = component$<UnreadBlockProps>((props) => {
  if (!props.list.length) return null;
  return (
    <article id={props.title.toLowerCase()} class="flow">
      <h2 id={props.title.toLowerCase()}>{props.title}</h2>
      <ul class="flow">
        {props.list.map((item: UnreadItemProps) => (
          <UnreadItem key={item.slug} {...item} />
        ))}
      </ul>
    </article>
  );
});
