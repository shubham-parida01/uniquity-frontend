import { Trash2, Clock, CheckCircle, ShieldAlert, AlertTriangle } from 'lucide-react';

export default function HistorySection({ history, onClear }) {
    if (!history || history.length === 0) {
        return (
            <section id="history" className="py-20 bg-gray-50 border-t border-gray-100 min-h-[400px] flex items-center">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                    <div className="text-center max-w-2xl mx-auto">
                        <Clock className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Analysis History</h2>
                        <p className="text-gray-500">Your recent title checks will appear here. Submit a title above to begin.</p>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section id="history" className="py-20 bg-gray-50 border-t border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                            <Clock className="w-6 h-6 text-primary" />
                            Recent Analyses
                        </h2>
                        <p className="text-sm text-gray-500 mt-1">Locally stored history of your previous requests.</p>
                    </div>
                    <button
                        onClick={onClear}
                        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-danger bg-danger/10 hover:bg-danger hover:text-white rounded-lg transition-all duration-200"
                    >
                        <Trash2 className="w-4 h-4" />
                        Clear History
                    </button>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden text-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-gray-100 font-semibold text-gray-500 bg-gray-50/50">
                                    <th className="px-6 py-4">Submitted Title</th>
                                    <th className="px-6 py-4">Score</th>
                                    <th className="px-6 py-4">Verdict</th>
                                    <th className="px-6 py-4">Timestamp</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {history.map((item, idx) => (
                                    <tr
                                        key={item.id}
                                        className="hover:bg-gray-50 transition-colors animate-fade-in"
                                        style={{ animationDelay: `${idx * 100}ms` }}
                                    >
                                        <td className="px-6 py-4 font-semibold text-gray-900">{item.title}</td>
                                        <td className="px-6 py-4 font-medium text-gray-700">{item.score}%</td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${item.score > 80 ? 'bg-danger/10 text-danger' :
                                                    item.score > 60 ? 'bg-warning/10 text-warning' :
                                                        'bg-success/10 text-success'
                                                }`}>
                                                {item.score > 80 && <AlertTriangle className="w-3.5 h-3.5" />}
                                                {item.score > 60 && <ShieldAlert className="w-3.5 h-3.5" />}
                                                {item.score <= 60 && <CheckCircle className="w-3.5 h-3.5" />}
                                                {item.score > 80 ? 'High Risk' : item.score > 60 ? 'Medium Risk' : 'Clear'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-gray-500">
                                            {new Date(item.timestamp).toLocaleString(undefined, {
                                                month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
                                            })}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </section>
    );
}
