import { Choix } from "./../../Composant/jsx/comp_choix";

function Back_office() {
    return <>
        <div className="box-back-office">
            <Choix titre={"Gestion RH"} description={"Gérer les cv, les tests et les entretients des candidats"} svg={false} />
        </div>

    </>
}
export default Back_office