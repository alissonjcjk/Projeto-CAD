"use client";
import StyleFillable from "./StyleFillable";
import StyleTitle from "./styles/StyleTitle";
import OdsImages from "./OdsImages";
import { useState } from "react";

const OdsImageOptions = Array.from({ length: 17 }, (_, i) => ({
  id: String(i + 1),
  name: String(i + 1), // Certifique-se de que 'name' existe
  require: true,
}));

const initialODSState = OdsImageOptions.reduce((acc, option) => {
  acc[option.name] = false;
  return acc;
});

function EmpresaForm({ className = "" }) {
  const [formData, setFormData] = useState({
    nomeEmpresa: "",
    cnpj: "",
    email: "",
    nColaboradores: "",
    telefone: "",
    razao: "",
    ramoAtividade: "",
    responsavel: "",
    senha: "",
    confirmarSenha: "",
  });

  // const OdsImageOptions = [
  //   {
  //     id: "1",
  //     name: "1",
  //     require: true,
  //   },
  //   {
  //     id: "2",
  //     name: "2",
  //     require: true,
  //   },
  //   {
  //     id: "3",
  //     name: "3",
  //     require: true,
  //   },
  //   {
  //     id: "4",
  //     name: "4",
  //     require: true,
  //   },
  //   {
  //     id: "5",
  //     name: "5",
  //     require: true,
  //   },
  //   {
  //     id: "6",
  //     name: "6",
  //     require: true,
  //   },
  //   {
  //     id: "7",
  //     name: "7",
  //     require: true,
  //   },
  //   {
  //     id: "8",
  //     name: "8",
  //     require: true,
  //   },
  //   {
  //     id: "9",
  //     name: "9",
  //     require: true,
  //   },
  //   {
  //     id: "10",
  //     name: "10",
  //     require: true,
  //   },
  //   {
  //     id: "11",
  //     name: "11",
  //     require: true,
  //   },
  //   {
  //     id: "12",
  //     name: "12",
  //     require: true,
  //   },
  //   {
  //     id: "13",
  //     name: "13",
  //     require: true,
  //   },
  //   {
  //     id: "14",
  //     name: "14",
  //     require: true,
  //   },
  //   {
  //     id: "15",
  //     name: "15",
  //     require: true,
  //   },
  //   {
  //     id: "16",
  //     name: "16",
  //     require: true,
  //   },
  //   {
  //     id: "17",
  //     name: "17",
  //     require: true,
  //   },
  // ];
  // armazena as selecoes de ods
  // const [selectedODS, setSelectedODS] = useState(() => {
  //   // Inicializa todas as opcoes como false
  //   const inicialState = {};
  //   OdsImageOptions.forEach((option) => {
  //     inicialState[option.name] = false;
  //   });
  //   return inicialState;
  // });
  const [selectedODS, setSelectedODS] = useState(() => {
    const initialState = {};
    for (let i = 1; i <= 17; i++) {
      initialState[i] = false; // Inicializa todos como false
    }
    return initialState;
  });

  const handleOdsImagesChange = (e) => {
    const { name, checked } = e.target;
    setSelectedODS((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCNPJChange = (e) => {
    const formatted = formatCNPJ(e.target.value);
    setFormData({ ...formData, cnpj: formatted });
  };

  const handleTelefoneChange = (e) => {
    const formatted = formatTelefone(e.target.value);
    setFormData({ ...formData, telefone: formatted });
  };

  const formatTelefone = (value) => {
    if (!value) return value;

    // Remove tudo que não é dígito
    const nums = value.replace(/\D/g, "");

    // Aplica a máscara (81)9 9999-9999
    if (nums.length <= 2) return `(${nums}`;
    if (nums.length <= 3) return `(${nums.slice(0, 2)})${nums.slice(2)}`;
    if (nums.length <= 7)
      return `(${nums.slice(0, 2)})${nums.slice(2, 3)} ${nums.slice(3)}`;
    if (nums.length <= 11)
      return `(${nums.slice(0, 2)})${nums.slice(2, 3)} ${nums.slice(
        3,
        7
      )}-${nums.slice(7)}`;
    return `(${nums.slice(0, 2)})${nums.slice(2, 3)} ${nums.slice(
      3,
      7
    )}-${nums.slice(7, 11)}`;
  };

  const formatCNPJ = (value) => {
    if (!value) return value;

    // Remove tudo que não é dígito
    const nums = value.replace(/\D/g, "");

    // Aplica a máscara 99.999.999/9999-99
    if (nums.length <= 2) return nums;
    if (nums.length <= 5) return `${nums.slice(0, 2)}.${nums.slice(2)}`;
    if (nums.length <= 8)
      return `${nums.slice(0, 2)}.${nums.slice(2, 5)}.${nums.slice(5)}`;
    if (nums.length <= 12)
      return `${nums.slice(0, 2)}.${nums.slice(2, 5)}.${nums.slice(
        5,
        8
      )}/${nums.slice(8)}`;
    return `${nums.slice(0, 2)}.${nums.slice(2, 5)}.${nums.slice(
      5,
      8
    )}/${nums.slice(8, 12)}-${nums.slice(12, 14)}`;
  };

  const validate = () => {
    const newErrors = {};
    const selectCount = Object.values(selectedODS).filter(Boolean).length;

    if (!formData.nomeEmpresa.trim())
      newErrors.nomeEmpresa = "Nome da empresa é obrigatório";
    if (!formData.cnpj) newErrors.cnpj = "CNPJ é obrigatório";
    if (!formData.email.trim()) newErrors.email = "Email é obrigatório";
    if (!formData.telefone) newErrors.telefone = "Telefone é obrigatório";
    if (formData.senha !== formData.confirmarSenha) {
      newErrors.confirmarSenha = "As senhas não coincidem";
    }
    if (selectCount > 5) {
      newErrors.ods = "Selecione no máximo 5 ODS";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      // aqui pode enviar as opcoes para a api
      console.log("Opções selecionadas:", selectedODS);
      setIsSubmitting(true);
      try {
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
        Cadastrar Empresa parceira
      </h2>

      {errors.ods && <p className="mt-1 text-sm text-red-600">{errors.ods} </p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Seção de Informações Básicas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <StyleTitle>Nome fantasia da empresa *</StyleTitle>
            <input
              type="text"
              name="nomeEmpresa"
              value={formData.nomeEmpresa}
              onChange={handleChange}
              placeholder="Nome como a empresa é conhecida publicamente"
              className={`mt-1 block w-full rounded-md border-gray-300 text-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm p-2 border ${
                errors.nomeEmpresa ? "border-red-500" : ""
              }`}
            />
            {errors.nomeEmpresa && (
              <p className="mt-1 text-sm text-red-600">{errors.nomeEmpresa}</p>
            )}
          </div>

          <div>
            <StyleTitle>CNPJ *</StyleTitle>
            <input
              type="text"
              value={formData.cnpj}
              onChange={handleCNPJChange}
              placeholder="99.999.999/9999-99"
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
            <StyleTitle>Email corporativo de contato *</StyleTitle>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Ex: ana.souza@empresa.com"
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-600 text-sm p-2 border ${
                errors.email ? "border-red-500" : ""
              }`}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
            )}
          </div>

          <div>
            <StyleTitle>Telefone *</StyleTitle>
            <input
              type="text"
              value={formData.telefone}
              onChange={handleTelefoneChange}
              placeholder="(81)9 9999-9999"
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
          <StyleTitle>Razão social (opcional)</StyleTitle>
          <input
            type="text"
            name="razao"
            value={formData.razao}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-600 text-sm p-2 border"
          />
        </div>

        {/* Ramo, Responsável e número de colaboradores */}
        <div className="grid md:grid-cols-3">
          <div>
            <StyleTitle>Ramo de Atividade</StyleTitle>
            <select
              name="ramoAtividade"
              value={formData.ramoAtividade}
              onChange={handleChange}
              className="mt-1 block w-9/12 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-600 text-sm p-2 border"
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
            <StyleTitle>Número de colaboradores</StyleTitle>
            <select
              name="nColaboradores"
              value={formData.nColaboradores}
              onChange={handleChange}
              className="mt-1 block w-10/12 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-600 text-sm p-2 border"
            >
              <option value="">Selecione...</option>
              <option value="ate10">Entre 1-10</option>
              <option value="ate20">Entre 11-20</option>
              <option value="ate30">Entre 21-30</option>
              <option value="maior30">maior que 30</option>
            </select>
          </div>

          <div>
            <StyleTitle>Responsável</StyleTitle>
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
        <StyleFillable>
          <div>
            <StyleTitle>Senha</StyleTitle>
            <input
              type="password"
              name="senha"
              value={formData.senha}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-600 text-sm p-2 border"
            />
          </div>

          <div>
            <StyleTitle>Confirmar Senha</StyleTitle>
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
        </StyleFillable>
        <div>
          <h1 className="font-bold text-2xl text-gray-800">
            ODS da ONU mais alinhadas com as causas da empresa
          </h1>
          <p className="font-medium text-gray-500">
            selecione até 5 causas principais
          </p>
        </div>

        {/* recebe as informações ods */}
        <div className="max-h-md max-w-full p-6 bg-white rounded-md shadow">
          <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
            {OdsImageOptions.map((option) => (
              <OdsImages
                key={option.id}
                id={option.id}
                name={option.name}
                imageUrl={`./images/SDG-${option.name}.png`}
                checked={selectedODS[option.name]}
                onChange={handleOdsImagesChange}
                disabled={
                  !selectedODS[option.name] &&
                  Object.values(selectedODS).filter(Boolean).length >= 5
                }
              />
            ))}
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
            <StyleTitle htmlFor="terms" className="font-medium text-gray-700">
              Concordo com os termos e condições
            </StyleTitle>
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
