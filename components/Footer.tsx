export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto max-w-5xl px-6 py-8 sm:px-8 lg:px-10">
        <p className="text-center text-sm text-muted">
          © {new Date().getFullYear()} EssentialAI
        </p>
      </div>
    </footer>
  );
}
