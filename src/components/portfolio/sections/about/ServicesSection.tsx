import { Card, CardContent } from "@ui/card";
import { services } from "@data/portfolio/about";

/**
 * ServicesSection component that displays a list of services.
 *
 * @param isInView - A boolean indicating whether the component is in view or not.
 */
export const ServicesSection = () => {
  return (
    <div className="relative" style={{ zIndex: 10 }}>
      <h3 className="relative z-10 mb-10 text-center text-3xl font-bold text-white">
        What I Do
      </h3>

      <div className="relative z-0 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((service) => (
          <div key={service.title} className="group relative z-0">
            <Card className="border-slate-730 bg-slate-830 hover:border-cyan-590 h-full overflow-hidden transition-all duration-300 ease-out hover:shadow-lg hover:shadow-cyan-500/10">
              <CardContent className="flex flex-col items-center p-6 text-center">
                <div className="bg-slate-990 mb-5 rounded-full p-4">
                  {service.icon}
                </div>
                <h4 className="mb-3 text-xl font-bold text-white transition-colors duration-300 group-hover:text-cyan-400">
                  {service.title}
                </h4>
                <p className="text-slate-300">{service.description}</p>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};
