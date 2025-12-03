import { motion } from 'framer-motion';
import { ThumbsUp, ThumbsDown } from 'lucide-react';

const Audience = () => {
    return (
        <section className="py-20 bg-dark-base relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black/50 pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                <h2 className="text-4xl font-bold text-center text-white mb-16 uppercase">
                    Is This <span className="text-neon-pink">For You?</span>
                </h2>

                <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {/* For You If */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="bg-gradient-to-br from-holi-green/20 to-transparent border border-holi-green/30 p-8 rounded-2xl relative overflow-hidden group hover:border-holi-green/60 transition-colors"
                    >
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <ThumbsUp className="w-32 h-32 text-holi-green" />
                        </div>

                        <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                            <span className="bg-holi-green text-black p-2 rounded-lg"><ThumbsUp className="w-6 h-6" /></span>
                            HELL YES IF...
                        </h3>
                        <ul className="space-y-4 text-gray-200">
                            <li className="flex gap-3">
                                <span className="text-holi-green font-bold">01.</span>
                                You love chaos, colors, crowds, loud music, and unpredictable fun.
                            </li>
                            <li className="flex gap-3">
                                <span className="text-holi-green font-bold">02.</span>
                                You can handle long days, walking, and unpredictable plans.
                            </li>
                            <li className="flex gap-3">
                                <span className="text-holi-green font-bold">03.</span>
                                You want Holi that is raw and unfiltered, not a hotel pool party.
                            </li>
                        </ul>
                    </motion.div>

                    {/* Not For You If */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="bg-gradient-to-br from-neon-pink/20 to-transparent border border-neon-pink/30 p-8 rounded-2xl relative overflow-hidden group hover:border-neon-pink/60 transition-colors"
                    >
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <ThumbsDown className="w-32 h-32 text-neon-pink" />
                        </div>

                        <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                            <span className="bg-neon-pink text-white p-2 rounded-lg"><ThumbsDown className="w-6 h-6" /></span>
                            HARD PASS IF...
                        </h3>
                        <ul className="space-y-4 text-gray-200">
                            <li className="flex gap-3">
                                <span className="text-neon-pink font-bold">01.</span>
                                You hate getting dirty or being in close crowds.
                            </li>
                            <li className="flex gap-3">
                                <span className="text-neon-pink font-bold">02.</span>
                                You need things perfectly quiet, clean, and controlled.
                            </li>
                            <li className="flex gap-3">
                                <span className="text-neon-pink font-bold">03.</span>
                                You panic when someone touches your hoodie.
                            </li>
                        </ul>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Audience;
