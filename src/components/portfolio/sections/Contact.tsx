"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Button } from "@ui/button";
import { Input } from "@ui/input";
import { Textarea } from "@ui/textarea";
import { Card, CardContent } from "@ui/card";
import {
  IconMail,
  IconPhone,
  IconMapPin2,
  IconSend,
  IconLoader2,
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandX,
  IconCheck,
} from "@tabler/icons-react";

/**
 * Contact component that displays a contact form and contact information.
 *
 * @returns A section containing the contact form and contact details.
 */
export const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const contactInfo = [
    {
      icon: <IconMail className="h-6 w-6 text-cyan-400" />,
      title: "Email",
      value: "contact@johndoe.com",
      link: "mailto:contact@johndoe.com",
    },
    {
      icon: <IconPhone className="h-6 w-6 text-cyan-400" />,
      title: "Phone",
      value: "+1 (123) 456-7890",
      link: "tel:+11234567890",
    },
    {
      icon: <IconMapPin2 className="h-6 w-6 text-cyan-400" />,
      title: "Location",
      value: "San Francisco, CA",
      link: "https://maps.google.com/?q=San+Francisco,+CA",
    },
  ];

  return (
    <section id="contact" ref={ref} className="bg-slate-950 py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 inline-block bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-3xl font-bold text-transparent md:text-4xl">
            Get In Touch
          </h2>
          <div className="mx-auto mb-6 h-1 w-20 bg-gradient-to-r from-cyan-500 to-blue-500"></div>
          <p className="mx-auto max-w-3xl text-lg text-slate-400">
            Have a project in mind or want to discuss a potential collaboration?
            Feel free to reach out!
          </p>
        </motion.div>

        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 lg:grid-cols-3">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="space-y-6 lg:col-span-1"
          >
            {contactInfo.map((info, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="border-slate-700 bg-slate-800/50 transition-all duration-300 hover:border-cyan-500/50">
                  <CardContent className="flex items-start gap-4 p-6">
                    <div className="rounded-full bg-slate-900 p-3">
                      {info.icon}
                    </div>
                    <div>
                      <h3 className="mb-1 text-lg font-semibold text-slate-200">
                        {info.title}
                      </h3>
                      <a
                        href={info.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-400 transition-colors hover:text-cyan-400"
                      >
                        {info.value}
                      </a>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}

            <motion.div variants={itemVariants} className="mt-8">
              <h3 className="mb-4 text-lg font-semibold text-slate-200">
                Connect With Me
              </h3>
              <div className="flex gap-4">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-slate-800 p-3 text-slate-400 transition-colors hover:text-cyan-400"
                >
                  <IconBrandGithub className="h-5 w-5" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-slate-800 p-3 text-slate-400 transition-colors hover:text-cyan-400"
                >
                  <IconBrandLinkedin className="h-5 w-5" />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-slate-800 p-3 text-slate-400 transition-colors hover:text-cyan-400"
                >
                  <IconBrandX className="h-5 w-5" />
                </a>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:col-span-2"
          >
            <Card className="border-slate-700 bg-slate-800/50">
              <CardContent className="p-6">
                {isSubmitted ? (
                  <div className="py-8 text-center">
                    <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-500/20 text-green-500">
                      <IconCheck className="h-8 w-8" />
                    </div>
                    <h3 className="mb-2 text-xl font-bold text-slate-200">
                      Message Sent Successfully!
                    </h3>
                    <p className="mb-6 text-slate-400">
                      Thank you for reaching out. I'll get back to you as soon
                      as possible.
                    </p>
                    <Button
                      onClick={() => setIsSubmitted(false)}
                      className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:from-cyan-600 hover:to-blue-600"
                    >
                      Send Another Message
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      <div className="space-y-2">
                        <label
                          htmlFor="name"
                          className="text-sm font-medium text-slate-300"
                        >
                          Name
                        </label>
                        <Input
                          id="name"
                          placeholder="Your Name"
                          required
                          className="border-slate-700 bg-slate-900 text-slate-300 focus:border-cyan-500"
                        />
                      </div>
                      <div className="space-y-2">
                        <label
                          htmlFor="email"
                          className="text-sm font-medium text-slate-300"
                        >
                          Email
                        </label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="your.email@example.com"
                          required
                          className="border-slate-700 bg-slate-900 text-slate-300 focus:border-cyan-500"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label
                        htmlFor="subject"
                        className="text-sm font-medium text-slate-300"
                      >
                        Subject
                      </label>
                      <Input
                        id="subject"
                        placeholder="How can I help you?"
                        required
                        className="border-slate-700 bg-slate-900 text-slate-300 focus:border-cyan-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <label
                        htmlFor="message"
                        className="text-sm font-medium text-slate-300"
                      >
                        Message
                      </label>
                      <Textarea
                        id="message"
                        placeholder="Your message here..."
                        rows={6}
                        required
                        className="resize-none border-slate-700 bg-slate-900 text-slate-300 focus:border-cyan-500"
                      />
                    </div>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:from-cyan-600 hover:to-blue-600"
                    >
                      {isSubmitting ? (
                        <>
                          <IconLoader2 className="mr-2 h-4 w-4 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <IconSend className="mr-2 h-4 w-4" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
