"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";

const Button = ({ children, variant, className, onClick }) => {
  const baseStyle = "px-4 py-2 rounded transition-colors";
  const variants = {
    outline: "border border-gray-300 hover:bg-gray-50",
    ghost: "hover:bg-gray-100",
    default: "bg-blue-500 text-white hover:bg-blue-600"
  };
  
  return (
    <button
      className={`${baseStyle} ${variants[variant] || variants.default} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default function OngDashboard() {
  const router = useRouter();

  const ongProfile = {
    name: "Nome da ONG",
    imageUrl: "/images/ong-profile.jpg",
    location: "Cidade, Estado",
  };

  const menuItems = [
    { id: 1, title: "Atualizar sua documentação" },
    { id: 2, title: "Aprenda a ser mais profissional" },
    { id: 3, title: "Envie sua documentação por qualquer rede social" },
    { id: 4, title: "Últimas parcerias" },
    { id: 5, title: "Compartilhe momentos felizes" },
    { id: 6, title: "Veja o que mais é solicitado pelas empresas" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Perfil */}
      <div className="flex flex-col items-center mb-8">
        <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-blue-500 mb-4">
          <Image
            src={ongProfile.imageUrl}
            alt={`${ongProfile.name}`}
            fill
            className="object-cover"
          />
        </div>
        <h1 className="text-2xl font-bold">{ongProfile.name}</h1>
        <p className="text-gray-600">{ongProfile.location}</p>
      </div>

      {/* Menu */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {menuItems.map((item) => (
          <Button
            key={item.id}
            variant="outline"
            className="h-24 p-4 text-left justify-start"
            onClick={() => console.log(item.title)}
          >
            {item.title}
          </Button>
        ))}
      </div>

      {/* Logout */}
      <div className="mt-8 flex justify-center">
        <Button
          variant="ghost"
          onClick={() => router.push("/")}
          className="text-red-500"
        >
          Sair
        </Button>
      </div>
    </div>
  );
}
