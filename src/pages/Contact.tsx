import { Phone, Mail, MapPin } from "lucide-react";
import contactModel from "@/assets/contact-model.jpg";
import GoldButton from "@/components/GoldButton";

const contactCards = [
  { icon: Phone, title: "Call Us", detail: "0320-9417086", sub: "Mon – Sat: 10 AM – 8 PM" },
  { icon: Mail, title: "Email Us", detail: "ranglacharkha@gmail.com", sub: "We'll reply within 24 hours" },
  { icon: MapPin, title: "Visit Us", detail: "Pakistan", sub: "Mon – Sat: 10 AM – 8 PM" },
];

const Contact = () => {
  return (
    <main>
      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-4">
              <h1 className="font-display text-4xl md:text-5xl text-foreground">Get In Touch</h1>
              <p className="font-body text-muted-foreground">
                We're here to assist you with any questions or concerns. Reach out to us and we'll respond as soon as possible.
              </p>
              <p className="font-body text-sm text-muted-foreground">Home / Contact Us</p>
            </div>
            <div className="hidden md:block">
              <img src={contactModel} alt="Contact" className="w-72 h-96 object-cover rounded-sm ml-auto" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="pb-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {contactCards.map((c, i) => (
              <div key={i} className="text-center p-6 bg-card border border-border rounded-sm">
                <c.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                <h3 className="font-display text-lg text-foreground mb-1">{c.title}</h3>
                <p className="font-body text-sm text-foreground">{c.detail}</p>
                <p className="font-body text-xs text-muted-foreground mt-1">{c.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-12 bg-secondary">
        <div className="container mx-auto px-4 max-w-2xl">
          <h2 className="font-display text-3xl text-foreground mb-8">Contact Form</h2>
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              placeholder="Name"
              className="w-full bg-card border border-border p-3 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/60 rounded-sm"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="email"
                placeholder="Email Address"
                className="bg-card border border-border p-3 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/60 rounded-sm"
              />
              <input
                type="tel"
                placeholder="Phone Number"
                className="bg-card border border-border p-3 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/60 rounded-sm"
              />
            </div>
            <textarea
              placeholder="Message"
              rows={5}
              className="w-full bg-card border border-border p-3 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/60 rounded-sm resize-none"
            />
            <div className="text-center pt-4">
              <GoldButton type="submit">Send Message</GoldButton>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
};

export default Contact;
