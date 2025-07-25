import { FooterLink } from "@data/common/footer";
import { IconDownload, IconRss } from "@tabler/icons-react";
import { LinkButton } from "./LinkButton";

interface NavLinkProps {
  isBlog: boolean;
  link: FooterLink;
  useAnchorLinks: boolean;
}

/**
 * Either scrolls you to the section or navigates to a link.
 *
 * @param isBlog - Indicates if the the component is called from the blog or not.
 * @param link - The link object containing name, href, and external properties.
 * @param useAnchorLinks - Whether to use anchor links for navigation.
 */
export const NavLink = ({ isBlog, link, useAnchorLinks }: NavLinkProps) => {
  const isRSS = link.name === "RSS";

  if (link.external) {
    return (
      <a
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex cursor-pointer items-center gap-2 text-slate-400 transition-all duration-300 hover:text-cyan-400"
      >
        <span className="text-sm">{link.name}</span>
        {link.name === "Resume" && (
          <IconDownload className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
        )}
        {link.name === "RSS Feed" && (
          <IconRss className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
        )}
      </a>
    );
  }

  if (isRSS) {
    return (
      <a
        href="/rss.xml"
        target="_blank"
        rel="noopener noreferrer"
        className="group flex cursor-pointer items-center gap-2 text-slate-400 transition-all duration-300 hover:text-cyan-400"
      >
        <IconRss className="h-3 w-3" />
        <span className="text-sm">RSS</span>
      </a>
    );
  }

  // Use anchor links when isBlog=true OR when useAnchorLinks=true (isMain=false)
  if (isBlog || useAnchorLinks) {
    // Add "/" prefix when isMain=false and isBlog=false
    const href = !isBlog && useAnchorLinks ? `/${link.href}` : link.href;

    return (
      <a
        href={href}
        className="cursor-pointer text-sm text-slate-400 transition-all duration-300 hover:text-cyan-400"
      >
        {link.name}
      </a>
    );
  }

  // Use buttons with smooth scrolling when isMain=true and isBlog=false
  return <LinkButton name={link.name} href={link.href} />;
};
