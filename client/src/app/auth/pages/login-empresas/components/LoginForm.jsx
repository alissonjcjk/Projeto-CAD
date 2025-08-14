"use client";
import React, { useState } from "react";
import Input from "@/app/auth/components/ui/Input";
import Button from "@/app/auth/components/ui/Button";
import { formatCNPJ, validateCNPJ } from "@/app/auth/utils/cnpjUtils";
import Image from "next/image";
import Link from "next/link";

const LoginFormEmpresa = () => {
  const [formData, setFormData] = useState({
    cnpj: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    cnpj: "",
    password: "",
  });
  const [showDashboard, setShowDashboard] = useState(false);

  const validate = () => {
    const newErrors = { cnpj: "", password: "" };
    let isValid = true;

    if (!formData.cnpj) {
      newErrors.cnpj = "CNPJ é obrigatório";
      isValid = false;
    } else if (!validateCNPJ(formData.cnpj)) {
      newErrors.cnpj = "CNPJ inválido";
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = "Senha é obrigatória";
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "Senha deve ter pelo menos 6 caracteres";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setShowDashboard(true);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      {/* Formulário de Login */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="CNPJ"
          name="cnpj"
          type="text"
          mask={formatCNPJ}
          placeholder="Digite seu CNPJ"
          value={formData.cnpj}
          onChange={handleChange}
          error={errors.cnpj}
        />

        <Input
          label="Senha"
          name="password"
          type="password"
          placeholder="••••••"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
        />

        <div className="flex items-center justify-between">
          <div className="flex pl-9 items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label
              htmlFor="remember-me"
              className="ml-2 block text-sm text-gray-900"
            >
              Lembrar-me
            </label>
          </div>

          <div className="text-sm pr-8">
            <a
              href="/auth/pages/send-email"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Esqueceu sua senha?
            </a>
          </div>
        </div>

        <div className="pt-4 text-center">
          <Button
            type="submit"
            variant="primary"
            className="w-95 py-3 text-base"
          >
            Entrar como Empresa
          </Button>
        </div>

        {/* Cadastro */}
        <div className="mt-10 text-center">
          <p className="text-sm text-gray-600">Não possui cadastro?</p>
          <Link
            href="/auth/pages/formulario-empresas"
            className="inline-block mt-2"
          >
            <Button variant="primary">Criar conta para empresa</Button>
          </Link>
        </div>
      </form>

      {/* Painel da Empresa */}
      {showDashboard && (
        <div className="fixed inset-0 bg-gray-100 z-50 flex flex-col">
          {/* Cabeçalho */}
          <header className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-6 py-4 flex items-center justify-between shadow-lg">
            <h1 className="text-2xl font-bold">Painel da Empresa</h1>
            <button
              onClick={() => setShowDashboard(false)}
              className="bg-white/20 hover:bg-white/30 text-white p-2 rounded-lg transition"
            >
              ✕
            </button>
          </header>

          {/* Conteúdo */}
          <main className="flex-1 overflow-y-auto p-6  bg-blue-300 opacity-90">
            {/* Perfil com estrela no fundo */}
            {/* Perfil com selo bronze no fundo */}
            <section className="flex flex-col items-center text-center mb-10 relative ">
              {/* Selo bronze como background */}
              <div className="absolute w-60 h-90 -z-40">
                <Image
                  src="/images/bronze.png"
                  alt="Selo Bronze"
                  width={260}
                  height={260}
                  className="object-contain"
                />
              </div>

              <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-yellow-600 shadow-lg mb-4">
                <Image
                  src="/images/empresa-profile.jpg"
                  alt="Logo Empresa"
                  width={128}
                  height={128}
                  className="object-cover"
                />
              </div>

              <h2 className="text-2xl font-bold text-gray-800">
                Empresa Solidária
              </h2>
              <p className="text-gray-500">Recife-PE</p>
            </section>

            {/* Botões */}
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                "Preparado para ajudar e ser ajudado?",
                "Atualize os pontos de valor da sua empresa",
                "ONGs que você gostaria de conhecer melhor",
                "Veja como melhorar seu selo",
                "Acompanhe parcerias",
                "Como nosso selo aumenta o valor da sua imagem",
              ].map((item, index) => (
                <button
                  key={index}
                  className="bg-white border border-gray-200 shadow-md hover:shadow-lg hover:scale-[1.02] transition p-6 rounded-xl text-gray-800 text-left"
                >
                  <span className="block font-medium">{item}</span>
                </button>
              ))}
            </section>
          </main>

          {/* Rodapé */}
          <footer className="bg-gray-200 p-4 text-center text-gray-600">
            <button
              onClick={() => setShowDashboard(false)}
              className="text-red-500 hover:text-red-700 font-medium"
            >
              Sair do Dashboard
            </button>
          </footer>
        </div>
      )}
    </>
  );
};

export default LoginFormEmpresa;
