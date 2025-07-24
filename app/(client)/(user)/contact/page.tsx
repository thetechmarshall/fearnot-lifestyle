"use client";

import { useState } from "react";
import Container from "@/components/Container";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { sendContactMessage } from "@/app/actions/contact";
import { toast } from "sonner";

const ContactPage = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    data.append("name", form.name);
    data.append("email", form.email);
    data.append("subject", form.subject);
    data.append("message", form.message);

    const res = await sendContactMessage(data);
    setLoading(false);

    if (res.success) {
      toast.success("Message sent successfully!");
      setForm({ name: "", email: "", subject: "", message: "" });
    } else {
      toast.error("Failed to send message.");
    }
  };

  return (
    <Container className="max-w-3xl px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
      <p className="mb-6">
        We&apos;d love to hear from you. Please fill out the form below and
        we&apos;ll get back to you as soon as possible.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1">
          <Label htmlFor="name">Name</Label>
          <Input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="subject">Subject</Label>
          <Input
            type="text"
            name="subject"
            value={form.subject}
            onChange={handleChange}
            required
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="message">Message</Label>
          <Textarea
            name="message"
            rows={6}
            value={form.message}
            onChange={handleChange}
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-darkColor/80 text-white px-6 py-3 rounded-md text-sm font-semibold hover:bg-darkColor hoverEffect"
        >
          {loading ? "Sending..." : "Send Message"}
        </button>
      </form>
    </Container>
  );
};

export default ContactPage;
