import { ComponentType } from "react";

import { SiFlask as Flask } from "@icons-pack/react-simple-icons";
import {
  IconApps as Apps,
  IconArrowsSplit2 as ArrowsSplit2,
  IconBrandOauth as BrandOauth,
  IconCreditCardPay as CreditCardPay,
  IconDatabase as Database,
  IconShieldLock as ShieldLock,
  IconSitemap as Sitemap,
} from "@tabler/icons-react";

// Create a component that has the backend icons as properties
const BackendIcons: ComponentType<{ icon: string; [key: string]: unknown }> & {
  IconApps: typeof Apps;
  IconArrowsSplit2: typeof ArrowsSplit2;
  IconBrandOauth: typeof BrandOauth;
  IconCreditCardPay: typeof CreditCardPay;
  IconDatabase: typeof Database;
  IconShieldLock: typeof ShieldLock;
  IconSitemap: typeof Sitemap;
  SiFlask: typeof Flask;
} = Object.assign(
  ({ icon, ...props }: { icon: string; [key: string]: unknown }) => {
    const icons = {
      IconApps: Apps,
      IconArrowsSplit2: ArrowsSplit2,
      IconBrandOauth: BrandOauth,
      IconCreditCardPay: CreditCardPay,
      IconDatabase: Database,
      IconShieldLock: ShieldLock,
      IconSitemap: Sitemap,
      SiFlask: Flask,
    };
    const Icon = icons[icon as keyof typeof icons];
    return Icon ? <Icon name={icon} {...props} /> : null;
  },
  {
    IconApps: Apps,
    IconArrowsSplit2: ArrowsSplit2,
    IconBrandOauth: BrandOauth,
    IconCreditCardPay: CreditCardPay,
    IconDatabase: Database,
    IconShieldLock: ShieldLock,
    IconSitemap: Sitemap,
    SiFlask: Flask,
  }
);

export default BackendIcons;
