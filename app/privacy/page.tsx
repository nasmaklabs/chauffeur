"use client";

import React from "react";
import { Typography } from "antd";
import Section from "@/components/ui/Section";
import { BRAND } from "@/lib/constants/brand";
import { ADDRESS } from "@/lib/constants/address";

const { Title, Paragraph, Text } = Typography;

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-secondary text-white py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-xl text-gray-300">
            Your privacy is important to us
          </p>
        </div>
      </section>

      <Section className="py-16">
        <div className="max-w-4xl mx-auto">
          <Typography className="text-foreground">
            {/* Owner and Data Controller */}
            <Title level={3} className="!text-secondary !mb-4">
              Owner and Data Controller
            </Title>
            <Paragraph className="!text-text-secondary !mb-2">
              <Text strong>Company Name:</Text> {BRAND.name}
            </Paragraph>
            <Paragraph className="!text-text-secondary !mb-2">
              <Text strong>Address:</Text> {ADDRESS}
            </Paragraph>
            <Paragraph className="!text-text-secondary !mb-6">
              <Text strong>Contact Email:</Text>{" "}
              <a href={`mailto:${BRAND.email.support}`} className="text-primary hover:underline">
                {BRAND.email.support}
              </a>
            </Paragraph>

            {/* Types of Data Collected */}
            <Title level={3} className="!text-secondary !mb-4">
              Types of Data Collected
            </Title>
            <Paragraph className="!text-text-secondary !mb-4">
              Among the types of Personal Data that this Website and our services collect, by itself or through third parties, there are:
            </Paragraph>
            <ul className="list-disc pl-6 mb-6 text-text-secondary space-y-2">
              <li>Cookies and Usage Data</li>
              <li>Email addresses</li>
              <li>Phone numbers</li>
              <li>Names and contact details</li>
              <li>Pickup and drop-off addresses</li>
              <li>Payment information (processed securely by third-party payment providers)</li>
              <li>Location data (when using our booking services)</li>
            </ul>
            <Paragraph className="!text-text-secondary !mb-4">
              Complete details on each type of Personal Data collected are provided in the dedicated sections of this privacy policy or by specific explanation texts displayed prior to the Data collection.
            </Paragraph>
            <Paragraph className="!text-text-secondary !mb-6">
              Personal Data may be freely provided by the User, or, in the case of Usage Data, collected automatically when using this Website. Unless specified otherwise, all Data requested by this Website is mandatory and failure to provide this Data may make it impossible for this Website to provide its services.
            </Paragraph>

            {/* Methods of Processing */}
            <Title level={3} className="!text-secondary !mb-4">
              Methods of Processing
            </Title>
            <Paragraph className="!text-text-secondary !mb-4">
              The Owner takes appropriate security measures to prevent unauthorized access, disclosure, modification, or unauthorized destruction of the Data.
            </Paragraph>
            <Paragraph className="!text-text-secondary !mb-6">
              The Data processing is carried out using computers and/or IT enabled tools, following organizational procedures and modes strictly related to the purposes indicated. In addition to the Owner, in some cases, the Data may be accessible to certain types of persons in charge, involved with the operation of this Website (administration, sales, marketing, legal, system administration) or external parties (such as third-party technical service providers, mail carriers, hosting providers, IT companies, communications agencies) appointed, if necessary, as Data Processors by the Owner.
            </Paragraph>

            {/* Legal Basis of Processing */}
            <Title level={3} className="!text-secondary !mb-4">
              Legal Basis of Processing
            </Title>
            <Paragraph className="!text-text-secondary !mb-4">
              The Owner may process Personal Data relating to Users if one of the following applies:
            </Paragraph>
            <ul className="list-disc pl-6 mb-6 text-text-secondary space-y-2">
              <li>Users have given their consent for one or more specific purposes.</li>
              <li>Provision of Data is necessary for the performance of an agreement with the User and/or for any pre-contractual obligations thereof.</li>
              <li>Processing is necessary for compliance with a legal obligation to which the Owner is subject.</li>
              <li>Processing is related to a task that is carried out in the public interest or in the exercise of official authority vested in the Owner.</li>
              <li>Processing is necessary for the purposes of the legitimate interests pursued by the Owner or by a third party.</li>
            </ul>
            <Paragraph className="!text-text-secondary !mb-6">
              In any case, the Owner will gladly help to clarify the specific legal basis that applies to the processing, and in particular, whether the provision of Personal Data is a statutory or contractual requirement, or a requirement necessary to enter into a contract.
            </Paragraph>

            {/* Place of Processing */}
            <Title level={3} className="!text-secondary !mb-4">
              Place of Processing
            </Title>
            <Paragraph className="!text-text-secondary !mb-4">
              The Data is processed at the Owner&apos;s operating offices and in any other places where the parties involved in the processing are located.
            </Paragraph>
            <Paragraph className="!text-text-secondary !mb-6">
              Depending on the User&apos;s location, data transfers may involve transferring the User&apos;s Data to a country other than their own. Users are entitled to learn about the legal basis of Data transfers to a country outside the European Union or to any international organization governed by public international law.
            </Paragraph>

            {/* Retention Time */}
            <Title level={3} className="!text-secondary !mb-4">
              Retention Time
            </Title>
            <Paragraph className="!text-text-secondary !mb-4">
              Personal Data shall be processed and stored for as long as required by the purpose they have been collected for. Therefore:
            </Paragraph>
            <ul className="list-disc pl-6 mb-6 text-text-secondary space-y-2">
              <li>Personal Data collected for purposes related to the performance of a contract between the Owner and the User shall be retained until such contract has been fully performed.</li>
              <li>Personal Data collected for the purposes of the Owner&apos;s legitimate interests shall be retained as long as needed to fulfill such purposes.</li>
              <li>The Owner may be allowed to retain Personal Data for a longer period whenever the User has given consent to such processing, as long as such consent is not withdrawn.</li>
              <li>The Owner may be obliged to retain Personal Data for a longer period whenever required to do so for the performance of a legal obligation or upon order of an authority.</li>
            </ul>
            <Paragraph className="!text-text-secondary !mb-6">
              Once the retention period expires, Personal Data shall be deleted. Therefore, the right to access, the right to erasure, the right to rectification, and the right to data portability cannot be enforced after the expiration of the retention period.
            </Paragraph>

            {/* Purposes of Processing */}
            <Title level={3} className="!text-secondary !mb-4">
              Purposes of Processing
            </Title>
            <Paragraph className="!text-text-secondary !mb-4">
              The Data concerning the User is collected to allow the Owner to provide its Services, as well as for the following purposes:
            </Paragraph>
            <ul className="list-disc pl-6 mb-6 text-text-secondary space-y-2">
              <li>Processing and managing bookings</li>
              <li>Analytics and service improvement</li>
              <li>Managing contacts and sending messages</li>
              <li>Customer support and communication</li>
              <li>Payment processing</li>
              <li>Legal compliance and fraud prevention</li>
            </ul>

            {/* Location Information */}
            <Title level={3} className="!text-secondary !mb-4">
              Location Information
            </Title>
            <Paragraph className="!text-text-secondary !mb-4">
              When you use our booking services, we may request permission to access your location information, which includes location data collected via device GPS and Wi-Fi signals. We use your device&apos;s GPS for fetching the most accurate location to:
            </Paragraph>
            <ul className="list-disc pl-6 mb-6 text-text-secondary space-y-2">
              <li>Help you quickly enter your pickup location</li>
              <li>Assign the nearest available drivers to your location</li>
              <li>Help drivers navigate to your pickup spot</li>
              <li>Provide accurate fare estimates</li>
            </ul>
            <Paragraph className="!text-text-secondary !mb-6">
              You can always manage your location settings in your device&apos;s location preferences. Location services are optional, and you can still use our services by manually entering your pickup and drop-off locations.
            </Paragraph>

            {/* Rights of Users */}
            <Title level={3} className="!text-secondary !mb-4">
              The Rights of Users
            </Title>
            <Paragraph className="!text-text-secondary !mb-4">
              Users may exercise certain rights regarding their Data processed by the Owner. In particular, Users have the right to:
            </Paragraph>
            <ul className="list-disc pl-6 mb-6 text-text-secondary space-y-2">
              <li><Text strong>Withdraw their consent at any time.</Text> Users have the right to withdraw consent where they have previously given their consent to the processing of their Personal Data.</li>
              <li><Text strong>Object to processing of their Data.</Text> Users have the right to object to the processing of their Data if the processing is carried out on a legal basis other than consent.</li>
              <li><Text strong>Access their Data.</Text> Users have the right to learn if Data is being processed by the Owner, obtain disclosure regarding certain aspects of the processing and obtain a copy of the Data undergoing processing.</li>
              <li><Text strong>Verify and seek rectification.</Text> Users have the right to verify the accuracy of their Data and ask for it to be updated or corrected.</li>
              <li><Text strong>Restrict the processing of their Data.</Text> Users have the right, under certain circumstances, to restrict the processing of their Data.</li>
              <li><Text strong>Have their Personal Data deleted or otherwise removed.</Text> Users have the right, under certain circumstances, to obtain the erasure of their Data from the Owner.</li>
              <li><Text strong>Receive their Data and have it transferred to another controller.</Text> Users have the right to receive their Data in a structured, commonly used, and machine-readable format.</li>
              <li><Text strong>Lodge a complaint.</Text> Users have the right to bring a claim before their competent data protection authority.</li>
            </ul>

            {/* How to Exercise Rights */}
            <Title level={3} className="!text-secondary !mb-4">
              How to Exercise These Rights
            </Title>
            <Paragraph className="!text-text-secondary !mb-6">
              Any requests to exercise User rights can be directed to the Owner through the contact details provided in this document. These requests can be exercised free of charge and will be addressed by the Owner as early as possible and always within one month.
            </Paragraph>

            {/* Legal Action */}
            <Title level={3} className="!text-secondary !mb-4">
              Legal Action
            </Title>
            <Paragraph className="!text-text-secondary !mb-6">
              The User&apos;s Personal Data may be used for legal purposes by the Owner in Court or in the stages leading to possible legal action arising from improper use of this Website or the related Services. The User declares to be aware that the Owner may be required to reveal personal data upon request of public authorities.
            </Paragraph>

            {/* System Logs & Maintenance */}
            <Title level={3} className="!text-secondary !mb-4">
              System Logs &amp; Maintenance
            </Title>
            <Paragraph className="!text-text-secondary !mb-6">
              For operation and maintenance purposes, this Website and any third-party services may collect files that record interaction with this Website (System logs) and use other Personal Data (such as the IP Address) for this purpose.
            </Paragraph>

            {/* Changes to Privacy Policy */}
            <Title level={3} className="!text-secondary !mb-4">
              Changes to This Privacy Policy
            </Title>
            <Paragraph className="!text-text-secondary !mb-6">
              The Owner reserves the right to make changes to this privacy policy at any time by giving notice to its Users on this page and possibly within this Website. It is strongly recommended to check this page often, referring to the date of the last modification listed at the bottom.
            </Paragraph>

            {/* Contact */}
            <Title level={3} className="!text-secondary !mb-4">
              Contact Us
            </Title>
            <Paragraph className="!text-text-secondary !mb-4">
              If you have any questions about this Privacy Policy, please contact us:
            </Paragraph>
            <Paragraph className="!text-text-secondary !mb-2">
              <Text strong>Email:</Text>{" "}
              <a href={`mailto:${BRAND.email.support}`} className="text-primary hover:underline">
                {BRAND.email.support}
              </a>
            </Paragraph>
            <Paragraph className="!text-text-secondary !mb-6">
              <Text strong>Address:</Text> {ADDRESS}
            </Paragraph>

            <Paragraph className="!text-text-secondary !text-sm !mt-8">
              <Text italic>Last updated: January 2026</Text>
            </Paragraph>
          </Typography>
        </div>
      </Section>
    </main>
  );
}
