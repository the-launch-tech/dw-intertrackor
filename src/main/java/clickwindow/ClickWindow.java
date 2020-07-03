package clickwindow;

import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.persistence.FetchType;
import javax.persistence.CascadeType;
import javax.persistence.GenerationType;
import javax.persistence.GeneratedValue;
import javax.persistence.EntityListeners;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Entity
@Table(name = "click_windows")
@EntityListeners(AuditingEntityListener.class)
public class ClickWindow {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id")
  private Long id;

  @Column(name = "total_clicks")
  private String total_clicks;

  @Column(name = "window_start_time")
  private String window_start_time;

  @Column(name = "window_end_time")
  private String window_end_time;

  public ClickWindow() {}

	public ClickWindow(
    String total_clicks,
    String window_start_time,
    String window_end_time
  ) {
    this.total_clicks = total_clicks;
    this.window_start_time = window_start_time;
    this.window_end_time = window_end_time;
	}

  public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

  public String getTotalClicks() {
		return total_clicks;
	}

	public void setTotalClicks(String total_clicks) {
		this.total_clicks = total_clicks;
	}

  public String getWindowStartTime() {
		return window_start_time;
	}

	public void setWindowStartTime(String window_start_time) {
		this.window_start_time = window_start_time;
	}

  public String getWindowEndTime() {
		return window_end_time;
	}

	public void setWindowEndTime(String window_end_time) {
		this.window_end_time = window_end_time;
	}
}
