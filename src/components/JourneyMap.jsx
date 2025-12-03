import { useRef, useState, useMemo, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars, Cloud, Sparkles, RoundedBox, Environment as DreiEnvironment, Html, useProgress } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';

// ... (existing imports and code)

const Loader = () => {
    const { progress } = useProgress();
    return (
        <Html center>
            <div className="text-white font-bold text-xl tracking-widest">
                {progress.toFixed(0)}%
            </div>
        </Html>
    );
};

// ... (existing code)

const JourneyMap = () => {
    const [overlayState, setOverlayState] = useState({
        currentStopIndex: 0,
        isStopped: true
    });

    const scrollProgress = useRef(0);

    useEffect(() => {
        const handleScroll = () => {
            const section = document.getElementById('journey');
            if (!section) return;

            const rect = section.getBoundingClientRect();
            const viewportHeight = window.innerHeight;

            // Calculate how much of the section has been scrolled
            const totalScrollDistance = section.offsetHeight - viewportHeight;

            if (totalScrollDistance <= 0) return;

            const scrolled = -rect.top;
            const p = Math.max(0, Math.min(1, scrolled / totalScrollDistance));

            scrollProgress.current = p;
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Initial check

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <section id="journey" className="h-[800vh] relative bg-dark-base">
            <div className="sticky top-0 h-screen w-full overflow-hidden">
                <Canvas shadows camera={{ position: [0, 6, 30], fov: 40 }} gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}>
                    <Suspense fallback={<Loader />}>
                        <Scene scrollProgress={scrollProgress} setOverlayState={setOverlayState} />
                    </Suspense>
                </Canvas>

                {/* HTML Content Overlay */}
                <div className="absolute inset-0 pointer-events-none">
                    {stops.map((stop, index) => {
                        const isActive = overlayState.currentStopIndex === index && overlayState.isStopped;

                        return (
                            <AnimatePresence key={stop.id}>
                                {isActive && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 50 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -50 }}
                                        transition={{ duration: 0.5 }}
                                        className="absolute inset-0 flex items-center justify-center md:justify-end md:pr-20 pointer-events-none"
                                    >
                                        <div
                                            className="bg-black/80 backdrop-blur-xl border-l-4 p-6 rounded-r-2xl max-w-xl text-left shadow-2xl mx-4 md:mx-0 pointer-events-auto"
                                            style={{ borderColor: stop.color }}
                                        >
                                            <div className="flex items-center gap-3 mb-2">
                                                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Stop {index + 1}/{stops.length}</span>
                                                <div className="h-px bg-gray-600 flex-grow" />
                                            </div>

                                            <h2 className="text-3xl md:text-5xl font-bold uppercase mb-1 leading-none" style={{ color: stop.color }}>
                                                {stop.title.split("—")[0]}
                                            </h2>
                                            <p className="text-white/80 font-bold italic text-lg mb-4">"{stop.vibe}"</p>

                                            {/* Image Gallery */}
                                            <div className="flex gap-2 overflow-x-auto pb-2 mb-4 scrollbar-hide">
                                                {stop.images.map((img, i) => (
                                                    <div key={i} className="w-32 h-20 flex-shrink-0 bg-gray-800 rounded-lg overflow-hidden border border-white/10 relative group">
                                                        <img src={img} alt={`${stop.title} ${i + 1}`} className="w-full h-full object-cover" />
                                                    </div>
                                                ))}
                                            </div>

                                            <div className="space-y-4 text-gray-200">
                                                <div>
                                                    <h4 className="text-[10px] font-bold uppercase text-gray-500 mb-0.5">The Story</h4>
                                                    <p className="text-sm leading-relaxed">{stop.story}</p>
                                                </div>
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div>
                                                        <h4 className="text-[10px] font-bold uppercase text-gray-500 mb-0.5">See</h4>
                                                        <p className="text-xs">{stop.see}</p>
                                                    </div>
                                                    <div>
                                                        <h4 className="text-[10px] font-bold uppercase text-gray-500 mb-0.5">Feel</h4>
                                                        <p className="text-xs">{stop.feel}</p>
                                                    </div>
                                                </div>
                                                <div className="pt-4 border-t border-white/10">
                                                    <p className="text-lg font-bold text-white">→ {stop.closer}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        );
                    })}
                </div>

                {/* Progress Bar */}
                <div className="absolute bottom-0 left-0 w-full h-2 bg-white/10">
                    <motion.div
                        className="h-full bg-neon-pink"
                        style={{ width: `${((overlayState.currentStopIndex + 1) / stops.length) * 100}%` }}
                    />
                </div>
            </div>
        </section>
    );
};

export default JourneyMap;
