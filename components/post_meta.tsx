export default function PostMeta({ post }) {
  return (
    <div className="flex items-center">
      <p className="text-sm text-gray-700">
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
