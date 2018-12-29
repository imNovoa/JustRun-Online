package es.urjc.jer.game;

import java.util.Collection;
import java.util.Collections;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicInteger;

import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

public class WebsocketGameHandler extends TextWebSocketHandler {

	private static Set<WebSocketSession> sessions = Collections.synchronizedSet(new HashSet<WebSocketSession>());
	ObjectMapper mapper = new ObjectMapper();
	boolean debug = true;
	GameController gameController = new GameController();

	// Invoked after WebSocket negotiation has succeeded and the WebSocket
	// connection is opened and ready for use.
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		sessions.add(session);
	}

	// Invoked after the WebSocket connection has been closed by either side, or
	// after a transport error has occurred. Although the session may technically
	// still be open, depending on the underlying implementation, sending messages
	// at this point is discouraged and most likely will not succeed.
	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
		sessions.remove(session);
	}

	// Invoked when a new WebSocket message arrives.
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {

		synchronized (sessions) {
			JsonNode node = mapper.readTree(message.getPayload());
			ObjectNode json = mapper.createObjectNode();

			switch (node.get("type").asText()) {
			//cuando se conecta alguien al servidor se crea su jugador con todos sus atributos
			case "JOIN":
				if (gameController.getPlayers().size() < 2) {
					Player player = gameController.newPlayer();

					ObjectNode jsonPlayer = mapper.createObjectNode();
					jsonPlayer.put("id", player.getId());
					jsonPlayer.put("x", player.getX());
					jsonPlayer.put("y", player.getY());
					jsonPlayer.put("skin", player.getSkin());
					jsonPlayer.put("rightDown", player.getRight());
					jsonPlayer.put("leftDown", player.getLeft());
					jsonPlayer.put("joined", player.getJoined());
					jsonPlayer.put("spaceDown", player.getSpace());
					jsonPlayer.put("isWinner", player.getWinner());

					json.put("type", "PLAYER_CREATED");
					json.putPOJO("player", jsonPlayer);
					//json.putPOJO("player", player);
				} else {
					json.put("type", "GAME_COMPLETE");
				}
				session.sendMessage(new TextMessage(json.toString()));

				if (debug)
					System.out.println("[DEBUG] " + json.toString());
				break;
			case "getPlayer2":
				//con getPlayer2 recopilamos la informacion del segundo jugador, pasandole nuestro id, sabemos el id del otro jugador y lo recuperamos del server
				if (gameController.getPlayers().size() == 2) {
				if(node.get("id").asLong() == 1) {
					Player player2 = gameController.getPlayer(2);

					ObjectNode jsonPlayer = mapper.createObjectNode();
					jsonPlayer.put("id", player2.getId());
					jsonPlayer.put("x", player2.getX());
					jsonPlayer.put("y", player2.getY());
					jsonPlayer.put("skin", player2.getSkin());
					jsonPlayer.put("rightDown", player2.getRight());
					jsonPlayer.put("leftDown", player2.getLeft());
					jsonPlayer.put("joined", player2.getJoined());
					jsonPlayer.put("spaceDown", player2.getSpace());
					jsonPlayer.put("isWinner", player2.getWinner());
					
					json.put("type", "PLAYER2_UPDATED");
					json.putPOJO("player2", jsonPlayer);
					
				}else {
					Player player2 = gameController.getPlayer(1);
					ObjectNode jsonPlayer = mapper.createObjectNode();
					jsonPlayer.put("id", player2.getId());
					jsonPlayer.put("x", player2.getX());
					jsonPlayer.put("y", player2.getY());
					jsonPlayer.put("skin", player2.getSkin());
					jsonPlayer.put("rightDown", player2.getRight());
					jsonPlayer.put("leftDown", player2.getLeft());
					jsonPlayer.put("joined", player2.getJoined());
					jsonPlayer.put("spaceDown", player2.getSpace());
					jsonPlayer.put("isWinner", player2.getWinner());
					
					json.put("type", "PLAYER2_UPDATED");
					json.putPOJO("player2", jsonPlayer);
				}
				

				session.sendMessage(new TextMessage(json.toString()));
				}
					
				break;
			case "updatePlayer":
				//subimos al servidor la info de nuestro jugador
				ObjectNode jsonPlayer = mapper.createObjectNode();
				jsonPlayer.put("id", node.get("id").asLong());
				jsonPlayer.put("x", node.get("x").asInt());
				jsonPlayer.put("y", node.get("y").asInt());
				jsonPlayer.put("skin", node.get("skin").asInt());
				jsonPlayer.put("rightDown", node.get("rightDown").asBoolean());
				jsonPlayer.put("leftDown", node.get("leftDown").asBoolean());
				jsonPlayer.put("joined", node.get("joined").asBoolean());
				jsonPlayer.put("spaceDown", node.get("spaceDown").asBoolean());
				jsonPlayer.put("isWinner", node.get("isWinner").asBoolean());
				
				
				Player player1 = gameController.getPlayer(node.get("id").asLong());
				player1.setX(node.get("x").asInt());
				player1.setY(node.get("y").asInt());
				player1.setSkin(node.get("skin").asInt());
				player1.setRight(node.get("rightDown").asBoolean());
				player1.setLeft(node.get("leftDown").asBoolean());
				player1.setJoined(node.get("joined").asBoolean());
				player1.setSpace(node.get("spaceDown").asBoolean());
				player1.setWinner(node.get("isWinner").asBoolean());

				json.put("type", "PLAYER_SENT");
				json.putPOJO("player", jsonPlayer);
				
				session.sendMessage(new TextMessage(json.toString()));
				break;
				
			case "getNumPlayers":
				//controlamos el numero de jugadores que se han conectado
				int numPlayers = gameController.getPlayers().size();
				
				json.put("type", "TOTAL_PLAYERS");
				json.putPOJO("numPlayers", numPlayers);
				
				session.sendMessage(new TextMessage(json.toString()));
				
				break;
				
			default:
				break;
			}
		}
	}
}
