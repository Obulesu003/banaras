import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play } from 'lucide-react';
import Lightbox from './ui/Lightbox';

const mediaItems = [
    { id: 1, type: 'image', src: '/media/holi-1.jpg', category: 'Holi in Banaras', title: 'Ghat Colors' },
    { id: 2, type: 'video', src: '/media/banaras-holi-viral.mp4', category: 'Roadtrip Moments', title: 'Bus Karaoke' },
    { id: 3, type: 'image', src: '/media/naugarh-1.jpg', category: 'Naugarh & Jungle Night', title: 'Waterfall Chill' },
    { id: 4, type: 'image', src: '/media/holika-1.jpg', category: 'Holi in Banaras', title: 'Street Madness' },
    { id: 5, type: 'image', src: '/media/ayodhya-1.jpg', category: 'Ayodhya & Temples', title: 'Ram Mandir' },
    { id: 6, type: 'video', src: '/media/are-you-ready.mp4', category: 'Holi in Banaras', title: 'Dhol Beats' },
    { id: 7, type: 'image', src: '/media/bangalore-1.jpg', category: 'Roadtrip Moments', title: 'Roadside Chai' },
    { id: 8, type: 'image', src: '/media/sarnath-1.jpg', category: 'Naugarh & Jungle Night', title: 'Evening Chill' },
];

const categories = ['All', 'Holi in Banaras', 'Roadtrip Moments', 'Naugarh & Jungle Night', 'Ayodhya & Temples'];

const MediaWall = () => {
    const [filter, setFilter] = useState('All');
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    const filteredItems = filter === 'All'
        ? mediaItems
        : mediaItems.filter(item => item.category === filter);

    const openLightbox = (item) => {
        const index = mediaItems.findIndex(i => i.id === item.id);
        setCurrentIndex(index);
        setLightboxOpen(true);
    };

    return (
        <section id="media" className="py-20 bg-dark-base">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl md:text-6xl font-bold text-center text-white mb-12 uppercase">
                    Trip <span className="text-electric-yellow">Vibes</span>
                </h2>

                {/* Filters */}
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wider transition-all ${filter === cat
                                ? 'bg-neon-pink text-white shadow-[0_0_15px_rgba(255,0,127,0.5)]'
                                : 'bg-white/10 text-white hover:bg-white/20'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Grid */}
                <motion.div
                    layout
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
                >
                    <AnimatePresence>
                        {filteredItems.map((item) => (
                            <motion.div
                                layout
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                key={item.id}
                                onClick={() => openLightbox(item)}
                                className="relative aspect-square cursor-pointer group overflow-hidden rounded-xl bg-gray-800"
                            >
                                {item.type === 'video' ? (
                                    <>
                                        <video
                                            src={item.src}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                            muted
                                            playsInline
                                        />
                                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                            <div className="bg-white/20 backdrop-blur-sm p-3 rounded-full">
                                                <Play className="w-6 h-6 text-white fill-current" />
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <img
                                        src={item.src}
                                        alt={item.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                )}

                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                                    <p className="text-white font-bold uppercase">{item.title}</p>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>

            <Lightbox
                isOpen={lightboxOpen}
                onClose={() => setLightboxOpen(false)}
                media={mediaItems} // Pass all items to allow navigation even when filtered
                currentIndex={currentIndex}
                onNext={() => setCurrentIndex((prev) => (prev + 1) % mediaItems.length)}
                onPrev={() => setCurrentIndex((prev) => (prev - 1 + mediaItems.length) % mediaItems.length)}
            />
        </section>
    );
};

export default MediaWall;
