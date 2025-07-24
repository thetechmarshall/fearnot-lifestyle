import Container from "@/components/Container";
import Link from "next/link";
import React from "react";

const TermsPage = () => {
  return (
    <Container>
      <div className="max-w-4xl mx-auto px-4 py-12 space-y-10 text-gray-800">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-darkColor">
          Terms & Conditions
        </h1>

        <p className="text-center text-gray-600">Last Updated: 04/07/2025 </p>

        <p className="text-gray-700 leading-relaxed">
          Welcome to <span className="font-semibold">Fear-Not Lifestyle</span>.
          These Terms and Conditions outline the rules and regulations for using
          our website and purchasing our products. By accessing this website or
          placing an order, you agree to be bound by these Terms. If you do not
          agree with any part, please do not use our website.
        </p>

        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-darkColor">
            1. General Information
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Fear-Not Lifestyle is operated by <span className="font-semibold text-darkColor">Fear-Not Lifestyle</span>, specializing in faith-inspired streetwear and lifestyle
            apparel. We reserve the right to update or modify these Terms at any
            time. Changes take effect upon publication on this page.
          </p>

          <h2 className="text-2xl font-semibold text-darkColor">
            2. Eligibility
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Be at least 18 years old or have parental consent</li>
            <li>Provide accurate and truthful information</li>
            <li>Use the website for lawful purposes only</li>
          </ul>

          <h2 className="text-2xl font-semibold text-darkColor">
            3. Products & Pricing
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>
              All products, descriptions, and prices are subject to change
              without notice
            </li>
            <li>
              We strive to display products and colors accurately but cannot
              guarantee screen-to-screen consistency
            </li>
            <li>
              Fear-Not Lifestyle reserves the right to limit or cancel
              quantities purchased per person, household, or order
            </li>
          </ul>

          <h2 className="text-2xl font-semibold text-darkColor">
            4. Orders & Payment
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Orders are processed once payment is confirmed</li>
            <li>
              Accepted payment methods include Paystack, Debit
              Cards, etc.
            </li>
            <li>
              We reserve the right to refuse or cancel any order for reasons
              such as product unavailability, pricing errors, or suspected fraud
            </li>
          </ul>

          <h2 className="text-2xl font-semibold text-darkColor">
            5. Shipping & Delivery
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>
              Shipping times vary based on location and method chosen at
              checkout
            </li>
            <li>
              We are not responsible for delays caused by couriers, customs, or
              unforeseen events
            </li>
            <li>
              You are responsible for providing accurate shipping information
            </li>
          </ul>

          <h2 className="text-2xl font-semibold text-darkColor">
            6. Returns & Exchanges
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Returns are accepted within 7 days of delivery</li>
            <li>Items must be unworn, unwashed, and in original packaging</li>
            <li>
              Sale items or customized products may not be eligible for returns
            </li>
            <li>Contact us at <Link href={"/contact"} className="font-bold underline">fearnotlifestyle@gmail.com</Link> to start a return</li>
          </ul>

          <h2 className="text-2xl font-semibold text-darkColor">
            7. Intellectual Property
          </h2>
          <p className="text-gray-700 leading-relaxed">
            All content, including logos, designs, images, and text, is the
            property of Fear-Not Lifestyle. Unauthorized use, reproduction, or
            distribution is prohibited.
          </p>

          <h2 className="text-2xl font-semibold text-darkColor">
            8. Limitation of Liability
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Fear-Not Lifestyle is not liable for indirect or consequential
            damages arising from the use of our website or products. Our
            liability is limited to the fullest extent permitted by law.
          </p>

          <h2 className="text-2xl font-semibold text-darkColor">
            9. User Conduct
          </h2>
          <p className="text-gray-700 leading-relaxed">
            You agree not to misuse our website or attempt unauthorized access.
            Fraudulent, abusive, or illegal activity is strictly prohibited.
          </p>

          <h2 className="text-2xl font-semibold text-darkColor">
            10. Privacy Policy
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Your privacy is important to us. Please review our{" "}
            <Link href={"/privacy"} className="underline">Privacy Policy{" "}</Link>to understand how your information is handled.
          </p>

          <h2 className="text-2xl font-semibold text-darkColor">
            11. Governing Law
          </h2>
          <p className="text-gray-700 leading-relaxed">
            These Terms are governed by the laws of Nigeria, without
            regard to conflict of law principles.
          </p>
        </div>

        <div className="pt-10 text-center">
          <p className="font-bold text-darkColor">
            Thank you for choosing Fear-Not Lifestyle.
          </p>
        </div>
      </div>
    </Container>
  );
};

export default TermsPage;
