DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM transfers WHERE id = 'transfer-001'
    ) THEN
        UPDATE accounts
        SET balance = balance - 100.00
        WHERE id = '00000000-0000-0000-0000-000000000011';

        UPDATE accounts
        SET balance = balance + 100.00
        WHERE id = '00000000-0000-0000-0000-000000000012';

        INSERT INTO transfers (
            id,
            source_account_id,
            target_account_id,
            amount,
            status
        )
        VALUES (
            'transfer-001',
            '00000000-0000-0000-0000-000000000011',
            '00000000-0000-0000-0000-000000000012',
            100.00,
            'COMPLETED'
        );
    END IF;
END $$;
