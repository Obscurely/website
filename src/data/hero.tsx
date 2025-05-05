export const typeAnimation = [
  "Full Stack Developer",
  1000,
  "Cloud-Native",
  1000,
  "AWS Certified",
  1000,
  "Kubernetes Certified",
  1000,
  "Rust & Python Programmer",
  1000,
  "Next.js & React Developer",
  1000,
  "Self-Taught",
  1000,
  "Linux Power User",
  1000,
  "Infrastructure Engineering",
  1000,
  "Home Lab Administrator",
  1000,
  "Always Learning",
  1000,
];

export default function Description() {
  return (
    <p className="mb-4 text-lg leading-relaxed text-slate-300 md:text-xl">
      I am a <strong className="text-white">Full-Stack Developer</strong>{" "}
      specializing in
      <span className="relative mx-1">
        <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text font-semibold text-transparent">
          Rust, Python, React, TypeScript, Next.js, Flask
        </span>
        <span className="absolute -bottom-0.5 left-0 h-0.5 w-full bg-gradient-to-r from-cyan-500/50 to-blue-500/50"></span>
      </span>
      and <strong className="text-white">cloud-native technologies</strong>. I
      build <strong className="text-white">secure and scalable systems</strong>{" "}
      from the backend and infrastructure to the user interface while leveraging
      my
      <span className="relative mx-1">
        <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text font-semibold text-transparent">
          certified knowledge of AWS and Kubernetes
        </span>
        <span className="absolute -bottom-0.5 left-0 h-0.5 w-full bg-gradient-to-r from-cyan-500/50 to-blue-500/50"></span>
      </span>
      , practical
      <span className="relative mx-1">
        <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text font-semibold text-transparent">
          Home Lab SysAdmin
        </span>
        <span className="absolute -bottom-0.5 left-0 h-0.5 w-full bg-gradient-to-r from-cyan-500/50 to-blue-500/50"></span>
      </span>
      experience and
      <span className="relative mx-1">
        <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text font-semibold text-transparent">
          DevOps practices
        </span>
        <span className="absolute -bottom-0.5 left-0 h-0.5 w-full bg-gradient-to-r from-cyan-500/50 to-blue-500/50"></span>
      </span>
      to deliver{" "}
      <strong className="text-white">optimized and automated solutions</strong>{" "}
      across all platforms.
    </p>
  );
}
