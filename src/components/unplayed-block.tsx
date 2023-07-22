import { component$ } from "@builder.io/qwik";
import { UnplayedItem } from "./unplayed-item";

type UnplayedBlockProps = {
  list: any[];
  title: string;
};
export const UnplayedBlock = component$<UnplayedBlockProps>((props) => {
  if (!props.list.length) return null;

  return (
    <article id={props.title.toLowerCase()} class="flow">
      <h2 id={props.title.toLowerCase()}>{props.title}</h2>
      <ul class="flow">
        {props.list.map((item) => (
          <UnplayedItem key={item.slug} {...item} />
        ))}
      </ul>
    </article>
  );
});
