import { GetServerSidePropsContext } from 'next';
import { getAllPostIds } from '../lib/posts'

export const getServerSideProps = async ({ res }: GetServerSidePropsContext) => {
  const xml = await generateSitemapXml();

  res.statusCode = 200;
  res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate'); // 24時間のキャッシュ
  res.setHeader('Content-Type', 'text/xml');
  res.end(xml);

  return {
    props: {},
  };
};

async function generateSitemapXml():Promise<string> {
  const appHost = "https://blog.wado.dev/";
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  // site root
  xml += `
      <url>
        <loc>${appHost}</loc>
      </url>
    `
  
  // ここでurlを足していく
  const posts = getAllPostIds();
  posts.forEach(({ params: { id } }) => {
    xml += `
      <url>
        <loc>${appHost}posts/${id}</loc>
        <lastmod>${id.slice(0,-2)}</lastmod>
      </url>
    `
  })
  
  xml += `</urlset>`;
  return xml;
}

const Page = () => null;
export default Page;