import EmpresaForm from "./components/EmpresaForm";
import FormContainer from "./components/containers/FormContainer";
export default function Home() {
  return (
    <FormContainer>
      <EmpresaForm className="max-w-6xl mx-auto" />
    </FormContainer>
  );
}
