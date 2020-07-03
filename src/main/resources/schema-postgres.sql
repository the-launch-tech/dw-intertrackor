DROP TABLE IF EXISTS click_windows;

CREATE TABLE click_windows(
  id INT generated always as identity,
  total_clicks INT NOT NULL,
  window_start_time BIGINT NOT NULL,
  window_end_time BIGINT NOT NULL
);
