export default function PostMeta({ post }) {
  return (
    <div className="flex items-center pt-1">
      <p className="text-sm">
        <span>
          Last updated in {post.data.season}{" "}
          {new Date(post.data.date).getFullYear()}
        </span>
        <span> • </span>
        <span> {post.data.timeToRead} </span>
      </p>
    </div>
  );
}
