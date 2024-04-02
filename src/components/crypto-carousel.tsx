import {FaAngleDoubleUp, FaRegUserCircle} from "react-icons/fa";

function CryptoCarousel() {
    const carouselItems = Array.from(Array(100).keys());
    return <>
        <div className="currency-carousel">
            <div className="currency-items-container">
                {carouselItems.map((currency, index) => (
                    <div key={index} className="currency-item">
                        <span style={{paddingRight: "5px"}}>#{currency}</span>
                        <span><FaAngleDoubleUp style={{color: "green"}}/></span>
                        <span><FaRegUserCircle/> TRUMP</span>
                    </div>
                ))}
            </div>
        </div>
    </>
}

export default CryptoCarousel