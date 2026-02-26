import { ShieldAlert, AlertTriangle, CheckCircle, ChevronRight, Activity } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function ResultsDashboard({ analysis, onRowClick }) {
    const [fillScore, setFillScore] = useState(0);

    useEffect(() => {
        if (!analysis) {
            setFillScore(0);
            return;
        }
        const target =
            typeof analysis.risk_score === 'number'
                ? Math.round(analysis.risk_score * 100)
                : typeof analysis.similarity_percent === 'number'
                    ? Math.round(analysis.similarity_percent)
                    : 0;
        setFillScore(target);
    }, [analysis]);

    if (!analysis) {
        return null;
    }

    const matches = (analysis.top_matches || []).map((m, index) => {
        const similarity =
            typeof m.final_similarity_component === 'number'
                ? Math.round(m.final_similarity_component * 100)
                : typeof m.semantic_similarity === 'number'
                    ? Math.round(m.semantic_similarity * 100)
                    : fillScore;

        let matchType = 'Similar Title';
        if (m.semantic_similarity >= 0.95) {
            matchType = 'Exact Conflict';
        } else if (m.phonetic_similarity >= 0.7) {
            matchType = 'Phonetic Match';
        } else if (m.prefix_suffix_similarity >= 0.7) {
            matchType = 'Prefix/Suffix Match';
        }

        let risk = 'Low';
        if (similarity > 80) risk = 'High';
        else if (similarity > 60) risk = 'Medium';

        return {
            id: m.id ?? index,
            title: m.original_title ?? m.normalized_title ?? 'Unknown title',
            score: similarity,
            matchType,
            risk,
        };
    });

    const conflictLabel =
        analysis.final_decision === 'reject' ? 'High Risk – Likely Duplicate' :
            analysis.final_decision === 'approve' ? 'Low Risk – Likely Unique' :
                'Moderate Risk – Needs Review';

    return (
        <div className="w-full max-w-6xl mx-auto mt-12 animate-fade-in space-y-8">
            {/* Top Section: Verdict and Gauge */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Verdict Badge */}
                <div className="md:col-span-2 glass-panel p-6 sm:p-8 flex flex-col justify-center border-l-4 border-warning">
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-sm font-semibold text-warning uppercase tracking-wider mb-2">Analysis Verdict</p>
                            <h3 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                                <AlertTriangle className="w-8 h-8 text-warning" />
                                {conflictLabel}
                            </h3>
                            <p className="mt-4 text-gray-600 max-w-lg">
                                We found {matches.length} existing publication{matches.length === 1 ? '' : 's'} related to your proposed title
                                "{analysis.query_title}". Review the conflicts and risk score before submitting to PRGI.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Score Gauge */}
                <div className="glass-panel p-6 sm:p-8 flex flex-col items-center justify-center text-center">
                    <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-6">Conflict Probability</p>
                    <div className="relative w-32 h-32 flex items-center justify-center">
                        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                            <circle cx="50" cy="50" r="45" fill="none" stroke="#f1f5f9" strokeWidth="8" />
                            <circle
                                cx="50" cy="50" r="45" fill="none"
                                stroke="#F59E0B" strokeWidth="8" strokeLinecap="round"
                                strokeDasharray={`${(fillScore * 283) / 100} 283`}
                                className="gauge-circle"
                            />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center flex-col">
                            <span className="text-3xl font-extrabold text-gray-900">{fillScore}%</span>
                        </div>
                    </div>
                    <p className="mt-4 text-sm text-gray-500 font-medium flex items-center gap-1">
                        <Activity className="w-4 h-4" /> {conflictLabel}
                    </p>
                </div>
            </div>

            {/* Similar Titles Table */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-6 py-5 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
                    <h4 className="font-bold text-lg text-gray-900">Matches Found ({matches.length})</h4>
                    <span className="text-sm text-gray-500 font-medium">Click a row for detailed AI comparison</span>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-gray-100 text-sm font-semibold text-gray-500 bg-white">
                                <th className="px-6 py-4">Existing Title</th>
                                <th className="px-6 py-4">Similarity Score</th>
                                <th className="px-6 py-4">Match Type</th>
                                <th className="px-6 py-4">Risk Level</th>
                                <th className="px-6 py-4 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {matches.map((result, index) => (
                                <tr
                                    key={result.id}
                                    onClick={() => onRowClick(result)}
                                    className="hover:bg-gray-50 cursor-pointer transition-colors group animate-fade-in"
                                    style={{ animationDelay: `${index * 150}ms` }}
                                >
                                    <td className="px-6 py-4">
                                        <span className="font-semibold text-gray-900">{result.title}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <span className="font-medium text-gray-700 w-8">{result.score}%</span>
                                            <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                                                <div
                                                    className={`h-full rounded-full transition-all duration-1000 ${result.score > 80 ? 'bg-danger' : result.score > 60 ? 'bg-warning' : 'bg-primary'
                                                        }`}
                                                    style={{ width: `${result.score}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-sm text-gray-600 font-medium px-2.5 py-1 bg-gray-100 rounded-md">
                                            {result.matchType}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center gap-1.5 text-sm font-medium px-2.5 py-1 rounded-full ${result.risk === 'High' ? 'bg-danger/10 text-danger' :
                                                result.risk === 'Medium' ? 'bg-warning/10 text-warning' :
                                                    'bg-success/10 text-success'
                                            }`}>
                                            {result.risk === 'High' && <AlertTriangle className="w-3.5 h-3.5" />}
                                            {result.risk === 'Medium' && <ShieldAlert className="w-3.5 h-3.5" />}
                                            {result.risk === 'Low' && <CheckCircle className="w-3.5 h-3.5" />}
                                            {result.risk}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="text-gray-400 group-hover:text-primary transition-colors">
                                            <ChevronRight className="w-5 h-5 ml-auto" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
