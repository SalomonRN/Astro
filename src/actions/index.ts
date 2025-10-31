import { defineAction } from "astro:actions";
import { z } from "astro:schema";
import { URL } from "@/consts/consts";

const fetchUrlPost = async (large_url: string) => {
  const response = await fetch(URL + "url/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ large_url }),
  });
  return response;
  // if (response.ok) {
  //   tiny_url = "";
  //   const data = await response.json();
  //   if (UrlButton.style.display != "") {
  //     UrlButton.style.transform = "scale(1.189)";

  //     setTimeout(() => {
  //       UrlButton.style.transform = "";
  //     }, 500);
  //   }
  //   UrlButton.style.display = "flex";
  //   const short_url = `${URL}/url/${data.tiny_url}`;
  //   tiny_url += short_url;
  //   console.log("NUEWW");
  // } else {
  //   alert("Error, intentalo de nuevo mas tarde :/");
  //   console.error(data);
  // }
};

export const server = {
  createUrl: defineAction({
    input: z.object({
      url: z.string(),
    }),
    handler: async (input) => {
      // Logica de Fetch de datos.
      console.log(input.url + "<-------------");
      const res = await fetchUrlPost(input.url);
      if (!res.ok) {
        // ALGUN ERROR
      }

      res.json().then((data) => {
        console.log("ESTE ES LA URL" + data.tiny_url);
        return {
          success: true,
          tiny_url: data.tiny_url,
        };
      });
    },
  }),

  getUrl: defineAction({
    input: z.object({ url: z.string() }),
    handler: async (url) => {
      console.log("LA URL ES ", url);
    },
  }),
};
