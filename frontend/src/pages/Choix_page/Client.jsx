import { Choix } from "./../../Composant/jsx/comp_choix";
function Client() {
    return <>
        <div className="box-client">
            <Choix titre={"CV"} description={"Veuillez deposer votre CV"} svg={true}/>
        </div>
    </>
}
export default Client


