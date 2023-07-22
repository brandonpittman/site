import { component$, useStylesScoped$ } from "@builder.io/qwik";

const dateFormatter = new Intl.DateTimeFormat("en", {
  month: "long",
  day: "numeric",
  year: "numeric",
});

const formatDate = (d: string) => dateFormatter.format(Date.parse(d));

type PostLinkProps = {
  post: {
    slug: string;
    date: string;
    title: string;
  };
};

export const PostLink = component$<PostLinkProps>((props) => {
  useStylesScoped$(`
  li > a {
    --direction: column;
    --align: start;
    --gutter: 0;
  }

  li > a > span:first-child {
    font-size: var(--size-step--1);
  }
`);
  return (
    <li>
      <a
        rel="prefetch"
        href={`/notes/${props.post.slug}`}
        class="no-underline cluster"
      >
        <span class="color-gray-light white-space-nowrap">
          {formatDate(props.post.date)}
        </span>
        <span class="font-bold">{props.post.title}</span>
      </a>
    </li>
  );
});
