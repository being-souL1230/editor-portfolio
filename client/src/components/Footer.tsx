export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-card/30 backdrop-blur-xl border-t border-border/50">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-3">
          <div className="text-center md:text-left">
            <div className="text-lg font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent mb-1">
              VideoArtist
            </div>
            <p className="text-xs text-muted-foreground">
              Crafting cinematic stories worldwide
            </p>
          </div>
          
          <p className="text-xs text-muted-foreground">
            © {currentYear} Harsh Tripathi. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
