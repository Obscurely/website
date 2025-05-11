import { Certification } from "./types";

export const certifications: Certification[] = [
  {
    id: "k8s-ckad",
    name: "Kubernetes Certified Application Developer",
    issuer: "The Linux Foundation",
    icon: "/k8s-ckad.png",
    date: "2024-04-02",
    url: "https://www.credly.com/badges/72c7934e-35c4-4108-9010-aea6d2414b74",
  },

  {
    id: "aws-dva",
    name: "AWS Certified Developer - Associate",
    issuer: "Amazon Web Services",
    icon: "/aws-dva.png",
    date: "2023-12-20",
    url: "https://www.credly.com/badges/b5cb4ed1-d487-44c8-a26c-03c5c6458655",
  },
  {
    id: "aws-clf",
    name: "AWS Cloud Practitioner",
    issuer: "Amazon Web Services",
    icon: "/aws-clf.png",
    date: "2023-10-31",
    url: "https://www.credly.com/badges/3d166bad-e8f2-4825-9937-53ce6a7b1dcf",
  },
];
