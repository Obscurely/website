export async function GET() {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<OpenSearchDescription xmlns="http://a9.com/-/spec/opensearch/1.1/">
  <ShortName>Adrian Crîşmaruc's Blog</ShortName>
  <Description>Search articles and tutorials on Adrian Crîşmaruc's blog</Description>
  <Url type="text/html" template="https://adriancrismaruc.com/blog?search={searchTerms}"/>
  <Image height="16" width="16" type="image/x-icon">https://adriancrismaruc.com/favicon.ico</Image>
  <Developer>Adrian Crîşmaruc</Developer>
  <Contact>contact@adriancrismaruc.com</Contact>
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
