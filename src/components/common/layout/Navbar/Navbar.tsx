import Link from "next/link";
import { DesktopNavbar } from "./DesktopNavbar";
import { MobileNavbar } from "./MobileNavbar";

interface NavbarProps {
  isBlog?: boolean;
  isMain?: boolean;
}

export const Navbar = ({ isBlog = false, isMain = false }: NavbarProps) => {
  const nameHref = isBlog ? "/blog" : "/#home";

  return (
    <header
      data-state="scrolled"
      className="data-[state=show]:bg-slate-980 fixed top-0 z-50 w-full bg-transparent py-4 transition-all duration-300 data-[state=show]:py-2 data-[state=show]:shadow-md"
    >
      <div className="container mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href={nameHref} className="text-2xl font-bold text-slate-100">
          <div className="flex items-center gap-2">
            <span className="sm:text-1xl truncate bg-blue-400 bg-clip-text text-xl font-extrabold text-transparent md:text-2xl">
              Adrian Crîșmaruc
            </span>
          </div>
        </Link>

        <DesktopNavbar isBlog={isBlog} isMain={isMain} />

        <MobileNavbar isBlog={isBlog} isMain={isMain} />
      </div>
    </header>
  );
};
