import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './index.css';
import { useState, useEffect } from 'react';

type Post = {
  id: number;
  title: string;
  body: string;
  userId: number;
};

function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then((json) => setData(json))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [url]);

  return { data, loading, error };
}

const LoadingSpinner = () => (
  <div className="flex flex-col items-center justify-center py-20 text-gray-400">
    <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
    Loading community posts...
  </div>
);

const PostCard = ({ post }: { post: Post }) => (
  <div className="bg-gray-900 border border-gray-800 rounded-3xl p-8 hover:border-blue-600 transition-all">
    <h3 className="font-semibold text-xl mb-4 line-clamp-2">{post.title}</h3>
    <p className="text-gray-400 line-clamp-4 mb-6">{post.body}</p>
    <p className="text-sm text-gray-500">By User #{post.userId}</p>
  </div>
);

const Home = () => (
  <div className="min-h-screen bg-gray-950 text-white pt-20">
    <div className="max-w-6xl mx-auto px-6 text-center">
      <h1 className="text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
        DevSphere
      </h1>
      <p className="text-2xl text-gray-400 mb-12">Where developers connect, share knowledge, and grow together</p>
      <Link 
        to="/posts" 
        className="bg-blue-600 hover:bg-blue-700 px-10 py-4 rounded-2xl text-lg font-semibold inline-block"
      >
        Browse Community Posts
      </Link>
    </div>
  </div>
);

const PostsPage = () => {
  const { data: posts = [], loading, error } = useFetch<Post[]>('https://jsonplaceholder.typicode.com/posts');
  const [searchTerm, setSearchTerm] = useState('');

 const filteredPosts = posts 
  ? posts.filter(post =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.body.toLowerCase().includes(searchTerm.toLowerCase())
    )
  : [];

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-red-400 p-10 text-center">Error: {error}</div>;

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-5xl font-bold">Community Posts</h1>
        <Link to="/create-post" className="bg-blue-600 px-6 py-3 rounded-2xl font-semibold">+ New Post</Link>
      </div>

      <input
        type="text"
        placeholder="Search posts..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full bg-gray-900 border border-gray-700 rounded-2xl px-6 py-4 mb-10 focus:outline-none focus:border-blue-500"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPosts.slice(0, 12).map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-950 text-white">
        <header className="border-b border-gray-800 bg-gray-950 sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-2xl flex items-center justify-center text-2xl font-bold">D</div>
              <h1 className="text-3xl font-bold tracking-tight">DevSphere</h1>
            </div>
            <nav className="flex gap-8 text-lg">
              <Link to="/" className="hover:text-blue-400 transition-colors">Home</Link>
              <Link to="/posts" className="hover:text-blue-400 transition-colors">Posts</Link>
            </nav>
          </div>
        </header>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts" element={<PostsPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;