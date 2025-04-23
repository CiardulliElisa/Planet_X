# Lab 2 antworten

## Aufgabe 1

### Was ist ein CSS Selector und welche Selektoren stellt CSS zur Verfügung. Erklären Sie diese mithilfe von Beispielen?

CSS Selektoren benutzt man, um die HTML-Elemente, die man durch CSS formatieren möchte, auszuwählen. Es gibt viele verschiedene Typen von Selectore. Folgenden ein paar Beispiele:

```css
/* tag selector */
p {
    /*selektiert alle <p> (Paragraph) tags */
} 

/* class selector */
.form-control {
    /* selektiert alle Elemente mit class=‘form-control’ */
} 

/* id selector */
#first-name {
    /* selektiert das Element mit id=‘first-name’ */
}

/* universal selector */
* {
    /* selektiert alle Elemente im HTML Dokument */
}

/* Attribute selector */
input[type="text"] {
    /* selects all <input> elements with type="text" */
}

/* Descendant selector */
div p {
    /* selects all <p> elements that are descendants of <div> elements */
}

/* Child selector */
ul > li {
    /* selects all <li> elements that are direct children of <ul> elements */
}

/* Adjacent sibling selector */
h2 + p {
    /* selects the <p> element that directly follows an <h2> element */
}

/* General sibling selector */
h2 ~ p {
    /* selects all <p> elements that are siblings of an <h2> element */
}

/* Pseudo-class selector */
a:hover {
    /* selects <a> elements when they are being hovered over */
}

/* Pseudo-element selector */
p::first-line {
    /* selects the first line of all <p> elements */
}
```

### Was versteht man unter dem Boxmodell und wann ist es relevant?

Alle Block Level Elemente (z.B. `<div>`, `<form>`, `<ul>`) in einem HTML Dokument, kann man als Boxen in anderen Boxen betrachten, das ist das Boxmodell. Der Inhalt dieser Elemente ist nämlich von 3 Boxen umgeben: die größte heißt 'margin' (Außenabstand), dann gibt es ‘border’ (Rahmen) und die kleinste ‘padding’ (Innenabstand).
Das Boxmodell ist wichtig, wenn man das Layout einer Webseite plant: Man kann durch dieses Modell nämlich das Spacing, die Positionierung und die Dimensionen aller Elemente kontrollieren.

### Wie können verschiedene Schriftarten in CSS definiert werden?
Um im CSS verschiedene Textarten zu definieren, muss man zuerst einen Selektor wählen, um bestimmte Elemente zu modifizieren. Danach benutzt man das Attribute ‘font-family’ und wählt am besten mehrere Fonts, da er nur funktioniert, wenn der gewählte Font bereits im System des Benutzers installiert ist.
Der erste Parameter (z.B. “Arial”) ist die bevorzugte Schriftart, danach stehen die Schriftarten, die benutzt werden sollen, falls die erste nicht verfügbar ist (Times), und zuletzt schreibt man eine generische Font-Family (serif), die benutzt werden soll, falls keine der gewählten Font-Familien verfügbar waren und der Browser selber eine ähnliche Schriftart wählen soll.
Beispiel:
```css
p {
    font-family : Arial, Times, serif
}
```
Du kannst auch lokale Schriftarten benutzen:
```css
@font-face {
    font-family: myFont;
    src: local(path/to/custum/font.ttf);
}
p {
    font-family: myFont;
}
```
oder Schriftarten von einem externen Link benutzen::
im `<head>`:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Noto+Color+Emoji&display=swap" rel="stylesheet">
```
im CSS:
```css
.noto-color emoji-regular {
  font-family: "Noto Color Emoji", sans-serif;
  font-weight: 400;
  font-style: normal;
}
```
z.B. diser font-besteht nur aus emojis.

### Erklären Sie den Nutzen, die Funktionalität und die Verwendung von CSS-Präprozessoren.
CSS kann bei größeren Projekten kompliziert werden, es gibt nämlich keine Variablen, viel redundanten Code, keine Imports und keine Verschachtelung. Um diese Probleme zu lösen, werden Präprozessoren, wie SASS, benutzt.
Um diese Präprozessoren zu nutzen, kann man sowohl Tools als auch Online-Präprozessoren verwenden (z.B. Prepros und sassmeister.com). Man schreibt dann den z.B. SASS Code und bindet die generierte CSS Datei in das HTML-Dokument.
Mit Präprozessoren kann man neue Dateien erstellen (.scss) und somit eine Aufteilung in mehrere Dateien erhalten. Man kann Variablen nutzen ($name), Code verschachteln, Code wiederverwenden (@mixin), Code importieren (@import) und Vererbung nutzen (@extend).
Beispiel:

```scss
$font-stack: Helvetica, sans-serif;
$primary-color: #333;

body {
    font: 100% $font-stack;
    color: $primary-color;
}
```

## Aufgabe 2
### Erklären Sie, was mit Responsive Design gemeint ist und warum das Konzept relevant ist.
Responsive Design ist, wenn eine Webseite so hergestellt wird, dass sie sich dem Bildschirm des Benutzers anpasst. Eine Webseite soll nämlich sowohl auf einem Desktop als auch auf einem Handy übersichtlich und intuitiv zu benutzen sein.
Deshalb muss man immer die Größe und das Layout der Elemente berücksichtigen.
Eine responsive Webseite soll flexibel sein und auf die Präferenzen und Einstellungen des Geräts des Benutzers reagieren, ohne dass z.B. einige Funktionen blockiert werden oder einige Elemente nicht vollständig sichtbar sind.

Responsive design ist wichtig, weil immer mehr Menschen auf mobilen Geräten surfen. in 2023 wurden auf [mobilen Geräten 313% meher seiten besucht als auf desktops](https://www.semrush.com/blog/mobile-vs-desktop-usage/). Wenn eine Webseite nicht responsive ist, wird sie auf mobilen Geräten nicht gut aussehen und der Benutzer wird sie wahrscheinlich verlassen.

### Was sind die Vorteile von Frameworks wie Bootstrap und wie helfen sie einem Entwickler?
Frameworks helfen einem Entwickler bei der Erstellung und dem Design von HTML-Elementen. Sie stellen vorgefertigte Elemente, wie z.B. Klassen, zur Verfügung, damit Entwickler sich nicht mit jedem einzelnen CSS Attribut befassen müssen und sich stattdessen auf den Gesamtüberblick konzentrieren können und viel Zeit sparen.
Außerdem können Entwickler diese Frameworks benutzen, ohne genau wissen zu müssen, wie man sie erstellt, und dadurch Fehler vermeiden. 

### Wie kann mit Bootstrap ein Responsive Design umgesetzt werden?

Bootstrap stellt verschiedene vorgefertigte Klassen zur Verfügung, die man für das Layout einer Webseite benutzen kann. Man hat z.B. die Klassen ‘row’ und ‘col’.
Eine Seite wird in 12 Spalten geteilt, je nach Bildschirmgröße wählen Entwickler, wie viele Spalten bestimmte HTML-Elemente einnehmen sollen, dann nutzen sie die Klassen in Bootstrap, die für diese unterschiedlichen Größen geeignet sind, z.B:

```html
<div class='container'>
    <div class='row'>
        <div class='col-12 col-lg-6'></div>
        <div class='col-12 col-lg-6'></div>
    </div>
</div>
```

Das bedeutet, dass es zwei Elemente gibt, die jeweils eine ganze Spalte einnehmen, aber wenn die Bildschirmgröße ‘large’ wird, dann nehmen sie jeweils die Hälfte derselben Spalte ein

Bootstrab bietet unzählige Klassen zur Darstellung von HTML-Elementen, wie z.B. Buttons, Formularen, Navigationsleisten, Bildern, Tabellen, Alerts, Modals, etc. zur verfügung, die in der [Dokumentation von Bootstrap zu finden sind](https://getbootstrap.com/docs).