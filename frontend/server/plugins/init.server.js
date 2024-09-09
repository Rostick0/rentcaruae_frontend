function getStyleText(str) {
  const regex = /<style.*?>([\s\S]*?)<\/style>/g;
  const matches = str.match(regex);

  if (matches) {
    return matches
      .map((match) =>
        match.replace(/<style.*?>/g, "").replace(/<\/style>/g, "")
      )
      .join(" ");
  }

  return [];
}

function removeStyleTags(str) {
  const regex = /<style.*?>([\s\S]*?)<\/style>/g;
  return str.replace(regex, "");
}

export default defineNitroPlugin((nuxtApp) => {
  nuxtApp.hooks.hook("render:html", (html, { event }) => {
    // amp params
    if (event._path?.startsWith?.("/amp")) {
      html.htmlAttrs.push("amp");
      html.head.push(
        `<style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
        <script src="https://cdn.ampproject.org/v0.js" async></script>
        <script async custom-element="amp-analytics" src="https://cdn.ampproject.org/v0/amp-analytics-0.1.js"></script>`
      );

      html.head[0] = html.head[0].replace(
        /<link[^>]*rel="stylesheet" href=".*\.css[^>]*>/gi,
        ""
      );
      // html.head[0] = html.head[0]?.replaceAll("<style>", "<style amp-custom>");
      html.body[0] = html.body[0]?.replaceAll("<img", "<amp-img");
      html.head.push(
        `<style amp-custom>${getStyleText(html.head[0])}</style>`.replaceAll(
          "!important",
          ""
        )
      );
      html.head[0] = removeStyleTags(html.head[0]);

      //   html.body.push(
      //     `<amp-analytics type="metrika">
      //     <script type="application/json">
      //         {
      //             "vars": {
      //                 "counterId": "97390272"
      //             }
      //         }
      //     </script>
      // </amp-analytics>`
      //   );
    }
  });
});
