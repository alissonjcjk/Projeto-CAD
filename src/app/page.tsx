import EmpresaForm from "./components/EmpresaForm";
import FormContainer from "./components/FormContainer";
export default function Home() {
  return (
    <FormContainer>
      <EmpresaForm className="max-w-2xl mx-auto" />
    </FormContainer>
  );
}
