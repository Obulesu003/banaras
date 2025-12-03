import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, ShieldAlert } from 'lucide-react';

const faqs = [
    {
        question: 'Is this trip safe for first-time visitors to Banaras?',
        answer: 'Yes! While Banaras is chaotic, we travel as a group. Stick with the crew, follow the lead, and you’ll be fine. We have local support always available.'
    },
    {
        question: 'How extreme is Holi there actually?',
        answer: 'It is intense. Expect colors everywhere, loud music, and crowded streets. If you are claustrophobic or hate getting dirty, this might not be for you. But if you want the real deal, this is it.'
    },
    {
        question: 'Will there be free time?',
        answer: 'Yes, we have balanced the itinerary. Evenings on Day 2, 3, and 4 have free slots for you to explore cafes, ghats, or just sleep.'
    },
    {
        question: 'What should I pack?',
        answer: 'Old clothes for Holi (they will get ruined), comfortable walking shoes, sunglasses, sunscreen, and a power bank. We will share a detailed packing list.'
    },
    {
        question: 'Can I join solo?',
        answer: 'Absolutely! Most of our travelers join solo and leave with a new squad. The bus journey is the best ice-breaker.'
    }
];

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(null);

    return (
        <section id="faq" className="py-20 bg-dark-base border-t border-white/5">
            <div className="container mx-auto px-4 max-w-3xl">
                <h2 className="text-4xl font-bold text-center text-white mb-12 uppercase">
                    Got <span className="text-electric-yellow">Questions?</span>
                </h2>

                <div className="space-y-4 mb-16">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="border border-white/10 rounded-lg bg-white/5 overflow-hidden"
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors"
                            >
                                <span className="font-bold text-lg text-white">{faq.question}</span>
                                {openIndex === index ? (
                                    <Minus className="w-5 h-5 text-neon-pink" />
                                ) : (
                                    <Plus className="w-5 h-5 text-white/50" />
                                )}
                            </button>
                            <AnimatePresence>
                                {openIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <div className="p-6 pt-0 text-gray-300 leading-relaxed">
                                            {faq.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>

                {/* Safety Note */}
                <div className="bg-electric-blue/10 border border-electric-blue/30 p-6 rounded-xl flex gap-4 items-start">
                    <ShieldAlert className="w-8 h-8 text-electric-blue flex-shrink-0 mt-1" />
                    <div>
                        <h3 className="text-xl font-bold text-electric-blue mb-2">Safety First</h3>
                        <p className="text-gray-300 text-sm">
                            We take fun seriously, but safety more so. Respect locals, don't consume anything from strangers (especially bhaang), and always keep your location shared with the trip lead. Harassment of any kind is zero-tolerance.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FAQ;
