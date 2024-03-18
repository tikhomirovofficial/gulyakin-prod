import {getDatesWithTimes} from "../utils/datetime/dayWithTimes";
import {getTimes} from "../utils/datetime/avaliableTimes";

type BookingTimesHookProps = {
    isToday: boolean,
    dateValue: Date,
    workStartTime: string
    workEndTime: string
}
const useBookingTimes = (params: BookingTimesHookProps): string[] => {
    const datesWithTimes = getDatesWithTimes(
        params.dateValue,
        params.workStartTime,
        params.workEndTime
    )
    
    
    
    //
    const defaultParams = {
        startDate: datesWithTimes[0], // Год, месяц (от 0 до 11), день, час, минута
        endDate: datesWithTimes[1],
        step: 30, // Шаг в минутах
        trimPast: params.isToday, // Флаг обрезания времени, если оно прошло текущее время
        currentTime: new Date(), // Обязательное передача текущего времени
    };
    
    const times = getTimes(defaultParams)
    
    return times
};

export default useBookingTimes;