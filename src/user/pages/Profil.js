import React from "react";
import Log from "../../admin/components/Log";

const Profil = () => {
    return (
        <div className="profil-page">
            <div className="log-container">
                <Log />
                <div class-name="img-container">
                    <img src="./assets/icon.webp" alt="Logo de Groupomania"></img>
                </div>
            </div>
        </div>
    )
}

export default Profil;