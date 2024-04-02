import React, {useEffect, useState} from 'react';
import {Stage, Layer, Line} from 'react-konva';
import {FaPlus, FaMinus, FaFire, FaQuestionCircle} from "react-icons/fa";
import {IoIosArrowDown, IoIosArrowUp} from "react-icons/io";


const DrawSection = () => {
    const [lines, setLines] = useState<any>([]);
    const [currentColor, setCurrentColor] = useState('black');
    const [isDrawing, setIsDrawing] = useState(false);
    const [lastPointerPosition, setLastPointerPosition] = useState<any>(null);
    const [mouseScale, setMouseScale] = useState(1);
    const [x0, setX0] = useState(0);
    const [y0, setY0] = useState(0);
    const [draggable, setDraggable] = useState(false);
    const [selectedColor, setSelectedColor] = useState<string>("#232223");
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [selectedWallet, setSelectedWallet] = useState(null);
    console.log(selectedWallet, "AAA")

    useEffect(() => {
        const savedLines = localStorage.getItem('lines');
        if (savedLines) {
            setLines(JSON.parse(savedLines));
        }
    }, []);

    useEffect(() => {
        if (lines.length > 0) {
            localStorage.setItem('lines', JSON.stringify(lines));
        }
    }, [lines]);


    function openModal() {
        setIsOpen(true);
    }
    const handleKeyDown = (e: any) => {
        if (e.ctrlKey && e.key === 'Control') {
            console.log("KeyDown")
            setDraggable(true);
            setIsDrawing(false)
        }
    };

    const handleWalletClick = (wallet:any) => {
        console.log(wallet, "AAAA")
        setSelectedWallet(wallet);
    };

    const handleKeyUp = (e: { key: string }) => {
        if (e.key === 'Control') {
            console.log("KeyUP")
            setDraggable(false);
        }
    };

    const scaleBy = 1.02;
    const handleWheel = (e: any) => {
        e.evt.preventDefault();
        const stage = e.target.getStage();
        const mousePointTo = {
            x: e.evt.clientX / stage.scaleX() - stage.x() / stage.scaleX(),
            y: e.evt.clientY / stage.scaleY() - stage.y() / stage.scaleY()
        };
        const newScale = e.evt.deltaY < 0 ? mouseScale * scaleBy : mouseScale / scaleBy;
        setMouseScale(newScale);
        setX0(-(mousePointTo.x - e.evt.clientX / newScale) * newScale);
        setY0(-(mousePointTo.y - e.evt.clientY / newScale) * newScale);
    };

    const SimulateMouseWheel = (BtnType: any, mScale = scaleBy) => {
        const newScale = BtnType > 0 ? mouseScale * mScale : mouseScale / mScale;
        setMouseScale(newScale);
        const clientWidth = document.documentElement.clientWidth;
        const clientHeight = document.documentElement.clientHeight;
        const newX0 = -(clientWidth / newScale - clientWidth / mouseScale) / 2;
        const newY0 = -(clientHeight / newScale - clientHeight / mouseScale) / 2;
        setX0(newX0);
        setY0(newY0);
    };

    const onClickPlus = () => {
        SimulateMouseWheel(+1, 1.08);
    };

    const onClickMinus = () => {
        SimulateMouseWheel(-1, 1.08);
    };

    const handleMouseDown = (event: any) => {
        if (!draggable) {
            setIsDrawing(true);
        }
        setIsDrawing(true);
        const stage = event.target.getStage();
        const scale = stage.scaleX();
        const pos = stage.getPointerPosition();
        const x = (pos.x - stage.x()) / scale;
        const y = (pos.y - stage.y()) / scale;
        setLastPointerPosition({x, y});
    };

    const handleMouseMove = (event: any) => {
        if (!isDrawing) {
            return;
        }

        if (event.evt.ctrlKey) {
            return;
        }
        const stage = event.target.getStage();
        const scale = stage.scaleX();
        const pos = stage.getPointerPosition();
        const x = (pos.x - stage.x()) / scale;
        const y = (pos.y - stage.y()) / scale;
        setLines([...lines, {points: [lastPointerPosition.x, lastPointerPosition.y, x, y], color: currentColor}]);
        setLastPointerPosition({x, y});
    };

    const handleMouseUp = () => {
        setIsDrawing(false);
    };

    const handleColorChange = (newColor: string) => {
        setCurrentColor(newColor);
        setSelectedColor(newColor)
    };

    const handleZoomChange = (e: any) => {
        const newScale = parseFloat(e.target.value);
        setMouseScale(newScale);
    };

    return (
        <>
            <div onKeyDown={handleKeyDown} onKeyUp={handleKeyUp} tabIndex={0}>
                <div className={"controls-section"}>
                    <span onClick={onClickPlus}><FaPlus/></span>
                    <input
                        type="range"
                        min="0.1"
                        max="3"
                        step="0.1"
                        value={mouseScale}
                        onChange={handleZoomChange}
                    />
                    <span onClick={onClickMinus}><FaMinus/></span>
                </div>
                <Stage
                    width={document.documentElement.clientWidth}
                    height={document.documentElement.clientHeight}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onWheel={handleWheel}
                    scaleX={mouseScale}
                    draggable={draggable}
                    scaleY={mouseScale}
                    x={x0}
                    y={y0}
                >
                    <Layer>
                        {lines.map((line: any, i: number) => (
                            <Line
                                key={i}
                                points={line.points}
                                stroke={line.color}
                                strokeWidth={5}
                                tension={0.5}
                            />
                        ))}
                    </Layer>
                </Stage>
                <div className="colors-picker-section">
                    <div style={{background: "#FEFEFF"}} onClick={() => handleColorChange('#FEFEFF')}
                         className={selectedColor === '#FEFEFF' ? 'selected' : ''}></div>
                    <div style={{background: "#E5E5E4"}} onClick={() => handleColorChange('#E5E5E4')}
                         className={selectedColor === '#E5E5E4' ? 'selected' : ''}></div>
                    <div style={{background: "#898988"}} onClick={() => handleColorChange('#898988')}
                         className={selectedColor === '#898988' ? 'selected' : ''}></div>
                    <div style={{background: "#232223"}} onClick={() => handleColorChange('#232223')}
                         className={selectedColor === '#232223' ? 'selected' : ''}></div>
                    <div style={{background: "#FFA6D0"}} onClick={() => handleColorChange('#FFA6D0')}
                         className={selectedColor === '#FFA6D0' ? 'selected' : ''}></div>
                    <div style={{background: "#E50101"}} onClick={() => handleColorChange('#E50101')}
                         className={selectedColor === '#E50101' ? 'selected' : ''}></div>
                    <div style={{background: "#E49401"}} onClick={() => handleColorChange('#E49401')}
                         className={selectedColor === '#E49401' ? 'selected' : ''}></div>
                    <div style={{background: "#A16A43"}} onClick={() => handleColorChange('#A16A43')}
                         className={selectedColor === '#A16A43' ? 'selected' : ''}></div>
                    <div style={{background: "#E4D901"}} onClick={() => handleColorChange('#E4D901')}
                         className={selectedColor === '#E4D901' ? 'selected' : ''}></div>
                    <div style={{background: "#95E144"}} onClick={() => handleColorChange('#95E144')}
                         className={selectedColor === '#95E144' ? 'selected' : ''}></div>
                    <div style={{background: "#06BF03"}} onClick={() => handleColorChange('#06BF03')}
                         className={selectedColor === '#06BF03' ? 'selected' : ''}></div>
                    <div style={{background: "#05D3DD"}} onClick={() => handleColorChange('#05D3DD')}
                         className={selectedColor === '#05D3DD' ? 'selected' : ''}></div>
                    <div style={{background: "#0282C7"}} onClick={() => handleColorChange('#0282C7')}
                         className={selectedColor === '#0282C7' ? 'selected' : ''}></div>
                    <div style={{background: "#0100E8"}} onClick={() => handleColorChange('#0100E8')}
                         className={selectedColor === '#0100E8' ? 'selected' : ''}></div>
                    <div style={{background: "#C76FE4"}} onClick={() => handleColorChange('#C76FE4')}
                         className={selectedColor === '#C76FE4' ? 'selected' : ''}></div>
                    <div style={{background: "#820181"}} onClick={() => handleColorChange('#820181')}
                         className={selectedColor === '#820181' ? 'selected' : ''}></div>
                    <span>304:695</span>
                    <button onClick={openModal}>Connect wallet</button>
                </div>
            </div>
            <div className="modal" style={{display: modalIsOpen ? "block" : "none"}}>
                <img onClick={() => setIsOpen(!modalIsOpen)} className={"close-modal-btn"} src={require("../../images/wallet-icons/close.png")} alt={"img"}/>
                <h1>Connect wallet</h1>
                <p>Choose one of available wallet providers or<br/> create a new wallet.</p>
                <div className="crypto-wallet">
                    <div style={{marginTop: "20px"}}
                         className={`wallet-card ${selectedWallet === 'Metamask' ? 'selected-wallet' : ''}`}
                         onClick={() => handleWalletClick('Metamask')}>
                        <img src={require("../../images/wallet-icons/metamask.png")} alt={"img"}/>
                        <h4>Metamask</h4>
                    </div>
                    <div className={`wallet-card ${selectedWallet === 'Coinbase' ? 'selected-wallet' : ''}`}
                         onClick={() => handleWalletClick('Coinbase')}>
                        <img src={require("../../images/wallet-icons/coinbase.png")} alt={"img"}/>
                        <h4>Coinbase wallet</h4>
                    </div>
                    <div className={`wallet-card ${selectedWallet === 'Trust' ? 'selected-wallet' : ''}`}
                         onClick={() => handleWalletClick('Trust')}>
                        <img src={require("../../images/wallet-icons/trust.png")} alt={"img"}/>
                        <h4>Trust wallet</h4>
                    </div>
                    <div className={`wallet-card ${selectedWallet === 'Rainbow' ? 'selected-wallet' : ''}`}
                         onClick={() => handleWalletClick('Rainbow')}>
                        <img style={{width: "10.5%"}} src={require("../../images/wallet-icons/rainbow.png")}
                             alt={"img"}/>
                        <h4>Rainbow</h4>
                    </div>
                    <span> Show more  <IoIosArrowDown className={"arrow-style"}/></span>

                </div>
            </div>
        </>
    );
};

export default DrawSection