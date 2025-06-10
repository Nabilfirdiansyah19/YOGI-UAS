import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Map() {
    // Inline CSS khusus Map
    const mapStyle = `
    @layer utilities {
        @media(min-width: 300px) {
            #indoMap {
                position: absolute;
                    width: 90px;
                    margin-top: 150px;
                    transform: translate(-50%, -50%);
                    transition: transform 0.3s ease;
                }

                #franceMap {
                    position: absolute;
                    width: 90px;
                    margin-left: 150px;
                    transform: translate(-50%, -50%);
                    transition: transform 0.3s ease;
                }

                #japanMap {
                    position: absolute;
                    width: 90px;
                    margin-top: -150px;
                    transform: translate(-50%, -50%);
                    transition: transform 0.3s ease;
                }

                #mesirMap {
                    position: absolute;
                    width: 90px;
                    margin-left: -150px;
                    transform: translate(-50%, -50%);
                    transition: transform 0.3s ease;
                }

                #usaMap {
                    position: absolute;
                    width: 90px;
                    margin-left: 4px;
                    transform: translate(-50%, -50%);
                    transition: transform 0.3s ease;
                }
                .description {
                    position: absolute;
                    top: 100%;
                    left: 50%;
                    transform: translate(-50%, 10px);
                    display: none;
                    background-color: rgba(0, 0, 0, 0.8);
                    color: white;
                    padding: 10px;
                    border-radius: 5px;
                    text-align: center;
                    z-index: 10;
                    white-space: nowrap;
                    font-size: 5px;
                }
            }

            @media(min-width: 900px) {
                #indoMap {
                    position: absolute;
                    width: 250px;
                    margin-top: 250px;
                    transform: translate(-50%, -50%);
                    transition: transform 0.3s ease;
                }

                #franceMap {
                    position: absolute;
                    width: 250px;
                    margin-left: 300px;
                    transform: translate(-50%, -50%);
                    transition: transform 0.3s ease;
                }

                #japanMap {
                    position: absolute;
                    width: 250px;
                    margin-top: -280px;
                    transform: translate(-50%, -50%);
                    transition: transform 0.3s ease;
                }

                #mesirMap {
                    position: absolute;
                    width: 250px;
                    margin-left: -380px;
                    transform: translate(-50%, -50%);
                    transition: transform 0.3s ease;
                }

                #usaMap {
                    position: absolute;
                    width: 350px;
                    margin-left: -10px;
                    transform: translate(-50%, -50%);
                    transition: transform 0.3s ease;
                }

                .description {
                    position: absolute;
                    top: 100%;
                    left: 50%;
                    transform: translate(-50%, 10px);
                    display: none;
                    background-color: rgba(0, 0, 0, 0.8);
                    color: white;
                    padding: 10px;
                    border-radius: 5px;
                    text-align: center;
                    z-index: 10;
                    white-space: nowrap;
                    font-size: 15px;
                }
            }

            @media(min-width: 1900px) {
                #indoMap {
                    position: absolute;
                    width: 350px;
                    margin-top: 380px;
                    transform: translate(-50%, -50%);
                    transition: transform 0.3s ease;
                }
                #franceMap {
                    position: absolute;
                    width: 350px;
                    margin-left: 450px;
                    transform: translate(-50%, -50%);
                    transition: transform 0.3s ease;
                }
                #japanMap {
                    position: absolute;
                    width: 350px;
                    margin-top: -320px;
                    transform: translate(-50%, -50%);
                    transition: transform 0.3s ease;
                }
                #mesirMap {
                    position: absolute;
                    width: 350px;
                    margin-left: -500px;
                    transform: translate(-50%, -50%);
                    transition: transform 0.3s ease;
                }
                #usaMap {
                    position: absolute;
                    width: 350px;
                    margin-left: -20px;
                    transform: translate(-50%, -50%);
                    transition: transform 0.3s ease;
                }
                .description {
                    position: absolute;
                    top: 100%;
                    left: 50%;
                    transform: translate(-50%, 10px);
                    display: none;
                    background-color: rgba(0, 0, 0, 0.8);
                    color: white;
                    padding: 10px;
                    border-radius: 5px;
                    text-align: center;
                    z-index: 10;
                    white-space: nowrap;
                    font-size: 20px;
                }
            }
        }

        .map-root{
            height: 1100px;
        }

        .flag:hover {
            transform: scale(1.2) translate(-50%, -50%);
        }

        .flag:hover .description {
            display: block;
        }
    `;
    const [happiness, setHappiness] = useState(() => Number(localStorage.getItem("happiness")) || 50);
    const [money, setMoney] = useState(() => Number(localStorage.getItem("money")) || 100);
    function handleMapClick(cost) {
        setHappiness(prev => {
            const newVal = Math.min(prev + 30, 100);
            localStorage.setItem("happiness", newVal);
            return newVal;
        });
        setMoney(prev => {
            const newVal = prev - cost;
            localStorage.setItem("money", newVal);
            return newVal;
        });
    }
    return (
        <>
            <style>{mapStyle}</style>
            <div className="bg-gray-800 flex justify-center items-center h-screen map-root">
                <div className="relative">
                    <Link to="/Indo" id="indoMap" className="flag" onClick={() => handleMapClick(0)}>
                        <img src="/asset/map/indoFlag.png" />
                        <div className="description">
                            <h1>Pulang ke Indonesia tidak akan mengeluarkan biaya apa apa</h1>
                        </div>
                    </Link>
                    <Link to="/France" id="franceMap" className="flag" onClick={() => handleMapClick(15)}>
                        <img src="/asset/map/franceFlag.png" />
                        <div className="description">
                            <h1>Trip ke Prancis akan mengeluarkan biaya sebesar $15</h1>
                        </div>
                    </Link>
                    <Link to="/Japan" id="japanMap" className="flag" onClick={() => handleMapClick(30)}>
                        <img src="/asset/map/japanFlag.png" />
                        <div className="description">
                            <h1>Trip ke Jepang akan mengeluarkan biaya sebesar $30</h1>
                        </div>
                    </Link>
                    <Link to="/Mesir" id="mesirMap" className="flag" onClick={() => handleMapClick(20)}>
                        <img src="/asset/map/mesirFlag.png" />
                        <div className="description">
                            <h1>Trip ke Mesir akan mengeluarkan biaya sebesar $20</h1>
                        </div>
                    </Link>
                    <Link to="/USA" id="usaMap" className="flag" onClick={() => handleMapClick(15)}>
                        <img src=".//asset/map/usaFlag.png" />
                        <div className="description">
                            <h1>Trip ke USA akan mengeluarkan biaya sebesar $15</h1>
                        </div>
                    </Link>
                </div>
            </div>
        </>
    );
}

export default Map;