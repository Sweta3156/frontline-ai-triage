// frontend/src/App.jsx
import React, { useState } from 'react';
import { sampleDataset } from './mockData';
import { ShieldAlert, Activity, Clock, Users, Play, Send } from 'lucide-react';

export default function App() {
  const [inputText, setInputText] = useState('');
  const [results, setResults] = useState([]);
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(false);

  const runBatch = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/triage/process-batch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: sampleDataset })
      });
      const data = await res.json();
      setResults(data.results);
      setMetrics({
        latency: data.latency_ms,
        avgLatency: data.avg_latency_per_msg,
        count: data.count,
        humanEscalations: data.results.filter(r => r.needs_human).length
      });
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleSingleSubmit = async (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/triage/process-single', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: inputText })
      });
      const data = await res.json();
      setResults([{ raw: inputText, ...data }, ...results]);
      setInputText('');
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const getPriorityStyle = (priority) => {
    switch (priority) {
      case 'P0': return { bg: '#fee2e2', text: '#991b1b', border: '#f87171' };
      case 'P1': return { bg: '#ffedd5', text: '#c2410c', border: '#fb923c' };
      case 'P2': return { bg: '#dbeafe', text: '#1e40af', border: '#60a5fa' };
      default: return { bg: '#f3f4f6', text: '#374151', border: '#9ca3af' };
    }
  };

  return (
    <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh', padding: '40px 20px', fontFamily: '"Inter", system-ui, sans-serif' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Header Section */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '30px' }}>
          <div style={{ background: '#2563eb', padding: '12px', borderRadius: '12px', color: 'white' }}>
            <ShieldAlert size={28} />
          </div>
          <div>
            <h1 style={{ margin: 0, fontSize: '28px', color: '#0f172a', fontWeight: 'bold' }}>Frontline AI Triage</h1>
            <p style={{ margin: '4px 0 0 0', color: '#64748b' }}>Autonomous Customer Support Routing Engine</p>
          </div>
        </div>

        {/* Input & Actions Section */}
        <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', flexWrap: 'wrap' }}>
          <form onSubmit={handleSingleSubmit} style={{ flexGrow: 1, display: 'flex', gap: '12px', background: 'white', padding: '8px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <input
              type="text"
              placeholder="Test a single raw message or prompt injection..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              style={{ flexGrow: 1, padding: '12px 16px', border: 'none', outline: 'none', fontSize: '15px', background: 'transparent' }}
            />
            <button type="submit" disabled={loading} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '0 20px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: '500', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1 }}>
              <Send size={18} />
              Triage Single
            </button>
          </form>
          
          <button onClick={runBatch} disabled={loading} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '0 24px', background: '#059669', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: loading ? 'not-allowed' : 'pointer', boxShadow: '0 4px 6px -1px rgba(5, 150, 105, 0.2)', transition: 'transform 0.1s', opacity: loading ? 0.7 : 1 }}>
            <Play size={20} fill="currentColor" />
            {loading ? 'Processing Data...' : 'Run Full Dataset'}
          </button>
        </div>

        {/* Metrics Dashboard */}
        {metrics && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px' }}>
            {[
              { label: 'Messages Processed', value: metrics.count, icon: <Activity size={20} color="#2563eb" />, bg: '#eff6ff' },
              { label: 'Total Batch Latency', value: `${metrics.latency} ms`, icon: <Clock size={20} color="#9333ea" />, bg: '#faf5ff' },
              { label: 'Avg Latency / Msg', value: `${metrics.avgLatency} ms`, icon: <Activity size={20} color="#059669" />, bg: '#ecfdf5' },
              { label: 'Human Escalations', value: metrics.humanEscalations, icon: <Users size={20} color="#ea580c" />, bg: '#fff7ed' }
            ].map((stat, i) => (
              <div key={i} style={{ background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center', gap: '16px', border: '1px solid #e2e8f0' }}>
                <div style={{ background: stat.bg, padding: '12px', borderRadius: '50%' }}>{stat.icon}</div>
                <div>
                  <div style={{ fontSize: '13px', color: '#64748b', fontWeight: '500', marginBottom: '4px' }}>{stat.label}</div>
                  <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#0f172a' }}>{stat.value}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Data Table */}
        {results.length > 0 && (
          <div style={{ background: 'white', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', overflow: 'hidden', border: '1px solid #e2e8f0' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
              <thead>
                <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
                  <th style={{ padding: '16px', color: '#475569', fontWeight: '600', width: '25%' }}>Raw Input</th>
                  <th style={{ padding: '16px', color: '#475569', fontWeight: '600' }}>Category & Priority</th>
                  <th style={{ padding: '16px', color: '#475569', fontWeight: '600' }}>Status</th>
                  <th style={{ padding: '16px', color: '#475569', fontWeight: '600', width: '35%' }}>AI Decision</th>
                </tr>
              </thead>
              <tbody>
                {results.map((r, i) => {
                  const pStyle = getPriorityStyle(r.priority);
                  return (
                    <tr key={i} style={{ borderBottom: '1px solid #e2e8f0', background: r.needs_human ? '#fffbfa' : 'white', transition: 'background 0.2s' }}>
                      <td style={{ padding: '16px', color: '#334155', lineHeight: '1.5' }}>
                        <div style={{ WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', display: '-webkit-box', overflow: 'hidden' }}>
                          "{r.raw}"
                        </div>
                      </td>
                      <td style={{ padding: '16px' }}>
                        <div style={{ fontWeight: '600', color: '#0f172a', marginBottom: '8px' }}>{r.category}</div>
                        <span style={{ padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: '600', background: pStyle.bg, color: pStyle.text, border: `1px solid ${pStyle.border}` }}>
                          {r.priority}
                        </span>
                      </td>
                      <td style={{ padding: '16px' }}>
                        <div style={{ marginBottom: '8px' }}>
                          <span style={{ fontSize: '12px', color: '#64748b' }}>Confidence: </span>
                          <strong style={{ color: r.confidence < 0.7 ? '#ea580c' : '#059669' }}>{(r.confidence * 100).toFixed(0)}%</strong>
                        </div>
                        {r.needs_human && (
                          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '11px', fontWeight: 'bold', padding: '4px 8px', background: '#fee2e2', color: '#991b1b', borderRadius: '6px' }}>
                            <ShieldAlert size={12} /> NEEDS HUMAN
                          </span>
                        )}
                      </td>
                      <td style={{ padding: '16px' }}>
                        <div style={{ marginBottom: '8px', lineHeight: '1.4' }}>
                          <span style={{ fontSize: '12px', color: '#64748b', fontWeight: '600', display: 'block', textTransform: 'uppercase' }}>Summary</span>
                          <span style={{ color: '#1e293b' }}>{r.summary}</span>
                        </div>
                        <div style={{ lineHeight: '1.4', background: '#f1f5f9', padding: '8px 12px', borderRadius: '6px', borderLeft: '3px solid #3b82f6' }}>
                          <span style={{ fontSize: '12px', color: '#3b82f6', fontWeight: '600', display: 'block', textTransform: 'uppercase', marginBottom: '2px' }}>Suggested Action</span>
                          <span style={{ color: '#0f172a', fontSize: '13px' }}>{r.suggested_action}</span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}