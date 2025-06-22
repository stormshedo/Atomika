import React from "react";
import Header from "./components/Header";
import StudentLessonList from "./components/StudentLessonList";

class Student extends React.Component {
    render() {
        return(
            <div>
                <Header />
                <StudentLessonList lessons={this.props.lessons} />
            </div>
        )
    }
}

export default Student;