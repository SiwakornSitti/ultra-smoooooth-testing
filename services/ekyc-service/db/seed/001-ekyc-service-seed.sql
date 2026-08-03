INSERT INTO ekyc_verifications (
    id,
    customer_id,
    national_id,
    full_name,
    document_type,
    status,
    confidence_score
)
VALUES
  ('ekyc-001', '00000000-0000-0000-0000-000000000001', '1101700000001', 'Seed Sender', 'national_id', 'APPROVED', 0.98),
  ('ekyc-002', '00000000-0000-0000-0000-000000000002', '1101700000002', 'Seed Receiver', 'national_id', 'APPROVED', 0.97)
ON CONFLICT (id) DO NOTHING;
