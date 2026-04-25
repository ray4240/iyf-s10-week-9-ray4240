type Post = {
  id: number;
  title: string;
  body: string;
  userId: number;
};

type Props = {
  post: Post;
};

export default function PostCard({ post }: Props) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-3xl p-8 hover:border-blue-600 transition-all group">
      <div className="flex items-start gap-4 mb-6">
        <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl flex-shrink-0"></div>
        <div>
          <h3 className="font-semibold text-xl leading-tight group-hover:text-blue-400 transition-colors">
            {post.title}
          </h3>
          <p className="text-gray-500 text-sm mt-1">Posted by User #{post.userId}</p>
        </div>
      </div>

      <p className="text-gray-400 leading-relaxed line-clamp-4">
        {post.body}
      </p>

      <div className="mt-8 pt-6 border-t border-gray-800 flex justify-between items-center">
        <button className="text-blue-400 hover:text-blue-500 text-sm font-medium flex items-center gap-2">
          ❤️ Like
        </button>
        <a href={`/posts/${post.id}`} className="text-sm text-gray-400 hover:text-white">
          Read full post →
        </a>
      </div>
    </div>
  );
}
export {};