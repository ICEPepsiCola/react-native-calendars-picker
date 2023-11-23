import type { Dayjs } from 'dayjs';
import type { CalendarActionKind, CalendarViews } from './enums';
import type { TextStyle, ViewStyle } from 'react-native';
import type { ReactNode } from 'react';

export type DateType = string | number | Dayjs | Date | null | undefined;

export type CalendarModes = 'single' | 'range' | 'multiple';

export type HeaderButtonPositions = 'around' | 'right' | 'left';

export type CalendarState = {
  calendarView: CalendarViews;
  selectedDate: DateType;
  currentDate: DateType; // used for latest state of calendar based on Month and Year
  currentYear: number; // used for pagination in YearSelector
  selectedDateHistory: DateType[];
};

export type CalendarAction =
  | {
      type: CalendarActionKind.SET_CALENDAR_VIEW;
      payload: CalendarState['calendarView'];
    }
  | {
      type: CalendarActionKind.CHANGE_CURRENT_DATE;
      payload: CalendarState['currentDate'];
    }
  | {
      type: CalendarActionKind.CHANGE_CURRENT_YEAR;
      payload: CalendarState['currentYear'];
    }
  | {
      type: CalendarActionKind.CHANGE_SELECTED_DATE;
      payload: CalendarState['selectedDate'];
    }
  | {
      type: CalendarActionKind.CHANGE_SELECTED_DATE_HISTORY;
      payload: CalendarState['selectedDateHistory'];
    };

export type CalendarTheme = {
  headerButtonsPosition?: HeaderButtonPositions;
  headerContainerStyle?: ViewStyle;
  headerTextContainerStyle?: ViewStyle;
  headerTextStyle?: TextStyle;
  headerButtonStyle?: ViewStyle;
  headerButtonColor?: string;
  headerButtonSize?: number;
  dayContainerStyle?: ViewStyle;
  todayContainerStyle?: ViewStyle;
  todayTextStyle?: TextStyle;
  monthContainerStyle?: ViewStyle;
  yearContainerStyle?: ViewStyle;
  weekDaysContainerStyle?: ViewStyle;
  weekDaysTextStyle?: TextStyle;
  calendarTextStyle?: TextStyle;
  selectedTextStyle?: TextStyle;
  selectedItemColor?: string;
  timePickerContainerStyle?: ViewStyle;
  timePickerTextStyle?: TextStyle;
};

export type HeaderProps = {
  buttonPrevIcon?: ReactNode;
  buttonNextIcon?: ReactNode;
};

export interface IDayObject {
  text: string;
  day: number;
  date: string;
  disabled: boolean;
  isCurrentMonth: boolean;
}

export interface BaseDateTimePickerProps extends CalendarTheme, HeaderProps {
  value?: DateType | DateType[];
  locale?: string | ILocale;
  minimumDate?: DateType;
  maximumDate?: DateType;
  displayFullDays?: boolean;
}

export interface SingleDateTimePickerProps extends BaseDateTimePickerProps {
  mode?: 'single';
  value?: DateType;
  onValueChange?: (value: DateType) => void;
}

export interface RangeDateTimePickerProps extends BaseDateTimePickerProps {
  value?: DateType[];
  mode?: 'range';
  onValueChange?: (value: [DateType, DateType]) => void;
}

export type DateTimePickerProps =
  | SingleDateTimePickerProps
  | RangeDateTimePickerProps;
