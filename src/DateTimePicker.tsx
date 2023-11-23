import React, { useEffect, useMemo, useReducer } from 'react';
import {
  getFormated,
  getDate,
  getDateYear,
  areDatesSameOrAfter,
  unshiftHistory,
} from './utils';
import CalendarContext from './CalendarContext';
import { CalendarViews, CalendarActionKind } from './enums';
import type {
  DateType,
  CalendarAction,
  CalendarState,
  DateTimePickerProps,
  RangeDateTimePickerProps,
} from './types';
import Calendar from './components/Calendar';
import dayjs from 'dayjs';
import localeData from 'dayjs/plugin/localeData';
import relativeTime from 'dayjs/plugin/relativeTime';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isBetween from 'dayjs/plugin/isBetween';

dayjs.extend(localeData);
dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);
dayjs.extend(isBetween);
dayjs.extend(isSameOrAfter);

const DateTimePicker = ({
  value,
  locale = 'en',
  mode = 'single',
  minimumDate = null,
  maximumDate = null,
  onValueChange = () => {},
  displayFullDays = false,
  headerButtonsPosition = 'around',
  headerContainerStyle,
  headerTextContainerStyle,
  headerTextStyle,
  headerButtonStyle,
  headerButtonColor,
  headerButtonSize,
  dayContainerStyle,
  todayContainerStyle,
  todayTextStyle,
  monthContainerStyle,
  yearContainerStyle,
  weekDaysContainerStyle,
  weekDaysTextStyle,
  calendarTextStyle,
  selectedTextStyle,
  selectedItemColor,
  timePickerContainerStyle,
  timePickerTextStyle,
  buttonPrevIcon,
  buttonNextIcon,
}: DateTimePickerProps) => {
  dayjs.locale(locale);

  const theme = {
    headerButtonsPosition,
    headerContainerStyle,
    headerTextContainerStyle,
    headerTextStyle,
    headerButtonStyle,
    headerButtonColor,
    headerButtonSize,
    dayContainerStyle,
    todayContainerStyle,
    todayTextStyle,
    monthContainerStyle,
    yearContainerStyle,
    weekDaysContainerStyle,
    weekDaysTextStyle,
    calendarTextStyle,
    selectedTextStyle,
    selectedItemColor,
    timePickerContainerStyle,
    timePickerTextStyle,
  };
  // 把value转换成数组
  const values = useMemo(
    () => (Array.isArray(value) ? value : [value]),
    [value]
  );
  const lastValue = values?.[0];
  const [state, dispatch] = useReducer(
    (prevState: CalendarState, action: CalendarAction) => {
      switch (action.type) {
        case CalendarActionKind.SET_CALENDAR_VIEW:
          return {
            ...prevState,
            calendarView: action.payload,
          };
        case CalendarActionKind.CHANGE_CURRENT_DATE:
          return {
            ...prevState,
            currentDate: action.payload,
          };
        case CalendarActionKind.CHANGE_CURRENT_YEAR:
          return {
            ...prevState,
            currentYear: action.payload,
          };
        case CalendarActionKind.CHANGE_SELECTED_DATE:
          return {
            ...prevState,
            selectedDate: action.payload,
          };
        case CalendarActionKind.CHANGE_SELECTED_DATE_HISTORY:
          return {
            ...prevState,
            selectedDateHistory: action.payload,
          };
        default:
          return prevState;
      }
    },
    {
      calendarView: CalendarViews.day,
      selectedDateHistory: [],
      selectedDate: lastValue ? getFormated(lastValue) : new Date(),
      currentDate: lastValue ? getFormated(lastValue) : new Date(),
      currentYear: lastValue
        ? getDateYear(lastValue)
        : new Date().getFullYear(),
    } as CalendarState
  );
  useEffect(() => {
    // dispatch({
    //   type: CalendarActionKind.CHANGE_SELECTED_DATE,
    //   payload: lastValue,
    // });
    // dispatch({
    //   type: CalendarActionKind.CHANGE_CURRENT_DATE,
    //   payload: lastValue,
    // });
    // dispatch({
    //   type: CalendarActionKind.CHANGE_CURRENT_YEAR,
    //   payload: getDateYear(lastValue),
    // });
  }, [lastValue]);

  const actions = {
    setCalendarView: (view: CalendarViews) =>
      dispatch({ type: CalendarActionKind.SET_CALENDAR_VIEW, payload: view }),
    onSelectDate: (date: DateType) => {
      if (mode === 'range') {
        const newValues = !areDatesSameOrAfter(state.selectedDate, date)
          ? [state.selectedDate, date]
          : [date, state.selectedDate];
        // @ts-expect-error
        onValueChange(newValues);
      } else {
        // @ts-expect-error
        onValueChange(date);
      }
      dispatch({
        type: CalendarActionKind.CHANGE_SELECTED_DATE_HISTORY,
        payload: unshiftHistory(state.selectedDateHistory, date),
      });
      dispatch({
        type: CalendarActionKind.CHANGE_SELECTED_DATE,
        payload: date,
      });
      dispatch({
        type: CalendarActionKind.CHANGE_CURRENT_DATE,
        payload: date,
      });
    },
    onSelectMonth: (month: number) => {
      const newDate = getDate(state.currentDate).month(month);
      dispatch({
        type: CalendarActionKind.CHANGE_CURRENT_DATE,
        payload: getFormated(newDate),
      });
      dispatch({
        type: CalendarActionKind.SET_CALENDAR_VIEW,
        payload: CalendarViews.day,
      });
    },
    onSelectYear: (year: number) => {
      const newDate = getDate(state.currentDate).year(year);
      dispatch({
        type: CalendarActionKind.CHANGE_CURRENT_DATE,
        payload: getFormated(newDate),
      });
      dispatch({
        type: CalendarActionKind.SET_CALENDAR_VIEW,
        payload: CalendarViews.day,
      });
    },
    onChangeMonth: (month: number) => {
      const newDate = getDate(state.currentDate).add(month, 'month');
      dispatch({
        type: CalendarActionKind.CHANGE_CURRENT_DATE,
        payload: getFormated(newDate),
      });
    },
    onChangeYear: (year: number) => {
      dispatch({
        type: CalendarActionKind.CHANGE_CURRENT_YEAR,
        payload: year,
      });
    },
  };

  return (
    <CalendarContext.Provider
      value={{
        ...state,
        ...actions,
        mode,
        locale,
        displayFullDays,
        minimumDate,
        maximumDate,
        theme,
      }}
    >
      <Calendar
        buttonPrevIcon={buttonPrevIcon}
        buttonNextIcon={buttonNextIcon}
      />
    </CalendarContext.Provider>
  );
};

export default DateTimePicker;

export const RangeDateTimePicker = (props: RangeDateTimePickerProps) => {
  return <DateTimePicker {...props} mode="range" />;
};
