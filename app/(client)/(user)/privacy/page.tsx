import Container from "@/components/Container";
import Link from "next/link";
import React from "react";

const PrivacyPage = () => {
  return (
    <Container>
      <div className="max-w-4xl mx-auto px-4 py-12 space-y-10 text-gray-800">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-darkColor">
          Privacy Policy
        </h1>

        <p className="text-center text-gray-600">Effective Date: 04/07/2025</p>

        <p className="text-gray-700 leading-relaxed">
          At <span className="font-semibold">Fear-Not Lifestyle</span>, your
          privacy is extremely important to us. This Privacy Policy explains how
          we collect, use, and protect your personal information when you visit
          our website or purchase our products.
        </p>

        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-darkColor">
            1. Information We Collect
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>
              <span className="font-semibold">Personal Information:</span> When
              you make a purchase or register on our site, we may collect your
              name, email, phone number, shipping address, and payment details.
            </li>
            <li>
              <span className="font-semibold">Browsing Data:</span> We
              automatically collect data such as IP address, browser type,
              device information, and pages visited using cookies and analytics
              tools.
            </li>
            <li>
              <span className="font-semibold">Voluntary Information:</span> You
              may provide information through customer service interactions,
              surveys, or reviews.
            </li>
          </ul>

          <h2 className="text-xl font-semibold text-darkColor">
            2. How We Use Your Information
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>To process orders, payments, and deliveries</li>
            <li>
              To communicate order updates and promotional content (with your
              consent)
            </li>
            <li>
              To improve website functionality, user experience, and product
              offerings
            </li>
            <li>
              To prevent fraudulent transactions and maintain website security
            </li>
          </ul>

          <h2 className="text-xl font-semibold text-darkColor">
            3. Data Sharing & Disclosure
          </h2>
          <p className="text-gray-700 leading-relaxed">
            We do not sell or rent your personal information to third parties.
            We may share your data with trusted partners only when necessary to:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>
              Fulfill your orders (e.g., payment processors, shipping partners)
            </li>
            <li>Comply with legal obligations or respond to lawful requests</li>
            <li>
              Protect the rights, safety, and property of Fear-Not Lifestyle and
              its users
            </li>
          </ul>

          <h2 className="text-xl font-semibold text-darkColor">
            4. Cookies & Tracking Technologies
          </h2>
          <p className="text-gray-700 leading-relaxed">
            We use cookies and similar technologies to analyze website traffic,
            personalize your experience, and enhance security. You can control
            cookie preferences in your browser settings.
          </p>

          <h2 className="text-xl font-semibold text-darkColor">
            5. Data Security
          </h2>
          <p className="text-gray-700 leading-relaxed">
            We implement technical and organizational measures to protect your
            personal data. However, no method of transmission over the internet
            is 100% secure, and we cannot guarantee absolute security.
          </p>

          <h2 className="text-xl font-semibold text-darkColor">
            6. Your Rights & Choices
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>
              You can access, update, or delete your personal information by
              contacting us
            </li>
            <li>
              You may opt-out of marketing emails by clicking the
              &quot;unsubscribe&quot; link in our emails
            </li>
            <li>
              You can disable cookies through your browser, but some site
              features may not function properly
            </li>
          </ul>

          <h2 className="text-xl font-semibold text-darkColor">
            7. Third-Party Links
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Our website may contain links to third-party sites. We are not
            responsible for their privacy practices or content. Please review
            their policies before providing personal information.
          </p>

          <h2 className="text-xl font-semibold text-darkColor">
            8. Changes to This Policy
          </h2>
          <p className="text-gray-700 leading-relaxed">
            We reserve the right to update this Privacy Policy at any time.
            Changes will be posted on this page with a revised effective date.
            Please review periodically for updates.
          </p>

          <h2 className="text-xl font-semibold text-darkColor">
            9. Contact Us
          </h2>
          <p className="text-gray-700 leading-relaxed">
            If you have any questions or concerns about this Privacy Policy,
            please{" "}
            <Link href={"/contact"} className="underline">
              contact us.
            </Link>
          </p>
        </div>
      </div>
    </Container>
  );
};

export default PrivacyPage;
