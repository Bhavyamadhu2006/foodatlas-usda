import Link from "next/link";

export default function NotFound() {
  return (
    <div className="app-card p-8 text-center">
      <div className="font-serif text-[42px] text-cream-50">Not found</div>
      <p className="muted mt-3">That page does not exist.</p>
      <Link href="/" className="btn-primary mt-5">Go home</Link>
    </div>
  );
}
