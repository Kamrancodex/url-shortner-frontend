import React from "react";

type SEOProps = {
  title?: string;
  description?: string;
  url?: string;
  image?: string;
  canonical?: string;
};

const defaultMeta = {
  title: "Shortie — URL Shortener & QR",
  description: "Shorten, customize and track links with QR codes.",
  url: "https://sh0rtly.ink/",
  image: "/logo.png",
};

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  url,
  image,
  canonical,
}) => {
  const meta = {
    ...defaultMeta,
    title: title || defaultMeta.title,
    description: description || defaultMeta.description,
    url: url || defaultMeta.url,
    image: image || defaultMeta.image,
  };

  return (
    <>
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      {canonical && <link rel="canonical" href={canonical} />}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Shortie" />
      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:url" content={meta.url} />
      <meta property="og:image" content={meta.image} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:description" content={meta.description} />
      <meta name="twitter:image" content={meta.image} />
    </>
  );
};

export default SEO;
