import React, { useState } from 'react';
import './App.css';
import BarcodeComponent from './components/barcodeComponent';

function App() {
    // Állapotok
    const [raktartipus, setRaktartipus] = useState('E04');
    const [sor, setSor] = useState('01');
    const [oszlop, setOszlop] = useState('01');
    const [emelet, setEmelet] = useState('1');
    const [elvalaszto, setElvalaszto] = useState('/');
    const [hely, setHely] = useState('1');

    // Értékek
    const szamok = Array.from({ length: 31 }, (_, i) => (i + 1).toString());
    const emeletSzamok = Array.from({ length: 8 }, (_, i) => (i + 1).toString());
    const oszlopSzamok = Array.from({ length: 14 }, (_, i) => (i + 1).toString());

    // Dinamikus hely értékek: ha E04 és emelet 2, akkor 1-16, egyébként 1-4
    const getHelySzamok = () => {
        if (raktartipus === 'E04' && emelet === '2') {
            return Array.from({ length: 16 }, (_, i) => (i + 1).toString()); // 1-16
        } else {
            return Array.from({ length: 4 }, (_, i) => (i + 1).toString()); // 1-4
        }
    };

    const helySzamok = getHelySzamok();

    // Kezelőfüggvény a raktártípus kiválasztásához
    const handleRaktarTipusChange = (selectedTipus) => {
        setRaktartipus(selectedTipus);

        // Az elválasztó érték automatikus beállítása
        if (selectedTipus === 'LF4') {
            setElvalaszto('-');
        } else {
            setElvalaszto('/');
        }
    };

    // Emelet váltás kezelése - ha nem E04 2. emelet, és a hely > 4, akkor visszaállítjuk 1-re
    const handleEmeletChange = (newEmelet) => {
        setEmelet(newEmelet);

        // Ha nem E04 2. emelet, és a hely nagyobb mint 4, visszaállítjuk
        if (!(raktartipus === 'E04' && newEmelet === '2') && parseInt(hely) > 4) {
            setHely('1');
        }
    };

    // Ellenőrizzük, hogy Csomagoló van-e kiválasztva
    const isCsomagolo = raktartipus === 'Csomagoló';

    return (
        <div className="Container">
            {/* Barkód komponens */}
            <BarcodeComponent
                raktartipus={raktartipus}
                sor={sor}
                oszlop={oszlop}
                emelet={emelet}
                elvalaszto={elvalaszto}
                hely={hely}
            />

            {/* Irányító gombok */}
            <div className="Controls">
                <h3>Raktártípus kiválasztása:</h3>
                {['E04', 'LF4', 'Csomagoló'].map((tipus) => (
                    <button
                        key={tipus}
                        onClick={() => handleRaktarTipusChange(tipus)}
                        style={{
                            margin: '5px',
                            padding: '5px 10px',
                            backgroundColor: raktartipus === tipus ? 'whitesmoke' : '#ec671c',
                            border: '1px solid black',
                            borderRadius: '4px',
                            cursor: 'pointer',
                        }}
                    >
                        {tipus}
                    </button>
                ))}

                {/* Kontroll gombok csak akkor jelennek meg, ha NEM Csomagoló van kiválasztva */}
                {!isCsomagolo && (
                    <>
                        <h3>"Sor" kiválasztása:</h3>
                        <div>
                            {szamok.map((szam) => (
                                <button
                                    key={szam}
                                    onClick={() => setSor(szam.padStart(2, '0'))}
                                    style={{
                                        margin: '2px',
                                        padding: '5px 10px',
                                        backgroundColor: sor === szam.padStart(2, '0') ? 'whitesmoke' : '#ec671c',
                                        border: '1px solid black',
                                        borderRadius: '4px',
                                        cursor: 'pointer',
                                    }}
                                >
                                    {szam.padStart(2, '0')}
                                </button>
                            ))}
                        </div>

                        <h3>"Oszlop" kiválasztása:</h3>
                        <div>
                            {oszlopSzamok.map((szam) => (
                                <button
                                    key={szam}
                                    onClick={() => setOszlop(szam.padStart(2, '0'))}
                                    style={{
                                        margin: '2px',
                                        padding: '5px 10px',
                                        backgroundColor: oszlop === szam.padStart(2, '0') ? 'whitesmoke' : '#ec671c',
                                        border: '1px solid black',
                                        borderRadius: '4px',
                                        cursor: 'pointer',
                                    }}
                                >
                                    {szam.padStart(2, '0')}
                                </button>
                            ))}
                        </div>

                        <h3>"Emelet" kiválasztása:</h3>
                        <div>
                            {emeletSzamok.map((szam) => (
                                <button
                                    key={szam}
                                    onClick={() => handleEmeletChange(szam)}
                                    style={{
                                        margin: '2px',
                                        padding: '5px 10px',
                                        backgroundColor: emelet === szam ? 'whitesmoke' : '#ec671c',
                                        border: '1px solid black',
                                        borderRadius: '4px',
                                        cursor: 'pointer',
                                    }}
                                >
                                    {szam}
                                </button>
                            ))}
                        </div>

                        <h3>"Hely" kiválasztása:</h3>
                        <div>
                            {helySzamok.map((szam) => (
                                <button
                                    key={szam}
                                    onClick={() => setHely(szam)}
                                    style={{
                                        margin: '2px',
                                        padding: '5px 10px',
                                        backgroundColor: hely === szam ? 'whitesmoke' : '#ec671c',
                                        border: '1px solid black',
                                        borderRadius: '4px',
                                        cursor: 'pointer',
                                    }}
                                >
                                    {szam}
                                </button>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default App;