# Booking State Management

## Overview

The booking state is managed using `zustand-x` with localStorage persistence to provide a seamless booking experience while ensuring data is cleared at the appropriate times.

## State Persistence Strategy

### ✅ When State PERSISTS (localStorage)

1. **During Booking Flow**
   - While user navigates through the multi-step booking process
   - If user refreshes the page during booking
   - Allows users to resume their booking where they left off

2. **Abandoned Bookings**
   - State remains in localStorage until overwritten by a new booking
   - This is intentional - when user starts a new booking, old values are completely overwritten

### ✅ When State is CLEARED

1. **After Successful Booking** 
   - Immediately after booking confirmation page loads
   - Triggered by `resetBookingStore()` in `/app/booking/confirmation/[reference]/page.tsx`
   - Ensures clean slate for next booking

2. **Invalid Access to Booking Page**
   - If user tries to access `/booking` without basic trip details
   - Redirects to homepage with a message
   - Prevents incomplete/corrupted booking flows

3. **New Booking Started**
   - When user submits the booking widget form on homepage
   - Widget sets `currentStep` to 0 and overwrites all trip details
   - Old data is naturally replaced with new form data

## Implementation Details

### Store Configuration

```typescript
// lib/store/bookingStore.ts
export const bookingStore = createStore<BookingState>(initialState, {
    name: 'booking',
    devtools: { enabled: true },
    persist: {
        enabled: true,
        name: 'luxeride-booking',
    },
});

export const resetBookingStore = () => {
    bookingStore.setState(initialState);
};
```

### Key Files

1. **`/lib/store/bookingStore.ts`**
   - Store definition with persistence
   - `resetBookingStore()` function for clearing state

2. **`/components/booking/BookingWidget.tsx`**
   - Sets all trip details when form is submitted
   - Resets `currentStep` to 0 for fresh start
   - Navigates to `/booking` page

3. **`/app/booking/page.tsx`**
   - Validates basic trip details are present
   - Redirects to homepage if state is empty/invalid
   - Shows loading spinner during redirect

4. **`/app/booking/confirmation/[reference]/page.tsx`**
   - Calls `resetBookingStore()` when booking is successfully loaded
   - Clears all booking data after confirmation

## User Flows

### Flow 1: Complete Booking (Happy Path)

1. User fills booking widget on homepage
2. Clicks "Get Quote & Book"
3. Store is updated with trip details, currentStep set to 0
4. Navigate to `/booking` page
5. User completes steps (state persists in localStorage)
6. Booking created successfully
7. Navigate to `/booking/confirmation/[reference]`
8. **State is cleared via `resetBookingStore()`**

### Flow 2: Refresh During Booking

1. User is on step 2 of booking flow
2. User refreshes page
3. **State loads from localStorage**
4. User continues from step 2

### Flow 3: Abandoned Booking, New Booking

1. User starts booking, abandons at step 2
2. Old state remains in localStorage
3. User comes back later, fills widget again
4. **New form data completely overwrites old state**
5. currentStep reset to 0
6. User starts fresh booking

### Flow 4: Direct Access to Booking Page

1. User tries to access `/booking` directly (e.g., from bookmark)
2. No trip details in store
3. **Redirect to homepage with message**
4. User must start from booking widget

## Benefits

✅ **Persistence**: Users don't lose progress if they refresh  
✅ **Clean State**: Automatically cleared after successful booking  
✅ **No Stale Data**: New bookings overwrite old data  
✅ **Validation**: Can't access booking page without basic details  
✅ **Simple**: No complex cleanup logic needed

## Testing Scenarios

- [ ] Complete a booking and verify state is cleared on confirmation page
- [ ] Refresh during booking and verify you can continue
- [ ] Start a new booking after completing one
- [ ] Try to access `/booking` page directly without filling widget
- [ ] Abandon booking, close browser, come back and start new booking

