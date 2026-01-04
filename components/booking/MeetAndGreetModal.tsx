"use client";

import React from "react";
import { Modal } from "antd";
import {
  InfoCircleOutlined,
  MailOutlined,
  FormOutlined,
} from "@ant-design/icons";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { BRAND } from "@/lib/constants/brand";

interface MeetAndGreetModalProps {
  open: boolean;
  onClose: () => void;
}

const MeetAndGreetModal: React.FC<MeetAndGreetModalProps> = ({
  open,
  onClose,
}) => {
  return (
    <Modal
      title={
        <div className="flex items-center gap-2 text-secondary">
          <InfoCircleOutlined className="text-primary text-xl" />
          <span className="text-lg font-semibold">Meet & Greet Service</span>
        </div>
      }
      open={open}
      onCancel={onClose}
      footer={
        <div className="flex justify-end">
          <Button type="primary" onClick={onClose}>
            Got it
          </Button>
        </div>
      }
      width={520}
    >
      <div className="space-y-4 py-2">
        <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
          <h4 className="font-semibold text-secondary mb-2">
            What is Meet & Greet?
          </h4>
          <p className="text-gray-600 text-sm">
            Our Meet & Greet service ensures a smooth airport pickup experience.
            Your driver will be waiting for you in the arrivals hall, holding a{" "}
            <strong>personalised placard with your name</strong> (as provided in
            the booking notes).
          </p>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-semibold text-secondary mb-2">
            Service Includes
          </h4>
          <ul className="text-gray-600 text-sm space-y-1 list-disc list-inside">
            <li>Driver waiting in arrivals with name placard</li>
            <li>Assistance with your luggage</li>
            <li>Flight tracking for delayed arrivals</li>
          </ul>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h4 className="font-semibold text-secondary mb-2 flex items-center gap-2">
            <span>💷</span> Additional Charges Apply
          </h4>
          <p className="text-gray-600 text-sm">
            The Meet & Greet service includes an additional charge which will be
            added to your fare. The exact amount depends on the vehicle type
            selected.
          </p>
        </div>

        <div className="border-t border-gray-200 pt-4">
          <h4 className="font-semibold text-secondary mb-3">
            Need More Information?
          </h4>
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href={`mailto:${BRAND.email.support}`}
              className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
            >
              <MailOutlined />
              <span>Email us at {BRAND.email.support}</span>
            </a>
            <Link
              href="/contact"
              className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
            >
              <FormOutlined />
              <span>Fill out our contact form</span>
            </Link>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default MeetAndGreetModal;
