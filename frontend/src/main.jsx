import { useState, useEffect } from "react";
import * as ReactDOMClient from "react-dom/client";
import App from "./App";
import "./index.css";
import NotFoundPage from "./NotFoundPage";
import Teacher from "./Teacher";
import Moderator from "./Moderator";
import Student from "./Student";
import TeacherLesson from "./TeacherLesson";
import TeacherCreate from "./TeacherCreate";
import TeacherPreview from "./TeacherPreview";
import StudentLesson from "./StudentLesson";
import ModerLesson from "./ModerLesson";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import './i18n';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

const Main = () => {
    const { t } = useTranslation();
  
  // ✅ All hooks at the top:
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
    axios.get('https://c7a8-90-156-162-134.ngrok-free.app/lessons/approved', {
      headers: { "ngrok-skip-browser-warning": 435346 }
    })
    .then(response => {
      console.log(response.data);
      setLessonsS(response.data);
      setLoadingS(false);
    })
    .catch(error => {
      setErrorS(error);
      setLoadingS(false);
    });
  }, [refreshS]);

  // ✅ All useEffects
  useEffect(() => {
    axios.get('https://c7a8-90-156-162-134.ngrok-free.app/lessons/', {
      headers: { "ngrok-skip-browser-warning": 435345 }
    })
    .then(response => {
      console.log(response.data);
      setLessons(response.data);
      setLoading(false);
    })
    .catch(error => {
      setError(error);
      setLoading(false);
    });
  }, [refresh]);

  const refetchLessonsM = async () => {
    setLoadingM(true);
    try {
        const res = await axios.get('https://c7a8-90-156-162-134.ngrok-free.app/lessons/review', {
        headers: { "ngrok-skip-browser-warning": 435349 }
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

  if (loading || loadingM || loadingS) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (errorM) return <p>Error: {errorM.message}</p>;
  if (errorS) return <p>Error: {errorS.message}</p>;


  const refetchLessons = () => setRefresh(prev => prev + 1);
  const refetchLessonsS = () => setRefreshS(prev => prev + 1);


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/teacher/create" element={<TeacherCreate createLesson={lessons} refetch={refetchLessons} refetchM={refetchLessonsM} />} />
        <Route path="/teacher" element={<Teacher lessons={lessons} />} />
        <Route path="/" element={<App />} />
        <Route path="/teacher/lesson/:lessonId" element={<TeacherLesson lessons={lessons} />} />
        <Route path="/teacher/create/preview" element={<TeacherPreview />} />
        <Route path="/moder" element={<Moderator lessons={lessonsM} />} />
        <Route path="/moder/lesson/:lessonId" element={<ModerLesson refetch={refetchLessons} refetchM={refetchLessonsM} refetchS={refetchLessonsS} />} />
        <Route path="/student" element={<Student lessons={lessonsS} />} />
        <Route path="/student/lesson/:lessonId" element={<StudentLesson lessons={lessonsS} />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
        )
    }

// const router = createBrowserRouter([
//     {
//         path: "/",
//         element: <App />
//     },
//     {
//         path: "/teacher",
//         element: <Teacher />
//     },
//     {
//         path: "/teacher/create",
//         element: <TeacherCreate />
//     },
//     {
//         path: "/teacher/lesson/:lessonId",
//         element: <TeacherLesson />
//     },
//     {
//         path: "/moder",
//         element: <Moderator />
//     },
//     {
//         path: "/student",
//         element: <Student />
//     },
//     {
//         path: "*",
//         element: <NotFoundPage />
//     }
// ]);

const app = ReactDOMClient.createRoot(document.getElementById("app"));

app.render(

<Main />

);