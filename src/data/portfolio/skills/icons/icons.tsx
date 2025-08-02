"use client";

import dynamic from "next/dynamic";

import { IconPlaceholder } from "@common/IconPlaceholder";
import { IconProps } from "@tabler/icons-react";

// keyskills
const KeyskillsIcons = dynamic(() => import("./keyskillsIcons"), {
  loading: () => <IconPlaceholder size={24} />,
  ssr: false,
});

export const KeyIconBrandAws = (props: IconProps) => (
  <KeyskillsIcons icon="IconBrandAws" {...props} />
);
export const KeyIconBrandDocker = (props: IconProps) => (
  <KeyskillsIcons icon="IconBrandDocker" {...props} />
);
export const KeyIconBrandNextjs = (props: IconProps) => (
  <KeyskillsIcons icon="IconBrandNextjs" {...props} />
);
export const KeyIconBrandPython = (props: IconProps) => (
  <KeyskillsIcons icon="IconBrandPython" {...props} />
);
export const KeyIconBrandReact = (props: IconProps) => (
  <KeyskillsIcons icon="IconBrandReact" {...props} />
);
export const KeyIconBrandRust = (props: IconProps) => (
  <KeyskillsIcons icon="IconBrandRust" {...props} />
);
export const KeyIconBrandTerraform = (props: IconProps) => (
  <KeyskillsIcons icon="IconBrandTerraform" {...props} />
);
export const KeyIconBrandTypescript = (props: IconProps) => (
  <KeyskillsIcons icon="IconBrandTypescript" {...props} />
);
export const KeyIconGitMerge = (props: IconProps) => (
  <KeyskillsIcons icon="IconGitMerge" {...props} />
);

// backend
const BackendIcons = dynamic(() => import("./backendIcons"), {
  loading: () => <IconPlaceholder size={24} />,
  ssr: false,
});

export const IconApps = (props: IconProps) => (
  <BackendIcons icon="IconApps" {...props} />
);
export const IconArrowsSplit2 = (props: IconProps) => (
  <BackendIcons icon="IconArrowsSplit2" {...props} />
);
export const IconBrandOauth = (props: IconProps) => (
  <BackendIcons icon="IconBrandOauth" {...props} />
);
export const IconCreditCardPay = (props: IconProps) => (
  <BackendIcons icon="IconCreditCardPay" {...props} />
);
export const IconDatabase = (props: IconProps) => (
  <BackendIcons icon="IconDatabase" {...props} />
);
export const IconShieldLock = (props: IconProps) => (
  <BackendIcons icon="IconShieldLock" {...props} />
);
export const IconSitemap = (props: IconProps) => (
  <BackendIcons icon="IconSitemap" {...props} />
);
export const SiFlask = (props: IconProps) => (
  <BackendIcons icon="SiFlask" {...props} />
);

// business
const BusinessIcons = dynamic(() => import("./businessIcons"), {
  loading: () => <IconPlaceholder size={24} />,
  ssr: false,
});

export const IconSettings2 = (props: IconProps) => (
  <BusinessIcons icon="IconSettings2" {...props} />
);
export const IconWorldSearch = (props: IconProps) => (
  <BusinessIcons icon="IconWorldSearch" {...props} />
);

// devops
const DevopsIcons = dynamic(() => import("./devopsIcons"), {
  loading: () => <IconPlaceholder size={24} />,
  ssr: false,
});

export const IconHeartRateMonitor = (props: IconProps) => (
  <DevopsIcons icon="IconHeartRateMonitor" {...props} />
);
export const IconPackage = (props: IconProps) => (
  <DevopsIcons icon="IconPackage" {...props} />
);
export const IconServer = (props: IconProps) => (
  <DevopsIcons icon="IconServer" {...props} />
);
export const SiKubernetes = dynamic(
  () => import("@icons-pack/react-simple-icons/icons/SiKubernetes.mjs"),
  {
    loading: () => <IconPlaceholder size={22} />,
    ssr: false,
  }
);
export const SiLinux = dynamic(
  () => import("@icons-pack/react-simple-icons/icons/SiLinux.mjs"),
  {
    loading: () => <IconPlaceholder size={20} />,
    ssr: false,
  }
);

// frontend
const FrontendIcons = dynamic(() => import("./frontendIcons"), {
  loading: () => <IconPlaceholder size={24} />,
  ssr: false,
});

export const IconBrandFramerMotion = (props: IconProps) => (
  <FrontendIcons icon="IconBrandFramerMotion" {...props} />
);
export const IconBrandTailwind = (props: IconProps) => (
  <FrontendIcons icon="IconBrandTailwind" {...props} />
);
export const IconWorldWww = (props: IconProps) => (
  <FrontendIcons icon="IconWorldWww" {...props} />
);
export const IconDeviceDesktop = (props: IconProps) => (
  <FrontendIcons icon="IconDeviceDesktop" {...props} />
);
export const SiMui = dynamic(
  () => import("@icons-pack/react-simple-icons/icons/SiMui.mjs"),
  {
    loading: () => <IconPlaceholder size={22} />,
    ssr: false,
  }
);
export const SiShadcnui = dynamic(
  () => import("@icons-pack/react-simple-icons/icons/SiShadcnui.mjs"),
  {
    loading: () => <IconPlaceholder size={15} />,
    ssr: false,
  }
);

// languages
export const IconHash = dynamic(
  () => import("@tabler/icons-react/dist/esm/icons/IconHash.mjs"),
  { loading: () => <IconPlaceholder />, ssr: false }
);

// category icons
export const CategoryIconCode = dynamic(
  () => import("@tabler/icons-react/dist/esm/icons/IconCode.mjs"),
  { loading: () => <IconPlaceholder size={16} />, ssr: false }
);
export const CategoryIconCloud = dynamic(
  () => import("@tabler/icons-react/dist/esm/icons/IconCloud.mjs"),
  { loading: () => <IconPlaceholder size={16} />, ssr: false }
);
export const CategoryIconBrandReact = dynamic(
  () => import("@tabler/icons-react/dist/esm/icons/IconBrandReact.mjs"),
  { loading: () => <IconPlaceholder size={16} />, ssr: false }
);
export const CategoryIconServer = dynamic(
  () => import("@tabler/icons-react/dist/esm/icons/IconServer.mjs"),
  { loading: () => <IconPlaceholder size={16} />, ssr: false }
);
export const CategoryIconBriefcase = dynamic(
  () => import("@tabler/icons-react/dist/esm/icons/IconBriefcase.mjs"),
  { loading: () => <IconPlaceholder size={16} />, ssr: false }
);
