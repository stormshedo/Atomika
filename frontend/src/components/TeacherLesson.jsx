import React from "react";
import Header from "./Header";

class TeacherLesson extends React.Component {
    render() {
        return(
            <div className="py-3 pl-5.5 w-full cursor-pointer" onClick={() => {<Header />}}>
                {this.props.lesson.name}
            </div>
        )
    }
}

export default TeacherLesson;