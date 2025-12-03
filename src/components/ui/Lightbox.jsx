import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect } from 'react';

const Lightbox = ({ isOpen, onClose, media, currentIndex, onNext, onPrev }) => {
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!isOpen) return;
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowRight') onNext();
            if (e.key === 'ArrowLeft') onPrev();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, onClose, onNext, onPrev]);

    if (!isOpen || !media) return null;

    const currentItem = media[currentIndex];

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[60] bg-black/95 flex items-center justify-center p-4"
                >
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-white/70 hover:text-white z-50 p-2"
                    >
                        <X className="w-8 h-8" />
                    </button>

                    {/* Navigation Buttons */}
                    <button
                        onClick={(e) => { e.stopPropagation(); onPrev(); }}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white p-2 hidden md:block"
                    >
                        <ChevronLeft className="w-10 h-10" />
                    </button>
                    <button
                        onClick={(e) => { e.stopPropagation(); onNext(); }}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white p-2 hidden md:block"
                    >
                        <ChevronRight className="w-10 h-10" />
                    </button>

                    {/* Content */}
                    <div className="relative w-full max-w-6xl max-h-[90vh] flex flex-col items-center justify-center">
                        {currentItem.type === 'video' ? (
                            <video
                                controls
                                autoPlay
                                className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
                                src={currentItem.src}
                            />
                        ) : (
                            <img
                                src={currentItem.src}
                                alt={currentItem.alt || 'Gallery Image'}
                                className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
                            />
                        )}

                        {/* Caption */}
                        <div className="mt-4 text-center">
                            <h3 className="text-xl font-bold text-white">{currentItem.title}</h3>
                            {currentItem.desc && <p className="text-gray-400 text-sm">{currentItem.desc}</p>}
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Lightbox;
