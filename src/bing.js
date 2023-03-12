export default function bing(apiKey) {
  return {
    async image(query) {
      const response = await fetch(
        `https://api.bing.microsoft.com/v7.0/images/search?q=${query}&count=1&aspect=square&imageType=photo`,
        {
          headers: {
            "Ocp-Apim-Subscription-Key": String(apiKey),
          },
        }
      );
      const data = await response.json();
      const thumbnailUrl = data.value[0]?.thumbnailUrl;
      const thumbnailResponse = await fetch(thumbnailUrl);
      const arrayBuffer = await thumbnailResponse.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      return buffer;
    },
  };
}
