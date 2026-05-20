-- Users, roles, and company profiles
CREATE TABLE IF NOT EXISTS roles (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS company_profiles (
  id SERIAL PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  address TEXT,
  phone VARCHAR(50),
  email VARCHAR(150)
);

CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  company_id INTEGER REFERENCES company_profiles(id),
  role_id INTEGER REFERENCES roles(id),
  name VARCHAR(150) NOT NULL,
  email VARCHAR(200) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS projects (
  id SERIAL PRIMARY KEY,
  company_id INTEGER REFERENCES company_profiles(id),
  name VARCHAR(250) NOT NULL,
  client_name VARCHAR(200),
  location TEXT,
  start_date DATE,
  end_date DATE,
  approved_budget NUMERIC(14, 2) DEFAULT 0,
  status VARCHAR(50) DEFAULT 'active',
  description TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS project_tasks (
  id SERIAL PRIMARY KEY,
  project_id INTEGER REFERENCES projects(id) ON DELETE CASCADE,
  assigned_to INTEGER REFERENCES users(id),
  title VARCHAR(250) NOT NULL,
  description TEXT,
  start_date DATE,
  due_date DATE,
  priority VARCHAR(50) DEFAULT 'medium',
  status VARCHAR(50) DEFAULT 'open',
  percent_complete INTEGER DEFAULT 0,
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS task_dependencies (
  id SERIAL PRIMARY KEY,
  task_id INTEGER REFERENCES project_tasks(id) ON DELETE CASCADE,
  depends_on_task_id INTEGER REFERENCES project_tasks(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS materials (
  id SERIAL PRIMARY KEY,
  name VARCHAR(250) NOT NULL,
  unit VARCHAR(50),
  category VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS procurement_orders (
  id SERIAL PRIMARY KEY,
  project_id INTEGER REFERENCES projects(id) ON DELETE CASCADE,
  created_by INTEGER REFERENCES users(id),
  vendor VARCHAR(200),
  status VARCHAR(50) DEFAULT 'requested',
  total_cost NUMERIC(14, 2) DEFAULT 0,
  ordered_at TIMESTAMP DEFAULT NOW(),
  expected_delivery DATE
);

CREATE TABLE IF NOT EXISTS procurement_items (
  id SERIAL PRIMARY KEY,
  order_id INTEGER REFERENCES procurement_orders(id) ON DELETE CASCADE,
  material_id INTEGER REFERENCES materials(id),
  quantity NUMERIC(12, 2),
  unit_cost NUMERIC(14, 2),
  total_cost NUMERIC(14, 2)
);

CREATE TABLE IF NOT EXISTS daily_reports (
  id SERIAL PRIMARY KEY,
  project_id INTEGER REFERENCES projects(id) ON DELETE CASCADE,
  report_date DATE NOT NULL,
  summary TEXT,
  created_by INTEGER REFERENCES users(id),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS progress_photos (
  id SERIAL PRIMARY KEY,
  project_id INTEGER REFERENCES projects(id) ON DELETE CASCADE,
  task_id INTEGER REFERENCES project_tasks(id),
  report_id INTEGER REFERENCES daily_reports(id),
  image_url TEXT NOT NULL,
  caption TEXT,
  location VARCHAR(200),
  photo_date DATE,
  uploaded_by INTEGER REFERENCES users(id),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS budget_items (
  id SERIAL PRIMARY KEY,
  project_id INTEGER REFERENCES projects(id) ON DELETE CASCADE,
  name VARCHAR(200) NOT NULL,
  category VARCHAR(100),
  planned_amount NUMERIC(14, 2) DEFAULT 0,
  phase VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS cost_entries (
  id SERIAL PRIMARY KEY,
  project_id INTEGER REFERENCES projects(id) ON DELETE CASCADE,
  budget_item_id INTEGER REFERENCES budget_items(id),
  description TEXT,
  amount NUMERIC(14, 2) DEFAULT 0,
  spent_at DATE,
  created_by INTEGER REFERENCES users(id),
  status VARCHAR(50) DEFAULT 'approved'
);

CREATE TABLE IF NOT EXISTS subcontractors (
  id SERIAL PRIMARY KEY,
  name VARCHAR(250) NOT NULL,
  contact VARCHAR(200),
  payment_terms VARCHAR(150)
);

CREATE TABLE IF NOT EXISTS subcontractor_payments (
  id SERIAL PRIMARY KEY,
  subcontractor_id INTEGER REFERENCES subcontractors(id),
  project_id INTEGER REFERENCES projects(id) ON DELETE CASCADE,
  amount NUMERIC(14, 2) DEFAULT 0,
  due_date DATE,
  paid_date DATE,
  status VARCHAR(50) DEFAULT 'pending',
  notes TEXT
);

CREATE TABLE IF NOT EXISTS report_exports (
  id SERIAL PRIMARY KEY,
  project_id INTEGER REFERENCES projects(id) ON DELETE CASCADE,
  type VARCHAR(100),
  generated_by INTEGER REFERENCES users(id),
  generated_at TIMESTAMP DEFAULT NOW(),
  file_url TEXT
);
