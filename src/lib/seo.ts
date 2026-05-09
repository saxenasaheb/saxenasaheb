import { type Metadata } from "next";
import { practitioner } from "./site-config";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://sueellenpereira.co.uk";

interface PageSEOProps {
  title: string;
  description: string;
  path?: string;
  image?: string;
}

export function generatePageMetadata({
  title,
  description,
  path = "",
  image,
}: PageSEOProps): Metadata {
  const url = `${BASE_URL}${path}`;
  const ogImage = image ?? `${BASE_URL}/og-default.jpg`;

  return {
    title: `${title} | ${practitioner.name}`,
    description,
    metadataBase: new URL(BASE_URL),
    alternates: { canonical: url },
    openGraph: {
      title: `${title} | ${practitioner.name}`,
      description,
      url,
      siteName: `${practitioner.name} — Advanced MSK Physiotherapist`,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
      locale: "en_GB",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${practitioner.name}`,
      description,
      images: [ogImage],
    },
  };
}

export function generateMedicalBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "@id": `${BASE_URL}/#business`,
    name: practitioner.name,
    description: practitioner.tagline,
    url: BASE_URL,
    telephone: practitioner.phone,
    email: practitioner.email,
    medicalSpecialty: "Musculoskeletal Physiotherapy",
    address: {
      "@type": "PostalAddress",
      streetAddress: practitioner.location.addressLine1,
      addressLocality: practitioner.location.city,
      postalCode: practitioner.location.postcode,
      addressCountry: "GB",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday"],
        opens: "08:00",
        closes: "19:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Friday"],
        opens: "08:00",
        closes: "17:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Saturday"],
        opens: "09:00",
        closes: "14:00",
      },
    ],
    founder: {
      "@type": "Person",
      name: practitioner.name,
      jobTitle: "Advanced Musculoskeletal Physiotherapist",
      hasCredential: [
        {
          "@type": "EducationalOccupationalCredential",
          credentialCategory: "degree",
          name: "MSc Advanced Physiotherapy",
        },
        {
          "@type": "EducationalOccupationalCredential",
          credentialCategory: "certification",
          name: "HCPC Registered Physiotherapist",
        },
      ],
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Physiotherapy Services",
      itemListElement: [
        {
          "@type": "Offer",
          name: "Initial MSK Assessment & Treatment",
          price: "120",
          priceCurrency: "GBP",
        },
        {
          "@type": "Offer",
          name: "Follow-up Treatment",
          price: "90",
          priceCurrency: "GBP",
        },
        {
          "@type": "Offer",
          name: "Sports Injury Consultation",
          price: "130",
          priceCurrency: "GBP",
        },
        {
          "@type": "Offer",
          name: "Injection Therapy Consultation",
          price: "150",
          priceCurrency: "GBP",
        },
        {
          "@type": "Offer",
          name: "Running Gait Analysis",
          price: "160",
          priceCurrency: "GBP",
        },
      ],
    },
    sameAs: [],
  };
}
