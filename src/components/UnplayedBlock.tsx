import { component$ } from "@builder.io/qwik";
import { UnplayedItem } from "./UnplayedItem";

type UnplayedBlockProps = {
  list: any[];
  title: string;
};
export const UnplayedBlock = component$<UnplayedBlockProps>((props) => {
  return (
    <>
      {props.list.length ? (
        <article id={props.title.toLowerCase()} class="flow">
          <h2>{props.title}</h2>
          <ul class="flow">
            {props.list.map((item) => (
              <UnplayedItem key={item.slug} {...item} />
            ))}
          </ul>
        </article>
      ) : null}
    </>
  );
});
