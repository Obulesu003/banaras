import { useRef, useState, useMemo, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars, Cloud, Sparkles, RoundedBox, Environment as DreiEnvironment, Html, useProgress } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';

// --- DATA ---
const stops = [
    {
        id: 1,
        title: "BANGALORE — STARTING POINT",
        vibe: "Pack chaos, leave logic.",
        story: "Everyone meets up with that mix of excitement + nervousness. New faces, backpacks, memes, banter — and the realisation that the next few days are not normal life.",
        see: "Bags, people laughing, playlists being argued over.",
        feel: "Freedom dripping in adrenaline.",
        closer: "The road is calling. Buckle in.",
        color: "#FF007F",
        images: ["/media/bangalore-1.jpg"]
    },
    {
        id: 2,
        title: "PRAYAGRAJ — SANGAM STOP",
        vibe: "First pause. First breath.",
        story: "Quick breakfast, morning chill vibes, and a stop at the Triveni Sangam — where three rivers meet. It’s calm but exciting because this is the moment the trip actually begins.",
        see: "Boats, river mist, chai stalls, and a city waking up.",
        feel: "A reset — the switch from ‘normal life’ → ‘road trip mode’.",
        closer: "Warm-up complete. Stage two loading.",
        color: "#FEE440",
        images: ["/media/prayagraj-1.jpg"]
    },
    {
        id: 3,
        title: "BANARAS — HOLIKA DAHAN NIGHT",
        vibe: "The night is alive.",
        story: "As you reach Banaras, freshen up and step into something unreal — glowing fire, drums, chants, sparks in the air, and hundreds of people celebrating Holika Dahan.",
        see: "Fire blazing, smiles glowing, traditions mixing with madness.",
        feel: "The moment you realise: “Tomorrow won’t be normal.”",
        closer: "This is the ignition point.",
        color: "#FF4500",
        images: ["/media/holika-1.jpg"]
    },
    {
        id: 4,
        title: "BANARAS — MAIN HOLI DAY",
        vibe: "This day hits like a festival and a battlefield at the same time.",
        story: "Music. Color. Water. Powder. Gangs of strangers becoming friends. You don’t watch Holi here — Banaras Holi happens TO YOU.",
        see: "Packed lanes, colored faces, drums, dancing, laughter, madness.",
        feel: "Overwhelmed → then free → then addicted.",
        closer: "If you survive this day, welcome to the club.",
        color: "#2ECC71",
        images: ["/media/holi-1.jpg"]
    },
    {
        id: 5,
        title: "BANARAS — GANGA AARTI / RECOVERY",
        vibe: "Peace hits harder after chaos.",
        story: "Today is slow — tea, small walks, soft conversations, and later, the famous Ganga Aarti. You watch lights floating on water and suddenly, everything feels balanced.",
        see: "Boats, lamps, river reflections, echoing chants.",
        feel: "A calm you didn’t know you needed.",
        closer: "Even chaos respects balance.",
        color: "#3F1DFF",
        images: ["/media/aarti-1.jpg"]
    },
    {
        id: 6,
        title: "BANARAS — SARNATH & BHU",
        vibe: "A breather before the next memory.",
        story: "A chill day exploring Sarnath and the incredible BHU campus. A slower tempo, clean spaces, good food, and time to talk.",
        see: "Architecture, open grounds, greenery.",
        feel: "Like you’re on the backend of a story — but still curious for what’s next.",
        closer: "Mind resets. Energy reloads.",
        color: "#9B59B6",
        images: ["/media/sarnath-1.jpg"]
    },
    {
        id: 7,
        title: "NAUGARH — WATERFALLS + JUNGLE",
        vibe: "From chaos to wilderness.",
        story: "Mountains, fresh air, waterfalls, a camp vibe — and later? Music, bonfire, and a proper chill night under stars with the group you now trust.",
        see: "Waterfalls, forest, campfire glow.",
        feel: "Connection — with nature and with people.",
        closer: "A different kind of high.",
        color: "#00CED1",
        images: ["/media/naugarh-1.jpg"]
    },
    {
        id: 8,
        title: "AYODHYA — FINAL STOP",
        vibe: "A pause before goodbye.",
        story: "A short stop in Ayodhya — more emotional than energetic. A meaningful breather before heading back.",
        see: "Crowds, architecture, a new city energy.",
        feel: "Closure.",
        closer: "One chapter ends. A thousand stories begin.",
        color: "#F1C40F",
        images: ["/media/ayodhya-1.jpg"]
    },
    {
        id: 9,
        title: "BACK TO BANGALORE",
        vibe: "The mind stays, the body returns.",
        story: "Tired, messy, happy — scrolling through photos, laughing at moments, already missing the chaos.",
        see: "Screens glowing with shared memories.",
        feel: "A weird mix of nostalgia and pride.",
        closer: "Banaras leaves a mark that doesn’t wash off.",
        color: "#FFFFFF",
        images: ["/media/return-1.jpg"]
    }
];

// --- 3D COMPONENTS ---

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

const VolvoBus = ({ busRef, isStoppedRef }) => {
    const wheelRef1 = useRef();
    const wheelRef2 = useRef();
    const wheelRef3 = useRef();
    const wheelRef4 = useRef();

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        const isStopped = isStoppedRef.current;

        // Idle vibration or driving bounce
        if (busRef.current) {
            if (isStopped) {
                busRef.current.position.y = 0.6 + Math.sin(t * 30) * 0.002;
            } else {
                busRef.current.position.y = 0.6 + Math.sin(t * 15) * 0.01;
            }
        }

        // Wheel rotation
        const wheelSpeed = isStopped ? 0 : 15;
        if (wheelRef1.current) wheelRef1.current.rotation.x -= wheelSpeed * 0.02;
        if (wheelRef2.current) wheelRef2.current.rotation.x -= wheelSpeed * 0.02;
        if (wheelRef3.current) wheelRef3.current.rotation.x -= wheelSpeed * 0.02;
        if (wheelRef4.current) wheelRef4.current.rotation.x -= wheelSpeed * 0.02;
    });

    // Metallic Silver/Grey Paint - Memoized
    const busMaterial = useMemo(() => new THREE.MeshStandardMaterial({
        color: "#888888",
        roughness: 0.2,
        metalness: 0.8,
        envMapIntensity: 1.5,
    }), []);

    const glassMaterial = useMemo(() => new THREE.MeshPhysicalMaterial({
        color: "#111",
        roughness: 0,
        metalness: 0.9,
        transmission: 0.2,
        thickness: 0.5,
        envMapIntensity: 2,
    }), []);

    const detailMaterial = useMemo(() => new THREE.MeshStandardMaterial({ color: "#666", roughness: 0.5, metalness: 0.5 }), []);
    const lightMaterial = useMemo(() => new THREE.MeshStandardMaterial({ color: "#fff", emissive: "#fff", emissiveIntensity: 10, toneMapped: false }), []);
    const tailLightMaterial = useMemo(() => new THREE.MeshStandardMaterial({ color: "#ff0000", emissive: "#ff0000", emissiveIntensity: 5, toneMapped: false }), []);
    const tireMaterial = useMemo(() => new THREE.MeshStandardMaterial({ color: "#111", roughness: 0.8 }), []);
    const rimMaterial = useMemo(() => new THREE.MeshStandardMaterial({ color: "#ccc", metalness: 0.9, roughness: 0.2 }), []);

    return (
        <group ref={busRef} position={[0, 0.6, 0]}>
            {/* --- AERODYNAMIC BODY --- */}
            <RoundedBox args={[3.2, 3.6, 12]} radius={0.4} smoothness={8} position={[0, 2.4, 0]}>
                <primitive object={busMaterial} attach="material" />
            </RoundedBox>

            <group position={[0, 2.2, 6.2]} rotation={[Math.PI / 12, 0, 0]}>
                <RoundedBox args={[3.1, 2.5, 1]} radius={0.2} smoothness={4}>
                    <primitive object={busMaterial} attach="material" />
                </RoundedBox>
            </group>

            {/* --- GLASS PANELS --- */}
            <mesh position={[0, 2.5, 6.55]} rotation={[Math.PI / 12, 0, 0]}>
                <planeGeometry args={[2.9, 2.2]} />
                <primitive object={glassMaterial} attach="material" />
            </mesh>

            <mesh position={[1.62, 2.8, 0]} rotation={[0, Math.PI / 2, 0]}>
                <planeGeometry args={[11, 1.8]} />
                <primitive object={glassMaterial} attach="material" />
            </mesh>
            <mesh position={[-1.62, 2.8, 0]} rotation={[0, -Math.PI / 2, 0]}>
                <planeGeometry args={[11, 1.8]} />
                <primitive object={glassMaterial} attach="material" />
            </mesh>

            {/* --- DETAILS --- */}
            <RoundedBox args={[2.8, 0.4, 5]} radius={0.2} smoothness={4} position={[0, 4.3, -1]}>
                <primitive object={detailMaterial} attach="material" />
            </RoundedBox>

            <group position={[0, 1.0, 6.4]} rotation={[Math.PI / 12, 0, 0]}>
                <mesh position={[-1.2, 0, 0]}>
                    <boxGeometry args={[0.6, 0.1, 0.1]} />
                    <primitive object={lightMaterial} attach="material" />
                </mesh>
                <mesh position={[1.2, 0, 0]}>
                    <boxGeometry args={[0.6, 0.1, 0.1]} />
                    <primitive object={lightMaterial} attach="material" />
                </mesh>
            </group>

            <group position={[0, 1.5, -6.05]}>
                <mesh position={[-1.2, 0, 0]}>
                    <boxGeometry args={[0.5, 0.8, 0.1]} />
                    <primitive object={tailLightMaterial} attach="material" />
                </mesh>
                <mesh position={[1.2, 0, 0]}>
                    <boxGeometry args={[0.5, 0.8, 0.1]} />
                    <primitive object={tailLightMaterial} attach="material" />
                </mesh>
            </group>

            {/* --- WHEELS --- */}
            <group position={[0, 0.5, 0]}>
                {[
                    [-1.5, 3.5], [1.5, 3.5], [-1.5, -3.5], [1.5, -3.5]
                ].map((pos, i) => (
                    <group key={i} ref={[wheelRef1, wheelRef2, wheelRef3, wheelRef4][i]} position={[pos[0], 0, pos[1]]}>
                        <mesh rotation={[0, 0, Math.PI / 2]}>
                            <cylinderGeometry args={[0.65, 0.65, 0.45, 32]} />
                            <primitive object={tireMaterial} attach="material" />
                        </mesh>
                        <mesh rotation={[0, 0, Math.PI / 2]} position={[0, pos[0] > 0 ? -0.23 : 0.23, 0]}>
                            <cylinderGeometry args={[0.4, 0.4, 0.05, 16]} />
                            <primitive object={rimMaterial} attach="material" />
                        </mesh>
                    </group>
                ))}
            </group>
        </group>
    );
};

const AsphaltRoad = () => {
    const meshRef = useRef();
    const count = 300;
    const dummy = useMemo(() => new THREE.Object3D(), []);

    useFrame(() => {
        if (meshRef.current) {
            for (let i = 0; i < count; i++) {
                dummy.position.set(0, 0.02, -i * 10 + 20);
                dummy.rotation.set(-Math.PI / 2, 0, 0);
                dummy.updateMatrix();
                meshRef.current.setMatrixAt(i, dummy.matrix);
            }
            meshRef.current.instanceMatrix.needsUpdate = true;
        }
    });

    return (
        <group>
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, -1000]}>
                <planeGeometry args={[25, 3000]} />
                <meshStandardMaterial
                    color="#1a1a1a"
                    roughness={0.9}
                    metalness={0.1}
                />
            </mesh>

            <Sparkles
                count={2000} // Reduced from 5000 for performance
                scale={[25, 1, 3000]}
                position={[0, 0.01, -1000]}
                size={1}
                speed={0}
                opacity={0.1}
                color="#444"
                noise={10}
            />

            {/* Center Lines - Instanced */}
            <instancedMesh ref={meshRef} args={[null, null, count]}>
                <planeGeometry args={[0.3, 3]} />
                <meshStandardMaterial color="#EEE" roughness={0.8} opacity={0.8} transparent />
            </instancedMesh>

            {/* Side Lines */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-10, 0.02, -1000]}>
                <planeGeometry args={[0.3, 3000]} />
                <meshStandardMaterial color="#FFF" roughness={0.8} opacity={0.9} transparent />
            </mesh>
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[10, 0.02, -1000]}>
                <planeGeometry args={[0.3, 3000]} />
                <meshStandardMaterial color="#FFF" roughness={0.8} opacity={0.9} transparent />
            </mesh>
        </group>
    );
};

const StreetLights = () => {
    const poleRef = useRef();
    const lightRef = useRef();
    const count = 100;
    const dummy = useMemo(() => new THREE.Object3D(), []);

    useFrame(() => {
        if (poleRef.current && lightRef.current) {
            for (let i = 0; i < count; i++) {
                const x = i % 2 === 0 ? -18 : 18;
                const z = -i * 25;

                // Pole
                dummy.position.set(x, 6, z); // Centered at height 6 (12 tall)
                dummy.rotation.set(0, 0, 0);
                dummy.scale.set(1, 1, 1);
                dummy.updateMatrix();
                poleRef.current.setMatrixAt(i, dummy.matrix);

                // Light Bulb
                dummy.position.set(x, 12, z); // Top of pole
                dummy.scale.set(1, 1, 1);
                dummy.updateMatrix();
                lightRef.current.setMatrixAt(i, dummy.matrix);
            }
            poleRef.current.instanceMatrix.needsUpdate = true;
            lightRef.current.instanceMatrix.needsUpdate = true;
        }
    });

    return (
        <group>
            <instancedMesh ref={poleRef} args={[null, null, count]}>
                <cylinderGeometry args={[0.2, 0.2, 12]} />
                <meshStandardMaterial color="#111" />
            </instancedMesh>
            <instancedMesh ref={lightRef} args={[null, null, count]}>
                <sphereGeometry args={[0.5]} />
                <meshBasicMaterial color="#ffaa00" toneMapped={false} />
            </instancedMesh>
        </group>
    );
};

const Scene = ({ scrollProgress, setOverlayState }) => {
    const busRef = useRef();
    const isStoppedRef = useRef(true);

    // Refs to track previous state to avoid redundant React updates
    const prevStopIndex = useRef(-1);
    const prevIsStopped = useRef(true);

    // Smooth scroll tracker
    const smoothedProgress = useRef(0);

    useFrame((state) => {
        // Smoothly interpolate progress
        smoothedProgress.current = THREE.MathUtils.lerp(smoothedProgress.current, scrollProgress.current, 0.1);

        const totalStops = stops.length;
        // Calculate scroll progress
        const globalProgress = smoothedProgress.current * totalStops;
        const currentStopIndex = Math.floor(globalProgress);
        const localProgress = globalProgress % 1;

        let zPos = 0;
        let isStopped = false;
        const STOP_DISTANCE = 200;

        // Logic: 
        // 0.0 - 0.2: Travel
        // 0.2 - 1.0: Stop

        if (localProgress < 0.2) {
            // TRAVEL
            if (currentStopIndex === 0) {
                zPos = 0;
                isStopped = true; // Start of journey, parked
            } else {
                const travelProgress = localProgress / 0.2;
                const startZ = -(currentStopIndex - 1) * STOP_DISTANCE;
                const endZ = -currentStopIndex * STOP_DISTANCE;
                zPos = THREE.MathUtils.lerp(startZ, endZ, travelProgress);
                isStopped = false;
            }
        } else {
            // STOP
            zPos = -currentStopIndex * STOP_DISTANCE;
            isStopped = true;
        }

        // Update Refs
        isStoppedRef.current = isStopped;
        if (busRef.current) {
            busRef.current.position.z = zPos;
        }

        // Camera Logic
        const targetPos = new THREE.Vector3();
        const targetLookAt = new THREE.Vector3();

        if (isStopped) {
            // Parked View
            targetPos.set(12, 6, zPos + 15);
            targetLookAt.set(0, 2, zPos);
        } else {
            // Driving View
            targetPos.set(0, 8, zPos + 35);
            targetLookAt.set(0, 2, zPos - 10);
        }

        state.camera.position.lerp(targetPos, 0.05);
        const currentLookAt = new THREE.Vector3(0, 0, zPos - 10);
        state.camera.lookAt(currentLookAt.lerp(targetLookAt, 0.05));

        // Update React State ONLY if changed
        const safeStopIndex = Math.min(currentStopIndex, totalStops - 1);

        if (safeStopIndex !== prevStopIndex.current || isStopped !== prevIsStopped.current) {
            setOverlayState({
                currentStopIndex: safeStopIndex,
                isStopped
            });
            prevStopIndex.current = safeStopIndex;
            prevIsStopped.current = isStopped;
        }
    });

    return (
        <>
            <DreiEnvironment preset="night" />
            <ambientLight intensity={0.1} color="#b0c4de" />
            <directionalLight position={[-20, 20, 10]} intensity={0.5} color="#b0c4de" castShadow />

            <StreetLights />

            <Stars radius={200} depth={50} count={3000} factor={4} saturation={0} fade speed={0.5} />
            <fog attach="fog" args={['#050816', 20, 200]} />

            <VolvoBus busRef={busRef} isStoppedRef={isStoppedRef} />
            <AsphaltRoad />

            {/* Milestones */}
            {stops.map((stop, i) => (
                <group key={i} position={[i % 2 === 0 ? -14 : 14, 0, -(i * 200)]}>
                    <mesh position={[0, 3, 0]}>
                        <boxGeometry args={[0.2, 6, 0.2]} />
                        <meshStandardMaterial color="#555" />
                    </mesh>
                    <mesh position={[0, 5, 0]}>
                        <boxGeometry args={[4, 1.5, 0.1]} />
                        <meshStandardMaterial color="#fff" />
                    </mesh>
                    <mesh position={[0, 5, 0.06]}>
                        <planeGeometry args={[3.8, 1.3]} />
                        <meshBasicMaterial color={stop.color} />
                    </mesh>
                </group>
            ))}
        </>
    );
};

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
