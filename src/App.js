import LP from "./components/Landing page/LandingPage.js";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./components/Login/Signup";
import { useContext, useEffect, useState } from "react";
import DataProvider from "./context/DataProvider.js";

import React from "react";
import SwiperDrawer from "./components/SwiperDrawer.js";
import Notes from "./components/notes/Notes";
import { Box } from "@mui/material";
import Archives from "./components/archives/Archives";
import Error from "./components/Error.js";
import Reminder from "./components/reminder/Reminder.jsx";
import { gettodo } from "./services/api.js";
import { NotificationContext } from "./context/NotificationProvider.js";

function App() {
  const info = localStorage.getItem("user");
  const [user, setUser] = useState(JSON.parse(info));
  const { notificationTimer, setNoticationTimer } =
    useContext(NotificationContext);

    useEffect(() => {
      (async () => {
        try {
          Notification.requestPermission();
          const res = await gettodo();
          if (res.status === 200 && res?.data?.data?.todos) {
            let mp = {};
            res.data.data.todos.map((el) => {
              if (el.reminder && new Date(el.reminder) > new Date()) {
                const time =
                  new Date(el.reminder).getTime() - new Date().getTime();
                console.log(`time for notification of ${el.heading} is ${time}`);
                let x = setTimeout(() => {
                  new Notification(
                    `You have a pending task : ${el.heading}  `
                  );
                  mp[el._id] = x;
                  window.location.refresh();
                }, time);
              }
            });
            setNoticationTimer(mp);
          }
        } catch (error) {
          console.log(error);
        }
      })();
    }, []);
  

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LP />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/login"
            element={<Signup user={user} setUser={setUser} />}
          />
          <Route path="/error" element={<Error />} />
          <Route path="/createtodo" exact={true} element={<Error />} />
        </Routes>
        <DataProvider>
          <Box style={{ display: "flex", width: "100%" }}>
            <Routes>
              <Route path="/createtodo/notes" element={<Notes />} />
              <Route path="/createtodo/archive" element={<Archives />} />
              <Route path="/createtodo/delete" element={<Notes />} />
              <Route path="/createtodo/reminder" element={<Reminder />} />
            </Routes>
          </Box>
        </DataProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
