# race.io
• Integrantes del equipo de desarrollo: Nombre, Apellidos, correo oficial de la universidad y
cuenta en GitHub.
 - Iván Murcia Esteban, i.murcia.2016@alumnos.urjc.es, IvanMurciaEsteban
 - Daniel Jimenez Vela, d.jimenez.2016@alumnos.urjc.es
 - Miguel Ángel Novoa Vega, ma.novoa.2016@alumnos.urjc.es, imNovoa
 - Juan Jesus Segovia Sarmiento, jj.segovia.2016@alumnos.urjc.es
 
**DOCUMENTO DE DISEÑO**

* Título: Por determinar. (run) 

* Estudio: Dertien Studio. 

* Plataforma: Pc, Navegador. 

* Sinopsis de Jugabilidad y contenido: juego multijugador en 2D en el que hasta cuatro jugadores deben llegar al final de un escenario (Scroll lateral) antes que ninguno de los otros. En el mapa nos encontraremos con objetos con los que entorpecer a los adversarios, diversos atajos y obstáculos que nos dificultaran para llegar a nuestro objetivo. Caer en una gran cantidad de obstáculos provocará que un enemigo que nos estará persiguiendo nos haga perder la partida y sacarnos de la carrera. Los mapas tendrán un diseño concreto y no se dejará nada al azar. El estilo visual será simple pero vistoso. Existirán distintos niveles diferenciados entre sí por temáticas y la disposición de sus elementos. Cada personaje seleccionable tendrá habilidades determinadas. 

* Categoría: Plataformas, Carreras, Multijugador. 

* Licencia: Apache License 2.0 

* Referencias: Rayman Legends; Super Mario Bros U; BattleBlock Theatre. 

* Mecánica: Alcanzar primero la meta al final del escenario esquivando obstáculos y ataques de otros jugadores y a su vez utilizando tus propios ataques para retrasar a los adversarios. 

* Tecnología: JavaScript, Photoshop, Phaser. 

* Público: Sin un público estrictamente específico. 

**VISIÓN GENERAL DEL JUEGO** 

La intención del juego es crear mecánicas simples pero que resulten entretenidas en un entorno artísticamente vistoso. Creemos que los jugadores se sentirán atraídos por ambas cosas, y que les resultará una experiencia satisfactoria tanto como para querer seguir jugando. Otro enfoque que nos gustaría desarrollar es la interacción entre jugadores y con el entorno, un aspecto que debería ser uno de los puntos más reconocibles del videojuego. En resumen, un jugador podrá competir en un escenario interactivo en el que deberá llegar a la meta antes que otros tres jugadores a los que podrá entorpecer para hacerse con la victoria, y que le resulte desafiante, divertido y agradable en cuanto a su diseño y mecánicas. 

**MECÁNICA DEL JUEGO** 

* Cámara: Scroll lateral en 2D enfocado en el jugador. 

* Controles: Controles de movimiento básicos (flecha arriba: saltar / flecha izquierda : ir a la izquierda / flecha derecha : ir hacia la derecha / flecha abajo : agacharse si se está parado, deslizarse si se corre), botón e para el uso de habilidades, shift para hacer un sprint, botón space para otro tipo de acciones contextuales (romper el hielo que hace que no puedas moverte por culpa de la habilidad de otro jugador...) 

* Puntuación: No se guarda ningún tipo de puntuación durante la partida. El objetivo del juego es quedar en la mejor posición posible al final de la carrera. 

**ESTADOS DEL JUEGO**

El jugador empieza en el menú principal en el cual existen distintas opciones, historia, libre o campeonato. A parte tiene la opción de jugar con amigos, añadiéndose todos a un grupo de hasta 4 jugadores los cuales pueden elegir cualquiera de los 3 modos. El que elegirá el modo será el admin del grupo.  

El modo historia consta de una pequeña campaña multijugador la cual comenzará cuando se encuentren 4 jugadores online. Al hacerlo saltará una cinemática introductoria para presentar a nuestros 4 personajes principales y la situación en la que se encuentran (esta cinemática podrá ser saltada si todos y cada uno de los jugadores acceden a ello dándole al botón space durante 3 segundos). Después los jugadores podrán elegir al personaje que quieren representar y empezará el modo historia basado en un mapa introductorio (escape de la cárcel) y 3 mapas más que serán distintas localizaciones alrededor del mundo (aleatorias en cada partida) (todas ellas elegidas por su valor histórico ya que todo el juego gira alrededor de la búsqueda de objetos históricos ancestrales). En cada uno de los mapas siguientes, el que quede último será ‘capturado por la policía’ (eliminado de la partida) hasta que solo queden 2 en la última ronda, en la cual deberán conseguir la preciada joya buscada.  

El modo libre te mete en una partida con un personaje aleatorio en un mapa aleatorio también solo a una ronda. Sirve más como entrenamiento o para pasar el tiempo.  

En campeonato, los jugadores eligen al personaje que quieran, seleccionan el número de rondas y los mapas que quieren jugar a votación. 

**INTERFACES** 

(0) Pantalla inicial: 

* Ilustración de los cuatro protagonistas escapando de la cárcel con un plano contrapicado (no muy exagerado) y el foco de un helicóptero en la parte superior 

* Título del juego con tipografía personalizada 

* Botón de “Play” que permite acceder a la siguiente pantalla (1).

![](https://i.imgur.com/RRCziVY.jpg)

(1) Menú principal: 

* Pantalla que tiene como fondo un ejemplo estático de un nivel (cárcel) 

* Menú centrado con respecto a los bordes superiores y laterales en el que se pueden realizar las siguientes acciones: 

      - Crear partida: crea una partida desde cero, y te permite elegir un mapa. Dirige a (2) 

      - Unirse a partida: muestra una lista de partidas disponibles en la que se indica el mapa elegido y los jugadores que están en dicha y te permite unirte a la sesión. Dirige a (3) 

* Símbolo de Sonido y corchete musical, que te permiten modificar los sonidos de juego (Efectos y música) 
* Simbolo de interrogante, que saca una ventana con los controles. Dirige a (6).

![](https://i.imgur.com/aUGARoC.jpg)

(2) Crear Partida: 

* Imagen ejemplo del mapa que se esté seleccionando en ese momento, centrado con respecto a los bordes superiores y levemente movido a la parte superior. Debajo de dicha imagen, dos flechas “(<    >)” que permiten cambiar el mapa seleccionado. 

* Botón “Crear” con el cual crear la partida y que empiece a buscar jugadores. Dirige a (4) 

* Círculo en la parte superior derecha de la pantalla con un aspa, que te permite volver a la pantalla (1) 

![](https://i.imgur.com/QAy6667.jpg)

(3) Unirse a Partida: 

* Lista con diferentes partidas y descripción de las mismas. (No queda completamente definido por la carencia de online hasta la tercera fase. Indiferentemente, dirigirá a (4)). 

(4) Elección del personaje: 

* En la parte izquierda, una tarjeta con un concept del personaje, concretamente su pedazo correspondiente a la imagen del menú (0). 

* En la parte derecha tendremos: 

* En la parte superior de esta parte, tendremos dos ejemplos de jugabilidad del personaje que podrán alternarse con dos botones “(<    >)”. Estos ejemplos serán la jugabilidad del personaje con su apariencia normal y la segunda del mismo personaje haciendo uso de su habilidad. 

* Debajo de los ejemplos, tendremos una pequeña descripción del personaje y de su habilidad. 

* Debajo de la descripción, encontramos un botón “¡Listo!”, con el que se indica que el jugador está preparado. (Los cuatro jugadores deben estar listos para que la partida comience. En caso contrario, habrá un contador de 30 segundos que, cuando finalice, provocará el comienzo de partida de manera incondicional. 

* Adicionalmente, tendremos un botón para elegir nombre para el jugador (nickname): asigna un nombre que estará presente durante todas las partidas. Si no se escribe nada, se asignará el nombre que tienen los personajes por defecto.

![](https://i.imgur.com/qIv4XPC.jpg)

(5) Partida terminada:

* Lista centrada con los jugadores y su orden de finalización de carrera. El jugador que quede encima del todo tendrá adornos adicionales, ya que ha ganado el juego. Despues de un tiempo de 30 segundos, se vuelve al estado (4) con los mismos jugadores.

* Como fondo, tendremos una imagen del mismo mapa con scroll lento a la derecha.

* Botón de "Continuar". Si todos los jugadores lo pulsan, se omite el tiempo de espera.

* Botón circular con aspa que redigirá a la pantalla (1)

![](https://i.imgur.com/dVvJorB.jpg)

(6) Controles:

* Ventana emergente sobrepuesta a (1) que muestra los controles de juego. No se muestra aquí porque los controles aún no son definitivos. Independientemente del resultado final, se mostrarán las diferentes teclas que el juego usa y describe las acciones de cada uno.

Cabe destacar que durante el juego no se podrá acceder a ninguna interfaz de pausa, ya que el juego es multijugador. Si el jugador quiere salir del juego deberá hacerlo desde la pantalla (5) o si está dentro de la partida, cerrando la pestaña del navegador, lo que indicará su desconexión.

Para un mayor detalle de todo esto, mostramos el correspondiente diagrama UML. La versión local solo se utilizará a modo de prueba para los desarrolladores, por lo que no se ha incluido en las descripciones anteriores.

![](https://i.imgur.com/gsPP9Sp.jpg)
 
**PERSONAJES**

El juego consta de cuatro diferentes personajes, dos masculinos y dos femeninos. Cada uno posee capacidades específicas (ser más ágil, o más fuerte... depende del personaje).

* Evelin : Impulsiva, maniática, alegre pero con un retorcido sentido del humor. Ama las cosas brillantes. Roba objetos de los museos porque relucen. A pesar de que a primera vista parezca negada para el trabajo, es muy capaz. Logra superar sus obstáculos como si lo hiciera sin querer, siendo torpe pero efectiva. Delgada, ojos grandes, cabello pelirrojo enmarañado. Se flipa MUCHISIMO. 

* Francesca :  Elegante, misteriosa, sofisticada. Con una ambición desmedida. Solo roba objetos por el riesgo que conlleva. Muy atlética, cabello negro, bella, sigilosa. Ha estado varias veces en la carcel pero siempre consigue escapar. Sabe correr con TACONES. Tiene un montón de artilugios chulos para entrar en los museos.  

![](https://i.imgur.com/1dJx4Hk.jpg)

* Gray: Un auténtico lobo de mar. De edad adulta, con barba gris, de facciones duras y cuerpo grueso pero fuerte. Considerado a sí mismo un pirata de la edad moderna, se dedica a robar los objetos históricos al puro estilo pirata. Armado hasta los dientes. Silencioso y reflexivo. De sensibilidad muy desarrollada. Ama mirar la luna mientras escucha Fly me to the moon en la cubierta de su barco “Bessy”. 

![](https://i.imgur.com/yCrlgxU.jpg)

* Frank Drake: Aventurero experto ladrón de tumbas y objetos raros para llenar un vacío existencial que solo puede llenar poniendo su vida en peligro. Siempre pone en peligro a los demás. Solo estuvo capturado otra vez antes de esta, en una cárcel panameña. De cuerpo atlético, joven (30 años), guapo.  

Visión general de estética: 

![](https://i.imgur.com/uIMrvmq.jpg)


**NIVELES** 

Dentro del modo historia existirán cuatro niveles diferentes con una temática y un diseño bien definidos. 
El nivel que se usará en la primera partida tendrá como temática una fuga de cuatro presos de una cárcel de alta seguridad.  El nivel consta de tres diferentes alturas: una en el subsuelo, donde se ubica el alcantarillado de la cárcel; la segunda a nivel de tierra, donde se encuentran las celdas, oficinas, enfermería, comedor... etc.; y por último un nivel superior donde se localizan los conductos de ventilación.  

Los niveles compartirán el mismo patrón de diseño. La zona media será considerablemente más amplia que la superior e inferior, y aunque resultará más sencillo realizar movimientos amplios y un mejor manejo del personaje, nos encontraremos con mayor número de obstáculos y menos ítems. Por el contrario, los niveles superior e inferior serán mucho más estrechos y favorecerán el enfrentamiento entre jugadores y choques contra obstáculos, pero tendremos garantizados atajos que reducirán considerablemente el recorrido y una mayor cantidad de ítems. 

El resto de los niveles estarán centrados en una temática concreta, que será coherente respecto a la pequeña historia que queremos contar con el videojuego. 

Las distintas temáticas serán: Cárcel (Primer nivel) Egipto, Grecia, París, Japón, Roma, Museo de Londres (nivel final donde está la joya). 
![](https://i.imgur.com/Fh8vnD0.jpg)
![](https://i.imgur.com/NsH30Qf.jpg)

**HABILIDADES** 

Cada uno de los cuatro personajes tiene una habilidad única que podrá utilizar una vez cargue la barra de poder, la cual se rellena recogiendo monedas que se encontrarán distribuidas a lo largo del mapa.  Tienen un tiempo de duración determinado y podrán volver a usarse una vez se vuelvan a rellenar. 

Las habilidades a las que el jugador podrá optar son las siguientes: 

* Teletransportación: permite al jugador desplazarse hacia delante instantáneamente en cualquier momento que deseé, reduciendo el riesgo de chocar con obstáculos.  Esto otorga una jugabilidad mucho más dinámica y mayor libertad de movimiento. Tiene una duración de 10 segundos.  

* Forma fantasmal: el jugador se vuelve completamente invulnerable a todos los obstáculos y trampas y ataques de otros jugadores durante un periodo de tiempo de 5 segundos.  

* Super velocidad: el jugador podrá realizar un sprint que tendrá una duración de 5 segundos. No tendrá invulnerabilidad, asique es una habilidad que tiene un gran riesgo. Si se toca a otro jugador mientras se realiza el sprint, este sufrirá una caída y su velocidad se reducirá por completo. También deja una estela de fuego de manera momentánea que ralentiza a los jugadores que pasen por ella. 

* Forma demoniaca: el jugador se transformará en un demonio capaz de lanzar bolas de fuego ilimitadas de manera bidireccional y que podrán dañar a otros jugadores reduciendo por completo su velocidad. No es invulnerable a los ataques de los jugadores, trampas u obstáculos.  

**ARMAS** 

Las armas se recogen en cajas que hay distribuidas por el mapa, el objeto es aleatorio y tienen un solo uso. Estas son las diferentes armas:

* Bola de fuego: lanza un disparo que al impactar en un adversario provoca que este se frene por completo durante un breve periodo de tiempo. 

* Mina: objeto que se suelta en el mapa y que, si un jugador pasa por encima, este se frena por completo durante un breve periodo de tiempo. 

* Pegamento extrafuerte: deja un charco de pegamento en el suelo que ralentiza a los jugadores que pasen por encima. 

* Rayo congelador: Lanza una bola de hielo con parábola que si acierta a otro jugador lo frena en seco. Para que el otro jugador salga del hielo, debe dar al botón space muy rápido repetidas veces.  

**ITEMS** 

Los ítems se recogen de la misma manera que las armas, son aleatorios y también son de un solo uso. Son los siguientes: 

* Jet pack: Puede volar por el mapa durante un breve espacio de tiempo sin salirse de los límites, solo para sortear los obstáculos.  

* Escudo de fuerza: el jugador se vuelve invulnerable durante un tiempo. 

* Camuflaje: El jugador desaparece de la vista de los demás durante un breve espacio de tiempo. 

* Zapatillas con muelles: Salta más alto durante un espacio de tiempo. 

* Patines con cohetes: Boost de velocidad 3 segundos pero que frena de golpe 

**MÚSICA Y SONIDOS** 

Música marchosa, animada, con tintes de música electrónica, pero de estilo divertida. 

Voces no dobladas. 

Sonidos provenientes de un banco de sonidos. 

**DETALLES DE PRODUCCIÓN** 

Fecha de Inicio: 17 de septiembre de 2018. 

Fecha de Terminación: 10 de diciembre de 2018.
