export function Footer() {
  return (
    <footer className="border-t border-zinc-800 bg-zinc-950/50 mt-20 py-10">
      <div className="container mx-auto px-4 text-center">
        <p className="text-zinc-500 text-sm">
          &copy; {new Date().getFullYear()} TensorLog. Built with React 19, Vite, & TanStack. by Stephane Mbatchou
        </p>
      </div>
    </footer>
  );
}
