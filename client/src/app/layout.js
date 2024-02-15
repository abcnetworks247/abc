import { Inter } from "next/font/google";
import "./globals.css";
import ProductProvider from "../../contexts/ProductProvider";
import { UserContextProvider } from "../../contexts/UserContext";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Abc studio",
  description: "Informing the world",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="cryptomus" content="315c61b7" />
      </head>
      <body className={inter.className}>
        <UserContextProvider>
          <ProductProvider>
            {children}
          </ProductProvider>
        </UserContextProvider>
      </body>
    </html>
  );
}
