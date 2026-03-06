import { items } from '@wix/data';
import { services } from '@wix/bookings';
import { createClient, ApiKeyStrategy } from '@wix/sdk';

const wixClient = createClient({
    modules: { items, services },
    auth: ApiKeyStrategy({
        apiKey: 'IST.eyJraWQiOiJQb3pIX2FDMiIsImFsZyI6IlJTMjU2In0.eyJkYXRhIjoie1wiaWRcIjpcIjJmMTkxNzAxLTk0MzgtNDU5My04YTNkLTQwNDU2NmUyMmNkOFwiLFwiaWRlbnRpdHlcIjp7XCJ0eXBlXCI6XCJhcHBsaWNhdGlvblwiLFwiaWRcIjpcImI3MjBmZGExLWYyNTAtNGU4OS05YjgyLTk3N2U5YzEyNGJhZVwifSxcInRlbmFudFwiOntcInR5cGVcIjpcImFjY291bnRcIixcImlkXCI6XCIxMjQ5MWE3Mi0yYWQ5LTQwYWMtYTYzOC1hNmU1MDMzM2NjNTVcIn19IiwiaWF0IjoxNzcyODI0MDQxfQ.IW-ohAFTlpicPmrW67rl7tzoq_qdq1QXsF4WNCJWcoMu8nuvHoAuI2LdKhmuJhZwIscKxiZuZkNCcrCqptN_9uTTfByY7RQVFK9KiYujU1_bx28r4MaCr5BsSuWaGbaXve_zHztwObdZxy1QCoONHxNeXrgq9HWX7EgAfl0eK31Xv3mkJnFkgaQKsPPsz1pmMvOlR-Mw9pysQmECSu30GdsFCtE08cOhmd37Z8LQbx3StDWLEEceqcNSEuzp__72x9GDAuQL1V0l0SAKTCfBI-MXA3scQ-tByya78QoJ9zmdOQQJCMbDFV-G7ovV4H-J461Txdap5JHdttLJsREWQg',
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
