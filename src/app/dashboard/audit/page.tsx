import { prisma } from "@/lib/prisma";
import { ShieldCheckIcon } from "@heroicons/react/24/outline";

export default async function AuditPage() {
    const logs = await prisma.auditLog.findMany({
        orderBy: { timestamp: 'desc' },
        take: 50, // Only show last 50 for performance
    });

    return (
        <div>
            <div className="flex items-center space-x-2 mb-6 text-slate-400">
                <ShieldCheckIcon style={{ width: '24px', height: '24px' }} />
                <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0f172a' }}>Registos de Auditoria</h1>
            </div>

            <div style={{ backgroundColor: 'white', borderRadius: '1rem', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead style={{ backgroundColor: '#f8fafc' }}>
                        <tr>
                            <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', borderBottom: '1px solid #e2e8f0' }}>Data/Hora</th>
                            <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', borderBottom: '1px solid #e2e8f0' }}>Entidade</th>
                            <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', borderBottom: '1px solid #e2e8f0' }}>Ação</th>
                            <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', borderBottom: '1px solid #e2e8f0' }}>Detalhes</th>
                        </tr>
                    </thead>
                    <tbody>
                        {logs.length === 0 ? (
                            <tr>
                                <td colSpan={4} style={{ padding: '3rem', textAlign: 'center', color: '#94a3b8' }}>Nenhum registo de auditoria encontrado.</td>
                            </tr>
                        ) : (
                            logs.map((log) => (
                                <tr key={log.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                    <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#64748b' }}>
                                        {new Date(log.timestamp).toLocaleString('pt-PT')}
                                    </td>
                                    <td style={{ padding: '1rem', fontSize: '0.875rem', fontWeight: 600 }}>
                                        {log.entityType}
                                    </td>
                                    <td style={{ padding: '1rem' }}>
                                        <span style={{
                                            padding: '0.125rem 0.5rem',
                                            borderRadius: '9999px',
                                            fontSize: '0.75rem',
                                            fontWeight: 600,
                                            backgroundColor: log.action === 'CREATE' ? '#dcfce7' : '#f1f5f9',
                                            color: log.action === 'CREATE' ? '#166534' : '#475569'
                                        }}>
                                            {log.action}
                                        </span>
                                    </td>
                                    <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#1e293b' }}>
                                        {log.details}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
