import React, { use, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Controller from '../components/Controller';
import DisplayDate from "../components/DisplayDate";
import Buttons from "../components/buttons";
import Status from "../components/status";
import './USA.css';

const directions = {
    up: "up",
    down: "down",
    left: "left",
    right: "right",
};

function USA() {
    let Navigate = useNavigate();
    const selectedCharacter = localStorage.getItem("selectedCharacter");
    const [showMapButton, setShowMapButton] = useState(false);
    const [showMandiButton, setShowMandiButton] = useState(false);
    const [showFotoButton, setShowFotoButton] = useState(false);
    const [showDriverButton, setShowDriverButton] = useState(false);
    const [showMakanButton, setShowMakanButton] = useState(false);

    const [position, setPosition] = useState({ x: 10, y: 180 });
    const [facing, setFacing] = useState("down");
    const [walking, setWalking] = useState(false);
    const [heldDirections, setHeldDirections] = useState([]);
    const speed = 1;

    const [money, setMoney] = useState(() => Number(localStorage.getItem("money")) || 100);
    const [bath, setBath] = useState(() => Number(localStorage.getItem("bath")) || 50);
    const [hunger, setHunger] = useState(() => Number(localStorage.getItem("hunger")) || 50);
    const [sleep, setSleep] = useState(() => Number(localStorage.getItem("sleeps")) || 50);
    const [happiness, setHappiness] = useState(() => Number(localStorage.getItem("happiness")) || 50);
    const [health, setHealth] = useState(() => Number(localStorage.getItem("health")) || 50);
    const [displayedQuests, setDisplayedQuests] = useState([]);
    const [showFoods, setShowFoods] = useState(false);

    const [isGameOver, setIsGameOver] = useState(false);
    const [gameOverReason, setGameOverReason] = useState("");

    // Black screen state
    const [showBlackScreen, setShowBlackScreen] = useState(false);
    function triggerBlackScreen(duration = 1000, callback) {
        setShowBlackScreen(true);
        setTimeout(() => {
            setShowBlackScreen(false);
            if (callback) callback();
        }, duration);
    }

    // Refs for animation
    const positionRef = useRef(position);
    const heldDirectionsRef = useRef(heldDirections);

    useEffect(() => {
        heldDirectionsRef.current = heldDirections;
    }, [heldDirections]);

    useEffect(() => {
        positionRef.current = position;
    }, [position]);

    // Animation loop
    useEffect(() => {
        let animationFrameId;
        const step = () => {
            let { x, y } = positionRef.current;
            const held_direction = heldDirectionsRef.current[0];
            let moved = false;
            if (held_direction) {
                if (held_direction === directions.right) x += speed;
                if (held_direction === directions.left) x -= speed;
                if (held_direction === directions.down) y += speed;
                if (held_direction === directions.up) y -= speed;
                setFacing(held_direction);
                setWalking(true);
                moved = true;
            } else {
                setWalking(false);
            }
            // WALL LIMIT
            const leftLimit = -5;
            const rightLimit = 960;
            const topLimit = 130;
            const bottomLimit = 225;
            if (x < leftLimit) x = leftLimit;
            if (x > rightLimit) x = rightLimit;
            if (y < topLimit) y = topLimit;
            if (y > bottomLimit) y = bottomLimit;
            if (moved) setPosition({ x, y });
            positionRef.current = { x, y };
            animationFrameId = window.requestAnimationFrame(step);
        };
        animationFrameId = window.requestAnimationFrame(step);
        return () => window.cancelAnimationFrame(animationFrameId);
    }, []);

    const pixelSize = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--pixel-size')) || 2;
    const camera_left = pixelSize * 66;
    const camera_top = pixelSize * 42;
    const mapStyle = {
        transform: `translate3d(${-position.x * pixelSize + camera_left}px, ${-position.y * pixelSize + camera_top}px, 0)`
    };
    const characterStyle = {
        transform: `translate3d(${position.x * pixelSize}px, ${position.y * pixelSize}px, 0)`
    };

    //=====================================STATUS BAR=========================================
    useEffect(() => {
        if (health <= 0) {
            setGameOverReason("Game Over! Kamu Mati!!!");
            setShowBlackScreen(true);
            setTimeout(() => {
                setIsGameOver(true);
                setShowBlackScreen(false);
            }, 1000);
            localStorage.setItem("money", 20);
        } else if (money < 0) {
            setGameOverReason("Game Over! Uang kamu habis!!!");
            setShowBlackScreen(true);
            setTimeout(() => {
                setIsGameOver(true);
                setShowBlackScreen(false);
            }, 1000);
            localStorage.setItem("money", 50);
        }
    }, [health, money]);
    useEffect(() => {
        const bathInterval = setInterval(() => {
            setBath(prev => {
                const newVal = Math.max(prev - 1, 0);
                localStorage.setItem("bath", newVal);
                return newVal;
            });
        }, 2000);
        return () => clearInterval(bathInterval);
    }, []);
    useEffect(() => {
        const sleepInterval = setInterval(() => {
            setSleep(prev => {
                const newVal = Math.max(prev - 1, 0);
                localStorage.setItem("sleeps", newVal);
                return newVal;
            });
        }, 3000);
        return () => clearInterval(sleepInterval);
    }, []);
    useEffect(() => {
        const happinessInterval = setInterval(() => {
            setHappiness(prev => {
                const newVal = Math.max(prev - 1, 0);
                localStorage.setItem("happiness", newVal);
                return newVal;
            });
        }, 3000);
        return () => clearInterval(happinessInterval);
    }, []);
    useEffect(() => {
        const hungerInterval = setInterval(() => {
            setHunger(prev => {
                const newVal = Math.max(prev - 1, 0);
                localStorage.setItem("hunger", newVal);
                return newVal;
            });
        }, 1500);
        return () => clearInterval(hungerInterval);
    }, []);
    useEffect(() => {
        let intervalTime = 1400;
        if (sleep === 0 || bath === 0) {
            intervalTime = 700;
        }
        const happinessInterval = setInterval(() => {
            setHappiness(prev => {
                const newVal = Math.max(prev - 1, 0);
                localStorage.setItem("happiness", newVal);
                return newVal;
            });
        }, intervalTime);
        return () => clearInterval(happinessInterval);
    }, [sleep, bath]);
    useEffect(() => {
        const healthInterval = setInterval(() => {
            setHealth(prev => {
                let newHealth = prev;
                if (hunger === 0 || happiness === 0) {
                    newHealth = Math.max(prev - 1, 0);
                } else if (hunger > 60 && happiness > 60) {
                    newHealth = Math.min(prev + 1, 100);
                }
                localStorage.setItem("health", newHealth);
                return newHealth;
            });
        }, 100);
        return () => clearInterval(healthInterval);
    }, [hunger, happiness]);

    //QUESTS
    useEffect(() => {
        const savedQuests = localStorage.getItem("displayedQuests");
        if (savedQuests) {
            setDisplayedQuests(JSON.parse(savedQuests));
        }
    }, []);

    // ============================================FOTO BUTTON===============================================
    function handleFotoClick() {
        const questIdx = displayedQuests.findIndex(q => q.action === "fotoUSA");
        triggerBlackScreen(1500, () => {
            if (questIdx !== -1) {
                const newQuests = [...displayedQuests];
                newQuests.splice(questIdx, 1);
                setDisplayedQuests(newQuests);
                setMoney(prevMoney => prevMoney + 30);
                localStorage.setItem("money", money + 30);
                localStorage.setItem("displayedQuests", JSON.stringify(newQuests));
                alert("Kamu sedang foto foto didepan Patung Liberty");
                alert("Quest foto di Patung Liberty berhasil diselesaikan!!!");
            } else {
                alert("Kamu sedang foto foto didepan Patung Liberty");
            }
        });
    }
    useEffect(() => {
        const fotoX = 920;
        const fotoY = 110;
        const range = 35;
        if (Math.abs(position.x - fotoX) < range && Math.abs(position.y - fotoY) < range) {
            setShowFotoButton(true);
        } else {
            setShowFotoButton(false);
        }
    }, [position]);
    useEffect(() => {
        function handleKeyDown(event) {
            if (event.key === "Enter" && showFotoButton) {
                handleFotoClick();
            }
        }
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [showFotoButton]);

    //======================================MANDI BUTTON========================================\
    function handleMandiClick() {
        const questIdx = displayedQuests.findIndex(q => q.action === "mandiUSA");
        let shower = 100;
        setBath(bath + shower);
        localStorage.setItem("bath", bath + shower);
        triggerBlackScreen(1500, () => {
            if (questIdx !== -1) {
                const newQuests = [...displayedQuests];
                newQuests.splice(questIdx, 1);
                setDisplayedQuests(newQuests);
                setMoney(prevMoney => prevMoney + 25);
                localStorage.setItem("money", money + 25);
                localStorage.setItem("displayedQuests", JSON.stringify(newQuests));
                alert("Kamu sedang mandi di hotel yang berhantu");
                alert("Quest mandi di hotel berpenghuni lt.4 berhasil diselesaikan!!!");
            } else {
                alert("Kamu sedang mandi di hotel yang berhantu");
            }
        });
    }
    useEffect(() => {
        const mandiX = 400;
        const mandiY = 135;
        const range = 15;
        if (Math.abs(position.x - mandiX) < range && Math.abs(position.y - mandiY) < range) {
            setShowMandiButton(true);
        } else {
            setShowMandiButton(false);
        }
    }, [position]);
    useEffect(() => {
        function handleKeyDown(event) {
            if (event.key === "Enter" && showMandiButton) {
                handleMandiClick();
            }
        }
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [showMandiButton]);


    // ====================================MAKAN BUTTON=========================================
    const foods = [
        { name: "Mac & Cheese", cost: "$15", harga: 15, addBar: 50 },
        { name: "Fish & Chip", cost: "$17", harga: 17, addBar: 50 },
        { name: "Steak", cost: "$19", harga: 19, addBar: 50 }
    ];
    function MakanClicked() {
        setShowFoods(true);
    }
    function handleMakan(food) {
        const questIdx = displayedQuests.findIndex(q => q.action === "makanUSA");
        triggerBlackScreen(1500, () => {
            setShowFoods(false);
            setHunger(prev => Math.min(prev + food.addBar, 100));
            setMoney(prevMoney => prevMoney - food.harga);
            localStorage.setItem("hunger", hunger + food.addBar);
            localStorage.setItem("money", money - food.harga);
            if (questIdx !== -1) {
                const newQuests = [...displayedQuests];
                newQuests.splice(questIdx, 1);
                setDisplayedQuests(newQuests);
                setMoney(prevMoney => prevMoney + 10);
                localStorage.setItem("money", money + 10);
                localStorage.setItem("displayedQuests", JSON.stringify(newQuests));
                alert(`Kamu sedang makan ${food.name}`);
                alert("Quest Makan MAHALL di USA berhasil diselesaikan!!!");

            } else {
                alert(`Kamu sedang makan ${food.name}`);
            }
        });
    }
    useEffect(() => {
        const makanX = 175;
        const makanY = 135;
        const range = 10;
        if (Math.abs(position.x - makanX) < range && Math.abs(position.y - makanY) < range) {
            setShowMakanButton(true);
        } else {
            setShowMakanButton(false);
            setShowFoods(false);
        }
    }, [position]);
    useEffect(() => {
        function handleKeyDown(event) {
            if (event.key === "Enter" && showMakanButton) {
                MakanClicked();
            }
        }
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [showMakanButton]);


    //======================================MAP BUTTON======================================
    useEffect(() => {
        const mapX = 970;
        const mapY = 195;
        const range = 40;
        if (Math.abs(position.x - mapX) < range && Math.abs(position.y - mapY) < range) {
            setShowMapButton(true);
        } else {
            setShowMapButton(false);
        }
    }, [position]);
    useEffect(() => {
        function handleKeyDown(event) {
            if (event.key === "Enter" && showMapButton) {
                handleMapClick();
            }
        }
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [showMapButton]);
    function handleMapClick() {
        triggerBlackScreen(1000, () => {
            Navigate('/map');
        });
    }
    // ============================================DRIVER BUTTON===============================================
    function handleDriverClick() {
        const questIdx = displayedQuests.findIndex(q => q.action === "driverUSA");
        triggerBlackScreen(1500, () => {
            if (questIdx !== -1) {
                const newQuests = [...displayedQuests];
                newQuests.splice(questIdx, 1);
                setDisplayedQuests(newQuests);
                setMoney(prevMoney => prevMoney + 20);
                localStorage.setItem("money", money + 20);
                localStorage.setItem("displayedQuests", JSON.stringify(newQuests));
                alert("Kamu sedang mengemudi di U.S. Route 66");
                alert("Quest mengemudi di U.S. Route 66 berhasil diselesaikan!!!");
            } else {
                alert("Kamu sedang mengemudi di U.S. Route 66");
            }
        });
    }
    useEffect(() => {
        const driverX = 230;
        const driverY = 135;
        const range = 25;
        if (Math.abs(position.x - driverX) < range && Math.abs(position.y - driverY) < range) {
            setShowDriverButton(true);
        } else {
            setShowDriverButton(false);
        }
    }, [position]);
    useEffect(() => {
        function handleKeyDown(event) {
            if (event.key === "Enter" && showDriverButton) {
                handleDriverClick();
            }
        }
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [showDriverButton]);



    return (
        <>
            <audio src="/asset/musik/musicUSA.mp3" autoPlay loop controls style={{ display: "none" }} />
            {isGameOver ? (
                <div className="gameover-modal">
                    <div className="gameover-content">
                        <img src="/asset/iconBar/gameOver.png" alt="Game Over" className="gameover-img" />
                        <div className="gameover-reason">{gameOverReason}</div>
                        <div style={{ display: "flex", gap: 16, justifyContent: "center" }}>
                            <button onClick={() => window.location.href = "/"}>Back to Main Menu</button>
                            <button onClick={() => window.location.reload()}>Restart Check Point</button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="usa-root">
                    <div className={`black-screen${showBlackScreen ? " show" : ""}`} id="blackScreen"></div>
                    <div className="frame">
                        <div className="camera">
                            <div className="usa-map pixel-art" style={mapStyle}>
                                <div>
                                    <div className="character" facing={facing} walking={walking ? "true" : "false"} style={characterStyle}>
                                        <div className="shadow pixel-art"></div>
                                        <div className="character_spritesheet pixel-art" style={{ backgroundImage: `url('${selectedCharacter}')` }}
                                        ></div>
                                    </div>
                                    <div id="quest-display">
                                        <h3>Quests List</h3>
                                        <ul id="quest-list">
                                            {displayedQuests.length === 0 ? (
                                                <li>Tidak ada quest aktif.</li>
                                            ) : (
                                                displayedQuests.map((quest, idx) => (
                                                    <li key={idx}>
                                                        {quest.name}
                                                        <span
                                                            className="info-quest"
                                                            data-info={`Kamu akan mendapatkan $${quest.gaji}`}
                                                            style={{ marginLeft: 8, cursor: "pointer" }}
                                                        >
                                                            (i)
                                                        </span>
                                                    </li>
                                                ))
                                            )}
                                        </ul>
                                    </div>
                                    <Status bath={bath} hunger={hunger} sleep={sleep} happiness={happiness} health={health} money={money} />
                                    <DisplayDate />
                                    <div className="button-map">{showMapButton && (<Buttons value="Map" className="map-button" onClick={handleMapClick} />)}</div>
                                    <div className="button-driver">{showDriverButton && (<Buttons value="Driver" className={"driver-button"} onClick={handleDriverClick} />)}</div>
                                    <div className="button-foto">{showFotoButton && (<Buttons value="Patung Liberty" className="foto-button" onClick={handleFotoClick} />)}</div>
                                    <div className="button-mandi">{showMandiButton && (<Buttons value="Mandi" className={"mandi-button"} onClick={handleMandiClick} />)}</div>
                                    <div className="button-makan">{showMakanButton && (<Buttons value="Makan" className={"makan-button"} onClick={MakanClicked} />)}</div>
                                    {showFoods && (
                                        <div id="makanOptions" className="usa-makan-options">
                                            {foods.map((food, index) => (
                                                <button key={index} onClick={() => handleMakan(food)} style={{ marginBottom: 8, position: "relative" }} >
                                                    {food.name}
                                                    <span className="info-icon" data-cost={`Harga: ${food.cost}`} style={{ marginLeft: 8, cursor: "pointer" }}>(i)</span>
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <Controller onDirectionChange={setHeldDirections} />
                </div>
            )}

        </>
    );
}

export default USA;