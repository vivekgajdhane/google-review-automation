import QRCode from "qrcode";

export function getCanonicalPublicUrl(slug: string): { url: string; isLocalhost: boolean } {
  const configured = process.env.NEXT_PUBLIC_APP_URL?.trim();
  
  let origin = "https://truereview.in";
  let isLocalhost = false;

  if (configured) {
    if (configured.includes("localhost") || configured.includes("127.0.0.1")) {
      isLocalhost = true;
      // In local development, use configured localhost
      origin = configured;
    } else {
      origin = configured;
    }
  }

  // Ensure no trailing slash
  origin = origin.replace(/\/+$/, "");

  return {
    url: `${origin}/r/${slug}`,
    isLocalhost,
  };
}

export async function generateQrSvg(url: string): Promise<string> {
  return QRCode.toString(url, {
    type: "svg",
    margin: 2,
    color: {
      dark: "#0f172a",
      light: "#ffffff",
    },
  });
}

export async function generateQrDataUrl(url: string): Promise<string> {
  return QRCode.toDataURL(url, {
    width: 1024,
    margin: 2,
    color: {
      dark: "#0f172a",
      light: "#ffffff",
    },
  });
}
