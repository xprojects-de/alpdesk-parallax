# alpdesk-parallax

## Bundle für Contao um Parallax-Effekte und Animationen zu Artikeln und Inhaltselementen hinzuzufügen

### Neu in V 2.x 
- Umstellung auf Twig-Templates
- KEINE Verwendung von JQuery
- pures Javascript mit symfony/webpack-encore

Dieses Bundle enthält folgenden Funktionalitäten welche über die Artikel-Einstellungen, ContentElement-Einstellungen und dem Backendmodul "Alpdesk-Animationen" konfiguriert werden.

### Artikel-Hintergrundbild mit optionalem Parallax-Effekt (Legend: Parallax-Hintergrundbild)

Es kann ein Bild aus der Dateiverwaltung ausgewählt werden und als normales Hintergrundbild für den Artikel gesetzt werden.
Dieses Bild kann dann optional mit einem Parallax-Effekt versehen werden.

Folgende Optionen/Auswahl sind verfügbar:

1. Bild mit optionaler Größen-Funktion
2. Bilddarstellung (background-size: auto|cover)
3. Horizontale Ausrichtung (background-position-x: 0%|50%|100%)
4. Vertikale Ausrichtung (background-position-x: 0%|50%|100%)
5. optionaler horizontaler Parallax-Effekt (move left|move right)

Bei aktiviertem Parallax animiert/bewegt das Bundle das Bild dann automatisch in Abhänigkeit von der Scroll-Position und der Bild-Position.


### Animations-Effekte

Neben der Hintergrund-Parallax-Funktionalität stehen diverse Bewegungseffekte und ebenso der volle Umfang von Animate.css (V4) zur Verfügung.
(see https://animate.style/)

Diese Animationen sind unabhängig vom Parallax-Effekt und werden immer nur einmalig getrigger (auch beim Resize).
Die Animationen werden je nach Bedarf über die Artikel-Einstellungen, ContentElement-Einstellungen order dem Backendmodul "Alpdesk-Animationen" konfiguriert.

Folgende Optionen/Auswahl sind verfügbar:

1. Kompletter Umfang von animate.css
2. Weitere Bewegungseffekte
3. Viewport-Offset (ab welchem Viewport der Effekt starten soll. z.B. Viewport + 50% => Wenn der Artikel in der Mitte des Fensters ist)
4. Startposition des Elementes (background-position-x, background-position-y)
5. Bewegungs-Effekt (z.B. Bewege Bild von Startposition nach oben/rechts)
6. Effekt-Geschwindigkeit (Animation-Duration)

Somit ist es mit diesem Bundle möglich "Bild-Spielereien" und Bewegung auf die Seite zu bringen. :-)


