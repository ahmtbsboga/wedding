import { Geist, Geist_Mono , Great_Vibes} from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const greatVibes = Great_Vibes({
  weight: "400",
  subsets: ["latin"],
});

export const metadata = {
  title: "Ahmet & Şeyda",
 
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${greatVibes.className}  h-full antialiased`}
    >
 
    <body className="min-h-full flex flex-col bg-neutral-200">{children}</body>
 
    </html>
  );

}

    