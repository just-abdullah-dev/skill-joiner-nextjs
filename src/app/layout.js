import { Inter } from "next/font/google";
import "./globals.css";
import ReduxProvider from "@/store/ReduxProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Skill Joiner",
  description: "Skill Joiner Fachhochachule Community",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className + " text-secondary"}>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
