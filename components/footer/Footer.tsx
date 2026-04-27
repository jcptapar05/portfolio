import React from "react";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-border">
      <div className="container mx-auto px-6 py-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-sm text-muted-foreground">
        <p>
          &copy; {year} Julius Tapar. All rights reserved.
        </p>
        <p className="text-xs">
          Built with Next.js &amp; Tailwind CSS
        </p>
      </div>
    </footer>
  );
};

export default Footer;
