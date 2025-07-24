import Container from "@/components/Container";
import React from "react";

const AboutPage = () => {
  return (
    <Container className="max-w-6xl lg:px-8 py-12">
      <div className="max-w-4xl mx-auto px-4 py-12 space-y-10">
        <h1 className="text-2xl md:text-4xl font-bold text-darkColor">
          About Us | Fear-Not Lifestyle
        </h1>

        <div className="space-y-4">
          <h1 className="text-xl md:text-2xl font-bold text-darkColor">
            Empowered by Faith, Driven by Style
          </h1>
          <p className="text-gray-600 mx-auto">
            At <span className="font-semibold">Fear-Not Lifestyle</span>, we
            believe that clothing is more than just fabric — it&apos;s a
            powerful expression of courage, identity, and belief. Our brand was
            born from a simple but profound mission: to inspire boldness,
            confidence, and unshakable faith through fashion.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-darkColor">Our Story</h2>
          <p className="text-gray-700 leading-relaxed">
            Fear-Not Lifestyle started as more than a clothing brand — it
            started as a movement. We realized there was a gap in fashion for
            individuals who wanted to express both their personal style and
            their inner strength. Inspired by faith and driven by creativity, we
            set out to create apparel that speaks volumes without saying a word.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Our designs are crafted for the confident, the resilient, and the
            unafraid — for those who choose to stand tall in their beliefs and
            embrace their unique journey.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-darkColor">
            What We Stand For
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>
              <span className="font-semibold">Faith-Inspired Fashion:</span> Our
              collections reflect powerful, faith-driven messages that promote
              courage, purpose, and identity.
            </li>
            <li>
              <span className="font-semibold">
                Minimalist, Bold Streetwear:
              </span>{" "}
              We blend clean, modern designs with bold graphics that resonate
              with culture, confidence, and strength.
            </li>
            <li>
              <span className="font-semibold">Quality You Can Trust:</span> From
              premium fabrics to carefully curated production, we never
              compromise on comfort, durability, or design.
            </li>
            <li>
              <span className="font-semibold">Community & Empowerment:</span>{" "}
              Fear-Not Lifestyle is more than apparel — it&apos;s a community of
              bold thinkers, believers, and dreamers who share a commitment to
              living fearlessly.
            </li>
          </ul>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-darkColor">
            Who We Design For
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>The bold and unapologetic</li>
            <li>The dreamers with unwavering faith</li>
            <li>The confident trendsetters</li>
            <li>The individuals who refuse to blend in</li>
            <li>The fearless — people like you</li>
          </ul>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-darkColor">Our Promise</h2>
          <p className="text-gray-700 leading-relaxed">
            We promise to continuously deliver clothing that inspires, empowers,
            and uplifts. Our vision is to redefine fashion with faith, courage,
            and purpose at its core.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Because when your style reflects your inner strength — there are no
            limits to what you can achieve.
          </p>
        </div>

        <div className="space-y-4 text-center">
          <h2 className="text-xl font-semibold text-darkColor">
            Join The Movement
          </h2>
          <p className="text-gray-700 italic text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
            Wearing Fear-Not Lifestyle isn&apos;t just about looking good —
            it&apos;s about making a statement. It&apos;s about reminding
            yourself and the world that fear doesn&apos;t define you. Every
            shirt, hoodie, or accessory carries a message of resilience,
            strength, and unshakable faith.
          </p>
          <p className="font-semibold text-base italic text-darkColor">
            Stand Out. Speak Boldly. Fear Not.
          </p>
        </div>

        <div className="pt-8 text-center">
          <h2 className="text-xl font-bold text-darkColor">
            Welcome to Fear-Not Lifestyle — where bold fashion meets fearless
            living.
          </h2>
        </div>
      </div>
    </Container>
  );
};

export default AboutPage;
