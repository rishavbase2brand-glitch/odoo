export default function Navbar() {
  return (
    <nav className="w-full bg-gray-100 py-4 px-6 flex items-center justify-between">
      <h1 className="text-xl font-bold">MyApp</h1>

     <div className="flex gap-6">
        <a href="/" className="hover:text-blue-600 font-medium">Home</a>
        <a href="/about" className="hover:text-blue-600 font-medium">About</a>
        <a href="/services" className="hover:text-blue-600 font-medium">Services</a>
        <a href="/contact" className="hover:text-blue-600 font-medium">Contact</a>
     </div>

    </nav>
  );
}
