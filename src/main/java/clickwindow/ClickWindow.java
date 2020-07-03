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
  private Integer total_clicks;

  @Column(name = "window_start_time")
  private Long window_start_time;

  @Column(name = "window_end_time")
  private Long window_end_time;

  public ClickWindow() {}

	public ClickWindow(
    Integer total_clicks,
    Long window_start_time,
    Long window_end_time
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

  public Integer getTotalClicks() {
		return total_clicks;
	}

	public void setTotalClicks(Integer total_clicks) {
		this.total_clicks = total_clicks;
	}

  public Long getWindowStartTime() {
		return window_start_time;
	}

	public void setWindowStartTime(Long window_start_time) {
		this.window_start_time = window_start_time;
	}

  public Long getWindowEndTime() {
		return window_end_time;
	}

	public void setWindowEndTime(Long window_end_time) {
		this.window_end_time = window_end_time;
	}
}
