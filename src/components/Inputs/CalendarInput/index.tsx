import React, {FC, useState} from 'react';
import GrayBorderedBlock from "../../GrayBorderedBlock";
import {CalendarIcon} from "../../../icons";
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import {Calendar} from 'primereact/calendar';

import {addLocale} from 'primereact/api';
import {isAfter10PM, isToday} from "../../../utils/datetime/dates";


addLocale('ru', {
    firstDayOfWeek: 1,
    dayNames: ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'],
    dayNamesShort: ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'],
    dayNamesMin: ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'],
    monthNames: [
        'январь', 'февраль', 'март', 'апрель', 'май', 'июнь',
        'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь'
    ],
    monthNamesShort: [
        'янв', 'фев', 'мар', 'апр', 'май', 'июн',
        'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'
    ],
    today: 'Сегодня',
    clear: 'Очистить'
    //...
});
const MIN_DATE = new Date()

type CalendarInputProps = {
    setCalendarVal: (val: Date) => any,
    isTodayDisabled: boolean
    val: Date

}
const CalendarInput: FC<CalendarInputProps> = ({setCalendarVal, val, isTodayDisabled}) => {
    const [isFocused, setIsFocused] = useState(false)

    return (
        <>
            <label htmlFor="calendarInput">Дата</label>
            <GrayBorderedBlock isFocused={isFocused} labelFor={"calendarInput"}
                               className={`calendar p-rel inputField f-row-betw gap-20 `}>
                <Calendar
                    minDate={MIN_DATE}
                    inputId={"calendarInput"}
                    todayButtonClassName={"todayCalendar"}
                    disabledDates={isTodayDisabled ? [new Date()] : []}
                    readOnlyInput={true}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    onChange={(val) => setCalendarVal(val.value || new Date())}
                    dateFormat={"dd.mm.yy"}
                    locale={"ru"}
                    value={val}
                />
                <CalendarIcon/>
            </GrayBorderedBlock>
        </>

    );
};

export default CalendarInput;