import moment from "moment";
import { createContext, useState, useEffect } from "react";

export const EventContext = createContext();

const EventContextProvider = (props) => {
  const [events, setEvents] = useState([]);
  const [events_filter, setEventsFilter] = useState("week");

  // Google Events

  useEffect(() => {
    /**
     *  On load, called to load the auth2 library and API client library.
     */
    function handleClientLoad() {
      window.gapi.load("client:auth2", () => {
        console.log("Client loaded!!");

        window.gapi.client.init({
          apiKey: "AIzaSyC3JqOLPmTmouQX9kBuKI0OfCYCnP1I9O4",
          clientId:
            "953904536832-f9n1591em77rroae9uokdp439qluifmm.apps.googleusercontent.com",
          discoveryDocs: [
            "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
          ],
          scope: "https://www.googleapis.com/auth/calendar.events",
        });

        window.gapi.client.load("calendar", "v3", () => {
          console.log("Calendar loaded!!");
          //   List events after calendar is loaded
          listUpcomingEvents("week");
        });
      });
    }
    //   On app render call
    handleClientLoad();
  }, []);

  //
  /**
   * Function called to fetch users google calendar events
   * /**
   * @param {string} events_filter - today, week, month
   */
  const listUpcomingEvents = (events_filter) => {
    // Set todays date
    let start = new Date();
    start.setUTCHours(0, 0, 0, 0);
    // console.log("start:", );
    // let end = moment(start).add("1", "days").toISOString();
    // console.log("end:", end);

    let end;
    switch (events_filter) {
      case "today":
        end = moment(start).add("1", "days").toISOString();
        break;
      case "week":
        end = moment(start).add("7", "days").toISOString();
        break;
      case "month":
        end = moment(start).add("30", "days").toISOString();
        break;
      default:
        // Default "week"
        end = moment(start).add("1", "days").toISOString();
        // If no events_filter passed
        // events_filter = "week";
        break;
    }

    window.gapi.client.calendar.events
      .list({
        calendarId: "primary",
        timeMin: start.toISOString(),
        timeMax: end,
        showDeleted: false,
        singleEvents: true,
        maxResults: 100,
        orderBy: "startTime",
      })
      .then(function (response) {
        // Set events
        let events;
        if (events_filter === "month") {
          events = groupByWeek(response.result.items);
          setEvents({ ...events });
        } else {
          events = response.result.items;
          setEvents([...events]);
        }
        console.log("Events:", events);

        setEventsFilter(events_filter);
      });
  };

  /**
   * Function - group events by week on "month" view
   * /**
   * @param {array} events - array of event objects that are sorted by start date
   * /**
   *@return {array} array of weeks with events
   */
  const groupByWeek = (events) => {
    return events.reduce((acc, event) => {
      // Key is "week" number
      let week = moment(event.start.dateTime).isoWeek();
      // Start of that week
      let startDate = moment("2021")
        .add(week, "weeks")
        .startOf("week")
        .add(1, "day")
        .format("YYYY-MM-DD");
      console.log("Start of week:", startDate);

      if (!acc[startDate]) {
        acc[startDate] = [];
      }
      acc[startDate].push(event);
      return acc;
    }, {});
  };

  //   Insert new event
  const addEvent = (event) => {
    // var event = {
    //   summary: "Awesome Event!",
    //   start: {
    //     dateTime: "2021-09-30T09:00:00-07:00",
    //   },
    //   end: {
    //     dateTime: "2021-09-30T17:00:00-07:00",
    //   },
    // };

    var request = window.gapi.client.calendar.events.insert({
      calendarId: "primary",
      resource: event,
    });

    request.execute((event) => {
      // Update events in state
      events_filter !== "month"
        ? setEvents([...events, event])
        : listUpcomingEvents("month");
    });
  };

  //   Remove event
  const removeEvent = (id) => {
    var request = window.gapi.client.calendar.events.delete({
      calendarId: "primary",
      eventId: id,
    });
    request.execute(function (response) {
      if (response.error || response === false) {
        alert("Oops, something went wrong!");
      } else {
        if (events_filter !== "month") {
          // Filter out deleted event from "events" array
          let filteredEvents = events.filter((event) => event.id !== id);
          setEvents([...filteredEvents]);
        } else {
          listUpcomingEvents("month");
        }
      }
    });
  };

  return (
    <EventContext.Provider
      value={{
        events,
        events_filter,
        addEvent,
        removeEvent,
        listUpcomingEvents,
        setEventsFilter,
      }}
    >
      {props.children}
    </EventContext.Provider>
  );
};

export default EventContextProvider;
