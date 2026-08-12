export type EkycResult = {
  id: string;
  customer_id: string;
  national_id: string;
  full_name: string;
  document_type: string;
  status: string;
  confidence_score: number;
};

export function isEkycResult(value: unknown): value is EkycResult {
  if (typeof value !== "object" || value === null) return false;
  const result = value as Partial<EkycResult>;
  return typeof result.id === "string"
    && typeof result.customer_id === "string"
    && typeof result.national_id === "string"
    && typeof result.full_name === "string"
    && typeof result.document_type === "string"
    && typeof result.status === "string"
    && typeof result.confidence_score === "number";
}

export function EkycSummary({ result }: { result: EkycResult }) {
  return (
    <div className="profile-summary ekyc-summary" data-testid="ekyc-summary">
      <div className="profile-summary-header">
        <div className="profile-customer">
          <strong>{result.full_name}</strong>
          <span className="profile-summary-id">Customer ID: {result.customer_id}</span>
        </div>
        <span className="profile-status" data-testid="ekyc-status">{result.status}</span>
      </div>
      <dl className="profile-details">
        <div>
          <dt>National ID</dt>
          <dd>{result.national_id}</dd>
        </div>
        <div>
          <dt>Document</dt>
          <dd>{result.document_type}</dd>
        </div>
        <div>
          <dt>Confidence</dt>
          <dd>{(result.confidence_score * 100).toFixed(0)}%</dd>
        </div>
      </dl>
    </div>
  );
}
