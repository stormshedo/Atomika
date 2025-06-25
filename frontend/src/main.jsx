import { useState, useEffect } from "react";
import * as ReactDOMClient from "react-dom/client";
import App from "./App";
import "./index.css";
import Header from "./components/Header";
import NotFoundPage from "./NotFoundPage";
import Teacher from "./Teacher";
import Moderator from "./Moderator";
import Student from "./Student";
import TeacherLesson from "./TeacherLesson";
import TeacherCreate from "./TeacherCreate";
import TeacherPreview from "./TeacherPreview";
import TeacherEdit from "./TeacherEdit";
import StudentLesson from "./StudentLesson";
import ModerLesson from "./ModerLesson";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import './i18n';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

const Main = () => {
    const { t } = useTranslation();
  
  const [lessons, setLessons] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refresh, setRefresh] = useState(0);

  const [lessonsM, setLessonsM] = useState(null);
  const [loadingM, setLoadingM] = useState(true);
  const [errorM, setErrorM] = useState(null);
  const [refreshM, setRefreshM] = useState(0);

  const [lessonsS, setLessonsS] = useState(null);
  const [loadingS, setLoadingS] = useState(true);
  const [errorS, setErrorS] = useState(null);
  const [refreshS, setRefreshS] = useState(0);

  useEffect(() => {
    axios.get('https://0a43-90-156-165-231.ngrok-free.app/lessons/approved', {
      headers: { "ngrok-skip-browser-warning": 435346 }
    })
    .then(response => {
      setLessonsS(response.data);
      setLoadingS(false);
    })
    .catch(error => {
      setErrorS(error);
      setLoadingS(false);
    });
  }, [refreshS]);

  const refetchLessons = async () => {
    setLoading(true);
    try {
        const res = await axios.get('https://0a43-90-156-165-231.ngrok-free.app/lessons/', {
          headers: { "ngrok-skip-browser-warning": 435346 }
        });
        setLessons(res.data);
    } catch (err) {
        setError(err);
    } finally {
        setLoading(false);
    }
    };

    useEffect(() => {
    refetchLessons();
    }, []);

  // useEffect(() => {
  //   axios.get('https://0a43-90-156-165-231.ngrok-free.app/lessons/', {
  //     headers: { "ngrok-skip-browser-warning": 435346 }
  //   })
  //   .then(response => {
  //     setLessons(response.data);
  //     setLoading(false);
  //   })
  //   .catch(error => {
  //     setError(error);
  //     setLoading(false);
  //   });
  // }, [refresh]);

  const refetchLessonsM = async () => {
    setLoadingM(true);
    try {
        const res = await axios.get('https://0a43-90-156-165-231.ngrok-free.app/lessons/review', {
          headers: { "ngrok-skip-browser-warning": 435346 }
        });
        setLessonsM(res.data);
    } catch (err) {
        setErrorM(err);
    } finally {
        setLoadingM(false);
    }
    };

  useEffect(() => {
    refetchLessonsM();
  }, []);

  if (error) return <p>Error: {error.message}</p>;
  if (errorM) return <p>Error: {errorM.message}</p>;
  if (errorS) return <p>Error: {errorS.message}</p>;


  const refetchLessonsS = () => setRefreshS(prev => prev + 1);


  return (
    <BrowserRouter>
      {loading || loadingM || loadingS ? <div><Header /> <p className="text-center">Loading...</p>;</div> : (
      <Routes>
        <Route path="/teacher/create" element={<TeacherCreate createLesson={lessons} refetch={refetchLessons} refetchM={refetchLessonsM} />} />
        <Route path="/teacher" element={<Teacher lessons={lessons} />} />
        <Route path="/" element={<App />} />
        <Route path="/teacher/lesson/:lessonId" element={<TeacherLesson lessons={lessons} />} />
        <Route path="/teacher/edit/:lessonId" element={<TeacherEdit lessons={lessons} refetch={refetchLessons} refetchM={refetchLessonsM} />}  />
        <Route path="/teacher/create/preview" element={<TeacherPreview />} />
        <Route path="/moder" element={<Moderator lessons={lessonsM} />} />
        <Route path="/moder/lesson/:lessonId" element={<ModerLesson refetch={refetchLessons} refetchM={refetchLessonsM} refetchS={refetchLessonsS} />} />
        <Route path="/student" element={<Student lessons={lessonsS} />} />
        <Route path="/student/lesson/:lessonId" element={<StudentLesson lessons={lessonsS} />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>)}
    </BrowserRouter>
        )
    }

const app = ReactDOMClient.createRoot(document.getElementById("app"));

app.render(

<Main />

);