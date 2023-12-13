import { useParams } from "react-router-dom";
import './saying_card.css';


export function Herui_saying_card() {
    const { content } = useParams();
    return (
        <div class="container pt-5">
            <div className="articleCard">
                <h1>“</h1>
                <div class="body">{content}</div>
                <div class="author">——HR</div>
            </div>
        </div>
    )
}