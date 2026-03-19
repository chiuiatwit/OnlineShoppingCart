CREATE TABLE IF NOT EXISTS users (
  id            SERIAL PRIMARY KEY,
  username      VARCHAR(50) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at    TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS session (
  sid    VARCHAR      NOT NULL COLLATE "default",
  sess   JSON         NOT NULL,
  expire TIMESTAMP(6) NOT NULL,
  PRIMARY KEY (sid)
);

CREATE INDEX IF NOT EXISTS IDX_session_expire ON session (expire);
