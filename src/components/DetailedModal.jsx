import { X, Sparkles, Scale, Info } from 'lucide-react';

export default function DetailedModal({ result, onClose }) {
    if (!result) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 backdrop-blur-sm bg-gray-900/40 animate-fade-in">
            <div
                className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden animate-slide-up"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Scale className="w-5 h-5 text-primary" />
                        <h3 className="font-bold text-xl text-gray-900">Comparative Analysis</h3>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-900 bg-gray-50 hover:bg-gray-100 rounded-full p-2 transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Comparison Body */}
                <div className="p-6 sm:p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">

                        {/* VS Badge */}
                        <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-gray-50 border border-gray-200 items-center justify-center font-bold text-gray-500 z-10 shadow-sm">
                            VS
                        </div>

                        {/* Proposed Title */}
                        <div className="bg-primary/5 rounded-xl p-6 border border-primary/10">
                            <span className="text-xs font-bold uppercase tracking-wider text-primary mb-2 block">Your Proposed Title</span>
                            <h4 className="text-2xl font-black text-gray-900">
                                The <span className="bg-warning/20 px-1 py-0.5 rounded text-warning">Daily</span> Chronicle
                            </h4>
                            <div className="mt-6 flex flex-wrap gap-2">
                                <span className="text-xs bg-white text-gray-600 px-3 py-1 rounded-full border border-gray-200 shadow-sm">English</span>
                                <span className="text-xs bg-white text-gray-600 px-3 py-1 rounded-full border border-gray-200 shadow-sm">Daily</span>
                                <span className="text-xs bg-white text-gray-600 px-3 py-1 rounded-full border border-gray-200 shadow-sm">All India</span>
                            </div>
                        </div>

                        {/* Existing Title */}
                        <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                            <span className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2 block">Existing Registration</span>
                            <h4 className="text-2xl font-black text-gray-900">
                                <span className="bg-warning/20 px-1 py-0.5 rounded text-warning">Daily</span> {result.title.replace('Daily', '')}
                            </h4>
                            <div className="mt-6 flex flex-wrap gap-2">
                                <span className="text-xs bg-white text-gray-600 px-3 py-1 rounded-full border border-gray-200 shadow-sm">RNI: DELENG/2021/12345</span>
                                <span className="text-xs bg-white text-gray-600 px-3 py-1 rounded-full border border-gray-200 shadow-sm flex items-center gap-1"><Info className="w-3 h-3" /> High Conflict</span>
                            </div>
                        </div>
                    </div>

                    {/* AI Explanation */}
                    <div className="mt-8 bg-blue-50/50 rounded-xl p-5 border border-blue-100 flex items-start gap-4">
                        <Sparkles className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                        <div>
                            <h5 className="font-semibold text-gray-900 mb-1">AI Match Explanation</h5>
                            <p className="text-sm text-gray-700 leading-relaxed">
                                The term <strong>"Daily"</strong> strongly conflicts with the existing registration. According to PRGI guideline 12.4, generic prefixes or suffixes cannot be used to differentiate titles in the same language and periodicity category.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
