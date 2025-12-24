import "./globals.css";
/* WHITELINE: This is the "Frame" of your entire website. 
   It ensures your Aero background and fonts are applied 
   to every single page, including the Admin dashboard.
*/

export const metadata = {
  title: "Maxfolio - Create Your Chaotic Portfolio",
  description: "The internet's most chaotic portfolio generator. Create ridiculous profiles with silly job titles, random themes, and zero authentication required!",
  openGraph: {
    title: "Maxfolio - Create Your Chaotic Portfolio",
    description: "Create ridiculous profiles with silly job titles and random themes!",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
