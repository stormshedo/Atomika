import React from "react";
import TeacherLesson from "./TeacherLesson";

class TeacherLessonList extends React.Component {
    render() {
        if(this.props.createdLessons.length > 0) {
            console.log(this.props.createdLessons);
            return (
                <div className="w-4/5 bg-white rounded-3xl mt-16 mx-auto">
                    {this.props.createdLessons.map((lesson) => (
                        <TeacherLesson lesson={lesson} key={(lesson.id)}/>
                    ))}
                </div>
            )
        }
        else {
            return (
                <div>
                    <p>You didn't create any lessons.</p>
                </div>
            )
        }
    }
}

export default TeacherLessonList;