import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Experience', href: '#experience' },
        { name: 'Journey', href: '#journey' },
        { name: 'Itinerary', href: '#itinerary' },
        { name: 'Media', href: '#media' },
        { name: 'FAQ', href: '#faq' },
    ];

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-dark-base/90 backdrop-blur-md py-4 shadow-lg' : 'bg-transparent py-6'
                    }`}
            >
                <div className="container mx-auto px-4 flex justify-between items-center">
                    <div className="flex items-center">
                        <img src="/logo.png" alt="Bhiyaji Banaras Wala" className="h-16 md:h-20 w-auto object-contain" />
                    </div>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex gap-8">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="text-white/80 hover:text-neon-pink transition-colors font-medium text-sm uppercase tracking-wider"
                            >
                                {link.name}
                            </a>
                        ))}
                        <button className="bg-electric-yellow text-black px-5 py-2 rounded-full font-bold text-sm hover:bg-yellow-400 transition-colors">
                            Book Now
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-white"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        transition={{ type: 'tween' }}
                        className="fixed inset-0 z-40 bg-dark-base flex flex-col items-center justify-center md:hidden"
                    >
                        <div className="flex flex-col gap-8 text-center">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="text-2xl text-white font-bold uppercase tracking-wider hover:text-neon-pink transition-colors"
                                >
                                    {link.name}
                                </a>
                            ))}
                            <button className="bg-electric-yellow text-black px-8 py-3 rounded-full font-bold text-lg mt-4">
                                Book Now
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
