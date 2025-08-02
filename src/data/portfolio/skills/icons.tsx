"use client";

import dynamic from "next/dynamic";

import { IconPlaceholder } from "@common/IconPlaceholder";

// backend
export const IconApps = dynamic(
  () => import("@tabler/icons-react/dist/esm/icons/IconApps.mjs"),
  { loading: () => <IconPlaceholder />, ssr: false }
);
export const IconArrowsSplit2 = dynamic(
  () => import("@tabler/icons-react/dist/esm/icons/IconArrowsSplit2.mjs"),
  { loading: () => <IconPlaceholder />, ssr: false }
);
export const IconBrandOauth = dynamic(
  () => import("@tabler/icons-react/dist/esm/icons/IconBrandOauth.mjs"),
  { loading: () => <IconPlaceholder />, ssr: false }
);
export const IconCreditCardPay = dynamic(
  () => import("@tabler/icons-react/dist/esm/icons/IconCreditCardPay.mjs"),
  { loading: () => <IconPlaceholder />, ssr: false }
);
export const IconDatabase = dynamic(
  () => import("@tabler/icons-react/dist/esm/icons/IconDatabase.mjs"),
  { loading: () => <IconPlaceholder />, ssr: false }
);
export const IconShieldLock = dynamic(
  () => import("@tabler/icons-react/dist/esm/icons/IconShieldLock.mjs"),
  { loading: () => <IconPlaceholder />, ssr: false }
);
export const IconSitemap = dynamic(
  () => import("@tabler/icons-react/dist/esm/icons/IconSitemap.mjs"),
  { loading: () => <IconPlaceholder />, ssr: false }
);
export const SiFlask = dynamic(
  () => import("@icons-pack/react-simple-icons/icons/SiFlask.mjs"),
  { loading: () => <IconPlaceholder />, ssr: false }
);

// business
export const IconSettings2 = dynamic(
  () => import("@tabler/icons-react/dist/esm/icons/IconSettings2.mjs"),
  { loading: () => <IconPlaceholder />, ssr: false }
);
export const IconWorldSearch = dynamic(
  () => import("@tabler/icons-react/dist/esm/icons/IconWorldSearch.mjs"),
  { loading: () => <IconPlaceholder />, ssr: false }
);

// devops
export const IconBrandAws = dynamic(
  () => import("@tabler/icons-react/dist/esm/icons/IconBrandAws.mjs"),
  { loading: () => <IconPlaceholder />, ssr: false }
);
export const IconBrandDocker = dynamic(
  () => import("@tabler/icons-react/dist/esm/icons/IconBrandDocker.mjs"),
  { loading: () => <IconPlaceholder />, ssr: false }
);
export const IconBrandTerraform = dynamic(
  () => import("@tabler/icons-react/dist/esm/icons/IconBrandTerraform.mjs"),
  { loading: () => <IconPlaceholder />, ssr: false }
);
export const IconGitMerge = dynamic(
  () => import("@tabler/icons-react/dist/esm/icons/IconGitMerge.mjs"),
  { loading: () => <IconPlaceholder />, ssr: false }
);
export const IconHeartRateMonitor = dynamic(
  () => import("@tabler/icons-react/dist/esm/icons/IconHeartRateMonitor.mjs"),
  { loading: () => <IconPlaceholder />, ssr: false }
);
export const IconPackage = dynamic(
  () => import("@tabler/icons-react/dist/esm/icons/IconPackage.mjs"),
  { loading: () => <IconPlaceholder />, ssr: false }
);
export const IconServer = dynamic(
  () => import("@tabler/icons-react/dist/esm/icons/IconServer.mjs"),
  { loading: () => <IconPlaceholder />, ssr: false }
);
export const SiKubernetes = dynamic(
  () => import("@icons-pack/react-simple-icons/icons/SiKubernetes.mjs"),
  { loading: () => <IconPlaceholder size={22} />, ssr: false }
);
export const SiLinux = dynamic(
  () => import("@icons-pack/react-simple-icons/icons/SiLinux.mjs"),
  { loading: () => <IconPlaceholder size={20} />, ssr: false }
);

// frontend
export const IconBrandFramerMotion = dynamic(
  () => import("@tabler/icons-react/dist/esm/icons/IconBrandFramerMotion.mjs"),
  { loading: () => <IconPlaceholder />, ssr: false }
);
export const IconBrandNextjs = dynamic(
  () => import("@tabler/icons-react/dist/esm/icons/IconBrandNextjs.mjs"),
  { loading: () => <IconPlaceholder />, ssr: false }
);
export const IconBrandReact = dynamic(
  () => import("@tabler/icons-react/dist/esm/icons/IconBrandReact.mjs"),
  { loading: () => <IconPlaceholder />, ssr: false }
);
export const IconBrandTailwind = dynamic(
  () => import("@tabler/icons-react/dist/esm/icons/IconBrandTailwind.mjs"),
  { loading: () => <IconPlaceholder />, ssr: false }
);
export const IconDeviceDesktop = dynamic(
  () => import("@tabler/icons-react/dist/esm/icons/IconDeviceDesktop.mjs"),
  { loading: () => <IconPlaceholder />, ssr: false }
);
export const IconWorldWww = dynamic(
  () => import("@tabler/icons-react/dist/esm/icons/IconWorldWww.mjs"),
  { loading: () => <IconPlaceholder />, ssr: false }
);
export const SiMui = dynamic(
  () => import("@icons-pack/react-simple-icons/icons/SiMui.mjs"),
  { loading: () => <IconPlaceholder size={22} />, ssr: false }
);
export const SiShadcnui = dynamic(
  () => import("@icons-pack/react-simple-icons/icons/SiShadcnui.mjs"),
  { loading: () => <IconPlaceholder size={15} />, ssr: false }
);

// languages
export const IconBrandRust = dynamic(
  () => import("@tabler/icons-react/dist/esm/icons/IconBrandRust.mjs"),
  { loading: () => <IconPlaceholder />, ssr: false }
);
export const IconBrandPython = dynamic(
  () => import("@tabler/icons-react/dist/esm/icons/IconBrandPython.mjs"),
  { loading: () => <IconPlaceholder />, ssr: false }
);
export const IconBrandTypescript = dynamic(
  () => import("@tabler/icons-react/dist/esm/icons/IconBrandTypescript.mjs"),
  { loading: () => <IconPlaceholder />, ssr: false }
);
export const IconHash = dynamic(
  () => import("@tabler/icons-react/dist/esm/icons/IconHash.mjs"),
  { loading: () => <IconPlaceholder />, ssr: false }
);
