import "./globals.css";
/* WHITELINE: This is the "Frame" of your entire website. 
   It ensures your Aero background and fonts are applied 
   to every single page, including the Admin dashboard.
*/

export const metadata = {
  title: "Maximiliano Garcia | Portfolio",
  description: "A Frutiger Aero-inspired creative portfolio",
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
