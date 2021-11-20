import { formatDistanceToNow } from "date-fns";

export default function PostMeta({ post }) {
  const published = formatDistanceToNow(new Date(post.data.date));

  return (
    <div className="flex items-center">
      <p className="text-sm text-gray-700">
        <span>Published {published} ago</span>
        <span> • </span>
        <span> {post.data.timeToRead} </span>
      </p>
    </div>
  );
}
