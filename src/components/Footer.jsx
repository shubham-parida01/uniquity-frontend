export default function Footer() {
    return (
        <footer className="bg-white border-t border-gray-100 py-12 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-2">
                        <div className="h-8 sm:h-10 overflow-hidden flex items-start">
                            <img
                                src="/images/logo.svg"
                                alt="Uniquity logo"
                                className="h-16 sm:h-20 w-auto"
                            />
                        </div>
                    </div>

                    <div className="text-sm text-gray-500 font-medium tracking-wide">
                        &copy; {new Date().getFullYear()} Uniquity. All rights reserved.
                    </div>

                    <div className="flex gap-4 text-sm font-medium text-gray-500">
                        <a href="#" className="hover:text-primary transition-colors">Privacy</a>
                        <a href="#" className="hover:text-primary transition-colors">Terms</a>
                        <a href="#" className="hover:text-primary transition-colors">API</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
