import {
  IconCode,
  IconPalette,
  IconBulb,
  IconRocket,
} from "@tabler/icons-react";

/**
 * What I Do
 */
export const services = [
  {
    icon: <IconCode className="h-10 w-10 text-cyan-400" />,
    title: "Web Development",
    description:
      "Building responsive and performant web applications with modern technologies and best practices.",
  },
  {
    icon: <IconPalette className="h-10 w-10 text-cyan-400" />,
    title: "UI/UX Design",
    description:
      "Creating intuitive and beautiful user interfaces with a focus on user experience and accessibility.",
  },
  {
    icon: <IconBulb className="h-10 w-10 text-cyan-400" />,
    title: "Consultation",
    description:
      "Providing expert advice on web technologies, architecture, and development strategies.",
  },
  {
    icon: <IconRocket className="h-10 w-10 text-cyan-400" />,
    title: "Performance Optimization",
    description:
      "Improving website speed and performance for better user experience and SEO rankings.",
  },
];

/**
 * Paragraph about me focusing on my soft skills and approach to work.
 */
export function AboutMe() {
  return (
    <p className="mx-auto max-w-3xl text-lg leading-relaxed text-slate-400">
      From a very young age, I got captivated by tech, first by tinkering with{" "}
      <span className="font-medium text-slate-200">Linux</span> and then with{" "}
      <span className="font-medium text-slate-200">programming</span>, leading
      to my <span className="font-medium text-slate-200">self-taught</span>{" "}
      journey. Being{" "}
      <span className="font-medium text-slate-200">self-taught</span> has helped
      me become{" "}
      <span className="relative inline-block">
        <span className="bg-gradient-to-r from-cyan-400/90 to-blue-500/90 bg-clip-text font-bold text-transparent">
          highly adaptable
        </span>
      </span>{" "}
      and{" "}
      <span className="relative inline-block">
        <span className="bg-gradient-to-r from-cyan-400/90 to-blue-500/90 bg-clip-text font-bold text-transparent">
          quick to learn
        </span>
      </span>{" "}
      new technologies, enabling me to develop
      <span className="text-slate-200"> clever and elegant solutions </span>
      to complex problems. I am{" "}
      <span className="font-bold text-slate-200">constantly learning</span>,
      improving and staying current with the tech space to deliver{" "}
      <span className="text-slate-200">high-quality end products</span> on par
      with industry standards by managing my time and{" "}
      <span className="relative inline-block font-bold">
        <span className="text-slate-200">
          focusing on what's important first
        </span>
      </span>
      .
    </p>
  );
}

/**
 * Paragraph about my journey in tech.
 */
export function MyJourney() {
  return (
    <p className="leading-relaxed text-slate-300">
      My journey in tech began in my{" "}
      <strong>earliest years of childhood</strong>. Initially, I experimented
      with different software, tried new things and was genuinely{" "}
      <strong>curious</strong> to see the outcome of doing something new while
      also{" "}
      <span className="font-semibold italic">
        breaking stuff in the process and learning from it
      </span>
      . By age 10, I had already been experimenting with
      <span className="font-bold"> virtual machines, Linux</span>, and more
      advanced tools, and two years later, I started{" "}
      <strong>formally programming</strong> and setting up a home server on an
      older laptop. I went from building small projects to now,{" "}
      <strong>7 years later</strong>, having built{" "}
      <span className="font-semibold italic">
        <a
          href="https://rekosearch.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-cyan-400 not-italic transition-colors hover:text-cyan-300"
        >
          RekoSearch
        </a>{" "}
        - an almost 50k LoC SaaS app made with Rust, Python and web technologies
        on AWS and Kubernetes
      </span>{" "}
      - and my <span className="font-bold">Home Lab</span> with{" "}
      <strong>47+ user-accessible services</strong> securely exposed to the
      internet.
    </p>
  );
}
