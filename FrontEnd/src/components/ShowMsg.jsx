import OwnMsg from "./OwnMsg.jsx";
import OthersMsg from "./OthersMsg.jsx";

function ShowMsg(){
    return(
        <div className="all-msg">
            {/* <OwnMsg /> */}
            <OthersMsg/>
        </div>
    )
}

export default ShowMsg