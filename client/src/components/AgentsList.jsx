import React, { useState, useEffect } from 'react';
import './AgentsList.css';

const AgentsList = () => {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAgents();
  }, []);

  const fetchAgents = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://jellybean-ai-dashboard.onrender.com/agents');
      if (!response.ok) throw new Error('Failed to fetch agents');
      const data = await response.json();
      setAgents(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleAgentStatus = async (agentId) => {
    try {
      const response = await fetch(`https://jellybean-ai-dashboard.onrender.com/agents/${agentId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: agents.find(a => a._id === agentId).status === "online" ? "offline" : "online"
        })
      });

      if (!response.ok) throw new Error("Failed to update status");
      const updatedAgent = await response.json();

      setAgents(prevAgents =>
        prevAgents.map(agent =>
          agent._id === agentId ? updatedAgent : agent
        )
      );
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <h3 className="agents-title">AI Agents</h3>
        <div className="loading-skeleton">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="skeleton-item"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h3 className="agents-title">AI Agents</h3>
        <div className="error-message">
          Error: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="agents-container">
      <div className="agents-header">
        <h3 className="agents-title">AI Agents</h3>
        <span className="agents-count">
          {agents.filter(agent => agent.status === 'online').length} of {agents.length} online
        </span>
      </div>
      
      <div className="agents-list">
        {agents.map((agent) => (
          <div key={agent._id} className="agent-card"> 
            <div className="agent-info">
              <div className={`status-dot ${agent.status}`}></div>
              
              <div className="agent-details">
                <h4>{agent.name}</h4>
                <p>{agent.role}</p>
              </div>
            </div>
            
            <div className="agent-controls">
              <span className={`status-badge ${agent.status}`}>
                {agent.status}
              </span>
              
              <button
                onClick={() => toggleAgentStatus(agent._id)}
                className={`toggle-btn ${agent.status === 'online' ? 'stop' : 'start'}`}
              >
                {agent.status === 'online' ? 'Stop' : 'Start'}
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {agents.length === 0 && (
        <div className="empty-state">
          No agents found
        </div>
      )}
    </div>
  );
};

export default AgentsList;
