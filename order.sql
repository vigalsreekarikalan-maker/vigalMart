CREATE TABLE IF NOT EXISTS vigalmart_orders (
    id VARCHAR(100) PRIMARY KEY,
    user_id VARCHAR(100) NOT NULL,
    order_data JSONB NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);