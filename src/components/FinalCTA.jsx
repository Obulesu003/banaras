import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const FinalCTA = () => {
    return (
        <section className="py-20 bg-dark-base relative overflow-hidden flex flex-col items-center justify-center text-center">
            {/* Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-neon-pink/20 blur-[100px] rounded-full" />
                <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-electric-yellow/10 blur-[80px] rounded-full" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-5xl md:text-7xl font-bold uppercase text-white mb-6 leading-tight"
                >
                    Still Thinking?<br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-pink to-electric-yellow">
                        Holi Won't Wait.
                    </span>
                </motion.h2>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-6"
                >
                    <button className="bg-neon-pink text-white px-12 py-6 rounded-full font-bold text-2xl shadow-[0_0_30px_rgba(255,0,127,0.6)] hover:shadow-[0_0_50px_rgba(255,0,127,0.8)] hover:scale-105 transition-all flex items-center gap-3">
                        I'm In.
                        <ArrowRight className="w-8 h-8" />
                    </button>
                </motion.div>
            </div>

            {/* Footer */}
            <footer className="absolute bottom-0 w-full py-6 border-t border-white/5 text-center text-white/30 text-sm">
                <p>&copy; {new Date().getFullYear()} Rang. Bhaang. Banaras. All rights reserved.</p>
            </footer>
        </section>
    );
};

export default FinalCTA;
