DROP TABLE IF EXISTS click_windows;

CREATE TABLE click_windows(
  id INT generated always as identity,
  total_clicks VARCHAR(255) NOT NULL,
  window_start_time VARCHAR(255) NOT NULL,
  window_end_time VARCHAR(255) NOT NULL
);
