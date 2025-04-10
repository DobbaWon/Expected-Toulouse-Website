import "./History.css";
import history from "./history.json";

function History() {
    return (
        <div className="container">
            <div className="paragraph-one">
                <img src="" className="image-one"/>
                <p className="text-one">{history.paragraph_one}</p>
            </div>

            <div className="paragraph-two">
                <p className="text-two">{history.paragraph_two}</p>
                <img src="" className="image-two"/>
            </div>

            <div className="paragraph-three">
                <img src="" className="image-three"/>
                <p className="text-three">{history.paragraph_three}</p>
            </div>
        </div>
    );
}

export default History;