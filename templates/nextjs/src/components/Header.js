export default function Header({ schoolName }) {
    return (
      <header className="bg-[{{ primaryColor }}] text-white py-4">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold">{{ schoolName }}</h1>
        </div>
      </header>
    );
  }