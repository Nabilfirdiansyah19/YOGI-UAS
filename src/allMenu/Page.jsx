import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Inline CSS khusus Page
const pageStyle = `
.page-root {
    --pixel-size: 4;
    
    background-image: linear-gradient(180deg,rgb(243, 149, 26) 0%,rgb(40, 139, 0) 100%);
}
.page-root .Character {
    width: calc(var(--pixel-size) * 32px);
    height: calc(var(--pixel-size) * 32px);
    overflow: hidden;
    position: relative;
    margin: calc(var(--pixel-size) * 6px) auto;
}
@keyframes pageWalkAnimation {
    from { background-position: 0 50; }
    to { background-position: -400px 0; }
}
.page-root .Character_sprite-sheet {
    width: 100px;
    height: 100px;
    position: absolute;
    top: 0;
    left: 15px;
    display: none;
    background-repeat: no-repeat;
    background-size: 400% 390%; 
}
.page-root .Character_sprite-sheet.active {
    display: block;
    animation: pageWalkAnimation 0.6s steps(4) infinite;
}
body {
    margin: 0;
    padding: 0;
    background-image: linear-gradient(180deg,rgb(22, 196, 95) 0%,rgb(19, 151, 107) 100%);
    height: 100%;
    min-height: 100vh;
    padding-top: calc(var(--pixel-size) * 18px);
    font-family: 'Dosis', sans-serif;

    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
}
.page-root .NavigationBubble {
    width: calc(var(--pixel-size) * 3px);
    height: calc(var(--pixel-size) * 3px);
    background: #2497cc;
    border: 0;
    outline: 0;
    cursor: pointer;
    padding: 0;
    margin-left: 0.5em;
    margin-right: 0.5em;
    box-sizing: content-box;
}
.page-root .NavigationBubble.active {
    background: #fff;
}
.page-root .NextSpritesheetButton {
    border: 0;
    background: none;
    padding: 1px;
    top: 450px;
    margin-left: 120px;
    margin-right: 120px;
    position: absolute
}
.page-root .NextSpritesheetButton--prev {
    left: 0;
}
.page-root .NextSpritesheetButton--next {
    right: 0;
}
.page-root .NextSpritesheetButton:hover {
    cursor: pointer;
    background: rgba(240, 236, 18, 0.2);
}
.page-root .NextSpritesheetButton svg {
    display: block;
    width: calc(var(--pixel-size) * 4px);
}
`;

const spritesheets = [
    "/asset/character/char1.png",
    "/asset/character/char2.png",
    "/asset/character/char3.png",
    "/asset/character/char4.png",
    "/asset/character/char5.png",
];

function Page() {
    let navigate = useNavigate()
    const [activeIndex, setActiveIndex] = useState(0);
    const [playerName, setPlayerName] = useState('');

    const handleSetActive = (index) => {
        setActiveIndex(index);
    };

    const handlePrev = () => {
        setActiveIndex(activeIndex > 0 ? activeIndex - 1 : spritesheets.length - 1);
    };

    const handleNext = () => {
        setActiveIndex(activeIndex < spritesheets.length - 1 ? activeIndex + 1 : 0);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (playerName.trim() === "") {
            alert("Silakan masukkan nama sebelum memulai!");
            return;
        }
        localStorage.setItem("playerName", playerName);
        localStorage.setItem("selectedCharacter", spritesheets[activeIndex]);
        localStorage.setItem("money", 100);
        localStorage.setItem("hours", "18");
        localStorage.setItem("minutes", "0");
        localStorage.setItem("day", 1);
        localStorage.setItem("weekDay", "Monday");
        localStorage.setItem("canWalk", "false");
        localStorage.setItem("bath", 50);
        localStorage.setItem("hunger", 50);
        localStorage.setItem("sleeps", 50);
        localStorage.setItem("happiness", 50);
        localStorage.setItem("health", 100);
        localStorage.removeItem("displayedQuests");
        navigate("/indo");
    };

    return (
        <div className='page-root'>
            <style>{pageStyle}</style>
            <div>
                <img src="/asset/character/pesawat.png" className="w-50 m-auto mb-5" alt="Pesawat" />
                <h2 className="font-mono text-center mb-5">UMN - UDIN MENJELAJAH NEGARA</h2>
            </div>
            <div className="text-center p-6 rounded-lg shadow-lg bg-gradient-to-b from-orange-700 to-green-600 h-95 w-full mt-10">
                <div className="flex items-center justify-center mb-4">
                    <main className="Container">
                        <div className="Character">
                            {spritesheets.map((sprite, idx) => (
                                <div
                                    key={sprite}
                                    className={`PixelArtImage Character_sprite-sheet index-${idx} ${activeIndex === idx ? 'active' : ''}`}
                                    style={{
                                        display: activeIndex === idx ? 'block' : 'none',
                                        backgroundImage: `url(${sprite})`,
                                        backgroundRepeat: 'no-repeat',
                                        backgroundSize: '400px 400px',
                                        animation: activeIndex === idx ? 'pageWalkAnimation 0.6s steps(4) infinite' : 'none',
                                    }}
                                />
                            ))}
                        </div>
                        <div className="Navigation flex-center">
                            {spritesheets.map((_, idx) => (
                                <button
                                    key={idx}
                                    className={`NavigationBubble index-${idx} ${activeIndex === idx ? 'active' : ''}`}
                                    type="button"
                                    onClick={() => handleSetActive(idx)}
                                />
                            ))}
                        </div>
                        <button
                            className="NextSpritesheetButton NextSpritesheetButton--prev"
                            type="button"
                            onClick={handlePrev}
                        >
                            <svg viewBox="0 -0.5 4 7" shapeRendering="crispEdges">
                                <path stroke="#434343" d="M3 0h1M2 1h1M1 2h1M0 3h1M1 4h1M2 5h1M3 6h1" />
                            </svg>
                        </button>
                        <button
                            className="NextSpritesheetButton NextSpritesheetButton--next"
                            type="button"
                            onClick={handleNext}
                        >
                            <svg viewBox="0 -0.5 4 7" shapeRendering="crispEdges">
                                <path stroke="#434343" d="M0 0h1M1 1h1M2 2h1M3 3h1M2 4h1M1 5h1M0 6h1" />
                            </svg>
                        </button>
                    </main>
                </div>
                <form id="characterForm" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        id="playerName"
                        placeholder="Enter your name here..."
                        className="w-full p-2 border border-gray-300 rounded mb-4"
                        value={playerName}
                        onChange={e => setPlayerName(e.target.value)}
                    />
                    <button type="submit" className="w-full bg-black text-white py-2 rounded">
                        Start Exploring
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Page;