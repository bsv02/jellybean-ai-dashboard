DROP DATABASE IF EXISTS agents_db;
CREATE DATABASE agents_db 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

USE agents_db;

CREATE TABLE agents (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    role VARCHAR(50) NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'offline',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_status (status),
    INDEX idx_role (role)
);

CREATE TABLE conversations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    customer_name VARCHAR(100) NOT NULL,
    message_snippet TEXT NOT NULL,
    timestamp DATETIME NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_timestamp (timestamp),
    INDEX idx_customer (customer_name)
);

INSERT INTO agents (name, role, status) VALUES
('Agent Alpha', 'Sales AI', 'online'),
('Agent Beta', 'Support AI', 'offline'),
('Agent Gamma', 'Scheduler AI', 'online'),
('Agent Delta', 'Sales AI', 'offline');

INSERT INTO conversations (customer_name, message_snippet, timestamp) VALUES
('John Smith', 'Hi, I need help with my recent order #12345. It seems to be delayed and I have not received any tracking information yet.', '2025-08-15 10:30:00'),

('Sarah Johnson', 'I am interested in purchasing your premium software package. Can you tell me more about the features and pricing options available?', '2025-08-15 10:25:00'),

('Michael Chen', 'I would like to schedule a demo for next week. Are there any available slots on Tuesday or Wednesday afternoon?', '2025-08-15 10:20:00'),

('Emma Wilson', 'The application keeps crashing when I try to export my data. I have tried restarting but the issue persists. Please help.', '2025-08-15 10:15:00'),

('David Brown', 'What is your refund policy? I purchased the service last month but it does not meet my business requirements.', '2025-08-15 10:10:00'),

('Lisa Garcia', 'Can you help me upgrade my account to the business plan? I need access to the advanced analytics features.', '2025-08-15 10:05:00'),

('Robert Taylor', 'I forgot my password and the reset email is not arriving in my inbox. I have checked my spam folder as well.', '2025-08-15 10:00:00'),

('Jennifer Davis', 'Is it possible to integrate your API with our existing CRM system? We use Salesforce for customer management.', '2025-08-15 09:55:00');

SELECT 'AGENTS TABLE:' as '';
SELECT id, name, role, status, created_at FROM agents ORDER BY id;

SELECT 'CONVERSATIONS TABLE:' as '';
SELECT id, customer_name, LEFT(message_snippet, 80) as message_preview, timestamp FROM conversations ORDER BY timestamp DESC;

SELECT 'DATABASE STATISTICS:' as '';
SELECT 
    (SELECT COUNT(*) FROM agents) as total_agents,
    (SELECT COUNT(*) FROM agents WHERE status = 'online') as online_agents,
    (SELECT COUNT(*) FROM agents WHERE status = 'offline') as offline_agents,
    (SELECT COUNT(*) FROM conversations) as total_conversations;
    
    SELECT 'AGENTS TABLE STRUCTURE:' as '';
DESCRIBE agents;

SELECT 'CONVERSATIONS TABLE STRUCTURE:' as '';
DESCRIBE conversations;


