export function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "GovernmentOrganization",
    name: "Board of Investment of Thailand (BOI)",
    alternateName: "สำนักงานคณะกรรมการส่งเสริมการลงทุน",
    url: "https://www.boi.go.th",
    logo: "https://www.boi.go.th/images/boi-logo.png",
    description:
      "Thailand's central investment promotion agency facilitating foreign and domestic investment",
    address: {
      "@type": "PostalAddress",
      streetAddress: "555 Vibhavadi-Rangsit Road, Chatuchak",
      addressLocality: "Bangkok",
      postalCode: "10900",
      addressCountry: "TH",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+66-2-553-8111",
        contactType: "customer service",
        availableLanguage: [
          "Thai",
          "English",
          "Japanese",
          "Chinese",
          "Korean",
          "German",
          "French",
        ],
      },
    ],
    sameAs: [
      "https://www.facebook.com/boiofthailand",
      "https://twitter.com/BOIThailand",
      "https://www.youtube.com/@BOIThailand",
      "https://www.linkedin.com/company/boi-thailand",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function WebSiteJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "BOI Thailand",
    url: "https://www.boi.go.th",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://www.boi.go.th/en/search?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
    inLanguage: ["th", "en", "ja", "zh", "ko", "de", "fr"],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
