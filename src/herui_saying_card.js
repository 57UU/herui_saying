import { useParams } from "react-router-dom";
import './saying_card.css';
import { Route, Routes, Link, useNavigate } from 'react-router-dom';

export function Herui_saying_card() {
    const { content } = useParams();
    return (
        <>

            <div class="container pt-5">
                <Link to="/sayings">
                    <button type="button" className="btn btn-primary btn-lg p-2" >返回</button>
                </Link>
                <div className="articleCard">
                    <h1>“</h1>
                    <div class="body">{content}</div>
                    <div class="author">——HeRui</div>
                </div>
            </div>
        </>

    )
}
