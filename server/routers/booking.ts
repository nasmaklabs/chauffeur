import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { prisma } from "@/lib/prisma";
import { generateBookingReference } from "@/lib/utils/booking-reference";
import { sendEmail, getInternalEmail } from "@/lib/services/email-service";
import {
  generateBookingConfirmationEmail,
  generateNewBookingNotificationEmail,
  type BookingEmailData,
} from "@/lib/services/email-templates";

const coordinatesSchema = z
  .object({
    lat: z.number(),
    lng: z.number(),
  })
  .nullable()
  .optional();

const createBookingSchema = z.object({
  tripType: z.enum(["one-way", "round-trip", "hourly"]),
  pickupLocation: z.string().min(1, "Pickup location is required"),
  dropoffLocation: z.string().optional(),
  pickupCoordinates: coordinatesSchema,
  dropoffCoordinates: coordinatesSchema,
  distance: z.number().nullable().optional(),
  date: z.string().min(1, "Date is required"),
  time: z.string().min(1, "Time is required"),
  returnDate: z.string().optional(),
  returnTime: z.string().optional(),
  duration: z.string().optional(),
  vehicleType: z.string().optional(),
  selectedVehicle: z.string().optional(),
  passengers: z.number().int().min(1).default(1),
  luggage: z.number().int().min(0).default(0),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z
    .string()
    .regex(
      /^(?:\+44|0)(?:\d\s?){9,10}$/,
      "Please enter a valid UK phone number"
    )
    .optional()
    .or(z.literal("")),
  flightNumber: z.string().optional(),
  notes: z.string().optional(),
  baseFare: z.number().optional(),
  distanceCharge: z.number().optional(),
  totalPrice: z.number().optional(),
  meetAndGreet: z.boolean().optional().default(false),
});

const updateStatusSchema = z.object({
  id: z.string(),
  status: z.enum(["pending", "confirmed", "completed", "cancelled"]),
});

export const bookingRouter = createTRPCRouter({
  create: publicProcedure
    .input(createBookingSchema)
    .mutation(async ({ input }) => {
      try {
        const bookingReference = generateBookingReference();
        const finalVehicle = input.selectedVehicle || input.vehicleType;

        const booking = await prisma.booking.create({
          data: {
            bookingReference,
            tripType: input.tripType,
            pickupLocation: input.pickupLocation,
            dropoffLocation: input.dropoffLocation || null,
            pickupLat: input.pickupCoordinates?.lat,
            pickupLng: input.pickupCoordinates?.lng,
            dropoffLat: input.dropoffCoordinates?.lat,
            dropoffLng: input.dropoffCoordinates?.lng,
            distance: input.distance,
            date: input.date,
            time: input.time,
            returnDate: input.returnDate,
            returnTime: input.returnTime,
            duration: input.duration,
            vehicleType: finalVehicle,
            selectedVehicle: finalVehicle,
            passengers: input.passengers,
            luggage: input.luggage,
            firstName: input.firstName,
            lastName: input.lastName,
            email: input.email,
            phoneNumber: input.phoneNumber || null,
            flightNumber: input.flightNumber,
            notes: input.notes,
            baseFare: input.baseFare,
            distanceCharge: input.distanceCharge,
            totalPrice: input.totalPrice,
            meetAndGreet: input.meetAndGreet || false,
            status: "pending",
          },
        });

        // Prepare email data
        const emailData: BookingEmailData = {
          bookingReference: booking.bookingReference,
          firstName: booking.firstName || input.firstName,
          lastName: booking.lastName || input.lastName,
          email: booking.email || input.email,
          phoneNumber: booking.phoneNumber,
          tripType: booking.tripType,
          pickupLocation: booking.pickupLocation,
          dropoffLocation: booking.dropoffLocation,
          date: booking.date,
          time: booking.time,
          returnDate: booking.returnDate,
          returnTime: booking.returnTime,
          duration: booking.duration,
          vehicleType: booking.vehicleType,
          passengers: booking.passengers,
          luggage: booking.luggage,
          flightNumber: booking.flightNumber,
          notes: booking.notes,
          totalPrice: booking.totalPrice,
          meetAndGreet: input.meetAndGreet || false,
          status: booking.status,
        };

        const customerEmail = booking.email || input.email;

        // Send confirmation email to customer (non-blocking)
        sendEmail({
          to: customerEmail,
          subject: `Booking Confirmation - ${booking.bookingReference} | AA Comfort`,
          html: generateBookingConfirmationEmail(emailData),
        }).catch((error) => {
          console.error("Failed to send customer confirmation email:", error);
        });

        // Send notification email to internal team (non-blocking)
        sendEmail({
          to: getInternalEmail(),
          subject: `New Booking: ${booking.bookingReference} - ${emailData.firstName} ${emailData.lastName}`,
          html: generateNewBookingNotificationEmail(emailData),
          replyTo: customerEmail,
        }).catch((error) => {
          console.error("Failed to send internal notification email:", error);
        });

        return {
          success: true,
          booking,
          message: "Booking created successfully",
        };
      } catch (error) {
        console.error("Error creating booking:", error);
        throw new Error("Failed to create booking. Please try again.");
      }
    }),

  getByReference: publicProcedure
    .input(z.object({ reference: z.string() }))
    .query(async ({ input }) => {
      const booking = await prisma.booking.findUnique({
        where: { bookingReference: input.reference },
      });

      if (!booking) {
        throw new Error("Booking not found");
      }

      return booking;
    }),

  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const booking = await prisma.booking.findUnique({
        where: { id: input.id },
      });

      if (!booking) {
        throw new Error("Booking not found");
      }

      return booking;
    }),

  list: publicProcedure
    .input(
      z.object({
        status: z
          .enum(["pending", "confirmed", "completed", "cancelled", "all"])
          .optional(),
        limit: z.number().min(1).max(100).default(50),
        cursor: z.string().optional(),
      })
    )
    .query(async ({ input }) => {
      const { status, limit, cursor } = input;

      const bookings = await prisma.booking.findMany({
        take: limit + 1,
        where: status && status !== "all" ? { status } : undefined,
        orderBy: { createdAt: "desc" },
        cursor: cursor ? { id: cursor } : undefined,
      });

      let nextCursor: typeof cursor | undefined = undefined;
      if (bookings.length > limit) {
        const nextItem = bookings.pop();
        nextCursor = nextItem!.id;
      }

      return {
        bookings,
        nextCursor,
      };
    }),

  updateStatus: publicProcedure
    .input(updateStatusSchema)
    .mutation(async ({ input }) => {
      const booking = await prisma.booking.update({
        where: { id: input.id },
        data: { status: input.status },
      });

      return {
        success: true,
        booking,
        message: "Booking status updated",
      };
    }),

  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      await prisma.booking.delete({
        where: { id: input.id },
      });

      return {
        success: true,
        message: "Booking deleted",
      };
    }),

  stats: publicProcedure.query(async () => {
    const [total, pending, confirmed, completed, cancelled] = await Promise.all(
      [
        prisma.booking.count(),
        prisma.booking.count({ where: { status: "pending" } }),
        prisma.booking.count({ where: { status: "confirmed" } }),
        prisma.booking.count({ where: { status: "completed" } }),
        prisma.booking.count({ where: { status: "cancelled" } }),
      ]
    );

    return {
      total,
      pending,
      confirmed,
      completed,
      cancelled,
    };
  }),
});
