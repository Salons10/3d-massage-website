import { items } from '@wix/data';
import { services } from '@wix/bookings';
import { createClient, ApiKeyStrategy } from '@wix/sdk';

const wixClient = createClient({
    modules: { items, services },
    auth: ApiKeyStrategy({
        apiKey: import.meta.env.VITE_WIX_API_KEY,
        siteId: 'bc74b7fb-181e-41d2-9329-a1b46a57fede',
    }),
});

export default wixClient;

export const WIX_COLLECTIONS = {
    SERVICES: 'Services',
    BOOKINGS: 'Bookings',
};

// ──────────────────────────────────────────
//  Wix Booking Page URL
//  IMPORTANT: Replace this with your actual Wix booking page URL.
//  Find it in: Wix Dashboard → Bookings → Settings → Booking Page
//  It will look like: https://yourdomain.com/booking-calendar
//  or: https://username.wixsite.com/sitename/booking-calendar
// ──────────────────────────────────────────
export const WIX_BOOKING_URL = 'https://saalonso811.wixsite.com/my-site-1/book-online';
