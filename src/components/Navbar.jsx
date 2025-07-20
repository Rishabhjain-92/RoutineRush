import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  return (
    <nav className="w-full fixed top-0 left-0 flex justify-between items-center px-12 py-5 bg-purple-100 dark:bg-gray-900/80 backdrop-blur-md shadow-sm z-50">
      {/* Logo */}
      <h1 className="text-2xl font-bold text-purple-700">RoutineRush</h1>

      {/* Menu Links */}
      <div className="flex gap-8 items-center text-lg">
        <a href="#home" className="hover:underline">Home</a>
        <a href="#contact" className="hover:underline">Contact</a>
        <ThemeToggle />

        {/* Buttons */}
        <button className="px-5 py-2 rounded-lg border border-purple-600 text-purple-700 hover:bg-purple-200">
          Signup
        </button>
        <button className="px-5 py-2 rounded-lg bg-purple-700 text-white hover:bg-purple-800">
          Login
        </button>
      </div>
    </nav>
  );
}

