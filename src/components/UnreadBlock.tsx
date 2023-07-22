import { component$ } from "@builder.io/qwik";
import { UnreadItem } from "./UnreadItem";

type UnreadBlockProps = {
  list: any[];
  title: string;
};
export const UnreadBlock = component$<UnreadBlockProps>((props) => {
  return (
    <>
      {props.list.length ? (
        <article id={props.title.toLowerCase()} class="flow">
          <h2>{props.title}</h2>
          <ul class="flow">
            {props.list.map((item) => (
              <UnreadItem key={item.slug} {...item} />
            ))}
          </ul>
        </article>
      ) : null}
    </>
  );
});
