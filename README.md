## Installation

```sh
npm install react-native-calendars-picker
```

Or

```sh
yarn add react-native-calendars-picker
```

## Usage

```js
import DateTimePicker from 'react-native-calendars-picker';
import dayjs from 'dayjs';

export default function App() {
  const [value, setValue] = useState(dayjs());
  
  return (
    <View style={styles.container}>
      <DateTimePicker
        value={value}
        onValueChange={(date) => setValue(date)}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
});
```

## Available props

| Name                     | Type            |   Default       | Description                                                                            |
| ------------------------ | --------------- | --------------- | -------------------------------------------------------------------------------------- |
| value                    | `DateType`      | `Dayjs`         | DatePicker value to display selected date                                              |
| onValueChange            | `func`          | `() => {}`      | Called when the new date selected from DatePicker                                      |
| mode                     | `string`        | `'single'`    | Defines the DatePicker mode `['single', 'multiple', 'range']`                             |
| locale                   | `string`        | `'en'`          | Defines the DatePicker locale                                                          |
| minimumDate              | `DateType`      | `null`          | Defines DatePicker minimum selectable date                                             |
| maximumDate              | `DateType`      | `null`          | Defines DatePicker maximum selectable date                                             |
| displayFullDays          | `boolean`       | `false`         | Defines show previous and next month's days in the current calendar view               |
| calendarTextStyle        | `TextStyle`     | `null`          | Defines all text styles inside the calendar (Days, Months, Years, Hours, and Minutes)  |
| selectedTextStyle        | `TextStyle`     | `null`          | Defines selected (Day, Month, Year) text styles                                        |
| selectedItemColor        | `string`        | `'#0047FF'`     | Defines selected (Day, Month, Year) background and border colors                       |
| headerContainerStyle     | `ViewStyle`     | `null`          | Defines calendar header container style                                                |
| headerTextContainerStyle | `ViewStyle`     | `null`          | Defines calendar header texts (Month, Year, Time) containers style                     |
| headerTextStyle          | `TextStyle`     | `null`          | Defines calendar header text styles (Month, Year, Time)                                |
| headerButtonStyle        | `ViewStyle`     | `null`          | Defines calendar header "prev and next buttons" containers style                       |
| headerButtonColor        | `string`        | `null`          | Defines calendar header "prev and next buttons" icon color                             |
| headerButtonSize         | `number`        | `18`            | Defines calendar header "prev and next buttons" icon size                              |
| headerButtonsPosition    | `string`        | `'around'`      | Defines calendar header "prev and next buttons" positions `['around', 'right', 'left']`|
| buttonPrevIcon           | `ReactNode`     | `undefined`     | Defines calendar header "prev button" custom icon                                      |
| buttonNextIcon           | `ReactNode`     | `undefined`     | Defines calendar header "next button" custom icon                                      |
| dayContainerStyle        | `ViewStyle`     | `null`          | Defines days containers style                                                          |
| todayContainerStyle      | `ViewStyle`     | `null`          | Defines today container style                                                          |
| todayTextStyle           | `TextStyle`     | `null`          | Defines today text style                                                               |
| monthContainerStyle      | `ViewStyle`     | `null`          | Defines months containers style                                                        |
| yearContainerStyle       | `ViewStyle`     | `null`          | Defines years containers style                                                         |
| weekDaysContainerStyle   | `ViewStyle`     | `null`          | Defines weekdays container style                                                       |
| weekDaysTextStyle        | `TextStyle`     | `null`          | Defines weekdays texts style                                                           |
| timePickerContainerStyle | `ViewStyle`     | `null`          | Defines time picker container style                                                    |
| timePickerTextStyle      | `TextStyle`     | `null`          | Defines time picker (Hours, Minutes) texts style                                       |
