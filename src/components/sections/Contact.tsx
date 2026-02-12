import { useState, type FormEvent } from 'react'
import { Container } from '../layout/Container'
import { Button } from '../ui/Button'
import { Card, CardContent } from '../ui/Card'
import { FadeInOnScroll } from '../shared/ScrollAnimations'

export function Contact() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      // Formspree form submission
      const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formState),
      })

      if (response.ok) {
        setSubmitStatus('success')
        setFormState({ name: '', email: '', subject: '', message: '' })
      } else {
        setSubmitStatus('error')
      }
    } catch {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const contactInfo = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect width="20" height="16" x="2" y="4" rx="2"/>
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
        </svg>
      ),
      label: 'Email',
      value: 'luke@cakalicdesign.com',
      href: 'mailto:luke@cakalicdesign.com',
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
          <circle cx="12" cy="10" r="3"/>
        </svg>
      ),
      label: 'Location',
      value: 'Colorado Springs, CO',
    },
  ]

  return (
    <section id="contact" className="py-24 md:py-32 bg-background-secondary">
      <Container>
        <FadeInOnScroll className="text-center mb-16">
          <h2 className="section-heading">
            Let's <span className="gradient-accent">Connect</span>
          </h2>
          <p className="section-subheading mt-4 mx-auto">
            Have a project in mind? I'd love to hear about it. Let's discuss how we can work together.
          </p>
        </FadeInOnScroll>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Contact Form */}
          <FadeInOnScroll direction="left" className="lg:col-span-3">
            <Card hover={false} className="p-0">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formState.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl bg-glass border border-border focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 text-foreground placeholder:text-foreground-subtle transition-all"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formState.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl bg-glass border border-border focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 text-foreground placeholder:text-foreground-subtle transition-all"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                      Subject
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formState.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-glass border border-border focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 text-foreground transition-all"
                    >
                      <option value="">Select a subject</option>
                      <option value="web-design">Web Design / UI/UX</option>
                      <option value="vehicle-wrap">Vehicle Wrap</option>
                      <option value="branding">Brand Identity</option>
                      <option value="print">Print Marketing</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formState.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 rounded-xl bg-glass border border-border focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 text-foreground placeholder:text-foreground-subtle transition-all resize-none"
                      placeholder="Tell me about your project..."
                    />
                  </div>

                  {submitStatus === 'success' && (
                    <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400">
                      Thanks for reaching out! I'll get back to you soon.
                    </div>
                  )}

                  {submitStatus === 'error' && (
                    <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400">
                      Something went wrong. Please try again or email me directly.
                    </div>
                  )}

                  <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="m22 2-7 20-4-9-9-4Z"/>
                          <path d="M22 2 11 13"/>
                        </svg>
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </FadeInOnScroll>

          {/* Contact Info */}
          <FadeInOnScroll direction="right" delay={0.2} className="lg:col-span-2">
            <div className="space-y-6">
              {contactInfo.map((info) => (
                <Card key={info.label} className="group">
                  <CardContent className="p-6 flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all duration-300 flex-shrink-0">
                      {info.icon}
                    </div>
                    <div>
                      <p className="text-foreground-muted text-sm">{info.label}</p>
                      {info.href ? (
                        <a
                          href={info.href}
                          className="text-foreground font-medium hover:text-accent transition-colors"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-foreground font-medium">{info.value}</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}

              {/* CTA Card */}
              <Card glow className="mt-8">
                <CardContent className="p-6 text-center">
                  <h4 className="font-display text-lg font-semibold text-foreground">
                    Prefer email?
                  </h4>
                  <p className="text-foreground-muted mt-2 text-sm">
                    Feel free to reach out directly. I typically respond within 24 hours.
                  </p>
                  <Button
                    variant="secondary"
                    className="mt-4"
                    onClick={() => window.location.href = 'mailto:luke@cakalicdesign.com'}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="20" height="16" x="2" y="4" rx="2"/>
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                    </svg>
                    Send Email
                  </Button>
                </CardContent>
              </Card>
            </div>
          </FadeInOnScroll>
        </div>
      </Container>
    </section>
  )
}
