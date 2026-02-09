import CreateMedicationForm from "../create-med-form";

export default function NewMedicationPage() {
    return (
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0f172a', marginBottom: '1.5rem' }}>
                Registar Novo Medicamento
            </h1>
            <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '0.75rem', border: '1px solid #e2e8f0', boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)' }}>
                <CreateMedicationForm />
            </div>
        </div>
    );
}
