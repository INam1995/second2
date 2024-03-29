// import React, { useState } from 'react';
// import TextField from '@mui/material/TextField';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
// import Badge from '@mui/material/Badge';
// import 'dayjs/locale/de';
// import { PickersDay } from '@mui/x-date-pickers/PickersDay';
// // import CheckIcon from '@mui/icons-material/Check';

// const Calendar = () => {
//   const [value, setValue] = useState(new Date());
//   const [highlightedDays, setHighlightedDays] = useState([1, 2, 13]);
//   return (
//     // <LocalizationProvider dateAdapter={AdapterDateFns}>
//     <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="de">
//       <StaticDatePicker
//         // mask='____/__/__'
//         variant='static'
//         orientation='portrait'
//         value={value}
//         disableFuture
//         onChange={(newValue) => setValue(newValue)}
//         renderInput={(params) => {
//           <TextField {...params} />;
//         }}
//         renderDay={(day, _value, DayComponentProps) => {
//           const isSelected =
//             !DayComponentProps.outsideCurrentMonth &&
//             highlightedDays.indexOf(day.getDate()) >= 0;

//           return (
//             <Badge
//               key={day.toString()}
//               overlap='circular'
//               badgeContent={isSelected ? '✔️' : undefined}
//             >
//               <PickersDay {...DayComponentProps} />
//             </Badge>
//           );
//         }}
//       />
//     </LocalizationProvider>
//   );
// };

// export default Calendar;

























// import React from 'react'
// import dayjs from 'dayjs';
// import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
// // import { TextField } from '@mui/material'; // Import TextField component
// // import { useState ,useEffect} from 'react';
// import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
// import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import Badge from '@mui/material/Badge'
// import { PickersDay } from '@mui/x-date-pickers/PickersDay/PickersDay';


// const Calendar = () => {
// //   return (
// //     <div>
// //       <h1> calendar app</h1>
// //     </div>
// //   )

// return (
//     <LocalizationProvider dateAdapter={AdapterDayjs}>
//       <DemoContainer
//         components={[
//           'DatePicker',
//           'MobileDatePicker',
//           'DesktopDatePicker',
//           'StaticDatePicker',
//         ]}
//       >
//         {/* <DemoItem label="Desktop variant">
//           <DesktopDatePicker defaultValue={dayjs('2022-04-17')} />
//         </DemoItem> */}
//         {/* <DemoItem label="Mobile variant">
//           <MobileDatePicker defaultValue={dayjs('2022-04-17')} />
//         </DemoItem> */}
//         {/* <DemoItem label="Responsive variant">
//           <DatePicker defaultValue={dayjs('2022-04-17')} />
//         </DemoItem> */}
//         <DemoItem label="Static variant">
//           <StaticDatePicker defaultValue={dayjs('2022-04-17')} />
//         </DemoItem>
//       </DemoContainer>
//     </LocalizationProvider>
//   );
// }

// export default Calendar





























import * as React from 'react';
import dayjs from 'dayjs';
import Badge from '@mui/material/Badge';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { DayCalendarSkeleton } from '@mui/x-date-pickers/DayCalendarSkeleton';

function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}
    const today = dayjs(); // Get the current date
    const currentDay = today.date(); // Get the day of the current date

// Assuming value is supposed to be a date or time object
if (currentDay && dayjs(currentDay).isValid()) {
  // Value is a valid date or time object
  // Proceed with your logic here
} else {
  // Handle the case where value is not valid
  console.error("Invalid date/time object:", currentDay);
  // Optionally, provide fallback logic or error handling
}
/**
 * Mimic fetch with abort controller https://developer.mozilla.org/en-US/docs/Web/API/AbortController/abort
 * ⚠️ No IE11 support
 */
function fakeFetch(date, { signal }) {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      const daysInMonth = date.daysInMonth();
    //   const daysToHighlight = fetchHighlightedDays(currentDay);
      const daysToHighlight = [1, 2, 3].map(() => getRandomNumber(1, daysInMonth));

      resolve({ daysToHighlight });
    }, 500);

    signal.onabort = () => {
      clearTimeout(timeout);
      reject(new DOMException('aborted', 'AbortError'));
    };
  });
}

// const initialValue = dayjs('2022-04-17');
const initialValue = currentDay;

function ServerDay(props) {
  const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;

  const isSelected =
    !props.outsideCurrentMonth && highlightedDays.indexOf(props.day.date()) >= 0;

  return (
    <Badge
      key={props.day.toString()}
      overlap="circular"
      badgeContent={isSelected ? '✔️' : undefined}
    >
      <PickersDay {...other} outsideCurrentMonth={outsideCurrentMonth} day={day} />
    </Badge>
  );
}

export default function DateCalendarServerRequest() {
  const requestAbortController = React.useRef(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [highlightedDays, setHighlightedDays] = React.useState([1, 2, 15]);

  const fetchHighlightedDays = (date) => {
    const controller = new AbortController();
    fakeFetch(date, {
      signal: controller.signal,
    })
      .then(({ daysToHighlight }) => {
        setHighlightedDays(daysToHighlight);
        setIsLoading(false);
      })
      .catch((error) => {
        // ignore the error if it's caused by controller.abort
        if (error.name !== 'AbortError') {
          throw error;
        }
      });

    requestAbortController.current = controller;
  };

  React.useEffect(() => {
    fetchHighlightedDays(initialValue);
    // abort request on unmount
    return () => requestAbortController.current?.abort();
  }, []);

  const handleMonthChange = (date) => {
    if (requestAbortController.current) {
      // make sure that you are aborting useless requests
      // because it is possible to switch between months pretty quickly
      requestAbortController.current.abort();
    }

    setIsLoading(true);
    setHighlightedDays([]);
    fetchHighlightedDays(date);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        defaultValue={initialValue}
        loading={isLoading}
        onMonthChange={handleMonthChange}
        renderLoading={() => <DayCalendarSkeleton />}
        slots={{
          day: ServerDay,
        }}
        slotProps={{
          day: {
            highlightedDays,
          },
        }}
      />
    </LocalizationProvider>
  );
}



