package es.urjc.jer.game;

import java.util.Collection;
import java.util.Map;
import java.util.Random;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class GameController {

	Map<Long, Player> players = new ConcurrentHashMap<>();
	Map<Long, Ball> balls = new ConcurrentHashMap<>();
	AtomicLong nextId = new AtomicLong(0);
	AtomicLong nextB = new AtomicLong(2);
	Random rnd = new Random();
	Ball ball = new Ball();

	// Con GET recuperamos el número de jugadores
	@GetMapping(value = "/game")
	public Collection<Player> getPlayers() {
		return players.values();
	}

	// Con POST creamos un nuevo jugador
	@PostMapping(value = "/game")
	@ResponseStatus(HttpStatus.CREATED)
	public Player newPlayer() {
		Player player = new Player();
		long id = nextId.incrementAndGet();
		player.setId(id);
		player.setX(rnd.nextInt(700));
		player.setY(rnd.nextInt(500));
		players.put(player.getId(), player);
		return player;
	}

	// Con este GET, podemos recuperar la información particular de cada uno de los
	// jugadores
	@GetMapping(value = "/game/{id}")
	public ResponseEntity<Player> getPlayer(@PathVariable long id) {
		Player player = players.get(id);
		if (player != null) {
			return new ResponseEntity<>(player, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	// Con este PUT actualizamos la información del jugador con ID = id
	@PutMapping(value = "/game/{id}")
	public ResponseEntity<Player> updatePlayer(@PathVariable long id, @RequestBody Player player) {
		Player savedPlayer = players.get(player.getId());
		if (savedPlayer != null) {
			players.put(id, player);
			return new ResponseEntity<>(player, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	// Con este DELETE borramos el jugador con ID = id
	@DeleteMapping(value = "/game/{id}")
	public ResponseEntity<Player> borraJugador(@PathVariable long id) {
		Player savedPlayer = players.get(id);
		if (savedPlayer != null) {
			players.remove(savedPlayer.getId());
			return new ResponseEntity<>(savedPlayer, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	// Con GET recuperamos el número de jugadores
	@GetMapping(value = "/ball")
	public Collection<Ball> getBalls() {
		return balls.values();
	}
	
	// Con POST creamos un nuevo jugador
	@PostMapping(value = "/ball")
	@ResponseStatus(HttpStatus.CREATED)
	public Ball newBall() {
		Ball ball = new Ball();
		long id = nextB.incrementAndGet();
		ball.setX(0);
		ball.setY(0);
		ball.setId(id);
		balls.put(ball.getId(), ball);
		return ball;
	}
	
	
	// Con este GET, podemos recuperar la información particular de cada uno de los
	// jugadores
	@GetMapping(value = "/ball/{id}")
	public ResponseEntity<Ball> getBall(@PathVariable long id) {
		Ball ball = balls.get(id);
		if (ball != null) {
			return new ResponseEntity<>(ball, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	
	// Con este PUT actualizamos la información del jugador con ID = id
	@PutMapping(value = "/ball/{id}")
	public ResponseEntity<Ball> updateBall(@PathVariable long id, @RequestBody Ball ball) {
		Ball savedBall = balls.get(ball.getId());
		if (savedBall != null) {
			balls.put(id, ball);
			return new ResponseEntity<>(ball, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}


// Con este DELETE borramos el jugador con ID = id
@DeleteMapping(value = "/ball/{id}")
public ResponseEntity<Ball> borraBall(@PathVariable long id) {
	Ball savedBall = balls.get(id);
	if (savedBall != null) {
		balls.remove(savedBall.getId());
		return new ResponseEntity<>(savedBall, HttpStatus.OK);
	} else {
		return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}
}
}

