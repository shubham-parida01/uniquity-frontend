import { Link } from 'react-router-dom';

export default function Hero({ children }) {
    return (
        <section
            id="home"
            className="relative overflow-hidden bg-gradient-to-r from-[#b8f2c9] via-[#c6ddff] to-[#7aa7ff] min-h-screen"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 relative z-10 min-h-screen flex flex-col">
                <div className="flex-1 grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left: copy */}
                    <div className="text-left">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/70 text-primary text-sm font-semibold mb-6 shadow-sm animate-fade-in">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                            </span>
                            PRGI Final Guidelines Supported
                        </div>

                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight mb-6 leading-tight animate-slide-up">
                            Verify Title Uniqueness with
                            <br className="hidden sm:block" />
                            <span className="block text-gray-900">
                                AI Precision
                            </span>
                        </h1>

                        <p
                            className="mt-4 text-lg sm:text-xl text-gray-800 font-light mb-8 max-w-xl animate-slide-up"
                            style={{ animationDelay: '100ms' }}
                        >
                            Instantly analyze your publication title against
                            national and state registries to detect semantic
                            conflicts and ensure PRGI compliance before
                            submission.
                        </p>

                        <Link
                            to="/analyze#analyze"
                            className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-gray-900 text-white font-semibold shadow-lg hover:shadow-xl hover:bg-black transition-all duration-300 active:scale-95 animate-slide-up"
                            style={{ animationDelay: '200ms' }}
                        >
                            Start Analysis
                        </Link>
                    </div>

                    {/* Right: illustration */}
                    <div className="relative flex justify-center lg:justify-end">
                        <div className="relative max-w-lg w-full h-[420px] lg:h-[500px]">
                            <img
                                src="/images/hero_page.svg"
                                alt="Uniquity hero illustration"
                                className="w-full h-full object-contain object-right pointer-events-none select-none"
                            />
                        </div>
                    </div>
                </div>

                {/* Analysis card below hero, matching site style */}
                {children && (
                    <div className="mt-12 max-w-3xl mx-auto">
                        {children}
                    </div>
                )}
            </div>
        </section>
    );
}
