import LeftSideBar from "@/components/leftsidebar";
import { useState } from "react";


const Home = () => {

    return (
        <section className="bg-slate-200 h-full w-full flex gap-x-1 p-1 rounded">

            {/* //! left sidebar */}
            <div className="w-1/4 rounded p-1 bg-slate-50">
                <LeftSideBar />
            </div>

            {/* //! main container */}
            <div className="w-1/2 rounded p-1">2</div>

            {/* //! right sidebar */}
            <div className="w-1/4 rounded p-1 bg-slate-50">3</div>
        </section>
    );
}

export default Home;