import dayjs, { Dayjs } from 'dayjs';

export const validateTimeNotInPast = (date: Dayjs, time: Dayjs): Promise<void> => {
    if (!time || !date) return Promise.resolve();
    
    if (date.isSame(dayjs(), 'day')) {
        const selectedDateTime = date.hour(time.hour()).minute(time.minute());
        if (selectedDateTime.isBefore(dayjs())) {
            return Promise.reject(new Error('Time cannot be in the past'));
        }
    }
    return Promise.resolve();
};

export const validateReturnDate = (returnDate: Dayjs, pickupDate: Dayjs): Promise<void> => {
    if (!returnDate || !pickupDate) return Promise.resolve();
    
    if (returnDate.isBefore(pickupDate, 'day')) {
        return Promise.reject(new Error('Return date cannot be before pickup date'));
    }
    return Promise.resolve();
};

export const validateReturnTime = (
    returnDate: Dayjs,
    returnTime: Dayjs,
    pickupDate: Dayjs,
    pickupTime: Dayjs
): Promise<void> => {
    if (!returnTime || !returnDate || !pickupDate || !pickupTime) {
        return Promise.resolve();
    }
    
    if (returnDate.isSame(pickupDate, 'day')) {
        const pickupDateTime = pickupDate.hour(pickupTime.hour()).minute(pickupTime.minute());
        const returnDateTime = returnDate.hour(returnTime.hour()).minute(returnTime.minute());
        
        if (returnDateTime.isBefore(pickupDateTime) || returnDateTime.isSame(pickupDateTime)) {
            return Promise.reject(new Error('Return time must be after pickup time'));
        }
    }
    
    if (returnDate.isSame(dayjs(), 'day')) {
        const returnDateTime = returnDate.hour(returnTime.hour()).minute(returnTime.minute());
        if (returnDateTime.isBefore(dayjs())) {
            return Promise.reject(new Error('Return time cannot be in the past'));
        }
    }
    
    return Promise.resolve();
};

