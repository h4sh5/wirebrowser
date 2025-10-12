

const HtmlRenderer = ({ baseUrl, html }) => {

  const injectBase = (baseUrl, html) => {
    const u = new URL(baseUrl);
    u.search = "";
    u.hash = "";
    const baseTag = `<base href="${u.toString()}">`;
    if (/<base\s/i.test(html)) {
      return html.replace(/<base[^>]*>/i, baseTag);
    } else if (/<head[^>]*>/i.test(html)) {
      return html.replace(/<head[^>]*>/i, match => `${match}\n  ${baseTag}`);
    } else if (/<html[^>]*>/i.test(html)) {
      return html.replace(/<html[^>]*>/i, match => `${match}\n<head>${baseTag}</head>`);
    } else {
      return `<head>${baseTag}</head>\n${html}`;
    }
  }
  if (!html) {
    return (<></>);
  }
  return (
    <iframe
      srcDoc={injectBase(baseUrl, html)}
      className="w-full h-full"
      sandbox="true"
    />
  );
};

export default HtmlRenderer;