import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import "moment/locale/es";
import { NavBar } from "../ui/NavBar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { messages } from "../../helpers/calendar-messages-es";

import { CalendarEvent } from "./CalendarEvent";
import { CalendarModal } from "../calendar/CalendarModal";
import { AddNewFab } from "../ui/AddNewFab";

import { uiOpenModal } from "../../actions/ui";
import { eventSetActive } from "../../actions/events";

moment.locale("es");

const localizer = momentLocalizer(moment);


export const CalendarScreen = () => {
  const dispatch = useDispatch();
  const events  = useSelector( state => state.calendar.events)

  const [lastView, setLastView] = useState(
    localStorage.getItem("lastView") || "month"
  );

  const onDoubleClick = (e) => {
    dispatch(uiOpenModal());
  };

  const onSelectEvent = (e) => {
    dispatch(eventSetActive(e));
  };

  const onViewChange = (e) => {
    setLastView(e);
    localStorage.setItem("lastView", e);
  };

  const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {
      backgroundColor: "#367CF7",
      borderRadius: "0px",
      opacity: 0.8,
      display: "block",
      color: "white",
    };

    return {
      style,
    };
  };


  return (
    <div className="calendar-screen">
      <NavBar />
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        messages={messages}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelectEvent}
        onView={onViewChange}
        eventPropGetter={eventStyleGetter}
        components={{ event: CalendarEvent }}
        view={lastView}
      />
      <AddNewFab action={() => dispatch(uiOpenModal())}/>
      <CalendarModal />
    </div>
  );
};
