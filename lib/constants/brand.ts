export const BRAND = {
  name: "AA Chauffeurs",
  tagline: "Premium Chauffeur Service",
  domain: "aacomfort.com",
  logo: "/images/logo-transparent.png",
  email: {
    bookings: "info@aacomfort.co.uk",
    support: "info@aacomfort.co.uk",
    admin: "info@aacomfort.co.uk",
  },
  phone: {
    display: "01902 246444",
    tel: "+441902246444",
  },
  storage: {
    bookingKey: "aacomfort-booking",
  },
} as const;

export const SITE_URL = `https://${BRAND.domain}`;
