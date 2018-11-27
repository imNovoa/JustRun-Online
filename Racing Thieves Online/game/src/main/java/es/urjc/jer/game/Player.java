package es.urjc.jer.game;

public class Player {

	private long id;
	private int x, y, velocityX;
	private int score;
	private boolean rightDown = false; 
	private boolean leftDown = false;
	
	
	Player() {
		this.score = 0;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public int getX() {
		return x;
	}

	public void setX(int x) {
		this.x = x;
	}
	
	public int getVelocityX() {
		return velocityX;
	}

	public void setVelocityX(int x) {
		this.velocityX = x;
	}

	public int getY() {
		return y;
	}

	public void setY(int y) {
		this.y = y;
	}

	public int getScore() {
		return score;
	}

	public void setScore(int score) {
		this.score = score;
	}
	
	public void setRight(boolean b) {
		rightDown = b;
	}
	
	public boolean getRight() {
		return rightDown;
	}
	
	public void setLeft(boolean b) {
		leftDown = b;
	}
	
	public boolean getLeft() {
		return leftDown;
	}

	@Override
	public String toString() {
		return "Player [id=" + id + ", x=" + x + ", y=" + y + ", score=" + score + "]";
	}

}
