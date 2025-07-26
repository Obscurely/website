import { SITE_CONFIG } from "@data/common/site";

export async function GET() {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<OpenSearchDescription xmlns="http://a9.com/-/spec/opensearch/1.1/">
  <ShortName>${SITE_CONFIG.name}'s Blog</ShortName>
  <Description>Search articles and tutorials on ${SITE_CONFIG.name}'s blog</Description>
  <Url type="text/html" template="${SITE_CONFIG.url}/blog?search={searchTerms}"/>
  <Image height="16" width="16" type="image/x-icon">${SITE_CONFIG.url}/favicon.ico</Image>
  <Developer>${SITE_CONFIG.name}</Developer>
  <Contact>${SITE_CONFIG.toEmail}</Contact>
  <Language>en-us</Language>
  <InputEncoding>UTF-8</InputEncoding>
  <OutputEncoding>UTF-8</OutputEncoding>
  <SyndicationRight>open</SyndicationRight>
  <AdultContent>false</AdultContent>
</OpenSearchDescription>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/opensearchdescription+xml",
      "Cache-Control": "public, max-age=86400", // Cache for 24 hours
    },
  });
}
