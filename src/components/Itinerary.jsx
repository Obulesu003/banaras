import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, MapPin, Clock, Utensils } from 'lucide-react';

const itineraryData = [
    {
        day: 0,
        title: 'Bangalore — Starting Point',
        location: 'Bangalore',
        details: [
            { time: 'Evening', activity: 'Meet at designated pickup point.' },
            { time: 'Night', activity: 'Briefing & Ice-breaking session on the bus.' },
            { time: 'Overnight', activity: 'Journey towards Prayagraj.' }
        ]
    },
    {
        day: 1,
        title: 'Prayagraj — Sangam Stop',
        location: 'Prayagraj -> Banaras',
        details: [
            { time: 'Morning', activity: 'Reach Prayagraj. Freshen up & Breakfast.' },
            { time: 'Late Morning', activity: 'Visit Triveni Sangam & Bade Hanuman Ji.' },
            { time: 'Afternoon', activity: 'Depart for Banaras.' },
            { time: 'Evening', activity: 'Check-in at Banaras. Holika Dahan at Ghats.' }
        ]
    },
    {
        day: 2,
        title: 'Banaras — Holika Dahan Night',
        location: 'Banaras Ghats',
        highlight: true,
        details: [
            { time: 'Evening', activity: 'Holika Dahan rituals at the ghats.' },
            { time: 'Night', activity: 'Experience the pre-Holi energy in the streets.' }
        ]
    },
    {
        day: 3,
        title: 'Banaras — Main Holi Day',
        location: 'Banaras Streets',
        highlight: true,
        details: [
            { time: 'Morning', activity: 'Holi madness begins at Assi Ghat.' },
            { time: 'Noon', activity: 'Move through the lanes (Gallis) towards Godowlia.' },
            { time: 'Afternoon', activity: 'Lunch & much-needed rest.' },
            { time: 'Evening', activity: 'Free time to explore or recover.' }
        ]
    },
    {
        day: 4,
        title: 'Banaras — Ganga Aarti / Recovery',
        location: 'Banaras',
        details: [
            { time: 'Morning', activity: 'Lazy breakfast & leisure time.' },
            { time: 'Afternoon', activity: 'Local food walk (Kachori/Chaat).' },
            { time: 'Evening', activity: 'Ganga Aarti by boat.' }
        ]
    },
    {
        day: 5,
        title: 'Banaras — Sarnath & BHU',
        location: 'Sarnath -> BHU',
        details: [
            { time: 'Morning', activity: 'Visit Sarnath (Buddha Stupa).' },
            { time: 'Afternoon', activity: 'Explore BHU Campus & Vishwanath Temple.' },
            { time: 'Evening', activity: 'Shopping at Godowlia Market.' }
        ]
    },
    {
        day: 6,
        title: 'Naugarh — Waterfalls + Jungle',
        location: 'Naugarh',
        details: [
            { time: 'Morning', activity: 'Depart for Naugarh.' },
            { time: 'Afternoon', activity: 'Visit Waterfalls & Dam.' },
            { time: 'Night', activity: 'Campfire, Music & Dinner at Resort.' }
        ]
    },
    {
        day: 7,
        title: 'Ayodhya — Final Stop',
        location: 'Ayodhya',
        details: [
            { time: 'Morning', activity: 'Early drive to Ayodhya.' },
            { time: 'Afternoon', activity: 'Ram Mandir Darshan.' },
            { time: 'Evening', activity: 'Begin return journey to Bangalore.' }
        ]
    },
    {
        day: 8,
        title: 'Back to Bangalore',
        location: 'Bangalore',
        details: [
            { time: 'Evening', activity: 'Reach Bangalore. Trip ends with memories.' }
        ]
    }
];

const Itinerary = () => {
    const [openDay, setOpenDay] = useState(null);

    const toggleDay = (index) => {
        setOpenDay(openDay === index ? null : index);
    };

    return (
        <section id="itinerary" className="py-20 bg-dark-base relative">
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-6xl font-bold uppercase text-white mb-4">
                        Day-by-Day <span className="text-neon-pink">Plan</span>
                    </h2>
                    <p className="text-gray-400">Subject to chaos, traffic, and vibe checks.</p>
                </div>

                <div className="space-y-4">
                    {itineraryData.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05 }}
                            className={`border rounded-xl overflow-hidden transition-all duration-300 ${item.highlight
                                    ? 'border-neon-pink bg-neon-pink/5'
                                    : 'border-white/10 bg-white/5'
                                }`}
                        >
                            <button
                                onClick={() => toggleDay(index)}
                                className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors"
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl ${item.highlight ? 'bg-neon-pink text-white' : 'bg-white/10 text-white'
                                        }`}>
                                        {item.day}
                                    </div>
                                    <div>
                                        <h3 className={`text-xl font-bold uppercase ${item.highlight ? 'text-neon-pink' : 'text-white'}`}>
                                            {item.title}
                                        </h3>
                                        <div className="flex items-center gap-2 text-sm text-gray-400 mt-1">
                                            <MapPin className="w-4 h-4" />
                                            {item.location}
                                        </div>
                                    </div>
                                </div>
                                <ChevronDown
                                    className={`w-6 h-6 text-white transition-transform duration-300 ${openDay === index ? 'rotate-180' : ''
                                        }`}
                                />
                            </button>

                            <AnimatePresence>
                                {openDay === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <div className="p-6 pt-0 border-t border-white/10">
                                            <div className="space-y-4 mt-4">
                                                {item.details.map((detail, i) => (
                                                    <div key={i} className="flex gap-4">
                                                        <div className="w-24 flex-shrink-0 text-electric-yellow font-medium text-sm">
                                                            {detail.time}
                                                        </div>
                                                        <div className="text-gray-300 text-sm">
                                                            {detail.activity}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Itinerary;
