package clickwindow;

import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;

import clickwindow.ClickWindow;

@Repository
public interface ClickWindowRepository extends JpaRepository<ClickWindow, Long> {}
