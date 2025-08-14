"use client";
import AuthHeader from "@/app/auth/AuthHeader";
import LoginFormOng from "./components/LoginForm";
import { Card } from "@/app/auth/components/ui/Card";
import { BackButton } from "../../components/ui/BackButton";
import { useState } from "react";
import Image from "next/image";

export default function LoginOngPage() {
  const [showDashboard, setShowDashboard] = useState(false);

  // Função para ser chamada após login bem-sucedido
  const handleLoginSuccess = () => {
    setShowDashboard(true);
  };

  return (
    <div className="min-h-screen bg-blue-100 flex flex-col justify-center py-12 sm:px-40 lg:px-140 relative">
      {/* Modal do Dashboard (aparece após login) */}
      {showDashboard && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            {/* Cabeçalho do Modal */}
            <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center">
              <h2 className="text-xl font-bold">Dashboard da ONG</h2>
              <button
                onClick={() => setShowDashboard(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            {/* Conteúdo do Dashboard */}
            <div className="p-6">
              {/* Perfil */}
              <div className="flex flex-col items-center mb-8">
                <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-blue-500 mb-4">
                  <Image
                    src="/images/ong-profile.jpg"
                    alt="Foto ONG"
                    fill
                    className="object-cover"
                  />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">
                  ONG Amigos da Educação
                </h2>
                <p className="text-gray-600">Recife, PE</p>
              </div>

              {/* Menu de opções */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  "Atualizar sua documentação",
                  "Aprenda a ser mais profissional",
                  "Envie sua documentação por qualquer rede social",
                  "Últimas parcerias",
                  "Compartilhe momentos felizes",
                  "Veja o que mais é solicitado pelas empresas",
                ].map((item, index) => (
                  <button
                    key={index}
                    className="bg-blue-50 hover:bg-blue-100 text-gray-800 p-4 rounded-lg text-left transition"
                  >
                    {item}
                  </button>
                ))}
              </div>

              {/* Botão Sair */}
              <div className="mt-8 flex justify-center">
                <button
                  onClick={() => setShowDashboard(false)}
                  className="text-red-500 hover:text-red-700 font-medium"
                >
                  Sair do Dashboard
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Formulário de Login (sempre visível) */}
      <BackButton />
      <Card variant="elevated" className="py-27">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <AuthHeader title="Entrar" />
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          {/* Passe a função de callback para o formulário */}
          <LoginFormOng onSuccess={handleLoginSuccess} />
        </div>
      </Card>
    </div>
  );
}
