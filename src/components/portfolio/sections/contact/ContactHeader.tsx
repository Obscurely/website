/**
 * Header component displays the main heading and description for the contact section.
 */
export const ContactHeader = () => {
  return (
    <div className="mb-20 text-center">
      <h2 className="mb-4 inline-block bg-blue-400 bg-clip-text text-3xl font-bold text-transparent md:text-4xl lg:text-5xl">
        Get in Touch
      </h2>
      <div className="mx-auto mb-8 h-1 w-24 rounded-full bg-blue-400"></div>
      <div className="mx-auto max-w-3xl">
        <p className="text-lg text-slate-400">
          Have a job opportunity, project collaboration, or question in mind?
          Feel free to reach out!
        </p>
      </div>
    </div>
  );
};
