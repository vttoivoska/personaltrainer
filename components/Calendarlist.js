import React from "react";
import { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import "moment/locale/en-gb";
import axios from "axios";
const localizer = momentLocalizer(moment);

export default function ListCalendar() {
  moment.locale("en-gb");

  const [events, setEvents] = useState([{}]);
  const calendarEvents = [];
  const [isReady, setReady] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get("https://customerrest.herokuapp.com/gettrainings")
      .then(function(response) {
        response.data.map(event => {
          calendarEvents.push({
            start: new Date(moment.utc(event.date).format("ll LT")),
            end: new Date(
              moment
                .utc(event.date)
                .add(event.duration, "minutes")
                .format("ll LT")
            ),
            title:
              event.activity +
              " / " +
              event.customer.firstname +
              " " +
              event.customer.lastname
          });
        });
        setEvents(calendarEvents);
        setReady(true);
      });
  };

  return (
    <div className="calendar">
      <Calendar
        localizer={localizer}
        events={events}
        titleAccessor="title"
        startAccessor="start"
        endAccessor="end"
        min={new Date(0, 0, 0, 7, 0, 0)}
        max={new Date(0, 0, 0, 20, 0, 0)}
      />
    </div>
  );
}