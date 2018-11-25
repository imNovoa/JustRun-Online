package es.urjc.jer.game;


public class Ball {

	private int x, y;
	private long id;
	private boolean visibility = false;
	
	Ball() {
		this.x= 0;
		this.y = 0;
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

	public int getY() {
		return y;
	}

	public void setY(int y) {
		this.y = y;
	}
	
	public void visibilityTrue() {
		visibility = true;
	}
	
	public void visibilityFalse() {
		visibility = false;
	}
	
	public boolean getVisibility() {
		return visibility;
	}
	
	@Override
	public String toString() {
		return "Ball [id=" + id + ", x=" + x + ", y=" + y + "]";
	}
	
}
