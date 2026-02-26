import { LogIn, CheckCircle2, ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function SignInPage() {
  const { currentUser, setGoogleUser, loading } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!loading && currentUser) {
      const id = window.setTimeout(() => navigate('/analyze#analyze'), 600);
      return () => window.clearTimeout(id);
    }
  }, [currentUser, loading, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (username === 'admin' && password === 'admin123') {
      setGoogleUser({
        displayName: 'Admin',
        email: 'admin@local',
        photoURL: '',
      });
      navigate('/analyze#analyze');
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <section className="pt-28 pb-20 bg-white min-h-[calc(100vh-80px)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl mx-auto">
          <div className="glass-panel p-8 sm:p-10">
            <div className="flex items-center justify-center mb-6">
              <img
                src="/assets/uniquity-logo.png"
                alt="Uniquity logo"
                className="h-10 w-auto"
              />
            </div>

            {!loading && currentUser ? (
              <div className="text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-success/10 text-success text-sm font-semibold mb-4">
                  <CheckCircle2 className="w-4 h-4" />
                  Signed in
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight mb-3">
                  Welcome{currentUser.displayName ? `, ${currentUser.displayName}` : ''}
                </h1>
                <p className="text-gray-600 mb-8">
                  Redirecting you to Analyze…
                </p>
                <Link
                  to="/analyze#analyze"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-primary text-white font-semibold shadow-lg hover:bg-primary/90 transition-all duration-300"
                >
                  Go to Analyze <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ) : (
              <div className="text-left">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight mb-3 text-center">
                  Sign in to Uniquity
                </h1>
                <p className="text-gray-600 mb-8 text-center">
                  Use the admin credentials to access the analyzer dashboard.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Username
                    </label>
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                      placeholder="admin"
                      autoComplete="username"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Password
                    </label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                      placeholder="admin123"
                      autoComplete="current-password"
                    />
                  </div>

                  {error && (
                    <p className="text-sm text-danger mt-1">
                      {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-primary text-primary font-semibold hover:bg-primary hover:text-white transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    <LogIn className="w-4 h-4" />
                    Sign in
                  </button>
                </form>

                <p className="text-xs text-gray-500 mt-5 text-center">
                  Demo credentials — username: <span className="font-semibold">admin</span>, password:{' '}
                  <span className="font-semibold">admin123</span>.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

