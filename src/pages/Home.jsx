import Taskstodo from "../components/Taskstodo";
import CreateTask from "../components/CreateTask";
import { useEffect, useState } from "react";

function Home(){
    const [refresh,setRefresh] = useState(false);
    return(
        <div className="w-11/12 mx-auto h-fit">
            <CreateTask refresh={refresh} setRefresh={setRefresh} />
            <Taskstodo refresh={refresh} />
        </div>
    );
}

export default Home;