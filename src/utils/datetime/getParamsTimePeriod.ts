export interface GetTimesByClockParams {
    startDate: Date;
    endDate: Date;
    step: number;
    trimPast: boolean;
    currentTime: Date;
}

export function createDefaultParams(startTime: string, endTime: string): GetTimesByClockParams {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    const startParts = startTime.split(':');
    const endParts = endTime.split(':');

    const startHour = parseInt(startParts[0], 10);
    const startMinute = parseInt(startParts[1], 10);
    const endHour = parseInt(endParts[0], 10);
    const endMinute = parseInt(endParts[1], 10);

    const startDate = new Date(today);
    startDate.setHours(startHour, startMinute, 0, 0);

    const endDate = new Date(today);
    if(endDate.getHours() < startDate.getHours()) {
        endDate.setDate(endDate.getDate() + 1)
    }
    endDate.setHours(endHour, endMinute, 0, 0);

    return {
        startDate,
        endDate,
        step: 30,
        trimPast: true,
        currentTime: now,
    };
}
