"use client";
import { useState } from "react";

function EmpresaForm({ className = "" }) {
  const [formData, setFormData] = useState({
    nomeEmpresa: "",
    cnpj: "",
    email: "",
    telefone: "",
    endereco: "",
    ramoAtividade: "",
    responsavel: "",
    senha: "",
    confirmarSenha: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.nomeEmpresa)
      newErrors.nomeEmpresa = "Nome da empresa é obrigatório";
    if (!formData.cnpj) newErrors.cnpj = "CNPJ é obrigatório";
    if (!formData.email) newErrors.email = "Email é obrigatório";
    if (!formData.telefone) newErrors.telefone = "Telefone é obrigatório";
    if (formData.senha !== formData.confirmarSenha) {
      newErrors.confirmarSenha = "As senhas não coincidem";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true);
      try {
        // API
        console.log("Dados enviados:", formData);
        alert("Cadastro realizado com sucesso!");
      } catch (error) {
        console.error("Erro no cadastro:", error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Cadastro de Empresa
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Seção de Informações Básicas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nome da Empresa *
            </label>
            <input
              type="text"
              name="nomeEmpresa"
              value={formData.nomeEmpresa}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md border-gray-300 text-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm p-2 border ${
                errors.nomeEmpresa ? "border-red-500" : ""
              }`}
            />
            {errors.nomeEmpresa && (
              <p className="mt-1 text-sm text-red-600">{errors.nomeEmpresa}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              CNPJ *
            </label>
            <input
              type="text"
              name="cnpj"
              value={formData.cnpj}
              onChange={handleChange}
              placeholder="00.000.000/0000-00"
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-600 text-sm p-2 border ${
                errors.cnpj ? "border-red-500" : ""
              }`}
            />
            {errors.cnpj && (
              <p className="mt-1 text-sm text-red-600">{errors.cnpj}</p>
            )}
          </div>
        </div>

        {/* Contato */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-600 text-sm p-2 border ${
                errors.email ? "border-red-500" : ""
              }`}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Telefone *
            </label>
            <input
              type="tel"
              name="telefone"
              value={formData.telefone}
              onChange={handleChange}
              placeholder="(00) 00000-0000"
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-600 text-sm p-2 border ${
                errors.telefone ? "border-red-500" : ""
              }`}
            />
            {errors.telefone && (
              <p className="mt-1 text-sm text-red-600">{errors.telefone}</p>
            )}
          </div>
        </div>

        {/* Endereço */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Endereço Completo
          </label>
          <input
            type="text"
            name="endereco"
            value={formData.endereco}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-600 text-sm p-2 border"
          />
        </div>

        {/* Ramo e Responsável */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Ramo de Atividade
            </label>
            <select
              name="ramoAtividade"
              value={formData.ramoAtividade}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-600 text-sm p-2 border"
            >
              <option value="">Selecione...</option>
              <option value="alimentos">Alimentos</option>
              <option value="vestuario">Vestuário</option>
              <option value="tecnologia">Tecnologia</option>
              <option value="servicos">Serviços</option>
              <option value="outros">Outros</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Responsável
            </label>
            <input
              type="text"
              name="responsavel"
              value={formData.responsavel}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-600 text-sm p-2 border"
            />
          </div>
        </div>

        {/* Senha */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Senha
            </label>
            <input
              type="password"
              name="senha"
              value={formData.senha}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-600 text-sm p-2 border"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Confirmar Senha
            </label>
            <input
              type="password"
              name="confirmarSenha"
              value={formData.confirmarSenha}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-600 text-sm p-2 border ${
                errors.confirmarSenha ? "border-red-500" : ""
              }`}
            />
            {errors.confirmarSenha && (
              <p className="mt-1 text-sm text-red-600">
                {errors.confirmarSenha}
              </p>
            )}
          </div>
        </div>

        {/* Termos e Condições */}
        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
              required
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="terms" className="font-medium text-gray-700">
              Concordo com os termos e condições
            </label>
          </div>
        </div>

        {/* Botão de Envio */}
        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {isSubmitting ? "Enviando..." : "Cadastrar Empresa"}
          </button>
        </div>
      </form>
    </div>
  );
}
export default EmpresaForm;
