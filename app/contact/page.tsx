import TrackedLink from "@/components/TrackedLink"

export const metadata = {
  title: "Contact — Zodd",
  description: "Get in touch with Zodd.",
}

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <h1 className="text-xs tracking-[0.3em] uppercase text-white/30 mb-6">Get in Touch</h1>
      <p className="text-4xl font-light text-white mb-16">Contact</p>

      {/* Bordered panel */}
      <div className="w-full max-w-md">
        {/* Top rule */}
        <div className="w-full h-px bg-white/10 mb-10" />

        <p className="text-white/45 text-sm leading-7 mb-10">
          For commissions, collaborations, press, or general enquiries.
        </p>

        {/* Email button */}
        <TrackedLink
          href="mailto:contact@zodd.gallery"
          event="contact_email_click"
          external
          className="block w-full border border-white/20 px-8 py-5 text-white/80 hover:text-white hover:border-white/50 hover:bg-white/5 transition-all duration-300"
        >
          <span className="block text-[10px] tracking-[0.3em] uppercase text-white/30 mb-2">Email</span>
          <span className="text-base tracking-wide">contact@zodd.gallery</span>
        </TrackedLink>

        {/* Bottom rule */}
        <div className="w-full h-px bg-white/10 mt-10" />
      </div>
    </div>
  )
}
