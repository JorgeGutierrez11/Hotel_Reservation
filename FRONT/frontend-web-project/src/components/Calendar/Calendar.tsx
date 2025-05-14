import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import dayjs, { Dayjs } from 'dayjs';
import React from 'react';

interface Props {
    blockedDates: Dayjs[];
    minDate?: Dayjs | null
    value: Dayjs | null
    setValue: React.Dispatch<React.SetStateAction<Dayjs | null>>
}

export const Calendar = ({ blockedDates, value, setValue, minDate }: Props) => {

    return (
        <>
            <div>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateCalendar
                        value={value}
                        onChange={(newValue) => setValue(newValue)}
                        shouldDisableDate={(date) => {
                            const isBlocked = blockedDates.some(blockedDate => date.isSame(blockedDate, 'day'));

                            const isBeforeToday = date.isBefore(dayjs(), 'day');

                            const isBeforeMin = minDate
                                ? date.isSame(minDate, 'day') || date.isBefore(minDate, 'day')
                                : false;

                            return isBlocked || isBeforeMin || isBeforeToday;
                        }}
                    />
                </LocalizationProvider>
                {/* <h3>Fecha seleccionada {value?.format('dddd-MMM/DD/YYYY')}</h3> */}
            </div>
        </>
    );
};
