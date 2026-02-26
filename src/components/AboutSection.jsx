import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { Database, ShieldCheck, Sparkles, Network } from 'lucide-react';

export default function AboutSection() {
    const [ref, isIntersecting] = useIntersectionObserver();

    const features = [
        {
            icon: Sparkles,
            title: "AI Precision Matching",
            description: "Advanced natural language processing identifies exact semantic, phonetic, and partial word conflicts instantly."
        },
        {
            icon: Database,
            title: "National Coverage",
            description: "Cross-checks against millions of registered titles across all Indian states and languages."
        },
        {
            icon: ShieldCheck,
            title: "PRGI Compliance",
            description: "Automated checks against the latest Press Registrar General of India formatting and restricted vocabulary rules."
        },
        {
            icon: Network,
            title: "Geographic Scoping",
            description: "Intelligently filters conflicts based on the selected publication language and circulation region."
        }
    ];

    return (
        <section id="about" className="py-24 bg-white relative overflow-hidden" ref={ref}>
            <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-1000 transform ${isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>

                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-sm font-bold text-primary uppercase tracking-widest mb-3">About Uniquity</h2>
                    <h3 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
                        The definitive standard for publication compliance
                    </h3>
                    <p className="mt-6 text-lg text-gray-600 font-light leading-relaxed">
                        Uniquity simplifies the complex registration pipeline. By harnessing AI to simulate PRGI approval processes, we help publishers catch conflicts <em>before</em> they submit applications, drastically reducing rejection rates and accelerating launch timelines.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, idx) => {
                        const Icon = feature.icon;
                        return (
                            <div
                                key={idx}
                                className={`glass-panel p-6 border-b-2 border-transparent hover:border-primary transition-all duration-300 transform ${isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                                style={{ transitionDelay: `${idx * 150}ms` }}
                            >
                                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 text-primary">
                                    <Icon className="w-6 h-6" />
                                </div>
                                <h4 className="font-bold text-gray-900 mb-2">{feature.title}</h4>
                                <p className="text-sm text-gray-600 leading-relaxed">{feature.description}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
