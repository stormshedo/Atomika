import React from 'react';
import Header from './components/Header';
import TeacherLessonList from './components/TeacherLessonList';

class Teacher extends React.Component {
  constructor(props) {
    super(props)
    
    this.state = {
      createdLessons: [
        {
          id: 0,
          name: "Lesson1"
        },
        {
          id:1,
          name: "Lesson2"
        }
      ]
    }
  }

  render() {
    return(
      <div>
        <Header />
        <TeacherLessonList createdLessons={this.state.createdLessons} />
      </div>
    )
  }
}

export default Teacher;