import { CheckCircle, XCircle, AlertTriangle, ShieldCheck } from 'lucide-react';

export default function ChecklistPanel() {
    const rules = [
        {
            id: 1,
            title: 'Duplicate Check',
            description: 'No exact matches found in the active PRGI registry.',
            status: 'pass',
            icon: CheckCircle,
            delay: '100ms',
        },
        {
            id: 2,
            title: 'Restricted Words',
            description: 'Title does not contain prohibited vocabulary or reserved terms.',
            status: 'pass',
            icon: CheckCircle,
            delay: '300ms',
        },
        {
            id: 3,
            title: 'State & Regional Conflicts',
            description: 'Similar phonetics detected in the same geographic circulation area.',
            status: 'warning',
            icon: AlertTriangle,
            delay: '500ms',
        },
        {
            id: 4,
            title: 'PRGI Compliance Rules',
            description: 'Violates section 5(b) regarding prefix similarity for daily newspapers.',
            status: 'fail',
            icon: XCircle,
            delay: '700ms',
        }
    ];

    return (
        <div className="w-full max-w-6xl mx-auto mt-8 glass-panel p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-8">
                <ShieldCheck className="w-6 h-6 text-primary" />
                <h3 className="text-xl font-bold text-gray-900">Compliance AI Validation Checklist</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {rules.map((rule) => {
                    const Icon = rule.icon;
                    return (
                        <div
                            key={rule.id}
                            className="flex items-start gap-4 p-5 rounded-xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition-all duration-300 animate-fade-in group"
                            style={{ animationFillMode: 'both', animationDelay: rule.delay }}
                        >
                            <div className={`mt-1 p-2 rounded-full flex-shrink-0 ${rule.status === 'pass' ? 'bg-success/10 text-success' :
                                    rule.status === 'warning' ? 'bg-warning/10 text-warning' :
                                        'bg-danger/10 text-danger'
                                }`}>
                                <Icon className="w-5 h-5" />
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-900 group-hover:text-primary transition-colors">{rule.title}</h4>
                                <p className="text-sm text-gray-600 mt-1 leading-relaxed">{rule.description}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
