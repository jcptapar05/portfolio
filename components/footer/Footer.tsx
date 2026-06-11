import React from "react";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-border">
      <div className="container mx-auto px-6 py-6 text-center text-xs text-muted-foreground">
        <p>© {year} Julius Tapar. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
