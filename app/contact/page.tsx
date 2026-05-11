export const metadata = {
  title: "Contact — Zodd",
  description: "Get in touch with Zodd.",
}

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <h1 className="text-xs tracking-[0.3em] uppercase text-white/30 mb-6">Get in Touch</h1>
      <p className="text-4xl font-light text-white mb-10">Contact</p>
      <p className="text-white/50 text-base leading-8 max-w-md mb-12">
        For commissions, collaborations, press, or general enquiries.
      </p>
      <a
        href="mailto:contact@zodd.gallery"
        className="group flex flex-col items-center gap-2"
      >
        <span className="text-2xl text-white group-hover:text-white/70 transition-colors duration-300 tracking-wide">
          contact@zodd.gallery
        </span>
        <span className="text-xs tracking-widest uppercase text-white/25 group-hover:text-white/50 transition-colors duration-300">
          Send an email
        </span>
      </a>
    </div>
  )
}
