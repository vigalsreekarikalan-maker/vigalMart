import express from 'express';
import path from 'path';
import 'dotenv/config';
import pg from 'pg';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const { Pool } = pg;

const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT || 5432),
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '10mb' }));

  // Check PostgreSQL connection
  try {
    await pool.query('SELECT NOW()');
    console.log('PostgreSQL connected successfully!');
  } catch (err) {
    console.error('Database connection failed:', err);
  }

  // Health check
  app.get('/api/health', (_req, res) => {
    res.json({
      status: 'ok',
      service: 'vigalMart Backend API',
      timestamp: new Date().toISOString(),
    });
  });

  // Demo login
  app.post('/api/auth/login', (req, res) => {
    const { email, role } = req.body;

    const user = {
      id:
        role === 'ADMIN'
          ? 'user-admin-1'
          : role === 'SELLER'
            ? 'user-seller-1'
            : 'user-buyer-1',
      name:
        role === 'ADMIN'
          ? 'System Admin'
          : role === 'SELLER'
            ? 'VigalTech Solutions'
            : 'Aarav Sharma',
      email:
        email ||
        (role === 'ADMIN'
          ? 'admin@vigalshree.com'
          : role === 'SELLER'
            ? 'seller@vigalshree.com'
            : 'buyer@vigalshree.com'),
      role: role || 'BUYER',
      token: 'vgm_jwt_demo_token_2026',
    };

    res.json({
      success: true,
      message: 'Login successful on vigalMart',
      user,
    });
  });

  // Demo registration
  app.post('/api/auth/register', (req, res) => {
    const { name, email, role } = req.body;

    const user = {
      id: `user-${Date.now()}`,
      name: name || 'Vigal Customer',
      email: email || 'user@vigalshree.com',
      role: role || 'BUYER',
      token: 'vgm_jwt_demo_token_2026',
    };

    res.json({
      success: true,
      message: 'Registration successful on vigalMart',
      user,
    });
  });

  // Fetch products from PostgreSQL
  app.get('/api/products', async (_req, res) => {
    try {
      const result = await pool.query(
        'SELECT id, name, price FROM products ORDER BY id'
      );

      return res.json({
        success: true,
        products: result.rows,
      });
    } catch (err) {
      console.error('Fetch products failed:', err);

      return res.status(500).json({
        success: false,
        message: 'Could not fetch products',
      });
    }
  });
  // Create product in PostgreSQL
  app.post('/api/products', async (req, res) => {
    try {
      const product = req.body;

      if (!product?.name || product?.price === undefined) {
        return res.status(400).json({
          success: false,
          message: 'Product name and price are required',
        });
      }

      const result = await pool.query(
        `INSERT INTO products (name, price)
         VALUES ($1, $2)
         RETURNING id, name, price`,
        [
          product.name,
          Number(product.price),
        ]
      );

      return res.status(201).json({
        success: true,
        message: 'Product created successfully',
        product: result.rows[0],
      });
    } catch (err) {
      console.error('Create product failed:', err);

      return res.status(500).json({
        success: false,
        message: 'Could not create product',
      });
    }
  });
  // Delete product from PostgreSQL
  app.delete('/api/products/:id', async (req, res) => {
    try {
      const { id } = req.params;
      console.log('DELETE API RECEIVED ID:', id);
console.log('DELETE API DATABASE:', process.env.DB_NAME);

      const result = await pool.query(
        `DELETE FROM products
         WHERE id = $1
         RETURNING id`,
        [id]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'Product not found',
        });
      }

      return res.json({
        success: true,
        message: 'Product deleted successfully',
      });
    } catch (err) {
      console.error('Delete product failed:', err);

      return res.status(500).json({
        success: false,
        message: 'Could not delete product',
      });
    }
  });
  // Update existing product in PostgreSQL
  app.put('/api/products/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { name, price } = req.body;

      const result = await pool.query(
        `UPDATE products
         SET name = $1, price = $2
         WHERE id = $3
         RETURNING id, name, price`,
        [name, Number(price), id]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'Product not found',
        });
      }

      return res.json({
        success: true,
        product: result.rows[0],
      });
    } catch (err) {
      console.error('Update product failed:', err);

      return res.status(500).json({
        success: false,
        message: 'Could not update product',
      });
    }
  });
 
   // Save order in PostgreSQL
  app.post('/api/orders', async (req, res) => {
    try {
      const order = req.body;

      if (!order?.id || !order?.userId) {
        return res.status(400).json({
          success: false,
          message: 'Order ID and user ID are required',
        });
      }

      const result = await pool.query(
        `INSERT INTO vigalmart_orders
          (id, user_id, order_data)
         VALUES ($1, $2, $3::jsonb)
         ON CONFLICT (id) DO UPDATE
         SET user_id = EXCLUDED.user_id,
             order_data = EXCLUDED.order_data
         RETURNING order_data`,
        [order.id, order.userId, JSON.stringify(order)]
      );

      return res.status(201).json({
        success: true,
        message: 'Order saved successfully',
        order: result.rows[0].order_data,
      });
    } catch (err) {
      console.error('Save order failed:', err);

      return res.status(500).json({
        success: false,
        message: 'Could not save order',
      });
    }
  });

  // Fetch orders; optionally filter by user ID
  app.get('/api/orders', async (req, res) => {
    try {
      const userId =
        typeof req.query.userId === 'string'
          ? req.query.userId
          : undefined;

      const result = userId
        ? await pool.query(
            `SELECT order_data
             FROM vigalmart_orders
             WHERE user_id = $1
             ORDER BY created_at DESC`,
            [userId]
          )
        : await pool.query(
            `SELECT order_data
             FROM vigalmart_orders
             ORDER BY created_at DESC`
          );

      return res.json({
        success: true,
        orders: result.rows.map((row) => row.order_data),
      });
    } catch (err) {
      console.error('Fetch orders failed:', err);

      return res.status(500).json({
        success: false,
        message: 'Could not fetch orders',
      });
    }
  });
  // Update order status
  app.put('/api/orders/:id/status', async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;

      const allowedStatuses = [
        'PENDING',
        'PROCESSING',
        'SHIPPED',
        'DELIVERED',
        'CANCELLED',
      ];

      if (!allowedStatuses.includes(status)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid order status',
        });
      }

      const result = await pool.query(
        `UPDATE vigalmart_orders
         SET order_data = jsonb_set(
           order_data,
           '{status}',
           to_jsonb($1::text),
           true
         )
         WHERE id = $2
         RETURNING order_data`,
        [status, id]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'Order not found',
        });
      }

      return res.json({
        success: true,
        message: 'Order status updated successfully',
        order: result.rows[0].order_data,
      });
    } catch (err) {
      console.error('Update order status failed:', err);

      return res.status(500).json({
        success: false,
        message: 'Could not update order status',
      });
    }
  });
  
  // Vite middleware in development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });

    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');

    app.use(express.static(distPath));

    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(
      `VigalMart server running on http://localhost:${PORT}`
    );
  });
}

startServer().catch((err) => {
  console.error('Failed to start vigalMart server:', err);
});