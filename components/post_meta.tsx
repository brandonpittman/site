import useSeason from "@/hooks/useSeason";

export default function PostMeta({ post }) {
  const season = useSeason(new Date(post.data.date));

  return (
    <div className="flex items-center pt-1">
      <p className="text-sm">
        <span>
          Last updated in {season} {new Date(post.data.date).getFullYear()}
        </span>
        {/*
        <span> • </span>
        <span> {post.data.timeToRead} </span>
         */}
      </p>
    </div>
  );
}
