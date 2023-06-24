export type ScheduleEndOnDate = {
  kind: "schedule-end-on";
  dayOfTheMonth: number;
  monthOfTheYear: Month;
};

export type ScheduleEndAfterOccurrences = {
  kind: "schedule-end-after";
  numOccurrences: number;
};

export type ScheduleEndNever = {
  kind: "schedule-end-never";
};

export type ScheduleEnd =
  | ScheduleEndOnDate
  | ScheduleEndAfterOccurrences
  | ScheduleEndNever;

export type DayOfTheWeek =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";

export type Month =
  | "january"
  | "february"
  | "march"
  | "april"
  | "may"
  | "june"
  | "july"
  | "august"
  | "september"
  | "october"
  | "november"
  | "december";

export type DailySchedule = {
  kind: "schedule-daily";
  interval: number;
  end: ScheduleEnd;
};

export type WeeklySchedule = {
  kind: "schedule-weekly";
  interval: number;
  end: ScheduleEnd;
  daysOfTheWeek: { [key in DayOfTheWeek]?: boolean };
};

export type MonthlyDayOfTheWeekSchedule = {
  kind: "schedule-monthly-day-of-the-week";
  interval: number;
  end: ScheduleEnd;
  dayOfTheWeek: DayOfTheWeek;
};

export type MonthlySchedule = {
  kind: "schedule-monthly";
  interval: number;
  end: ScheduleEnd;
  dayOfTheMonth: number;
};

export type YearlySchedule = {
  kind: "schedule-yearly";
  interval: number;
  end: ScheduleEnd;
  dayOfTheMonth: number;
  month: Month;
};

export type Schedule =
  | DailySchedule
  | WeeklySchedule
  | MonthlyDayOfTheWeekSchedule
  | MonthlySchedule
  | YearlySchedule;

export type EventLocationGeographical = {
  kind: "location-geographical";
  location: string;
};

export type EventLocationOnline = {
  kind: "location-online";
  url: string;
};

export type EventLocation = EventLocationGeographical | EventLocationOnline;

export type Event = {
  id: string;
  title: string;
  description?: string;
  start: Date;
  end: Date;
  location?: EventLocation;
  timezone?: string;
  schedule?: Schedule;
};

export type Task = {
  id: string;
  title: string;
  description?: string;
  dueDate: Date;
  schedule?: Schedule;
};

export type Calendar = {
  id: string;
  name: string;
  events: Event[];
  tasks: Task[];
};
