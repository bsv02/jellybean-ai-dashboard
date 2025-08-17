import AgentsList from './components/AgentsList';

export default function App() {
  return (
    <main style={{ maxWidth: 800, margin: '40px auto', padding: '0 16px' }}>
      <h2 style={{ marginBottom: 16 }}>AI Agents</h2>
      <AgentsList />
    </main>
  );
}
