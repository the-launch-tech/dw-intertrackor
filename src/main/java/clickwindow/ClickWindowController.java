package clickwindow;

import java.util.List;
import java.util.HashMap;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;

import clickwindow.ClickWindow;
import clickwindow.ClickWindowRepository;

@RestController
@RequestMapping(value = "/api/click-windows")
public class ClickWindowController {

	private final ClickWindowRepository repository;

  ClickWindowController(ClickWindowRepository repository) {
    this.repository = repository;
  }

	@CrossOrigin
	@RequestMapping(method = RequestMethod.GET, path = "")
	public ResponseEntity<List<ClickWindow>> findAll() {
		return new ResponseEntity<List<ClickWindow>>(repository.findAll(), HttpStatus.OK);
	}

	@CrossOrigin
	@RequestMapping(path = "", headers = "Accept=application/json", method = RequestMethod.POST)
  public ClickWindow save(@RequestBody HashMap<String, String> requestData) {
		String totalClicks = requestData.get("total_clicks");
    String windowStartTime = requestData.get("window_start_time");
    String windowEndTime = requestData.get("window_end_time");
		ClickWindow clickWindow = new ClickWindow();
		clickWindow.setTotalClicks(totalClicks);
		clickWindow.setWindowStartTime(windowStartTime);
		clickWindow.setWindowEndTime(windowEndTime);
		return repository.save(clickWindow);
  }

}
