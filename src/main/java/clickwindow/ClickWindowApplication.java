package clickwindow;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

@SpringBootApplication
@EnableAutoConfiguration(
  exclude = {
    org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration.class
  }
)
@EnableJpaAuditing
@EnableWebMvc
public class ClickWindowApplication {

  public static void main(String[] args) {
    SpringApplication.run(ClickWindowApplication.class, args);
  }

}
