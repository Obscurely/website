import { MyJourney } from "@data/portfolio/about";

/**
 * AboutJourney component that displays the journey of the user.
 *
 * @param isInView - A boolean indicating whether the component is in view or not.
 */
export const AboutJourney = () => {
  return (
    <div className="border-slate-730 rounded-xl border bg-slate-800/20 p-6">
      <h3 className="mb-6 text-2xl font-bold text-white">My Journey</h3>
      <MyJourney />
    </div>
  );
};
