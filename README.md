# alpdesk-parallax

Dieses Bundle enthält folgenden Funktionalitäten welche über die Artikel-Einstellungen im Backend konfiguriert werden.
(Das Bundle setzt jQuery als JavascriptLib voraus welche über das Seitenlayout eingebunden werden muss)

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


### Animations-Effekte (Legend: Animations-Effekte)

Neben der Hintergrund-Parallax-Funktionalität stehen noch weitere Bild-Animations-Effekte zur Verfügung.

So kann z.B. ein Bild quer über den Bildschirm fahren wenn der Viewport des Artikels erreicht ist.
Ebenso ist der volle Umfang von Animate.css integriert und kann als Effekt ausgewählt werden.
(see https://animate.style/)

Diese Animationen sind unabhängig vom Parallax-Effekt und werden immer nur einmalig getrigger.

Es können mehrere Animations-Effekte pro Artikel angegeben werden (MultiColumnWizard).

Folgende Optionen/Auswahl sind verfügbar:

1. Bild
2. Viewport-Offset (ab welchem Viewport der Effekt starten soll. z.B. Viewport + 50% => Wenn der Artikel in der Mitte des Fensters ist)
3. Startposition des Bildes (background-position-x, background-position-y)
4. Bewegungs-Effekt (z.B. Bewege Bild von Startposition nach oben/rechts)
5. Fade-Effekt (fadeIn,FadeOut)
6. Effekt-Geschwindigkeit (Animation-Duration)

Somit ist es mit diesem Bundle möglich "Bild-Spielereien" und Bewegung auf die Seite zu bringen.


