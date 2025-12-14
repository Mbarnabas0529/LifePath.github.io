import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Briefcase, DollarSign, Heart, MoreHorizontal, Plus, X, Settings } from 'lucide-react';

const StatBar = ({ label, value, color, emoji }) => (
    <div className="flex items-center gap-3 mb-3">
        <div className="flex items-center gap-2 w-32">
            <span className="text-xl">{emoji}</span>
            <span className="text-sm font-semibold text-gray-700">{label}</span>
        </div>
        <div className="flex-1 bg-gray-200 rounded-full h-6 relative overflow-hidden">
            <div
                className={`h-full ${color} transition-all duration-300`}
                style={{ width: `${value}%` }}
            />
            <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-700">
                {value}%
            </span>
        </div>
    </div>
);

const LifePath = () => {
    const [gameState, setGameState] = useState('menu');
    const [character, setCharacter] = useState(null);
    const [age, setAge] = useState(0);
    const [health, setHealth] = useState(100);
    const [happiness, setHappiness] = useState(100);
    const [smarts, setSmarts] = useState(50);
    const [looks, setLooks] = useState(50);
    const [money, setMoney] = useState(0);
    const [job, setJob] = useState(null);
    const [jobTitle, setJobTitle] = useState('');
    const [education, setEducation] = useState('');
    const [specialization, setSpecialization] = useState('');
    const [relationship, setRelationship] = useState(null);
    const [events, setEvents] = useState([]);
    const [pet, setPet] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const [popupData, setPopupData] = useState(null);
    const [showActivities, setShowActivities] = useState(false);
    const [showJobTab, setShowJobTab] = useState(false);
    const [showWealthTab, setShowWealthTab] = useState(false);
    const [showRelationTab, setShowRelationTab] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [soundEnabled, setSoundEnabled] = useState(true);
    const [betAmount, setBetAmount] = useState('');
    const [universityYear, setUniversityYear] = useState(0);
    const [blackjackState, setBlackjackState] = useState(null);
    const [hasLicense, setHasLicense] = useState(false);
    const [vehicle, setVehicle] = useState(null);
    const [house, setHouse] = useState(null);
    const [hasHadChickenpox, setHasHadChickenpox] = useState(false);
    const [diseases, setDiseases] = useState([]);
    const [promotionRequests, setPromotionRequests] = useState([]);
    const [jobApplicationHistory, setJobApplicationHistory] = useState({});
    const [careerHistory, setCareerHistory] = useState({});

    const eventsRef = useRef(null);

    const countries = [
        { name: 'Magyarország', flag: '🇭🇺' },
        { name: 'USA', flag: '🇺🇸' },
        { name: 'Anglia', flag: '🇬🇧' },
        { name: 'Franciaország', flag: '🇫🇷' },
        { name: 'Németország', flag: '🇩🇪' },
        { name: 'Japán', flag: '🇯🇵' },
        { name: 'Olaszország', flag: '🇮🇹' },
        { name: 'Spanyolország', flag: '🇪🇸' },
        { name: 'Kanada', flag: '🇨🇦' },
        { name: 'Ausztrália', flag: '🇦🇺' },
        { name: 'Brazília', flag: '🇧🇷' },
        { name: 'Kína', flag: '🇨🇳' }
    ];

    const countryNames = {
        'Magyarország': {
            male: ['Péter', 'János', 'László', 'András', 'Gábor', 'Máté', 'Dávid', 'Balázs', 'Tamás', 'Zoltán', 'Bence', 'Marcell'],
            female: ['Anna', 'Katalin', 'Eszter', 'Mónika', 'Zsófia', 'Emma', 'Laura', 'Viktória', 'Réka', 'Dóra', 'Lilla', 'Hanna'],
            last: ['Nagy', 'Kovács', 'Tóth', 'Szabó', 'Horváth', 'Varga', 'Kiss', 'Molnár', 'Németh', 'Farkas', 'Balogh', 'Papp']
        },
        'USA': {
            male: ['James', 'John', 'Robert', 'Michael', 'William', 'David', 'Richard', 'Joseph', 'Thomas', 'Charles', 'Christopher', 'Daniel'],
            female: ['Mary', 'Patricia', 'Jennifer', 'Linda', 'Elizabeth', 'Barbara', 'Susan', 'Jessica', 'Sarah', 'Karen', 'Nancy', 'Lisa'],
            last: ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez']
        },
        'Anglia': {
            male: ['Oliver', 'George', 'Harry', 'Noah', 'Jack', 'Leo', 'Arthur', 'Muhammad', 'Oscar', 'Charlie', 'Thomas', 'William'],
            female: ['Olivia', 'Amelia', 'Isla', 'Ava', 'Mia', 'Isabella', 'Sophia', 'Grace', 'Lily', 'Freya', 'Emily', 'Sophie'],
            last: ['Smith', 'Jones', 'Taylor', 'Brown', 'Williams', 'Wilson', 'Johnson', 'Davies', 'Robinson', 'Wright', 'Thompson', 'Evans']
        },
        'Franciaország': {
            male: ['Gabriel', 'Léo', 'Raphaël', 'Arthur', 'Louis', 'Lucas', 'Adam', 'Jules', 'Hugo', 'Maël', 'Liam', 'Noah'],
            female: ['Jade', 'Louise', 'Emma', 'Ambre', 'Alice', 'Alba', 'Rose', 'Anna', 'Romy', 'Mia', 'Léna', 'Lou'],
            last: ['Martin', 'Bernard', 'Thomas', 'Petit', 'Robert', 'Richard', 'Durand', 'Dubois', 'Moreau', 'Laurent', 'Simon', 'Michel']
        },
        'Németország': {
            male: ['Noah', 'Matteo', 'Paul', 'Finn', 'Leon', 'Elias', 'Emil', 'Felix', 'Louis', 'Henri', 'Ben', 'Luca'],
            female: ['Emilia', 'Mia', 'Hannah', 'Sophia', 'Emma', 'Lina', 'Mila', 'Ella', 'Klara', 'Lea', 'Marie', 'Lena'],
            last: ['Müller', 'Schmidt', 'Schneider', 'Fischer', 'Weber', 'Meyer', 'Wagner', 'Becker', 'Schulz', 'Hoffmann', 'Schäfer', 'Koch']
        },
        'Japán': {
            male: ['Haruto', 'Riku', 'Haru', 'Hinata', 'Kaito', 'Asahi', 'Sora', 'Reo', 'Yuuto', 'Touma', 'Minato', 'Ren'],
            female: ['Himari', 'Hina', 'Yui', 'Riko', 'Sakura', 'Mio', 'Mei', 'Aoi', 'Rin', 'Koharu', 'Ema', 'Tsumugi'],
            last: ['Sato', 'Suzuki', 'Takahashi', 'Tanaka', 'Watanabe', 'Ito', 'Yamamoto', 'Nakamura', 'Kobayashi', 'Kato', 'Yoshida', 'Yamada']
        },
        'Olaszország': {
            male: ['Leonardo', 'Francesco', 'Alessandro', 'Lorenzo', 'Mattia', 'Tommaso', 'Gabriele', 'Andrea', 'Riccardo', 'Edoardo', 'Matteo', 'Diego'],
            female: ['Sofia', 'Giulia', 'Aurora', 'Alice', 'Ginevra', 'Emma', 'Giorgia', 'Greta', 'Beatrice', 'Anna', 'Vittoria', 'Chiara'],
            last: ['Rossi', 'Russo', 'Ferrari', 'Esposito', 'Bianchi', 'Romano', 'Colombo', 'Ricci', 'Marino', 'Greco', 'Bruno', 'Gallo']
        },
        'Spanyolország': {
            male: ['Hugo', 'Mateo', 'Martín', 'Lucas', 'Leo', 'Daniel', 'Alejandro', 'Manuel', 'Pablo', 'Álvaro', 'Adrián', 'Enzo'],
            female: ['Lucía', 'Sofía', 'Martina', 'María', 'Julia', 'Paula', 'Valeria', 'Emma', 'Daniela', 'Carla', 'Alma', 'Sara'],
            last: ['García', 'Rodríguez', 'González', 'Fernández', 'López', 'Martínez', 'Sánchez', 'Pérez', 'Gómez', 'Martin', 'Jiménez', 'Ruiz']
        },
        'Kanada': {
             male: ['Liam', 'Noah', 'Jackson', 'Lucas', 'Logan', 'Benjamin', 'William', 'Oliver', 'James', 'Jacob', 'Ethan', 'Mason'],
             female: ['Olivia', 'Emma', 'Charlotte', 'Ava', 'Sophia', 'Mia', 'Amelia', 'Harper', 'Evelyn', 'Abigail', 'Emily', 'Elizabeth'],
             last: ['Smith', 'Brown', 'Tremblay', 'Martin', 'Roy', 'Wilson', 'MacDonald', 'Gagnon', 'Johnson', 'Taylor', 'Campbell', 'Anderson']
        },
        'Ausztrália': {
             male: ['Oliver', 'Noah', 'Jack', 'William', 'Leo', 'Lucas', 'Thomas', 'Henry', 'Charlie', 'James', 'Ethan', 'Harrison'],
             female: ['Charlotte', 'Olivia', 'Amelia', 'Isla', 'Mia', 'Ava', 'Grace', 'Willow', 'Harper', 'Chloe', 'Ella', 'Matilda'],
             last: ['Smith', 'Jones', 'Williams', 'Brown', 'Wilson', 'Taylor', 'Johnson', 'White', 'Martin', 'Anderson', 'Thompson', 'Nguyen']
        },
        'Brazília': {
            male: ['Miguel', 'Arthur', 'Heitor', 'Bernardo', 'Davi', 'Théo', 'Lorenzo', 'Gabriel', 'Pedro', 'Benjamin', 'Matheus', 'Lucas'],
            female: ['Alice', 'Sophia', 'Helena', 'Valentina', 'Laura', 'Isabella', 'Manuela', 'Júlia', 'Heloísa', 'Luíza', 'Maria', 'Lorena'],
            last: ['Silva', 'Santos', 'Oliveira', 'Souza', 'Rodrigues', 'Ferreira', 'Alves', 'Pereira', 'Lima', 'Gomes', 'Costa', 'Ribeiro']
        },
        'Kína': {
            male: ['Wei', 'Jie', 'Hao', 'Yi', 'Jun', 'Feng', 'Lei', 'Ming', 'Yang', 'Bo', 'Hua', 'Qiang'],
            female: ['Fang', 'Jing', 'Li', 'Min', 'Wei', 'Yan', 'Xiuying', 'Lili', 'Juan', 'Lan', 'Ying', 'Na'],
            last: ['Li', 'Wang', 'Zhang', 'Liu', 'Chen', 'Yang', 'Zhao', 'Huang', 'Zhou', 'Wu', 'Xu', 'Sun']
        }
    };

    const specializations = {
        middle: [
            { name: 'Kereskedelmi', emoji: '🏪' },
            { name: 'Műszaki', emoji: '🔧' },
            { name: 'Humán', emoji: '📚' },
            { name: 'Művészeti', emoji: '🎨' },
            { name: 'Informatikai', emoji: '💻' }
        ],
        university: [
            { name: 'Tanár', emoji: '👨‍🏫', salary: 55000, requiredSmarts: 60 },
            { name: 'Programozó', emoji: '💻', salary: 85000, requiredSmarts: 70 },
            { name: 'Orvos', emoji: '⚕️', salary: 120000, requiredSmarts: 85 },
            { name: 'Ügyvéd', emoji: '⚖️', salary: 110000, requiredSmarts: 80 },
            { name: 'Mérnök', emoji: '🏗️', salary: 95000, requiredSmarts: 75 },
            { name: 'Pszichológus', emoji: '🧠', salary: 65000, requiredSmarts: 65 },
            { name: 'Közgazdász', emoji: '📊', salary: 70000, requiredSmarts: 65 },
            { name: 'Biológus', emoji: '🔬', salary: 60000, requiredSmarts: 68 }
        ]
    };

    const animals = [
        { name: 'Kutya', emoji: '🐕', price: 5000, happiness: 20 },
        { name: 'Macska', emoji: '🐱', price: 3000, happiness: 15 },
        { name: 'Papagáj', emoji: '🦜', price: 8000, happiness: 18 },
        { name: 'Nyúl', emoji: '🐰', price: 2000, happiness: 12 },
        { name: 'Teknős', emoji: '🐢', price: 4000, happiness: 10 }
    ];

    const specialJobHierarchies = {
        'Maffiózó': ['Zsebtolvaj', 'Verőlegény', 'Maffiózó', 'Capo', 'Keresztapa'],
        'Űrhajós': ['Kadét', 'Mérnök', 'Űrhajós', 'Parancsnok', 'Űrállomás Igazgató'],
        'Kincsvadász': ['Amatőr Kereső', 'Régész', 'Kincsvadász', 'Expedíció Vezető', 'Legendás Felfedező'],
        'Titkosügynök': ['Informátor', 'Terepügynök', 'Titkosügynök', '007-es', 'Ügynökség Igazgató'],
        'Sztárszakács': ['Mosogató', 'Kukta', 'Szakács', 'Séf', 'Sztárszakács'],
        'Profi Sportoló': ['Labdaszedő', 'Cserejátékos', 'Kezdőjátékos', 'Csapatkapitány', 'Világsztár'],
        'Topmodell': ['Katalógus Modell', 'Kifutó Modell', 'Divatmodell', 'Szupermodell', 'Topmodell']
    };

    useEffect(() => {
        if (eventsRef.current && events.length > 0) {
            eventsRef.current.scrollTop = 0;
        }
    }, [events]);

    const createRandomCharacter = () => {
        const gender = Math.random() > 0.5 ? 'male' : 'female';
        const country = countries[Math.floor(Math.random() * countries.length)];
        const names = countryNames[country.name];
        
        const firstName = gender === 'male'
            ? names.male[Math.floor(Math.random() * names.male.length)]
            : names.female[Math.floor(Math.random() * names.female.length)];
        const lastName = names.last[Math.floor(Math.random() * names.last.length)];
        
        const attraction = gender === 'male' ? 'female' : 'male';

        return { firstName, lastName, gender, country, attraction };
    };

    const startGame = (char) => {
        setCharacter(char);
        setAge(0);
        setHealth(100);
        setHappiness(100);
        setSmarts(Math.floor(Math.random() * 30) + 40);
        setLooks(Math.floor(Math.random() * 30) + 40);
        setMoney(0);
        setJob(null);
        setJobTitle('');
        setEducation('');
        setSpecialization('');
        setUniversityYear(0);
        setRelationship(null);
        setHasLicense(false);
        setVehicle(null);
        setHouse(null);
        setHasHadChickenpox(false);
        setDiseases([]);
        setPromotionRequests([]);
        setJobApplicationHistory({});
        setCareerHistory({});
        setEvents([]);
        setPet(null);
        setGameState('game');
    };

    const addEvent = useCallback((event, eventAge) => {
        setEvents(prev => [{ age: eventAge !== undefined ? eventAge : age, text: event }, ...prev]);
    }, [age]);

    const showDecisionPopup = (title, description, options) => {
        setPopupData({ title, description, options });
        setShowPopup(true);
    };

    const handleDecision = (option) => {
        if (option.effect) {
            option.effect(popupData);
        }
        setShowPopup(false);
    };

    // ÁLTALÁNOS ISKOLA (7 éves)
    const startElementarySchool = () => {
        showDecisionPopup(
            '🎓 Általános Iskola',
            'Elkezdted az általános iskolát!',
            [
                {
                    text: '📚 Keményen tanulok',
                    effect: () => {
                        setEducation('Általános iskola');
                        setSmarts(prev => Math.min(100, prev + 15));
                        setHappiness(prev => Math.max(0, prev - 5));
                        addEvent('Bekerültél az általános iskolába. Keményen tanulsz!', age);
                    }
                },
                {
                    text: '😐 Normálisan tanulok',
                    effect: () => {
                        setEducation('Általános iskola');
                        setSmarts(prev => Math.min(100, prev + 8));
                        addEvent('Bekerültél az általános iskolába. Normálisan tanulsz.', age);
                    }
                },
                {
                    text: '🎮 Lógok az óráról',
                    effect: () => {
                        setEducation('Általános iskola');
                        setHappiness(prev => Math.min(100, prev + 10));
                        setSmarts(prev => Math.max(0, prev - 3));
                        addEvent('Bekerültél az általános iskolába. De lógsz az óráról...', age);
                    }
                }
            ]
        );
    };

    // KÖZÉPISKOLA VÁLASZTÁS (15 éves)
    const startMiddleSchool = () => {
        showDecisionPopup(
            '🎓 Középiskola',
            'Befejezted az általános iskolát! Most válassz szakterületet:',
            specializations.middle.map(spec => ({
                text: `${spec.emoji} ${spec.name}`,
                effect: () => {
                    setEducation('Középiskola');
                    setSpecialization(spec.name);
                    setSmarts(prev => Math.min(100, prev + 12));
                    addEvent(`Beiratkoztál a középiskolába! Szakterület: ${spec.name}`, age);
                }
            }))
        );
    };

    // JOGOSÍTVÁNY VIZSGA (16 éves)
    const offerLicenseTest = () => {
        showDecisionPopup(
            '🚗 Jogosítvány',
            'Betöltötted a 16. évedet! Szeretnéd megcsinálni a jogosítványt? (Ingyenes vizsga)',
            [
                {
                    text: 'Megpróbálom',
                    effect: () => {
                        if (Math.random() > 0.5) {
                            setHasLicense(true);
                            setHappiness(prev => Math.min(100, prev + 15));
                            addEvent('Sikeresen megszerezted a jogosítványt! (Autód még nincs)', 16);
                        } else {
                            setHappiness(prev => Math.max(0, prev - 10));
                            addEvent('Megbuktál a forgalmi vizsgán.', 16);
                        }
                    }
                },
                {
                    text: 'Nem érdekel',
                    effect: () => { addEvent('Nem próbáltad meg a jogosítványt.', 16); }
                }
            ]
        );
    };

    const takeDrivingTest = () => {
        setShowActivities(false);
        showDecisionPopup(
            '🚗 Jogosítvány Vizsga',
            'Szeretnéd megpróbálni a vizsgát? Ára: $250',
            [
                {
                    text: 'Vizsgázom ($250)',
                    effect: () => {
                        if (money >= 250) {
                            setMoney(prev => prev - 250);
                            if (Math.random() > 0.5) {
                                setHasLicense(true);
                                setHappiness(prev => Math.min(100, prev + 15));
                                addEvent('Sikeresen megszerezted a jogosítványt! (Autód még nincs) -$250');
                            } else {
                                setHappiness(prev => Math.max(0, prev - 10));
                                addEvent('Megbuktál a vizsgán. -$250');
                            }
                        } else {
                            addEvent('Nincs elég pénzed a vizsgára ($250)!');
                        }
                    }
                },
                { text: 'Mégsem', effect: () => { setShowActivities(false); } }
            ]
        );
    };

    // EGYETEMI VÁLASZTÁS (20 éves) - FIXED EVENT
    const chooseUniversityOrWork = () => {
        showDecisionPopup(
            '🎓 Tanulmányok vagy Munka?',
            'Befejezted a középiskolát! Mit szeretnél tenni?',
            [
                {
                    text: '🎓 Egyetemre akarok menni',
                    effect: () => {
                        setTimeout(() => {
                            showDecisionPopup(
                                '🎓 Egyetem - Szak választás',
                                'Melyik szakterületen szeretnél tanulni?\n(3 évig fog tartani, tandíj: $5,000)',
                                [
                                    ...specializations.university.map(spec => {
                                        const hasEnoughSmarts = smarts >= spec.requiredSmarts;
                                        const hasEnoughMoney = money >= 5000;
                                        const canApply = hasEnoughSmarts && hasEnoughMoney;
                                        let reason = '';
                                        if (!hasEnoughSmarts) reason += `${spec.requiredSmarts}% okosság kell.`;
                                        if (!hasEnoughMoney) reason += ` $5,000 kell.`;

                                        return {
                                            text: `${spec.emoji} ${spec.name}${!canApply ? ` - ${reason.trim()}` : ''}`,
                                            disabled: !canApply,
                                            effect: () => {
                                                setEducation('Egyetem');
                                                setSpecialization(spec.name);
                                                setUniversityYear(1);
                                                setSmarts(prev => Math.min(100, prev + 5));
                                                setMoney(prev => prev - 5000);
                                                addEvent(`Beiratkoztál az egyetemre! Szak: ${spec.name}. -$5,000`, age);
                                            }
                                        };
                                    }),
                                    {
                                        text: '🔙 Mégsem',
                                        effect: () => {} // Just close the popup
                                    }
                                ]
                            );
                        }, 100);
                    }
                },
                {
                    text: '💼 Dolgozni akarok',
                    effect: () => {
                        findJob();
                    }
                }
            ]
        );
    };

    const drawCard = () => {
        const card = Math.floor(Math.random() * 13) + 1;
        if (card > 10) return 10; // J, Q, K are 10
        return card; // Ace is 1 for now
    };

    const calculateHandValue = (hand) => {
        let total = hand.reduce((sum, card) => sum + card, 0);
        let aceCount = hand.filter(card => card === 1).length;
        while (total <= 11 && aceCount > 0) {
            total += 10;
            aceCount--;
        }
        return total;
    };

    const showBlackjackTurnPopup = (state) => {
        const playerTotal = calculateHandValue(state.playerHand);
        showDecisionPopup(
            `🃏 Blackjack - Tét: $${state.bet.toLocaleString()}`,
            `Látható lapjaid: ${state.playerHand.join(', ')} (Összeg: ${playerTotal})\nA dealer lapja: ${state.dealerHand[0]}`,
            [
                { text: 'Kérek', effect: blackjackHit },
                { text: 'Megállok', effect: blackjackStand },
            ]
        );
    };

    const endBlackjack = (finalState, result) => {
        setShowPopup(false);
        setBlackjackState(null);

        const playerTotal = calculateHandValue(finalState.playerHand);
        const dealerTotal = calculateHandValue(finalState.dealerHand);
        let message = `Te: ${playerTotal}, Dealer: ${dealerTotal}. `;

        switch (result) {
            case 'blackjack':
                setMoney(prev => prev + finalState.bet * 2.5); // Blackjack pays 3:2
                setHappiness(prev => Math.min(100, prev + 20));
                message += `🎉 Blackjack! Nyertél $${(finalState.bet * 1.5).toLocaleString()}-t!`;
                break;
            case 'win':
                setMoney(prev => prev + finalState.bet * 2);
                setHappiness(prev => Math.min(100, prev + 15));
                message += `✅ Nyertél! Nyereményed: $${finalState.bet.toLocaleString()}.`;
                break;
            case 'lose':
                // Money already taken at bet time
                setHappiness(prev => Math.max(0, prev - 10));
                message += `❌ Vesztettél. Elvesztetted a tétet: $${finalState.bet.toLocaleString()}.`;
                break;
            case 'push':
                setMoney(prev => prev + finalState.bet); // Return bet
                message += `😐 Döntetlen. Visszakapod a téted.`;
                break;
        }
        addEvent(message);
    };

    const blackjackStand = () => {
        setBlackjackState(prevState => {
            let dealerHand = [...prevState.dealerHand];
            let dealerTotal = calculateHandValue(dealerHand);
    
            while (dealerTotal < 17) {
                dealerHand.push(drawCard());
                dealerTotal = calculateHandValue(dealerHand);
            }
    
            const playerTotal = calculateHandValue(prevState.playerHand);
            const finalState = { ...prevState, dealerHand };

            if (dealerTotal > 21 || playerTotal > dealerTotal) {
                endBlackjack(finalState, 'win');
            } else if (dealerTotal > playerTotal) {
                endBlackjack(finalState, 'lose');
            } else {
                endBlackjack(finalState, 'push');
            }
            return null; // Game ends
        });
    };

    const blackjackHit = () => {
        setBlackjackState(prevState => {
            const newPlayerHand = [...prevState.playerHand, drawCard()];
            const playerTotal = calculateHandValue(newPlayerHand);
            const newState = { ...prevState, playerHand: newPlayerHand };

            if (playerTotal > 21) {
                endBlackjack(newState, 'lose');
                return null; // Game over
            } else {
                setTimeout(() => showBlackjackTurnPopup(newState), 100);
                return newState;
            }
        });
    };

    const startBlackjack = (amount) => {
        const bet = parseInt(amount);

        if (!bet || bet <= 0) {
            addEvent('Érvénytelen összeg!');
            setShowPopup(false);
            return;
        }
        if (bet > money) {
            addEvent(`Nincs elég pénzed! Te: $${money.toLocaleString()}, Feltét: $${bet.toLocaleString()}`);
            setShowPopup(false);
            return;
        }

        setShowPopup(false);
        setMoney(prev => prev - bet);

        const playerHand = [drawCard(), drawCard()];
        const dealerHand = [drawCard(), drawCard()];
        const playerTotal = calculateHandValue(playerHand);

        const gameState = { bet, playerHand, dealerHand };

        if (playerTotal === 21) {
            endBlackjack(gameState, 'blackjack');
        } else {
            setBlackjackState(gameState);
            setTimeout(() => showBlackjackTurnPopup(gameState), 100);
        }
    };

    const playBlackjack = () => {
        if (age < 18) {
            addEvent('18 évesnél fiatalabb vagy a szerencsejátékhoz!');
            setShowActivities(false);
            return;
        }

        showDecisionPopup(
            '🃏 Blackjack',
            'Mennyi pénzt szeretnél feltétel?',
            [
                {
                    text: 'Saját összeg',
                    effect: () => {
                        setShowPopup(false);
                        setTimeout(() => {
                            setPopupData({
                                title: '🃏 Blackjack Fogadás',
                                description: 'Add meg az összeget!',
                                customInput: true,
                                inputValue: '',
                                options: [
                                    { 
                                        text: '✅ Játszom', 
                                        effect: (data) => {
                                            const currentBet = data.inputValue;
                                            if (currentBet && parseInt(currentBet) > 0) {
                                                startBlackjack(currentBet);
                                            } else {
                                                addEvent('Add meg az összeget!');
                                            }
                                        }
                                    },
                                    { 
                                        text: '❌ Mégsem', 
                                        effect: () => { 
                                            setBetAmount('');
                                        } 
                                    }
                                ]
                            });
                        setShowPopup(true);
                        }, 100);
                    }
                },
                {
                    text: '$100 feltét', 
                    effect: () => {
                        if (money >= 100) {
                            startBlackjack('100');
                        } else {
                            addEvent('Nincs elég pénzed!');
                        }
                    }
                },
                {
                    text: '$500 feltét', 
                    effect: () => {
                        if (money >= 500) {
                            startBlackjack('500');
                        } else {
                            addEvent('Nincs elég pénzed!');
                        }
                    }
                },
                { 
                    text: '← Vissza', 
                    effect: () => { 
                        setShowActivities(false);
                        setBetAmount('');
                    } 
                }
            ]
        );
    };

    const goToBar = () => {
        setShowActivities(false);
        
        if (age < 16) {
            addEvent('Túl fiatal vagy a szórakozóhelyre!');
            return;
        }

        showDecisionPopup(
            '🍻 Szórakozóhely',
            'Mit szeretnél csinálni?',
            [
                {
                    text: '🍺 Iszom ($50)', effect: () => {
                        if (money >= 50) {
                            setMoney(prev => prev - 50);
                            setHappiness(prev => Math.min(100, prev + 15));
                            addEvent('Ivott egy pohárkát. -$50');
                        } else {
                            addEvent('Nincs elég pénzed!');
                        }
                        setShowActivities(false);
                    }
                },
                {
                    text: '🎰 Blackjack játék', effect: () => {
                        if (age >= 18) {
                            playBlackjack();
                        } else {
                            addEvent('18 évesnél fiatalabb vagy a szerencsejátékhoz!');
                            setShowActivities(false);
                        }
                    }
                },
                {
                    text: '💃 Táncolok', effect: () => {
                        setHappiness(prev => Math.min(100, prev + 20));
                        setLooks(prev => Math.min(100, prev + 3));
                        addEvent('Szórakozásképpen táncoltál!');
                        setShowActivities(false);
                    }
                }
            ]
        );
    };

    const buyPet = () => {
        setShowActivities(false);
        
        showDecisionPopup(
            '🐾 Állatokat vásárolni',
            'Melyik állatot szeretnéd?',
            animals.map(animal => ({
                text: `${animal.emoji} ${animal.name} - $${animal.price.toLocaleString()}`,
                effect: () => {
                    if (pet) {
                        addEvent(`Már van háziállatod: ${pet}. Nem vehetsz másik állatot.`);
                    } else if (money >= animal.price) {
                        setMoney(prev => prev - animal.price);
                        setPet(`${animal.name} (${animal.emoji})`);
                        setHappiness(prev => Math.min(100, prev + animal.happiness));
                        addEvent(`Vásároltál egy ${animal.name}! -$${animal.price.toLocaleString()}`);
                    } else {
                        addEvent(`Nincs elég pénzed! Szükséges: $${animal.price.toLocaleString()}`);
                    }
                }
            }))
        );
    };

    const goOnVacation = () => {
        setShowActivities(false);
        
        const vacations = [
            { name: 'Tengerpart (Görögország)', emoji: '🏖️', price: 5000, happiness: 30, health: 10 },
            { name: 'Hegyvidék (Alpok)', emoji: '⛰️', price: 8000, happiness: 25, health: 20 },
            { name: 'Nyaralóhelység (Balaton)', emoji: '🏞️', price: 3000, happiness: 20, health: 5 },
            { name: 'Luxusvakáció (Maldív-szigetek)', emoji: '✈️', price: 20000, happiness: 50, health: 15 },
            { name: 'Városnézés (Párizs)', emoji: '🗼', price: 10000, happiness: 35, health: 5 }
        ];

        showDecisionPopup(
            '✈️ Nyaralás',
            'Hova szeretnél menni?',
            vacations.map(vac => ({
                text: `${vac.emoji} ${vac.name} - $${vac.price.toLocaleString()}`,
                effect: () => {
                    if (money >= vac.price) {
                        setMoney(prev => prev - vac.price);
                        setHappiness(prev => Math.min(100, prev + vac.happiness));
                        setHealth(prev => Math.min(100, prev + vac.health));
                        addEvent(`Elmentél nyaralni: ${vac.name}! -$${vac.price.toLocaleString()}`);
                    } else {
                        addEvent(`Nincs elég pénzed! Szükséges: $${vac.price.toLocaleString()}`);
                    }
                }
            }))
        );
    };

    const findStudentJob = () => {
        setShowActivities(false);

        if (job) {
            addEvent(`Már van egy állásod: ${job.title}. Előbb mondj fel!`);
            return;
        }

        if (age < 15 || age >= 20) {
            addEvent('Diákmunkát csak 15 és 20 éves kor között vállalhatsz!');
            return;
        }

        const studentJobs = [
            { title: 'Szórólapozás', emoji: '📰', salary: 4000, requiredSmarts: 0 },
            { title: 'Kutyasétáltatás', emoji: '🐕', salary: 5000, requiredSmarts: 10 },
            { title: 'Babysitter', emoji: '👶', salary: 6000, requiredSmarts: 25 },
            { title: 'Fűnyírás', emoji: '🌱', salary: 4500, requiredSmarts: 0 },
            { title: 'Korrepetálás', emoji: '📚', salary: 8000, requiredSmarts: 50 },
        ];

        showDecisionPopup(
            '👨‍🎓 Diákmunka keresése',
            'Válassz egy diákmunkát a listáról:',
            [...studentJobs.map(jobOffer => {
                const canApply = smarts >= jobOffer.requiredSmarts;
                const lastApplied = jobApplicationHistory[jobOffer.title];
                const onCooldown = lastApplied !== undefined && (age - lastApplied < 5);

                let reason = '';
                if (!canApply) reason = ` (${jobOffer.requiredSmarts}% okosság kell)`;
                if (onCooldown) reason = ` (Várj ${5 - (age - lastApplied)} évet)`;

                return {
                    text: `${jobOffer.emoji} ${jobOffer.title} ($${jobOffer.salary.toLocaleString()}/év)${reason}`,
                    disabled: !canApply || onCooldown,
                    effect: () => {
                        setJobApplicationHistory(prev => ({ ...prev, [jobOffer.title]: age }));
                        if (Math.random() < 0.45) {
                            setJob({ ...jobOffer, startAge: age });
                            setJobTitle(jobOffer.title);
                            addEvent(`Felvettek a diákmunkára: ${jobOffer.title}! Fizetés: $${jobOffer.salary.toLocaleString()}`, age);
                        } else {
                            addEvent(`Nem vettek fel a(z) ${jobOffer.title} diákmunkára.`, age);
                        }
                    }
                };
            }),
            {
                text: '🔙 Mégsem',
                effect: () => {} // Just close the popup
            }]
        );
    };

    const findSpecialJobs = () => {
        const specialJobs = [
            { title: 'Maffiózó', salary: 50000, raise: 487500, reqSmarts: 40, reqHealth: 60, reqLooks: 0, emoji: '🕴️' },
            { title: 'Űrhajós', salary: 2000000, reqSmarts: 90, reqHealth: 80, reqLooks: 0, emoji: '🚀' },
            { title: 'Kincsvadász', salary: 500000, reqSmarts: 50, reqHealth: 70, reqLooks: 0, emoji: '🤠' },
            { title: 'Titkosügynök', salary: 1000000, reqSmarts: 80, reqHealth: 70, reqLooks: 0, emoji: '🕵️' },
            { title: 'Sztárszakács', salary: 300000, reqSmarts: 60, reqHealth: 0, reqLooks: 50, emoji: '👨‍🍳' },
            { title: 'Profi Sportoló', salary: 800000, reqSmarts: 0, reqHealth: 95, reqLooks: 0, emoji: '⚽' },
            { title: 'Topmodell', salary: 600000, reqSmarts: 0, reqHealth: 50, reqLooks: 90, emoji: '📸' }
        ];

        showDecisionPopup(
            '🌟 Speciális Munkák',
            'Válassz egy különleges karriert (Követelmények teljesítése szükséges):',
            [...specialJobs.map(jobOffer => {
                const smartsOk = smarts >= jobOffer.reqSmarts;
                const healthOk = health >= jobOffer.reqHealth;
                const looksOk = looks >= jobOffer.reqLooks;
                const lastApplied = jobApplicationHistory[jobOffer.title];
                const onCooldown = lastApplied !== undefined && (age - lastApplied < 5);
                const canApply = smartsOk && healthOk && looksOk && !onCooldown;

                let requirements = [];
                if (!smartsOk) requirements.push(`🧠 ${jobOffer.reqSmarts}%`);
                if (!healthOk) requirements.push(`❤️ ${jobOffer.reqHealth}%`);
                if (!looksOk) requirements.push(`✨ ${jobOffer.reqLooks}%`);
                if (onCooldown) requirements.push(`⏳ ${5 - (age - lastApplied)} év`);
                
                const reqText = requirements.length > 0 ? ` (Hiányzik: ${requirements.join(', ')})` : '';

                return {
                    text: `${jobOffer.emoji} ${jobOffer.title} ($${jobOffer.salary.toLocaleString()})${reqText}`,
                    disabled: !canApply,
                    effect: () => {
                        setJobApplicationHistory(prev => ({ ...prev, [jobOffer.title]: age }));
                        if (Math.random() < 0.45) {
                            const hierarchy = specialJobHierarchies[jobOffer.title];
                            const startingTitle = hierarchy ? hierarchy[0] : jobOffer.title;

                            setJob({ 
                                ...jobOffer, 
                                title: startingTitle,
                                requiredSmarts: jobOffer.reqSmarts,
                                isSpecial: true,
                                category: jobOffer.title,
                                level: 0,
                                startAge: age
                            });
                            setJobTitle(startingTitle);
                            addEvent(`Felvettek a speciális munkára: ${startingTitle}! Fizetés: $${jobOffer.salary.toLocaleString()}`, age);
                            setShowActivities(false);
                        } else {
                            addEvent(`Elutasították a jelentkezésedet a(z) ${jobOffer.title} pozícióra.`, age);
                            setShowActivities(false);
                        }
                    }
                };
            }),
            {
                text: '🔙 Mégsem',
                effect: () => {}
            }]
        );
    };

    const findJob = () => {
        setShowActivities(false);
        
        if (job) {
            addEvent(`Már van egy állásod: ${job.title}. Előbb mondj fel!`);
            setShowActivities(false);
            return;
        }

        if (age < 18) {
            addEvent('Munkát csak 18 éves kortól vállalhatsz.');
            setShowActivities(false);
            return;
        }

        let availableJobs = [];

        // HA VAN EGYETEMI VÉGZETTSÉG
        if (education === 'Egyetem' && universityYear === 0 && specialization) {
            const universityJob = specializations.university.find(s => s.name === specialization);
            if (universityJob) {
                availableJobs.push({
                    title: specialization,
                    salary: universityJob.salary,
                    requiredSmarts: universityJob.requiredSmarts
                });
            }
        } 
        // HA KÖZÉPISKOLÁS VÉGZETTSÉG
        else if (education === 'Középiskola' && specialization) {
            if (specialization === 'Műszaki') {
                availableJobs.push(
                    { title: 'Autószerelő', salary: 52000, requiredSmarts: 45 },
                    { title: 'Hegesztő', salary: 48000, requiredSmarts: 40 },
                    { title: 'Épületgépész', salary: 56000, requiredSmarts: 50 },
                    { title: 'Asztalos', salary: 47000, requiredSmarts: 40 },
                    { title: 'Lakatos', salary: 49000, requiredSmarts: 42 }
                );
            } 
            else if (specialization === 'Kereskedelmi') {
                availableJobs.push(
                    { title: 'Értékesítési képviselő', salary: 42000, requiredSmarts: 35 },
                    { title: 'Üzletvezetö', salary: 55000, requiredSmarts: 50 },
                    { title: 'Pénztáros', salary: 38000, requiredSmarts: 30 },
                    { title: 'Logisztikai ügyintéző', salary: 50000, requiredSmarts: 45 },
                    { title: 'Marketing asszisztens', salary: 52000, requiredSmarts: 50 },
                    { title: 'Raktárvezető', salary: 60000, requiredSmarts: 55 },
                    { title: 'Beszerző', salary: 58000, requiredSmarts: 50 }
                );
            } 
            else if (specialization === 'Humán') {
                availableJobs.push(
                    { title: 'Recepciós', salary: 35000, requiredSmarts: 30 },
                    { title: 'HR asszisztens', salary: 45000, requiredSmarts: 45 },
                    { title: 'Könyvtáros', salary: 42000, requiredSmarts: 40 },
                    { title: 'Titkárnő', salary: 46000, requiredSmarts: 45 },
                    { title: 'Pedagógiai asszisztens', salary: 48000, requiredSmarts: 50 },
                    { title: 'Szociális munkás', salary: 50000, requiredSmarts: 55 },
                    { title: 'Fordító', salary: 55000, requiredSmarts: 60 }
                );
            } 
            else if (specialization === 'Művészeti') {
                availableJobs.push(
                    { title: 'Grafikus tervező', salary: 52000, requiredSmarts: 50 },
                    { title: 'Fotós', salary: 40000, requiredSmarts: 35 },
                    { title: 'Könyvtáros', salary: 42000, requiredSmarts: 40 },
                    { title: 'Festő', salary: 48000, requiredSmarts: 40 },
                    { title: 'Szobrász', salary: 55000, requiredSmarts: 50 },
                    { title: 'Illusztrátor', salary: 60000, requiredSmarts: 55 },
                    { title: 'Animátor', salary: 65000, requiredSmarts: 60 },
                    { title: 'Díszlettervező', salary: 70000, requiredSmarts: 65 },
                    { title: 'Gitáros', salary: 75000, requiredSmarts: 50 },
                    { title: 'Zongorista', salary: 80000, requiredSmarts: 55 },
                    { title: 'Énekes', salary: 120000, requiredSmarts: 40 },
                    { title: 'Dobos', salary: 65000, requiredSmarts: 45 },
                    { title: 'DJ', salary: 90000, requiredSmarts: 50 },
                    { title: 'Zeneszerző', salary: 100000, requiredSmarts: 65 },
                    { title: 'Hangmérnök', salary: 95000, requiredSmarts: 60 },
                    { title: 'Producer', salary: 150000, requiredSmarts: 70 }
                );
            } 
            else if (specialization === 'Informatikai') {
                availableJobs.push(
                    { title: 'IT támogatás', salary: 50000, requiredSmarts: 55 },
                    { title: 'Junior Programozó', salary: 65000, requiredSmarts: 60 },
                    { title: 'Rendszergazda', salary: 70000, requiredSmarts: 65 },
                    { title: 'Webfejlesztő', salary: 75000, requiredSmarts: 70 },
                    { title: 'Adatbázis adminisztrátor', salary: 80000, requiredSmarts: 75 },
                    { title: 'Szoftverfejlesztő', salary: 85000, requiredSmarts: 80 },
                    { title: 'Hálózati mérnök', salary: 90000, requiredSmarts: 85 },
                    { title: 'Kiberbiztonsági szakértő', salary: 95000, requiredSmarts: 90 },
                    { title: 'AI fejlesztő', salary: 120000, requiredSmarts: 80 }
                );
            }
        }
        
        // HA NINCS SZAKKÉPZETTSÉG, CSAK ALAPMUNKÁK
        if (availableJobs.length === 0) {
            availableJobs.push(
                { title: 'Kasszás', salary: 25000, requiredSmarts: 20 },
                { title: 'Irodai dolgozó', salary: 45000, requiredSmarts: 40 },
                { title: 'Gyári munkás', salary: 30000, requiredSmarts: 25 },
                { title: 'Takarító', salary: 22000, requiredSmarts: 15 },
                { title: 'Futár', salary: 28000, requiredSmarts: 20 },
                { title: 'Szakács', salary: 35000, requiredSmarts: 30 },
                { title: 'Pincér', salary: 30000, requiredSmarts: 25 },
                { title: 'Raktáros', salary: 32000, requiredSmarts: 20 },
                { title: 'Építőmunkás', salary: 40000, requiredSmarts: 30 },
                { title: 'Biztonsági őr', salary: 38000, requiredSmarts: 25 },
                { title: 'Postai dolgozó', salary: 36000, requiredSmarts: 30 },
                { title: 'Autómosó', salary: 24000, requiredSmarts: 10 },
                { title: 'Kertész', salary: 33000, requiredSmarts: 20 },
                { title: 'Csomagoló', salary: 26000, requiredSmarts: 15 },
                { title: 'Árufeltöltő', salary: 27000, requiredSmarts: 15 },
                { title: 'Mosogató', salary: 23000, requiredSmarts: 10 },
                { title: 'Szemétszállító', salary: 29000, requiredSmarts: 15 },
                { title: 'Parkolóőr', salary: 25000, requiredSmarts: 10 },
                { title: 'Mozis jegyszedő', salary: 24000, requiredSmarts: 10 },
                { title: 'Gyorséttermi dolgozó', salary: 22000, requiredSmarts: 10 }
            );
        }

        // SZŰRÉS: CSAK AZOK A MUNKÁK AMIK TELJESÍTIK AZ OKOSSÁG KÖVETELMÉNYT
        const filteredJobs = availableJobs.filter(j => smarts >= j.requiredSmarts);

        if (filteredJobs.length === 0) {
            addEvent('Nincs megfelelő állás számodra. Növeld az okosságodat vagy szerezz végzettséget!');
            setShowActivities(false);
            return;
        }

        showDecisionPopup(
            '💼 Álláskeresés',
            'Válassz egy állást a listáról:',
            [
                ...filteredJobs.map(jobOffer => {
                    const lastApplied = jobApplicationHistory[jobOffer.title];
                    const onCooldown = lastApplied !== undefined && (age - lastApplied < 5);
                    const reason = onCooldown ? ` (Várj ${5 - (age - lastApplied)} évet)` : '';

                    return {
                        text: `${jobOffer.title} ($${jobOffer.salary.toLocaleString()}/év)${reason}`,
                        disabled: onCooldown,
                        effect: () => {
                            setJobApplicationHistory(prev => ({ ...prev, [jobOffer.title]: age }));
                            if (Math.random() < 0.45) {
                                setJob({ ...jobOffer, startAge: age });
                                setJobTitle(jobOffer.title);
                                addEvent(`Felvettek a munkahelyre: ${jobOffer.title}! Fizetés: $${jobOffer.salary.toLocaleString()}`, age);
                                setShowActivities(false);
                            } else {
                                addEvent(`Nem vettek fel a(z) ${jobOffer.title} állásra.`, age);
                                setShowActivities(false);
                            }
                        }
                    };
                }),
                {
                    text: '🔙 Mégsem',
                    effect: () => { setShowActivities(false); }
                }
            ]
        );
    };

    const goToSchool = () => {
        setShowActivities(false);
        
        if (age >= 6 && age < 14) {
            showDecisionPopup(
                '🎓 Általános Iskola',
                'Szeretnél tanulni?',
                [
                    { text: 'Keményen tanulok', effect: () => { setSmarts(prev => Math.min(100, prev + 10)); setHappiness(prev => Math.max(0, prev - 5)); setShowActivities(false); } },
                    { text: 'Normálisan tanulok', effect: () => { setSmarts(prev => Math.min(100, prev + 5)); setShowActivities(false); } },
                    { text: 'Lógok az óráról', effect: () => { setHappiness(prev => Math.min(100, prev + 10)); setSmarts(prev => Math.max(0, prev - 5)); setShowActivities(false); } }
                ]
            );
        } else if (age >= 14 && education !== 'Középiskola' && education !== 'Egyetem') {
            showDecisionPopup(
                '🎓 Középiskola',
                'Melyik középiskolát választod?',
                specializations.middle.map(spec => ({
                    text: `${spec.emoji} ${spec.name}`,
                    effect: () => {
                        setEducation('Középiskola');
                        setSpecialization(spec.name);
                        setSmarts(prev => Math.min(100, prev + 10));
                        addEvent(`Beiratkoztál a középiskolába! Szakterület: ${spec.name}`, age);
                        setShowActivities(false);
                    }
                }))
            );
        } else if (age >= 18 && age <= 50 && education === 'Középiskola' && education !== 'Egyetem') {
            showDecisionPopup(
                '🎓 Egyetem',
                'Szeretnél egyetemre menni? Válassz egy szakterületet!',
                [
                    {
                        text: '← Nem akarok egyetemre menni',
                        effect: () => { setShowActivities(false); }
                    },
                    ...specializations.university.map(spec => ({
                        text: `${spec.emoji} ${spec.name} (${spec.requiredSmarts}% okosság kell)`,
                        effect: () => {
                            if (smarts >= spec.requiredSmarts && money >= 5000) {
                                setEducation('Egyetem');
                                setSpecialization(spec.name);
                                setUniversityYear(1);
                                setSmarts(prev => Math.min(100, prev + 15));
                                setMoney(prev => prev - 5000);
                                addEvent(`Beiratkoztál az egyetemre! Szak: ${spec.name}. -$5,000`, age);
                            } else if (money < 5000) {
                                addEvent('Nincs elég pénzed az egyetemre! (5000 szükséges)', age);
                            } else {
                                addEvent(`Nem vettnek fel. Szükséges: ${spec.requiredSmarts}% okosság, te: ${smarts}%`, age);
                            }
                            setShowActivities(false);
                        }
                    }))
                ]
            );
        } else {
            addEvent('Most nem tudsz iskolába menni.', age);
            setShowActivities(false);
        }
    };

    const goToGym = () => {
        setShowActivities(false);
        
        if (age < 10) {
            addEvent('Túl fiatal vagy az edzőteremhez!');
            setShowActivities(false);
            return;
        }

        if (money >= 100) {
            showDecisionPopup(
                '🏋️ Edzőterem',
                'Mennyi ideig szeretnél edzeni?',
                [
                    {
                        text: '30 perc ($100)', effect: () => {
                            setMoney(prev => prev - 100);
                            setHealth(prev => Math.min(100, prev + 5));
                            setLooks(prev => Math.min(100, prev + 2));
                            addEvent('Edzettél 30 percet. -$100');
                            setShowActivities(false);
                        }
                    },
                    {
                        text: '1 óra ($200)', effect: () => {
                            if (money >= 200) {
                                setMoney(prev => prev - 200);
                                setHealth(prev => Math.min(100, prev + 10));
                                setLooks(prev => Math.min(100, prev + 5));
                                addEvent('Edzettél 1 órát. -$200');
                            } else {
                                addEvent('Nincs elég pénzed!');
                            }
                            setShowActivities(false);
                        }
                    },
                    { text: 'Mégsem', effect: () => { setShowActivities(false); } }
                ]
            );
        } else {
            addEvent('Nincs elég pénzed edzőteremra!');
            setShowActivities(false);
        }
    };

    const ageUp = () => {
        const newAge = age + 1;
        setAge(newAge);

        const healthLoss = Math.floor(Math.random() * 3) + 1;
        setHealth(prev => Math.max(0, prev - healthLoss));

        // BETEGSÉGEK HATÁSA
        if (diseases.length > 0) {
            const damage = diseases.length * 5;
            setHealth(prev => Math.max(0, prev - damage));
            setHappiness(prev => Math.max(0, prev - 5));
            setEvents(prev => [{ age: newAge, text: `Szenvedsz a betegségeidtől (${diseases.join(', ')}). Egészség -${damage}` }, ...prev]);
        }

        // EGYETEM KEZELÉS
        if (education === 'Egyetem' && universityYear > 0 && universityYear < 4) {
            setUniversityYear(prev => prev + 1);
            setSmarts(prev => Math.min(100, prev + 8));
            
            if (universityYear === 3) {
                setEvents(prev => [{ age: newAge, text: `🎓 Befejezted az egyetemet! Szak: ${specialization}` }, ...prev]);
                setUniversityYear(0);
            } else {
                setEvents(prev => [{ age: newAge, text: `📚 ${universityYear}. év az egyetemen (${specialization})` }, ...prev]);
            }
            
            if (health <= 0 || newAge >= 120) {
                setGameState('gameOver');
            }
            return;
        }

        if (job) {
            setMoney(prev => prev + job.salary);
            setEvents(prev => [{ age: newAge, text: `Fizetést kaptál: $${job.salary.toLocaleString()}` }, ...prev]);
        } else {
            setEvents(prev => [{ age: newAge, text: `${newAge} éves lettél.` }, ...prev]);
        }

        // FIX ÉLETTÖRTÉNETI ESEMÉNYEK
        if (newAge === 7 && education === '') {
            setTimeout(() => startElementarySchool(), 300);
            return;
        }

        if (newAge === 15 && education === 'Általános iskola') {
            setTimeout(() => startMiddleSchool(), 300);
            return;
        }

        if (newAge === 16) {
            setTimeout(() => offerLicenseTest(), 300);
            return;
        }

        if (newAge === 20 && education === 'Középiskola') {
            setTimeout(() => chooseUniversityOrWork(), 300);
            return;
        }

        // RANDOM ESEMÉNYEK (nem fix életkor)
        if (Math.random() < 0.4 && newAge >= 5) {
            setTimeout(() => randomEvent(newAge), 300);
        }

        if (health <= 0 || newAge >= 120) {
            setGameState('gameOver');
        }
    };

    const getAgeAppropriateEvents = (currentAge) => {
        const childEvents = [
            {
                title: '🎈 Játszótér',
                description: 'A játszótéren egy gyerek el akarja venni a játékodat. Mit teszel?',
                options: [
                    { text: 'Megosztom vele', effect: () => { setHappiness(prev => Math.min(100, prev + 10)); } },
                    { text: 'Nem adom oda', effect: () => { setHappiness(prev => Math.max(0, prev - 5)); } },
                    { text: 'Elszaladok', effect: () => { } }
                ]
            },
            {
                title: '🥦 Zöldségek',
                description: 'A szüleid azt akarják, hogy edd meg a brokkolit. Mit teszel?',
                options: [
                    { text: 'Megeeszem', effect: () => { setHealth(prev => Math.min(100, prev + 5)); setHappiness(prev => Math.max(0, prev - 5)); } },
                    { text: 'Kiköpöm', effect: () => { setHappiness(prev => Math.min(100, prev + 5)); setHealth(prev => Math.max(0, prev - 2)); } },
                    { text: 'Hisztizek', effect: () => { setHappiness(prev => Math.max(0, prev - 10)); } }
                ]
            },
            {
                title: '💰 Talált pénz',
                description: 'Találtál egy 500-ast a földön!',
                options: [
                    { text: 'Elteszem', effect: () => { setMoney(prev => prev + 500); setHappiness(prev => Math.min(100, prev + 10)); } },
                    { text: 'Otthagyom', effect: () => { } }
                ]
            }
        ];

        if (!hasHadChickenpox) {
            childEvents.push({
                title: '🤒 Bárányhimlő',
                description: 'Elkaptad a bárányhimlőt! Viszket mindenhol.',
                options: [
                    { text: 'Vakarózom', effect: () => { setHealth(prev => Math.max(0, prev - 10)); setLooks(prev => Math.max(0, prev - 5)); setHasHadChickenpox(true); setDiseases(prev => [...prev, 'Bárányhimlő']); } },
                    { text: 'Tűröm', effect: () => { setHappiness(prev => Math.max(0, prev - 10)); setHasHadChickenpox(true); setDiseases(prev => [...prev, 'Bárányhimlő']); } }
                ]
            });
        }

        const teenEvents = [
            {
                title: '🎉 Házibuli',
                description: 'Meghívtak egy házibuliba. Elmész?',
                options: [
                    {
                        text: 'Igen, elmegyek', effect: () => {
                            setHappiness(prev => Math.min(100, prev + 15));
                            if (currentAge > 15 && Math.random() > 0.7 && !relationship) {
                                let targetGender = 'female';
                                if (character.attraction === 'male') targetGender = 'male';
                                else if (character.attraction === 'female') targetGender = 'female';
                                else targetGender = Math.random() > 0.5 ? 'male' : 'female';

                                const names = countryNames[character.country.name] || countryNames['USA'];
                                const possibleNames = targetGender === 'male' ? names.male : names.female;
                                const partnerName = possibleNames[Math.floor(Math.random() * possibleNames.length)];
                                setRelationship(partnerName);
                            }
                        }
                    },
                    { text: 'Nem, otthon maradok', effect: () => { setSmarts(prev => Math.min(100, prev + 5)); } }
                ]
            },
            {
                title: '🚬 Cigaretta',
                description: 'Az osztálytársaid cigivel kínálnak az iskola mögött.',
                options: [
                    { text: 'Kipróbálom', effect: () => { setHealth(prev => Math.max(0, prev - 10)); setHappiness(prev => Math.min(100, prev + 5)); setLooks(prev => Math.max(0, prev - 2)); } },
                    { text: 'Nem kérek', effect: () => { setHealth(prev => Math.min(100, prev + 2)); } }
                ]
            },
            {
                title: '🚗 Vezetés',
                description: 'A szüleid felajánlják, hogy megtanítanak vezetni.',
                options: [
                    { text: 'Igen!', effect: () => { setSmarts(prev => Math.min(100, prev + 5)); setHappiness(prev => Math.min(100, prev + 10)); } },
                    { text: 'Nem érdekel', effect: () => { } }
                ]
            }
        ];

        if (relationship) {
            const partnerLabel = character.attraction === 'male' ? 'barátod' : (character.attraction === 'female' ? 'barátnőd' : 'párod');
            teenEvents.push({
                title: '💔 Szakítás',
                description: `A ${partnerLabel} szakítani akar veled (vagy csak láttad mással).`,
                options: [
                    { text: 'Sírok', effect: () => { setHappiness(prev => Math.max(0, prev - 20)); setRelationship(null); } },
                    { text: 'Bosszút állok', effect: () => { setHappiness(prev => Math.max(0, prev - 10)); setSmarts(prev => Math.max(0, prev - 5)); setRelationship(null); } },
                    { text: 'Túllépek rajta', effect: () => { setSmarts(prev => Math.min(100, prev + 5)); setRelationship(null); } }
                ]
            });
        }

        const adultEvents = [
            {
                title: '👁️ Tanú',
                description: 'Sétálsz az utcán, amikor látsz egy rablást! Mit teszel?',
                options: [
                    { text: 'Elnézek másfelé', effect: () => { setHappiness(prev => Math.max(0, prev - 5)); } },
                    {
                        text: 'Megpróbálok segíteni', effect: () => {
                            if (Math.random() > 0.5) {
                                setHappiness(prev => Math.min(100, prev + 15));
                            } else {
                                setHealth(prev => Math.max(0, prev - 20));
                            }
                        }
                    },
                    { text: 'Hívom a rendőrséget', effect: () => { setHappiness(prev => Math.min(100, prev + 10)); } }
                ]
            },
            {
                title: ' Befektetés',
                description: 'Egy barátod tuti tippet ad: kriptovaluta! Befektetsz $1,000-t?',
                options: [
                    { text: 'Igen ($1,000)', effect: () => { 
                        if (money >= 1000) {
                            setMoney(prev => prev - 1000);
                            if (Math.random() > 0.95) {
                                const gain = 1000000;
                                setTimeout(() => addEvent(`A befektetésed bejött! Nyertél $${gain.toLocaleString()}`), 1000);
                                setMoney(prev => prev + gain);
                            } else {
                                setTimeout(() => addEvent(`A befektetésed elúszott...`), 1000);
                                setHappiness(prev => Math.max(0, prev - 15));
                            }
                        } else {
                            addEvent('Nincs elég pénzed!');
                        }
                    }},
                    { text: 'Nem, túl kockázatos', effect: () => { setSmarts(prev => Math.min(100, prev + 2)); } }
                ]
            },
            {
                title: '🤒 Influenza',
                description: 'Elkaptad az influenzát. Nagyon rosszul érzed magad.',
                options: [
                    { text: 'Orvoshoz megyek ($100)', effect: () => { 
                        if (money >= 100) { setMoney(prev => prev - 100); setHealth(prev => Math.min(100, prev + 10)); }
                        else { setHealth(prev => Math.max(0, prev - 10)); }
                    }},
                    { text: 'Kipihenem otthon', effect: () => { setHealth(prev => Math.max(0, prev - 5)); setDiseases(prev => [...prev, 'Influenza']); } }
                ]
            }
        ];

        const elderEvents = [
            {
                title: '👵 Unokák',
                description: 'Meglátogattak az unokáid. Adsz nekik zsebpénzt?',
                options: [
                    { text: 'Igen ($100)', effect: () => { 
                        if (money >= 100) { setMoney(prev => prev - 100); setHappiness(prev => Math.min(100, prev + 20)); }
                    }},
                    { text: 'Csak sütit kapnak', effect: () => { setHappiness(prev => Math.min(100, prev + 10)); } }
                ]
            },
            {
                title: '🦴 Hátfájás',
                description: 'Reggel arra ébredtél, hogy alig bírsz felkelni.',
                options: [
                    { text: 'Gyógyszert veszek be', effect: () => { setHealth(prev => Math.min(100, prev + 5)); } },
                    { text: 'Szenvedek', effect: () => { setHappiness(prev => Math.max(0, prev - 10)); setHealth(prev => Math.max(0, prev - 5)); } }
                ]
            },
            {
                title: '🎱 Bingo',
                description: 'Bingo estet tartanak a közösségi házban.',
                options: [
                    { text: 'Elmegyek ($20)', effect: () => { 
                        if (money >= 20) {
                            setMoney(prev => prev - 20);
                            setHappiness(prev => Math.min(100, prev + 10));
                            if (Math.random() > 0.8) {
                                setMoney(prev => prev + 500);
                                setTimeout(() => addEvent('Nyertél a Bingón! +$500'), 500);
                            }
                        }
                    }},
                    { text: 'Inkább TV-zek', effect: () => { } }
                ]
            }
        ];

        const jobEvents = [
            {
                title: '💼 Túlóra',
                description: 'A főnököd megkér, hogy maradj bent túlórázni.',
                options: [
                    { text: 'Maradok', effect: () => { setMoney(prev => prev + 500); setHappiness(prev => Math.max(0, prev - 10)); setHealth(prev => Math.max(0, prev - 2)); } },
                    { text: 'Hazamegyek', effect: () => { setHappiness(prev => Math.min(100, prev + 5)); } }
                ]
            },
            {
                title: '💼 Munkahelyi konfliktus',
                description: 'Egy kollégád ellopta az ebédedet a hűtőből.',
                options: [
                    { text: 'Szólok a HR-nek', effect: () => { setSmarts(prev => Math.min(100, prev + 2)); } },
                    { text: 'Megverem', effect: () => { setHealth(prev => Math.max(0, prev - 10)); setHappiness(prev => Math.max(0, prev - 10)); setTimeout(() => addEvent('Kirúgtak a verekedés miatt!'), 1000); setJob(null); setJobTitle(''); } },
                    { text: 'Hagyom', effect: () => { setHappiness(prev => Math.max(0, prev - 5)); } }
                ]
            },
            {
                title: '💼 Előléptetés?',
                description: 'Megüresedett egy pozíció feletted. Jelentkezel?',
                options: [
                    { text: 'Igen', effect: () => { 
                        if (job.isSpecial) {
                            const hierarchy = specialJobHierarchies[job.category];
                            if (hierarchy && job.level < hierarchy.length - 1) {
                                const newLevel = job.level + 1;
                                const newTitle = hierarchy[newLevel];
                                const raise = job.raise || 1000000;
                                
                                setJob(prev => ({...prev, salary: prev.salary + raise, level: newLevel, title: newTitle}));
                                setJobTitle(newTitle);
                                setMoney(prev => prev + raise);
                                setHappiness(prev => Math.min(100, prev + 20));
                                setTimeout(() => addEvent(`Előléptettek! Új rang: ${newTitle}. Fizetésed nőtt: +$${raise.toLocaleString()}`), 500);
                            } else {
                                setTimeout(() => addEvent('Már a csúcson vagy, de kaptál egy kis bónuszt ($50,000).'), 500);
                                setMoney(prev => prev + 50000);
                            }
                        } else {
                            const raise = 10000;
                            setJob(prev => ({...prev, salary: prev.salary + raise}));
                            setMoney(prev => prev + raise);
                            setHappiness(prev => Math.min(100, prev + 20));
                            setTimeout(() => addEvent(`Előléptettek! A fizetésed nőtt: +$${raise.toLocaleString()}`), 500);
                        }
                    }},
                    { text: 'Nem', effect: () => { } }
                ]
            }
        ];

        if (vehicle) {
            adultEvents.push({
                title: '🚗 Lerobbant autó',
                description: 'Az autód lerobbant az autópályán. A javítás $500.',
                options: [
                    { text: 'Megjavíttatom ($500)', effect: () => { 
                        if (money >= 500) { setMoney(prev => prev - 500); } 
                        else { setHappiness(prev => Math.max(0, prev - 20)); }
                    }},
                    { text: 'Eladom a roncsot', effect: () => { setMoney(prev => prev + 200); setHappiness(prev => Math.max(0, prev - 10)); } }
                ]
            });
        }

        let availableEvents = [];

        if (currentAge < 13) {
            availableEvents = childEvents;
        } else if (currentAge < 18) {
            availableEvents = teenEvents;
        } else if (currentAge < 60) {
            availableEvents = adultEvents;
        } else {
            availableEvents = [...adultEvents, ...elderEvents];
        }

        if (job) {
            availableEvents = [...availableEvents, ...jobEvents];
        }

        return availableEvents;
    };

    const randomEvent = (eventAge) => {
        const ageAppropriateEvents = getAgeAppropriateEvents(eventAge);
        const event = ageAppropriateEvents[Math.floor(Math.random() * ageAppropriateEvents.length)];
        
        const modifiedOptions = event.options.map(option => ({
            ...option,
            effect: () => {
                if (option.effect) {
                    option.effect();
                }
                setEvents(prev => [{ age: eventAge, text: event.title }, ...prev]);
            }
        }));
        
        showDecisionPopup(event.title, event.description, modifiedOptions);
    };

    const askForPromotion = () => {
        const recentRequests = promotionRequests.filter(reqAge => reqAge >= age - 9);
        
        if (recentRequests.length >= 2) {
            addEvent('Túl gyakran kértél előléptetést! (Max 2 alkalom 10 évente)');
            return;
        }

        setPromotionRequests(prev => [...prev, age]);

        // 60% esély a sikerre
        if (Math.random() > 0.4) {
            if (job.isSpecial) {
                const hierarchy = specialJobHierarchies[job.category];
                if (hierarchy && job.level < hierarchy.length - 1) {
                    const newLevel = job.level + 1;
                    const newTitle = hierarchy[newLevel];
                    const raise = job.raise || 1000000;
                    
                    setJob(prev => ({...prev, salary: prev.salary + raise, level: newLevel, title: newTitle}));
                    setJobTitle(newTitle);
                    setMoney(prev => prev + raise);
                    setHappiness(prev => Math.min(100, prev + 20));
                    addEvent(`Sikeresen előléptettek! Új rang: ${newTitle}. Fizetésed nőtt: +$${raise.toLocaleString()}`);
                } else {
                    addEvent('A főnököd szerint már a csúcson vagy, de kaptál egy kis bónuszt ($50,000).');
                    setMoney(prev => prev + 50000);
                }
            } else {
                const raise = 10000;
                setJob(prev => ({...prev, salary: prev.salary + raise}));
                setMoney(prev => prev + raise);
                setHappiness(prev => Math.min(100, prev + 15));
                addEvent(`Sikeresen fizetésemelést kértél! +$${raise.toLocaleString()}/év`);
            }
        } else {
            setHappiness(prev => Math.max(0, prev - 10));
            addEvent('A főnököd elutasította az előléptetési kérelmedet.');
        }
    };

    const doOvertime = () => {
        setMoney(prev => prev + 500);
        setHappiness(prev => Math.max(0, prev - 5));
        setHealth(prev => Math.max(0, prev - 2));
        addEvent('Túlóráztál. Kerestél $500-t, de elfáradtál.');
    };

    const manageJob = () => {
        if (!job) return;
        
        const startAge = job.startAge !== undefined ? job.startAge : age;
        const currentYears = age - startAge;
        const key = job.isSpecial ? job.category : job.title;
        const totalYears = currentYears + (careerHistory[key] || 0);
        
        showDecisionPopup(
            '💼 Munkahely kezelése',
            `Pozíció: ${job.title}\nFizetés: $${job.salary.toLocaleString()}\nMunkaviszony: ${currentYears} év (${totalYears} év összesen a szakmában)`,
            [
                { text: '📈 Előléptetés kérése', effect: () => askForPromotion() },
                { text: '🕒 Túlóra vállalása', effect: () => doOvertime() },
                { 
                    text: '🚪 Felmondás', 
                    effect: () => {
                        setCareerHistory(prev => ({ ...prev, [key]: (prev[key] || 0) + currentYears }));
                        setJob(null);
                        setJobTitle('');
                        addEvent(`Felmondtál a(z) ${job.title} állásodban.`);
                        setShowJobTab(false);
                    } 
                },
                { text: '🔙 Vissza', effect: () => {} }
            ]
        );
    };

    const visitDoctor = () => {
        setShowActivities(false);
        const isFree = age < 18;
        
        const doctors = [
            { name: 'Dr. Bubó (Háziorvos)', cost: 5000, healAmount: 10, cureChance: 0.4 },
            { name: 'Dr. House (Specialista)', cost: 50000, healAmount: 30, cureChance: 0.9 }
        ];

        showDecisionPopup(
            '🏥 Orvosi Rendelő',
            `Üdvözöllek a rendelőben! ${diseases.length > 0 ? `Jelenlegi panaszaid: ${diseases.join(', ')}` : 'Nincs diagnosztizált betegséged.'}`,
            [
                ...doctors.map(doc => ({
                    text: `${doc.name} (${isFree ? 'Ingyenes' : '$' + doc.cost.toLocaleString()})`,
                    effect: () => {
                        const cost = isFree ? 0 : doc.cost;
                        if (money >= cost) {
                            setMoney(prev => prev - cost);
                            
                            if (diseases.length > 0) {
                                // Gyógyítás logika
                                const cured = [];
                                const remaining = [];
                                
                                diseases.forEach(d => {
                                    if (Math.random() < doc.cureChance) {
                                        cured.push(d);
                                    } else {
                                        remaining.push(d);
                                    }
                                });
                                
                                setDiseases(remaining);
                                
                                if (cured.length > 0) {
                                    setHealth(prev => Math.min(100, prev + doc.healAmount));
                                    setHappiness(prev => Math.min(100, prev + 10));
                                    addEvent(`A kezelés sikeres volt! Meggyógyultál ebből: ${cured.join(', ')}. ${!isFree ? `-$${cost.toLocaleString()}` : ''}`);
                                } else {
                                    addEvent(`A kezelés nem használt. Még mindig beteg vagy. ${!isFree ? `-$${cost.toLocaleString()}` : ''}`);
                                }
                            } else {
                                // Csak gyógyulás
                                setHealth(prev => Math.min(100, prev + doc.healAmount));
                                addEvent(`Részt vettél egy általános kivizsgáláson. Makkegészséges vagy! ${!isFree ? `-$${cost.toLocaleString()}` : ''}`);
                            }
                        } else {
                            addEvent(`Nincs elég pénzed a kezelésre! ($${cost.toLocaleString()})`);
                        }
                    }
                })),
                { text: '🔙 Mégsem', effect: () => setShowActivities(false) }
            ]
        );
    };

    const activities = [
        { name: '💼 Munkakeresés', action: findJob },
        { name: '👨‍🎓 Diákmunka', action: findStudentJob },
        { name: '🏥 Orvos', action: visitDoctor },
        { name: '🏋️ Edzőterem', action: goToGym },
        { name: '📚 Könyvtár', action: () => { setSmarts(prev => Math.min(100, prev + 3)); addEvent('Olvastál a könyvtárban.'); setShowActivities(false); } },
        { name: '🎬 Mozi', action: () => { 
            if (age >= 5) { 
                if (money >= 50) { 
                    setMoney(prev => prev - 50); 
                    setHappiness(prev => Math.min(100, prev + 10)); 
                    addEvent('Elmentél moziba. -$50'); 
                } else { 
                    addEvent('Nincs elég pénzed mozira!'); 
                } 
            } else { 
                addEvent('Túl fiatal vagy!'); 
            } 
            setShowActivities(false); 
        } },
        { name: '🎮 Játék', action: () => { setHappiness(prev => Math.min(100, prev + 8)); addEvent('Játszottál videojátékot.'); setShowActivities(false); } },
        { name: '🍻 Szórakozóhely', action: goToBar },
        { name: '🎰 Szerencsejáték', action: () => { setShowActivities(false); playBlackjack(); } },
        { name: '🐾 Állatot vásárolni', action: buyPet },
        { name: '✈️ Nyaralás', action: goOnVacation }
    ];

    const visitCarDealership = () => {
        setShowWealthTab(false);
        
        const carCategories = [
            { name: 'Városi autók', emoji: '🚗', models: [
                { name: 'Suzuki Swift', basePrice: 500000 },
                { name: 'Toyota Corolla', basePrice: 8000000 },
                { name: 'Opel Astra', basePrice: 6000000 },
                { name: 'Volkswagen Golf', basePrice: 9000000 }
            ]},
            { name: 'SUV / Terepjáró', emoji: '🚙', models: [
                { name: 'BMW X5', basePrice: 25000000 },
                { name: 'Mercedes G-Class', basePrice: 60000000 },
                { name: 'Range Rover', basePrice: 40000000 }
            ]},
            { name: 'Sportautók', emoji: '🏎️', models: [
                { name: 'Ford Mustang', basePrice: 15000000 },
                { name: 'Porsche 911', basePrice: 50000000 },
                { name: 'Ferrari 488', basePrice: 80000000 },
                { name: 'Lamborghini Aventador', basePrice: 120000000 }
            ]},
            { name: 'Elektromos', emoji: '🔋', models: [
                { name: 'Tesla Model 3', basePrice: 18000000 },
                { name: 'Tesla Model S', basePrice: 35000000 },
                { name: 'Porsche Taycan', basePrice: 45000000 }
            ]}
        ];

        showDecisionPopup(
            '🚗 Autószalon',
            'Milyen kategóriát keresel?',
            [
                ...carCategories.map(cat => ({
                    text: `${cat.emoji} ${cat.name}`,
                    effect: () => {
                        const carsForSale = [];
                        for (let i = 0; i < 5; i++) {
                            const model = cat.models[Math.floor(Math.random() * cat.models.length)];
                            const price = Math.floor(model.basePrice * (0.9 + Math.random() * 0.2));
                            const condition = Math.floor(Math.random() * 20) + 80;
                            carsForSale.push({ ...model, price, condition, emoji: cat.emoji });
                        }
                        carsForSale.sort((a, b) => a.price - b.price);

                        setTimeout(() => {
                            showDecisionPopup(
                                `🚗 ${cat.name} Kínálat`,
                                'Válassz egy autót!',
                                [
                                    ...carsForSale.map(car => ({
                                        text: `${car.emoji} ${car.name} (${car.condition}%) - $${car.price.toLocaleString()}`,
                                        effect: () => {
                                            if (money >= car.price) {
                                                setMoney(prev => prev - car.price);
                                                setVehicle(car.name);
                                                setHappiness(prev => Math.min(100, prev + 20));
                                                addEvent(`Vettél egy autót: ${car.name}! -$${car.price.toLocaleString()}`);
                                            } else {
                                                addEvent(`Nincs elég pénzed! ($${car.price.toLocaleString()})`);
                                            }
                                        }
                                    })),
                                    { text: '🔙 Vissza a kategóriákhoz', effect: () => visitCarDealership() }
                                ]
                            );
                        }, 100);
                    }
                })),
                { text: '🔙 Mégsem', effect: () => setShowWealthTab(true) }
            ]
        );
    };

    const visitRealEstateAgent = () => {
        setShowWealthTab(false);
        
        const streetNames = ['Kossuth Lajos u.', 'Petőfi Sándor u.', 'Ady Endre út', 'Béke tér', 'Fő utca', 'Rákóczi út', 'József Attila u.', 'Szabadság tér', 'Bartók Béla út', 'Váci utca', 'Andrássy út'];
        
        const houseTypes = [
            { type: 'Garzon', emoji: '🏢', minPrice: 15000000, maxPrice: 25000000, minRooms: 1, maxRooms: 1, minBath: 1, maxBath: 1 },
            { type: 'Panellakás', emoji: '🏢', minPrice: 25000000, maxPrice: 45000000, minRooms: 1, maxRooms: 3, minBath: 1, maxBath: 1 },
            { type: 'Tégla lakás', emoji: '🏢', minPrice: 35000000, maxPrice: 60000000, minRooms: 2, maxRooms: 4, minBath: 1, maxBath: 2 },
            { type: 'Családi ház', emoji: '🏠', minPrice: 50000000, maxPrice: 120000000, minRooms: 3, maxRooms: 6, minBath: 1, maxBath: 3 },
            { type: 'Luxusvilla', emoji: '🏡', minPrice: 200000000, maxPrice: 800000000, minRooms: 5, maxRooms: 10, minBath: 3, maxBath: 6 },
            { type: 'Kastély', emoji: '🏰', minPrice: 900000000, maxPrice: 2000000000, minRooms: 10, maxRooms: 30, minBath: 5, maxBath: 15 }
        ];

        showDecisionPopup(
            '🏠 Ingatlanügynökség',
            'Milyen típusú ingatlant keresel?',
            [
                ...houseTypes.map(typeObj => ({
                    text: `${typeObj.emoji} ${typeObj.type}`,
                    effect: () => {
                        const housesForSale = [];
                        for (let i = 0; i < 5; i++) {
                            const street = streetNames[Math.floor(Math.random() * streetNames.length)];
                            const number = Math.floor(Math.random() * 100) + 1;
                            
                            const rooms = Math.floor(Math.random() * (typeObj.maxRooms - typeObj.minRooms + 1)) + typeObj.minRooms;
                            const baths = Math.floor(Math.random() * (typeObj.maxBath - typeObj.minBath + 1)) + typeObj.minBath;
                            
                            const basePrice = typeObj.minPrice + Math.random() * (typeObj.maxPrice - typeObj.minPrice);
                            const price = Math.floor(basePrice);

                            housesForSale.push({
                                name: `${typeObj.type} - ${street} ${number}.`,
                                details: `(${rooms} szoba, ${baths} fürdő)`,
                                price: price,
                                emoji: typeObj.emoji,
                                id: i
                            });
                        }
                        housesForSale.sort((a, b) => a.price - b.price);

                        setTimeout(() => {
                            showDecisionPopup(
                                `🏠 ${typeObj.type} Kínálat`,
                                'Válassz egy ingatlant!',
                                [
                                    ...housesForSale.map(house => ({
                                        text: `${house.emoji} ${house.name} ${house.details} - $${house.price.toLocaleString()}`,
                                        effect: () => {
                                            if (money >= house.price) {
                                                setMoney(prev => prev - house.price);
                                                setHouse(house.name);
                                                setHappiness(prev => Math.min(100, prev + 30));
                                                addEvent(`Vettél egy ingatlant: ${house.name}! -$${house.price.toLocaleString()}`);
                                            } else {
                                                addEvent(`Nincs elég pénzed! ($${house.price.toLocaleString()})`);
                                            }
                                        }
                                    })),
                                    { text: '🔙 Vissza a kategóriákhoz', effect: () => visitRealEstateAgent() }
                                ]
                            );
                        }, 100);
                    }
                })),
                { text: '🔙 Mégsem', effect: () => setShowWealthTab(true) }
            ]
        );
    };

    const visitJewelryStore = () => {
        setShowWealthTab(false);
        
        const jewelryCategories = [
            { name: 'Gyűrűk', emoji: '💍', items: [
                { name: 'Ezüst gyűrű', basePrice: 15000 },
                { name: 'Arany gyűrű', basePrice: 150000 },
                { name: 'Gyémánt gyűrű', basePrice: 1500000 }
            ]},
            { name: 'Nyakláncok', emoji: '📿', items: [
                { name: 'Ezüst lánc', basePrice: 25000 },
                { name: 'Arany nyaklánc', basePrice: 300000 },
                { name: 'Gyöngysor', basePrice: 500000 }
            ]},
            { name: 'Órák', emoji: '⌚', items: [
                { name: 'Digitális óra', basePrice: 10000 },
                { name: 'Okosóra', basePrice: 100000 },
                { name: 'Luxus karóra', basePrice: 2000000 },
                { name: 'Rolex', basePrice: 5000000 }
            ]}
        ];

        showDecisionPopup(
            '💍 Ékszerbolt',
            'Mit keresel?',
            [
                ...jewelryCategories.map(cat => ({
                    text: `${cat.emoji} ${cat.name}`,
                    effect: () => {
                        const itemsForSale = [];
                        for (let i = 0; i < 5; i++) {
                            const item = cat.items[Math.floor(Math.random() * cat.items.length)];
                            const price = Math.floor(item.basePrice * (0.9 + Math.random() * 0.2));
                            itemsForSale.push({ ...item, price, emoji: cat.emoji });
                        }
                        itemsForSale.sort((a, b) => a.price - b.price);

                        setTimeout(() => {
                            showDecisionPopup(
                                `💍 ${cat.name} Kínálat`,
                                'Válassz egy ékszert!',
                                [
                                    ...itemsForSale.map(item => ({
                                        text: `${item.emoji} ${item.name} - $${item.price.toLocaleString()}`,
                                        effect: () => {
                                            if (money >= item.price) {
                                                setMoney(prev => prev - item.price);
                                                setHappiness(prev => Math.min(100, prev + 10));
                                                addEvent(`Vettél egy ékszert: ${item.name}! -$${item.price.toLocaleString()}`);
                                            } else {
                                                addEvent(`Nincs elég pénzed! ($${item.price.toLocaleString()})`);
                                            }
                                        }
                                    })),
                                    { text: '🔙 Vissza a kategóriákhoz', effect: () => visitJewelryStore() }
                                ]
                            );
                        }, 100);
                    }
                })),
                { text: '🔙 Mégsem', effect: () => setShowWealthTab(true) }
            ]
        );
    };

    if (age >= 16 && !hasLicense) {
        activities.push({ name: '🚗 Jogosítvány', action: takeDrivingTest });
    }

    const Overlay = ({ title, children, onClose }) => (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full flex flex-col max-h-[90vh]">
                <div className="p-4 border-b-2 border-gray-100 flex justify-between items-center bg-orange-500 rounded-t-3xl flex-shrink-0">
                    <h3 className="text-2xl font-bold text-white">{title}</h3>
                    <button onClick={onClose} className="text-white hover:text-gray-200">
                        <X size={28} />
                    </button>
                </div>
                <div className="p-6 overflow-y-auto">
                    {children}
                </div>
            </div>
        </div>
    );

    const JobTab = () => (
        <Overlay title="💼 Munka" onClose={() => setShowJobTab(false)}>
            <div className="space-y-4">
                <div className="p-4 bg-orange-100 rounded-xl">
                    <p className="text-xl font-bold text-orange-800 mb-2">Jelenlegi állás</p>
                    <p className="text-lg font-semibold">{jobTitle || 'Munkanélküli'}</p>
                    {job && (
                        <>
                            <p className="text-sm text-gray-600">Éves fizetés: ${job.salary.toLocaleString()}</p>
                        </>
                    )}
                </div>

                <div className="p-4 bg-blue-100 rounded-xl">
                    <p className="text-xl font-bold text-blue-800 mb-2">Végzettség</p>
                    <p className="text-lg font-semibold">{education || 'Nincs'}</p>
                    {specialization && (
                        <p className="text-sm text-gray-600">Szakirány: {specialization}</p>
                    )}
                </div>

                <div className="border-t pt-4">
                    <p className="text-lg font-bold mb-2">Lehetőségek</p>
                    <button
                        onClick={() => { setShowJobTab(false); goToSchool(); }}
                        className="w-full bg-green-500 text-white py-3 rounded-xl font-bold hover:bg-green-600 transition mb-2"
                    >
                        🎓 Iskola/Egyetem
                    </button>
                    <button
                        onClick={() => { setShowJobTab(false); findJob(); }}
                        className="w-full bg-blue-500 text-white py-3 rounded-xl font-bold hover:bg-blue-600 transition mb-2"
                    >
                        💼 Állást keresek
                    </button>
                    {age >= 20 && (
                        <button
                            onClick={() => { setShowJobTab(false); findSpecialJobs(); }}
                            className="w-full bg-purple-600 text-white py-3 rounded-xl font-bold hover:bg-purple-700 transition mb-2"
                        >
                            🌟 Speciális Munkák
                        </button>
                    )}
                    {job && (
                        <button
                            onClick={() => {
                                setJob(null);
                                setJobTitle('');
                                addEvent(`Felmondtál a(z) ${job.title} állásodban.`);
                                setShowJobTab(false);
                            }}
                            className="w-full bg-red-500 text-white py-3 rounded-xl font-bold hover:bg-red-600 transition"
                        >
                            🚪 Felmondok
                        </button>
                    )}
                </div>
            </div>
        </Overlay>
    );

    const WealthTab = () => (
        <Overlay title="💰 Vagyon" onClose={() => setShowWealthTab(false)}>
            <div className="space-y-4">
                <div className="p-4 bg-green-100 rounded-xl text-center">
                    <p className="text-2xl font-black text-green-800">${money.toLocaleString()}</p>
                    <p className="text-lg font-semibold text-gray-700">Jelenlegi Egyenleg</p>
                </div>

                <div className="space-y-2">
                    <div className="p-3 bg-gray-50 rounded-lg flex justify-between items-center">
                        <span>🏠 Ingatlan:</span>
                        <span className="font-bold">{house || 'Nincs'}</span>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg flex justify-between items-center">
                        <span>🚗 Jármű:</span>
                        <span className="font-bold">{vehicle || 'Nincs'}</span>
                    </div>
                </div>

                <div className="border-t pt-4">
                    <p className="text-lg font-bold mb-2">Vásárlás</p>
                    <button
                        onClick={visitCarDealership}
                        className="w-full bg-blue-500 text-white py-3 rounded-xl font-bold hover:bg-blue-600 transition mb-2"
                    >
                        🚗 Autószalon
                    </button>
                    <button
                        onClick={visitRealEstateAgent}
                        className="w-full bg-green-600 text-white py-3 rounded-xl font-bold hover:bg-green-700 transition mb-2"
                    >
                        🏠 Ingatlanügynökség
                    </button>
                    <button
                        onClick={visitJewelryStore}
                        className="w-full bg-yellow-500 text-white py-3 rounded-xl font-bold hover:bg-yellow-600 transition"
                    >
                        💍 Ékszerbolt
                    </button>
                </div>
            </div>
        </Overlay>
    );

    const RelationTab = () => (
        <Overlay title="❤️ Kapcsolatok" onClose={() => setShowRelationTab(false)}>
            <div className="space-y-4">
                <div className="p-4 bg-pink-100 rounded-xl">
                    <p className="text-xl font-bold text-pink-800 mb-2">Párkapcsolat</p>
                    <p className="text-lg font-semibold">{relationship ? relationship : 'Egyedül'}</p>
                </div>

                <div className="p-4 bg-gray-100 rounded-xl">
                    <p className="text-xl font-bold text-gray-800 mb-2">Háziállat</p>
                    <p className="text-lg font-semibold">{pet ? pet : 'Nincs'}</p>
                </div>

                <div className="border-t pt-4">
                    <p className="text-lg font-bold mb-2">Lehetőségek</p>
                    <button
                        onClick={() => {
                            setHappiness(prev => Math.min(100, prev + 15));
                            addEvent('Elmentél egy szórakozóhelyre és kerested a szerelmet!');
                            if (age >= 16 && Math.random() > 0.6) {
                                let targetGender = 'female';
                                if (character.attraction === 'male') targetGender = 'male';
                                else if (character.attraction === 'female') targetGender = 'female';
                                else targetGender = Math.random() > 0.5 ? 'male' : 'female';

                                const names = countryNames[character.country.name] || countryNames['USA'];
                                const possibleNames = targetGender === 'male' ? names.male : names.female;
                                const partnerName = possibleNames[Math.floor(Math.random() * possibleNames.length)];
                                setRelationship(partnerName);
                                addEvent(`Találkoztál ${partnerName}-val és elkezdtél vele randizni!`);
                            }
                            setShowRelationTab(false);
                        }}
                        className="w-full bg-pink-500 text-white py-3 rounded-xl font-bold hover:bg-pink-600 transition mb-2"
                    >
                        ❤️ Szerelmet keresek
                    </button>

                    {relationship && (
                        <button
                            onClick={() => {
                                setRelationship(null);
                                setHappiness(prev => Math.max(0, prev - 20));
                                addEvent('Szakítottál a partnereddel. Nagy szomorúság!');
                                setShowRelationTab(false);
                            }}
                            className="w-full bg-red-500 text-white py-3 rounded-xl font-bold hover:bg-red-600 transition"
                        >
                            💔 Szakítás
                        </button>
                    )}
                </div>
            </div>
        </Overlay>
    );

    const SettingsTab = () => (
        <Overlay title="⚙️ Beállítások" onClose={() => setShowSettings(false)}>
            <div className="space-y-4">
                <div className="p-4 bg-purple-100 rounded-xl">
                    <p className="text-xl font-bold text-purple-800 mb-4">Hangerő</p>
                    <button
                        onClick={() => setSoundEnabled(!soundEnabled)}
                        className={`w-full py-2 rounded-lg font-bold text-white transition ${soundEnabled ? 'bg-green-500' : 'bg-gray-500'}`}
                    >
                        {soundEnabled ? '🔊 Bekapcsolva' : '🔇 Kikapcsolva'}
                    </button>
                </div>

                <div className="p-4 bg-gray-100 rounded-xl">
                    <p className="text-xl font-bold text-gray-800 mb-4">Játék</p>
                    <button
                        onClick={() => {
                            setShowSettings(false);
                            setGameState('menu');
                        }}
                        className="w-full py-2 rounded-lg font-bold text-white bg-red-500 hover:bg-red-600 transition"
                    >
                        🔄 Újrakezdés
                    </button>
                </div>

                <div className="p-4 bg-red-100 rounded-xl">
                    <p className="text-xl font-bold text-red-800 mb-2">Játék Verziója</p>
                    <p className="text-sm text-gray-700">LifePath v0.1</p>
                </div>
            </div>
        </Overlay>
    );

    if (gameState === 'menu') {
        return (
            <div className="min-h-screen bg-orange-500 flex items-center justify-center p-4">
                <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center">
                    <div className="flex items-center justify-center gap-3 mb-8">
                        <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center">
                            <span className="text-3xl">🎮</span>
                        </div>
                        <h1 className="text-5xl font-black text-orange-600">LifePath</h1>
                    </div>

                    <button
                        onClick={() => setGameState('charCreate')}
                        className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-4 rounded-2xl text-xl font-bold mb-4 hover:scale-105 transition shadow-lg"
                    >
                        ▶️ Új Élet
                    </button>

                    <p className="text-sm text-gray-500 mt-4">
                        Élj egy teljes életet! Hozz döntéseket és nézd meg mi történik!
                    </p>
                </div>
            </div>
        );
    }

    if (gameState === 'charCreate') {
        const CharacterCreator = () => {
            const [customChar, setCustomChar] = useState(createRandomCharacter());

            const randomizeName = () => {
                const names = countryNames[customChar.country.name];
                const newFirstName = customChar.gender === 'male'
                    ? names.male[Math.floor(Math.random() * names.male.length)]
                    : names.female[Math.floor(Math.random() * names.female.length)];
                const newLastName = names.last[Math.floor(Math.random() * names.last.length)];
                
                setCustomChar({ ...customChar, firstName: newFirstName, lastName: newLastName });
            };

            return (
                <div className="min-h-screen bg-orange-500 flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full">
                        <h2 className="text-3xl font-bold text-orange-600 mb-6 text-center">Karakter Létrehozása</h2>

                        <div className="space-y-4">
                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <label className="block text-sm font-bold text-gray-700">Keresztnév</label>
                                    <button onClick={randomizeName} className="text-xs bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded transition">
                                        🎲 Új név
                                    </button>
                                </div>
                                <input
                                    type="text"
                                    value={customChar.firstName}
                                    onChange={(e) => setCustomChar({ ...customChar, firstName: e.target.value })}
                                    className="w-full border-2 border-gray-300 rounded-xl p-3 text-lg"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold mb-2 text-gray-700">Vezetéknév</label>
                                <input
                                    type="text"
                                    value={customChar.lastName}
                                    onChange={(e) => setCustomChar({ ...customChar, lastName: e.target.value })}
                                    className="w-full border-2 border-gray-300 rounded-xl p-3 text-lg"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold mb-2 text-gray-700">Nem</label>
                                <select
                                    value={customChar.gender}
                                    onChange={(e) => setCustomChar({ ...customChar, gender: e.target.value })}
                                    className="w-full border-2 border-gray-300 rounded-xl p-3 text-lg"
                                >
                                    <option value="male">Férfi</option>
                                    <option value="female">Nő</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-bold mb-2 text-gray-700">Ország</label>
                                <select
                                    value={customChar.country.name}
                                    onChange={(e) => {
                                        const selectedCountry = countries.find(c => c.name === e.target.value);
                                        setCustomChar({ ...customChar, country: selectedCountry });
                                    }}
                                    className="w-full border-2 border-gray-300 rounded-xl p-3 text-lg"
                                >
                                    {countries.map(c => <option key={c.name} value={c.name}>{c.flag} {c.name}</option>)}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-bold mb-2 text-gray-700">Vonzalom</label>
                                <select
                                    value={customChar.attraction}
                                    onChange={(e) => setCustomChar({ ...customChar, attraction: e.target.value })}
                                    className="w-full border-2 border-gray-300 rounded-xl p-3 text-lg"
                                >
                                    <option value="male">Férfiak</option>
                                    <option value="female">Nők</option>
                                    <option value="both">Mindkettő</option>
                                </select>
                            </div>
                        </div>

                        <div className="flex gap-3 mt-6">
                            <button
                                onClick={() => setCustomChar(createRandomCharacter())}
                                className="flex-1 bg-gray-300 text-gray-800 py-3 rounded-xl font-bold hover:bg-gray-400 transition"
                            >
                                🎲 Véletlen
                            </button>
                            <button
                                onClick={() => startGame(customChar)}
                                className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-xl font-bold hover:scale-105 transition shadow-lg"
                            >
                                ▶️ Start
                            </button>
                        </div>

                        <button
                            onClick={() => setGameState('menu')}
                            className="w-full mt-3 text-gray-500 py-2 hover:text-gray-700 font-semibold"
                        >
                            ← Vissza
                        </button>
                    </div>
                </div>
            );
        };

        return <CharacterCreator />;
    }

    if (gameState === 'gameOver') {
        return (
            <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
                <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center">
                    <div className="text-8xl mb-4">💀</div>
                    <h2 className="text-4xl font-bold text-gray-800 mb-2">Meghaltál</h2>
                    <p className="text-2xl text-gray-600 mb-8">{age} évesen</p>

                    <div className="bg-gray-100 rounded-2xl p-6 mb-6 text-left">
                        <h3 className="font-bold text-lg mb-3 text-center">Életstatisztikák</h3>
                        <p className="mb-2">💰 Végső vagyon: ${money.toLocaleString()}</p>
                        <p className="mb-2">💼 Foglalkozás: {jobTitle || 'Munkanélküli'}</p>
                        <p className="mb-2">❤️ Kapcsolat: {relationship || 'Egyedül'}</p>
                        <p className="mb-2">🎓 Végzettség: {education || 'Nincs'}</p>
                        <p className="mb-2">🐕 Háziállat: {pet || 'Nincs'}</p>
                    </div>

                    <button
                        onClick={() => setGameState('menu')}
                        className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-4 rounded-2xl text-xl font-bold hover:scale-105 transition shadow-lg"
                    >
                        Új Élet Kezdése
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="h-screen bg-gray-100 flex flex-col overflow-hidden">
            {/* Felsőléc */}
            <div className="bg-orange-500 p-3 flex items-center justify-between flex-shrink-0">
                <div className="flex items-center gap-3">
                    <button onClick={() => setShowSettings(true)} className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                        <Settings size={24} className="text-orange-500" />
                    </button>
                    <div className="w-12 h-12 bg-white rounded-full"></div>
                    <h1 className="text-2xl font-black text-white">LifePath</h1>
                </div>
            </div>

            {/* Profil */}
            <div className="bg-white border-b-4 border-gray-200 p-4 flex-shrink-0">
                <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-16 h-16 bg-gradient-to-br from-orange-300 to-pink-300 rounded-full"></div>
                        <div>
                            <div className="flex items-center gap-2">
                                <span className="text-xl">{character.country.flag}</span>
                                <h2 className="text-xl font-bold text-gray-800">{character.firstName} {character.lastName}</h2>
                            </div>
                            <p 
                                className={`text-sm text-red-500 font-semibold ${job ? 'cursor-pointer hover:underline' : ''}`}
                                onClick={() => job && manageJob()}
                            >
                                {jobTitle || 'Munkanélküli'}
                            </p>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-2xl font-bold text-green-600">${money.toLocaleString()}</p>
                        <p className="text-xs text-gray-500">Egyenleg</p>
                    </div>
                </div>
            </div>

            {/* Eseménynapló */}
            <div ref={eventsRef} className="bg-white p-4 space-y-3 flex-1 overflow-y-auto">
                {events.length === 0 && (
                    <div className="text-center text-gray-400 py-8">
                        <p className="text-lg font-semibold">Üdvözöllek az életben!</p>
                        <p className="text-sm">Nyomd meg a zöld gombot az öregedéshez vagy válassz tevékenységet!</p>
                    </div>
                )}
                {events.map((event, i) => (
                    <div key={i} className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                        <p className="font-semibold text-gray-700 mb-1">Kor: {event.age} év</p>
                        <p className="text-sm text-gray-600">{event.text}</p>
                    </div>
                ))}
            </div>

            {/* Popup ablakok */}
            {showPopup && popupData && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-gradient-to-b from-orange-100 to-white rounded-3xl shadow-2xl max-w-md w-full border-4 border-orange-500 overflow-hidden">
                        <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-4 text-center">
                            <span className="text-sm font-semibold">LifePath</span>
                        </div>
                        <div className="p-6">
                            <h3 className="text-2xl font-bold text-center mb-4">{popupData.title}</h3>
                            <p className="text-center text-gray-700 mb-6 whitespace-pre-wrap">{popupData.description}</p>
                            
                            {popupData.customInput && (
                                <div className="mb-6">
                                    <input
                                        type="number"
                                        value={popupData.inputValue || ''}
                                        onChange={(e) => {
                                            const newValue = e.target.value;
                                            setPopupData(prev => ({
                                                ...prev,
                                                inputValue: newValue
                                            }));
                                            if (popupData.onInputChange) {
                                                popupData.onInputChange(newValue);
                                            }
                                        }}
                                        placeholder="Add meg az összeget"
                                        className="w-full border-2 border-orange-500 rounded-xl p-3 text-lg font-bold"
                                        autoFocus
                                    />
                                </div>
                            )}
                            
                            <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
                                {popupData.options.map((option, i) => (
                                    <button
                                        key={i}
                                        onClick={() => !option.disabled && handleDecision(option)}
                                        disabled={option.disabled}
                                        className={`w-full py-3 rounded-xl font-bold transition text-white ${
                                            option.disabled
                                                ? 'bg-gray-400 cursor-not-allowed'
                                                : 'bg-blue-500 hover:bg-blue-600'
                                        }`}
                                    >
                                        {option.text}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Tevékenység lista */}
            {showActivities && (
                <Overlay title="Tevékenységek" onClose={() => setShowActivities(false)}>
                    <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
                        {activities.map((activity, i) => (
                            <button
                                key={i}
                                onClick={() => activity.action()}
                                className="w-full bg-blue-500 text-white py-3 rounded-xl font-bold hover:bg-blue-600 transition"
                            >
                                {activity.name}
                            </button>
                        ))}
                    </div>
                </Overlay>
            )}

            {/* Új Fülek */}
            {showJobTab && <JobTab />}
            {showWealthTab && <WealthTab />}
            {showRelationTab && <RelationTab />}
            {showSettings && <SettingsTab />}

            {/* Lábléc */}
            <div className="bg-white border-t-4 border-gray-200 flex-shrink-0 z-10">
                <div className="flex justify-around items-center py-2">
                    <button onClick={() => setShowJobTab(true)} className="flex flex-col items-center p-2 text-orange-500 hover:scale-110 transition">
                        <Briefcase size={24} />
                        <span className="text-xs font-semibold mt-1">Munka</span>
                    </button>
                    <button onClick={() => setShowWealthTab(true)} className="flex flex-col items-center p-2 text-blue-500 hover:scale-110 transition">
                        <DollarSign size={24} />
                        <span className="text-xs font-semibold mt-1">Vagyon</span>
                    </button>
                    <button onClick={ageUp} className="relative -mt-8 hover:scale-110 transition">
                        <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center shadow-lg border-4 border-white">
                            <Plus size={40} className="text-white font-bold" />
                        </div>
                        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-red-500 w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold border-2 border-white">
                            {age}
                        </div>
                    </button>
                    <button onClick={() => setShowRelationTab(true)} className="flex flex-col items-center p-2 text-pink-500 hover:scale-110 transition">
                        <Heart size={24} />
                        <span className="text-xs font-semibold mt-1">Kapcsolat</span>
                    </button>
                    <button onClick={() => setShowActivities(true)} className="flex flex-col items-center p-2 text-gray-700 hover:scale-110 transition">
                        <MoreHorizontal size={24} />
                        <span className="text-xs font-semibold mt-1">Több</span>
                    </button>
                </div>

                <div className="px-4 pb-4 pt-2">
                    <StatBar emoji="😊" label="Boldogság" value={happiness} color="bg-yellow-400" />
                    <StatBar emoji="❤️" label="Egészség" value={health} color="bg-red-400" />
                    <StatBar emoji="🧠" label="Okosság" value={smarts} color="bg-green-400" />
                    <StatBar emoji="✨" label="Kinézet" value={looks} color="bg-pink-400" />
                </div>
            </div>
        </div>
    );
};

export default LifePath;
