import React from "react";

class Header extends React.Component {
    render() {
        return(
            <header className="flex justify-center items-center my-7.5">
                <div className="w-[264px] bg-white rounded-full">
                    <p className="text-atomika font-semibold text-4xl pt-1 pb-2 font-gilroy text-center">atomika</p>
                </div>
            </header>
        )
    }
}

export default Header;