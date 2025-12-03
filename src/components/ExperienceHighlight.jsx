import { useState } from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import Lightbox from './ui/Lightbox';

const highlights = [
    {
        id: 1,
        type: 'image',
        src: '/media/holika-1.jpg',
        title: 'GHAT HOLI',
        desc: 'Colors flying at Assi Ghat',
        span: 'col-span-1 row-span-1',
    },
    {
        id: 2,
        type: 'video',
        src: '/media/banaras-holi-viral.mp4',
        title: 'LANE CHAOS',
        desc: 'The real madness happens in the gallis',
        span: 'col-span-1 row-span-2',
    },
    {
        id: 3,
        type: 'image',
        src: '/media/thandai.jpg',
        title: 'BHAANG TIME',
        desc: 'Thandai that hits different',
        span: 'col-span-1 row-span-1',
    },
    {
        id: 4,
        type: 'image',
        src: '/media/holi-1.jpg',
        title: 'DANCE CIRCLE',
        desc: 'Strangers becoming best friends',
        span: 'col-span-2 row-span-1',
    },
    {
        id: 5,
        type: 'video',
        src: '/media/are-you-ready.mp4',
        title: 'MASAN HOLI',
        desc: 'Ash Holi at the burning ghats',
        span: 'col-span-1 row-span-1',
    },
];

const ExperienceHighlight = () => {
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    const openLightbox = (index) => {
        setCurrentIndex(index);
        setLightboxOpen(true);
    };

    const nextMedia = () => {
        setCurrentIndex((prev) => (prev + 1) % highlights.length);
    };

    const prevMedia = () => {
        setCurrentIndex((prev) => (prev - 1 + highlights.length) % highlights.length);
    };

    return (
        <section id="experience" className="py-20 bg-dark-base relative overflow-hidden">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-6xl font-bold uppercase text-white mb-4"
                    >
                        This Is How Your <span className="text-neon-pink">Holi</span> Will Look
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto"
                    >
                        Colors in your hair, drums in your chest, strangers turning into friends – this is Banaras Holi, up close.
                    </motion.p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[300px]">
                    {highlights.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            onClick={() => openLightbox(index)}
                            className={`relative group cursor-pointer overflow-hidden rounded-xl ${item.span}`}
                        >
                            {/* Media */}
                            {item.type === 'video' ? (
                                <div className="w-full h-full relative">
                                    <video
                                        src={item.src}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        muted
                                        playsInline
                                        autoPlay
                                        loop
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                                        <div className="bg-white/20 backdrop-blur-sm p-4 rounded-full group-hover:bg-neon-pink/80 transition-colors">
                                            <Play className="w-8 h-8 text-white fill-current" />
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <img
                                    src={item.src}
                                    alt={item.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                            )}

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 pointer-events-none">
                                <h3 className="text-electric-yellow font-bold text-xl uppercase tracking-wider">{item.title}</h3>
                                <p className="text-white text-sm">{item.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            <Lightbox
                isOpen={lightboxOpen}
                onClose={() => setLightboxOpen(false)}
                media={highlights}
                currentIndex={currentIndex}
                onNext={nextMedia}
                onPrev={prevMedia}
            />
        </section>
    );
};

export default ExperienceHighlight;
