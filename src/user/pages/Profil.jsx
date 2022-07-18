import React from "react";
import Log from "../../admin/components/Log";

function Profil() {
    return (
        <div className="profil-page">
            <div className="log-container">
                <Log signin={false} signup={true} />
                <div class-name="img-container">
                    <img src="../styles/assets/icon.webp" alt="Logo de Groupomania"></img>
                </div>
            </div>
        </div>
    )
}

export default Profil;