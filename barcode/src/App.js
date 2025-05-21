import React, { useState } from 'react';
import './App.css';
import BarcodeComponent from './components/barcodeComponent';

function App() {
    // Állapotok
    const [raktartipus, setRaktartipus] = useState('E04');
    const [sor, setSor] = useState('01'); // Kezdő sorérték nullával kiegészítve
    const [oszlop, setOszlop] = useState('01'); // Kezdő oszlopérték nullával kiegészítve
    const [emelet, setEmelet] = useState('1'); // Kezdő emeletérték (nincs nullázás)
    const [elvalaszto, setElvalaszto] = useState('/'); // Alapértelmezett "/"
    const [hely, setHely] = useState('1'); // Kezdő helyérték (nincs nullázás)

    // Értékek (1-31 számok, 1-8 emelet, 1-4 hely és A-O betűk)
    const szamok = Array.from({ length: 31 }, (_, i) => (i + 1).toString()); // ['1', ... '31']
    const emeletSzamok = Array.from({ length: 8 }, (_, i) => (i + 1).toString()); // ['1', ..., '8']
    const helySzamok = Array.from({ length: 4 }, (_, i) => (i + 1).toString()); // ['1', ..., '4']
    const betuk = Array.from({ length: 15 }, (_, i) => String.fromCharCode(65 + i)); // ['A', ... 'O']

    // Kezelőfüggvény a raktártípus kiválasztásához
    const handleRaktarTipusChange = (selectedTipus) => {
        setRaktartipus(selectedTipus);

        // Az elválasztó érték automatikus beállítása
        if (selectedTipus === 'LF4' || selectedTipus === 'LF1') {
            setElvalaszto('-');
        } else {
            setElvalaszto('/');
        }
    };

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
                {['E04', 'LF1', 'LF4', 'E03'].map((tipus) => (
                    <button
                        key={tipus}
                        onClick={() => handleRaktarTipusChange(tipus)}
                        style={{
                            margin: '5px',
                            padding: '5px 10px',
                            backgroundColor: raktartipus === tipus ? 'lightgreen' : 'white', // Az aktív típus színe
                            border: '1px solid black',
                            borderRadius: '4px',
                            cursor: 'pointer',
                        }}
                    >
                        {tipus}
                    </button>
                ))}

                <h3>"Sor" kiválasztása:</h3>
                <div>
                    {szamok.map((szam) => (
                        <button
                            key={szam}
                            onClick={() => setSor(szam.padStart(2, '0'))} // Nullával egészítjük ki az értéket, ha szükséges
                            style={{
                                margin: '2px',
                                padding: '5px 10px',
                                backgroundColor: sor === szam.padStart(2, '0') ? 'lightgreen' : 'white',
                                border: '1px solid black',
                                borderRadius: '4px',
                                cursor: 'pointer',
                            }}
                        >
                            {szam.padStart(2, '0')} {/* Gomb feliratának megjelenítése nullázva */}
                        </button>
                    ))}
                    {betuk.map((betu) => (
                        <button
                            key={betu}
                            onClick={() => setSor(betu)}
                            style={{
                                margin: '2px',
                                padding: '5px 10px',
                                backgroundColor: sor === betu ? 'lightgreen' : 'white',
                                border: '1px solid black',
                                borderRadius: '4px',
                                cursor: 'pointer',
                            }}
                        >
                            {betu}
                        </button>
                    ))}
                </div>

                <h3>"Oszlop" kiválasztása:</h3>
                <div>
                    {szamok.map((szam) => (
                        <button
                            key={szam}
                            onClick={() => setOszlop(szam.padStart(2, '0'))} // Nullával egészítjük ki az értéket, ha szükséges
                            style={{
                                margin: '2px',
                                padding: '5px 10px',
                                backgroundColor: oszlop === szam.padStart(2, '0') ? 'lightgreen' : 'white',
                                border: '1px solid black',
                                borderRadius: '4px',
                                cursor: 'pointer',
                            }}
                        >
                            {szam.padStart(2, '0')} {/* Gomb feliratának megjelenítése nullázva */}
                        </button>
                    ))}
                </div>

                <h3>"Emelet" kiválasztása:</h3>
                <div>
                    {emeletSzamok.map((szam) => (
                        <button
                            key={szam}
                            onClick={() => setEmelet(szam)} // Nincs nullázás
                            style={{
                                margin: '2px',
                                padding: '5px 10px',
                                backgroundColor: emelet === szam ? 'lightgreen' : 'white',
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
                            onClick={() => setHely(szam)} // Nincs nullázás
                            style={{
                                margin: '2px',
                                padding: '5px 10px',
                                backgroundColor: hely === szam ? 'lightgreen' : 'white',
                                border: '1px solid black',
                                borderRadius: '4px',
                                cursor: 'pointer',
                            }}
                        >
                            {szam}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default App;