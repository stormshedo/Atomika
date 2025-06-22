import React from 'react';
import Header from './components/Header';
import TeacherLessonList from './components/TeacherLessonList';

class Teacher extends React.Component {
  render() {
    return(
      <div>
        <Header />
        <TeacherLessonList lessons={this.props.lessons} />
      </div>
    )
  }
}

export default Teacher;