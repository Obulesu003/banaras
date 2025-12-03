import { Check, X } from 'lucide-react';
import { motion } from 'framer-motion';

const Inclusions = () => {
    const included = [
        'All main travel during the trip (train/road).',
        'Stays for all nights (shared accommodations).',
        'Local transport for planned activities.',
        'Trip lead / coordinator & on-ground support.'
    ];

    const notIncluded = [
        'Personal shopping and extra street food.',
        'Alcohol and personal substance choices.',
        'Any activity not mentioned in the itinerary.',
        'Personal medical expenses / insurance.'
    ];

    return (
        <section className="py-20 bg-dark-base border-t border-white/5">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl font-bold text-center text-white mb-12 uppercase">
                    The <span className="text-electric-yellow">Deal</span>
                </h2>

                <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {/* Included */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-white/5 border border-white/10 p-8 rounded-2xl"
                    >
                        <h3 className="text-2xl font-bold text-holi-green mb-6 flex items-center gap-2">
                            <Check className="w-8 h-8" /> Included
                        </h3>
                        <ul className="space-y-4">
                            {included.map((item, index) => (
                                <li key={index} className="flex items-start gap-3 text-gray-300">
                                    <Check className="w-5 h-5 text-holi-green mt-0.5 flex-shrink-0" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Not Included */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-white/5 border border-white/10 p-8 rounded-2xl"
                    >
                        <h3 className="text-2xl font-bold text-neon-pink mb-6 flex items-center gap-2">
                            <X className="w-8 h-8" /> Not Included
                        </h3>
                        <ul className="space-y-4">
                            {notIncluded.map((item, index) => (
                                <li key={index} className="flex items-start gap-3 text-gray-300">
                                    <X className="w-5 h-5 text-neon-pink mt-0.5 flex-shrink-0" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Inclusions;
