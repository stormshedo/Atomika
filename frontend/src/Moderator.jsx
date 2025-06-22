import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import axios from "axios";
import ModerLessonList from "./components/ModerLessonList";
const Moderator = (props) => {
    const [lessons, setLessons] = useState(props.lessons);
        return (
            <div>
                <Header />
                <ModerLessonList lessons={lessons} />
            </div>
        )
}

export default Moderator;