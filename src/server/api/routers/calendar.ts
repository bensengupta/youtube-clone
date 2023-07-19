import { parseISO } from "date-fns";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { type Calendar } from "@/ts/types";

const calendar1: Calendar = {
  id: "calendar-1",
  name: "CIS2750",
  events: [
    {
      id: "event-1",
      title: "Lecture",
      location: { kind: "location-geographical", location: "ROZH 104" },
      start: parseISO("2023-09-11T08:30:00.000-4:00"),
      end: parseISO("2023-09-11T09:50:00.000-4:00"),
      schedule: {
        kind: "schedule-weekly",
        interval: 1,
        daysOfTheWeek: {
          monday: true,
          wednesday: true,
          friday: true,
        },
        end: {
          kind: "schedule-end-on",
          dayOfTheMonth: 1,
          monthOfTheYear: "december",
        },
      },
    },
    {
      id: "event-2",
      title: "Lab",
      description: "Lab things",
      start: parseISO("2023-09-11T10:30:00.000-4:00"),
      end: parseISO("2023-09-11T12:20:00.000-4:00"),
      timezone: "America/Toronto",
    },
  ],
  tasks: [
    {
      id: "task-1",
      title: "Assignment 1",
      description: "Posted on CourseLink",
      dueDate: parseISO("2023-09-28T23:59:00.000-4:00"),
    },
    {
      id: "task-2",
      title: "Assignment 2",
      description: "Posted on CourseLink",
      dueDate: parseISO("2023-10-20T23:59:00.000-4:00"),
    },
  ],
};

const calendars = [calendar1];

export const calendarRouter = createTRPCRouter({
  getCalendarById: publicProcedure.input(z.string()).query(({ input }) => {
    return calendars.find((cal) => cal.id === input);
  }),
});
