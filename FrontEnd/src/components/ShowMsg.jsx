import { useParams } from 'react-router-dom';

import OwnMsg from "./OwnMsg.jsx";
import OthersMsg from "./OthersMsg.jsx";

function ShowMsg(){
    const { username } = useParams();
    // console.log(username);

    return(
        <div className="all-msg">
            {/* <OwnMsg username={username}/> */}
            <OthersMsg username={username}/>
        </div>
    )
}

export default ShowMsg