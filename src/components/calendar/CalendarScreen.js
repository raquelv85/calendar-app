import React, { useState, useEffect } from "react";
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
import { DeleteEventFab } from "../ui/DeleteEventFab";

import { uiOpenModal } from "../../actions/ui";
import { eventSetActive, eventDeleted, eventClearActiveEvent, eventStartLoading } from "../../actions/events";

moment.locale("es");

const localizer = momentLocalizer(moment);


export const CalendarScreen = () => {
  const dispatch = useDispatch();
  const {events, activeEvent}  = useSelector( state => state.calendar);
  const { uid }  = useSelector( state => state.auth);

  const [lastView, setLastView] = useState(
    localStorage.getItem("lastView") || "month"
  );

  useEffect(() => {
      dispatch( eventStartLoading() )
  }, [dispatch]);

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
      backgroundColor: uid === event.user._id ? "#367CF7" : "#465660",
      borderRadius: "0px",
      opacity: 0.8,
      display: "block",
      color: "white",
    };

    return {
      style,
    };
  };

  const onSelectSlot = (e) => {
    dispatch(eventClearActiveEvent())
  }


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
        selectable={true}
        onSelectEvent={onSelectEvent}
        onView={onViewChange}
        eventPropGetter={eventStyleGetter}
        components={{ event: CalendarEvent }}
        onSelectSlot={onSelectSlot}
        view={lastView}
      />
      <AddNewFab action={() => dispatch(uiOpenModal())}/>

      {
        activeEvent &&
        <DeleteEventFab action={() => dispatch(eventDeleted(activeEvent))}/>
      }
      
      <CalendarModal />
    </div>
  );
};
