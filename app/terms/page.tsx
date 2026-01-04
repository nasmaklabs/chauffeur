"use client";

import React from "react";
import { Typography } from "antd";
import Section from "@/components/ui/Section";
import { BRAND } from "@/lib/constants/brand";
import { ADDRESS } from "@/lib/constants/address";

const { Paragraph, Text } = Typography;

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-secondary text-white py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Terms &amp; Conditions
          </h1>
          <p className="text-xl text-gray-300">
            Please read our terms and conditions carefully
          </p>
        </div>
      </section>

      <Section className="py-16">
        <div className="max-w-4xl mx-auto">
          <Typography className="text-foreground">
            {/* Introduction */}
            <Paragraph className="text-text-secondary! mb-8! text-lg!">
              These terms and conditions and the web-based booking form
              constitute the entire Agreement concerning the provision of Taxi
              service (&quot;Service&quot;) between you and {BRAND.name}.
              Completion of the booking and use of the Service indicates your
              unconditional acceptance of the terms and conditions set out in
              this Agreement.
            </Paragraph>

            {/* Terms List */}
            <div className="space-y-6">
              {/* Term 1 */}
              <div>
                <Paragraph className="text-text-secondary! mb-2!">
                  <Text strong className="text-secondary!">
                    1.
                  </Text>{" "}
                  Our company may change these terms and conditions at any time.
                  Existing bookings will be at the rate booking is made.
                </Paragraph>
              </div>

              {/* Term 2 */}
              <div>
                <Paragraph className="text-text-secondary! mb-2!">
                  <Text strong className="text-secondary!">
                    2.
                  </Text>{" "}
                  We request a minimum of 3 hours notice for any online
                  bookings. If your booking is less than 3 hours, please contact
                  our office through email to check availability.
                </Paragraph>
              </div>

              {/* Term 3 */}
              <div>
                <Paragraph className="text-text-secondary! mb-2!">
                  <Text strong className="text-secondary!">
                    3.
                  </Text>{" "}
                  You must allow sufficient time when booking your taxi to allow
                  for the check-in times required by your airline and for any
                  delays caused by traffic conditions. We shall not be
                  responsible for any delay caused by your failure to allow
                  enough time to reach your destination or if the passengers are
                  not ready for collection at the booked time.
                </Paragraph>
              </div>

              {/* Term 4 */}
              <div>
                <Paragraph className="text-text-secondary! mb-2!">
                  <Text strong className="text-secondary!">
                    4.
                  </Text>{" "}
                  You must order a suitable car size for the number of
                  passengers and luggage. Our company cannot guarantee to carry
                  excessive amounts of luggage.
                </Paragraph>
              </div>

              {/* Term 5 */}
              <div>
                <Paragraph className="text-text-secondary! mb-2!">
                  <Text strong className="text-secondary!">
                    5.
                  </Text>{" "}
                  You must supply all information required on the booking form,
                  please use the special notes box to inform us of anything.
                </Paragraph>
              </div>

              {/* Term 6 */}
              <div>
                <Paragraph className="text-text-secondary! mb-2!">
                  <Text strong className="text-secondary!">
                    6.
                  </Text>{" "}
                  If there are any changes or variations including extra
                  mileage, extra waiting time or deviations to the journey other
                  than what was agreed at the time of booking, the client will
                  be charged extras in accordance with our pricing structure.
                </Paragraph>
              </div>

              {/* Term 7 */}
              <div>
                <Paragraph className="text-text-secondary! mb-2!">
                  <Text strong className="text-secondary!">
                    7.
                  </Text>{" "}
                  Incoming flights allows 45 mins free waiting time after which
                  waiting charges will apply. Please allow enough time for
                  immigration &amp; baggage to avoid unnecessary waiting
                  charges.
                </Paragraph>
              </div>

              {/* Term 8 */}
              <div>
                <Paragraph className="text-text-secondary! mb-2!">
                  <Text strong className="text-secondary!">
                    8.
                  </Text>{" "}
                  For airport pick up our driver will wait up to 90 minutes,
                  without having made contact with the passenger. If after 90
                  minutes driver still has not made contact with passenger, this
                  will result as a no show &amp; no refund will be offered.
                </Paragraph>
              </div>

              {/* Term 9 */}
              <div>
                <Paragraph className="text-text-secondary! mb-2!">
                  <Text strong className="text-secondary!">
                    9.
                  </Text>{" "}
                  If you need to cancel your booking, please contact{" "}
                  {BRAND.name} as soon as possible. We will be happy to cancel
                  &amp; refund a booking as long as we have 24 hours notice. If
                  you cancel a booking after the vehicle has been dispatched
                  then a charge will be incurred; the charge will be based on
                  the distance/time that the allocated driver has
                  travelled/spent prior to the point of cancellation.
                </Paragraph>
              </div>

              {/* Term 10 */}
              <div>
                <Paragraph className="text-text-secondary! mb-2!">
                  <Text strong className="text-secondary!">
                    10.
                  </Text>{" "}
                  We take complaints very seriously and investigate every
                  complaint thoroughly. Please contact our office through email
                  quoting your reference number and as much information as
                  possible.
                </Paragraph>
              </div>

              {/* Term 11 */}
              <div>
                <Paragraph className="text-text-secondary! mb-2!">
                  <Text strong className="text-secondary!">
                    11.
                  </Text>{" "}
                  At times our company may use sub contractors/partner company
                  to cover a journey.
                </Paragraph>
              </div>

              {/* Term 12 */}
              <div>
                <Paragraph className="text-text-secondary! mb-2!">
                  <Text strong className="text-secondary!">
                    12.
                  </Text>{" "}
                  You shall be responsible for the behaviour of all the
                  passengers in the car during the journey. You will be charged
                  to cover cleaning costs in the unlikely event of the vehicle
                  being soiled by any passenger. A full receipt can be emailed
                  direct to you or a hand written business card size receipt can
                  be supplied by your driver. *Please note that an emailed
                  receipt can take up to two working days if asked for on the
                  day of travel to your driver*
                </Paragraph>
              </div>

              {/* Term 13 */}
              <div>
                <Paragraph className="text-text-secondary! mb-2!">
                  <Text strong className="text-secondary!">
                    13.
                  </Text>{" "}
                  Our company have the right to refuse to carry any passenger
                  who is thought to be under the influence of alcohol or drugs.
                </Paragraph>
              </div>

              {/* Term 14 */}
              <div>
                <Paragraph className="text-text-secondary! mb-2!">
                  <Text strong className="text-secondary!">
                    14.
                  </Text>{" "}
                  Our company will refuse or terminate any booking with
                  immediate effect if your behaviour possess any driver or
                  vehicle at risk of damage, violence or abuse by you or any
                  passenger in your party. All passengers will be asked to
                  vacate the vehicle as soon as it is safe to do so. No refund
                  will be given.
                </Paragraph>
              </div>

              {/* Term 15 */}
              <div>
                <Paragraph className="text-text-secondary! mb-2!">
                  <Text strong className="text-secondary!">
                    15.
                  </Text>{" "}
                  Our company will track all incoming flights, to ensure our
                  driver reaches you at your specified time.
                </Paragraph>
              </div>

              {/* Term 16 */}
              <div>
                <Paragraph className="text-text-secondary! mb-2!">
                  <Text strong className="text-secondary!">
                    16.
                  </Text>{" "}
                  Whilst we do our utmost to ensure our drivers are punctual and
                  arrive on time, you will understand that we cannot accept
                  responsibility for delays caused by circumstances beyond our
                  control.
                </Paragraph>
              </div>

              {/* Term 17 */}
              <div>
                <Paragraph className="text-text-secondary! mb-2!">
                  <Text strong className="text-secondary!">
                    17.
                  </Text>{" "}
                  Our company shall use all reasonable endeavours to get you to
                  your destination on time, but shall not be liable for any loss
                  due to delays caused by road or traffic conditions beyond its
                  control on the journey.
                </Paragraph>
              </div>

              {/* Term 18 */}
              <div>
                <Paragraph className="text-text-secondary! mb-2!">
                  <Text strong className="text-secondary!">
                    18.
                  </Text>{" "}
                  Please note that a child, no matter what age, counts as one
                  passenger. If a child seat is required please inform the
                  office at the time of booking. We will try our utmost best to
                  provide a baby/booster seat. Or if you have your own child
                  seat you are most welcome to bring it. Please note that the
                  installation of the child seat must be carried out by you.
                </Paragraph>
              </div>

              {/* Term 19 */}
              <div>
                <Paragraph className="text-text-secondary! mb-2!">
                  <Text strong className="text-secondary!">
                    19.
                  </Text>{" "}
                  If the driver is stuck in traffic or for any other reasons
                  cannot reach in time at the point of collection, we will try
                  to provide you with a car from one of our partners.
                </Paragraph>
              </div>

              {/* Term 20 */}
              <div>
                <Paragraph className="text-text-secondary! mb-2!">
                  <Text strong className="text-secondary!">
                    20.
                  </Text>{" "}
                  In the event that our driver does not show up at the scheduled
                  time for collection, please contact our office through email.
                  If you leave the pickup point without informing us we will not
                  be liable for any compensation to you. If you take a minicab
                  or a black cab from another company without our consent we
                  will not be liable to pay you the price for it or refund you.
                </Paragraph>
              </div>

              {/* Term 21 */}
              <div>
                <Paragraph className="text-text-secondary! mb-2!">
                  <Text strong className="text-secondary!">
                    21.
                  </Text>{" "}
                  We reserve the right to change without notice, your Minicab,
                  Taxi, and Chauffeur or Chauffeur driver at any time if
                  necessary. Our company maintains a strict non-smoking policy
                  in all its vehicles. Eating, drinking and smoking are not
                  permitted in our vehicles.
                </Paragraph>
              </div>

              {/* Term 22 */}
              <div>
                <Paragraph className="text-text-secondary! mb-2!">
                  <Text strong className="text-secondary!">
                    22.
                  </Text>{" "}
                  All our vehicles are fully insured for passenger and third
                  party claims. However, customer&apos;s properties are carried
                  entirely at their own risk.
                </Paragraph>
              </div>

              {/* Term 23 */}
              <div>
                <Paragraph className="text-text-secondary! mb-2!">
                  <Text strong className="text-secondary!">
                    23.
                  </Text>{" "}
                  Clients are responsible for ensuring that their luggage is
                  loaded/unloaded at all times. Our company or our sub
                  contractors shall not be held responsible/liable for any
                  loss/damage to such property.
                </Paragraph>
              </div>

              {/* Term 24 */}
              <div>
                <Paragraph className="text-text-secondary! mb-2!">
                  <Text strong className="text-secondary!">
                    24.
                  </Text>{" "}
                  If the car breaks down during your journey, our company will
                  endeavour to arrange an alternative car to complete the
                  journey as soon as possible.
                </Paragraph>
              </div>

              {/* Term 25 */}
              <div>
                <Paragraph className="text-text-secondary! mb-2!">
                  <Text strong className="text-secondary!">
                    25.
                  </Text>{" "}
                  Our company shall be entitled to cancel all services and
                  provide refunds in the event of a declared national emergency,
                  riot, war, fuel shortage, extreme weather or terrorist attack,
                  or other circumstances beyond its control.
                </Paragraph>
              </div>

              {/* Term 26 */}
              <div>
                <Paragraph className="text-text-secondary! mb-2!">
                  <Text strong className="text-secondary!">
                    26.
                  </Text>{" "}
                  It is illegal to make a private booking with our drivers. Our
                  company will not be liable for any situation faced by the
                  passenger while travelling on a booking not confirmed with the
                  office.
                </Paragraph>
              </div>
            </div>

            {/* Footer Note */}
            <div className="mt-12 pt-8 border-t border-border">
              <Paragraph className="text-text-secondary! mb-4!">
                Please note that some calls may be recorded for quality and
                training purposes.{" "}
                <a href="/privacy" className="text-primary hover:underline">
                  Privacy Policy
                </a>
              </Paragraph>

              <Paragraph className="text-text-secondary! mb-2!">
                <Text strong>Address:</Text> {ADDRESS}
              </Paragraph>

              <Paragraph className="text-text-secondary!">
                <Text strong>Contact Email:</Text>{" "}
                <a
                  href={`mailto:${BRAND.email.support}`}
                  className="text-primary hover:underline"
                >
                  {BRAND.email.support}
                </a>
              </Paragraph>
            </div>
          </Typography>
        </div>
      </Section>
    </main>
  );
}
