import { Search, Loader2 } from 'lucide-react';

export default function TitleInputCard({ onAnalyze, status }) {
    const isAnalyzing = status === 'loading';

    return (
        <div className="w-full max-w-4xl mx-auto glass-panel p-6 sm:p-8 transition-transform hover:-translate-y-1 hover:shadow-2xl duration-300 relative overflow-hidden group">
            {/* Decorative gradient blur in background */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10 group-hover:bg-primary/10 transition-colors duration-500"></div>

            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    const form = e.target;
                    const payload = {
                        title: form.title.value,
                        language: form.language.value,
                        periodicity: form.periodicity.value,
                    };
                    onAnalyze(payload);
                }}
                className="space-y-6 relative z-10"
            >
                <div className="space-y-2">
                    <label htmlFor="title" className="block text-sm font-semibold text-gray-700">
                        Proposed Publication Title
                    </label>
                    <div className="relative">
                        <input
                            type="text"
                            id="title"
                            name="title"
                            placeholder="Enter title (e.g., The Daily Chronicle)"
                            className="w-full px-4 py-4 text-lg border border-gray-200 rounded-lg focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all duration-300 outline-none shadow-sm"
                            required
                            disabled={isAnalyzing}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div className="space-y-2">
                        <label htmlFor="language" className="block text-sm font-medium text-gray-600">Language</label>
                        <select
                            id="language"
                            name="language"
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 outline-none text-gray-700 bg-white"
                            disabled={isAnalyzing}
                            defaultValue="en"
                        >
                            <option value="en">English</option>
                            <option value="hi">Hindi</option>
                            <option value="mr">Marathi</option>
                            <option value="bn">Bengali</option>
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="periodicity" className="block text-sm font-medium text-gray-600">Periodicity</label>
                        <select
                            id="periodicity"
                            name="periodicity"
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 outline-none text-gray-700 bg-white"
                            disabled={isAnalyzing}
                            defaultValue="daily"
                        >
                            <option value="daily">Daily</option>
                            <option value="weekly">Weekly</option>
                            <option value="monthly">Monthly</option>
                            <option value="quarterly">Quarterly</option>
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="state" className="block text-sm font-medium text-gray-600">State / Region</label>
                        <select id="state" className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 outline-none text-gray-700 bg-white" disabled={isAnalyzing}>
                            <option>All India</option>
                            <option>Delhi</option>
                            <option>Maharashtra</option>
                            <option>Karnataka</option>
                        </select>
                    </div>
                </div>

                <div className="pt-4 flex items-center justify-between border-t border-gray-100">
                    <div className="text-sm text-gray-500 font-medium flex items-center gap-2">
                        {isAnalyzing && (
                            <span className="flex items-center gap-2 text-primary animate-pulse">
                                <Loader2 className="w-4 h-4 animate-spin" /> Analyzing registry database...
                            </span>
                        )}
                        {!isAnalyzing && "Ready to analyze records"}
                    </div>

                    <button
                        type="submit"
                        disabled={isAnalyzing}
                        className="px-8 py-3.5 bg-primary text-white font-semibold rounded-lg shadow-lg hover:shadow-xl hover:bg-primary/90 hover:-translate-y-0.5 active:scale-95 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                    >
                        {isAnalyzing ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Processing...
                            </>
                        ) : (
                            <>
                                <Search className="w-5 h-5" />
                                Analyze Title
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}
