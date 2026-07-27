INSERT INTO users (id, name, email, phone, status)
VALUES
  ('00000000-0000-0000-0000-000000000001', 'Seed Sender', 'sender@example.com', '+66800000001', 'active'),
  ('00000000-0000-0000-0000-000000000002', 'Seed Receiver', 'receiver@example.com', '+66800000002', 'active')
ON CONFLICT (id) DO NOTHING;
